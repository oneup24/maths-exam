import React from 'react';
import Modal from '../ui/Modal';

export default function PinModal({isOpen,onClose,onSuccess,lang}){
  var zh=lang==='zh';
  var handleCheck=(el)=>{
    if(el&&el.value===localStorage.getItem('parent_pin')){
      onSuccess();
    }else if(el){
      el.value='';
      el.classList.add('border-red-400');
      setTimeout(()=>el.classList.remove('border-red-400'),800);
    }
  };
  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <p className="text-4xl mb-2">🔐</p>
        <h3 className="font-extrabold text-lg mb-1">{zh?'家長密碼':'Parent PIN'}</h3>
        <p className="text-xs text-gray-400 mb-3">{zh?'請輸入4位數字密碼以查看答案':'Enter 4-digit PIN to view answers'}</p>
        <input type="password" inputMode="numeric" maxLength={4} pattern="[0-9]*" autoFocus
          id="pin-input"
          className="w-32 mx-auto text-center text-2xl font-mono tracking-[0.5em] border-2 border-indigo-200 rounded-xl py-3 focus:border-indigo-500 focus:outline-none"
          onKeyDown={e=>{if(e.key==='Enter')handleCheck(e.target)}}/>
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={onClose} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-500 active:bg-gray-100 active:scale-[0.97] transition-all duration-200">{zh?'取消':'Cancel'}</button>
        <button onClick={()=>handleCheck(document.getElementById('pin-input'))} className="flex-1 py-2.5 bg-indigo-500 text-white rounded-xl font-bold text-sm active:scale-[0.97] transition-all duration-200">{zh?'確認':'Confirm'}</button>
      </div>
    </Modal>
  );
}
