//1. Use the following parallel arrays to dynamically populate the select element
const gameTypes = ["board", "video", "tabletop", "rpg"];
const gameTypeAbb = ['b', 'v', 't', 'r'];

//2. Use the following array to dynamically create a set of radio buttons
const gameDifficulty = ["Easy", "Moderate", "Difficult", "Hard"];

//3. Use the following array to dynamically create a set of checkboxes
const gameOptions = ["Good for Kids", "Multiplayer", "Fast Play", "Long Game", "Solitare"];

// variables bank
const gamePlayers = document.getElementById("gamePlayers");
const gameType = document.getElementById("gameType");
const difficultyRatings = document.getElementById("difficultyRatings");
const listOptions = document.getElementById("listOptions");
const gameNameInput = document.getElementById("gameName");
const textBox = document.getElementById("textBox");
const p = document.createElement("p");
const em = document.createElement("em");
p.append(em);
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

  input.setAttribute("type", "radio");
  input.id = "gameDifficulties" + game;
  input.name = "gameDifficulties";
  input.value = game;

  label.htmlFor = input.id;
  label.append(input, game)
  difficultyRatings.append(label)
});

// Checkboxes
gameOptions.forEach((game) => {
  const label = document.createElement("label");
  const input = document.createElement("input");

  input.setAttribute("type", "checkbox");
  input.id = "gameOptions" + game;
  input.name = "gameOptions";
  input.value = game[0];

  label.htmlFor = input.id;
  label.append(input, game)
  listOptions.append(label)
});


// Functions
function updateCurrYear() {
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
    return true;
  } else {
    console.log(value + ' is not a whole number');
    return false;
  }
}

// Listener Event for Form Submission
document.addEventListener("submit", (e) => {
  e.preventDefault();

  em.textContent = "";
  const submittedPlayers = gamePlayers.value.trim();
  const playerCount = Number(submittedPlayers);
  let trimmedInput = gameNameInput.value.trim();
  let checkedValue = [...document.querySelectorAll('input[name="gameOptions"]:checked')].map(box => box.value);
  const radios = document.querySelector('input[name="gameDifficulties"]:checked');

  // Validation branches
  if (trimmedInput === "") {
    em.textContent = "Please enter a game name.";
    textBox.append(p);
    gameNameInput.focus();
  } else if (trimmedInput.length > 50) {
    em.textContent = "Game name must be 50 characters or fewer.";
    textBox.append(p);
    gameNameInput.focus();
  } else if (gameType.value === "") {
    em.textContent = "Please select a game type from the dropdown menu.";
    textBox.append(p);
    gameType.focus();
  } else if (submittedPlayers === "") {
    em.textContent = "Please enter a number.";
  } else if (!isWholeNumber(playerCount)) {
    em.textContent = "Please enter a whole number.";
    textBox.append(p);
    gamePlayers.focus();
  } else if (playerCount < 1 || playerCount > 20) {
    em.textContent = "Player count must be between 1 and 20.";
    textBox.append(p);
    gamePlayers.focus();
  } else if (radios === null) {
    em.textContent = "Please select a difficulty.";
    textBox.append(p);
    document.querySelector('input[name="gameDifficulties"]').focus();
  } else if (checkedValue.includes("F") && checkedValue.includes("L")) {
    em.textContent = "Game cannot be Fast Play and Long Game. Please select one or the other.";
    textBox.append(p);
    document.querySelector('input[name="gameOptions"]').focus();
  }
});


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

// What’s next

// Once the checkbox selector is fixed, validation is complete. After that comes the success path: add a final else after the chain where you will:

// Build a new Game(...) from the values (trimmedInput, gameType.value, playerCount, radios.value, and the checkedValue array).
// console.log the game.
// Call gameLibrary.addGame(...).
// console.log the library.