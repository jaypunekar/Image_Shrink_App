const { app, BrowserWindow } = require('electron')

let mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        title: "ImageShrink",
        width: 500, 
        height: 600,
        icon: './assets/icons/icon_256x256.png'
    });

    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    mainWindow.loadFile('./app/index.html')
}

app.on('ready', createWindow)