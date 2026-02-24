plugins {
    java
}

repositories {
    mavenCentral()
    // TeaVM repo fallback
    maven { url = uri("http://teavm.org/maven/repository/") 
        isAllowInsecureProtocol = true
    }
}

val gdxTeaVMVersion = "1.5.2"
val gdxVersion = "1.14.0"

dependencies {
    // gdx-teavm backend
    implementation("com.github.xpenatan.gdx-teavm:backend-web:$gdxTeaVMVersion")
    
    // libGDX core
    implementation("com.badlogicgames.gdx:gdx:$gdxVersion")
    
    // Game JARs (from DEX conversion)
    implementation(files("libs/classes1.jar"))
    implementation(files("libs/classes2.jar"))
    
    // Web stubs
    implementation(files("libs/stubs.jar"))
}

tasks.register<JavaExec>("buildWeb") {
    group = "build"
    description = "Build DragonSoul for web via TeaVM"
    mainClass.set("BuildDragonSoulWeb")
    classpath = sourceSets["main"].runtimeClasspath
    jvmArgs = listOf("-Xmx512m")
}

java {
    sourceCompatibility = JavaVersion.VERSION_11
    targetCompatibility = JavaVersion.VERSION_11
}
