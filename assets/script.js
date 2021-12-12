var startBtn = document.getElementById('start-btn')
var nextBtn = document.getElementById('next-btn')
var header = document.getElementById('welcome')
var theQuiz = document.getElementById('quiz')
var questionEl = document.getElementById('question')
var answerBtnsEl = document.getElementById('answer-btns')
var timer = document.getElementById('timer')
var resultsEl = document.getElementById('results')
var resultsBtn = document.getElementById('see-results-btn')
var highScoresBtn = document.getElementById('high-scores-btn')
var highScoresEl = document.getElementById('high-scores')


var shuffledQuestions, currentQuestionIndex
var timeInterval;

var score = 0
var timeLeft = 10
var savedScores = [];




var quizQuestions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<script>', correct: true },
            { text: '<js>', correct: false},
            { text: '<javascript>', correct: false},
            { text: '<scripting>', correct: false}
        ]
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        answers: [
            { text: 'The <head> section', correct: false},
            { text: 'The <body> section', correct: false},
            { text: 'Both the <head> section and the <body> section are correct', correct: true},
        ]   
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            { text: 'msgBox("Hello World");', correct: false},
            { text: 'msg("Hello World");', correct: false},
            { text: 'alert("Hello World");', correct: true},
            { text: 'alertBox("Hello World");', correct: false},
        ]
    },
    {
        question: 'How do you call a function named "myFunction"?',
        answers: [
            { text: 'call myFunction()', correct: false},
            { text: 'myFunction()', correct: true},
            { text: 'call function myFunction()', correct: false},
        ]
    },
    {
        question: 'How does a FOR loop start?',
        answers: [
            { text: 'for(1=0; i<=5)', correct: false},
            { text: 'for(i<=5; i++)', correct: false},
            { text: 'for (i=0; i<=5; i++)', correct: true},
            { text: 'for i= 1 to 5', correct: false},
        ]
    },
    {
        question: 'How do you add a comment in JavaScript?',
        answers: [
            { text: '//This is a comment', correct: true},
            { text: '||This is a comment', correct: false},
            { text: '<!--This is a comment-->', correct: false},
        ]
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        answers: [
            { text: 'var colors = ["red", "green", "blue"]', correct: true},
            { text: 'var colors = 1 =("red"), 2 = ("green"), 3 = ("blue")', correct: false},
            { text: 'var colors = "red", "green", "blue"', correct: false},
            { text: 'var colors = (1:"red", 2:"green", 3:"blue")', correct: false},
        ]
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        answers: [
            { text: 'onmouseover', correct: false},
            { text: 'onmouseclick', correct: false},
            { text: 'onchange', correct: false},
            { text: 'onclick', correct: true},
        ]
    },
    {
        question: 'How do you declare a JavaScript variable?',
        answers: [
            { text: 'var carName;', correct: true},
            { text: 'v carName;', correct: false},
            { text: 'variable carName;', correct: false},
        ]
    },
    {
        question: 'Is JavaScript case-sensitive?',
        answers: [
            { text: 'No', correct: false},
            { text: 'Yes', correct: true}
        ]
    },
]


function startQuiz() {
    console.log('started');
    startBtn.classList.add('hide');
    header.classList.add('hide');
    shuffledQuestions = quizQuestions.sort(() => Math.random() -.5);
    currentQuestionIndex = 0;
    theQuiz.classList.remove('hide');
    countdown();
    setNextQuestion();
}

function countdown() {
    
    var timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timer.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            timer.textContent = timeLeft + ' second remaining';
            timeLeft--; 
        } else if (timeLeft <= 0 && !resultsBtn) {
            timer.textContent = '';
            clearInterval(timeInterval);
            alert('You ran out of time');
            resultsBtn.classList.remove('hide');
            questionEl.classList.add('hide');
            answerBtnsEl.classList.add('hide');
        } else if (timeLeft <= 0 && resultsBtn === true) {
            timer.textContent = '';
            clearInterval(timeInterval);
        }
    }, 1000)
    
    
    
}

function setNextQuestion() {
   
    showQuestion(shuffledQuestions[currentQuestionIndex])

}


function showQuestion(question) {
    questionEl.innerText = question.question
    answerBtnsEl.innerHTML = '';
    nextBtn.classList.add('hide');
    question.answers.forEach( answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerBtnsEl.appendChild(button)
    })

}

function selectAnswer(event) {
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    Array.from(answerBtnsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextBtn.classList.remove('hide')
    } else {
        resultsBtn.classList.remove('hide')
    }
    nextBtn.classList.remove('hide')

    if (selectedButton = correct) {
        score = score + 5;
        
    }
    else if (selectedButton = !correct) {
        score = score - 5;
        
    }


    console.log(score)
   
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong') 
    }

}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function endGame() {
    scoring();
    timer.classList.add('hide');
    theQuiz.classList.add('hide');
    resultsEl.classList.remove('hide'); 
    var resultHeader = document.createElement('h2')
    var initialForm = document.createElement('input')
    initialForm.placeholder = 'Enter your initials here'
    resultHeader.textContent = 'Your score is ' + score
    var submitBtn = document.createElement('button')
    submitBtn.textContent = 'Submit'

    submitBtn.addEventListener('click', showHighScores)
    
    
    
    resultsEl.appendChild(resultHeader)
    resultsEl.appendChild(initialForm)
    resultsEl.appendChild(submitBtn)
}

function showHighScores() {
    theQuiz.classList.add('hide');
    resultsEl.classList.add('hide');
    startBtn.classList.add('hide');
    header.classList.add('hide');
    highScoresBtn.classList.add('hide');
    highScoresEl.classList.remove('hide')

    var highScoreHeader = document.createElement('h2')
    highScoreHeader.textContent = 'High Scores'
    var highScoreList = document.createElement('table')
    highScoreHeader.textContent


    highScoresEl.appendChild(highScoreHeader)
    highScoresEl.appendChild(highScoreList)

}

function scoring() {
    localStorage.setItem(score, savedScores)
}


startBtn.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
resultsBtn.addEventListener('click', endGame)
highScoresBtn.addEventListener('click', showHighScores)






/* To Do:
1. EndGame Function
    -when I cycle through the entire array of questions, and when I hit the 'next' button, OR when the timer runs out
        - The endGame page will show score and offer restart button
        - The endGame page will prompt me enter my initials to store my score

2. Figure out timer issue

3. Scoring
    - the scores and initials are stored in localStorage
    - when I click the the HighScores button I am presented with the list of high scores

4. Styling
    
*/













