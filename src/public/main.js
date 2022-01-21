/* eslint-disable no-undef */
socket.on('ping', () => {
  console.log('listened');

  socket.emit('returnedPing');
});

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  saveNote(title.value, description.value);
});
