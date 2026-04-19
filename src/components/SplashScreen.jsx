import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-orange-500 to-amber-400"
      >
        {/* Curlboo placeholder */}
        <div className="w-40 h-48 rounded-3xl bg-white/20 border-2 border-white/40 border-dashed flex flex-col items-center justify-center mb-6">
          <span className="text-5xl">🐻</span>
          <span className="text-white/60 text-[10px] mt-2 text-center px-2">Curlboo hero image</span>
        </div>

        {/* Branding */}
        <h1 className="text-4xl font-black text-white tracking-tight">數學特訓</h1>
        <p className="text-lg text-white/80 mt-1 font-medium">Maths Quests</p>

        {/* Loading dots */}
        <div className="flex gap-2 mt-8">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/70"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
