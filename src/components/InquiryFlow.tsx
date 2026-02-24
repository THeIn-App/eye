import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, Info, Lock } from 'lucide-react';
import { SubscriptionLevel, BusinessService } from '../types';
import { BUSINESS_SERVICES } from '../constants';
import { cn } from '../lib/utils';

interface Message {
    id: string;
    role: 'user' | 'eye';
    content: string;
    type?: 'text' | 'service-choice' | 'upgrade-prompt';
}

interface InquiryFlowProps {
    subscriptionLevel: SubscriptionLevel;
    onUpgrade: () => void;
}

export const InquiryFlow: React.FC<InquiryFlowProps> = ({ subscriptionLevel, onUpgrade }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'eye',
            content: "I am EYE. Your elite business partner. Tell me, what venture are you planning to embark upon today?",
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate EYE "Thinking"
        await new Promise(resolve => setTimeout(resolve, 1500));

        const responseContent = input.toLowerCase().includes('carwash')
            ? "A carwash business? A classic revenue engine. Location is your primary asset here. Would you like to see the initial capital requirements or the organizational structure required for it?"
            : "I understand the ambition. Every great empire starts with a single inquiry. To give you the most accurate strategic advice, should we start with the Organizational Structure, Capital requirements, or the PROMADS (Marketing) strategy?";

        const eyeMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'eye',
            content: responseContent,
            type: 'service-choice'
        };

        setMessages(prev => [...prev, eyeMsg]);
        setIsTyping(false);
    };

    const handleServiceSelect = (serviceId: string) => {
        const service = BUSINESS_SERVICES.find(s => s.id === serviceId);
        if (!service) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: `Tell me about ${service.label}` };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        setTimeout(() => {
            const content = subscriptionLevel === 'trial' ? service.trialContent : service.proContent;

            const eyeMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'eye',
                content: content,
            };

            const newMessages = [...messages, userMsg, eyeMsg];

            if (subscriptionLevel === 'trial') {
                newMessages.push({
                    id: (Date.now() + 2).toString(),
                    role: 'eye',
                    content: "As a Trial subscriber, I am limited in the depth I can reveal. For the complete, comprehensive business plan and detailed job descriptions, an upgrade is required.",
                    type: 'upgrade-prompt'
                });
            }

            setMessages(newMessages);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[600px] bg-charcoal/20 border border-gold/10 rounded-sm overflow-hidden">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gold/10 bg-obsidian flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold flex items-center justify-center rounded-sm">
                        <Bot className="text-obsidian w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-serif font-bold italic text-sm">EYE Intelligence</h4>
                        <p className="text-[10px] font-mono text-gold uppercase tracking-widest leading-none">Live Interaction Active</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-gold/5 border border-gold/20 rounded-full">
                    <span className="text-[10px] font-mono text-gold uppercase tracking-widest">
                        {subscriptionLevel} member
                    </span>
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gold/20"
            >
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "flex gap-4",
                            msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 rounded-sm flex items-center justify-center shrink-0",
                            msg.role === 'user' ? "bg-ivory/10" : "bg-gold/10 border border-gold/20"
                        )}>
                            {msg.role === 'user' ? <User className="w-4 h-4 text-ivory/60" /> : <Bot className="w-4 h-4 text-gold" />}
                        </div>

                        <div className={cn(
                            "max-w-[80%] space-y-4",
                            msg.role === 'user' ? "items-end" : "items-start"
                        )}>
                            <div className={cn(
                                "p-4 rounded-sm text-sm leading-relaxed",
                                msg.role === 'user'
                                    ? "bg-gold text-obsidian font-medium"
                                    : "bg-charcoal/50 text-ivory/90 border border-gold/5"
                            )}>
                                {msg.content}
                            </div>

                            {msg.type === 'service-choice' && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
                                    {BUSINESS_SERVICES.map((service) => (
                                        <button
                                            key={service.id}
                                            onClick={() => handleServiceSelect(service.id)}
                                            className="px-3 py-2 bg-gold/10 border border-gold/20 hover:bg-gold/20 text-gold text-[10px] font-mono uppercase tracking-widest rounded-sm transition-colors text-left"
                                        >
                                            {service.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {msg.type === 'upgrade-prompt' && (
                                <button
                                    onClick={onUpgrade}
                                    className="flex items-center gap-2 px-4 py-2 bg-rust-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-rust-accent/80 transition-colors"
                                >
                                    <Lock className="w-3 h-3" />
                                    Unlock Full Business Plan
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 bg-gold/10 border border-gold/20 rounded-sm flex items-center justify-center">
                            <Loader2 className="w-4 h-4 text-gold animate-spin" />
                        </div>
                        <div className="p-4 bg-charcoal/50 rounded-sm">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form
                onSubmit={handleSend}
                className="p-4 border-t border-gold/10 bg-obsidian/50 flex gap-4"
            >
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your business venture to EYE..."
                        className="w-full bg-charcoal/50 border border-gold/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold/50 text-ivory placeholder:text-ivory/20"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[8px] font-mono bg-ivory/5 border border-ivory/10 rounded text-ivory/40 uppercase">Enter</kbd>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    title="Send inquiry"
                    className="bg-gold text-obsidian p-3 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold-warm transition-colors"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};
