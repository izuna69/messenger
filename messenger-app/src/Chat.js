// src/Chat.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // 서버의 주소

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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

  return (
    <div>
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
    </div>
  );
};

export default Chat;
