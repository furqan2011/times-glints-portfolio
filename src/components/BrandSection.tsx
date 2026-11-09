import { useState } from 'react';
import {
  Instagram,
  MessageCircle,
  ExternalLink,
  MapPin,
  Truck,
  Sparkles,
  Shield,
  Eye,
  Check,
} from 'lucide-react';
import { PERSONAL_INFO, PRODUCTS_DATA } from '../data/portfolioData';
import { ProductItem } from '../types/portfolio';

interface BrandSectionProps {
  onOpenAiStudio?: () => void;
}

export default function BrandSection({ onOpenAiStudio }: BrandSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const handleWhatsAppOrder = (product: ProductItem) => {
    const text = encodeURIComponent(
      `Hello Furqan! I saw ${product.name} on your Times & Glints portfolio and would love to inquire about availability and delivery in Lahore.`
    );
    window.open(`https://wa.me/${PERSONAL_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const scrollToThreeJs = () => {
    const elem = document.getElementById('threejs-lab');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="brand" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Brand Banner Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 mb-16 overflow-hidden glass-panel border border-cyan-500/25 shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-sky-300 to-blue-500 flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
                TG
              </span>
              <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                Featured Venture &amp; Case Study
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
              TIMES &amp; GLINTS
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              <strong className="text-cyan-300 font-semibold">Times &amp; Glints</strong> is my own entrepreneurial venture in the luxury watches and jewellery industry. It operates as both a genuine consumer brand providing premium statement pieces and my live testing environment where I practice Meta advertising, creative testing, customer engagement, and e-commerce fulfillment.
            </p>

            {/* Brand Key Attributes Strip (Anti-Pill Compliant) */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Industry: <strong>Watches &amp; Jewellery</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Base: <strong>{PERSONAL_INFO.location}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span>Fulfillment: <strong>{PERSONAL_INFO.deliveryArea}</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={PERSONAL_INFO.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:opacity-95 rounded-xl transition-all shadow-lg shadow-purple-900/30 cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow {PERSONAL_INFO.instagramHandle}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={PERSONAL_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={scrollToThreeJs}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-cyan-300 glass-panel hover:bg-slate-800 border border-cyan-500/30 rounded-xl transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Launch 3D Lab</span>
              </button>

              {onOpenAiStudio && (
                <button
                  type="button"
                  onClick={onOpenAiStudio}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 rounded-xl transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>AI Creative Studio</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Section Subheading: Product Catalog Showcase */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Curated Catalog
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
              Signature Collection Showcase
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Click any piece to inspect technical specifications, craftsmanship notes, or initiate a direct customer inquiry for Lahore delivery.
          </p>
        </div>

        {/* 3-Column Product Cards Grid (Compliant with E-Commerce Retail Guidelines §2.A) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS_DATA.map((product) => (
            <div
              key={product.id}
              className="group glass-panel rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-cyan-950/30 hover:-translate-y-1"
            >
              <div>
                {/* Product Image Slot (65%-75% of visual focus) */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle status tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-wider uppercase text-cyan-300 border border-white/10">
                    {product.status}
                  </div>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    type="button"
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/70 hover:bg-cyan-500 hover:text-slate-950 text-white backdrop-blur-md transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                    aria-label={`View details of ${product.name}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </div>

                {/* Product Metadata */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono uppercase tracking-wider text-cyan-400">
                      {product.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Truck className="w-3 h-3 text-cyan-400" />
                      Lahore Express
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white font-heading group-hover:text-cyan-200 transition-colors">
                    {product.name}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {product.tagline}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {product.specs.slice(0, 2).map((s, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800/70 text-slate-300 font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 pt-0 border-t border-slate-800/80 flex items-center gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 py-2 text-xs font-medium text-slate-300 hover:text-white glass-panel hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => handleWhatsAppOrder(product)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Product Inspection Modal */}
        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="relative w-full max-w-2xl glass-panel rounded-3xl border border-cyan-400/40 shadow-2xl overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Preview */}
              <div className="md:w-1/2 relative bg-slate-950 min-h-[260px]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-cyan-300">
                  {selectedProduct.status}
                </div>
              </div>

              {/* Content Panel */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                      {selectedProduct.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(null)}
                      className="text-slate-400 hover:text-white p-1 text-sm font-bold"
                      aria-label="Close product modal"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Specifications &amp; Craft:
                    </div>
                    {selectedProduct.specs.map((spec: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-500/20">
                    <Shield className="w-4 h-4 shrink-0" />
                    <span>Hand-inspected before dispatch across Lahore.</span>
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleWhatsAppOrder(selectedProduct)}
                    className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-xl transition-all shadow-md shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Order Inquiries</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
