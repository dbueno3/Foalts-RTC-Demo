import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { MessageBox } from './MessageBox';
import { MessageInput } from './MessageInput';
import { RoomSelector } from './RoomSelector';

export const App = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  
  useEffect(() => {
    const newSocket = io.connect('/');
    setSocket(newSocket);
    
    return () => {
      newSocket.disconnect();
    };
  }, [setSocket]);

  useEffect(() => {
    if (!socket) return;
    
    socket.on('/communications/send', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  const sendMessage = (message) => {
    socket.emit('/communications/send', {
        evenName:'/communivations/send',
        message: message, 
        room: currentRoom 
    });
  };

  const joinRoom = (roomName) => {
    if(socket) {
      socket.emit('/join-room', { roomName });
      setCurrentRoom(roomName);
      setMessages([]); // Clear previous room's messages
    }
  };

  return (
    <div>
      <h1>Realtime Chat</h1>
      <RoomSelector joinRoom={joinRoom} />
      <MessageBox messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};
