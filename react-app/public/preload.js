const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    openSite: (args) => ipcRenderer.invoke('openSite', args)
});