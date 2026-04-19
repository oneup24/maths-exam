import React from 'react';
// eslint-disable-next-line no-unused-vars -- motion is used as <motion.div> in JSX
import {motion} from 'framer-motion';
import {History,Trash2} from 'lucide-react';
import {GCL} from '../../lib/colors';
import {GRADE_INFO,DIFF_INFO} from '../../engine/index';

export default function HistoryList({history,onClear,L}){
  return(
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50 mb-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-gray-700 flex items-center gap-1.5"><History size={16}/>{L('historyTitle')}</h3>
        {history.length>0&&<button onClick={onClear} aria-label={L('clearHistory')} className="text-xs text-red-400 flex items-center gap-0.5 py-1 px-1.5 rounded-xl active:bg-red-50 active:scale-[0.97] transition-all duration-200"><Trash2 size={12}/>{L('clearHistory')}</button>}
      </div>
      {history.length===0?(
        <div className="text-center py-6">
          <img src="/mascot.webp" alt="mascot" className="w-16 h-16 object-cover rounded-2xl mx-auto mb-2 opacity-40"/>
          <p className="text-sm font-bold text-gray-400">{L('noHistory')}</p>
          <p className="text-xs text-gray-300 mt-0.5">{L('noHistoryDesc')}</p>
        </div>
      ):(
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {history.slice(0,8).map((h,i)=>(
            <motion.div key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.04,duration:0.2}}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-xl text-sm">
              <div className="flex items-center gap-2">
                <span className={"text-xs font-bold px-1.5 py-0.5 rounded-lg "+GCL[GRADE_INFO[h.grade]?.co||'indigo']}>P{h.grade}</span>
                <span className="text-xs text-gray-400">{DIFF_INFO[h.difficulty]?.ic}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-14 bg-gray-200 rounded-full h-2"><div className={"h-2 rounded-full "+(h.pct>=70?'bg-emerald-500':h.pct>=50?'bg-amber-500':'bg-red-400')} style={{width:h.pct+'%'}}/></div>
                <span className="text-xs font-bold text-gray-600 w-14 text-right">{h.score}/{h.total}</span>
                <span className="text-xs text-gray-300">{h.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
