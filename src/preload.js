
window.addEventListener("DOMContentLoaded", () => {
    const { remote } = require('electron');
    var child = require('child_process').execFile;
    var executablePath = "C:\\Program Files\\Mozilla Firefox\\firefox.exe";

    let currWindow = remote.getCurrentWindow();

    window.closeCurrentWindow = () => currWindow.close();
    window.minimizeWindow = () => currWindow.minimize();
    window.maximizeWindow = () => currWindow.setFullScreen(!currWindow.isFullScreen());;

    window.executeInjector = () => {
        child(executablePath, function (err, data) {
            if (err) {
                console.error(err);
                return;
            }

            console.log(data.toString());
        });
    }
});