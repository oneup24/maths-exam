import React from 'react';
import {X} from 'lucide-react';
import Modal from '../ui/Modal';

export default function PrintModal({isOpen,onClose,studentName,onNameChange,printAns,setPrintAns,onPrint,L}){
  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-extrabold text-lg">{L('printTitle')}</h3>
        <button onClick={onClose} aria-label="Close" className="w-9 h-9 min-w-[44px] min-h-[44px] rounded-xl bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-all duration-200"><X size={16}/></button>
      </div>
      <input type="text" value={studentName} onChange={e=>onNameChange(e.target.value)} placeholder={L('studentNamePH')} className="w-full px-3 py-2 border-2 rounded-xl text-sm mb-3 focus:border-indigo-400 focus:outline-none"/>
      <div className="flex gap-2 mb-3">
        <button onClick={()=>setPrintAns(false)} className={"flex-1 py-2 rounded-xl text-sm font-bold border-2 "+(!printAns?'border-indigo-500 bg-indigo-50':'border-gray-200 text-gray-400')}>{L('studentVer')}</button>
        <button onClick={()=>setPrintAns(true)} className={"flex-1 py-2 rounded-xl text-sm font-bold border-2 "+(printAns?'border-emerald-500 bg-emerald-50':'border-gray-200 text-gray-400')}>{L('answerVer')}</button>
      </div>
      <button onClick={onPrint} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold rounded-xl active:scale-[0.97] transition-all duration-200">{L('openPrint')}</button>
    </Modal>
  );
}
