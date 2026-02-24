import React from 'react';
import { ChecklistItem } from '../types';
import { CheckCircle2, Circle, ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ChecklistProps {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  selectedId: string;
}

export const Checklist: React.FC<ChecklistProps> = ({ items, onToggle, onSelect, selectedId }) => {
  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => onSelect(item.id)}
          className={cn(
            "group cursor-pointer border-l-2 p-4 transition-all duration-300",
            selectedId === item.id 
              ? "bg-gold/5 border-gold shadow-[0_0_20px_rgba(200,169,81,0.05)]" 
              : "bg-charcoal/30 border-transparent hover:bg-charcoal/50 hover:border-gold/30"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(item.id);
                }}
                className="mt-1 text-gold/60 hover:text-gold transition-colors"
              >
                {item.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/60 mb-1 block">
                  {item.category}
                </span>
                <h3 className={cn(
                  "text-sm font-semibold tracking-tight transition-colors",
                  item.status === 'completed' ? "text-ivory/40 line-through" : "text-ivory"
                )}>
                  {item.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.subItems.map((sub) => (
                    <span 
                      key={sub} 
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 transition-colors",
                        sub === 'Sales Funnel Optimization' 
                          ? "bg-gold/20 text-gold border-gold/30 font-bold" 
                          : "bg-ivory/5 text-ivory/50 border-ivory/10"
                      )}
                    >
                      {sub === 'Sales Funnel Optimization' && <Star className="w-2.5 h-2.5 fill-gold" />}
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <ChevronRight className={cn(
              "w-4 h-4 text-gold/40 transition-transform duration-300",
              selectedId === item.id ? "translate-x-1 text-gold" : ""
            )} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
