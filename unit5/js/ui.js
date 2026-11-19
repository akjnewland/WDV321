// This file will include the following functions:
//   1. Show Loading Status (example provided)
//   2. Show Error Messages
//   3. Clear the Loading Status
//   4. Render the fetched data results

export function showLoading() {
  const status = document.getElementById('status');
  status.textContent = 'Loading...';
  status.className = 'loading';
}

export function clearLoading() {
  const status = document.getElementById('status');
  status.textContent = "";
  status.className = 'cleared';
}

export function showError(message) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.className = "error";
}

function createTag(tag, text) {
  const label = document.createElement(tag);
  label.textContent = text;
  return label;
}

export function renderResults(productList) {
  const results = document.getElementById("results");
  results.textContent = "";

  if (productList.products.length > 0) {
    productList.products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product-card";

      div.append(
        createTag("h2", product.title),
        createTag("h3", "Product ID: "),
        createTag("p", product.id),
        createTag("h3", "Description"),
        createTag("p", product.description),
        createTag("h3", "Price"),
        createTag("p", product.price),
        createTag("h3", "Rating"),
        createTag("p", product.rating),
        createTag("h3", "Tags"),
        createTag("p", product.tags)
      )

      results.append(div);
    })
  } else {
    results.textContent = "Product not found.";
  }

}