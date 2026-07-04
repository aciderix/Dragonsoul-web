package dsbackend;

import java.io.File;

/**
 * Desktop Files backend (com.badlogic.gdx.e). Mapping recovered from the Android
 * impl (com.badlogic.gdx.backends.android.f):
 *   a(String)        = classpath(path)
 *   a(String, type)  = getFileHandle(path, type)
 *   a()              = external storage path
 *   b(String)        = internal(path)   ← game assets
 *   b()              = local storage path
 *   c(String)        = external(path)
 *   d(String)        = local(path)
 * FileType enum ordinals: 0 Classpath, 1 Internal, 2 External, 3 Absolute, 4 Local.
 * All handles are created Absolute (java.io.File-backed) so reads hit disk directly.
 */
public final class DsFiles implements com.badlogic.gdx.e {
    private final String assetsRoot;
    private final String externalRoot;
    private final String localRoot;

    public DsFiles(String assetsRoot, String externalRoot, String localRoot) {
        this.assetsRoot = assetsRoot;
        this.externalRoot = externalRoot;
        this.localRoot = localRoot;
        new File(externalRoot).mkdirs();
        new File(localRoot).mkdirs();
    }

    private static com.badlogic.gdx.c.a abs(File f) {
        return new com.badlogic.gdx.c.a(f.getAbsolutePath());
    }

    public com.badlogic.gdx.c.a a(String path) { return abs(new File(assetsRoot, path)); }     // classpath
    public com.badlogic.gdx.c.a b(String path) { return abs(new File(assetsRoot, path)); }     // internal
    public com.badlogic.gdx.c.a c(String path) { return abs(new File(externalRoot, path)); }   // external
    public com.badlogic.gdx.c.a d(String path) { return abs(new File(localRoot, path)); }      // local
    public String a() { return externalRoot + File.separator; }                                 // external path
    public String b() { return localRoot + File.separator; }                                    // local path

    public com.badlogic.gdx.c.a a(String path, com.badlogic.gdx.e.a type) {
        switch (type.ordinal()) {
            case 0: return abs(new File(assetsRoot, path));   // Classpath
            case 1: return abs(new File(assetsRoot, path));   // Internal
            case 2: return abs(new File(externalRoot, path)); // External
            case 3: return new com.badlogic.gdx.c.a(path);    // Absolute
            case 4: return abs(new File(localRoot, path));    // Local
            default: return new com.badlogic.gdx.c.a(path);
        }
    }
}
