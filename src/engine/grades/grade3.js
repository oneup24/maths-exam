/**
 * grade3.js — P3 question generators (3N1–3D2)
 * Extracted from engine.js
 * Enriched by HK Band 1 Top Math Teacher - featuring logical reasoning & distractor traps
 */
import { ri, pk, fS, shuffle, FIG } from '../core.js';
import { nm, pl, fd, CTX, _it, _pl } from '../config.js';

export const grade3={

/* ═══════════ 3N1 大數(一) — 萬以內的數 ═══════════ */
'3N1':[
  // Place value to 萬 (d:1)
  ()=>{const a=ri(10000,99999);return{d:1,tp:'fill',q:a+'的萬位數字是____，千位數字是____。',
    a:Math.floor(a/10000)+','+Math.floor(a%10000/1000),s:['萬位='+Math.floor(a/10000),'千位='+Math.floor(a%10000/1000)],sc:1}},
  // Read 5-digit number (d:1)
  ()=>{const w=ri(1,9),q=ri(0,9),b=ri(0,9),s2=ri(0,9),g=ri(0,9);const n=w*10000+q*1000+b*100+s2*10+g;
    return{d:1,tp:'fill',q:'用數字寫：'+w+'萬'+q+'千'+b+'百'+s2+'十'+g+'個 = ____',a:String(n),s:['位值相加'],sc:1}},
  // Round to 1000 (d:2)
  ()=>{const n=ri(10000,99999);const r=Math.round(n/1000)*1000;
    return{d:2,tp:'fill',q:'把'+n+'四捨五入至最接近的千：____',
      a:String(r),s:['看百位 '+(Math.floor(n/100)%10)+'：'+(Math.floor(n/100)%10>=5?'進千':'捨去')],sc:1}},
  // Compare and order (d:2)
  ()=>{const arr=[ri(10000,50000),ri(50001,99999),ri(5000,9999)];const sorted=[...arr].sort((a,b)=>a-b);
    return{d:2,tp:'fill',q:'由小到大：'+shuffle([...arr]).join('、')+' → ____',a:sorted.join(', '),s:[sorted.join(' < ')],sc:2}},
  // d:2 — digit card: smallest 5-digit number
  ()=>{const d=[ri(1,3),ri(4,6),ri(7,9),0,0];const shuffled=[...d].sort(()=>Math.random()-0.5);
    return{d:2,tp:'fill',q:'用 '+shuffled.join('、')+' 五張數字卡，排成一個最小的五位數（每個數字必須用一次）是____。',
      a:String(d[0]*10000+0*1000+0*100+d[1]*10+d[2]),
      s:['最小的五位數：萬位不能是 0，所以把最小的非零數字放在萬位，其餘由小到大排列。','答案：'+d[0]+'00'+d[1]+''+d[2]],sc:2}},
  // d:3 — reverse place value
  ()=>{const w=ri(2,8);const diff=ri(1,Math.min(w-1,5));
    return{d:3,tp:'work',q:'一個五位數，萬位是'+w+'，千位比萬位小'+diff+'，其餘各位是0。這個數是多少？',
      a:String(w*10000+(w-diff)*1000),s:['千位='+w+'−'+diff+'='+(w-diff),'數字='+w*10000+(w-diff)*1000],sc:2}},
  // d:3 — 5-digit code logic puzzle with trap (fix: ensure (w-diff) is even for halving)
  ()=>{const w=ri(4,8);const wMinusDiff=ri(1,Math.floor(w/2))*2;const diff=w-wMinusDiff;const half=wMinusDiff/2;const dItem=ri(10,50);
    return{d:3,tp:'work',q:'密碼是一個五位數。萬位數字是 '+w+'，千位數字比萬位小 '+diff+'，百位數字是千位的一半，其餘各位是 0。'+nm()+'有 '+dItem+' 本圖書。這個密碼是多少？',
      a:String(w*10000+wMinusDiff*1000+half*100),trap:'圖書數量（'+dItem+'本）',
      s:['🔍 圖書數量是無關資訊。','萬位 = '+w,'千位 = '+w+' − '+diff+' = '+wMinusDiff,'百位 = '+wMinusDiff+' ÷ 2 = '+half,'密碼 = '+w+''+wMinusDiff+''+half+'00'],sc:3}}
],

'3N2':[
  ()=>{var a=ri(35,99),b=ri(6,9);return{d:1,tp:'calc',q:a+' × '+b+' = ?',a:String(a*b),s:['兩位×一位'],sc:2}},
  ()=>{var a=ri(100,350),b=ri(3,9);return{d:1,tp:'calc',q:a+' × '+b+' = ?',a:String(a*b),s:['三位×一位'],sc:2}},
  ()=>{var price=ri(25,60),n=ri(5,12),paid=1000;var total=price*n;var dStudents=ri(30,45),dDiscount='九折';return{d:2,tp:'work',q:'班上有'+dStudents+'位學生。'+nm()+'到'+pl()+'買書，書店正進行'+dDiscount+'優惠（未使用）。每本書$'+price+'，買了'+n+'本，付了$'+paid+'。找回多少元？',a:String(paid-total),trap:'學生數和折扣（未使用）',s:['🔍 學生數和折扣均無關','總: '+price+'×'+n+'='+total,'找回: '+paid+'−'+total+'='+(paid-total)],sc:3}},
  ()=>{var a=ri(15,35),b=ri(3,6),c=ri(8,20),d2=ri(2,4);var dE=ri(5,10),dEP=ri(2,4);return{d:2,tp:'work',q:'文具店有鉛筆每盒'+b+'枝(共'+a+'盒)、原子筆每盒'+d2+'枝(共'+c+'盒)，以及橡皮擦'+dE+'個(每個$'+dEP+')。鉛筆和原子筆共有多少枝？',a:String(a*b+c*d2),trap:'橡皮擦數量和價錢',s:['🔍 橡皮擦無關','鉛筆: '+a*b,'原子筆: '+c*d2,'共: '+(a*b+c*d2)],sc:3}},
  // HK context: 書展 with student/age trap
  ()=>{var price=ri(45,85),n=ri(4,9);var total=price*n;var dStudents=ri(30,40),dAge=ri(8,10);return{d:2,tp:'work',q:'三年級有 '+dStudents+' 位學生。'+nm()+'今年 '+dAge+' 歲，他去書展買了 '+n+' 本益智圖書，每本售 $'+price+'。他買圖書共花了多少元？',a:String(total),trap:'學生人數和年齡',s:['🔍 學生人數和年齡是干擾資訊。','總花費：'+price+' × '+n+' = '+total+' 元'],sc:2}},
  // HK context: 海洋公園 ticket + change
  ()=>{var a=ri(150,250),b=ri(4,7),c=ri(800,1200);return{d:3,tp:'work',q:'海洋公園成人門票每張售 $'+a+'。'+nm()+'買了 '+b+' 張成人門票，他付了 $'+c+'。應找回多少元？',a:String(c-a*b),s:['門票總花費：'+a+' × '+b+' = '+(a*b)+' 元','找回：'+c+' − '+(a*b)+' = '+(c-a*b)+' 元'],sc:3}},
  /* d:3 — distributive */
  ()=>{var a=ri(20,50),b=ri(20,50);var s2=a+b;return{d:3,tp:'calc',q:'用簡便方法計算：'+a+' × 99 + '+b+' × 99',a:String(s2*99),s:['提取公因數: ('+a+'+'+b+')×99 = '+s2+'×99 = '+s2*99],sc:3}}
],

'3N3':[
  ()=>{var dv=ri(4,9),q2=ri(30,70),r=ri(1,dv-1);var n=dv*q2+r;return{d:1,tp:'calc',q:n+' ÷ '+dv+' = ?',a:q2+'...'+r,s:['有餘數除法'],sc:2}},
  ()=>{var per=ri(6,12),total=ri(150,300);var full=Math.floor(total/per),rem=total%per;var dColor=pk(['紅色','藍色','綠色']),dFactory=ri(50,100);return{d:2,tp:'work',q:'工廠有'+dFactory+'名工人，生產了'+total+'件'+dColor+'玩具。每箱裝'+per+'件，至少需要多少個箱？',a:String(rem>0?full+1:full),trap:'工人數和顏色',s:['🔍 工人數和顏色無關',total+'÷'+per+'='+full+'...'+rem,'需'+(full+1)+'箱'],sc:3}},
  ()=>{var cap=ri(5,8),people=ri(20,45);var full=Math.floor(people/cap),rem=people%cap;var dLunch=ri(30,60),dDist=ri(10,30);return{d:3,tp:'work',q:people+'位同學帶$'+dLunch+'午餐費，乘'+pk(CTX.vehicle)+'到'+dDist+'公里外的農場。每輛最多坐'+cap+'人，最少需多少輛？',a:String(rem>0?full+1:full),trap:'午餐費和距離',s:['🔍 午餐費和距離無關',people+'÷'+cap+'='+full+'...'+rem],sc:3}},
  // 進一法: school trip bus
  ()=>{var cap=ri(6,8),people=ri(130,180);var full=Math.floor(people/cap),rem=people%cap;var dLunch=ri(30,60);return{d:3,tp:'work',q:'學校舉辦秋季旅行，有 '+people+' 位師生參加。每人需繳交 $'+dLunch+' 午膳費。如果每輛旅遊巴最多可載 '+cap+' 人，最少需要租多少輛旅遊巴才足夠？',a:String(rem>0?full+1:full),trap:'午膳費（$'+dLunch+'）',s:['🔍 午膳費是無關資訊。','計算：'+people+' ÷ '+cap+' = '+full+' ... '+rem,'剩下的 '+rem+' 人也需要一輛旅遊巴（進一法）。','最少需要：'+full+' + 1 = '+(full+1)+' 輛'],sc:3}},
  // 去尾法: cake buying
  ()=>{var cost=ri(6,9),money=ri(100,150);var max=Math.floor(money/cost),rem=money%cost;return{d:3,tp:'work',q:nm()+'有 $'+money+'，他想買每件售 $'+cost+' 的精美蛋糕。他最多可以買到多少件蛋糕？還剩下多少元？',a:max+','+rem,s:['計算：'+money+' ÷ '+cost+' = '+max+' ... '+rem,'餘下的 $'+rem+' 不夠買多一件（去尾法）。','最多買 '+max+' 件，剩 $'+rem+'。'],sc:3}},
  /* d:1 — template rotation */
  ()=>{
    var a=ri(2,9),b=ri(3,9),ans=a*b,it=_it();
    var t=[
      ()=>nm()+'每天吃'+a+it.u+it.n+'，'+b+'天共吃多少'+it.u+'？',
      ()=>_pl()+'有'+b+'排座位，每排'+a+'個。共有多少個座位？',
      ()=>'每盒有'+a+'塊餅乾，'+nm()+'買了'+b+'盒。共有多少塊？'
    ];
    return{d:1,tp:'work',q:pk(t)(),a:String(ans),s:[a+'×'+b+'='+ans],sc:2};
  },
  ()=>{
    var a=ri(2,9),b=ri(2,9),ans=a*b;
    var t=[
      ()=>nm()+'有'+b+'本相簿，每本可放'+a+'張相片。最多可放多少張？',
      ()=>_pl()+'每行種了'+a+'棵花，共'+b+'行。一共有多少棵？',
      ()=>'一包有'+a+'粒朱古力，'+nm()+'買了'+b+'包。一共有多少粒？'
    ];
    return{d:1,tp:'work',q:pk(t)(),a:String(ans),s:[a+'×'+b+'='+ans],sc:2};
  }
],

'3N4':[
  ()=>{var a=ri(15,40),b=ri(3,8),c=ri(20,60);return{d:1,tp:'calc',q:a+' × '+b+' + '+c+' = ?',a:String(a*b+c),s:['先乘後加'],sc:2}},
  ()=>{var a=ri(10,25),b=ri(5,15),c=ri(3,7);return{d:1,tp:'calc',q:'('+a+' + '+b+') × '+c+' = ?',a:String((a+b)*c),s:['先算括號'],sc:2}},
  ()=>{var n=ri(4,8),p1=ri(12,30),p2=ri(8,20),paid=500;var cost=n*p1+n*p2;var dRP=ri(15,25),dRN=ri(3,8);return{d:2,tp:'work',q:nm()+'買了'+n+'本中文書(每本$'+p1+')和'+n+'本英文書(每本$'+p2+')。店裏雨傘每把$'+dRP+'(共'+dRN+'把)，但未購買。付了$'+paid+'，找回多少元？',a:String(paid-cost),trap:'雨傘資料（未購買）',s:['🔍 雨傘無關','中: '+n*p1,'英: '+n*p2,'找回: '+(paid-cost)],sc:3}},
  ()=>{var a=ri(100,300),b=ri(3,8),c=ri(50,150);return{d:2,tp:'calc',q:a+' − '+c+' × '+b+' = ?',a:String(a-c*b),s:['先乘: '+c+'×'+b+'='+c*b,'再減: '+(a-c*b)],sc:2}},
  // 和差問題 with weight distractor
  ()=>{var a=ri(45,80),diff=ri(15,30),dWeight=ri(2,5);return{d:2,tp:'work',q:'果欄裏有 '+a+' 箱蘋果，橙比蘋果多 '+diff+' 箱。每箱水果重 '+dWeight+' 公斤。果欄裏共有蘋果和橙多少箱？',a:String(a+(a+diff)),trap:'水果重量（'+dWeight+'公斤）',s:['🔍 水果重量與箱數無關。','橙的數量：'+a+' + '+diff+' = '+(a+diff),'總箱數：'+a+' + '+(a+diff)+' = '+(a+(a+diff))],sc:3}},
  // 歸一法 (unitary method) with time-of-day trap
  ()=>{var qty1=ri(3,5),cost=qty1*ri(12,20),qty2=ri(6,9);var dTime=pk(['上午','下午']);return{d:3,tp:'work',q:dTime+'時段，超市的罐裝汽水特價，買 '+qty1+' 罐只需 $'+cost+'。如果'+nm()+'想買 '+qty2+' 罐，共需付多少元？',a:String((cost/qty1)*qty2),trap:'時間（'+dTime+'）',s:['🔍 購買時段是無關資訊。','先求一罐的價錢：'+cost+' ÷ '+qty1+' = '+(cost/qty1),'再求 '+qty2+' 罐的價錢：'+(cost/qty1)+' × '+qty2+' = '+((cost/qty1)*qty2)],sc:3}},
  /* d:3 — error finding */
  ()=>{var a=ri(5,15),b=ri(3,8),c=ri(10,20);var wrong=(a+b)*c;var right=a+b*c;return{d:3,tp:'work',q:nm()+'計算 '+a+' + '+b+' × '+c+' = '+wrong+'。他做對了嗎？如果不對，正確答案是什麼？',a:String(right),s:['❌ 應先算乘法','正確: '+a+'+'+b*c+' = '+right],sc:3}},
  /* d:2 — reverse / inverse */
  ()=>{
    var a=ri(2,9),b=ri(2,9),p=a*b,it=_it();
    return{d:2,tp:'work',
      q:nm()+'共有'+p+it.u+it.n+'，每份'+a+it.u+'。可以分成多少份？',
      a:String(b),s:[p+'÷'+a+'='+b],sc:3};
  }
],

'3N5':[
  ()=>{var den=pk([4,6,8]),a=ri(1,den-2),b=ri(1,den-a-1);return{d:1,tp:'calc',q:a+'/'+den+' + '+b+'/'+den+' = ?',a:fS(a+b,den),s:['同分母相加'],sc:2}},
  ()=>{var den=pk([3,5,6,8]),a=ri(Math.ceil(den*0.6),den+3),b=ri(1,den-1);return{d:1,tp:'calc',q:a+'/'+den+' − '+b+'/'+den+' = ?',a:fS(a-b,den),s:['同分母相減'],sc:2}},
  ()=>{var w1=ri(1,3),n1=ri(1,3),d1=pk([4,5,6]),w2=ri(1,2),n2=ri(1,d1-1);var imp1=w1*d1+n1,imp2=w2*d1+n2;return{d:2,tp:'calc',q:w1+'又'+n1+'/'+d1+' + '+w2+'又'+n2+'/'+d1+' = ?',a:fS(imp1+imp2,d1),s:['帶分數相加'],sc:2}},
  // d:2 — fraction of a group with color distractor
  ()=>{var den=pk([4,5,6]),num=ri(1,den-1);var total=den*ri(3,6);var dColor=pk(['紅','藍','黃']);return{d:2,tp:'work',q:'一盒波子有 '+total+' 粒，其中 '+num+'/'+den+' 是'+dColor+'色的，其餘是綠色的。'+dColor+'色波子有多少粒？',a:String((total/den)*num),s:['先把波子平分成 '+den+' 份：'+total+' ÷ '+den+' = '+(total/den),'佔了其中 '+num+' 份：'+(total/den)+' × '+num+' = '+((total/den)*num)+' 粒'],sc:3}},
  // d:3 — compare fractions: 1/4 vs 1/5 vs 2/4
  ()=>{return{d:3,tp:'mc',q:'媽媽買了一個大薄餅，哥哥吃了 1/4，弟弟吃了 1/5，姐姐吃了 2/4。誰吃的薄餅最少？',isMC:true,opts:[{l:'A',v:'哥哥',c:false},{l:'B',v:'弟弟',c:true},{l:'C',v:'姐姐',c:false}],a:'B',s:['比較 1/4 和 1/5：分子相同，分母越大，數值越小，所以 1/5 < 1/4。','姐姐吃 2/4 = 1/2，大於 1/4。最少是弟弟。'],sc:2}},
  /* d:3 — comparison */
  ()=>{var d=pk([6,8,10]);var a=ri(1,d-1),b=ri(1,d-1);while(a===b)b=ri(1,d-1);return{d:3,tp:'mc',q:a+'/'+d+' 和 '+b+'/'+d+' 哪個較大？',isMC:true,opts:[{l:'A',v:a+'/'+d,c:a>b},{l:'B',v:b+'/'+d,c:b>a},{l:'C',v:'一樣大',c:a===b}],a:a>b?'A':'B',s:['同分母比分子'],sc:2}}
],

/* ═══════════ 3N6 認識小數（十分位） ═══════════ */
'3N6':[
  // Read tenths (d:1)
  ()=>{const n=ri(1,9);const chars=['一','二','三','四','五','六','七','八','九'];
    return{d:1,tp:'fill',q:'0.'+n+' 讀作「____」，它等於'+n+'/____。',
      a:'零點'+chars[n-1]+',10',s:['0.'+n+'='+n+'/10'],sc:1}},
  // Add tenths (d:1)
  ()=>{const a=ri(1,5),b=ri(1,4);return{d:1,tp:'calc',q:a+'.0 + 0.'+b+' = ?',a:(a+b/10).toFixed(1),s:['整數+十分位小數'],sc:1}},
  // Subtract tenths (d:2)
  ()=>{const a=ri(3,9),b=ri(1,a-1);return{d:2,tp:'calc',q:a+'.0 − '+b+'.0 = ?',a:(a-b).toFixed(1),s:[a+'−'+b+'='+(a-b)],sc:1}},
  // Order tenths (d:2)
  ()=>{const nums=[ri(1,4),ri(5,8),ri(9,14)];const arr=nums.map(n=>n/10);const sorted=[...arr].sort((a,b)=>a-b);
    return{d:2,tp:'fill',q:'由小到大排列：'+arr.map(n=>n.toFixed(1)).join('、')+' → ____',
      a:sorted.map(n=>n.toFixed(1)).join(','),s:[sorted.map(n=>n.toFixed(1)).join(' < ')],sc:2}},
  // d:2 — cm/mm → decimal conversion
  ()=>{const a=ri(2,8),b=ri(1,9);return{d:2,tp:'calc',q:a+' 厘米 '+b+' 毫米 = ____ 厘米 (以小數作答)',a:a+'.'+b,s:['1 毫米 = 0.1 厘米'],sc:1}},
  // d:3 — decimal subtraction with age trap
  ()=>{const a=ri(15,25),a_dec=ri(1,9),b=ri(5,10),b_dec=ri(1,9);const dAge=ri(8,10);return{d:3,tp:'work',q:nm()+'今年 '+dAge+' 歲，他的儲蓄箱裏有 $'+a+'.'+a_dec+'，他買文具用去了 $'+b+'.'+b_dec+'。他還剩下多少元？',a:(a+a_dec/10-(b+b_dec/10)).toFixed(1),trap:'年齡（'+dAge+'歲）',s:['🔍 年齡是無關資訊。','小數點要對齊：'+a+'.'+a_dec+' − '+b+'.'+b_dec+' = '+(a+a_dec/10-(b+b_dec/10)).toFixed(1)],sc:3}}
],

'3M':[
  ()=>{var km=ri(2,6),m=ri(100,900),km2=ri(1,4),m2=ri(100,800);return{d:1,tp:'calc',q:km+'公里'+m+'米 + '+km2+'公里'+m2+'米 = ____米',a:String(km*1000+m+km2*1000+m2),s:['化成米再加'],sc:2}},
  ()=>{var items=[{n:fd(),w:ri(200,400)},{n:fd(),w:ri(150,300)},{n:fd(),w:ri(100,250)}];var total=items.reduce((s,i)=>s+i.w,0);var dBox=ri(50,100),dBoxC=pk(['紅色','藍色']);return{d:2,tp:'short',q:items.map(i=>i.n+'重'+i.w+'克').join('，')+'。放在'+dBoxC+'盒子(空盒重'+dBox+'克)。水果共重多少克？比1公斤多還是少？差多少克？',a:total+','+(total>=1000?'多':'少')+','+Math.abs(total-1000),trap:'盒子重量和顏色',s:['🔍 盒子無關','水果: '+total+'克','與1000克差: '+Math.abs(total-1000)],sc:3}},
  /* d:3 — unit conversion chain */
  ()=>{var km=ri(2,5),m=ri(200,800);var total_m=km*1000+m;return{d:3,tp:'fill',q:km+'公里'+m+'米 = ____米 = ____厘米',a:total_m+','+(total_m*100),s:[km+'×1000+'+m+'='+total_m,total_m+'×100='+(total_m*100)],sc:3}},
  // d:2 — capacity with water bottle color trap
  ()=>{var l=ri(1,3),ml=ri(200,800),pour=ri(150,300);var dColor=pk(['紅色','透明']);return{d:2,tp:'work',q:'一個'+dColor+'水樽內有 '+l+' 升 '+ml+' 毫升水。'+nm()+'喝了 '+pour+' 毫升後，水樽內還剩下水多少毫升？',a:String(l*1000+ml-pour),trap:'水樽顏色（'+dColor+'）',s:['🔍 水樽顏色是無關資訊。','先化為相同單位：'+l+' 升 '+ml+' 毫升 = '+(l*1000+ml)+' 毫升','剩下：'+(l*1000+ml)+' − '+pour+' = '+(l*1000+ml-pour)+' 毫升'],sc:3}},
  // d:3 — 24-hour clock cinema calculation
  ()=>{var hr=ri(13,15),min=pk([15,30,45]),dur=ri(45,80);
    var endMin=(min+dur)%60,endHr=hr+Math.floor((min+dur)/60);
    return{d:3,tp:'work',q:'一套電影在下午 '+(hr-12)+' 時 '+min+' 分開始播放，片長 '+dur+' 分鐘。電影在 24 小時報時制的什麼時間結束？',
      a:String(endHr).padStart(2,'0')+':'+String(endMin).padStart(2,'0'),
      s:['下午 '+(hr-12)+':'+min+' 即是 24 小時制的 '+hr+':'+min,'加上 '+dur+' 分鐘：'+min+' + '+dur+' = '+(min+dur)+' 分鐘。','進位：'+Math.floor((min+dur)/60)+' 小時 '+endMin+' 分鐘。','結束時間：'+endHr+':'+String(endMin).padStart(2,'0')],sc:3}}
],

'3S':[
  ()=>({d:2,tp:'mc',q:'以下哪個不一定是平行四邊形？',isMC:true,opts:[{l:'A',v:'正方形',c:false},{l:'B',v:'長方形',c:false},{l:'C',v:'梯形',c:true}],a:'C',s:['梯形只有一組平行邊'],sc:2}),
  ()=>{var n=ri(3,6);return{d:2,tp:'calc',fig:FIG.para(8,5),q:n+'個不同大小的平行四邊形的內角總和是多少度？',a:String(n*360),s:['每個360°, '+n+'×360='+n*360],sc:2}},
  ()=>({d:3,tp:'mc',q:'一個三角形三條邊長分別是3cm、4cm和8cm，這三角形存在嗎？',isMC:true,opts:[{l:'A',v:'存在',c:false},{l:'B',v:'不存在',c:true}],a:'B',s:['3+4=7 < 8，不符合三角不等式'],sc:3}),
  // 正方形 ⊂ 平行四邊形 relationship
  ()=>({d:1,tp:'mc',q:'以下哪一句句子是正確的？',isMC:true,opts:[{l:'A',v:'所有長方形都是正方形',c:false},{l:'B',v:'所有正方形都是平行四邊形',c:true},{l:'C',v:'所有梯形都是平行四邊形',c:false}],a:'B',s:['正方形具有兩組對邊平行的特性，因此它是特殊的平行四邊形。'],sc:2}),
  // Dynamic triangle inequality
  ()=>{var s1=ri(3,5),s2=ri(4,6),s3=s1+s2+ri(1,3);return{d:3,tp:'mc',q:nm()+'想用三根竹籤拼成一個三角形。這三根竹籤的長度分別是 '+s1+' cm、'+s2+' cm 和 '+s3+' cm。他能成功拼出三角形嗎？',isMC:true,opts:[{l:'A',v:'能',c:false},{l:'B',v:'不能',c:true}],a:'B',s:['三角不等式：三角形任意兩邊之和必須大於第三邊。',''+s1+' + '+s2+' = '+(s1+s2)+'，小於或等於第三邊 '+s3+'，所以拼不到。'],sc:3}}
],

'3D1':[
  ()=>{var items=[{l:'足球',v:ri(15,35)},{l:'籃球',v:ri(10,30)},{l:'排球',v:ri(12,28)},{l:'乒乓球',v:ri(20,40)}];var total=items.reduce((s,i)=>s+i.v,0);var mx=items.reduce((m,i)=>i.v>m.v?i:m,items[0]);var mn=items.reduce((m,i)=>i.v<m.v?i:m,items[0]);return{d:2,tp:'short',q:'根據棒形圖，四種球共有多少個？最多比最少多多少個？',fig:FIG.bars(items),a:total+','+(mx.v-mn.v),s:['總和: '+total,'差: '+(mx.v-mn.v)],sc:3}},
  ()=>{var items=[{l:'一月',v:ri(20,50)},{l:'二月',v:ri(15,45)},{l:'三月',v:ri(25,60)}];var avg=Math.round(items.reduce((s,i)=>s+i.v,0)/items.length);return{d:3,tp:'short',q:'棒形圖顯示三個月銷量。三個月平均銷量是多少？',fig:FIG.bars(items),a:String(avg),s:['總÷3='+avg],sc:3}},
  // d:2 — 雪糕 bar chart with 3 flavors
  ()=>{var items=[{l:'朱古力',v:ri(25,45)},{l:'雲呢拿',v:ri(10,30)},{l:'士多啤梨',v:ri(15,35)}];var mx=items.reduce((m,i)=>i.v>m.v?i:m,items[0]);var mn=items.reduce((m,i)=>i.v<m.v?i:m,items[0]);return{d:2,tp:'short',q:'棒形圖顯示雪糕店各款口味的銷量。最受歡迎的口味比最不受歡迎的多賣出多少杯？',fig:FIG.bars(items),a:String(mx.v-mn.v),s:['最多：'+mx.v+' 杯，最少：'+mn.v+' 杯','相差：'+mx.v+' − '+mn.v+' = '+(mx.v-mn.v)+' 杯'],sc:2}}
],

/* ═══════════ 3D2 折線圖(一) ═══════════ */
'3D2':[
  // Read line graph: find max (d:1)
  ()=>{const labels=['一月','二月','三月','四月','五月'];const data=labels.map(l=>({l,v:ri(10,40)}));
    const mx=data.reduce((m,d)=>d.v>m.v?d:m,data[0]);
    return{d:1,tp:'fill',q:'折線圖顯示每月借書數量。哪個月份最多？多少本？',
      fig:FIG.line(data),a:mx.l+','+mx.v,s:['最高點 = '+mx.l+': '+mx.v+'本'],sc:2}},
  // Total and average from line graph (d:2)
  ()=>{const labels=['週一','週二','週三','週四','週五'];const data=labels.map(l=>({l,v:ri(15,45)}));
    const total=data.reduce((s,d)=>s+d.v,0);
    return{d:2,tp:'work',q:'折線圖顯示五天賣出的麵包數量。五天共賣出多少個？平均每天多少個？',
      fig:FIG.line(data),a:total+','+(total/5%1===0?String(total/5):(total/5).toFixed(1)),
      s:['總: '+total,'平均: '+total+'÷5='+(total/5).toFixed(1)],sc:2}},
  // Difference between two points (d:2)
  ()=>{const labels=['一月','二月','三月','四月'];const data=labels.map(l=>({l,v:ri(10,40)}));
    const mx=data.reduce((m,d)=>d.v>m.v?d:m,data[0]);const mn=data.reduce((m,d)=>d.v<m.v?d:m,data[0]);
    return{d:2,tp:'fill',q:'折線圖顯示四個月銷量。最多比最少多____個。最多在____月。',
      fig:FIG.line(data),a:(mx.v-mn.v)+','+mx.l,s:['最多: '+mx.l+'='+mx.v,'最少: '+mn.l+'='+mn.v,'差: '+(mx.v-mn.v)],sc:2}},
  // d:3 — 漢堡包 line graph with staff trap
  ()=>{const labels=['星期一','星期二','星期三','星期四'];const data=labels.map(l=>({l,v:ri(20,60)}));
    const total=data.reduce((s,d)=>s+d.v,0);const dStaff=ri(3,5);
    return{d:3,tp:'work',q:'折線圖顯示一間快餐店連續四天的漢堡包銷量。店裏有 '+dStaff+' 名員工。這四天一共賣出多少個漢堡包？',
      fig:FIG.line(data),a:String(total),trap:'員工人數（'+dStaff+'名）',
      s:['🔍 員工人數是無關資訊。','將四天的數值相加：'+data.map(d=>d.v).join(' + ')+' = '+total],sc:3}}
]
};

// Topics: 3N1, 3N2, 3N3, 3N4, 3N5, 3N6, 3M, 3S, 3D1, 3D2
// Export: grade3 (object with 10 topic keys)
// Total generators: 58
