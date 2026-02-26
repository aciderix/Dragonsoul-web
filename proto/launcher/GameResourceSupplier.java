import org.teavm.classlib.ResourceSupplier;
import org.teavm.classlib.ResourceSupplierContext;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Phase 3.3 — Fournit les ressources de données du jeu à TeaVM.
 *
 * TeaVM utilise ServiceLoader pour trouver cette implémentation de ResourceSupplier.
 * supplyResources() retourne les chemins classpath de tous les fichiers .tab et
 * .properties à embarquer dans jl_ClassLoader_resources du JS généré.
 *
 * Les fichiers sont dans output/resources/ (extraits de l'APK par extractGameResources).
 * Chemin d'accès : ClassLoader.getResourceAsStream("com/perblue/rpg/game/data/.../*.tab")
 */
public class GameResourceSupplier implements ResourceSupplier {

    @Override
    public String[] supplyResources(ResourceSupplierContext ctx) {
        List<String> resources = new ArrayList<>();

        // Chercher le répertoire output/resources/ dans le classpath JVM
        String cp = System.getProperty("java.class.path", "");
        for (String entry : cp.split(File.pathSeparator)) {
            File dir = new File(entry);
            if (dir.isDirectory() && dir.getAbsolutePath().endsWith("output/resources")) {
                scanDir(dir, dir, resources);
                break;
            }
        }

        System.out.println("GameResourceSupplier : " + resources.size()
            + " ressources à embarquer dans le JS");
        return resources.toArray(new String[0]);
    }

    private void scanDir(File root, File dir, List<String> results) {
        File[] files = dir.listFiles();
        if (files == null) return;
        for (File f : files) {
            if (f.isDirectory()) {
                scanDir(root, f, results);
            } else {
                String name = f.getName();
                if (name.endsWith(".tab") || name.endsWith(".properties") || name.endsWith(".orig")) {
                    // Chemin relatif à la racine du répertoire resources (style classpath)
                    String path = root.toURI().relativize(f.toURI()).getPath();
                    results.add(path);
                }
            }
        }
    }
}
