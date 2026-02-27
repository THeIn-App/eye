import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, X, FileText, Film, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { VaultArticle } from '../types';
import { cn } from '../lib/utils';

interface VaultUploaderProps {
    onUpload: (article: VaultArticle) => void;
    onCancel: () => void;
}

export const VaultUploader: React.FC<VaultUploaderProps> = ({ onUpload, onCancel }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General Insight');
    const [content, setContent] = useState('');
    const [expertNote, setExpertNote] = useState('');
    const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [mediaPreview, setMediaPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (1GB limit)
        if (file.size > 1024 * 1024 * 1024) {
            alert("File size exceeds 1GB limit.");
            return;
        }

        setMediaFile(file);
        const isVideo = file.type.startsWith('video/');
        setMediaType(isVideo ? 'video' : 'image');

        const reader = new FileReader();
        reader.onloadend = () => {
            setMediaPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;

        setIsUploading(true);

        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
            setUploadProgress(i);
            await new Promise(r => setTimeout(r, 200));
        }

        const newArticle: VaultArticle = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            category,
            expertNote: expertNote || "Direct from EYE's strategic core.",
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            contentType: mediaType === 'video' ? 'video' : 'text',
            content,
            imageUrl: mediaType === 'image' ? mediaPreview || undefined : undefined,
            videoUrl: mediaType === 'video' ? mediaPreview || undefined : undefined,
            comments: []
        };

        onUpload(newArticle);
        setIsUploading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto glass-panel p-8 space-y-8"
        >
            <div className="flex justify-between items-center border-b border-gold/10 pb-6">
                <div>
                    <h2 className="text-2xl font-serif font-bold italic text-ivory">Post New Strategic Insight</h2>
                    <p className="text-xs text-gold/60 font-mono uppercase tracking-widest mt-1">Vault Contribution Portal</p>
                </div>
                <button
                    onClick={onCancel}
                    className="p-2 hover:bg-gold/10 rounded-sm text-gold/40 hover:text-gold transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gold uppercase tracking-[0.2em]">Article Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a dominant headline..."
                            className="w-full bg-charcoal/50 border border-gold/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold/50 text-ivory"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gold uppercase tracking-[0.2em]">Strategy Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-charcoal/50 border border-gold/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold/50 text-ivory"
                        >
                            <option>Industrial Scale</option>
                            <option>SME Operations</option>
                            <option>Market Analysis</option>
                            <option>Financial Strategy</option>
                            <option>General Insight</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gold uppercase tracking-[0.2em]">Strategic Content (Markdown Support)</label>
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={8}
                            placeholder="Document the discovery node..."
                            className="w-full bg-charcoal/50 border border-gold/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold/50 text-ivory resize-none"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gold uppercase tracking-[0.2em]">Expert Note</label>
                        <input
                            type="text"
                            value={expertNote}
                            onChange={(e) => setExpertNote(e.target.value)}
                            placeholder="Add a private expert nuance..."
                            className="w-full bg-charcoal/50 border border-gold/20 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold/50 text-ivory italic"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gold uppercase tracking-[0.2em]">Media Asset (Images/Videos up to 1GB)</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "aspect-video rounded-sm border border-dashed border-gold/20 flex flex-col items-center justify-center cursor-pointer transition-all group overflow-hidden relative",
                                mediaPreview ? "bg-obsidian border-solid" : "bg-charcoal/30 hover:bg-gold/5 hover:border-gold/40"
                            )}
                        >
                            {mediaPreview ? (
                                mediaType === 'video' ? (
                                    <video src={mediaPreview} className="w-full h-full object-cover opacity-50" />
                                ) : (
                                    <img src={mediaPreview} alt="Preview" className="w-full h-full object-cover opacity-50" />
                                )
                            ) : (
                                <>
                                    <div className="p-4 bg-gold/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="w-6 h-6 text-gold" />
                                    </div>
                                    <p className="text-xs text-ivory/60">Drag & drop or Click to import</p>
                                    <p className="text-[9px] text-ivory/20 uppercase tracking-widest mt-2">.MP4, .JPG, .PNG</p>
                                </>
                            )}

                            {mediaPreview && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-obsidian/40 backdrop-blur-[2px]">
                                    {mediaType === 'video' ? <Film className="w-8 h-8 text-gold mb-2" /> : <ImageIcon className="w-8 h-8 text-gold mb-2" />}
                                    <p className="text-[10px] font-mono text-gold uppercase tracking-widest">{mediaFile?.name}</p>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setMediaPreview(null); setMediaFile(null); }}
                                        className="mt-4 text-[9px] text-rust-accent uppercase tracking-widest hover:underline"
                                    >
                                        Remove Asset
                                    </button>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="video/*,image/*"
                            className="hidden"
                        />
                    </div>

                    {isUploading ? (
                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 text-gold animate-spin" />
                                    <span className="text-[10px] font-mono text-gold uppercase tracking-widest">Broadcasting Node...</span>
                                </div>
                                <span className="text-[10px] font-mono text-gold">{uploadProgress}%</span>
                            </div>
                            <div className="h-1 bg-gold/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gold"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            disabled={!title || !content}
                            className="w-full py-4 bg-gold text-obsidian font-bold text-xs uppercase tracking-[0.3em] rounded-sm hover:bg-gold-warm transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-[0_0_20px_rgba(200,169,81,0.2)]"
                        >
                            Commit Insight to Vault
                        </button>
                    )}
                </div>
            </form>

            <div className="pt-6 border-t border-gold/10 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-gold/40 shrink-0 mt-0.5" />
                <p className="text-[9px] text-ivory/30 leading-relaxed uppercase tracking-wider">
                    All contributions are subject to EYE's strategic verification. Large file imports (.mp4) may take a moment to synchronize with the industrial distribution hub.
                </p>
            </div>
        </motion.div>
    );
};
