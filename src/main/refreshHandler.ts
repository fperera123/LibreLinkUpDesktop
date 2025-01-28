import { BrowserWindow, ipcMain } from "electron"

export const registerRefreshHandler = () => {
  ipcMain.on('refresh-all', () => {
    BrowserWindow.getAllWindows().forEach(window => {
      if (window.webContents) {
        window.webContents.reload();
      }
    });
  });

  ipcMain.on('refresh-primary', () => {
    BrowserWindow.getAllWindows().forEach(window => {
      if (window.isPrimary && window.webContents) {
        window.webContents.reload();
      }
    });
  });
}

export const destroyRefreshHandler = () => {
  ipcMain.removeAllListeners('refresh-all');
  ipcMain.removeAllListeners('refresh-primary')
}
