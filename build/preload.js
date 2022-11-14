const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    post: (channel, data) => {
        let validChannels = ['openSite', "exit"];
        if(validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    }
});