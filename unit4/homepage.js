//Instructions:
//1. Create a JavaScript object called eventRegistration.  This object will hold one or more registrations
//  each registration will have a name, email, phone and registration date (use the current date)
//
//2. Create a hit counter that will record each time somebody comes to this page.  Store the hit counter in a cookie.
//  Each time somebody comes to this page display the current value of the hit counter next to "Current Activity:"

//Sign In button:
//When the sign in form is clicked the following will happen
//  a. Somewhere on the page display a form to accept the username and password.  Use one of methods we reviewed
//      to dynamically display the form when needed.
//  b. When that form is submitted compare the input to the contents of the membersInfo object.
//  c. If you find a match in the membersInfo object create a cookie called authorizedUser with the username as its value.

let membersInfo = {
  memberUserNames: [
    "A1D2C4",
    "B2D4C6",
    "B3C2D1"
  ]
}

const date = new Date();

const eventRegistration = {
  name: "",
  email: "",
  phone: "",
  registration: date
};

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

// Special Chars Functions
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

// The Big Validation Function
const isValid = () => {
  const name = document.getElementById("name");
  const trimmedName = name.value.trim();
  const div1 = document.getElementById("notice1");
  const div2 = document.getElementById("notice2");
  const div3 = document.getElementById("notice3");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const email = document.getElementById("email");
  const phoneNumber = document.getElementById("phone");
  const trimmedTel = phoneNumber.value.trim();

  div1.innerHTML = "";
  div2.innerHTML = "";
  div3.innerHTML = "";


  if (trimmedName === "") {
    p1.textContent = "Please enter your full name";
    div1.append(p1);
  } else if (trimmedName.length > 50) {
    p1.textContent = "Character limit cannot exceed 50.";
    div1.append(p1);
  } else if (trimmedName.length < 2) {
    p1.textContent = "Name must be more than 1 character.";
    div1.append(p1);
  } else if (isSpecialChars(trimmedName)) {
    p1.textContent = "Name contains an invalid character.";
    div1.append(p1);
  }

  if (email.value === "") {
    p2.textContent = "Please enter an email address.";
    div2.append(p2);
  } else if (!isEmailValid(email.value)) {
    p2.textContent = "Invalid email.";
    div2.append(p2);
  }

  if (trimmedTel === "") {
    p3.textContent = "Please enter a telephone number.";
    div3.append(p3);
  } else if (!isPhoneValid(trimmedTel)) {
    p3.textContent = "Invalid phone number. Enter 10 digits with no dashes or spaces.";
    div3.append(p3);
  }

  return true;
};

// Honeypot
const honeypot = document.querySelectorAll(".text-field");
honeypot.forEach((field) => {
  field.style.display = "none";
});

const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("signup button click");
});