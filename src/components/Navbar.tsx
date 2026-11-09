import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onOpenAiStudio?: () => void;
}

export default function Navbar({ activeSection, onOpenAiStudio }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'My Brand', href: '#brand', id: 'brand' },
    { label: '3D Lab', href: '#threejs-lab', id: 'threejs-lab' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050814]/85 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-lg shadow-black/30'
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-black text-slate-950 shadow-md shadow-cyan-500/25 group-hover:scale-105 transition-transform">
              TG
            </span>
            <span className="font-heading tracking-wider uppercase text-slate-100 group-hover:text-cyan-300 transition-colors">
              TIMES &amp; GLINTS
            </span>
          </a>

          {/* Zone 2: clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive ? 'text-cyan-300 font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {onOpenAiStudio && (
              <button
                type="button"
                onClick={onOpenAiStudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:text-white glass-panel hover:bg-slate-800 rounded-lg border border-cyan-500/30 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>AI Studio</span>
              </button>
            )}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 rounded-lg hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-950" />
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-cyan-500/20 px-6 py-5 mt-3 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            {onOpenAiStudio && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiStudio();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-400/30 rounded-lg cursor-pointer"
              >
                <span>AI Creative Studio (Create &amp; Edit)</span>
              </button>
            )}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg shadow-md shadow-cyan-500/25"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
