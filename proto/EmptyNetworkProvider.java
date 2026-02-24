package com.perblue.rpg.network;

public class EmptyNetworkProvider extends NetworkProvider {
    private static final Runnable emptyRunnable = new Runnable() { public void run() {} };
    
    public EmptyNetworkProvider() {
        super(emptyRunnable, emptyRunnable);
    }
    
    public void connectToServer(Runnable s, Runnable f) {}
    public void onReconnect() {}
    public void onStop(boolean d, long l) {}
    public void sendMessage(com.perblue.a.a.i m) {}
    public void sendMessage(com.perblue.a.a.i m, boolean r) {}
}
