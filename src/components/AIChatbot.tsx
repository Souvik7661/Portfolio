import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Download,
  Eye,
  Phone,
  ArrowUpRight,
  Bot,
  User,
  ChevronDown
} from 'lucide-react';
import { getBotAnswer, BotResponse, BotAction } from '../data/chatbotKnowledge';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: BotAction;
  quickReplies?: string[];
}

interface AIChatbotProps {
  onOpenResume?: () => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-init',
    sender: 'bot',
    text: "Hello! I'm **Souvik's AI Assistant**. Ask me anything about his software engineering experience, Sister Nivedita University academics (CGPA 8.84), VALAK AI assistant, full-stack skills, or download his official resume!",
    timestamp: 'Just now',
    quickReplies: [
      '🎓 Education & CGPA',
      '💼 Featured Projects',
      '⚡ Tech Stack',
      '📄 Download Resume',
      '📞 How to Contact?',
    ],
  },
];

export const AIChatbot: React.FC<AIChatbotProps> = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPromptBubble, setHasPromptBubble] = useState(true);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    setIsTyping(true);

    // Realistic typing delay for smooth conversational experience
    setTimeout(() => {
      const botReply: BotResponse = getBotAnswer(text);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: botReply.action,
        quickReplies: botReply.quickReplies,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const handleActionClick = (action: BotAction) => {
    if (action.type === 'view_resume' && onOpenResume) {
      onOpenResume();
      return;
    }
    if (action.type === 'download_resume') {
      window.location.href = action.url || '/Souvik_Kundu_Resume.pdf';
      return;
    }
    if (action.type === 'projects') {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      return;
    }
    if (action.type === 'call' && action.url) {
      window.location.href = action.url;
      return;
    }
    if (action.url) {
      window.open(action.url, '_blank');
    }
  };

  return (
    <>
      {/* ── FLOATING BOT TRIGGER (BOTTOM RIGHT) ── */}
      <div className="fixed bottom-6 right-5 sm:right-7 z-[120] flex items-end gap-3 select-none">
        
        {/* Floating "Ask Me" Speech Bubble Tooltip */}
        <AnimatePresence>
          {!isOpen && hasPromptBubble && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, x: 10 }}
              transition={{ delay: 0.8, type: 'spring', damping: 20 }}
              className="relative hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0F0F14]/95 border border-[#E8702A]/40 text-white shadow-[0_0_25px_rgba(232,112,42,0.25)] backdrop-blur-md cursor-pointer group"
              onClick={() => {
                setIsOpen(true);
                setHasPromptBubble(false);
              }}
            >
              <div className="w-2 h-2 rounded-full bg-[#E8702A] animate-ping" />
              <div className="text-xs font-mono">
                <span className="font-bold text-white group-hover:text-[#E8702A] transition-colors">
                  Ask me anything!
                </span>{' '}
                <span className="text-white/60">💬</span>
              </div>

              {/* Close prompt button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHasPromptBubble(false);
                }}
                className="ml-1 p-0.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                aria-label="Dismiss message"
              >
                <X size={12} />
              </button>

              {/* Little speech bubble pointer triangle */}
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0F0F14] border-r border-t border-[#E8702A]/40 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BOT AVATAR BUTTON WITH CYBERNETIC ANIMATIONS ── */}
        <motion.button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setHasPromptBubble(false);
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full p-1 cursor-pointer focus:outline-none group"
          aria-label={isOpen ? 'Close AI Chatbot' : 'Open Souvik AI Chatbot'}
        >
          {/* Animated Holographic Outer Orbit Ring */}
          <div
            className="absolute -inset-1 rounded-full border border-dashed border-[#E8702A]/50 pointer-events-none animate-[spin_10s_linear_infinite]"
            style={{ filter: 'drop-shadow(0 0 8px rgba(232,112,42,0.5))' }}
          />

          {/* Glowing Aura Pulse */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E8702A]/30 to-amber-500/20 blur-md group-hover:blur-lg transition-all animate-pulse"
          />

          {/* Circular Frame & Cyborg Picture */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#E8702A] bg-black shadow-2xl">
            <img
              src="/images/ai-avatar-square.jpg"
              alt="Souvik AI Cyborg Assistant"
              className="w-full h-full object-cover select-none transform transition-transform duration-500 group-hover:scale-110"
            />

            {/* ── ANIMATED ROBOTIC EYE GLOW OVERLAY ── */}
            {/* Positioned on the cyborg eye at 54.4% x, 42.2% y */}
            <div
              className="absolute w-3.5 h-3.5 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-10 animate-eyepulse"
              style={{ left: '54.4%', top: '42.2%' }}
            >
              {/* Inner intense pulse core */}
              <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-80" />
              {/* Radial neon glow aperture */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-600 to-[#E8702A] blur-[2px]" />
              {/* Direct optic lens center */}
              <div className="relative w-full h-full rounded-full bg-white opacity-90 shadow-[0_0_12px_#ff2200,0_0_24px_#E8702A]" />
            </div>

            {/* Subtle Vertical Scanning Laser Beam across cyborg plate */}
            <div className="absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8702A]/90 to-transparent pointer-events-none animate-cyberscan" />
          </div>

          {/* Online Live Status Badge Indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0A0A0C] flex items-center justify-center shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>

          {/* Unread / Notification Sparkle icon when closed */}
          {!isOpen && (
            <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#E8702A] text-white flex items-center justify-center shadow-md border border-white/20">
              <Sparkles size={10} />
            </div>
          )}
        </motion.button>

      </div>

      {/* ── COMPACT CHAT SECTION (FLOATING POPUP CARD) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Souvik AI Chatbot Assistant"
            initial={{ opacity: 0, scale: 0.9, y: 30, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="fixed bottom-24 right-4 sm:right-7 z-[120] w-[calc(100vw-2rem)] sm:w-[390px] md:w-[410px] h-[520px] max-h-[80vh] bg-[#0A0A0E]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(232,112,42,0.2)] flex flex-col overflow-hidden text-white font-sans"
          >
            {/* ── CHAT HEADER ── */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-[#111117] to-[#0A0A0E] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#E8702A] shadow-md shrink-0">
                  <img
                    src="/images/ai-avatar-square.jpg"
                    alt="AI Avatar"
                    className="w-full h-full object-cover"
                  />
                  {/* Eye glow on header mini avatar */}
                  <div
                    className="absolute w-1.5 h-1.5 rounded-full bg-red-500 blur-[1px] animate-pulse"
                    style={{ left: '54.4%', top: '42.2%' }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
                      SOUVIK AI
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] font-mono text-white/50">
                    Neural Portfolio &bull; Resume Knowledge Engine
                  </p>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1 text-white/60">
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  title="Clear Chat History"
                  aria-label="Clear chat"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  title="Minimize Chat"
                  aria-label="Close chat"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* ── MESSAGES THREAD ── */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {m.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-[#E8702A]/20 border border-[#E8702A]/40 flex items-center justify-center shrink-0 mb-1 text-[#E8702A]">
                        <Bot size={12} />
                      </div>
                    )}

                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#E8702A] text-white rounded-br-none shadow-md font-medium'
                          : 'bg-[#14141B] text-neutral-200 border border-white/10 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {/* Render text with basic markdown formatting */}
                      <div className="space-y-1.5 whitespace-pre-line">
                        {m.text.split('\n').map((line, lIdx) => (
                          <p key={lIdx}>
                            {line.split(/(\*\*.*?\*\*)/g).map((segment, sIdx) => {
                              if (segment.startsWith('**') && segment.endsWith('**')) {
                                return (
                                  <strong key={sIdx} className="font-bold text-white">
                                    {segment.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return segment;
                            })}
                          </p>
                        ))}
                      </div>

                      {/* Embedded Action Button (e.g. Download Resume, View Resume, Call) */}
                      {m.action && (
                        <div className="mt-2.5 pt-2 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => handleActionClick(m.action!)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8702A] hover:bg-[#d65f1c] text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all shadow cursor-pointer active:scale-95"
                          >
                            {m.action.type === 'download_resume' && <Download size={13} />}
                            {m.action.type === 'view_resume' && <Eye size={13} />}
                            {m.action.type === 'call' && <Phone size={13} />}
                            {m.action.type === 'projects' && <ArrowUpRight size={13} />}
                            <span>{m.action.label}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {m.sender === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mb-1 text-white/70">
                        <User size={12} />
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <span className="text-[10px] font-mono text-white/30 mt-1 px-1">
                    {m.timestamp}
                  </span>

                  {/* Quick Reply Pills */}
                  {m.quickReplies && m.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-1">
                      {m.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          type="button"
                          onClick={() => handleSendMessage(reply)}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#E8702A]/20 hover:border-[#E8702A]/50 border border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs font-mono text-white/50 pl-2">
                  <div className="w-5 h-5 rounded-full bg-[#E8702A]/20 flex items-center justify-center text-[#E8702A]">
                    <Bot size={11} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>SOUVIK AI analyzing</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8702A] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8702A] animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8702A] animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── INPUT BOX FOOTER ── */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#0C0C10] border-t border-white/10 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about skills, projects, resume..."
                className="flex-1 bg-white/5 border border-white/10 focus:border-[#E8702A] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none transition-colors font-mono"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className="p-2.5 rounded-xl bg-[#E8702A] hover:bg-[#d65f1c] text-white disabled:opacity-40 disabled:hover:bg-[#E8702A] transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
