console.log("onSite with sockets");

function getPosts(request, sender, sendResponse)
{
  if (undefined != request["getStarted"] && request["getStarted"] == "starting")
  {
    console.log("start getPosts");

    let listOfPosts = document.getElementsByClassName('fbUserContent');
    for (let i = 0; i < listOfPosts.length;i++)
    {

      let postData = listOfPosts[i];

      if ( postData !=  null && isNotSendYet(postData) )
      {
        sendPostData( getRelevantData(postData) );
      }
    }
  } else if (undefined != request["markPosts"] && request["markPosts"] == "starting")
  {
    if (request.data.rating >= 0.8)
    {
      // fake
      styleFake(request.data.id);
    } else if (request.data.rating >= 0.6)
    {
      // mostly fake
      styleMostlyFake(request.data.id);
    } else if (request.data.rating >= 0.2)
    {
      // dont really know
      styleLittleShitty(request.data.id);

    } else
    {
      // true
      styleTrue(request.data.id);
    }

    console.log("sadsd");
    console.log(request.data);
  }

}

function styleFake(id) {
  let post = document.getElementById(id)
  console.log("IT WORKS " + id);
}

function styleMostlyFake(id) {
  let post = document.getElementById(id)
}

function styleLittleShitty(id) {
  let post = document.getElementById(id)
}

function styleTrue(id) {
  let post = document.getElementById(id)
}

function isNotSendYet(postData) {
  if(!postData.id) {
    return true;
  } else {
    return false;
  }
}

function getRelevantData (fbUserContent)
{
  let titleEl = fbUserContent.getElementsByClassName("mbs")[0] ? fbUserContent.getElementsByClassName("mbs")[0].innerText : null;
  let subtitleEl = fbUserContent.getElementsByClassName("_6m7")[0] ? fbUserContent.getElementsByClassName("_6m7")[0].innerText : null;
  let descriptionEl = fbUserContent.getElementsByClassName("userContent")[0].getElementsByTagName("p")[0] ? fbUserContent.getElementsByClassName("userContent")[0].getElementsByTagName("p")[0].innerText : null;
  let posterEl = fbUserContent.getElementsByTagName("h5")[0] ? fbUserContent.getElementsByTagName("h5")[0].innerText : null;
  let websiteEl = fbUserContent.getElementsByClassName("ellipsis")[0] ? fbUserContent.getElementsByClassName("ellipsis")[0].innerText.toLowerCase() : null;

  let data;

  if (titleEl != null && subtitleEl != null)
  {
    data = {
      title: titleEl,
      subtitle: subtitleEl,
      description: descriptionEl,
      website: websiteEl,
      poster: posterEl,
      id: convertToSlug( "poopicorn" + " " + posterEl.substring(0,12) + " " + titleEl.substring(0,12)),

    };

    fbUserContent.id = data.id;
    return data;
  }
  return;
}

function sendPostData(postData)
{

  console.log("sending event");
  console.log(postData);

   browser.runtime.sendMessage({"data": postData});
}

function convertToSlug(Text)
{
  return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
}

browser.runtime.onMessage.addListener(getPosts);
