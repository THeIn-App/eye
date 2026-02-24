import React from 'react';
import { DiscussionContent } from '../types';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, BookOpen, ShieldAlert } from 'lucide-react';
import { MarketDataChart, SalesFunnelDiagram } from './Visuals';

interface DiscussionProps {
  discussion: DiscussionContent | undefined;
}

export const Discussion: React.FC<DiscussionProps> = ({ discussion }) => {
  if (!discussion) return (
    <div className="h-full flex items-center justify-center text-ivory/20 font-mono text-xs uppercase tracking-widest">
      Select a category to view strategic insights
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={discussion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8 pb-12"
      >
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-sm">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <h2 className="text-3xl font-serif font-bold italic text-ivory tracking-tight">
              {discussion.title}
            </h2>
          </div>
          <div className="h-px w-full bg-gradient-to-right from-gold/30 to-transparent" />
        </header>

        <div className="prose prose-invert prose-gold max-w-none">
          <div className="text-ivory/70 leading-relaxed text-lg">
            <ReactMarkdown
              components={{
                p: ({ children }) => {
                  const childrenArray = React.Children.toArray(children);
                  
                  if (childrenArray.some(child => typeof child === 'string' && child.includes('<MarketDataChart />'))) {
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="my-8 space-y-4"
                      >
                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-gold/60">Live Market Trend Visualization</h4>
                        <MarketDataChart />
                      </motion.div>
                    );
                  }

                  if (childrenArray.some(child => typeof child === 'string' && child.includes('<SalesFunnelDiagram />'))) {
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="my-8 space-y-4"
                      >
                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-gold/60">Sales Funnel Efficiency</h4>
                        <SalesFunnelDiagram />
                      </motion.div>
                    );
                  }

                  return <p className="mb-4">{children}</p>;
                }
              }}
            >
              {discussion.content}
            </ReactMarkdown>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-charcoal/50 border border-gold/10 p-6 rounded-sm space-y-4">
            <div className="flex items-center gap-2 text-gold">
              <AlertCircle className="w-4 h-4" />
              <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold">Case Study</h4>
            </div>
            <h5 className="text-ivory font-semibold">{discussion.caseStudy.title}</h5>
            <p className="text-sm text-ivory/60 leading-relaxed italic">
              "{discussion.caseStudy.description}"
            </p>
          </div>

          <div className="bg-rust-accent/5 border border-rust-accent/20 p-6 rounded-sm space-y-4">
            <div className="flex items-center gap-2 text-rust-accent">
              <ShieldAlert className="w-4 h-4" />
              <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold">Potential Pitfalls</h4>
            </div>
            <ul className="space-y-2">
              {discussion.pitfalls.map((pitfall, i) => (
                <li key={i} className="text-sm text-ivory/60 flex items-start gap-2">
                  <span className="text-rust-accent mt-1">•</span>
                  {pitfall}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};
