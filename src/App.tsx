import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { GeneratorWorkspace } from './components/GeneratorWorkspace';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';

export function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollToGenerator = () => {
    const el = document.getElementById('generator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#022E1F] text-[#F8FAFC] bg-emerald-grid relative overflow-x-hidden">

      {/* Top Floating Glass Header */}
      <Header onNavigateToGenerator={scrollToGenerator} />

      {/* Main Content Layout */}
      <main>
        {/* Hero Section */}
        <Hero onNavigateToGenerator={scrollToGenerator} />

        {/* How It Works Step Cards */}
        <HowItWorks />

        {/* Core Generator Workspace */}
        <GeneratorWorkspace onToast={addToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification Stack */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
