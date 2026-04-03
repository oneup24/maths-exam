import React from 'react';
import {AlertTriangle} from 'lucide-react';

export default function TrapInfoBox({L}){
  return(
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
      <div className="flex items-start gap-2">
        <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0"/>
        <div>
          <p className="text-xs font-bold text-amber-700">{L('trapBoxTitle')}</p>
          <p className="text-xs text-amber-600 mt-0.5">{L('trapBoxDesc')}</p>
        </div>
      </div>
    </div>
  );
}
