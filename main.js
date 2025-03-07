// const { app, BrowserWindow, dialog, ipcMain } = require('electron');
// const fs = require('fs');
// const path = require('path');

// let mainWindow;

// app.whenReady().then(() => {
//     mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             nodeIntegration: false,
//             contextIsolation: true,
//             preload: path.join(__dirname, 'preload.js')
//         }
//     });

//     mainWindow.loadFile('index.html');
// });

// ipcMain.handle('open-file', async () => {
//     const { filePaths } = await dialog.showOpenDialog({
//         properties: ['openFile']
//     });

//     if (filePaths.length > 0) {
//         return fs.readFileSync(filePaths[0], 'utf-8');
//     }
//     return null;
// });

// ipcMain.handle('save-file', async (event, content) => {
//     const { filePath } = await dialog.showSaveDialog({});
//     if (filePath) {
//         fs.writeFileSync(filePath, content, 'utf-8');
//         return "File saved successfully!";
//     }
//     return "Save cancelled.";
// });





const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const fs = require("fs");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: false, // Keep false for security
            contextIsolation: true, // Enable secure IPC communication
            preload: __dirname + "/preload.js", // Preload script for safe communication
        },
    });

    mainWindow.loadFile("index.html");
});

// Handle Open File Request
ipcMain.handle("open-file", async () => {
    const { filePaths } = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "All Files", extensions: ["*"] }],
    });

    if (filePaths.length > 0) {
        return fs.readFileSync(filePaths[0], "utf-8");
    }
    return null;
});

// Handle Save File Request
ipcMain.handle("save-file", async (event, content) => {
    const { filePath } = await dialog.showSaveDialog({
        filters: [{ name: "All Files", extensions: ["*"] }],
    });

    if (filePath) {
        fs.writeFileSync(filePath, content, "utf-8");
        return true;
    }
    return false;
});
