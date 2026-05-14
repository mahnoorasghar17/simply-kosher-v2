import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden mesh-bg">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-turquoise/10 text-brand-teal text-xs font-bold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            Nationwide Coverage Available
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 text-primary-navy">
            Wireless for the <br />
            <span className="text-brand-teal">Intentional</span> Lifestyle.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-light">
            Experience premium connectivity with zero noise. Guided plans, reliable networks, and a community that values what you do.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button className="w-full sm:w-auto bg-primary-navy text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2">
              Find Your Plan
              <ChevronRight size={20} />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-medium text-slate-600 hover:text-primary-navy transition-all flex items-center justify-center gap-2 underline-offset-4 hover:underline">
              Browse All Plans
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 grayscale opacity-50">
            <div className="text-sm font-semibold tracking-tighter">POWERED BY</div>
            <div className="flex gap-6 items-center">
              <span className="text-xl font-bold tracking-tighter">VERIZON</span>
              <span className="text-xl font-bold tracking-tighter">AT&T</span>
              <span className="text-xl font-bold tracking-tighter">T-MOBILE</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          {/* Abstract Connectivity Visual */}
          <div className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal via-primary-navy to-brand-turquoise opacity-20 transition-opacity group-hover:opacity-30" />
            
            {/* Minimal Phone Mock */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[120%] bg-white rounded-[2.5rem] shadow-2xl p-4 transform rotate-12 transition-transform group-hover:rotate-6 duration-700">
               <div className="w-full h-full rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center p-6 text-center gap-4">
                  <div className="w-12 h-1.5 rounded-full bg-slate-200" />
                  <div className="space-y-2 w-full mt-4">
                    <div className="h-6 w-3/4 mx-auto rounded-md bg-slate-100" />
                    <div className="h-4 w-1/2 mx-auto rounded-md bg-slate-100" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full mt-auto">
                    <div className="h-20 rounded-xl bg-brand-teal/5" />
                    <div className="h-20 rounded-xl bg-brand-teal/5" />
                  </div>
               </div>
            </div>
            
            {/* floating abstract circles */}
            <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-10 right-10 w-24 h-24 rounded-full bg-brand-turquoise/20 blur-xl" 
            />
            <motion.div 
               animate={{ y: [0, 20, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-brand-teal/10 blur-2xl" 
            />
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-slate-300 to-transparent" />
      </motion.div>
    </section>
  );
}
