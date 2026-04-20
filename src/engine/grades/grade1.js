/**
 * grade1.js — P1 question generators (1N1–1S)
 * Extracted from engine.js
 * Enriched with Hong Kong context, distractors (traps), and logical reasoning questions.
 */

import { ri, pk, shuffle } from '../core.js';
import { nm, pl, fd, CTX } from '../config.js';

export const grade1 = {
'1N1':[ // 20以內的數 (Numbers up to 20)
  // d:1 - Basic Place Value & Counting
  ()=>{var a=ri(11,19);return{d:1,tp:'fill',q:a+' 的十位是____，個位是____。',a:Math.floor(a/10)+','+a%10,s:['位值：十位是左邊的數字，個位是右邊的數字。'],sc:1}},
  ()=>{var a=ri(3,7);var list=[];for(var i=0;i<a;i++)list.push(ri(1,20));list=[...new Set(list)];list.sort((x,y)=>x-y);return{d:1,tp:'fill',q:'把以下數字由小到大排列：'+shuffle(list).join('、')+'\n答：____',a:list.join(','),s:['比較大小：先看十位，再看個位。'],sc:2}},
  ()=>{var a=ri(12,18);return{d:1,tp:'calc',q:'與 '+a+' 相鄰的兩個數是 ____ 和 ____。(由小到大填寫)',a:(a-1)+','+(a+1),s:['相鄰的數即是比它小 1 和大 1 的數。'],sc:1}},
  // d:2 - Patterns & Logic with traps
  ()=>{var start=ri(2,5),step=ri(2,3);var seq=[];for(var i=0;i<5;i++)seq.push(start+step*i);var dItem=pk(['蘋果','橙','香蕉']);return{d:2,tp:'fill',q:nm()+'在排列數字卡，他吃了 '+ri(1,3)+' 個'+dItem+'。找出卡片的規律並填上空格：'+seq[0]+'、'+seq[1]+'、'+seq[2]+'、____、____',a:seq[3]+','+seq[4],trap:'吃的'+dItem+'數量',s:['🔍 吃的東西和數字規律無關。','規律是每次加 '+step+'。'],sc:2}},
  ()=>{var a=ri(2,8);return{d:2,tp:'calc',q:'10 和 20 之間，個位數字是 '+a+' 的數是多少？',a:'1'+a,s:['10 和 20 之間的數，十位必定是 1。個位是 '+a+'，所以是 1'+a+'。'],sc:1}},
  // d:3 - Reverse & Word puzzles
  ()=>{var a=ri(11,19);var t=Math.floor(a/10),u=a%10;var dToy=ri(3,6);return{d:3,tp:'work',q:'密碼是一個兩位數。十位數字是 '+t+'，個位數字比十位數字大 '+(u-t)+'。'+nm()+'有 '+dToy+' 架玩具車。這個密碼是多少？',a:String(a),trap:'玩具車數量（'+dToy+'）',s:['🔍 玩具車數量是干擾資訊。','十位是 '+t+'。','個位是 '+t+' + '+(u-t)+' = '+u+'。','密碼是 '+a+'。'],sc:2}},
  ()=>{var total=ri(12,18);if(total%2!==0)total++;var half=total/2;return{d:3,tp:'calc',q:'兩個相同的數字加起來是 '+total+'。這個數字是多少？',a:String(half),s:[half+' + '+half+' = '+total+'。'],sc:2}}
],

'1N2':[ // 基本加減法 (Basic Addition and Subtraction up to 18)
  // d:1 - Basic Calculation
  ()=>{var a=ri(4,9),b=ri(2,9-a+5),c=ri(1,5);return{d:1,tp:'calc',q:a+' + '+b+' − '+c+' = ?',a:String(a+b-c),s:['由左至右計算：先算 '+a+'+'+b+'='+(a+b)+'，再算 '+(a+b)+'−'+c+'='+(a+b-c)+'。'],sc:2}},
  ()=>{var a=ri(11,18),b=ri(2,a-1);return{d:1,tp:'calc',q:a+' − '+b+' = ?',a:String(a-b),s:[a+'−'+b+'='+(a-b)],sc:1}},
  // d:2 - Word Problems with traps
  ()=>{var total=ri(12,18),eat=ri(3,6),add=ri(2,5);var dAge=ri(6,9);return{d:2,tp:'work',q:'餐桌上有 '+total+' 件'+fd()+'。'+nm()+'今年 '+dAge+' 歲，他吃了 '+eat+' 件後，媽媽又放回 '+add+' 件。現在有幾件'+fd()+'？',a:String(total-eat+add),trap:'年齡（'+dAge+'歲）',s:['🔍 年齡是無關資訊。','吃了減少：'+total+' − '+eat+' = '+(total-eat),'放回增加：'+(total-eat)+' + '+add+' = '+(total-eat+add)],sc:2}},
  ()=>{var a=ri(5,9),b=ri(4,8),dItem=ri(3,7);return{d:2,tp:'work',q:nm()+'有 '+a+' 粒紅色波子和 '+b+' 粒藍色波子。他的書包裏還有 '+dItem+' 本圖書。他共有波子多少粒？',a:String(a+b),trap:'圖書數量（'+dItem+'本）',s:['🔍 圖書數量與波子無關。','總數：'+a+' + '+b+' = '+(a+b)],sc:2}},
  ()=>{var a=ri(10,18),b=ri(3,a-2),dTime=ri(2,5);return{d:2,tp:'work',q:'文具店有 '+a+' 枝鉛筆，賣出了 '+b+' 枝。下午 '+dTime+' 時，店長點算存貨。還剩下鉛筆多少枝？',a:String(a-b),trap:'時間（下午'+dTime+'時）',s:['🔍 下午幾時點算與數量無關。','剩下：'+a+' − '+b+' = '+(a-b)],sc:2}},
  // d:3 - Inverse & Logical Reasoning with traps
  ()=>{var ans=ri(10,17),add=ri(3,7),orig=ans-add;var dColor=pk(['紅色','黃色','綠色']);return{d:3,tp:'work',q:nm()+'原本有一些貼紙。老師給了他 '+add+' 張'+dColor+'貼紙後，他現在有 '+ans+' 張。他原本有貼紙多少張？',a:String(orig),trap:'貼紙顏色（'+dColor+'）',s:['🔍 顏色不影響數量。','逆向思考，現在的數量減去得到的數量，就是原本的數量。','原本：'+ans+' − '+add+' = '+orig],sc:2}},
  ()=>{var a=ri(8,15),diff=ri(2,5);var dClass=ri(1,3);return{d:3,tp:'work',q:'一年級 '+dClass+' 班的課室裏有男生 '+a+' 人，女生比男生少 '+diff+' 人。課室裏共有學生多少人？',a:String(a+(a-diff)),trap:'班級名稱（'+dClass+'班）',s:['🔍 班級名稱是無關資訊。','先計女生人數：'+a+' − '+diff+' = '+(a-diff),'再計總人數：'+a+' + '+(a-diff)+' = '+(a+(a-diff))],sc:3}}
],

'1N3':[ // 100以內的數 (Numbers up to 100)
  // d:1 - Ordering & Counting
  ()=>{var arr=[ri(20,95),ri(20,95),ri(20,95)];while(arr[1]===arr[0])arr[1]=ri(20,95);while(arr[2]===arr[0]||arr[2]===arr[1])arr[2]=ri(20,95);var sorted=[...arr].sort((x,y)=>y-x);return{d:1,tp:'fill',q:'把 '+arr.join('、')+' 由大到小排列：____',a:sorted.join(','),s:['比較大小：先看十位，再看個位。注意是由大到小。'],sc:2}},
  ()=>{var start=ri(30,80),step=10;return{d:1,tp:'fill',q:'十個十個地數：'+start+'、'+(start+step)+'、____、____',a:(start+step*2)+','+(start+step*3),s:['每次加 10。'],sc:1}},
  // d:2 - Word Problems with traps
  ()=>{var a=ri(40,70),go=ri(10,25),come=ri(5,20),dWeather=pk(['晴天','陰天','下雨天']);return{d:2,tp:'work',q:'操場上有 '+a+' 個學生。今天是'+dWeather+'，有 '+go+' 個學生回課室了，後來又有 '+come+' 個學生來到操場。現在操場上有多少個學生？',a:String(a-go+come),trap:'天氣（'+dWeather+'）',s:['🔍 天氣是無關資訊。','回去減少：'+a+' − '+go+' = '+(a-go),'來到增加：'+(a-go)+' + '+come+' = '+(a-go+come)],sc:2}},
  ()=>{var a=ri(50,90),b=ri(20,a-10),dPrice=ri(10,20);return{d:2,tp:'work',q:'圖書館有 '+a+' 本中文書和 '+b+' 本英文書。每本書的平均價錢是 '+dPrice+' 元。圖書館裏中文書比英文書多幾本？',a:String(a-b),trap:'書本價錢（'+dPrice+'元）',s:['🔍 書本價錢與數量差異無關。','相差：'+a+' − '+b+' = '+(a-b)],sc:2}},
  // d:3 - Error identification & Logic
  ()=>{var a=ri(35,65),b=ri(20,30);var wrong=a+b-10;return{d:3,tp:'mc',q:nm()+'計算 '+a+' + '+b+' 的結果是 '+wrong+'。他的答案正確嗎？為甚麼？',isMC:true,opts:[{l:'A',v:'正確',c:false},{l:'B',v:'不正確，應該是 '+(a+b),c:true},{l:'C',v:'不正確，應該是 '+(a+b+10),c:false}],a:'B',s:['正確答案是 '+a+' + '+b+' = '+(a+b)+'。'],sc:2}},
  ()=>{var tens=ri(5,9),units=ri(1,4);var val=tens*10+units;return{d:3,tp:'calc',q:'一個兩位數，十位數字是 '+tens+'，個位數字比十位數字小 '+(tens-units)+'。這個數的下一個雙數(偶數)是多少？',a:val%2===0?String(val+2):String(val+1),s:['十位是 '+tens+'，個位是 '+tens+' − '+(tens-units)+' = '+units+'。這個數是 '+val+'。','比 '+val+' 大的下一個雙數是 '+(val%2===0?(val+2):(val+1))+'。'],sc:3}}
],

'1N4':[ // 加法和減法(一) (Addition and Subtraction I - up to 100)
  // d:1 - Basic Calculation
  ()=>{var a=ri(20,60),b=ri(15,35),c=ri(10,25);return{d:1,tp:'calc',q:a+' + '+b+' − '+c+' = ?',a:String(a+b-c),s:['由左至右：'+a+'+'+b+'='+(a+b)+'，再算 '+(a+b)+'−'+c+'='+(a+b-c)],sc:2}},
  ()=>{var a=ri(40,80),b=ri(10,a-10);return{d:1,tp:'calc',q:a+' − '+b+' = ?',a:String(a-b),s:[a+'−'+b+'='+(a-b)],sc:1}},
  // d:2 - Word Problems with Traps
  ()=>{var price=ri(12,25),n=ri(2,3),paid=100;var total=price*n;var dOpen=ri(8,11);return{d:2,tp:'work',q:pl()+'每天早上 '+dOpen+' 時營業。一件玩具賣 '+price+' 元，'+nm()+'買了 '+n+' 件，付了 '+paid+' 元。應找回多少元？',a:String(paid-total),trap:'營業時間（'+dOpen+'時）',s:['🔍 營業時間是無關資訊。','玩具總價錢：'+price+(n===3?' + '+price+' + '+price:' + '+price)+' = '+total,'找回：'+paid+' − '+total+' = '+(paid-total)],sc:3}},
  ()=>{var a=ri(30,50),b=ri(20,40),give=ri(5,15);var dColor=pk(['紅色的','藍色的','綠色的']);return{d:2,tp:'work',q:'哥哥有 '+a+' 張印花，弟弟有 '+b+' 張'+dColor+'印花。哥哥給了弟弟 '+give+' 張後，哥哥現在有印花多少張？',a:String(a-give),trap:'弟弟的印花數量和顏色',s:['🔍 題目只問哥哥現在的數量，弟弟原本的數量和顏色是干擾資訊。','哥哥現在：'+a+' − '+give+' = '+(a-give)],sc:2}},
  // d:3 - Multi-step & Logical
  ()=>{var total=ri(30,50),diff=ri(4,10);if((total-diff)%2!==0)total++;var small=(total-diff)/2,big=small+diff;return{d:3,tp:'work',q:'紅波和白波共有 '+total+' 個。已知紅波比白波多 '+diff+' 個。紅波有多少個？',a:String(big),s:['這是一道「和差問題」。','方法：(總數 + 相差) ÷ 2 = 較大的數','紅波數量：('+total+' + '+diff+') ÷ 2 = '+big],sc:3}},
  ()=>{var a=ri(50,80),c=ri(10,20);return{d:3,tp:'calc',q:'有三個數，最大的是 '+a+'，最小的是 '+c+'。把它們三個加起來是 100。中間的那個數是多少？',a:String(100-a-c),s:['三個數的總和是 100。','中間的數 = 100 − 最大數 − 最小數 = 100 − '+a+' − '+c+' = '+(100-a-c)],sc:2}}
],

'1M':[ // 長度和距離、貨幣、時間 (Length, Distance, Money, Time)
  // d:1 - Basic Measurement & Money
  ()=>{var a=ri(15,40),cut=ri(5,a-5),add=ri(5,15);return{d:1,tp:'short',q:'一條絲帶長 '+a+' cm，剪去 '+cut+' cm 後再駁上 '+add+' cm，現在長多少 cm？',a:String(a-cut+add),s:['剪去是減，駁上是加。',a+'−'+cut+'+'+add+'='+(a-cut+add)],sc:2}},
  ()=>{var coins=[{v:10,n:ri(1,3)},{v:5,n:ri(1,3)},{v:2,n:ri(2,4)},{v:1,n:ri(1,4)}];var total=coins.reduce((s,c)=>s+c.v*c.n,0);return{d:1,tp:'calc',q:'錢包裏有 '+coins.map(c=>c.n+' 個 $'+c.v).join('、')+'。共有多少元？',a:String(total),s:['分別計算各種硬幣的價值再相加。'],sc:2}},
  // d:2 - Time & Measurement with traps
  ()=>{var a=ri(20,50),b=ri(10,a-5),dWeight=ri(2,5);return{d:2,tp:'work',q:'一條繩子長 '+a+' cm，切去 '+b+' cm。這條繩子重 '+dWeight+' kg。剩下的繩子長多少 cm？',a:String(a-b),trap:'重量（'+dWeight+' kg）',s:['🔍 重量與長度無關。','剩下：'+a+' − '+b+' = '+(a-b)],sc:2}},
  ()=>{var price1=ri(15,25),price2=ri(10,20),paid=50,dTime=ri(2,4);return{d:2,tp:'work',q:'下午 '+dTime+' 時，媽媽去超市。買蔬菜用了 '+price1+' 元，買水果用了 '+price2+' 元，付了 $50。應找回多少元？',a:String(paid-price1-price2),trap:'時間（下午'+dTime+'時）',s:['🔍 時間是干擾資訊。','總共用了：'+price1+' + '+price2+' = '+(price1+price2),'找回：50 − '+(price1+price2)+' = '+(paid-price1-price2)],sc:3}},
  // d:3 - Time reasoning
  ()=>{var now=ri(3,7),hr=ri(1,2);return{d:3,tp:'short',q:'現在是下午 '+now+' 時。'+hr+' 小時前是什麼時間？'+hr+' 小時後呢？(請註明上午或下午)',a:'下午'+(now-hr)+'時,下午'+(now+hr)+'時',s:['前：'+now+' − '+hr+' = '+(now-hr)+' (下午)','後：'+now+' + '+hr+' = '+(now+hr)+' (下午)'],sc:2}},
  ()=>{var h=ri(1,11);var half=pk(['半','']);return{d:3,tp:'calc',q:'鐘面上的分針指着 '+(half==='半'?'6':'12')+'，時針在 '+h+' '+(half==='半'?('和 '+(h+1)+' 之間'):'上')+'。現在是幾時幾分？',a:h+'時'+(half==='半'?'30分':'0分'),s:['分針指着 12 是 0 分 (整點)，指着 6 是 30 分 (半)。'],sc:2}}
],

'1S':[ // 空間與圖形 (Shape & Space)
  // d:1 - Basic properties
  ()=>{var shapes=[{n:'三角形',e:3},{n:'正方形',e:4},{n:'長方形',e:4}];var s=pk(shapes);return{d:1,tp:'fill',q:s.n+'有 ____ 條邊和 ____ 個角。',a:s.e+','+s.e,s:[s.n+'是由 '+s.e+' 條直邊和 '+s.e+' 個角組成的。'],sc:1}},
  ()=>{return{d:1,tp:'mc',q:'哪個圖形沒有直直的邊和角？',isMC:true,opts:[{l:'A',v:'三角形',c:false},{l:'B',v:'圓形',c:true},{l:'C',v:'正方形',c:false}],a:'B',s:['圓形是由一條曲線圍成的，沒有直直的邊和角。'],sc:1}},
  // d:2 - Counting shapes with traps
  ()=>{var t=ri(2,5),s=ri(1,4),r=ri(2,4),dBall=ri(3,8);return{d:2,tp:'work',q:'積木盒裏有 '+t+' 個三角形積木、'+s+' 個正方形積木和 '+r+' 個長方形積木。旁邊還放了 '+dBall+' 個波子。盒裏共有多少個有直邊的圖形積木？',a:String(t+s+r),trap:'波子數目（'+dBall+'個）',s:['🔍 波子不是有直邊的圖形，是干擾資訊。','總數：'+t+' + '+s+' + '+r+' = '+(t+s+r)],sc:2}},
  ()=>{var a=ri(4,8),dColor=pk(['紅色','藍色']);return{d:2,tp:'short',q:'把 '+a+' 個相同的正方形拼在一起排成一橫排，會得出一個什麼形狀？(這些正方形是'+dColor+'的)',a:'長方形',trap:'顏色（'+dColor+'）',s:['🔍 顏色不影響形狀。','多個正方形排成一排，長度改變但闊度不變，會變成一個長方形。'],sc:1}},
  // d:3 - Spatial reasoning
  ()=>{return{d:3,tp:'mc',q:'一個平面圖形有 4 條邊和 4 個角，但不是所有邊都一樣長，也不是所有角都是直角。它不可能是什麼圖形？',isMC:true,opts:[{l:'A',v:'長方形',c:false},{l:'B',v:'正方形',c:true},{l:'C',v:'梯形',c:false}],a:'B',s:['正方形必須 4 邊等長且 4 個角都是直角。既然題目說「不是所有邊都一樣長」，那就不可能是正方形。'],sc:2}},
  ()=>{return{d:3,tp:'short',q:'把一張正方形的紙對摺一次（沿對角線摺），打開後會看到什麼形狀的摺痕？這條摺痕把正方形分成了兩個什麼形狀？',a:'直線,三角形',s:['對角線是一條直線。','沿對角線對摺，會把正方形分成兩個大小相同的三角形。'],sc:2}}
]
};

// Map config sub-topic IDs to the shared generator pools
grade1['1M1']=grade1['1M'];
grade1['1M2']=grade1['1M'];
grade1['1M3']=grade1['1M'];
grade1['1M4']=grade1['1M'];
grade1['1S1']=grade1['1S'];
grade1['1S2']=grade1['1S'];
grade1['1S3']=grade1['1S'];

// Topics: 1N1, 1N2, 1N3, 1N4, 1M→1M1-4, 1S→1S1-3
// Export: grade1 (object with 13 topic keys)
