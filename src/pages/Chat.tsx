import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Trash2, MessageCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ReactMarkdown from 'react-markdown';

const Chat: React.FC = () => {
  const { chatMessages, addChatMessage, clearChat } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Function to get response from Gemini API
  const getGeminiResponse = async (message: string): Promise<string> => {
    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    // System instruction to guide the AI's behavior
    const systemInstruction = {
        role: "system",
        parts: [{
            text: "You are a helpful AI assistant for a healthcare platform called CareConnect. Your role is to guide users on how to use the platform (e.g., booking appointments, finding doctors) and provide general, non-diagnostic health information. You must NEVER provide a medical diagnosis or prescribe treatment. Always advise users to consult a qualified healthcare professional for any medical concerns. Keep your answers concise and helpful."
        }]
    };

    const userMessageContent = {
        role: "user",
        parts: [{ text: message }]
    };

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents: [systemInstruction, userMessageContent] }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      // Extract the text from the response
      return data.candidates[0].content.parts[0].text;

    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I apologize, but I'm having trouble connecting to my services right now. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message
    addChatMessage({
      type: 'user',
      content: userMessage,
      timestamp: new Date(),
    });

    setIsLoading(true);

    try {
      // Get response from the actual Gemini API
      const botResponse = await getGeminiResponse(userMessage);
      
      addChatMessage({
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
      });
    } catch (error) {
      addChatMessage({
        type: 'bot',
        content: 'I apologize, but I encountered an error. Please try again later.',
        timestamp: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Healthcare Assistant</h1>
          <p className="text-gray-600">Get instant help with your healthcare questions and navigate our platform</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-full">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-blue-100 text-sm">Always here to help</p>
              </div>
            </div>
            
            {chatMessages.length > 0 && (
              <button
                onClick={clearChat}
                className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
                title="Clear chat"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 && (
              <div className="text-center py-8">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start a conversation</h3>
                <p className="text-gray-600 text-sm">Ask me anything about healthcare or how to use CareConnect!</p>
              </div>
            )}

            <AnimatePresence>
              {chatMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start space-x-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                    <div className="bg-gray-200 p-2 rounded-full">
                      <Bot className="h-6 w-6 text-blue-600" />
                    </div>
                  )}

                  <div
                    className={`max-w-md rounded-lg px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {message.type === 'user' && (
                    <div className="bg-blue-600 text-white p-2 rounded-full">
                      <User className="h-6 w-6" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <LoadingSpinner size="sm" />
                    <span className="text-sm">AI is typing...</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {chatMessages.length === 0 && (
                <>
                  <button
                    onClick={() => setInputMessage("Hi! How can I book an appointment?")}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    How to book an appointment?
                  </button>
                  <button
                    onClick={() => setInputMessage("I have symptoms, can you help?")}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    I have symptoms
                  </button>
                  <button
                    onClick={() => setInputMessage("Find me a cardiologist")}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    Find a cardiologist
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;