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

dependencies {
    // TeaVM tooling — pour lancer le compilateur TeaVM
    implementation("org.teavm:teavm-tooling:$teaVMVersion")
    implementation("org.teavm:teavm-classlib:$teaVMVersion")
    implementation("org.teavm:teavm-core:$teaVMVersion")

    // JARs du jeu (conversion DEX → JAR)
    implementation(files("../classes1.jar"))
    implementation(files("../classes2.jar"))
}

sourceSets {
    main {
        java {
            // Sources : stubs + launcher + implémentations web
            srcDirs("stubs", "launcher", "teavm-web")

            // Exclure les fichiers qui nécessitent gdx-teavm (pas utilisé en Phase 3.1)
            exclude("BuildDragonSoulWeb.java")
            exclude("DragonSoulWebLauncher.java")
            exclude("WebLauncher.java")

            // Exclure les doublons (noms de fichiers non valides pour Java)
            exclude("CompileRPGMain(1).java")
            exclude("DragonSoulLauncher(1).java")
        }
    }
}

java {
    sourceCompatibility = JavaVersion.VERSION_11
    targetCompatibility = JavaVersion.VERSION_11
}

tasks.register<JavaExec>("buildWeb") {
    group = "build"
    description = "Compile DragonSoul en JavaScript via TeaVM (Phase 3.1)"
    dependsOn("classes")
    mainClass.set("CompileRPGMain")
    classpath = sourceSets["main"].runtimeClasspath
    jvmArgs(
        "-Xmx2g",
        "-Doutput.dir=${projectDir}/output/web"
    )
}
