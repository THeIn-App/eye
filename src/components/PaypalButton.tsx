import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { SubscriptionLevel } from '../types';
import { SUBSCRIPTION_TIERS } from '../constants';
import { Loader2, AlertCircle } from 'lucide-react';

interface PaypalButtonProps {
    level: SubscriptionLevel;
    onSuccess: (level: SubscriptionLevel) => void;
    price: string;
}

export const PaypalButton: React.FC<PaypalButtonProps> = ({ level, onSuccess, price }) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const tier = SUBSCRIPTION_TIERS.find(t => t.id === level);

    if (level === 'trial') return null;

    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            {isPending && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 glass-panel">
                    <Loader2 className="w-8 h-8 text-gold animate-spin" />
                    <p className="text-sm font-mono text-gold uppercase tracking-widest">Initializing Secure Payment...</p>
                </div>
            )}

            {!isPending && tier && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-6 p-4 bg-gold/5 border border-gold/20 rounded-sm flex items-start gap-4">
                        <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-ivory">Subscription Terms</p>
                            <p className="text-[10px] text-ivory/60 leading-relaxed uppercase tracking-wider">
                                You are subscribing to the {tier.name} plan at {price}. Your access will be activated immediately upon successful verification.
                            </p>
                        </div>
                    </div>

                    <PayPalButtons
                        style={{
                            layout: 'vertical',
                            color: 'gold',
                            shape: 'rect',
                            label: 'subscribe'
                        }}
                        createSubscription={(data, actions) => {
                            return actions.subscription.create({
                                plan_id: tier.paypalPlanId
                            });
                        }}
                        onApprove={async (data, actions) => {
                            // In production, you would typically verify the subscription on your backend
                            onSuccess(level);
                        }}
                        onError={(err) => {
                            console.error("PayPal Subscription Error:", err);
                        }}
                    />
                </div>
            )}
        </div>
    );
};
