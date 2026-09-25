function displayContactReasons() {
  const selectedOption = document.getElementById("contactType");
  const displayComplaints = document.getElementById("complaints");
  const displayProblems = document.getElementById("techProblems");
  const displayIssues = document.getElementById("productIssues");
  
  if(selectedOption.value === "C") { //common customer complaints list
    displayComplaints.style.display = "block";
    displayProblems.style.display = "none";
    displayIssues.style.display = "none";
  } else if(selectedOption.value === "T") { //technical problems list
    displayProblems.style.display = "block";
    displayComplaints.style.display = "none";
    displayIssues.style.display = "none";

  } else if(selectedOption.value === "P") { //product issues list
    displayIssues.style.display = "block";
    displayComplaints.style.display = "none";
    displayProblems.style.display = "none";
  } else if(selectedOption.value === "") {
    displayIssues.style.display = "none";
    displayComplaints.style.display = "none";
    displayProblems.style.display = "none";
  }
}

document.getElementById("contactType").addEventListener("change", ()=> {
  displayContactReasons();
})

window.addEventListener("load", () => {
  document.getElementById("contactType").selectedIndex = 0;
})