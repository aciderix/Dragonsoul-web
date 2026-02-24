package org.apache.commons.logging;

/**
 * Stub LogFactory pour TeaVM web.
 * Remplace commons-logging qui utilise ClassLoader (incompatible navigateur).
 * TODO: Connecter à la console du navigateur via JSBody en production.
 */
public class LogFactory {
    public static Log getLog(Class<?> clazz) {
        return new SimpleLog(clazz.getName());
    }
    public static Log getLog(String name) {
        return new SimpleLog(name);
    }
}
