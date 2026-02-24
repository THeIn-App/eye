import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { SubscriptionLevel } from '../types';
import { cn } from '../lib/utils';

interface PaypalButtonProps {
    level: SubscriptionLevel;
    onSuccess: (level: SubscriptionLevel) => void;
    price: string;
}

export const PaypalButton: React.FC<PaypalButtonProps> = ({ level, onSuccess, price }) => {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

    const handlePayment = () => {
        setStatus('processing');

        // Simulate PayPal transaction
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onSuccess(level);
            }, 1500);
        }, 2000);
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-emerald-400 gap-3">
                <CheckCircle2 className="w-12 h-12" />
                <p className="font-serif italic font-bold">Transaction Secured</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Redirecting to EYE Intelligence...</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <button
                onClick={handlePayment}
                disabled={status === 'processing'}
                className={cn(
                    "w-full flex items-center justify-center gap-3 py-4 rounded-sm transition-all duration-300",
                    "bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] font-bold"
                )}
            >
                {status === 'processing' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <div className="flex items-center gap-2">
                        <span className="italic text-xl">PayPal</span>
                        <span className="text-xs font-normal border-l border-[#003087]/20 pl-2">Pay {price}</span>
                    </div>
                )}
            </button>
            <p className="text-[10px] text-center text-ivory/40 uppercase tracking-widest">
                Secure checkout powered by PayPal
            </p>
        </div>
    );
};
