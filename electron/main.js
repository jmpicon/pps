const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'icon.png'),
    title: 'PPS - Plataforma de Estudio'
  })

  // En desarrollo usa el servidor Next.js; en producción los archivos estáticos
  const isDev = process.env.ELECTRON_DEV === '1' || !app.isPackaged
  if (isDev) {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
  } else {
    const indexPath = app.isPackaged
      ? path.join(process.resourcesPath, 'app', 'out', 'index.html')
      : path.join(__dirname, '..', 'out', 'index.html')
    win.loadFile(indexPath)
  }

  win.on('closed', () => {
    app.quit()
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
