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

    visualizeResults(result);
    console.log("pooooop");
    console.log(request.data);
    return;
  }
  console.log("shit")

}



function isNotSendYet(postData) {
  console.log(postData);
  if(null != postData.id && postData.id != "") {
    return false;
  } else {
    return true;
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

  let data;

  if (titleEl != null && posterEl != null)
  {
    data = {
      "title": titleEl,
      "subtitle": subtitleEl,
      "description": descriptionEl,
      "website": websiteEl,
      "poster": posterEl,
      "id": convertToSlug( "poopicorn" + " " + posterEl.substring(0,12) + " " + titleEl.substring(0,12)),

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

    element = document.getElementById(result.id)
    if (result.fake)
    {

      // include Google Fonts Stylesheet
      let fontLink = document.createElement("link")
      fontLink.setAttribute("href", "https://fonts.googleapis.com/css?family=Fredoka+One")
      fontLink.setAttribute("rel", "stylesheet")
      element.parentElement.insertBefore(fontLink, element.parentElement.firstChild)

      // create top part of wrapper

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
      poopometerContainer.appendChild(poopometerLabel)
      element.parentElement.insertBefore(poopometerContainer, element.parentElement.firstChild)

      // add Rainbow Border

      element.style = 'border: 6px solid transparent;-moz-border-image: -moz-linear-gradient(top, #FE5294 0%, #FADF12  100%); -webkit-border-image: -webkit-linear-gradient(top, #FE5294 0%, #FADF12  100%); border-image: linear-gradient(to bottom, #FE5294 0%, #FADF12  100%); border-image-slice: 1;'

      // add bottom part of wrapper

      // create info container
      let infoContainer = document.createElement("div")
      infoContainer.className = "infoContainer"
      infoContainer.style = 'background-color: #FADF12; width: 94%; height: 20px; padding: 3%; font-family: "Fredoka One", cursive !important; font-size: 16px !important; text-align: center;'

      // create link to information page
      let infoLink = document.createElement("a");
      infoLink.setAttribute("href", "http://poopicorn.press") //todo: set actual url
      let infoLinkText = document.createTextNode("How we detect fake news");
      infoLink.style = 'float: left;'
      infoLink.appendChild(infoLinkText)

      // create link to complain form
      let complainLink = document.createElement("a");
      complainLink.setAttribute("href", "http://poopicorn.press") //todo: set actual url
      let complainLinkText = document.createTextNode("Not fake news? Complain!");
      complainLink.style = 'float: right'
      complainLink.appendChild(complainLinkText)

      // add both links to the container
      infoContainer.appendChild(infoLink);
      infoContainer.appendChild(complainLink);

      // add stlyling
      // todo



      element.parentElement.insertBefore(infoContainer, element.parentElement.lastChild.nextSibling)





    }

}

var isScrolling;
window.addEventListener('scroll', function ( event ) {
    window.clearTimeout( isScrolling );
    isScrolling = setTimeout(function() {

        console.log("stop sc");
        let request = {};
        request["getStarted"] = "starting";
        getPosts(request);

    }, 125);

}, false);


browser.runtime.onMessage.addListener(getPosts);
