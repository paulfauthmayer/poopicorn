
console.log("start")
//browser.tabs.executeScript(null, {
    // file: "/content_scripts/jquery-3.2.1.js"
   //});

console.log($("body"));

let postName = ".fbUserContent";

let ListOfUserContent = $(postName)//document.getElementsByClassName('question-summary');

ListOfUserContent.each(function(key, value) {
  console.log(value)
})

console.log("JOOsOO")
