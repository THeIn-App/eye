import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Send, Clock } from 'lucide-react';
import { VaultComment } from '../types';
import { cn } from '../lib/utils';

interface CommentSectionProps {
    comments: VaultComment[];
    onAddComment: (text: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment('');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-gold/10 pb-4">
                <h4 className="font-serif font-bold italic text-gold text-xl">Engagement Feed</h4>
                <span className="text-[10px] font-mono uppercase tracking-widest text-ivory/40">
                    {comments.length} Thoughts Shared
                </span>
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your discovery or question..."
                    className="w-full bg-charcoal/50 border border-gold/20 rounded-sm p-4 text-sm focus:outline-none focus:border-gold/50 transition-colors min-h-[100px] resize-none pr-12"
                />
                <button
                    type="submit"
                    disabled={!newComment.trim()}
                    title="Post comment"
                    className="absolute bottom-4 right-4 p-2 bg-gold text-obsidian rounded-sm hover:bg-gold-warm transition-colors disabled:opacity-50"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>

            <div className="space-y-6">
                <AnimatePresence initial={false}>
                    {comments.map((comment, i) => (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group"
                        >
                            <div className="flex gap-4">
                                <div className="p-2 bg-gold/10 rounded-sm h-fit">
                                    <User className="w-4 h-4 text-gold" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-ivory/80">{comment.author}</span>
                                        <div className="flex items-center gap-1 text-[10px] text-ivory/40">
                                            <Clock className="w-3 h-3" />
                                            {comment.timestamp}
                                        </div>
                                    </div>
                                    <p className="text-sm text-ivory/60 leading-relaxed font-light">
                                        {comment.text}
                                    </p>
                                </div>
                            </div>
                            {i < comments.length - 1 && (
                                <div className="ml-12 mt-6 h-px bg-gold/5" />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
