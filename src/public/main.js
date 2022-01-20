// eslint-disable-next-line no-undef
const socket = io('http://localhost:3000');

socket.on('ping', () => {
  console.log('listened');

  socket.emit('returnedPing');
});

const noteForm = document.querySelector('#noteForm');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const notes = document.querySelector('#notes');

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('client:newnote', {
    title: title.value,
    description: description.value,
  });
});

socket.on('server:newnote', (data) => {
  console.log(data);

  notes.innerHTML += 'new note';
});
