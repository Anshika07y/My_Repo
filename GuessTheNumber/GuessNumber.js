let randomNumber = (parseInt(Math.random()*100 + 1));
console.log(randomNumber);


const submitButton = document.querySelector("#button");
const userInput = document.querySelector("#guess");
const guessSlot = document.querySelector("#previousG");
const remaining = document.querySelector("#remainingG");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector("#guesses");

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;
if (playGame) {
    submitButton.addEventListener('click',function(e) {
        e.preventDefault()
        const guess =parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess);
    })
    
}
function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("please enter a valid number");
    }else if (guess < 1 || guess>100) {
        alert("please enter a valid number");
    }else{
        prevGuess.push(guess);
        if (numGuess === 11) {
            cleanUp(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`)
            endGame();
        }else{
            cleanUp(guess);
            checkGuess(guess);
        }
    }
    
    
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        cleanUp(`You guessed it right`);
        endGame();
        
    }else if (guess < randomNumber){
        displayMessage(`Number is tooo low`);
    }
    else if (guess > randomNumber){
        displayMessage(`Number is tooo high`);
    }
        
}

function cleanUp(guess) {
    userInput.value =""
    guessSlot.innerHTML +=`${guess},` 
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame() {
    userInput.value = ""
    userInput.setAttribute('disabled' ,'');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start new game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector("#newGame");
    newGameButton.addEventListener('click',function(e){
        randomNumber = (parseInt(Math.random()*100 + 1));
        prevGuess = []
        numGuess =1
        guessSlot.innerHTML =""
        remaining.innerHTML = `${11 - numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p);
        playGame = true;
    })
}

