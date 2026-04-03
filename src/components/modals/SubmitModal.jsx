import React from 'react';
import Modal from '../ui/Modal';

export default function SubmitModal({isOpen,onClose,onConfirm,answeredQs,totalQs,L}){
  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="font-extrabold text-lg text-center mb-3">{L('confirmSubmitTitle')}</h3>
      <div className="text-center mb-4">
        <div className="text-4xl font-black text-indigo-600">{answeredQs}<span className="text-lg text-gray-300">/{totalQs}</span></div>
        <p className="text-sm text-gray-500 mt-1">{L('answeredLabel')}</p>
        {answeredQs<totalQs&&<p className="text-xs text-orange-500 font-bold mt-2">{L('unanswered',totalQs-answeredQs)}</p>}
      </div>
      <div className="flex gap-2">
        <button onClick={onClose} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-500 active:bg-gray-100 active:scale-[0.97] transition-all duration-200">{L('continueBtn')}</button>
        <button onClick={onConfirm} className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-sm active:scale-[0.97] transition-all duration-200">{L('confirmBtn')}</button>
      </div>
    </Modal>
  );
}
