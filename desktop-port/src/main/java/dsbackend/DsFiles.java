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

    private static final boolean TRACE = Boolean.getBoolean("DS_TRACE_FILES");

    private static com.badlogic.gdx.c.a abs(File f) {
        if (TRACE) System.out.println("[files] " + (f.exists() ? "OK   " : "MISS ") + f.getPath());
        return new com.badlogic.gdx.c.a(f.getAbsolutePath());
    }

    /** Resolve under {@code root}, but leave already-absolute paths untouched so
     *  the game's own path composition (e.g. fntFile.parent().child(page)) isn't
     *  double-prefixed with the asset root. */
    private static com.badlogic.gdx.c.a under(String root, String path) {
        File f = new File(path);
        return abs(f.isAbsolute() ? f : new File(root, path));
    }

    public com.badlogic.gdx.c.a a(String path) { return under(assetsRoot, path); }   // classpath
    public com.badlogic.gdx.c.a b(String path) { return under(assetsRoot, path); }   // internal
    public com.badlogic.gdx.c.a c(String path) { return under(externalRoot, path); } // external
    public com.badlogic.gdx.c.a d(String path) { return under(localRoot, path); }    // local
    public String a() { return externalRoot + File.separator; }                                 // external path
    public String b() { return localRoot + File.separator; }                                    // local path

    public com.badlogic.gdx.c.a a(String path, com.badlogic.gdx.e.a type) {
        switch (type.ordinal()) {
            case 0: return under(assetsRoot, path);           // Classpath
            case 1: return under(assetsRoot, path);           // Internal
            case 2: return under(externalRoot, path);         // External
            case 3: return new com.badlogic.gdx.c.a(path);    // Absolute
            case 4: return under(localRoot, path);            // Local
            default: return new com.badlogic.gdx.c.a(path);
        }
    }
}
