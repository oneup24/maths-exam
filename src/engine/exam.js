/**
 * exam.js — buildExam() and printExam()
 * Extracted from engine.js
 */

import { pk } from './core.js';
import { TOPICS, GRADE_INFO, DIFF_INFO, DIFF_ALLOW, EXAM_TARGETS, SECT_RATIOS, SECT_CONF, SECT_LBL } from './config.js';
import { Q } from './grades/index.js';

export function buildExam(grade,topics,examType,difficulty){
  difficulty=difficulty||2;
  var totalTarget=EXAM_TARGETS[examType]||24;
  var allowed=DIFF_ALLOW[difficulty]||[1,2,3];
  var tMap={};(TOPICS[grade]||[]).forEach(function(t){tMap[t.id]=t.nm});
  var allGens={calc:[],fill:[],mc:[],short:[],work:[]};
  topics.forEach(tid=>{
    var pool=(Q[grade]||{})[tid];if(!pool)return;
    var tnm=tMap[tid]||tid;
    pool.forEach(gen=>{
      try{
        var q=gen();
        if(!q||!q.tp||!allGens[q.tp])return;
        /* check difficulty compatibility */
        if(!allowed.includes(q.d||2))return;
        allGens[q.tp].push({fn:gen,tid:tid,tnm:tnm});
      }catch{/* intentionally empty — skip broken generators */}
    });
  });
  var types=['calc','fill','mc','short','work'].filter(t=>allGens[t].length>0);
  if(!types.length)return[];
  var sumR=0;types.forEach(t=>{sumR+=SECT_RATIOS[t]||.1});
  var dist={};types.forEach(t=>{dist[t]=Math.max(1,Math.round(totalTarget*(SECT_RATIOS[t]||.1)/sumR))});
  var generated={};var count=0;
  types.forEach(t=>{
    var need=dist[t]||0,gens=allGens[t],qs=[],seen={},seenT={};
    for(var i=0;i<need*80&&qs.length<need;i++){
      try{var item=pk(gens);var q=item.fn();if(!q||!q.q)continue;if(!allowed.includes(q.d||2))continue;var k=q.q+'|'+q.a;if(seen[k])continue;var tc=seenT[q.q]||0;if(tc>=1)continue;seen[k]=true;seenT[q.q]=tc+1;q.topicId=item.tid;q.topicName=item.tnm;qs.push(q)}catch{/* intentionally empty — skip broken generators */}
    }
    if(qs.length>0){generated[t]=qs;count+=qs.length}
  });
  var gSeen={},gSeenT={};
  /* pre-seed from session to avoid cross-exam repeats */
  try{var _sk='mq_seen_'+grade;JSON.parse(sessionStorage.getItem(_sk)||'[]').forEach(k=>{gSeen[k]=true;var qt=k.split('|')[0];gSeenT[qt]=(gSeenT[qt]||0)+1});}catch{}
  types.forEach(t=>(generated[t]||[]).forEach(q=>{gSeen[q.q+'|'+q.a]=true;gSeenT[q.q]=(gSeenT[q.q]||0)+1}));
  var safety=0;
  while(count<totalTarget&&safety<500){
    safety++;var t=pk(types);var gens=allGens[t];if(!gens.length)continue;if(!generated[t])generated[t]=[];
    try{var item=pk(gens);var q=item.fn();if(!q||!q.q)continue;if(!allowed.includes(q.d||2))continue;var k=q.q+'|'+q.a;if(gSeen[k])continue;if((gSeenT[q.q]||0)>=1)continue;gSeen[k]=true;gSeenT[q.q]=(gSeenT[q.q]||0)+1;q.topicId=item.tid;q.topicName=item.tnm;generated[t].push(q);count++}catch{/* intentionally empty — skip broken generators */}
  }
  while(count>totalTarget){
    var longest=types.filter(t=>(generated[t]||[]).length>1).sort((a,b)=>(generated[b]||[]).length-(generated[a]||[]).length);
    if(!longest.length)break;generated[longest[0]].pop();count--;
  }
  var secs=[];
  ['calc','fill','mc','short','work'].forEach(t=>{var qs=generated[t];if(!qs||!qs.length)return;var total=qs.reduce((s,q)=>s+(q.sc||2),0);secs.push({id:t,label:SECT_LBL[secs.length],nm:SECT_CONF[t].nm,nt:SECT_CONF[t].nt,total,qs})});
  /* persist question hashes for cross-exam dedup */
  try{var _sk='mq_seen_'+grade;var _prev=JSON.parse(sessionStorage.getItem(_sk)||'[]');var _new=secs.flatMap(s=>s.qs).map(q=>q.q+'|'+q.a);var _merged=[...new Set([..._prev,..._new])].slice(-200);sessionStorage.setItem(_sk,JSON.stringify(_merged));}catch{}
  return secs;
}

export function printExam(secs,grade,showAns,name,difficulty){
  var gt=secs.reduce((s,sec)=>s+sec.total,0);
  var esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br/>');
  var diffLabel=DIFF_INFO[difficulty||2].nm;
  var b='';
  secs.forEach(sec=>{
    b+='<div style="margin:14px 0 6px;border-bottom:2px solid #333;padding-bottom:3px"><b>'+sec.label+'. '+sec.nm+'（'+sec.total+'分，'+sec.nt+'）</b></div>';
    sec.qs.forEach((q,i)=>{
      b+='<div style="margin:6px 0;padding:4px 0;border-bottom:1px dashed #ddd"><b>'+(i+1)+'.</b> '+esc(q.q);
      if(q.fig)b+='<div style="margin:4px 0;text-align:center">'+q.fig+'</div>';
      if(q.isMC&&q.opts)b+='<div style="margin:3px 0 0 18px;display:flex;flex-wrap:wrap;gap:4px 24px">'+q.opts.map(o=>'<span>'+o.l+'. '+esc(o.v)+'</span>').join('')+'</div>';
      if(sec.id==='work')b+='<div style="height:60px"></div>';
      b+='</div>';
    });
  });
  var ans='';
  if(showAns){
    ans='<div style="page-break-before:always;border-top:3px double #333;padding-top:10px;margin-top:16px"><h2 style="text-align:center">參考答案</h2>';
    secs.forEach(sec=>{
      ans+='<div style="margin:8px 0"><b>'+sec.label+'. '+sec.nm+'</b><div style="display:flex;flex-wrap:wrap;gap:2px 12px;margin-top:3px">';
      sec.qs.forEach((q,i)=>{ans+='<span style="font-size:12px;width:46%"><b>'+(i+1)+'.</b> '+esc(q.a)+(q.trap?' <em style="color:#d97706;font-size:10px">[干擾: '+esc(q.trap)+']</em>':'')+'</span>'});
      ans+='</div></div>';
    });
    ans+='</div>';
  }
  var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>@page{size:A4;margin:15mm}body{font-family:"Microsoft JhengHei",sans-serif;font-size:13px;line-height:1.6}@media print{.np{display:none!important}}</style></head><body><div class="np" style="position:fixed;top:0;left:0;right:0;background:#4f46e5;padding:8px 16px;display:flex;justify-content:space-between;align-items:center;z-index:99"><span style="color:#fff;font-weight:bold">列印預覽</span><button onclick="window.print()" style="padding:6px 16px;border-radius:8px;border:none;cursor:pointer;font-weight:bold;background:#fff">列印</button></div><div class="np" style="height:44px"></div><div style="text-align:center;border-bottom:3px double #333;padding-bottom:8px;margin-bottom:10px"><h1 style="font-size:18px;margin:0">'+GRADE_INFO[grade].nm+'數學科模擬試卷（'+diffLabel+'）</h1><p style="font-size:11px;color:#666;margin:4px 0">依據教育局《小學數學科學習內容》(2017)編製 · 含干擾項訓練</p><div style="display:flex;justify-content:space-between;margin-top:6px"><span>姓名：'+(name||'________')+'</span><span>分數：____/'+gt+'</span></div></div>'+b+ans+'</body></html>';
  var w=window.open('','_blank','width=800,height=900');if(w){w.document.write(html);w.document.close();}
}
