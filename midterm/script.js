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
updateCurrYear();
const displayGameLibrary = document.querySelector(".displayGameLibrary");
const gameBoxes = document.querySelector('div[class="gameBoxes"]');

// Game Library
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
  input.value = game;

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
    return true;
  } else {
    return false;
  }
}

// Add Game Button - Listener Event / Form Submission
document.getElementById("addGameBtn").addEventListener("click", (e) => {
  e.preventDefault();

  em.textContent = "";
  const submittedPlayers = gamePlayers.value.trim();
  const playerCount = Number(submittedPlayers);
  let trimmedInput = gameNameInput.value.trim();
  let checkedValue = [...document.querySelectorAll('input[name="gameOptions"]:checked')].map(box => box.value);
  const radios = document.querySelector('input[name="gameDifficulties"]:checked');
  p.append(em);

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
  } else if (submittedPlayers === "") {
    em.textContent = "Please enter a number.";
    textBox.append(p);
    gamePlayers.focus();
  } else if (Number.isNaN(playerCount)) {
    em.textContent = "Please enter a numeric value.";
    textBox.append(p);
    gamePlayers.focus();
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
  } else if (checkedValue.includes("Fast Play") && checkedValue.includes("Long Game")) {
    em.textContent = "Game cannot be Fast Play and Long Game. Please select one or the other.";
    textBox.append(p);
    document.querySelector('input[name="gameOptions"]').focus();
  } else {
    const gameTypePosition = gameTypeAbb.indexOf(gameType.value);
    const gameTypeName = gameTypes[gameTypePosition];

    const game = new Game(trimmedInput, gameTypeName, playerCount, radios.value, checkedValue)
    console.log(game);

    gameLibrary.addGame(game);

    console.log(gameLibrary.games);
    em.textContent = trimmedInput + " has been added to game library.";
    textBox.append(p);
  }
});

// New Game Btn
document.getElementById("newGameBtn").addEventListener("click", () => {
  em.textContent = "";
  textBox.append(p);
});

// Reset Btn
document.getElementById("resetBtn").addEventListener("click", () => {
  em.textContent = "";
  textBox.append(p);

  gameLibrary.games = [];
  gameBoxes.innerHTML = "";
});

// Display Library button
document.getElementById("displayLibraryBtn").addEventListener("click", (e) => {
  e.preventDefault();

  if (gameLibrary.games.length === 0) {
    em.textContent = "";
    em.textContent = "No games in library."
    textBox.append(p);
  } else {
    gameBoxes.innerHTML = "";

    gameLibrary.games.forEach((game) => {
      const div = document.createElement("div");
      div.classList.add("library-games");

      const gameTitle = document.createElement("h3");
      gameTitle.textContent = game.title;

      const wrapperA = document.createElement("div");
      const labelA = document.createElement("p");
      labelA.textContent = "Game Type";
      labelA.classList.add("labels")
      const valueA = document.createElement("p");
      valueA.textContent = game.type;
      wrapperA.append(labelA, valueA);

      const wrapperB = document.createElement("div");
      const labelB = document.createElement("p");
      labelB.textContent = "Players";
      labelB.classList.add("labels");
      const valueB = document.createElement("p");
      valueB.textContent = game.playerCount;
      wrapperB.append(labelB, valueB);

      const wrapperC = document.createElement("div");
      const labelC = document.createElement("p");
      labelC.textContent = "Difficulty Rating";
      labelC.classList.add("labels");
      const valueC = document.createElement("p");
      valueC.textContent = game.rating;
      wrapperC.append(labelC, valueC);

      const wrapperD = document.createElement("div");
      const labelD = document.createElement("p");
      labelD.textContent = "Game Options";
      labelD.classList.add("labels");

      if (game.extras.length === 0) {
        labelD.textContent = "No Game Options";
        wrapperD.append(labelD);
      } else {
        const ul = document.createElement("ul");
        for (let i = 0; i < game.extras.length; i++) {
          const li = document.createElement("li");
          li.textContent = game.extras[i];
          ul.append(li);
        }
        wrapperD.append(labelD, ul);
      }

      div.append(wrapperA, wrapperB, wrapperC, wrapperD);
      gameBoxes.append(div);
    })
  }
});