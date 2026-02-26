import org.teavm.tooling.TeaVMTool;
import org.teavm.tooling.TeaVMTargetType;
import org.teavm.vm.TeaVMOptimizationLevel;
import org.teavm.diagnostics.Problem;
import java.io.File;
import java.nio.file.Files;
import java.util.*;

/**
 * Phase 3.3 — Compile DragonSoul (RPGMain) en JavaScript via TeaVM.
 *
 * Nouveautés Phase 3.3 :
 *  - output/resources/ (.tab, .properties extraits de l'APK) dans le classpath
 *    → TeaVM ClassLoaderNativeGenerator les embed dans jl_ClassLoader_resources
 *  - Post-processing du JS généré : 27 patches pour que game.create() termine
 *    sans crash dans Node.js (pas de WebGL, pas de threads, pas d'assets réels)
 */
public class CompileRPGMain {

    public static void main(String[] args) throws Exception {
        String outputDir = System.getProperty("output.dir", "output/web");

        long start = System.currentTimeMillis();
        new File(outputDir).mkdirs();

        System.out.println("=== TeaVM Phase 3.3 — Ressources .tab embarquées ===");
        System.out.println("Output : " + outputDir);

        TeaVMTool tool = new TeaVMTool();
        tool.setTargetType(TeaVMTargetType.JAVASCRIPT);
        tool.setMainClass("DragonSoulLauncher");
        tool.setTargetDirectory(new File(outputDir));
        tool.setObfuscated(false);
        tool.setOptimizationLevel(TeaVMOptimizationLevel.SIMPLE);

        // CLEF : ignorer les classes manquantes (java.net.*, javax.crypto.*, KryoNet, OkHttp...)
        // Ces classes ne sont utilisees que par le code reseau, pas le rendu.
        tool.setStrict(false);
        System.out.println("strict=false active");

        // Phase 3.2 : ClassHolderTransformer qui ajoute les méthodes JDK absentes
        // (Array.newInstance(Class,int[]), UUID(long,long), Thread.getThreadGroup(), etc.)
        tool.getTransformers().add("JdkFixer");
        System.out.println("JdkFixer transformer enregistre");

        // Construction du classpath depuis java.class.path (fourni par Gradle JavaExec)
        // On utilise setClassPath() pour eviter les conflits de classloader avec Gradle
        String classPathStr = System.getProperty("java.class.path");
        System.out.println("Entrees classpath : " + classPathStr.split(File.pathSeparator).length);

        List<File> cp = new ArrayList<>();
        for (String entry : classPathStr.split(File.pathSeparator)) {
            File f = new File(entry);
            if (f.exists()) {
                cp.add(f);
            }
        }
        // Debug : afficher toutes les entrées classpath
        for (File f : cp) {
            if (f.getPath().contains("resources") || f.getPath().contains("stubs")) {
                System.out.println("  CP entry: " + f.getAbsolutePath());
            }
        }
        tool.setClassPath(cp);

        System.out.println("Lancement de la compilation TeaVM...");
        try {
            tool.generate();
            System.out.println("tool.generate() termine normalement");
        } catch (Throwable e) {
            System.out.println("Exception TeaVM : " + e.getClass().getName() + " - " + e.getMessage());
            e.printStackTrace();
        }

        long elapsed = (System.currentTimeMillis() - start) / 1000;
        System.out.println("\n=== RESULTATS DE COMPILATION ===");
        System.out.println("Duree : " + elapsed + "s");

        // Rapport des erreurs — inclure aussi les problèmes non-sévères
        System.out.println("Problemes non-severes : " + tool.getProblemProvider().getProblems().size());

        int severe = 0;
        Map<String, Integer> errorTypes = new TreeMap<>();

        for (Problem p : tool.getProblemProvider().getSevereProblems()) {
            severe++;
            String key = p.getText();
            if (p.getParams() != null && p.getParams().length > 0) {
                key = key + " [" + p.getParams()[0] + "]";
            }
            errorTypes.merge(key, 1, Integer::sum);

            if (severe <= 15) {
                StringBuilder sb = new StringBuilder("  ERREUR: ").append(p.getText());
                if (p.getParams() != null) {
                    sb.append(" [");
                    for (Object o : p.getParams()) sb.append(o).append(" ");
                    sb.append("]");
                }
                if (p.getLocation() != null && p.getLocation().getMethod() != null) {
                    sb.append("\n    @ ").append(p.getLocation().getMethod());
                }
                System.out.println(sb);
            }
        }

        if (severe > 15) {
            System.out.println("  ... et " + (severe - 15) + " autres erreurs");
        }

        System.out.println("Total erreurs severes : " + severe);

        if (!errorTypes.isEmpty()) {
            System.out.println("\nCategories d'erreurs :");
            for (Map.Entry<String, Integer> e : errorTypes.entrySet()) {
                System.out.println("  " + e.getValue() + "x " + e.getKey());
            }
        }

        // ====================================================================
        // Verification du JS genere + post-processing
        // ====================================================================
        File out = new File(outputDir + "/classes.js");
        if (out.exists() && out.length() > 0) {
            long kb = out.length() / 1024;
            System.out.println("\nSUCCES : " + kb + " KB de JavaScript genere !");
            System.out.println("Fichier : " + out.getAbsolutePath());

            // Lire le fichier une seule fois
            String js = Files.readString(out.toPath());

            // Vérifier que des ressources ont bien été embarquées
            int resourceCount = countOccurrences(js, "jl_ClassLoader_resources[\"");
            System.out.println("Ressources embarquées dans jl_ClassLoader_resources : " + resourceCount);

            System.out.println("\n=== POST-PROCESSING (27 patches) ===");
            int patchCount = 0;

            // ------------------------------------------------------------------
            // Fix 0: Normaliser les chemins "path//file" → "path/file"
            //   Le jeu construit parfois des doubles slashes dans getResourceAsStream
            // ------------------------------------------------------------------
            String fix0_old = "$data = jl_ClassLoader_resources[$rt_ustr($name)];";
            String fix0_new = "$data = jl_ClassLoader_resources[$rt_ustr($name).split(\"//\").join(\"/\")];";
            if (js.contains(fix0_old)) {
                js = js.replace(fix0_old, fix0_new);
                patchCount++;
                System.out.println("  Fix 0 OK : normalisation // dans getResourceAsStream");
            } else if (!js.contains(fix0_new)) {
                System.out.println("  Fix 0 WARN : pattern getResourceAsStream non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 1: cpcd_d_a1 — bounds check avant accès tableau hors-borne
            //   TeaVM ne lève pas AIOOBE, accède à undefined → NPE plus loin
            // ------------------------------------------------------------------
            String fix1_old = "                            var$14 = var$12[var$13 + 1 | 0];\n"
                             + "                            $ptr = 19;";
            String fix1_new = "                            if ((var$13 + 1 | 0) >= var$12.length) { $ptr = 21; continue main; } var$14 = var$12[var$13 + 1 | 0];\n"
                             + "                            $ptr = 19;";
            if (js.contains(fix1_old)) {
                js = js.replace(fix1_old, fix1_new);
                patchCount++;
                System.out.println("  Fix 1 OK : cpcd_d_a1 bounds check");
            } else if (!js.contains(fix1_new)) {
                System.out.println("  Fix 1 WARN : pattern cpcd_d_a1 non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 2: cpr_RPGMain_create — cpr_RPG_app reste null si WebApp stub retourne null
            //   Le jeu a besoin de cpr_RPG_app → on le force à pointer sur l'instance game
            // ------------------------------------------------------------------
            String fix2_old = "        cpr_RPG_init();\n        cbg";
            String fix2_new = "        cpr_RPG_init(); if (!cpr_RPG_app) cpr_RPG_app = var$0;\n        cbg";
            if (js.contains(fix2_old)) {
                js = js.replace(fix2_old, fix2_new);
                patchCount++;
                System.out.println("  Fix 2 OK : cpr_RPG_app fallback dans RPGMain_create");
            } else if (!js.contains(fix2_new)) {
                System.out.println("  Fix 2 WARN : pattern cpr_RPG_init non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 4: cbgc_a_h — NPE sur var$0.$f18() quand handle est null
            //   Return 512 (valeur neutre) si l'objet est null
            // ------------------------------------------------------------------
            String fix4_old = "cbgc_a_h = var$0 => {\n"
                             + "    let var$1;\n"
                             + "    var$1 = Long_lo((var$0.$f18()));";
            String fix4_new = "cbgc_a_h = var$0 => {\n"
                             + "    let var$1;\n"
                             + "    if (var$0 === null || var$0 === undefined) return 512;\n"
                             + "    var$1 = Long_lo((var$0.$f18()));";
            if (js.contains(fix4_old)) {
                js = js.replace(fix4_old, fix4_new);
                patchCount++;
                System.out.println("  Fix 4 OK : cbgc_a_h null guard");
            } else if (!js.contains(fix4_new)) {
                System.out.println("  Fix 4 WARN : pattern cbgc_a_h non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 5: cbgc_a_d — NPE sur var$0.$b56() quand handle est null
            //   Return "" (string vide) si l'objet est null
            // ------------------------------------------------------------------
            String fix5_old = "cbgc_a_d = (var$0, var$1) => {\n"
                             + "    let var$2, var$3,";
            String fix5_new = "cbgc_a_d = (var$0, var$1) => {\n"
                             + "    if (var$0 === null || var$0 === undefined) return $rt_s(34);\n"
                             + "    let var$2, var$3,";
            if (js.contains(fix5_old)) {
                js = js.replace(fix5_old, fix5_new);
                patchCount++;
                System.out.println("  Fix 5 OK : cbgc_a_d null guard");
            } else if (!js.contains(fix5_new)) {
                System.out.println("  Fix 5 WARN : pattern cbgc_a_d non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 6: cbggg_t_loadShader — glCreateShader() retourne 0 (stub)
            //   → return -1 → isCompiled=false → throw GdxRuntimeException
            //   Fix : retourner handle fictif 1 pour bypasser GL absent en node.js
            // ------------------------------------------------------------------
            String fix6_old = "        var$1 = var$3.$glCreateShader(var$1);\n"
                             + "        if (!var$1)\n"
                             + "            return (-1);";
            String fix6_new = "        var$1 = var$3.$glCreateShader(var$1);\n"
                             + "        if (!var$1) {\n"
                             + "            return 1; // Fix 6: no WebGL in node.js — fake compiled handle\n"
                             + "        }";
            if (js.contains(fix6_old)) {
                js = js.replace(fix6_old, fix6_new);
                patchCount++;
                System.out.println("  Fix 6 OK : cbggg_t_loadShader fake handle");
            } else if (!js.contains(fix6_new)) {
                System.out.println("  Fix 6 WARN : pattern loadShader non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 7: juc_Executors_newFixedThreadPool — retourne null (stub)
            //   → NPE sur $isShutdown appelé par le système de tâches
            //   Fix : fake ExecutorService avec $submit → fakeFuture (isDone=true)
            // ------------------------------------------------------------------
            String fix7_old = "juc_Executors_newFixedThreadPool = (var$1, var$2) => {\n"
                             + "    var$2 = null;\n"
                             + "    return var$2;\n"
                             + "},";
            String fix7_new = "juc_Executors_newFixedThreadPool = (var$1, var$2) => {\n"
                             + "    // Fix 7: fake ExecutorService for node.js (no real threading)\n"
                             + "    var _fakeFuture = { $isDone: () => 1, $get5: () => null, $get: () => null };\n"
                             + "    return {\n"
                             + "        $isShutdown: () => 0,\n"
                             + "        $submit: (callable) => { return _fakeFuture; }\n"
                             + "    };\n"
                             + "},";
            if (js.contains(fix7_old)) {
                js = js.replace(fix7_old, fix7_new);
                patchCount++;
                System.out.println("  Fix 7 OK : juc_Executors_newFixedThreadPool fake executor");
            } else if (!js.contains(fix7_new)) {
                System.out.println("  Fix 7 WARN : pattern newFixedThreadPool non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 8: cbga_e_finishLoading — boucle infinie (assets jamais chargés)
            //   Node.js n'a pas de thread, assets retournent null → skip le wait
            // ------------------------------------------------------------------
            String fix8_old = "cbga_e_finishLoading = var$0 => {\n"
                             + "    let var$1, $ptr, $tmp;";
            String fix8_new = "cbga_e_finishLoading = var$0 => {\n"
                             + "    // Fix 8: Skip blocking wait — no threading in node.js, assets return null\n"
                             + "    return;\n"
                             + "    let var$1, $ptr, $tmp;";
            if (js.contains(fix8_old)) {
                js = js.replace(fix8_old, fix8_new);
                patchCount++;
                System.out.println("  Fix 8 OK : cbga_e_finishLoading skip");
            } else if (!js.contains(fix8_new)) {
                System.out.println("  Fix 8 WARN : pattern finishLoading non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 9: cbggg_t_linkProgram — pas de WebGL → skip le link
            //   Retourner le handle d'entrée (ou 1 si 0) pour simuler le succès
            // ------------------------------------------------------------------
            String fix9_old = "cbggg_t_linkProgram = (var$0, var$1) => {\n"
                             + "    let var$2, var$3, var$4, $ptr, $tmp;";
            String fix9_new = "cbggg_t_linkProgram = (var$0, var$1) => {\n"
                             + "    // Fix 9+10: no WebGL in node.js — fake link success for any non-(-1) program handle\n"
                             + "    if (var$1 !== -1) { return var$1 || 1; }\n"
                             + "    let var$2, var$3, var$4, $ptr, $tmp;";
            if (js.contains(fix9_old)) {
                js = js.replace(fix9_old, fix9_new);
                patchCount++;
                System.out.println("  Fix 9 OK : cbggg_t_linkProgram fake success");
            } else if (!js.contains(fix9_new)) {
                System.out.println("  Fix 9 WARN : pattern linkProgram non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 10: cbggg_t_createProgram — glCreateProgram() retourne 0
            //   → return (-1) → shader "non compilé" → throw
            //   Fix : return 1 (fake handle) au lieu de -1
            // ------------------------------------------------------------------
            String fix10_old = "        var$1 = cbgub_a_h.$glCreateProgram();\n"
                              + "        if (var$1)\n"
                              + "            return var$1;\n"
                              + "        return (-1);";
            String fix10_new = "        var$1 = cbgub_a_h.$glCreateProgram();\n"
                              + "        if (var$1)\n"
                              + "            return var$1;\n"
                              + "        return 1; // Fix 10: no WebGL in node.js — fake program handle instead of -1";
            if (js.contains(fix10_old)) {
                js = js.replace(fix10_old, fix10_new);
                patchCount++;
                System.out.println("  Fix 10 OK : cbggg_t_createProgram fake handle");
            } else if (!js.contains(fix10_new)) {
                System.out.println("  Fix 10 WARN : pattern createProgram non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 11: cbgu_BufferUtils_newDisposableByteBuffer — retourne null
            //   → NPE sur ByteBuffer.$order1 lors de l'initialisation des buffers
            //   Fix : allouer un vrai ByteBuffer via jn_ByteBuffer_allocateDirect
            // ------------------------------------------------------------------
            String fix11_old = "cbgu_BufferUtils_newDisposableByteBuffer = var$1 => {\n"
                              + "    cbgu_BufferUtils_$callClinit();\n"
                              + "    return null;";
            String fix11_new = "cbgu_BufferUtils_newDisposableByteBuffer = var$1 => {\n"
                              + "    cbgu_BufferUtils_$callClinit();\n"
                              + "    return jn_ByteBuffer_allocateDirect(var$1); // Fix 11: real ByteBuffer instead of null";
            if (js.contains(fix11_old)) {
                js = js.replace(fix11_old, fix11_new);
                patchCount++;
                System.out.println("  Fix 11 OK : cbgu_BufferUtils_newDisposableByteBuffer real ByteBuffer");
            } else if (!js.contains(fix11_new)) {
                System.out.println("  Fix 11 WARN : pattern newDisposableByteBuffer non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 11b: jn_ByteBuffer_order — NPE si this est null
            //   Arrive quand un ByteBuffer.order() est appelé sur un stub null
            // ------------------------------------------------------------------
            String fix11b_old = "jn_ByteBuffer_order = ($this, $bo) => {\n"
                               + "    $this.$order1 = $bo;";
            String fix11b_new = "jn_ByteBuffer_order = ($this, $bo) => {\n"
                               + "    if ($this === null || $this === undefined) return null; // Fix 11: guard\n"
                               + "    $this.$order1 = $bo;";
            if (js.contains(fix11b_old)) {
                js = js.replace(fix11b_old, fix11b_new);
                patchCount++;
                System.out.println("  Fix 11b OK : jn_ByteBuffer_order null guard");
            } else if (!js.contains(fix11b_new)) {
                System.out.println("  Fix 11b WARN : pattern ByteBuffer_order non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 12a: cbgu_ag__init_ — Pool GDX : si la réflexion échoue (a536=null)
            //   Stocker la classe pour un fallback via Platform.newInstance
            // ------------------------------------------------------------------
            String fix12a_old = "        if (var$0.$a536 !== null)\n"
                               + "            return;\n"
                               + "        var$5 = new jl_RuntimeException;";
            String fix12a_new = "        if (var$0.$a536 !== null)\n"
                               + "            return;\n"
                               + "        // Fix 12: fallback — store class ref for otp_Platform_newInstance\n"
                               + "        var$0.$a536_fallbackCls = var$1;\n"
                               + "        return;\n"
                               + "        var$5 = new jl_RuntimeException;";
            if (js.contains(fix12a_old)) {
                js = js.replace(fix12a_old, fix12a_new);
                patchCount++;
                System.out.println("  Fix 12a OK : cbgu_ag__init_ pool fallback");
            } else if (!js.contains(fix12a_new)) {
                System.out.println("  Fix 12a WARN : pattern cbgu_ag__init_ non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 12b: cbgu_ag_newObject — Utiliser le fallback si $a536 est null
            //   Instancier via Platform.newInstance ou new _cls() + $_init_0()
            // ------------------------------------------------------------------
            String fix12b_old = "cbgu_ag_newObject = var$0 => {\n"
                               + "    let var$1, var$2, var$3, var$4, $$je, $ptr, $tmp;\n"
                               + "    $ptr = 0;\n"
                               + "    if ($rt_resuming()) {\n"
                               + "        let $thread = $rt_nativeThread();\n"
                               + "        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();\n"
                               + "    }\n"
                               + "    main: while (true) { switch ($ptr) {\n"
                               + "    case 0:\n"
                               + "        try {";
            String fix12b_new = "cbgu_ag_newObject = var$0 => {\n"
                               + "    let var$1, var$2, var$3, var$4, $$je, $ptr, $tmp;\n"
                               + "    $ptr = 0;\n"
                               + "    if ($rt_resuming()) {\n"
                               + "        let $thread = $rt_nativeThread();\n"
                               + "        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();\n"
                               + "    }\n"
                               + "    main: while (true) { switch ($ptr) {\n"
                               + "    case 0:\n"
                               + "        // Fix 12: fallback to Platform.newInstance when GDX reflection not available\n"
                               + "        if ((var$0.$a536 === undefined || var$0.$a536 === null) && var$0.$a536_fallbackCls) {\n"
                               + "            const _cls12 = jl_Class_getPlatformClass(var$0.$a536_fallbackCls);\n"
                               + "            var$2 = otp_Platform_newInstanceImpl(_cls12);\n"
                               + "            if (var$2 === null) {\n"
                               + "                var$2 = new _cls12();\n"
                               + "                // Also call $_init_0 to properly initialize (e.g., set up $a468 in containers)\n"
                               + "                if (typeof var$2.$_init_0 === 'function') var$2.$_init_0();\n"
                               + "            }\n"
                               + "            return var$2;\n"
                               + "        }\n"
                               + "        try {";
            if (js.contains(fix12b_old)) {
                js = js.replace(fix12b_old, fix12b_new);
                patchCount++;
                System.out.println("  Fix 12b OK : cbgu_ag_newObject fallback");
            } else if (!js.contains(fix12b_new)) {
                System.out.println("  Fix 12b WARN : pattern cbgu_ag_newObject non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 13: $rt_wrapException — null/undefined peut être throwé en JS
            //   Sans guard, err[$rt_javaExceptionProp] → TypeError sur null
            // ------------------------------------------------------------------
            String fix13_old = "$rt_wrapException = err => {\n"
                              + "    let ex = err[$rt_javaExceptionProp];";
            String fix13_new = "$rt_wrapException = err => {\n"
                              + "    if (err === null || err === undefined) { // Fix 13: guard null/undefined thrown exception\n"
                              + "        return $rt_createException($rt_str(\"(JavaScript) null exception thrown\"));\n"
                              + "    }\n"
                              + "    let ex = err[$rt_javaExceptionProp];";
            if (js.contains(fix13_old)) {
                js = js.replace(fix13_old, fix13_new);
                patchCount++;
                System.out.println("  Fix 13 OK : $rt_wrapException null guard");
            } else if (!js.contains(fix13_new)) {
                System.out.println("  Fix 13 WARN : pattern $rt_wrapException non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 14: WebApp_getPreferences — retourne null (stub)
            //   → NPE quand le jeu essaie d'accéder aux préférences (lang, settings...)
            //   Fix : fake Preferences en mémoire (read-only, values=défauts)
            // ------------------------------------------------------------------
            String fix14_old = "WebApp_getPreferences = (var$0, var$1) => {\n"
                              + "    return null;\n"
                              + "},";
            String fix14_new = "WebApp_getPreferences = (var$0, var$1) => {\n"
                              + "    // Fix 14: return fake Preferences (empty, read-only) — no storage in node.js\n"
                              + "    if (!WebApp._fakePrefs) {\n"
                              + "        WebApp._fakePrefs = {};\n"
                              + "    }\n"
                              + "    const name = var$1 && var$1.$data ? String.fromCharCode(...Array.from(var$1.$data)) : String(var$1);\n"
                              + "    if (!WebApp._fakePrefs[name]) {\n"
                              + "        WebApp._fakePrefs[name] = {\n"
                              + "            $e: (k) => 0,          // containsKey → false\n"
                              + "            $a42: (k) => 0,        // getBoolean → false\n"
                              + "            $b: (k) => $rt_s(34),  // getString → \"\"\n"
                              + "            $c: (k) => 0,          // getInteger → 0\n"
                              + "            $d: (k) => 0,          // getLong → 0\n"
                              + "            $f: (k) => 0.0,        // getFloat → 0.0\n"
                              + "            $g: () => null,        // get → null\n"
                              + "            $flush0: () => {},     // flush\n"
                              + "            $a43: (k, v) => WebApp._fakePrefs[name],  // putBoolean(key, value)\n"
                              + "            $a79: (k, v) => WebApp._fakePrefs[name],  // putInteger(key, value)\n"
                              + "            $putFloat: (k, v) => WebApp._fakePrefs[name],\n"
                              + "            $putLong: (k, v) => WebApp._fakePrefs[name],\n"
                              + "            $a82: (k, v) => WebApp._fakePrefs[name],  // putString(key, value)\n"
                              + "            $remove: (k) => WebApp._fakePrefs[name],\n"
                              + "            $a9: () => {},                              // flush()\n"
                              + "            $b33: (k) => 0,                            // getInteger(key) → 0\n"
                              + "        };\n"
                              + "    }\n"
                              + "    return WebApp._fakePrefs[name];\n"
                              + "},";
            if (js.contains(fix14_old)) {
                js = js.replace(fix14_old, fix14_new);
                patchCount++;
                System.out.println("  Fix 14 OK : WebApp_getPreferences fake Preferences");
            } else if (!js.contains(fix14_new)) {
                System.out.println("  Fix 14 WARN : pattern WebApp_getPreferences non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 16: jt_Collator_getInstance — retourne null (stub)
            //   → NPE quand le jeu trie des chaînes (UI, listing)
            //   Fix : fake Collator avec $compare = comparaison alphanumérique neutre
            // ------------------------------------------------------------------
            String fix16_old = "jt_Collator_getInstance = var$1 => {\n"
                              + "    var$1 = null;\n"
                              + "    return var$1;";
            String fix16_new = "jt_Collator_getInstance = var$1 => {\n"
                              + "    // Fix 16: Return fake Collator stub (no ICU/text collation in node.js)\n"
                              + "    return { $setStrength: (s) => {}, $compare: (a, b) => 0, $getStrength: () => 0 };";
            if (js.contains(fix16_old)) {
                js = js.replace(fix16_old, fix16_new);
                patchCount++;
                System.out.println("  Fix 16 OK : jt_Collator_getInstance fake Collator");
            } else if (!js.contains(fix16_new)) {
                System.out.println("  Fix 16 WARN : pattern Collator_getInstance non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 17: ju_Currency_getInstance0 — throw pour devises inconnues (CYP…)
            //   Le jeu gère les cas Currency=null plus loin → return null
            // ------------------------------------------------------------------
            String fix17_old = "        if ($currency !== null)\n"
                              + "            return $currency;\n"
                              + "        var$2 = new jl_IllegalArgumentException;";
            String fix17_new = "        if ($currency !== null)\n"
                              + "            return $currency;\n"
                              + "        // Fix 17: Return null for unknown currencies (e.g. CYP) instead of throwing\n"
                              + "        return null;\n"
                              + "        var$2 = new jl_IllegalArgumentException;";
            if (js.contains(fix17_old)) {
                js = js.replace(fix17_old, fix17_new);
                patchCount++;
                System.out.println("  Fix 17 OK : ju_Currency_getInstance0 return null");
            } else if (!js.contains(fix17_new)) {
                System.out.println("  Fix 17 WARN : pattern Currency_getInstance0 non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 18: cbga_e_get — asset type non trouvé → throw GdxRuntimeException
            //   Pas d'assets en node.js → return null
            // ------------------------------------------------------------------
            String fix18_old = "                $ptr = 3;\n"
                              + "                continue main;\n"
                              + "            }\n"
                              + "            var$2 = new cbgu_l;\n"
                              + "            var$1 = (jl_StringBuilder__init_($rt_s(1237))).$append1(var$1);\n"
                              + "            $ptr = 4;\n"
                              + "            continue main;\n"
                              + "        } catch ($$e) {";
            String fix18_new = "                $ptr = 3;\n"
                              + "                continue main;\n"
                              + "            }\n"
                              + "            // Fix 18: asset type not found → return null instead of throwing\n"
                              + "            jl_Object_monitorExit(var$0);\n"
                              + "            return null;\n"
                              + "            var$2 = new cbgu_l;\n"
                              + "            var$1 = (jl_StringBuilder__init_($rt_s(1237))).$append1(var$1);\n"
                              + "            $ptr = 4;\n"
                              + "            continue main;\n"
                              + "        } catch ($$e) {";
            if (js.contains(fix18_old)) {
                js = js.replace(fix18_old, fix18_new);
                patchCount++;
                System.out.println("  Fix 18 OK : cbga_e_get type not found return null");
            } else if (!js.contains(fix18_new)) {
                System.out.println("  Fix 18 WARN : pattern cbga_e_get type-not-found non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 18b: cbga_e_get — filename non trouvé dans la type-map → throw
            //   Pas d'assets → return null
            // ------------------------------------------------------------------
            String fix18b_old = "                    var$2 = new cbgu_l;\n"
                               + "                    var$1 = (jl_StringBuilder__init_($rt_s(1237))).$append1(var$1);\n"
                               + "                    $ptr = 5;\n"
                               + "                    continue main;";
            String fix18b_new = "                    // Fix 18b: asset filename not found → return null instead of throwing\n"
                               + "                    jl_Object_monitorExit(var$0);\n"
                               + "                    return null;";
            if (js.contains(fix18b_old)) {
                js = js.replace(fix18b_old, fix18b_new);
                patchCount++;
                System.out.println("  Fix 18b OK : cbga_e_get filename not found return null");
            } else if (!js.contains(fix18b_new)) {
                System.out.println("  Fix 18b WARN : pattern cbga_e_get filename-not-found non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 18c: cbgssu_h_addRegions — NPE si atlas est null
            //   Le skin essaie d'ajouter des régions d'un atlas non chargé
            // ------------------------------------------------------------------
            String fix18c_old = "cbgssu_h_addRegions = (var$0, var$1) => {\n"
                               + "    let var$2, var$3, var$4, var$5, var$6, $ptr, $tmp;\n"
                               + "    $ptr = 0;\n"
                               + "    if ($rt_resuming()) {\n"
                               + "        let $thread = $rt_nativeThread();\n"
                               + "        $ptr = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();\n"
                               + "    }\n"
                               + "    main: while (true) { switch ($ptr) {\n"
                               + "    case 0:\n"
                               + "        var$2 = cbggg_n_a0(var$1);";
            String fix18c_new = "cbgssu_h_addRegions = (var$0, var$1) => {\n"
                               + "    let var$2, var$3, var$4, var$5, var$6, $ptr, $tmp;\n"
                               + "    $ptr = 0;\n"
                               + "    if ($rt_resuming()) {\n"
                               + "        let $thread = $rt_nativeThread();\n"
                               + "        $ptr = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();\n"
                               + "    }\n"
                               + "    main: while (true) { switch ($ptr) {\n"
                               + "    case 0:\n"
                               + "        if (var$1 === null || var$1 === undefined) return; // Fix 18c: null atlas guard\n"
                               + "        var$2 = cbggg_n_a0(var$1);";
            if (js.contains(fix18c_old)) {
                js = js.replace(fix18c_old, fix18c_new);
                patchCount++;
                System.out.println("  Fix 18c OK : cbgssu_h_addRegions null atlas guard");
            } else if (!js.contains(fix18c_new)) {
                System.out.println("  Fix 18c WARN : pattern cbgssu_h_addRegions non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 18d: cbga_e_get0 — assetType non trouvé → throw (ptr=4)
            //   Pas d'assets → return null après monitorExit
            // ------------------------------------------------------------------
            String fix18d_old = "                var$3 = var$0.$assets;\n"
                               + "                $ptr = 3;\n"
                               + "                continue main;\n"
                               + "            }\n"
                               + "            var$2 = new cbgu_l;\n"
                               + "            var$1 = (jl_StringBuilder__init_($rt_s(1237))).$append1(var$1);\n"
                               + "            $ptr = 4;\n"
                               + "            continue main;";
            String fix18d_new = "                var$3 = var$0.$assets;\n"
                               + "                $ptr = 3;\n"
                               + "                continue main;\n"
                               + "            }\n"
                               + "            // Fix 18d: assetType not found → return null\n"
                               + "            jl_Object_monitorExit(var$0);\n"
                               + "            return null;";
            if (js.contains(fix18d_old)) {
                js = js.replace(fix18d_old, fix18d_new);
                patchCount++;
                System.out.println("  Fix 18d OK : cbga_e_get0 assetType not found return null");
            } else if (!js.contains(fix18d_new)) {
                System.out.println("  Fix 18d WARN : pattern cbga_e_get0 assetType non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 18e: cbga_e_get0 — filename non trouvé dans type map → throw (ptr=6)
            // ------------------------------------------------------------------
            String fix18e_old = "                    var$2 = new cbgu_l;\n"
                               + "                    var$1 = (jl_StringBuilder__init_($rt_s(1237))).$append1(var$1);\n"
                               + "                    $ptr = 6;\n"
                               + "                    continue main;";
            String fix18e_new = "                    // Fix 18e: asset filename not in type map → return null\n"
                               + "                    jl_Object_monitorExit(var$0);\n"
                               + "                    return null;";
            if (js.contains(fix18e_old)) {
                js = js.replace(fix18e_old, fix18e_new);
                patchCount++;
                System.out.println("  Fix 18e OK : cbga_e_get0 filename not in map return null");
            } else if (!js.contains(fix18e_new)) {
                System.out.println("  Fix 18e WARN : pattern cbga_e_get0 filename-not-in-map non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 18f: cbga_e_get0 — inner lookup null → throw (ptr=7)
            // ------------------------------------------------------------------
            String fix18f_old = "                    var$2 = new cbgu_l;\n"
                               + "                    var$1 = (jl_StringBuilder__init_($rt_s(1237))).$append1(var$1);\n"
                               + "                    $ptr = 7;\n"
                               + "                    continue main;";
            String fix18f_new = "                    // Fix 18f: inner lookup null → return null\n"
                               + "                    jl_Object_monitorExit(var$0);\n"
                               + "                    return null;";
            if (js.contains(fix18f_old)) {
                js = js.replace(fix18f_old, fix18f_new);
                patchCount++;
                System.out.println("  Fix 18f OK : cbga_e_get0 inner lookup null return null");
            } else if (!js.contains(fix18f_new)) {
                System.out.println("  Fix 18f WARN : pattern cbga_e_get0 inner-lookup non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 19: cbgssu_h_add0 — NPE si l'asset (var$2) est null
            //   Le skin essaie d'ajouter un asset non chargé
            // ------------------------------------------------------------------
            String fix19_old = "cbgssu_h_add0 = (var$0, var$1, var$2) => {\n"
                              + "    let var$3, $ptr, $tmp;\n"
                              + "    $ptr = 0;\n"
                              + "    if ($rt_resuming()) {\n"
                              + "        let $thread = $rt_nativeThread();\n"
                              + "        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();\n"
                              + "    }\n"
                              + "    main: while (true) { switch ($ptr) {\n"
                              + "    case 0:\n"
                              + "        var$3 = jl_Object_getClass(var$2);";
            String fix19_new = "cbgssu_h_add0 = (var$0, var$1, var$2) => {\n"
                              + "    let var$3, $ptr, $tmp;\n"
                              + "    $ptr = 0;\n"
                              + "    if ($rt_resuming()) {\n"
                              + "        let $thread = $rt_nativeThread();\n"
                              + "        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();\n"
                              + "    }\n"
                              + "    main: while (true) { switch ($ptr) {\n"
                              + "    case 0:\n"
                              + "        if (var$2 === null || var$2 === undefined) return; // Fix 19: skip null asset in Skin.add\n"
                              + "        var$3 = jl_Object_getClass(var$2);";
            if (js.contains(fix19_old)) {
                js = js.replace(fix19_old, fix19_new);
                patchCount++;
                System.out.println("  Fix 19 OK : cbgssu_h_add0 null asset guard");
            } else if (!js.contains(fix19_new)) {
                System.out.println("  Fix 19 WARN : pattern cbgssu_h_add0 non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 20: cpru_RPGSkin_synchronizedLoad — atlas non trouvé → throw
            //   Pas d'assets → retourner silencieusement
            // ------------------------------------------------------------------
            String fix20_old = "                var$3 = new cbgu_l;\n"
                              + "                var$1 = (jl_StringBuilder__init_($rt_s(15958))).$append1(var$1);\n"
                              + "                $ptr = 6;\n"
                              + "                continue main;";
            String fix20_new = "                // Fix 20: atlas not found → silently return (no assets in node.js)\n"
                              + "                return;";
            if (js.contains(fix20_old)) {
                js = js.replace(fix20_old, fix20_new);
                patchCount++;
                System.out.println("  Fix 20 OK : cpru_RPGSkin_synchronizedLoad silently return");
            } else if (!js.contains(fix20_new)) {
                System.out.println("  Fix 20 WARN : pattern RPGSkin_synchronizedLoad non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 21a: cbgssu_h_getRegion — région non trouvée → throw
            //   Le jeu gère Region=null plus loin → return null
            // ------------------------------------------------------------------
            String fix21a_old = "        var$3 = new cbgu_l;\n"
                               + "        var$1 = (jl_StringBuilder__init_($rt_s(1948))).$append1(var$1);\n"
                               + "        $ptr = 4;\n"
                               + "        continue main;";
            String fix21a_new = "        // Fix 21a: getRegion not found → return null instead of throwing\n"
                               + "        return null;";
            if (js.contains(fix21a_old)) {
                js = js.replace(fix21a_old, fix21a_new);
                patchCount++;
                System.out.println("  Fix 21a OK : cbgssu_h_getRegion return null");
            } else if (!js.contains(fix21a_new)) {
                System.out.println("  Fix 21a WARN : pattern cbgssu_h_getRegion non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 21b: cbgssu_h_getDrawable — drawable non trouvé → throw
            //   Le jeu gère Drawable=null plus loin → return null
            // ------------------------------------------------------------------
            String fix21b_old = "            var$3 = new cbgu_l;\n"
                               + "            var$1 = (jl_StringBuilder__init_($rt_s(1946))).$append1(var$1);\n"
                               + "            $ptr = 8;\n"
                               + "            continue main;";
            String fix21b_new = "            // Fix 21b: getDrawable not found → return null instead of throwing\n"
                               + "            return null;";
            if (js.contains(fix21b_old)) {
                js = js.replace(fix21b_old, fix21b_new);
                patchCount++;
                System.out.println("  Fix 21b OK : cbgssu_h_getDrawable return null");
            } else if (!js.contains(fix21b_new)) {
                System.out.println("  Fix 21b WARN : pattern cbgssu_h_getDrawable non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 22: cbgssu_h_getDrawable — région récupérée peut être null
            //   Avant instanceof check, vérifier null pour éviter NPE
            // ------------------------------------------------------------------
            String fix22_old = "                            var$4 = $tmp;\n"
                              + "                            if (var$4 instanceof cbggg_n$a) {";
            String fix22_new = "                            var$4 = $tmp;\n"
                              + "                            if (var$4 === null) break c; // Fix 22: null region → fallthrough\n"
                              + "                            if (var$4 instanceof cbggg_n$a) {";
            if (js.contains(fix22_old)) {
                js = js.replace(fix22_old, fix22_new);
                patchCount++;
                System.out.println("  Fix 22 OK : cbgssu_h_getDrawable null region guard");
            } else if (!js.contains(fix22_new)) {
                System.out.println("  Fix 22 WARN : pattern cbgssu_h_getDrawable null-region non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 25 sub: cpr_RPGMain_getNativeAccess — $nativeAccess peut être null
            //   Retourner le stub _fakeNativeAccess défini plus bas
            // ------------------------------------------------------------------
            String fix25sub_old = "cpr_RPGMain_getNativeAccess = var$0 => {\n"
                                 + "    return var$0.$nativeAccess;\n"
                                 + "},";
            String fix25sub_new = "cpr_RPGMain_getNativeAccess = var$0 => {\n"
                                 + "    return var$0.$nativeAccess || _fakeNativeAccess; // Fix 25: stub when null\n"
                                 + "},";
            if (js.contains(fix25sub_old)) {
                js = js.replace(fix25sub_old, fix25sub_new);
                patchCount++;
                System.out.println("  Fix 25sub OK : cpr_RPGMain_getNativeAccess stub");
            } else if (!js.contains(fix25sub_new)) {
                System.out.println("  Fix 25sub WARN : pattern getNativeAccess non trouvé");
            }

            // ------------------------------------------------------------------
            // Fixes 15, 23, 24, 25, 26, 27 : Ajout de méthodes prototype manquantes
            //   Insérer après cpr_RPGMain.prototype.$getCurrentAssetDensity = ...
            //   (ligne générée par TeaVM pour les méthodes virtuelles)
            // ------------------------------------------------------------------
            String protoAnchor = "cpr_RPGMain.prototype.$getCurrentAssetDensity = $rt_wrapFunction1(cpr_RPGMain_getCurrentAssetDensity);";
            String protoAdditions = "\n"
                // Fix 15
                + "// Fix 15: Add missing getCachedPreferredLanguage / setCachedPreferredLanguage to RPGMain prototype\n"
                + "cpr_RPGMain.prototype.$getCachedPreferredLanguage = function() { return this.$cachedPreferredLanguage; };\n"
                + "cpr_RPGMain.prototype.$setCachedPreferredLanguage = function(v) { this.$cachedPreferredLanguage = v; };\n"
                // Fix 23
                + "// Fix 23: Add all missing RPGMain getter/setter/action methods to prototype\n"
                + "cpr_RPGMain.prototype.$getGUIShader = function() { return this.$guiShader; };\n"
                + "cpr_RPGMain.prototype.$getCachedTutorialRuneID = function() { return this.$cachedTutorialRuneID; };\n"
                + "cpr_RPGMain.prototype.$setCachedTutorialRuneID = function(v) { this.$cachedTutorialRuneID = v; };\n"
                + "cpr_RPGMain.prototype.$getContestTabOpen = function() { return null; };\n"
                + "cpr_RPGMain.prototype.$getCryptRaid = function() { return this.$cryptRaid; };\n"
                + "cpr_RPGMain.prototype.$getActiveContentUpdate = function() { return null; };\n"
                + "cpr_RPGMain.prototype.$getExpeditionData = function() { return null; };\n"
                + "cpr_RPGMain.prototype.$getHeroesForHire = function() { return this.$heroesForHire; };\n"
                + "cpr_RPGMain.prototype.$getIOSSafeAreaInsets = function() { return null; };\n"
                + "cpr_RPGMain.prototype.$getInstrumentation = function() { return this.$newRelicInstrumentation; };\n"
                + "cpr_RPGMain.prototype.$getPossibleChestDrops = function() { return null; };\n"
                + "cpr_RPGMain.prototype.$getSocialDataManager = function() { return this.$socialDataManager; };\n"
                + "cpr_RPGMain.prototype.$getSocialNetworkManager = function() { return null; };\n"
                + "cpr_RPGMain.prototype.$getTapjoyOfferwall = function() { return null; };\n"
                + "cpr_RPGMain.prototype.$getTitanTempleSummaries = function() { return this.$titanTemples; };\n"
                + "cpr_RPGMain.prototype.$getTweenManager = function() { return this.$tweenManager5; };\n"
                + "cpr_RPGMain.prototype.$getUICommon = function() { return null; };\n"
                + "cpr_RPGMain.prototype.$getWarInfo = function() { return null; };\n"
                + "cpr_RPGMain.prototype.$getWarRedDotInfo = function() { return null; };\n"
                + "cpr_RPGMain.prototype.$getYourGuildInfo = function() { return this.$guildInfo3; };\n"
                + "cpr_RPGMain.prototype.$getFrameRateManager = function() { return this.$frameRateManager; };\n"
                + "cpr_RPGMain.prototype.$getDeviceInfo = function() { return this.$deviceInfo1; };\n"
                + "cpr_RPGMain.prototype.$isRestartPending = function() { return 0; };\n"
                + "cpr_RPGMain.prototype.$setShouldRestart = function(v) {};\n"
                + "cpr_RPGMain.prototype.$setRequestFullWarInfoOnNextLoad = function(v) { this.$requestFullWarInfoOnNextLoad0 = v; };\n"
                + "cpr_RPGMain.prototype.$requestFullWarInfoOnNextLoad = function() { this.$requestFullWarInfoOnNextLoad0 = 1; };\n"
                + "cpr_RPGMain.prototype.$achievementUpdate = function() {};\n"
                + "cpr_RPGMain.prototype.$checkForDelayedBootData = function() {};\n"
                + "cpr_RPGMain.prototype.$showSkipTutorial = function() {};\n"
                + "cpr_RPGMain.prototype.$warnAboutDownload = function() {};\n"
                // Fix 24
                + "cpr_RPGMain.prototype.$handleCachedMessages = function(screen) {}; // Fix 24: no-op (no network in node.js)\n"
                // Fix 26
                + "// Fix 26: stub all NewRelicInstrumentation methods (no New Relic in node.js) — must be AFTER $rt_metadata\n"
                + "cpr_NewRelicInstrumentation.prototype.$startInteraction = function(name) { return null; };\n"
                + "cpr_NewRelicInstrumentation.prototype.$endInteraction = function(token) {};\n"
                + "cpr_NewRelicInstrumentation.prototype.$recordMetric = function(name, cat, val) {};\n"
                + "cpr_NewRelicInstrumentation.prototype.$noticeNetworkRequest = function() {};\n"
                + "cpr_NewRelicInstrumentation.prototype.$noticeNetworkFailure = function() {};\n"
                + "cpr_NewRelicInstrumentation.prototype.$setAttribute = function(k, v) {};\n"
                + "cpr_NewRelicInstrumentation.prototype.$setUserId = function(id) {};\n"
                + "cpr_NewRelicInstrumentation.prototype.$stopInteraction = function(token) {};\n"
                // Fix 27
                + "// Fix 27: WebDeviceInfo stub methods (no real device info in node.js)\n"
                + "WebDeviceInfo.prototype.$getDeviceID = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getDeviceName = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getModel = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getOSVersion = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getResolution = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getAppVersion = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getBundleId = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getPlatform = function() { return $rt_s(34); };\n"
                // Fix 25
                + "// Fix 25: add analyticsTrackScreen no-op and stub getNativeAccess\n"
                + "cpr_RPGMain.prototype.$analyticsTrackScreen = function(name) {};\n"
                + "// Stub NativeAccess object for when $nativeAccess is null\n"
                + "var _fakeNativeAccess = {\n"
                + "    $enablePortrait: function(v) {},\n"
                + "    $enableResizeForKeyboard: function(v) {},\n"
                + "    $setStatusBarColor: function(r,g,b,a) {},\n"
                + "    $vibrate: function(ms) {},\n"
                + "    $keepScreenOn: function(v) {},\n"
                + "    $launchUrl: function(url) {},\n"
                + "    $showKeyboard: function(v) {},\n"
                + "    $hideKeyboard: function() {},\n"
                + "    $setOrientation: function(o) {}\n"
                + "};\n";

            if (js.contains(protoAnchor) && !js.contains("Fix 15: Add missing getCachedPreferredLanguage")) {
                js = js.replace(protoAnchor, protoAnchor + protoAdditions);
                patchCount += 6; // fixes 15, 23, 24, 25, 26, 27
                System.out.println("  Fix 15+23+24+25+26+27 OK : prototype additions RPGMain/NewRelic/WebDeviceInfo");
            } else if (js.contains("Fix 15: Add missing getCachedPreferredLanguage")) {
                System.out.println("  Fix 15+23+24+25+26+27 : déjà appliqués");
            } else {
                System.out.println("  Fix 15+23+24+25+26+27 WARN : anchor prototype getCurrentAssetDensity non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 28: WebGL2 Bridge — injecté DANS le closure TeaVM
            //   Exporte setupWebGL2(canvas) pour connecter les stubs WebGL20
            //   aux vraies API WebGL2 du navigateur (shader, program, buffer, tex)
            //   Fonctionne aussi côté Node.js (skip si gl=null)
            // ------------------------------------------------------------------
            String fix28_anchor = "$rt_exports.main = $rt_export_main;\n}));";
            String fix28_bridge =
                "// =================== WebGL2 Bridge (Phase 3.4) ===================\n"
                + "// Injecté par CompileRPGMain.java — remplace les stubs WebGL20\n"
                + "// par des appels réels au contexte canvas.getContext('webgl2')\n"
                + "function _setupWebGL2Bridge(canvas) {\n"
                + "    const gl = canvas && canvas.getContext ? canvas.getContext('webgl2') : null;\n"
                + "    if (!gl) {\n"
                + "        console.warn('[WebGL2 Bridge] WebGL2 non disponible, stubs conservés');\n"
                + "        return false;\n"
                + "    }\n"
                + "    // Écriture dans un IntBuffer TeaVM — utilise $put3(index, value)\n"
                + "    function writeIntBuf(buf, value) {\n"
                + "        if (!buf) return;\n"
                + "        try { buf.$put3(0, value | 0); } catch(e) {\n"
                + "            try { if (buf.$data) buf.$data[0] = value | 0; } catch(e2) {}\n"
                + "        }\n"
                + "    }\n"
                + "    // Conversion TeaVM String → JS String\n"
                + "    function toJsStr(s) { return s ? ($rt_ustr(s) || '') : ''; }\n"
                + "\n"
                + "    // --- Shaders ---\n"
                + "    WebGL20.prototype.$glCreateShader = function(type) { return gl.createShader(type); };\n"
                + "    WebGL20.prototype.$glShaderSource = function(s, src) { gl.shaderSource(s, toJsStr(src)); };\n"
                + "    WebGL20.prototype.$glCompileShader = function(s) { gl.compileShader(s); };\n"
                + "    WebGL20.prototype.$glDeleteShader = function(s) { gl.deleteShader(s); };\n"
                + "    WebGL20.prototype.$glGetShaderiv = function(s, pname, params) {\n"
                + "        writeIntBuf(params, gl.getShaderParameter(s, pname) ? 1 : 0);\n"
                + "    };\n"
                + "    WebGL20.prototype.$glGetShaderInfoLog = function(s) {\n"
                + "        return $rt_str(gl.getShaderInfoLog(s) || '');\n"
                + "    };\n"
                + "\n"
                + "    // --- Programs ---\n"
                + "    WebGL20.prototype.$glCreateProgram = function() { return gl.createProgram(); };\n"
                + "    WebGL20.prototype.$glAttachShader = function(p, s) { gl.attachShader(p, s); };\n"
                + "    WebGL20.prototype.$glLinkProgram = function(p) { gl.linkProgram(p); };\n"
                + "    WebGL20.prototype.$glUseProgram = function(p) { gl.useProgram(p); };\n"
                + "    WebGL20.prototype.$glDeleteProgram = function(p) { gl.deleteProgram(p); };\n"
                + "    WebGL20.prototype.$glGetProgramiv = function(p, pname, params) {\n"
                + "        writeIntBuf(params, gl.getProgramParameter(p, pname) ? 1 : 0);\n"
                + "    };\n"
                + "    WebGL20.prototype.$glGetProgramInfoLog = function(p) {\n"
                + "        return $rt_str(gl.getProgramInfoLog(p) || '');\n"
                + "    };\n"
                + "    WebGL20.prototype.$glGetAttribLocation = function(p, n) {\n"
                + "        return gl.getAttribLocation(p, toJsStr(n));\n"
                + "    };\n"
                + "    WebGL20.prototype.$glGetUniformLocation = function(p, n) {\n"
                + "        return gl.getUniformLocation(p, toJsStr(n));\n"
                + "    };\n"
                + "    WebGL20.prototype.$glGetActiveAttrib = function(p, i, size, type) {};\n"
                + "    WebGL20.prototype.$glGetActiveUniform = function(p, i, size, type) {};\n"
                + "\n"
                + "    // --- Buffers ---\n"
                + "    WebGL20.prototype.$glGenBuffer = function() { return gl.createBuffer(); };\n"
                + "    WebGL20.prototype.$glBindBuffer = function(t, b) { gl.bindBuffer(t, b); };\n"
                + "    WebGL20.prototype.$glDeleteBuffer = function(b) { gl.deleteBuffer(b); };\n"
                + "    WebGL20.prototype.$glBufferData = function(t, sz, data, usage) {\n"
                + "        gl.bufferData(t, data && data.$data ? data.$data : sz, usage);\n"
                + "    };\n"
                + "    WebGL20.prototype.$glBufferSubData = function(t, off, cnt, data) {\n"
                + "        if (data && data.$data) gl.bufferSubData(t, off, data.$data.subarray(0, cnt));\n"
                + "    };\n"
                + "\n"
                + "    // --- Textures ---\n"
                + "    WebGL20.prototype.$glGenTexture = function() { return gl.createTexture(); };\n"
                + "    WebGL20.prototype.$glBindTexture = function(t, tex) { gl.bindTexture(t, tex); };\n"
                + "    WebGL20.prototype.$glDeleteTexture = function(tex) { gl.deleteTexture(tex); };\n"
                + "    WebGL20.prototype.$glTexImage2D = function(t, lvl, ifmt, w, h, bdr, fmt, type, px) {\n"
                + "        const d = px && px.$data ? new Uint8Array(px.$data.buffer) : null;\n"
                + "        gl.texImage2D(t, lvl, ifmt, w, h, bdr, fmt, type, d);\n"
                + "    };\n"
                + "    WebGL20.prototype.$glTexParameterf = function(t, p, v) { gl.texParameterf(t, p, v); };\n"
                + "    WebGL20.prototype.$glGenerateMipmap = function(t) { gl.generateMipmap(t); };\n"
                + "    WebGL20.prototype.$glPixelStorei = function(p, v) { gl.pixelStorei(p, v); };\n"
                + "    WebGL20.prototype.$glCompressedTexImage2D = function(t, lvl, ifmt, w, h, bdr, sz, d) {\n"
                + "        if (d && d.$data) gl.compressedTexImage2D(t, lvl, ifmt, w, h, bdr, d.$data);\n"
                + "    };\n"
                + "\n"
                + "    // --- Misc ---\n"
                + "    WebGL20.prototype.$glViewport = function(x, y, w, h) { gl.viewport(x, y, w, h); };\n"
                + "    WebGL20.prototype.$glGetIntegerv = function(p, buf) {\n"
                + "        writeIntBuf(buf, gl.getParameter(p) | 0);\n"
                + "    };\n"
                + "    WebGL20.prototype.$glUniform1f = function(loc, v) { gl.uniform1f(loc, v); };\n"
                + "\n"
                + "    // --- WebGraphics dimensions → canvas réelles ---\n"
                + "    WebGraphics.prototype.$getWidth = function() { return canvas.width; };\n"
                + "    WebGraphics.prototype.$getHeight = function() { return canvas.height; };\n"
                + "    WebGraphics.prototype.$getBackBufferWidth = function() { return canvas.width; };\n"
                + "    WebGraphics.prototype.$getBackBufferHeight = function() { return canvas.height; };\n"
                + "    WebGraphics.prototype.$getDensity = function() {\n"
                + "        return typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;\n"
                + "    };\n"
                + "\n"
                + "    const glMethods = Object.getOwnPropertyNames(WebGL20.prototype)\n"
                + "        .filter(p => p.startsWith('$gl')).length;\n"
                + "    console.log('[WebGL2 Bridge] ' + glMethods + ' méthodes GL connectées au contexte réel');\n"
                + "    return true;\n"
                + "}\n"
                + "$rt_exports.setupWebGL2 = _setupWebGL2Bridge;\n"
                + "$rt_exports.$rt_ustr = $rt_ustr;\n"
                + "$rt_exports.$rt_str = $rt_str;\n";

            if (!js.contains("WebGL2 Bridge (Phase 3.4)")) {
                if (js.contains(fix28_anchor)) {
                    js = js.replace(fix28_anchor, fix28_bridge + fix28_anchor);
                    patchCount++;
                    System.out.println("  Fix 28 OK : WebGL2 Bridge injecté dans la closure TeaVM");
                } else {
                    System.out.println("  Fix 28 WARN : anchor $rt_exports.main non trouvé");
                }
            } else {
                System.out.println("  Fix 28 : WebGL2 Bridge déjà présent");
            }

            // ------------------------------------------------------------------
            // Écriture finale — une seule fois après tous les patches
            // ------------------------------------------------------------------
            Files.writeString(out.toPath(), js);
            System.out.println("\nPost-processing terminé : " + patchCount + " patches appliqués");

        } else {
            System.out.println("\nECHEC : Aucun JavaScript genere (erreurs bloquantes)");
        }
    }

    private static int countOccurrences(String text, String pattern) {
        int count = 0;
        int idx = 0;
        while ((idx = text.indexOf(pattern, idx)) != -1) {
            count++;
            idx += pattern.length();
        }
        return count;
    }
}
