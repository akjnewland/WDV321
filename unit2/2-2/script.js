document.getElementById("foodType").addEventListener("change", (event) => {
  const itemSelected = event.currentTarget.value;

  document.getElementById("appetizers").style.display = "none";
  document.getElementById("main").style.display = "none";
  document.getElementById("desserts").style.display = "none";

  if(itemSelected === "appetizers") {
    document.getElementById("appetizers").style.display = "block";
  } else if(itemSelected === "main") {
    document.getElementById("main").style.display = "block";
  } else if(itemSelected === "desserts")
    document.getElementById("desserts").style.display = "block";
});

