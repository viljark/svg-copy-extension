chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg);
    if (msg.action === 'copied') {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'assets/logos/icon128.png', 
            title: "SVG Copied!",
            message: msg.content
        });
    }
});