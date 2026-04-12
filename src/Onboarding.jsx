import React,{useState} from 'react';
// eslint-disable-next-line no-unused-vars -- motion is used as <motion.div> in JSX
import {motion,AnimatePresence} from 'framer-motion';
import {ChevronRight,ArrowLeft,Loader2} from 'lucide-react';
import {t} from './lib/i18n';
import {track} from './lib/track';

/* ── Sample questions per grade ── */
const SAMPLE_QS={
  1:{q:'3 + 4 = ?',opts:['5','6','7','8'],a:'7'},
  2:{q:'15 + 23 = ?',opts:['35','38','42','48'],a:'38'},
  3:{q:'48 × 2 = ?',opts:['86','96','106','84'],a:'96'},
  4:{q:'144 ÷ 12 = ?',opts:['11','12','13','14'],a:'12'},
  5:{q:'3/4 + 1/2 = ?',opts:['1','5/4','1¼','3/2'],a:'5/4'},
  6:{q:'25% of 80 = ?',opts:['15','20','25','30'],a:'20'},
};

const GRADE_NAMES={1:'一',2:'二',3:'三',4:'四',5:'五',6:'六'};

/* ── Slide transition variants ── */
const slideVariants={
  enter:{x:80,opacity:0},
  center:{x:0,opacity:1,transition:{duration:0.3}},
  exit:{x:-80,opacity:0,transition:{duration:0.3}},
};

/* ── Progress dots (5 dots for steps 1-5, step 0 has none) ── */
function OnboardingProgress({current}){
  // current is 0-indexed internal step; dots represent steps 1-5
  // dot index 0=step1(value), 1=step2(grade), 2=step3(question), 3=step4(result), 4=step5(auth)
  var dotIdx=current-1;
  if(dotIdx<0||dotIdx>4)return null;
  return(
    <div className="flex gap-2 justify-center mt-6">
      {[0,1,2,3,4].map(i=>(
        <div key={i} className={'rounded-full transition-all duration-300 '+(
          i===dotIdx?'w-6 h-2.5 bg-orange-500'
          :i<dotIdx?'w-2.5 h-2.5 bg-orange-300'
          :'w-2.5 h-2.5 bg-gray-300'
        )}/>
      ))}
    </div>
  );
}

export default function Onboarding({onComplete,lang:initialLang,signUp,signIn}){
  const[step,setStep]=useState(0);
  const[lang,setLang]=useState(initialLang||'zh');
  const[grade,setGrade]=useState(null);
  const[selectedOpt,setSelectedOpt]=useState(null);
  const[wasCorrect,setWasCorrect]=useState(null);
  const[authMode,setAuthMode]=useState(null); // null | 'signup' | 'login'
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[error,setError]=useState('');
  const[loading,setLoading]=useState(false);
  const L=(key,...args)=>t(lang,key,...args);

  // Track onboarding start once on mount
  useState(()=>{track('onboarding_start')});

  const goBack=()=>{
    if(step===5&&authMode){setAuthMode(null);setError('');return;} // back from auth form → auth options
    if(step===3){setSelectedOpt(null);setWasCorrect(null);} // reset question state when going back
    if(step>0)setStep(step-1);
  };
  const pickLang=(l)=>{setLang(l);localStorage.setItem('lang',l);track('onboarding_language',{language:l});setStep(1);};
  const pickGrade=(g)=>{setGrade(g);track('onboarding_grade',{grade:g});setTimeout(()=>setStep(3),400);};
  const answerQ=(opt)=>{
    if(selectedOpt!==null)return;
    var sq=SAMPLE_QS[grade||4];
    var correct=opt===sq.a;
    setSelectedOpt(opt);
    setWasCorrect(correct);
    track('onboarding_question_answered',{grade:grade||4,correct:correct});
    setTimeout(()=>setStep(4),900);
  };
  const finish=(authData)=>{
    localStorage.setItem('onboarding_done','true');
    if(grade)localStorage.setItem('selected_grade',String(grade));
    localStorage.setItem('app_language',lang);
    if(!authData)track('onboarding_guest');
    onComplete(authData,lang,grade);
  };
  const handleAuth=async(e)=>{
    e.preventDefault();
    setError('');setLoading(true);
    try{
      if(authMode==='signup'){
        var result=await signUp(email,password);
        track('onboarding_signup');
        finish(result||true);
      }else{
        var result=await signIn(email,password);
        track('onboarding_login');
        finish(result||true);
      }
    }catch(err){setError(err.message);}
    finally{setLoading(false);}
  };

  var sq=SAMPLE_QS[grade||4];

  return(
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm flex flex-col items-center relative">

        {/* Back button — shown on steps 1-5 */}
        {step>=1&&step<=5&&(
          <button onClick={goBack} aria-label="Back"
            className="absolute top-0 left-0 p-2 min-w-[44px] min-h-[44px] rounded-xl text-gray-400 active:bg-white/60 active:scale-[0.97] transition-all flex items-center justify-center z-10">
            <ArrowLeft size={20}/>
          </button>
        )}

        <AnimatePresence mode="wait">

          {/* ═══ Step 0: Language Picker ═══ */}
          {step===0&&(
            <motion.div key="lang" variants={slideVariants} initial="enter" animate="center" exit="exit"
              className="flex flex-col items-center text-center w-full">
              <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.1}}
                className="text-8xl mb-6">🐻</motion.div>
              <h1 className="text-2xl font-black text-gray-800 mb-8">Choose your language</h1>
              <div className="flex gap-4 w-full">
                <motion.button whileTap={{scale:0.95}} onClick={()=>pickLang('zh')}
                  className="flex-1 py-6 rounded-2xl bg-white border-2 border-amber-200 shadow-sm text-center active:bg-amber-50 transition-all">
                  <span className="text-4xl block mb-2">中</span>
                  <span className="text-sm font-bold text-gray-600">中文</span>
                </motion.button>
                <motion.button whileTap={{scale:0.95}} onClick={()=>pickLang('en')}
                  className="flex-1 py-6 rounded-2xl bg-white border-2 border-indigo-200 shadow-sm text-center active:bg-indigo-50 transition-all">
                  <span className="text-4xl block mb-2">En</span>
                  <span className="text-sm font-bold text-gray-600">English</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ═══ Step 1: Value Splash ═══ */}
          {step===1&&(
            <motion.div key="value" variants={slideVariants} initial="enter" animate="center" exit="exit"
              className="flex flex-col items-center text-center w-full pt-8">
              <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.1}}
                className="text-7xl mb-4">🐻</motion.div>
              <h1 className="text-2xl font-black text-gray-800 mb-6 leading-snug">{L('obMathMadeFun')}</h1>
              <div className="grid grid-cols-3 gap-4 w-full mb-8">
                {[
                  {ic:'🎯',tk:'obSmartQuestions'},
                  {ic:'🧠',tk:'obTrapTraining'},
                  {ic:'📊',tk:'obTrackScore'},
                ].map((c,i)=>(
                  <motion.div key={c.tk} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.1}}
                    className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center gap-2">
                    <span className="text-3xl">{c.ic}</span>
                    <span className="text-xs font-bold text-gray-600 leading-tight">{L(c.tk)}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button whileTap={{scale:0.97}} onClick={()=>setStep(2)}
                className="w-full py-4 rounded-xl font-bold text-lg text-white shadow-md bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center gap-2">
                {L('obNext')}<ChevronRight size={20}/>
              </motion.button>
            </motion.div>
          )}

          {/* ═══ Step 2: Grade Picker ═══ */}
          {step===2&&(
            <motion.div key="grade" variants={slideVariants} initial="enter" animate="center" exit="exit"
              className="flex flex-col items-center text-center w-full pt-8">
              <h1 className="text-2xl font-black text-gray-800 mb-6">{L('obWhichGrade')}</h1>
              <div className="grid grid-cols-3 gap-3 w-full mb-4">
                {[1,2,3,4,5,6].map((g,i)=>(
                  <motion.button key={g} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
                    whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                    onClick={()=>pickGrade(g)}
                    className={"py-5 rounded-2xl border-2 shadow-sm text-center transition-all "+(grade===g?'border-orange-500 bg-orange-50 ring-2 ring-orange-200':'border-gray-200 bg-white active:bg-gray-50')}>
                    <span className="text-2xl font-black text-gray-800 block">P{g}</span>
                    <span className="text-xs font-bold text-gray-400">{lang==='zh'?`小${GRADE_NAMES[g]}`:`Grade ${g}`}</span>
                  </motion.button>
                ))}
              </div>
              <AnimatePresence>
                {grade&&(
                  <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
                    className="flex items-center gap-2 bg-amber-100 border border-amber-200 px-4 py-2 rounded-full mt-2">
                    <span className="text-2xl">🐻</span>
                    <span className="text-sm font-bold text-amber-700">{L('obGradeReact',grade)}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ═══ Step 3: Try One Question ═══ */}
          {step===3&&(
            <motion.div key="tryq" variants={slideVariants} initial="enter" animate="center" exit="exit"
              className="flex flex-col items-center text-center w-full pt-8">
              <h1 className="text-2xl font-black text-gray-800 mb-2">{L('obLetsTryOne')}</h1>
              <p className="text-sm text-gray-400 mb-6">P{grade}</p>
              <div className="bg-white rounded-2xl p-6 shadow-sm w-full mb-6">
                <p className="text-2xl font-black text-gray-800 mb-5">{sq.q}</p>
                <div className="grid grid-cols-2 gap-3">
                  {sq.opts.map((opt,i)=>{
                    var isCorrectAnswer=opt===sq.a;
                    var isThisSelected=selectedOpt===opt;
                    var cls=selectedOpt===null
                      ?'border-gray-200 bg-gray-50 active:bg-orange-50 active:border-orange-300'
                      :isCorrectAnswer?'border-emerald-400 bg-emerald-50 text-emerald-700'
                      :isThisSelected?'border-red-400 bg-red-50 text-red-600'
                      :'border-gray-200 bg-gray-100 text-gray-400';
                    return(
                      <motion.button key={i} whileTap={selectedOpt===null?{scale:0.97}:{}}
                        initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.1+i*0.06}}
                        onClick={()=>answerQ(opt)} disabled={selectedOpt!==null}
                        className={"py-3.5 px-4 rounded-xl border-2 font-bold text-base transition-all duration-200 "+cls}>
                        {opt}
                        {selectedOpt!==null&&isCorrectAnswer&&<span className="ml-1">✓</span>}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              <AnimatePresence>
                {selectedOpt!==null&&(
                  wasCorrect?(
                    <motion.div key="fb" initial={{scale:0}} animate={{scale:[0,1.3,1]}} transition={{duration:0.4}}
                      className="text-5xl">🎉</motion.div>
                  ):(
                    <motion.div key="fb" initial={{x:0}} animate={{x:[0,-12,12,-8,8,-4,4,0]}} transition={{duration:0.5}}
                      className="text-5xl">💪</motion.div>
                  )
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ═══ Step 4: Result ═══ */}
          {step===4&&(
            <motion.div key="result" variants={slideVariants} initial="enter" animate="center" exit="exit"
              className="flex flex-col items-center text-center w-full pt-8">
              <motion.div initial={{scale:0}} animate={{scale:[0,1.3,1]}} transition={{duration:0.4}}
                className="text-8xl mb-4">{wasCorrect?'🎉':'💪'}</motion.div>
              <h1 className="text-3xl font-black text-gray-800 mb-2">
                {wasCorrect?L('obCorrect'):L('obGreatTry')}
              </h1>
              <p className="text-base text-gray-500 mb-8 leading-relaxed">
                {wasCorrect?L('obYoureReady'):L('obThatsWhyWePractice')}
              </p>
              <motion.button whileTap={{scale:0.97}} onClick={()=>setStep(5)}
                className="w-full py-4 rounded-xl font-bold text-lg text-white shadow-md bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center gap-2">
                {L('obLetsGo')}<ChevronRight size={20}/>
              </motion.button>
            </motion.div>
          )}

          {/* ═══ Step 5: Auth Gate ═══ */}
          {step===5&&(
            <motion.div key="auth" variants={slideVariants} initial="enter" animate="center" exit="exit"
              className="flex flex-col items-center text-center w-full pt-8">

              {!authMode?(
                <>
                  <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.1}}
                    className="text-7xl mb-4">🐻</motion.div>
                  <h1 className="text-2xl font-black text-gray-800 mb-6">{L('obSaveProgress')}</h1>
                  <div className="w-full space-y-3 mb-6">
                    {[
                      {ic:'✅',tk:'obBenefit1'},
                      {ic:'✅',tk:'obBenefit2'},
                      {ic:'✅',tk:'obBenefit3'},
                    ].map((b,i)=>(
                      <motion.div key={b.tk} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:0.2+i*0.1}}
                        className="flex items-center gap-4 bg-white rounded-2xl px-5 py-3.5 shadow-sm text-left">
                        <span className="text-lg">{b.ic}</span>
                        <span className="text-sm font-bold text-gray-700">{L(b.tk)}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button whileTap={{scale:0.97}} onClick={()=>setAuthMode('signup')}
                    className="w-full py-4 rounded-xl font-bold text-lg text-white shadow-md bg-gradient-to-r from-orange-500 to-amber-500 mb-4">
                    {L('obCreateAccount')}
                  </motion.button>
                  <button onClick={()=>finish(null)}
                    className="text-sm text-gray-400 underline py-2 active:text-gray-600 transition-all">
                    {L('obContinueGuest')}
                  </button>
                  <div className="mt-4 pt-4 border-t border-gray-200 w-full">
                    <p className="text-xs text-gray-400">
                      {L('obHaveAccount')}{' '}
                      <button onClick={()=>setAuthMode('login')} className="text-orange-600 font-bold hover:underline">{L('obLogIn')}</button>
                    </p>
                  </div>
                </>
              ):(
                <>
                  <h1 className="text-2xl font-black text-gray-800 mb-6">
                    {authMode==='signup'?L('obSignUp'):L('obLogIn')}
                  </h1>
                  <form onSubmit={handleAuth} className="w-full space-y-3 mb-4">
                    <input type="email" placeholder={L('obEmail')} value={email}
                      onChange={e=>setEmail(e.target.value)} required aria-label="Email"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-sm"/>
                    <input type="password" placeholder={L('obPassword')} value={password}
                      onChange={e=>setPassword(e.target.value)} required minLength={6} aria-label="Password"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-sm"/>
                    {error&&<p className="text-red-500 text-xs bg-red-50 rounded-lg p-2.5">{error}</p>}
                    <motion.button whileTap={{scale:0.97}} type="submit" disabled={loading}
                      className="w-full py-3.5 rounded-xl font-bold text-base text-white shadow-md bg-gradient-to-r from-orange-500 to-amber-500 disabled:opacity-50 flex items-center justify-center">
                      {loading?<Loader2 size={18} className="animate-spin"/>:authMode==='signup'?L('obSignUp'):L('obLogIn')}
                    </motion.button>
                  </form>
                  <div className="flex flex-col items-center gap-2">
                    <button onClick={()=>{setAuthMode(null);setError('');}}
                      className="text-sm text-gray-400 underline active:text-gray-600 transition-all">
                      {lang==='zh'?'返回':'Back'}
                    </button>
                    <button onClick={()=>finish(null)}
                      className="text-xs text-gray-300 underline py-1 active:text-gray-500 transition-all">
                      {L('obContinueGuest')}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>

        {/* Progress dots */}
        <OnboardingProgress current={step}/>
      </div>
    </div>
  );
}
