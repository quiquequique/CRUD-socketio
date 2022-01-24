/* eslint-disable no-undef */
socket.on('ping', () => {
  console.log('listened');

  socket.emit('returnedPing');
});

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (savedID) {
    updateNote(savedID, title.value, description.value);
  } else {
    saveNote(title.value, description.value);
  }

  title.value = '';
  description.value = '';

  title.focus();
});
