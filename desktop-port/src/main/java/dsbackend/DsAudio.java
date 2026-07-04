package dsbackend;

import java.io.File;
import java.nio.*;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import org.lwjgl.openal.*;
import org.lwjgl.stb.STBVorbis;
import org.lwjgl.stb.STBVorbisInfo;
import org.lwjgl.system.MemoryStack;
import org.lwjgl.system.MemoryUtil;

import static org.lwjgl.openal.AL10.*;
import static org.lwjgl.openal.ALC10.*;

/**
 * Real desktop Audio backend (com.badlogic.gdx.d) using OpenAL (via LWJGL) with
 * STB Vorbis for OGG decoding. Sounds are fully decoded into an AL buffer; music
 * is streamed and pumped from {@link #update()} on the render thread.
 *
 * Degrades gracefully: if no audio device is available (headless), it disables
 * output but still returns valid Sound/Music objects so game logic never NPEs.
 * See SHIMS.md.
 */
public final class DsAudio implements com.badlogic.gdx.d {
    private long device, context;
    private boolean enabled;
    private final List<DsMusic> musics = new ArrayList<>();

    public DsAudio() {
        try {
            device = alcOpenDevice((ByteBuffer) null);
            if (device == 0L) { System.out.println("[audio] no OpenAL device — audio disabled"); return; }
            ALCCapabilities alcCaps = ALC.createCapabilities(device);
            context = alcCreateContext(device, (IntBuffer) null);
            if (context == 0L || !alcMakeContextCurrent(context)) { System.out.println("[audio] no OpenAL context — audio disabled"); return; }
            AL.createCapabilities(alcCaps);
            enabled = true;
            System.out.println("[audio] OpenAL ready: " + alcGetString(device, ALC_DEVICE_SPECIFIER));
        } catch (Throwable t) {
            System.out.println("[audio] init failed — audio disabled: " + t);
        }
    }

    /** Pump streaming music; call once per frame from the render thread. */
    public void update() {
        if (!enabled) return;
        synchronized (musics) { for (DsMusic m : musics) m.update(); }
    }

    public void dispose() {
        if (context != 0L) alcDestroyContext(context);
        if (device != 0L) alcCloseDevice(device);
    }
    public void pause() { }
    public void resume() { }
    public void stopAllSounds() { }

    public com.badlogic.gdx.b.c newSound(com.badlogic.gdx.c.a file) { return new DsSound(readOgg(file)); }
    public com.badlogic.gdx.b.b newMusic(com.badlogic.gdx.c.a file) {
        DsMusic m = new DsMusic(file);
        synchronized (musics) { musics.add(m); }
        return m;
    }

    private static byte[] readOgg(com.badlogic.gdx.c.a fh) {
        try { return Files.readAllBytes(fh.g().toPath()); } catch (Exception e) { return null; }
    }

    // ---- decode a whole OGG to an interleaved 16-bit PCM buffer ----
    static final class Pcm { ShortBuffer samples; int channels, rate; }
    static Pcm decode(byte[] ogg) {
        if (ogg == null) return null;
        ByteBuffer enc = MemoryUtil.memAlloc(ogg.length);
        enc.put(ogg).flip();
        try (MemoryStack stack = MemoryStack.stackPush()) {
            IntBuffer ch = stack.mallocInt(1), rate = stack.mallocInt(1);
            ShortBuffer pcm = STBVorbis.stb_vorbis_decode_memory(enc, ch, rate);
            if (pcm == null) return null;
            Pcm p = new Pcm(); p.samples = pcm; p.channels = ch.get(0); p.rate = rate.get(0);
            return p;
        } finally { MemoryUtil.memFree(enc); }
    }

    static int alFormat(int channels) { return channels == 1 ? AL_FORMAT_MONO16 : AL_FORMAT_STEREO16; }

    // ---- Sound: com.badlogic.gdx.b.c ----
    final class DsSound implements com.badlogic.gdx.b.c {
        private int buffer = -1;
        private final List<Integer> sources = new ArrayList<>();
        DsSound(byte[] ogg) {
            if (!enabled) return;
            Pcm p = decode(ogg);
            if (p == null) return;
            buffer = alGenBuffers();
            alBufferData(buffer, alFormat(p.channels), p.samples, p.rate);
            MemoryUtil.memFree(p.samples);
        }
        private long start(float volume, boolean loop) {
            if (!enabled || buffer < 0) return 0;
            int src = alGenSources();
            alSourcei(src, AL_BUFFER, buffer);
            alSourcef(src, AL_GAIN, volume);
            alSourcei(src, AL_LOOPING, loop ? AL_TRUE : AL_FALSE);
            alSourcePlay(src);
            sources.add(src);
            return src;
        }
        public long play(float volume) { return start(volume, false); }
        public long play(float volume, float pitch, float pan) { long id = start(volume, false); if (id != 0) alSourcef((int) id, AL_PITCH, pitch); return id; }
        public long loop() { return start(1f, true); }
        public long loop(float volume) { return start(volume, true); }
        public void stop() { for (int s : sources) alSourceStop(s); }
        public void stop(long id) { if (id != 0) alSourceStop((int) id); }
        public void pause(long id) { if (id != 0) alSourcePause((int) id); }
        public void resume(long id) { if (id != 0) alSourcePlay((int) id); }
        public void setVolume(long id, float volume) { if (id != 0) alSourcef((int) id, AL_GAIN, volume); }
        public void dispose() { for (int s : sources) alDeleteSources(s); if (buffer >= 0) alDeleteBuffers(buffer); }
    }

    // ---- Music: com.badlogic.gdx.b.b (streamed) ----
    final class DsMusic implements com.badlogic.gdx.b.b {
        private final com.badlogic.gdx.c.a file;
        private ByteBuffer enc;
        private long handle;
        private int channels, rate, source = -1;
        private int[] buffers;
        private boolean playing, looping;
        private float volume = 1f;
        private final ShortBuffer scratch = MemoryUtil.memAllocShort(4096 * 2);

        DsMusic(com.badlogic.gdx.c.a file) { this.file = file; }

        private boolean open() {
            if (!enabled) return false;
            byte[] ogg = readOgg(file);
            if (ogg == null) return false;
            enc = MemoryUtil.memAlloc(ogg.length); enc.put(ogg).flip();
            boolean dbg = Boolean.getBoolean("DS_AUDIO_DEBUG");
            if (dbg) System.err.println("[music] opening " + ogg.length + " bytes");
            try (MemoryStack stack = MemoryStack.stackPush()) {
                IntBuffer err = stack.mallocInt(1);
                handle = STBVorbis.stb_vorbis_open_memory(enc, err, null);
                if (dbg) System.err.println("[music] handle=" + handle + " err=" + err.get(0));
                if (handle == 0L) { MemoryUtil.memFree(enc); enc = null; return false; }
                if (dbg) System.err.println("[music] malloc info...");
                STBVorbisInfo info = STBVorbisInfo.malloc(stack);
                if (dbg) System.err.println("[music] get_info...");
                STBVorbis.stb_vorbis_get_info(handle, info);
                channels = info.channels(); rate = info.sample_rate();
            }
            if (dbg) System.err.println("[music] channels=" + channels + " rate=" + rate);
            source = alGenSources();
            alSourcef(source, AL_GAIN, volume);
            buffers = new int[3];
            for (int i = 0; i < 3; i++) { buffers[i] = alGenBuffers(); if (!stream(buffers[i])) break; }
            return true;
        }

        private boolean stream(int buffer) {
            int got = STBVorbis.stb_vorbis_get_samples_short_interleaved(handle, channels, scratch);
            if (got <= 0) {
                if (looping) { STBVorbis.stb_vorbis_seek_start(handle);
                    got = STBVorbis.stb_vorbis_get_samples_short_interleaved(handle, channels, scratch); }
                if (got <= 0) return false;
            }
            scratch.position(0).limit(got * channels);
            alBufferData(buffer, alFormat(channels), scratch, rate);
            scratch.clear();
            alSourceQueueBuffers(source, buffer);
            return true;
        }

        public void play() {
            if (!enabled) { playing = true; return; }
            if (source < 0 && !open()) return;
            alSourcePlay(source); playing = true;
        }
        void update() {
            if (!enabled || !playing || source < 0) return;
            int processed = alGetSourcei(source, AL_BUFFERS_PROCESSED);
            while (processed-- > 0) {
                int buf = alSourceUnqueueBuffers(source);
                if (stream(buf) && alGetSourcei(source, AL_SOURCE_STATE) != AL_PLAYING) alSourcePlay(source);
            }
            if (alGetSourcei(source, AL_SOURCE_STATE) == AL_STOPPED && !looping) playing = false;
        }
        public void stop() { if (enabled && source >= 0) alSourceStop(source); playing = false; }
        public boolean isPlaying() { return playing; }
        public void setLooping(boolean b) { looping = b; }
        public void setVolume(float v) { volume = v; if (enabled && source >= 0) alSourcef(source, AL_GAIN, v); }
        public float getVolume() { return volume; }
        public void dispose() {
            if (enabled && source >= 0) { alSourceStop(source); alDeleteSources(source); if (buffers != null) for (int b : buffers) alDeleteBuffers(b); }
            if (handle != 0L) STBVorbis.stb_vorbis_close(handle);
            if (enc != null) MemoryUtil.memFree(enc);
            MemoryUtil.memFree(scratch);
        }
    }
}
