import React from 'react';

export const MessageBox = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <p key={index}>{msg.message}</p>
      ))}
    </div>
  );
};
