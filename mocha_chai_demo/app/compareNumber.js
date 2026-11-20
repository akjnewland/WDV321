const compareNumbers = (x, y) => {

  
  if (/[a-zA-Z/]/.test(x)) {
    return "Please enter a number in Value 1.";
  }

  if (!Number.isInteger(x)) {
    return "Please enter a number in Value 1."
  }

  if (!Number.isInteger(y)) {
    return "Please enter a number in Value 2."
  }

  if (x === y) {
    return "The amounts are equal.";
  }

  return (x > y) ? x : y;
}

module.exports = { compareNumbers }