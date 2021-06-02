// alert('Hello world!'); //https://stackoverflow.com/a/51990328/2048229
// https://stackoverflow.com/questions/15835080/chrome-extension-run-content-script-only-when-button-is-clicked

function sleep(ms) { //we can't make only this function async
    return new Promise(resolve => setTimeout(resolve, ms));
  } 
//   let msg = new SpeechSynthesisUtterance("Found slots for your location. Checking again in 10 seconds");
  let voices = window.speechSynthesis.getVoices();
//   msg.voice = voices[11];
  let timer = 1/3*60*1000; //min*seconds*milliseconds
  let time_to_wait_for_table = 2*1000; //seconds*milliseconds
  async function core_logic() {
    // console.log($(this).find('td').eq(0).text());
    // console.log($('.view-grid')[0].innerText == "There are no slots available." ? "No slots available": "slots available")
    console.log($('.view-grid > table > tbody > tr').length == 0 ? "No slots available": "slots available")
    // if ($(this).find('td').eq(2).text() == 'Hyderabad') { speechSynthesis.speak(msg);}
    if ($('.view-grid')[0].innerText != "There are no slots available.") 
      { 
        let msg = new SpeechSynthesisUtterance("Found "+ $('.view-grid > table > tbody >tr').length.toString() +" slots for your location. Checking again in 20 seconds");
        msg.voice = voices[11];
        speechSynthesis.speak(msg);
      }
    else {}
    // window.location.reload();
    }
  
  $.fn.findSlotNum= function() { //top most function need not be async. perfectly fine to load this immediately.
    console.log('instantiated..'); 
    
    this.start = function() {
      console.log("starting to check every minute..");
      interval = setInterval(async function() {
          console.log("Checking now..");
          await core_logic(); 
          console.log("reloading in 30..");
          window.location.reload();
      }, timer);
    }
    this.coldstart = async function() {
      await core_logic();
    }
    this.stop = function(){
      clearInterval(interval);
      console.log("stopped the function");
    //   window.location.reload();
    }
    return this;
  };
   
  var g = $("#container").findSlotNum();
  g.start();