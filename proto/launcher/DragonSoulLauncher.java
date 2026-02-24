import com.perblue.rpg.RPGMain;

/**
 * Launcher web DragonSoul — Phase 3.1
 * Point d'entree TeaVM : compile vers JavaScript.
 * Objectif : prouver que RPGMain compile en JS sans modifier son code.
 */
public class DragonSoulLauncher {
    public static void main(String[] args) {
        System.out.println("DragonSoul Web - Phase 3.1");
        // WebDeviceInfo remplace AndroidDeviceInfo sans modifier le jeu
        WebDeviceInfo deviceInfo = new WebDeviceInfo();
        RPGMain game = new RPGMain(deviceInfo);
        System.out.println("RPGMain instancie avec succes");
    }
}
