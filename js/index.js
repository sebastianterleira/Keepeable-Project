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

  for (note of notes) {
    const li = document.createElement("li");
    li.classList.add(note.color, "flex-column");
  
    const liTemplate = `
    <h1 class="text-sm bold">${note.title}</h1>
    <p class="line-height-1.25">${note.body}</p>
  
    <div class="flex-row align-item__end">
      <figure>
        <img id="choseColor" class="svg-custom button-circular" src="./css/imagen/icon-paleteishon.svg" alt="">
      </figure>
      <figure>
        <img class="svg-custom button-circular" src="./css/imagen/icon-trash.svg" alt="">
      </figure>
      <figure>
        <img class="svg-custom button-circular" src="./css/imagen/icon-restored.svg" alt="">
      </figure>
    </div>
    `
  
    li.innerHTML = liTemplate;
    ul.append(li);
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    createNewNote(event.target.elements);
  });

  const choseColor = document.querySelector("choseColor");
  choseColor.addEventListener("click", (event) => {
    event.preventDefault();
    createNewNote(event.target.elements);
  });
}

renderNotes(notes);

function createNewNote(data) {
  console.log(data);
  newNote = {
    title: data.title.value,
    body: data.note.value,
    color: "white",
  }

  notes.push(newNote);
  renderNotes(notes);
}