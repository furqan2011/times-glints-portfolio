import { useState } from 'react';
import {
  Target,
  Share2,
  Instagram,
  Calendar,
  Users,
  Megaphone,
  ShoppingBag,
  Crown,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillItem } from '../types/portfolio';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const getSkillIcon = (id: string) => {
    switch (id) {
      case 'meta-ads':
        return <Target className="w-5 h-5 text-cyan-400" />;
      case 'facebook-advertising':
        return <Share2 className="w-5 h-5 text-blue-400" />;
      case 'instagram-advertising':
        return <Instagram className="w-5 h-5 text-purple-400" />;
      case 'campaign-planning':
        return <Calendar className="w-5 h-5 text-sky-400" />;
      case 'audience-research':
        return <Users className="w-5 h-5 text-indigo-400" />;
      case 'social-media-marketing':
        return <Megaphone className="w-5 h-5 text-cyan-300" />;
      case 'ecommerce':
        return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'brand-development':
        return <Crown className="w-5 h-5 text-amber-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredSkills =
    activeCategory === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-cyan-400 uppercase font-mono">
              <span>Core Competencies</span>
              <span className="text-slate-600">/</span>
              <span>Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading">
              My Skills &amp; Focus Areas
            </h2>
            <p className="text-base text-slate-400">
              Honest domain knowledge, strategic frameworks, and technical execution honed through self-directed study and applied directly in Times &amp; Glints.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 overflow-x-auto">
            {[
              { id: 'all', label: 'All Skills' },
              { id: 'advertising', label: 'Advertising' },
              { id: 'strategy', label: 'Strategy' },
              { id: 'commerce', label: 'Commerce' },
              { id: 'brand', label: 'Brand' },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  type="button"
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 8 Required Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => setSelectedSkill(skill)}
              className="group glass-panel rounded-2xl p-6 border border-cyan-500/15 hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-cyan-900/20"
            >
              <div className="space-y-4">
                {/* Header Icon + ID tag */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-300">
                    {getSkillIcon(skill.id)}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 group-hover:text-cyan-300 transition-colors">
                    {skill.category}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-cyan-200 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {skill.description}
                  </p>
                </div>

                {/* Practical Application Snippet */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                    Application in Times &amp; Glints:
                  </div>
                  <p className="mt-1 text-xs text-slate-300 italic">
                    "{skill.practicalApplication}"
                  </p>
                </div>
              </div>

              {/* Competencies Chips */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {skill.competencies.slice(0, 3).map((comp, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-800/50 text-slate-300 font-mono"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for In-Depth Skill Examination */}
        {selectedSkill && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedSkill(null)}
          >
            <div
              className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-400/40 shadow-2xl space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
                    {getSkillIcon(selectedSkill.id)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-heading">
                      {selectedSkill.name}
                    </h3>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                      Category: {selectedSkill.category}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer text-sm font-bold"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Domain Overview
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedSkill.description}
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  Applied in Real Business:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSkill.practicalApplication}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Core Execution Competencies
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSkill.competencies.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40 text-xs text-slate-200"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg cursor-pointer"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
