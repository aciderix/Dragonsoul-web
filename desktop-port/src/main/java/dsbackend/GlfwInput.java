package dsbackend;

import org.lwjgl.glfw.*;
import static org.lwjgl.glfw.GLFW.*;

/**
 * Bridges real GLFW keyboard/mouse/scroll events into {@link DsInput}, mapping
 * GLFW key codes to libGDX (Android) key codes. Mouse acts as touch pointer 0.
 * Callback objects are held as fields so GLFW's native pointers stay valid.
 */
public final class GlfwInput {
    private final DsInput input;
    private double cx, cy; // last cursor position (window pixels, y-down)

    private final GLFWCursorPosCallback cursorCb;
    private final GLFWMouseButtonCallback buttonCb;
    private final GLFWScrollCallback scrollCb;
    private final GLFWKeyCallback keyCb;
    private final GLFWCharCallback charCb;

    public GlfwInput(long win, DsInput input) {
        this.input = input;
        cursorCb = GLFWCursorPosCallback.create((w, x, y) -> { cx = x; cy = y; input.moved((int) x, (int) y); });
        buttonCb = GLFWMouseButtonCallback.create((w, button, action, mods) -> {
            if (action == GLFW_PRESS) input.touchDown((int) cx, (int) cy, button);
            else if (action == GLFW_RELEASE) input.touchUp((int) cx, (int) cy, button);
        });
        scrollCb = GLFWScrollCallback.create((w, dx, dy) -> input.scrolled((int) -Math.signum(dy)));
        keyCb = GLFWKeyCallback.create((w, key, scancode, action, mods) -> {
            int gdx = mapKey(key);
            if (gdx < 0) return;
            if (action == GLFW_PRESS) input.keyDown(gdx);
            else if (action == GLFW_RELEASE) input.keyUp(gdx);
        });
        charCb = GLFWCharCallback.create((w, codepoint) -> input.keyTyped((char) codepoint));

        glfwSetCursorPosCallback(win, cursorCb);
        glfwSetMouseButtonCallback(win, buttonCb);
        glfwSetScrollCallback(win, scrollCb);
        glfwSetKeyCallback(win, keyCb);
        glfwSetCharCallback(win, charCb);
    }

    /** GLFW key code -> libGDX (Android) Input.Keys code; -1 if unmapped. */
    public static int mapKey(int k) {
        if (k >= GLFW_KEY_A && k <= GLFW_KEY_Z) return 29 + (k - GLFW_KEY_A);       // A=29..Z=54
        if (k >= GLFW_KEY_0 && k <= GLFW_KEY_9) return 7 + (k - GLFW_KEY_0);        // NUM_0=7..9=16
        switch (k) {
            case GLFW_KEY_SPACE: return 62;
            case GLFW_KEY_ENTER: case GLFW_KEY_KP_ENTER: return 66;
            case GLFW_KEY_BACKSPACE: return 67;
            case GLFW_KEY_ESCAPE: return 131;   // ESCAPE (used as Back)
            case GLFW_KEY_TAB: return 61;
            case GLFW_KEY_LEFT: return 21;
            case GLFW_KEY_RIGHT: return 22;
            case GLFW_KEY_UP: return 19;
            case GLFW_KEY_DOWN: return 20;
            case GLFW_KEY_LEFT_SHIFT: case GLFW_KEY_RIGHT_SHIFT: return 59;
            case GLFW_KEY_LEFT_CONTROL: case GLFW_KEY_RIGHT_CONTROL: return 129;
            case GLFW_KEY_COMMA: return 55;
            case GLFW_KEY_PERIOD: return 56;
            case GLFW_KEY_MINUS: return 69;
            case GLFW_KEY_DELETE: return 112;   // FORWARD_DEL
            default: return -1;
        }
    }
}
