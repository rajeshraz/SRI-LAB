import React, { useState, useRef, useEffect } from 'react';
import './stylings/chatbot.css';


const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const messageText = input.trim();
    
    if (!messageText || isLoading) return;

    setMessages(prev => [...prev, { text: messageText, isBot: false }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data.response) {
        setMessages(prev => [...prev, { text: data.response, isBot: true }]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, I couldn't process your request. Please try again.",
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='chatbotcss' style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)', background: 'white' }}>
      {/* Messages Container */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ 
            display: 'flex',
            justifyContent: msg.isBot ? 'flex-start' : 'flex-end',
            marginBottom: '20px',
            alignItems: 'flex-start'
          }}>
            {msg.isBot && (
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#6b46c1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px',
                color: 'white',
                fontSize: '12px'
              }}>
                👤
              </div>
            )}
            <div style={{
              maxWidth: '70%',
              padding: '8px 12px',
              borderRadius: '4px',
              backgroundColor: msg.isBot ? '#f0f0f0' : '#007bff',
              color: msg.isBot ? '#000' : '#fff',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {msg.text}
            </div>
            {!msg.isBot && (
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#6b46c1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '8px',
                color: 'white',
                fontSize: '12px'
              }}>
                👤
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ 
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '20px',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#6b46c1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px',
              color: 'white',
              fontSize: '12px'
            }}>
              👤
            </div>
            <div style={{
              maxWidth: '70%',
              padding: '8px 12px',
              borderRadius: '4px',
              backgroundColor: '#f0f0f0',
              color: '#000'
            }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div style={{
        borderTop: '1px solid #e5e5e5',
        padding: '20px',
        backgroundColor: 'white'
      }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none'
            }}
            disabled={isLoading}
          />
         <button
  type="submit"
  disabled={isLoading || !input.trim()}
  style={{
    padding: '8px 16px',
    backgroundColor: isLoading || !input.trim() ? '#e0e0e0' : '#0078D4',
    color: isLoading || !input.trim() ? '#9e9e9e' : '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease-in-out',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: isLoading || !input.trim() ? 'none' : '0 4px 8px rgba(0, 0, 0, 0.2)',
  }}
  onMouseEnter={(e) => {
    if (!isLoading && input.trim()) {
      e.target.style.backgroundColor = '#005a9e';
      e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
    }
  }}
  onMouseLeave={(e) => {
    if (!isLoading && input.trim()) {
      e.target.style.backgroundColor = '#0078D4';
      e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    }
  }}
  onMouseDown={(e) => {
    if (!isLoading && input.trim()) {
      e.target.style.transform = 'scale(0.98)';
    }
  }}
  onMouseUp={(e) => {
    if (!isLoading && input.trim()) {
      e.target.style.transform = 'scale(1)';
    }
  }}
>
  Send
</button>

          
          
        </form>
      </div>
    </div>
  );
};

export default Chatbot;

