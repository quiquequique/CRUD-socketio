socket.on('ping', () => {
  console.log('listened');

  socket.emit('returnedPing');
});

const noteForm = document.querySelector('#noteForm');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  saveNote(title.value, description.value);
});
