import com.github.xpenatan.gdx.teavm.backends.shared.config.AssetFileHandle;
import com.github.xpenatan.gdx.teavm.backends.shared.config.compiler.TeaCompiler;
import com.github.xpenatan.gdx.teavm.backends.web.config.backend.WebBackend;
import java.io.File;
import org.teavm.vm.TeaVMOptimizationLevel;

/**
 * Build script that compiles DragonSoul to JavaScript using gdx-teavm.
 * Run via: gradle buildWeb
 */
public class BuildDragonSoulWeb {
    public static void main(String[] args) {
        // Assets will be served from this directory
        // For now, empty - we'll add game assets later
        AssetFileHandle assetsPath = new AssetFileHandle("assets");
        
        WebBackend backend = new WebBackend();
        // Don't start Jetty in sandbox
        // backend.setStartJettyAfterBuild(true);
        
        new TeaCompiler(backend)
                .addAssets(assetsPath)
                .setOptimizationLevel(TeaVMOptimizationLevel.SIMPLE)
                .setMainClass(DragonSoulWebLauncher.class.getName())
                .setObfuscated(false)
                .build(new File("build/dist"));
    }
}
