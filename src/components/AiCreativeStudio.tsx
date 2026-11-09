import { useState } from 'react';
import {
  Sparkles,
  Wand2,
  Image as ImageIcon,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  X,
  Layers,
} from 'lucide-react';
import { PRODUCTS_DATA } from '../data/portfolioData';

interface AiCreativeStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiCreativeStudio({ isOpen, onClose }: AiCreativeStudioProps) {
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [prompt, setPrompt] = useState(
    'Macro studio photography of an ultra-luxury minimalist men\'s chronograph watch with deep navy dial, polished icy silver casing, and water glint highlights.'
  );
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [selectedPresetImage, setSelectedPresetImage] = useState<string>(PRODUCTS_DATA[0].image);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editInstruction, setEditInstruction] = useState(
    'Enhance with icy blue neon edge lighting and subtle sapphire glints.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setUploadedImage(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const payload: any = {
        aspectRatio,
      };

      if (mode === 'create') {
        payload.prompt = prompt;
      } else {
        payload.sourceImage = uploadedImage || selectedPresetImage;
        payload.editInstruction = editInstruction;
      }

      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      if (data.imageUrl) {
        setResultImage(data.imageUrl);
      } else {
        throw new Error(data.message || 'Image generation service did not return an image stream');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred while creating image');
    } finally {
      setIsGenerating(false);
    }
  };

  const samplePrompts = [
    'Ultra-luxury obsidian watch with icy silver hour markers resting on deep midnight navy slate.',
    'Modern silver geometric cuff bracelet embedded with sapphire crystals under dramatic studio spotlight.',
    'Futuristic e-commerce Meta Ad visual for luxury timepieces with electric blue lighting and clean typography space.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-cyan-400/40 shadow-2xl p-6 sm:p-8 space-y-6 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-heading">
                  AI Creative Studio
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                  Gemini Creative Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generate luxury watch concepts, product imagery, and Meta Ad creative variations with text prompts.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            aria-label="Close studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800 w-fit">
          <button
            type="button"
            onClick={() => setMode('create')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'create'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Create New Image</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('edit')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'edit'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Edit &amp; Remaster Image</span>
          </button>
        </div>

        {/* Main 2-Column Split: Controls Left, Output Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <form onSubmit={handleGenerate} className="lg:col-span-7 space-y-4">
            {mode === 'create' ? (
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Text Prompt:
                </label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the luxury timepiece, jewellery, or ad creative you want to create..."
                  className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
                />

                {/* Sample Prompt Chips */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    Sample Inspiration:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {samplePrompts.map((sp, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPrompt(sp)}
                        className="text-left text-[11px] p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-700/50 cursor-pointer"
                      >
                        "{sp}"
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase text-slate-300">
                    Source Visual for Editing:
                  </label>
                  
                  {/* Select Preset from Times & Glints or Upload */}
                  <div className="grid grid-cols-3 gap-2">
                    {PRODUCTS_DATA.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedPresetImage(p.image);
                          setUploadedImage(null);
                        }}
                        className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border ${
                          selectedPresetImage === p.image && !uploadedImage
                            ? 'border-cyan-400 ring-2 ring-cyan-500/30'
                            : 'border-slate-700 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs cursor-pointer border border-slate-700">
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Upload Custom Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {uploadedImage && (
                      <span className="text-[11px] text-emerald-400 font-mono">
                        Custom image loaded
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase text-slate-300">
                    Edit Instructions:
                  </label>
                  <textarea
                    rows={3}
                    value={editInstruction}
                    onChange={(e) => setEditInstruction(e.target.value)}
                    placeholder="e.g. Add cyan neon backlight, enhance metallic reflections, add dramatic water glints..."
                    className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Aspect Ratio Selector */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-xs font-mono uppercase text-slate-300">
                Aspect Ratio:
              </label>
              <div className="flex items-center gap-2">
                {['1:1', '4:3', '16:9', '9:16'].map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      aspectRatio === ratio
                        ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/50'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Notice:</div>
                  <div className="text-[11px] text-red-200/90 leading-relaxed">{errorMsg}</div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 px-6 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Generating Creative...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-slate-950" />
                  <span>{mode === 'create' ? 'Generate Image' : 'Apply Edits & Render'}</span>
                </>
              )}
            </button>
          </form>

          {/* Output Display Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-slate-800 min-h-[360px] relative overflow-hidden">
            {resultImage ? (
              <div className="w-full space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-cyan-400/30 shadow-2xl aspect-square bg-black">
                  <img
                    src={resultImage}
                    alt="Generated Creative"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-300 text-[11px]">Render Completed</span>
                  <a
                    href={resultImage}
                    download="times-glints-creative.png"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center p-6 space-y-3 text-slate-500">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-300 font-heading">
                    No Creative Rendered Yet
                  </div>
                  <p className="text-[11px] text-slate-500 max-w-xs">
                    Choose a prompt or upload an image and click Generate to see the AI image result here.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
