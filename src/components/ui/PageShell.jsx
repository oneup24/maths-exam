import React from 'react';

export default function PageShell({children,className='',maxWidth='max-w-lg'}){
  return(
    <div className={"min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 p-4 pb-20 "+className}>
      <div className={maxWidth+" mx-auto"}>
        {children}
      </div>
    </div>
  );
}
