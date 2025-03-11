import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // 서버의 주소

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크 모드 상태 추가

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  useEffect(() => {
    const messagesList = document.getElementById('messages');
    messagesList.scrollTop = messagesList.scrollHeight;
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('chat message', newMessage);
      setNewMessage('');
    }
  };

  // 다크 모드와 라이트 모드 클래스를 body에 적용
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`chat-container ${isDarkMode ? 'dark' : ''}`}>
      <h1>React Chat App</h1>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="메시지를 입력하세요"
      />
      <button onClick={handleSendMessage}>Send</button>

      {/* 다크 모드 토글 버튼 */}
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
};

export default Chat;
