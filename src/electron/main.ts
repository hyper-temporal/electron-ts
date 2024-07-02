import { app, BrowserWindow, ipcMain } from 'electron';
import { IpcChannelInterface } from "./IPC/IpcChannelInterface";
import { SystemInfoChannel } from "./IPC/SystemInfoChannel";
import path = require('node:path')

class Main {
  private mainWindow: BrowserWindow;

  public init(ipcChannels: IpcChannelInterface[]) {
    app.on('ready', this.createWindow);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);
    // app.whenReady().then(() => {
    //   this.createWindow()
    // })   
    this.registerIpcChannels(ipcChannels);
  }

  private onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private onActivate() {
    if (!this.mainWindow) {
      this.createWindow();
    }
  }

  private createWindow() {
    this.mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
      title: `Yet another Electron Application`,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
      }
    });
    //this.mainWindow.webContents.openDevTools();
    this.mainWindow.loadFile('../../index.html');
  }

  private registerIpcChannels(ipcChannels: IpcChannelInterface[]) {
    ipcChannels.forEach(channel => ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)));
  }
}

(new Main()).init([
  new SystemInfoChannel()
]);

