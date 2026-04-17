/**
 * grade6.js — P6 question generators
 * Extracted from engine.js
 */
import { ri, pk, FIG } from '../core.js';
import { nm, CTX, _nm2 } from '../config.js';

export const grade6={
'6N1':[
  ()=>{var a=ri(20,80),b=ri(3,9);return{d:1,tp:'calc',q:(a/10).toFixed(1)+' ÷ '+b+' = ?',a:(a/(b*10)).toFixed(2),s:['小數÷整數'],sc:2}},
  ()=>{var a=ri(30,90),b=ri(3,8),c=ri(10,50);return{d:2,tp:'calc',q:(a/10).toFixed(1)+' ÷ '+b+' + '+(c/10).toFixed(1)+' = ?',a:(a/(b*10)+c/10).toFixed(2),s:['先除後加'],sc:2}},
  ()=>{var ans=(ri(10,50)/10).toFixed(1);var b=ri(3,8);var a=(parseFloat(ans)*b).toFixed(1);return{d:3,tp:'calc',q:'____ ÷ '+b+' = '+ans,a:a,s:['逆向: '+ans+'×'+b+'='+a],sc:2}},
  /* _addQ Strategy 1 — template rotation (line 480) */
  ()=>{
    var total=ri(5,20)*20,pct=pk([10,15,20,25,30,40]),ans=total*pct/100;
    var t=[
      ()=>'全校'+total+'人，其中'+pct+'%參加了旅行。多少人參加了旅行？',
      ()=>'一批貨物共'+total+'箱，已運走'+pct+'%。運走了多少箱？',
      ()=>nm()+'有$'+total+'，花了'+pct+'%買書。花了多少錢？'
    ];
    return{d:2,tp:'work',q:pk(t)(),a:String(ans),s:[total+' × '+pct+'% = '+ans]};
  },
  /* _addQ Strategy 2 — reverse: find original from discounted (line 548) */
  ()=>{
    var orig=ri(5,20)*20;
    var disc=pk([{zh:'九折',m:0.9},{zh:'八折',m:0.8},{zh:'七折',m:0.7}]);
    var price=orig*disc.m;
    return{d:3,tp:'work',
      q:'一個書包打'+disc.zh+'後售$'+price+'。原價是多少？',
      a:String(orig),
      s:['打'+disc.zh+' = ×'+disc.m,'原價 = $'+price+' ÷ '+disc.m+' = $'+orig]};
  },
  /* _addQ Strategy 3 — comparison: A vs B store discount (line 602) */
  ()=>{
    var orig=ri(5,20)*20;
    var disc=pk([{zh:'九折',m:0.9},{zh:'八折',m:0.8},{zh:'七折',m:0.7}]);
    var priceA=orig*disc.m;
    var reducB=pk([30,50,60,80,100]);
    var priceB=orig-reducB;
    while(priceA===priceB||priceB<=0){reducB=pk([30,50,60,80,100]);priceB=orig-reducB;}
    var cheaper=priceA<priceB?'A':'B',diff=Math.abs(priceA-priceB);
    return{d:3,tp:'work',
      q:'原價$'+orig+'的書包。A店打'+disc.zh+'，B店減$'+reducB+'。哪間更便宜？便宜多少？（如 A,50）',
      a:cheaper+','+diff,
      s:['A: $'+orig+'×'+disc.m+' = $'+priceA,
         'B: $'+orig+' − $'+reducB+' = $'+priceB,
         cheaper+'便宜$'+diff]};
  },
  /* _addQ Phase 2 — area percentage (line 783) */
  ()=>{
    var w=ri(1,3)*10,h=ri(1,2)*10,totalArea=w*h;
    var pct=pk([20,25,30,40]),garden=totalArea*pct/100;
    return{d:3,tp:'work',
      q:'一塊長'+w+'m、闊'+h+'m的空地，其中'+pct+'%建花園。花園面積多少m²？',
      a:String(garden),
      s:['空地 = '+w+'×'+h+' = '+totalArea+' m²',
         '花園 = '+totalArea+' × '+pct+'% = '+garden+' m²']};
  }
],
'6N34':[
  ()=>{var w=ri(15,60)*10,p=pk([15,20,25,30]);return{d:1,tp:'calc',q:w+'的'+p+'% = ?',a:String(w*p/100),s:['百分數計算'],sc:2}},
  ()=>{var orig=ri(10,40)*20,pDec=pk([10,15,20,25]);var newP=orig*(100-pDec)/100;var dStock=ri(50,200);return{d:2,tp:'short',q:pk(CTX.places)+'存貨'+dStock+'件。原價$'+orig+'打'+(10-pDec/10)+'折，售價多少？',a:String(newP),trap:'存貨數量',s:['🔍 存貨無關','售價: '+newP],sc:2}},
  ()=>{var cost=ri(5,15)*20,markup=pk([20,25,30,40]);var sell=cost*(100+markup)/100;var disc=pk([10,15,20]);var final2=sell*(100-disc)/100;var dRent=ri(8000,20000),dStaff=ri(3,8);return{d:3,tp:'work',q:'店舖月租$'+dRent+'，有'+dStaff+'名員工。貨品成本$'+cost+'，加價'+markup+'%出售，再打'+(10-disc/10)+'折。促銷價多少？賺還是蝕？差額？',a:Math.round(final2)+','+(final2>cost?'賺':'蝕')+','+Math.abs(Math.round(final2-cost)),trap:'月租和員工數',s:['🔍 月租和員工無關','售價: '+Math.round(sell),'促銷: '+Math.round(final2),'比較成本'],sc:3}},
  ()=>{var girls=ri(150,300),boys=ri(120,280);var total=girls+boys;var pG=Math.round(girls/total*100);var dT=ri(20,50),dAge=ri(30,80);return{d:3,tp:'work',q:'學校建校'+dAge+'年，有'+dT+'位老師、男生'+boys+'人、女生'+girls+'人。女生佔學生百分之幾？（四捨五入至整數）',a:pG+'%',trap:'建校年數和老師數',s:['🔍 建校年數和老師無關','總學生: '+total,'女生%: ≈'+pG+'%'],sc:3}},
  /* _addQ Phase 2 — ratio division (line 796) */
  ()=>{
    var ns=_nm2(),r1=ri(2,5),r2=ri(2,5);
    while(r1===r2) r2=ri(2,5);
    var unit=ri(10,30),total=(r1+r2)*unit;
    var a1=r1*unit,a2=r2*unit;
    return{d:3,tp:'work',
      q:ns[0]+'和'+ns[1]+'按 '+r1+':'+r2+' 分 $'+total+'。各得多少錢？（用逗號分隔）',
      a:a1+','+a2,
      s:['共 '+(r1+r2)+' 份',
         '每份: $'+total+' ÷ '+(r1+r2)+' = $'+unit,
         ns[0]+': $'+unit+'×'+r1+' = $'+a1,
         ns[1]+': $'+unit+'×'+r2+' = $'+a2]};
  },
  /* _addQ Phase 2 — reverse: find original from discounted price (line 1003) */
  ()=>{
    var orig=ri(5,25)*20,pct=pk([10,20,25,30,40]);
    var sale=orig*(100-pct)/100;
    return{d:3,tp:'work',
      q:'商品減價'+pct+'%後售$'+sale+'。原價是多少？',
      a:String(orig),
      s:['售價 = 原價 × '+(100-pct)+'%',
         '原價 = $'+sale+' ÷ '+((100-pct)/100)+' = $'+orig]};
  },
  // 已知加價後售價求成本
  ()=>{
    var orig=ri(5,20)*20,markup=pk([20,25,50]);
    var sell=orig*(100+markup)/100;
    return{d:3,tp:'work',
      q:'商品加價'+markup+'%後售$'+sell+'。成本是多少？',
      a:String(orig),
      s:['成本 = $'+sell+' ÷ '+((100+markup)/100)+' = $'+orig]};
  },
  /* _addQ Phase 2 — comparison: compare price increases (line 1067) */
  ()=>{
    var origA=ri(5,15)*20,upA=pk([10,15,20,25]);
    var origB=ri(5,15)*20,upB=pk([10,20,25,30]);
    var incA=origA*upA/100,incB=origB*upB/100;
    while(incA===incB){origB=ri(5,15)*20;incB=origB*upB/100;}
    var who=incA>incB?'A':'B',diff=Math.abs(incA-incB);
    return{d:3,tp:'work',
      q:'A商品$'+origA+'加價'+upA+'%，B商品$'+origB+'加價'+upB+'%。哪件實際加幅較大？大多少元？',
      a:who+','+diff,
      s:['A加: $'+incA,'B加: $'+incB,
         who+'大$'+diff]};
  }
],
'6A1':[
  ()=>{var x=ri(5,20),a=ri(3,8),b=ri(15,60);return{d:1,tp:'calc',q:a+'x + '+b+' = '+(a*x+b)+'，x = ?',a:String(x),s:['移項求解'],sc:2}},
  ()=>{var x=ri(5,18),a=ri(2,5),b=ri(10,30),c=ri(3,8);return{d:2,tp:'calc',q:a+'x + '+b+' = '+c+'x + '+(a*x+b-c*x)+'，x = ?',a:String(x),s:['移項歸邊'],sc:3}},
  ()=>{var age=ri(8,14),ratio=ri(3,4),diff=age*(ratio-1);var dSib=ri(5,age-2),dPet=ri(1,3),n=nm();return{d:3,tp:'work',q:n+'有'+dSib+'歲的弟弟和'+dPet+'隻寵物。媽媽年齡是'+n+'的'+ratio+'倍，比'+n+'大'+diff+'歲。'+n+'幾歲？',a:String(age),trap:'弟弟年齡和寵物數',s:['🔍 弟弟和寵物無關','設x歲: '+ratio+'x−x='+diff,'x='+age],sc:3}}
],
'6M1':[
  ()=>{var a=ri(25,70),b=ri(25,130-a);var c=180-a-b;return{d:1,tp:'short',q:'三角形兩角分別'+a+'°和'+b+'°，求第三角。',a:String(c),s:['180−'+a+'−'+b+'='+c],sc:2}},
  ()=>{var n=pk([5,6,8]);var interior=(n-2)*180;var each=interior/n;var dPeri=ri(20,50)*n;return{d:2,tp:'work',q:'正'+n+'邊形周界'+dPeri+'cm。內角和多少度？每個內角多少度？',a:interior+','+each,trap:'周界',s:['🔍 周界無關','('+n+'−2)×180='+interior,'每個: '+each],sc:3}},
  ()=>{var a=ri(30,80);var b=180-a;return{d:3,tp:'fill',q:'一條直線上的兩個角，一個是'+a+'°，另一個是____°。這兩個角叫做____角。',a:b+',補',s:[a+'+'+b+'=180°，互為補角'],sc:2}}
],
'6M3':[
  ()=>{var r=ri(5,15);return{d:1,tp:'short',q:'半徑'+r+'cm，求圓周。(π=3.14)',fig:FIG.circ(r,'r'),a:(2*3.14*r).toFixed(2),s:['2×3.14×'+r],sc:2}},
  ()=>{var r=ri(4,10);var semi=3.14*r+2*r;var dArea=(3.14*r*r/2).toFixed(2);return{d:3,tp:'work',q:'半圓半徑'+r+'cm，面積約'+dArea+'cm²。求半圓周界。(π=3.14)',a:semi.toFixed(2),trap:'面積',s:['🔍 面積是干擾','弧長: '+(3.14*r).toFixed(2),'直徑: '+2*r,'周界: '+semi.toFixed(2)],sc:3}}
],
'6M4':[
  ()=>{var s=pk([40,50,60,80]),t=ri(2,8);return{d:1,tp:'short',q:'車速'+s+'km/h行'+t+'小時，距離？',a:String(s*t),s:[s+'×'+t+'='+s*t],sc:2}},
  ()=>{var s1=pk([40,50,60]),t1=ri(2,4),s2=pk([50,60,80]),t2=ri(1,3);var dFuel=ri(5,12),dPass=ri(2,5);return{d:3,tp:'work',q:'車上'+dPass+'位乘客，每km耗油'+dFuel+'毫升。先以'+s1+'km/h行'+t1+'小時，再以'+s2+'km/h行'+t2+'小時。全程多少km？平均速率？',a:(s1*t1+s2*t2)+','+((s1*t1+s2*t2)/(t1+t2)).toFixed(1),trap:'乘客和耗油量',s:['🔍 乘客和耗油無關','總距: '+(s1*t1+s2*t2),'平均: '+((s1*t1+s2*t2)/(t1+t2)).toFixed(1)],sc:3}},
  /* d:3 — reverse speed */
  ()=>{var d=pk([120,150,180,200,240]);var s=pk([40,50,60]);var t=d/s;return{d:3,tp:'fill',q:'距離'+d+'km，速率'+s+'km/h。需要____小時。',a:String(t),s:['時間=距離÷速率='+d+'÷'+s+'='+t],sc:2}},
  /* _addQ Phase 2 — reverse: find speed (line 1042) */
  ()=>{
    var s=pk([40,50,60,80]),t=ri(2,5),d=s*t;
    return{d:2,tp:'work',
      q:nm()+'開車行了'+d+'km，用了'+t+'小時。平均速率是多少km/h？',
      a:String(s),
      s:['速率 = '+d+'÷'+t+' = '+s+' km/h']};
  },
  /* _addQ Phase 2 — comparison: compare speeds (line 1083) */
  ()=>{
    var sA=pk([40,50,60,70,80]),tA=ri(2,5),dA=sA*tA;
    var sB=pk([40,50,60,70,80]),tB=ri(2,5),dB=sB*tB;
    while(sA===sB) sB=pk([40,50,60,70,80]);
    var ns=_nm2();
    var faster=sA>sB?ns[0]:ns[1],diff=Math.abs(sA-sB);
    return{d:3,tp:'work',
      q:ns[0]+'行了'+dA+'km用了'+tA+'小時。'+ns[1]+'行了'+dB+'km用了'+tB+'小時。誰較快？快多少km/h？',
      a:faster+','+diff,
      s:[ns[0]+': '+dA+'÷'+tA+' = '+sA+' km/h',
         ns[1]+': '+dB+'÷'+tB+' = '+sB+' km/h']};
  }
],
'6M5':[
  ()=>{var r=ri(4,12);return{d:1,tp:'short',q:'半徑'+r+'cm，求圓面積。(π=3.14)',fig:FIG.circ(r,'r'),a:(3.14*r*r).toFixed(2),s:['πr²='+(3.14*r*r).toFixed(2)],sc:2}},
  ()=>{var r=ri(3,8);var sq=2*r;var dWeight=ri(100,500);return{d:3,tp:'work',q:'重'+dWeight+'克正方形鐵板邊長'+sq+'cm，挖去內切圓。圓面積？正方形比圓多多少？(π=3.14)',a:(3.14*r*r).toFixed(2)+','+(sq*sq-3.14*r*r).toFixed(2),trap:'鐵板重量',s:['🔍 重量無關','圓: '+(3.14*r*r).toFixed(2),'差: '+(sq*sq-3.14*r*r).toFixed(2)],sc:3}},
  /* _addQ Phase 2 — reverse: find radius from area (line 1053) */
  ()=>{
    var r=pk([5,6,7,8,10]),area=3.14*r*r;
    return{d:3,tp:'work',
      q:'圓的面積是'+area.toFixed(2)+'cm²。半徑是多少cm？(π=3.14)',
      a:String(r),
      s:['r² = '+area.toFixed(2)+' ÷ 3.14 = '+r*r,
         'r = '+r+' cm']};
  },
  /* _addQ Phase 2 — comparison: circle vs square area (line 1099) */
  ()=>{
    var r=ri(4,10),sq=r*2;
    var cArea=3.14*r*r,sArea=sq*sq;
    var diff=sArea-cArea;
    return{d:3,tp:'work',
      q:'正方形邊長'+sq+'cm，內切圓半徑'+r+'cm。正方形比圓大多少cm²？(π=3.14)',
      a:diff.toFixed(2),
      s:['正方形: '+sq+'×'+sq+' = '+sArea,
         '圓: 3.14×'+r+'×'+r+' = '+cArea.toFixed(2),
         '差: '+diff.toFixed(2)]};
  }
],
'6S1':[
  ()=>{var shapes=[{n:'正方形',a:'4'},{n:'等邊三角形',a:'3'},{n:'正六邊形',a:'6'}];var s=pk(shapes);return{d:1,tp:'fill',q:s.n+'有____條對稱軸。',a:s.a,s:['正n邊形有n條'],sc:1}},
  ()=>({d:2,tp:'mc',q:'平行四邊形(非長方形)有多少條對稱軸？',isMC:true,opts:[{l:'A',v:'0條',c:true},{l:'B',v:'1條',c:false},{l:'C',v:'2條',c:false}],a:'A',s:['一般平行四邊形無對稱軸'],sc:2}),
  ()=>({d:3,tp:'mc',q:'以下哪個圖形既有旋轉對稱又有線對稱？',isMC:true,opts:[{l:'A',v:'等腰三角形',c:false},{l:'B',v:'正六邊形',c:true},{l:'C',v:'平行四邊形',c:false}],a:'B',s:['正六邊形有6條對稱軸和旋轉對稱'],sc:3})
],
'6D1':[
  ()=>{var n=ri(4,7);var vals=[];for(var i=0;i<n;i++)vals.push(ri(50,98));var sum=vals.reduce((s,v)=>s+v,0);var avg=sum/n;return{d:1,tp:'calc',q:vals.join('、')+'的平均數 = ?',a:avg%1===0?String(avg):avg.toFixed(1),s:['總÷'+n],sc:2}},
  ()=>{var n=ri(4,6);var vals=[];for(var i=0;i<n;i++)vals.push(ri(60,95));var sum=vals.reduce((s,v)=>s+v,0);var avg=sum/n;var target=Math.ceil(avg)+ri(2,8);var need=target*(n+1)-sum;while(need>100){target--;need=target*(n+1)-sum;}var dAbsent=ri(1,3);return{d:3,tp:'work',q:'有'+dAbsent+'人缺席。現有'+n+'次成績：'+vals.join('、')+'。要令'+(n+1)+'次平均達'+target+'分，下次最少要多少分？',a:String(need),trap:'缺席人數',s:['🔍 缺席無關','現總: '+sum,'目標總: '+target*(n+1),'需: '+need],sc:3}},
  /* _addQ Phase 2 — find next score for target avg (line 1025) */
  ()=>{
    var n=ri(3,5),vals=[];
    for(var i=0;i<n;i++) vals.push(ri(60,95));
    var sum=vals.reduce(function(s,v){return s+v},0);
    var targetAvg=Math.ceil(sum/n)+ri(3,8);
    var need=targetAvg*(n+1)-sum;
    while(need>100){targetAvg--;need=targetAvg*(n+1)-sum;}
    return{d:3,tp:'work',
      q:nm()+'前'+n+'次測驗：'+vals.join('、')+'分。要令'+(n+1)+'次平均達'+targetAvg+'分，下次最少要多少分？',
      a:String(need),
      s:['現有總分: '+sum,
         '目標總分: '+targetAvg+'×'+(n+1)+' = '+targetAvg*(n+1),
         '需要: '+need+'分']};
  }
],
'6D2':[
  ()=>{var labels=['一月','二月','三月','四月','五月'];var n=ri(4,5);var data=[];for(var i=0;i<n;i++)data.push({l:labels[i],v:ri(15,55)});var mx=data.reduce((m,d)=>d.v>m.v?d:m,data[0]);var mn=data.reduce((m,d)=>d.v<m.v?d:m,data[0]);return{d:2,tp:'short',q:'折線圖：最高與最低相差多少？最高是哪月？',fig:FIG.line(data),a:(mx.v-mn.v)+','+mx.l,s:['最高: '+mx.l,'差: '+(mx.v-mn.v)],sc:3}},
  ()=>{var labels=['週一','週二','週三','週四','週五'];var data=labels.map(l=>({l:l,v:ri(15,50)}));var total=data.reduce((s,d)=>s+d.v,0);var dRain=ri(1,3);return{d:3,tp:'work',q:'折線圖，該週有'+dRain+'天下雨。五天總和及平均數？',fig:FIG.line(data),a:total+','+(total/5%1===0?String(total/5):(total/5).toFixed(1)),trap:'下雨天數',s:['🔍 下雨天數無關','總: '+total,'平均: '+(total/5).toFixed(1)],sc:3}}
],
'6D34':[
  ()=>({d:1,tp:'mc',q:'哪種統計圖最能顯示各部分佔整體比例？',isMC:true,opts:[{l:'A',v:'折線圖',c:false},{l:'B',v:'棒形圖',c:false},{l:'C',v:'圓形圖',c:true}],a:'C',s:['圓形圖顯示比例'],sc:1}),
  ()=>{var total=pk([300,400,500,600]);var p1=pk([15,20,25,30]),p2=pk([20,25,30,35]);var p3=100-p1-p2;var dDate=pk(['上月','本月','上學期']);return{d:3,tp:'work',q:dDate+'調查，圓形圖：A佔'+p1+'%、B佔'+p2+'%、C佔其餘。共'+total+'人：A多少人？C多少人？C比A多多少人？',a:(total*p1/100)+','+(total*p3/100)+','+(total*p3/100-total*p1/100),trap:'調查時間',s:['🔍 時間無關','C%: '+p3+'%'],sc:3}}
]
};

// Topics: 6N1, 6N34, 6A1, 6M1, 6M3, 6M4, 6M5, 6S1, 6D1, 6D2, 6D34
// Export: grade6 (object with 11 topic keys)
// Total generators: 42
