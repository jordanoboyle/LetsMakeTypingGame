//DOM elements needed
const word             = document.getElementById('word');
const text             = document.getElementById('text');
const scoreEl          = document.getElementById('score');
const timeEl           = document.getElementById('time');
const endgameEl        = document.getElementById('end-game-container');
const settingsBtn      = document.getElementById('settings-btn');
const settings         = document.getElementById('settings');
const settingsForm     = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//You could connect to a Word API, but here we are going to hard code.
//To establish an API connection you would use a function to call a fetch/GET request

const words = [
  'sigh',
  'apple',
  'tiger',
  'pitbull', 
  'cheetah',
  'elven',
  'pirate',
  'helpful',
  'fascist',
  'feeble',
  'orange',
  'arrogant',
  'untrustworthy',
  'deceitful',
  'liar',
  'dinosaur'
];


//Use let here because we will be needing to adjust these. 
//Initialize the word chosen.
let randomWord;

//Initial score
let score = 0;

//Initialize time
let time = 10;

//Initialize Difficulty
let difficulty = 'medium';

// //Initialize random word
// let randWordAPI;


//Generate a random word. (THIS IS CURRENTLY REDUDANT)
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//Focus on text on START
text.focus(); //This little nifty method focuses the "cursor" directly on the input box


//Start Counting Down
const timeInterval = setInterval(updateTime, 1000);

//Optional random word API call
async function getRandomWordFromAPI() {
  try {
    const response = await fetch('https://random-word-api.vercel.app/api?words=1');
    const data = await response.json();
    const randWordAPI = data[0];
    
    return randWordAPI;
  } catch (error) {
    console.log("Error fetching data.", error);
  }
}


//Updating the word DOM element
async function updateWordToDOM() {
  randomWord = await getRandomWordFromAPI();
  word.innerHTML = randomWord;
}


//Updating the score
function updateScore() {
  score ++;
  scoreEl.innerHTML = score;
}

//Update the Time
function updateTime() {
  time --;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);

    //END GAME
    gameOver();
  }
}

//GAME OVER, show End Screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time Ran Out</h1>
    <p>Your Final Score Is: ${score} </p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

updateWordToDOM();

//Event Listeners

//TYPING
text.addEventListener('input', e => {
  const insertedText = e.target.value;
  // console.log(insertedText);

  if (insertedText === randomWord) {
    updateWordToDOM();

    updateScore();
    //CLEAR
    e.target.value = '';
    
    
    //Adding time if correct answer
    time += 5;
    updateTime();
  }
});

//SETTINGS BUTTON CLICK
settingsBtn.addEventListener('click', () => 
  settings.classList.toggle('hide'));

//SETTINGS SELECTION
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;

  console.log(difficulty);
});