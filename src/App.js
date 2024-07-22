// src/App.js
import React, { useState } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import SidePanel from './components/SidePanel';

function App() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);

  const handleSendMessage = (userMessage) => {
    const newMessage = { user: userMessage, bot: 'response.' };
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    if (newMessages.length > 3) {
      setHistory([...history, newMessages.shift()]);
      setMessages(newMessages);
    }
  };

  return (
    <div className="App">
      <div className="side-panel">
        <SidePanel history={history} />
      </div>
      <div className="main-panel">
        <Welcome />
        <InputBox onSendMessage={handleSendMessage} />
        <OutputBox messages={messages} />
      </div>
    </div>
  );
}

export default App;
