import React from 'react';
import { motion } from './Motion';
import { UploadCloud, Sliders, Zap, Share2 } from './Icons';

const STEPS = [
  {
    number: '01',
    title: 'Upload Photo',
    description: 'Drop your photo. Supports JPG, PNG, and HEIC from your phone or desktop.',
    icon: UploadCloud,
    iconColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
  },
  {
    number: '02',
    title: 'Customize Identity',
    description: 'Choose between PFP Frame or Builder ID card format, pan/zoom, and enter your stack.',
    icon: Sliders,
    iconColor: 'text-pink-400',
    borderColor: 'border-pink-500/30',
  },
  {
    number: '03',
    title: 'Generate Instantly',
    description: 'Our high-DPI canvas engine constructs your custom HH Goa 2026 graphic in milliseconds.',
    icon: Zap,
    iconColor: 'text-yellow-300',
    borderColor: 'border-yellow-500/30',
  },
  {
    number: '04',
    title: 'Download & Share',
    description: 'Save your crisp PNG frame directly to your device or share your card on X with #FrameInGoa.',
    icon: Share2,
    iconColor: 'text-pink-400',
    borderColor: 'border-pink-500/30',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 relative border-t border-yellow-500/15">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#033B29] border border-yellow-400/40 text-xs font-mono text-yellow-300 mb-4">
            PROCESS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            HOW IT <span className="text-yellow-400">WORKS</span>
          </h2>
          <p className="text-emerald-100 text-base">
            Four simple steps to claim your official Hacker House Goa 2026 digital identity. No login wall or payment required.
          </p>
        </div>

        {/* 4 Animated Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover rounded-2xl p-6 relative group overflow-hidden flex flex-col justify-between border border-yellow-500/20 bg-[#022E1F]/90"
              >
                <div>
                  {/* Top Step Row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-emerald-400/50 group-hover:text-yellow-400 transition-colors">
                      {step.number}
                    </span>
                    <div className={`w-12 h-12 rounded-xl bg-[#011F15] border ${step.borderColor} flex items-center justify-center ${step.iconColor} group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-emerald-200/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Indicator */}
                <div className="mt-8 pt-4 border-t border-emerald-800/60 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span>STEP {step.number}</span>
                  <span className="text-pink-400 font-bold">READY</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
