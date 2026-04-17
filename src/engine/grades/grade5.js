/**
 * grade5.js — P5 question generators
 * Extracted from engine.js
 */
import { ri, pk, lcm, fS, FIG } from '../core.js';
import { nm, pl, CTX, _nm2 } from '../config.js';

export const grade5={
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
         who+'班多'+diff+'人']};
  },
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
      s:['通分母後相減']};
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
         ns[1]+': '+v2+'/'+l]};
  }
],
'5N3':[
  ()=>{var n1=ri(2,5),d1=pk([3,5,7]),n2=ri(2,4),d2=pk([4,6,8]);return{d:1,tp:'calc',q:n1+'/'+d1+' × '+n2+'/'+d2+' = ?',a:fS(n1*n2,d1*d2),s:['分子×分子，分母×分母'],sc:2}},
  ()=>{var w=ri(2,4),n=ri(1,3),den=pk([4,5,6]),m=ri(3,8);var imp=w*den+n;return{d:2,tp:'calc',q:w+'又'+n+'/'+den+' × '+m+' = ?',a:fS(imp*m,den),s:['先化假分數再乘'],sc:2}},
  ()=>{var recL=ri(6,14),fN=ri(2,3),fD=pk([4,5]);var dThick=pk([2,3,5]),dColor=pk(['白色','黃色']);var width=recL*fN/fD;return{d:3,tp:'work',q:'一塊'+dColor+'紙板厚'+dThick+'mm，長'+recL+'cm，闊是長的'+fN+'/'+fD+'。面積？',a:String(recL*width),trap:'顏色和厚度',s:['🔍 顏色和厚度無關','闊='+width,'面積='+recL*width],sc:3}},
  /* _addQ Strategy 1 — template rotation (line 466) */
  ()=>{
    var a=ri(11,99),b=ri(11,99),sum=a+b;
    var ad=(a/10).toFixed(1),bd=(b/10).toFixed(1),sd=(sum/10).toFixed(1);
    var t=[
      ()=>nm()+'買了'+ad+'kg蘋果和'+bd+'kg橙。共買了多少kg水果？',
      ()=>'一條繩長'+ad+'m，另一條長'+bd+'m。兩條共長多少m？',
      ()=>nm()+'早上跑了'+ad+'km，下午跑了'+bd+'km。全日共跑多少km？'
    ];
    return{d:2,tp:'work',q:pk(t)(),a:sd,s:[ad+' + '+bd+' = '+sd]};
  }
],
'5N4':[
  ()=>{var a=ri(15,40),b=ri(12,35);return{d:1,tp:'calc',q:(a/10).toFixed(1)+' × '+(b/10).toFixed(1)+' = ?',a:((a*b)/100).toFixed(2),s:['小數×小數'],sc:2}},
  ()=>{var a=ri(20,50),b=ri(20,50),c=ri(10,30);return{d:2,tp:'calc',q:'('+(a/10).toFixed(1)+' + '+(b/10).toFixed(1)+') × '+(c/10).toFixed(1)+' = ?',a:(((a+b)*c)/100).toFixed(2),s:['先算括號'],sc:2}},
  ()=>{var price=ri(20,60),qty=ri(8,20);var disc=0.8;var dM=ri(500,2000),dA=ri(200,500);return{d:3,tp:'work',q:pl()+'面積'+dA+'平方米，有會員'+dM+'人。原價每件$'+(price/10).toFixed(1)+'0，打八折後每件多少？買'+qty+'件共多少？',a:(price/10*disc).toFixed(2)+','+(price/10*disc*qty).toFixed(2),trap:'面積和會員數',s:['🔍 面積和會員數無關','折扣價×'+qty],sc:3}},
  /* _addQ Phase 2 — reverse: find missing decimal (line 953) */
  ()=>{
    var a=ri(15,50),b=ri(3,9),product=a*b;
    return{d:3,tp:'calc',
      q:'____ × '+b+' = '+(product/10).toFixed(1),
      a:(a/10).toFixed(1),
      s:[(product/10).toFixed(1)+' ÷ '+b+' = '+(a/10).toFixed(1)]};
  }
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
  ()=>{var x=ri(8,20);var a=ri(2,5);var total=x+a*x;return{d:3,tp:'work',q:nm()+'的年齡是弟弟的'+a+'倍。兩人年齡總和是'+total+'歲。弟弟幾歲？',a:String(x),s:['設弟弟x歲','x+'+a+'x='+total,(a+1)+'x='+total,'x='+x],sc:3}}
],
'5M1':[
  ()=>{var b=ri(8,20),h=ri(5,15);return{d:1,tp:'short',q:'求三角形面積。',fig:FIG.tri(b,h),a:String(b*h/2),s:[b+'×'+h+'÷2='+b*h/2],sc:2}},
  ()=>{var a=ri(6,14),b2=ri(12,22),h=ri(5,12);return{d:2,tp:'short',q:'求梯形面積。',fig:FIG.trap(a,b2,h),a:String((a+b2)*h/2),s:['('+a+'+'+b2+')×'+h+'÷2='+(a+b2)*h/2],sc:2}},
  ()=>{var rb=ri(10,20),rh=ri(6,14),tb=ri(8,Math.min(16,rb)),th=ri(5,Math.min(12,rh));var dFP=ri(50,100);return{d:3,tp:'work',q:'長方形土地長'+rb+'m闊'+rh+'m，圍欄每米$'+dFP+'。中間三角形花圃(底'+tb+'m高'+th+'m)。花圃外面積？',a:String(rb*rh-tb*th/2),trap:'圍欄造價',s:['🔍 造價無關','長方: '+rb*rh,'三角: '+tb*th/2,'差: '+(rb*rh-tb*th/2)],sc:3}},
  /* _addQ Strategy 7 — cross-topic: time + money (line 757) */
  ()=>{
    var rate=ri(5,15)*10,hours=ri(3,8);
    var start_h=ri(8,11),end_h=start_h+hours;
    return{d:2,tp:'work',
      q:nm()+'做兼職，時薪$'+rate+'。由'+start_h+':00工作至'+end_h+':00。共賺多少錢？',
      a:String(rate*hours),
      s:['工時: '+end_h+' − '+start_h+' = '+hours+' 小時',
         '工資: $'+rate+' × '+hours+' = $'+(rate*hours)]};
  },
  /* _addQ Phase 2 — reverse: find triangle height (line 906) */
  ()=>{
    var b=ri(6,16),h=ri(4,12),area=b*h/2;
    return{d:3,tp:'work',
      q:'三角形面積是'+area+'cm²，底是'+b+'cm。高是多少cm？',
      a:String(h),
      s:['高 = '+area+'×2÷'+b+' = '+h]};
  },
  // 已知梯形面積求高
  ()=>{
    var a=ri(5,12),b2=ri(10,20),h=ri(4,10),area=(a+b2)*h/2;
    return{d:3,tp:'work',
      q:'梯形面積是'+area+'cm²，上底'+a+'cm，下底'+b2+'cm。高是多少cm？',
      a:String(h),
      s:['高 = '+area+'×2÷('+a+'+'+b2+') = '+h]};
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
         '長方形: '+rw+'×'+rh+' = '+rArea]};
  }
],
'5M2':[
  ()=>{var l=ri(5,12),w=ri(3,8),h=ri(3,7);return{d:1,tp:'short',q:'求長方體體積。',fig:FIG.cuboid(l,w,h),a:String(l*w*h),s:[l+'×'+w+'×'+h+'='+l*w*h],sc:2}},
  ()=>{var l=ri(6,12),w=ri(4,8),h=ri(3,6),water=ri(50,80);var dMat=pk(['玻璃','塑膠']),dWt=ri(500,2000);return{d:2,tp:'work',q:dMat+'長方體水箱重'+dWt+'克，長'+l+'cm闊'+w+'cm高'+h+'cm。水位'+water+'%滿。水的體積？',a:String(Math.round(l*w*h*water/100)),trap:'材質和重量',s:['🔍 材質和重量無關','容積: '+l*w*h,'水: '+Math.round(l*w*h*water/100)],sc:3}},
  /* d:3 — reverse */
  ()=>{var l=ri(5,10),w=ri(3,7);var vol=l*w*ri(3,6);var h=vol/(l*w);return{d:3,tp:'work',q:'長方體體積'+vol+'cm³，長'+l+'cm闊'+w+'cm。高多少cm？',a:String(h),s:[vol+'÷'+l+'÷'+w+'='+h],sc:2}},
  /* _addQ Phase 2 — reverse: find height + surface area (line 925) */
  ()=>{
    var l=ri(5,12),w=ri(3,8),h=ri(3,7),vol=l*w*h;
    var sa=2*(l*w+l*h+w*h);
    return{d:3,tp:'work',
      q:'長方體體積'+vol+'cm³，長'+l+'cm、闊'+w+'cm。高是多少cm？表面積呢？',
      a:h+','+sa,
      s:['高 = '+vol+'÷'+l+'÷'+w+' = '+h,
         '表面積 = 2×('+l*w+'+'+l*h+'+'+w*h+') = '+sa]};
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
      a:String(h),s:['闊 = '+area+' ÷ '+w+' = '+h+' cm']};
  }
],
'5D1':[
  ()=>{var a1=ri(150,300),a2=ri(100,250),b1=ri(120,280),b2=ri(130,260);var items=[{l:'男A',v:a1},{l:'女A',v:a2},{l:'男B',v:b1},{l:'女B',v:b2}];var totalA=a1+a2,totalB=b1+b2;return{d:2,tp:'short',q:'棒形圖：A校和B校共多少人？哪校較多？多多少？',fig:FIG.bars(items),a:(totalA+totalB)+','+(totalA>totalB?'A校':'B校')+','+Math.abs(totalA-totalB),s:['A: '+totalA,'B: '+totalB],sc:3}},
  ()=>{var items=[{l:'一月',v:ri(100,200)},{l:'二月',v:ri(80,180)},{l:'三月',v:ri(120,250)},{l:'四月',v:ri(90,200)}];var total=items.reduce((s,i)=>s+i.v,0);var avg=Math.round(total/4);return{d:3,tp:'short',q:'棒形圖顯示四個月銷量。平均銷量是多少？哪個月最接近平均值？',fig:FIG.bars(items),a:avg+','+items.reduce((c,i)=>Math.abs(i.v-avg)<Math.abs(c.v-avg)?i:c,items[0]).l,s:['平均: '+avg,'逐一比較差距'],sc:3}}
]
};

// Topics: 5N2, 5N3, 5N4, 5N5, 5A, 5M1, 5M2, 5S1, 5D1
// Export: grade5 (object with 9 topic keys)
// Total generators: 38
