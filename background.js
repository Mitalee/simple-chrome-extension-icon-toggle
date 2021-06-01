var enable=false;
chrome.browserAction.onClicked.addListener(function (tab) {
 enable = enable ? false : true;
 if(enable){
  //turn on...
  console.log("turning on..");
  chrome.browserAction.setIcon({ path: 'images/color-changer20.png' });
  chrome.browserAction.setBadgeText({ text: 'ON' });
  chrome.tabs.executeScript(null, { file: 'content.js' }); 
 }else{
  //turn off...
  console.log("turning off..");
  chrome.browserAction.setIcon({ path: 'images/inactive20.png'});
  chrome.browserAction.setBadgeText({ text: 'OFF' });
 }
});