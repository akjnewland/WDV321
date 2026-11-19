//add additional imports here (functions from ui.js)
import { fetchData } from "./api.js";
import { showError, showLoading, clearLoading, renderResults } from "./ui.js";

// Create a click event handler on the "Search" button to fetch the data.
// This will NOT call the Fetch API directly, instead it will call a function defined in api.js
// Overview of what the click handler will need to do (this will be a series of function calls):


document.getElementById("search-button").addEventListener("click", async () => {
  //   - Show a loading status
  showLoading();

  const userInput = document.getElementById("name").value;

  try {
    //   - Fetch the data
    const results = await fetchData(userInput);
    console.log(results);
    //   - Clear the loading status
    clearLoading();
    //   - Render results
    renderResults(results);
  } catch (error) {
    //   - Include Error handling - i.e. try/catch errors
    console.log(error);
    showError(error.message);
  }
})