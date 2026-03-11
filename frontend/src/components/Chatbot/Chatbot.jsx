import React, { useState, useEffect, useRef } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { IoMdClose, IoMdSend } from "react-icons/io";
import { FaRobot } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your ShopMe AI Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

  const quickReplies = [
    "Show me trending products",
    "Best electronics under ₹5000",
    "Recommend men's shirts",
    "What are today's offers?",
  ];

  // Helper function to format basic Markdown (bold, italic, code)
  const formatMessage = (text) => {
    // Regex splits the text by **bold**, *italic*, and `code`
    const parts = text.split(/(\*\*.*?\*\*|\*[^*]+\*|`.*?`)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-gray-900 dark:text-gray-100">
            {part.slice(2, -2)}
          </strong>
        );
      } else if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={index} className="italic text-gray-800 dark:text-gray-200">
            {part.slice(1, -1)}
          </em>
        );
      } else if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={index} className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-[13px] font-mono text-primary">
            {part.slice(1, -1)}
          </code>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an AI Chatbot Assistant for an e-commerce website called 'ShopMe'. You help users with product recommendations, finding items in categories like Mens Wear, Kids Wear, Electronics, etc., answering shopping questions, helping with orders, and providing smart suggestions. Keep your answers concise, helpful, and formatted nicely.",
            },
            ...messages.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
            { role: "user", content: text },
          ],
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        const botMessage = {
          sender: "bot",
          text: data.choices[0].message.content,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Sorry, I couldn't understand that." },
        ]);
      }
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops! Something went wrong. Please try again later.",
        },
      ]);
    }

    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center animate-bounce"
        >
          <BsChatDotsFill size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] sm:w-[420px] h-[600px] max-h-[85vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-slide-in-bottom border border-gray-100 dark:border-gray-700">
          {/* Header */}
          <div className="flex-shrink-0 bg-gradient-to-r from-primary to-secondary p-4 flex justify-between items-center text-white shadow-md relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <FaRobot size={22} className="drop-shadow-sm" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight tracking-wide">ShopMe AI</h3>
                <p className="text-xs text-white/80 font-medium">Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 hover:bg-white/20 p-1.5 rounded-full transition-all duration-200"
            >
              <IoMdClose size={22} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 relative z-0">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex mb-4 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                    <FaRobot className="text-primary text-sm" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-primary to-primary text-white rounded-br-none shadow-md"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700"
                  }`}
                >
                  <p className="text-[15px] shadow-sm whitespace-pre-wrap leading-relaxed">
                    {formatMessage(msg.text)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <FaRobot className="text-primary text-sm" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700 flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && !isTyping && (
            <div className="flex-shrink-0 p-3 bg-white dark:bg-gray-800 flex overflow-x-auto gap-2 border-t border-gray-100 dark:border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] custom-scrollbar">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(reply)}
                  className="whitespace-nowrap px-5 py-2.5 bg-gray-50 dark:bg-gray-700 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 text-[14px] font-medium rounded-full border border-gray-200 dark:border-gray-600 transition-all duration-200 text-gray-700 dark:text-gray-300"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="flex-shrink-0 p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ask anything..."
              className="flex-1 bg-gray-100 dark:bg-gray-900 border border-transparent dark:text-white text-[15px] rounded-full px-5 py-3 focus:outline-none focus:border-primary/30 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200 shadow-inner"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 flex-shrink-0"
            >
              <IoMdSend size={20} className="ml-0.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
