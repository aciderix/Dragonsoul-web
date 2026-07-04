package dsbackend;

/**
 * Minimal desktop Input backend (com.badlogic.gdx.g). Enough to boot: stores the
 * input processor and reports no active touches. Obfuscated methods:
 *   a()        getX          b()        getY
 *   a(j)       setInputProcessor
 *   a(int)/b(int)/c(int)  key/button queries
 *   c()        isTouched
 *   d()        getCurrentEventTime
 * Real GLFW event wiring is a later step (not needed for first render).
 */
public final class DsInput implements com.badlogic.gdx.g {
    private com.badlogic.gdx.j processor;

    public int a() { return 0; }                       // getX
    public int b() { return 0; }                       // getY
    public void a(com.badlogic.gdx.j p) { this.processor = p; }  // setInputProcessor
    public void a(boolean b) { }
    public void b(boolean b) { }
    public boolean a(int k) { return false; }
    public boolean b(int k) { return false; }
    public boolean c(int k) { return false; }
    public boolean c() { return false; }               // isTouched
    public long d() { return System.nanoTime(); }      // getCurrentEventTime

    public com.badlogic.gdx.j getProcessor() { return processor; }
}
