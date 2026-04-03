import React,{useState,useEffect,useCallback,useRef} from 'react';
import confetti from 'canvas-confetti';
import {playCorrect,playWrong,playTick,playFanfare,playSubmit} from './lib/sounds';
import Onboarding from './Onboarding';
import PrivacyPolicy from './PrivacyPolicy';
import Profile from './Profile';
// eslint-disable-next-line no-unused-vars
import {motion,AnimatePresence} from 'framer-motion';
import {ArrowLeft,RotateCcw,Eye,Printer,ChevronDown,ChevronUp,X,Check,Play,Pause,BookOpen,Send,Trophy,AlertTriangle,Home,Clock,History,Trash2} from 'lucide-react';
import {TOPICS,GRADE_INFO,DIFF_INFO,buildExam,printExam,chkAns,saveHistory,loadHistory,clearHistory} from './lib/engine';
import {t} from './lib/i18n';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';

const fmt=t=>{var m=Math.floor(t/60),s=t%60;return m+':'+(s<10?'0':'')+s};

export default function App(){
  const[view,setView]=useState('home');
  const[grade,setGrade]=useState(4);
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
  const[wrongOnly,setWrongOnly]=useState(false);
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

  var completeOnboarding=n=>{
    if(n){setStudentName(n);localStorage.setItem('student_name',n);}
    localStorage.setItem('onboarding_done','1');
    setOnboarded(true);
  };

  var generate=useCallback(()=>{
    var exam=buildExam(grade,Array.from(selTopics),examType,difficulty);
    setSections(exam);setRevealed({});setStepsShown({});setAnswers({});setMcSel({});setIsMarked(false);setMarkRes({});setTotScore(0);setWrongOnly(false);
    if(useTimer){setTimeLeft(timerMins*60);setRunning(true)}
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

  var GC={rose:'from-rose-500 to-rose-600',orange:'from-orange-500 to-orange-600',amber:'from-amber-500 to-amber-600',emerald:'from-emerald-500 to-emerald-600',sky:'from-sky-500 to-sky-600',violet:'from-violet-500 to-violet-600'};
  var GCL={rose:'bg-rose-50 border-rose-200 text-rose-700',orange:'bg-orange-50 border-orange-200 text-orange-700',amber:'bg-amber-50 border-amber-200 text-amber-700',emerald:'bg-emerald-50 border-emerald-200 text-emerald-700',sky:'bg-sky-50 border-sky-200 text-sky-700',violet:'bg-violet-50 border-violet-200 text-violet-700'};
  var co=GRADE_INFO[grade]?GRADE_INFO[grade].co:'indigo';
  var catColors={'數':'bg-blue-100 text-blue-700','代數':'bg-purple-100 text-purple-700','度量':'bg-green-100 text-green-700','圖形與空間':'bg-orange-100 text-orange-700','數據處理':'bg-pink-100 text-pink-700'};

  /* ════════ AUTH LOADING ════════ */
  if(authLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50">
      <div className="text-center">
        <span className="text-5xl">🧮</span>
        <p className="text-gray-400 mt-3 font-bold">Loading...</p>
      </div>
    </div>
  );

  /* ════════ LOGIN ════════ */
  if(!user && !skippedLogin) return (
    <Login onAuth={{ signUp, signIn, skip: () => setSkippedLogin(true) }} />
  );

  /* ════════ ONBOARDING ════════ */
  if(!onboarded)return <Onboarding onComplete={completeOnboarding} lang={lang}/>;

  /* ════════ PROFILE ════════ */
  if(view==='profile')return <Profile onBack={()=>setView('home')} lang={lang} studentName={studentName} setStudentName={setStudentName} streak={streak} user={user} signOut={async()=>{await signOut();setSkippedLogin(false);}} goToLogin={()=>setSkippedLogin(false)}/>;

  /* ════════ HOME ════════ */
  if(view==='home')return(
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 p-4 pb-20">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-1">
          <button onClick={()=>{const v=lang==='zh'?'en':'zh';setLang(v);localStorage.setItem('lang',v);}}
            className="text-xs font-black px-3 py-1.5 rounded-full bg-white/60 active:bg-white border border-stone-200 shadow-sm text-gray-600">
            {lang==='zh'?'EN':'中'}
          </button>
          <button onClick={()=>setView('profile')}
            className="text-xl p-2 rounded-full bg-white/60 active:bg-white border border-stone-200 shadow-sm">
            ⚙️
          </button>
          <button onClick={()=>{const v=!soundOn;setSoundOn(v);localStorage.setItem('sound_on',v?'1':'0');}}
            className="text-xl p-2 rounded-full bg-white/60 active:bg-white border border-stone-200 shadow-sm">
            {soundOn?'🔊':'🔇'}
          </button>
        </div>
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className="text-center mb-4 pt-4">
          <img src={isBirthday?'/mascot-happy.png':'/mascot.png'} alt="mascot" className="w-48 h-48 object-cover rounded-3xl mx-auto mb-3 shadow-lg"/>
          {isBirthday&&<motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:200}} className="inline-flex items-center gap-1.5 bg-pink-100 border border-pink-200 text-pink-600 font-bold text-sm px-3 py-1.5 rounded-full mb-2">🎂 {lang==='zh'?'生日快樂！':'Happy Birthday!'}</motion.div>}
          <div className="flex items-center justify-center gap-3 mb-1">
            {studentName?<p className="text-base font-bold text-indigo-600">{L('greeting',studentName)}</p>:null}
            {streak>0&&<div className="flex items-center gap-1 bg-orange-100 border border-orange-200 px-2.5 py-1 rounded-full">
              <span className="text-lg">🔥</span>
              <span className="text-sm font-black text-orange-500">{streak}</span>
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
        {!user&&(
          <div className="bg-orange-50 border border-orange-300 rounded-xl p-3 mb-3 flex items-center justify-between gap-2">
            <span className="text-orange-700 text-xs font-bold flex-1">{lang==='zh'?'👻 訪客模式 — 成績不會同步到雲端。註冊以保存進度！':'👻 Guest Mode — Scores won\'t sync. Sign up to save!'}</span>
            <button onClick={()=>setSkippedLogin(false)} className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0">{lang==='zh'?'註冊':'Sign Up'}</button>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[1,2,3,4,5,6].map(g=>{
            var best=gradeBest[g]||0;
            var stars=best>=80?3:best>=60?2:best>=40?1:0;
            return(
              <motion.button key={g} whileTap={{scale:.96}} onClick={()=>{setGrade(g);setView('settings')}}
                className={"relative p-5 rounded-3xl bg-gradient-to-br "+GC[GRADE_INFO[g].co]+" text-white shadow-lg active:shadow-md transition-shadow"}>
                {stars>0&&<div className="absolute top-2 right-2 flex gap-0.5">
                  {[1,2,3].map(s=><span key={s} className={"text-base "+(s<=stars?'opacity-100':'opacity-25')}>⭐</span>)}
                </div>}
                <div className="text-4xl font-black">P{g}</div>
                <div className="text-base font-bold opacity-90">{GRADE_INFO[g].nm}</div>
                <div className="text-xs opacity-70 mt-1">{best>0?L('bestScore',best):L('topicsCount',TOPICS[g].length)}</div>
              </motion.button>
            );
          })}
        </div>
        {/* History Section */}
        {history.length>0&&(
          <div className="bg-white rounded-2xl p-4 shadow-sm border mb-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-700 flex items-center gap-1.5"><History size={16}/>{L('historyTitle')}</h3>
              <button onClick={()=>{clearHistory();setHistory([])}} className="text-xs text-red-400 flex items-center gap-0.5"><Trash2 size={12}/>{L('clearHistory')}</button>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {history.slice(0,8).map((h,i)=>(
                <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <span className={"text-xs font-bold px-1.5 py-0.5 rounded "+GCL[GRADE_INFO[h.grade]?.co||'indigo']}>P{h.grade}</span>
                    <span className="text-xs text-gray-400">{DIFF_INFO[h.difficulty]?.ic}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={"w-12 bg-gray-200 rounded-full h-1.5"}><div className={"h-1.5 rounded-full "+(h.pct>=70?'bg-emerald-500':h.pct>=50?'bg-amber-500':'bg-red-400')} style={{width:h.pct+'%'}}/></div>
                    <span className="text-xs font-bold text-gray-600 w-14 text-right">{h.score}/{h.total}</span>
                    <span className="text-xs text-gray-300">{h.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0"/>
            <div>
              <p className="text-xs font-bold text-amber-700">{L('trapBoxTitle')}</p>
              <p className="text-xs text-amber-600 mt-0.5">{L('trapBoxDesc')}</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-300 mt-6">
          <button onClick={()=>setShowPrivacy(true)} className="underline hover:text-gray-400">{L('privacy')}</button>
        </p>
      </div>

      <AnimatePresence>{showPrivacy&&<PrivacyPolicy onClose={()=>setShowPrivacy(false)}/>}</AnimatePresence>
    </div>
  );

  /* ════════ SETTINGS ════════ */
  if(view==='settings')return(
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 p-3 pb-20">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={()=>setView('home')} className="p-2 rounded-xl bg-white border active:bg-gray-100"><ArrowLeft size={18}/></button>
          <div><h2 className="font-black text-lg text-gray-800">P{grade} {GRADE_INFO[grade].nm}</h2></div>
        </div>

        {/* Difficulty — NEW */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border mb-3">
          <h3 className="font-bold text-gray-700 mb-2">{L('diffTitle')}</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1,2,3].map(d=>{var di=DIFF_INFO[d];var dcol={1:'border-emerald-500 bg-emerald-50 text-emerald-700',2:'border-amber-500 bg-amber-50 text-amber-700',3:'border-rose-500 bg-rose-50 text-rose-700'};return(
              <button key={d} onClick={()=>setDifficulty(d)}
                className={"py-3 rounded-xl border-2 text-center transition-all "+(difficulty===d?dcol[d]:'border-gray-200 text-gray-400 bg-gray-50')}>
                <div className="text-lg">{di.ic}</div>
                <div className="text-sm font-bold">{di.nm}</div>
                <div className="text-[10px] opacity-70 mt-0.5">{di.desc}</div>
              </button>
            )})}
          </div>
        </div>

        {/* Topics */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border mb-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-700 flex items-center gap-1"><BookOpen size={16}/>{L('topicsTitle')}</h3>
            <button onClick={toggleAll} className="text-xs px-3 py-1 rounded-lg bg-indigo-100 text-indigo-600 font-bold">{selTopics.size===TOPICS[grade].length?L('deselectAll'):L('selectAll')}</button>
          </div>
          <div className="space-y-1.5">
            {TOPICS[grade].map(t=>(
              <button key={t.id} onClick={()=>toggleTopic(t.id)}
                className={"w-full p-2.5 rounded-xl border-2 text-left transition-all flex items-center gap-2 "+(selTopics.has(t.id)?GCL[co]+' border-current':'bg-gray-50 border-gray-200 text-gray-400')}>
                <span className="text-lg">{t.ic}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold block truncate">{t.nm}</span>
                  <span className={"text-xs px-1.5 py-0.5 rounded "+(catColors[t.cat]||'bg-gray-100')}>{t.cat}</span>
                </div>
                {selTopics.has(t.id)&&<Check size={16}/>}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Type */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border mb-3">
          <h3 className="font-bold text-gray-700 mb-2">{L('typeTitle')}</h3>
          <div className="flex gap-2">
            {[{v:'practice',lk:'practice',dk:'practiceQ'},{v:'test',lk:'test',dk:'testQ'},{v:'exam',lk:'exam',dk:'examQ'}].map(e=>(
              <button key={e.v} onClick={()=>{setExamType(e.v);setTimerMins(e.v==='test'?30:e.v==='exam'?55:30);setUseTimer(e.v!=='practice')}}
                className={"flex-1 py-2.5 rounded-xl border-2 transition-all "+(examType===e.v?'border-indigo-500 bg-indigo-50 text-indigo-700':'border-gray-200 text-gray-400')}>
                <div className="text-sm font-bold">{L(e.lk)}</div><div className="text-xs opacity-70">{L(e.dk)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border mb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-700">{L('timerTitle')}</h3>
            <button onClick={()=>setUseTimer(!useTimer)} className={"w-12 h-6 rounded-full transition-all "+(useTimer?'bg-indigo-500':'bg-gray-300')}>
              <div className={"w-5 h-5 bg-white rounded-full shadow transition-transform "+(useTimer?'translate-x-6':'translate-x-0.5')}/>
            </button>
          </div>
          {useTimer&&<div className="flex items-center gap-3 mt-2"><input type="range" min={10} max={90} value={timerMins} onChange={e=>setTimerMins(+e.target.value)} className="flex-1 accent-indigo-500"/><span className="text-sm font-bold text-indigo-600 w-16 text-right">{L('minutes',timerMins)}</span></div>}
        </div>

        <motion.button whileTap={{scale:.97}} onClick={generate} disabled={selTopics.size===0}
          className={"w-full py-5 rounded-3xl font-extrabold text-xl shadow-xl text-white transition-all "+(selTopics.size>0?'bg-gradient-to-r '+GC[co]+' active:shadow-md':'bg-gray-300')}>
          {L('generateBtn',DIFF_INFO[difficulty].nm,selTopics.size)}
        </motion.button>
      </div>
    </div>
  );

  /* ════════ EXAM ════════ */
  return(
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 p-3 pb-24">
      <AnimatePresence>{showSubmit&&(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,0,0,.5)'}}>
          <motion.div initial={{scale:.9}} animate={{scale:1}} className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl">
            <h3 className="font-extrabold text-lg text-center mb-3">{L('confirmSubmitTitle')}</h3>
            <div className="text-center mb-4">
              <div className="text-4xl font-black text-indigo-600">{answeredQs}<span className="text-lg text-gray-300">/{totalQs}</span></div>
              <p className="text-sm text-gray-500 mt-1">{L('answeredLabel')}</p>
              {answeredQs<totalQs&&<p className="text-xs text-orange-500 font-bold mt-2">{L('unanswered',totalQs-answeredQs)}</p>}
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setShowSubmit(false)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-500 active:bg-gray-100">{L('continueBtn')}</button>
              <button onClick={markExam} className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-sm">{L('confirmBtn')}</button>
            </div>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>

      <AnimatePresence>{showPrint&&(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,0,0,.5)'}}>
          <motion.div initial={{scale:.9}} animate={{scale:1}} className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-3"><h3 className="font-extrabold text-lg">{L('printTitle')}</h3><button onClick={()=>setShowPrint(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={16}/></button></div>
            <input type="text" value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder={L('studentNamePH')} className="w-full px-3 py-2 border-2 rounded-xl text-sm mb-3 focus:border-indigo-400 focus:outline-none"/>
            <div className="flex gap-2 mb-3">
              <button onClick={()=>setPrintAns(false)} className={"flex-1 py-2 rounded-xl text-sm font-bold border-2 "+(!printAns?'border-indigo-500 bg-indigo-50':'border-gray-200 text-gray-400')}>{L('studentVer')}</button>
              <button onClick={()=>setPrintAns(true)} className={"flex-1 py-2 rounded-xl text-sm font-bold border-2 "+(printAns?'border-emerald-500 bg-emerald-50':'border-gray-200 text-gray-400')}>{L('answerVer')}</button>
            </div>
            <button onClick={()=>{printExam(sections,grade,printAns,studentName,difficulty);setShowPrint(false)}} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold rounded-xl">{L('openPrint')}</button>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>

      <AnimatePresence>{showSignUpPrompt&&(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,0,0,.5)'}}>
          <motion.div initial={{scale:.9}} animate={{scale:1}} className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl text-center">
            <p className="text-4xl mb-3">🔒</p>
            <h3 className="font-extrabold text-lg mb-2">{lang==='zh'?'註冊以解鎖列印功能':'Sign Up to Unlock Printing'}</h3>
            <p className="text-sm text-gray-500 mb-4">{lang==='zh'?'建立免費帳戶，即可列印試卷給孩子！':'Create a free account to print papers!'}</p>
            <div className="flex gap-2">
              <button onClick={()=>setShowSignUpPrompt(false)} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-500 active:bg-gray-100">{lang==='zh'?'稍後再說':'Maybe Later'}</button>
              <button onClick={()=>{setShowSignUpPrompt(false);setSkippedLogin(false);}} className="flex-1 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-sm">{lang==='zh'?'免費註冊':'Sign Up Free'}</button>
            </div>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>

      <div className="max-w-xl mx-auto">
        {/* Top bar */}
        <div className="bg-white rounded-2xl p-3 mb-2 shadow-sm border">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <button onClick={()=>{setRunning(false);setView('settings')}} className="text-indigo-600 text-sm font-bold flex items-center gap-1"><ArrowLeft size={14}/>{L('settingsBtn')}</button>
            <div className="flex items-center gap-1.5">
              <span className={"text-xs font-bold px-2 py-0.5 rounded-full "+GCL[co]}>P{grade}</span>
              <span className={"text-xs font-bold px-2 py-0.5 rounded-full "+(difficulty===1?'bg-emerald-50 text-emerald-600':difficulty===3?'bg-rose-50 text-rose-600':'bg-amber-50 text-amber-600')}>{DIFF_INFO[difficulty].ic}{DIFF_INFO[difficulty].nm}</span>
            </div>
            <span className="text-xs text-gray-400">{L('totalQS',totalQs,grandTotal)}</span>
          </div>
          <h2 className="text-center font-black text-gray-800 mt-1">{L('examTitle')}</h2>
          {trapCount>0&&<p className="text-center text-xs text-amber-600 font-bold flex items-center justify-center gap-1 mt-0.5"><AlertTriangle size={10}/>{L('trapCount',trapCount)}</p>}
          {useTimer&&!isMarked&&(
            <div className="flex items-center justify-center gap-3 mt-2">
              <button onClick={()=>setRunning(!running)} className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600 active:bg-indigo-200">{running?<Pause size={14}/>:<Play size={14}/>}</button>
              <span className={"text-xl font-mono font-black "+(timeLeft<60?'text-red-500 animate-pulse':'text-gray-700')}>{fmt(timeLeft)}</span>
            </div>
          )}
          {!isMarked&&(
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1"><span>{L('progress')}</span><span className="font-bold">{answeredQs}/{totalQs}</span></div>
              <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{width:(totalQs>0?answeredQs/totalQs*100:0)+'%'}}/></div>
            </div>
          )}
        </div>

        {/* Score Report */}
        <AnimatePresence>{isMarked&&(
          <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl p-4 mb-3 shadow-lg border-2 border-indigo-200">
            <div className="flex items-center justify-center gap-1 mb-1"><Trophy size={20} className="text-yellow-500"/><h3 className="font-black text-lg">{L('scoreReport')}</h3></div>
            <div className="text-center my-3">
              <div><span className="text-5xl font-black text-indigo-600">{totScore}</span><span className="text-2xl text-gray-300"> / {grandTotal}</span></div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
                <motion.div initial={{width:0}} animate={{width:pct+'%'}} transition={{duration:1}} className={"h-3 rounded-full "+(pct>=70?'bg-emerald-500':pct>=50?'bg-amber-500':'bg-red-500')}/>
              </div>
              <span className="text-sm font-bold text-gray-500 mt-1 inline-block">{pct}%</span>
              <div className="mt-2">
                <motion.img src={pct>=80?'/mascot-happy.png':pct>=50?'/mascot-ok.png':'/mascot-sad.png'} alt="mascot"
                  initial={{scale:0.7,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:'spring',stiffness:200}}
                  className="w-44 h-44 object-cover rounded-3xl mx-auto shadow-md"/>
                <p className={"text-sm font-extrabold mt-1 "+fb.c}>{fb.m}</p>
              </div>
            </div>
            <div className="border-t pt-2 space-y-1">
              {sections.map((sec,si)=>{var ss=secScores(si);var sp=sec.total>0?Math.round(ss/sec.total*100):0;return(
                <div key={si} className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-gray-500 w-6">{sec.label}.</span>
                  <span className="flex-1 text-gray-600 truncate">{sec.nm}（{sec.qs.length}題）</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5"><div className={"h-1.5 rounded-full "+(sp>=70?'bg-emerald-500':sp>=50?'bg-amber-500':'bg-red-400')} style={{width:sp+'%'}}/></div>
                  <span className="text-xs font-bold w-12 text-right">{ss}/{sec.total}</span>
                </div>
              )})}
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              <button onClick={()=>setWrongOnly(!wrongOnly)} className={"flex-1 min-w-[80px] py-2 rounded-xl text-xs font-bold border-2 "+(wrongOnly?'border-red-400 bg-red-50 text-red-600':'border-gray-200 text-gray-500')}>{wrongOnly?L('showAll'):L('showWrong')}</button>
              <button onClick={resetMarking} className="flex-1 min-w-[80px] py-2 rounded-xl text-xs font-bold border-2 border-blue-200 text-blue-600 flex items-center justify-center gap-1"><RotateCcw size={12}/>{L('retry')}</button>
              <button onClick={generate} className="flex-1 min-w-[80px] py-2 rounded-xl text-xs font-bold border-2 border-indigo-200 text-indigo-600 flex items-center justify-center gap-1"><RotateCcw size={12}/>{L('newExam')}</button>
              {Object.values(markRes).some(r=>!r.ok)&&<button onClick={retryWrong} className="w-full py-2 rounded-xl text-xs font-bold border-2 border-rose-300 bg-rose-50 text-rose-600 flex items-center justify-center gap-1 mt-1">{L('reviewWrong')}</button>}
            </div>
          </motion.div>
        )}</AnimatePresence>

        {/* Section nav */}
        <div className="flex gap-1 mb-2 overflow-x-auto pb-1 -mx-1 px-1">
          {sections.map((sec,i)=>(
            <a key={i} href={'#s'+i} className="shrink-0 px-3 py-1.5 bg-white border rounded-lg text-xs font-bold text-gray-600 hover:bg-indigo-50 active:bg-indigo-100 flex items-center gap-1 transition-colors">
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
                <div className="flex justify-between items-center"><span className="font-black text-sm sm:text-base">{sec.label}. {sec.nm}（{sec.qs.length}題）</span><span className="text-sm font-bold">{isMarked?secScores(si)+'/':''}{sec.total}分</span></div>
                <p className="text-xs opacity-80">{sec.nt}</p>
              </div>
              <div className="bg-white rounded-b-xl border border-t-0 divide-y divide-gray-100">
                {filteredQs.map(item=>{
                  var q=item.q,qi=item.qi,k=item.k;
                  var isR=revealed[k],isS=stepsShown[k],mr=markRes[k];
                  return(
                    <div key={qi} className={"p-3 transition-colors "+(isMarked?(mr&&mr.ok?'bg-emerald-50/30':'bg-red-50/30'):'')}>
                      <div className="flex items-start gap-2">
                        <div className="flex items-center gap-1 shrink-0 w-8">
                          <span className="text-sm font-extrabold text-gray-300">{qi+1}.</span>
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
                                <button key={o.l} onClick={()=>{if(!isMarked)setMcSel(p=>({...p,[k]:o.l}))}} disabled={isMarked}
                                  className={"text-xs px-3 py-2.5 rounded-lg border-2 text-left flex items-center gap-2 transition-all "+cls}>
                                  <span className={"w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold "+(isSel&&!isMarked?'bg-indigo-500 border-indigo-500 text-white':isMarked&&o.l===q.a?'bg-emerald-500 border-emerald-500 text-white':'border-gray-300 text-gray-400')}>{o.l}</span>
                                  <span>{o.v}</span>
                                  {isMarked&&o.l===q.a&&<Check size={14} className="ml-auto text-emerald-500"/>}
                                  {isMarked&&isSel&&o.l!==q.a&&<X size={14} className="ml-auto text-red-500"/>}
                                </button>
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
                            <button onClick={()=>setRevealed(r=>({...r,[k]:!r[k]}))} className={"text-xs px-2 py-1.5 rounded-lg font-bold transition-colors "+(isR?'bg-emerald-200 text-emerald-700':'bg-gray-100 text-gray-400 active:bg-gray-200')}><Eye size={12}/></button>
                            <button onClick={()=>setStepsShown(r=>({...r,[k]:!r[k]}))} className="text-xs px-2 py-1.5 rounded-lg font-bold bg-gray-100 text-gray-400 active:bg-gray-200">{isS?<ChevronUp size={12}/>:<ChevronDown size={12}/>}</button>
                          </div>
                        )}
                        {isMarked&&mr&&!mr.ok&&(
                          <button onClick={()=>setStepsShown(r=>({...r,[k]:!r[k]}))} className="text-xs px-2 py-1.5 rounded-lg font-bold bg-sky-100 text-sky-600 shrink-0 self-start mt-1 active:bg-sky-200">📖</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Bottom actions */}
        <div className="grid grid-cols-2 gap-2 mt-2 pb-4">
          {isMarked?<>
            <button onClick={resetMarking} className="py-2.5 bg-white border-2 border-blue-200 text-blue-600 font-bold rounded-xl text-sm flex items-center justify-center gap-1 active:bg-blue-50"><RotateCcw size={14}/>{L('retryFull')}</button>
            <button onClick={generate} className={"py-2.5 bg-gradient-to-r "+GC[co]+" text-white font-bold rounded-xl text-sm flex items-center justify-center gap-1"}><RotateCcw size={14}/>{L('newExamFull')}</button>
            <button onClick={()=>user?setShowPrint(true):setShowSignUpPrompt(true)} className="py-2.5 bg-white border-2 border-purple-200 text-purple-600 font-bold rounded-xl text-sm flex items-center justify-center gap-1 active:bg-purple-50"><Printer size={14}/>{L('print')}</button>
            <button onClick={()=>{setRunning(false);setView('home')}} className="py-2.5 bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-xl text-sm flex items-center justify-center gap-1 active:bg-gray-100"><Home size={14}/>{L('home')}</button>
          </>:<>
            <button onClick={()=>user?setShowPrint(true):setShowSignUpPrompt(true)} className="py-2.5 bg-white border-2 border-purple-200 text-purple-600 font-bold rounded-xl text-sm flex items-center justify-center gap-1 active:bg-purple-50"><Printer size={14}/>{L('print')}</button>
            <button onClick={generate} className={"py-2.5 bg-gradient-to-r "+GC[co]+" text-white font-bold rounded-xl text-sm flex items-center justify-center gap-1"}><RotateCcw size={14}/>{L('newExamFull')}</button>
          </>}
        </div>
      </div>

      {/* Floating submit button */}
      {!isMarked&&(
        <motion.button initial={{y:20,opacity:0}} animate={{y:0,opacity:1}}
          onClick={()=>{if(soundOn)playSubmit();setShowSubmit(true);}}

          className="fixed bottom-5 left-1/2 -translate-x-1/2 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-extrabold text-lg rounded-3xl shadow-2xl z-40 flex items-center gap-2 active:shadow-lg">
          <Send size={18}/><span>{L('submit')}</span><span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">{answeredQs}/{totalQs}</span>
        </motion.button>
      )}
    </div>
  );
}