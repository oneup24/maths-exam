/**
 * grade3.js — P3 question generators (3N2–3D1)
 * Extracted from engine.js
 */
import { ri, pk, fS, FIG } from '../core.js';
import { nm, pl, fd, CTX, _it, _pl } from '../config.js';

export const grade3={
'3N2':[
  ()=>{var a=ri(35,99),b=ri(6,9);return{d:1,tp:'calc',q:a+' × '+b+' = ?',a:String(a*b),s:['兩位×一位'],sc:2}},
  ()=>{var a=ri(100,350),b=ri(3,9);return{d:1,tp:'calc',q:a+' × '+b+' = ?',a:String(a*b),s:['三位×一位'],sc:2}},
  ()=>{var price=ri(25,60),n=ri(5,12),paid=1000;var total=price*n;var dStudents=ri(30,45),dDiscount='九折';return{d:2,tp:'work',q:'班上有'+dStudents+'位學生。'+nm()+'到'+pl()+'買書，書店正進行'+dDiscount+'優惠（未使用）。每本書$'+price+'，買了'+n+'本，付了$'+paid+'。找回多少元？',a:String(paid-total),trap:'學生數和折扣（未使用）',s:['🔍 學生數和折扣均無關','總: '+price+'×'+n+'='+total,'找回: '+paid+'−'+total+'='+(paid-total)],sc:3}},
  ()=>{var a=ri(15,35),b=ri(3,6),c=ri(8,20),d2=ri(2,4);var dE=ri(5,10),dEP=ri(2,4);return{d:2,tp:'work',q:'文具店有鉛筆每盒'+b+'枝(共'+a+'盒)、原子筆每盒'+d2+'枝(共'+c+'盒)，以及橡皮擦'+dE+'個(每個$'+dEP+')。鉛筆和原子筆共有多少枝？',a:String(a*b+c*d2),trap:'橡皮擦數量和價錢',s:['🔍 橡皮擦無關','鉛筆: '+a*b,'原子筆: '+c*d2,'共: '+(a*b+c*d2)],sc:3}},
  /* d:3 — distributive */
  ()=>{var a=ri(20,50),b=ri(20,50);var s2=a+b;return{d:3,tp:'calc',q:'用簡便方法計算：'+a+' × 99 + '+b+' × 99',a:String(s2*99),s:['提取公因數: ('+a+'+'+b+')×99 = '+s2+'×99 = '+s2*99],sc:3}}
],
'3N3':[
  ()=>{var dv=ri(4,9),q2=ri(30,70),r=ri(1,dv-1);var n=dv*q2+r;return{d:1,tp:'calc',q:n+' ÷ '+dv+' = ?',a:q2+'...'+r,s:['有餘數除法'],sc:2}},
  ()=>{var per=ri(6,12),total=ri(150,300);var full=Math.floor(total/per),rem=total%per;var dColor=pk(['紅色','藍色','綠色']),dFactory=ri(50,100);return{d:2,tp:'work',q:'工廠有'+dFactory+'名工人，生產了'+total+'件'+dColor+'玩具。每箱裝'+per+'件，至少需要多少個箱？',a:String(rem>0?full+1:full),trap:'工人數和顏色',s:['🔍 工人數和顏色無關',total+'÷'+per+'='+full+'...'+rem,'需'+(full+1)+'箱'],sc:3}},
  ()=>{var cap=ri(5,8),people=ri(20,45);var full=Math.floor(people/cap),rem=people%cap;var dLunch=ri(30,60),dDist=ri(10,30);return{d:3,tp:'work',q:people+'位同學帶$'+dLunch+'午餐費，乘'+pk(CTX.vehicle)+'到'+dDist+'公里外的農場。每輛最多坐'+cap+'人，最少需多少輛？',a:String(rem>0?full+1:full),trap:'午餐費和距離',s:['🔍 午餐費和距離無關',people+'÷'+cap+'='+full+'...'+rem],sc:3}},
  /* _addQ Strategy 1 — template rotation */
  ()=>{
    var a=ri(2,9),b=ri(3,9),ans=a*b,it=_it();
    var t=[
      ()=>nm()+'每天吃'+a+it.u+it.n+'，'+b+'天共吃多少'+it.u+'？',
      ()=>_pl()+'有'+b+'排座位，每排'+a+'個。共有多少個座位？',
      ()=>'每盒有'+a+'塊餅乾，'+nm()+'買了'+b+'盒。共有多少塊？'
    ];
    return{d:1,tp:'work',q:pk(t)(),a:String(ans),s:[a+'×'+b+'='+ans]};
  },
  ()=>{
    var a=ri(2,9),b=ri(2,9),ans=a*b;
    var t=[
      ()=>nm()+'有'+b+'本相簿，每本可放'+a+'張相片。最多可放多少張？',
      ()=>_pl()+'每行種了'+a+'棵花，共'+b+'行。一共有多少棵？',
      ()=>'一包有'+a+'粒朱古力，'+nm()+'買了'+b+'包。一共有多少粒？'
    ];
    return{d:1,tp:'work',q:pk(t)(),a:String(ans),s:[a+'×'+b+'='+ans]};
  }
],
'3N4':[
  ()=>{var a=ri(15,40),b=ri(3,8),c=ri(20,60);return{d:1,tp:'calc',q:a+' × '+b+' + '+c+' = ?',a:String(a*b+c),s:['先乘後加'],sc:2}},
  ()=>{var a=ri(10,25),b=ri(5,15),c=ri(3,7);return{d:1,tp:'calc',q:'('+a+' + '+b+') × '+c+' = ?',a:String((a+b)*c),s:['先算括號'],sc:2}},
  ()=>{var n=ri(4,8),p1=ri(12,30),p2=ri(8,20),paid=500;var cost=n*p1+n*p2;var dRP=ri(15,25),dRN=ri(3,8);return{d:2,tp:'work',q:nm()+'買了'+n+'本中文書(每本$'+p1+')和'+n+'本英文書(每本$'+p2+')。店裏雨傘每把$'+dRP+'(共'+dRN+'把)，但未購買。付了$'+paid+'，找回多少元？',a:String(paid-cost),trap:'雨傘資料（未購買）',s:['🔍 雨傘無關','中: '+n*p1,'英: '+n*p2,'找回: '+(paid-cost)],sc:3}},
  ()=>{var a=ri(100,300),b=ri(3,8),c=ri(50,150);return{d:2,tp:'calc',q:a+' − '+c+' × '+b+' = ?',a:String(a-c*b),s:['先乘: '+c+'×'+b+'='+c*b,'再減: '+(a-c*b)],sc:2}},
  /* d:3 — error finding */
  ()=>{var a=ri(5,15),b=ri(3,8),c=ri(10,20);var wrong=(a+b)*c;var right=a+b*c;return{d:3,tp:'work',q:nm()+'計算 '+a+' + '+b+' × '+c+' = '+wrong+'。他做對了嗎？如果不對，正確答案是什麼？',a:String(right),s:['❌ 應先算乘法','正確: '+a+'+'+b*c+' = '+right],sc:3}},
  /* _addQ Strategy 2 — reverse / inverse */
  ()=>{
    var a=ri(2,9),b=ri(2,9),p=a*b,it=_it();
    return{d:2,tp:'work',
      q:nm()+'共有'+p+it.u+it.n+'，每份'+a+it.u+'。可以分成多少份？',
      a:String(b),s:[p+'÷'+a+'='+b]};
  }
],
'3N5':[
  ()=>{var den=pk([4,6,8]),a=ri(1,den-2),b=ri(1,den-a-1);return{d:1,tp:'calc',q:a+'/'+den+' + '+b+'/'+den+' = ?',a:fS(a+b,den),s:['同分母相加'],sc:2}},
  ()=>{var den=pk([3,5,6,8]),a=ri(Math.ceil(den*0.6),den+3),b=ri(1,den-1);return{d:1,tp:'calc',q:a+'/'+den+' − '+b+'/'+den+' = ?',a:fS(a-b,den),s:['同分母相減'],sc:2}},
  ()=>{var w1=ri(1,3),n1=ri(1,3),d1=pk([4,5,6]),w2=ri(1,2),n2=ri(1,d1-1);var imp1=w1*d1+n1,imp2=w2*d1+n2;return{d:2,tp:'calc',q:w1+'又'+n1+'/'+d1+' + '+w2+'又'+n2+'/'+d1+' = ?',a:fS(imp1+imp2,d1),s:['帶分數相加'],sc:2}},
  /* d:3 — comparison */
  ()=>{var d=pk([6,8,10]);var a=ri(1,d-1),b=ri(1,d-1);while(a===b)b=ri(1,d-1);return{d:3,tp:'mc',q:a+'/'+d+' 和 '+b+'/'+d+' 哪個較大？',isMC:true,opts:[{l:'A',v:a+'/'+d,c:a>b},{l:'B',v:b+'/'+d,c:b>a},{l:'C',v:'一樣大',c:a===b}],a:a>b?'A':'B',s:['同分母比分子'],sc:2}}
],
'3M':[
  ()=>{var km=ri(2,6),m=ri(100,900),km2=ri(1,4),m2=ri(100,800);return{d:1,tp:'calc',q:km+'公里'+m+'米 + '+km2+'公里'+m2+'米 = ____米',a:String(km*1000+m+km2*1000+m2),s:['化成米再加'],sc:2}},
  ()=>{var items=[{n:fd(),w:ri(200,400)},{n:fd(),w:ri(150,300)},{n:fd(),w:ri(100,250)}];var total=items.reduce((s,i)=>s+i.w,0);var dBox=ri(50,100),dBoxC=pk(['紅色','藍色']);return{d:2,tp:'short',q:items.map(i=>i.n+'重'+i.w+'克').join('，')+'。放在'+dBoxC+'盒子(空盒重'+dBox+'克)。水果共重多少克？比1公斤多還是少？差多少克？',a:total+','+(total>=1000?'多':'少')+','+Math.abs(total-1000),trap:'盒子重量和顏色',s:['🔍 盒子無關','水果: '+total+'克','與1000克差: '+Math.abs(total-1000)],sc:3}},
  /* d:3 — unit conversion chain */
  ()=>{var km=ri(2,5),m=ri(200,800);var total_m=km*1000+m;return{d:3,tp:'fill',q:km+'公里'+m+'米 = ____米 = ____厘米',a:total_m+','+(total_m*100),s:[km+'×1000+'+m+'='+total_m,total_m+'×100='+(total_m*100)],sc:3}}
],
'3S':[
  ()=>({d:2,tp:'mc',q:'以下哪個不一定是平行四邊形？',isMC:true,opts:[{l:'A',v:'正方形',c:false},{l:'B',v:'長方形',c:false},{l:'C',v:'梯形',c:true}],a:'C',s:['梯形只有一組平行邊'],sc:2}),
  ()=>{var n=ri(3,6);return{d:2,tp:'calc',q:n+'個不同大小的平行四邊形的內角總和是多少度？',a:String(n*360),s:['每個360°, '+n+'×360='+n*360],sc:2}},
  ()=>({d:3,tp:'mc',q:'一個三角形三條邊長分別是3cm、4cm和8cm，這三角形存在嗎？',isMC:true,opts:[{l:'A',v:'存在',c:false},{l:'B',v:'不存在',c:true}],a:'B',s:['3+4=7 < 8，不符合三角不等式'],sc:3})
],
'3D1':[
  ()=>{var items=[{l:'足球',v:ri(15,35)},{l:'籃球',v:ri(10,30)},{l:'排球',v:ri(12,28)},{l:'乒乓球',v:ri(20,40)}];var total=items.reduce((s,i)=>s+i.v,0);var mx=items.reduce((m,i)=>i.v>m.v?i:m,items[0]);var mn=items.reduce((m,i)=>i.v<m.v?i:m,items[0]);return{d:2,tp:'short',q:'根據棒形圖，四種球共有多少個？最多比最少多多少個？',fig:FIG.bars(items),a:total+','+(mx.v-mn.v),s:['總和: '+total,'差: '+(mx.v-mn.v)],sc:3}},
  ()=>{var items=[{l:'一月',v:ri(20,50)},{l:'二月',v:ri(15,45)},{l:'三月',v:ri(25,60)}];var avg=Math.round(items.reduce((s,i)=>s+i.v,0)/items.length);return{d:3,tp:'short',q:'棒形圖顯示三個月銷量。三個月平均銷量是多少？',fig:FIG.bars(items),a:String(avg),s:['總÷3='+avg],sc:3}}
]
};

// Topics: 3N2, 3N3, 3N4, 3N5, 3M, 3S, 3D1
// Export: grade3 (object with 7 topic keys)
// Total generators: 28
