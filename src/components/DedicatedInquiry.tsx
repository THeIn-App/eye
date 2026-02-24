import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, User, Loader2, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface DedicatedInquiryProps {
    articleTitle: string;
    context: string;
}

export const DedicatedInquiry: React.FC<DedicatedInquiryProps> = ({ articleTitle, context }) => {
    const [messages, setMessages] = useState<{ role: 'eye' | 'user'; text: string }[]>([
        { role: 'eye', text: `I am specialized in the nodes of: "${articleTitle}". What tactical details do you wish to refine?` }
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
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsTyping(true);

        // Simulate expert response based on article context
        setTimeout(() => {
            const responses = [
                `Based on the proprietary data in "${articleTitle}", I recommend focusing on the distribution density first.`,
                `Analyzing your query through the lens of my Luzon Logistics Audit, that's a high-impact strategic node.`,
                `I've seen that specific pitfall before. The "Invisible" stream requires at least 15% up-sell conversion to stabilize.`,
                `Strategic achievement in this area depends on your willingness to follow the data peaks I've shown.`
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            setMessages(prev => [...prev, { role: 'eye', text: randomResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[500px] glass-panel rounded-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gold/10 bg-obsidian/40 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold flex items-center justify-center rounded-sm">
                        <Sparkles className="w-4 h-4 text-obsidian" />
                    </div>
                    <div>
                        <h4 className="font-serif font-bold italic text-sm">Subject Context</h4>
                        <p className="text-[10px] font-mono text-gold uppercase tracking-widest">{articleTitle}</p>
                    </div>
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gold/20">
                <div className="p-3 bg-gold/5 border border-gold/10 rounded-sm mb-6 flex gap-3">
                    <Info className="w-4 h-4 text-gold shrink-0" />
                    <p className="text-[10px] text-ivory/60 italic leading-relaxed">
                        This interaction is strictly calibrated to the proprietary data discovered in this specific article.
                    </p>
                </div>

                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: msg.role === 'eye' ? -10 : 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                            "max-w-[85%] flex gap-3",
                            msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 rounded-sm flex items-center justify-center shrink-0",
                            msg.role === 'eye' ? "bg-gold text-obsidian" : "bg-charcoal/80 text-ivory/40 border border-gold/10"
                        )}>
                            {msg.role === 'eye' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div className={cn(
                            "p-4 rounded-sm text-sm leading-relaxed",
                            msg.role === 'eye' ? "bg-charcoal/50 text-ivory border border-gold/5" : "bg-gold/10 text-ivory border border-gold/20"
                        )}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-sm bg-gold text-obsidian flex items-center justify-center">
                            <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                        <div className="p-4 bg-charcoal/50 border border-gold/5 rounded-sm">
                            <div className="flex gap-1">
                                <div className="w-1 h-1 bg-gold rounded-full animate-bounce" />
                                <div className="w-1 h-1 bg-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="w-1 h-1 bg-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-gold/10 bg-obsidian/40 flex gap-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Refine a strategic node..."
                    className="flex-1 bg-charcoal/30 border border-gold/10 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-gold/30 transition-colors"
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    title="Send inquiry"
                    className="bg-gold text-obsidian p-2 rounded-sm disabled:opacity-50 hover:bg-gold-warm transition-colors"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};
