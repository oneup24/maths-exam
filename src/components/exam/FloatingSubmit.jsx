import React from 'react';
// eslint-disable-next-line no-unused-vars -- motion is used as <motion.button> in JSX
import {motion} from 'framer-motion';
import {Send} from 'lucide-react';

export default function FloatingSubmit({isMarked,answeredQs,totalQs,onSubmit,L}){
  if(isMarked)return null;
  return(
    <motion.button initial={{y:20,opacity:0}} animate={{y:0,opacity:1}}
      onClick={onSubmit}
      style={{bottom:'calc(1.25rem + env(safe-area-inset-bottom, 0px))'}}
      className="fixed left-1/2 -translate-x-1/2 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-extrabold text-lg rounded-3xl shadow-xl z-40 flex items-center gap-2 active:shadow-lg">
      <Send size={18}/><span>{L('submit')}</span><span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">{answeredQs}/{totalQs}</span>
    </motion.button>
  );
}
