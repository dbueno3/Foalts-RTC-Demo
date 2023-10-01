import React, { useState } from 'react';

export const RoomSelector = ({ joinRoom }) => {
  const [roomName, setRoomName] = useState('');

  const handleJoinRoom = () => {
    joinRoom(roomName);
    setRoomName('');
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Room name" 
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};
