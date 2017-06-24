/*
beastify():
* removes every node in the document.body,
* then inserts the chosen beast
* then removes itself as a listener
*/
console.log("onSite")

function getPosts(request, sender, sendResponse) {
  console.log("message " + request.getStarted);
  console.log( $("body") );

}


function getRelevantData (fbUserContent) {
  let data = {
    title: fbUserContent.getElementsByClassName("mbs")[0] ? fbUserContent.getElementsByClassName("mbs")[0].innerText : null,
    subtitle: fbUserContent.getElementsByClassName("_6m7")[0] ? fbUserContent.getElementsByClassName("_6m7")[0].innerText : null,
    description: fbUserContent.getElementsByClassName("userContent")[0] ? fbUserContent.getElementsByClassName("userContent")[0].getElementsByTagName("p")[0].innerText : null,
    image: fbUserContent.getElementsByClassName("scaledImageFitWidth")[0] ? fbUserContent.getElementsByClassName("scaledImageFitWidth")[0] : null,
    poster: fbUserContent.getElementsByTagName("h5")[0] ? fbUserContent.getElementsByTagName("h5")[0].textContent : null,
    website: fbUserContent.getElementsByClassName("ellipsis")[0] ? fbUserContent.getElementsByClassName("ellipsis")[0].innerText.toLowerCase() : null
  }
  return data
}



/*
Assign beastify() as a listener for messages from the extension.
*/
browser.runtime.onMessage.addListener(getPosts);
