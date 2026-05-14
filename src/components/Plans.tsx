import { motion } from 'motion/react';
import { Check, Info } from 'lucide-react';

const PLANS = [
  {
    name: 'Quiet Essential',
    price: 30,
    features: ['5GB High-Speed Data', 'Unlimited Talk & Text', 'Carrier Selection', 'Standard Support'],
    tag: null,
    color: 'border-slate-100'
  },
  {
    name: 'Simply Connected',
    price: 45,
    features: ['15GB High-Speed Data', 'Unlimited Talk & Text', 'Priority Networks', 'Premium Support', 'International Texting'],
    tag: 'Most Popular',
    color: 'border-brand-teal'
  },
  {
    name: 'Infinite Calm',
    price: 65,
    features: ['Unlimited High-Speed Data', 'Hotspot Included (10GB)', 'Multi-Carrier Access', 'White-Glove Support', 'Roam Anywhere'],
    tag: 'Premium Choice',
    color: 'border-slate-100'
  }
];

export default function Plans() {
  return (
    <section id="plans" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <span className="text-xs font-bold text-brand-teal tracking-[0.3em] uppercase mb-4 block">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-bold">Simple, honest plans.</h2>
          </div>
          <p className="text-slate-500 max-w-sm text-lg font-light">
            No messy contracts. No fine print. Switch or cancel anytime with a single tap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative p-10 rounded-[2.5rem] border-2 flex flex-col items-start ${plan.color} bg-white premium-shadow transition-transform hover:-translate-y-2`}
            >
              {plan.tag && (
                <div className="absolute -top-4 left-10 px-4 py-1.5 rounded-full bg-brand-teal text-white text-[10px] font-bold tracking-[0.1em] uppercase">
                  {plan.tag}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-primary-navy">${plan.price}</span>
                  <span className="text-slate-400 font-medium">/month</span>
                </div>
              </div>

              <div className="w-full space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-full font-bold transition-all ${
                plan.tag 
                  ? 'bg-brand-teal text-white hover:bg-teal-700 shadow-lg shadow-teal-100' 
                  : 'bg-primary-navy text-white hover:bg-slate-800'
              }`}>
                Choose {plan.name}
              </button>
              
              <div className="mt-6 flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest mx-auto">
                <Info size={12} /> plus local taxes and fees
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="w-full h-full bg-[radial-gradient(circle,theme(colors.brand-teal)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </section>
  );
}
