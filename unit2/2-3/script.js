// Arrays for fun
let breedInfo = ["Australian Shepherd Breed Facts", "Herding Dog Facts", "Mini Aussie vs Mini American Shepherd"];
let breedLinks = ["https://www.allthingsdogs.com/mini-australian-shepherd/", "https://www.britannica.com/animal/herding-dog", "https://buckarooaussies.com/mini-australian-shepherd-vs-miniature-american-shepherd/"];
let nicknames = ["Mei-mei", "Mesa mouse-a", "Itty bitty"];

// Variables
const div = document.createElement("div");
const div2 = document.createElement("div");
div2.style.margin = "20px auto";
const h1 = document.createElement("h1");
const p = document.createElement("p");
const select = document.createElement("select");
select.setAttribute("id","slct");
const span = document.createElement("span");
span.setAttribute("id", "outputLink");
div2.append(span);
const h2 = document.createElement("h2");
const img = document.createElement("img");
img.src = "mesa.jpeg";
img.alt = "Miniature Aussie looks over shoulder and gives you a killer side-eye";
img.style.width = "25%";
img.style.border = "0.3em inset white";
const placeholder = document.createElement("option");
placeholder.value = "";
placeholder.textContent = "-- Select an option --";
placeholder.selected = true;
placeholder.disabled = true;
select.append(placeholder);
const div3 = document.createElement("div");


// What is being appended
h1.textContent = "Hi, my name is Mesa";
p.append("I am a miniature Australian Shepherd and my pawrent calls me by many names. ", document.createElement("br"), "Choose your favorite using the radio buttons or use the dropdown to see aussie facts!");
h2.textContent = "Vote on a nickname!"

// Option dropdown population
breedInfo.forEach((info, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = info;
  select.append(option);
});


// Dropdown listener event
select.addEventListener("change", () => {
  const i = Number(select.value);
  const outputSelection = document.getElementById("outputLink");
  outputSelection.innerHTML = "";
  outputSelection.append("Follow this link for more information: ", document.createElement("br"), breedLinks[i]);
});

// Radio population
nicknames.forEach((names, index) => {
  const radio = document.createElement("input");
  radio.setAttribute("type", "radio");
  radio.value = "default";
  radio.name = "nicknames-list";
  radio.id = `names-${index}`;

  const label = document.createElement("label");
  label.htmlFor = radio.id;
  label.textContent = names;

  // Radio listener event
  radio.addEventListener("change", () => {
    if(index === 0){
      div3.textContent = "";
      div3.textContent = "Mei-mei is what my friends like to call her."
    } else if(index === 1){
      div3.textContent = "";
      div3.textContent = "Mesa mouse-a is fun to say. Good choice!"
    } else if(index === 2){
      div3.textContent = "";
      div3.textContent = "Itty bitty because she *is* itty bitty. Correct.";
    }
  });

  div.append(radio, label);
});



// Where to append
const body = document.querySelector("body");
body.append(h1, img, p, select, div2, div, div3);

// Styling
body.style.backgroundColor = "tan";
body.style.width = "50%";
body.style.textAlign = "center";
body.style.margin = "auto";