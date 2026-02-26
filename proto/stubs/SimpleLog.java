package org.apache.commons.logging;

/**
 * Implémentation minimaliste de Log pour le web.
 * TRACE/DEBUG silencieux, INFO/WARN/ERROR → System.out (= console.log dans le navigateur via TeaVM).
 */
public class SimpleLog implements Log {
    private final String name;

    public SimpleLog(String name) {
        this.name = name;
    }

    public void trace(Object message) {}
    public void trace(Object message, Throwable t) {}
    public void debug(Object message) {}
    public void debug(Object message, Throwable t) {}
    public void info(Object message) { System.out.println("[INFO] " + name + ": " + message); }
    public void info(Object message, Throwable t) { System.out.println("[INFO] " + name + ": " + message); }
    public void warn(Object message) { System.out.println("[WARN] " + name + ": " + message); }
    public void warn(Object message, Throwable t) { System.out.println("[WARN] " + name + ": " + message); }
    public void error(Object message) { System.out.println("[ERROR] " + name + ": " + message); }
    public void error(Object message, Throwable t) { System.out.println("[ERROR] " + name + ": " + message); }
    public void fatal(Object message) { System.out.println("[FATAL] " + name + ": " + message); }
    public void fatal(Object message, Throwable t) { System.out.println("[FATAL] " + name + ": " + message); }

    public boolean isTraceEnabled() { return false; }
    public boolean isDebugEnabled() { return false; }
    public boolean isInfoEnabled() { return true; }
    public boolean isWarnEnabled() { return true; }
    public boolean isErrorEnabled() { return true; }
    public boolean isFatalEnabled() { return true; }
}
