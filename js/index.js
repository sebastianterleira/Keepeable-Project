let notesArray = [
  {title: "first noteeeeeeeeee", body:"This is the body for the note.", color: "white"},
  {title: "This is the title", body:"This is the body for the note.", color: "orange"},
  {title: "This is the title", body:"This is the body for the note.", color: "pink"},
  {title: "This is the title", body:"This is the body for the note.", color: "green"},
  {title: "This is the title", body:"This is the body for the note.", color: "red"}
];

let trashArray = [
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
    
    notes == trashArray ? li.innerHTML = liTemplateTrash : li.innerHTML = liTemplate;
    
    ul.append(li);
    
    document.querySelector(`#deleteIcon${i}`).addEventListener("click", () => {
      notes == trashArray ? deleteNote(i) : toTrashNote(i);
    });
    
     if (notes == trashArray) {
      document.querySelector(`#restoreIcon${i}`).addEventListener("click", () => {
        restoreNote(i);
      });
    } else {
      document.querySelector(`#choseColor${i}`).style.position = "relative";
      document.querySelector(`#choseColor${i}`).addEventListener("click", (event) => {

        console.log(event);
        console.log(event.pageX);
        console.log(event.pageY);
        // console.log("diste click linea  72  inside event listener ");
        // let rect = event.target.getBoundingClientRect();
        let x = event.pageX; //x position within the element.
        let y = event.pageY;
        modal.style.top = `${(y - 375)}px`;
        modal.style.left = `${x - 670}px`;
        // modal.style.top = `${event.screenX}px`;
        // modal.style.right = `${event.screenY}px`;
        modal.className = "modal-container__open";
      });
    }
  }
}

// atrapando mi Modal:
const modal = document.querySelector("#modal");

// atrapando mi Form:
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let choseColor =  document.querySelector(`#choseColor`)
choseColor.addEventListener("click", () => {
  console.log("si esta dando click.");
  modal.style.bottom = "50px";
  modal.style.right = "465px";
  modal.className = "modal-container__open";
});

function handleSubmit(event) {
  event.preventDefault()
  const data = event.target.elements;
  const newNote = {
    title: data.title.value,
    body:  data.note.value,
    color: data.color.value,
  };

  if (notesFromStorage) {
    notesArray = JSON.parse(localStorage.getItem("notes"));
  }
  notesArray.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notesArray));

  console.log(event)
  renderNotes(note);
  event.target.reset();
}

function toTrashNote(i) {
  let noteToTrash = notesArray[i];

  if (trashFromStorage) {
    trashArray = JSON.parse(localStorage.getItem("trash"));
  }
  trashArray.push(noteToTrash);
  localStorage.setItem("trash", JSON.stringify(trashArray))

  if (notesFromStorage) {
    notesArray = JSON.parse(localStorage.getItem("notes"));
  }
  notesArray.splice(i, 1);
  localStorage.setItem("notes", JSON.stringify(notesArray))

  renderNotes(note);
}

function deleteNote(i) {
  if (trashFromStorage) {
    trashArray = JSON.parse(localStorage.getItem("trash"));
  }
  trashArray.splice(i, 1);
  renderNotes(trash);
}

function restoreNote(i) {
  let noteToIndex = trashArray[i];
  if (notesFromStorage) {
    notesArray = JSON.parse(localStorage.getItem("notes"));
  }
  notesArray.push(noteToIndex);
  if (trashFromStorage) {
    trashArray = JSON.parse(localStorage.getItem("trash"));
  }
  trashArray.splice(i, 1);
  renderNotes(trash);
}

const trashOption = document.querySelector("#trash");
trashOption.addEventListener("click", () => {
  trashOption.className = "clicked";
  notesOption.className = "";
  form.innerHTML = "";
  form.className = "";
  if (trashFromStorage) {
    trashArray = JSON.parse(localStorage.getItem("trash"));
  };
  renderNotes(trash);
});

const notesOption = document.querySelector("#notesOption");
notesOption.addEventListener("click", () => {
  notesOption.className = "clicked";
  trashOption.className = "";
  form.className = "new-note";
  form.innerHTML = `
  <input type="text" id="title" name="title" placeholder="The title for my new note"><br><br>
  <textarea id="note" name="note" rows="4" cols="50" placeholder="This is the body for the note."></textarea>
  <div class="flex-row jc__space-between" style="position: relative;">
    <!-- modaaaaaaaaaaaaaal -->
    <div id="modal" class="modal-container" style="background-color: white; width: 155px; height: 65px;">
      <input type="radio" id="color" name="color" value="#b6b6b6">
      <input type="radio" id="color" name="color" value="#F28B82">
      <input type="radio" id="color" name="color" value="#FBBC04">
      <input type="radio" id="color" name="color"  value="#FFF475">
      <input type="radio" id="color" name="color" value="#CCFF90">
      <input type="radio" id="color" name="color" value="#A7FFEB">
      <input type="radio" id="color" name="color" value="#CBF0F8">
      <input type="radio" id="color" name="color" value="#AECBFA">
      <input type="radio" id="color" name="color" value="#D7AEFB">
      <input type="radio" id="color" name="color" value="#FDCFE8">
      <input type="radio" id="color" name="color" value="#ffffff" checked hidden>
    </div>
    <!-- fin del modal -->
    <a href="#" id="choseColor">
      <img class="svg-custom button-circular" src="./css/imagen/icon-paleteishon.svg" alt="">
    </a>
    <input class="border-color-white" type="submit" value="Keep it!">
  </div>
  </div>
  `;

  // atrapando mi Modal:
  const modal = document.querySelector("#modal");
  const choseColor =  document.querySelector(`#choseColor`)
  choseColor.addEventListener("click", () => {
  modal.style.bottom = "50px";
  modal.style.right = "465px";
  modal.className = "modal-container__open";
});

  if (notesFromStorage) {
    notesArray = JSON.parse(localStorage.getItem("notes"));
  }
  renderNotes(note);
});

const notesFromStorage = JSON.parse(localStorage.getItem("notes"));
const trashFromStorage = JSON.parse(localStorage.getItem("trash"));

const note = notesFromStorage || notesArray;
const trash = trashFromStorage || trashArray;

renderNotes(note);
