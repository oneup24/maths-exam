import React from 'react';
import {RotateCcw,Printer,Home} from 'lucide-react';
import {GC} from '../../lib/colors';

export default function ExamActions({isMarked,co,resetMarking,generate,onPrint,onHome,L}){
  return(
    <div className="grid grid-cols-2 gap-2 mt-2 pb-4">
      {isMarked?<>
        <button onClick={resetMarking} className="py-2.5 bg-white border-2 border-blue-200 text-blue-600 font-bold rounded-xl text-sm flex items-center justify-center gap-1 active:bg-blue-50 active:scale-[0.97] transition-all duration-200"><RotateCcw size={14}/>{L('retryFull')}</button>
        <button onClick={generate} className={"py-2.5 bg-gradient-to-r "+GC[co]+" text-white font-bold rounded-xl text-sm flex items-center justify-center gap-1 active:scale-[0.97] transition-all duration-200"}><RotateCcw size={14}/>{L('newExamFull')}</button>
        <button onClick={onPrint} className="py-2.5 bg-white border-2 border-purple-200 text-purple-600 font-bold rounded-xl text-sm flex items-center justify-center gap-1 active:bg-purple-50 active:scale-[0.97] transition-all duration-200"><Printer size={14}/>{L('print')}</button>
        <button onClick={onHome} className="py-2.5 bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-xl text-sm flex items-center justify-center gap-1 active:bg-gray-100 active:scale-[0.97] transition-all duration-200"><Home size={14}/>{L('home')}</button>
      </>:<>
        <button onClick={onPrint} className="py-2.5 bg-white border-2 border-purple-200 text-purple-600 font-bold rounded-xl text-sm flex items-center justify-center gap-1 active:bg-purple-50 active:scale-[0.97] transition-all duration-200"><Printer size={14}/>{L('print')}</button>
        <button onClick={generate} className={"py-2.5 bg-gradient-to-r "+GC[co]+" text-white font-bold rounded-xl text-sm flex items-center justify-center gap-1 active:scale-[0.97] transition-all duration-200"}><RotateCcw size={14}/>{L('newExamFull')}</button>
      </>}
    </div>
  );
}
