import React, { useState } from 'react';
import axios from 'axios';
import { Send, BarChart2, TrendingUp, PieChart, LineChart } from 'lucide-react';


interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://dm-backend-jpz1.onrender.com/analyze_stock', {
        query: input,
      },
      { 
        headers: { 
          'Content-Type': 'application/json',
        },
        // Don't send credentials since your backend now has allow_credentials=False
        withCredentials: true, 
      });
      
      console.log("Full response object:", response);
      console.log("Response data:", response.data);
      console.log("Response.data.response:", response.data.response);
      
      const aiMessage: Message = {
        role: 'assistant',
        content: response.data.response, // Assuming backend sends formatted HTML
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ Error: Unable to fetch data.' }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-700 flex-none">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center space-x-3">
              <BarChart2 className="w-10 h-10 text-emerald-400" />
              <h1 className="text-3xl font-bold text-white">StockAI</h1>
            </div>
            <div className="flex items-center space-x-8 text-gray-300">
              <div className="flex items-center space-x-2 hover:text-emerald-400 transition cursor-pointer">
                <TrendingUp className="w-5 h-5" />
                <span>Market Analysis</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-emerald-400 transition cursor-pointer">
                <PieChart className="w-5 h-5" />
                <span>Portfolio</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-emerald-400 transition cursor-pointer">
                <LineChart className="w-5 h-5" />
                <span>Predictions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-5xl mx-auto w-full px-4 py-8 space-y-6">
                {messages.length === 0 && (
                  <div className="text-center text-gray-400 mt-8">
                    <p className="text-lg">Welcome to StockAI!</p>
                    <p className="text-sm mt-2">Ask me anything about stocks, market trends, or investment advice.</p>
                  </div>
                )}
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl shadow-lg break-words ${
                        message.role === 'user'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-700/50 backdrop-blur-sm text-white'
                      }`}
                      dangerouslySetInnerHTML={message.role === 'assistant' ? { __html: message.content } : undefined}
                    >
                      {message.role === 'user' ? message.content : null}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700/50 backdrop-blur-sm text-white p-4 rounded-2xl shadow-lg">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Input Box */}
        <div className="flex-none border-t border-gray-700/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto w-full px-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about market trends, stock analysis, or investment advice..."
                  className="flex-1 bg-gray-800/50 backdrop-blur-sm text-white rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-gray-700"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 text-white p-4 rounded-xl hover:bg-emerald-600 transition-all duration-200 shadow-lg hover:shadow-emerald-500/20"
                  disabled={isLoading}
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
