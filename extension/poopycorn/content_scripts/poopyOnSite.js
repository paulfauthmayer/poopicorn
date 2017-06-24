
function getPosts(request, sender, sendResponse)
{
  if( undefined != request["getPosts"] && request["getPosts"] == 'starting')
  {

    if(isAlreadySent(listOfPosts[i]))
    {
      continue;
    }

    let postData = getRelevantData(listOfPosts[i]);
    if (postData)
    {
      let postData = getRelevantData(listOfPosts[i]);
      if (postData !=  null && isNotSendYet(postData) )
      {
        sendPostData(postData);
      }
    }
  } else if (undefined != request["markPosts"] && request["markPosts"] == "starting")
  {

  }



}

function isAlreadySent(post)
{
  if (post.id)
  {
    return true;
  }
  else
  {
    return false;
  }
}

function getRelevantData (fbUserContent)
{

  let titleEl = fbUserContent.getElementsByClassName("mbs")[0]
              ? fbUserContent.getElementsByClassName("mbs")[0].innerText
              : null;
  let subtitleEl = fbUserContent.getElementsByClassName("_6m7")[0]
                 ? fbUserContent.getElementsByClassName("_6m7")[0].innerText
                 : null;
  let descriptionEl = fbUserContent.getElementsByClassName("userContent")[0].getElementsByTagName("p")[0]
                    ? fbUserContent.getElementsByClassName("userContent")[0].getElementsByTagName("p")[0].innerText
                    : null;
  let posterEl = fbUserContent.getElementsByTagName("h5")[0]
               ? fbUserContent.getElementsByTagName("h5")[0].innerText
               : null;
  let websiteEl = fbUserContent.getElementsByClassName("ellipsis")[0]
                ? fbUserContent.getElementsByClassName("ellipsis")[0].innerText.toLowerCase()
                : null;
  let urlEl = fbUserContent.getElementsByClassName("_52c6")[0]
            ? fbUserContent.getElementsByClassName("_52c6")[0].getAttribute("href")
            : null

  let data;

  if (titleEl != null && subtitleEl != null)
  {
    data =
    {
      title: titleEl,
      subtitle: subtitleEl,
      description: descriptionEl,
      website: websiteEl,
      poster: posterEl,
      url: urlEl
    };

    data.id = convertToSlug("poopicorn" + " " + posterEl + " " + titleEl)

    fbUserContent.id = data.id

    return data;
  }
  return;
}

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}


function sendPostData(postData)
{
   browser.runtime.sendMessage({"data": postData});
}


function visualizeResults()

browser.runtime.onMessage.addListener(getPosts);
