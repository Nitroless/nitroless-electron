const { BrowserWindow } = require('glasstron');
const { app, shell, Tray, Menu, screen, ipcMain, dialog } = require('electron');
app.commandLine.appendSwitch("enable-transparent-visuals");

const trayWindow = require("electron-tray-window");
const path = require('path');

let window;
let deeplinkingUrl;

function createWindow() {
	window = new BrowserWindow({
		width: 512,
		height: 512,
		frame: false,
        show: false,
        backgroundColor: "#36393f70",
		title: "Nitroless",
        icon: path.join(__dirname, "Nitroless.png"),
		autoHideMenuBar: true,
        skipTaskbar: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: true,
            webSecurity: false,
            preload: path.join(__dirname, "build/preload.js")
		},
	})

    window.blurType = 'acrylic';
    window.setBlur(true);
    // window.loadURL('http://localhost:3000')

    //Test Build
    window.loadFile(path.resolve('./build/index.html'))

	// Open links in browser
	window.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})
}

function createAddRepoWindow(argv) {
    if (process.platform !== 'darwin') {
        let newRepo;
        // Find the arg that is our custom protocol url and store it
        if (argv) {
            deeplinkingUrl = argv.find((arg) => arg.startsWith('nitroless://'));
            newRepo = deeplinkingUrl.split('nitroless://add-repository/?url=')[1];
        }

        let display = screen.getPrimaryDisplay();
        let width = display.bounds.width;
        let height = display.bounds.height;

        const win = new BrowserWindow({
            width: 300,
            height: 200,
            x: width - 400,
            y: height - 275,
            skipTaskbar: true,
            frame: false,
            show: true,
            backgroundColor: "#36393f70",
            title: "Add Repository",
            icon: __dirname + '/Nitroless.png',
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: true,
                preload: path.join(__dirname, "build/addRepoPreload.js")
            }
        });

        win.blurType = 'acrylic';
        win.setBlur(true);

        ipcMain.on("closeWindow", (event, args) => {
            win.destroy();
            window.show();
            setTimeout(() => {
                window.webContents.send('reload');
            }, 150)
        });

        win.loadFile(path.resolve('./build/add-repo.html'));

        win.webContents.on('did-finish-load', () => {
            if(newRepo !== undefined)
            win.webContents.send('getRepo', newRepo);
        });
    }
}

function init() {
    ipcMain.on("exit", () => {
        window.hide();
        let display = screen.getPrimaryDisplay();
        let width = display.bounds.width;
        let height = display.bounds.height;

        const win = new BrowserWindow({
            width: 300,
            height: 200,
            x: width - 400,
            y: height - 275,
            skipTaskbar: true,
            frame: false,
            show: true,
            backgroundColor: "#36393f70",
            title: "Quit Nitroless?",
            icon: __dirname + '/Nitroless.png',
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: true,
                preload: path.join(__dirname, "build/quitAppPreload.js")
            }
        });

        win.blurType = 'acrylic';
        win.setBlur(true);

        win.loadFile(path.resolve('./build/quit-app.html'));

        ipcMain.on("closeWindow", (event, args) => {
            win.destroy();
            window.show();
            setTimeout(() => {
                window.webContents.send('reload');
            }, 150)
        });

        ipcMain.on("exitApp", (event, args) => {
            app.exit();
        });
    });

    ipcMain.on("addRepo", () => {
        window.hide();
        createAddRepoWindow();
    })

    ipcMain.on("minimize", (e) => {
        const win = BrowserWindow.fromWebContents(e.sender);
        win.hide();
    });

    ipcMain.on("openSite", (e, args) => {
        shell.openExternal(args);
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
                        y: height - 275,
                        skipTaskbar: true,
                        frame: false,
                        show: true,
                        backgroundColor: "#36393f70",
                        title: "Quit Nitroless?",
                        icon: __dirname + '/Nitroless.png',
                        autoHideMenuBar: true,
                        webPreferences: {
							nodeIntegration: true,
							contextIsolation: true,
                            preload: path.join(__dirname, "build/quitAppPreload.js")
						}
                    });

                    win.blurType = 'acrylic';
                    win.setBlur(true);

                    win.loadFile(path.resolve('./build/quit-app.html'));

                    ipcMain.on("closeWindow", (event, args) => {
                        win.destroy();
                        window.show();
                        setTimeout(() => {
                            window.webContents.send('reload');
                        }, 150)
                    });

                    ipcMain.on("exitApp", (event, args) => {
                        app.exit();
                    });
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

// if (isDev && process.platform === 'win32') {
//     // Set the path of electron.exe and your app.
//     // These two additional parameters are only available on windows.
//     // Setting this is required to get this working in dev mode.
//     app.setAsDefaultProtocolClient('nitroless', process.execPath, [
//         path.resolve(process.argv[1])
//     ]);
// } else {
//     app.setAsDefaultProtocolClient('nitroless');
// }

app.setAsDefaultProtocolClient('nitroless');
  
// Force single application instance
const gotTheLock = app.requestSingleInstanceLock();
  
if (!gotTheLock) {
    app.quit();
    return;
} else {
    app.on('second-instance', (e, argv) => {
        createAddRepoWindow(argv);

        if (window) {
            if (window.isMinimized()) window.restore();
            window.focus();
        }
    });
}