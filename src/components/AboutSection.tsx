import { useState } from 'react';
import { BookOpen, ShieldCheck, Sparkles, LineChart, MapPin, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, CORE_PILLARS } from '../data/portfolioData';

export default function AboutSection() {
  const [selectedPillar, setSelectedPillar] = useState(0);

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'LineChart':
        return <LineChart className="w-5 h-5 text-cyan-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="about" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-cyan-400 uppercase font-mono">
            <span>About The Founder</span>
            <span className="text-slate-600">/</span>
            <span>Vision &amp; Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading">
            The Person Behind The Brand
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            A self-driven practitioner dedicated to mastering the art and science of digital customer acquisition through direct commercial ownership.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Profile Card */}
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    {PERSONAL_INFO.name}
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono tracking-wide">
                    Founder of {PERSONAL_INFO.brandName}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Story Paragraphs */}
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {PERSONAL_INFO.aboutStory.map((paragraph, index) => (
                  <p key={index} className="text-slate-300 font-normal">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Verified Commitment Points */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Self-Invested Capital</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Real Local Operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Continuous Creative Testing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Honest, Transparent Ambition</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Core Pillars / Operational Philosophy */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Foundational Pillars
            </div>

            <div className="space-y-3">
              {CORE_PILLARS.map((pillar, idx) => {
                const isSelected = selectedPillar === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPillar(idx)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-950/80 to-slate-900 border border-cyan-400/40 shadow-lg shadow-cyan-900/20'
                        : 'glass-panel hover:bg-slate-900/60 border border-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2.5 rounded-lg shrink-0 ${isSelected ? 'bg-cyan-500/20' : 'bg-slate-800/60'}`}>
                        {getIcon(pillar.icon)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-bold font-heading ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                            {pillar.title}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-500">
                            0{idx + 1}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-normal">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Philosophy Pull-Quote */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/30 to-purple-950/30 border border-cyan-500/15">
              <p className="text-xs italic text-slate-300 leading-relaxed">
                "Marketing isn't about guesswork or loud promises—it's about understanding human attention, honoring the customer's choice, and creating value that stands the test of time."
              </p>
              <div className="mt-2 text-[11px] font-mono text-cyan-400">
                — Furqan Farooq
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
