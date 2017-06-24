
browser.runtime.onMessage.addListener(notify);

let uri = "ws://echo.websocket.org/";

function notify(message) {
  console.log(message);

  websocket = new WebSocket(uri);

  websocket.onopen = function(evt) { onOpen(evt, message) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };

}



function onOpen(evt, message)
{
  writeToScreen("CONNECTED");
  doSend(message);
}

function onClose(evt)
{
  writeToScreen("DISCONNECTED");
}

function onMessage(evt)
{
  writeToScreen('RESPONSE: ' + evt.data);
  websocket.close();
}

function onError(evt)
{
  writeToScreen('ERROR ' + evt.data);
}

function doSend(message)
{
  writeToScreen("SENT: " + message);
  websocket.send(message);
}

function writeToScreen(message)
{
  console.log(message);
}
