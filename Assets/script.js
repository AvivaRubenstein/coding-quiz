var container = document.querySelector(".container");
var question = document.createElement("h1");
var choice1 = document.createElement("button");
var choice2 = document.createElement("button");
var choice3 = document.createElement("button");
var choice4 = document.createElement("button");
var correct;
var incorrect;
var choice;
var btnClicked;
//start with the numRight and Wrong equal to 0, need to increment the relvant var by 1 after each answer
var numRight = 0;
var numWrong = 0;
var finalScore;
var userName;
var submitName;
var listNames = [];
var listScores = [];
var form;


var h1 = document.createElement("h1");
h1.innerHTML = " <h1>Coding Quiz Challenge</h1>";
container.appendChild(h1);
var p = document.createElement("p");
p.innerHTML = "<p>Try to answer the following code-related questions to practice for coding interviews! You will have 10 seconds to answer each question.  Click 'Begin' to start!</p>";
container.appendChild(p);
var begin = document.createElement("button");
begin.innerHTML = "<button id = 'begin'>Begin</button>";
container.appendChild(begin);


//when called, this function will clear the HTML content from the intro
function clearHTML() {
    $("h1").remove();
    $("p").remove();
    $("#begin").remove();
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

    question.innerHTML = `<h1> ${questionBlock.prompt}</h1 `;
    container.appendChild(question);
    var text = "text";
    //the correct answer is identified here with the id "correct" so that we can treat all correct answers the same when when clicked
    choice1.innerHTML = `<button class = 'choice' > ${questionBlock.ans1} </button>`;
    container.appendChild(choice1);

    choice2.innerHTML = `<button class = 'choice'>${questionBlock.ans2}</button>`;
    container.appendChild(choice2);

    choice3.innerHTML = `<button class = 'choice' >${questionBlock.ans3}</button>`;
    container.appendChild(choice3);

    choice4.innerHTML = `<button class = 'choice'>${questionBlock.ans4}</button>`;
    container.appendChild(choice4);

    //checks each choice to see if it is marked as correct 
    checkCorrectness();

    container.addEventListener("click", function (event) {
        for (x = 0; x < incorrect.length; x++) {
            btnClicked = event.target;
            if (btnClicked === correct) {
                // correct.firstChild.setAttribute("style", "background-color: #00ff00;");
                numRight++;


            } else if (btnClicked === incorrect[x]) {
                // incorrect[x].firstChild.setAttribute("style", "background-color: #C93516");
                secondsLeft -= 5;
                numWrong++;

            }


        }

        //sets us up to move to the next question in our questionBlock
        currentQ++;
        if (currentQ === promptBank.length) {
            timeoutMessage();
            //TODO erase question block
        } else {
            setQuestion();
            question.innerHTML = `<h1> ${questionBlock.prompt}</h1 `;
            choice1.innerHTML = `<button class = 'choice' > ${questionBlock.ans1} </button>`;
            choice2.innerHTML = `<button class = 'choice'>${questionBlock.ans2}</button>`;
            choice3.innerHTML = `<button class = 'choice' >${questionBlock.ans3}</button>`;
            choice4.innerHTML = `<button class = 'choice'>${questionBlock.ans4}</button>`;
            checkCorrectness();
        }
    });

    function setTime() {
        // Sets interval in variable
        var timerInterval = setInterval(function () {
            secondsLeft--;
            timerEl.textContent = secondsLeft + " seconds left";



            if (secondsLeft <= 0) {
                // Stops execution of action at set interval
                clearInterval(timerInterval);
                // Calls function to create and append image
                timeoutMessage();
            }

        }, 1000);
    }



    choice = document.querySelectorAll(".choice");
    correct = document.querySelector("#correct");
    //each element with the class "incorrect" will be an index in the array incorrect
    incorrect = document.querySelectorAll(".incorrect");


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
        choice1.setAttribute("class", "incorrect");
    }
    if (isCorrect2[currentQ] === true) {
        choice2.setAttribute("id", "correct");
    } else {
        choice2.removeAttribute("id");
        choice2.setAttribute("class", "incorrect");
    }
    if (isCorrect3[currentQ] === true) {
        choice3.setAttribute("id", "correct");
    } else {
        choice3.removeAttribute("id");
        choice3.setAttribute("class", "incorrect");
    }
    if (isCorrect4[currentQ] === true) {
        choice4.setAttribute("id", "correct");
    } else {
        choice4.removeAttribute("id");
        choice4.setAttribute("class", "incorrect");
    }
}

var timerEl = document.querySelector("#timer");
var secondsLeft = 70;


function timeoutMessage() {
    $("#timer").remove();
    var quizOver = document.createElement("h2");
    finalScore = numRight - numWrong;
    quizOver.innerHTML = `<h2>All done!  Your final score is ${finalScore} . </h2>`;
    container.appendChild(quizOver);
    var enterName = document.createElement("form");
    enterName.innerHTML = "<form id= form>  <label for='name'> Enter your name to save your high score:</label> <br> <input type='text' id='userName' name='name'><br> <input type='submit' value='Submit'></form>";
    container.appendChild(enterName);
    userName = document.querySelector("#userName");
    form = document.querySelector("#form");

    //event listener for user clicking the submit button, will run handleSubmit function
    form.on('submit', handleSubmit);

}

function handleSubmit(event) {
    //prevent default submit button functionality
    event.preventDefault();
    //we want to store the current user's name and their score in arrays so that we can create a list of all high scores
    listNames.push(userName.val());
    listScores.push(finalScore.val());
    userName = '';
    finalScore = '';
}

// function showHighScores()