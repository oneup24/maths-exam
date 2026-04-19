import React from 'react';
import {motion} from 'framer-motion';
import {Star} from 'lucide-react';
import {GC} from '../../lib/colors';
import {GRADE_INFO,TOPICS} from '../../engine/index';

export default function GradeCard({grade,best,onClick,L,delay=0}){
  var stars=best>=80?3:best>=60?2:best>=40?1:0;
  var co=GRADE_INFO[grade].co;
  return(
    <motion.button
      initial={{opacity:0,y:10}}
      animate={{opacity:1,y:0}}
      transition={{delay}}
      whileTap={{scale:.96}}
      onClick={onClick}
      className={"relative p-3 rounded-2xl bg-gradient-to-br "+GC[co]+" text-white shadow-lg active:shadow-md hover:shadow-xl transition-all duration-200"}>
      {stars>0&&<div className="absolute top-2 right-2 flex gap-0.5">
        {[1,2,3].map(s=><Star key={s} size={11} className={s<=stars?'fill-yellow-300 text-yellow-300':'fill-white/20 text-white/20'}/>)}
      </div>}
      <div className="text-2xl font-black">P{grade}</div>
      <div className="text-xs font-bold opacity-90">{GRADE_INFO[grade].nm}</div>
      <div className="text-xs opacity-70 mt-1">{best>0?L('bestScore',best):L('topicsCount',TOPICS[grade].length)}</div>
      {best>0&&<div className="mt-2 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-0.5 text-xs font-bold inline-block">{best}%</div>}
    </motion.button>
  );
}
