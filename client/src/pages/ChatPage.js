import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import MessageBubble from '../components/MessageBubble';
import Navbar from '../components/Navbar';

const socket = io('http://localhost:5000'); // your backend port

const ChatPage = () => {
  const { receiverId } = useParams(); // URL: /chat/:receiverId
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const userId = localStorage.getItem('userId') || 'user123'; // your logged-in user ID
  const token = localStorage.getItem('token');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Join room and load history
  useEffect(() => {
    socket.emit('joinRoom', { senderId: userId, receiverId });

    const fetchHistory = async () => {
      try {
        const { data } = await axios.get(`/api/chat/${receiverId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(data);
      } catch (error) {
        console.log('No chat history found, starting fresh conversation');
        setMessages([]);
      }
    };

    fetchHistory();
  }, [receiverId, userId, token]);

  // Listen for real-time messages
  useEffect(() => {
    socket.on('receiveMessage', (newMsg) => {
      setMessages(prev => [...prev, newMsg]);
    });

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMessage = {
      senderId: userId,
      receiverId,
      message: text,
      createdAt: new Date()
    };

    // Emit to Socket.IO
    socket.emit('sendMessage', newMessage);

    // Optional: save to DB
    try {
      axios.post('/api/chat', {
        receiverId,
        message: text
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.log('Message sent via socket, but not saved to DB');
    }

    setMessages(prev => [...prev, newMessage]);
    setText('');
    inputRef.current?.focus();
  };

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {receiverId.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Chat with Provider</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>{isConnected ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start a conversation</h3>
                <p className="text-gray-600">Send a message to begin chatting with the service provider.</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div ref={idx === messages.length - 1 ? scrollRef : null} key={idx}>
                  <MessageBubble message={msg} isSender={msg.senderId === userId} />
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>Provider is typing...</span>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-100">
            <form onSubmit={handleSend} className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  className="input-field resize-none h-12 max-h-32"
                  placeholder="Type your message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows="1"
                />
              </div>
              <button
                type="submit"
                disabled={!text.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed h-12 px-6"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
