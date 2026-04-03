import React from 'react';
import GradeCard from './GradeCard';

export default function GradeGrid({gradeBest,onSelect,L}){
  return(
    <div className="grid grid-cols-2 gap-3 mb-3">
      {[1,2,3,4,5,6].map((g,i)=>(
        <GradeCard key={g} grade={g} best={gradeBest[g]||0} onClick={()=>onSelect(g)} L={L} delay={i*0.06}/>
      ))}
    </div>
  );
}
