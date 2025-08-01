import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Trash2, MessageCircle } from 'lucide-react';

// This is a mock context for standalone use.
// In your actual app, you would import this from your context file.
const useApp = () => {
  const [chatMessages, setChatMessages] = useState([]);

  const addChatMessage = (message) => {
    setChatMessages(prev => [...prev, { ...message, id: Date.now() + Math.random() }]);
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  return { chatMessages, addChatMessage, clearChat };
};


// A simple component to render basic markdown (bold and lists)
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-2">
          {listItems.map((item, i) => {
            const parts = item.split(/\*\*(.*?)\*\*/g);
            return (
              <li key={i}>
                {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
              </li>
            );
          })}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    if (line.trim().startsWith('* ')) {
      listItems.push(line.trim().substring(2));
    } else {
      flushList();
      if (line.trim()) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        elements.push(
          <p key={index}>
            {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
          </p>
        );
      }
    }
  });

  flushList(); // Add any remaining list items

  return <>{elements}</>;
};


const App: React.FC = () => {
  const { chatMessages, addChatMessage, clearChat } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Function to get response from the serverless function, now accepting history
  const getGeminiResponse = async (message: string, currentChatHistory: any[]): Promise<string> => {
    try {
      const response = await fetch('/.netlify/functions/get-gemini-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send both the new message and the entire history
        body: JSON.stringify({ message, history: currentChatHistory }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Serverless function error:", error);
      return "I apologize, but I'm having trouble connecting to my services right now. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add the new user message to the UI immediately
    addChatMessage({
      type: 'user',
      content: userMessage,
      timestamp: new Date(),
    });

    setIsLoading(true);

    try {
      // Pass the user's message AND the previous history to the API function
      const botResponse = await getGeminiResponse(userMessage, chatMessages);
      
      addChatMessage({
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error during message handling:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-8 font-sans">
      <div className="w-full max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-white text-gray-800 p-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-full text-white">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">CareConnect AI</h3>
                <p className="text-gray-500 text-sm">Online and ready to help</p>
              </div>
            </div>
            
            {chatMessages.length > 0 && (
              <button
                onClick={clearChat}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
                title="Clear chat"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-white">
            {chatMessages.length === 0 && (
              <div className="text-center py-8 h-full flex flex-col justify-center items-center">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Start a Conversation</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">Ask me how to book an appointment, find your records, and more!</p>
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
                  className={`flex items-end gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                     <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white">
                        <Bot className="h-6 w-6" />
                     </div>
                  )}
                  <div className={`max-w-md px-4 py-3 rounded-2xl text-sm ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    {message.type === 'bot' ? (
                      <MarkdownRenderer content={message.content} />
                    ) : (
                      <p style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
                    )}
                  </div>
                   {message.type === 'user' && (
                     <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-gray-600" />
                     </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-end gap-3 justify-start"
              >
                 <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white">
                    <Bot className="h-6 w-6" />
                 </div>
                <div className="bg-gray-100 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
	                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
	                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
             <div className="mt-2 flex flex-wrap gap-2 justify-center">
              {chatMessages.length === 0 && (
                <>
                  <button
                    onClick={() => setInputMessage("How do I start a video consultation?")}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    Start a video call?
                  </button>
                  <button
                    onClick={() => setInputMessage("Where are my lab reports?")}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    Find my lab reports
                  </button>
                  <button
                    onClick={() => setInputMessage("I have a headache, what should I do?")}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    I have a headache
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center space-x-3 mt-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-lg hover:shadow-xl"
                title="Send Message"
              >
                <Send className="h-6 w-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// In a real application, you would export 'Chat' and use it within your App's context provider.
// For this standalone example, we export a default component that can be rendered directly.
export default App;
