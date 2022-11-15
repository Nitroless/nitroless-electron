const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    post: (channel, data) => {
        let validChannels = ['exitApp', "closeWindow"];
        if(validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    }
});