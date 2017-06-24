console.log("onSite with sockets");

function getPosts(request, sender, sendResponse)
{
  console.log("start getPosts");

  let listOfPosts = document.getElementsByClassName('fbUserContent');
  for (let i = 0; i < listOfPosts.length;i++)
  {
    let postData = getRelevantData(listOfPosts[i]);
    if (postData !=  null)
    {
      sendPostData(postData);
    }
  }
}

function getRelevantData (fbUserContent)
{
  let titleEl = fbUserContent.getElementsByClassName("mbs")[0] ? fbUserContent.getElementsByClassName("mbs")[0].innerText : null;
  let subtitleEl = fbUserContent.getElementsByClassName("_6m7")[0] ? fbUserContent.getElementsByClassName("_6m7")[0].innerText : null;
  let descriptionEl = fbUserContent.getElementsByClassName("userContent")[0].getElementsByTagName("p")[0] ? fbUserContent.getElementsByClassName("userContent")[0].getElementsByTagName("p")[0].innerText : null;
  // let posterEl = fbUserContent.getElementsByTagName("h5")[0] ? fbUserContent.getElementsByTagName("h5")[0].textContent : null;
  let websiteEl = fbUserContent.getElementsByClassName("ellipsis")[0] ? fbUserContent.getElementsByClassName("ellipsis")[0].innerText.toLowerCase() : null;

  // let imageEl = fbUserContent.getElementsByClassName("scaledImageFitWidth")[0]
  //     ? fbUserContent.getElementsByClassName("scaledImageFitWidth")[0]
  //     : null;

  let data;
  if (titleEl != null && subtitleEl != null)
  {
    data = {
      title: titleEl,
      subtitle: subtitleEl,
      description: descriptionEl,
      website: websiteEl,
      // poster: posterEl,

    };
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

browser.runtime.onMessage.addListener(getPosts);
