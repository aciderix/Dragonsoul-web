import org.objectweb.asm.*;

import java.io.*;
import java.util.*;
import java.util.jar.*;

/**
 * Phase 3.2 — Génère via ASM des stubs .class pour les interfaces libGDX obfusquées.
 *
 * Problème : javac ne peut pas compiler des sources qui implémentent des interfaces
 * dont le nom est à la fois un package ET une classe (ex: com.badlogic.gdx.c est
 * l'interface ApplicationListener ET le package contenant FileHandle).
 *
 * Solution : générer directement les .class via ASM (pas de javac impliqué).
 *
 * Génère aussi GdxInitializer.class qui initialise le singleton Gdx via PUTSTATIC.
 */
public class GenerateStubs {

    // Interface interne → nom du stub
    static final Map<String, String> STUBS = new LinkedHashMap<>();
    static {
        STUBS.put("com/badlogic/gdx/a",          "WebApp");      // Application
        STUBS.put("com/badlogic/gdx/f",          "WebGraphics"); // Graphics
        STUBS.put("com/badlogic/gdx/d",          "WebAudio");    // Audio
        STUBS.put("com/badlogic/gdx/g",          "WebInput");    // Input
        STUBS.put("com/badlogic/gdx/e",          "WebFiles");    // Files
        STUBS.put("com/badlogic/gdx/l",          "WebNet");      // Net
        STUBS.put("com/badlogic/gdx/m",          "WebPrefs");    // Preferences
        STUBS.put("com/badlogic/gdx/graphics/f", "WebGL20");     // GL20
        STUBS.put("com/badlogic/gdx/graphics/g", "WebGL30");     // GL30 (extends GL20)
    }

    // Singleton Gdx : com.badlogic.gdx.utils.b.a
    static final String GDX_CLASS = "com/badlogic/gdx/utils/b/a";

    // { field_name, field_descriptor, stub_class_name }
    static final String[][] GDX_FIELDS = {
        {"a", "Lcom/badlogic/gdx/a;",          "WebApp"},
        {"b", "Lcom/badlogic/gdx/f;",          "WebGraphics"},
        {"c", "Lcom/badlogic/gdx/d;",          "WebAudio"},
        {"d", "Lcom/badlogic/gdx/g;",          "WebInput"},
        {"e", "Lcom/badlogic/gdx/e;",          "WebFiles"},
        {"f", "Lcom/badlogic/gdx/l;",          "WebNet"},
        {"g", "Lcom/badlogic/gdx/graphics/f;", "WebGL20"},
        {"h", "Lcom/badlogic/gdx/graphics/f;", "WebGL20"},  // gl = gl20
        {"i", "Lcom/badlogic/gdx/graphics/g;", "WebGL30"},
    };

    static String outputDir = "output/stubs";

    public static void main(String[] args) throws Exception {
        String jar1 = args.length > 0 ? args[0] : "../classes1.jar";
        String jar2 = args.length > 1 ? args[1] : "../classes2.jar";
        if (args.length > 2) outputDir = args[2];

        System.out.println("=== GenerateStubs — Phase 3.2 ===");
        System.out.println("Output: " + outputDir);

        // Charger toutes les classes des JARs du jeu
        Map<String, byte[]> allClasses = new HashMap<>();
        loadJar(jar1, allClasses);
        loadJar(jar2, allClasses);
        System.out.println("Classes chargees depuis JARs : " + allClasses.size());

        new File(outputDir).mkdirs();

        // Générer un stub par interface
        int generated = 0;
        for (Map.Entry<String, String> entry : STUBS.entrySet()) {
            String interfaceName = entry.getKey();
            String stubName = entry.getValue();

            if (!allClasses.containsKey(interfaceName)) {
                System.out.println("  WARN: interface introuvable: " + interfaceName);
                continue;
            }

            byte[] stub = generateStub(allClasses, interfaceName, stubName);
            writeClass(stubName, stub);
            System.out.println("  → " + stubName + ".class (implements " + interfaceName + ")");
            generated++;
        }

        // Générer GdxInitializer
        byte[] init = generateGdxInitializer();
        writeClass("GdxInitializer", init);
        System.out.println("  → GdxInitializer.class");
        generated++;

        // Générer java/lang/Character$UnicodeBlock (absent de TeaVM 0.13.1)
        // Nécessaire pour éviter les erreurs "Field not found" sur les constantes CJK
        byte[] unicodeBlock = generateCharacterUnicodeBlock();
        writeClassWithPath("java/lang/Character$UnicodeBlock", unicodeBlock);
        System.out.println("  → java/lang/Character$UnicodeBlock.class");
        generated++;

        System.out.println("Total : " + generated + " classes générées dans " + outputDir);
    }

    // ─── Chargement des JARs ────────────────────────────────────────────────

    static void loadJar(String path, Map<String, byte[]> out) throws Exception {
        File f = new File(path);
        if (!f.exists()) {
            System.out.println("  JAR non trouvé (ignoré): " + path);
            return;
        }
        try (JarFile jar = new JarFile(f)) {
            Enumeration<JarEntry> entries = jar.entries();
            while (entries.hasMoreElements()) {
                JarEntry entry = entries.nextElement();
                if (entry.getName().endsWith(".class")) {
                    String name = entry.getName().replace(".class", "");
                    try (InputStream is = jar.getInputStream(entry)) {
                        out.put(name, is.readAllBytes());
                    }
                }
            }
        }
    }

    // ─── Lecture d'une interface ─────────────────────────────────────────────

    static class IfaceInfo {
        String[] superInterfaces = new String[0];
        List<String[]> methods = new ArrayList<>(); // [name, descriptor]
    }

    static IfaceInfo readInterface(byte[] bytes) {
        IfaceInfo info = new IfaceInfo();
        ClassReader reader = new ClassReader(bytes);
        reader.accept(new ClassVisitor(Opcodes.ASM9) {
            @Override
            public void visit(int version, int access, String name, String signature,
                              String superName, String[] interfaces) {
                info.superInterfaces = interfaces != null ? interfaces : new String[0];
            }
            @Override
            public MethodVisitor visitMethod(int access, String name, String descriptor,
                                             String signature, String[] exceptions) {
                if ((access & Opcodes.ACC_ABSTRACT) != 0) {
                    info.methods.add(new String[]{name, descriptor});
                }
                return null;
            }
        }, ClassReader.SKIP_CODE | ClassReader.SKIP_DEBUG);
        return info;
    }

    // ─── Collecte récursive des méthodes abstraites ──────────────────────────

    static void collectAllMethods(Map<String, byte[]> allClasses, String ifaceName,
                                   List<String[]> allMethods, Set<String> seenMethods,
                                   Set<String> allIfaces) {
        byte[] bytes = allClasses.get(ifaceName);
        if (bytes == null) return;

        IfaceInfo info = readInterface(bytes);

        // Parcourir les super-interfaces en premier
        for (String si : info.superInterfaces) {
            if (allIfaces.add(si)) {
                collectAllMethods(allClasses, si, allMethods, seenMethods, allIfaces);
            }
        }

        // Ajouter les méthodes déclarées ici
        for (String[] m : info.methods) {
            String key = m[0] + m[1];
            if (seenMethods.add(key)) {
                allMethods.add(m);
            }
        }
    }

    // ─── Génération d'un stub ────────────────────────────────────────────────

    static byte[] generateStub(Map<String, byte[]> allClasses,
                                String interfaceName, String stubName) {
        List<String[]> methods = new ArrayList<>();
        Set<String> seenMethods = new HashSet<>();
        Set<String> allIfaces = new LinkedHashSet<>();
        allIfaces.add(interfaceName);

        collectAllMethods(allClasses, interfaceName, methods, seenMethods, allIfaces);

        ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_FRAMES | ClassWriter.COMPUTE_MAXS);
        cw.visit(Opcodes.V11,
                 Opcodes.ACC_PUBLIC | Opcodes.ACC_SUPER,
                 stubName, null,
                 "java/lang/Object",
                 allIfaces.toArray(new String[0]));

        // Constructeur par défaut
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
        mv.visitCode();
        mv.visitVarInsn(Opcodes.ALOAD, 0);
        mv.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(1, 1);
        mv.visitEnd();

        // Stub de chaque méthode abstraite
        for (String[] m : methods) {
            generateStubMethod(cw, m[0], m[1], stubName);
        }

        cw.visitEnd();
        return cw.toByteArray();
    }

    static void generateStubMethod(ClassWriter cw, String name, String descriptor, String stubName) {
        MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, name, descriptor, null, null);
        mv.visitCode();

        Type returnType = Type.getReturnType(descriptor);
        switch (returnType.getSort()) {
            case Type.VOID:
                mv.visitInsn(Opcodes.RETURN);
                break;
            case Type.BOOLEAN:
            case Type.INT:
            case Type.SHORT:
            case Type.BYTE:
            case Type.CHAR:
                // Cas spéciaux pour des valeurs cohérentes
                if (name.equals("getWidth") || name.equals("getBackBufferWidth")) {
                    mv.visitIntInsn(Opcodes.SIPUSH, 960);
                } else if (name.equals("getHeight") || name.equals("getBackBufferHeight")) {
                    mv.visitIntInsn(Opcodes.SIPUSH, 540);
                } else if (name.equals("getFramesPerSecond")) {
                    mv.visitIntInsn(Opcodes.BIPUSH, 60);
                } else if (name.equals("isInfoEnabled") || name.equals("isWarnEnabled")
                        || name.equals("isErrorEnabled") || name.equals("isFatalEnabled")) {
                    mv.visitInsn(Opcodes.ICONST_1); // true
                } else {
                    mv.visitInsn(Opcodes.ICONST_0);
                }
                mv.visitInsn(Opcodes.IRETURN);
                break;
            case Type.LONG:
                mv.visitInsn(Opcodes.LCONST_0);
                mv.visitInsn(Opcodes.LRETURN);
                break;
            case Type.FLOAT:
                if (name.equals("getDeltaTime") || name.equals("getRawDeltaTime")) {
                    mv.visitLdcInsn(0.016f);
                } else if (name.equals("getDensity") || name.equals("getTargetDensity")) {
                    mv.visitLdcInsn(1.0f);
                } else {
                    mv.visitInsn(Opcodes.FCONST_0);
                }
                mv.visitInsn(Opcodes.FRETURN);
                break;
            case Type.DOUBLE:
                mv.visitInsn(Opcodes.DCONST_0);
                mv.visitInsn(Opcodes.DRETURN);
                break;
            default: // Object / tableau
                mv.visitInsn(Opcodes.ACONST_NULL);
                mv.visitInsn(Opcodes.ARETURN);
                break;
        }

        mv.visitMaxs(2, 20);
        mv.visitEnd();
    }

    // ─── Génération de GdxInitializer ────────────────────────────────────────

    static byte[] generateGdxInitializer() {
        ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_FRAMES | ClassWriter.COMPUTE_MAXS);
        cw.visit(Opcodes.V11,
                 Opcodes.ACC_PUBLIC | Opcodes.ACC_SUPER,
                 "GdxInitializer", null,
                 "java/lang/Object", null);

        // Constructeur
        MethodVisitor ctor = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
        ctor.visitCode();
        ctor.visitVarInsn(Opcodes.ALOAD, 0);
        ctor.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
        ctor.visitInsn(Opcodes.RETURN);
        ctor.visitMaxs(1, 1);
        ctor.visitEnd();

        // static void init()
        MethodVisitor mv = cw.visitMethod(
                Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, "init", "()V", null, null);
        mv.visitCode();

        // WebGL20 partagé entre champs g et h (instancié une fois)
        mv.visitTypeInsn(Opcodes.NEW, "WebGL20");
        mv.visitInsn(Opcodes.DUP);
        mv.visitMethodInsn(Opcodes.INVOKESPECIAL, "WebGL20", "<init>", "()V", false);
        mv.visitInsn(Opcodes.DUP); // gl20 reste sur la pile

        mv.visitFieldInsn(Opcodes.PUTSTATIC, GDX_CLASS, "g", "Lcom/badlogic/gdx/graphics/f;");
        mv.visitFieldInsn(Opcodes.PUTSTATIC, GDX_CLASS, "h", "Lcom/badlogic/gdx/graphics/f;");

        // Instancier et affecter chaque stub
        for (String[] field : GDX_FIELDS) {
            String fieldName = field[0];
            String fieldDesc = field[1];
            String stubClass  = field[2];

            // Sauter g et h (déjà traités ci-dessus)
            if (fieldName.equals("g") || fieldName.equals("h")) continue;

            mv.visitTypeInsn(Opcodes.NEW, stubClass);
            mv.visitInsn(Opcodes.DUP);
            mv.visitMethodInsn(Opcodes.INVOKESPECIAL, stubClass, "<init>", "()V", false);
            mv.visitFieldInsn(Opcodes.PUTSTATIC, GDX_CLASS, fieldName, fieldDesc);
        }

        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(4, 0);
        mv.visitEnd();

        cw.visitEnd();
        return cw.toByteArray();
    }

    // ─── Génération de java/lang/Character$UnicodeBlock ─────────────────────
    // TeaVM 0.13.1 ne fournit pas cette inner-class de Character.
    // Le code du jeu l'utilise pour la mise en page CJK (DFFormatLabel.doLayout).
    // Le stub retourne null pour of(int) et null pour les constantes CJK,
    // donc les comparaisons ==  seront fausses → code CJK court-circuité (correct pour le web).

    static final String[] CJK_FIELDS = {
        "CJK_COMPATIBILITY",
        "CJK_COMPATIBILITY_FORMS",
        "CJK_COMPATIBILITY_IDEOGRAPHS",
        "CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT",
        "CJK_RADICALS_SUPPLEMENT",
        "CJK_SYMBOLS_AND_PUNCTUATION",
        "CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A",
        "CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B",
        "ENCLOSED_CJK_LETTERS_AND_MONTHS",
        "IDEOGRAPHIC_DESCRIPTION_CHARACTERS",
        "KANGXI_RADICALS",
    };

    static byte[] generateCharacterUnicodeBlock() {
        final String SELF = "java/lang/Character$UnicodeBlock";

        ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_FRAMES | ClassWriter.COMPUTE_MAXS);
        cw.visit(Opcodes.V11,
                 Opcodes.ACC_PUBLIC | Opcodes.ACC_SUPER | Opcodes.ACC_FINAL,
                 SELF, null, "java/lang/Object",
                 new String[]{"java/io/Serializable"});

        // Champs statiques (null par défaut — valeurs initialisées dans <clinit>)
        for (String f : CJK_FIELDS) {
            cw.visitField(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_FINAL,
                f, "L" + SELF + ";", null, null).visitEnd();
        }

        // Constructeur privé
        MethodVisitor ctor = cw.visitMethod(Opcodes.ACC_PRIVATE, "<init>", "()V", null, null);
        ctor.visitCode();
        ctor.visitVarInsn(Opcodes.ALOAD, 0);
        ctor.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
        ctor.visitInsn(Opcodes.RETURN);
        ctor.visitMaxs(1, 1);
        ctor.visitEnd();

        // <clinit> : instancie chaque constante
        MethodVisitor clinit = cw.visitMethod(Opcodes.ACC_STATIC, "<clinit>", "()V", null, null);
        clinit.visitCode();
        for (String f : CJK_FIELDS) {
            clinit.visitTypeInsn(Opcodes.NEW, SELF);
            clinit.visitInsn(Opcodes.DUP);
            clinit.visitMethodInsn(Opcodes.INVOKESPECIAL, SELF, "<init>", "()V", false);
            clinit.visitFieldInsn(Opcodes.PUTSTATIC, SELF, f, "L" + SELF + ";");
        }
        clinit.visitInsn(Opcodes.RETURN);
        clinit.visitMaxs(2, 0);
        clinit.visitEnd();

        // static Character$UnicodeBlock of(int codePoint) → return null
        MethodVisitor ofMv = cw.visitMethod(
            Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, "of",
            "(I)L" + SELF + ";", null, null);
        ofMv.visitCode();
        ofMv.visitInsn(Opcodes.ACONST_NULL);
        ofMv.visitInsn(Opcodes.ARETURN);
        ofMv.visitMaxs(1, 1);
        ofMv.visitEnd();

        cw.visitEnd();
        return cw.toByteArray();
    }

    // ─── Écriture d'un .class ────────────────────────────────────────────────

    /** Écrit un fichier .class en utilisant className comme nom simple (sans répertoire). */
    static void writeClass(String className, byte[] bytes) throws Exception {
        File f = new File(outputDir + "/" + className + ".class");
        f.getParentFile().mkdirs();
        try (FileOutputStream fos = new FileOutputStream(f)) {
            fos.write(bytes);
        }
    }

    /** Écrit un fichier .class en utilisant un chemin relatif (ex: java/lang/Foo). */
    static void writeClassWithPath(String internalPath, byte[] bytes) throws Exception {
        File f = new File(outputDir + "/" + internalPath + ".class");
        f.getParentFile().mkdirs();
        try (FileOutputStream fos = new FileOutputStream(f)) {
            fos.write(bytes);
        }
    }
}
