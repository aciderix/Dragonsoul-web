package com.perblue.rpg.network;

import java.util.*;

/**
 * Web-compatible stub for NetworkProvider.
 * Replaces the Android version that uses LinkedBlockingQueue.
 * TODO: Implement WebSocket networking for production.
 */
public class NetworkProvider {
    private volatile boolean disconnected;
    private volatile boolean paused;
    
    public NetworkProvider(Runnable reconnectRunnable, Runnable sendFailRunnable) {
        // No threading in browser - no LBQ needed
    }
    
    public void connectToServer(Runnable success, Runnable failure) {
        System.out.println("[Web] NetworkProvider.connectToServer - stub");
    }
    
    public void sendMessage(com.perblue.a.a.i message) {
        System.out.println("[Web] NetworkProvider.sendMessage - stub");
    }
    
    public void sendMessage(com.perblue.a.a.i message, boolean retry) {
        System.out.println("[Web] NetworkProvider.sendMessage - stub");
    }
    
    public void setAddress(String host, int port) {}
    
    public <M extends com.perblue.a.a.i> void setListener(
            Class<M> type, com.perblue.a.a.h<M> listener) throws com.perblue.a.a.g {}
    
    public void onReconnect() {}
    public void onStop(boolean disconnect, long delay) {}
    public void setDisconnected() { disconnected = true; }
    public void setPaused(boolean p) { paused = p; }
    public boolean isReconnecting() { return false; }
    public Exception getError() { return null; }
    public String getHost() { return "localhost"; }
}
