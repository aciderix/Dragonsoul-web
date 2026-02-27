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

        // Phase 3.6 : Forcer TeaVM à inclure RPGMain.render() (sinon DCE l'enlève)
        // classesToPreserve marque la classe et toutes ses méthodes virtuelles comme "utilisées"
        tool.getClassesToPreserve().add("com.perblue.rpg.RPGMain");
        System.out.println("classesToPreserve: com.perblue.rpg.RPGMain");

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
            // Fix 4: cbgc_a_h — NPE sur var$0.$f9() quand handle est null
            //   Return 512 (valeur neutre) si l'objet est null
            //   Phase 3.6 : state machine version avec $f9() (anciennement $f18())
            // ------------------------------------------------------------------
            String fix4_old = "cbgc_a_h = var$0 => {\n"
                             + "    let var$1, var$2, $ptr, $tmp;\n"
                             + "    $ptr = 0;\n"
                             + "    if ($rt_resuming()) {\n"
                             + "        let $thread = $rt_nativeThread();\n"
                             + "        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();\n"
                             + "    }\n"
                             + "    main: while (true) { switch ($ptr) {\n"
                             + "    case 0:\n"
                             + "        $ptr = 1;\n"
                             + "    case 1:\n"
                             + "        $tmp = var$0.$f9();";
            String fix4_new = "cbgc_a_h = var$0 => {\n"
                             + "    let var$1, var$2, $ptr, $tmp;\n"
                             + "    if (var$0 === null || var$0 === undefined) return 512;\n"
                             + "    $ptr = 0;\n"
                             + "    if ($rt_resuming()) {\n"
                             + "        let $thread = $rt_nativeThread();\n"
                             + "        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();\n"
                             + "    }\n"
                             + "    main: while (true) { switch ($ptr) {\n"
                             + "    case 0:\n"
                             + "        $ptr = 1;\n"
                             + "    case 1:\n"
                             + "        $tmp = var$0.$f9();";
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
            //   Phase 3.6 : NE PAS court-circuiter si window._webGL2Active est vrai
            //   (le bridge WebGL2 se charge du vrai link GPU)
            // ------------------------------------------------------------------
            String fix9_old = "cbggg_t_linkProgram = (var$0, var$1) => {\n"
                             + "    let var$2, var$3, var$4, $ptr, $tmp;";
            String fix9_new = "cbggg_t_linkProgram = (var$0, var$1) => {\n"
                             + "    // Fix 9: no WebGL in node.js — fake link success\n"
                             + "    // Phase 3.6: skip fake when WebGL2 bridge is active (_webGL2Active flag)\n"
                             + "    if (var$1 !== -1 && (typeof window === 'undefined' || !window._webGL2Active)) { return var$1 || 1; }\n"
                             + "    let var$2, var$3, var$4, $ptr, $tmp;";
            if (js.contains(fix9_old)) {
                js = js.replace(fix9_old, fix9_new);
                patchCount++;
                System.out.println("  Fix 9 OK : cbggg_t_linkProgram WebGL2-aware");
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
            String fix12a_old = "        if (var$0.$a662 !== null)\n"
                               + "            return;\n"
                               + "        var$5 = new jl_RuntimeException;";
            String fix12a_new = "        if (var$0.$a662 !== null)\n"
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
                               + "        if ((var$0.$a662 === undefined || var$0.$a662 === null) && var$0.$a536_fallbackCls) {\n"
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
                              + "    if (err && err.message && err.message.includes('$hashCode')) { // Fix 13b: hashCode crash debug\n"
                              + "        const _errInfo = '[HASHCODE CRASH] msg=' + err.message + ' | stack=' + (err.stack ? err.stack.replace(/\\n/g, ' -> ') : 'none');\n"
                              + "        console.error(_errInfo);\n"
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
                              + "            $e1: (k) => 0,         // contains(key) → false (Fix 45)\n"
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
                              + "            $a115: (k, v) => WebApp._fakePrefs[name],  // putInteger(key, value) — Fix 3.11b\n"
                              + "            $a41: (k) => 0,                             // getBoolean(key) → false\n"
                              + "            $b79: (k) => 0,                             // getInteger(key) → 0\n"
                              + "            $a43b: () => {},                            // flush() variant\n"
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
                              + "            var$1 = (jl_StringBuilder__init_($rt_s(10973))).$append1(var$1);\n"
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
                              + "            var$1 = (jl_StringBuilder__init_($rt_s(10973))).$append1(var$1);\n"
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
                               + "                    var$1 = (jl_StringBuilder__init_($rt_s(10973))).$append1(var$1);\n"
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
                               + "            var$1 = (jl_StringBuilder__init_($rt_s(10973))).$append1(var$1);\n"
                               + "            $ptr = 4;\n"
                               + "            continue main;";
            String fix18d_new = "                var$3 = var$0.$assets;\n"
                               + "                $ptr = 3;\n"
                               + "                continue main;\n"
                               + "            }\n"
                               + "            // Fix 18d: assetType not found → return null\n"
                               + "            jl_Object_monitorExit(var$0);\n"
                               + "            return null;";
            // Fix 18 déjà appliqué à cbga_e_get0 case 2 car le pattern était identique
            // (String.replace remplace toutes les occurrences dans les deux fonctions)
            if (js.contains(fix18d_old)) {
                js = js.replace(fix18d_old, fix18d_new);
                patchCount++;
                System.out.println("  Fix 18d OK : cbga_e_get0 assetType not found return null");
            } else if (js.contains(fix18d_new) || js.contains("// Fix 18: asset type not found")) {
                System.out.println("  Fix 18d : déjà patché (par Fix 18 ou Fix 18d)");
                patchCount++;
            } else {
                System.out.println("  Fix 18d WARN : pattern cbga_e_get0 assetType non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 18e: cbga_e_get0 — filename non trouvé dans type map → throw (ptr=6)
            // ------------------------------------------------------------------
            String fix18e_old = "            var$2 = new cbgu_l;\n"
                               + "            var$1 = (jl_StringBuilder__init_($rt_s(10973))).$append1(var$1);\n"
                               + "            $ptr = 6;\n"
                               + "            continue main;";
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
                               + "                    var$1 = (jl_StringBuilder__init_($rt_s(10973))).$append1(var$1);\n"
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
                              + "                var$1 = (jl_StringBuilder__init_($rt_s(9519))).$append1(var$1);\n"
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
                               + "        var$1 = (jl_StringBuilder__init_($rt_s(9515))).$append1(var$1);\n"
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
                               + "            var$1 = (jl_StringBuilder__init_($rt_s(9513))).$append1(var$1);\n"
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
            //   Insérer après la fin des métadonnées $rt_metadata de cpr_RPGMain
            //   Phase 3.6 : ancre mise à jour (TeaVM ne génère plus de prototype.X = séparés)
            // ------------------------------------------------------------------
            String protoAnchor = "\"$startLoadingMainScreen\", $rt_wrapFunction0(cpr_RPGMain_startLoadingMainScreen)],";
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
                // Fix 41
                + "// Fix 41: $getCurrentAssetDensity — absent du prototype TeaVM RPGMain\n"
                + "//   Appelé dans create() pour choisir le dossier d'assets (HD/XHDI/MDPI)\n"
                + "//   Sur web on renvoie XHDPI (densité élevée = assets HD)\n"
                + "cpr_RPGMain.prototype.$getCurrentAssetDensity = function(var$1) { cpr_AssetDensity_$callClinit(); return cpr_AssetDensity_XHDPI; };\n"
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
                // Phase 3.8: insert AFTER the closing ]); of the $rt_metadata block
                // (not after protoAnchor which is inside the $rt_metadata array)
                int _anchorEnd = js.indexOf(protoAnchor) + protoAnchor.length();
                int _metaClose = js.indexOf("]);", _anchorEnd);
                if (_metaClose >= 0) {
                    js = js.substring(0, _metaClose + 3) + protoAdditions + js.substring(_metaClose + 3);
                    patchCount += 7; // fixes 15, 23, 24, 25, 26, 27, 41
                    System.out.println("  Fix 15+23+24+25+26+27+41 OK : prototype additions RPGMain/NewRelic/WebDeviceInfo + getCurrentAssetDensity");
                } else {
                    System.out.println("  Fix 15+23+24+25+26+27+41 WARN : closing ]); non trouvé après anchor");
                }
            } else if (js.contains("Fix 15: Add missing getCachedPreferredLanguage")) {
                System.out.println("  Fix 15+23+24+25+26+27+41 : déjà appliqués");
            } else {
                System.out.println("  Fix 15+23+24+25+26+27+41 WARN : anchor prototype getCurrentAssetDensity non trouvé");
            }

            // ------------------------------------------------------------------
            // Fix 29: WebFiles_b ($b92 = Files.internal(String)) → GAME_ASSETS lookup
            //   window.GAME_ASSETS must be preloaded (game-assets.js) before classes.js
            //   Returns { _webContent: string } consumed by Fix 30/31
            // ------------------------------------------------------------------
            String fix29_old = "WebFiles_b = (var$0, var$1) => {\n    return null;\n}";
            String fix29_new = "WebFiles_b = (var$0, var$1) => {\n"
                + "    const _p = $rt_ustr(var$1);\n"
                + "    if (typeof GAME_ASSETS !== \"undefined\" && GAME_ASSETS[_p] !== undefined) {\n"
                + "        const _a = GAME_ASSETS[_p];\n"
                + "        if (typeof _a === \"string\") return { _webContent: _a };\n"
                + "        return _a;\n"
                + "    }\n"
                + "    return null;\n"
                + "}";
            if (!js.contains("GAME_ASSETS")) {
                if (js.contains(fix29_old)) {
                    js = js.replace(fix29_old, fix29_new);
                    patchCount++;
                    System.out.println("  Fix 29 OK : WebFiles_b → GAME_ASSETS lookup");
                } else {
                    System.out.println("  Fix 29 WARN : WebFiles_b pattern not found");
                }
            } else {
                System.out.println("  Fix 29 : WebFiles_b déjà patché");
            }

            // ------------------------------------------------------------------
            // Fix 30: cbgc_a_h (FileHandle.length()) — shortcut for _webContent handles
            //   Phase 3.6 : pattern mis à jour pour la version state machine avec $f9()
            // ------------------------------------------------------------------
            String fix30_old = "cbgc_a_h = var$0 => {\n"
                + "    let var$1, var$2, $ptr, $tmp;\n"
                + "    if (var$0 === null || var$0 === undefined) return 512;\n"
                + "    $ptr = 0;\n"
                + "    if ($rt_resuming()) {\n"
                + "        let $thread = $rt_nativeThread();\n"
                + "        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();\n"
                + "    }\n"
                + "    main: while (true) { switch ($ptr) {\n"
                + "    case 0:\n"
                + "        $ptr = 1;\n"
                + "    case 1:\n"
                + "        $tmp = var$0.$f9();";
            String fix30_new = "cbgc_a_h = var$0 => {\n"
                + "    let var$1, var$2, $ptr, $tmp;\n"
                + "    if (var$0 === null || var$0 === undefined) return 512;\n"
                + "    if (var$0._webContent !== undefined) return var$0._webContent.length || 512;\n"
                + "    $ptr = 0;\n"
                + "    if ($rt_resuming()) {\n"
                + "        let $thread = $rt_nativeThread();\n"
                + "        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();\n"
                + "    }\n"
                + "    main: while (true) { switch ($ptr) {\n"
                + "    case 0:\n"
                + "        $ptr = 1;\n"
                + "    case 1:\n"
                + "        $tmp = var$0.$f9();";
            if (!js.contains("_webContent !== undefined) return var$0._webContent.length")) {
                if (js.contains(fix30_old)) {
                    js = js.replace(fix30_old, fix30_new);
                    patchCount++;
                    System.out.println("  Fix 30 OK : cbgc_a_h _webContent shortcut");
                } else {
                    System.out.println("  Fix 30 WARN : cbgc_a_h pattern not found");
                }
            } else {
                System.out.println("  Fix 30 : cbgc_a_h déjà patché");
            }

            // ------------------------------------------------------------------
            // Fix 31: cbgc_a_d (FileHandle.readString()) — shortcut for _webContent handles
            // ------------------------------------------------------------------
            String fix31_old = "cbgc_a_d = (var$0, var$1) => {\n"
                + "    if (var$0 === null || var$0 === undefined) return $rt_s(34);\n"
                + "    let var$2,";
            String fix31_new = "cbgc_a_d = (var$0, var$1) => {\n"
                + "    if (var$0 === null || var$0 === undefined) return $rt_s(34);\n"
                + "    if (var$0._webContent !== undefined) return $rt_str(var$0._webContent);\n"
                + "    let var$2,";
            if (!js.contains("_webContent !== undefined) return $rt_str(var$0._webContent)")) {
                if (js.contains(fix31_old)) {
                    js = js.replace(fix31_old, fix31_new);
                    patchCount++;
                    System.out.println("  Fix 31 OK : cbgc_a_d _webContent shortcut");
                } else {
                    System.out.println("  Fix 31 WARN : cbgc_a_d pattern not found");
                }
            } else {
                System.out.println("  Fix 31 : cbgc_a_d déjà patché");
            }

            // ------------------------------------------------------------------
            // Fix 42: ju_Objects_hashCode — null guard for undefined
            //   In Java, all fields are null by default; in JS, some TeaVM stubs
            //   return undefined instead of null. When undefined is used as a HashMap
            //   key, ju_Objects_hashCode calls $o.$hashCode() on undefined → crash.
            //   Fix: treat undefined like null (hashCode = 0) + log the caller.
            // ------------------------------------------------------------------
            String fix42_old = "ju_Objects_hashCode = $o => {\n"
                + "    let var$2, $ptr, $tmp;\n"
                + "    $ptr = 0;\n"
                + "    if ($rt_resuming()) {\n"
                + "        let $thread = $rt_nativeThread();\n"
                + "        $ptr = $thread.pop();var$2 = $thread.pop();$o = $thread.pop();\n"
                + "    }\n"
                + "    main: while (true) { switch ($ptr) {\n"
                + "    case 0:\n"
                + "        if ($o === null)\n"
                + "            return 0;\n"
                + "        $ptr = 1;\n"
                + "    case 1:\n"
                + "        $tmp = $o.$hashCode();";
            String fix42_new = "ju_Objects_hashCode = $o => {\n"
                + "    let var$2, $ptr, $tmp;\n"
                + "    $ptr = 0;\n"
                + "    if ($rt_resuming()) {\n"
                + "        let $thread = $rt_nativeThread();\n"
                + "        $ptr = $thread.pop();var$2 = $thread.pop();$o = $thread.pop();\n"
                + "    }\n"
                + "    main: while (true) { switch ($ptr) {\n"
                + "    case 0:\n"
                + "        if ($o === null || $o === undefined) // Fix 42: undefined n'est pas null en JS\n"
                + "            return 0;\n"
                + "        $ptr = 1;\n"
                + "    case 1:\n"
                + "        $tmp = $o.$hashCode();";
            if (!js.contains("Fix 42: undefined n")) {
                if (js.contains(fix42_old)) {
                    js = js.replace(fix42_old, fix42_new);
                    patchCount++;
                    System.out.println("  Fix 42 OK : ju_Objects_hashCode undefined guard");
                } else {
                    System.out.println("  Fix 42 WARN : ju_Objects_hashCode pattern not found");
                }
            } else {
                System.out.println("  Fix 42 : ju_Objects_hashCode déjà patché");
            }

            // ------------------------------------------------------------------
            // Fix 43: HashMap/Hashtable — undefined guard on $key.$hashCode()
            //   Java null checks use `=== null` but in JS, undefined !== null.
            //   When a stub/classInit returns undefined instead of a proper object,
            //   any HashMap.put/get with that key crashes at $key.$hashCode().
            //   Fix: add `|| $key === undefined` to existing null guards.
            //   Covered functions:
            //     43a: ju_HashMap_putImpl      (case 0 null guard)
            //     43b: ju_HashMap_entryByKey   (case 0 null guard)
            //     43c: ju_HashMap_removeByKey  (case 0 null guard)
            //     43d: ju_Hashtable_get        (else-if guard before try-block)
            //     43e: ju_Hashtable_getEntry   (else-if guard before main loop)
            // ------------------------------------------------------------------
            if (!js.contains("Fix 43:")) {
                int fix43Count = 0;

                // --- 43a: ju_HashMap_putImpl ---
                String fix43a_old =
                    "ju_HashMap_putImpl = ($this, $key, $value) => {\n"
                    + "    let $entry, var$4, $result, $hash, $index, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();$index = $thread.pop();$hash = $thread.pop();$result = $thread.pop();var$4 = $thread.pop();$entry = $thread.pop();$value = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    main: while (true) { switch ($ptr) {\n"
                    + "    case 0:\n"
                    + "        if ($key === null) {";
                String fix43a_new =
                    "ju_HashMap_putImpl = ($this, $key, $value) => {\n"
                    + "    let $entry, var$4, $result, $hash, $index, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();$index = $thread.pop();$hash = $thread.pop();$result = $thread.pop();var$4 = $thread.pop();$entry = $thread.pop();$value = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    main: while (true) { switch ($ptr) {\n"
                    + "    case 0:\n"
                    + "        if ($key === null || $key === undefined) { // Fix 43: undefined n'est pas null en JS";
                if (js.contains(fix43a_old)) {
                    js = js.replace(fix43a_old, fix43a_new);
                    fix43Count++;
                    System.out.println("  Fix 43a OK : ju_HashMap_putImpl undefined guard");
                } else {
                    System.out.println("  Fix 43a WARN : ju_HashMap_putImpl pattern not found");
                }

                // --- 43b: ju_HashMap_entryByKey ---
                String fix43b_old =
                    "ju_HashMap_entryByKey = ($this, $key) => {\n"
                    + "    let $m, $hash, $index, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();$index = $thread.pop();$hash = $thread.pop();$m = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    main: while (true) { switch ($ptr) {\n"
                    + "    case 0:\n"
                    + "        if ($key === null) {";
                String fix43b_new =
                    "ju_HashMap_entryByKey = ($this, $key) => {\n"
                    + "    let $m, $hash, $index, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();$index = $thread.pop();$hash = $thread.pop();$m = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    main: while (true) { switch ($ptr) {\n"
                    + "    case 0:\n"
                    + "        if ($key === null || $key === undefined) { // Fix 43: undefined n'est pas null en JS";
                if (js.contains(fix43b_old)) {
                    js = js.replace(fix43b_old, fix43b_new);
                    fix43Count++;
                    System.out.println("  Fix 43b OK : ju_HashMap_entryByKey undefined guard");
                } else {
                    System.out.println("  Fix 43b WARN : ju_HashMap_entryByKey pattern not found");
                }

                // --- 43c: ju_HashMap_removeByKey ---
                String fix43c_old =
                    "ju_HashMap_removeByKey = ($this, $key) => {\n"
                    + "    let $index, $last, $entry, $entry_0, $hash, var$7, var$8, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();$hash = $thread.pop();$entry_0 = $thread.pop();$entry = $thread.pop();$last = $thread.pop();$index = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    main: while (true) { switch ($ptr) {\n"
                    + "    case 0:\n"
                    + "        $index = 0;\n"
                    + "        $last = null;\n"
                    + "        if ($key === null) {";
                String fix43c_new =
                    "ju_HashMap_removeByKey = ($this, $key) => {\n"
                    + "    let $index, $last, $entry, $entry_0, $hash, var$7, var$8, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();$hash = $thread.pop();$entry_0 = $thread.pop();$entry = $thread.pop();$last = $thread.pop();$index = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    main: while (true) { switch ($ptr) {\n"
                    + "    case 0:\n"
                    + "        $index = 0;\n"
                    + "        $last = null;\n"
                    + "        if ($key === null || $key === undefined) { // Fix 43: undefined n'est pas null en JS";
                if (js.contains(fix43c_old)) {
                    js = js.replace(fix43c_old, fix43c_new);
                    fix43Count++;
                    System.out.println("  Fix 43c OK : ju_HashMap_removeByKey undefined guard");
                } else {
                    System.out.println("  Fix 43c WARN : ju_HashMap_removeByKey pattern not found");
                }

                // --- 43d: ju_Hashtable_get (no null check — add else-if guard) ---
                String fix43d_old =
                    "ju_Hashtable_get = ($this, $key) => {\n"
                    + "    let $hash, $index, $entry, var$5, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();var$5 = $thread.pop();$entry = $thread.pop();$index = $thread.pop();$hash = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    try {";
                String fix43d_new =
                    "ju_Hashtable_get = ($this, $key) => {\n"
                    + "    let $hash, $index, $entry, var$5, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();var$5 = $thread.pop();$entry = $thread.pop();$index = $thread.pop();$hash = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    } else if ($key === undefined || $key === null) return null; // Fix 43: guard avant monitorEnter\n"
                    + "    try {";
                if (js.contains(fix43d_old)) {
                    js = js.replace(fix43d_old, fix43d_new);
                    fix43Count++;
                    System.out.println("  Fix 43d OK : ju_Hashtable_get undefined guard");
                } else {
                    System.out.println("  Fix 43d WARN : ju_Hashtable_get pattern not found");
                }

                // --- 43e: ju_Hashtable_getEntry (no null check — add else-if guard) ---
                String fix43e_old =
                    "ju_Hashtable_getEntry = ($this, $key) => {\n"
                    + "    let $hash, $index, $entry, var$5, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();var$5 = $thread.pop();$entry = $thread.pop();$index = $thread.pop();$hash = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    main: while (true) { switch ($ptr) {";
                String fix43e_new =
                    "ju_Hashtable_getEntry = ($this, $key) => {\n"
                    + "    let $hash, $index, $entry, var$5, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();var$5 = $thread.pop();$entry = $thread.pop();$index = $thread.pop();$hash = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    } else if ($key === undefined || $key === null) return null; // Fix 43: guard\n"
                    + "    main: while (true) { switch ($ptr) {";
                if (js.contains(fix43e_old)) {
                    js = js.replace(fix43e_old, fix43e_new);
                    fix43Count++;
                    System.out.println("  Fix 43e OK : ju_Hashtable_getEntry undefined guard");
                } else {
                    System.out.println("  Fix 43e WARN : ju_Hashtable_getEntry pattern not found");
                }

                if (fix43Count > 0) patchCount += fix43Count;
                System.out.println("  Fix 43 : " + fix43Count + "/5 sub-patches applied");
            } else {
                System.out.println("  Fix 43 : HashMap/Hashtable undefined guards déjà patchés");
            }

            // ------------------------------------------------------------------
            // Fix 44: More HashMap/Hashtable/WeakHashMap — remaining undefined guards
            //   44a: ju_Hashtable_put        — undefined passes $key !== null check
            //   44b: ju_Hashtable_remove     — no null check before $key.$hashCode()
            //   44c: ju_LinkedHashMap_getOrDefault — if ($key === null) missing undefined
            //   44d: ju_WeakHashMap_get      — same
            //   44e: ju_WeakHashMap_put      — if ($key === null) in if/else, else crashes
            //   44f: ju_WeakHashMap_remove   — same pattern
            // ------------------------------------------------------------------
            if (!js.contains("Fix 44:")) {
                int fix44Count = 0;

                // --- 44a: ju_Hashtable_put — undefined passes $key !== null ---
                // Java Hashtable throws NPE for null keys — let undefined also throw NPE
                String fix44a_old =
                    "ju_Hashtable_put = ($this, $key, $value) => {\n"
                    + "    let $hash, var$4, $index, $entry, $result, var$8, var$9, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();var$9 = $thread.pop();var$8 = $thread.pop();$result = $thread.pop();$entry = $thread.pop();$index = $thread.pop();var$4 = $thread.pop();$hash = $thread.pop();$value = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    try {\n"
                    + "        main: while (true) { switch ($ptr) {\n"
                    + "        case 0:\n"
                    + "            jl_Object_monitorEnter($this);\n"
                    + "            if ($rt_suspending()) {\n"
                    + "                break main;\n"
                    + "            }\n"
                    + "            if ($key !== null && $value !== null) {";
                String fix44a_new =
                    "ju_Hashtable_put = ($this, $key, $value) => {\n"
                    + "    let $hash, var$4, $index, $entry, $result, var$8, var$9, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();var$9 = $thread.pop();var$8 = $thread.pop();$result = $thread.pop();$entry = $thread.pop();$index = $thread.pop();var$4 = $thread.pop();$hash = $thread.pop();$value = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    try {\n"
                    + "        main: while (true) { switch ($ptr) {\n"
                    + "        case 0:\n"
                    + "            jl_Object_monitorEnter($this);\n"
                    + "            if ($rt_suspending()) {\n"
                    + "                break main;\n"
                    + "            }\n"
                    + "            if ($key !== null && $key !== undefined && $value !== null && $value !== undefined) { // Fix 44: undefined guard";
                if (js.contains(fix44a_old)) {
                    js = js.replace(fix44a_old, fix44a_new);
                    fix44Count++;
                    System.out.println("  Fix 44a OK : ju_Hashtable_put undefined guard");
                } else {
                    System.out.println("  Fix 44a WARN : ju_Hashtable_put pattern not found");
                }

                // --- 44b: ju_Hashtable_remove — no null check before $hashCode ---
                String fix44b_old =
                    "ju_Hashtable_remove = ($this, $key) => {\n"
                    + "    let $hash, $index, $last, $entry, $result, var$7, $entry_0, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();$entry_0 = $thread.pop();var$7 = $thread.pop();$result = $thread.pop();$entry = $thread.pop();$last = $thread.pop();$index = $thread.pop();$hash = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    try {";
                String fix44b_new =
                    "ju_Hashtable_remove = ($this, $key) => {\n"
                    + "    let $hash, $index, $last, $entry, $result, var$7, $entry_0, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();$entry_0 = $thread.pop();var$7 = $thread.pop();$result = $thread.pop();$entry = $thread.pop();$last = $thread.pop();$index = $thread.pop();$hash = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    } else if ($key === undefined || $key === null) return null; // Fix 44: guard avant monitorEnter\n"
                    + "    try {";
                if (js.contains(fix44b_old)) {
                    js = js.replace(fix44b_old, fix44b_new);
                    fix44Count++;
                    System.out.println("  Fix 44b OK : ju_Hashtable_remove undefined guard");
                } else {
                    System.out.println("  Fix 44b WARN : ju_Hashtable_remove pattern not found");
                }

                // --- 44c: ju_LinkedHashMap_getOrDefault ---
                String fix44c_old =
                    "ju_LinkedHashMap_getOrDefault = ($this, $key, $defaultValue) => {\n"
                    + "    let $entry, $hash, $index, var$6, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();var$6 = $thread.pop();$index = $thread.pop();$hash = $thread.pop();$entry = $thread.pop();$defaultValue = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    main: while (true) { switch ($ptr) {\n"
                    + "    case 0:\n"
                    + "        if ($key === null) {";
                String fix44c_new =
                    "ju_LinkedHashMap_getOrDefault = ($this, $key, $defaultValue) => {\n"
                    + "    let $entry, $hash, $index, var$6, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();var$6 = $thread.pop();$index = $thread.pop();$hash = $thread.pop();$entry = $thread.pop();$defaultValue = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    main: while (true) { switch ($ptr) {\n"
                    + "    case 0:\n"
                    + "        if ($key === null || $key === undefined) { // Fix 44: undefined guard";
                if (js.contains(fix44c_old)) {
                    js = js.replace(fix44c_old, fix44c_new);
                    fix44Count++;
                    System.out.println("  Fix 44c OK : ju_LinkedHashMap_getOrDefault undefined guard");
                } else {
                    System.out.println("  Fix 44c WARN : ju_LinkedHashMap_getOrDefault pattern not found");
                }

                // --- 44d: ju_WeakHashMap_get ---
                String fix44d_old =
                    "ju_WeakHashMap_get = ($this, $key) => {\n"
                    + "    let $entry, var$3, $index, var$5, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();var$5 = $thread.pop();$index = $thread.pop();var$3 = $thread.pop();$entry = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    main: while (true) { switch ($ptr) {\n"
                    + "    case 0:\n"
                    + "        ju_WeakHashMap_poll($this);\n"
                    + "        if ($key === null) {";
                String fix44d_new =
                    "ju_WeakHashMap_get = ($this, $key) => {\n"
                    + "    let $entry, var$3, $index, var$5, $ptr, $tmp;\n"
                    + "    $ptr = 0;\n"
                    + "    if ($rt_resuming()) {\n"
                    + "        let $thread = $rt_nativeThread();\n"
                    + "        $ptr = $thread.pop();var$5 = $thread.pop();$index = $thread.pop();var$3 = $thread.pop();$entry = $thread.pop();$key = $thread.pop();$this = $thread.pop();\n"
                    + "    }\n"
                    + "    main: while (true) { switch ($ptr) {\n"
                    + "    case 0:\n"
                    + "        ju_WeakHashMap_poll($this);\n"
                    + "        if ($key === null || $key === undefined) { // Fix 44: undefined guard";
                if (js.contains(fix44d_old)) {
                    js = js.replace(fix44d_old, fix44d_new);
                    fix44Count++;
                    System.out.println("  Fix 44d OK : ju_WeakHashMap_get undefined guard");
                } else {
                    System.out.println("  Fix 44d WARN : ju_WeakHashMap_get pattern not found");
                }

                // --- 44e: ju_WeakHashMap_put — two sites: if/else and ternary ---
                // Site 1: if ($key === null) ... else { $index = ($key.$hashCode()...
                String fix44e1_old =
                    "        if ($key === null) {\n"
                    + "            $entry = $this.$elementData2.data[0];\n"
                    + "            while ($entry !== null) {\n"
                    + "                if ($entry.$isNull)\n"
                    + "                    break a;\n"
                    + "                $entry = $entry.$next7;\n"
                    + "            }\n"
                    + "        } else {\n"
                    + "            $index = ($key.$hashCode() & 2147483647) % $this.$elementData2.data.length | 0;";
                String fix44e1_new =
                    "        if ($key === null || $key === undefined) { // Fix 44: undefined guard\n"
                    + "            $entry = $this.$elementData2.data[0];\n"
                    + "            while ($entry !== null) {\n"
                    + "                if ($entry.$isNull)\n"
                    + "                    break a;\n"
                    + "                $entry = $entry.$next7;\n"
                    + "            }\n"
                    + "        } else {\n"
                    + "            $index = ($key.$hashCode() & 2147483647) % $this.$elementData2.data.length | 0;";
                if (js.contains(fix44e1_old)) {
                    js = js.replace(fix44e1_old, fix44e1_new);
                    fix44Count++;
                    System.out.println("  Fix 44e1 OK : ju_WeakHashMap_put null check undefined guard");
                } else {
                    System.out.println("  Fix 44e1 WARN : ju_WeakHashMap_put if/else pattern not found");
                }

                // Site 2: ternary rehash $index = $key === null ? 0 : ($key.$hashCode() ...)
                String fix44e2_old =
                    "        $index = $key === null ? 0 : ($key.$hashCode() & 2147483647) % $this.$elementData2.data.length | 0;";
                String fix44e2_new =
                    "        $index = ($key === null || $key === undefined) ? 0 : ($key.$hashCode() & 2147483647) % $this.$elementData2.data.length | 0; // Fix 44";
                if (js.contains(fix44e2_old)) {
                    js = js.replace(fix44e2_old, fix44e2_new);
                    fix44Count++;
                    System.out.println("  Fix 44e2 OK : ju_WeakHashMap_put ternary undefined guard");
                } else {
                    System.out.println("  Fix 44e2 WARN : ju_WeakHashMap_put ternary pattern not found");
                }

                if (fix44Count > 0) patchCount += fix44Count;
                System.out.println("  Fix 44 : " + fix44Count + "/6 sub-patches applied");
            } else {
                System.out.println("  Fix 44 : WeakHashMap/LinkedHashMap undefined guards déjà patchés");
            }

            // ------------------------------------------------------------------
            // Fix 28: WebGL2 Bridge — injecté DANS le closure TeaVM (Phase 3.6)
            //   Handle registry: int ID ↔ WebGL object (shader, program, buffer, tex…)
            //   Phase 3.6: + window._webGL2Active flag pour Fix 9
            //              + export renderFrame() pour la boucle RAF
            //              + WebGraphics.getDeltaTime()
            //              + stubs audio + texture placeholder
            // ------------------------------------------------------------------
            String fix28_anchor = "$rt_exports.main = $rt_export_main;\n}));";
            String fix28_bridge =
                "// =================== WebGL2 Bridge (Phase 3.6) ===================\n"
                + "// Handle registry: OpenGL ES integer IDs ↔ real WebGL2 objects\n"
                + "function _setupWebGL2Bridge(canvas) {\n"
                + "    const gl = canvas && canvas.getContext ? canvas.getContext('webgl2') : null;\n"
                + "    if (!gl) { console.warn('[WebGL2 Bridge] WebGL2 non disponible'); return false; }\n"
                + "    const _handles = [null]; let _nextId = 1;\n"
                + "    function alloc(obj) { if (!obj) return 0; const id = _nextId++; _handles[id] = obj; return id; }\n"
                + "    function get(id)    { return _handles[id | 0] || null; }\n"
                + "    function free(id)   { _handles[id | 0] = null; }\n"
                + "    function wib(buf, idx, val) {\n"
                + "        try { buf.$put3(idx, val | 0); } catch(e) {\n"
                + "            try { const _bd = buf.data || buf.$data; if (_bd) _bd[idx | 0] = val | 0; } catch(e2) {}\n"
                + "        }\n"
                + "    }\n"
                + "    function str(s) { return s ? ($rt_ustr(s) || '') : ''; }\n"
                + "    function jstr(s) { return $rt_str(s || ''); }\n"
                + "    const P = WebGL20.prototype;\n"
                + "    window._shaderCount = 0; window._programCount = 0; window._drawCallCount = 0;\n"
                + "    P.$glCreateShader    = t      => { window._shaderCount++; return alloc(gl.createShader(t)); };\n"
                + "    P.$glShaderSource    = (s,src) => gl.shaderSource(get(s), str(src));\n"
                + "    P.$glCompileShader   = s      => gl.compileShader(get(s));\n"
                + "    P.$glDeleteShader    = s      => { gl.deleteShader(get(s)); free(s); };\n"
                + "    P.$glGetShaderiv     = (s,p,b) => wib(b, 0, gl.getShaderParameter(get(s), p) ? 1 : 0);\n"
                + "    P.$glGetShaderInfoLog= s      => jstr(gl.getShaderInfoLog(get(s)) || '');\n"
                + "    P.$glCreateProgram   = ()     => { window._programCount++; return alloc(gl.createProgram()); };\n"
                + "    P.$glAttachShader    = (p,s)  => gl.attachShader(get(p), get(s));\n"
                + "    P.$glDetachShader    = (p,s)  => gl.detachShader(get(p), get(s));\n"
                + "    P.$glLinkProgram     = p      => gl.linkProgram(get(p));\n"
                + "    P.$glValidateProgram = p      => gl.validateProgram(get(p));\n"
                + "    P.$glUseProgram      = p      => gl.useProgram(p ? get(p) : null);\n"
                + "    P.$glDeleteProgram   = p      => { gl.deleteProgram(get(p)); free(p); };\n"
                + "    P.$glGetProgramiv    = (p,pn,b) => wib(b, 0, gl.getProgramParameter(get(p), pn) ? 1 : 0);\n"
                + "    P.$glGetProgramInfoLog = p    => jstr(gl.getProgramInfoLog(get(p)) || '');\n"
                + "    P.$glGetAttribLocation  = (p,n) => gl.getAttribLocation(get(p), str(n));\n"
                + "    P.$glGetUniformLocation = (p,n) => alloc(gl.getUniformLocation(get(p), str(n)));\n"
                + "    P.$glGetActiveAttrib    = (p,i,sz,t) => { const a = gl.getActiveAttrib(get(p), i); if (!a) return jstr(''); wib(sz, 0, a.size); wib(t, 0, a.type); return jstr(a.name); };\n"
                + "    P.$glGetActiveUniform   = (p,i,sz,t) => { const u = gl.getActiveUniform(get(p), i); if (!u) return jstr(''); wib(sz, 0, u.size); wib(t, 0, u.type); return jstr(u.name); };\n"
                + "    P.$glUniform1i  = (l,v)       => gl.uniform1i(get(l), v);\n"
                + "    P.$glUniform1f  = (l,v)       => gl.uniform1f(get(l), v);\n"
                + "    P.$glUniform2f  = (l,x,y)     => gl.uniform2f(get(l), x, y);\n"
                + "    P.$glUniform3f  = (l,x,y,z)   => gl.uniform3f(get(l), x, y, z);\n"
                + "    P.$glUniform4f  = (l,x,y,z,w) => gl.uniform4f(get(l), x, y, z, w);\n"
                + "    P.$glUniform2i  = (l,x,y)     => gl.uniform2i(get(l), x, y);\n"
                + "    P.$glUniform4i  = (l,x,y,z,w) => gl.uniform4i(get(l), x, y, z, w);\n"
                + "    function fdat(m) { if (!m) return null; const d = m.data; if (!d) return null; return d instanceof Float32Array ? d : new Float32Array(d); }\n"
                + "    P.$glUniformMatrix4fv = (l,n,t,m) => { const d = fdat(m); if (d) gl.uniformMatrix4fv(get(l), !!t, d); };\n"
                + "    P.$glUniformMatrix3fv = (l,n,t,m) => { const d = fdat(m); if (d) gl.uniformMatrix3fv(get(l), !!t, d); };\n"
                + "    P.$glUniformMatrix2fv = (l,n,t,m) => { const d = fdat(m); if (d) gl.uniformMatrix2fv(get(l), !!t, d); };\n"
                + "    P.$glEnableVertexAttribArray  = l => gl.enableVertexAttribArray(l);\n"
                + "    P.$glDisableVertexAttribArray = l => gl.disableVertexAttribArray(l);\n"
                + "    P.$glVertexAttribPointer = (l,sz,t,norm,str,off) => gl.vertexAttribPointer(l,sz,t,!!norm,str,off);\n"
                + "    P.$glGenBuffers    = (n,b) => { for(let i=0;i<n;i++) wib(b,i,alloc(gl.createBuffer())); };\n"
                + "    P.$glBindBuffer    = (t,b) => gl.bindBuffer(t, b ? get(b) : null);\n"
                + "    P.$glDeleteBuffers = (n,b) => { for(let i=0;i<n;i++){const id=b.data?b.data[i]:0;gl.deleteBuffer(get(id));free(id);} };\n"
                + "    P.$glBufferData    = (t,sz,data,u) => { if(data&&data.data) gl.bufferData(t,data.data,u); else if(sz>0) gl.bufferData(t,sz,u); };\n"
                + "    P.$glBufferSubData = (t,off,cnt,data) => { if(data&&data.data) gl.bufferSubData(t,off,data.data.subarray(0,cnt)); };\n"
                + "    P.$glGenVertexArrays    = (n,b) => { for(let i=0;i<n;i++) wib(b,i,alloc(gl.createVertexArray())); };\n"
                + "    P.$glBindVertexArray    = v => gl.bindVertexArray(v ? get(v) : null);\n"
                + "    P.$glDeleteVertexArrays = (n,b) => { for(let i=0;i<n;i++){const id=b.data?b.data[i]:0;gl.deleteVertexArray(get(id));free(id);} };\n"
                + "    P.$glGenTextures    = (n,b) => { for(let i=0;i<n;i++) wib(b,i,alloc(gl.createTexture())); };\n"
                + "    P.$glBindTexture    = (t,tex) => gl.bindTexture(t, tex ? get(tex) : null);\n"
                + "    P.$glDeleteTextures = (n,b) => { for(let i=0;i<n;i++){const id=b.data?b.data[i]:0;gl.deleteTexture(get(id));free(id);} };\n"
                + "    P.$glActiveTexture  = u => gl.activeTexture(u);\n"
                + "    P.$glTexImage2D     = (t,lv,if_,w,h,b,f,ty,d) => gl.texImage2D(t,lv,if_,w,h,b,f,ty,d&&d.data?d.data:null);\n"
                + "    P.$glTexSubImage2D  = (t,lv,x,y,w,h,f,ty,d) => gl.texSubImage2D(t,lv,x,y,w,h,f,ty,d&&d.data?d.data:null);\n"
                + "    P.$glTexParameteri  = (t,p,v) => gl.texParameteri(t,p,v);\n"
                + "    P.$glTexParameterf  = (t,p,v) => gl.texParameterf(t,p,v);\n"
                + "    P.$glGenerateMipmap = t => gl.generateMipmap(t);\n"
                + "    P.$glPixelStorei    = (p,v) => gl.pixelStorei(p,v);\n"
                + "    P.$glCompressedTexImage2D = (t,lv,if_,w,h,b,sz,d) => { const _w=new Uint8Array([255,255,255,255]); if(d&&d.data){try{gl.compressedTexImage2D(t,lv,if_,w,h,b,d.data);}catch(e){gl.texImage2D(t,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,_w);}}else{gl.texImage2D(t,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,_w);} };\n"
                + "    P.$glGenFramebuffers    = (n,b) => { for(let i=0;i<n;i++) wib(b,i,alloc(gl.createFramebuffer())); };\n"
                + "    P.$glBindFramebuffer    = (t,fb) => gl.bindFramebuffer(t, fb ? get(fb) : null);\n"
                + "    P.$glDeleteFramebuffers = (n,b) => { for(let i=0;i<n;i++){const id=b.data?b.data[i]:0;gl.deleteFramebuffer(get(id));free(id);} };\n"
                + "    P.$glFramebufferTexture2D = (t,at,tt,tex,lv) => gl.framebufferTexture2D(t,at,tt,get(tex),lv);\n"
                + "    P.$glCheckFramebufferStatus = t => gl.checkFramebufferStatus(t);\n"
                + "    P.$glGenRenderbuffers    = (n,b) => { for(let i=0;i<n;i++) wib(b,i,alloc(gl.createRenderbuffer())); };\n"
                + "    P.$glBindRenderbuffer    = (t,rb) => gl.bindRenderbuffer(t, rb ? get(rb) : null);\n"
                + "    P.$glDeleteRenderbuffers = (n,b) => { for(let i=0;i<n;i++){const id=b.data?b.data[i]:0;gl.deleteRenderbuffer(get(id));free(id);} };\n"
                + "    P.$glRenderbufferStorage  = (t,f,w,h) => gl.renderbufferStorage(t,f,w,h);\n"
                + "    P.$glFramebufferRenderbuffer = (t,at,rt,rb) => gl.framebufferRenderbuffer(t,at,rt,get(rb));\n"
                + "    P.$glDrawArrays   = (m,f,c) => { window._drawCallCount++; gl.drawArrays(m,f,c); };\n"
                + "    P.$glDrawElements = (m,c,t,o) => { window._drawCallCount++; gl.drawElements(m,c,t,o); };\n"
                + "    P.$glViewport    = (x,y,w,h) => gl.viewport(x,y,w,h);\n"
                + "    P.$glScissor     = (x,y,w,h) => gl.scissor(x,y,w,h);\n"
                + "    P.$glEnable      = c => { try { gl.enable(c); } catch(e) {} };\n"
                + "    P.$glDisable     = c => { try { gl.disable(c); } catch(e) {} };\n"
                + "    P.$glBlendFunc   = (s,d) => gl.blendFunc(s,d);\n"
                + "    P.$glBlendFuncSeparate = (sf,df,sa,da) => gl.blendFuncSeparate(sf,df,sa,da);\n"
                + "    P.$glBlendEquation = eq => gl.blendEquation(eq);\n"
                + "    P.$glColorMask   = (r,g,b,a) => gl.colorMask(!!r,!!g,!!b,!!a);\n"
                + "    P.$glDepthMask   = f => gl.depthMask(!!f);\n"
                + "    P.$glDepthFunc   = f => gl.depthFunc(f);\n"
                + "    P.$glStencilFunc = (f,r,m) => gl.stencilFunc(f,r,m);\n"
                + "    P.$glStencilOp   = (f,z,p) => gl.stencilOp(f,z,p);\n"
                + "    P.$glCullFace    = m => gl.cullFace(m);\n"
                + "    P.$glClearColor  = (r,g,b,a) => gl.clearColor(r,g,b,a);\n"
                + "    P.$glClearDepthf = d => gl.clearDepth(d);\n"
                + "    P.$glClear       = m => gl.clear(m);\n"
                + "    P.$glLineWidth   = w => { try { gl.lineWidth(w); } catch(e) {} };\n"
                + "    P.$glGetIntegerv = (p,b) => wib(b, 0, gl.getParameter(p) | 0);\n"
                + "    P.$glGetError    = () => gl.getError();\n"
                + "    P.$glFinish      = () => gl.finish();\n"
                + "    P.$glFlush       = () => gl.flush();\n"
                // WebGraphics: dimensions + timing
                + "    if (typeof WebGraphics !== 'undefined') {\n"
                + "        WebGraphics.prototype.$getWidth            = () => canvas.width;\n"
                + "        WebGraphics.prototype.$getHeight           = () => canvas.height;\n"
                + "        WebGraphics.prototype.$getBackBufferWidth  = () => canvas.width;\n"
                + "        WebGraphics.prototype.$getBackBufferHeight = () => canvas.height;\n"
                + "        // getDeltaTime — returns real elapsed time in seconds (target 60fps)\n"
                + "        let _lastFrameMs = performance.now();\n"
                + "        WebGraphics.prototype.$getDeltaTime = function() {\n"
                + "            const now = performance.now();\n"
                + "            const dt = Math.min((now - _lastFrameMs) / 1000.0, 0.1); // cap at 100ms\n"
                + "            _lastFrameMs = now;\n"
                + "            return dt;\n"
                + "        };\n"
                + "        WebGraphics.prototype.$getFramesPerSecond = function() { return 60; };\n"
                + "        WebGraphics.prototype.$getRawDeltaTime = function() { return this.$getDeltaTime(); };\n"
                + "    }\n"
                // Audio stubs — prevent NPE when game tries to play sounds
                + "    if (typeof WebAudio !== 'undefined') {\n"
                + "        // Stub WebAudio methods to prevent crash on sound playback\n"
                + "        WebAudio.prototype.$newSound = function(file) { return _fakeAudioDevice; };\n"
                + "        WebAudio.prototype.$newMusic = function(file) { return _fakeAudioDevice; };\n"
                + "    }\n"
                + "    var _fakeAudioDevice = {\n"
                + "        $play: function() {},\n"
                + "        $stop: function() {},\n"
                + "        $pause: function() {},\n"
                + "        $resume: function() {},\n"
                + "        $dispose: function() {},\n"
                + "        $setLooping: function(v) {},\n"
                + "        $setVolume: function(v) {},\n"
                + "        $setPitch: function(v) {},\n"
                + "        $setPan: function(p,v) {},\n"
                + "        $isPlaying: function() { return 0; },\n"
                + "        $isLooping: function() { return 0; },\n"
                + "        $getVolume: function() { return 1.0; },\n"
                + "        $getPosition: function() { return 0.0; },\n"
                + "        $setPosition: function(p) {},\n"
                + "        $play0: function(v, p, pan) { return -1; }, // Sound.play(float,float,float)\n"
                + "    };\n"
                // Phase 3.6: set flag so Fix 9 lets real GL linkProgram proceed
                + "    window._webGL2Active = true;\n"
                + "    console.log('[WebGL2 Bridge] Phase 3.6 actif — rendu GPU activé, boucle RAF prête');\n"
                + "    return true;\n"
                + "}\n"
                // Fix 45: cbgc_a_b1 (FileHandle.read() → InputStream) — serve _webBytes as ByteArrayInputStream
                + "// Fix 45: cbgc_a_b1 _webBytes → ByteArrayInputStream\n"
                + "if (typeof cbgc_a_b1 === 'function') {\n"
                + "    const _orig_b1 = cbgc_a_b1;\n"
                + "    cbgc_a_b1 = function(var$0) {\n"
                + "        if (var$0 && var$0._webBytes) { const _b=var$0._webBytes,_ba=$rt_createByteArray(_b.length),_bd=_ba.data; for(let _i=0;_i<_b.length;_i++) _bd[_i]=_b[_i]; return ji_ByteArrayInputStream__init_0(_ba); }\n"
                + "        return _orig_b1(var$0);\n"
                + "    };\n"
                + "}\n"
                // Export renderFrame for RAF loop — calls DragonSoulLauncher.renderFrame()
                + "$rt_exports.renderFrame = function() {\n"
                + "    if (typeof DragonSoulLauncher_renderFrame === 'function') {\n"
                + "        DragonSoulLauncher_renderFrame();\n"
                + "    }\n"
                + "};\n"
                + "$rt_exports.setupWebGL2 = _setupWebGL2Bridge;\n"
                + "$rt_exports.$rt_ustr = $rt_ustr;\n"
                + "$rt_exports.$rt_str = $rt_str;\n";

            if (!js.contains("WebGL2 Bridge (Phase 3.6)")) {
                if (js.contains(fix28_anchor)) {
                    js = js.replace(fix28_anchor, fix28_bridge + fix28_anchor);
                    patchCount++;
                    System.out.println("  Fix 28 OK : WebGL2 Bridge Phase 3.6 injecté (renderFrame + _webGL2Active + audio stubs)");
                } else {
                    System.out.println("  Fix 28 WARN : anchor $rt_exports.main non trouvé");
                }
            } else {
                System.out.println("  Fix 28 : WebGL2 Bridge (Phase 3.6) déjà présent");
            }


            // ------------------------------------------------------------------
            // Fix 45: cbgc_a_b1 (FileHandle.read() → InputStream) — _webBytes bypass
            //   Quand WebFiles_b retourne { _webBytes: Uint8Array }, cbgc_a_b1
            //   doit servir ces bytes comme ByteArrayInputStream au lieu d'ouvrir
            //   un vrai fichier (qui n'existe pas en web).
            // ------------------------------------------------------------------
            String fix45_old = "cbgc_a_b1 = var$0 => {\n"
                + "    let var$1, var$2, var$3, var$4, var$5, $$je, $ptr, $tmp;\n"
                + "    $ptr = 0;";
            String fix45_new = "cbgc_a_b1 = var$0 => {\n"
                + "    let var$1, var$2, var$3, var$4, var$5, $$je, $ptr, $tmp;\n"
                + "    if (var$0 && var$0._webBytes) { const _b=var$0._webBytes,_ba=$rt_createByteArray(_b.length),_bd=_ba.data; for(let _i=0;_i<_b.length;_i++) _bd[_i]=_b[_i]; return ji_ByteArrayInputStream__init_0(_ba); }\n"
                + "    $ptr = 0;";
            if (!js.contains("ji_ByteArrayInputStream__init_0(_ba)")) {
                if (js.contains(fix45_old)) {
                    js = js.replace(fix45_old, fix45_new);
                    patchCount++;
                    System.out.println("  Fix 45 OK : cbgc_a_b1 _webBytes → ByteArrayInputStream");
                } else {
                    System.out.println("  Fix 45 WARN : cbgc_a_b1 pattern not found");
                }
            } else {
                System.out.println("  Fix 45 : cbgc_a_b1 déjà patché");
            }

            // ------------------------------------------------------------------
            // Fix 46: prototype stubs AFTER last $rt_metadata — previous Fix 26/27 insertion
            // was before the NewRelicInstrumentation/WebDeviceInfo/BaseScreen $rt_metadata calls
            // which replace cls.prototype entirely, wiping any prior prototype assignments.
            // Solution: insert AFTER "let $rt_booleanArrayCls" (end of all $rt_metadata calls).
            // ------------------------------------------------------------------
            String fix46_anchor = "]);\nlet $rt_booleanArrayCls";
            String fix46_stub = "\n// Phase 3.11c: prototype stubs — AFTER all $rt_metadata calls\n"
                + "cpr_NewRelicInstrumentation.prototype.$startInteraction = function(name) { return null; };\n"
                + "cpr_NewRelicInstrumentation.prototype.$endInteraction = function(token) {};\n"
                + "cpr_NewRelicInstrumentation.prototype.$recordMetric = function(name, cat, val) {};\n"
                + "cpr_NewRelicInstrumentation.prototype.$noticeNetworkRequest = function() {};\n"
                + "cpr_NewRelicInstrumentation.prototype.$noticeNetworkFailure = function() {};\n"
                + "cpr_NewRelicInstrumentation.prototype.$setAttribute = function(k, v) {};\n"
                + "cpr_NewRelicInstrumentation.prototype.$setUserId = function(id) {};\n"
                + "cpr_NewRelicInstrumentation.prototype.$stopInteraction = function(token) {};\n"
                + "WebDeviceInfo.prototype.$getDeviceID = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getDeviceName = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getModel = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getOSVersion = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getResolution = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getAppVersion = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getBundleId = function() { return $rt_s(34); };\n"
                + "WebDeviceInfo.prototype.$getPlatform = function() { return $rt_s(34); };\n"
                + "cprus_BaseScreen.prototype.$clearInfoWidget = function() {};\n"
                + "cpr_RPGMain.prototype.$analyticsTrackScreen = function(name) {};\n";
            String fix46_replacement = "]);\n" + fix46_stub + "let $rt_booleanArrayCls";
            if (js.contains(fix46_anchor) && !js.contains("Phase 3.11c: prototype stubs")) {
                js = js.replace(fix46_anchor, fix46_replacement);
                patchCount++;
                System.out.println("  Fix 46 OK : prototype stubs after last $rt_metadata");
            } else if (js.contains("Phase 3.11c: prototype stubs")) {
                System.out.println("  Fix 46 : déjà appliqué");
            } else {
                System.out.println("  Fix 46 WARN : anchor 'let $rt_booleanArrayCls' non trouvé");
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
