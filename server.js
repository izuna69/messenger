const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // 변경: 외부 접속 가능
    methods: ["GET", "POST"]
  }
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('✅ 사용자가 연결됨');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('❌ 사용자가 나감');
  });
});

const PORT = process.env.PORT || 3001; // Render에서 PORT 자동 할당
server.listen(PORT, () => {
  console.log(`🚀 서버가 ${PORT}번 포트에서 실행 중...`);
});
