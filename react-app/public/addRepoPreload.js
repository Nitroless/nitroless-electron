const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    get: (channel, func) => {
        let validChannels = ['getRepo'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    post: (channel, data) => {
        let validChannels = ['closeWindow'];
        if(validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    }
});