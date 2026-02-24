import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Shield, Crown } from 'lucide-react';
import { SUBSCRIPTION_TIERS } from '../constants';
import { SubscriptionLevel } from '../types';
import { cn } from '../lib/utils';

interface PricingTiersProps {
    onSelect: (level: SubscriptionLevel) => void;
    currentLevel?: SubscriptionLevel;
}

export const PricingTiers: React.FC<PricingTiersProps> = ({ onSelect, currentLevel }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto py-12">
            {SUBSCRIPTION_TIERS.map((tier, i) => (
                <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                        "relative flex flex-col p-8 rounded-sm border transition-all duration-300",
                        tier.id === 'professional'
                            ? "bg-gold/10 border-gold/40 scale-105 shadow-[0_0_30px_rgba(200,169,81,0.1)]"
                            : "bg-charcoal/30 border-gold/10 hover:border-gold/30"
                    )}
                >
                    {tier.id === 'professional' && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-obsidian text-[10px] font-bold uppercase tracking-widest rounded-full">
                            Most Popular
                        </div>
                    )}

                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gold/10 rounded-sm">
                                {tier.id === 'trial' && <Zap className="w-5 h-5 text-gold" />}
                                {tier.id === 'professional' && <Shield className="w-5 h-5 text-gold" />}
                                {tier.id === 'enterprise' && <Crown className="w-5 h-5 text-gold" />}
                            </div>
                            <h3 className="text-xl font-serif font-bold italic tracking-tight">{tier.name}</h3>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-ivory">{tier.price}</span>
                            {tier.id !== 'trial' && <span className="text-ivory/40 text-sm">/month</span>}
                        </div>
                        <p className="mt-4 text-sm text-ivory/60 leading-relaxed">
                            {tier.description}
                        </p>
                    </div>

                    <ul className="flex-1 space-y-4 mb-8">
                        {tier.features.map((feature, j) => (
                            <li key={j} className="flex items-start gap-3 text-xs text-ivory/80">
                                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => onSelect(tier.id)}
                        disabled={currentLevel === tier.id}
                        className={cn(
                            "w-full py-4 rounded-sm font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300",
                            currentLevel === tier.id
                                ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 cursor-default"
                                : tier.id === 'professional'
                                    ? "bg-gold text-obsidian hover:bg-gold-warm"
                                    : "border border-gold/40 text-gold hover:bg-gold/10"
                        )}
                    >
                        {currentLevel === tier.id ? 'Active Plan' : tier.id === 'trial' ? 'Get Started' : 'Subscribe Now'}
                    </button>
                </motion.div>
            ))}
        </div>
    );
};
