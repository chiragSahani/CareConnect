import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Trash2, MessageCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

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
    // The API key is left as an empty string. The execution environment
    // will automatically provide the key for the API call for security.
    const apiKey = "AIzaSyAi7Z8tvvIykNt0BtjHb10kh-pm_mlXKJk";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // This detailed system prompt gives the AI its personality, knowledge base, and strict rules.
    const chatHistory = [
      {
        role: "user",
        parts: [{
          text: `You are 'CareConnect AI', a friendly and professional AI assistant for the CareConnect healthcare platform. Your primary role is to help users navigate the app and understand its features.

**Core Features of CareConnect:**
* **Find & Book Doctors:** Users can search for doctors by specialty, location, and availability, and book appointments instantly.
* **Video Consultations:** Users can have secure video calls with doctors from the comfort of their home.
* **Medical Records:** Users can access their prescriptions, lab reports, and consultation notes in one place.
* **Pharmacy:** Users can order medicines from their prescriptions through our partner pharmacies.
* **Customer Support:** You can guide users on how to contact our support team for any technical or billing issues.

**Your Responsibilities:**
* **Guide Users:** Clearly explain how to use the features mentioned above. Use markdown for lists and bold text to improve readability.
* **Provide Information:** Answer general questions about the consultation process (e.g., "How do I start my video call?", "Where can I find my prescription?").
* **Maintain a Professional Tone:** Your responses must be empathetic, clear, patient, and professional. Use proper grammar and formatting (like lists) to make information easy to understand.
* **ABSOLUTE SAFETY RULE:** You must **NEVER** provide any medical advice, diagnosis, interpretation of symptoms, or treatment recommendations. If a user asks for medical help (e.g., "I have a headache, what should I do?"), you MUST immediately and politely decline and advise them to consult with a qualified doctor on our platform.

Your goal is to be a helpful and trustworthy guide to the CareConnect app.`
        }]
      },
      {
        role: "model",
        parts: [{
          text: "Understood. I am CareConnect AI. I will help users by explaining the app's features like booking appointments, video consultations, and managing records. I will maintain a professional and empathetic tone, using markdown for clarity. I will **never** provide medical advice and will always direct users to a qualified doctor for any medical concerns."
        }]
      },
      // The current user message is added here
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    const payload = { contents: chatHistory };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Response:", errorBody);
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0 &&
          data.candidates[0].content && data.candidates[0].content.parts &&
          data.candidates[0].content.parts.length > 0) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected API response structure:", data);
        return "I received a response, but couldn't understand it. Please try again.";
      }

    } catch (error) {
      console.error("Gemini API Call Error:", error);
      return "I apologize, but I'm having trouble connecting to my services right now. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    addChatMessage({
      type: 'user',
      content: userMessage,
      timestamp: new Date(),
    });

    setIsLoading(true);

    try {
      const botResponse = await getGeminiResponse(userMessage);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center font-sans">
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
             <div className="mt-2 flex flex-wrap gap-2">
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

export default Chat;
