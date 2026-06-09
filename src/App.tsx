/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlanFinder from './components/PlanFinder';
import Features from './components/Features';
import Plans from './components/Plans';
import Trust from './components/Trust';
import ActivationPreview from './components/ActivationPreview';
import Footer from './components/Footer';
import PlanWizard from './components/PlanWizard';

export default function App() {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero onOpenWizard={() => setWizardOpen(true)} />
        <PlanFinder />
        <Features />
        <Plans />
        <Trust />
        <ActivationPreview />
      </main>
      <Footer />
      <PlanWizard isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />
    </div>
  );
}

