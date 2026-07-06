package dsbackend;

import java.io.File;
import java.io.RandomAccessFile;
import java.util.ArrayList;
import java.util.List;

/**
 * Test driver: injects synthetic input and captures screenshots so the game can be
 * piloted headlessly (no physical display). Two modes:
 *
 *  - SCRIPT mode: a fixed list of commands replayed against the frame counter
 *    ({@code wait N} advances N frames). Deterministic, one-shot.
 *  - LIVE mode: commands are appended to a file at runtime; each frame the driver
 *    reads any new lines and executes them immediately. This lets an operator drive
 *    the game step-by-step (append a tap, screenshot, look, append the next tap)
 *    while the game runs continuously — no restart per action.
 *
 * Commands (one per line):
 *   tap X Y            a touch down+up at pixel (X,Y)
 *   down X Y | up X Y  individual touch events
 *   move X Y           move / drag the pointer
 *   key NAME           press+release a key (ENTER, ESCAPE, A, SPACE, ...)
 *   text STRING        type characters (keyTyped)
 *   wait N             advance N frames before running the next command
 *   autotap X Y [P]    auto-fire a tap at (X,Y) every P frames (default 20) until
 *                      "autotap off" — headless skill auto-cast in combat
 *   tutinfo            print the in-memory tutorial state (step, yellow-arrow target
 *                      UIComponentName, dialogue text) — know what's on screen, no capture
 *   narr               advance a showing tutorial dialogue once (headless Tap to Continue)
 *   autonarr [P]|off   auto-advance dialogues every P frames (default 20) until "off"
 *   taparrow           click the actor the tutorial's yellow arrow points at (no pixels)
 *   autotut [P]|off    fully pilot the guided tutorial (arrows + dialogues + combat)
 *   autocampaign [P]|off  pilot the post-tutorial campaign (pick level, fight, continue)
 *   combatinfo         diagnose the combat-drive state (screen, FF, auto, next-stage)
 *   screenshot [FILE]  capture the framebuffer (default build/shot.png)
 *   quit               stop the app
 *   # ...              comment
 */
public final class DsDriver {
    public interface Host {
        void screenshot(String file);
        void stop();
        /** The live RPGMain, for reading in-memory tutorial/UI state (semi-headless
         *  driving). May be null before the game is created. */
        com.perblue.rpg.RPGMain game();
    }

    private final DsInput input;
    private final Host host;
    private final List<String[]> cmds = new ArrayList<>();
    private int idx = 0;
    private long resumeAt = 0;
    private boolean done = false;

    // LIVE mode: poll a command file, executing newly appended lines each frame.
    private final File liveFile;
    private long liveOffset = 0;
    private final StringBuilder livePartial = new StringBuilder();

    // AUTO-TAP: fire a tap at (autoX,autoY) every autoPeriod frames until cleared.
    // Used to auto-cast a hero's skill in combat (tap the portrait whenever the skill
    // is ready) without a real-time view — a headless "auto" mode.
    private int autoX = -1, autoY = -1, autoPeriod = 0;

    // AUTO-NARRATOR: while on, auto-advance tutorial dialogues ("Tap to Continue")
    // headlessly by calling the game's own TutorialHelper.autoProgressNarrator(), so we
    // don't have to blind-tap through cutscenes. Rate-limited to every autoNarrPeriod frames.
    private int autoNarrPeriod = 0;

    // AUTO-TUT: fully headless tutorial pilot. Every autoTutPeriod frames: if a yellow
    // arrow is showing, click its target (taparrow); else advance any dialogue. Drives
    // the guided tutorial hands-off (combat action-steps still need autotap for skills).
    private int autoTutPeriod = 0;

    // AUTO-CAMPAIGN: pilot the post-tutorial campaign hands-off. Every autoCampaignPeriod
    // frames, dispatch on the current screen: pick the recommended level, continue through
    // the battle-info / hero-chooser, let combatStep win the fight, and continue past victory.
    private int autoCampaignPeriod = 0;
    private int campaignStuckTicks = 0;   // ticks with no navigation progress (wall detection)

    // WAIT-LOADED: the game loads screens ASYNC — getScreen() returns the newly-pushed
    // screen (so tutinfo sees it) while ScreenManager.render() keeps drawing the PREVIOUS
    // screen until the new one's LoadState==CREATED. A fixed `wait` can therefore screenshot
    // the OLD screen (the hub) instead of the target. `waitloaded` yields until the current
    // top screen is CREATED (+ a short settle for the transition curtain), or a timeout.
    // -1 = not waiting; >=0 = deadline frame (timeout safety so a broken screen can't hang us).
    private long waitLoadedDeadline = -1;

    public DsDriver(DsInput input, Host host, List<String> lines) {
        this.input = input; this.host = host; this.liveFile = null;
        for (String line : lines) {
            String s = line.trim();
            if (s.isEmpty() || s.startsWith("#")) continue;
            cmds.add(s.split("\\s+", 2));
        }
    }

    /** LIVE mode: read commands appended to {@code liveFile} at runtime. */
    public DsDriver(DsInput input, Host host, File liveFile) {
        this.input = input; this.host = host; this.liveFile = liveFile;
    }

    public boolean isDone() { return done; }

    public void onFrame(long frame) {
        if (done) return;
        // Auto-tap: fire the recurring tap on its period (skill auto-cast in combat).
        if (autoPeriod > 0 && frame % autoPeriod == 0) {
            input.touchDown(autoX, autoY, 0); input.touchUp(autoX, autoY, 0);
        }
        // Auto-narrator: advance any showing tutorial dialogue on its period.
        if (autoNarrPeriod > 0 && frame % autoNarrPeriod == 0) advanceNarrator();
        // Auto-tut: pilot the guided tutorial hands-off (click arrows, pass dialogues).
        if (autoTutPeriod > 0 && frame % autoTutPeriod == 0) autoTutStep();
        // Auto-campaign: pilot the post-tutorial campaign hands-off.
        if (autoCampaignPeriod > 0 && frame % autoCampaignPeriod == 0) campaignStep();
        if (liveFile != null) { pollLive(frame); return; }
        while (idx < cmds.size() && frame >= resumeAt) {
            if (exec(cmds.get(idx++), frame)) return; // wait/quit yields control
        }
        if (idx >= cmds.size()) done = true;
    }

    /** Read any bytes appended to the command file and execute complete lines. */
    private void pollLive(long frame) {
        // 1. Pull any newly-appended bytes into the partial-line buffer.
        try (RandomAccessFile raf = new RandomAccessFile(liveFile, "r")) {
            long len = raf.length();
            if (len < liveOffset) { liveOffset = 0; livePartial.setLength(0); } // truncated → restart
            if (len > liveOffset) {
                raf.seek(liveOffset);
                byte[] buf = new byte[(int) (len - liveOffset)];
                raf.readFully(buf);
                liveOffset = len;
                livePartial.append(new String(buf, java.nio.charset.StandardCharsets.UTF_8));
            }
        } catch (java.io.FileNotFoundException fnf) {
            return; // command file not created yet
        } catch (Exception e) {
            System.out.println("[driver] live read error: " + e);
            return;
        }
        // 2. Honour a pending `wait N`: hold the buffered commands until it elapses.
        if (frame < resumeAt) return;
        // 2b. Honour a pending `waitloaded`: hold until the current top screen finishes
        //     async creation (CREATED/ERROR) so the next screenshot captures the screen the
        //     game is actually rendering, not the previous one. On ready, settle a few frames
        //     for the transition curtain + first paint, then resume.
        if (waitLoadedDeadline >= 0) {
            if (frame >= waitLoadedDeadline || screenReady()) {
                waitLoadedDeadline = -1;
                resumeAt = frame + 15;
                return;
            }
            return;
        }
        // 3. Drain complete buffered lines. `wait`/`quit` yield the frame; the rest of
        //    the buffer stays and is drained on a later frame (no new bytes required).
        int nl;
        while ((nl = livePartial.indexOf("\n")) >= 0) {
            String line = livePartial.substring(0, nl).trim();
            livePartial.delete(0, nl + 1);
            if (line.isEmpty() || line.startsWith("#")) continue;
            try {
                if (exec(line.split("\\s+", 2), frame)) return; // wait/quit yields
            } catch (Exception e) {
                System.out.println("[driver] cmd error on '" + line + "': " + e);
                e.printStackTrace(System.out);
            }
        }
    }

    /** Execute one command. Returns true if the caller should yield the frame. */
    private boolean exec(String[] c, long frame) {
        String op = c[0];
        String arg = c.length > 1 ? c[1] : "";
        switch (op) {
            case "tap": { int[] p = xy(arg); input.touchDown(p[0], p[1], 0); input.touchUp(p[0], p[1], 0); break; }
            case "down": { int[] p = xy(arg); input.touchDown(p[0], p[1], 0); break; }
            case "up": { int[] p = xy(arg); input.touchUp(p[0], p[1], 0); break; }
            case "move": { int[] p = xy(arg); input.moved(p[0], p[1]); break; }
            case "key": { int k = keyCode(arg.trim()); if (k >= 0) { input.keyDown(k); input.keyUp(k); } break; }
            case "text": for (int i = 0; i < arg.length(); i++) input.keyTyped(arg.charAt(i)); break;
            case "wait": resumeAt = frame + Long.parseLong(arg.trim()); return true;
            case "autotap": { // "autotap X Y PERIOD" repeats a tap; "autotap off" stops
                if (arg.trim().equalsIgnoreCase("off")) { autoPeriod = 0; break; }
                String[] t = arg.trim().split("\\s+");
                autoX = Integer.parseInt(t[0]); autoY = Integer.parseInt(t[1]);
                autoPeriod = t.length > 2 ? Integer.parseInt(t[2]) : 20;
                break;
            }
            case "tutinfo": tutInfo(); break;            // print in-memory tutorial/UI state
            case "narr": advanceNarrator(); break;       // advance a showing dialogue once
            case "taparrow": tapArrow(); break;          // click the current yellow-arrow target
            case "combatinfo": combatInfo(); break;       // diagnose the combat-drive state
            case "nav": navTo(arg.trim()); break;         // navigate to a feature by name (headless)
            case "home": goHome(); break;                 // pop back to the hub (MainMenuScreen)
            case "autotut": {                             // "autotut [P]" | "autotut off"
                if (arg.trim().equalsIgnoreCase("off")) { autoTutPeriod = 0; break; }
                autoTutPeriod = arg.trim().isEmpty() ? 40 : Integer.parseInt(arg.trim());
                break;
            }
            case "autocampaign": {                        // "autocampaign [P]" | "autocampaign off"
                if (arg.trim().equalsIgnoreCase("off")) { autoCampaignPeriod = 0; break; }
                autoCampaignPeriod = arg.trim().isEmpty() ? 40 : Integer.parseInt(arg.trim());
                campaignStuckTicks = 0;
                break;
            }
            case "autonarr": {                            // "autonarr [P]" | "autonarr off"
                if (arg.trim().equalsIgnoreCase("off")) { autoNarrPeriod = 0; break; }
                autoNarrPeriod = arg.trim().isEmpty() ? 20 : Integer.parseInt(arg.trim());
                break;
            }
            case "waitloaded": { // yield until the current screen finishes async-loading (CREATED)
                long t = arg.trim().isEmpty() ? 900 : Long.parseLong(arg.trim());
                waitLoadedDeadline = frame + t; return true;
            }
            case "screenshot": host.screenshot(arg.isEmpty() ? "build/shot.png" : arg.trim()); break;
            case "quit": done = true; host.stop(); return true;
            default: System.out.println("[driver] unknown cmd: " + op);
        }
        return false;
    }

    private static int[] xy(String arg) {
        String[] t = arg.trim().split("\\s+");
        return new int[] { Integer.parseInt(t[0]), Integer.parseInt(t[1]) };
    }

    /** Key name -> libGDX (Android) keycode. */
    private static int keyCode(String name) {
        if (name.length() == 1) {
            char c = Character.toUpperCase(name.charAt(0));
            if (c >= 'A' && c <= 'Z') return 29 + (c - 'A');
            if (c >= '0' && c <= '9') return 7 + (c - '0');
        }
        switch (name.toUpperCase()) {
            case "SPACE": return 62;
            case "ENTER": return 66;
            case "BACKSPACE": return 67;
            case "ESCAPE": case "ESC": case "BACK": return 131;
            case "TAB": return 61;
            case "LEFT": return 21;
            case "RIGHT": return 22;
            case "UP": return 19;
            case "DOWN": return 20;
            default: System.out.println("[driver] unknown key: " + name); return -1;
        }
    }

    /** Advance a showing tutorial dialogue via the game's OWN narrator progression
     *  (headless "Tap to Continue"), no-op if none is showing. */
    private void advanceNarrator() {
        try {
            com.perblue.rpg.RPGMain g = host.game();
            if (g == null) return;
            com.perblue.rpg.game.objects.User u = g.getYourUser();
            if (u == null) return;
            if (com.perblue.rpg.game.tutorial.TutorialHelper.isNarratorShowing(u)) {
                com.perblue.rpg.game.tutorial.TutorialHelper.autoProgressNarrator();
            }
        } catch (Throwable t) {
            System.out.println("[driver] narr error: " + t);
        }
    }

    /** Click the actor the tutorial's yellow arrow currently points at — resolved from
     *  the game's OWN live pointers (BaseScreen.questPointers -> TutorialPointer.getTarget),
     *  no pixel reading. The actor's stage-space centre is mapped to screen pixels by
     *  self-calibrating the (linear) stage<-screen map: we sample the two screen corners
     *  through Stage.a() (screen->stage) and invert, so any viewport scale / Y-flip is
     *  handled without hard-coding the design resolution. */
    private void tapArrow() {
        try {
            com.perblue.rpg.RPGMain g = host.game();
            if (g == null) return;
            com.perblue.rpg.game.objects.User u = g.getYourUser();
            if (u == null) return;
            if (!com.perblue.rpg.game.tutorial.TutorialHelper.isAnyPointerShowing()) {
                System.out.println("[tut] taparrow: no pointer showing"); return;
            }
            com.badlogic.gdx.scenes.scene2d.b actor = firstPointerTarget(g, u);
            if (actor == null) { System.out.println("[tut] taparrow: target actor not resolved"); return; }
            tapActorCenter(actor, "taparrow " + actor.getTutorialName());
        } catch (Throwable t) {
            System.out.println("[driver] taparrow error: " + t);
            t.printStackTrace(System.out);
        }
    }

    /** Inject a tap at a scene2d actor's on-screen centre. Maps the actor's stage centre
     *  to screen pixels by self-calibrating the linear stage<-screen transform (sample the
     *  two screen corners through Stage.a() = screen->stage, then invert) — handles any
     *  viewport scale / Y-flip without a hard-coded design resolution. */
    private boolean tapActorCenter(com.badlogic.gdx.scenes.scene2d.b actor, String label) {
        com.badlogic.gdx.scenes.scene2d.i stage = actor.getStage();
        if (stage == null) { System.out.println("[tut] " + label + ": actor not on a stage"); return false; }
        com.badlogic.gdx.math.p c = actor.localToStageCoordinates(
                new com.badlogic.gdx.math.p(actor.getWidth() / 2f, actor.getHeight() / 2f));
        float tx = c.b, ty = c.c;                 // p.b = x, p.c = y
        final int W = 1280, H = 720;              // fixed dev window
        com.badlogic.gdx.math.p s0 = stage.a(new com.badlogic.gdx.math.p(0, 0));
        com.badlogic.gdx.math.p s1 = stage.a(new com.badlogic.gdx.math.p(W, H));
        int sx = Math.round((tx - s0.b) / (s1.b - s0.b) * W);
        int sy = Math.round((ty - s0.c) / (s1.c - s0.c) * H);
        sx = Math.max(0, Math.min(W - 1, sx));
        sy = Math.max(0, Math.min(H - 1, sy));
        System.out.println("[tut] " + label + " -> screen=(" + sx + "," + sy + ")");
        input.touchDown(sx, sy, 0); input.touchUp(sx, sy, 0);
        return true;
    }

    /** Drive a combat screen with the game's OWN actors (no blind pixels): advance to the
     *  next wave via nextStageButton when it's up, turn on fast-forward (only if unlocked)
     *  and AUTO if present, and cast hero skills by tapping the hero portraits (which carry
     *  the ATTACK_SCREEN_HERO_BUTTON<i> tutorial names) — a ready skill fires, others no-op. */
    private void combatStep(com.perblue.rpg.ui.screens.AttackScreen as) {
        try {
            // 1. between waves: the ">>" continue is nextStageButton (the tap-to-continue TEXT
            //    label only shows during the tutorial, so don't rely on it). It's always present
            //    but only ENABLED while waiting between waves, so gate on !isDisabled() — that
            //    way we advance between waves and fall through to casting skills during a wave.
            com.badlogic.gdx.scenes.scene2d.b next = fieldActor(as, "nextStageButton");
            if (next instanceof com.badlogic.gdx.scenes.scene2d.ui.Button && next.isVisible()
                    && next.getParent() != null
                    && !((com.badlogic.gdx.scenes.scene2d.ui.Button) next).isDisabled()) {
                tapActorCenter(next, "combat next-stage"); return;
            }
            // 2. fast-forward (2x) — only if unlocked (gates behind Team Level 30 / VIP).
            Object ffState = as.getFastForwardButtonState();
            if (!as.isFastForward() && ffState != null && "AVAILABLE".equals(ffState.toString())) {
                com.badlogic.gdx.scenes.scene2d.b ff = fieldActor(as, "fastForwardButton");
                if (ff != null && ff.isVisible()) { tapActorCenter(ff, "combat fastforward"); return; }
            }
            // 3. AUTO (auto-cast) if the button exists and isn't already on.
            com.badlogic.gdx.scenes.scene2d.b auto = fieldActor(as, "autoButton");
            if (auto instanceof com.badlogic.gdx.scenes.scene2d.ui.Button && auto.isVisible()
                    && !((com.badlogic.gdx.scenes.scene2d.ui.Button) auto).isChecked()) {
                tapActorCenter(auto, "combat auto"); return;
            }
            // 4. cast skills: tap each present hero portrait (ready skills fire, others no-op).
            com.perblue.rpg.RPGMain g = host.game();
            if (g == null || g.getStage() == null) return;
            com.badlogic.gdx.scenes.scene2d.b root = g.getStage().i();
            for (int i = 0; i < 5; i++) {
                com.badlogic.gdx.scenes.scene2d.b hb = searchActor(root, "ATTACK_SCREEN_HERO_BUTTON" + i);
                if (hb != null && hb.isVisible()) tapActorCenter(hb, "combat cast H" + i);
            }
        } catch (Throwable t) {
            System.out.println("[driver] combat error: " + t);
        }
    }

    /** Navigate straight to a feature screen by the game's OWN nav enum — headless, no
     *  pixels. `nav ENCHANTING`, `nav FIGHT_PIT`, `nav HERO_MANAGEMENT`, ... Locked features
     *  route to the game's upsell (correct behaviour). Runs on the render thread (safe). */
    /** Return to the hub so the next nav starts from a clean state (navigating from inside
     *  a feature screen doesn't switch cleanly). */
    private void goHome() {
        try {
            com.perblue.rpg.RPGMain g = host.game();
            if (g != null) g.getScreenManager().popToScreen(com.perblue.rpg.ui.screens.MainMenuScreen.class);
        } catch (Throwable t) {
            System.out.println("[nav] home error: " + t);
        }
    }

    /** True when the current top screen has finished async creation (LoadState.CREATED, or
     *  ERROR — don't hang on a broken screen). The game renders the PREVIOUS screen until the
     *  pushed one is CREATED, so `waitloaded` polls this before a screenshot to avoid capturing
     *  the old screen. Modals leave the top screen = the (already-CREATED) hub → ready at once. */
    private boolean screenReady() {
        try {
            com.perblue.rpg.RPGMain g = host.game();
            if (g == null) return true;
            com.perblue.rpg.ui.screens.BaseScreen sc = g.getScreenManager().getScreen();
            if (sc == null) return true;
            String st = String.valueOf(sc.getLoadState());
            return st.equals("CREATED") || st.equals("ERROR");
        } catch (Throwable t) { return true; }
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private void navTo(String destName) {
        try {
            Class<?> destClass = Class.forName("com.perblue.rpg.ui.UINavHelper$Destination");
            Object d = Enum.valueOf((Class<Enum>) destClass, destName.toUpperCase());
            Class<?> navHelper = Class.forName("com.perblue.rpg.ui.UINavHelper");
            java.lang.reflect.Method navigateTo =
                    navHelper.getMethod("navigateTo", destClass, String.class, String[].class);
            navigateTo.invoke(null, d, "dev", new String[0]);
            System.out.println("[nav] -> " + d);
        } catch (IllegalArgumentException iae) {
            System.out.println("[nav] unknown destination '" + destName + "'");
        } catch (Throwable t) {
            Throwable c = (t instanceof java.lang.reflect.InvocationTargetException && t.getCause() != null)
                    ? t.getCause() : t;
            System.out.println("[nav] error for '" + destName + "': " + c);
        }
    }

    /** Dump the combat-drive decision inputs for the current screen (diagnostic). */
    private void combatInfo() {
        try {
            com.perblue.rpg.RPGMain g = host.game();
            if (g == null || g.getYourUser() == null) { System.out.println("[combat] no game/user"); return; }
            com.perblue.rpg.ui.screens.BaseScreen sc = g.getScreenManager().getScreen();
            System.out.println("[combat] screen=" + (sc == null ? "null" : sc.getClass().getSimpleName())
                    + " isAttackScreen=" + (sc instanceof com.perblue.rpg.ui.screens.AttackScreen)
                    + " pointerShowing=" + com.perblue.rpg.game.tutorial.TutorialHelper.isAnyPointerShowing());
            if (!(sc instanceof com.perblue.rpg.ui.screens.AttackScreen)) return;
            com.perblue.rpg.ui.screens.AttackScreen as = (com.perblue.rpg.ui.screens.AttackScreen) sc;
            com.badlogic.gdx.scenes.scene2d.b lbl = fieldActor(as, "tapToContinueLabel");
            com.badlogic.gdx.scenes.scene2d.b auto = fieldActor(as, "autoButton");
            System.out.println("[combat]   FF isFast=" + as.isFastForward()
                    + " state=" + as.getFastForwardButtonState());
            System.out.println("[combat]   tapToContinueLabel: " + (lbl == null ? "null"
                    : "visible=" + lbl.isVisible() + " parent=" + (lbl.getParent() != null)));
            System.out.println("[combat]   autoButton: " + (auto == null ? "null"
                    : "visible=" + auto.isVisible() + " checked="
                      + ((com.badlogic.gdx.scenes.scene2d.ui.Button) auto).isChecked()));
        } catch (Throwable t) {
            System.out.println("[combat] info error: " + t); t.printStackTrace(System.out);
        }
    }

    /** Reflectively read an actor-typed field from an AttackScreen (private UI fields). */
    private com.badlogic.gdx.scenes.scene2d.b fieldActor(com.perblue.rpg.ui.screens.AttackScreen as, String name) {
        try {
            java.lang.reflect.Field f = com.perblue.rpg.ui.screens.AttackScreen.class.getDeclaredField(name);
            f.setAccessible(true);
            Object v = f.get(as);
            return (v instanceof com.badlogic.gdx.scenes.scene2d.b) ? (com.badlogic.gdx.scenes.scene2d.b) v : null;
        } catch (Throwable t) { return null; }
    }

    /** One hands-off pilot tick. Priority: a showing tutorial arrow (guided step, incl.
     *  the intro combat's scripted casts) -> click it; else if we're in a free combat
     *  screen -> drive it (fast-forward/AUTO/continue); else the rare no-pointer action
     *  step; else advance any dialogue. */
    private void autoTutStep() {
        try {
            com.perblue.rpg.RPGMain g = host.game();
            if (g == null || g.getYourUser() == null) return;
            com.perblue.rpg.game.objects.User u = g.getYourUser();
            refreshTut(u);   // recompute pointers/narrators for the CURRENT step (avoid staleness)
            if (com.perblue.rpg.game.tutorial.TutorialHelper.isAnyPointerShowing()) { tapArrow(); return; }
            com.perblue.rpg.ui.screens.BaseScreen sc = g.getScreenManager().getScreen();
            if (sc instanceof com.perblue.rpg.ui.screens.AttackScreen) {
                combatStep((com.perblue.rpg.ui.screens.AttackScreen) sc); return;
            }
            if (noPointerActionStep(g, u, sc)) return;
            advanceNarrator();
        } catch (Throwable t) {
            System.out.println("[driver] autotut error: " + t);
        }
    }

    /** One hands-off campaign tick: pick the recommended level and drive the fight flow,
     *  all by the game's OWN actors/API (no blind pixels). Screen dispatch:
     *   victory overlay -> VICTORY_CONTINUE_BUTTON; combat -> combatStep; battle-info ->
     *   CAMPAIGN_BATTLE_INFO_CONTINUE; hero-chooser -> HERO_CHOOSER_FIGHT_BUTTON; map ->
     *   CampaignMapView.getPointerNode(0) (the recommended node) — null => chapter done. */
    private void campaignStep() {
        try {
            com.perblue.rpg.RPGMain g = host.game();
            if (g == null || g.getYourUser() == null || g.getStage() == null) return;
            // Wall detection: if the navigator makes no progress for a long time (e.g. it's
            // stuck on a defeat screen because the team can't beat this level), stop instead
            // of hanging. A winnable combat resets this when it reaches victory / the next level.
            if (++campaignStuckTicks > 150) {
                System.out.println("[campaign] no progress for ~" + campaignStuckTicks
                        + " ticks — likely a team-building wall (the game's own tip: Evolve Heroes /"
                        + " Equip More Gear). Stopping autocampaign.");
                autoCampaignPeriod = 0; campaignStuckTicks = 0; return;
            }
            com.badlogic.gdx.scenes.scene2d.b root = g.getStage().i();
            com.perblue.rpg.ui.screens.BaseScreen sc = g.getScreenManager().getScreen();
            // victory overlay can sit on top of the combat screen — handle it first
            com.badlogic.gdx.scenes.scene2d.b victory = searchActor(root, "VICTORY_CONTINUE_BUTTON");
            if (victory != null && victory.isVisible() && victory.getParent() != null) {
                campaignStuckTicks = 0; tapActorCenter(victory, "campaign victory"); return;
            }
            if (sc instanceof com.perblue.rpg.ui.screens.AttackScreen) {
                combatStep((com.perblue.rpg.ui.screens.AttackScreen) sc); return;
            }
            if (sc instanceof com.perblue.rpg.ui.screens.CampaignBattleInfoScreen) {
                com.badlogic.gdx.scenes.scene2d.b c = searchActor(root, "CAMPAIGN_BATTLE_INFO_CONTINUE");
                if (c != null && c.isVisible()) { campaignStuckTicks = 0; tapActorCenter(c, "campaign battle-info continue"); }
                return;
            }
            if (sc instanceof com.perblue.rpg.ui.screens.HeroChooserScreen) {
                com.badlogic.gdx.scenes.scene2d.b f = searchActor(root, "HERO_CHOOSER_FIGHT_BUTTON");
                if (f != null && f.isVisible()) { campaignStuckTicks = 0; tapActorCenter(f, "campaign fight"); }
                return;
            }
            if (sc instanceof com.perblue.rpg.ui.screens.CampaignChooserScreen) {
                com.badlogic.gdx.scenes.scene2d.b mv =
                        searchActorByType(root, com.perblue.rpg.ui.widgets.campaign.CampaignMapView.class);
                if (mv == null) return;
                // The next level = the lowest-level node not yet completed (starsEarned<=0).
                // getPointerNode(i) is only node index i (=level 1), so pick from the node list.
                java.lang.reflect.Field nf =
                        com.perblue.rpg.ui.widgets.campaign.CampaignMapView.class.getDeclaredField("nodes");
                nf.setAccessible(true);
                Object nodes = nf.get(mv);
                java.lang.reflect.Field lvF =
                        com.perblue.rpg.ui.widgets.campaign.MapNode.class.getDeclaredField("level");
                java.lang.reflect.Field stF =
                        com.perblue.rpg.ui.widgets.campaign.MapNode.class.getDeclaredField("starsEarned");
                lvF.setAccessible(true); stF.setAccessible(true);
                com.perblue.rpg.ui.widgets.campaign.MapNode best = null; int bestLevel = Integer.MAX_VALUE;
                if (nodes instanceof Iterable) for (Object o : (Iterable<?>) nodes) {
                    if (o == null) continue;
                    com.perblue.rpg.ui.widgets.campaign.MapNode n =
                            (com.perblue.rpg.ui.widgets.campaign.MapNode) o;
                    int lv = lvF.getInt(n), st = stF.getInt(n);
                    if (st <= 0 && lv < bestLevel) { bestLevel = lv; best = n; }
                }
                if (best == null) {
                    System.out.println("[campaign] chapter complete (all levels done). Stopping autocampaign.");
                    autoCampaignPeriod = 0; return;
                }
                campaignStuckTicks = 0;
                tapActorCenter(best, "campaign level " + bestLevel);
            }
        } catch (Throwable t) {
            System.out.println("[driver] campaign error: " + t);
        }
    }

    /** Depth-first search for the first actor that is an instance of the given type. */
    private com.badlogic.gdx.scenes.scene2d.b searchActorByType(com.badlogic.gdx.scenes.scene2d.b a, Class<?> type) {
        if (a == null) return null;
        if (type.isInstance(a)) return a;
        if (a instanceof com.badlogic.gdx.scenes.scene2d.e) {
            for (Object ch : (Iterable<?>) ((com.badlogic.gdx.scenes.scene2d.e) a).getChildren()) {
                com.badlogic.gdx.scenes.scene2d.b r = searchActorByType((com.badlogic.gdx.scenes.scene2d.b) ch, type);
                if (r != null) return r;
            }
        }
        return null;
    }

    /** Force the tutorial to recompute its pointers/narrators for the current step, so we
     *  never read a stale target left over from the previous step (which would make
     *  taparrow click the wrong actor right after a transition). */
    private void refreshTut(com.perblue.rpg.game.objects.User u) {
        try {
            com.perblue.rpg.game.tutorial.TutorialHelper.markPointersAndNarratorsDirty();
            com.perblue.rpg.game.tutorial.TutorialHelper.getPointers(u); // triggers the recompute
        } catch (Throwable ignore) {}
    }

    /** Handle the rare guided steps that expect a tap on a specific element the tutorial
     *  does NOT emit a pointer for. Currently: INTRO step 59 (S_OPEN_FIRST_LEVEL) — the
     *  campaign level-1 node, resolved by its game-assigned tutorial name (no pixels). */
    private boolean noPointerActionStep(com.perblue.rpg.RPGMain g,
            com.perblue.rpg.game.objects.User u, com.perblue.rpg.ui.screens.BaseScreen sc) {
        if (!(sc instanceof com.perblue.rpg.ui.screens.CampaignChooserScreen)) return false;
        com.perblue.rpg.game.objects.IUserTutorialAct intro =
                u.getTutorialAct(com.perblue.rpg.network.messages.TutorialActType.INTRO);
        if (intro == null || intro.getStep() != 59) return false;   // S_OPEN_FIRST_LEVEL
        com.badlogic.gdx.scenes.scene2d.i stage = g.getStage();
        if (stage == null) return false;
        com.badlogic.gdx.scenes.scene2d.b node = searchActor(stage.i(), "CAMPAIGN_SCREEN_LEVEL_1");
        if (node == null || !node.isVisible()) return false;
        return tapActorCenter(node, "campaign level-1 node");
    }

    /** The scene2d actor the first live tutorial pointer points at (or null). Prefers the
     *  screen's resolved pointers; falls back to a name search over the WHOLE stage so
     *  targets inside modal overlays (e.g. the New-Hero reveal close button) also resolve. */
    private com.badlogic.gdx.scenes.scene2d.b firstPointerTarget(
            com.perblue.rpg.RPGMain g, com.perblue.rpg.game.objects.User u) throws Exception {
        com.perblue.rpg.ui.screens.BaseScreen sc = g.getScreenManager().getScreen();
        if (sc != null) {
            java.lang.reflect.Field f = com.perblue.rpg.ui.screens.BaseScreen.class.getDeclaredField("questPointers");
            f.setAccessible(true);
            Object arr = f.get(sc);
            if (arr instanceof Iterable) for (Object o : (Iterable<?>) arr) {
                if (o == null) continue;
                com.badlogic.gdx.scenes.scene2d.b tgt =
                        ((com.perblue.rpg.ui.widgets.TutorialPointer) o).getTarget();
                if (tgt != null) return tgt;
            }
        }
        // Fallback: match the pointer's actor-tutorial-name anywhere on the stage.
        com.badlogic.gdx.scenes.scene2d.i stage = g.getStage();
        if (stage == null) return null;
        for (com.perblue.rpg.game.tutorial.TutorialPointerInfo pi
                : com.perblue.rpg.game.tutorial.TutorialHelper.getPointers(u)) {
            if (pi == null) continue;
            com.badlogic.gdx.scenes.scene2d.b a = searchActor(stage.i(), pi.getActorTutorialName());
            if (a != null) return a;
        }
        return null;
    }

    /** Depth-first search for an actor by its scene2d tutorial name. */
    private com.badlogic.gdx.scenes.scene2d.b searchActor(com.badlogic.gdx.scenes.scene2d.b a, String name) {
        if (a == null || name == null) return null;
        if (name.equals(a.getTutorialName())) return a;
        if (a instanceof com.badlogic.gdx.scenes.scene2d.e) {
            for (Object ch : (Iterable<?>) ((com.badlogic.gdx.scenes.scene2d.e) a).getChildren()) {
                com.badlogic.gdx.scenes.scene2d.b r = searchActor((com.badlogic.gdx.scenes.scene2d.b) ch, name);
                if (r != null) return r;
            }
        }
        return null;
    }

    /** Print the current in-memory tutorial/UI state — active tutorial step, the
     *  yellow-arrow targets (UIComponentName + text) and any showing dialogue — so we
     *  know exactly what the game expects next WITHOUT a screenshot. Read-only. */
    private void tutInfo() {
        try {
            com.perblue.rpg.RPGMain g = host.game();
            if (g == null) { System.out.println("[tut] no game"); return; }
            com.perblue.rpg.game.objects.User u = g.getYourUser();
            if (u == null) { System.out.println("[tut] no user (not booted)"); return; }
            StringBuilder sb = new StringBuilder("[tut]");
            try {
                com.perblue.rpg.ui.screens.BaseScreen sc = g.getScreenManager().getScreen();
                sb.append(" screen=").append(sc == null ? "null" : sc.getClass().getSimpleName());
            } catch (Throwable ignore) {}
            for (com.perblue.rpg.network.messages.TutorialActType t
                    : com.perblue.rpg.network.messages.TutorialActType.valuesCached()) {
                com.perblue.rpg.game.objects.IUserTutorialAct a = u.getTutorialAct(t);
                if (a == null) continue;
                sb.append(" ").append(t).append("(step=").append(a.getStep()).append(")");
            }
            System.out.println(sb.toString());
            boolean narr = com.perblue.rpg.game.tutorial.TutorialHelper.isNarratorShowing(u);
            System.out.println("[tut] narratorShowing=" + narr);
            if (narr) for (com.perblue.rpg.game.tutorial.Narrator n
                    : com.perblue.rpg.game.tutorial.TutorialHelper.getNarrators(u)) {
                if (n != null) System.out.println("[tut]   narrator@" + n.getLocation() + ": " + n.getText());
            }
            boolean ptr = com.perblue.rpg.game.tutorial.TutorialHelper.isAnyPointerShowing();
            System.out.println("[tut] pointerShowing=" + ptr);
            for (com.perblue.rpg.game.tutorial.TutorialPointerInfo p
                    : com.perblue.rpg.game.tutorial.TutorialHelper.getPointers(u)) {
                if (p != null) System.out.println("[tut]   pointAt=" + p.getPointAt()
                        + " actor=" + p.getActorTutorialName() + " text=" + p.getPointerText());
            }
        } catch (Throwable t) {
            System.out.println("[driver] tutinfo error: " + t);
            t.printStackTrace(System.out);
        }
    }
}
