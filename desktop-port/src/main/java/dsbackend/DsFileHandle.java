package dsbackend;

/**
 * FileHandle that keeps its <em>relative</em> path (so {@code path()} equals the
 * string the game asked for) while resolving reads elsewhere. libGDX keys every
 * loaded asset by the path string passed to {@code Gdx.files.internal(path)} — see
 * AssetManager. Returning absolute-path handles (as a naive desktop backend does)
 * breaks that invariant: a loader that queues a dependency from a resolved
 * FileHandle keys it under the absolute {@code path()}, while a sibling loader that
 * later does {@code get(relativeString)} misses it ("Asset not loaded"). This bit
 * SkeletonDataLoader (queues atlas via AssetDescriptor(FileHandle), then
 * get(param.atlasFile)). Using a Classpath handle with the original relative path —
 * and the assets root on the classpath — restores Android's behaviour: reads go
 * through {@link ClassLoader#getResourceAsStream} and {@code path()} stays relative.
 *
 * The (String, FileType) super-constructor is protected; this subclass exposes it.
 */
final class DsFileHandle extends com.badlogic.gdx.c.a {
    DsFileHandle(String path, com.badlogic.gdx.e.a type) { super(path, type); }
}
