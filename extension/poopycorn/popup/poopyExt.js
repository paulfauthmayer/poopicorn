/*
Listen for clicks in the popup.

If the click is on one of the beasts:
  Inject the "beastify.js" content script in the active tab.

  Then get the active tab and send "beastify.js" a message
  containing the URL to the chosen beast's image.

If it's on a button wich contains class "clear":
  Reload the page.
  Close the popup. This is needed, as the content script malfunctions after page reloads.
*/
console.log("ext");


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
