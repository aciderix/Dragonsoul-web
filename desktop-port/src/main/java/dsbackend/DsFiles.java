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

    /** FileType.Classpath (ordinal 0) — reads resolve via the classloader, path()
     *  stays relative. Used for the game's bundled assets (the APK's assets/ dir,
     *  placed on the classpath by the launcher). */
    private static final com.badlogic.gdx.e.a CLASSPATH = com.badlogic.gdx.e.a.a;

    /** Internal/classpath asset: keep the ORIGINAL relative path so the AssetManager
     *  keys it exactly as the game's loaders do (see DsFileHandle). Reads go through
     *  the classpath (assets root added to it by run-desktop.sh). Absolute paths —
     *  which the game only produces for external/local content — fall through to a
     *  plain filesystem handle. */
    private com.badlogic.gdx.c.a internal(String path) {
        if (new File(path).isAbsolute()) return abs(new File(path));
        if (TRACE) System.out.println("[files] CP   " + path);
        return new DsFileHandle(path, CLASSPATH);
    }

    /** Resolve under {@code root} on the real filesystem (external/local storage). */
    private static com.badlogic.gdx.c.a under(String root, String path) {
        File f = new File(path);
        return abs(f.isAbsolute() ? f : new File(root, path));
    }

    public com.badlogic.gdx.c.a a(String path) { return internal(path); }             // classpath
    public com.badlogic.gdx.c.a b(String path) { return internal(path); }             // internal
    public com.badlogic.gdx.c.a c(String path) { return under(externalRoot, path); } // external
    public com.badlogic.gdx.c.a d(String path) { return under(localRoot, path); }    // local
    public String a() { return externalRoot + File.separator; }                                 // external path
    public String b() { return localRoot + File.separator; }                                    // local path

    public com.badlogic.gdx.c.a a(String path, com.badlogic.gdx.e.a type) {
        switch (type.ordinal()) {
            case 0: return internal(path);                    // Classpath
            case 1: return internal(path);                    // Internal
            case 2: return under(externalRoot, path);         // External
            case 3: return new com.badlogic.gdx.c.a(path);    // Absolute
            case 4: return under(localRoot, path);            // Local
            default: return new com.badlogic.gdx.c.a(path);
        }
    }
}
