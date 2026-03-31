import React,{useState} from 'react';
import {motion} from 'framer-motion';
import {ArrowLeft,Save,User,Cake,Zap,Lock,Check} from 'lucide-react';

function calcAge(birthday){
  if(!birthday)return null;
  var b=new Date(birthday),now=new Date();
  var age=now.getFullYear()-b.getFullYear();
  var m=now.getMonth()-b.getMonth();
  if(m<0||(m===0&&now.getDate()<b.getDate()))age--;
  return age;
}

function isTodayBirthday(birthday){
  if(!birthday)return false;
  var b=new Date(birthday),now=new Date();
  return b.getMonth()===now.getMonth()&&b.getDate()===now.getDate();
}

function daysUntilBirthday(birthday){
  if(!birthday)return null;
  var b=new Date(birthday),now=new Date();
  var next=new Date(now.getFullYear(),b.getMonth(),b.getDate());
  if(next<now)next.setFullYear(now.getFullYear()+1);
  return Math.ceil((next-now)/(1000*60*60*24));
}

export default function Profile({onBack,lang='zh',studentName,setStudentName,streak}){
  const isZh=lang==='zh';
  const[name,setName]=useState(studentName||'');
  const[birthday,setBirthday]=useState(()=>localStorage.getItem('student_birthday')||'');
  const[saved,setSaved]=useState(false);

  const save=()=>{
    var n=name.trim();
    if(n){setStudentName(n);localStorage.setItem('student_name',n);}
    localStorage.setItem('student_birthday',birthday);
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  };

  var age=calcAge(birthday);
  var days=daysUntilBirthday(birthday);
  var isToday=isTodayBirthday(birthday);

  return(
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 p-4 pb-20">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <button onClick={onBack} className="p-2 rounded-2xl bg-white border shadow-sm active:bg-gray-100"><ArrowLeft size={18}/></button>
          <h2 className="font-black text-xl text-gray-800">{isZh?'個人設定':'Profile Settings'}</h2>
        </div>

        {/* Mascot + birthday banner */}
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-center mb-5">
          <img src={isToday?'/mascot-happy.png':'/mascot.png'} alt="mascot"
            className="w-32 h-32 object-cover rounded-3xl mx-auto shadow-md"/>
          {isToday&&(
            <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:200}}
              className="mt-2 inline-flex items-center gap-1.5 bg-pink-100 border border-pink-200 text-pink-600 font-bold text-sm px-3 py-1.5 rounded-full">
              🎂 {isZh?'生日快樂！':'Happy Birthday!'}
            </motion.div>
          )}
        </motion.div>

        {/* Student info */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border mb-4">
          <h3 className="font-bold text-gray-700 flex items-center gap-2 mb-4">
            <User size={16} className="text-indigo-500"/>
            {isZh?'學生資料':'Student Info'}
          </h3>

          {/* Name */}
          <label className="block text-xs font-bold text-gray-500 mb-1">{isZh?'姓名':'Name'}</label>
          <input type="text" value={name} onChange={e=>setName(e.target.value)}
            placeholder={isZh?'輸入你的名字…':'Enter your name…'}
            className="w-full px-4 py-3 border-2 border-indigo-100 rounded-2xl text-base font-bold focus:outline-none focus:border-indigo-400 bg-indigo-50/30 mb-4"/>

          {/* Birthday */}
          <label className="block text-xs font-bold text-gray-500 mb-1 flex items-center gap-1">
            <Cake size={12}/>{isZh?'生日':'Birthday'}
          </label>
          <input type="date" value={birthday} onChange={e=>setBirthday(e.target.value)}
            className="w-full px-4 py-3 border-2 border-pink-100 rounded-2xl text-base focus:outline-none focus:border-pink-400 bg-pink-50/30 mb-2"/>
          {birthday&&!isToday&&age!==null&&(
            <p className="text-xs text-gray-400 mb-2">
              {isZh?`${age}歲 · 距離下次生日還有 ${days} 天 🎂`:`Age ${age} · ${days} days until next birthday 🎂`}
            </p>
          )}

          {/* Save */}
          <motion.button whileTap={{scale:0.97}} onClick={save}
            className={"w-full py-3.5 rounded-2xl font-extrabold text-base text-white flex items-center justify-center gap-2 transition-all shadow-md "+(saved?'bg-emerald-500':'bg-gradient-to-r from-indigo-500 to-purple-500')}>
            {saved?<><Check size={18}/>{isZh?'已儲存！':'Saved!'}</>:<><Save size={18}/>{isZh?'儲存':'Save'}</>}
          </motion.button>
        </div>

        {/* Streak */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border mb-4">
          <h3 className="font-bold text-gray-700 flex items-center gap-2 mb-3">
            <Zap size={16} className="text-orange-500"/>
            {isZh?'練習記錄':'Practice Record'}
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex flex-col items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <p className="text-3xl font-black text-orange-500">{streak}<span className="text-base font-bold text-orange-300 ml-1">{isZh?'天':'days'}</span></p>
              <p className="text-xs text-gray-400">{isZh?'連續練習天數':'current streak'}</p>
            </div>
          </div>
        </div>

        {/* Daily Challenge slot — placeholder */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-dashed border-indigo-200 opacity-70">
          <h3 className="font-bold text-gray-500 flex items-center gap-2 mb-3">
            <Lock size={16} className="text-indigo-300"/>
            {isZh?'每日挑戰記錄':'Daily Challenge Record'}
            <span className="text-xs bg-indigo-100 text-indigo-400 font-bold px-2 py-0.5 rounded-full ml-auto">{isZh?'即將推出':'Coming Soon'}</span>
          </h3>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({length:7}).map((_,i)=>(
              <div key={i} className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center">
                <span className="text-lg opacity-30">⭐</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">{isZh?'完成每日挑戰後，這裡會顯示你的記錄。':'Your daily challenge results will appear here.'}</p>
        </div>

      </div>
    </div>
  );
}
