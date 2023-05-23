const { app, BrowserWindow, Menu, globalShortcut } = require('electron')

process.env.NODE_ENV = 'devlopment';
isDev = process.env.NODE_ENV !== 'production' ? true : false;
isMac = process.platform == 'darwin' ? true : false;

let mainWindow;
let aboutWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        title: "ImageShrink",
        width: 500, 
        height: 600,
        icon: `${__dirname}/assets/icons/Icon_256x256.png`,
        resizable: isDev ? true : false
    });

    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    mainWindow.loadFile('./app/index.html')
}

const createAboutWindow = () => {
    aboutWindow = new BrowserWindow({
        title: "About ImageShrink",
        width: 300, 
        height: 300,
        icon: `${__dirname}/assets/icons/Icon_256x256.png`,
        resizable: false
    });

    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    aboutWindow.loadFile('./app/about.html')
}

app.on('ready', () => {
    createWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
    globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => mainWindow.toggleDevTools())


    mainWindow.on('closed', () => mainWindow = null);
})

const menu = [
    ...(isMac ? [
        {
            label: app.name,
            submenu: [
                {
                    label: "About",
                    click: createAboutWindow,
                }
            ]
        }
    ] : []),
    {
        role: 'fileMenu'
    },
    ...(!isMac ? [
        {
            label: 'Help',
            submenu: [
                {
                    label: "About",
                    click: createAboutWindow,
                }
            ]
        }
    ]: []),
    ...(isDev ? [
        {
            label: "Developer",
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {type: 'separator'},
                {role: 'toggleDevTools'}
            ]

        }
    ] : [])
]

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', () => {
  if (!isMac) app.quit()
})