package dsbackend;

/**
 * Silent Audio backend (com.badlogic.gdx.d). Returns no-op Sound/Music so the
 * game boots without OpenAL. Real audio is a later step; not on the render path.
 */
public final class DsAudio implements com.badlogic.gdx.d {
    public void dispose() { }
    public void pause() { }
    public void resume() { }
    public void stopAllSounds() { }
    public com.badlogic.gdx.b.c newSound(com.badlogic.gdx.c.a file) { return new DsSound(); }
    public com.badlogic.gdx.b.b newMusic(com.badlogic.gdx.c.a file) { return new DsMusic(); }

    /** No-op Sound (com.badlogic.gdx.b.c). */
    static final class DsSound implements com.badlogic.gdx.b.c {
        public long play(float volume) { return 0; }
        public long play(float volume, float pitch, float pan) { return 0; }
        public long loop() { return 0; }
        public long loop(float volume) { return 0; }
        public void stop() { }
        public void stop(long id) { }
        public void pause(long id) { }
        public void resume(long id) { }
        public void setVolume(long id, float volume) { }
        public void dispose() { }
    }

    /** No-op Music (com.badlogic.gdx.b.b). */
    static final class DsMusic implements com.badlogic.gdx.b.b {
        private float volume = 1f;
        public void play() { }
        public void stop() { }
        public boolean isPlaying() { return false; }
        public void setLooping(boolean b) { }
        public void setVolume(float v) { this.volume = v; }
        public float getVolume() { return volume; }
        public void dispose() { }
    }
}
