import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, Sparkles } from 'lucide-react';
import { ModeBadge } from './ModeBadge';
import { ReasoningStrip } from './ReasoningStrip';
import type { Message } from '../types';

interface ChatInterfaceProps {
    messages: Message[];
    input: string;
    setInput: (value: string) => void;
    onSend: () => void;
    onOpenWhatsApp: () => void;
    isLoading: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
    messages,
    input,
    setInput,
    onSend,
    onOpenWhatsApp,
    isLoading
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Consolidate messages from same sender for visual grouping? 
    // For now, keep simple bubble stream as requested.

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="flex flex-col h-full relative">
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                        >
                            {/* Buddy Mode Badge */}
                            {msg.sender === 'buddy' && msg.mode && (
                                <ModeBadge mode={msg.mode} />
                            )}

                            {/* Chat Bubble */}
                            <div
                                className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${msg.sender === 'user'
                                    ? 'bg-indigo-600 text-white rounded-br-sm'
                                    : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-bl-sm'
                                    }`}
                            >
                                <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">{msg.text}</div>
                            </div>

                            {/* Timestamp & Reasoning */}
                            <div className={`mt-1 flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <span className="text-[10px] text-slate-500 opacity-70">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>

                                {msg.sender === 'buddy' && msg.reasoning && (
                                    <ReasoningStrip reasoning={msg.reasoning} />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-start"
                    >
                        <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 border border-slate-700/50 flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 ml-1">Buddy is thinking...</span>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent">
                <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-xl flex items-end p-2 transition-all ring-1 ring-white/5 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50">

                    <button
                        onClick={onOpenWhatsApp}
                        className="p-3 text-slate-400 hover:text-emerald-400 transition-colors tooltip-trigger"
                        title="Import WhatsApp Chat"
                    >
                        <Upload className="w-5 h-5" />
                    </button>

                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-cyan-50 placeholder-slate-600 text-sm p-3 focus:outline-none resize-none max-h-32 custom-scrollbar font-mono tracking-tight"
                        rows={1}
                        style={{ minHeight: '44px' }}
                    />

                    <button
                        onClick={onSend}
                        disabled={!input.trim() || isLoading}
                        className={`p-3 rounded-xl transition-all border ${input.trim() && !isLoading
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/50 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                            : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                            }`}
                    >
                        {isLoading ? <Sparkles className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                </div>
                <div className="text-center mt-2 text-[10px] text-slate-600 font-mono tracking-wider uppercase">
                    Buddy AI System v2.0 • Neural Link Active
                </div>
            </div>
        </div>
    );
};
