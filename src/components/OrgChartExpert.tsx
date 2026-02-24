import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight, Briefcase, Info, X } from 'lucide-react';
import { OrgNode } from '../types';
import { cn } from '../lib/utils';

interface OrgChartExpertProps {
    data: OrgNode;
}

export const OrgChartExpert: React.FC<OrgChartExpertProps> = ({ data }) => {
    const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);

    const renderNode = (node: OrgNode, isRoot = false) => {
        return (
            <div key={node.role} className="flex flex-col items-center">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => node.jd && setSelectedNode(node)}
                    className={cn(
                        "relative p-4 rounded-sm border cursor-pointer transition-all duration-300 min-w-[180px] text-center",
                        isRoot ? "bg-gold text-obsidian border-gold" : "bg-charcoal/50 text-ivory border-gold/20 hover:border-gold/50",
                        node.jd && "ring-1 ring-gold/10"
                    )}
                >
                    <p className="text-[10px] font-mono uppercase tracking-widest opacity-60 mb-1">{node.department}</p>
                    <h5 className="text-sm font-bold tracking-tight">{node.role}</h5>
                    {node.jd && (
                        <div className="absolute -top-1 -right-1">
                            <div className="w-4 h-4 bg-gold rounded-full flex items-center justify-center animate-pulse">
                                <Info className="w-2.5 h-2.5 text-obsidian" />
                            </div>
                        </div>
                    )}
                </motion.div>

                {node.children && node.children.length > 0 && (
                    <div className="flex flex-col items-center">
                        <div className="w-px h-8 bg-gold/20" />
                        <div className="relative flex gap-8">
                            {/* Horizontal line connecting children */}
                            {node.children.length > 1 && (
                                <div className="absolute top-0 left-0 right-0 h-px bg-gold/20 mx-auto w-[calc(100%-180px)]" />
                            )}
                            {node.children.map((child) => (
                                <div key={child.role} className="flex flex-col items-center">
                                    <div className="w-px h-4 bg-gold/20" />
                                    {renderNode(child)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="relative overflow-x-auto pb-12 pt-8 flex justify-center min-h-[500px]">
            <div className="inline-block">
                {renderNode(data, true)}
            </div>

            {/* JD Modal Overlay */}
            <AnimatePresence>
                {selectedNode && selectedNode.jd && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-obsidian/80 backdrop-blur-sm flex items-center justify-center p-8"
                        onClick={() => setSelectedNode(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="max-w-xl w-full bg-charcoal border border-gold/30 p-8 rounded-sm shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="text-2xl font-serif font-bold italic text-gold">{selectedNode.role}</h4>
                                    <p className="text-xs font-mono uppercase tracking-widest text-ivory/40">{selectedNode.department}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedNode(null)}
                                    className="p-1 hover:bg-gold/10 rounded-full transition-colors"
                                    title="Close job description"
                                >
                                    <X className="w-6 h-6 text-gold" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h6 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold/60 mb-3 flex items-center gap-2">
                                        <Briefcase className="w-3 h-3" />
                                        Key Responsibilities
                                    </h6>
                                    <ul className="space-y-2">
                                        {selectedNode.jd.responsibilities.map((r, i) => (
                                            <li key={i} className="text-sm text-ivory/80 flex items-start gap-3">
                                                <span className="text-gold mt-1">•</span>
                                                {r}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h6 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold/60 mb-3 flex items-center gap-2">
                                        <Info className="w-3 h-3" />
                                        Requirements & Experience
                                    </h6>
                                    <ul className="space-y-2">
                                        {selectedNode.jd.requirements.map((req, i) => (
                                            <li key={i} className="text-sm text-ivory/80 flex items-start gap-3">
                                                <span className="text-gold mt-1">•</span>
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gold/10 text-center">
                                <p className="text-[10px] font-mono text-ivory/20 uppercase tracking-[0.3em]">
                                    Elite Certified Role Profile
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
