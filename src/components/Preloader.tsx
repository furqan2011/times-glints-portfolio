import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onFinish?: () => void;
}

export default function Preloader({ onFinish }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            if (onFinish) onFinish();
          }, 300);
          return 100;
        }
        // Rapid organic acceleration
        const increment = Math.floor(Math.random() * 18) + 12;
        return Math.min(prev + increment, 100);
      });
    }, 55);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050814] text-white"
        >
          {/* Subtle Cyber Grid */}
          <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />

          {/* Central Luxury Emblems */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-16 h-16 rounded-2xl p-[1px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 mb-6 shadow-lg shadow-blue-500/20"
            >
              <div className="w-full h-full bg-[#070b19] rounded-[15px] flex items-center justify-center">
                <span className="font-heading font-extrabold text-2xl tracking-wider bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text text-transparent">
                  TG
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="space-y-1.5"
            >
              <span className="text-xs font-semibold tracking-[0.25em] text-cyan-400 uppercase">
                TIMES &amp; GLINTS
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white font-heading">
                FURQAN FAROOQ
              </h2>
              <p className="text-xs text-slate-400 tracking-wider">
                Digital Marketer &amp; Founder
              </p>
            </motion.div>

            {/* Glowing Progress Bar */}
            <div className="w-56 mt-8 space-y-2">
              <div className="h-1 w-full bg-slate-800/80 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 tracking-wider font-mono">
                <span>INITIALIZING PORTFOLIO</span>
                <span className="tabular-nums text-cyan-300">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
