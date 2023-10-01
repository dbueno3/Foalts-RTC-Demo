import React, { useState } from 'react';

export const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    sendMessage(message);
    setMessage('');
  };

  return (
    <div>
      <input 
        type="text" 
        value={message}
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
