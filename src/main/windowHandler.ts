import { BrowserWindow, ipcMain, app } from 'electron';
import path from 'path';
import { resolveHtmlPath } from './util';
import { WindowModeManager } from './windowMode';

interface WindowCache {
  [url: string]: BrowserWindow | undefined;
}

export const registerWindowHandlers = () => {
  const windowCache: WindowCache = {};

  const windowModeManager = new WindowModeManager('main-window');


  // 👉 register window handlers
  ipcMain.on('open-new-window', (event, url, width, height) => {
    // Check if the window for this URL already exists
    if (windowCache[url]) {
      // Focus the existing window if it exists
      if (windowCache[url]) {
        windowCache[url]?.focus();
      }
      return;
    }

    const newWindow = new BrowserWindow({
      width,
      height,
      webPreferences: {
        webSecurity: false,
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    newWindow.loadURL(resolveHtmlPath('index.html'));
    windowCache[url] = newWindow;


    newWindow.on('closed', () => {
      windowCache[url] = undefined;
    });

  });

  ipcMain.on('set-window-mode', (event, mode: 'overlay' | 'windowed') => {
    windowModeManager.setWindowMode(mode);

    // in order to change window options we need to restart
    app.relaunch();
    app.exit();
  });

  ipcMain.handle('get-window-mode', () => {
    return windowModeManager.getWindowMode();
  });
};

export const destroyWindowHandlers = () => {
  // 👉 destroy window handlers
  ipcMain.removeAllListeners('open-new-window');
  ipcMain.removeAllListeners('set-window-mode');
  ipcMain.removeAllListeners('get-window-mode');
};
