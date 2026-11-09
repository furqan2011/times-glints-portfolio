import { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { TIMELINE_DATA } from '../data/portfolioData';

export default function JourneySection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="journey" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-cyan-400 uppercase font-mono">
            <span>Evolution &amp; Milestones</span>
            <span className="text-slate-600">/</span>
            <span>Path to Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading">
            My Journey &amp; Milestones
          </h2>
          <p className="text-base text-slate-400">
            From self-directed learning to building Times &amp; Glints and scaling e-commerce operations in Lahore.
          </p>
        </div>

        {/* Desktop & Tablet Interactive Timeline Stepper */}
        <div className="mb-12 hidden md:block">
          <div className="relative">
            {/* Background Track Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
            
            {/* Glowing Active Progress Line */}
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 -translate-y-1/2 z-0 transition-all duration-500"
              style={{
                width: `${(activeStep / (TIMELINE_DATA.length - 1)) * 100}%`,
              }}
            />

            {/* Stepper Nodes */}
            <div className="relative z-10 flex justify-between items-center">
              {TIMELINE_DATA.map((item, index) => {
                const isActive = activeStep === index;
                const isPassed = activeStep >= index;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveStep(index)}
                    type="button"
                    className="flex flex-col items-center group cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-cyan-400 text-slate-950 scale-110 shadow-lg shadow-cyan-400/50 ring-4 ring-cyan-500/20'
                          : isPassed
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-900 border border-slate-700 text-slate-400 group-hover:border-slate-500'
                      }`}
                    >
                      {item.step}
                    </div>
                    <span
                      className={`mt-3 text-xs font-medium max-w-[110px] text-center leading-tight transition-colors ${
                        isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Milestone Spotlight Card */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/25 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 text-xs font-mono font-semibold">
                  Stage {TIMELINE_DATA[activeStep].step} · {TIMELINE_DATA[activeStep].period}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                {TIMELINE_DATA[activeStep].title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {TIMELINE_DATA[activeStep].description}
              </p>

              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Key Insights &amp; Real Learnings:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {TIMELINE_DATA[activeStep].keyLearnings.map((learning, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{learning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-blue-950/40 border border-slate-800 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Strategic Takeaway</span>
                </div>
                <p className="text-xs italic text-slate-200 leading-relaxed">
                  "{TIMELINE_DATA[activeStep].highlight}"
                </p>
              </div>

              {/* Navigation stepper buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 text-xs rounded-lg glass-panel text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-[11px] font-mono text-slate-400">
                  {activeStep + 1} of {TIMELINE_DATA.length}
                </span>
                <button
                  type="button"
                  disabled={activeStep === TIMELINE_DATA.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(TIMELINE_DATA.length - 1, prev + 1))}
                  className="px-3 py-1.5 text-xs rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline Accordion */}
        <div className="mt-8 md:hidden space-y-4">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            All Journey Stages
          </div>
          {TIMELINE_DATA.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveStep(idx)}
              type="button"
              className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer ${
                activeStep === idx
                  ? 'bg-slate-800/90 border border-cyan-400/50 shadow-md'
                  : 'glass-panel border border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  Stage {item.step}
                </span>
                <span className="text-[10px] text-slate-400">{item.period}</span>
              </div>
              <div className="text-sm font-bold text-white mt-1">{item.title}</div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
