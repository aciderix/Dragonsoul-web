import org.teavm.tooling.TeaVMTool;
import org.teavm.tooling.TeaVMTargetType;
import org.teavm.vm.TeaVMOptimizationLevel;
import org.teavm.diagnostics.Problem;
import java.io.File;
import java.util.*;

/**
 * Phase 3.1 — Compile DragonSoul (RPGMain) en JavaScript via TeaVM.
 *
 * Utilise le classpath courant (passé par Gradle via -cp) pour inclure :
 *  - Les stubs (commons-logging, NetworkProvider)
 *  - Le launcher (DragonSoulLauncher + WebDeviceInfo)
 *  - Les JARs du jeu (classes1.jar, classes2.jar)
 *  - La classlib TeaVM
 *
 * Exécuté via : gradle buildWeb
 * Sortie attendue : output/web/classes.js (~2-5 Mo)
 */
public class CompileRPGMain {

    public static void main(String[] args) throws Exception {
        String outputDir = System.getProperty("output.dir", "output/web");

        long start = System.currentTimeMillis();
        new File(outputDir).mkdirs();

        System.out.println("=== TeaVM Phase 3.2 — Gdx stubs + game.create() ===");
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

        // Verification du JS genere
        File out = new File(outputDir + "/classes.js");
        if (out.exists() && out.length() > 0) {
            long kb = out.length() / 1024;
            System.out.println("\nSUCCES : " + kb + " KB de JavaScript genere !");
            System.out.println("Fichier : " + out.getAbsolutePath());
        } else {
            System.out.println("\nECHEC : Aucun JavaScript genere (erreurs bloquantes)");
        }
    }
}
