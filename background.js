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
        var colorString = "#FFFFFF";
        var mismatchNumber = parseFloat(request.mismatch);

        if(mismatchNumber == 0){
          colorString = "#00FF00";
        }
        else if(mismatchNumber > 0 && mismatchNumber <= 10){
          colorString = "#00B000";
        }
        else if(mismatchNumber > 10 && mismatchNumber <= 30){
          colorString = "#0000F0";
        }
        else if(mismatchNumber > 30 && mismatchNumber <= 50){
          colorString = "#F000F0";
        }
        else if(mismatchNumber > 50 && mismatchNumber <= 100){
          colorString = "#F00000";
        }

        chrome.browserAction.setBadgeText({text: String(request.mismatch), tabId: tabs.id});
        chrome.browserAction.setBadgeBackgroundColor({color: String(colorString), tabId: tabs.id});
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
