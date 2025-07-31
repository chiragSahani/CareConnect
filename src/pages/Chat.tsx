import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Trash2, MessageCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Chat: React.FC = () => {
  const { chatMessages, addChatMessage, clearChat } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

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
      // Simulate API call to Gemini (replace with actual API call)
      const botResponse = await simulateGeminiResponse(userMessage);
      
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

  // Simulate Gemini API response (replace with actual Gemini API integration)
  const simulateGeminiResponse = async (message: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    const responses = {
      greeting: [
        "Hello! I'm your AI healthcare assistant. How can I help you today?",
        "Hi there! I'm here to assist you with your healthcare questions and help you navigate our platform.",
      ],
      symptoms: [
        "I understand you're experiencing some symptoms. While I can provide general information, it's important to consult with a qualified healthcare professional for proper diagnosis and treatment. Would you like me to help you find a suitable doctor?",
        "Thank you for sharing your symptoms. For your safety, I recommend scheduling an appointment with one of our qualified doctors for a proper evaluation. I can help you find the right specialist.",
      ],
      booking: [
        "I'd be happy to help you book an appointment! You can browse our available doctors by specialty, check their availability, and book directly through our platform. Would you like me to guide you to our doctor directory?",
        "Booking an appointment is easy! Simply visit our 'Find Doctors' section, select your preferred specialist, and choose from their available time slots. Is there a particular specialty you're looking for?",
      ],
      general: [
        "That's a great question! While I can provide general health information, I always recommend consulting with our qualified healthcare professionals for personalized advice. Is there anything specific I can help you with regarding our platform?",
        "I'm here to help! For medical advice, please consult with one of our doctors. For questions about using our platform, booking appointments, or finding the right specialist, I'm at your service.",
      ],
    };

    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    } else if (lowerMessage.includes('symptom') || lowerMessage.includes('pain') || lowerMessage.includes('hurt') || lowerMessage.includes('sick')) {
      return responses.symptoms[Math.floor(Math.random() * responses.symptoms.length)];
    } else if (lowerMessage.includes('appointment') || lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
      return responses.booking[Math.floor(Math.random() * responses.booking.length)];
    } else {
      return responses.general[Math.floor(Math.random() * responses.general.length)];
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && (
                        <Bot className="h-4 w-4 mt-1 text-blue-600" />
                      )}
                      {message.type === 'user' && (
                        <User className="h-4 w-4 mt-1 text-blue-200" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
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