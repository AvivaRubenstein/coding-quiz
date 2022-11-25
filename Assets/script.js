var beginButton = document.querySelector("#begin");
var intro = document.querySelector("#intro");
var q1 = document.querySelector("#question1");

q1.style.display="none";

beginButton.addEventListener("click", function (event){
    intro.innerHTML=" ";
    q1.style.display="block";
})