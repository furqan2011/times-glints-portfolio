import Watch3DViewer from './Watch3DViewer';
import { Layers, Sparkles, Box, ShieldCheck } from 'lucide-react';

export default function ThreeJsLabSection() {
  return (
    <section id="threejs-lab" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-cyan-400 uppercase font-mono">
              <span>Interactive 3D Simulation</span>
              <span className="text-slate-600">/</span>
              <span>Three.js PBR Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
              Times &amp; Glints 3D Studio Lab
            </h2>
            <p className="text-base text-slate-400 leading-relaxed">
              Explore the craftsmanship of our flagship timepiece in real-time WebGL 3D. Rotate the model in 360°, separate mechanical layers with the exploded architecture slider, and customize luxury finishes.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
              WebGL2 · ACES Filmic PBR
            </span>
          </div>
        </div>

        {/* 3D Viewer Container */}
        <div className="w-full">
          <Watch3DViewer />
        </div>

        {/* 4 Feature Highlights of the Procedural 3D Scene */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-bold font-heading">
              <Box className="w-4 h-4" />
              <span>Multi-Part Architecture</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Composite THREE.Group comprising case, ceramic bezel, dial plate, applied indices, sweep hands, and sapphire dome.
            </p>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-bold font-heading">
              <Sparkles className="w-4 h-4" />
              <span>PBR Studio Environment</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              RoomEnvironment reflection mapping paired with warm key light and cool hemisphere ambient fills.
            </p>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-bold font-heading">
              <Layers className="w-4 h-4" />
              <span>Kinematic Exploded Slider</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Smooth second-order exponential damping separates components along the Z-axis on demand.
            </p>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-bold font-heading">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero-404 Procedural Dials</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Procedurally painted HTML5 Canvas dial with high-anisotropy filtering and radial sunburst finish.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
