var currURL
var images = {}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.name == 'currScreenshot') {
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
          currURL = tabs[0].url
          chrome.tabs.captureVisibleTab(null, null, function(data) {
            console.log(data)
              sendResponse({newscreenshot: data, imageDic: images, currURL: currURL});
        });
      });
    }
    else if (request.mismatch != null){
      chrome.tabs.getSelected(null, function(tabs){
        chrome.browserAction.setBadgeText({text: String(request.mismatch), tabId: tabs.id});
      });
    }
    return true;
});

function takeScreenShotOfTab(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'status': "complete"}, function (tabs) {
        currURL = tabs[0].url
        chrome.tabs.captureVisibleTab(null, {}, function (data) {
            images[currURL] = data
        });
    });
}


takeScreenShotOfTab();
setInterval(takeScreenShotOfTab, 5000);
