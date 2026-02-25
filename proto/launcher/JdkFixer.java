import org.teavm.model.*;
import org.teavm.model.instructions.*;
import java.util.Arrays;

/**
 * Phase 3.2 — TeaVM ClassHolderTransformer qui ajoute des stubs pour les
 * méthodes et champs JDK absents dans l'implémentation partielle de TeaVM 0.13.1.
 *
 * Problème : TeaVM avec strict=false gère les CLASSES absentes (warning),
 * mais les MÉTHODES et CHAMPS manquants sur des classes existantes bloquent la génération JS.
 *
 * Méthodes manquantes identifiées quand game.create() est appelé :
 *  - Array.newInstance(Class, int[])          → 5 occurrences (RuneStats)
 *  - UUID.<init>(long, long)                  → 2 occurrences (networking)
 *  - Class.getGenericSuperclass()             → 1 occurrence (serialization)
 *  - Thread.getThreadGroup()                  → 1 occurrence (threading)
 *  - SecurityManager.getThreadGroup()         → 1 occurrence (threading)
 *  - Field.getGenericType()                   → 1 occurrence (reflection)
 *  - ResourceBundle.clearCache()              → 2 occurrences (localization)
 *
 * Classe manquante (Field not found — bloquant même avec strict=false) :
 *  - Character$UnicodeBlock.CJK_*             → 11 occurrences (LanguageHelper, DFFormatLabel)
 *    TeaVM a TCharacter (86 champs) mais pas d'inner class UnicodeBlock.
 *    L'user classpath est filtré pour java.lang.* → stub ignoré.
 *    Correction : ctx.submit() depuis le transformer de java.lang.Character.
 *
 * Enregistré via : tool.getTransformers().add("JdkFixer")
 */
public class JdkFixer implements org.teavm.model.ClassHolderTransformer {

    @Override
    public void transformClass(ClassHolder cls, ClassHolderTransformerContext ctx) {
        switch (cls.getName()) {

            case "java.lang.Character":
                // Injecter Character$UnicodeBlock avec les champs CJK via ctx.submit()
                injectUnicodeBlock(ctx);
                break;

            case "java.lang.Object":
                // Injecter tous les stubs de classes manquantes (jamais trouvées par TeaVM)
                // depuis java.lang.Object qui est toujours chargé en premier
                injectMissingClasses(ctx);
                break;

            // ─── Méthodes native libGDX sans implémentation TeaVM ──────────
            case "com.badlogic.gdx.graphics.g2d.Gdx2DPixmap":
            case "com.badlogic.gdx.graphics.glutils.ETC1":
            case "com.badlogic.gdx.math.Matrix4":
            case "com.badlogic.gdx.utils.BufferUtils":
                replaceNativeMethods(cls);
                break;

            case "java.lang.reflect.Array":
                // static Object newInstance(Class<?>, int[]) → return null
                // utilisé par RuneStats.initStats(II) pour tableaux multi-dim
                addStaticNullMethod(cls, "newInstance",
                    new ValueType[]{
                        ValueType.object("java.lang.Class"),
                        ValueType.arrayOf(ValueType.INTEGER)
                    },
                    ValueType.object("java.lang.Object"));
                break;

            case "java.lang.Thread":
                // ThreadGroup getThreadGroup() → return null
                addInstanceNullMethod(cls, "getThreadGroup",
                    ValueType.object("java.lang.ThreadGroup"));
                break;

            case "java.lang.SecurityManager":
                // ThreadGroup getThreadGroup() → return null
                addInstanceNullMethod(cls, "getThreadGroup",
                    ValueType.object("java.lang.ThreadGroup"));
                break;

            case "java.lang.Class":
                // Type getGenericSuperclass() → return null
                addInstanceNullMethod(cls, "getGenericSuperclass",
                    ValueType.object("java.lang.reflect.Type"));
                break;

            case "java.lang.reflect.Field":
                // Type getGenericType() → return null
                addInstanceNullMethod(cls, "getGenericType",
                    ValueType.object("java.lang.reflect.Type"));
                break;

            case "java.util.ResourceBundle":
                // static void clearCache() → no-op
                addStaticVoidMethod(cls, "clearCache", new ValueType[0]);
                // static void clearCache(ClassLoader) → no-op
                addStaticVoidMethod(cls, "clearCache",
                    new ValueType[]{ValueType.object("java.lang.ClassLoader")});
                break;

            case "java.util.UUID":
                // <init>(long, long) → appelle this("00000000-0000-0000-0000-000000000000")
                addUUIDConstructor(cls);
                break;
        }
    }

    // ─── Injection de Character$UnicodeBlock via ctx.submit() ──────────────

    // Champs statiques Character$UnicodeBlock utilisés par le jeu (CJK + japonais + coréen)
    private static final String[] CJK_FIELD_NAMES = {
        // CJK (chinois)
        "CJK_COMPATIBILITY",
        "CJK_COMPATIBILITY_FORMS",
        "CJK_COMPATIBILITY_IDEOGRAPHS",
        "CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT",
        "CJK_RADICALS_SUPPLEMENT",
        "CJK_SYMBOLS_AND_PUNCTUATION",
        "CJK_UNIFIED_IDEOGRAPHS",
        "CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A",
        "CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B",
        "CJK_UNIFIED_IDEOGRAPHS_EXTENSION_C",
        "CJK_UNIFIED_IDEOGRAPHS_EXTENSION_D",
        "CJK_UNIFIED_IDEOGRAPHS_EXTENSION_E",
        "ENCLOSED_CJK_LETTERS_AND_MONTHS",
        "ENCLOSED_IDEOGRAPHIC_SUPPLEMENT",
        "IDEOGRAPHIC_DESCRIPTION_CHARACTERS",
        "KANGXI_RADICALS",
        // Japonais
        "HIRAGANA",
        "KATAKANA",
        "KATAKANA_PHONETIC_EXTENSIONS",
        "BOPOMOFO",
        "BOPOMOFO_EXTENDED",
        "KANA_SUPPLEMENT",
        "HALFWIDTH_AND_FULLWIDTH_FORMS",
        // Coréen
        "HANGUL_SYLLABLES",
        "HANGUL_JAMO",
        "HANGUL_JAMO_EXTENDED_A",
        "HANGUL_JAMO_EXTENDED_B",
        "HANGUL_COMPATIBILITY_JAMO",
        // Ponctuation asiatique
        "GENERAL_PUNCTUATION",
        "SMALL_FORM_VARIANTS",
        "VERTICAL_FORMS",
        "NUMBER_FORMS",
        "LETTERLIKE_SYMBOLS",
        "MATHEMATICAL_OPERATORS",
        "MISCELLANEOUS_SYMBOLS",
        "BASIC_LATIN",
        "LATIN_1_SUPPLEMENT",
        "LATIN_EXTENDED_A",
        "LATIN_EXTENDED_B",
        "IPA_EXTENSIONS",
        "GREEK",
        "CYRILLIC",
        "ARABIC",
        "HEBREW",
        "DEVANAGARI",
        "THAI",
        "TIBETAN",
        "GEORGIAN",
        "ARMENIAN",
        "UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS",
        "SPECIALS",
        "SURROGATES_AREA",
        "PRIVATE_USE_AREA",
        "HIGH_SURROGATES",
        "HIGH_PRIVATE_USE_SURROGATES",
        "LOW_SURROGATES",
    };

    private void injectUnicodeBlock(ClassHolderTransformerContext ctx) {
        ClassHolder block = new ClassHolder("java.lang.Character$UnicodeBlock");
        block.setLevel(AccessLevel.PUBLIC);
        block.setParent("java.lang.Object");

        ValueType blockType = ValueType.object("java.lang.Character$UnicodeBlock");

        // Champs static CJK_* → null (détection CJK désactivée en web, acceptable)
        for (String name : CJK_FIELD_NAMES) {
            FieldHolder f = new FieldHolder(name);
            f.setLevel(AccessLevel.PUBLIC);
            f.getModifiers().add(ElementModifier.STATIC);
            f.setType(blockType);
            block.addField(f);
        }

        // Méthodes statiques of(int) et of(char) → null
        addStaticNullMethod(block, "of",
            new ValueType[]{ValueType.INTEGER},
            blockType);
        addStaticNullMethod(block, "of",
            new ValueType[]{ValueType.CHARACTER},
            blockType);

        submitIfMissing(ctx, block);
    }

    // ─── Injection de toutes les classes manquantes via ctx.submit() ────────

    private boolean injectedMissingClasses = false;

    private void injectMissingClasses(ClassHolderTransformerContext ctx) {
        if (injectedMissingClasses) return;
        injectedMissingClasses = true;

        // ScheduledExecutorService (référencé comme type de retour)
        ClassHolder schedExec = newStub("java.util.concurrent.ScheduledExecutorService");
        submitIfMissing(ctx, schedExec);

        // ExecutorService — submit(Callable)→null, isShutdown()→false, shutdown()→void,
        //                   awaitTermination(long,TimeUnit)→false, isTerminated()→false
        ClassHolder execSvc = newStub("java.util.concurrent.ExecutorService");
        addInstanceNullMethod(execSvc, "submit",
            new ValueType[]{ValueType.object("java.util.concurrent.Callable")},
            ValueType.object("java.util.concurrent.Future"));
        addInstanceFalseMethod(execSvc, "isShutdown");
        addInstanceFalseMethod(execSvc, "isTerminated");
        addInstanceVoidMethod(execSvc, "shutdown", new ValueType[0]);
        addInstanceFalseMethod(execSvc, "awaitTermination",
            new ValueType[]{ValueType.LONG, ValueType.object("java.util.concurrent.TimeUnit")});
        addInstanceVoidMethod(execSvc, "execute",
            new ValueType[]{ValueType.object("java.lang.Runnable")});
        submitIfMissing(ctx, execSvc);

        // Executors — newFixedThreadPool / newSingleThreadScheduledExecutor → null
        ClassHolder executors = newStub("java.util.concurrent.Executors");
        addStaticNullMethod(executors, "newFixedThreadPool",
            new ValueType[]{ValueType.INTEGER, ValueType.object("java.util.concurrent.ThreadFactory")},
            ValueType.object("java.util.concurrent.ExecutorService"));
        addStaticNullMethod(executors, "newSingleThreadScheduledExecutor",
            new ValueType[]{ValueType.object("java.util.concurrent.ThreadFactory")},
            ValueType.object("java.util.concurrent.ScheduledExecutorService"));
        addStaticNullMethod(executors, "newCachedThreadPool", new ValueType[0],
            ValueType.object("java.util.concurrent.ExecutorService"));
        submitIfMissing(ctx, executors);

        // Future — isDone()→false, get()→null, cancel()→false
        ClassHolder future = newStub("java.util.concurrent.Future");
        addInstanceFalseMethod(future, "isDone");
        addInstanceFalseMethod(future, "isCancelled");
        addInstanceFalseMethod(future, "cancel", new ValueType[]{ValueType.BOOLEAN});
        addInstanceNullMethod(future, "get", ValueType.object("java.lang.Object"));
        submitIfMissing(ctx, future);

        // ConcurrentLinkedQueue — add()→false, offer()→false, poll()→null, isEmpty()→true, size()→0
        ClassHolder clq = newStub("java.util.concurrent.ConcurrentLinkedQueue");
        addInstanceFalseMethod(clq, "add", new ValueType[]{ValueType.object("java.lang.Object")});
        addInstanceFalseMethod(clq, "offer", new ValueType[]{ValueType.object("java.lang.Object")});
        addInstanceNullMethod(clq, "poll", ValueType.object("java.lang.Object"));
        addInstanceNullMethod(clq, "peek", ValueType.object("java.lang.Object"));
        addInstanceTrueMethod(clq, "isEmpty");
        submitIfMissing(ctx, clq);

        // CopyOnWriteArraySet — add→false, remove→false, contains→false, isEmpty→true
        ClassHolder cowas = newStub("java.util.concurrent.CopyOnWriteArraySet");
        addInstanceFalseMethod(cowas, "add", new ValueType[]{ValueType.object("java.lang.Object")});
        addInstanceFalseMethod(cowas, "remove", new ValueType[]{ValueType.object("java.lang.Object")});
        addInstanceFalseMethod(cowas, "contains", new ValueType[]{ValueType.object("java.lang.Object")});
        addInstanceTrueMethod(cowas, "isEmpty");
        submitIfMissing(ctx, cowas);

        // ReentrantLock — lock/unlock/tryLock all void/false
        ClassHolder lock = newStub("java.util.concurrent.locks.ReentrantLock");
        addInstanceVoidMethod(lock, "lock", new ValueType[0]);
        addInstanceVoidMethod(lock, "unlock", new ValueType[0]);
        addInstanceFalseMethod(lock, "tryLock");
        submitIfMissing(ctx, lock);

        // MessageDigest — getInstance→null, update→void, digest→null
        ClassHolder md = newStub("java.security.MessageDigest");
        addStaticNullMethod(md, "getInstance",
            new ValueType[]{ValueType.object("java.lang.String")},
            ValueType.object("java.security.MessageDigest"));
        addInstanceVoidMethod(md, "update", new ValueType[]{ValueType.arrayOf(ValueType.BYTE)});
        addInstanceVoidMethod(md, "update",
            new ValueType[]{ValueType.arrayOf(ValueType.BYTE), ValueType.INTEGER, ValueType.INTEGER});
        addInstanceNullMethod(md, "digest", ValueType.arrayOf(ValueType.BYTE));
        addInstanceVoidMethod(md, "reset", new ValueType[0]);
        submitIfMissing(ctx, md);

        // Mac — getInstance→null, init→void, update→void, doFinal→null
        ClassHolder mac = newStub("javax.crypto.Mac");
        addStaticNullMethod(mac, "getInstance",
            new ValueType[]{ValueType.object("java.lang.String")},
            ValueType.object("javax.crypto.Mac"));
        addInstanceVoidMethod(mac, "init",
            new ValueType[]{ValueType.object("java.security.Key")});
        addInstanceVoidMethod(mac, "update",
            new ValueType[]{ValueType.arrayOf(ValueType.BYTE), ValueType.INTEGER, ValueType.INTEGER});
        addInstanceNullMethod(mac, "doFinal", ValueType.arrayOf(ValueType.BYTE));
        addInstanceNullMethod(mac, "doFinal",
            new ValueType[]{ValueType.arrayOf(ValueType.BYTE)},
            ValueType.arrayOf(ValueType.BYTE));
        addInstanceIntZeroMethod(mac, "getMacLength", new ValueType[0]);
        submitIfMissing(ctx, mac);

        // SecretKeySpec — constructor(byte[], String) → no-op
        ClassHolder sks = newStub("javax.crypto.spec.SecretKeySpec");
        addConstructorNoOp(sks,
            new ValueType[]{ValueType.arrayOf(ValueType.BYTE), ValueType.object("java.lang.String")});
        submitIfMissing(ctx, sks);

        // Key interface (parent de SecretKeySpec)
        submitIfMissing(ctx, newStub("java.security.Key"));

        // Collator — getInstance(Locale)→null, compare(String,String)→0
        ClassHolder collator = newStub("java.text.Collator");
        addStaticNullMethod(collator, "getInstance",
            new ValueType[]{ValueType.object("java.util.Locale")},
            ValueType.object("java.text.Collator"));
        addInstanceIntZeroMethod(collator, "compare",
            new ValueType[]{ValueType.object("java.lang.String"), ValueType.object("java.lang.String")});
        addInstanceVoidMethod(collator, "setStrength", new ValueType[]{ValueType.INTEGER});
        submitIfMissing(ctx, collator);

        // ObjectInputStream — constructor(InputStream) → no-op
        ClassHolder ois = newStub("java.io.ObjectInputStream");
        addConstructorNoOp(ois,
            new ValueType[]{ValueType.object("java.io.InputStream")});
        submitIfMissing(ctx, ois);

        // ObjectInput — close()→void, readObject()→null
        ClassHolder oi = newStub("java.io.ObjectInput");
        addInstanceVoidMethod(oi, "close", new ValueType[0]);
        addInstanceNullMethod(oi, "readObject", ValueType.object("java.lang.Object"));
        addInstanceIntZeroMethod(oi, "readInt", new ValueType[0]);
        addInstanceNullMethod(oi, "readUTF", ValueType.object("java.lang.String"));
        addInstanceFalseMethod(oi, "readBoolean");
        addInstanceFloatZeroMethod(oi, "readFloat");
        submitIfMissing(ctx, oi);

        // ParameterizedType — getActualTypeArguments()→null, getOwnerType()→null, getRawType()→null
        ClassHolder pt = newStub("java.lang.reflect.ParameterizedType");
        addInstanceNullMethod(pt, "getActualTypeArguments",
            ValueType.arrayOf(ValueType.object("java.lang.reflect.Type")));
        addInstanceNullMethod(pt, "getOwnerType", ValueType.object("java.lang.reflect.Type"));
        addInstanceNullMethod(pt, "getRawType", ValueType.object("java.lang.reflect.Type"));
        submitIfMissing(ctx, pt);

        // TypeVariable — getGenericDeclaration()→null, getName()→null, getBounds()→null
        ClassHolder tv = newStub("java.lang.reflect.TypeVariable");
        addInstanceNullMethod(tv, "getGenericDeclaration",
            ValueType.object("java.lang.reflect.GenericDeclaration"));
        addInstanceNullMethod(tv, "getName", ValueType.object("java.lang.String"));
        addInstanceNullMethod(tv, "getBounds",
            ValueType.arrayOf(ValueType.object("java.lang.reflect.Type")));
        submitIfMissing(ctx, tv);

        // GenericArrayType — getGenericComponentType()→null
        ClassHolder gat = newStub("java.lang.reflect.GenericArrayType");
        addInstanceNullMethod(gat, "getGenericComponentType",
            ValueType.object("java.lang.reflect.Type"));
        submitIfMissing(ctx, gat);

        // WildcardType — getLowerBounds()→null, getUpperBounds()→null
        ClassHolder wt = newStub("java.lang.reflect.WildcardType");
        addInstanceNullMethod(wt, "getLowerBounds",
            ValueType.arrayOf(ValueType.object("java.lang.reflect.Type")));
        addInstanceNullMethod(wt, "getUpperBounds",
            ValueType.arrayOf(ValueType.object("java.lang.reflect.Type")));
        submitIfMissing(ctx, wt);

        // GenericDeclaration (parent de TypeVariable.getGenericDeclaration())
        submitIfMissing(ctx, newStub("java.lang.reflect.GenericDeclaration"));

        // InetAddress — getHostAddress()→null
        ClassHolder inet = newStub("java.net.InetAddress");
        addInstanceNullMethod(inet, "getHostAddress", ValueType.object("java.lang.String"));
        addInstanceNullMethod(inet, "getHostName", ValueType.object("java.lang.String"));
        addStaticNullMethod(inet, "getByName",
            new ValueType[]{ValueType.object("java.lang.String")},
            ValueType.object("java.net.InetAddress"));
        submitIfMissing(ctx, inet);

        // NoOpLog — constructor
        ClassHolder nol = newStub("org.apache.commons.logging.impl.NoOpLog");
        addConstructorNoOp(nol, new ValueType[]{ValueType.object("java.lang.String")});
        submitIfMissing(ctx, nol);

        // SimpleLog — constructor
        ClassHolder sl = newStub("org.apache.commons.logging.impl.SimpleLog");
        addConstructorNoOp(sl, new ValueType[]{ValueType.object("java.lang.String")});
        submitIfMissing(ctx, sl);

        // ThreadFactory (référencé comme paramètre)
        submitIfMissing(ctx, newStub("java.util.concurrent.ThreadFactory"));

        // Callable (référencé comme paramètre d'ExecutorService.submit)
        submitIfMissing(ctx, newStub("java.util.concurrent.Callable"));

        // HttpsURLConnection — parent de HttpsURLConnectionExtension (Apache HttpComponents)
        // TeaVM a THttpURLConnection → en faire le parent pour hériter de getURL() etc.
        if (ctx.getHierarchy().getClassSource().get("javax.net.ssl.HttpsURLConnection") == null) {
            ClassHolder https = new ClassHolder("javax.net.ssl.HttpsURLConnection");
            https.setLevel(AccessLevel.PUBLIC);
            https.setParent("java.net.HttpURLConnection");
            ctx.submit(https);
        }
    }

    /** Soumet un stub seulement si la classe n'existe pas déjà dans TeaVM */
    private void submitIfMissing(ClassHolderTransformerContext ctx, ClassHolder stub) {
        if (ctx.getHierarchy().getClassSource().get(stub.getName()) == null) {
            ctx.submit(stub);
        }
    }

    /** Crée un ClassHolder stub vide avec parent=Object */
    private ClassHolder newStub(String className) {
        ClassHolder stub = new ClassHolder(className);
        stub.setLevel(AccessLevel.PUBLIC);
        stub.setParent("java.lang.Object");
        return stub;
    }

    /** Méthode d'instance void → no-op */
    private void addInstanceVoidMethod(ClassHolder cls, String name, ValueType[] params) {
        ValueType[] sig = appendReturn(params, ValueType.VOID);
        MethodDescriptor desc = new MethodDescriptor(name, sig);
        if (cls.getMethod(desc) != null) return;

        MethodHolder m = new MethodHolder(desc);
        m.setLevel(AccessLevel.PUBLIC);

        Program p = new Program();
        BasicBlock block = p.createBasicBlock();
        p.createVariable(); // this
        for (int i = 0; i < params.length; i++) p.createVariable();
        block.add(new ExitInstruction());

        m.setProgram(p);
        cls.addMethod(m);
    }

    /** Méthode d'instance → false (int 0) */
    private void addInstanceFalseMethod(ClassHolder cls, String name, ValueType... params) {
        ValueType[] sig = appendReturn(params, ValueType.BOOLEAN);
        MethodDescriptor desc = new MethodDescriptor(name, sig);
        if (cls.getMethod(desc) != null) return;

        MethodHolder m = new MethodHolder(desc);
        m.setLevel(AccessLevel.PUBLIC);

        Program p = new Program();
        BasicBlock block = p.createBasicBlock();
        p.createVariable(); // this
        for (int i = 0; i < params.length; i++) p.createVariable();

        Variable result = p.createVariable();
        IntegerConstantInstruction ici = new IntegerConstantInstruction();
        ici.setConstant(0);
        ici.setReceiver(result);
        block.add(ici);

        ExitInstruction exit = new ExitInstruction();
        exit.setValueToReturn(result);
        block.add(exit);

        m.setProgram(p);
        cls.addMethod(m);
    }

    /** Méthode d'instance → true (int 1) */
    private void addInstanceTrueMethod(ClassHolder cls, String name, ValueType... params) {
        ValueType[] sig = appendReturn(params, ValueType.BOOLEAN);
        MethodDescriptor desc = new MethodDescriptor(name, sig);
        if (cls.getMethod(desc) != null) return;

        MethodHolder m = new MethodHolder(desc);
        m.setLevel(AccessLevel.PUBLIC);

        Program p = new Program();
        BasicBlock block = p.createBasicBlock();
        p.createVariable(); // this
        for (int i = 0; i < params.length; i++) p.createVariable();

        Variable result = p.createVariable();
        IntegerConstantInstruction ici = new IntegerConstantInstruction();
        ici.setConstant(1);
        ici.setReceiver(result);
        block.add(ici);

        ExitInstruction exit = new ExitInstruction();
        exit.setValueToReturn(result);
        block.add(exit);

        m.setProgram(p);
        cls.addMethod(m);
    }

    /** Méthode d'instance → int 0 */
    private void addInstanceIntZeroMethod(ClassHolder cls, String name, ValueType[] params) {
        ValueType[] sig = appendReturn(params, ValueType.INTEGER);
        MethodDescriptor desc = new MethodDescriptor(name, sig);
        if (cls.getMethod(desc) != null) return;

        MethodHolder m = new MethodHolder(desc);
        m.setLevel(AccessLevel.PUBLIC);

        Program p = new Program();
        BasicBlock block = p.createBasicBlock();
        p.createVariable(); // this
        for (int i = 0; i < params.length; i++) p.createVariable();

        Variable result = p.createVariable();
        IntegerConstantInstruction ici = new IntegerConstantInstruction();
        ici.setConstant(0);
        ici.setReceiver(result);
        block.add(ici);

        ExitInstruction exit = new ExitInstruction();
        exit.setValueToReturn(result);
        block.add(exit);

        m.setProgram(p);
        cls.addMethod(m);
    }

    /** Constructeur no-op (appelle super() implicitement puis return) */
    private void addConstructorNoOp(ClassHolder cls, ValueType[] params) {
        ValueType[] sig = appendReturn(params, ValueType.VOID);
        MethodDescriptor desc = new MethodDescriptor("<init>", sig);
        if (cls.getMethod(desc) != null) return;

        MethodHolder ctor = new MethodHolder(desc);
        ctor.setLevel(AccessLevel.PUBLIC);

        Program p = new Program();
        BasicBlock block = p.createBasicBlock();
        Variable thisVar = p.createVariable();
        for (int i = 0; i < params.length; i++) p.createVariable();

        // Appelle Object.<init>()
        InvokeInstruction superCall = new InvokeInstruction();
        superCall.setType(InvocationType.SPECIAL);
        superCall.setMethod(new MethodReference("java.lang.Object",
            new MethodDescriptor("<init>", ValueType.VOID)));
        superCall.setInstance(thisVar);
        block.add(superCall);

        block.add(new ExitInstruction());

        ctor.setProgram(p);
        cls.addMethod(ctor);
    }

    /** addInstanceNullMethod avec paramètres explicites */
    private void addInstanceNullMethod(ClassHolder cls, String name,
                                        ValueType[] params, ValueType returnType) {
        ValueType[] sig = appendReturn(params, returnType);
        MethodDescriptor desc = new MethodDescriptor(name, sig);
        if (cls.getMethod(desc) != null) return;

        MethodHolder m = new MethodHolder(desc);
        m.setLevel(AccessLevel.PUBLIC);

        Program p = new Program();
        BasicBlock block = p.createBasicBlock();
        p.createVariable(); // this
        for (int i = 0; i < params.length; i++) p.createVariable();

        Variable result = p.createVariable();
        NullConstantInstruction nci = new NullConstantInstruction();
        nci.setReceiver(result);
        block.add(nci);

        ExitInstruction exit = new ExitInstruction();
        exit.setValueToReturn(result);
        block.add(exit);

        m.setProgram(p);
        cls.addMethod(m);
    }

    // ─── Stub : méthode d'instance retournant null ──────────────────────────

    private void addInstanceNullMethod(ClassHolder cls, String name, ValueType returnType) {
        MethodDescriptor desc = new MethodDescriptor(name, returnType);
        if (cls.getMethod(desc) != null) return;

        MethodHolder m = new MethodHolder(desc);
        m.setLevel(AccessLevel.PUBLIC);

        Program p = new Program();
        BasicBlock block = p.createBasicBlock();
        p.createVariable(); // var0 = this (non utilisé dans le corps)

        Variable result = p.createVariable();
        NullConstantInstruction nci = new NullConstantInstruction();
        nci.setReceiver(result);
        block.add(nci);

        ExitInstruction exit = new ExitInstruction();
        exit.setValueToReturn(result);
        block.add(exit);

        m.setProgram(p);
        cls.addMethod(m);
    }

    // ─── Stub : méthode statique retournant null ────────────────────────────

    private void addStaticNullMethod(ClassHolder cls, String name,
                                      ValueType[] params, ValueType returnType) {
        ValueType[] sig = appendReturn(params, returnType);
        MethodDescriptor desc = new MethodDescriptor(name, sig);
        if (cls.getMethod(desc) != null) return;

        MethodHolder m = new MethodHolder(desc);
        m.setLevel(AccessLevel.PUBLIC);
        m.getModifiers().add(ElementModifier.STATIC);

        Program p = new Program();
        BasicBlock block = p.createBasicBlock();
        for (int i = 0; i < params.length; i++) p.createVariable(); // paramètres

        Variable result = p.createVariable();
        NullConstantInstruction nci = new NullConstantInstruction();
        nci.setReceiver(result);
        block.add(nci);

        ExitInstruction exit = new ExitInstruction();
        exit.setValueToReturn(result);
        block.add(exit);

        m.setProgram(p);
        cls.addMethod(m);
    }

    // ─── Stub : méthode statique void ──────────────────────────────────────

    private void addStaticVoidMethod(ClassHolder cls, String name, ValueType[] params) {
        ValueType[] sig = appendReturn(params, ValueType.VOID);
        MethodDescriptor desc = new MethodDescriptor(name, sig);
        if (cls.getMethod(desc) != null) return;

        MethodHolder m = new MethodHolder(desc);
        m.setLevel(AccessLevel.PUBLIC);
        m.getModifiers().add(ElementModifier.STATIC);

        Program p = new Program();
        BasicBlock block = p.createBasicBlock();
        for (int i = 0; i < params.length; i++) p.createVariable();
        p.createVariable(); // fantôme — PhiUpdater.updatePhis exige variableAt(paramCount) pour toute méthode statique

        block.add(new ExitInstruction()); // void return

        m.setProgram(p);
        cls.addMethod(m);
    }

    // ─── Stub UUID constructor (long, long) ────────────────────────────────

    private void addUUIDConstructor(ClassHolder cls) {
        MethodDescriptor desc = new MethodDescriptor("<init>",
            ValueType.LONG, ValueType.LONG, ValueType.VOID);
        if (cls.getMethod(desc) != null) return;

        MethodHolder ctor = new MethodHolder(desc);
        ctor.setLevel(AccessLevel.PUBLIC);

        Program p = new Program();
        BasicBlock block = p.createBasicBlock();
        Variable thisVar = p.createVariable(); // var0 = this
        p.createVariable(); // var1 = mostSigBits (long)
        p.createVariable(); // var2 = leastSigBits (long)

        // Appelle Object.<init>() — pas UUID.<init>(String) qui n'existe pas dans TeaVM
        InvokeInstruction superCall = new InvokeInstruction();
        superCall.setType(InvocationType.SPECIAL);
        superCall.setMethod(new MethodReference("java.lang.Object",
            new MethodDescriptor("<init>", ValueType.VOID)));
        superCall.setInstance(thisVar);
        block.add(superCall);

        block.add(new ExitInstruction()); // return void

        ctor.setProgram(p);
        cls.addMethod(ctor);
    }

    /** Remplace toutes les méthodes native d'une classe par des stubs no-op.
     *  Utilisé pour les méthodes JNI libGDX (Gdx2DPixmap, ETC1, Matrix4, BufferUtils)
     *  qui n'ont pas d'implémentation TeaVM. */
    private void replaceNativeMethods(ClassHolder cls) {
        for (MethodHolder m : cls.getMethods()) {
            if (!m.getModifiers().contains(ElementModifier.NATIVE)) continue;
            m.getModifiers().remove(ElementModifier.NATIVE);

            boolean isStatic = m.getModifiers().contains(ElementModifier.STATIC);
            int paramCount = m.getDescriptor().parameterCount();
            ValueType returnType = m.getDescriptor().getResultType();

            Program p = new Program();
            BasicBlock block = p.createBasicBlock();
            if (!isStatic) p.createVariable(); // this
            for (int i = 0; i < paramCount; i++) p.createVariable();
            // Pour les méthodes statiques void, TeaVM's invokeSpecial accède dep.getVariables()[i+1]
            // (offset +1 pour le slot "this" qui n'existe pas sur les statics).
            // Ajouter une variable fantôme assure que dep.variableNodes.length = paramCount+1 ≥ paramCount+1.
            if (isStatic) p.createVariable(); // variable fantôme — évite AIOOBE dans invokeSpecial

            if (returnType instanceof ValueType.Void) {
                block.add(new ExitInstruction());
            } else if (returnType instanceof ValueType.Primitive) {
                ValueType.Primitive prim = (ValueType.Primitive) returnType;
                Variable r = p.createVariable();
                switch (prim.getKind()) {
                    case LONG: {
                        LongConstantInstruction lci = new LongConstantInstruction();
                        lci.setConstant(0L);
                        lci.setReceiver(r);
                        block.add(lci);
                        break;
                    }
                    case FLOAT: {
                        FloatConstantInstruction fci = new FloatConstantInstruction();
                        fci.setConstant(0.0f);
                        fci.setReceiver(r);
                        block.add(fci);
                        break;
                    }
                    case DOUBLE: {
                        DoubleConstantInstruction dci = new DoubleConstantInstruction();
                        dci.setConstant(0.0);
                        dci.setReceiver(r);
                        block.add(dci);
                        break;
                    }
                    default: {
                        // BOOLEAN, BYTE, SHORT, CHARACTER, INTEGER → int 0
                        IntegerConstantInstruction ici = new IntegerConstantInstruction();
                        ici.setConstant(0);
                        ici.setReceiver(r);
                        block.add(ici);
                        break;
                    }
                }
                ExitInstruction exit = new ExitInstruction();
                exit.setValueToReturn(r);
                block.add(exit);
            } else {
                // Object or array → null
                Variable r = p.createVariable();
                NullConstantInstruction nci = new NullConstantInstruction();
                nci.setReceiver(r);
                block.add(nci);
                ExitInstruction exit = new ExitInstruction();
                exit.setValueToReturn(r);
                block.add(exit);
            }

            m.setProgram(p);
        }
    }

    /** Méthode d'instance → float 0.0 */
    private void addInstanceFloatZeroMethod(ClassHolder cls, String name, ValueType... params) {
        ValueType[] sig = appendReturn(params, ValueType.FLOAT);
        MethodDescriptor desc = new MethodDescriptor(name, sig);
        if (cls.getMethod(desc) != null) return;

        MethodHolder m = new MethodHolder(desc);
        m.setLevel(AccessLevel.PUBLIC);

        Program p = new Program();
        BasicBlock block = p.createBasicBlock();
        p.createVariable(); // this
        for (int i = 0; i < params.length; i++) p.createVariable();

        Variable result = p.createVariable();
        FloatConstantInstruction fci = new FloatConstantInstruction();
        fci.setConstant(0.0f);
        fci.setReceiver(result);
        block.add(fci);

        ExitInstruction exit = new ExitInstruction();
        exit.setValueToReturn(result);
        block.add(exit);

        m.setProgram(p);
        cls.addMethod(m);
    }

    // ─── Utilitaire ────────────────────────────────────────────────────────

    private ValueType[] appendReturn(ValueType[] params, ValueType returnType) {
        ValueType[] sig = new ValueType[params.length + 1];
        System.arraycopy(params, 0, sig, 0, params.length);
        sig[params.length] = returnType;
        return sig;
    }
}
