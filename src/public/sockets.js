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

const deleteNote = (id) => {
  console.log(id);

  socket.emit('client:deletenote', id);
};
