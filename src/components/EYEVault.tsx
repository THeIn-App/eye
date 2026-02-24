import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Play, FileText, ChevronRight, Lock } from 'lucide-react';
import { EYE_VAULT_ARTICLES } from '../constants';
import { VaultArticle } from '../types';
import { VaultArticleViewer } from './VaultArticleViewer';
import { cn } from '../lib/utils';

export const EYEVault: React.FC = () => {
    const [selectedArticle, setSelectedArticle] = useState<VaultArticle | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const categories = ['All', ...new Set(EYE_VAULT_ARTICLES.map(a => a.category))];

    const filteredArticles = EYE_VAULT_ARTICLES.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    if (selectedArticle) {
        return <VaultArticleViewer article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
    }

    return (
        <div className="space-y-12">
            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" />
                    <input
                        type="text"
                        placeholder="Search discoveries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-charcoal/30 border border-gold/10 rounded-sm py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold/30 transition-colors"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-4 py-2 rounded-sm text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap",
                                activeCategory === cat ? "bg-gold text-obsidian font-bold" : "bg-charcoal/50 text-ivory/40 border border-gold/5 hover:border-gold/20"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredArticles.map((article, i) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => setSelectedArticle(article)}
                            className="group cursor-pointer glass-panel p-6 space-y-6 hover:border-gold/40 transition-all duration-500 overflow-hidden relative"
                        >
                            {/* Media Preview Box */}
                            <div className="aspect-video bg-obsidian rounded-sm mb-6 flex items-center justify-center relative overflow-hidden">
                                {article.contentType === 'video' ? (
                                    <>
                                        <Play className="w-10 h-10 text-gold/40 group-hover:scale-110 transition-transform" />
                                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-obsidian/80 border border-gold/20 text-[8px] font-mono text-gold rounded-sm lowercase">
                                            .mp4
                                        </div>
                                    </>
                                ) : (
                                    <FileText className="w-10 h-10 text-gold/20" />
                                )}
                                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-mono text-gold uppercase tracking-[0.2em]">
                                        {article.category}
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-gold/20 group-hover:text-gold translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                                </div>
                                <h3 className="text-xl font-serif font-bold italic text-ivory group-hover:text-gold-warm transition-colors leading-tight">
                                    {article.title}
                                </h3>
                                <p className="text-xs text-ivory/40 leading-relaxed line-clamp-3 font-light">
                                    {article.contentType === 'text' ? article.content.replace(/[#*]/g, '').trim().substring(0, 150) : article.content}
                                </p>
                                <div className="pt-4 border-t border-gold/5 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-ivory/20">{article.date}</span>
                                    <div className="flex items-center gap-1 text-[10px] font-mono text-gold/40">
                                        <Lock className="w-3 h-3" />
                                        Proprietary
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredArticles.length === 0 && (
                <div className="py-24 text-center space-y-4">
                    <div className="w-16 h-16 bg-charcoal/50 border border-dashed border-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-6 h-6 text-gold/20" />
                    </div>
                    <h3 className="text-xl font-serif italic text-ivory/60">No discoveries found</h3>
                    <p className="text-sm text-ivory/20">Refine your strategic search query</p>
                </div>
            )}
        </div>
    );
};
