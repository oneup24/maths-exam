/**
 * grade4.js — P4 question generators
 * Extracted from engine.js
 */
import { ri, pk, fOf, lcm, gcd, fS, shuffle, FIG } from '../core.js';
import { nm, pl, CTX, _it, _pl, _nm2 } from '../config.js';

export const grade4={
'4N1':[
  ()=>{var a=ri(35,99),b=ri(25,75);return{d:1,tp:'calc',q:a+' × '+b+' = ?',a:String(a*b),s:['兩位×兩位'],sc:2}},
  ()=>{var a=ri(30,80),b=ri(15,40),c=ri(20,60);return{d:2,tp:'calc',q:a+' × '+b+' + '+a+' × '+c+' = ?',a:String(a*(b+c)),s:['分配律: '+a+'×('+b+'+'+c+')'],sc:2}},
  ()=>{var packs=ri(40,80),per=ri(100,200),extra=ri(200,600);var dWeight=ri(5,15),dShop=pk(CTX.places);return{d:2,tp:'work',q:dShop+'現有花生'+packs+'包，每包'+per+'顆，每顆重約'+dWeight+'克。再添加'+extra+'顆，共有花生多少顆？',a:String(packs*per+extra),trap:'每顆重量和店名',s:['🔍 重量和店名無關',packs+'×'+per+'='+packs*per,packs*per+'+'+extra+'='+(packs*per+extra)],sc:3}},
  ()=>{var cn=ri(12,20),en=ri(10,16),ma=ri(5,10),sets=ri(200,400);var dPrice=ri(50,120);return{d:3,tp:'work',q:'一套圖書有'+cn+'本中文、'+en+'本英文和'+ma+'本數學，每套售$'+dPrice+'。'+pl()+'有'+sets+'套，共有中英文書多少本？',a:String((cn+en)*sets),trap:'售價和數學書數量',s:['🔍 售價和數學書無關','中英: '+(cn+en),'×'+sets+' = '+(cn+en)*sets],sc:3}},
  /* d:3 — simplification strategy */
  ()=>{var a=ri(10,25);return{d:3,tp:'calc',q:'用簡便方法計算：'+a+' × 101',a:String(a*101),s:[a+'×100 + '+a+'×1 = '+a*100+' + '+a+' = '+a*101],sc:2}},
  /* _addQ Strategy 1 — template rotation (line 444) */
  ()=>{
    var a=ri(12,45),b=ri(3,9),ans=a*b;
    var t=[
      ()=>'校隊有'+b+'組，每組'+a+'人。校隊共有多少人？',
      ()=>nm()+'每月儲蓄$'+a+'，'+b+'個月後共儲了多少？',
      ()=>'每層有'+a+'級樓梯，大廈共'+b+'層。全部共多少級？'
    ];
    return{d:2,tp:'work',q:pk(t)(),a:String(ans),s:[a+'×'+b+'='+ans],sc:3};
  },
  ()=>{
    var b=ri(3,9),q=ri(3,12),a=b*q,it=_it();
    var t=[
      ()=>nm()+'有'+a+it.u+it.n+'，平均分給'+b+'人。每人分到多少'+it.u+'？',
      ()=>a+'粒糖果，每袋裝'+b+'粒。可裝多少袋？',
      ()=>_pl()+'有'+a+'張椅子，每行放'+b+'張。共有多少行？'
    ];
    return{d:2,tp:'work',q:pk(t)(),a:String(q),s:[a+'÷'+b+'='+q],sc:3};
  },
  /* _addQ Strategy 2 — reverse / inverse (line 508) */
  ()=>{
    var price=ri(5,25),qty=ri(3,8),total=price*qty;
    return{d:2,tp:'work',
      q: (function(){
  var t = pk([1,2,3,4,5,6,7,8]);
  switch(t){
    case 1: return nm()+'買了'+qty+'件玩具，共花了$'+total+'。每件多少錢？';
    case 2: return nm()+'買了'+qty+'枝鉛筆，共花了$'+total+'。每枝多少錢？';
    case 3: return nm()+'買了'+qty+'本故事書，共花了$'+total+'。每本多少錢？';
    case 4: return nm()+'有'+total+'粒糖果，平均分給'+qty+'個小朋友。每人分到多少粒？';
    case 5: return '一條繩子長'+total+'cm，平均剪成'+qty+'段。每段長多少cm？';
    case 6: return nm()+'要在'+qty+'天內看完一本'+total+'頁的書。每天要看多少頁？';
    case 7: return nm()+'有'+total+'塊曲奇餅，平均放入'+qty+'個盒子。每個盒子放多少塊？';
    case 8: return '有'+total+'個學生，平均分成'+qty+'組。每組有多少人？';
  }
})(),
      a:String(price),s:['$'+total+'÷'+qty+' = $'+price],sc:3};
  },
  ()=>{
    var spent=ri(15,40),gained=ri(10,25),current=ri(25,50);
    var original=current+spent-gained;
    return{d:3,tp:'work',
      q:nm()+'先用了$'+spent+'買文具，再收到$'+gained+'利是錢。現在有$'+current+'。他原來有多少錢？',
      a:String(original),
      s:['原來 = $'+current+' + $'+spent+' − $'+gained+' = $'+original],sc:3};
  },
  /* _addQ Strategy 4 — fencepost / boundary (line 626) */
  ()=>{
    var gap=ri(3,8),count=ri(6,12),dist=gap*(count-1);
    return{d:3,tp:'work',
      q:'一條'+dist+'米長的路，每隔'+gap+'米種一棵樹（頭尾都種）。共需多少棵樹？',
      a:String(count),
      s:[dist+'÷'+gap+' = '+(count-1),'頭尾都種: '+(count-1)+' + 1 = '+count],
      trap:{wrong:dist/gap,msg:'忘記 +1！頭尾都種要 +1'},sc:3};
  },
  // 鋸木問題
  ()=>{
    var pieces=ri(4,10),time=ri(2,5),cuts=pieces-1,total=cuts*time;
    return{d:3,tp:'work',
      q:nm()+'把一條木頭鋸成'+pieces+'段，每鋸一刀用'+time+'分鐘。共需多少分鐘？',
      a:String(total),
      s:[pieces+'段需要'+cuts+'刀',cuts+'×'+time+' = '+total+'分鐘'],
      trap:{wrong:pieces*time,msg:pieces+'段只需'+cuts+'刀！'},sc:3};
  },
  // 兩邊插旗
  ()=>{
    var gap=pk([5,10]),dist=gap*ri(4,10),oneS=dist/gap+1,both=oneS*2;
    return{d:3,tp:'work',
      q:'一條'+dist+'米的路，兩邊每隔'+gap+'米插一面旗（頭尾都插）。共需多少面旗？',
      a:String(both),
      s:['一邊: '+dist+'÷'+gap+' + 1 = '+oneS,
         '兩邊: '+oneS+'×2 = '+both],sc:3};
  }
],
'4N2':[
  ()=>{var dv=ri(12,30),q2=ri(15,35),r=ri(1,dv-1);var n=dv*q2+r;return{d:1,tp:'calc',q:n+' ÷ '+dv+' = ?',a:q2+'...'+r,s:['有餘數除法'],sc:2}},
  ()=>{var total=ri(300,800),per=ri(12,25);var full=Math.floor(total/per),rem=total%per;var dW=ri(8,20),dC=pk(['紅色','藍色']);return{d:2,tp:'work',q:'工廠有'+dW+'名工人，生產了'+total+'件'+dC+'玩具。每箱盛'+per+'件，要用多少個箱？',a:String(rem>0?full+1:full),trap:'工人數和顏色',s:['🔍 均無關',total+'÷'+per+'='+full+'...'+rem,'需'+(full+1)+'箱'],sc:3}},
  ()=>{var plane=ri(250,500),ratio=ri(12,20);var car=Math.floor(plane/ratio);var budget=ri(plane+50,plane+200);var remain=budget-plane;var maxCar=Math.floor(remain/car);var dAge=ri(35,50);return{d:3,tp:'work',q:'一架模型飛機售'+plane+'元，是模型車的'+ratio+'倍。爸爸今年'+dAge+'歲，有'+budget+'元。買了飛機後，最多可買模型車多少輛？',a:String(maxCar),trap:'爸爸年齡',s:['🔍 年齡無關','車價: '+car,'餘錢: '+(budget-plane),'最多: '+maxCar+'輛'],sc:3}}
],
'4N3':[
  ()=>{var n=pk([24,36,48,60,72]);return{d:1,tp:'fill',q:n+'的所有因數是：____',a:fOf(n).join(','),s:['逐一試除'],sc:3}},
  ()=>{var lo=ri(300,350),hi=lo+ri(10,20);var ans=[];for(var i=lo;i<=hi;i++)if(i%3===0&&i%5===0)ans.push(i);return{d:2,tp:'fill',q:'從'+lo+'到'+hi+'中，同時能被3和5整除的數是：____',a:ans.length>0?ans.join(','):'沒有',s:['能被15整除'],sc:3}},
  /* d:3 — reasoning */
  ()=>{var n=pk([12,18,24,30]);var fs=fOf(n);return{d:3,tp:'fill',q:n+'有____個因數。最大因數和最小因數相差____。',a:fs.length+','+(fs[fs.length-1]-fs[0]),s:['因數: '+fs.join(','),'差: '+(fs[fs.length-1]-fs[0])],sc:3}},
  /* _addQ Strategy 3 — comparison / best deal (line 566) */
  ()=>{
    var pA=ri(3,8),qA=pk([3,4,5,6]),totalA=pA*qA;
    var pB=ri(3,8),qB=pk([4,5,6,8]),totalB=pB*qB;
    while(pA===pB){pB=ri(3,8);totalB=pB*qB;}
    var cheaper=pA<pB?'A':'B';
    return{d:3,tp:'work',
      q:'A店：'+qA+'個蘋果$'+totalA+'。B店：'+qB+'個蘋果$'+totalB+'。哪間每個較便宜？（答A或B）',
      a:cheaper,
      s:['A每個: $'+totalA+'÷'+qA+' = $'+pA,
         'B每個: $'+totalB+'÷'+qB+' = $'+pB,
         cheaper+'店較便宜'],sc:3};
  },
  /* _addQ Strategy 5 — multi-constraint (line 661) */
  ()=>{
    var d1=pk([3,4,5]),d2=pk([2,3,4]);
    while(d1===d2) d2=pk([2,3,4]);
    var lo=10,hi=50,results=[];
    for(var i=lo;i<=hi;i++) if(i%d1===0&&i%d2===0) results.push(i);
    if(results.length===0){d1=3;d2=5;results=[];for(var j=lo;j<=hi;j++) if(j%d1===0&&j%d2===0) results.push(j);}
    return{d:3,tp:'fill',
      q:lo+'至'+hi+'之間，同時是'+d1+'和'+d2+'的倍數的數有哪些？（用逗號分隔）',
      a:results.join(','),
      s:['找'+d1+'和'+d2+'的公倍數: '+results.join(', ')],sc:3};
  },
  /* _addQ Strategy 6 — error-finding (line 698) */
  ()=>{
    var a=ri(10,30),b=ri(2,8),c=ri(3,9);
    var correct=a+b*c,wrong=(a+b)*c;
    return{d:3,tp:'work',
      q:nm()+'計算 '+a+' + '+b+' × '+c+' = '+wrong+'。正確答案是多少？',
      a:String(correct),
      s:['❌ 先乘除後加減',
         '✅ '+b+'×'+c+' = '+(b*c),
         '✅ '+a+' + '+(b*c)+' = '+correct],sc:2};
  },
  // 減 vs 乘
  ()=>{
    var a=ri(30,60),b=ri(2,5),c=ri(3,6);
    var correct=a-b*c,wrong=(a-b)*c;
    return{d:3,tp:'work',
      q:nm()+'計算 '+a+' − '+b+' × '+c+' = '+wrong+'。正確答案是多少？',
      a:String(correct),
      s:['先算乘: '+b+'×'+c+' = '+(b*c),
         '再算減: '+a+' − '+(b*c)+' = '+correct],sc:2};
  },
  // 質數識別 (d:1)
  ()=>{const primes=[2,3,5,7,11,13,17,19];const composites=[4,6,8,9,10,12,14,15,16,18];
    const ip=ri(0,1);const n=ip?pk(primes):pk(composites);
    return{d:1,tp:'mc',q:n+'是質數（素數）還是合數？',isMC:true,
      opts:[{l:'A',v:'質數（素數）',c:ip===1},{l:'B',v:'合數',c:ip===0},{l:'C',v:'既非質數也非合數',c:false}],
      a:ip?'A':'B',s:[n+(ip?'：只有1和本身兩個因數，是質數':'：有多於2個因數，是合數')],sc:1}},
  // 1的特殊性 (d:1)
  ()=>({d:1,tp:'mc',q:'1是質數嗎？',isMC:true,
    opts:[{l:'A',v:'是，1是質數',c:false},{l:'B',v:'不是，1只有一個因數',c:true},{l:'C',v:'1是合數',c:false}],
    a:'B',s:['1只有一個因數，既不是質數也不是合數'],sc:1}),
  // 列出質數 (d:2)
  ()=>{const limit=pk([10,15,20]);const ps=[];for(let i=2;i<=limit;i++){let ok=true;for(let j=2;j*j<=i;j++)if(i%j===0){ok=false;break}if(ok)ps.push(i)}
    return{d:2,tp:'fill',q:'列出'+limit+'以內（包括'+limit+'）的所有質數：____',
      a:ps.join(','),s:['質數只有1和本身兩個因數','答案：'+ps.join(', ')],sc:2}}
],
'4N4':[
  ()=>{var a=pk([6,8,9,12]),b=pk([8,10,12,15]);return{d:1,tp:'fill',q:a+'和'+b+'的L.C.M.是____',a:String(lcm(a,b)),s:['列出倍數'],sc:2}},
  ()=>{var a=pk([18,24,30,36]),b=pk([12,16,20,24]);return{d:1,tp:'fill',q:a+'和'+b+'的H.C.F.是____',a:String(gcd(a,b)),s:['列出因數'],sc:2}},
  ()=>{var a=pk([4,6,8]),b=pk([6,8,12]);var l=lcm(a,b);var dPool=pk(['室內泳池','室外泳池']),dHours=ri(2,4);return{d:2,tp:'work',q:nm()+'每'+a+'天去'+dPool+'游泳'+dHours+'小時，'+nm()+'每'+b+'天去。若今天同時去，至少多少天後再同時去？',a:String(l),trap:'泳池類型和時數',s:['🔍 泳池和時數無關','L.C.M.('+a+','+b+')='+l],sc:3}},
  /* d:3 — application */
  ()=>{var a=pk([6,8,10,12]),b=pk([8,10,12,15]);var l=lcm(a,b);var n=ri(2,4);return{d:3,tp:'work',q:'紅燈每'+a+'秒亮一次，綠燈每'+b+'秒亮一次。同時亮後，第'+n+'次同時亮是多少秒後？',a:String(l*n),s:['L.C.M.='+l,'第'+n+'次: '+l+'×'+n+'='+l*n],sc:3}}
],
'4N5':[
  ()=>{var a=ri(30,80),b=ri(15,40),c=ri(5,12);return{d:1,tp:'calc',q:'('+a+' + '+b+') × '+c+' = ?',a:String((a+b)*c),s:['括號先算'],sc:2}},
  ()=>{for(var i=0;i<50;i++){var a=ri(100,300),b=ri(20,60),c=ri(5,9),d=ri(10,30);if(a-b*c>=0)return{d:2,tp:'calc',q:a+' − '+b+' × '+c+' + '+d+' = ?',a:String(a-b*c+d),s:['先乘後加減'],sc:2}}var fa=300,fb=20,fc=5,fd=10;return{d:2,tp:'calc',q:fa+' − '+fb+' × '+fc+' + '+fd+' = ?',a:String(fa-fb*fc+fd),s:['先乘後加減'],sc:2}},
  ()=>{var small=ri(15,25),big=small+ri(3,8),n=ri(200,350);var dMember=ri(1000,5000),dOpen=ri(8,22);return{d:2,tp:'work',q:'超市有會員'+dMember+'人，每日營業'+dOpen+'小時。細包裝每包$'+small+'，大包裝比細包裝貴$'+(big-small)+'。各買'+n+'包需付多少元？',a:String((small+big)*n),trap:'會員數和營業時間',s:['🔍 會員和營業時間無關','大: '+big,'兩種×'+n+': '+(small+big)*n],sc:3}},
  ()=>{var girls=ri(20,40),leave=ri(3,10),ratio=ri(10,20);var dArea=ri(100,300);return{d:3,tp:'work',q:'禮堂面積'+dArea+'平方米，有女學生'+girls+'人。'+leave+'人離開後，男學生是餘下女學生的'+ratio+'倍。男學生有多少人？',a:String((girls-leave)*ratio),trap:'禮堂面積',s:['🔍 面積無關','餘下: '+(girls-leave),'男: '+(girls-leave)*ratio],sc:3}},
  // 分配律：展開 (d:1)
  ()=>{const a=ri(3,9),b=ri(10,30),c=ri(5,20);
    return{d:1,tp:'fill',q:a+' × ('+b+' + '+c+') = '+a+' × ____ + '+a+' × ____',
      a:b+','+c,s:['分配律: '+a+'×('+b+'+'+c+') = '+a+'×'+b+'+'+a+'×'+c+' = '+(a*(b+c))],sc:1}},
  // 分配律：提取公因數 (d:2)
  ()=>{const a=ri(3,8),b=ri(10,25),c=ri(5,15);
    return{d:2,tp:'fill',q:a+' × '+b+' + '+a+' × '+c+' = '+a+' × (____)',
      a:b+'+'+c,s:['提取公因數'+a,'= '+a+'×'+(b+c)+' = '+(a*(b+c))],sc:2}}
],
'4N6':[
  ()=>{var n=ri(10,25),den=ri(3,7);var w=Math.floor(n/den),r=n%den;return{d:1,tp:'fill',q:n+'/'+den+' 化為帶分數 = ____',a:r===0?String(w):w+'又'+r+'/'+den,s:['假分數÷分母'],sc:2}},
  ()=>{var den=pk([6,8,12]),a=ri(den+1,den*2),b=ri(1,den-1);return{d:2,tp:'calc',q:a+'/'+den+' − '+b+'/'+den+' = ?（最簡）',a:fS(a-b,den),s:['同分母相減後約分'],sc:2}},
  ()=>{var d=pk([4,6,8]);var pairs=[];for(var n=1;n<d;n++){if(gcd(n,d)>1)pairs.push(n+'/'+d+'='+fS(n,d))}return{d:3,tp:'fill',q:'寫出 1/'+d+'、2/'+d+'、...、'+(d-1)+'/'+d+' 中可以約分的分數及其最簡分數。',a:pairs.join(','),s:['逐一檢查公因數'],sc:3}},
  /* _addQ Strategy 3 — comparison (line 885) */
  ()=>{
    var d1=pk([4,6,8]),d2=pk([4,6,8]);
    while(d1===d2) d2=pk([4,6,8]);
    var n1=ri(1,d1-1),n2=ri(1,d2-1);
    var l=lcm(d1,d2);
    var v1=n1*(l/d1),v2=n2*(l/d2);
    while(v1===v2){n2=ri(1,d2-1);v2=n2*(l/d2);}
    var bigger=v1>v2?n1+'/'+d1:n2+'/'+d2;
    return{d:3,tp:'work',
      q:'比較 '+n1+'/'+d1+' 和 '+n2+'/'+d2+'，哪個較大？',
      a:bigger,
      s:['通分母: L.C.M.='+l,
         n1+'/'+d1+' = '+v1+'/'+l,
         n2+'/'+d2+' = '+v2+'/'+l],sc:3};
  }
],
'4N78':[
  ()=>{var a=ri(30,95),b=ri(20,85);return{d:1,tp:'calc',q:(a/10).toFixed(1)+' + '+(b/10).toFixed(1)+' = ?',a:((a+b)/10).toFixed(1),s:['小數加法'],sc:2}},
  ()=>{var a=ri(20,80),b=ri(10,50),c=ri(10,Math.min(40,a+b-5));return{d:2,tp:'calc',q:(a/10).toFixed(1)+' + '+(b/10).toFixed(1)+' − '+(c/10).toFixed(1)+' = ?',a:((a+b-c)/10).toFixed(1),s:['先加後減'],sc:2}},
  ()=>{var a=ri(10,50),b=ri(10,50);return{d:3,tp:'fill',q:'____+ '+(b/10).toFixed(1)+' = '+((a+b)/10).toFixed(1),a:(a/10).toFixed(1),s:['逆向: '+((a+b)/10).toFixed(1)+'−'+(b/10).toFixed(1)+'='+(a/10).toFixed(1)],sc:2}},
  /* _addQ — reverse / find missing decimal (line 849) */
  ()=>{
    var a=ri(15,60),b=ri(15,60),sum=a+b;
    return{d:3,tp:'fill',
      q:(a/10).toFixed(1)+' + ____ = '+(sum/10).toFixed(1),
      a:(b/10).toFixed(1),
      s:[(sum/10).toFixed(1)+' − '+(a/10).toFixed(1)+' = '+(b/10).toFixed(1)],sc:2};
  },
  ()=>{
    var a=ri(30,80),b=ri(10,a-10),diff=a-b;
    return{d:3,tp:'fill',
      q:'____ − '+(b/10).toFixed(1)+' = '+(diff/10).toFixed(1),
      a:(a/10).toFixed(1),
      s:[(diff/10).toFixed(1)+' + '+(b/10).toFixed(1)+' = '+(a/10).toFixed(1)],sc:2};
  }
],
'4M1':[
  ()=>{var w=ri(8,25),h=ri(5,18);return{d:1,tp:'short',q:'求長方形周界。',fig:FIG.rect(w,h),a:String((w+h)*2),s:['('+w+'+'+h+')×2='+(w+h)*2],sc:2}},
  ()=>{var s1=ri(5,12),s2=ri(8,18);var dH=ri(60,80);return{d:2,tp:'work',q:'桌面高'+dH+'cm。桌上正方形紙板邊長'+s1+'cm和長方形(長'+s2+'cm闊'+s1+'cm)。周界相差多少cm？',a:String(Math.abs(s1*4-(s2+s1)*2)),trap:'桌面高度',s:['🔍 桌面高度無關','正方: '+s1*4,'長方: '+(s2+s1)*2,'差: '+Math.abs(s1*4-(s2+s1)*2)],sc:3}},
  ()=>{var w=ri(8,15),h=ri(5,12);var peri=(w+h)*2;return{d:3,tp:'work',q:'長方形周界是'+peri+'cm，長是'+w+'cm。闊是多少cm？面積是多少cm²？',a:h+','+w*h,s:['闊: ('+peri+'÷2)−'+w+'='+h,'面積: '+w+'×'+h+'='+w*h],sc:3}},
  /* _addQ Phase 2 — reverse (line 819) */
  ()=>{
    var w=ri(8,20),h=ri(4,15),peri=(w+h)*2;
    return{d:3,tp:'work',
      q:'長方形周界是'+peri+'cm，長是'+w+'cm。闊是多少cm？',
      a:String(h),
      s:['闊 = '+peri+'÷2 − '+w+' = '+h],sc:3};
  },
  ()=>{
    var s=ri(5,18),peri=s*4;
    return{d:2,tp:'work',
      q:'正方形周界是'+peri+'cm。邊長是多少cm？面積呢？',
      a:s+','+(s*s),
      s:[peri+'÷4 = '+s,'面積 = '+s+'×'+s+' = '+s*s],sc:3};
  },
  /* _addQ — image-based questions (line 1118) */
  // Rectangle perimeter (varied text to bypass dedup)
  ()=>{
    var w=ri(8,25),h=ri(5,18);
    return{d:1,tp:'short',
      q:'下圖長方形，長'+w+'cm，闊'+h+'cm。求周界。',
      fig:FIG.rect(w,h),
      a:String((w+h)*2),
      s:['('+w+'+'+h+')×2='+(w+h)*2],sc:2};
  },
  // Square perimeter with image
  ()=>{
    var s=ri(5,20);
    return{d:1,tp:'short',
      q:'下圖正方形，邊長'+s+'cm。求周界。',
      fig:FIG.sq(s),
      a:String(s*4),
      s:[s+'×4='+s*4],sc:2};
  },
  // Find missing side from perimeter + image
  ()=>{
    var w=ri(8,20),h=ri(5,15),peri=(w+h)*2;
    return{d:2,tp:'short',
      q:'下圖長方形周界是'+peri+'cm，長是'+w+'cm。闊是多少cm？',
      fig:FIG.rect(w,h),
      a:String(h),
      s:['闊 = '+peri+'÷2−'+w+' = '+h],sc:2};
  },
  // Two shapes comparison with image
  ()=>{
    var w=ri(8,16),h=ri(5,12),rectP=(w+h)*2;
    var s=ri(6,14),sqP=s*4;
    return{d:2,tp:'short',
      q:'長方形(長'+w+'cm，闊'+h+'cm)和正方形(邊長'+s+'cm)，周界相差多少cm？',
      fig:FIG.rect(w,h),
      a:String(Math.abs(rectP-sqP)),
      s:['長方: '+rectP,'正方: '+sqP,'差: '+Math.abs(rectP-sqP)],sc:2};
  },
  // Half perimeter
  ()=>{
    var w=ri(10,22),h=ri(6,16),_peri=(w+h)*2;
    return{d:2,tp:'short',
      q:'下圖長方形的周界的一半是多少cm？',
      fig:FIG.rect(w,h),
      a:String(w+h),
      s:['周界='+(w+h)*2,'一半='+(w+h)],sc:2};
  },
  // Given perimeter find area (with image)
  ()=>{
    var w=ri(8,18),h=ri(5,14),peri=(w+h)*2;
    return{d:3,tp:'short',
      q:'下圖長方形周界'+peri+'cm，長'+w+'cm。求面積。',
      fig:FIG.rect(w,h),
      a:String(w*h),
      s:['闊='+h,'面積='+w+'×'+h+'='+w*h],sc:3};
  }
],
'4M2':[
  ()=>{var w=ri(6,18),h=ri(4,14);return{d:1,tp:'short',q:'求長方形面積。',fig:FIG.rect(w,h),a:String(w*h),s:[w+'×'+h+'='+w*h],sc:2}},
  ()=>{var w=ri(8,15),h=ri(5,10),cut=ri(2,4);var dPW=ri(80,150);return{d:2,tp:'work',q:'長方形紙板長'+w+'cm闊'+h+'cm，每cm²重'+dPW+'毫克。剪去邊長'+cut+'cm正方形，剩餘面積？',a:String(w*h-cut*cut),trap:'紙板重量',s:['🔍 重量無關','長方: '+w*h,'正方: '+cut*cut,'剩: '+(w*h-cut*cut)],sc:3}},
  ()=>{var area=ri(40,100),w=ri(4,8);var h=area/w;if(h!==Math.floor(h)){area=w*ri(5,12);h=area/w}return{d:3,tp:'work',q:'長方形面積'+area+'cm²，闊'+w+'cm。求長和周界。',a:h+','+(w+h)*2,s:['長: '+area+'÷'+w+'='+h,'周界: ('+w+'+'+h+')×2='+(w+h)*2],sc:3}},
  /* _addQ Phase 2 — reverse (line 837) */
  ()=>{
    var w=ri(5,15),h=ri(3,12),area=w*h;
    return{d:3,tp:'work',
      q:'長方形面積是'+area+'cm²，長是'+w+'cm。闊是多少cm？周界是多少cm？',
      a:h+','+(w+h)*2,
      s:['闊 = '+area+'÷'+w+' = '+h,
         '周界 = ('+w+'+'+h+')×2 = '+(w+h)*2],sc:3};
  },
  /* _addQ Phase 2 — comparison (line 869) */
  ()=>{
    var wA=ri(6,15),hA=ri(4,10),areaA=wA*hA;
    var sB=ri(5,12),areaB=sB*sB;
    var bigger=areaA>areaB?'長方形':'正方形';
    var diff=Math.abs(areaA-areaB);
    return{d:3,tp:'work',
      q:'長方形長'+wA+'cm闊'+hA+'cm，正方形邊長'+sB+'cm。哪個面積較大？大多少cm²？',
      a:bigger+','+diff,
      s:['長方形: '+wA+'×'+hA+' = '+areaA,
         '正方形: '+sB+'×'+sB+' = '+areaB,
         bigger+'大'+diff+'cm²'],sc:3};
  },
  /* _addQ — image-based questions (line 1177) */
  ()=>{
    var w=ri(6,18),h=ri(4,14);
    return{d:1,tp:'short',
      q:'下圖長方形，長'+w+'cm，闊'+h+'cm。求面積。',
      fig:FIG.rect(w,h),
      a:String(w*h),
      s:[w+'×'+h+'='+w*h],sc:2};
  },
  ()=>{
    var s=ri(5,15);
    return{d:1,tp:'short',
      q:'下圖正方形，邊長'+s+'cm。求面積。',
      fig:FIG.sq(s),
      a:String(s*s),
      s:[s+'×'+s+'='+s*s],sc:2};
  },
  ()=>{
    var w=ri(8,16),h=ri(5,12),area=w*h;
    return{d:2,tp:'short',
      q:'下圖長方形面積是'+area+'cm²，長是'+w+'cm。闊是多少cm？',
      fig:FIG.rect(w,h),
      a:String(h),
      s:['闊='+area+'÷'+w+'='+h],sc:2};
  },
  ()=>{
    var w=ri(8,15),h=ri(5,12);
    return{d:2,tp:'short',
      q:'下圖長方形的面積和周界各是多少？(用逗號分隔)',
      fig:FIG.rect(w,h),
      a:w*h+','+(w+h)*2,
      s:['面積='+w*h,'周界='+(w+h)*2],sc:3};
  }
],
'4S1':[
  ()=>({d:1,tp:'mc',q:'所有正方形都是菱形，對嗎？',isMC:true,opts:[{l:'A',v:'正確',c:true},{l:'B',v:'不正確',c:false}],a:'A',s:['正方形四邊等長→菱形'],sc:2}),
  ()=>{var n=ri(4,7);return{d:2,tp:'calc',q:n+'個平行四邊形，內角總和多少度？',a:String(n*360),s:[n+'×360='+n*360],sc:2}},
  ()=>({d:3,tp:'mc',q:'以下哪種四邊形的對角線互相垂直？',isMC:true,opts:[{l:'A',v:'長方形',c:false},{l:'B',v:'菱形',c:true},{l:'C',v:'梯形',c:false}],a:'B',s:['菱形的對角線互相垂直平分'],sc:2}),
  /* _addQ Strategy 7 — cross-topic (line 745) */
  ()=>{
    var w=ri(5,15),h=ri(3,10),peri=(w+h)*2;
    return{d:3,tp:'work',
      q:'長方形周界'+peri+'cm，長'+w+'cm。求闊和面積。（用逗號分隔）',
      a:h+','+(w*h),
      s:['闊 = '+peri+'÷2 − '+w+' = '+h+' cm',
         '面積 = '+w+'×'+h+' = '+(w*h)+' cm²'],sc:3};
  },
  // 菱形特性 (d:1)
  ()=>({d:1,tp:'mc',q:'菱形的特別之處是什麼？',isMC:true,
    opts:[{l:'A',v:'四個直角',c:false},{l:'B',v:'四條等長的邊',c:true},{l:'C',v:'只有兩對平行邊',c:false}],
    a:'B',s:['菱形四條邊等長，兩對對邊平行'],sc:1}),
  // 菱形與正方形比較 (d:2)
  ()=>({d:2,tp:'mc',q:'正方形和菱形的共同特點是什麼？',isMC:true,
    opts:[{l:'A',v:'四個直角',c:false},{l:'B',v:'四條等長的邊',c:true},{l:'C',v:'只有兩條對稱軸',c:false}],
    a:'B',s:['兩者都有四條等長的邊；正方形有4個直角，菱形不一定'],sc:2})
],

/* ═══════════ 4S2 圖形的分割與拼合 ═══════════ */
'4S2':[
  // 對角線分割正方形 (d:1)
  ()=>({d:1,tp:'mc',q:'一個正方形用對角線分割，可以得到兩個什麼形狀？',isMC:true,
    opts:[{l:'A',v:'兩個三角形',c:true},{l:'B',v:'兩個長方形',c:false},{l:'C',v:'兩個正方形',c:false}],
    a:'A',s:['對角線把正方形分成2個全等三角形'],sc:1}),
  // 長方形對角線 (d:1)
  ()=>({d:1,tp:'fill',q:'把一個長方形沿對角線剪開，可以得到____個三角形。',a:'2',s:['對角線把長方形分成2個全等三角形'],sc:1}),
  // 拼合三角形 (d:2)
  ()=>({d:2,tp:'mc',q:'兩個完全一樣的直角三角形可以拼成什麼形狀？',isMC:true,
    opts:[{l:'A',v:'正方形或長方形',c:true},{l:'B',v:'圓形',c:false},{l:'C',v:'梯形',c:false}],
    a:'A',s:['兩個全等直角三角形可拼成正方形或長方形'],sc:1}),
  // 密鋪 (d:2)
  ()=>({d:2,tp:'mc',q:'以下哪種形狀可以獨立密鋪平面？',isMC:true,
    opts:[{l:'A',v:'圓形',c:false},{l:'B',v:'正六邊形',c:true},{l:'C',v:'正五邊形',c:false}],
    a:'B',s:['正三角形、正方形、正六邊形可密鋪；正五邊形和圓形不可'],sc:2}),
  // 三角形面積（由長方形得） (d:3)
  ()=>{const w=ri(6,12),h=ri(4,8);const area=w*h;
    return{d:3,tp:'work',q:'把長'+w+'cm、闊'+h+'cm的長方形沿對角線分成兩個三角形，每個三角形面積是多少cm²？',
      a:String(area/2),s:['長方形面積='+w+'×'+h+'='+area,'每個三角形='+area+'÷2='+area/2],sc:2}}
],

/* ═══════════ 4S3 方向和位置(二)——八個方位 ═══════════ */
'4S3':[
  // 相反方向 (d:1)
  ()=>{const dirs=['東','西','南','北'];const d=pk(dirs);const opp={東:'西',西:'東',南:'北',北:'南'};
    return{d:1,tp:'fill',q:d+'的相反方向是____。',a:opp[d],s:['相反方向: 東↔西, 南↔北'],sc:1}},
  // 間方位名稱 (d:1)
  ()=>{const combos=[{q:'東和北之間',a:'東北'},{q:'東和南之間',a:'東南'},{q:'西和北之間',a:'西北'},{q:'西和南之間',a:'西南'}];
    const c=pk(combos);return{d:1,tp:'fill',q:c.q+'的方向叫____。',a:c.a,s:['八個方位: 東/南/西/北/東北/東南/西北/西南'],sc:1}},
  // 地圖方向推斷 (d:2)
  ()=>{const places=['學校','公園','超市','圖書館'];const [p1,p2,p3]=shuffle(places).slice(0,3);
    return{d:2,tp:'fill',q:p1+'在地圖中央。'+p2+'在'+p1+'的正東，'+p3+'在'+p1+'的正北。'+p3+'在'+p2+'的____方向。',
      a:'西北',s:[p2+'在東，'+p3+'在北，所以'+p3+'在'+p2+'的西北'],sc:2}},
  // 方格移動 (d:2)
  ()=>{const [a,b]=_nm2();const steps=pk([2,3,4]);const dir=pk(['東北','東南','西北','西南']);
    return{d:2,tp:'fill',q:a+'站在地圖中心，'+b+'在'+a+'的'+dir+'方向'+steps+'格。從'+a+'向'+dir+'走'+steps+'格到達____。',
      a:b,s:[dir+'方向走'+steps+'格'],sc:1}},
  // 多步方向 (d:3)
  ()=>{const n=nm();const d1=pk(['東','西']),d2=pk(['北','南']);const s1=ri(2,5),s2=ri(2,4);
    const opp={東:'東',西:'西'};const oppv={北:'北',南:'南'};
    return{d:3,tp:'work',q:n+'從學校出發，先向'+d1+'走'+s1+'格，再向'+d2+'走'+s2+'格。現在在學校的____方向。',
      a:opp[d1]+oppv[d2],s:['向'+d1+'再向'+d2+'= '+opp[d1]+oppv[d2]+'方向'],sc:2}}
],

'4D1':[
  ()=>{var items=[{l:'中文',v:ri(40,90)},{l:'英文',v:ri(35,85)},{l:'數學',v:ri(45,95)},{l:'常識',v:ri(30,75)}];var total=items.reduce((s,i)=>s+i.v,0);var mx=items.reduce((m,i)=>i.v>m.v?i:m,items[0]);var dTestTime=ri(30,60);return{d:2,tp:'short',q:'棒形圖（測驗時間'+dTestTime+'分鐘）。四科合共多少分？最高分是哪科？',fig:FIG.bars(items),a:total+','+mx.l,trap:'測驗時間',s:['🔍 測驗時間無關','總: '+total,'最高: '+mx.l],sc:3}},
  ()=>{var items=[{l:'A班',v:ri(30,45)},{l:'B班',v:ri(25,40)},{l:'C班',v:ri(35,50)}];var avg=Math.round(items.reduce((s,i)=>s+i.v,0)/items.length);return{d:3,tp:'short',q:'棒形圖顯示三班成績。平均分是多少？（四捨五入至整數）',fig:FIG.bars(items),a:String(avg),s:['三班總÷3='+avg],sc:3}}
]
};

// Topics: 4N1, 4N2, 4N3, 4N4, 4N5, 4N6, 4N78, 4M1, 4M2, 4S1, 4S2, 4S3, 4D1
// Export: grade4 (object with 13 topic keys)
// Total generators: 82
