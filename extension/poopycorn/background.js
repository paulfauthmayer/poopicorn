
browser.runtime.onMessage.addListener(doSend(message));

let uri = "ws://poopicor.pavo.uberspace.de:5000/echo";
var websocket = new WebSocket(uri);

websocket.onopen = function(evt) { onOpen(evt) };
websocket.onclose = function(evt) { onClose(evt) };
websocket.onmessage = function(evt) { onMessage(evt) };
websocket.onerror = function(evt) { onError(evt) };
console.log("send")

function onOpen(evt)
{
  console.log("CONNECTED");
  //doSend("message");
}

function onClose(evt)
{
  console.log("DISCONNECTED");
}

function onMessage(evt)
{
  console.log('RESPONSE: ' + evt.data);
  websocket.close();
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
