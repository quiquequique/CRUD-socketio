import express from 'express';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import { v4 as uuid } from 'uuid';

// eslint-disable-next-line prefer-const
let notes = [];

const app = express();
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);

app.use(express.static(`${__dirname}/public`));

io.on('connection', (socket) => {
  console.log('new connection: ', socket.id);

  socket.emit('ping');

  socket.on('returnedPing', () => {
    console.log('devolvio el ping: ', socket.id);
  });

  socket.emit('server:loadnotes', notes);

  socket.on('client:newnote', (newNote) => {
    const note = ({ ...newNote, id: uuid() });

    notes.push(note);

    // console.log(notes);

    io.emit('server:newnote', note);
  });

  socket.on('client:deletenote', (id) => {
    // console.log(id);
    notes = notes.filter((note) => note.id !== id);
    io.emit('server:loadnotes', notes);
  });

  socket.on('client:getnote', (id) => {
    console.log(id);
    const returnedNote = notes.find((note) => note.id === id);
    socket.emit('server:selectednote', returnedNote);
  });

  socket.on('client:updatenote', (updatedNote) => {
    // console.log(recivedNote);
    notes = notes.map((note) => {
      if (note.id === updatedNote.id) {
        // eslint-disable-next-line no-param-reassign
        note.title = updatedNote.title;
        // eslint-disable-next-line no-param-reassign
        note.description = updatedNote.description;
      }
      return note;
    });
    io.emit('server:loadnotes', notes);
  });
});

httpServer.listen(3000);

console.log('Server on port ', 3000);
