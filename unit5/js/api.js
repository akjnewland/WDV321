export async function fetchData(searchTerm) {

  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}&limit=20`);

    if (!response.ok) {
      throw new Error("Failed to retrieve data.");
    }

    const data = await response.json();
    return data;
  } catch(error) {
    throw new Error("Unable to reach server. Please try again at a later time.");
  }
}

