
window.addEventListener("custom-event-id", function(e)
{
  console.log("got event for ", e.originalTarget, "with data", e.detail);
});



document.addEventListener("click", (e) =>
{
  if (e.target.classList.contains("activate"))
  {
  browser.tabs.executeScript(null, {
      file: "/content_scripts/poopyOnSite.js"
    });

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {getStarted: "starting"});
    });
  }
  else if (e.target.classList.contains("clear"))
  {
    browser.tabs.reload();
    window.close();

    return;
  }
});
