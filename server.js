const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// 👉 React의 build 폴더를 정적 파일로 제공
app.use(express.static(path.join(__dirname, 'messenger-app/build')));

// 👉 React 앱을 위한 기본 라우트 설정
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'messenger-app/build', 'index.html'));
});

// ✅ Socket.io 설정
io.on('connection', (socket) => {
  console.log('✅ 사용자가 연결됨');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('❌ 사용자가 나감');
  });
}); 

// 🚀 서버 실행
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 서버가 ${PORT}번 포트에서 실행 중...`);
});
