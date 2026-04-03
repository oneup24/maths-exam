import React from 'react';

export default function GuestBanner({onSignUp,lang}){
  var zh=lang==='zh';
  return(
    <div className="bg-orange-50 border border-orange-300 rounded-xl p-3 mb-3 flex items-center justify-between gap-2">
      <span className="text-orange-700 text-xs font-bold flex-1">{zh?'👻 訪客模式 — 成績不會同步到雲端。註冊以保存進度！':'👻 Guest Mode — Scores won\'t sync. Sign up to save!'}</span>
      <button onClick={onSignUp} className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shrink-0 active:scale-[0.97] transition-all duration-200">{zh?'註冊':'Sign Up'}</button>
    </div>
  );
}
