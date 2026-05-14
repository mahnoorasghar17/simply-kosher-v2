import { motion } from 'motion/react';
import { ShoppingBag, CreditCard, Truck, Smartphone, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { icon: ShoppingBag, label: 'Choose Plan' },
  { icon: CreditCard, label: 'Checkout' },
  { icon: Truck, label: 'SIM Delivery' },
  { icon: Smartphone, label: 'Activation' },
];

export default function ActivationPreview() {
  return (
    <section className="py-24 bg-muted-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-brand-teal tracking-[0.3em] uppercase mb-4 block">Experience</span>
          <h2 className="text-4xl font-bold mb-6">Effortless activation.</h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Our modern onboarding keeps you informed at every single step. No confusion, just connection.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] premium-shadow overflow-hidden p-8 md:p-12 relative">
          <div className="absolute top-0 right-0 p-8">
             <div className="text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-tighter">Live Tracker</div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 mb-16 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-7 left-10 right-10 h-0.5 bg-slate-100 z-0" />
            
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isCurrent = i === 2;
              const isPast = i < 2;
              
              return (
                <div key={step.label} className="flex md:flex-col items-center gap-4 md:gap-4 relative z-10 flex-1">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    isCurrent ? 'bg-brand-teal text-white shadow-lg shadow-teal-100 scale-110' : 
                    isPast ? 'bg-emerald-100 text-emerald-600 border-2 border-white' : 
                    'bg-slate-50 text-slate-300'
                  }`}>
                    {isPast ? <CheckCircle2 size={24} /> : <Icon size={24} />}
                  </div>
                  <span className={`text-sm font-bold ${isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-slate-50 border border-slate-100"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                <Truck size={40} className="text-brand-teal" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <div className="text-xs font-bold text-brand-teal uppercase mb-1">Coming to you</div>
                <h3 className="text-xl font-bold mb-1">Your SIM kit is on the way!</h3>
                <p className="text-sm text-slate-500">Estimated delivery: Tomorrow by 5:00 PM</p>
              </div>
              <button className="bg-primary-navy text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                Track Order
              </button>
            </div>
          </motion.div>
          
          <div className="mt-12 text-center">
            <button className="text-brand-teal font-bold text-sm tracking-widest uppercase hover:underline underline-offset-8">
              Explore Our Activation Guide
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
