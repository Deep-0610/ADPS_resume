import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Copy, 
  Check, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  Terminal,
  ExternalLink,
  Award,
  Briefcase
} from 'lucide-react';
import { DEEP_PROFILE } from '../data/deepResumeData.js';
import { ProfileAvatar } from './ProfileAvatar.jsx';

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: `Hello! I'm **Deep Chaudhari's AI Copilot**.\n\nDeep is a **Full-Stack Software Engineer & Forward Deployment Engineer** candidate and former **Assistant C.T.O. at SpiroEdu** (SAKEC TBI).\n\nAsk me anything about Deep's work experience, his 9 verified certifications (Walmart USA, UC Irvine, Infosys, IIM Bangalore, IIT Bombay), or his technical background!`,
    timestamp: 'Just now'
  }
];

const SUGGESTED_QUESTIONS = [
  'What were Deep’s key responsibilities as Assistant C.T.O.?',
  'Tell me about Deep’s 9 verified certifications.',
  'What is Deep’s tech stack for full-stack development?',
  'How can I get in touch with Deep Chaudhari?'
];

export const Chatbot = ({ 
  isOpenExternal, 
  onCloseExternal 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('deep-chat-history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  useEffect(() => {
    sessionStorage.setItem('deep-chat-history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (!nextState && onCloseExternal) {
      onCloseExternal();
    }
  };

  const handleSendMessage = async (textToSend) => {
    const content = (textToSend || inputMessage).trim();
    if (!content || isLoading) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const chatApiUrl = import.meta.env.VITE_CHAT_API_URL || '/api/chat';
      const response = await fetch(chatApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: messages.slice(-8)
        })
      });

      const data = await response.json();
      const botReply = data.reply || `Deep is reachable directly at ${DEEP_PROFILE.email} or ${DEEP_PROFILE.phone}.`;

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const fallbackMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Deep Chaudhari is available for Forward Deployment and Software Engineering opportunities. Reach him directly at **${DEEP_PROFILE.email}** or **${DEEP_PROFILE.phone}**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    sessionStorage.removeItem('deep-chat-history');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            id="btn-chatbot-floating"
            onClick={handleToggle}
            className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-[#064E3B] text-white shadow-xl hover:bg-[#043d2e] transition-all duration-300 hover:scale-105 active:scale-95 border border-[#A7F3D0]/30"
            aria-label="Chat with Deep's AI Copilot"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-[#D1FAE5] group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D97706] ring-2 ring-[#064E3B]" />
            </div>
            <span className="text-xs font-bold tracking-tight pr-1">
              Ask Deep’s AI Copilot
            </span>
          </button>
        </div>
      )}

      {/* Screen-Adaptive Chatbot Drawer / Modal */}
      {isOpen && (
        <div
          id="chatbot-container"
          className={`fixed z-50 transition-all duration-300 flex flex-col ${
            'inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[620px] sm:rounded-3xl'
          } ${
            isExpanded ? 'sm:w-[580px] sm:h-[720px]' : ''
          } bg-white border border-[#E2E8F0] shadow-2xl overflow-hidden`}
        >
          {/* Header */}
          <div className="px-5 py-4 bg-[#064E3B] text-white flex items-center justify-between border-b border-[#043d2e]">
            <div className="flex items-center gap-3">
              <ProfileAvatar
                className="w-9 h-9 rounded-xl shadow-xs"
                label="Portrait of Deep Chaudhari"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white leading-none">
                    Deep’s AI Copilot
                  </h3>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#D1FAE5] text-[#064E3B]">
                    Gemini AI
                  </span>
                </div>
                <p className="text-[11px] text-[#A7F3D0] mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  Engineering &amp; Credentials Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:inline-flex p-1.5 rounded-lg text-[#D1FAE5] hover:bg-white/10 transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg text-[#D1FAE5] hover:bg-white/10 transition-colors"
                title="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleToggle}
                className="p-1.5 rounded-lg text-[#D1FAE5] hover:bg-white/10 transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#FAF9F6]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <ProfileAvatar
                    className="w-7 h-7 rounded-lg shrink-0 mt-0.5"
                    label="Portrait of Deep Chaudhari"
                  />
                )}

                <div className={`max-w-[85%] sm:max-w-[80%] space-y-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#064E3B] text-white rounded-br-xs font-medium'
                        : 'bg-white text-[#0F172A] border border-[#E2E8F0] rounded-tl-xs shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">
                      {msg.text}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-1 text-[10px] text-[#94A3B8]">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'bot' && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="text-[#64748B] hover:text-[#064E3B] flex items-center gap-1 transition-colors"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-[#064E3B]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-[#E2E8F0] text-[#334155] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <ProfileAvatar
                  className="w-7 h-7 rounded-lg shrink-0"
                  label="Portrait of Deep Chaudhari"
                />
                <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#064E3B] typing-dot-1" />
                  <span className="w-2 h-2 rounded-full bg-[#064E3B] typing-dot-2" />
                  <span className="w-2 h-2 rounded-full bg-[#064E3B] typing-dot-3" />
                  <span className="text-[11px] font-medium text-[#64748B] ml-2">Consulting Deep's profile...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-white border-t border-[#E2E8F0] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1.5 rounded-full bg-[#F1F5F1] hover:bg-[#D1FAE5] text-[11px] font-semibold text-[#064E3B] border border-[#E2E8F0] hover:border-[#A7F3D0] transition-all shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3.5 bg-white border-t border-[#E2E8F0]">
            <div className="relative flex items-end gap-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-2xl p-2 focus-within:border-[#064E3B] focus-within:ring-1 focus-within:ring-[#064E3B]">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Deep's skills, SpiroEdu CTO experience, or credentials..."
                rows={1}
                className="flex-1 bg-transparent text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none resize-none max-h-28 py-1.5 px-2 font-sans"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                className="p-2 rounded-xl bg-[#064E3B] text-white hover:bg-[#043d2e] disabled:opacity-40 disabled:hover:bg-[#064E3B] transition-all shrink-0 shadow-xs"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#94A3B8] px-1">
              <span>Press <b>Enter</b> to send &bull; Shift+Enter for newline</span>
              <span className="text-[#064E3B] font-medium">Deep Chaudhari</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
