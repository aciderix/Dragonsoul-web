package org.apache.commons.logging;

/**
 * Stub LogFactory pour TeaVM web.
 * Note: getInstance() est une methode d'INSTANCE dans commons-logging original
 * (LogFactory est une classe abstraite, getInstance est virtuelle).
 * getLog() est le wrapper statique.
 */
public class LogFactory {

    private static final LogFactory INSTANCE = new LogFactory();

    // === Methodes statiques ===

    public static LogFactory getFactory() {
        return INSTANCE;
    }

    public static Log getLog(Class<?> clazz) {
        return new SimpleLog(clazz.getName());
    }

    public static Log getLog(String name) {
        return new SimpleLog(name);
    }

    // === Methodes d'instance (INVOKEVIRTUAL via factory.getInstance()) ===

    public Log getInstance(Class<?> clazz) {
        return new SimpleLog(clazz.getName());
    }

    public Log getInstance(String name) {
        return new SimpleLog(name);
    }

    public void release() {
        // no-op
    }
}
