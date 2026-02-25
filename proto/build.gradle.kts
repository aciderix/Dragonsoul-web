plugins {
    java
}

val teaVMVersion: String by project

repositories {
    mavenCentral()
    maven {
        url = uri("https://teavm.org/maven/repository/")
        isAllowInsecureProtocol = false
    }
}

// ─── Configurations ──────────────────────────────────────────────────────────

// Classpath minimal pour compiler/exécuter GenerateStubs (ASM + JARs du jeu)
val stubGenConfig: Configuration by configurations.creating {
    isCanBeConsumed = false
    isCanBeResolved = true
}

dependencies {
    // TeaVM tooling — pour lancer le compilateur TeaVM
    implementation("org.teavm:teavm-tooling:$teaVMVersion")
    implementation("org.teavm:teavm-classlib:$teaVMVersion")
    implementation("org.teavm:teavm-core:$teaVMVersion")

    // JARs du jeu (conversion DEX → JAR)
    implementation(files("../classes1.jar"))
    implementation(files("../classes2.jar"))

    // ASM (générateur de bytecode pour les stubs)
    implementation("org.ow2.asm:asm:9.7")

    // stubGenConfig : ASM + JARs du jeu (pour GenerateStubs)
    stubGenConfig("org.ow2.asm:asm:9.7")
    stubGenConfig(files("../classes1.jar"))
    stubGenConfig(files("../classes2.jar"))
}

// ─── Sources ─────────────────────────────────────────────────────────────────

sourceSets {
    main {
        java {
            srcDirs("stubs", "launcher", "teavm-web")

            // Exclure les fichiers nécessitant gdx-teavm (non utilisé)
            exclude("BuildDragonSoulWeb.java")
            exclude("DragonSoulWebLauncher.java")
            exclude("WebLauncher.java")

            // Exclure les doublons (noms non valides pour Java)
            exclude("CompileRPGMain(1).java")
            exclude("DragonSoulLauncher(1).java")
        }
        // Stubs ASM générés (GdxInitializer.class, WebGL20.class, ...)
        compileClasspath += files("output/stubs")
        runtimeClasspath += files("output/stubs")
        // Ressources du jeu extraites de l'APK (.tab, .properties)
        // TeaVM's ClassLoaderNativeGenerator les embed dans jl_ClassLoader_resources
        runtimeClasspath += files("output/resources")
    }
}

java {
    sourceCompatibility = JavaVersion.VERSION_11
    targetCompatibility = JavaVersion.VERSION_11
}

// ─── Tâche 1.5 : Extraire les ressources .tab depuis l'APK ──────────────────

val extractGameResources = tasks.register<Copy>("extractGameResources") {
    description = "Extrait les données de jeu (.tab, .properties) de l'APK vers output/resources"

    from(zipTree("../DragonSoul-Fixed2.apk")) {
        // Ressources de données du jeu (lues via ClassLoader.getResourceAsStream)
        include("com/perblue/rpg/game/data/**/*.tab")
        include("com/perblue/rpg/game/data/**/*.orig")
        include("com/perblue/rpg/util/localization/**/*.properties")
    }
    into("output/resources")

    // Re-extraire seulement si l'APK change
    inputs.file("../DragonSoul-Fixed2.apk")
    outputs.dir("output/resources")
}

// ─── Tâche 1 : Compiler GenerateStubs.java (outil séparé) ───────────────────

val compileStubGenerator = tasks.register<JavaCompile>("compileStubGenerator") {
    description = "Compile l'outil GenerateStubs.java avec ASM"
    source = fileTree("tools") { include("*.java") }
    classpath = stubGenConfig
    destinationDirectory.set(layout.buildDirectory.dir("stub-generator"))
    options.release.set(11)
    options.compilerArgs.add("-Xlint:none")
}

// ─── Tâche 2 : Générer les stubs .class via ASM ──────────────────────────────

val generateStubs = tasks.register<JavaExec>("generateStubs") {
    description = "Génère les stubs libGDX obfusqués via ASM (Phase 3.2)"
    dependsOn(compileStubGenerator)

    mainClass.set("GenerateStubs")
    classpath = files(compileStubGenerator.get().destinationDirectory) + stubGenConfig
    args("../classes1.jar", "../classes2.jar", "output/stubs")
    workingDir = projectDir

    // Gradle cache : re-générer si les JARs changent
    inputs.files("../classes1.jar", "../classes2.jar")
    outputs.dir("output/stubs")
}

// ─── Dépendances de tâches ────────────────────────────────────────────────────

tasks.named("compileJava") {
    dependsOn(generateStubs)
}

// ─── Tâche 3 : buildWeb — Compiler DragonSoul en JavaScript via TeaVM ────────

tasks.register<JavaExec>("buildWeb") {
    group = "build"
    description = "Compile DragonSoul en JavaScript via TeaVM (Phase 3.3)"
    dependsOn("classes", extractGameResources)

    mainClass.set("CompileRPGMain")
    classpath = sourceSets["main"].runtimeClasspath
    jvmArgs(
        "-Xmx4g",
        "-Doutput.dir=${projectDir}/output/web"
    )
}
