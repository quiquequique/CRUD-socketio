/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef

const socket = io('http://localhost:3000');

const saveNote = (title, description) => {
  socket.emit('client:newnote', {
    title,
    description,
  });
};

socket.on('server:newnote', appendNote);

socket.on('server:loadnotes', renderNotes);

socket.on('server:selectednote', (note) => {
  const title = document.querySelector('#title');
  const description = document.querySelector('#description');

  title.value = note.title;
  description.value = note.description;

  savedID = note.id;
});

const deleteNote = (id) => {
  console.log(id);

  socket.emit('client:deletenote', id);
};

const getNote = (id) => {
  socket.emit('client:getnote', id);
};

const updateNote = (id, title, description) => {
  socket.emit('client:updatenote', {
    id,
    title,
    description,
  });
};
