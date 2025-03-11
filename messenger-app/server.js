const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 클라이언트가 연결되었을 때
io.on('connection', (socket) => {
  console.log('A user connected');

  // 메시지가 오면 처리하는 부분
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // 모든 클라이언트에게 메시지 전송
  });

  // 클라이언트가 연결을 끊었을 때
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// 서버 포트 설정
server.listen(3001, () => {
  console.log('listening on *:3001');
});
