export default {
  appId: "com.example.app",
  appName: "FileSyncApp",
  webDir: "www",
  bundledWebRuntime: false,

  server: {
    url: "http://192.168.0.104:8100",
    cleartext: true
  },

  android: {
    webContentsDebuggingEnabled: true // Enable WebView debugging
  }
};
