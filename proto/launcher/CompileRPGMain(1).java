import org.teavm.tooling.*;
import org.teavm.diagnostics.Problem;
import java.io.File;
import java.util.*;

public class CompileRPGMain {
    public static void main(String[] args) throws Exception {
        long start = System.currentTimeMillis();
        
        TeaVMTool tool = new TeaVMTool();
        tool.setTargetType(TeaVMTargetType.JAVASCRIPT);
        tool.setMainClass("DragonSoulLauncher");
        tool.setTargetDirectory(new File("/tmp/teavm_rpgmain_out"));
        tool.setLog(new ConsoleTeaVMToolLog(true));
        tool.setObfuscated(false);
        
        List<File> cp = new ArrayList<>();
        // 1. Our launcher
        cp.add(new File("/tmp/teavm_test/classes"));
        // 2. Web stubs (NetworkProvider, EmptyNetworkProvider) - BEFORE game JARs!
        cp.add(new File("/tmp/web_stubs/classes"));
        // 3. Logging stubs
        cp.add(new File("/tmp/lbq_classes"));
        // 4. Game JARs
        cp.add(new File("/tmp/game_classes1.jar"));
        cp.add(new File("/tmp/game_classes2.jar"));
        // 5. TeaVM runtime
        for (File f : new File("/tmp/teavm_libs").listFiles()) {
            if (f.getName().endsWith(".jar")) cp.add(f);
        }
        tool.setClassPath(cp);
        
        try { tool.generate(); } catch (Exception e) { 
            System.out.println("Exception: " + e.getMessage()); 
        }
        
        long elapsed = (System.currentTimeMillis() - start) / 1000;
        System.out.println("\n========================================");
        System.out.println("=== TEAVM COMPILATION RESULTS ===");
        System.out.println("========================================");
        System.out.println("Time: " + elapsed + "s");
        System.out.println("Classes compiled: " + tool.getClasses().size());
        
        int severe = 0, warn = 0;
        Map<String, Integer> errorTypes = new TreeMap<>();
        
        for (Problem p : tool.getProblemProvider().getSevereProblems()) {
            severe++;
            String key = p.getText();
            if (p.getParams() != null && p.getParams().length > 0) {
                key += " [" + p.getParams()[0] + "]";
            }
            errorTypes.merge(key, 1, Integer::sum);
            
            if (severe <= 20) {
                StringBuilder sb = new StringBuilder("  SEVERE: " + p.getText());
                if (p.getParams() != null) {
                    sb.append(" [");
                    for (Object o : p.getParams()) sb.append(o).append(" ");
                    sb.append("]");
                }
                if (p.getLocation() != null) sb.append("\n    @ " + p.getLocation().getMethod());
                System.out.println(sb);
            }
        }
        
        for (Problem p : tool.getProblemProvider().getProblems()) {
            if (!tool.getProblemProvider().getSevereProblems().contains(p)) warn++;
        }
        
        if (severe > 20) System.out.println("  ... and " + (severe - 20) + " more severe errors");
        System.out.println("\nTotal: " + severe + " severe, " + warn + " warnings");
        
        if (!errorTypes.isEmpty()) {
            System.out.println("\nError categories:");
            for (Map.Entry<String, Integer> e : errorTypes.entrySet()) {
                System.out.println("  " + e.getValue() + "x " + e.getKey());
            }
        }
        
        File out = new File("/tmp/teavm_rpgmain_out/classes.js");
        if (out.exists() && out.length() > 0) {
            long kb = out.length() / 1024;
            System.out.println("\n🎉🎉🎉 OUTPUT: " + kb + " KB of JavaScript! 🎉🎉🎉");
        } else {
            System.out.println("\n❌ No JavaScript generated (severe errors block output)");
        }
    }
}
