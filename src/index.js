import express from 'express';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import { v4 as uuid } from 'uuid';

const notes = [];

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

  socket.on('client:newnote', (newNote) => {
    const note = ({ ...newNote, id: uuid() });

    notes.push(note);

    socket.emit('server:newnote', note);
  });
});

httpServer.listen(3000);

console.log('Server on port ', 3000);
