var btnStart = document.getElementById("start");
var btnhighscores = document.getElementById("highscores");
var timeEl = document.getElementById("time");
var parentEl = document.getElementById("questions");
var score = 100;
var secondsLeft = 40;
var userAnswer;
var indexQuestion = 0;
var answer;
var numAnswer = 0;
var myStorage;
var cat;
var remainigtime =0;
const mySound = document.getElementById("sound");
const mySoundWrong = document.getElementById("wrongSound");
var myQuestions = [
    {
        //"numQuestion": 1,
        "textQuestion": "Commonly used data types DO NOT include:",
        answers: {
            "1": "1.string",
            "2": "2.booleans",
            "3": "3.alerts",
            "4": "4.numbers",
        },
        correctAnswer: "3.alerts",
    },
    {
        //"numQuestion": 2,
        "textQuestion": "The condition in an if/else statement is enclosed within _____.",
        answers: {
            "1": "1.quotes",
            "2": "2.curly brackets",
            "3": "3.parentheses",
            "4": "4.square brackets",
        },
        correctAnswer: "3.parentheses",
    },
    {
        //"numQuestion": 3,
        "textQuestion": "Arrays in JavaScript can be used to store ____.",
        answers: {
            "1": "1.numbers and strings",
            "2": "2.other arrays",
            "3": "3.booleans",
            "4": "4.all of the above",
        },
        correctAnswer: "4.all of the above",

    },
    {
        //"numQuestion": 4,
        "textQuestion": "String values must be enclosed within ____ when being assigned to variables.",
        answers: {
            "1": "1.commas",
            "2": "2.curly brackets",
            "3": "3.quotes",
            "4": "4.parentheses",
        },
        correctAnswer: "3.quotes",
    },
    {
        //"numQuestion": 5,
        "textQuestion": "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            "1": "1.JavaScript",
            "2": "2.terminal / bash",
            "3": "3.for loops",
            "4": "4.console.log",
        },
        correctAnswer: "4.console.log",
    }
]
var URLactual = location.pathname;


//Show the instructions
if (URLactual.includes("index.html")) {
    startGame(btnStart);
    //When I click on the View Highscores button, It Switch to Highscores page
    btnhighscores.addEventListener("click", function () {
        location.assign('Assets/highscores.html');
        URLactual = location.pathname;
    });
};

//When I click on the start button, It starts the test
function startGame() {
    btnStart.addEventListener("click", function () {
        initStorage()
        numAnswer = 0;
        // Sets interval in variable
        setTime();
        clearAll(parentEl);
        showQuestion();
        
    });
};

//Initilize the localStorage Variables
function initStorage() {
    localStorage.setItem("numCorrectAnswer",0);
    localStorage.setItem("score",0);
    localStorage.setItem("initials","");
    
}
//Seconds remaining and Sets interval in time variable
function setTime() {
    //console.log(secondsLeft);
    var timerInterval = setInterval(function () {
        secondsLeft--
        timeEl.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            clearAll(parentEl);
            finalResult();
        }

    }, 1000);
};

function clearAll(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

//Show the question and its answers
function showQuestion() {
    var newQuestion = document.createElement("ul");
    parentEl.appendChild(newQuestion);
    var linebreak = document.createElement('br');
    newQuestion.appendChild(linebreak);
    newQuestion.setAttribute("aria-label", myQuestions[indexQuestion].textQuestion);
    for (let j = 0; j < 4; j++) {
        var liEl = document.createElement("li");
        newQuestion.appendChild(liEl);
        x = document.createElement("input");
        x.setAttribute("type", "button");
        x.className = "btn";
        x.id = "ans" + (j + 1);
        liEl.appendChild(x);
        x.value = myQuestions[indexQuestion].answers[j + 1];
        var clickEl = document.getElementById("ans" + (j + 1));
        clickEl.addEventListener("click", (event) => {
            var userAnswer = event.target.value
            if (indexQuestion < 4) {
                if (userAnswer === myQuestions[indexQuestion].correctAnswer) {
                    answer = "Correct";
                } else {
                    answer = "Wrong";
                    secondsLeft -= 10;
                }
                correctWrong(answer);
                clearAll(parentEl);
                indexQuestion++;
                showQuestion();
                localStorage.setItem("remain", 0);
            } else {
                if (userAnswer === myQuestions[indexQuestion].correctAnswer) {
                    answer = "Correct";
                } else {
                    answer = "Wrong";
                    secondsLeft -= 10;
                }
                correctWrong(answer);
                clearAll(parentEl);
                remainigtime = secondsLeft;
                localStorage.setItem("remain", remainigtime);
                secondsLeft = 0;
                
            }
        });
        
    }
};

//Show if you answer was wrong or correct with sound
function correctWrong(answer) {
    var answerResult = document.getElementById('result');
    if (answer === 'Correct') {
        numAnswer = numAnswer + 1;
        myStorage = localStorage.setItem('numCorrectAnswer', numAnswer);
        answerResult.style.color = 'grey';
        mySound.play();
        mySound.currentTime = 0;

        setTimeout(function () {
            answerResult.textContent = ''
        }, 500)
    } else {
        answerResult.style.color = 'grey'
        mySoundWrong.play();
        mySoundWrong.currentTime = 0;
        setTimeout(function () {
            answerResult.textContent = ''
        }, 500)
    }
    answerResult.textContent = answer;
};

//Calculate the score
function calculateScore() {
    var rt = localStorage.getItem("remain");
    if (rt > 0  ) {
        cat = localStorage.getItem('numCorrectAnswer');
        //console.log(cat * 2);
        return parseInt(cat) * 2;
        
    } else {
        return 0;
    }
};

//Show your score that you got
function finalResult() {
   
    var done = document.createElement("p");
    parentEl.appendChild(done);
    done.textContent = "All done!";
    var finalScore = document.createElement("p");
    parentEl.appendChild(finalScore);
    finalScore.textContent = "Your final score is: ";
    var finalScoreResult = document.createElement("span");
    finalScoreResult.id = "score";
    finalScore.appendChild(finalScoreResult);
    finalScoreResult.textContent = calculateScore();

    var submitelement = createForm(parentEl);

    // Add submit event to form
    submitelement.addEventListener("click", function (event) {
        event.preventDefault();
        var initials = document.querySelector("#initials").value;
        if (initials === "") {
            alert("Initials cannot be blank");
        } else {
            userResult();
            location.assign('Assets/highscores.html');

            
        }

    });


};

//Create a form to give your initials
function createForm(parentEl) {
    //Create a form to 
    var createform = document.createElement('form'); // Create New Element Form
    createform.setAttribute("action", ""); // Setting Action Attribute on Form
    createform.setAttribute("method", "post"); // Setting Method Attribute on Form
    parentEl.appendChild(createform);
    var namelabel = document.createElement('label'); // Create Label for Name Field
    namelabel.innerHTML = "Enter initials : "; // Set Field Labels
    createform.appendChild(namelabel);
    var inputelement = document.createElement('input'); // Create Input Field for Name
    inputelement.id = "initials";
    inputelement.setAttribute("type", "text");
    inputelement.setAttribute("name", "dinitials");
    createform.appendChild(inputelement);
    var submitelement = document.createElement('input'); // Append Submit Button
    submitelement.className = "btn";
    submitelement.setAttribute("type", "submit");
    submitelement.setAttribute("name", "dsubmit");
    submitelement.setAttribute("value", "Submit");
    createform.appendChild(submitelement);
    return submitelement;
};

//Save the new info about score and initials in an array
function userResult() {
    // Parse any JSON previously stored in allEntries
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if(existingEntries == null) existingEntries = [];

    var initials = document.querySelector("#initials").value;
    localStorage.setItem("score", calculateScore());
    localStorage.setItem("initials", initials);
    var user = {
        init : localStorage.getItem("initials"),
        sco : localStorage.getItem("score"),
    }

    localStorage.setItem("user", JSON.stringify(user));
    // Save allEntries back to local storage
    existingEntries.push(user);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));

    
  
};
