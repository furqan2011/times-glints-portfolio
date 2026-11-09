import { useState, useRef } from 'react';
import { ArrowDown, MessageSquare, Sparkles, MapPin, Compass } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onExploreClick: () => void;
  onConnectClick: () => void;
}

export default function HeroSection({ onExploreClick, onConnectClick }: HeroSectionProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        
        {/* Main 2-Column Split: Typography Left, Futuristic 3D Visual Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Brand Kicker with Subtle Typographic Separators */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
                {PERSONAL_INFO.brandName}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300 font-medium">Digital Portfolio</span>
            </div>

            {/* Identity & Ambition */}
            <div className="space-y-2">
              <div className="text-sm font-semibold tracking-widest uppercase text-slate-400 font-mono">
                {PERSONAL_INFO.role}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading">
                FURQAN FAROOQ
              </h1>
            </div>

            {/* Main Headline */}
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-100 font-heading leading-tight max-w-2xl text-balance">
                "Turning Digital Ideas{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  Into Real Growth.
                </span>"
              </h2>
            </div>

            {/* Exact Required Lead Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {PERSONAL_INFO.heroDescription}
            </p>

            {/* Quick Unboxed Metadata Badges (Anti-Pill Compliant) */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {PERSONAL_INFO.location}
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">Watches &amp; Jewellery E-commerce</span>
              <span className="text-slate-600">/</span>
              <span className="text-cyan-300 font-mono">Meta Ads Practitioner</span>
            </div>

            {/* Two Animated Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreClick}
                type="button"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 rounded-xl hover:from-cyan-300 hover:to-blue-300 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-slate-950 group-hover:rotate-45 transition-transform duration-300" />
                <span>Explore My Work</span>
              </button>

              <button
                onClick={onConnectClick}
                type="button"
                className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium text-slate-200 glass-panel hover:bg-slate-800/80 hover:text-white rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Let's Connect</span>
              </button>
            </div>
          </div>

          {/* Right Column: Premium Abstract 3D Digital Marketer Sculpture */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-md aspect-square rounded-3xl p-1 bg-gradient-to-b from-cyan-400/30 via-blue-600/20 to-purple-600/30 shadow-2xl shadow-blue-900/40 group"
            >
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 blur-xl opacity-60 group-hover:opacity-90 transition-opacity" />

              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#070c1e] border border-cyan-400/20 flex flex-col justify-end">
                <img
                  src={PERSONAL_INFO.avatarImage}
                  alt="Futuristic 3D Digital Marketer Sculpture representing Furqan Farooq"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Gradient Scrim for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/30 to-transparent pointer-events-none" />

                {/* Holographic Data Overlay Card */}
                <div className="relative z-10 m-4 p-4 rounded-xl glass-panel border border-cyan-400/25 space-y-1.5 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white tracking-wide">Digital Persona</span>
                    <span className="text-[11px] font-mono text-cyan-300">TIMES &amp; GLINTS</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    Synthesizing Meta Ad Strategy &amp; Luxury E-Commerce Execution.
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Independent Practitioner</span>
                    <span>·</span>
                    <span>Lahore, PK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Proof & Highlights Strip Below the Hero Split (Frontend Design Guideline §2.B) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400">Core Expertise</span>
            <div className="text-base font-bold text-white">Meta &amp; Social Ads</div>
            <p className="text-xs text-slate-400">Facebook &amp; Instagram Advertising</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400">Own Venture</span>
            <div className="text-base font-bold text-white">Times &amp; Glints</div>
            <p className="text-xs text-slate-400">Watches &amp; Jewellery</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400">Location Base</span>
            <div className="text-base font-bold text-white">Lahore, Pakistan</div>
            <p className="text-xs text-slate-400">Local e-commerce operations</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400">Fulfillment</span>
            <div className="text-base font-bold text-white">Across Lahore</div>
            <p className="text-xs text-slate-400">Direct courier delivery</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onExploreClick}
            type="button"
            className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer group"
          >
            <span>Scroll to Discover</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400 group-hover:text-cyan-300" />
          </button>
        </div>

      </div>
    </section>
  );
}
