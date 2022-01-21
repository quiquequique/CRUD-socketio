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

socket.on('server:getnote', noteToUpdate);

const deleteNote = (id) => {
  console.log(id);

  socket.emit('client:deletenote', id);
};

const getNote = (id) => {
  socket.emit('client:getnote', id);
};

const updateNote = (id) => {
  console.log(id);

  socket.emit('client:updatenote', id);
};
