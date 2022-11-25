var beginButton = document.querySelector("#begin");
var container = document.querySelector(".container");
var correct = document.querySelector(".correct");

beginButton.addEventListener("click", function (event){
    container.innerHTML ="<h1>Which line of code is used to prevent event bubbling in javaScript?</h1>" +
    "<button class = 'choice' class = 'correct'>event.stopPropogation()</button>" +
    "<button class = 'choice'>event.stopBubbling()</button>" +
    "<button class = 'choice'>event.stopClickTrigger()</button>"+
    "<button class = 'choice'>event.preventDefault()</button>";
    container.dataset.stage="question1";
})

correct.addEventListener("click", function(event) {
    correct.setAttribute("style", "background-color: #00ff00;");

})
