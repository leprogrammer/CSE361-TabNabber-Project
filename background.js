var currURL
var images = {}
var screenshotInterval

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.name == 'currScreenshot') {
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
          currURL = tabs[0].url
          chrome.tabs.captureVisibleTab(null, null, function(data) {
            sendResponse({newscreenshot: data, imageDic: images, currURL: currURL, screenshotInterval: screenshotInterval});
        });
      });
    }
    else if(request.name == "restartInterval"){
      takeScreenShotOfTab()
      screenshotInterval = setInterval(takeScreenShotOfTab, 5000);
    }else if(request.name == "getFirstScreen"){
      takeScreenShotOfTab();
    }else if(request.mismatch == null){
      takeScreenShotOfTab();
    }
    else if (request.mismatch != null){
      if(parseFloat(request.mismatch) > 0){
        clearInterval(screenshotInterval);
      }
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
screenshotInterval = setInterval(takeScreenShotOfTab, 10000);
