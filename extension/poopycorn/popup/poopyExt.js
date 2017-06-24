
console.log("ext");

let exampleSocket = new WebSocket("ws://www.example.com/socketserver", "protocolOne");


document.addEventListener("click", (e) => {
  if (e.target.classList.contains("activate")) {

    console.log("click");

  browser.tabs.executeScript(null, {
      file: "/content_scripts/jquery-3.2.1.js"
    });

  browser.tabs.executeScript(null, {
      file: "/content_scripts/poopyOnSite.js"
    });

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {getStarted: "starting"});
    });
  }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();

    return;
  }
});
