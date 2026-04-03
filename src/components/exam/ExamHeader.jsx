import React from 'react';
import {ArrowLeft,Play,Pause,AlertTriangle} from 'lucide-react';
import {GCL,DIFF_BADGE} from '../../lib/colors';
import {DIFF_INFO} from '../../lib/engine';

export default function ExamHeader({grade,co,difficulty,totalQs,grandTotal,trapCount,useTimer,isMarked,running,setRunning,timeLeft,fmt,answeredQs,onBack,L,lang}){
  return(
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 mb-2 shadow-sm border border-white/50">
      <div className="flex items-center justify-between flex-wrap gap-1">
        <button onClick={onBack} aria-label={lang==='zh'?'返回設定':'Back to settings'} className="text-indigo-600 text-sm font-bold flex items-center gap-1 py-1 active:opacity-70 transition-all duration-200"><ArrowLeft size={14}/>{L('settingsBtn')}</button>
        <div className="flex items-center gap-1.5">
          <span className={"text-xs font-bold px-2 py-0.5 rounded-full "+GCL[co]}>P{grade}</span>
          <span className={"text-xs font-bold px-2 py-0.5 rounded-full "+DIFF_BADGE[difficulty]}>{DIFF_INFO[difficulty].ic}{DIFF_INFO[difficulty].nm}</span>
        </div>
        <span className="text-xs text-gray-500">{L('totalQS',totalQs,grandTotal)}</span>
      </div>
      <h2 className="text-center font-black text-gray-800 mt-1">{L('examTitle')}</h2>
      {trapCount>0&&<p className="text-center text-xs text-amber-600 font-bold flex items-center justify-center gap-1 mt-0.5"><AlertTriangle size={10}/>{L('trapCount',trapCount)}</p>}
      {useTimer&&!isMarked&&(
        <div className="flex items-center justify-center gap-3 mt-2">
          <button onClick={()=>setRunning(!running)} aria-label={running?(lang==='zh'?'暫停':'Pause'):(lang==='zh'?'開始':'Play')} className="p-2.5 min-w-[44px] min-h-[44px] rounded-lg bg-indigo-100 text-indigo-600 active:bg-indigo-200 active:scale-[0.97] transition-all duration-200 flex items-center justify-center">{running?<Pause size={16}/>:<Play size={16}/>}</button>
          <span className={"text-xl font-mono font-bold "+(timeLeft<60?'text-red-500 animate-pulse':'text-gray-700')}>{fmt(timeLeft)}</span>
        </div>
      )}
      {!isMarked&&(
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1"><span>{L('progress')}</span><span className="font-bold">{answeredQs}/{totalQs}</span></div>
          <div className="w-full bg-gray-200 rounded-full h-2.5" role="progressbar" aria-valuenow={answeredQs} aria-valuemin={0} aria-valuemax={totalQs}><div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300" style={{width:(totalQs>0?answeredQs/totalQs*100:0)+'%'}}/></div>
        </div>
      )}
    </div>
  );
}
