const noteList = document.querySelector('#notes');

const appendNote = (note) => {
  noteList.innerHTML += `
  <div class="card card-body rounded-0 mb-1">
    <div class="d-flex justify-content-between">
      <h1 class="h3 card-title">${note.title}</h1>
      <div>
        <button class="btn btn-danger">delete</button>
        <button class="btn btn-secondary">update</button>
      </div>
    </div>
    <p>${note.description}</p>
  </div>
  `;
};
