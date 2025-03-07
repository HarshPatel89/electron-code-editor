const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // Security best practice
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
});

ipcMain.handle('open-file', async () => {
    const { filePaths } = await dialog.showOpenDialog({
        properties: ['openFile']
    });

    if (filePaths.length > 0) {
        return fs.readFileSync(filePaths[0], 'utf-8');
    }
    return null;
});

ipcMain.handle('save-file', async (event, content) => {
    const { filePath } = await dialog.showSaveDialog({});
    if (filePath) {
        fs.writeFileSync(filePath, content, 'utf-8');
        return "File saved successfully!";
    }
    return "Save cancelled.";
});
