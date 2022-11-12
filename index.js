const { BrowserWindow } = require('electron-acrylic-window');
const { app, shell, Tray, Menu, screen, ipcMain } = require('electron');
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
			contextIsolation: false,
            webSecurity: false
		},
		vibrancy: vibrancy,
	})

    isDev ? window.loadURL('http://localhost:3000') : window.loadFile(path.resolve('./build/index.html'))

	// Open links in browser
	window.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})

    ipcMain.on("exit", () => {
        app.exit();
    })

    ipcMain.on("minimize", (e) => {
        const win = BrowserWindow.fromWebContents(e.sender);
        win.hide();
    });
}

function init() {
    createWindow();
    let tray = new Tray(path.join(__dirname, 'TrayIcon.png'));

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