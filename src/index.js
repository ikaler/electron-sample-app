const electron = require('electron')
const path = require('path')
//const glob = require('glob')
//const autoUpdater = require('./auto-updater')

const BrowserWindow = electron.BrowserWindow
const app = electron.app
const Tray = electron.Tray
const globalShortcut = electron.globalShortcut

const debug = /--debug/.test(process.argv[2])


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

  let windowOptions = {
    width: 1024,
    minWidth: 680,
    height: 768,
    title: app.getName(),
    icon: path.join(__dirname , '/assets/images/app-icon.png')
  }

  mainWindow = new BrowserWindow(windowOptions)

  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

  // Launch fullscreen with DevTools open, usage: npm run debug
  if (debug) {
    mainWindow.webContents.openDevTools()
    mainWindow.maximize()
    require('devtron').install()
  }

  globalShortcut.register('CmdOrCtrl+Shift+d', ()=> {
    mainWindow.webContents.toggleDevTools();
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('quit', ()=>{
  globalShortcut.unregisterAll()
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})