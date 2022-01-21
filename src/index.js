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

    socket.emit('server:newnote', note);
  });

  socket.on('client:deletenote', (id) => {
    // console.log(id);
    notes = notes.filter((note) => note.id !== id);
    socket.emit('server:loadnotes', notes);
  });

  socket.on('client:getnote', (id) => {
    // console.log(id);
    const returnedNote = notes.filter((note) => note.id === id)[0];
    socket.emit('server:getnote', returnedNote);
  });

  socket.on('client:updatenote', (id) => {
    console.log(id);
    // notes = notes.filter((note) => note.id !== id);
    socket.emit('server:loadnotes', notes);
  });
});

httpServer.listen(3000);

console.log('Server on port ', 3000);
