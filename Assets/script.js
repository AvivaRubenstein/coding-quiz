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
var listNames = [];
var listScores = [];
var form;
var submitBtn;
var scoreStorage;
var scoresArray;
var correctOrNotMessage;
//the timer will start with 50 seconds left
var timerEl = document.querySelector("#timer");
var secondsLeft = 50;



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
    event.stopPropagation();
    clearHTML();
    //creates the timer
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

    //After the user answers a question, this HTML element will display a message indicating whether their last answer was correct or not
    correctOrNotMessage = document.createElement("h4");
    qCard.appendChild(correctOrNotMessage);

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
                correctOrNotMessage.textContent = "Correct!"
            } else {
                secondsLeft -= 5;
                correctOrNotMessage.textContent = "Incorrect."
            }

            //sets us up to move to the next question in our questionBlock
            currentQ++;
            //if we have reached the end of the number of qs we have, this removes the question/answers and stops the timer
            if (currentQ >= promptBank.length) {
                //erases question block
                question.remove();
                choice1.remove();
                choice2.remove();
                choice3.remove();
                choice4.remove();

                timeoutMessage();


            } else {
                //if we still have more questions left, we call the setQuestion() function to update the questionBlock object to be the next q in the arrays
                setQuestion();
                //the slots for the question and the 4 choices will be filled with the current content of the object's fields
                question.innerHTML = `${questionBlock.prompt}`;
                choice1.innerHTML = `${questionBlock.ans1}`;
                choice1.setAttribute("class", "choice");
                choice2.innerHTML = `${questionBlock.ans2}`;
                choice2.setAttribute("class", "choice");
                choice3.innerHTML = `${questionBlock.ans3}`;
                choice3.setAttribute("class", "choice");
                choice4.innerHTML = `${questionBlock.ans4}`;
                choice4.setAttribute("class", "choice");
                //this will assign the id "correct" to whichever of the buttons contains the correct answer 
                checkCorrectness();
            }
        });
    }

    function setTime() {
        // Sets interval/timer --- it displays a countdown that decrements every second
        var timerInterval = setInterval(function () {
            secondsLeft--;
            timerEl.textContent = secondsLeft + " seconds left";

            //If we run through all the questions, we don't need the timer to continue, and we want to stop TimeoutMessage() from running a second time when the timer also runs out
            //so the timer should stop when we reach the end of the questions
            if(currentQ >= promptBank.length) {
                clearInterval(timerInterval);
            }
            if (secondsLeft <= 0) {
                // Stops the timer when we run out of time
                clearInterval(timerInterval);
                //erases the question block when time runs out
                question.remove();
                choice1.remove();
                choice2.remove();
                choice3.remove();
                choice4.remove();
                // Calls function to get rid of timer, display the score, and allow user to input their name to be stored with the past scores
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

//these arrays represent the question and answer content for our quiz, with each index representing the next q in the sequence)
var promptBank = ["Which line of code is used to prevent event bubbling in javaScript?",
    "What is a for loop used to do?",
    "What does DOM refer to in HTML?", "To create new HTML elements using javaScript, you must: ", "Local storage allows us to: "];
var ans1Bank = ["event.stopPropogation()",
    "It sets up conditional logic to run indefinitely",
    "The Direct Outer Method ", "You can't add it with javaScript, you must put it directly into the HTML code", "Store information in the user's browser even after they refresh or close the page"];
var ans2Bank = ["event.stopBubbling()",
    "It tells you what each block of code is used for",
    "The Document Object Model", "use the addNewHTML item class", "Store information in the user's browser, but only until they refresh or close the page, at which point it deletes"];
var ans3Bank = ["event.stopClickTrigger()",
    "It iterates through a block of code multiple times",
    "The Document Over Main", "create a new CSS class and link it to javaScript", "Store information in an external server until the user finishes their browser session"];
var ans4Bank = ["event.preventDefault()",
    "It defines a boolean variable ",
    "The Direct Object Method", "create a new HTML element and append it to the document", "Store information to the user's browser and to our server until the user chooses to clear their cookies"];

//these arrays store which of the 4 answer choices is correct (each index represents another q in the sequence)
var isCorrect1 = [true, false, false, false, true];
var isCorrect2 = [false, false, true, false, false];
var isCorrect3 = [false, true, false, false, false];
var isCorrect4 = [false, false, false, true, false];

//this function assigns the id of correct to the choice which has the correct answer
//incorrect answers have this id removed so that the buttons which contained past correct answers are not still marked as correct
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


var quizOver;
function timeoutMessage() {
    //this function should get rid of the timer element, and create a message saying the quiz is over, calculate and report the current quiz score
    //and create a form for the user to submit their name to be stored in the high score list
    $("#timer").remove();
    quizOver = document.createElement("h2");
    quizOver.innerHTML = `All done!  Your final score is ${numRight}.`;
    container.appendChild(quizOver);
    enterName = document.createElement("form");
    enterName.innerHTML = "<label for='name'> Enter your name to save your high score:</label> <br> <input type='text' id='userName' name='name'><br> <input type='submit' value='Submit' id='submit'>";
    enterName.setAttribute = ("id", "form");
    container.appendChild(enterName);
    userName = document.querySelector("#userName");
    form = document.querySelector("#form");
    submitBtn = document.querySelector("#submit");



//this event listener listens for the submit button being clicked, sets up the scoreStorage object to contain the current user's score and entered name
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        scoreStorage = {
            currentUser: userName.value,
            currentScore: numRight
        };
        scoresArray = [];
        var lastPlayer = JSON.parse(localStorage.getItem("score-name"));

        //if there is no previous name/score stored in score-name, we do localStorage.setItem set up the score-name in local storage
        //otherwise, we retrieve the existing entries with localStorage.getItem, and push the newest scores (in the scoreStorage object) into our scoresArray, and then set
        //the new/update scoresArray array to be stored in local storage under the score-name key
        if (lastPlayer === null) {
            scoresArray.push(scoreStorage);
            localStorage.setItem("score-name", JSON.stringify(scoresArray));
        } else {
            scoresArray = JSON.parse(localStorage.getItem("score-name"));

            scoresArray.push(scoreStorage);
            localStorage.setItem("score-name", JSON.stringify(scoresArray));
        }
        //after the user submits their name, 
        //calls function to display the previous high scores/names
        handleHighScoreDisplay();

    });

}

function handleHighScoreDisplay (){
    //clear out the message which told the user whether their last answer was correct or not
    //clear out quizOver message and the enterName form
    correctOrNotMessage.remove();
    quizOver.remove();
    enterName.remove();

    var highScoreList = document.createElement("ul");
    container.appendChild(highScoreList);
    for (x=0; x < scoresArray.length; x++){

    liEl = document.createElement("li");
    highScoreList.appendChild(liEl);
    liEl.innerHTML = `<span class = highScoreName> Name:   </span> ${scoresArray[x].currentUser } <span class = highScoreScore>   Score:   </span> ${scoresArray[x].currentScore}`;
    }
    

}