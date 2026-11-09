import { ArrowUp, Instagram, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'My Brand', href: '#brand' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#04060f] border-t border-slate-800/80 pt-16 pb-12 z-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80 items-start">
          
          {/* Brand & Identity Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-black text-slate-950 shadow-md">
                TG
              </span>
              <span className="font-heading font-bold text-lg text-white tracking-wider">
                {PERSONAL_INFO.brandName}
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              FURQAN FAROOQ · Founder, Digital Marketer &amp; E-commerce Entrepreneur
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Building real-world digital marketing and brand development experience from Lahore, Pakistan.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-300">
              Navigation
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-cyan-300 transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-300">
              Connect Directly
            </div>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href={PERSONAL_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {PERSONAL_INFO.whatsappNumber}</span>
              </a>
              <a
                href={PERSONAL_INFO.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram: {PERSONAL_INFO.instagramHandle}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright & Smooth Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Furqan Farooq · Times &amp; Glints. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Lahore, Pakistan</span>
            <button
              onClick={scrollToTop}
              type="button"
              className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
