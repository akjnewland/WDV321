//1. Use the following parallel arrays to dynamically populate the select element
const gameTypes = ["board", "video", "tabletop", "rpg"];
const gameTypeAbb = ['b', 'v', 't', 'r'];

//2. Use the following array to dynamically create a set of radio buttons
const gameDifficulty = ["Easy", "Moderate", "Difficult", "Hard"];

//3. Use the following array to dynamically create a set of checkboxes
const gameOptions = ["Good for Kids", "Multiplayer", "Fast Play", "Long Game", "Solitare"];

// variables bank
const gameType = document.getElementById("gameType");
const difficultyRatings = document.getElementById("difficultyRatings");
const listOptions = document.getElementById("listOptions");
const gameNameInput = document.getElementById("gameName");
const textBox = document.getElementById("textBox");
let trimmedInput = gameNameInput.value.trim();
const p = document.createElement("p");
const em = document.createElement("em");
p.append(em);
const players = document.getElementById("gamePlayers").value;
Number(players);

updateCurrYear();

// Dropdown with parallel arrays
gameTypes.forEach((game, index) => {
  const option = document.createElement("option");
  const abbrv = gameTypeAbb[index];

  option.textContent = game;
  option.value = abbrv;

  gameType.append(option);
});

// Radios
gameDifficulty.forEach((game) => {
  const label = document.createElement("label");
  const input = document.createElement("input");

  label.htmlFor = "gameDifficulties";
  input.setAttribute("type", "radio");
  input.id = "gameDifficulties";
  input.name = "gameDifficulties";
  
  label.append(input, game)
  difficultyRatings.append(label)
});

// Checkboxes
gameOptions.forEach((game) => {
  const label = document.createElement("label");
  const input = document.createElement("input");

  label.htmlFor = "gameOptions";
  input.setAttribute("type", "checkbox");
  input.id = "gameOptions";
  input.name = "gameOptions";
  input.value = game[0];
  
  label.append(input, game)
  listOptions.append(label)
});


// Functions
function updateCurrYear(){
  const footerText = document.querySelector("footer p");
  const d = new Date();
  const dateStr = footerText.textContent;
  let currYear = dateStr.replace('YYYY', d.getFullYear())
  footerText.innerHTML = currYear;
  console.log(currYear)
}

function isWholeNumber(value) {
  if (value % 1 === 0) {
    console.log(value + ' is a whole number');
  } else {
    console.log(value + ' is not a whole number');
  }
}

// Listener Event for Form Submission
document.addEventListener("submit", (e) => {
  e.preventDefault();

  let checkedValue = document.querySelectorAll('listOptions:checked').value;
  
// Validation branches
  if(trimmedInput === "") {
    em.textContent = "Please enter a game name.";
    textBox.append(p);
    gameNameInput.focus();
  } else if(trimmedInput.length > 50){
      em.textContent = "Game name must be 50 characters or fewer.";
      textBox.append(p);
      gameNameInput.focus();
  } else if(gameType === 0){
      em.textContent = "Please select a game type from the dropdown menu.";
      textBox.append(p);
      gameType.focus();
  } else if(players < 1 || players > 20) {
      em.textContent = "Player count must exceed 1 and be less than 20.";
      textBox.append(p);
      gamePlayers.focus();
  } else if(isWholeNumber(players) === false) {
      em.textContent = "Please enter a whole number.";
      textBox.append(p);
      gamePlayers.focus();
  } else if(difficultyRatings.checked = false) {
      em.textContent = "Please select a difficulty.";
      textBox.append(p);
      difficultyRatings.focus();
  } else if(checkedValue === "F" && checkedValue === "L"){
      em.textContent = "Game cannot be Fast Play and Long Game. Please select one or the other.";
      textBox.append(p);
      listOptions.focus();
  }
})


// em.textContent = "Thanks for the submission!";
//   textBox.append(p);
// const game = new Game()
// gameLibrary.addGame(game)

// is a dropdown selected?




// Game Library
const displayGameLibrary = document.querySelector(".displayGameLibrary");

const gameLibrary = {
  games: [],
  addGame(game) {
    this.games.push(game);
  }
}

class Game {
  constructor(title, type, playerCount, rating, extras = []) {
    this.title = title;
    this.type = type;
    this.playerCount = playerCount;
    this.rating = rating;
    this.extras = extras;
  }
}