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


/*
Assign beastify() as a listener for messages from the extension.
*/
browser.runtime.onMessage.addListener(getPosts);
