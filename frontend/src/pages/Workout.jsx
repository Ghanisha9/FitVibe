import React, { useState, useRef, useEffect } from 'react';

// --- Helper Icon Component ---
const PaperAirplaneIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 1.954c.763 0 1.52.057 2.25.168l8.26 1.46c.365.064.67.31.84.623.28.52.14.94-.37 1.25l-6.16 3.92v5.12c0 .65-.24 1.22-.63 1.68l-2.73 3.2c-.4.47-.98.75-1.6.75s-1.2-.28-1.6-.75l-2.73-3.2c-.4-.46-.63-1.03-.63-1.68v-5.12L1.01 5.45c-.5-.31-.65-.73-.37-1.25.17-.31.48-.56.84-.62l8.26-1.46A25.4 25.4 0 0112 1.954zM4.6 6.54L11.25 10v6.27l-2.23-2.6c-.1-.12-.17-.26-.17-.4V6.54zm14.8 0L12.75 10v6.27l2.23-2.6c.1-.12.17-.26.17-.4V6.54z" />
  </svg>
);


/**
 * Main Fitness Chatbot Page Component
 * This component provides a chat interface with a Gemini-powered fitness assistant.
 */
export default function App() {
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      text: "Hi! I'm FitBot. Ask me anything about fitness, exercise, nutrition, or mindfulness." 
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const chatLogRef = useRef(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  // --- Gemini API Call ---
  
  /**
   * A helper function to fetch with exponential backoff.
   * This is crucial for handling API rate limits (429) or temporary server errors (5xx).
   */
  async function fetchWithBackoff(url, options, retries = 3, delay = 1000) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        // Only retry on rate limits or server errors
        if (response.status === 429 || response.status >= 500) {
          throw new Error(`Retryable error: ${response.status}`);
        } else {
          // Don't retry on other client errors (e.g., 400 Bad Request)
          throw new Error(`Non-retryable error: ${response.status}`);
        }
      }
      return await response.json();
    } catch (error) {
      if (retries > 0 && error.message.startsWith('Retryable')) {
        // This is a retryable error, wait and try again
        await new Promise(res => setTimeout(res, delay));
        return fetchWithBackoff(url, options, retries - 1, delay * 2); // Exponential backoff
      } else {
        // This was the last retry or a non-retryable error
        throw error;
      }
    }
  }

  /**
   * Handles sending the user's message to the Gemini API.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userQuery = currentInput.trim();
    
    if (!userQuery) return;

    // Add user's message to the chat
    setMessages(prev => [...prev, { role: 'user', text: userQuery }]);
    setCurrentInput('');
    setIsLoading(true);
    setError(null);

    // --- Define the API request ---
    // NOTE: Leave apiKey as "" - it will be injected by the environment.
    const apiKey = ""; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    // This system instruction is the "brain" of the chatbot
    const systemPrompt = "You are 'FitBot', a friendly and encouraging fitness assistant for the 'FitVibe' app. Your answers should be concise, helpful, and focused *only* on fitness, exercise (like pushups), nutrition, and mindfulness. If the user asks about anything else, politely decline and steer the conversation back to wellness topics.";
    
    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    // --- Make the API call ---
    try {
      const result = await fetchWithBackoff(apiUrl, options);
      
      const candidate = result.candidates?.[0];
      if (candidate && candidate.content?.parts?.[0]?.text) {
        const botResponse = candidate.content.parts[0].text;
        // Add bot's response to the chat
        setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      } else {
        throw new Error("Invalid response structure from API.");
      }

    } catch (err) {
      console.error("API call failed:", err);
      setError("Sorry, I'm having a little trouble connecting. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Component Render ---
  return (
    <>
      {/* Main container with dark theme */}
      <div className="flex flex-col items-center min-h-screen w-full bg-slate-900 text-gray-200 p-4 sm:p-8 font-sans">
        
        {/* Header */}
        <div className="w-full max-w-2xl text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">FitBot</h1>
          <p className="text-lg text-gray-400">Your AI-powered fitness assistant.</p>
        </div>

        {/* Chat Window */}
        <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-lg flex flex-col h-[70vh] max-h-[600px]">
          
          {/* Message Log */}
          <div ref={chatLogRef} className="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow
                    ${msg.role === 'user' 
                      ? 'bg-purple-600 text-white rounded-br-lg' 
                      : 'bg-slate-700 text-gray-200 rounded-bl-lg'
                    }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-slate-700 text-gray-400 rounded-bl-lg shadow">
                  <p className="text-sm italic">FitBot is typing...</p>
                </div>
              </div>
            )}
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="p-4 border-t border-slate-700">
              <p className="text-sm text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Input Form */}
          <form 
            onSubmit={handleSubmit}
            className="p-4 sm:p-6 border-t border-slate-700 flex items-center gap-3"
          >
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Ask about fitness..."
              disabled={isLoading}
              className="flex-grow px-4 py-3 rounded-full bg-slate-700 text-gray-200
                         border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !currentInput.trim()}
              className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center
                         transition-all duration-200
                         enabled:hover:bg-purple-700
                         focus:outline-none focus:ring-4 focus:ring-purple-500
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>

        </div>
      </div>
    </>
  );
}