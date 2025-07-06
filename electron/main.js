const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true
    }
  });

  // Carga el index.html generado por Angular
  win.loadFile(path.join(__dirname, '../dist/Spike/browser/index.html'));

  // Abre DevTools (puedes comentar esto después)
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
});
