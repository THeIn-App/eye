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
        <div className="space-y-12 pb-24">
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
                    <div className="glass-panel overflow-hidden group">
                        {article.contentType === 'video' ? (
                            <div className="aspect-video relative bg-obsidian flex items-center justify-center">
                                <video
                                    controls
                                    className="w-full h-full object-cover"
                                    poster="/vault-video-placeholder.jpg"
                                >
                                    <source src={article.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
                            </div>
                        ) : (
                            <div className="aspect-[21/9] bg-gradient-to-br from-gold/20 via-gold/5 to-transparent flex items-center justify-center">
                                <FileText className="w-16 h-16 text-gold/20" />
                            </div>
                        )}
                    </div>

                    {/* Article Body */}
                    <div className="prose prose-invert prose-gold max-w-none">
                        <div className="text-ivory/80 leading-relaxed space-y-6">
                            <ReactMarkdown
                                components={{
                                    h3: ({ node, ...props }) => <h3 className="text-xl font-serif font-bold italic text-gold mt-8 mb-4" {...props} />,
                                    p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4" {...props} />,
                                    li: ({ node, ...props }) => <li className="text-sm list-item" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="text-gold" {...props} />
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
                    <div className="p-8 bg-gold/5 border border-gold/20 rounded-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles className="w-16 h-16 text-gold" />
                        </div>
                        <h4 className="font-serif font-bold italic text-gold text-xl mb-4">EYE's Private Note</h4>
                        <p className="text-sm text-ivory/70 leading-relaxed italic">
                            "{article.expertNote}"
                        </p>
                    </div>

                    {/* Dedicated Inquiry Integration */}
                    <div className="space-y-4">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold pl-1">Guided Q&A</h4>
                        <DedicatedInquiry articleTitle={article.title} context={article.content} />
                    </div>
                </div>
            </div>
        </div>
    );
};
