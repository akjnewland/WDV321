const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");

const renderNotes = () => {
  let existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

  const notesOutput = document.getElementById("notes");
  notesOutput.innerHTML = "";

  existingNotes.forEach((note) => {
    const p = document.createElement("p");
    p.textContent = note.noteText;

    const button = document.createElement("button");
    button.textContent = "Delete";
    button.dataset.id = note.id;
    button.addEventListener("click", (e) => {
      console.log(existingNotes);
      const filteredNotes = existingNotes.filter(note => note.id != e.currentTarget.dataset.id); //example of shortened syntax for a return function with only one parameter
      localStorage.setItem("notes", JSON.stringify(filteredNotes));
      renderNotes();
    });

    p.appendChild(button);


    notesOutput.appendChild(p);
  });
}

renderNotes();

addNoteBtn.addEventListener("click", () => {
  const noteText = noteInput.value;
  let existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

  existingNotes.push({
    id: Date.now(),
    noteText: noteText
  });

  localStorage.setItem("notes", JSON.stringify(existingNotes));

  noteInput.value = "";
  noteInput.focus();

  renderNotes();
});