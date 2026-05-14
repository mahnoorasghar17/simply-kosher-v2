/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlanFinder from './components/PlanFinder';
import Features from './components/Features';
import Plans from './components/Plans';
import Trust from './components/Trust';
import ActivationPreview from './components/ActivationPreview';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PlanFinder />
        <Features />
        <Plans />
        <Trust />
        <ActivationPreview />
      </main>
      <Footer />
    </div>
  );
}

