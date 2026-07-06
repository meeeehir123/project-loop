"use client";
import { useState, useEffect } from "react";
import { Sparkles, X, Bot, Send, Mail, Phone, User } from "lucide-react"; // 'User' add kiya

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: "assistant", content: "Hi! I am the Project LOOP assistant. How can I help you today?" }]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl mb-4 p-4 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2">
              <Bot className="text-blue-500" />
              <h3 className="text-white font-semibold">Loop AI</h3>
            </div>
            <button 
              onClick={() => setShowContact(!showContact)}
              className="text-xs text-blue-400 hover:text-blue-300 underline"
            >
              {showContact ? "Back to Chat" : "Support"}
            </button>
          </div>

          {/* Conditional View */}
          {showContact ? (
            <div className="flex-1 text-zinc-300 text-sm space-y-4 pt-4">
              <div className="flex items-center gap-2 text-white font-semibold">
                <User size={18} className="text-blue-500" />
                <span>Meehir Tripathi</span>
              </div>
              <p className="text-xs text-zinc-500">Owner & Support</p>
              
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-500" />
                <a href="mailto:tripathimeehir@gmail.com" className="hover:text-blue-400">tripathimeehir@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-blue-500" />
                <a href="tel:+918840587383" className="hover:text-blue-400">+91 8840587383</a>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.map((m, i) => (
                  <div key={i} className={`text-sm p-2 rounded ${m.role === 'user' ? 'bg-zinc-800 text-blue-300' : 'text-zinc-300'}`}>
                    {m.content}
                  </div>
                ))}
                {isLoading && <div className="text-zinc-500 text-sm italic">Typing...</div>}
              </div>
              <div className="flex gap-2">
                <input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 bg-zinc-950 p-2 rounded text-zinc-100 border border-zinc-700 outline-none focus:border-blue-500" 
                  placeholder="How can I help you?" 
                />
                <button onClick={sendMessage} className="bg-blue-600 p-2 rounded text-white hover:bg-blue-700 transition">
                  <Send size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-600 p-4 rounded-full shadow-lg text-white hover:scale-105 transition-transform">
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </button>
    </div>
  );
}