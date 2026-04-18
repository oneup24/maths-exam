import React from 'react';
// eslint-disable-next-line no-unused-vars -- motion is used as <motion.div> in JSX
import {motion,AnimatePresence,LayoutGroup} from 'framer-motion';
import {ArrowLeft,BookOpen,Check} from 'lucide-react';
import {GC,GCL,CAT_COLORS,DIFF_COLORS} from '../../lib/colors';
import {TOPICS,GRADE_INFO,DIFF_INFO} from '../../engine/index';
import PageShell from '../ui/PageShell';

export default function SettingsView({grade,difficulty,setDifficulty,selTopics,toggleTopic,toggleAll,examType,setExamType,useTimer,setUseTimer,timerMins,setTimerMins,generate,onBack,L}){
  var co=GRADE_INFO[grade]?GRADE_INFO[grade].co:'indigo';
  return(
    <PageShell className="p-3 pb-20">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} aria-label="Back" className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-white border shadow-sm active:bg-gray-100 active:scale-[0.97] transition-all duration-200 flex items-center justify-center"><ArrowLeft size={18}/></button>
        <h2 className="font-black text-lg text-gray-800">P{grade} {GRADE_INFO[grade].nm}</h2>
      </div>

      {/* Difficulty */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50 mb-3">
        <h3 className="font-bold text-gray-700 mb-2">{L('diffTitle')}</h3>
        <LayoutGroup><div className="grid grid-cols-3 gap-2">
          {[1,2,3].map(d=>{var di=DIFF_INFO[d];return(
            <button key={d} onClick={()=>setDifficulty(d)}
              className={"relative py-3 rounded-xl border-2 text-center transition-all duration-200 active:scale-[0.97] "+(difficulty===d?DIFF_COLORS[d]:'border-gray-200 text-gray-400 bg-gray-50')}>
              {difficulty===d&&<motion.div layoutId="diffRing" className="absolute inset-0 rounded-xl border-2 border-indigo-400" transition={{type:'spring',stiffness:400,damping:30}}/>}
              <div className="text-lg">{di.ic}</div>
              <div className="text-sm font-bold">{di.nm}</div>
              <div className="text-[10px] opacity-70 mt-0.5">{di.desc}</div>
            </button>
          )})}
        </div></LayoutGroup>
      </div>

      {/* Topics */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50 mb-3">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-700 flex items-center gap-1"><BookOpen size={16}/>{L('topicsTitle')}</h3>
          <button onClick={toggleAll} className="text-xs px-3 py-1.5 rounded-xl bg-indigo-100 text-indigo-600 font-bold active:scale-[0.97] transition-all duration-200">{selTopics.size===TOPICS[grade].length?L('deselectAll'):L('selectAll')}</button>
        </div>
        <div className="space-y-1.5">
          {TOPICS[grade].map(t=>(
            <button key={t.id} onClick={()=>toggleTopic(t.id)}
              className={"w-full p-2.5 rounded-xl border-2 text-left transition-all duration-200 active:scale-[0.97] flex items-center gap-2 "+(selTopics.has(t.id)?GCL[co]+' border-current':'bg-gray-50 border-gray-200 text-gray-400')}>
              <span className="text-lg">{t.ic}</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold block truncate">{t.nm}</span>
                <span className={"text-xs px-1.5 py-0.5 rounded-lg "+(CAT_COLORS[t.cat]||'bg-gray-100')}>{t.cat}</span>
              </div>
              <AnimatePresence>{selTopics.has(t.id)&&<motion.span initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} transition={{duration:0.15}}><Check size={16}/></motion.span>}</AnimatePresence>
            </button>
          ))}
        </div>
      </div>

      {/* Exam Type */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50 mb-3">
        <h3 className="font-bold text-gray-700 mb-2">{L('typeTitle')}</h3>
        <div className="flex gap-2">
          {[{v:'practice',lk:'practice',dk:'practiceQ'},{v:'test',lk:'test',dk:'testQ'},{v:'exam',lk:'exam',dk:'examQ'}].map(e=>(
            <button key={e.v} onClick={()=>{setExamType(e.v);setTimerMins(e.v==='test'?30:e.v==='exam'?55:30);setUseTimer(e.v!=='practice')}}
              className={"flex-1 py-2.5 rounded-xl border-2 transition-all duration-200 active:scale-[0.97] "+(examType===e.v?'border-indigo-500 bg-indigo-50 text-indigo-700':'border-gray-200 text-gray-400')}>
              <div className="text-sm font-bold">{L(e.lk)}</div><div className="text-xs opacity-70">{L(e.dk)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Timer */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50 mb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-700">{L('timerTitle')}</h3>
          <button onClick={()=>setUseTimer(!useTimer)} className={"w-12 h-6 rounded-full transition-all "+(useTimer?'bg-indigo-500':'bg-gray-300')}>
            <div className={"w-5 h-5 bg-white rounded-full shadow transition-transform "+(useTimer?'translate-x-6':'translate-x-0.5')}/>
          </button>
        </div>
        {useTimer&&<div className="flex items-center gap-3 mt-2"><input type="range" min={10} max={90} value={timerMins} onChange={e=>setTimerMins(+e.target.value)} className="flex-1 accent-indigo-500"/><span className="text-sm font-bold text-indigo-600 w-16 text-right">{L('minutes',timerMins)}</span></div>}
      </div>

      <motion.button whileTap={{scale:.97}} onClick={generate} disabled={selTopics.size===0}
        animate={selTopics.size>0?{boxShadow:['0 10px 15px -3px rgba(99,102,241,0.2)','0 10px 15px -3px rgba(99,102,241,0.4)','0 10px 15px -3px rgba(99,102,241,0.2)']}:{}}
        transition={selTopics.size>0?{duration:2,repeat:Infinity,ease:'easeInOut'}:{}}
        className={"w-full py-5 rounded-3xl font-extrabold text-xl shadow-xl text-white transition-all "+(selTopics.size>0?'bg-gradient-to-r '+GC[co]+' active:shadow-md':'bg-gray-300')}>
        {L('generateBtn',DIFF_INFO[difficulty].nm,selTopics.size)}
      </motion.button>
    </PageShell>
  );
}
