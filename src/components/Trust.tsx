import { motion } from 'motion/react';
import { Star, ShieldCheck, Award, MessageSquareQuote } from 'lucide-react';

export default function Trust() {
  const testimonials = [
    {
      author: "Mendel S.",
      quote: "Finally a provider that respects our community values without sacrificing network speed.",
      role: "Business Owner"
    },
    {
      author: "Rivka L.",
      quote: "The guided setup for my children's phones was so intuitive. Peace of mind from day one.",
      role: "Parent of 4"
    }
  ];

  return (
    <section className="py-24 bg-primary-navy text-white overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-turquoise rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-teal rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-brand-turquoise text-xs font-bold tracking-widest uppercase mb-6">
              <ShieldCheck size={16} /> Verified Security
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-white">
              Connectivity you can <span className="text-brand-turquoise">trust</span> with your family.
            </h2>
            <p className="text-lg text-slate-300 mb-12 font-light leading-relaxed">
              We aren't just another carrier. We are a community-focused platform dedicated to providing safe, reliable, and premium wireless experiences.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="text-4xl font-bold">50k+</div>
                <div className="text-slate-400 text-sm tracking-widest uppercase font-semibold">Active Lines</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">4.9/5</div>
                <div className="text-slate-400 text-sm tracking-widest uppercase font-semibold">Support Rating</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-4 text-brand-turquoise">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-xl font-light italic text-slate-200 mb-6 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-brand-turquoise">
                    {t.author[0]}
                   </div>
                   <div>
                    <div className="font-bold">{t.author}</div>
                    <div className="text-sm text-slate-400">{t.role}</div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
