import React,{useState,useEffect} from 'react';
import {motion} from 'framer-motion';
import {ArrowLeft,Save,User,Cake,Zap,Lock,Check} from 'lucide-react';
import { getUserStats, loadExamHistory } from './services/api';

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

export default function Profile({onBack,lang='zh',studentName,setStudentName,streak,user,signOut,goToLogin}){
  const isZh=lang==='zh';
  const[name,setName]=useState(studentName||'');
  const[birthday,setBirthday]=useState(()=>localStorage.getItem('student_birthday')||'');
  const[saved,setSaved]=useState(false);
  const[cloudStats,setCloudStats]=useState(null);
  const[recentExams,setRecentExams]=useState([]);
  const[pin,setPin]=useState(()=>localStorage.getItem('parent_pin')||'');
  const[newPin,setNewPin]=useState('');
  const[pinEditing,setPinEditing]=useState(false);
  const[pinSaved,setPinSaved]=useState(false);

  useEffect(()=>{
    if(user){
      getUserStats(user.id).then(stats=>setCloudStats(stats));
      loadExamHistory(user.id).then(({data})=>setRecentExams(data.slice(0,10)));
    }
  },[user]);

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

        {/* Auth status banner */}
        {user ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-3 flex items-center justify-between">
            <span className="text-emerald-700 text-xs font-bold">✅ {isZh?'已登入：':'Signed in as '}{user.email}</span>
            <button onClick={signOut} className="text-red-500 text-xs font-bold hover:underline">{isZh?'登出 🚪':'Sign Out 🚪'}</button>
          </div>
        ) : (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-3 flex items-center justify-between">
            <span className="text-orange-700 text-xs font-bold">{isZh?'⚠️ 訪客模式 — 進度不會同步到雲端':'⚠️ Guest Mode — progress won\'t sync to cloud'}</span>
            <button onClick={goToLogin} className="bg-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">{isZh?'立即註冊':'Sign Up Now'}</button>
          </div>
        )}

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
          <label className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1">
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

        {/* Parent PIN Settings */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border mb-4">
          <h3 className="font-bold text-gray-700 flex items-center gap-2 mb-3">
            <Lock size={16} className="text-rose-500"/>
            {isZh?'家長設定':'Parent Settings'}
          </h3>
          {pin&&!pinEditing?(
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-emerald-600 font-bold">✅ {isZh?'已設定密碼':'PIN is set'}</span>
                <span className="text-xs text-gray-300 font-mono">{'●'.repeat(4)}</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">{isZh?'查看答案和解題步驟時需要輸入密碼':'PIN required to view answers and solution steps'}</p>
              <div className="flex gap-2">
                <button onClick={()=>{setPinEditing(true);setNewPin('');}} className="flex-1 py-2 rounded-xl border-2 border-indigo-200 text-indigo-600 text-xs font-bold active:bg-indigo-50">{isZh?'更改密碼':'Change PIN'}</button>
                <button onClick={()=>{localStorage.removeItem('parent_pin');setPin('');setPinSaved(false);}} className="flex-1 py-2 rounded-xl border-2 border-red-200 text-red-500 text-xs font-bold active:bg-red-50">{isZh?'移除密碼':'Remove PIN'}</button>
              </div>
            </div>
          ):(
            <div>
              <p className="text-xs text-gray-400 mb-2">{pin?isZh?'輸入新的4位數字密碼：':'Enter new 4-digit PIN:':isZh?'設定4位數字密碼，防止孩子偷看答案':'Set a 4-digit PIN to prevent peeking at answers'}</p>
              <div className="flex gap-2 items-center">
                <input type="password" inputMode="numeric" maxLength={4} pattern="[0-9]*" value={newPin} onChange={e=>setNewPin(e.target.value.replace(/\D/g,''))}
                  placeholder="0000"
                  className="w-28 text-center text-xl font-mono tracking-[0.4em] border-2 border-indigo-200 rounded-xl py-2.5 focus:border-indigo-500 focus:outline-none"/>
                <button onClick={()=>{if(newPin.length===4){localStorage.setItem('parent_pin',newPin);setPin(newPin);setNewPin('');setPinEditing(false);setPinSaved(true);setTimeout(()=>setPinSaved(false),2000);}}}
                  disabled={newPin.length!==4}
                  className={"flex-1 py-2.5 rounded-xl font-bold text-sm transition-all "+(newPin.length===4?'bg-indigo-500 text-white':'bg-gray-200 text-gray-400')}>
                  {pinSaved?'✅':(isZh?'設定':'Set')}
                </button>
                {pinEditing&&<button onClick={()=>setPinEditing(false)} className="py-2.5 px-3 rounded-xl border-2 border-gray-200 text-gray-400 text-sm font-bold active:bg-gray-100">{isZh?'取消':'Cancel'}</button>}
              </div>
            </div>
          )}
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

        {/* Cloud Stats — only for logged-in users */}
        {user&&cloudStats&&(
          <div className="bg-white rounded-3xl p-5 shadow-sm border mb-4">
            <h3 className="font-bold text-gray-700 flex items-center gap-2 mb-3">
              📊 {isZh?'我的統計（雲端）':'My Stats (Cloud)'}
            </h3>
            <div className="flex gap-3">
              <div className="flex-1 bg-purple-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-purple-600">{cloudStats.totalExams}</p>
                <p className="text-xs text-purple-400 font-bold">{isZh?'總考試':'Total'}</p>
              </div>
              <div className="flex-1 bg-sky-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-sky-600">{cloudStats.avgScore}%</p>
                <p className="text-xs text-sky-400 font-bold">{isZh?'平均分':'Avg'}</p>
              </div>
              <div className="flex-1 bg-amber-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-amber-600">{cloudStats.bestScore}%</p>
                <p className="text-xs text-amber-400 font-bold">{isZh?'最高分':'Best'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Exams — only for logged-in users */}
        {user&&(
          <div className="bg-white rounded-3xl p-5 shadow-sm border mb-4">
            <h3 className="font-bold text-gray-700 flex items-center gap-2 mb-3">
              📝 {isZh?'最近考試':'Recent Exams'}
            </h3>
            {recentExams.length>0?(
              <div className="space-y-0">
                {recentExams.map((e,i)=>{
                  var d=new Date(e.created_at);
                  var dateStr=(d.getMonth()+1)+'/'+ d.getDate();
                  return(
                    <div key={e.id||i} className={"flex items-center justify-between py-2 "+(i<recentExams.length-1?'border-b border-gray-100':'')}>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">P{e.grade}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5"><div className={"h-1.5 rounded-full "+(e.score_percent>=70?'bg-emerald-500':e.score_percent>=50?'bg-amber-500':'bg-red-400')} style={{width:e.score_percent+'%'}}/></div>
                        <span className={"text-sm font-bold "+(e.score_percent>=70?'text-emerald-600':e.score_percent>=50?'text-amber-600':'text-red-500')}>{e.score_percent}%</span>
                        <span className="text-xs text-gray-300">{dateStr}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ):(
              <p className="text-center text-sm text-gray-400 py-4">{isZh?'還沒有考試記錄！去練習吧！🎯':'No exams yet! Go practice! 🎯'}</p>
            )}
          </div>
        )}

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
