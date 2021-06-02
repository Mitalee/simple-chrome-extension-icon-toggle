

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');  
});

// https://stackoverflow.com/questions/20010623/turn-on-and-off-chrome-extension
// https://stackoverflow.com/questions/13064957/how-to-use-jquery-in-google-chrome-extension-page-action-background-js
var enable=false; 

chrome.browserAction.onClicked.addListener(function (tab) { //https://stackoverflow.com/questions/63825136/ms-edge-api-error-browser-is-not-defined
 enable = enable ? false : true;
 if(enable){
    //turn on...
    console.log("turning on..");
    chrome.browserAction.setIcon({ path: 'images/color-changer20.png' });
    chrome.browserAction.setBadgeText({ text: 'ON' });
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "enabled_browser_action"});
      });
    //   g.start(); -- no reference to g
    // https://stackoverflow.com/a/37030520/2048229
    // chrome.tabs.executeScript({
    //     file: 'lib/jquery.min.js'
    //     }, function() {
    //         // Guaranteed to execute only after the previous script returns
    //         chrome.tabs.executeScript({
    //             file: 'test.js'
    //         });
    // });


 }
 else {
    //turn off...
    console.log("turning off..");
    chrome.browserAction.setIcon({ path: 'images/inactive20.png'});
    chrome.browserAction.setBadgeText({ text: 'OFF' });
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "disabled_browser_action"});
      });
    }
});

