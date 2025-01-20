import { ipcMain, app} from "electron";
import { getMainWindow } from './main';
import path from 'path';
import fs from 'fs';

const  setupAlertSoundFile = ()  => {
  const appDataDir = app.getPath('userData');
  console.log('App Data directory:', appDataDir);

  const targetFilePath = path.join(appDataDir, 'alert.mp3');

  let sourceFilePath =   path.join(process.resourcesPath, 'assets/sounds/alert.mp3');
    if (!app.isPackaged) {
      // development
      sourceFilePath =   path.join(__dirname, '../../assets/sounds/alert.mp3');
    }

  if (!fs.existsSync(targetFilePath)) {
    try {
      fs.copyFileSync(sourceFilePath, targetFilePath);
      console.log('MP3 file copied to App Data directory:', targetFilePath);
    } catch (err) {
      console.error('Error copying MP3 file:', err);
    }
  } else {
    console.log('MP3 file already exists in App Data directory.');
  }
}

const getAudioFilePath = () => {
  return `file://${path.join(app.getPath('userData'), 'alert.mp3')}`;
};

export const registerAlertHandler = () => {

  setupAlertSoundFile()

  ipcMain.on("trigger-warning-alerts", (event, alertOptions) => {
    console.log("trigger-warning-alerts", event, alertOptions);


    const mainWindow = getMainWindow();

    if (mainWindow && alertOptions.visualAlertEnabled) {
      mainWindow.focus();
      mainWindow.flashFrame(true);
    }
  });

  ipcMain.handle('get-alert-sound-file', async () => {
    const audioFilePath = getAudioFilePath();
    return audioFilePath;
  });
};



export const destroyAlertHandler = () => {
  ipcMain.removeAllListeners("set-custom-sound");
  ipcMain.removeAllListeners("trigger-warning-alerts");
}
