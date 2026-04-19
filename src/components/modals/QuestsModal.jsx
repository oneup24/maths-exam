import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const FEATURES = [
  { ic: '📅', zh: '每日任務', en: 'Daily Missions', descZh: '每天一個新數學挑戰', descEn: 'A new challenge every day' },
  { ic: '📖', zh: '故事模式', en: 'Story Mode',     descZh: '跟 Curlboo 解決生活數學', descEn: 'Solve real-life maths with Curlboo' },
  { ic: '🏆', zh: '排行榜',   en: 'Leaderboard',   descZh: '和同學比較進步', descEn: 'Compare progress with friends' },
];

export default function QuestsModal({ isOpen, onClose, lang = 'zh' }) {
  const zh = lang === 'zh';
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="quests-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />
          {/* Sheet */}
          <motion.div
            key="quests-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 pb-10 max-w-lg mx-auto"
            style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4"/>

            {/* Close */}
            <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-xl bg-gray-100 text-gray-400 active:bg-gray-200">
              <X size={16}/>
            </button>

            {/* Header */}
            <div className="text-center mb-5">
              <span className="text-4xl">🗺️</span>
              <div className="flex items-center justify-center gap-2 mt-2">
                <h2 className="text-2xl font-black text-gray-800">{zh ? 'Quests 任務模式' : 'Quests Mode'}</h2>
                <span className="text-xs bg-orange-100 text-orange-500 font-bold px-2 py-0.5 rounded-full">{zh ? '即將推出' : 'Coming Soon'}</span>
              </div>
              <p className="text-sm font-bold text-orange-500 mt-0.5">Maths Adventures — Coming Soon</p>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {zh
                  ? 'Curlboo & Fluffy 帶你踏上數學冒險！完成每日任務，解鎖新故事，培養解題思維。'
                  : 'Join Curlboo & Fluffy on a maths adventure! Complete daily missions, unlock stories & build problem-solving skills.'}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {FEATURES.map(f => (
                <div key={f.ic} className="flex items-center gap-3 bg-orange-50 rounded-2xl px-4 py-3">
                  <span className="text-2xl">{f.ic}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{zh ? f.zh : f.en} <span className="text-xs text-gray-400 font-normal">/ {zh ? f.en : f.zh}</span></p>
                    <p className="text-xs text-gray-500">{zh ? f.descZh : f.descEn}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-gray-100 text-gray-500 font-bold text-sm active:bg-gray-200 transition-all duration-200">
              {zh ? '知道了，期待推出！' : 'Got it, can\'t wait!'}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
