
browser.runtime.onMessage.addListener(notify);

let uri = "ws://poopicor.pavo.uberspace.de:5000/echo";

var websocket = new WebSocket(uri);
websocket.onopen = function(evt) { onOpen(evt) };
websocket.onclose = function(evt) { onClose(evt) };
websocket.onmessage = function(evt) { onMessage(evt) };
websocket.onerror = function(evt) { onError(evt) };
<<<<<<< HEAD
console.log("send");
websocket.doSend("PaulSucksTurd.exe --with great joy.sh");

function notify(message) {

  doSend(JSON.stringify(message));
=======


function notify(message)
{
      doSend(JSON.stringify(message));
>>>>>>> 1914c7ac7c5a8515c4ca44dd99e34467508ce8af
}

function onOpen(evt)
{
  console.log("CONNECTED");
}

function onClose(evt)
{
  console.log("DISCONNECTED");
}

function onMessage(evt)
{
  console.log('RESPONSE: ' + evt.data);
<<<<<<< HEAD
=======

>>>>>>> 1914c7ac7c5a8515c4ca44dd99e34467508ce8af
  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {markPosts: "starting", data: evt.data});
  });
<<<<<<< HEAD
=======

>>>>>>> 1914c7ac7c5a8515c4ca44dd99e34467508ce8af
  //websocket.close();
}

function onError(evt)
{
  console.log('ERROR ' + evt.data);
}

function doSend(message)
{
  console.log("SENT: " + message);
  websocket.send(message);
}
