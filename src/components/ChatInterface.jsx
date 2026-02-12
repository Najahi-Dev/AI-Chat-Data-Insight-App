import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMessageSquare } from 'react-icons/fi';
import { useChat } from '../context/ChatContext';
import { useData } from '../context/DataContext';
import { InlineLoader } from './Loader';
import './ChatInterface.css';

export const ChatInterface = () => {
  const [input, setInput] = useState('');
  const { messages, loading, sendMessage } = useChat();
  const { summary, parsedData } = useData();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    sendMessage(input, { summary, parsedData });
    setInput('');
  };

  if (!parsedData) {
    return null;
  }

  return (
    <motion.div
      className="chat-interface"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="chat-header">
        <FiMessageSquare className="chat-icon" />
        <h2>Ask Questions About Your Data</h2>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <FiMessageSquare className="empty-icon" />
            <p>Ask me anything about your data!</p>
            <div className="suggested-questions">
              <button onClick={() => setInput('What insights can you provide?')}>
                What insights can you provide?
              </button>
              <button onClick={() => setInput('Summarize the data')}>
                Summarize the data
              </button>
              <button onClick={() => setInput('What are the key statistics?')}>
                What are the key statistics?
              </button>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`message ${message.role}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="message-content">
                  <div className="message-avatar">
                    {message.role === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className="message-text">
                    {message.content}
                    <span className="message-time">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        
        {loading && (
          <motion.div
            className="message assistant"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="message-content">
              <div className="message-avatar">🤖</div>
              <div className="message-text">
                <InlineLoader />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your data..."
          className="chat-input"
          disabled={loading}
        />
        <motion.button
          type="submit"
          className="send-button"
          disabled={!input.trim() || loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiSend />
        </motion.button>
      </form>
    </motion.div>
  );
};
