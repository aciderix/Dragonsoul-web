import java.io.*;
import java.util.*;
import java.util.jar.*;
import java.util.zip.*;
import org.objectweb.asm.*;
import org.objectweb.asm.commons.*;

/**
 * Resolves the obfuscation's class-vs-package name collisions that make certain
 * types un-nameable in Java source, by renaming the two colliding top-level
 * classes we must reference as packages:
 *   com/badlogic/gdx/b  (Game)              -> com/badlogic/gdx/b_
 *   com/badlogic/gdx/c  (ApplicationListener)-> com/badlogic/gdx/c_
 * This frees the sibling packages `b` (Cursor/Music/Sound) and `c` (FileHandle)
 * so DsFiles/DsAudio/DsGraphics can name com.badlogic.gdx.c.a etc. All references
 * across the whole game (including RPGMain's superclass) are rewritten by ASM.
 *
 * Usage: RemapTool out.jar in1.jar in2.jar ...
 */
public class RemapTool {
    static final Map<String,String> RENAME = new HashMap<>();
    static {
        RENAME.put("com/badlogic/gdx/b", "com/badlogic/gdx/b_");
        RENAME.put("com/badlogic/gdx/c", "com/badlogic/gdx/c_");
        // Gdx singleton holder is com/badlogic/gdx/utils/b/a (package utils.b);
        // rename the colliding class utils/b so the holder becomes nameable.
        RENAME.put("com/badlogic/gdx/utils/b", "com/badlogic/gdx/utils/b_");
    }

    // Classes whose InnerClasses attribute must be preserved because our backend
    // source names their nested types (javac needs the attribute to resolve
    // com.perblue.rpg.social.ISocialNetwork.UserInfoCallback etc.). Both the outer
    // and its inner classes are kept (prefix match) so they stay mutually consistent.
    static final String[] KEEP_INNER_PREFIXES = {
        "com/perblue/rpg/social/ISocialNetwork",
        "com/perblue/rpg/purchasing/IPurchasing",
    };
    static boolean keepInner(String n) {
        for (String p : KEEP_INNER_PREFIXES) if (n.equals(p) || n.startsWith(p + "$")) return true;
        return false;
    }

    static String mapName(String n) {
        String r = RENAME.get(n);
        if (r != null) return r;
        for (Map.Entry<String,String> e : RENAME.entrySet()) {
            String pfx = e.getKey() + "$";
            if (n.startsWith(pfx)) return e.getValue() + "$" + n.substring(pfx.length());
        }
        return n;
    }

    public static void main(String[] args) throws Exception {
        File out = new File(args[0]);
        Remapper remapper = new Remapper() {
            @Override public String map(String internalName) { return mapName(internalName); }
        };
        Set<String> seen = new HashSet<>();
        int classes = 0, renamed = 0;
        try (JarOutputStream jos = new JarOutputStream(new BufferedOutputStream(new FileOutputStream(out)))) {
            for (int i = 1; i < args.length; i++) {
                try (JarFile jf = new JarFile(args[i])) {
                    Enumeration<JarEntry> en = jf.entries();
                    while (en.hasMoreElements()) {
                        JarEntry e = en.nextElement();
                        if (e.isDirectory()) continue;
                        String name = e.getName();
                        if (!name.endsWith(".class")) {
                            if (seen.add(name)) copy(jf, e, jos, name);
                            continue;
                        }
                        byte[] in = readAll(jf.getInputStream(e));
                        ClassReader cr = new ClassReader(in);
                        ClassWriter cw = new ClassWriter(0);
                        ClassRemapper cm = new ClassRemapper(cw, remapper);
                        // Drop InnerClasses attributes on the GAME's own classes only.
                        // dex2jar emits inner/outer pairs whose InnerClasses metadata
                        // disagree (access flags), which the JVM rejects at link time:
                        //   IncompatibleClassChangeError: ... disagree on InnerClasses
                        // (hit loading DamageSource$DamageSourceType from BootData). The
                        // attribute is reflection-only, so removing it is execution-safe.
                        // We keep it for com/badlogic/gdx/* because our backend NAMES
                        // libGDX nested types in source (e.g. com.badlogic.gdx.f.b =
                        // DisplayMode); javac needs the attribute to resolve those. Our
                        // source never names a com/perblue nested type, so stripping there
                        // is safe.
                        boolean stripInner = cr.getClassName().startsWith("com/perblue/")
                                && !keepInner(cr.getClassName());
                        ClassVisitor cv = stripInner
                            ? new ClassVisitor(Opcodes.ASM9, cm) {
                                  @Override public void visitInnerClass(String n, String o, String i2, int a) { }
                              }
                            : cm;
                        cr.accept(cv, 0);
                        byte[] outb = cw.toByteArray();
                        String internal = cr.getClassName();
                        String mapped = mapName(internal);
                        if (!mapped.equals(internal)) renamed++;
                        String entryName = mapped + ".class";
                        if (seen.add(entryName)) {
                            jos.putNextEntry(new JarEntry(entryName));
                            jos.write(outb);
                            jos.closeEntry();
                            classes++;
                        }
                    }
                }
            }
        }
        System.out.println("RemapTool: wrote " + classes + " classes (" + renamed + " renamed) to " + out);
    }

    static void copy(JarFile jf, JarEntry e, JarOutputStream jos, String name) throws IOException {
        jos.putNextEntry(new JarEntry(name));
        jos.write(readAll(jf.getInputStream(e)));
        jos.closeEntry();
    }
    static byte[] readAll(InputStream in) throws IOException {
        ByteArrayOutputStream b = new ByteArrayOutputStream();
        byte[] buf = new byte[8192]; int n;
        while ((n = in.read(buf)) > 0) b.write(buf, 0, n);
        in.close();
        return b.toByteArray();
    }
}
