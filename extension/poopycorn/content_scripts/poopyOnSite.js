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

function visualizeResults(result) {

    /*
      result {
        id
        fake
        confidence
      }
    */



    element = document.getElementById(result.id)
    if (result.fake)
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

      numberOfPoops = result.confidence * 5

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
