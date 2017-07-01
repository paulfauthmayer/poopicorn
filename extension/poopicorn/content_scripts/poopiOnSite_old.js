console.log("onSite with sockets");

function getPosts(request, sender, sendResponse)
{
  console.log("start getPosts");

  let listOfPosts = document.getElementsByClassName('fbUserContent');
  for (let i = 0; i < listOfPosts.length;i++)
  {

    if(listOfPosts[i].id)
    {
      continue;
    }

    let postData = getRelevantData(listOfPosts[i]);
    if (postData)
    {
      sendPostData(postData);
    }
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

  console.log("sending event");

  console.log(postData);

   browser.runtime.sendMessage({"data": postData});
}


function visualizeResults(id, confidence ) {

    /*
      result {
        id
        fake
        confidence
      }
    */



    element = document.getElementById(id)
    if (true)
    {

      let fontLink = document.createElement("link")
      fontLink.setAttribute("href", "https://fonts.googleapis.com/css?family=Fredoka+One")
      fontLink.setAttribute("rel", "stylesheet")
      element.parentElement.insertBefore(fontLink, element.parentElement.firstChild)



      let poopometerContainer = document.createElement("div")
      poopometerContainer.className = "poopometerContainer"
      poopometerContainer.style = 'background-color: #FE5294; width: 90%; height: 40px; padding: 5%; font-family: "Fredoka One", cursive !important; font-size: 30px !important; text-align: center; color: white;'

      let poopometerLabel = document.createElement("span")
      let label = document.createTextNode("Poop-o-Meter:");
      label.style = 'display: inline-block; pading-right: 30px'
      let poops = document.createTextNode("\t")

      numberOfPoops = confidence * 5

      for (let i = 0; i < numberOfPoops; i++) {
        poops.textContent += String.fromCodePoint(0x1F4A9)
      }

      poopometerLabel.appendChild(label)
      poopometerLabel.appendChild(poops)


      let poopometerPoop = document.createElement("img")

      poopometerContainer.appendChild(poopometerLabel)

      poopometerContainer.appendChild(poopometerPoop)
      poopometerContainer.appendChild(poopometerPoop)
      poopometerContainer.appendChild(poopometerPoop)
      poopometerContainer.appendChild(poopometerPoop)
      poopometerContainer.appendChild(poopometerPoop)

      element.parentElement.insertBefore(poopometerContainer, element.parentElement.firstChild)

      element.style = 'border: 6px solid transparent;-moz-border-image: -moz-linear-gradient(top, #FE5294 0%, #FADF12  100%); -webkit-border-image: -webkit-linear-gradient(top, #FE5294 0%, #FADF12  100%); border-image: linear-gradient(to bottom, #FE5294 0%, #FADF12  100%); border-image-slice: 1;'

    }

}

browser.runtime.onMessage.addListener(getPosts);
