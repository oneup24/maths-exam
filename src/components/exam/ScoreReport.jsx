import React from 'react';
// eslint-disable-next-line no-unused-vars -- motion is used as <motion.div> in JSX
import {motion,AnimatePresence} from 'framer-motion';
import {Trophy,RotateCcw} from 'lucide-react';
import ExportPDFButton from '../ExportPDFButton';

export default function ScoreReport({isMarked,animScore,animPct,pct,grandTotal,fb,user,cloudSaved,lang,sections,secScores,topicSummary,wrongOnly,setWrongOnly,resetMarking,generate,retryWrong,markRes,answers,mcSel,totScore,grade,studentName,L}){
  return(
    <AnimatePresence>{isMarked&&(
      <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-3 shadow-lg border-2 border-indigo-200" aria-live="polite">
        <div className="flex items-center justify-center gap-1 mb-1"><Trophy size={20} className="text-yellow-500"/><h3 className="font-black text-lg">{L('scoreReport')}</h3></div>
        <div className="text-center my-3">
          <div><span className="text-5xl font-black text-indigo-600">{animScore}</span><span className="text-2xl text-gray-300"> / {grandTotal}</span></div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
            <motion.div initial={{width:0}} animate={{width:pct+'%'}} transition={{duration:1}} className={"h-3 rounded-full "+(pct>=70?'bg-emerald-500':pct>=50?'bg-amber-500':'bg-red-500')}/>
          </div>
          <span className="text-sm font-bold text-gray-500 mt-1 inline-block">{animPct}%</span>
          <div className="mt-2">
            <motion.img src={pct>=80?'/mascot-happy.png':pct>=50?'/mascot-ok.png':'/mascot-sad.png'} alt="mascot"
              initial={{scale:0.7,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:'spring',stiffness:200}}
              className="w-44 h-44 object-cover rounded-3xl mx-auto shadow-md"/>
            <p className={"text-sm font-extrabold mt-1 "+fb.c}>{fb.m}</p>
            <p className={"text-xs mt-1 "+(user&&cloudSaved?'text-emerald-500':user?'text-gray-400':'text-gray-400')}>
              {user&&cloudSaved?(lang==='zh'?'☁️ 已保存到雲端':'☁️ Saved to cloud'):user?(lang==='zh'?'⏳ 保存中...':'⏳ Saving...'):(lang==='zh'?'💾 僅本地保存':'💾 Local only')}
            </p>
          </div>
        </div>
        <div className="border-t pt-2 space-y-1">
          {sections.map((sec,si)=>{var ss=secScores(si);var sp=sec.total>0?Math.round(ss/sec.total*100):0;return(
            <div key={si} className="flex items-center gap-2 text-sm">
              <span className="font-bold text-gray-500 w-6">{sec.label}.</span>
              <span className="flex-1 text-gray-600 truncate">{sec.nm}（{sec.qs.length}題）</span>
              <div className="w-20 bg-gray-200 rounded-full h-2"><div className={"h-2 rounded-full transition-all duration-300 "+(sp>=70?'bg-emerald-500':sp>=50?'bg-amber-500':'bg-red-400')} style={{width:sp+'%'}}/></div>
              <span className="text-xs font-bold w-12 text-right">{ss}/{sec.total}</span>
            </div>
          )})}
        </div>
        {topicSummary.length>0&&(
          <div className="mt-3 rounded-xl p-3 bg-gray-50">
            <h4 className="font-bold text-sm text-gray-700 mb-2">📊 {lang==='zh'?'各單元表現':'Topic Performance'}</h4>
            <div className="space-y-1.5">
              {topicSummary.map(t=>{var tcls=t.pct>=80?'border-l-emerald-500':t.pct>=50?'border-l-amber-500':'border-l-red-500';var txtcls=t.pct>=80?'text-emerald-600':t.pct>=50?'text-amber-600':'text-red-500';var barcls=t.pct>=80?'bg-emerald-500':t.pct>=50?'bg-amber-500':'bg-red-400';var emoji=t.pct>=80?'✅':t.pct>=50?'⚠️':'❌';return(
                <div key={t.id} className={"bg-white rounded-lg px-3 py-2 border-l-4 "+tcls}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm shrink-0">{emoji}</span>
                    <span className="text-xs font-bold text-gray-700 flex-1 truncate">{t.name}</span>
                    <span className={"text-xs font-bold shrink-0 "+txtcls}>{t.correct}/{t.total} ({t.pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5"><div className={"h-1.5 rounded-full transition-all duration-300 "+barcls} style={{width:t.pct+'%'}}/></div>
                </div>
              )})}
            </div>
          </div>
        )}
        <div className="flex gap-2 mt-3 flex-wrap">
          <button onClick={()=>setWrongOnly(!wrongOnly)} className={"flex-1 min-w-[80px] py-2.5 rounded-xl text-xs font-bold border-2 transition-all duration-200 active:scale-[0.97] "+(wrongOnly?'border-red-400 bg-red-50 text-red-600':'border-gray-200 text-gray-500')}>{wrongOnly?L('showAll'):L('showWrong')}</button>
          <button onClick={resetMarking} className="flex-1 min-w-[80px] py-2.5 rounded-xl text-xs font-bold border-2 border-blue-200 text-blue-600 flex items-center justify-center gap-1 transition-all duration-200 active:scale-[0.97]"><RotateCcw size={12}/>{L('retry')}</button>
          <button onClick={generate} className="flex-1 min-w-[80px] py-2.5 rounded-xl text-xs font-bold border-2 border-indigo-200 text-indigo-600 flex items-center justify-center gap-1 transition-all duration-200 active:scale-[0.97]"><RotateCcw size={12}/>{L('newExam')}</button>
          <ExportPDFButton sections={sections} markRes={markRes} answers={answers} mcSel={mcSel} topicSummary={topicSummary} totScore={totScore} grandTotal={grandTotal} pct={pct} grade={grade} lang={lang} studentName={studentName} user={user}/>
          {Object.values(markRes).some(r=>!r.ok)&&<button onClick={retryWrong} className="w-full py-2.5 rounded-xl text-xs font-bold border-2 border-rose-300 bg-rose-50 text-rose-600 flex items-center justify-center gap-1 mt-1 transition-all duration-200 active:scale-[0.97]">{L('reviewWrong')}</button>}
        </div>
      </motion.div>
    )}</AnimatePresence>
  );
}
