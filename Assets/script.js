var container = document.querySelector(".container");
var qCard = document.querySelector("#qCard");
var qSlot = document.querySelector("#qSlot");
var question = document.createElement("h1");
var choice1 = document.createElement("button");
var choice2 = document.createElement("button");
var choice3 = document.createElement("button");
var choice4 = document.createElement("button");
var correct;
var choice;
var btnClicked;
//start with the numRight and Wrong equal to 0, need to increment the relvant var by 1 after each answer
var numRight = 0;
var userName;
var submitName;
var listNames = [];
var listScores = [];
var form;
var submitBtn;


var h1 = document.createElement("h1");
h1.innerHTML = " Coding Quiz Challenge";
container.appendChild(h1);
var p = document.createElement("p");
p.innerHTML = "Try to answer the following code-related questions to practice for coding interviews! You will have 10 seconds to answer each question.  Click 'Begin' to start!";
container.appendChild(p);
var begin = document.createElement("button");
begin.innerHTML = "Begin";
begin.setAttribute("id", "begin");
container.appendChild(begin);


//when called, this function will clear the HTML content from the intro
function clearHTML() {
    h1.remove();
    p.remove();
    begin.remove();
}



//when the begin button is pressed, the intro content will disappear and the first question will be displayed.
begin.addEventListener("click", function (event) {
    //TODO: look into event bubbling!
    event.stopPropagation();
    clearHTML();
    setTime();
    //for each question, we are creating an h1 element and 4 button elements
    //they are declared as variables at the top of the page so we aren't limited by scope
    //the HTML content for each is put in with .innerHTML, and we must append them to the container for them to actually become part of the HTML file
    setQuestion();
    //this sets the timer function (see function below)

    question.innerHTML = `${questionBlock.prompt}`;
    qSlot.appendChild(question);

    //the correct answer is identified here with the id "correct" so that we can treat all correct answers the same when when clicked
    choice1.innerHTML = ` ${questionBlock.ans1}`;
    choice1.setAttribute("class", "choice");
    qCard.appendChild(choice1);

    choice2.innerHTML = `${questionBlock.ans2}`;
    choice2.setAttribute("class", "choice");
    qCard.appendChild(choice2);

    choice3.innerHTML = `${questionBlock.ans3}`;
    choice3.setAttribute("class", "choice");
    qCard.appendChild(choice3);

    choice4.innerHTML = `${questionBlock.ans4}`;
    choice4.setAttribute("class", "choice");
    qCard.appendChild(choice4);

    choice = document.querySelectorAll(".choice");

    //checks each choice to see if it is marked as correct 
    checkCorrectness();

    //this event listener looks for when the user clicks one of the answer options.  If they click the correct one, the number
    //of qs they got right increases by one, and if they clicked an incorrect one, they lose 5 seconds of time and the number
    //of qs they got wrong goes up by one.
    //this continues as long as we have more q prompts left
    for (x = 0; x < choice.length; x++) {
        // console.log(choice.length)
        choice[x].addEventListener("click", function (event) {

            btnClicked = event.target;
            if (btnClicked === correct) {
                numRight++;
            } else {
                secondsLeft -= 5;

            }

            //sets us up to move to the next question in our questionBlock
            currentQ++;
            if (currentQ >= promptBank.length) {
                //TODO erase question block
                question.remove();
                choice1.remove();
                choice2.remove();
                choice3.remove();
                choice4.remove();

                timeoutMessage();


            } else {
                setQuestion();
                question.innerHTML = `${questionBlock.prompt}`;
                choice1.innerHTML = `${questionBlock.ans1}`;
                choice1.setAttribute("class", "choice");
                choice2.innerHTML = `${questionBlock.ans2}`;
                choice2.setAttribute("class", "choice");
                choice3.innerHTML = `${questionBlock.ans3}`;
                choice3.setAttribute("class", "choice");
                choice4.innerHTML = `${questionBlock.ans4}`;
                choice4.setAttribute("class", "choice");
                checkCorrectness();
            }
        });
    }

    function setTime() {
        // Sets interval in variable
        var timerInterval = setInterval(function () {
            secondsLeft--;
            timerEl.textContent = secondsLeft + " seconds left";



            if (secondsLeft <= 0) {
                //TODO: clear out question block when timer runs out, not just when we run out of qs
                // Stops execution of action at set interval
                clearInterval(timerInterval);
                //TODO erase question block
                question.remove();
                choice1.remove();
                choice2.remove();
                choice3.remove();
                choice4.remove();
                // Calls function to create and append image
                timeoutMessage();
            }

        }, 1000);
    }



    choice = document.querySelectorAll(".choice");
    correct = document.querySelector("#correct");


});

var currentQ = 0;
var questionBlock;
function setQuestion() {
    questionBlock = {
        prompt: promptBank[currentQ],
        ans1: ans1Bank[currentQ],
        ans2: ans2Bank[currentQ],
        ans3: ans3Bank[currentQ],
        ans4: ans4Bank[currentQ],
    };
}


var promptBank = ["Which line of code is used to prevent event bubbling in javaScript?",
    "What is a for loop used to do?",
    "What does DOM refer to in HTML?"];
var ans1Bank = ["event.stopPropogation()",
    "It sets up conditional logic to run indefinitely",
    "The Direct Outer Method "];
var ans2Bank = ["event.stopBubbling()",
    "It tells you what each block of code is used for",
    "The Document Object Model"];
var ans3Bank = ["event.stopClickTrigger()",
    "It iterates through a block of code multiple times",
    "The Document Over Main"];
var ans4Bank = ["event.preventDefault()",
    "It defines a boolean variable ",
    "The Direct Object Method"];


var isCorrect1 = [true, false, false];
var isCorrect2 = [false, false, true];
var isCorrect3 = [false, true, false];
var isCorrect4 = [false, false, false];


function checkCorrectness() {
    if (isCorrect1[currentQ] === true) {
        choice1.setAttribute("id", "correct");
    } else {
        choice1.removeAttribute("id");
    }
    if (isCorrect2[currentQ] === true) {
        choice2.setAttribute("id", "correct");
    } else {
        choice2.removeAttribute("id");
    }
    if (isCorrect3[currentQ] === true) {
        choice3.setAttribute("id", "correct");
    } else {
        choice3.removeAttribute("id");
    }
    if (isCorrect4[currentQ] === true) {
        choice4.setAttribute("id", "correct");
    } else {
        choice4.removeAttribute("id");
    }
    correct = document.querySelector("#correct");
}

var timerEl = document.querySelector("#timer");
var secondsLeft = 70;


function timeoutMessage() {
    //this function should get rid of the timer element, and create a message saying the quiz is over, calculate and report the current quiz score
    //and create a form for the user to submit their name to be stored in the high score list
    $("#timer").remove();
    var quizOver = document.createElement("h2");
    quizOver.innerHTML = `All done!  Your final score is ${numRight}.`;
    container.appendChild(quizOver);
    var enterName = document.createElement("form");
    enterName.innerHTML = "<label for='name'> Enter your name to save your high score:</label> <br> <input type='text' id='userName' name='name'><br> <input type='submit' value='Submit' id='submit'>";
    enterName.setAttribute = ("id", "form");
    container.appendChild(enterName);
    userName = document.querySelector("#userName");
    form = document.querySelector("#form");
    submitBtn = document.querySelector("#submit");




    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        var scoreStorage = {
            currentUser: userName.value,
            currentScore: numRight
        };
        var scoresArray = [];
        var lastPlayer = JSON.parse(localStorage.getItem("score-name"));

        if (lastPlayer === null) {
            scoresArray.push(scoreStorage);
            localStorage.setItem("score-name", JSON.stringify(scoresArray));
        } else {
            scoresArray = JSON.parse(localStorage.getItem("score-name"));

            scoresArray.push(scoreStorage);
            localStorage.setItem("score-name", JSON.stringify(scoresArray));
        }


    });

}

