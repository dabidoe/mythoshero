import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Journeyman',
    price: '$0',
    description: 'Perfect for casual players starting their quest.',
    features: ['5 Forges / Month', 'Standard Resolution', 'Standard Support', 'Public Asset Gallery'],
    icon: <Shield className="text-gray-400" />,
    button: 'Start Free',
    popular: false
  },
  {
    name: 'Hero',
    price: '$19',
    description: 'The sweet spot for active GMs and world builders.',
    features: ['Unlimited Forges', '4K Resolution Assets', 'VTT Export Integration', 'Private Asset Vault', 'Priority Support'],
    icon: <Zap className="text-cyan-400" />,
    button: 'Forge Your Hero',
    popular: true
  },
  {
    name: 'Legend',
    price: '$49',
    description: 'For professional creators and publishing studios.',
    features: ['Batch Forging', '8K Cinematic Exports', 'Custom Model Training', 'API Access', 'White-Label Branding'],
    icon: <Crown className="text-yellow-500" />,
    button: 'Become a Legend',
    popular: false
  }
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tighter">
            Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">path.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transparent pricing for individuals and teams. No hidden costs, just raw creative power.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative group p-8 rounded-3xl border transition-all duration-500 ${
                plan.popular ? 'bg-white/[0.03] border-cyan-500/50 shadow-[0_0_40px_rgba(34,211,238,0.1)]' : 'bg-white/[0.02] border-white/5 hover:border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check size={16} className="text-cyan-500 shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 transform active:scale-95 ${
                plan.popular 
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20' 
                : 'bg-white/5 hover:bg-white/10 text-white'
              }`}>
                {plan.button}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm">
            Looking for an enterprise solution? <a href="#" className="text-cyan-500 hover:underline">Contact our forge masters</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;