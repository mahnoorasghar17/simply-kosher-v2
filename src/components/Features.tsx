import { motion } from 'motion/react';
import { 
  Users, 
  MapPin, 
  Tag, 
  HeartHandshake, 
  Zap, 
  Globe 
} from 'lucide-react';

const FEATURES = [
  {
    title: 'Family-Focused',
    description: 'Shared controls and flexible billing designed for modern families.',
    icon: Users,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Nationwide Reliability',
    description: 'Crystal clear voice and high-speed data on the most trusted networks.',
    icon: MapPin,
    color: 'bg-teal-50 text-teal-600'
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden taxes, fees, or surprise data overage charges. Ever.',
    icon: Tag,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: 'Community Driven',
    description: 'Support that understands your values and speaks your language.',
    icon: HeartHandshake,
    color: 'bg-rose-50 text-rose-600'
  },
  {
    title: 'Simple Activation',
    description: 'From order to active in minutes with eSIM or fast shipping.',
    icon: Zap,
    color: 'bg-amber-50 text-amber-600'
  },
  {
    title: 'Multiple Carriers',
    description: 'Pick the carrier that has the best signal in your specific area.',
    icon: Globe,
    color: 'bg-emerald-50 text-emerald-600'
  }
];

export default function Features() {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-brand-teal tracking-[0.3em] uppercase mb-4 block">Difference</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for what matters.</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg font-light">
            We've stripped away the noise of traditional telecom to focus on premium service, reliable coverage, and community trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-[2rem] border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-xl hover:border-white transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
