const notes = [
  {title: "This is the title", body:"This is the body for the note.", color: "white"},
  {title: "This is the title", body:"This is the body for the note.", color: "green"},
  {title: "This is the title", body:"This is the body for the note.", color: "red"},
  {title: "This is the title", body:"This is the body for the note.", color: "green"},
  {title: "This is the title", body:"This is the body for the note.", color: "red"}
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
      <figure id="choseColor${i}">
        <img  class="svg-custom button-circular" src="./css/imagen/icon-paleteishon.svg" alt="">
      </figure>
      <figure id="deleteIcon${i}">
        <img class="svg-custom button-circular" src="./css/imagen/icon-trash.svg" alt="">
      </figure>
      <figure>
        <img class="svg-custom button-circular" src="./css/imagen/icon-restored.svg" alt="">
      </figure>
    </div>
    `
    
    li.innerHTML = liTemplate;
    ul.append(li);
    
    document.querySelector(`#choseColor${i}`).addEventListener("click", () => {
      console.log("aqui estoy");
    });
    
    document.querySelector(`#deleteIcon${i}`).addEventListener("click", () => {
      deleteNote(i);
    });
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
event.preventDefault()
const data = event.target.elements;
const newNote = {
  title: data.title.value,
  body:   data.note.value,
  color: data.color.value,
};
notes.push(newNote);
event.target.reset();
renderNotes(notes);
}

renderNotes(notes);

function deleteNote(i) {
  notes.splice(i, 1);
  renderNotes(notes);
}