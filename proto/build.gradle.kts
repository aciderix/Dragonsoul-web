plugins {
    id("java")
}

val gdxVersion: String by project
val teaVMVersion: String by project
val gdxTeaVMVersion: String by project

subprojects {
    apply(plugin = "java")

    java.sourceCompatibility = JavaVersion.VERSION_11
    java.targetCompatibility = JavaVersion.VERSION_11

    repositories {
        mavenLocal()
        mavenCentral()
        maven { url = uri("https://jitpack.io") }
        maven {
            url = uri("http://teavm.org/maven/repository/")
            isAllowInsecureProtocol = true
        }
    }

    configurations.configureEach {
        resolutionStrategy.cacheChangingModulesFor(0, "seconds")
    }
}
