import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Play, FileText, Calendar, Sparkles, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { VaultArticle, VaultComment } from '../types';
import { CommentSection } from './CommentSection';
import { DedicatedInquiry } from './DedicatedInquiry';
import { cn } from '../lib/utils';

interface VaultArticleViewerProps {
    article: VaultArticle;
    onBack: () => void;
}

export const VaultArticleViewer: React.FC<VaultArticleViewerProps> = ({ article, onBack }) => {
    const [comments, setComments] = useState<VaultComment[]>(article.comments);

    const handleAddComment = (text: string) => {
        const newComment: VaultComment = {
            id: Math.random().toString(36).substr(2, 9),
            author: 'Elite Member',
            timestamp: 'Just now',
            text
        };
        setComments([newComment, ...comments]);
    };

    return (
        <div className="space-y-12 pb-24 animate-in fade-in duration-700">
            {/* Header Navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gold hover:text-gold-warm transition-colors group"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Back to Vault</span>
                </button>
                <div className="flex gap-4">
                    <button title="Share insight" className="p-2 glass-panel hover:bg-gold/10 rounded-sm transition-colors">
                        <Share2 className="w-4 h-4 text-gold" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Article Header */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-[9px] font-mono text-gold uppercase tracking-[0.2em] rounded-sm">
                                {article.category}
                            </span>
                            <div className="flex items-center gap-2 text-ivory/40 text-[9px] font-mono uppercase tracking-widest">
                                <Calendar className="w-3 h-3" />
                                {article.date}
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold italic text-ivory leading-tight">
                            {article.title}
                        </h1>
                    </div>

                    {/* Media Section */}
                    <div className="space-y-8">
                        {article.videoUrl && (
                            <div className="glass-panel overflow-hidden group shadow-[0_0_50px_rgba(200,169,81,0.05)]">
                                <div className="aspect-video relative bg-obsidian flex items-center justify-center">
                                    <video
                                        controls
                                        className="w-full h-full object-cover"
                                    >
                                        <source src={article.videoUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-obsidian/80 backdrop-blur-md border border-gold/20 text-[9px] font-mono text-gold rounded-sm uppercase tracking-widest">
                                        Vlog Content
                                    </div>
                                </div>
                            </div>
                        )}

                        {article.imageUrl && (
                            <div className="glass-panel overflow-hidden group aspect-[21/9] relative shadow-[0_0_50px_rgba(200,169,81,0.05)]">
                                <img
                                    src={article.imageUrl}
                                    className="w-full h-full object-cover"
                                    alt={article.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                    <div className="p-1.5 bg-gold/20 backdrop-blur-md border border-gold/20 rounded-sm">
                                        <FileText className="w-3 h-3 text-gold" />
                                    </div>
                                    <span className="text-[10px] font-mono text-gold uppercase tracking-widest">Visual Asset Evidence</span>
                                </div>
                            </div>
                        )}

                        {!article.videoUrl && !article.imageUrl && (
                            <div className="glass-panel aspect-[21/9] bg-gradient-to-br from-gold/10 via-charcoal to-transparent flex flex-col items-center justify-center gap-4 border border-dashed border-gold/20">
                                <FileText className="w-12 h-12 text-gold/20" />
                                <p className="text-[10px] font-mono text-gold/40 uppercase tracking-widest">Proprietary Textual Discovery</p>
                            </div>
                        )}
                    </div>

                    {/* Article Body */}
                    <div className="prose prose-invert prose-gold max-w-none">
                        <div className="text-ivory/80 leading-relaxed space-y-6">
                            <ReactMarkdown
                                components={{
                                    h3: ({ node, ...props }) => <h3 className="text-2xl font-serif font-bold italic text-gold mt-12 mb-6" {...props} />,
                                    p: ({ node, ...props }) => <p className="mb-6 text-base" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-4 space-y-3 mb-6" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-4 space-y-3 mb-6" {...props} />,
                                    li: ({ node, ...props }) => <li className="text-sm list-item text-ivory/70" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="text-gold font-bold" {...props} />,
                                    blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-gold/40 pl-6 italic text-ivory/50 my-8" {...props} />
                                }}
                            >
                                {article.content}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Comment Section Integration */}
                    <div className="pt-12 border-t border-gold/10">
                        <CommentSection comments={comments} onAddComment={handleAddComment} />
                    </div>
                </div>

                {/* Sidebar Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Expert Note Panel */}
                    <div className="p-8 bg-gold/5 border border-gold/20 rounded-sm relative overflow-hidden group hover:bg-gold/10 transition-colors duration-500 shadow-xl">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles className="w-16 h-16 text-gold" />
                        </div>
                        <h4 className="font-serif font-bold italic text-gold text-xl mb-4">EYE's Private Note</h4>
                        <p className="text-sm text-ivory/70 leading-relaxed italic">
                            "{article.expertNote}"
                        </p>
                    </div>

                    {/* Dedicated Inquiry Integration */}
                    <div className="space-y-4 sticky top-24">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold pl-1">Guided Q&A</h4>
                        <DedicatedInquiry articleTitle={article.title} context={article.content} />
                    </div>
                </div>
            </div>
        </div>
    );
};
