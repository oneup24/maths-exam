import React,{useState} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import {ChevronRight,Check} from 'lucide-react';
import {t} from './lib/i18n';

const STEPS=[
  {tk:'obStep1Title',sk:'obStep1Sub',dk:'obStep1Desc',mascot:'/mascot.png'},
  {tk:'obStep2Title',sk:'obStep2Sub',dk:'obStep2Desc',mascot:'/mascot.png'},
  {tk:'obStep3Title',sk:'obStep3Sub',dk:'obStep3Desc',mascot:'/mascot.png'},
  {tk:'obStep4Title',sk:'obStep4Sub',dk:null,mascot:'/mascot-happy.png'},
];

export default function Onboarding({onComplete,lang='zh'}){
  const[step,setStep]=useState(0);
  const[name,setName]=useState('');
  const L=(key,...args)=>t(lang,key,...args);
  const isLast=step===STEPS.length-1;
  const s=STEPS[step];

  const next=()=>{
    if(isLast)onComplete(name.trim());
    else setStep(p=>p+1);
  };

  return(
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm flex flex-col items-center">

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{duration:0.25}}
            className="flex flex-col items-center text-center w-full">

            <motion.img src={s.mascot} alt="mascot" className="w-64 h-64 object-cover rounded-3xl mb-5 shadow-lg"
              initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.1}}/>

            <h1 className="text-3xl font-black text-gray-800 mb-1">{L(s.tk)}</h1>
            <p className="text-indigo-500 font-bold text-sm mb-3">{L(s.sk)}</p>
            {s.dk&&<p className="text-gray-500 text-sm leading-relaxed mb-6">{L(s.dk)}</p>}

            {isLast&&(
              <div className="w-full mb-2">
                <input type="text" value={name} onChange={e=>setName(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&name.trim()&&next()}
                  placeholder={L('obNamePH')}
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-2xl text-center text-xl font-bold focus:outline-none focus:border-indigo-500 bg-white"
                  autoFocus/>
                <p className="text-xs text-gray-400 mt-2">{L('obNameNote')}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 my-6">
          {STEPS.map((_,i)=>(
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i===step?'w-6 bg-indigo-500':'w-2 bg-gray-300'}`}/>
          ))}
        </div>

        <motion.button whileTap={{scale:0.97}} onClick={next}
          disabled={isLast&&!name.trim()}
          className={`w-full py-4 rounded-2xl font-extrabold text-lg text-white shadow-xl flex items-center justify-center gap-2 transition-all ${isLast&&!name.trim()?'bg-gray-300':'bg-gradient-to-r from-indigo-500 to-purple-500'}`}>
          {isLast?<><Check size={20}/>{L('obStart')}</>:<>{L('obNext')}<ChevronRight size={20}/></>}
        </motion.button>

        {!isLast&&(
          <button onClick={()=>onComplete('')} className="mt-4 text-sm text-gray-400 underline">
            {L('obSkip')}
          </button>
        )}
      </div>
    </div>
  );
}
