const { BrowserWindow } = require('electron-acrylic-window');
const { app, shell, Tray, Menu, screen, ipcMain, dialog } = require('electron');

const isDev = require('electron-is-dev');

const trayWindow = require("electron-tray-window");
const os = require('os');
const path = require('path');

function isVibrancySupported() {
	// Windows 10 or greater
	return (
		process.platform === 'win32' &&
		parseInt(os.release().split('.')[0]) >= 10
	)
}

let window
function createWindow() {
	let vibrancy = 'dark'

	if (isVibrancySupported()) {
		vibrancy = {
			theme: '#36393f70',
			effect: 'acrylic',
			useCustomWindowRefreshMethod: true,
			disableOnBlur: true,
			debug: false,
		}
	}

	window = new BrowserWindow({
		width: 512,
		height: 512,
		frame: false,
        show: false,
        backgroundColor: "#36393f70",
		title: "Nitroless",
        icon: __dirname + '/Nitroless.png',
		autoHideMenuBar: true,
        skipTaskbar: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: true,
            webSecurity: false,
            preload: path.join(__dirname, "react-app/public/preload.js")
		},
		vibrancy: vibrancy,
	})

    isDev ? window.loadURL('http://localhost:3000') : window.loadFile(path.resolve('./build/index.html'))

	// Open links in browser
	window.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})
}

function init() {
    ipcMain.on("exit", () => {
        app.exit();
    })

    ipcMain.on("minimize", (e) => {
        const win = BrowserWindow.fromWebContents(e.sender);
        win.hide();
    });

    ipcMain.handle("openSite", (e, args) => {
        const { url } = args;
        shell.openExternal(url);
    })

    createWindow();
    let tray = new Tray(path.join(__dirname, 'TrayIcon.png'));

    console.log(__dirname)

    setTimeout(() => {
        trayWindow.setOptions({
            tray: tray,
            window: window,
            margin_x: -200,
            margin_y: 30
        })
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Show App',
                click: () => {
                    window.show();
                }
            },
            {
                label: 'Quit',
                click: () => {
                    let display = screen.getPrimaryDisplay();
                    let width = display.bounds.width;
                    let height = display.bounds.height;
    
                    const win = new BrowserWindow({
                        width: 300,
                        height: 200,
                        x: width - 400,
                        y: height - 250,
                        frame: false,
                        show: true,
                        backgroundColor: "#36393f70",
                        title: "Quit Nitroless?",
                        icon: __dirname + '/Nitroless.png',
                        autoHideMenuBar: true,
                        webPreferences: {
							nodeIntegration: true,
							contextIsolation: false
						}
                    });

                    win.loadFile(path.resolve('quit-app.html'));
                }
            }
        ])

        tray.setToolTip('Nitroless');
        tray.setContextMenu(contextMenu);
    });
}

app.on('ready', init)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
	if (window === null) {
		createWindow()
	}
})

let deeplinkingUrl;

if (isDev && process.platform === 'win32') {
    // Set the path of electron.exe and your app.
    // These two additional parameters are only available on windows.
    // Setting this is required to get this working in dev mode.
    app.setAsDefaultProtocolClient('nitroless', process.execPath, [
      path.resolve(process.argv[1])
    ]);
  } else {
    app.setAsDefaultProtocolClient('nitroless');
  }
  
  // Force single application instance
  const gotTheLock = app.requestSingleInstanceLock();
  
  if (!gotTheLock) {
    app.quit();
    return;
  } else {
    app.on('second-instance', (e, argv) => {
      if (process.platform !== 'darwin') {
        // Find the arg that is our custom protocol url and store it
        deeplinkingUrl = argv.find((arg) => arg.startsWith('nitroless://'));
        console.log(deeplinkingUrl.split('nitroless://add-repository/?url=')[1]);
      }
  
      if (window) {
        if (window.isMinimized()) window.restore();
        window.focus();
      }
    });
  }
