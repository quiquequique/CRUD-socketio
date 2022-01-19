import express from 'express';
import { Server as SocketServer } from 'socket.io';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);

app.use(express.static(`${__dirname}/public`));

io.on('connection', (socket) => {
  console.log('new connection: ', socket.id);
});

httpServer.listen(3000);

console.log('Server on port ', 3000);
