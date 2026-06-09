import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, ChevronRight, ChevronLeft, Check, CheckCircle2,
  Shield, Phone, Globe, Database, Zap, Lock,
  AlertCircle, Info, CreditCard, User, MapPin,
  PhoneCall, Signal, Wifi, ShieldCheck, PhoneIncoming,
  Star, RadioTower,
  type LucideIcon
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type Network = 'tmobile' | 'verizon' | 'att';
type ServiceType = 'talk-only' | 'talk-text';
type DataTier = 'none' | 'light' | 'medium' | 'heavy';

interface Plan {
  id: string;
  network: Network;
  name: string;
  price: number;
  serviceType: ServiceType;
  dataTier: DataTier;
  dataLabel: string;
  features: string[];
}

interface Answers {
  primaryGoal: string | null;
  protectionFeatures: string[];
  aiProvider: string | null;
  needsInternational: boolean | null;
  internationalScope: string | null;
  networkPreference: Network | null;
  serviceType: ServiceType | null;
  needsData: boolean | null;
  dataUsage: string | null;
  selectedPlan: Plan | null;
  transferNumber: boolean | null;
  portingInfo: {
    phoneNumber: string;
    carrier: string;
    accountName: string;
    accountAddress: string;
    accountNumber: string;
    portingPin: string;
    pinHasExpiry: boolean | null;
    pinExpiry: string;
    simNumber: string;
  };
  portingChecklist: string[];
  areaCode: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingZip: string;
    billingAddress: string;
    city: string;
    state: string;
    zip: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    couponCode: string;
    couponApplied: boolean;
    termsAccepted: boolean;
  };
}

export interface PlanWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Pricing Constants ─────────────────────────────────────────────────────────

const SIM_FEE = 0;
const ACTIVATION_FEE = 10.00;
const SHIPPING_FEE = 4.99;
const TAX_RATE = 0.08;
const REGULATORY_FEE = 1.99;
const COUPON_DISCOUNTS: Record<string, number> = { 'KOSHER10': 10, 'WELCOME5': 5 };

// ── Plan Catalog ──────────────────────────────────────────────────────────────

const PLANS: Plan[] = [
  // T-Mobile — AI Protection plans
  { id: 'tmo-talk', network: 'tmobile', name: 'Simply Talk', price: 15, serviceType: 'talk-only', dataTier: 'none', dataLabel: 'No Data', features: ['Unlimited Talk', 'AI Call Blocking', 'Wi-Fi Calling', 'Voicemail'] },
  { id: 'tmo-tt', network: 'tmobile', name: 'Talk & Text', price: 22, serviceType: 'talk-text', dataTier: 'none', dataLabel: 'No Data', features: ['Unlimited Talk & Text', 'AI Call & Text Blocking', 'Picture Messaging (MMS)', 'Wi-Fi Calling'] },
  { id: 'tmo-lite', network: 'tmobile', name: 'Lite Shield', price: 35, serviceType: 'talk-text', dataTier: 'light', dataLabel: '5GB Data', features: ['5GB High-Speed 5G', 'Unlimited Talk & Text', 'AI Call & Text Blocking', 'TAG/Vaad Provider Support', 'Waze, Zmanim & SmartLists'] },
  { id: 'tmo-plus', network: 'tmobile', name: 'Plus Shield', price: 45, serviceType: 'talk-text', dataTier: 'medium', dataLabel: '15GB Data', features: ['15GB High-Speed 5G', 'Unlimited Talk & Text', 'Full AI Protection Suite', 'Whitelisting & Blacklisting', 'TAG/Vaad Provider Support', 'All Approved Apps'] },
  { id: 'tmo-pro', network: 'tmobile', name: 'Pro Shield', price: 65, serviceType: 'talk-text', dataTier: 'heavy', dataLabel: 'Unlimited', features: ['Unlimited High-Speed 5G', 'Unlimited Talk & Text', 'Full AI Protection Suite', 'Whitelisting & Blacklisting', 'Mobile Hotspot', 'All Approved Apps'] },
  // Verizon — International plans
  { id: 'vrz-talk', network: 'verizon', name: 'Simply Talk', price: 18, serviceType: 'talk-only', dataTier: 'none', dataLabel: 'No Data', features: ['Unlimited Talk', 'Wi-Fi Calling', 'Voicemail'] },
  { id: 'vrz-tt', network: 'verizon', name: 'Talk & Text', price: 25, serviceType: 'talk-text', dataTier: 'none', dataLabel: 'No Data', features: ['Unlimited Talk & Text', 'Picture Messaging (MMS)', 'Wi-Fi Calling'] },
  { id: 'vrz-connect', network: 'verizon', name: 'Connect', price: 38, serviceType: 'talk-text', dataTier: 'light', dataLabel: '5GB Data', features: ['5GB High-Speed Data', 'Unlimited Talk & Text', 'Canada & Mexico Calling', 'Waze & Weather', 'Zmanim App'] },
  { id: 'vrz-global', network: 'verizon', name: 'Global Connect', price: 50, serviceType: 'talk-text', dataTier: 'medium', dataLabel: '15GB Data', features: ['15GB High-Speed Data', 'Unlimited Talk & Text', 'International Calling (190+ Countries)', 'Canada & Mexico Calling', 'Navigation & SmartLists'] },
  { id: 'vrz-elite', network: 'verizon', name: 'Global Elite', price: 70, serviceType: 'talk-text', dataTier: 'heavy', dataLabel: 'Unlimited', features: ['Unlimited High-Speed Data', 'Unlimited Talk & Text', 'International Calling (190+ Countries)', 'Mobile Hotspot', 'All Approved Apps'] },
  // AT&T
  { id: 'att-talk', network: 'att', name: 'Simply Talk', price: 16, serviceType: 'talk-only', dataTier: 'none', dataLabel: 'No Data', features: ['Unlimited Talk', 'Wi-Fi Calling', 'Voicemail'] },
  { id: 'att-tt', network: 'att', name: 'Talk & Text', price: 23, serviceType: 'talk-text', dataTier: 'none', dataLabel: 'No Data', features: ['Unlimited Talk & Text', 'Picture Messaging (MMS)', 'Wi-Fi Calling'] },
  { id: 'att-essentials', network: 'att', name: 'Essentials', price: 36, serviceType: 'talk-text', dataTier: 'light', dataLabel: '5GB Data', features: ['5GB High-Speed Data', 'Unlimited Talk & Text', 'Waze & Weather Apps', 'Zmanim App'] },
  { id: 'att-standard', network: 'att', name: 'Standard', price: 48, serviceType: 'talk-text', dataTier: 'medium', dataLabel: '15GB Data', features: ['15GB High-Speed Data', 'Unlimited Talk & Text', 'SmartLists App', 'All Approved Apps'] },
  { id: 'att-unlimited', network: 'att', name: 'Unlimited', price: 68, serviceType: 'talk-text', dataTier: 'heavy', dataLabel: 'Unlimited', features: ['Unlimited High-Speed Data', 'Unlimited Talk & Text', 'Mobile Hotspot', 'All Approved Apps'] },
];

const NETWORK_META: Record<Network, { label: string; tagColor: string; dot: string }> = {
  tmobile: { label: 'T-Mobile', tagColor: 'bg-pink-50 text-pink-700 border-pink-200', dot: 'bg-pink-500' },
  verizon: { label: 'Verizon', tagColor: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
  att: { label: 'AT&T', tagColor: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
};

const PORTING_CHECKLIST = [
  { id: 'service-active', label: 'My current service is active' },
  { id: 'phone-number', label: 'My phone number is entered correctly' },
  { id: 'account-number', label: 'My account number is entered correctly' },
  { id: 'porting-pin', label: 'My porting PIN is entered correctly' },
  { id: 'name-match', label: 'My name matches my carrier records' },
  { id: 'address-match', label: 'My address matches my carrier records' },
  { id: 'pin-expiry', label: 'I entered my porting PIN expiration date if applicable' },
  { id: 'understand-delay', label: 'I understand that incorrect information may delay my transfer' },
];

// ── Sidebar Stages ─────────────────────────────────────────────────────────────

const STAGES = [
  { id: 'goals', label: 'Your Goals', description: 'What you\'re looking for', screens: [0, 1] },
  { id: 'protection', label: 'AI Protection', description: 'Provider & features', screens: [2] },
  { id: 'calling', label: 'International', description: 'Calling destinations', screens: [3, 4] },
  { id: 'network', label: 'Network', description: 'Choose your carrier', screens: [5] },
  { id: 'service', label: 'Service & Data', description: 'Plan type & data needs', screens: [6, 7, 8] },
  { id: 'plan', label: 'Your Plan', description: 'Personalized recommendation', screens: [9] },
  { id: 'port', label: 'Port Number', description: 'Keep your number', screens: [10, 11] },
  { id: 'checkout', label: 'Checkout', description: 'Complete your order', screens: [12] },
];

function getStageIndex(screen: number): number {
  for (let i = 0; i < STAGES.length; i++) {
    if (STAGES[i].screens.includes(screen)) return i;
  }
  return 0;
}

// ── Navigation ─────────────────────────────────────────────────────────────────

function getNextScreen(screen: number, answers: Answers): number {
  const hasAIFeatures = answers.protectionFeatures.length > 0 && !answers.protectionFeatures.includes('none');
  switch (screen) {
    case 0: return 1;
    case 1: return hasAIFeatures ? 2 : 3;
    case 2: return 3;
    case 3: return answers.needsInternational ? 4 : 5;
    case 4: return 5;
    case 5: return 6;
    case 6: return answers.serviceType === 'talk-only' ? 9 : 7;
    case 7: return answers.needsData ? 8 : 9;
    case 8: return 9;
    case 9: return 10;
    case 10: return answers.transferNumber ? 11 : 12;
    case 11: return 12;
    default: return 12;
  }
}

// ── Plan Logic ─────────────────────────────────────────────────────────────────

function computeRecommendedPlan(answers: Answers): Plan | null {
  if (!answers.serviceType) return null;
  const hasAIFeatures = answers.protectionFeatures.length > 0 && !answers.protectionFeatures.includes('none');
  const needsIntlAdditional = answers.internationalScope === 'additional';

  let network: Network;
  if (hasAIFeatures) {
    network = 'tmobile';
  } else if (needsIntlAdditional) {
    network = 'verizon';
  } else {
    network = answers.networkPreference || 'tmobile';
  }

  // International additional countries requires a Verizon data plan — Talk Only is ineligible
  const effectiveServiceType = (needsIntlAdditional && answers.serviceType === 'talk-only')
    ? 'talk-text'
    : answers.serviceType;

  let dataTier: DataTier;
  if (effectiveServiceType === 'talk-only') {
    dataTier = 'none';
  } else if (!answers.needsData && !needsIntlAdditional) {
    dataTier = 'none';
  } else {
    const map: Record<string, DataTier> = { light: 'light', medium: 'medium', heavy: 'heavy' };
    dataTier = map[answers.dataUsage || 'light'];
    // International additional countries requires at least medium data on Verizon
    if (needsIntlAdditional && (dataTier === 'none' || dataTier === 'light')) dataTier = 'medium';
  }

  return PLANS.find(p =>
    p.network === network && p.serviceType === effectiveServiceType && p.dataTier === dataTier
  ) || null;
}

function getRecommendationReasons(answers: Answers): string[] {
  const reasons: string[] = [];
  if (answers.protectionFeatures.includes('blocking')) reasons.push('AI Call & Text Blocking Required');
  if (answers.protectionFeatures.includes('whitelisting')) reasons.push('Call/Text Whitelisting Required');
  if (answers.protectionFeatures.includes('blacklisting')) reasons.push('Call/Text Blacklisting Required');
  if (answers.aiProvider === 'tag') reasons.push('TAG International Provider Selected');
  if (answers.aiProvider === 'vaad') reasons.push('Vaad Hakihilos Provider Selected');
  if (answers.internationalScope === 'canada-mexico') reasons.push('Canada & Mexico Calling Required');
  if (answers.internationalScope === 'additional') reasons.push('International Calling (190+ Countries) Required');
  if (answers.serviceType === 'talk-only') reasons.push('Talk Only Service');
  if (answers.serviceType === 'talk-text' && !answers.needsData) reasons.push('Talk & Text Without Data');
  if (answers.dataUsage === 'light') reasons.push('Light Data Usage');
  if (answers.dataUsage === 'medium') reasons.push('Medium Data Usage');
  if (answers.dataUsage === 'heavy') reasons.push('Heavy Data Usage');
  return reasons;
}

// ── Validation ─────────────────────────────────────────────────────────────────

function canContinue(screen: number, answers: Answers): boolean {
  switch (screen) {
    case 0: return answers.primaryGoal !== null;
    case 1: return answers.protectionFeatures.length > 0;
    case 2: return answers.aiProvider !== null;
    case 3: return answers.needsInternational !== null;
    case 4: return answers.internationalScope !== null;
    case 5: return answers.networkPreference !== null;
    case 6: return answers.serviceType !== null;
    case 7: return answers.needsData !== null;
    case 8: return answers.dataUsage !== null;
    case 9: return computeRecommendedPlan(answers) !== null;
    case 10: return answers.transferNumber !== null;
    case 11: {
      const pi = answers.portingInfo;
      const allChecked = PORTING_CHECKLIST.every(item => answers.portingChecklist.includes(item.id));
      const fieldsOk = !!(pi.phoneNumber && pi.carrier && pi.accountName && pi.accountAddress && pi.accountNumber && pi.portingPin && pi.pinHasExpiry !== null && pi.simNumber);
      const pinExpiryOk = !pi.pinHasExpiry || !!pi.pinExpiry;
      return fieldsOk && pinExpiryOk && allChecked;
    }
    case 12: {
      const ci = answers.customerInfo;
      return !!(ci.firstName && ci.lastName && ci.email && ci.shippingAddress && ci.shippingCity && ci.shippingState && ci.shippingZip && ci.billingAddress && ci.city && ci.state && ci.zip && ci.cardNumber && ci.cardExpiry && ci.cardCvc && ci.termsAccepted);
    }
    default: return false;
  }
}

// ── Initial State ──────────────────────────────────────────────────────────────

const INITIAL_ANSWERS: Answers = {
  primaryGoal: null,
  protectionFeatures: [],
  aiProvider: null,
  needsInternational: null,
  internationalScope: null,
  networkPreference: null,
  serviceType: null,
  needsData: null,
  dataUsage: null,
  selectedPlan: null,
  transferNumber: null,
  portingInfo: { phoneNumber: '', carrier: '', accountName: '', accountAddress: '', accountNumber: '', portingPin: '', pinHasExpiry: null, pinExpiry: '', simNumber: '' },
  portingChecklist: [],
  areaCode: '',
  customerInfo: { firstName: '', lastName: '', email: '', shippingAddress: '', shippingCity: '', shippingState: '', shippingZip: '', billingAddress: '', city: '', state: '', zip: '', cardNumber: '', cardExpiry: '', cardCvc: '', couponCode: '', couponApplied: false, termsAccepted: false },
};

// ── Shared UI Atoms ────────────────────────────────────────────────────────────

function ScreenHeader({ step, total, title, subtitle }: { step: number; total: number; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <span className="text-[11px] font-bold text-brand-teal tracking-[0.25em] uppercase">Step {step} of {total}</span>
      <h2 className="text-xl font-bold text-primary-navy mt-1.5 mb-1">{title}</h2>
      {subtitle && <p className="text-slate-500 text-sm leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function InfoBanner({ children, variant = 'info' }: { children: React.ReactNode; variant?: 'info' | 'warning' | 'success' }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  };
  const icons = { info: Info, warning: AlertCircle, success: CheckCircle2 };
  const Icon = icons[variant];
  return (
    <div className={`flex gap-3 p-4 rounded-xl border text-sm mb-6 ${styles[variant]}`}>
      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}

function RadioCard({
  selected, disabled, onClick, icon: Icon, iconBg, label, description, badge
}: {
  selected: boolean; disabled?: boolean; onClick: () => void;
  icon: LucideIcon; iconBg?: string;
  label: string; description?: string; badge?: string;
}) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left w-full transition-all group ${
        disabled ? 'opacity-40 cursor-not-allowed border-slate-100 bg-slate-50' :
        selected ? 'border-brand-teal bg-brand-teal/5 shadow-sm' :
        'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
        selected ? 'bg-brand-teal text-white' : `${iconBg || 'bg-slate-50 text-slate-400'} group-hover:text-slate-600`
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-primary-navy text-sm">{label}</p>
          {badge && <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-brand-teal/10 text-brand-teal">{badge}</span>}
          {disabled && <Lock className="w-3 h-3 text-slate-400" />}
        </div>
        {description && <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{description}</p>}
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
        selected ? 'border-brand-teal bg-brand-teal' : 'border-slate-200'
      }`}>
        {selected && <Check className="w-3 h-3 text-white" />}
      </div>
    </button>
  );
}

function CheckboxCard({
  checked, onClick, icon: Icon, label, description
}: {
  checked: boolean; onClick: () => void;
  icon: LucideIcon; label: string; description?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left w-full transition-all group ${
        checked ? 'border-brand-teal bg-brand-teal/5' : 'border-slate-100 hover:border-slate-200'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
        checked ? 'bg-brand-teal text-white' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-primary-navy text-sm">{label}</p>
        {description && <p className="text-slate-500 text-xs mt-0.5">{description}</p>}
      </div>
      <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all ${
        checked ? 'border-brand-teal bg-brand-teal' : 'border-slate-200'
      }`}>
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
    </button>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 transition-all";

// ── Main Component ─────────────────────────────────────────────────────────────

export default function PlanWizard({ isOpen, onClose }: PlanWizardProps) {
  const [screenHistory, setScreenHistory] = useState<number[]>([0]);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const currentScreen = screenHistory[screenHistory.length - 1];
  const currentStage = getStageIndex(currentScreen);
  const stepNum = currentStage + 1;

  // Auto-lock network when entering screen 5
  const hasAIFeatures = answers.protectionFeatures.length > 0 && !answers.protectionFeatures.includes('none');
  const needsIntlAdditional = answers.internationalScope === 'additional';
  const lockedNetwork: Network | null = hasAIFeatures ? 'tmobile' : needsIntlAdditional ? 'verizon' : null;

  useEffect(() => {
    if (currentScreen === 5 && lockedNetwork && answers.networkPreference !== lockedNetwork) {
      setAnswers(prev => ({ ...prev, networkPreference: lockedNetwork }));
    }
  }, [currentScreen, lockedNetwork]);

  const goNext = () => {
    // Stamp the selected plan when leaving the recommendation screen
    const updatedAnswers = currentScreen === 9
      ? { ...answers, selectedPlan: computeRecommendedPlan(answers) }
      : answers;
    const next = getNextScreen(currentScreen, updatedAnswers);
    setAnswers(updatedAnswers);
    setScreenHistory(prev => [...prev, next]);
  };

  const goBack = () => {
    if (screenHistory.length > 1) setScreenHistory(prev => prev.slice(0, -1));
  };

  const update = (patch: Partial<Answers>) => setAnswers(prev => ({ ...prev, ...patch }));

  const toggleProtection = (feature: string) => {
    setAnswers(prev => {
      if (feature === 'none') return { ...prev, protectionFeatures: ['none'] };
      const cur = prev.protectionFeatures.filter(f => f !== 'none');
      return { ...prev, protectionFeatures: cur.includes(feature) ? cur.filter(f => f !== feature) : [...cur, feature] };
    });
  };

  const toggleChecklist = (id: string) => {
    setAnswers(prev => ({
      ...prev,
      portingChecklist: prev.portingChecklist.includes(id)
        ? prev.portingChecklist.filter(x => x !== id)
        : [...prev.portingChecklist, id],
    }));
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setScreenHistory([0]);
      setAnswers(INITIAL_ANSWERS);
      setOrderSubmitted(false);
    }, 400);
  };

  // ── Screen Renderers ─────────────────────────────────────────────────────────

  const renderScreen0 = () => (
    <div>
      <ScreenHeader step={stepNum} total={8} title="What are you looking for today?" subtitle="We'll guide you to the perfect plan based on your answer." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { id: 'ai-protection', label: 'AI Protection', desc: 'Block unwanted calls & texts with intelligent AI filters', icon: Shield },
          { id: 'international', label: 'International Calling', desc: 'Stay connected with family and friends around the world', icon: Globe },
          { id: 'talk-text', label: 'Simple Talk & Text', desc: 'Reliable voice and messaging without complexity', icon: Phone },
          { id: 'help', label: 'Help Me Choose', desc: "Answer a few questions and we'll find your perfect fit", icon: Zap },
        ].map(({ id, label, desc, icon: Icon }) => (
          <RadioCard
            key={id}
            selected={answers.primaryGoal === id}
            onClick={() => update({ primaryGoal: id })}
            icon={Icon}
            label={label}
            description={desc}
          />
        ))}
      </div>
    </div>
  );

  const renderScreen1 = () => (
    <div>
      <ScreenHeader step={stepNum} total={8} title="Do you need any advanced protection features?" subtitle="Select all that apply. These features are available exclusively on T-Mobile plans." />
      <InfoBanner variant="info">
        AI Blocking, Whitelisting, and Blacklisting are currently available <strong>only on T-Mobile plans</strong>.
      </InfoBanner>
      <div className="space-y-3">
        {[
          { id: 'blocking', label: 'AI Call & Text Blocking', desc: 'Automatically block spam, robocalls, and unwanted texts using AI', icon: ShieldCheck },
          { id: 'whitelisting', label: 'Call/Text Whitelisting', desc: 'Only allow calls and texts from numbers you approve', icon: CheckCircle2 },
          { id: 'blacklisting', label: 'Call/Text Blacklisting', desc: 'Block specific numbers from reaching you at all times', icon: AlertCircle },
        ].map(({ id, label, desc, icon: Icon }) => (
          <CheckboxCard
            key={id}
            checked={answers.protectionFeatures.includes(id)}
            onClick={() => toggleProtection(id)}
            icon={Icon}
            label={label}
            description={desc}
          />
        ))}
        <CheckboxCard
          checked={answers.protectionFeatures.includes('none')}
          onClick={() => toggleProtection('none')}
          icon={Wifi}
          label="None of the Above"
          description="I don't need AI protection features right now"
        />
      </div>
    </div>
  );

  const renderScreen2 = () => (
    <div>
      <ScreenHeader step={stepNum} total={8} title="Which AI Protection Provider would you like?" subtitle="Both providers offer certified kosher call and text protection." />
      <div className="space-y-3">
        <RadioCard
          selected={answers.aiProvider === 'tag'}
          onClick={() => update({ aiProvider: 'tag' })}
          icon={ShieldCheck}
          label="TAG International"
          description="Trusted AI protection certified by TAG International standards"
          badge="Recommended"
        />
        <RadioCard
          selected={answers.aiProvider === 'vaad'}
          onClick={() => update({ aiProvider: 'vaad' })}
          icon={Shield}
          label="Vaad Hakihilos"
          description="Community-approved AI filtering through Vaad Hakihilos certification"
        />
      </div>
    </div>
  );

  const renderScreen3 = () => (
    <div>
      <ScreenHeader step={stepNum} total={8} title="Do you need international calling?" subtitle="We'll use this to determine which networks and plans are available to you." />
      <div className="space-y-3">
        <RadioCard selected={answers.needsInternational === true} onClick={() => update({ needsInternational: true })} icon={Globe} label="Yes, I need international calling" description="I call friends or family outside the United States" />
        <RadioCard selected={answers.needsInternational === false} onClick={() => update({ needsInternational: false })} icon={Phone} label="No, domestic only" description="I only make calls within the United States" />
      </div>
    </div>
  );

  const renderScreen4 = () => (
    <div>
      <ScreenHeader step={stepNum} total={8} title="Where do you need to call internationally?" />
      <div className="space-y-3 mb-6">
        <RadioCard
          selected={answers.internationalScope === 'canada-mexico'}
          onClick={() => update({ internationalScope: 'canada-mexico' })}
          icon={Globe}
          label="Canada & Mexico Only"
          description="Calling to Canada and Mexico is available on both T-Mobile and Verizon plans"
        />
        <RadioCard
          selected={answers.internationalScope === 'additional'}
          onClick={() => update({ internationalScope: 'additional' })}
          icon={RadioTower}
          label="Additional Countries"
          description="Calling to countries beyond Canada and Mexico"
        />
      </div>
      <AnimatePresence>
        {answers.internationalScope === 'canada-mexico' && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <InfoBanner variant="success">Good news! Calling to Canada and Mexico is available on both T-Mobile and Verizon plans.</InfoBanner>
          </motion.div>
        )}
        {answers.internationalScope === 'additional' && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <InfoBanner variant="info">International calling to countries outside of Canada and Mexico is currently available only on <strong>Verizon plans with data</strong>.</InfoBanner>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderScreen5 = () => {
    const networks: Array<{ id: Network; label: string; desc: string; icon: LucideIcon }> = [
      { id: 'tmobile', label: 'T-Mobile', desc: hasAIFeatures ? 'Required — only network supporting AI Protection features' : "America's largest 5G network with excellent urban coverage", icon: Signal },
      { id: 'verizon', label: 'Verizon', desc: needsIntlAdditional ? 'Required — only network supporting international calling to additional countries' : 'Unmatched reliability and the broadest nationwide coverage', icon: Wifi },
      { id: 'att', label: 'AT&T', desc: 'Strong nationwide network with reliable connectivity coast to coast', icon: RadioTower },
    ];
    return (
      <div>
        <ScreenHeader step={stepNum} total={8} title="Which network would you prefer?" />
        {lockedNetwork && (
          <InfoBanner variant="info">
            Based on your selections, <strong>{NETWORK_META[lockedNetwork].label}</strong> has been automatically selected as the only network that supports your required features.
          </InfoBanner>
        )}
        <div className="space-y-3">
          {networks.map(({ id, label, desc, icon: Icon }) => (
            <RadioCard
              key={id}
              selected={answers.networkPreference === id}
              disabled={lockedNetwork !== null && lockedNetwork !== id}
              onClick={() => update({ networkPreference: id })}
              icon={Icon}
              label={label}
              description={desc}
              badge={lockedNetwork === id ? 'Required' : undefined}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderScreen6 = () => (
    <div>
      <ScreenHeader step={stepNum} total={8} title="What type of service do you need?" />
      {needsIntlAdditional && (
        <InfoBanner variant="info">
          International calling to additional countries requires a Verizon plan <strong>with data</strong>. Talk Only is not available with this option.
        </InfoBanner>
      )}
      <div className="space-y-3">
        <RadioCard
          selected={answers.serviceType === 'talk-only'}
          disabled={needsIntlAdditional}
          onClick={() => update({ serviceType: 'talk-only', needsData: null, dataUsage: null })}
          icon={PhoneCall}
          label="Talk Only"
          description="Voice calls only — no texting or data features included"
        />
        <RadioCard
          selected={answers.serviceType === 'talk-text'}
          onClick={() => update({ serviceType: 'talk-text' })}
          icon={Phone}
          label="Talk & Text"
          description="Voice calls plus SMS and MMS messaging"
        />
      </div>
    </div>
  );

  const renderScreen7 = () => (
    <div>
      <ScreenHeader step={stepNum} total={8} title="Do you need data?" />
      <div className="mb-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
        <div className="flex gap-2 mb-2">
          <Info className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-primary-navy">What is data used for?</p>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed ml-6">Data powers approved applications: <span className="font-medium text-slate-700">Waze · Weather · SmartLists · Zmanim · Picture Text Messages (MMS) · Group Text Messages</span></p>
      </div>
      {needsIntlAdditional && (
        <div className="mb-4">
          <InfoBanner variant="info">International calling to additional countries requires a Verizon plan <strong>with data</strong>.</InfoBanner>
        </div>
      )}
      <div className="space-y-3">
        <RadioCard selected={answers.needsData === true} onClick={() => update({ needsData: true })} icon={Database} label="Yes, I need data" description="Enable approved apps, navigation, picture messages and more" />
        <RadioCard selected={answers.needsData === false} disabled={needsIntlAdditional} onClick={() => update({ needsData: false, dataUsage: null })} icon={Phone} label="No data needed" description="Talk and text only, without data features" />
      </div>
    </div>
  );

  const renderScreen8 = () => (
    <div>
      <ScreenHeader step={stepNum} total={8} title="How much data do you expect to use?" subtitle="Choose based on how you typically use your phone." />
      <div className="space-y-3">
        {[
          {
            id: 'light', label: 'Light Usage', icon: Database,
            desc: 'All Flip Phones · TAG Approved Phones · Waze · Weather · SmartLists · Zmanim · Occasional Picture Messages',
          },
          {
            id: 'medium', label: 'Medium Usage', icon: Signal,
            desc: 'MegaLife Phones · Browser-Free Smartphones · Frequent Navigation · Frequent MMS · Daily Approved App Usage',
          },
          {
            id: 'heavy', label: 'Heavy Usage', icon: Wifi,
            desc: 'Smartphone Usage · Streaming · Hotspot Usage · Heavy Data Consumption',
          },
        ].map(({ id, label, icon: Icon, desc }) => (
          <button
            key={id}
            onClick={() => update({ dataUsage: id })}
            className={`flex items-start gap-4 p-4 rounded-2xl border-2 text-left w-full transition-all group ${
              answers.dataUsage === id ? 'border-brand-teal bg-brand-teal/5' : 'border-slate-100 hover:border-slate-200'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
              answers.dataUsage === id ? 'bg-brand-teal text-white' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-primary-navy text-sm mb-1">{label}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all mt-0.5 ${
              answers.dataUsage === id ? 'border-brand-teal bg-brand-teal' : 'border-slate-200'
            }`}>
              {answers.dataUsage === id && <Check className="w-3 h-3 text-white" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderScreen9 = () => {
    const plan = computeRecommendedPlan(answers);
    const reasons = getRecommendationReasons(answers);
    const net = plan ? NETWORK_META[plan.network] : null;

    return (
      <div>
        <ScreenHeader step={stepNum} total={8} title="Here's your recommended plan" subtitle="Based on your answers, this plan best matches your needs at the lowest monthly cost." />
        {plan ? (
          <div className="space-y-6">
            {/* Plan Card */}
            <div className="border-2 border-brand-teal rounded-2xl p-6 bg-brand-teal/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-turquoise/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {net && (
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border mb-2 ${net.tagColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${net.dot}`} />
                        {net.label}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-primary-navy">{plan.name}</h3>
                    <p className="text-sm text-slate-500">{plan.dataLabel}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-slate-400">$</span>
                      <span className="text-3xl font-bold text-primary-navy">{plan.price}</span>
                      <span className="text-sm text-slate-400">/mo</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-brand-teal flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={goNext}
                  className="w-full bg-brand-teal text-white py-3 rounded-xl font-semibold text-sm hover:bg-teal-700 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-teal-100"
                >
                  Select This Plan
                </button>
              </div>
            </div>

            {/* Why Recommended */}
            {reasons.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Why this plan was recommended</p>
                <p className="text-xs text-slate-500 mb-3">Based on your answers:</p>
                <ul className="space-y-2">
                  {reasons.map(r => (
                    <li key={r} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">This plan best matches your requested features while providing the lowest monthly cost.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <AlertCircle className="w-10 h-10 mx-auto mb-3" />
            <p className="text-sm">No matching plan found. Please go back and adjust your selections.</p>
          </div>
        )}
      </div>
    );
  };

  const renderScreen10 = () => (
    <div>
      <ScreenHeader step={stepNum} total={8} title="Would you like to keep your current phone number?" subtitle="You can transfer your existing number or get a brand new one." />
      <div className="space-y-3">
        <RadioCard
          selected={answers.transferNumber === true}
          onClick={() => update({ transferNumber: true })}
          icon={PhoneIncoming}
          label="Yes, Transfer My Number"
          description="Bring your existing phone number to Simply Kosher Wireless"
          badge="Most popular"
        />
        <RadioCard
          selected={answers.transferNumber === false}
          onClick={() => update({ transferNumber: false })}
          icon={Star}
          label="No, Give Me A New Number"
          description="Start fresh with a new phone number assigned to your account"
        />
      </div>

      {/* New number details — shown when "No" is selected */}
      <AnimatePresence>
        {answers.transferNumber === false && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mt-5 space-y-4"
          >
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <p className="text-sm text-slate-600 italic leading-relaxed">
                Please keep in mind, you can not port an existing T-Mobile number to our service.
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-700 mb-2.5 leading-relaxed">
                If you would like to be assigned a new number, please enter desired area code
              </p>
              <input
                className={`${inputCls} max-w-[120px] text-center text-lg font-semibold tracking-widest`}
                placeholder="000"
                maxLength={3}
                value={answers.areaCode}
                onChange={e => update({ areaCode: e.target.value.replace(/\D/g, '') })}
              />
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-teal/5 border border-brand-teal/20">
              <div className="w-8 h-8 rounded-lg bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                <Signal className="w-4 h-4 text-brand-teal" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-navy">Your SIM Card</p>
                <p className="text-sm text-slate-600 mt-0.5">KOSHER VTMO SIM CARD will be included with your order.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderScreen11 = () => {
    const pi = answers.portingInfo;
    const updatePI = (patch: Partial<typeof pi>) =>
      setAnswers(prev => ({ ...prev, portingInfo: { ...prev.portingInfo, ...patch } }));

    return (
      <div>
        <ScreenHeader step={stepNum} total={8} title="Number Transfer Information" subtitle="Please fill in your current carrier account details carefully." />

        <InfoBanner variant="warning">
          <strong>Important:</strong> Do not cancel your current service before the transfer is completed. Your current service must remain active for your phone number to transfer successfully.
        </InfoBanner>

        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Phone Number to Be Ported" required>
              <input className={inputCls} placeholder="(555) 000-0000" value={pi.phoneNumber} onChange={e => updatePI({ phoneNumber: e.target.value })} />
            </FormField>
            <FormField label="Previous Carrier" required>
              <input className={inputCls} placeholder="e.g. Verizon, AT&T, T-Mobile" value={pi.carrier} onChange={e => updatePI({ carrier: e.target.value })} />
            </FormField>
          </div>
          <FormField label="Name On Account" required>
            <input className={inputCls} placeholder="Full name as it appears on your carrier account" value={pi.accountName} onChange={e => updatePI({ accountName: e.target.value })} />
          </FormField>
          <FormField label="Address On Account" required>
            <input className={inputCls} placeholder="Billing address on your carrier account" value={pi.accountAddress} onChange={e => updatePI({ accountAddress: e.target.value })} />
          </FormField>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Account Number" required>
              <input className={inputCls} placeholder="Your carrier account number" value={pi.accountNumber} onChange={e => updatePI({ accountNumber: e.target.value })} />
            </FormField>
            <FormField label="Porting PIN" required>
              <input className={inputCls} placeholder="Your carrier porting PIN" value={pi.portingPin} onChange={e => updatePI({ portingPin: e.target.value })} />
            </FormField>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2">Does your porting PIN have an expiration date? <span className="text-red-400">*</span></p>
            <div className="flex gap-3">
              {[{ val: true, label: 'Yes' }, { val: false, label: 'No' }].map(({ val, label }) => (
                <button
                  key={label}
                  onClick={() => updatePI({ pinHasExpiry: val })}
                  className={`px-5 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                    pi.pinHasExpiry === val ? 'border-brand-teal bg-brand-teal/5 text-brand-teal' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {pi.pinHasExpiry && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <FormField label="Porting PIN Expiration Date" required>
                  <input type="date" className={inputCls} value={pi.pinExpiry} onChange={e => updatePI({ pinExpiry: e.target.value })} />
                </FormField>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SIM Card Selection */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-600 mb-3">SIM Card</p>
          <div className="flex items-center gap-3 p-4 rounded-2xl border-2 border-brand-teal bg-brand-teal/5">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-violet-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-primary-navy">KOSHER VTMO SIM CARD</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-brand-teal bg-brand-teal flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="mt-3">
            <FormField label="SIM Number" required>
              <input
                className={inputCls}
                placeholder="Enter SIM number"
                value={pi.simNumber}
                onChange={e => updatePI({ simNumber: e.target.value })}
              />
            </FormField>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="bg-slate-50 rounded-2xl p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Porting Verification Checklist</p>
          <p className="text-xs text-slate-500 mb-4">Please confirm the following before submitting:</p>
          <div className="space-y-2.5">
            {PORTING_CHECKLIST.map(item => (
              <button
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className="flex items-center gap-3 w-full text-left group"
              >
                <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  answers.portingChecklist.includes(item.id) ? 'border-brand-teal bg-brand-teal' : 'border-slate-300 group-hover:border-brand-teal/50'
                }`}>
                  {answers.portingChecklist.includes(item.id) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm transition-colors ${answers.portingChecklist.includes(item.id) ? 'text-slate-700' : 'text-slate-500 group-hover:text-slate-700'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderScreen12 = () => {
    const ci = answers.customerInfo;
    const updateCI = (patch: Partial<typeof ci>) =>
      setAnswers(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, ...patch } }));
    const plan = answers.selectedPlan || computeRecommendedPlan(answers);
    const net = plan ? NETWORK_META[plan.network] : null;

    const planPrice = plan?.price ?? 0;
    const itemsTotal = planPrice + SIM_FEE + ACTIVATION_FEE;
    const salesTax = Math.round(itemsTotal * TAX_RATE * 100) / 100;
    const couponDiscount = ci.couponApplied ? (COUPON_DISCOUNTS[ci.couponCode.toUpperCase()] ?? 0) : 0;
    const subtotal = itemsTotal + SHIPPING_FEE + salesTax + REGULATORY_FEE - couponDiscount;
    const monthlyCharges = planPrice + REGULATORY_FEE;

    if (orderSubmitted) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6"
          >
            <Check className="w-10 h-10 text-emerald-600" strokeWidth={3} />
          </motion.div>
          <h2 className="text-2xl font-bold text-primary-navy mb-3">Order Submitted!</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-sm leading-relaxed">
            Welcome to Simply Kosher Wireless! A confirmation has been sent to <strong>{ci.email}</strong>. Our team will be in touch within 1 business day to activate your service.
          </p>
          {plan && net && (
            <div className="bg-slate-50 rounded-2xl px-6 py-4 border border-slate-100 text-left w-full max-w-xs mb-8">
              <p className="text-xs text-slate-400 mb-1">Your Plan</p>
              <p className="font-bold text-primary-navy">{plan.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${net.tagColor}`}>{net.label}</span>
                <span className="text-sm text-slate-500">${plan.price}/mo</span>
              </div>
            </div>
          )}
          <button
            onClick={handleClose}
            className="bg-brand-teal text-white px-8 py-3 rounded-xl font-medium text-sm hover:bg-teal-700 transition-colors"
          >
            Close
          </button>
        </motion.div>
      );
    }

    return (
      <div>
        <ScreenHeader step={stepNum} total={8} title="Complete Your Order" subtitle="Review your selections and enter your payment details." />

        {/* Order Summary */}
        {plan && net && (
          <div className="rounded-2xl bg-slate-50 border border-slate-100 mb-6 overflow-hidden">
            {/* Plan header row */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Selected Plan</p>
                <p className="font-bold text-primary-navy text-sm">{plan.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${net.tagColor}`}>{net.label}</span>
                  <span className="text-[10px] text-slate-400">{plan.dataLabel}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-primary-navy">${plan.price}<span className="text-xs text-slate-400 font-normal">/mo</span></p>
            </div>
            {/* Selected Features */}
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Selected Features</p>
              <ul className="space-y-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3 h-3 text-brand-teal flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Number info */}
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
              {answers.transferNumber === true ? (
                <p className="text-xs text-slate-600">Transferring existing number: <span className="font-semibold text-slate-800">{answers.portingInfo.phoneNumber || '—'}</span></p>
              ) : (
                <p className="text-xs text-slate-600">
                  New number assigned{answers.areaCode ? ` — preferred area code: ` : ''}
                  {answers.areaCode && <span className="font-semibold text-slate-800">{answers.areaCode}</span>}
                </p>
              )}
            </div>
            {/* SIM card */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-start gap-2">
              <CreditCard className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-600">SIM Card: <span className="font-semibold text-slate-800">KOSHER VTMO SIM CARD</span></p>
                {answers.transferNumber && answers.portingInfo.simNumber && (
                  <p className="text-xs text-slate-500 mt-0.5">SIM #: {answers.portingInfo.simNumber}</p>
                )}
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="px-4 py-4 space-y-4">

              {/* Group 1: Package + SIM + Activation = Total */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Package ({plan.name})</span>
                  <span className="text-slate-700">${planPrice.toFixed(2)}</span>
                </div>
                {SIM_FEE > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">SIM Card</span>
                    <span className="text-slate-700">${SIM_FEE.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Activation Fee</span>
                  <span className="text-slate-700">${ACTIVATION_FEE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold pt-1.5 border-t border-slate-200">
                  <span className="text-slate-800">Total</span>
                  <span className="text-slate-900">${itemsTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Group 2: Fees + Coupon = Subtotal */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Shipping Fee</span>
                  <span className="text-slate-700">${SHIPPING_FEE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Sales Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                  <span className="text-slate-700">${salesTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Regulatory Fee</span>
                  <span className="text-slate-700">${REGULATORY_FEE.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-600 font-medium">
                    <span>Coupon ({ci.couponCode.toUpperCase()})</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs font-bold pt-1.5 border-t border-slate-200">
                  <span className="text-slate-800">Subtotal</span>
                  <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon input */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <input
                    className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-brand-teal bg-white placeholder:text-slate-400"
                    placeholder="Coupon code"
                    value={ci.couponCode}
                    onChange={e => updateCI({ couponCode: e.target.value, couponApplied: false })}
                  />
                  <button
                    onClick={() => {
                      const key = ci.couponCode.toUpperCase();
                      if (COUPON_DISCOUNTS[key] !== undefined) {
                        updateCI({ couponApplied: true });
                      } else {
                        updateCI({ couponApplied: false });
                      }
                    }}
                    className="text-xs font-semibold px-3 py-2 rounded-lg bg-brand-teal text-white hover:bg-teal-700 transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {ci.couponApplied && couponDiscount > 0 && (
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Coupon applied — ${couponDiscount.toFixed(2)} off!
                  </p>
                )}
                {ci.couponCode && !ci.couponApplied && (
                  <p className="text-[11px] text-slate-400">Enter a valid code and click Apply.</p>
                )}
                {ci.couponCode && ci.couponApplied && couponDiscount === 0 && (
                  <p className="text-[11px] text-red-400">Invalid coupon code.</p>
                )}
              </div>

              {/* Total Due Today */}
              <div className="rounded-xl bg-primary-navy text-white px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-bold tracking-tight">Total Due Today</span>
                <span className="text-2xl font-bold">${subtotal.toFixed(2)}</span>
              </div>

              {/* Monthly charges */}
              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                After today, your monthly charges will be <span className="font-semibold text-slate-600">${monthlyCharges.toFixed(2)}/mo</span>
              </p>

            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* Customer Info */}
          <div>
            <h3 className="text-xl font-bold text-primary-navy mb-4 pb-3 border-b-2 border-brand-teal/20 flex items-center gap-2.5">
              <User className="w-5 h-5 text-brand-teal flex-shrink-0" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField label="First Name" required>
                <input className={inputCls} placeholder="First name" value={ci.firstName} onChange={e => updateCI({ firstName: e.target.value })} />
              </FormField>
              <FormField label="Last Name" required>
                <input className={inputCls} placeholder="Last name" value={ci.lastName} onChange={e => updateCI({ lastName: e.target.value })} />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Email Address" required>
                <input type="email" className={inputCls} placeholder="you@example.com" value={ci.email} onChange={e => updateCI({ email: e.target.value })} />
              </FormField>
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h3 className="text-xl font-bold text-primary-navy mb-4 pb-3 border-b-2 border-brand-teal/20 flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-brand-teal flex-shrink-0" />
              Shipping Information
            </h3>
            <div className="space-y-3">
              <FormField label="Street Address" required>
                <input className={inputCls} placeholder="123 Main St" value={ci.shippingAddress} onChange={e => updateCI({ shippingAddress: e.target.value })} />
              </FormField>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <FormField label="City" required>
                    <input className={inputCls} placeholder="City" value={ci.shippingCity} onChange={e => updateCI({ shippingCity: e.target.value })} />
                  </FormField>
                </div>
                <FormField label="State" required>
                  <input className={inputCls} placeholder="NY" maxLength={2} value={ci.shippingState} onChange={e => updateCI({ shippingState: e.target.value })} />
                </FormField>
                <FormField label="ZIP Code" required>
                  <input className={inputCls} placeholder="10001" value={ci.shippingZip} onChange={e => updateCI({ shippingZip: e.target.value })} />
                </FormField>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div>
            <h3 className="text-xl font-bold text-primary-navy mb-4 pb-3 border-b-2 border-brand-teal/20 flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-brand-teal flex-shrink-0" />
              Billing Information
            </h3>
            <div className="space-y-3">
              <FormField label="Street Address" required>
                <input className={inputCls} placeholder="123 Main St" value={ci.billingAddress} onChange={e => updateCI({ billingAddress: e.target.value })} />
              </FormField>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <FormField label="City" required>
                    <input className={inputCls} placeholder="City" value={ci.city} onChange={e => updateCI({ city: e.target.value })} />
                  </FormField>
                </div>
                <FormField label="State" required>
                  <input className={inputCls} placeholder="NY" maxLength={2} value={ci.state} onChange={e => updateCI({ state: e.target.value })} />
                </FormField>
                <FormField label="ZIP Code" required>
                  <input className={inputCls} placeholder="10001" value={ci.zip} onChange={e => updateCI({ zip: e.target.value })} />
                </FormField>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-xl font-bold text-primary-navy mb-4 pb-3 border-b-2 border-brand-teal/20 flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-brand-teal flex-shrink-0" />
              Payment Information
            </h3>
            <div className="space-y-3">
              <FormField label="Card Number" required>
                <input className={inputCls} placeholder="1234 5678 9012 3456" value={ci.cardNumber} onChange={e => updateCI({ cardNumber: e.target.value })} />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Expiry Date" required>
                  <input className={inputCls} placeholder="MM/YY" value={ci.cardExpiry} onChange={e => updateCI({ cardExpiry: e.target.value })} />
                </FormField>
                <FormField label="CVC" required>
                  <input className={inputCls} placeholder="123" value={ci.cardCvc} onChange={e => updateCI({ cardCvc: e.target.value })} />
                </FormField>
              </div>
            </div>
          </div>

          {/* T&C */}
          <button
            onClick={() => updateCI({ termsAccepted: !ci.termsAccepted })}
            className="flex items-start gap-3 w-full text-left"
          >
            <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all mt-0.5 ${
              ci.termsAccepted ? 'border-brand-teal bg-brand-teal' : 'border-slate-300'
            }`}>
              {ci.termsAccepted && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-xs text-slate-500 leading-relaxed">
              I agree to the <span className="text-brand-teal font-medium underline underline-offset-2">Terms & Conditions</span> and <span className="text-brand-teal font-medium underline underline-offset-2">Privacy Policy</span> of Simply Kosher Wireless. I understand my selected plan, pricing, and features.
            </span>
          </button>

          <button
            onClick={() => { if (canContinue(12, answers)) setOrderSubmitted(true); }}
            disabled={!canContinue(12, answers)}
            className="w-full bg-brand-teal text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-teal-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-teal-100 hover:-translate-y-0.5 active:translate-y-0"
          >
            Submit Order
          </button>
        </div>
      </div>
    );
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 0: return renderScreen0();
      case 1: return renderScreen1();
      case 2: return renderScreen2();
      case 3: return renderScreen3();
      case 4: return renderScreen4();
      case 5: return renderScreen5();
      case 6: return renderScreen6();
      case 7: return renderScreen7();
      case 8: return renderScreen8();
      case 9: return renderScreen9();
      case 10: return renderScreen10();
      case 11: return renderScreen11();
      case 12: return renderScreen12();
      default: return null;
    }
  };

  const isCheckout = currentScreen === 12;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-[2rem] w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-brand-teal" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.2em]">Simply Kosher Wireless</p>
                  <p className="text-sm font-bold text-primary-navy leading-tight">Find Your Perfect Plan</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* ── Body ──────────────────────────────────────────────────────── */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <aside className="hidden md:flex w-56 flex-shrink-0 flex-col py-6 px-5 border-r border-slate-100 bg-slate-50/60 overflow-y-auto">
                {STAGES.map((stage, i) => {
                  const isCompleted = i < currentStage;
                  const isActive = i === currentStage;
                  return (
                    <div key={stage.id} className="flex items-start gap-3 mb-5">
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold mt-0.5 transition-all ${
                        isCompleted ? 'bg-brand-teal text-white' :
                        isActive ? 'bg-primary-navy text-white' :
                        'bg-slate-100 text-slate-400'
                      }`}>
                        {isCompleted ? <Check className="w-3 h-3" /> : i + 1}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[13px] font-semibold leading-tight transition-colors ${
                          isActive ? 'text-primary-navy' : isCompleted ? 'text-brand-teal' : 'text-slate-400'
                        }`}>{stage.label}</p>
                        {isActive && (
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{stage.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </aside>

              {/* Main content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentScreen}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      {renderCurrentScreen()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer */}
                {!(isCheckout && orderSubmitted) && (
                  <div className="flex-shrink-0 border-t border-slate-100 px-6 md:px-8 py-4 flex items-center justify-between bg-white">
                    <button
                      onClick={goBack}
                      disabled={screenHistory.length === 1}
                      className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-600 disabled:opacity-0 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>

                    {!isCheckout && (
                      <button
                        onClick={goNext}
                        disabled={!canContinue(currentScreen, answers)}
                        className="flex items-center gap-2 bg-primary-navy text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Continue
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
