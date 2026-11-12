// getCookie & saveCookie Functions
function getCookie(name) {
  const entry = document.cookie.split("; ").find((item) => item.startsWith(`${name}=`));
  return entry ? entry.split("=")[1] : null;
}

function saveCookie(name, value) {
  const year = 60 * 60 * 24 * 365; // a year in seconds
  document.cookie = `${name}=${value}; max-age=${year}; path=/`;
}

// Update Current Year in Footer Function
function updateCurrYear() {
  const footerYear = document.getElementById("copyright");
  const d = new Date();
  const dateStr = footerYear.textContent;
  let currYear = dateStr.replace('YYYY', d.getFullYear())
  footerYear.textContent = currYear;
}

const listRegistrations = () => {
  const savedRegistrations = localStorage.getItem("eventRegistration");
  const displayList = document.getElementById("currRegistrationsList");

  if (savedRegistrations === null) {
    displayList.textContent = "No registrants yet.";
    return;
  }

  const list = JSON.parse(savedRegistrations);
  list.registrants.forEach((attendee, index) => {
    const p = document.createElement("p");
    p.classList.add("attendees");
    p.innerHTML = `${index + 1}. Name: ${attendee.name}<br> Email: ${attendee.email}<br> Phone: ${attendee.phone}<br> Date of Registration: ${attendee.date}`;
    displayList.append(p);
  })
}

function deleteCookie(cookie) {
  document.cookie = `${cookie}=; max-age=0; path=/`;

  if (getCookie(cookie) === null){
      console.log(`${cookie} was deleted.`)
    } else {
      console.log(`${cookie} was not deleted.`)
    }
}

function loadMemberPage() {
  const cookieValue = getCookie("memberVisits");
  const cookieTotal = cookieValue === null ? 1 : Number(cookieValue) + 1;

  saveCookie("memberVisits", cookieTotal)

  const counterPlacement = document.getElementById("hitCounter");
  const counter = counterPlacement.textContent.replace("???", cookieTotal);
  counterPlacement.textContent = counter;

  // Function calls
  updateCurrYear();

  listRegistrations();

  // Cookie Buttons
  document.getElementById("displayCookieBtn").addEventListener("click", () => {
    console.log(document.cookie);
  })

  document.getElementById("deleteCookieBtn").addEventListener("click", () => {
    deleteCookie("authorizedUser");
    
  })
}

const authorizedCookie = getCookie("authorizedUser");

// Check for authorized cookie
if (authorizedCookie === null) {
  window.location.replace("index.html");
} else {
  loadMemberPage();
}

