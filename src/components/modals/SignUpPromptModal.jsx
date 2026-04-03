import React from 'react';
import Modal from '../ui/Modal';

export default function SignUpPromptModal({isOpen,onClose,onSignUp,lang}){
  var zh=lang==='zh';
  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <p className="text-4xl mb-3">🔒</p>
        <h3 className="font-extrabold text-lg mb-2">{zh?'註冊以解鎖列印功能':'Sign Up to Unlock Printing'}</h3>
        <p className="text-sm text-gray-500 mb-4">{zh?'建立免費帳戶，即可列印試卷給孩子！':'Create a free account to print papers!'}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onClose} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-500 active:bg-gray-100 active:scale-[0.97] transition-all duration-200">{zh?'稍後再說':'Maybe Later'}</button>
        <button onClick={onSignUp} className="flex-1 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-sm active:scale-[0.97] transition-all duration-200">{zh?'免費註冊':'Sign Up Free'}</button>
      </div>
    </Modal>
  );
}
