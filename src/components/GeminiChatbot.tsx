import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Maximize2,
  Minimize2,
  Zap,
  BrainCircuit,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  time: string;
  modelUsed?: string;
}

export default function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [persona, setPersona] = useState<'marketer' | 'brand'>('marketer');
  const [modelSpeed, setModelSpeed] = useState<'fast' | 'general'>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      content:
        "Hello! I'm Furqan Farooq's AI Marketing & Growth Assistant. Ask me anything about Meta Ads, Facebook & Instagram advertising strategies, campaign planning, or the Times & Glints e-commerce brand.",
      time: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      content: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Map history to format for backend
      const formattedForApi = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: formattedForApi,
          modelSpeed,
          persona,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer from Gemini');
      }

      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: 'model',
        content: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: 'model',
        content: `Error: ${err.message || 'Unable to connect to Gemini backend. Please verify your connection.'}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: String(Date.now()),
        role: 'model',
        content:
          persona === 'marketer'
            ? "Conversation reset. What Meta Ads or digital growth challenge are you working on today?"
            : "Welcome to Times & Glints Concierge. How may I assist you with our luxury timepieces or Lahore deliveries?",
        time: 'Just now',
      },
    ]);
  };

  const sampleQuestions = [
    'How do you test Meta ad creatives for e-commerce?',
    'What is Times & Glints delivery policy in Lahore?',
    'Explain your campaign planning framework.',
    'What is your strategy for Instagram Reels ads?',
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label="Toggle Gemini Chatbot"
        >
          <Bot className="w-5 h-5 text-slate-950" />
          <span className="hidden sm:inline">Ask Furqan AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
        </button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isExpanded
              ? 'inset-4 sm:inset-10'
              : 'bottom-20 left-4 sm:left-6 w-[92vw] sm:w-[440px] h-[580px] max-h-[85vh]'
          } rounded-3xl bg-[#070d22] border border-cyan-500/30 shadow-2xl flex flex-col overflow-hidden`}
        >
          {/* Header */}
          <div className="p-4 bg-[#091129] border-b border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white font-heading">
                    Furqan AI Strategist
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                    Gemini Powered
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {persona === 'marketer' ? 'Growth & Meta Ads Advisor' : 'Brand Concierge'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Minimize' : 'Expand'}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Persona & Speed Config Strip */}
          <div className="px-4 py-2 bg-[#05091a] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
            {/* Persona Switch */}
            <div className="flex items-center gap-1">
              <span className="text-slate-500">Role:</span>
              <button
                type="button"
                onClick={() => setPersona('marketer')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  persona === 'marketer'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Growth Strategist
              </button>
              <button
                type="button"
                onClick={() => setPersona('brand')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  persona === 'brand'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Brand Concierge
              </button>
            </div>

            {/* Model Speed Option */}
            <div className="flex items-center gap-1 font-mono">
              <button
                type="button"
                onClick={() => setModelSpeed('general')}
                title="Gemini 3.8 Flash (General Tasks)"
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer ${
                  modelSpeed === 'general'
                    ? 'bg-blue-600/30 text-blue-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BrainCircuit className="w-3 h-3" />
                <span>3.8 Flash</span>
              </button>
              <button
                type="button"
                onClick={() => setModelSpeed('fast')}
                title="Gemini 3.1 Flash Lite (Fast Tasks)"
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer ${
                  modelSpeed === 'fast'
                    ? 'bg-emerald-600/30 text-emerald-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>Lite</span>
              </button>
            </div>
          </div>

          {/* Scrollable Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isBot = msg.role === 'model';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed ${
                      isBot
                        ? 'bg-[#0b142e] border border-cyan-500/20 text-slate-200 shadow-md'
                        : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-medium'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <div
                      className={`mt-1.5 flex items-center justify-between text-[10px] ${
                        isBot ? 'text-slate-500' : 'text-slate-900/70'
                      }`}
                    >
                      <span>{msg.time}</span>
                      {msg.modelUsed && (
                        <span className="font-mono text-cyan-400/80">{msg.modelUsed}</span>
                      )}
                    </div>
                  </div>

                  {!isBot && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-slate-300">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#0b142e] border border-cyan-500/20 text-xs text-cyan-300 w-fit">
                <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Synthesizing response with Gemini...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (if chat is short) */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-slate-800 bg-[#060a1d] flex flex-wrap gap-1.5">
              {sampleQuestions.slice(0, 3).map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInput(q)}
                  className="text-[11px] p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-left cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-[#091129] border-t border-cyan-500/20 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                persona === 'marketer'
                  ? 'Ask about Meta Ads, audiences, or strategy...'
                  : 'Ask about watches, jewellery, or Lahore delivery...'
              }
              className="flex-1 py-2 px-3.5 rounded-xl bg-[#050814] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
