package dsbackend;

import java.io.*;
import java.util.Properties;

/**
 * Preferences backend (com.badlogic.gdx.m) backed by a .properties file on disk.
 * Obfuscated method mapping (put* return the Preferences for chaining):
 *   a(k,int)/a(k,long)/a(k,String)/a(k,boolean) = putX
 *   a()          = flush
 *   a(k):boolean = getBoolean(k)   ← single-arg boolean GETTER (verified: the game
 *                  reads missingAdditionalWorld via m.a(String):Z)
 *   b(k)         = getInteger(k)          b(k,int)     = getInteger(k,def)
 *   c(k)         = getLong(k)             b(k,long)    = getLong(k,def)
 *   d(k)         = getString(k)           b(k,String)  = getString(k,def)
 *   e(k):boolean = contains(k)     ← verified: the game does `if (m.e(k)) m.b(k,def)`
 *                                    (contains-then-getBoolean-with-default)
 *                  b(k,boolean) = getBoolean(k,def)
 * NOTE: a(k) and e(k) are easy to swap — both are (String)boolean. contains vs
 * getBoolean was pinned from real call sites, not guessed.
 */
public final class DsPreferences implements com.badlogic.gdx.m {
    private final Properties props = new Properties();
    private final File file;

    public DsPreferences(File dir, String name) {
        this.file = new File(dir, name + ".prefs");
        if (file.exists()) {
            try (InputStream in = new FileInputStream(file)) { props.loadFromXML(in); }
            catch (Exception ignored) { }
        }
    }

    public com.badlogic.gdx.m a(String k, int v) { props.setProperty(k, Integer.toString(v)); return this; }
    public com.badlogic.gdx.m a(String k, long v) { props.setProperty(k, Long.toString(v)); return this; }
    public com.badlogic.gdx.m a(String k, String v) { props.setProperty(k, v); return this; }
    public com.badlogic.gdx.m a(String k, boolean v) { props.setProperty(k, Boolean.toString(v)); return this; }

    public void a() { // flush
        try (OutputStream out = new FileOutputStream(file)) { props.storeToXML(out, null); }
        catch (Exception ignored) { }
    }

    public boolean a(String k) { return b(k, false); } // getBoolean(k)

    public int b(String k) { return b(k, 0); }
    public int b(String k, int def) { try { return Integer.parseInt(props.getProperty(k)); } catch (Exception e) { return def; } }
    public long c(String k) { return b(k, 0L); }
    public long b(String k, long def) { try { return Long.parseLong(props.getProperty(k)); } catch (Exception e) { return def; } }
    public String d(String k) { return b(k, ""); }
    public String b(String k, String def) { String v = props.getProperty(k); return v != null ? v : def; }
    public boolean e(String k) { return props.containsKey(k); } // contains(k)
    public boolean b(String k, boolean def) { String v = props.getProperty(k); return v != null ? Boolean.parseBoolean(v) : def; }
}
