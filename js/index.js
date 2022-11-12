const notes = [
  {title: "first noteeeeeeeeee", body:"This is the body for the note.", color: "white"},
  {title: "This is the title", body:"This is the body for the note.", color: "orange"},
  {title: "This is the title", body:"This is the body for the note.", color: "pink"},
  {title: "This is the title", body:"This is the body for the note.", color: "green"},
  {title: "This is the title", body:"This is the body for the note.", color: "red"}
];

const trashNotes = [
  {title: "This is the trash note", body:"This is the body for the note.", color: "blue"},
  {title: "This is the trash note", body:"This is the body for the note.", color: "skyblue"}
];

function renderNotes(notes) {
  const ul = document.querySelector("ul");

  ul.innerHTML = "";
  
  for (let i = 0; i < notes.length; i++) {
    const li = document.createElement("li");
    li.classList.add("flex-column");
    li.setAttribute("style", `background-color: ${notes[i].color}`)
  
    const liTemplate = `
    <h1 class="text-sm bold">${notes[i].title}</h1>
    <p class="line-height-1.25">${notes[i].body}</p>
  
    <div class="flex-row align-item__end">
      <a href="#" id="choseColor${i}">
        <img  class="svg-custom button-circular" src="./css/imagen/icon-paleteishon.svg" alt="">
      </a>
      <a href="#" id="deleteIcon${i}">
        <img class="svg-custom button-circular" src="./css/imagen/icon-trash.svg" alt="">
      </a>
    </div>
    `
    
    const liTemplateTrash = `
    <h1 class="text-sm bold">${notes[i].title}</h1>
    <p class="line-height-1.25">${notes[i].body}</p>
  
    <div class="flex-row align-item__end">

      <a href="#" id="deleteIcon${i}">
        <img class="svg-custom button-circular" src="./css/imagen/icon-trash.svg" alt="">
      </a>
      <a href="#" id="restoreIcon${i}">
        <img  class="svg-custom button-circular" src="./css/imagen/icon-restored.svg" alt="">
      </a>
    </div>
    `
    
    notes == trashNotes ? li.innerHTML = liTemplateTrash : li.innerHTML = liTemplate;
    
    ul.append(li);
    
    document.querySelector(`#deleteIcon${i}`).addEventListener("click", () => {
      notes == trashNotes ? deleteNote(i) : toTrashNote(i);
    });
    
     if (notes == trashNotes) {
      document.querySelector(`#restoreIcon${i}`).addEventListener("click", () => {
        restoreNote(i);
      });
    } else {
      document.querySelector(`#choseColor${i}`).addEventListener("click", () => {
        console.log("diste click");
      });
    }
  }

  const choseColor =  document.querySelector(`#choseColor`)
  choseColor.addEventListener("click", () => {
    console.log("si esta dando click.");
    // choseColor.className("choseColor__close");
  });
  
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
event.preventDefault()
const data = event.target.elements;
const newNote = {
  title: data.title.value,
  body:  data.note.value,
  color: data.color.value,
};
notes.push(newNote);
event.target.reset();
renderNotes(notes);
}

function toTrashNote(i) {
  let noteToTrash = notes[i];
  trashNotes.push(noteToTrash);
  notes.splice(i, 1);
  renderNotes(notes);
}

function deleteNote(i) {
  trashNotes.splice(i, 1);
  renderNotes(trashNotes);
}

function restoreNote(i) {
  let noteToIndex = trashNotes[i];
  notes.push(noteToIndex);
  trashNotes.splice(i, 1);
  renderNotes(trashNotes);
}

const trash = document.querySelector("#trash");
trash.addEventListener("click", () => {
  renderNotes(trashNotes);
});

const notesOption = document.querySelector("#notesOption");
notesOption.addEventListener("click", () => {
  renderNotes(notes);
});

renderNotes(notes);
