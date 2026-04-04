import React,{useState,useEffect,useCallback,useRef} from 'react';
import confetti from 'canvas-confetti';
import {playCorrect,playWrong,playTick,playFanfare,playSubmit} from './lib/sounds';
import Onboarding from './Onboarding';
import PrivacyPolicy from './PrivacyPolicy';
import Profile from './Profile';
// eslint-disable-next-line no-unused-vars -- motion is used as <motion.div> in JSX
import {motion,AnimatePresence} from 'framer-motion';
import {Eye,ChevronDown,ChevronUp,X,Check,AlertTriangle,Settings,Volume2,VolumeX,Globe} from 'lucide-react';
import {TOPICS,GRADE_INFO,DIFF_INFO,buildExam,printExam,chkAns,saveHistory,loadHistory,clearHistory} from './lib/engine';
import {t} from './lib/i18n';
import { useAuth } from './hooks/useAuth';
import { saveExamResult } from './services/api';
import Login from './pages/Login';
import {GC} from './lib/colors';
import {track} from './lib/track';
import {pageTransition} from './lib/animations';
import SubmitModal from './components/modals/SubmitModal';
import PrintModal from './components/modals/PrintModal';
import SignUpPromptModal from './components/modals/SignUpPromptModal';
import PinModal from './components/modals/PinModal';
import PageShell from './components/ui/PageShell';
import GradeGrid from './components/home/GradeGrid';
import HistoryList from './components/home/HistoryList';
import GuestBanner from './components/home/GuestBanner';
import TrapInfoBox from './components/home/TrapInfoBox';
import SettingsView from './components/settings/SettingsView';
import ScoreReport from './components/exam/ScoreReport';
import ExamHeader from './components/exam/ExamHeader';
import ExamActions from './components/exam/ExamActions';
import FloatingSubmit from './components/exam/FloatingSubmit';

const fmt=t=>{var m=Math.floor(t/60),s=t%60;return m+':'+(s<10?'0':'')+s};

function useCountUp(target,duration=1200){
  const[val,setVal]=useState(0);
  const prev=useRef(0);
  useEffect(()=>{
    if(target===prev.current)return;
    var start=prev.current,diff=target-start,t0=null,raf;
    var step=ts=>{if(!t0)t0=ts;var p=Math.min((ts-t0)/duration,1);setVal(Math.round(start+diff*p*(2-p)));if(p<1)raf=requestAnimationFrame(step);};
    raf=requestAnimationFrame(step);
    prev.current=target;
    return()=>cancelAnimationFrame(raf);
  },[target,duration]);
  return val;
}

export default function App(){
  const[view,setView]=useState('home');
  const[grade,setGrade]=useState(()=>+(localStorage.getItem('selected_grade'))||4);
  const[selTopics,setSelTopics]=useState(new Set());
  const[examType,setExamType]=useState('exam');
  const[difficulty,setDifficulty]=useState(2);
  const[useTimer,setUseTimer]=useState(true);
  const[timerMins,setTimerMins]=useState(55);
  const[sections,setSections]=useState([]);
  const[revealed,setRevealed]=useState({});
  const[stepsShown,setStepsShown]=useState({});
  const[timeLeft,setTimeLeft]=useState(0);
  const[running,setRunning]=useState(false);
  const[showPrint,setShowPrint]=useState(false);
  const[printAns,setPrintAns]=useState(false);
  const[studentName,setStudentName]=useState(()=>localStorage.getItem('student_name')||'');
  const[answers,setAnswers]=useState({});
  const[mcSel,setMcSel]=useState({});
  const[isMarked,setIsMarked]=useState(false);
  const[markRes,setMarkRes]=useState({});
  const[totScore,setTotScore]=useState(0);
  const[showSubmit,setShowSubmit]=useState(false);
  const[showSignUpPrompt,setShowSignUpPrompt]=useState(false);
  const[cloudSaved,setCloudSaved]=useState(false);
  const[pinUnlocked,setPinUnlocked]=useState(false);
  const[showPinModal,setShowPinModal]=useState(false);
  const[pendingRevealKey,setPendingRevealKey]=useState(null);
  const[pendingRevealType,setPendingRevealType]=useState(null);
  const[wrongOnly,setWrongOnly]=useState(false);
  const[topicSummary,setTopicSummary]=useState([]);
  const[history,setHistory]=useState([]);
  const timerRef=useRef(null);
  const[onboarded,setOnboarded]=useState(()=>!!localStorage.getItem('onboarding_done'));
  const[skippedLogin,setSkippedLogin]=useState(false);
  const { user, loading: authLoading, signUp, signIn, signOut } = useAuth();
  const[streak,setStreak]=useState(()=>+(localStorage.getItem('streak_count')||0));
  const[soundOn,setSoundOn]=useState(()=>localStorage.getItem('sound_on')!=='0');
  const[showPrivacy,setShowPrivacy]=useState(false);
  const[lang,setLang]=useState(()=>localStorage.getItem('lang')||'zh');
  const L=(key,...args)=>t(lang,key,...args);
  const[gradeBest,setGradeBest]=useState(()=>{var b={};[1,2,3,4,5,6].forEach(g=>{var v=localStorage.getItem('grade_best_'+g);if(v)b[g]=+v});return b;});
  var isBirthday=(()=>{var bd=localStorage.getItem('student_birthday');if(!bd)return false;var b=new Date(bd),n=new Date();return b.getMonth()===n.getMonth()&&b.getDate()===n.getDate();})();

  useEffect(()=>{var ts=TOPICS[grade];if(ts)setSelTopics(new Set(ts.map(t=>t.id)))},[grade]);
  useEffect(()=>{setHistory(loadHistory())},[]);
  useEffect(()=>{if(running&&timeLeft>0){timerRef.current=setInterval(()=>{setTimeLeft(t=>{if(t<=1){setRunning(false);return 0}if(t<=60&&soundOn)playTick();return t-1})},1000);return()=>clearInterval(timerRef.current)}if(running&&timeLeft<=0)setRunning(false)},[running,timeLeft,soundOn]);

  var tryReveal=(key,type)=>{
    var pin=localStorage.getItem('parent_pin');
    if(!pin){/* no PIN set — reveal freely */if(type==='eye')setRevealed(r=>({...r,[key]:!r[key]}));else setStepsShown(r=>({...r,[key]:!r[key]}));return;}
    if(pinUnlocked){if(type==='eye')setRevealed(r=>({...r,[key]:!r[key]}));else setStepsShown(r=>({...r,[key]:!r[key]}));return;}
    setPendingRevealKey(key);setPendingRevealType(type);setShowPinModal(true);
  };
  var onPinSuccess=()=>{
    setPinUnlocked(true);setShowPinModal(false);
    if(pendingRevealKey!==null){if(pendingRevealType==='eye')setRevealed(r=>({...r,[pendingRevealKey]:!r[pendingRevealKey]}));else setStepsShown(r=>({...r,[pendingRevealKey]:!r[pendingRevealKey]}));}
    setPendingRevealKey(null);setPendingRevealType(null);
  };

  var completeOnboarding=(authData,chosenLang,chosenGrade)=>{
    if(chosenLang){setLang(chosenLang);localStorage.setItem('lang',chosenLang);}
    if(chosenGrade){setGrade(chosenGrade);}
    // authData is null for guest, truthy for signed-in user
    if(!authData)setSkippedLogin(true);
    setOnboarded(true);
  };

  var generate=useCallback(()=>{
    var exam=buildExam(grade,Array.from(selTopics),examType,difficulty);
    setSections(exam);setRevealed({});setStepsShown({});setAnswers({});setMcSel({});setIsMarked(false);setMarkRes({});setTotScore(0);setWrongOnly(false);setCloudSaved(false);setPinUnlocked(false);
    if(useTimer){setTimeLeft(timerMins*60);setRunning(true)}
    track('quiz_start',{grade:grade,topic:Array.from(selTopics).join(',')});
    setView('exam');
  },[grade,selTopics,examType,difficulty,useTimer,timerMins]);

  var toggleTopic=id=>{var s=new Set(selTopics);if(s.has(id))s.delete(id);else s.add(id);setSelTopics(s)};
  var toggleAll=()=>{var ts=TOPICS[grade].map(t=>t.id);setSelTopics(selTopics.size===ts.length?new Set():new Set(ts))};
  var grandTotal=sections.reduce((s,sec)=>s+sec.total,0);
  var totalQs=sections.reduce((s,sec)=>s+sec.qs.length,0);
  var answeredQs=sections.reduce((s,sec,si)=>s+sec.qs.filter((q,qi)=>{var k=si+'-'+qi;return q.isMC?!!mcSel[k]:!!(answers[k]||'').trim()}).length,0);
  var trapCount=sections.reduce((s,sec)=>s+sec.qs.filter(q=>q.trap).length,0);

  var markExam=()=>{
    var res={},sc=0;
    sections.forEach((sec,si)=>sec.qs.forEach((q,qi)=>{
      var k=si+'-'+qi,ok=false;
      if(q.isMC){ok=!!mcSel[k]&&mcSel[k]===q.a}else{ok=chkAns(answers[k],q.a)}
      var pts=ok?(q.sc||2):0;sc+=pts;res[k]={ok,pts,max:q.sc||2};
    }));
    setMarkRes(res);setTotScore(sc);setIsMarked(true);setRunning(false);setShowSubmit(false);
    var sp_pct=grandTotal>0?Math.round(sc/grandTotal*100):0;
    track('quiz_complete',{grade:grade,topic:Array.from(selTopics).join(','),score:sp_pct,total:totalQs});
    /* sounds */
    if(soundOn){var sp0=grandTotal>0?Math.round(sc/grandTotal*100):0;setTimeout(()=>{if(sp0>=80)playFanfare();else if(sp0>=50)playCorrect();else playWrong();},400);}
    /* confetti */
    var sp=grandTotal>0?Math.round(sc/grandTotal*100):0;
    var cols=['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#c77dff'];
    if(sp>=90){
      setTimeout(()=>{
        confetti({particleCount:80,angle:60,spread:55,origin:{x:0,y:0.65},colors:cols});
        confetti({particleCount:80,angle:120,spread:55,origin:{x:1,y:0.65},colors:cols});
      },300);
      setTimeout(()=>{
        confetti({particleCount:60,angle:60,spread:55,origin:{x:0,y:0.65},colors:cols});
        confetti({particleCount:60,angle:120,spread:55,origin:{x:1,y:0.65},colors:cols});
        confetti({particleCount:30,spread:70,origin:{y:0.5},shapes:['star'],colors:['#FFD700','#FFA500']});
      },800);
    }else if(sp>=80){
      setTimeout(()=>confetti({particleCount:120,spread:80,origin:{y:0.6},colors:cols}),300);
    }else if(sp>=50){
      setTimeout(()=>confetti({particleCount:50,spread:55,origin:{y:0.6},colors:['#ffd93d','#6bcb77','#4d96ff']}),300);
    }
    /* streak */
    var today=new Date().toISOString().slice(0,10);
    var last=localStorage.getItem('streak_last_date');
    var yesterday=new Date(Date.now()-864e5).toISOString().slice(0,10);
    var newStreak=last===today?+(localStorage.getItem('streak_count')||1):last===yesterday?+(localStorage.getItem('streak_count')||0)+1:1;
    localStorage.setItem('streak_count',newStreak);
    localStorage.setItem('streak_last_date',today);
    setStreak(newStreak);
    /* grade best */
    var prevBest=+(localStorage.getItem('grade_best_'+grade)||0);
    if(sp>prevBest){localStorage.setItem('grade_best_'+grade,sp);setGradeBest(p=>({...p,[grade]:sp}));}
    /* save to history */
    saveHistory({grade,difficulty,examType,score:sc,total:grandTotal,pct:grandTotal>0?Math.round(sc/grandTotal*100):0,qCount:totalQs,date:new Date().toLocaleDateString('zh-HK')});
    setHistory(loadHistory());
    /* compute topic breakdown from marked results */
    var tb={};
    sections.forEach(function(sec,si){sec.qs.forEach(function(q,qi){
      var tid=q.topicId||'unknown';
      if(!tb[tid])tb[tid]={total:0,wrong:0};
      tb[tid].total++;
      var mr=res[si+'-'+qi];
      if(mr&&!mr.ok)tb[tid].wrong++;
    })});
    /* build topic summary for results UI */
    var tNameMap={};
    sections.forEach(function(sec){sec.qs.forEach(function(q){if(q.topicId&&q.topicName)tNameMap[q.topicId]=q.topicName})});
    var ts=Object.keys(tb).filter(function(k){return k!=='unknown'}).map(function(tid){
      var c=tb[tid].total-tb[tid].wrong;
      return{id:tid,name:tNameMap[tid]||tid,total:tb[tid].total,correct:c,wrong:tb[tid].wrong,pct:Math.round(c/tb[tid].total*100)};
    }).sort(function(a,b){return a.pct-b.pct});
    setTopicSummary(ts);
    /* save to Supabase cloud */
    if(user){
      var correctCount=Object.values(res).filter(r=>r.ok).length;
      var elapsed=useTimer?timerMins*60-timeLeft:0;
      var tids=Object.keys(tb).filter(function(k){return k!=='unknown'});
      var topicVal=tids.length===1?tids[0]:'mixed';
      saveExamResult({userId:user.id,grade:String(grade),topic:topicVal,topicBreakdown:tb,totalQuestions:totalQs,correctAnswers:correctCount,scorePercent:sp,timeSpent:elapsed})
        .then(({error})=>{if(!error)setCloudSaved(true);});
    }
    setTimeout(()=>window.scrollTo({top:0,behavior:'smooth'}),100);
  };
  var resetMarking=()=>{setAnswers({});setMcSel({});setIsMarked(false);setMarkRes({});setTotScore(0);setWrongOnly(false);setRevealed({});setStepsShown({})};
  var retryWrong=()=>{
    var ws=sections.map((sec,si)=>{
      var wqs=sec.qs.filter((_,qi)=>{var mr=markRes[si+'-'+qi];return mr&&!mr.ok;});
      return{...sec,qs:wqs,total:wqs.reduce((s,q)=>s+(q.sc||2),0)};
    }).filter(s=>s.qs.length>0);
    setSections(ws);setAnswers({});setMcSel({});setIsMarked(false);setMarkRes({});setTotScore(0);setWrongOnly(false);setRevealed({});setStepsShown({});
    setTimeout(()=>window.scrollTo({top:0,behavior:'smooth'}),100);
  };
  var pct=grandTotal>0?Math.round(totScore/grandTotal*100):0;
  var fb=L('fb',pct);
  var secScores=si=>{var sec=sections[si];if(!sec)return 0;var total=0;sec.qs.forEach((q,qi)=>{var mr=markRes[si+'-'+qi];if(mr)total+=mr.pts});return total};

  var co=GRADE_INFO[grade]?GRADE_INFO[grade].co:'indigo';
  var animScore=useCountUp(isMarked?totScore:0);
  var animPct=useCountUp(isMarked?pct:0);

  /* ════════ AUTH LOADING ════════ */
  if(authLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 p-4 pb-20">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-1">
          {[1,2,3].map(i=><div key={i} className="w-11 h-11 rounded-xl bg-white/60 animate-pulse"/>)}
        </div>
        <div className="flex flex-col items-center py-8 mb-4">
          <div className="w-48 h-48 rounded-3xl bg-white/60 animate-pulse mb-3"/>
          <div className="w-40 h-6 rounded-lg bg-white/60 animate-pulse mb-2"/>
          <div className="w-56 h-4 rounded-lg bg-white/40 animate-pulse"/>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[1,2,3,4,5,6].map(i=><div key={i} className="h-28 rounded-3xl bg-white/40 animate-pulse"/>)}
        </div>
      </div>
    </div>
  );

  /* ════════ ONBOARDING (before auth — hook before ask) ════════ */
  if(!onboarded)return <Onboarding onComplete={completeOnboarding} lang={lang} signUp={signUp} signIn={signIn}/>;

  /* ════════ LOGIN (returning users only) ════════ */
  if(!user && !skippedLogin) return (
    <Login onAuth={{ signUp, signIn, skip: () => setSkippedLogin(true) }} />
  );

  /* ════════ PROFILE ════════ */
  if(view==='profile')return <Profile onBack={()=>setView('home')} lang={lang} studentName={studentName} setStudentName={setStudentName} streak={streak} user={user} signOut={async()=>{await signOut();setSkippedLogin(false);}} goToLogin={()=>setSkippedLogin(false)}/>;

  /* ════════ VIEWS ════════ */
  if(view==='home')return(
    <motion.div key="home" {...pageTransition}><PageShell>
      <div className="flex justify-between items-center mb-1">
        <button onClick={()=>{const v=lang==='zh'?'en':'zh';setLang(v);localStorage.setItem('lang',v);}} aria-label={lang==='zh'?'Switch to English':'切換至中文'}
          className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-white/60 active:bg-white active:scale-[0.97] border border-stone-200 shadow-sm text-gray-500 transition-all duration-200 hover:shadow-md flex items-center justify-center">
          <Globe size={18}/>
        </button>
        <button onClick={()=>setView('profile')} aria-label={lang==='zh'?'設定':'Settings'}
          className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-white/60 active:bg-white active:scale-[0.97] border border-stone-200 shadow-sm text-gray-500 transition-all duration-200 hover:shadow-md flex items-center justify-center">
          <Settings size={18}/>
        </button>
        <button onClick={()=>{const v=!soundOn;setSoundOn(v);localStorage.setItem('sound_on',v?'1':'0');}} aria-label={soundOn?(lang==='zh'?'關閉聲音':'Mute'):(lang==='zh'?'開啟聲音':'Unmute')}
          className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-white/60 active:bg-white active:scale-[0.97] border border-stone-200 shadow-sm text-gray-500 transition-all duration-200 hover:shadow-md flex items-center justify-center">
          {soundOn?<Volume2 size={18}/>:<VolumeX size={18}/>}
        </button>
      </div>
      <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className="text-center mb-4 pt-4">
        <img src={isBirthday?'/mascot-happy.png':'/mascot.png'} alt="mascot" className="w-48 h-48 object-cover rounded-3xl mx-auto mb-3 shadow-lg"/>
        {isBirthday&&<motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:200}} className="inline-flex items-center gap-1.5 bg-pink-100 border border-pink-200 text-pink-600 font-bold text-sm px-3 py-1.5 rounded-full mb-2">🎂 {lang==='zh'?'生日快樂！':'Happy Birthday!'}</motion.div>}
        <div className="flex items-center justify-center gap-3 mb-1">
          {studentName?<p className="text-base font-bold text-indigo-600">{L('greeting',studentName)}</p>:null}
          {streak>0&&<div className="flex items-center gap-1 bg-orange-100 border border-orange-200 px-2.5 py-1 rounded-full">
            <motion.span animate={{scale:[1,1.15,1]}} transition={{duration:2,repeat:Infinity,ease:'easeInOut'}} className="text-lg inline-block">🔥</motion.span>
            <span className="text-sm font-bold text-orange-500">{streak}</span>
            <span className="text-xs text-orange-400 font-bold">{lang==='zh'?'日':'d'}</span>
          </div>}
        </div>
        <h1 className="text-3xl font-black text-gray-800">{L('appTitle')}</h1>
        <p className="text-xs text-gray-400 mt-1">{L('appSubtitle')}</p>
        <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
          <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">{L('band1')}</span>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-0.5"><AlertTriangle size={10}/> {L('hasTrap')}</span>
        </div>
      </motion.div>
      {!user&&<GuestBanner onSignUp={()=>setSkippedLogin(false)} lang={lang}/>}
      <GradeGrid gradeBest={gradeBest} onSelect={g=>{setGrade(g);setView('settings')}} L={L}/>
      <HistoryList history={history} onClear={()=>{clearHistory();setHistory([])}} L={L}/>
      <TrapInfoBox L={L}/>
      <p className="text-center text-xs text-gray-300 mt-6">
        <button onClick={()=>setShowPrivacy(true)} className="underline hover:text-gray-400">{L('privacy')}</button>
      </p>
      <AnimatePresence>{showPrivacy&&<PrivacyPolicy onClose={()=>setShowPrivacy(false)}/>}</AnimatePresence>
    </PageShell></motion.div>
  );

  /* ════════ SETTINGS ════════ */
  if(view==='settings')return(
    <motion.div key="settings" {...pageTransition}>
      <SettingsView grade={grade} difficulty={difficulty} setDifficulty={setDifficulty} selTopics={selTopics} toggleTopic={toggleTopic} toggleAll={toggleAll} examType={examType} setExamType={setExamType} useTimer={useTimer} setUseTimer={setUseTimer} timerMins={timerMins} setTimerMins={setTimerMins} generate={generate} onBack={()=>setView('home')} L={L}/>
    </motion.div>
  );

  /* ════════ EXAM ════════ */
  return(
    <motion.div key="exam" {...pageTransition}>
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 p-3 pb-24">
      <SubmitModal isOpen={showSubmit} onClose={()=>setShowSubmit(false)} onConfirm={markExam} answeredQs={answeredQs} totalQs={totalQs} L={L}/>
      <PrintModal isOpen={showPrint} onClose={()=>setShowPrint(false)} studentName={studentName} onNameChange={setStudentName} printAns={printAns} setPrintAns={setPrintAns} onPrint={()=>{printExam(sections,grade,printAns,studentName,difficulty);setShowPrint(false)}} L={L}/>
      <SignUpPromptModal isOpen={showSignUpPrompt} onClose={()=>setShowSignUpPrompt(false)} onSignUp={()=>{setShowSignUpPrompt(false);setSkippedLogin(false);}} lang={lang}/>
      <PinModal isOpen={showPinModal} onClose={()=>{setShowPinModal(false);setPendingRevealKey(null);setPendingRevealType(null);}} onSuccess={onPinSuccess} lang={lang}/>

      <div className="max-w-xl mx-auto">
        <ExamHeader grade={grade} co={co} difficulty={difficulty} totalQs={totalQs} grandTotal={grandTotal} trapCount={trapCount} useTimer={useTimer} isMarked={isMarked} running={running} setRunning={setRunning} timeLeft={timeLeft} fmt={fmt} answeredQs={answeredQs} onBack={()=>{setRunning(false);setView('settings')}} L={L} lang={lang}/>

        <ScoreReport isMarked={isMarked} animScore={animScore} animPct={animPct} pct={pct} grandTotal={grandTotal} fb={fb} user={user} cloudSaved={cloudSaved} lang={lang} sections={sections} secScores={secScores} topicSummary={topicSummary} wrongOnly={wrongOnly} setWrongOnly={setWrongOnly} resetMarking={resetMarking} generate={generate} retryWrong={retryWrong} markRes={markRes} answers={answers} mcSel={mcSel} totScore={totScore} grade={grade} studentName={studentName} L={L}/>

        {/* Section nav */}
        <div className="flex gap-1 mb-2 overflow-x-auto pb-1 -mx-1 px-1">
          {sections.map((sec,i)=>(
            <a key={i} href={'#s'+i} className="shrink-0 px-3 py-2 bg-white border rounded-lg text-xs font-bold text-gray-600 hover:bg-indigo-50 active:bg-indigo-100 active:scale-[0.97] flex items-center gap-1 transition-all duration-200">
              {sec.label}（{sec.qs.length}）{isMarked&&<span className="text-xs text-gray-400">{secScores(i)}/{sec.total}</span>}
            </a>
          ))}
        </div>

        {/* Questions */}
        {sections.map((sec,si)=>{
          var filteredQs=sec.qs.map((q,qi)=>({q,qi,k:si+'-'+qi})).filter(item=>!wrongOnly||!(markRes[item.k]||{}).ok);
          if(wrongOnly&&filteredQs.length===0)return null;
          return(
            <div key={si} id={'s'+si} className="mb-4">
              <div className={"bg-gradient-to-r "+GC[co]+" text-white rounded-t-xl px-4 py-2"}>
                <div className="flex justify-between items-center"><span className="font-bold text-sm sm:text-base">{sec.label}. {sec.nm}（{sec.qs.length}題）</span><span className="text-sm font-bold">{isMarked?secScores(si)+'/':''}{sec.total}分</span></div>
                <p className="text-xs opacity-80">{sec.nt}</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-b-xl border border-t-0 border-white/50 divide-y divide-gray-100">
                {filteredQs.map(item=>{
                  var q=item.q,qi=item.qi,k=item.k;
                  var isR=revealed[k],isS=stepsShown[k],mr=markRes[k];
                  return(
                    <div key={qi} className={"p-4 transition-colors duration-200 "+(isMarked?(mr&&mr.ok?'bg-emerald-50/30':'bg-red-50/30'):'')}>
                      <div className="flex items-start gap-2">
                        <div className="flex items-center gap-1 shrink-0 w-8">
                          <span className="text-base font-extrabold text-gray-300">{qi+1}.</span>
                          {isMarked&&(mr&&mr.ok?<Check size={14} className="text-emerald-500"/>:<X size={14} className="text-red-500"/>)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-1.5 flex-wrap">
                            <p className="text-base font-semibold text-gray-800 whitespace-pre-line flex-1">{q.q}</p>
                            {q.trap&&!isMarked&&<span className="shrink-0 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-0.5"><AlertTriangle size={8}/>含干擾</span>}
                          </div>
                          {q.sc>2&&<span className="text-xs text-gray-400">（{q.sc}分）</span>}
                          {q.fig&&<div className="my-2 flex justify-center" dangerouslySetInnerHTML={{__html:q.fig}}/>}
                          {q.isMC&&q.opts&&(
                            <div className="mt-2 grid grid-cols-1 gap-1">{q.opts.map(o=>{
                              var isSel=mcSel[k]===o.l;
                              var cls=isMarked?(o.l===q.a?'border-emerald-400 bg-emerald-50 font-bold text-emerald-700':isSel&&o.l!==q.a?'border-red-400 bg-red-50 text-red-700 line-through':'border-gray-200 bg-gray-50 text-gray-400'):(isSel?'border-indigo-400 bg-indigo-100 font-bold text-indigo-700 ring-2 ring-indigo-200':'border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer');
                              return(
                                <motion.button key={o.l} whileTap={isMarked?{}:{scale:0.97}} onClick={()=>{if(!isMarked)setMcSel(p=>({...p,[k]:o.l}))}} disabled={isMarked}
                                  className={"text-sm px-3 py-3 rounded-xl border-2 text-left flex items-center gap-2 transition-all duration-200 "+cls}>
                                  <span className={"w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold "+(isSel&&!isMarked?'bg-indigo-500 border-indigo-500 text-white':isMarked&&o.l===q.a?'bg-emerald-500 border-emerald-500 text-white':'border-gray-300 text-gray-400')}>{o.l}</span>
                                  <span>{o.v}</span>
                                  {isMarked&&o.l===q.a&&<Check size={14} className="ml-auto text-emerald-500"/>}
                                  {isMarked&&isSel&&o.l!==q.a&&<X size={14} className="ml-auto text-red-500"/>}
                                </motion.button>
                              );
                            })}</div>
                          )}
                          {!q.isMC&&(sec.id==='work'?(
                            <textarea value={answers[k]||''} onChange={e=>{if(!isMarked)setAnswers(p=>({...p,[k]:e.target.value}))}}
                              placeholder={L('workPH')} disabled={isMarked}
                              className={"w-full mt-2 px-4 py-3 border-2 rounded-2xl text-base resize-y focus:outline-none "+(isMarked?(mr&&mr.ok?'border-emerald-300 bg-emerald-50':'border-red-300 bg-red-50'):'border-gray-200 focus:border-indigo-400')} rows={3}/>
                          ):(
                            <input type="text" inputMode="decimal" value={answers[k]||''} onChange={e=>{if(!isMarked)setAnswers(p=>({...p,[k]:e.target.value}))}}
                              placeholder={L('ansPH')} disabled={isMarked}
                              className={"w-full mt-2 px-4 py-3 border-2 rounded-2xl text-base focus:outline-none "+(isMarked?(mr&&mr.ok?'border-emerald-300 bg-emerald-50':'border-red-300 bg-red-50'):'border-gray-200 focus:border-indigo-400')}/>
                          ))}
                          {isMarked&&mr&&(
                            <div className={"mt-2 px-3 py-2 rounded-lg border "+(mr.ok?'bg-emerald-50 border-emerald-200':'bg-red-50 border-red-200')}>
                              {mr.ok?<span className="text-emerald-700 font-bold text-sm">{L('correct',mr.pts)}</span>
                              :<div><span className="text-red-600 font-bold text-sm">{L('wrongAns')}</span><span className="text-red-800 font-bold text-sm">{q.a}</span></div>}
                            </div>
                          )}
                          {isMarked&&q.trap&&(
                            <div className="mt-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
                              <div className="flex items-start gap-1.5">
                                <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0"/>
                                <div>
                                  <p className="text-xs font-bold text-amber-700">{L('trapInfoTitle')}</p>
                                  <p className="text-xs text-amber-600 mt-0.5">{L('trapInfoDesc',q.trap)}</p>
                                </div>
                              </div>
                            </div>
                          )}
                          {isR&&!isMarked&&(
                            <div className="mt-2 bg-emerald-50 rounded-lg px-3 py-2 border border-emerald-200"><p className="text-sm font-bold text-emerald-700">💡 {q.a}</p></div>
                          )}
                          {(isS||(isMarked&&mr&&!mr.ok))&&q.s&&(
                            <div className="mt-2 bg-sky-50 rounded-lg px-3 py-2 border border-sky-200">
                              <p className="text-xs font-bold text-sky-600 mb-1">{L('stepsTitle')}</p>
                              {q.s.map((st,i)=>(
                                <p key={i} className={"text-xs mt-0.5 "+(st.startsWith('🔍')?'text-amber-700 font-bold':'text-sky-700')}>
                                  {st.startsWith('🔍')?st:(st.startsWith('❌')||st.startsWith('✅')?st:'步驟'+(i+1)+'：'+st)}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                        {!isMarked&&(
                          <div className="flex flex-col gap-1 shrink-0">
                            <button onClick={()=>tryReveal(k,'eye')} aria-label={lang==='zh'?'顯示答案':'Show answer'} className={"p-2.5 min-w-[44px] min-h-[44px] rounded-lg font-bold transition-all duration-200 flex items-center justify-center "+(isR?'bg-emerald-200 text-emerald-700':'bg-gray-100 text-gray-400 active:bg-gray-200 active:scale-[0.97]')}><Eye size={14}/></button>
                            <button onClick={()=>tryReveal(k,'steps')} aria-label={lang==='zh'?'顯示步驟':'Show steps'} className="p-2.5 min-w-[44px] min-h-[44px] rounded-lg font-bold bg-gray-100 text-gray-400 active:bg-gray-200 active:scale-[0.97] transition-all duration-200 flex items-center justify-center">{isS?<ChevronUp size={14}/>:<ChevronDown size={14}/>}</button>
                          </div>
                        )}
                        {isMarked&&mr&&!mr.ok&&(
                          <button onClick={()=>setStepsShown(r=>({...r,[k]:!r[k]}))} aria-label={lang==='zh'?'解題步驟':'Solution steps'} className="p-2.5 min-w-[44px] min-h-[44px] rounded-lg font-bold bg-sky-100 text-sky-600 shrink-0 self-start mt-1 active:bg-sky-200 active:scale-[0.97] transition-all duration-200 flex items-center justify-center">📖</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <ExamActions isMarked={isMarked} co={co} resetMarking={resetMarking} generate={generate} onPrint={()=>user?setShowPrint(true):setShowSignUpPrompt(true)} onHome={()=>{setRunning(false);setView('home')}} L={L}/>
      </div>

      <FloatingSubmit isMarked={isMarked} answeredQs={answeredQs} totalQs={totalQs} onSubmit={()=>{if(soundOn)playSubmit();setShowSubmit(true);}} L={L}/>
    </div>
    </motion.div>
  );
}