let membersInfo = {
  memberUserNames: [
    "A1D2C4",
    "B2D4C6",
    "B3C2D1"
  ]
}

class Registrant {
  constructor(name, email, phone, date) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.date = date;
  }
}

const savedRegistrations = localStorage.getItem("eventRegistration");
const eventRegistration = savedRegistrations ? JSON.parse(savedRegistrations) : { registrants: [] };

function updateCurrYear() {
  const footerYear = document.getElementById("copyright");
  const d = new Date();
  const dateStr = footerYear.textContent;
  let currYear = dateStr.replace('YYYY', d.getFullYear())
  footerYear.textContent = currYear;
}

// Focus Placeholder
const fieldsetInput = document.querySelectorAll("fieldset input");
fieldsetInput.forEach((input) => {
  const placeholderText = input.placeholder;

  input.addEventListener("focus", () => {
    input.placeholder = "";
  });

  input.addEventListener("blur", () => {
    input.placeholder = placeholderText;
  });
});

// Validation Functions
const isSpecialChars = (text) => {
  const specialChars = "!@#$%^&*()+=[]\\\;,./{}|\":<>?1234567890";

  for (const char of text) {
    if (specialChars.includes(char)) {
      return true;
    }
  }
  return false;
};

const isEmailValid = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

const isPhoneValid = (phone) => {
  const regex = /^\d{10}$/;
  return regex.test(phone);
};

// Honeypot
const honeypot = document.querySelectorAll('.text-field');
honeypot.forEach((field) => {
  field.style.display = "none";
});


// The Big Validation Function
const isValid = () => {
  const honeyTrap1 = document.querySelector('input[name="contact"]').value;
  if (honeyTrap1 !== "") {
    return false;
  }

  const honeyTrap2 = document.querySelector('input[name="email2"]');
  if (honeyTrap2.value !== honeyTrap2.defaultValue) {
    return false;
  }

  let allClear = true;
  const name = document.getElementById("name");
  const trimmedName = name.value.trim();
  const div1 = document.getElementById("notice1");
  const div2 = document.getElementById("notice2");
  const div3 = document.getElementById("notice3");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const email = document.getElementById("email");
  const trimmedEmail = email.value.trim();
  const phoneNumber = document.getElementById("phone");
  const trimmedTel = phoneNumber.value.trim();

  div1.innerHTML = "";
  div2.innerHTML = "";
  div3.innerHTML = "";

  if (trimmedName === "") {
    p1.textContent = "Please enter your full name";
    div1.append(p1);
    allClear = false;
  } else if (trimmedName.length > 50) {
    p1.textContent = "Character limit cannot exceed 50.";
    div1.append(p1);
    allClear = false;
  } else if (trimmedName.length < 2) {
    p1.textContent = "Name must be more than 1 character.";
    div1.append(p1);
    allClear = false;
  } else if (isSpecialChars(trimmedName)) {
    p1.textContent = "Name contains an invalid character.";
    div1.append(p1);
    allClear = false;
  }

  if (trimmedEmail === "") {
    p2.textContent = "Please enter an email address.";
    div2.append(p2);
    allClear = false;
  } else if (!isEmailValid(trimmedEmail)) {
    p2.textContent = "Invalid email.";
    div2.append(p2);
    allClear = false;
  }

  if (trimmedTel === "") {
    p3.textContent = "Please enter a telephone number.";
    div3.append(p3);
    allClear = false;
  } else if (!isPhoneValid(trimmedTel)) {
    p3.textContent = "Invalid phone number. Enter 10 digits with no dashes or spaces.";
    div3.append(p3);
    allClear = false;
  }

  return allClear;
};

// Form submission event listener
const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const result = isValid();
  console.log(result);

  const p = document.createElement("p");
  const div = document.getElementById("notice4");

  div.innerHTML = "";

  if (result) {
    const name = document.getElementById("name");
    const trimmedName = name.value.trim();
    const email = document.getElementById("email");
    const trimmedEmail = email.value.trim();
    const phoneNumber = document.getElementById("phone");
    const trimmedTel = phoneNumber.value.trim();
    const date = new Date();

    const registrant = new Registrant(trimmedName, trimmedEmail, trimmedTel, date);

    eventRegistration.registrants.push(registrant);

    localStorage.setItem("eventRegistration", JSON.stringify(eventRegistration));

    p.textContent = "You are successfully registered!";
    div.append(p);

    registrationForm.reset();
  }
});


// Cookies for Hit Counter
function getCookie(name) {
  const entry = document.cookie.split("; ").find((item) => item.startsWith(`${name}=`));
  return entry ? entry.split("=")[1] : null;
}

function saveCookie(name, value) {
  const year = 60 * 60 * 24 * 365; // a year in seconds
  document.cookie = `${name}=${value}; max-age=${year}; path=/`;
}

const cookieValue = getCookie("visits");
const cookieTotal = cookieValue === null ? 1 : Number(cookieValue) + 1;

saveCookie("visits", cookieTotal)

const counterPlacement = document.getElementById("hitCounter");
const counter = counterPlacement.textContent.replace("???", cookieTotal);
counterPlacement.textContent = counter;


// Sign In Btn Listener Event
document.getElementById("signInBtn").addEventListener("click", () => {
  const signInForm = document.querySelector(".signInForm");
  signInForm.style.display = "block";
});


// Sign In Form
const isAuthorizedUser = () => {
  let allClear = true;
  const username = document.getElementById("usernameField");
  const trimmedUsnm = username.value.trim();
  const pwd = document.getElementById("pwdField");
  const trimmedPwd = pwd.value.trim();
  const notice = document.getElementById("signInNotice");


  // Validations
  if (trimmedUsnm === "") {
    notice.textContent = "Enter a username.";
    allClear = false;
    return allClear;
  } else if (trimmedPwd === "") {
    notice.textContent = "Enter a password.";
    allClear = false;
    return allClear;
  } else if (!membersInfo.memberUserNames.includes(trimmedUsnm)) {
    notice.textContent = "Username does not match records.";
    allClear = false;
    return allClear;
  }

  return allClear;
}

// Sign in form event listener
document.querySelector(".signInForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const notice = document.getElementById("signInNotice");
  notice.textContent = "";

  if (isAuthorizedUser()) {
    const rawAuthorized = document.getElementById("usernameField").value;
    const authorized = rawAuthorized.trim();
    document.cookie = `authorizedUser=${authorized}; max-age=3600; path=/`; //3600 is one hour in seconds

    notice.textContent = "Login successful!";

    const membersBtn = document.getElementById("membersBtn");
    membersBtn.style.display = "block";

    const signInBtn = document.getElementById("signInBtn");
    signInBtn.style.display = "none";
  }
});

updateCurrYear();