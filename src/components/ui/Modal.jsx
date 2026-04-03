import React from 'react';
import {motion,AnimatePresence} from 'framer-motion';

export default function Modal({isOpen,onClose,children}){
  return(
    <AnimatePresence>{isOpen&&(
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        role="dialog" aria-modal="true" onClick={onClose}>
        <motion.div initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.9,opacity:0}}
          className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-xl"
          onClick={e=>e.stopPropagation()}>
          {children}
        </motion.div>
      </motion.div>
    )}</AnimatePresence>
  );
}
