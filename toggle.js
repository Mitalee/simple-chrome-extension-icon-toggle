// alert('Hello world!'); //https://stackoverflow.com/a/51990328/2048229
//toggle has access to jquery via the content script

timer = 3*1000 //sec*msec
$.fn.ToggleOnOff= function() { //top most function need not be async. perfectly fine to load this immediately.
    console.log('toggle on/off instantiated..'); 
    this.start = function() {
      console.log("starting to log every" + (timer/1000).toString()+" seconds..");
      interval = setInterval(async function() {
          console.log("checking again in "+(timer/1000).toString()+" seconds..");
      }, timer);
    }
    this.coldstart = async function() {
      console.log("logged once.");
    }
    this.stop = function(){
      clearInterval(interval);
      console.log("stopped toggling.");
    }
    return this;
  };

var g = $("#container").ToggleOnOff();
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "enabled_browser_action") {
            console.log("in content script - coldstart");
            // g.coldstart();
            g.start();
        }
        else if (request.message === "disabled_browser_action") {
            console.log("in content script - stop");
            g.stop();
        }
    }
);