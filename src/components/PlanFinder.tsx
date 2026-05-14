import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Smartphone, 
  Database, 
  Wifi, 
  ShieldCheck, 
  Check, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';

interface Step {
  id: string;
  question: string;
  description: string;
  options: {
    id: string;
    label: string;
    description?: string;
    icon?: any;
    value: any;
  }[];
}

const STEPS: Step[] = [
  {
    id: 'lines',
    question: 'How many lines do you need?',
    description: 'We offer specialized discounts for multiple lines.',
    options: [
      { id: '1', label: 'Just 1 Line', value: 1, icon: Users },
      { id: '2', label: '2-3 Lines', value: 3, icon: Users },
      { id: '5', label: '4+ Lines', value: 5, icon: Users },
    ]
  },
  {
    id: 'device',
    question: 'Do you need a new device?',
    description: 'We support all major devices and specialized filtered options.',
    options: [
      { id: 'byod', label: 'Bring My Own Phone', description: 'BYOD is fast and simple', value: 'byod', icon: Smartphone },
      { id: 'new', label: 'Buy Monthly', description: 'Premium latest devices', value: 'new', icon: Smartphone },
      { id: 'kosher', label: 'Kosher Device', description: 'Filtered for peace of mind', value: 'kosher', icon: ShieldCheck },
    ]
  },
  {
    id: 'data',
    question: 'Estimated data usage?',
    description: 'Per line monthly estimation.',
    options: [
      { id: 'light', label: 'Light', description: 'Talk & Text mainly', value: 'light', icon: Database },
      { id: 'medium', label: 'Moderate', description: '5GB - 15GB of 5G', value: 'medium', icon: Database },
      { id: 'unlimited', label: 'Unlimited', description: 'Full speed 5G data', value: 'unlimited', icon: Database },
    ]
  }
];

export default function PlanFinder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [completed, setCompleted] = useState(false);

  const handleSelect = (stepId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [stepId]: value }));
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setCompleted(false);
  };

  return (
    <section id="plan-finder" className="py-24 bg-muted-bg">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Find Your Perfect Plan.</h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Answer a few quick questions to see which premium wireless plan fits your lifestyle.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] premium-shadow min-h-[500px] overflow-hidden flex flex-col">
          {/* Progress Indicator */}
          {!completed && (
            <div className="h-1 bg-slate-100 w-full">
              <motion.div 
                className="h-full bg-brand-teal"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          )}

          <div className="p-8 md:p-12 flex-grow flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {!completed ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full max-w-xl text-center"
                >
                  <span className="text-xs font-bold text-brand-teal tracking-widest uppercase mb-4 block">
                    Step {currentStep + 1} of {STEPS.length}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{STEPS[currentStep].question}</h3>
                  <p className="text-slate-500 mb-10">{STEPS[currentStep].description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {STEPS[currentStep].options.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelect(STEPS[currentStep].id, option.value)}
                          className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-4 hover:border-brand-teal/40 group ${
                            answers[STEPS[currentStep].id] === option.value 
                              ? 'border-brand-teal bg-brand-teal/5' 
                              : 'border-slate-100 bg-white'
                          }`}
                        >
                          <div className={`p-3 rounded-xl transition-colors ${
                            answers[STEPS[currentStep].id] === option.value 
                              ? 'bg-brand-teal text-white' 
                              : 'bg-slate-50 text-slate-400 group-hover:text-brand-teal'
                          }`}>
                            <Icon size={24} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800">{option.label}</div>
                            {option.description && (
                              <div className="text-xs text-slate-400 mt-1">{option.description}</div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="mt-12 flex items-center justify-between">
                    <button 
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      className="text-sm font-medium text-slate-400 hover:text-slate-600 disabled:opacity-0 flex items-center gap-1"
                    >
                      <ChevronLeft size={16} /> Previous
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                    <Check size={32} strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">You're All Set!</h3>
                  <p className="text-slate-500 mb-10 max-w-md mx-auto">
                    Based on your needs for {answers.lines} line(s) and {answers.data} usage, we recommend our <span className="text-slate-900 font-bold underline decoration-brand-teal decoration-2">Premium Connect Plan</span>.
                  </p>
                  
                  <div className="max-w-md mx-auto p-6 rounded-2xl border border-slate-100 bg-slate-50/50 text-left mb-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Recommended</div>
                        <div className="text-xl font-bold text-primary-navy">Premium Connect</div>
                      </div>
                      <div className="text-2xl font-bold text-brand-teal">$45<span className="text-xs text-slate-400">/mo</span></div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <Check size={16} className="text-brand-teal" /> 15GB High Speed 5G Data
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <Check size={16} className="text-brand-teal" /> Unlimited Talk & Text
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <Check size={16} className="text-brand-teal" /> Priority Customer Support
                      </li>
                    </ul>
                    <button className="w-full bg-primary-navy text-white h-12 rounded-xl font-medium hover:bg-slate-800 transition-colors">
                      Activate Plan
                    </button>
                  </div>

                  <button 
                    onClick={reset}
                    className="text-sm font-medium text-slate-400 hover:text-slate-600"
                  >
                    Start over
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
