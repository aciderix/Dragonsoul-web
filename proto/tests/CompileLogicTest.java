import org.teavm.tooling.TeaVMTool;
import org.teavm.tooling.TeaVMTargetType;
import org.teavm.vm.TeaVMOptimizationLevel;
import java.io.File;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.List;

public class CompileLogicTest {
    public static void main(String[] args) throws Exception {
        TeaVMTool tool = new TeaVMTool();
        tool.setTargetType(TeaVMTargetType.JAVASCRIPT);
        tool.setMainClass("GameLogicTest");
        tool.setTargetDirectory(new File("output_logic"));
        tool.setTargetFileName("dragonsoul-logic.js");
        tool.setObfuscated(false);
        tool.setOptimizationLevel(TeaVMOptimizationLevel.SIMPLE);
        
        // Build URLClassLoader with all deps
        List<URL> urls = new ArrayList<>();
        urls.add(new File("classes").toURI().toURL());
        urls.add(new File("libs/classes1.jar").toURI().toURL());
        urls.add(new File("libs/classes2.jar").toURI().toURL());
        urls.add(new File("libs/stubs.jar").toURI().toURL());
        for (File f : new File(".").listFiles()) {
            if (f.getName().startsWith("teavm-") && f.getName().endsWith(".jar")) {
                urls.add(f.toURI().toURL());
            }
        }
        tool.setClassLoader(new URLClassLoader(urls.toArray(new URL[0])));
        
        tool.generate();
        
        int severe = tool.getProblemProvider().getSevereProblems().size();
        int total = tool.getProblemProvider().getProblems().size();
        System.out.println("Severe errors: " + severe);
        System.out.println("Total problems: " + total);
        
        if (severe == 0) {
            File out = new File("output_logic/dragonsoul-logic.js");
            System.out.println("JS size: " + (out.length() / 1024) + " KB");
            System.out.println("SUCCESS!");
        }
    }
}
