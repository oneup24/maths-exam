/**
 * grade2.js — P2 question generators (2N1, 2N2, 2N3, 2N5, 2N6, 2M, 2S, 2D1)
 * Extracted from engine.js
 */
import { ri, pk, FIG } from '../core.js';
import { nm, pl, it, CTX } from '../config.js';

export const grade2={
'2N1':[
  ()=>{var a=ri(100,999);return{d:1,tp:'fill',q:a+'的百位是____，十位是____，個位是____。',a:Math.floor(a/100)+','+Math.floor(a%100/10)+','+a%10,s:['位值'],sc:2}},
  ()=>{var nums=[];for(var i=0;i<4;i++)nums.push(ri(100,999));var sorted=[...nums].sort((a,b)=>b-a);return{d:1,tp:'fill',q:'把 '+nums.join('、')+' 由大到小排列：____',a:sorted.join(','),s:['比較三位數'],sc:2}},
  ()=>{var h=ri(1,8),t=ri(0,9),u=ri(0,9);return{d:2,tp:'fill',q:'一個三位數，百位是'+h+'，十位比百位大'+Math.abs(t-h)+'，個位是'+u+'。這個數是____。',a:String(h*100+t*10+u),s:['逐位推算'],sc:2}},
  ()=>{var a=ri(300,700),b=a+pk([-10,-1,1,10]);return{d:3,tp:'mc',q:a+'和'+b+'哪個較大？相差多少？',isMC:false,a:(Math.max(a,b))+','+Math.abs(a-b),s:['比較: '+Math.max(a,b)+'較大','差: '+Math.abs(a-b)],sc:2}}
],
'2N2':[
  ()=>{var a=ri(200,500),b=ri(150,300),c=ri(100,200);return{d:1,tp:'calc',q:a+' + '+b+' − '+c+' = ?',a:String(a+b-c),s:['先加再減'],sc:2}},
  ()=>{var have=ri(300,600),sell=ri(100,200),buy=ri(80,180);var dHours=ri(8,10),dFloors=ri(1,3);return{d:2,tp:'work',q:pl()+'有'+dFloors+'層樓，每天營業'+dHours+'小時，現存書籍'+have+'本。賣出'+sell+'本後，又進貨'+buy+'本，現在有多少本？',a:String(have-sell+buy),trap:'樓層數和營業時間',s:['🔍 樓層和營業時間均無關',have+'−'+sell+'='+(have-sell),(have-sell)+'+'+buy+'='+(have-sell+buy)],sc:2}},
  ()=>{var a=ri(200,400),b=ri(150,350);var dTeacher=ri(10,20);return{d:2,tp:'work',q:pk(CTX.school)+'有甲班'+a+'人、乙班'+b+'人。學校共有'+dTeacher+'位老師。甲班比乙班多多少人？',a:String(Math.abs(a-b)),trap:'老師人數（'+dTeacher+'位）',s:['🔍 老師人數無關','差: |'+a+'−'+b+'| = '+Math.abs(a-b)],sc:2}},
  /* d:3 — multi-step + reasoning */
  ()=>{var a=ri(150,300),b=ri(100,250),give=ri(30,80);return{d:3,tp:'work',q:nm()+'有'+a+'張貼紙，'+nm()+'有'+b+'張。'+CTX.names[0]+'給了'+CTX.names[1]+' '+give+'張後，誰的貼紙較多？多多少張？',a:((a-give)>(b+give)?CTX.names[0]:CTX.names[1])+','+Math.abs((a-give)-(b+give)),s:[CTX.names[0]+': '+a+'−'+give+'='+(a-give),CTX.names[1]+': '+b+'+'+give+'='+(b+give),'比較後作答'],sc:3}}
],
'2N3':[
  ()=>{var a=ri(2,9),b=ri(2,9),c=ri(1,9);return{d:1,tp:'calc',q:a+' × '+b+' + '+c+' = ?',a:String(a*b+c),s:['先乘後加'],sc:2}},
  ()=>{var price=ri(3,8),n=ri(4,8),extra=ri(5,15);var dItem=it(),dPrice=ri(1,3);return{d:2,tp:'work',q:'每個蛋糕'+price+'元，每枝'+dItem+' '+dPrice+'元。'+nm()+'買了'+n+'個蛋糕，另付包裝費'+extra+'元。買蛋糕共需多少元？',a:String(price*n+extra),trap:dItem+'價錢（'+dPrice+'元）',s:['🔍 '+dItem+'價錢無關',price+'×'+n+'='+price*n,price*n+'+'+extra+'='+(price*n+extra)],sc:2}},
  ()=>{var a=ri(3,8),b=ri(3,6),add=ri(5,15);var dBirds=ri(10,25);return{d:2,tp:'work',q:'果園每行有'+a+'棵樹，共'+b+'行。果園裏還有'+dBirds+'隻'+pk(['小鳥','蝴蝶','蜜蜂'])+'。如果再種'+add+'棵，共有多少棵樹？',a:String(a*b+add),trap:'動物數目',s:['🔍 動物數無關',a+'×'+b+'='+a*b,a*b+'+'+add+'='+(a*b+add)],sc:2}},
  /* d:3 — inverse multiplication */
  ()=>{var ans=ri(3,9),b=ri(4,8);return{d:3,tp:'work',q:nm()+'把一些糖果平均分成'+b+'份，每份有'+ans+'顆。原來共有多少顆糖果？',a:String(ans*b),s:['反向思考: '+ans+'×'+b+'='+ans*b],sc:2}}
],
'2M':[
  ()=>{var m=ri(2,5),cm=ri(10,90),m2=ri(1,3),cm2=ri(10,80);return{d:1,tp:'calc',q:m+'米'+cm+'厘米 + '+m2+'米'+cm2+'厘米 = ____厘米',a:String(m*100+cm+m2*100+cm2),s:['化成厘米再加'],sc:2}},
  ()=>{var total=ri(200,500),part=ri(80,150);var dWidth=ri(2,5);return{d:2,tp:'short',q:'繩子長'+total+'厘米、闊'+dWidth+'厘米。用去'+part+'厘米後再用去'+(part-30)+'厘米，還剩多長？',a:String(total-part-(part-30)),trap:'繩子闊度（'+dWidth+'厘米）',s:['🔍 闊度無關',total+'−'+part+'='+(total-part),(total-part)+'−'+(part-30)+'='+(total-part-(part-30))],sc:2}},
  ()=>{var kg=ri(1,3),g=ri(100,800);return{d:3,tp:'fill',q:kg+'公斤'+g+'克 = ____克',a:String(kg*1000+g),s:[kg+'×1000+'+g+'='+(kg*1000+g)],sc:2}}
],
'2S':[
  ()=>({d:2,tp:'mc',q:'一個四邊形有4個直角，它一定是什麼形狀？',isMC:true,opts:[{l:'A',v:'正方形',c:false},{l:'B',v:'長方形',c:true},{l:'C',v:'平行四邊形',c:false}],a:'B',s:['4個直角→長方形'],sc:2}),
  ()=>({d:3,tp:'mc',q:'以下哪項是正確的？',isMC:true,opts:[{l:'A',v:'所有正方形都是長方形',c:true},{l:'B',v:'所有長方形都是正方形',c:false},{l:'C',v:'三角形有4個角',c:false}],a:'A',s:['正方形是特殊的長方形'],sc:2})
],

/* ═══════════ 2N5 分數(一) ═══════════ */
'2N5':[
  // Unit fraction naming (d:1)
  ()=>{const d=pk([2,3,4]);return{d:1,tp:'fill',q:'把一個圖形分成'+d+'等份，塗了1份，塗色部分是____。',a:'1/'+d,s:['1/'+d+' 讀作：'+d+'分之一'],sc:1}},
  // Compare unit fractions (d:1)
  ()=>{const a=pk([2,3,4,6]),b=pk([2,3,4,6]);let bb=b;while(bb===a)bb=pk([2,3,4,6]);
    return{d:1,tp:'mc',q:'1/'+a+' 和 1/'+bb+'，哪個較大？',isMC:true,
      opts:[{l:'A',v:'1/'+a,c:a<bb},{l:'B',v:'1/'+bb,c:bb<a},{l:'C',v:'一樣大',c:false}],
      a:a<bb?'A':'B',s:['分母越小，分數越大：1/'+Math.min(a,bb)+' > 1/'+Math.max(a,bb)],sc:1}},
  // Fraction of a group (d:2)
  ()=>{const frac=pk([2,3,4]);const total=frac*ri(2,5);
    return{d:2,tp:'calc',q:total+'個橙，'+frac+'分之一是多少個？',a:String(total/frac),s:[total+'÷'+frac+'='+(total/frac)],sc:1}},
  // Word problem (d:2)
  ()=>{const frac=pk([2,3,4]);const total=frac*ri(3,6);const ate=total/frac;const n=nm();
    return{d:2,tp:'work',q:n+'有'+total+'粒糖果，吃了'+frac+'分之一。吃了多少粒？',
      a:String(ate),s:[total+'÷'+frac+'='+ate+'粒'],sc:2}}
],

/* ═══════════ 2N6 基本除法 ═══════════ */
'2N6':[
  // Basic ÷ fact (d:1)
  ()=>{const a=ri(2,9),b=ri(2,9);return{d:1,tp:'calc',q:(a*b)+' ÷ '+b+' = ?',a:String(a),s:[a+'×'+b+'='+a*b+'，反過來÷'+b+'='+a],sc:1}},
  // With remainder (d:1)
  ()=>{const div=ri(3,8),quot=ri(3,7),rem=ri(1,div-1);return{d:1,tp:'fill',q:(div*quot+rem)+' ÷ '+div+' = ____…____',a:quot+','+rem,s:[(div*quot+rem)+'÷'+div+'='+quot+'餘'+rem],sc:1}},
  // Word problem: equal sharing (d:2)
  ()=>{const groups=ri(2,5);const total=groups*ri(3,8);const n=nm();
    return{d:2,tp:'work',q:n+'有'+total+'個橙，平均分成'+groups+'份，每份有多少個？',
      a:String(total/groups),s:[total+'÷'+groups+'='+(total/groups)],sc:2}},
  // d:3 — find number of groups
  ()=>{const each=ri(3,6);const total=each*ri(4,8);
    return{d:3,tp:'work',q:'共有'+total+'個蘋果，每盒放'+each+'個，需要多少個盒子？',
      a:String(total/each),s:[total+'÷'+each+'='+(total/each)+'個盒子'],sc:2}}
],

/* ═══════════ 2D1 象形圖和棒形圖 ═══════════ */
'2D1':[
  // Read bar chart: max value (d:1)
  ()=>{const labels=['蘋果','橙','香蕉','芒果'];const data=labels.map(l=>({l,v:ri(2,9)}));
    const mx=data.reduce((m,d)=>d.v>m.v?d:m,data[0]);
    return{d:1,tp:'fill',q:'棒形圖顯示各種水果數量。最多的是____，共____個。',
      fig:FIG.bars(data),a:mx.l+','+mx.v,s:['最高的棒 = '+mx.l+': '+mx.v+'個'],sc:2}},
  // Read bar chart: total (d:2)
  ()=>{const labels=['一月','二月','三月','四月'];const data=labels.map(l=>({l,v:ri(3,9)}));
    const total=data.reduce((s,d)=>s+d.v,0);
    return{d:2,tp:'fill',q:'棒形圖顯示四個月的書本數量。四個月共有多少本？',
      fig:FIG.bars(data),a:String(total),s:['加總: '+data.map(d=>d.v).join('+')+' = '+total],sc:2}},
  // Pictograph (d:2)
  ()=>{const rows=[{name:'小明',count:ri(2,5)},{name:'小芬',count:ri(2,5)},{name:'家俊',count:ri(2,5)}];
    const sym='★';const total=rows.reduce((s,r)=>s+r.count,0);
    return{d:2,tp:'work',q:'圖表中每個'+sym+'代表2本書。\n'+rows.map(r=>r.name+': '+sym.repeat(r.count)).join('\n')+'\n三人共有多少本書？',
      a:String(total*2),s:['每個★=2本','共'+total+'個★='+total+'×2='+total*2],sc:2}}
]
};

// Topics: 2N1, 2N2, 2N3, 2N5, 2N6, 2M, 2S, 2D1
// Export: grade2 (object with 8 topic keys, 32 generators total)
