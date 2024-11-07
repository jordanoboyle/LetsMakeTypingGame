//DOM elements needed
const word             = document.getElementById('word');
const text             = document.getElementById('text');
const scoreEl          = document.getElementById('score');
const timeEl           = document.getElementById('time');
const endgameEl        = document.getElementById('end-game');
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

// //Initialize random word
// let randWordAPI;


//Generate a random word.
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

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

//Updating the DOM
async function updateWordToDOM() {
  randomWord = await getRandomWordFromAPI();
  word.innerHTML = randomWord;
}

updateWordToDOM();