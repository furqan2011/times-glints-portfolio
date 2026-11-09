import { useState } from 'react';
import {
  MessageCircle,
  Instagram,
  MapPin,
  Send,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Meta Ads & Growth Strategy');
  const [customNote, setCustomNote] = useState('');

  const topics = [
    'Meta Ads & Growth Strategy',
    'Times & Glints Product Inquiry',
    'E-commerce Collaboration',
    'General Networking',
  ];

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.whatsappNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = customNote.trim()
      ? `Hello Furqan! Topic: [${selectedTopic}]. Message: ${customNote}`
      : `Hello Furqan! I came across your portfolio and would like to connect regarding ${selectedTopic}.`;
    const url = `https://wa.me/${PERSONAL_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-cyan-400 uppercase font-mono">
            <span>Direct Channels</span>
            <span className="text-slate-600">/</span>
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
            Let's Build Something Great Together.
          </h2>
          <p className="text-base text-slate-400">
            Open for digital marketing discussions, Meta advertising strategies, e-commerce partnerships, and Times &amp; Glints inquiries.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Details & Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Identity Card */}
            <div className="glass-panel p-8 rounded-3xl border border-cyan-500/25 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  Direct Contact
                </span>
                <h3 className="text-2xl font-bold text-white font-heading">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs text-slate-300 font-mono">
                  Founder · {PERSONAL_INFO.brandName}
                </p>
              </div>

              {/* Location Detail */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-semibold text-white">Location Base</div>
                  <div className="text-slate-400">{PERSONAL_INFO.location} (Delivery {PERSONAL_INFO.deliveryArea})</div>
                </div>
              </div>

              {/* WhatsApp Direct Action */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono uppercase text-[11px]">WhatsApp Direct:</span>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={PERSONAL_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-950/40 hover:opacity-95 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-950/20 text-slate-950">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-900/80">Message on WhatsApp</div>
                      <div className="text-base font-extrabold">{PERSONAL_INFO.whatsappNumber}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Instagram Direct Action */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono uppercase text-slate-400 text-[11px]">
                  Instagram Brand Profile:
                </div>
                <a
                  href={PERSONAL_INFO.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold text-sm shadow-lg shadow-purple-950/40 hover:opacity-95 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/20 text-white">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-pink-100">Brand Instagram</div>
                      <div className="text-base font-extrabold">{PERSONAL_INFO.instagramHandle}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Quick Response Notice */}
            <div className="p-4 rounded-2xl glass-panel border border-cyan-500/15 flex items-center gap-3 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Prompt response guaranteed via WhatsApp or Instagram Direct Message.</span>
            </div>

          </div>

          {/* Right Column: Interactive Direct WhatsApp Launcher Composer */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleLaunchWhatsApp}
              className="glass-panel p-8 rounded-3xl border border-cyan-500/25 space-y-6 shadow-2xl"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  Instant Message Launcher
                </span>
                <h3 className="text-xl font-bold text-white font-heading">
                  Start a Direct WhatsApp Conversation
                </h3>
                <p className="text-xs text-slate-400">
                  Select a topic and add optional details. Clicking the button immediately opens WhatsApp pre-populated with your text.
                </p>
              </div>

              {/* Topic Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Inquiry Topic:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topics.map((topic) => {
                    const isSelected = selectedTopic === topic;
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setSelectedTopic(topic)}
                        className={`p-3 rounded-xl text-left text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm'
                            : 'bg-slate-900/60 text-slate-300 border border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Note Input */}
              <div className="space-y-2">
                <label htmlFor="custom-note" className="block text-xs font-mono uppercase text-slate-300">
                  Your Message or Question (Optional):
                </label>
                <textarea
                  id="custom-note"
                  rows={4}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Tell me a bit about what you have in mind, a question about Times & Glints timepieces, or Meta Ads collaboration..."
                  className="w-full p-4 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                />
              </div>

              {/* Pre-fill Summary & Submit */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Send Message via WhatsApp</span>
                </button>
                <p className="text-center text-[11px] text-slate-500">
                  Opens directly in WhatsApp web or mobile app to +92 313 4343056
                </p>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
