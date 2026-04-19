import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap, BarChart2 } from 'lucide-react';
import { getUserStats } from '../../services/api';
import HistoryList from './HistoryList';
import { GRADE_INFO } from '../../engine/index';
import { GC } from '../../lib/colors';

export default function RecordTab({ streak, gradeBest, history, onClear, lang, L, user }) {
  const zh = lang === 'zh';
  const [cloudStats, setCloudStats] = useState(null);

  useEffect(() => {
    if (user) {
      getUserStats(user.id).then(stats => setCloudStats(stats));
    }
  }, [user]);

  return (
    <div>
      {/* Streak */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50 mb-3">
        <h3 className="font-bold text-gray-700 flex items-center gap-2 mb-3">
          <Zap size={15} className="text-orange-500"/>
          {zh ? '連續練習' : 'Streak'}
        </h3>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
            <motion.span animate={{scale:[1,1.15,1]}} transition={{duration:2,repeat:Infinity,ease:'easeInOut'}} className="text-2xl inline-block">🔥</motion.span>
          </div>
          <div>
            <p className="text-2xl font-black text-orange-500">{streak}<span className="text-sm font-bold text-orange-300 ml-1">{zh?'天':'days'}</span></p>
            <p className="text-xs text-gray-400">{zh?'連續練習天數':'current streak'}</p>
          </div>
        </div>
      </div>

      {/* Grade best scores */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50 mb-3">
        <h3 className="font-bold text-gray-700 flex items-center gap-2 mb-3">
          ⭐ {zh ? '各年級最高分' : 'Best Score by Grade'}
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6].map(g => {
            const best = gradeBest[g];
            const co = GRADE_INFO[g]?.co || 'indigo';
            return (
              <div key={g} className={"rounded-xl p-2.5 text-center bg-gradient-to-br "+GC[co]}>
                <p className="text-white font-black text-sm">P{g}</p>
                <p className="text-white font-extrabold text-lg leading-tight">{best != null ? best+'%' : '—'}</p>
                <p className="text-white/70 text-[10px]">{best != null ? (best>=80?'🌟':best>=60?'⭐':'📚') : zh?'未做':'未做'}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cloud stats — auth users only */}
      {user && cloudStats && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50 mb-3">
          <h3 className="font-bold text-gray-700 flex items-center gap-2 mb-3">
            <BarChart2 size={15} className="text-indigo-500"/>
            {zh ? '我的統計（雲端）' : 'My Stats (Cloud)'}
          </h3>
          <div className="flex gap-2">
            <div className="flex-1 bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-purple-600">{cloudStats.totalExams}</p>
              <p className="text-[10px] text-purple-400 font-bold">{zh?'總考試':'Total'}</p>
            </div>
            <div className="flex-1 bg-sky-50 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-sky-600">{cloudStats.avgScore}%</p>
              <p className="text-[10px] text-sky-400 font-bold">{zh?'平均分':'Avg'}</p>
            </div>
            <div className="flex-1 bg-amber-50 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-amber-600">{cloudStats.bestScore}%</p>
              <p className="text-[10px] text-amber-400 font-bold">{zh?'最高分':'Best'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent history */}
      <HistoryList history={history} onClear={onClear} L={L}/>

      {/* Gap Detection — coming soon */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border-2 border-dashed border-indigo-200 opacity-75 mt-3 mb-2">
        <h3 className="font-bold text-gray-500 flex items-center gap-2 mb-2">
          <Lock size={14} className="text-indigo-300"/>
          {zh ? '弱項分析' : 'Gap Detection'}
          <span className="ml-auto text-[10px] bg-indigo-100 text-indigo-400 font-bold px-2 py-0.5 rounded-full">{zh?'即將推出':'Coming Soon'}</span>
        </h3>
        <p className="text-xs text-gray-400">{zh?'完成更多練習後，系統會自動找出你的數學弱項，給家長參考。':'After more practice, we\'ll identify weak areas for parents to review.'}</p>
      </div>
    </div>
  );
}
