// Global Variables
const studentTemplate = document.getElementById("studentTemplate");
const addStudentFields = document.getElementById("addStudentFields");
let rowCount = 3; // starts with however many fields there are

// criteria mentions calling a function to execute the thing

function addStudent(e) {
  e.preventDefault(); // preventing the form from being submitted right away
  const template = studentTemplate.content.cloneNode(true); // store template + children in variable
  const inputFields = template.querySelectorAll("input"); // go into stored template variable and save input fields
  const labels = template.querySelectorAll("label"); // go into stored template variable and save label fields
  rowCount++; // increment the number attached to ID
  

  inputFields[0].id = "studentName" + rowCount; // [0] is the first input field of 2, change its ID and add rowCount which gets triggered on button click
  inputFields[0].name = "studentName" + rowCount;
  inputFields[1].id = "studentID" + rowCount;
  inputFields[1].name = "studentID" + rowCount;

  labels[0].htmlFor = "studentName" + rowCount;
  labels[1].htmlFor = "studentID" + rowCount;

  addStudentFields.append(template);
}

document.getElementById("addBtn").addEventListener("click", addStudent);