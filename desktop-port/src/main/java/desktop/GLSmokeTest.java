package desktop;

import org.lwjgl.glfw.*;
import org.lwjgl.opengl.*;
import static org.lwjgl.glfw.GLFW.*;
import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.system.MemoryUtil.NULL;

/** Smoke test: can we get a GLFW window + OpenGL context under Xvfb/Mesa? */
public final class GLSmokeTest {
    public static void main(String[] args) {
        GLFWErrorCallback.createPrint(System.err).set();
        if (!glfwInit()) throw new IllegalStateException("glfwInit failed");
        glfwDefaultWindowHints();
        glfwWindowHint(GLFW_VISIBLE, GLFW_FALSE);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 2);
        glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_COMPAT_PROFILE);
        long win = glfwCreateWindow(640, 480, "smoke", NULL, NULL);
        if (win == NULL) throw new IllegalStateException("createWindow failed");
        glfwMakeContextCurrent(win);
        GL.createCapabilities();
        System.out.println("GL_VERSION  = " + glGetString(GL_VERSION));
        System.out.println("GL_RENDERER = " + glGetString(GL_RENDERER));
        System.out.println("GL_VENDOR   = " + glGetString(GL_VENDOR));
        System.out.println("GLSL        = " + glGetString(GL20.GL_SHADING_LANGUAGE_VERSION));
        glClearColor(0.2f, 0.4f, 0.8f, 1f);
        glClear(GL_COLOR_BUFFER_BIT);
        glFinish();
        System.out.println("SMOKE OK: cleared a frame, glError=" + glGetError());
        glfwDestroyWindow(win);
        glfwTerminate();
    }
}
