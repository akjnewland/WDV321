export async function fetchData(searchTerm) {
  // Fetch data using the Fetch API, use the input value to search by product name
  // Be sure to handle errors
  //   This does not mean updating the UI with error messages
  //   Instead, throw() an error that can be captured in the calling code
  // Return the data to the calling function as a JSON object

  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);

    if (!response.ok) {
      throw new Error("Failed to catch data.");
    }

    const data = await response.json();
    return data;
  } catch(error) {
    throw error;
  }
}
