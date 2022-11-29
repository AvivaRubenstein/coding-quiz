var container = document.querySelector(".container");
var correct; 
var question = document.createElement("h1");
var choice1 = document.createElement("button");
var choice2 = document.createElement("button");
var choice3 = document.createElement("button");
var choice4 = document.createElement("button");
console.log(correct);

var h1  = document.createElement("h1");
h1.innerHTML=" <h1>Coding Quiz Challenge</h1>";
container.appendChild(h1);
var p = document.createElement("p");
p.innerHTML = "<p>Try to answer the following code-related questions to practice for coding interviews! You will have 10 seconds to answer each question.  Click 'Begin' to start!</p>";
container.appendChild(p);
var begin = document.createElement("button");
begin.innerHTML ="<button id = 'begin'>Begin</button>";
container.appendChild(begin);

//when called, this function will clear the HTML content from the intro
function clearHTML(){
    h1.innerHTML="";
    p.innerHTML = "";
    begin.innerHTML ="";
}
//when the begin button is pressed, the intro content will disappear and the first question will be displayed.
begin.addEventListener("click", function (event){
    clearHTML();
    //for each question, we are creating an h1 element and 4 button elements
    //they are declared as variables at the top of the page so we aren't limited by scope
    //the HTML content for each is put in with .innerHTML, and we must append them to the container for them to actually become part of the HTML file
    question.innerHTML ="<h1>Which line of code is used to prevent event bubbling in javaScript?</h1 ";
    container.appendChild(question);
    
    //the correct answer is identified here with the class "correct" so that we can treat all correct answers the same when when clicked
    choice1.innerHTML="<button class = 'choice' id = 'correct'> event.stopPropogation()</button>";
    container.appendChild(choice1);
   
    choice2.innerHTML="<button class = 'choice'>event.stopBubbling()</button>";
    container.appendChild(choice2);
   
    choice3.innerHTML="<button class = 'choice'>event.stopClickTrigger()</button>";
    container.appendChild(choice3);
   
    choice4.innerHTML="<button class = 'choice'>event.preventDefault()</button>";
    container.appendChild(choice4);
 correct = document.querySelector("#correct");  
 //error with this line:  maybe because .correct only becomes a class after the first click???
correct.addEventListener("click", function(event) {
    correct.setAttribute("style", "background-color: #00ff00;");

})
})


