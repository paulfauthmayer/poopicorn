console.log("onSite with sockets")

let exampleSocket = new WebSocket("ws://www.example.com/socketserver", "protocolOne");




function getPosts(request, sender, sendResponse) {
  console.log("message " + request.getStarted);
  console.log( $("body") );

  let listOfPosts = document.getElementsByClassName('fbUserContent');
  for (let i = 0; i < listOfPosts.length;i++) {
    sendPostData(getRelevantData(listOfPosts[i]));
  }

}


function getRelevantData (fbUserContent)
{
  let data = {
    title: fbUserContent.getElementsByClassName("mbs")[0]
      ? fbUserContent.getElementsByClassName("mbs")[0].innerText
      : null,
    subtitle: fbUserContent.getElementsByClassName("_6m7")[0]
      ? fbUserContent.getElementsByClassName("_6m7")[0].innerText
      : null,
    description: fbUserContent.getElementsByClassName("userContent")[0]
      ? fbUserContent.getElementsByClassName("userContent")[0].getElementsByTagName("p")[0].innerText
      : null,
    image: fbUserContent.getElementsByClassName("scaledImageFitWidth")[0]
      ? fbUserContent.getElementsByClassName("scaledImageFitWidth")[0]
      : null,
    poster: fbUserContent.getElementsByTagName("h5")[0]
      ? fbUserContent.getElementsByTagName("h5")[0].textContent
      : null,
    website: fbUserContent.getElementsByClassName("ellipsis")[0]
      ? fbUserContent.getElementsByClassName("ellipsis")[0].innerText.toLowerCase()
      : null
  }
  console.log(data);
  return data


}

function sendPostData(postData) {

  var msg = {
    type: "message",
    text: postData,
    date: Date.now()
  };

  exampleSocket.onopen = function (event) {
    exampleSocket.send(JSON.stringify(msg));
  };
}



browser.runtime.onMessage.addListener(getPosts);
