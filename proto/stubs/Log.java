package org.apache.commons.logging;

/**
 * Stub de l'interface Log de commons-logging.
 * Remplace l'originale qui utilise ClassLoader (incompatible navigateur/TeaVM).
 */
public interface Log {
    void trace(Object message);
    void trace(Object message, Throwable t);
    void debug(Object message);
    void debug(Object message, Throwable t);
    void info(Object message);
    void info(Object message, Throwable t);
    void warn(Object message);
    void warn(Object message, Throwable t);
    void error(Object message);
    void error(Object message, Throwable t);
    void fatal(Object message);
    void fatal(Object message, Throwable t);
    boolean isTraceEnabled();
    boolean isDebugEnabled();
    boolean isInfoEnabled();
    boolean isWarnEnabled();
    boolean isErrorEnabled();
    boolean isFatalEnabled();
}
