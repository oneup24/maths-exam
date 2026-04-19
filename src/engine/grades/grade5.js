/**
 * grade5.js — P5 question generators
 * Extracted from engine.js
 */
import { ri, pk, lcm, fS, shuffle, FIG } from '../core.js';
import { nm, pl, CTX, _nm2 } from '../config.js';

export const grade5={

/* ═══════════ 5N1 大數（百萬/千萬/億） ═══════════ */
'5N1':[
  // 讀大數 (d:1)
  ()=>{const mil=ri(1,9),hk=ri(0,9),tk=ri(0,9);const n=mil*1000000+hk*100000+tk*10000;
    return{d:1,tp:'fill',q:'用數字寫出：'+mil+'百萬'+hk+'十萬'+tk+'萬 = ____',
      a:String(n),s:['位值：百萬/十萬/萬/千/百/十/個'],sc:1}},
  // 百萬位位值 (d:1)
  ()=>{const n=ri(1000000,9999999);
    return{d:1,tp:'fill',q:n+'的百萬位數字是____。',
      a:String(Math.floor(n/1000000)),s:['百萬位='+Math.floor(n/1000000)],sc:1}},
  // 四捨五入至萬 (d:1)
  ()=>{const n=ri(10000,999999);const r=Math.round(n/10000)*10000;
    return{d:1,tp:'fill',q:'把'+n+'四捨五入至最接近的萬：____',
      a:String(r),s:['看千位 '+(Math.floor(n/1000)%10)+'：'+(Math.floor(n/1000)%10>=5?'進萬':'捨去')],sc:1}},
  // 四捨五入至億 (d:2)
  ()=>{const n=ri(100000000,999999999);
    return{d:2,tp:'fill',q:'把'+n+'四捨五入至最接近的億，是____億。',
      a:String(Math.round(n/100000000)),s:['看千萬位決定進退'],sc:1}},
  // 由小到大排列 (d:2)
  ()=>{let a=ri(1,9)*1000000+ri(0,9)*100000,b=ri(1,9)*1000000+ri(0,9)*100000,c=ri(1,9)*1000000+ri(0,9)*100000;
    while(b===a)b=ri(1,9)*1000000+ri(0,9)*100000;while(c===a||c===b)c=ri(1,9)*1000000+ri(0,9)*100000;
    const sorted=[a,b,c].sort((x,y)=>x-y);
    return{d:2,tp:'fill',q:'由小到大排列：'+shuffle([a,b,c]).join('、')+' → ____',
      a:sorted.join(', '),s:[sorted.join(' < ')],sc:2}},
  // 人口問題 (d:2)
  ()=>{const pop=ri(7,8)*1000000+ri(0,9)*100000;const n=nm();
    return{d:2,tp:'fill',q:'香港人口約'+pop+'人。'+n+'說「約____百萬人」。（四捨五入至百萬）',
      a:String(Math.round(pop/1000000)),s:[pop+'÷1000000≈'+Math.round(pop/1000000)+'百萬'],sc:2}},
  // 四捨五入連鎖反應 (d:3)
  ()=>{const n=ri(1,5)*100000000+99600000+ri(1,9)*10000;return{d:3,tp:'fill',q:'把 '+n+' 四捨五入至最接近的千萬，是____。',a:String(Math.round(n/10000000)*10000000),s:['看百萬位：如果是 5 或以上就要進位。','99 進位會引起連鎖反應，變成下一個億。'],sc:2}}
],

'5N2':[
  ()=>{var d1=pk([3,4,6]),d2=pk([4,6,8]);if(d1===d2)d2=d1*2;var l=lcm(d1,d2);var n1=ri(1,d1-1),n2=ri(1,d2-1);var res=n1*(l/d1)+n2*(l/d2);return{d:1,tp:'calc',q:n1+'/'+d1+' + '+n2+'/'+d2+' = ?',a:fS(res,l),s:['通分母: L.C.M.='+l],sc:2}},
  ()=>{var d1=pk([3,4,6]),d2=pk([4,6,8]);if(d1===d2)d2=d1+2;var l=lcm(d1,d2);var n1=ri(Math.ceil(d1*0.6),d1-1),n2=ri(1,Math.floor(d2*0.4));var v1=n1*(l/d1),v2=n2*(l/d2);if(v1<=v2){n1=d1-1;v1=n1*(l/d1)}return{d:2,tp:'calc',q:n1+'/'+d1+' − '+n2+'/'+d2+' = ?',a:fS(v1-v2,l),s:['通分母後相減'],sc:2}},
  ()=>{var sets=[{d1:4,d2:6,d3:3,l:12},{d1:3,d2:4,d3:6,l:12},{d1:6,d2:8,d3:4,l:24},{d1:4,d2:5,d3:10,l:20},{d1:3,d2:5,d3:15,l:15}];var s=pk(sets);var n1=ri(1,s.d1-1),n2=ri(1,s.d2-1),n3=ri(1,s.d3-1);var v1=n1*(s.l/s.d1),v2=n2*(s.l/s.d2),v3=n3*(s.l/s.d3);while(v3>=v1+v2){n3=ri(1,s.d3-1);v3=n3*(s.l/s.d3);}return{d:3,tp:'calc',q:n1+'/'+s.d1+' + '+n2+'/'+s.d2+' − '+n3+'/'+s.d3+' = ?',a:fS(v1+v2-v3,s.l),s:['L.C.M.='+s.l],sc:3}},
  ()=>{var d1=pk([3,4,5]),d2=pk([4,6,8]);if(d1===d2)d2=d1+2;var l=lcm(d1,d2);var n1=ri(1,d1-1),n2=ri(1,d2-1);var v1=n1*(l/d1),v2=n2*(l/d2);return{d:3,tp:'mc',q:n1+'/'+d1+' 和 '+n2+'/'+d2+' 哪個較大？',isMC:true,opts:[{l:'A',v:n1+'/'+d1,c:v1>v2},{l:'B',v:n2+'/'+d2,c:v2>v1},{l:'C',v:'一樣大',c:v1===v2}],a:v1>v2?'A':v2>v1?'B':'C',s:['通分母比較: '+v1+'/'+l+' vs '+v2+'/'+l],sc:2}},
  /* _addQ Strategy 3 — comparison (line 582) */
  ()=>{
    var pairs=[
      {nA:36,dA:6,nB:40,dB:5},{nA:45,dA:5,nB:32,dB:4},
      {nA:40,dA:5,nB:36,dB:6},{nA:30,dA:6,nB:36,dB:4},
      {nA:48,dA:6,nB:35,dB:5}
    ];
    var p=pk(pairs),ns=_nm2();
    var abA=p.nA/p.dA,abB=p.nB/p.dB;
    var who=abA>abB?ns[0]:ns[1],diff=Math.abs(abA-abB);
    return{d:3,tp:'work',
      q:ns[0]+'班'+p.nA+'人，1/'+p.dA+'缺席。'+ns[1]+'班'+p.nB+'人，1/'+p.dB+'缺席。哪班缺席較多？多多少人？',
      a:who+','+diff,
      s:[ns[0]+'班: '+p.nA+'÷'+p.dA+' = '+abA+'人',
         ns[1]+'班: '+p.nB+'÷'+p.dB+' = '+abB+'人',
         who+'班多'+diff+'人'],sc:3};
  },
  // 概念陷阱：分母相加的常犯錯誤 (d:2)
  ()=>({d:2,tp:'mc',q:'小明計算 1/3 + 1/4 時，得出的答案是 2/7。他錯在哪裏？',isMC:true,opts:[{l:'A',v:'他把分子和分母分別相加了',c:true},{l:'B',v:'他沒有把答案化為最簡分數',c:false},{l:'C',v:'他通分母時找錯了 L.C.M.',c:false}],a:'A',s:['異分母分數加減必須先通分母，絕不能直接把分母相加！'],sc:2}),
  // 應用題陷阱：全長的分數 vs 實際米數 (d:3)
  ()=>{var part=pk([4,5]);var length=part*ri(4,7);return{d:3,tp:'work',q:nm()+'有一條長 '+length+' 米的絲帶。他包裝禮物用去了全長的 1/'+part+'，又剪去了 1/'+part+' 米。他共用去了多少米的絲帶？',a:String(length/part+1/part),trap:'分數單位（全長的分數 vs 實際米數）',s:['🔍 陷阱！「全長的 1/'+part+'」和「1/'+part+' 米」是完全不同的概念！','包裝用去：'+length+' × 1/'+part+' = '+(length/part)+' 米','總共用去：'+(length/part)+' + 1/'+part+' = '+(length/part+1/part)+' 米'],sc:3}},
  /* _addQ Phase 2 — reverse: find missing fraction (line 938) */
  ()=>{
    var d1=pk([3,4,6]),d2=pk([4,6,8]);
    if(d1===d2) d2=d1*2;
    var l=lcm(d1,d2);
    var n1=ri(1,d1-1),n2=ri(1,d2-1);
    var sumV=n1*(l/d1)+n2*(l/d2);
    return{d:3,tp:'calc',
      q:fS(sumV,l)+' − '+n1+'/'+d1+' = ?',
      a:fS(n2*(l/d2),l),
      s:['通分母後相減'],sc:2};
  },
  /* _addQ Phase 2 — comparison in context (line 966) */
  ()=>{
    var d1=pk([3,4,5]),d2=pk([4,6,8]);
    if(d1===d2) d2=d1+2;
    var l=lcm(d1,d2);
    var n1=ri(1,d1-1),n2=ri(1,d2-1);
    var v1=n1*(l/d1),v2=n2*(l/d2);
    while(v1===v2){n2=ri(1,d2-1);v2=n2*(l/d2);}
    var ns=_nm2();
    var who=v1>v2?ns[0]:ns[1];
    return{d:3,tp:'work',
      q:ns[0]+'吃了一塊Pizza的'+n1+'/'+d1+'，'+ns[1]+'吃了'+n2+'/'+d2+'。誰吃得較多？',
      a:who,
      s:['通分母 L.C.M.='+l,
         ns[0]+': '+v1+'/'+l,
         ns[1]+': '+v2+'/'+l],sc:3};
  }
],
'5N3':[
  ()=>{var n1=ri(2,5),d1=pk([3,5,7]),n2=ri(2,4),d2=pk([4,6,8]);return{d:1,tp:'calc',q:n1+'/'+d1+' × '+n2+'/'+d2+' = ?',a:fS(n1*n2,d1*d2),s:['分子×分子，分母×分母'],sc:2}},
  ()=>{var w=ri(2,4),n=ri(1,3),den=pk([4,5,6]),m=ri(3,8);var imp=w*den+n;return{d:2,tp:'calc',q:w+'又'+n+'/'+den+' × '+m+' = ?',a:fS(imp*m,den),s:['先化假分數再乘'],sc:2}},
  ()=>{var recL=ri(6,14),fN=ri(2,3),fD=pk([4,5]);var dThick=pk([2,3,5]),dColor=pk(['白色','黃色']);var width=recL*fN/fD;return{d:3,tp:'work',q:'一塊'+dColor+'紙板厚'+dThick+'mm，長'+recL+'cm，闊是長的'+fN+'/'+fD+'。面積？',a:String(recL*width),trap:'顏色和厚度',s:['🔍 顏色和厚度無關','闊='+width,'面積='+recL*width],sc:3}},
  // 呈分試Killer題：「餘下的」分數 (d:3)
  ()=>{var total=4*ri(10,20);return{d:3,tp:'work',q:nm()+'有 '+total+' 粒波子。他把其中的 1/4 送給弟弟，再把**餘下**的 1/3 送給妹妹。妹妹得到多少粒波子？',a:String(total*3/4/3),trap:'「餘下的」字眼',s:['🔍 陷阱！妹妹得到的不是總數的 1/3，而是「餘下的」1/3。','弟弟拿走後餘下：'+total+' × (1 − 1/4) = '+(total*3/4)+' 粒','妹妹得到：'+(total*3/4)+' × 1/3 = '+(total*3/4/3)+' 粒'],sc:3}},
  /* _addQ Strategy 1 — template rotation (line 466) */
  ()=>{
    var a=ri(11,99),b=ri(11,99),sum=a+b;
    var ad=(a/10).toFixed(1),bd=(b/10).toFixed(1),sd=(sum/10).toFixed(1);
    var t=[
      ()=>nm()+'買了'+ad+'kg蘋果和'+bd+'kg橙。共買了多少kg水果？',
      ()=>'一條繩長'+ad+'m，另一條長'+bd+'m。兩條共長多少m？',
      ()=>nm()+'早上跑了'+ad+'km，下午跑了'+bd+'km。全日共跑多少km？'
    ];
    return{d:2,tp:'work',q:pk(t)(),a:sd,s:[ad+' + '+bd+' = '+sd],sc:3};
  }
],
'5N4':[
  ()=>{var a=ri(15,40),b=ri(12,35);return{d:1,tp:'calc',q:(a/10).toFixed(1)+' × '+(b/10).toFixed(1)+' = ?',a:((a*b)/100).toFixed(2),s:['小數×小數'],sc:2}},
  ()=>{var a=ri(20,50),b=ri(20,50),c=ri(10,30);return{d:2,tp:'calc',q:'('+(a/10).toFixed(1)+' + '+(b/10).toFixed(1)+') × '+(c/10).toFixed(1)+' = ?',a:(((a+b)*c)/100).toFixed(2),s:['先算括號'],sc:2}},
  ()=>{var price=ri(20,60),qty=ri(8,20);var disc=0.8;var dM=ri(500,2000),dA=ri(200,500);return{d:3,tp:'work',q:pl()+'面積'+dA+'平方米，有會員'+dM+'人。原價每件$'+(price/10).toFixed(1)+'0，打八折後每件多少？買'+qty+'件共多少？',a:(price/10*disc).toFixed(2)+','+(price/10*disc*qty).toFixed(2),trap:'面積和會員數',s:['🔍 面積和會員數無關','折扣價×'+qty],sc:3}},
  // 克 vs 公斤單位換算陷阱 (d:3)
  ()=>{var weight=ri(12,25);var pricePerKg=ri(25,45);return{d:3,tp:'work',q:'超級市場裏，車厘子每公斤售 $'+(pricePerKg/10).toFixed(1)+'。媽媽買了 '+(weight*100)+' 克的車厘子，需付多少元？',a:((pricePerKg/10)*(weight/10)).toFixed(2),trap:'單位不統一（克 vs 公斤）',s:['🔍 陷阱！必須先將克化為公斤。',(weight*100)+' 克 = '+(weight/10).toFixed(1)+' 公斤','需付：'+(pricePerKg/10).toFixed(1)+' × '+(weight/10).toFixed(1)+' = $'+((pricePerKg/10)*(weight/10)).toFixed(2)],sc:3}},
  /* _addQ Phase 2 — reverse: find missing decimal (line 953) */
  ()=>{
    var a=ri(15,50),b=ri(3,9),product=a*b;
    return{d:3,tp:'calc',
      q:'____ × '+b+' = '+(product/10).toFixed(1),
      a:(a/10).toFixed(1),
      s:[(product/10).toFixed(1)+' ÷ '+b+' = '+(a/10).toFixed(1)],sc:2};
  },
  // ×10 小數點移位 (d:1)
  ()=>{const a=(ri(1,99)/10).toFixed(1);return{d:1,tp:'calc',q:a+' × 10 = ?',a:String(parseFloat(a)*10),s:['小數點右移1位'],sc:1}},
  // ÷10 小數點移位 (d:1)
  ()=>{const a=ri(10,999);return{d:1,tp:'calc',q:a+' ÷ 10 = ?',a:(a/10).toFixed(1),s:['小數點左移1位'],sc:1}},
  // ×100 / ÷100 (d:2)
  ()=>{const type=ri(0,1);const raw=ri(1,99);const a=(raw/100).toFixed(2);const b=ri(10,999);
    if(type===0)return{d:2,tp:'calc',q:a+' × 100 = ?',a:String(raw),s:['小數點右移2位'],sc:1};
    return{d:2,tp:'calc',q:b+' ÷ 100 = ?',a:(b/100).toFixed(2),s:['小數點左移2位'],sc:1}}
],
'5N5':[
  ()=>{var n1=ri(2,6),d1=pk([3,5,7]),n2=ri(2,4),d2=pk([4,6,8]);return{d:1,tp:'calc',q:n1+'/'+d1+' ÷ '+n2+'/'+d2+' = ?',a:fS(n1*d2,d1*n2),s:['×倒數'],sc:2}},
  ()=>{var total=ri(200,500),fN=ri(2,3),fD=pk([4,5,6]);var dDay=pk(['星期一','星期三','星期五']),dP=ri(3,8);var used=Math.round(total*fN/fD);return{d:2,tp:'work',q:dDay+'，'+dP+'位工人用一條'+total+'cm繩子，用去全長的'+fN+'/'+fD+'。剩多少cm？',a:String(total-used),trap:'日期和工人數',s:['🔍 日期和工人數無關','用去: '+used,'剩: '+(total-used)],sc:3}},
  ()=>{var whole=ri(3,6),fN=ri(1,3),fD=pk([4,5,6]);var imp=whole*fD+fN;var div=ri(2,4);return{d:3,tp:'calc',q:whole+'又'+fN+'/'+fD+' ÷ '+div+' = ?',a:fS(imp,fD*div),s:['先化假分數: '+imp+'/'+fD,'÷'+div+' = '+imp+'/'+(fD*div)],sc:3}}
],
'5A':[
  ()=>{var x=ri(5,20),a=ri(3,8),b=ri(10,50);return{d:1,tp:'calc',q:a+'x + '+b+' = '+(a*x+b)+'，x = ?',a:String(x),s:['移項: x='+x],sc:2}},
  ()=>{var x=ri(3,12),a=ri(2,6),b=ri(5,20);return{d:2,tp:'calc',q:a+'(x + '+b+') = '+(a*(x+b))+'，x = ?',a:String(x),s:['展開或先÷'+a],sc:2}},
  ()=>{var n=ri(15,30),each=ri(3,8),extra=ri(20,50);var dSchool=pk(CTX.school),dClass=pk(['4A','5B','6C']);return{d:3,tp:'work',q:dSchool+dClass+'班老師買了x本簿(每本$'+each+')和'+extra+'枝筆(每枝$3)，共$'+(n*each+extra*3)+'。買了多少本簿？',a:String(n),trap:'學校和班別',s:['🔍 學校班別無關',each+'x+'+extra*3+'='+(n*each+extra*3),'x='+n],sc:3}},
  /* d:3 — forming equation */
  ()=>{var x=ri(8,20);var a=ri(2,5);var total=x+a*x;return{d:3,tp:'work',q:nm()+'的年齡是弟弟的'+a+'倍。兩人年齡總和是'+total+'歲。弟弟幾歲？',a:String(x),s:['設弟弟x歲','x+'+a+'x='+total,(a+1)+'x='+total,'x='+x],sc:3}},
  // 代入求值 (d:1)
  ()=>{const a=ri(2,8),x=ri(3,9);return{d:1,tp:'calc',q:'當 x = '+x+' 時，'+a+'x = ?',a:String(a*x),s:[a+'×'+x+'='+a*x],sc:1}},
  // 建立代數式 (d:2)
  ()=>{const price=ri(3,8),items=ri(2,5);
    return{d:2,tp:'fill',q:'每本練習簿 $'+price+'，買 n 本需要 $____（用n表示）。若 n = '+items+'，需要 $____。',
      a:price+'n,'+price*items,s:[price+'×n = '+price+'n','代入n='+items+': '+price+'×'+items+'='+price*items],sc:2}}
],
'5M1':[
  ()=>{var b=ri(8,20),h=ri(5,15);return{d:1,tp:'short',q:'求三角形面積。',fig:FIG.tri(b,h),a:String(b*h/2),s:[b+'×'+h+'÷2='+b*h/2],sc:2}},
  ()=>{var a=ri(6,14),b2=ri(12,22),h=ri(5,12);return{d:2,tp:'short',q:'求梯形面積。',fig:FIG.trap(a,b2,h),a:String((a+b2)*h/2),s:['('+a+'+'+b2+')×'+h+'÷2='+(a+b2)*h/2],sc:2}},
  ()=>{var rb=ri(10,20),rh=ri(6,14),tb=ri(8,Math.min(16,rb)),th=ri(5,Math.min(12,rh));var dFP=ri(50,100);return{d:3,tp:'work',q:'長方形土地長'+rb+'m闊'+rh+'m，圍欄每米$'+dFP+'。中間三角形花圃(底'+tb+'m高'+th+'m)。花圃外面積？',a:String(rb*rh-tb*th/2),trap:'圍欄造價',s:['🔍 造價無關','長方: '+rb*rh,'三角: '+tb*th/2,'差: '+(rb*rh-tb*th/2)],sc:3}},
  // 梯形面積陷阱：斜邊非高 (d:3)
  ()=>{var a=ri(6,12),b2=ri(12,20),h=ri(4,10)*2,slant=ri(8,15);return{d:3,tp:'work',q:'一個梯形的上底是 '+a+' cm，下底是 '+b2+' cm，高是 '+h+' cm，斜邊長 '+slant+' cm。求它的面積。',a:String((a+b2)*h/2),trap:'斜邊長度（'+slant+' cm）',s:['🔍 陷阱！計算梯形面積不需要斜邊，那是用來算周界的。','面積 = (上底 + 下底) × 高 ÷ 2','面積 = ('+a+' + '+b2+') × '+h+' ÷ 2 = '+((a+b2)*h/2)+' cm²'],sc:3}},
  /* _addQ Strategy 7 — cross-topic: time + money (line 757) */
  ()=>{
    var rate=ri(5,15)*10,hours=ri(3,8);
    var start_h=ri(8,11),end_h=start_h+hours;
    return{d:2,tp:'work',
      q:nm()+'做兼職，時薪$'+rate+'。由'+start_h+':00工作至'+end_h+':00。共賺多少錢？',
      a:String(rate*hours),
      s:['工時: '+end_h+' − '+start_h+' = '+hours+' 小時',
         '工資: $'+rate+' × '+hours+' = $'+(rate*hours)],sc:3};
  },
  /* _addQ Phase 2 — reverse: find triangle height (line 906) */
  ()=>{
    var b=ri(6,16),h=ri(4,12),area=b*h/2;
    return{d:3,tp:'work',
      q:'三角形面積是'+area+'cm²，底是'+b+'cm。高是多少cm？',
      a:String(h),
      s:['高 = '+area+'×2÷'+b+' = '+h],sc:3};
  },
  // 已知梯形面積求高
  ()=>{
    var a=ri(5,12),b2=ri(10,20),h=ri(4,10),area=(a+b2)*h/2;
    return{d:3,tp:'work',
      q:'梯形面積是'+area+'cm²，上底'+a+'cm，下底'+b2+'cm。高是多少cm？',
      a:String(h),
      s:['高 = '+area+'×2÷('+a+'+'+b2+') = '+h],sc:3};
  },
  /* _addQ Phase 2 — comparison: triangle vs rectangle (line 986) */
  ()=>{
    var tb=ri(8,18),th=ri(5,14),tArea=tb*th/2;
    var rw=ri(6,14),rh=ri(4,10),rArea=rw*rh;
    var bigger=tArea>rArea?'三角形':'長方形';
    var diff=Math.abs(tArea-rArea);
    return{d:3,tp:'work',
      q:'三角形底'+tb+'cm高'+th+'cm，長方形長'+rw+'cm闊'+rh+'cm。哪個面積較大？大多少cm²？',
      a:bigger+','+diff,
      s:['三角形: '+tb+'×'+th+'÷2 = '+tArea,
         '長方形: '+rw+'×'+rh+' = '+rArea],sc:3};
  }
],
'5M2':[
  ()=>{var l=ri(5,12),w=ri(3,8),h=ri(3,7);return{d:1,tp:'short',q:'求長方體體積。',fig:FIG.cuboid(l,w,h),a:String(l*w*h),s:[l+'×'+w+'×'+h+'='+l*w*h],sc:2}},
  ()=>{var l=ri(6,12),w=ri(4,8),h=ri(3,6),water=ri(50,80);var dMat=pk(['玻璃','塑膠']),dWt=ri(500,2000);return{d:2,tp:'work',q:dMat+'長方體水箱重'+dWt+'克，長'+l+'cm闊'+w+'cm高'+h+'cm。水位'+water+'%滿。水的體積？',a:String(Math.round(l*w*h*water/100)),trap:'材質和重量',s:['🔍 材質和重量無關','容積: '+l*w*h,'水: '+Math.round(l*w*h*water/100)],sc:3}},
  /* d:3 — reverse */
  ()=>{var l=ri(5,10),w=ri(3,7);var vol=l*w*ri(3,6);var h=vol/(l*w);return{d:3,tp:'work',q:'長方體體積'+vol+'cm³，長'+l+'cm闊'+w+'cm。高多少cm？',a:String(h),s:[vol+'÷'+l+'÷'+w+'='+h],sc:2}},
  // 呈分試Killer題：排水法 Water Displacement (d:3)
  ()=>{var l=ri(10,20),w=ri(10,15),rise=ri(2,5);var dWater=ri(6,10);return{d:3,tp:'work',fig:FIG.waterTank(l,w,dWater+rise,rise),q:'一個長 '+l+' cm、闊 '+w+' cm 的長方體玻璃水箱內，裝有 '+dWater+' cm 深的水。把一塊不規則的石頭完全沉入水中後，水位上升了 '+rise+' cm。這塊石頭的體積是多少 cm³？',a:String(l*w*rise),trap:'原本的水深（'+dWater+' cm）',s:['🔍 陷阱！求石頭體積，只需要看「上升了的水的體積」，原本的水深是多餘資訊。','石頭體積 = 水箱長 × 水箱闊 × 上升的水位','體積 = '+l+' × '+w+' × '+rise+' = '+(l*w*rise)+' cm³'],sc:3}},
  /* _addQ Phase 2 — reverse: find height + surface area (line 925) */
  ()=>{
    var l=ri(5,12),w=ri(3,8),h=ri(3,7),vol=l*w*h;
    var sa=2*(l*w+l*h+w*h);
    return{d:3,tp:'work',
      q:'長方體體積'+vol+'cm³，長'+l+'cm、闊'+w+'cm。高是多少cm？表面積呢？',
      a:h+','+sa,
      s:['高 = '+vol+'÷'+l+'÷'+w+' = '+h,
         '表面積 = 2×('+l*w+'+'+l*h+'+'+w*h+') = '+sa],sc:3};
  }
],
'5S1':[
  ()=>{var r=ri(4,15);return{d:1,tp:'fill',q:'圓的半徑'+r+'cm，直徑____cm，周界約____cm（π=3.14）',a:r*2+','+(2*3.14*r).toFixed(2),s:['d=2r, C=2πr'],sc:2}},
  ()=>{var r=ri(3,8);var sq=r*2;var dRL=ri(30,60);return{d:3,tp:'work',q:'圓內接在邊長'+sq+'cm正方形中。旁邊有'+dRL+'cm繩子。圓面積與正方形面積相差多少？(π=3.14)',a:(sq*sq-3.14*r*r).toFixed(2),trap:'繩子長度',s:['🔍 繩子無關','正方: '+sq*sq,'圓: '+(3.14*r*r).toFixed(2),'差: '+(sq*sq-3.14*r*r).toFixed(2)],sc:3}},
  /* _addQ Strategy 2 — reverse: find rectangle width from area (line 538) */
  ()=>{
    var w=ri(5,15),h=ri(3,12),area=w*h;
    return{d:3,tp:'work',
      q:'長方形面積是'+area+'cm²，長'+w+'cm。闊是多少cm？',
      a:String(h),s:['闊 = '+area+' ÷ '+w+' = '+h+' cm'],sc:3};
  },
  // 圓的各部分 (d:1)
  ()=>{const part=pk([{n:'半徑',d:'從圓心到圓周的線段'},{n:'直徑',d:'通過圓心的最長弦'},{n:'圓心',d:'圓內距圓周等距的點'}]);
    return{d:1,tp:'mc',q:part.d+'叫做？',isMC:true,
      opts:[{l:'A',v:'半徑',c:part.n==='半徑'},{l:'B',v:'直徑',c:part.n==='直徑'},{l:'C',v:'圓心',c:part.n==='圓心'}],
      a:part.n==='半徑'?'A':part.n==='直徑'?'B':'C',s:[part.n+': '+part.d],sc:1}},
  // 直徑=2×半徑 (d:1)
  ()=>{const r=ri(3,12);const type=ri(0,1);
    if(type===0)return{d:1,tp:'calc',q:'半徑'+r+'cm，直徑 = ____cm',a:String(r*2),s:['直徑=2×半徑='+r*2],sc:1};
    return{d:1,tp:'calc',q:'直徑'+r*2+'cm，半徑 = ____cm',a:String(r),s:['半徑=直徑÷2='+r],sc:1}},
  // 正方形內接圓：直徑=邊長 (d:3)
  ()=>{var sq=ri(10,20);return{d:3,tp:'mc',q:'在一個邊長為 '+sq+' cm 的正方形內，畫一個最大的圓形。這個圓形的直徑是多少？',isMC:true,opts:[{l:'A',v:String(sq/2)+' cm',c:false},{l:'B',v:String(sq)+' cm',c:true},{l:'C',v:String(sq*2)+' cm',c:false}],a:'B',s:['在正方形內畫最大的圓，圓的直徑剛好等於正方形的邊長。'],sc:2}}
],

/* ═══════════ 5S2 立體圖形(二) ═══════════ */
'5S2':[
  // 面/棱/頂點 (d:1)
  ()=>{const solids=[{n:'長方體',f:6,e:12,v:8},{n:'正方體',f:6,e:12,v:8},{n:'三角柱',f:5,e:9,v:6},{n:'四角錐',f:5,e:8,v:5}];
    const s=pk(solids);const prop=pk(['面','棱','頂點']);const ans={面:s.f,棱:s.e,頂點:s.v};
    return{d:1,tp:'fill',q:s.n+'有____個'+prop+'。',a:String(ans[prop]),s:[s.n+': '+s.f+'面, '+s.e+'棱, '+s.v+'頂點'],sc:1}},
  // 截面 (d:2)
  ()=>({d:2,tp:'mc',q:'用平面切割一個正方體，截面可以是什麼形狀？',isMC:true,
    opts:[{l:'A',v:'只有正方形',c:false},{l:'B',v:'正方形或長方形',c:true},{l:'C',v:'三角形',c:false}],
    a:'B',s:['平行於面 → 正方形或長方形'],sc:2}),
  // 展開圖 (d:1)
  ()=>({d:1,tp:'fill',q:'正方體的展開圖有____個正方形面。',a:'6',s:['正方體6個面 → 展開圖有6個正方形'],sc:1}),
  // 球體特性 (d:1)
  ()=>({d:1,tp:'mc',q:'以下關於球體哪項是正確的？',isMC:true,
    opts:[{l:'A',v:'有頂點',c:false},{l:'B',v:'沒有平的面',c:true},{l:'C',v:'有12條棱',c:false}],
    a:'B',s:['球體沒有平面、棱或頂點'],sc:1}),
  // 由展開圖識別立體 (d:3)
  ()=>({d:3,tp:'mc',q:'一個立體圖形展開後有2個圓形和1個長方形，原本是什麼？',isMC:true,
    opts:[{l:'A',v:'圓錐體',c:false},{l:'B',v:'圓柱體',c:true},{l:'C',v:'球體',c:false}],
    a:'B',s:['圓柱展開 = 2個圓形 + 1個長方形（側面）'],sc:2}),
  // 圓柱垂直截面是長方形 (d:2)
  ()=>({d:2,tp:'mc',q:'把一個圓柱體沿著**垂直於底面**的方向切開，它的截面會是什麼形狀？',isMC:true,opts:[{l:'A',v:'圓形',c:false},{l:'B',v:'橢圓形',c:false},{l:'C',v:'長方形或正方形',c:true}],a:'C',s:['平行於底面切開是圓形；垂直於底面（從上切到下）切開，截面是長方形或正方形。'],sc:2})
],

'5D1':[
  ()=>{var a1=ri(150,300),a2=ri(100,250),b1=ri(120,280),b2=ri(130,260);var items=[{l:'男A',v:a1},{l:'女A',v:a2},{l:'男B',v:b1},{l:'女B',v:b2}];var totalA=a1+a2,totalB=b1+b2;return{d:2,tp:'short',q:'棒形圖：A校和B校共多少人？哪校較多？多多少？',fig:FIG.bars(items),a:(totalA+totalB)+','+(totalA>totalB?'A校':'B校')+','+Math.abs(totalA-totalB),s:['A: '+totalA,'B: '+totalB],sc:3}},
  ()=>{var items=[{l:'一月',v:ri(100,200)},{l:'二月',v:ri(80,180)},{l:'三月',v:ri(120,250)},{l:'四月',v:ri(90,200)}];var total=items.reduce((s,i)=>s+i.v,0);var avg=Math.round(total/4);return{d:3,tp:'short',q:'棒形圖顯示四個月銷量。平均銷量是多少？哪個月最接近平均值？',fig:FIG.bars(items),a:avg+','+items.reduce((c,i)=>Math.abs(i.v-avg)<Math.abs(c.v-avg)?i:c,items[0]).l,s:['平均: '+avg,'逐一比較差距'],sc:3}},
  // 兩校男女生總數比較 (d:3)
  ()=>{var a1=ri(150,300),a2=ri(100,250),b1=ri(120,280),b2=ri(130,260);var items=[{l:'男A',v:a1},{l:'女A',v:a2},{l:'男B',v:b1},{l:'女B',v:b2}];return{d:3,tp:'short',q:'複合棒形圖顯示 A 校和 B 校的男女生人數。兩校的男生總數比女生總數相差多少人？',fig:FIG.bars(items),a:String(Math.abs((a1+b1)-(a2+b2))),s:['男生總數：'+a1+' + '+b1+' = '+(a1+b1),'女生總數：'+a2+' + '+b2+' = '+(a2+b2),'相差：|'+(a1+b1)+' − '+(a2+b2)+'| = '+Math.abs((a1+b1)-(a2+b2))],sc:3}}
]
};

// Topics: 5N2, 5N3, 5N4, 5N5, 5A, 5M1, 5M2, 5S1, 5D1
// Export: grade5 (object with 9 topic keys)
// Total generators: 38
