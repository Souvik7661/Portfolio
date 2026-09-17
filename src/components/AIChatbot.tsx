import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  RotateCcw,
  Download,
  Eye,
  Phone,
  ArrowUpRight,
  Bot,
  User,
  ChevronDown,
  Sparkles,
  Flame
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
    text: "Hello! I'm Devil , Souvik's AI Assistant. Ask me anything ",
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

  const triggerResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/Souvik_Kundu_Resume.pdf';
    link.download = 'Souvik_Kundu_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

    // Realistic short typing delay
    setTimeout(() => {
      const botReply: BotResponse = getBotAnswer(text);

      if (botReply.triggerDownload) {
        triggerResumeDownload();
      }

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
    }, 350);
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const handleActionClick = (action: BotAction) => {
    if (action.type === 'download_resume') {
      triggerResumeDownload();
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Done',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      return;
    }
    if (action.type === 'view_resume' && onOpenResume) {
      onOpenResume();
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
      {/* ── FLOATING DEVIL BOT TRIGGER (HIGHER & BIGGER IN RIGHT HAND CORNER) ── */}
      <div className="fixed bottom-14 right-5 sm:bottom-20 sm:right-8 z-[120] flex flex-col items-center select-none">
        
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex flex-col items-center"
        >
          {/* Main Interactive Button */}
          <motion.button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            className="relative w-20 h-20 sm:w-[92px] sm:h-[92px] rounded-full p-1 cursor-pointer focus:outline-none group shadow-[0_0_35px_rgba(232,112,42,0.45)]"
            aria-label={isOpen ? 'Close Devil AI Chatbot' : 'Open Devil AI Chatbot'}
          >
            {/* Outer Rotating Cybernetic Radar Reticle */}
            <div
              className="absolute -inset-2.5 rounded-full border-2 border-dashed border-[#E8702A] pointer-events-none animate-[spin_14s_linear_infinite]"
              style={{ filter: 'drop-shadow(0 0 10px rgba(232,112,42,0.65))' }}
            />

            {/* Counter-Rotating Inner Tech Ring */}
            <div
              className="absolute -inset-1 rounded-full border border-amber-400/40 pointer-events-none animate-[spin_20s_linear_infinite_reverse]"
            />

            {/* Glowing Aura Halo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E8702A]/40 to-red-500/30 blur-lg group-hover:blur-xl transition-all animate-pulse" />

            {/* Circular Chassis Frame with Cyborg Portrait */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#E8702A] bg-black shadow-2xl">
              <img
                src="/images/ai-avatar-square.jpg"
                alt="Devil - Souvik's AI Assistant"
                className="w-full h-full object-cover select-none transform transition-transform duration-500 group-hover:scale-110"
              />

              {/* ── COMPACT ROBOTIC CYBORG EYE GLOW ── */}
              <div
                className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-10 animate-eyepulse flex items-center justify-center"
                style={{ left: '54.4%', top: '42.2%' }}
              >
                {/* Tight red glow halo */}
                <div className="absolute inset-0 rounded-full bg-red-600/60 blur-[1px]" />
                {/* Tiny laser iris pinhole */}
                <div className="relative w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white shadow-[0_0_4px_#ff2200,0_0_7px_#E8702A]" />
              </div>

              {/* Vertical Scanning Laser Beam Sweep */}
              <div className="absolute inset-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#E8702A] to-transparent pointer-events-none animate-cyberscan" />
            </div>

            {/* Live System Indicator Badge */}
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0A0A0C] flex items-center justify-center shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </div>

            {/* Neon Flame / Sparkle Notification Icon */}
            {!isOpen && (
              <div className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-[#E8702A] to-red-500 text-white flex items-center justify-center shadow-lg border border-white/30 animate-bounce">
                <Flame size={12} className="text-yellow-200" />
              </div>
            )}
          </motion.button>

          {/* ── DISTINCTIVE TACTICAL BADGE UNDER THE AVATAR ── */}
          <motion.div
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            className="mt-2.5 px-3 py-1 rounded-full bg-[#0E0E14]/95 border border-[#E8702A]/80 shadow-[0_0_18px_rgba(232,112,42,0.4)] backdrop-blur-md cursor-pointer flex items-center gap-1.5 text-white"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8702A] animate-ping" />
            <span className="text-[11px] font-mono font-extrabold tracking-widest text-[#E8702A] uppercase">
              DEVIL AI
            </span>
            <span className="text-[10px] text-white/60 font-mono font-medium">💬</span>
          </motion.div>
        </motion.div>

      </div>

      {/* ── COMPACT CHAT SECTION (FLOATING POPUP CARD) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Devil Souvik's AI Assistant"
            initial={{ opacity: 0, scale: 0.9, y: 25, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 25 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="fixed bottom-36 right-4 sm:bottom-44 sm:right-8 z-[120] w-[calc(100vw-2rem)] sm:w-[410px] md:w-[430px] h-[550px] max-h-[80vh] bg-[#0A0A0E]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(232,112,42,0.25)] flex flex-col overflow-hidden text-white font-sans"
          >
            {/* Cyber Corner HUD Tech Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-[#E8702A]/70 rounded-tl-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-[#E8702A]/70 rounded-tr-3xl pointer-events-none" />

            {/* ── CHAT HEADER ── */}
            <div className="px-4 sm:px-5 py-3.5 bg-gradient-to-r from-[#14141D] via-[#0E0E15] to-[#0A0A0E] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#E8702A] shadow-md shrink-0">
                  <img
                    src="/images/ai-avatar-square.jpg"
                    alt="Devil AI Avatar"
                    className="w-full h-full object-cover"
                  />
                  {/* Eye glow on header mini avatar */}
                  <div
                    className="absolute w-1 h-1 rounded-full bg-red-500 pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_2px_#ff2200]"
                    style={{ left: '54.4%', top: '42.2%' }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-mono font-extrabold tracking-widest uppercase text-white flex items-center gap-1.5">
                      <span>DEVIL</span>
                      <span className="text-[#E8702A]">//</span>
                      <span>SOUVIK AI</span>
                    </h3>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 font-bold">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-white/50">
                    Neural Knowledge Engine &bull; Portfolio &amp; Resume
                  </p>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1 text-white/60">
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  title="Clear Chat History"
                  aria-label="Clear chat"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  title="Minimize Chat"
                  aria-label="Close chat"
                >
                  <ChevronDown size={19} />
                </button>
              </div>
            </div>

            {/* ── MESSAGES THREAD ── */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {m.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-[#E8702A]/20 border border-[#E8702A]/40 flex items-center justify-center shrink-0 mb-1 text-[#E8702A]">
                        <Bot size={13} />
                      </div>
                    )}

                    <div
                      className={`px-4 py-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#E8702A] text-white rounded-br-none shadow-md font-medium'
                          : 'bg-[#14141C] text-neutral-200 border border-white/10 rounded-bl-none shadow-sm'
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
                        <div className="mt-3 pt-2.5 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => handleActionClick(m.action!)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#E8702A] hover:bg-[#d65f1c] text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all shadow cursor-pointer active:scale-95"
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
                          className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 hover:bg-[#E8702A]/20 hover:border-[#E8702A]/50 border border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
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
                    <Sparkles size={11} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>DEVIL analyzing</span>
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
              className="p-3 sm:p-4 bg-[#0C0C12] border-t border-white/10 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about skills, projects, resume..."
                className="flex-1 bg-white/5 border border-white/10 focus:border-[#E8702A] rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none transition-colors font-mono"
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
