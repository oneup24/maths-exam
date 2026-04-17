/**
 * grade1.js — P1 generators aligned to EDB 2017 spec
 * Units: 1N1-1N4, 1M1-1M4, 1S1-1S3 (11 units)
 */
import { ri, pk, shuffle } from '../core.js';
import { nm, CTX } from '../config.js';

/* ── helpers ── */
const _nm2=()=>{let a=nm(),b=nm();while(b===a)b=nm();return[a,b];};
const days=['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
const months=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
const shapes3d=[
  {n:'圓柱體',flat:'圓形',canRoll:true,canStack:true},
  {n:'球體',flat:'圓形',canRoll:true,canStack:false},
  {n:'正方體',flat:'正方形',canRoll:false,canStack:true},
  {n:'長方體',flat:'長方形',canRoll:false,canStack:true},
  {n:'圓錐體',flat:'圓形',canRoll:true,canStack:false},
  {n:'角錐',flat:'三角形',canRoll:false,canStack:false}
];

export const grade1={

/* ═══════════ 1N1 20以內的數 (13.5h) ═══════════ */
'1N1':[
  // LP1: 認識1-20, 位值
  ()=>{const a=ri(11,20);return{d:1,tp:'fill',q:a+'的十位數字是____，個位數字是____。',a:Math.floor(a/10)+','+a%10,s:['十位='+Math.floor(a/10),'個位='+a%10],sc:1}},
  // LP2: 順數和倒數
  ()=>{const start=ri(3,12);return{d:1,tp:'fill',q:'順數：'+start+'、'+(start+1)+'、'+(start+2)+'、____、____',a:(start+3)+','+(start+4),s:['順數每次加1'],sc:1}},
  ()=>{const start=ri(15,20);return{d:1,tp:'fill',q:'倒數：'+start+'、'+(start-1)+'、'+(start-2)+'、____、____',a:(start-3)+','+(start-4),s:['倒數每次減1'],sc:1}},
  // LP4: 奇數和偶數
  ()=>{const a=ri(1,20);const isOdd=a%2===1;return{d:1,tp:'mc',q:a+'是奇數（單數）還是偶數（雙數）？',isMC:true,opts:[{l:'A',v:'奇數（單數）',c:isOdd},{l:'B',v:'偶數（雙數）',c:!isOdd}],a:isOdd?'A':'B',s:[a+(isOdd?'是奇數，不能被2整除':'是偶數，能被2整除')],sc:1}},
  // LP5: 分解
  ()=>{const total=ri(5,18);const a=ri(1,total-1);const b=total-a;return{d:1,tp:'fill',q:total+' = ____ + ____（把'+total+'分解成兩個數）',a:a+','+b,s:[total+'='+a+'+'+b],sc:1}},
  // LP5: 合成
  ()=>{const a=ri(2,9),b=ri(2,9);return{d:1,tp:'calc',q:a+' 和 '+b+' 合成是多少？',a:String(a+b),s:[a+'+'+b+'='+(a+b)],sc:1}},
  // LP1+LP3: 比較 + 排序 (d:2)
  ()=>{const arr=[ri(1,20),ri(1,20),ri(1,20)];while(arr[1]===arr[0])arr[1]=ri(1,20);while(arr[2]===arr[0]||arr[2]===arr[1])arr[2]=ri(1,20);const sorted=[...arr].sort((x,y)=>x-y);return{d:2,tp:'fill',q:'把 '+shuffle([...arr]).join('、')+' 由小到大排列：____',a:sorted.join(', '),s:['由小到大：'+sorted.join(' < ')],sc:2}},
  // d:2 — 序數
  ()=>{const fruits=['蘋果','橙','香蕉','芒果','草莓'];const line=shuffle(fruits).slice(0,4);return{d:2,tp:'fill',q:'排隊：'+line.join('、')+'。從左邊數起，第3個是____。',a:line[2],s:['從左數：1.'+line[0]+' 2.'+line[1]+' 3.'+line[2]],sc:1}},
  // d:3 — 逆向位值
  ()=>{const a=ri(11,19);const t=Math.floor(a/10),u=a%10;return{d:3,tp:'work',q:'一個兩位數，十位數字是'+t+'，個位數字比十位數字大'+(u-t)+'。這個數是多少？',a:String(a),s:['個位='+t+'+'+(u-t)+'='+u,'答案='+a],sc:2}}
],

/* ═══════════ 1N2 基本加法和減法 (13.5h) ═══════════ */
'1N2':[
  // LP2: 18以內加法口算
  ()=>{const a=ri(2,9),b=ri(2,9-Math.max(0,a-9));const s=a+b;if(s>18)return{d:1,tp:'calc',q:'6 + 5 = ?',a:'11',s:['6+5=11'],sc:1};return{d:1,tp:'calc',q:a+' + '+b+' = ?',a:String(s),s:[a+'+'+b+'='+s],sc:1}},
  // LP2: 18以內減法口算
  ()=>{const a=ri(5,18),b=ri(1,a);return{d:1,tp:'calc',q:a+' − '+b+' = ?',a:String(a-b),s:[a+'−'+b+'='+(a-b)],sc:1}},
  // LP3: 0的概念
  ()=>{const a=ri(3,15);const type=ri(0,2);const qs=[a+' + 0 = ?','0 + '+a+' = ?',a+' − 0 = ?'];return{d:1,tp:'calc',q:qs[type],a:String(a),s:['任何數加0或減0等於本身'],sc:1}},
  // LP5: 交換性質
  ()=>{const a=ri(2,8),b=ri(2,8);return{d:1,tp:'fill',q:a+' + '+b+' = '+b+' + ____',a:String(a),s:['加法交換：'+a+'+'+b+'='+b+'+'+a+'='+(a+b)],sc:1}},
  // LP4: 加減關係
  ()=>{const a=ri(3,9),b=ri(3,9);const c=a+b;return{d:2,tp:'fill',q:'如果 '+a+' + '+b+' = '+c+'，那麼 '+c+' − '+b+' = ____',a:String(a),s:['加減互逆：'+c+'−'+b+'='+a],sc:1}},
  // d:2 word problem (within 18)
  ()=>{const a=ri(5,12),b=ri(2,Math.min(6,18-a));const n=nm();return{d:2,tp:'work',q:n+'有'+a+'顆糖果，媽媽再給他'+b+'顆。'+n+'現在共有多少顆糖果？',a:String(a+b),s:[a+'+'+b+'='+(a+b)],sc:2}},
  // d:2 subtraction word problem (within 18)
  ()=>{const total=ri(10,18),eat=ri(2,total-2);const n=nm();return{d:2,tp:'work',q:n+'有'+total+'粒波子，給了朋友'+eat+'粒。還剩多少粒？',a:String(total-eat),s:[total+'−'+eat+'='+(total-eat)],sc:2}},
  // d:3 — inverse
  ()=>{const ans=ri(10,17),add=ri(2,5);const orig=ans-add;return{d:3,tp:'work',q:nm()+'有一些貼紙。得到'+add+'張後共有'+ans+'張。他原來有多少張？',a:String(orig),s:[ans+'−'+add+'='+orig],sc:2}}
],

/* ═══════════ 1N3 100以內的數 (6h) ═══════════ */
'1N3':[
  // LP2: 十位個位
  ()=>{const a=ri(21,99);return{d:1,tp:'fill',q:a+'的十位數字是____，個位數字是____。',a:Math.floor(a/10)+','+a%10,s:['十位='+Math.floor(a/10),'個位='+a%10],sc:1}},
  // LP4: skip counting by 2s
  ()=>{const start=ri(2,10)*2;return{d:1,tp:'fill',q:'每2個一數：'+start+'、'+(start+2)+'、'+(start+4)+'、____、____',a:(start+6)+','+(start+8),s:['每次加2'],sc:1}},
  // LP4: skip counting by 5s
  ()=>{const start=ri(1,6)*5;return{d:1,tp:'fill',q:'每5個一數：'+start+'、'+(start+5)+'、'+(start+10)+'、____、____',a:(start+15)+','+(start+20),s:['每次加5'],sc:1}},
  // LP4: skip counting by 10s
  ()=>{const start=ri(1,5)*10;return{d:1,tp:'fill',q:'每10個一數：'+start+'、'+(start+10)+'、'+(start+20)+'、____、____',a:(start+30)+','+(start+40),s:['每次加10'],sc:1}},
  // LP3: ordering
  ()=>{const arr=[ri(21,50),ri(51,80),ri(80,99)];const sorted=[...arr].sort((x,y)=>x-y);return{d:1,tp:'fill',q:'由小到大排列：'+shuffle([...arr]).join('、')+' → ____',a:sorted.join(', '),s:[sorted.join(' < ')],sc:2}},
  // LP5: estimation (d:2)
  ()=>{const tens=ri(3,8);const exact=tens*10+ri(0,9);const opts=[tens*10-10,tens*10,tens*10+10];return{d:2,tp:'mc',q:'課室裏大約有'+exact+'本圖書。最接近哪個數？',isMC:true,opts:opts.map((v,i)=>({l:String.fromCharCode(65+i),v:String(v),c:v===tens*10})),a:String.fromCharCode(65+opts.indexOf(tens*10)),s:[exact+'最接近'+tens*10],sc:1}},
  // d:3 — error check
  ()=>{const a=ri(35,65),b=ri(20,35);const wrong=a+b+10;return{d:3,tp:'work',q:nm()+'計算 '+a+' + '+b+' = '+wrong+'。答案對嗎？正確答案是什麼？',a:String(a+b),s:['❌ '+wrong+' 是錯的','✅ '+a+'+'+b+'='+(a+b)],sc:2}}
],

/* ═══════════ 1N4 加法和減法(一) (13h) ═══════════ */
'1N4':[
  // LP1: 兩數加法 (≤2位, 含進位)
  ()=>{const a=ri(15,55),b=ri(15,99-a);return{d:1,tp:'calc',q:a+' + '+b+' = ?',a:String(a+b),s:[a+'+'+b+'='+(a+b)],sc:2}},
  // LP4: 兩數減法 (≤2位, 不退位)
  ()=>{const t1=ri(3,9),t2=ri(1,t1);const u1=ri(3,9),u2=ri(0,u1);const a=t1*10+u1,b=t2*10+u2;return{d:1,tp:'calc',q:a+' − '+b+' = ?',a:String(a-b),s:[a+'−'+b+'='+(a-b)],sc:2}},
  // LP2: 三數加法
  ()=>{const a=ri(10,30),b=ri(10,30),c=ri(10,99-a-b);return{d:1,tp:'calc',q:a+' + '+b+' + '+c+' = ?',a:String(a+b+c),s:[a+'+'+b+'='+(a+b),(a+b)+'+'+c+'='+(a+b+c)],sc:2}},
  // LP5: vertical format awareness
  ()=>{const a=ri(24,58),b=ri(11,30);return{d:1,tp:'fill',q:'用直式計算：'+a+' + '+b+' = ____',a:String(a+b),s:['個位: '+(a%10)+'+'+b%10+'='+(a%10+b%10>9?'進位 ':'')+(a%10+b%10),'十位: '+Math.floor(a/10)+'+'+Math.floor(b/10)+'='+(Math.floor(a/10)+Math.floor(b/10))],sc:2}},
  // LP3: 結合性質 (d:2)
  ()=>{const a=ri(3,9),b=ri(10,20),c=ri(1,5);return{d:2,tp:'fill',q:a+' + '+b+' + '+c+' 可以先計算 '+b+' + '+c+' = ____，再計算 '+a+' + ____ = ____',a:(b+c)+','+(b+c)+','+(a+b+c),s:['結合性質：先算容易的',b+'+'+c+'='+(b+c),a+'+'+(b+c)+'='+(a+b+c)],sc:2}},
  // LP6: word problem (d:2) — NO multiplication
  ()=>{const [n1,n2]=_nm2();const a=ri(20,45),b=ri(15,35);return{d:2,tp:'work',q:n1+'有'+a+'張貼紙，'+n2+'有'+b+'張貼紙。兩人共有多少張？',a:String(a+b),s:[a+'+'+b+'='+(a+b)],sc:2}},
  ()=>{const n=nm();const a=ri(30,60),give=ri(10,a-10);return{d:2,tp:'work',q:n+'有'+a+'顆糖果，送了'+give+'顆給同學。'+n+'還有多少顆？',a:String(a-give),s:[a+'−'+give+'='+(a-give)],sc:2}},
  // d:3 — multi-step (still no multiplication)
  ()=>{const n=nm();const start=ri(30,55),lose=ri(10,20),gain=ri(5,15);return{d:3,tp:'work',q:n+'有'+start+'粒波子。先給了朋友'+lose+'粒，然後又贏回'+gain+'粒。現在有多少粒？',a:String(start-lose+gain),s:[start+'−'+lose+'='+(start-lose),(start-lose)+'+'+gain+'='+(start-lose+gain)],sc:3}}
],

/* ═══════════ 1M1 長度和距離(一) (3.5h) ═══════════ */
'1M1':[
  ()=>{const items=[{n:'鉛筆',l:ri(8,18)},{n:'原子筆',l:ri(8,18)},{n:'蠟筆',l:ri(8,18)}];while(items[1].l===items[0].l)items[1].l=ri(8,18);const sorted=[...items].sort((a,b)=>a.l-b.l);return{d:1,tp:'fill',q:items.map(i=>i.n+'長'+i.l+'厘米').join('，')+'。\n最長的是____，最短的是____。',a:sorted[2].n+','+sorted[0].n,s:['比較: '+sorted.map(i=>i.n+i.l+'cm').join(' < ')],sc:2}},
  ()=>{const obj=pk(['課本','橡皮擦','鉛筆盒']);const clips=ri(3,8);return{d:2,tp:'fill',q:'用萬字夾量度'+obj+'的長度，大約是 ____ 個萬字夾。（答案：'+clips+'）',a:String(clips),s:['用自訂單位量度'],sc:1}},
  ()=>{const a=ri(5,15);let b=ri(5,15);while(b===a)b=ri(5,15);return{d:2,tp:'mc',q:'甲繩長'+a+'個手掌，乙繩長'+b+'個手掌。哪條較長？',isMC:true,opts:[{l:'A',v:'甲繩',c:a>b},{l:'B',v:'乙繩',c:b>a},{l:'C',v:'一樣長',c:a===b}],a:a>b?'A':b>a?'B':'C',s:[a+(a>b?'>':a<b?'<':'=')+b],sc:1}}
],

/* ═══════════ 1M2 貨幣(一) (6h) ═══════════ */
'1M2':[
  // coin counting
  ()=>{const n5=ri(0,1),n2=ri(1,3),n1=ri(0,4);const total=n5*5+n2*2+n1*1;return{d:1,tp:'calc',q:(n5?n5+'個$5、':'')+(n2+'個$2')+(n1?'、'+n1+'個$1':'')+' 硬幣，共多少元？',a:String(total),s:[(n5?'$5×'+n5+'='+n5*5+' ':'')+'$2×'+n2+'='+n2*2+(n1?' $1×'+n1+'='+n1:''),'共 $'+total],sc:1}},
  // read price
  ()=>{const dollars=ri(2,9),cents=ri(0,1)?50:0;const price=cents?dollars+'.50':dollars+'.00';return{d:1,tp:'fill',q:'價錢牌上寫着 $'+price+'，讀作「____」。',a:dollars+'元'+(cents?'五角':''),s:['$'+price+' = '+dollars+'元'+(cents?'五角':'')],sc:1}},
  // coin exchange (d:2)
  ()=>{const target=ri(5,10);return{d:2,tp:'fill',q:'要換出 $'+target+'，需要 ____ 個 $2 硬幣和 ____ 個 $1 硬幣。',a:Math.floor(target/2)+','+(target%2),s:['$2×'+Math.floor(target/2)+'='+Math.floor(target/2)*2+(target%2?' + $1='+target:'')],sc:2}},
  // d:2 — counting mixed
  ()=>{const tens=ri(0,0),fives=ri(1,1),twos=ri(1,2),ones=ri(1,3);const total=tens*10+fives*5+twos*2+ones*1;if(total>10){return{d:2,tp:'calc',q:'2個$2 和 1個$1，共多少元？',a:'5',s:['2×2+1=5'],sc:1}}return{d:2,tp:'calc',q:fives+'個$5、'+twos+'個$2、'+ones+'個$1，共多少元？',a:String(total),s:['逐一相加 = $'+total],sc:1}}
],

/* ═══════════ 1M3 長度和距離(二) (4h) ═══════════ */
'1M3':[
  ()=>{const a=ri(5,25),b=ri(5,25);return{d:1,tp:'mc',q:'鉛筆A長'+a+' cm，鉛筆B長'+b+' cm。哪枝較長？',isMC:true,opts:[{l:'A',v:'鉛筆A',c:a>b},{l:'B',v:'鉛筆B',c:b>a},{l:'C',v:'一樣長',c:a===b}],a:a>b?'A':b>a?'B':'C',s:[a+'cm'+(a>b?' > ':a<b?' < ':' = ')+b+'cm'],sc:1}},
  ()=>{const total=ri(15,30),cut=ri(5,total-5);return{d:2,tp:'calc',q:'繩子長'+total+' cm，剪去'+cut+' cm，還剩多少 cm？',a:String(total-cut),s:[total+'−'+cut+'='+(total-cut)+' cm'],sc:1}},
  ()=>{const actual=ri(8,20);const guess=actual+pk([-3,-2,-1,1,2,3]);return{d:2,tp:'work',q:nm()+'估計一本書長'+guess+' cm，量度後發現實際是'+actual+' cm。他估計得準確嗎？差多少？',a:'差'+Math.abs(guess-actual)+' cm',s:['|'+guess+'−'+actual+'| = '+Math.abs(guess-actual)+' cm'],sc:2}}
],

/* ═══════════ 1M4 時間(一) (6h) ═══════════ */
'1M4':[
  // LP1: 報時
  ()=>{const h=ri(1,12);const half=ri(0,1);return{d:1,tp:'fill',q:'時鐘的時針指向'+h+'，分針指向'+(half?6:12)+'。現在是____。',a:h+'時'+(half?'半':''),s:[h+'時'+(half?'半（30分）':'正')],sc:1}},
  // LP5: 一星期
  ()=>{const i=ri(0,5);return{d:1,tp:'fill',q:days[i]+'的下一天是____。',a:days[i+1],s:[days[i]+'→'+days[i+1]],sc:1}},
  // LP6: 月份
  ()=>{const m=ri(0,10);return{d:1,tp:'fill',q:months[m]+'的下一個月是____。',a:months[m+1],s:[months[m]+'→'+months[m+1]],sc:1}},
  // LP3: 時間間隔 (d:2)
  ()=>{const start=ri(1,9),dur=ri(1,3);return{d:2,tp:'fill',q:'上午'+start+'時開始上課，上了'+dur+'小時。下課時間是上午____時。',a:String(start+dur),s:[start+'+'+dur+'='+(start+dur)+'時'],sc:1}},
  // LP7: calendar (d:2)
  ()=>{const day=ri(1,5);const target=day+ri(3,7);return{d:2,tp:'calc',q:months[ri(0,11)]+'的第'+day+'日是星期一。第'+target+'日是'+days[(target-day)%7]+'。從第'+day+'日到第'+target+'日共有多少天？',a:String(target-day),s:[target+'−'+day+'='+(target-day)+'天'],sc:2}},
  // d:3
  ()=>{const now=ri(3,8),hrs=ri(1,3);return{d:3,tp:'fill',q:'現在是下午'+now+'時。'+hrs+'小時前是下午____時，'+hrs+'小時後是下午____時。',a:(now-hrs)+','+(now+hrs),s:['前: '+now+'−'+hrs+'='+(now-hrs),'後: '+now+'+'+hrs+'='+(now+hrs)],sc:2}}
],

/* ═══════════ 1S1 立體圖形(一) (6h) ═══════════ */
'1S1':[
  ()=>{return{d:1,tp:'mc',q:'哪一種立體圖形可以滾動又可以堆疊？',isMC:true,opts:[{l:'A',v:'球體',c:false},{l:'B',v:'圓柱體',c:true},{l:'C',v:'圓錐體',c:false}],a:'B',s:['圓柱體可以滾動也可以堆疊'],sc:1}},
  ()=>{const s=pk(shapes3d.filter(x=>!x.canRoll));return{d:1,tp:'mc',q:s.n+'可以滾動嗎？',isMC:true,opts:[{l:'A',v:'可以',c:false},{l:'B',v:'不可以',c:true}],a:'B',s:[s.n+'不能滾動'],sc:1}},
  ()=>{return{d:2,tp:'mc',q:'足球的形狀最像哪種立體圖形？',isMC:true,opts:[{l:'A',v:'圓柱體',c:false},{l:'B',v:'球體',c:true},{l:'C',v:'圓錐體',c:false}],a:'B',s:['足球是球體'],sc:1}},
  ()=>{const items=[{n:'飲品罐',ans:'圓柱體'},{n:'骰子',ans:'正方體'},{n:'雪糕筒',ans:'圓錐體'},{n:'鞋盒',ans:'長方體'},{n:'乒乓球',ans:'球體'},{n:'金字塔模型',ans:'角錐'}];const item=pk(items);return{d:2,tp:'fill',q:item.n+'的形狀像____。',a:item.ans,s:[item.n+' → '+item.ans],sc:1}}
],

/* ═══════════ 1S2 平面圖形 (10h) ═══════════ */
'1S2':[
  // LP1: 直線和曲線
  ()=>{const s=pk(['三角形','四邊形','五邊形','六邊形']);return{d:1,tp:'mc',q:s+'的邊是直線還是曲線？',isMC:true,opts:[{l:'A',v:'直線',c:true},{l:'B',v:'曲線',c:false}],a:'A',s:[s+'的邊是直線'],sc:1}},
  ()=>{return{d:1,tp:'mc',q:'圓形的邊是直線還是曲線？',isMC:true,opts:[{l:'A',v:'直線',c:false},{l:'B',v:'曲線',c:true}],a:'B',s:['圓形的邊是曲線，沒有直的邊'],sc:1}},
  ()=>{const shapes=[{n:'三角形',e:3,c:3},{n:'四邊形',e:4,c:4},{n:'五邊形',e:5,c:5},{n:'六邊形',e:6,c:6}];const s=pk(shapes);return{d:1,tp:'fill',q:s.n+'有____條邊和____個角。',a:s.e+','+s.c,s:[s.n+': '+s.e+'邊, '+s.c+'角'],sc:1}},
  ()=>{return{d:1,tp:'mc',q:'圓形有直的邊嗎？',isMC:true,opts:[{l:'A',v:'有',c:false},{l:'B',v:'沒有',c:true}],a:'B',s:['圓形的邊是曲線，沒有直的邊'],sc:1}},
  ()=>{const t=ri(2,5),sq=ri(1,4),r=ri(1,3);return{d:2,tp:'work',q:'圖中有'+t+'個三角形、'+sq+'個正方形和'+r+'個長方形。共有多少個圖形？',a:String(t+sq+r),s:[t+'+'+sq+'+'+r+'='+(t+sq+r)],sc:2}},
  ()=>{return{d:3,tp:'mc',q:'一個圖形有4條等長的邊和4個直角。它是什麼形狀？',isMC:true,opts:[{l:'A',v:'長方形',c:false},{l:'B',v:'正方形',c:true},{l:'C',v:'菱形',c:false}],a:'B',s:['四邊等長 + 四直角 = 正方形'],sc:2}}
],

/* ═══════════ 1S3 方向和位置(一) (3.5h) ═══════════ */
'1S3':[
  ()=>{const [a,b]=_nm2();const pos=pk(['上面','下面','左邊','右邊','前面','後面']);return{d:1,tp:'fill',q:a+'坐在'+b+'的'+pos+'。'+b+'坐在'+a+'的____。',a:({上面:'下面',下面:'上面',左邊:'右邊',右邊:'左邊',前面:'後面',後面:'前面'})[pos],s:['方向相反'],sc:1}},
  ()=>{const items=['蘋果','橙','香蕉','芒果','草莓'];const line=items.slice(0,5);return{d:1,tp:'fill',q:'從左到右排列：'+line.join('、')+'。\n'+line[2]+'的左邊是____，右邊是____。',a:line[1]+','+line[3],s:['左邊='+line[1],'右邊='+line[3]],sc:2}},
  ()=>{const [a,b,c]=shuffle(CTX.names.slice(0,3));return{d:2,tp:'fill',q:a+'站在'+b+'和'+c+'之間。從左到右是：'+b+'、'+a+'、'+c+'。\n'+a+'的左邊是____。',a:b,s:[b+' 在 '+a+' 的左邊'],sc:1}}
]
};