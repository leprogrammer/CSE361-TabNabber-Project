var currURL
var images = {}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.name == 'currScreenshot') {
        chrome.tabs.captureVisibleTab(null, null, function(data) {
            image = new Image()
            image.src = data
            sendResponse({newscreenshot: image, imageDic: images});
        });
    }
    return true;
});

function takeScreenShotOfTab(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        currURL = tabs[0].url;
        chrome.tabs.captureVisibleTab(null, {}, function (data) {
            image = new Image()
            image.src = data
            images[currURL] = image
        });
    });
}


takeScreenShotOfTab();
setInterval(takeScreenShotOfTab, 5000);
