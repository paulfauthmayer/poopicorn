
browser.runtime.onMessage.addListener(notify);
let lastPost;
let uri = "ws://poopicor.pavo.uberspace.de:5000/echo";

var websocket = new WebSocket(uri);
websocket.onopen = function(evt) { onOpen(evt) };
websocket.onclose = function(evt) { onClose(evt) };
websocket.onmessage = function(evt) { onMessage(evt) };
websocket.onerror = function(evt) { onError(evt) };

console.log("send");
websocket.doSend("PaulSucksTurd.exe --with great joy.sh");

function notify(message) {
  lastPost = message;
  doSend(JSON.stringify(message));
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
  var gettingActiveTab = browser.tabs.query( {active: true, currentWindow: true} );
  lastPost.rating = 0.8;
  gettingActiveTab.then((tabs) =>
  {
    browser.tabs.sendMessage(tabs[0].id, { markPosts: "starting", data: lastPost } );
  });
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
