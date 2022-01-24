/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const noteList = document.querySelector('#notes');
const noteForm = document.querySelector('#noteForm');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

// eslint-disable-next-line prefer-const
let savedID = '';

const noteUI = (note) => {
  const div = document.createElement('div');

  div.innerHTML = `
  <div class="card card-body rounded-0 mb-1">
    <div class="d-flex justify-content-between">
      <h1 class="h3 card-title">${note.title}</h1>
      <div>
        <button class="btn btn-danger delete" data-id="${note.id}">delete</button>
        <button class="btn btn-secondary update" data-id="${note.id}">update</button>
      </div>
    </div>
    <p>${note.description}</p>
  </div>
  `;

  const btnDelete = div.querySelector('.delete');
  const btnUpdate = div.querySelector('.update');

  btnDelete.addEventListener('click', () => {
    deleteNote(btnDelete.dataset.id);
  });

  btnUpdate.addEventListener('click', () => {
    getNote(btnUpdate.dataset.id);
    // updateNote(btnDelete.dataset.id);
  });

  return div;
};

const renderNotes = (notes) => {
  noteList.innerHTML = '';
  notes.forEach((note) => {
    noteList.append(noteUI(note));
  });
};

const appendNote = (note) => {
  noteList.append(noteUI(note));
};
