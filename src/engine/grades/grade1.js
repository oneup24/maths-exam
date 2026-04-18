/**
 * grade1.js — P1 question generators (1N1–1S)
 * Extracted from engine.js
 */

import { ri, pk, shuffle } from '../core.js';
import { nm, pl, fd, it, CTX } from '../config.js';

export const grade1 = {
'1N1':[
  ()=>{var a=ri(11,20);return{d:1,tp:'fill',q:a+'的十位是____，個位是____。',a:Math.floor(a/10)+','+a%10,s:['位值'],sc:1}},
  ()=>{var a=ri(2,6);var list=[];for(var i=0;i<a;i++)list.push(ri(1,18));list.sort((x,y)=>x-y);return{d:1,tp:'fill',q:'把以下數字由小到大排列：'+shuffle(list).join('、')+'\n答：____',a:list.join(','),s:['比較大小'],sc:2}},
  ()=>{var a=ri(3,15);return{d:1,tp:'calc',q:'比'+a+'大3的數是多少？',a:String(a+3),s:[a+'+3='+(a+3)],sc:1}},
  /* d:2 — pattern */
  ()=>{var start=ri(2,5),step=ri(2,4);var seq=[];for(var i=0;i<5;i++)seq.push(start+step*i);return{d:2,tp:'fill',q:'找出規律並填上空格：'+seq[0]+'、'+seq[1]+'、'+seq[2]+'、____、____',a:seq[3]+','+seq[4],s:['每次加'+step],sc:2}},
  /* d:3 — reverse */
  ()=>{var a=ri(11,19);var t=Math.floor(a/10),u=a%10;return{d:3,tp:'work',q:'一個兩位數，十位數字是'+t+'，個位數字比十位數字大'+(u-t)+'。這個數是多少？',a:String(a),s:['個位: '+t+'+'+(u-t)+'='+u,'答案: '+a],sc:2}}
],
'1N2':[
  ()=>{var a=ri(3,9),b=ri(3,9),c=ri(1,Math.min(a+b-1,9));return{d:1,tp:'calc',q:a+' + '+b+' − '+c+' = ?',a:String(a+b-c),s:['先加後減'],sc:2}},
  ()=>{var a=ri(3,8),b=ri(2,7),c=ri(2,6);return{d:1,tp:'calc',q:a+' + '+b+' + '+c+' = ?',a:String(a+b+c),s:['連加'],sc:1}},
  ()=>{var total=ri(12,18),eat=ri(3,total-5),add=ri(2,6);var dAge=ri(6,10);return{d:2,tp:'work',q:'籃子裏有'+total+'個'+fd()+'。'+nm()+'今年'+dAge+'歲，他吃了'+eat+'個後，媽媽又放入'+add+'個。現在籃子裏有多少個？',a:String(total-eat+add),trap:'年齡（'+dAge+'歲）',s:['🔍 年齡是無關資訊',total+'−'+eat+'='+(total-eat),(total-eat)+'+'+add+'='+(total-eat+add)],sc:2}},
  ()=>{var a=ri(5,12),b=ri(3,8),dItem=ri(4,10);return{d:2,tp:'work',q:nm()+'有'+a+'顆紅色波子和'+b+'顆藍色波子。書包裏有'+dItem+'枝'+pk(CTX.item)+'。共有多少顆波子？',a:String(a+b),trap:pk(CTX.item)+'數（'+dItem+'枝）',s:['🔍 書包裏的物品與波子數無關',a+'+'+b+'='+(a+b)],sc:2}},
  ()=>{var a=ri(4,9),b=ri(3,a-1),dFriend=ri(3,7);return{d:2,tp:'work',q:'哥哥有'+a+'顆糖果，弟弟有'+b+'顆。朋友'+nm()+'帶了'+dFriend+'塊餅乾來探訪。哥哥比弟弟多多少顆糖果？',a:String(a-b),trap:'餅乾數（'+dFriend+'塊）',s:['🔍 餅乾與題目無關',a+'−'+b+'='+(a-b)],sc:2}},
  /* d:3 — inverse + trap */
  ()=>{var ans=ri(8,15),add=ri(2,5),orig=ans-add;var dColor=pk(['紅色','藍色','綠色']);return{d:3,tp:'work',q:nm()+'有一些'+dColor+'彈珠。得到'+add+'顆後共有'+ans+'顆。他原來有多少顆？',a:String(orig),trap:'彈珠顏色（'+dColor+'）',s:['🔍 顏色不影響數量',ans+'−'+add+'='+orig],sc:2}},
  ()=>{var a=ri(6,12),b=ri(3,6),c=ri(2,5);return{d:3,tp:'calc',q:a+' − '+b+' + '+c+' − '+(a-b+c-2)+' = ?',a:'2',s:['由左至右逐步計算'],sc:2}}
],
'1N3':[
  ()=>{var arr=[ri(30,90),ri(10,80),ri(10,70)];while(arr[1]===arr[0])arr[1]=ri(10,80);while(arr[2]===arr[0]||arr[2]===arr[1])arr[2]=ri(10,70);var sorted=[...arr].sort((x,y)=>x-y);return{d:1,tp:'fill',q:'把 '+arr.join('、')+' 由小到大排列：____',a:sorted.join(','),s:['比較'],sc:2}},
  ()=>{var a=ri(30,60),go=ri(10,20),come=ri(5,15),dWeather=pk(['晴天','陰天','下雨天']);return{d:2,tp:'work',q:'停車場有'+a+'輛車。今天是'+dWeather+'，上午開走了'+go+'輛，下午又駛入'+come+'輛。現在有多少輛車？',a:String(a-go+come),trap:'天氣（'+dWeather+'）',s:['🔍 天氣是無關資訊',a+'−'+go+'='+(a-go),(a-go)+'+'+come+'='+(a-go+come)],sc:2}},
  /* d:3 — error identification */
  ()=>{var a=ri(35,65),b=ri(20,45);var wrong=a+b+10;return{d:3,tp:'mc',q:nm()+'計算 '+a+' + '+b+' = '+wrong+'。他的答案對嗎？正確答案是什麼？',isMC:false,a:String(a+b),s:['❌ '+wrong+'是錯的','✅ '+a+'+'+b+'='+(a+b)],sc:2}}
],
'1N4':[
  ()=>{var a=ri(20,50),b=ri(15,30),c=ri(10,20);return{d:1,tp:'calc',q:a+' + '+b+' − '+c+' = ?',a:String(a+b-c),s:['先加再減'],sc:2}},
  ()=>{var price=ri(5,12),n=ri(2,4),paid=50;var total=price*n;var dOpen=ri(8,10);return{d:2,tp:'work',q:pl()+'每天早上'+dOpen+'時開門。'+it()+'每枝'+price+'元，'+nm()+'買了'+n+'枝，付了'+paid+'元。找回多少元？',a:String(paid-total),trap:'開門時間（'+dOpen+'時）',s:['🔍 營業時間是無關資訊','總價: '+price+'×'+n+'='+total,'找回: '+paid+'−'+total+'='+(paid-total)],sc:2}},
  ()=>{var a=ri(25,45),b=ri(20,40),give=ri(5,12);var dColor=pk(['紅色的','藍色的','綠色的']);return{d:2,tp:'work',q:'哥哥有'+a+'顆糖果，弟弟有'+b+'顆'+dColor+'糖果。哥哥給弟弟'+give+'顆後，兩人各有多少顆？',a:(a-give)+','+(b+give),trap:'糖果顏色（'+dColor+'）',s:['🔍 顏色不影響計算','哥哥: '+a+'−'+give+'='+(a-give),'弟弟: '+b+'+'+give+'='+(b+give)],sc:3}},
  /* d:3 — two-variable thinking */
  ()=>{var total=ri(15,20),diff=ri(2,6);var big=(total+diff)/2,small=(total-diff)/2;if(big!==Math.floor(big)){total++;big=(total+diff)/2;small=(total-diff)/2}return{d:3,tp:'work',q:nm()+'和'+nm()+'共有'+total+'顆糖果。其中一人比另一人多'+diff+'顆。兩人各有多少顆？',a:Math.floor(big)+','+Math.floor(small),s:['多的: ('+total+'+'+diff+')÷2='+Math.floor(big),'少的: ('+total+'−'+diff+')÷2='+Math.floor(small)],sc:3}}
],
'1M':[
  ()=>{var a=ri(15,40),cut=ri(10,a-5),add=ri(5,15);var dColor=pk(['紅色','藍色','黃色']);return{d:2,tp:'short',q:'一條'+dColor+'繩子長'+a+'cm，剪去'+cut+'cm後再接上'+add+'cm，現在長多少cm？',a:String(a-cut+add),trap:'繩子顏色（'+dColor+'）',s:['🔍 顏色不影響長度',a+'−'+cut+'='+(a-cut),(a-cut)+'+'+add+'='+(a-cut+add)],sc:2}},
  ()=>{var coins=[{v:10,n:ri(2,4)},{v:5,n:ri(1,3)},{v:2,n:ri(2,5)},{v:1,n:ri(1,4)}];var total=coins.reduce((s,c)=>s+c.v*c.n,0);return{d:1,tp:'calc',q:coins.map(c=>c.n+'個$'+c.v).join('、')+'，共多少元？',a:String(total),s:['分別計算再相加'],sc:2}},
  /* d:3 — reverse */
  ()=>{var now=ri(2,5),hr=ri(1,3);return{d:3,tp:'short',q:'現在是下午'+now+'時。'+hr+'小時前是什麼時間？'+hr+'小時後呢？',a:'下午'+(now-hr)+'時,下午'+(now+hr)+'時',s:['前: '+(now-hr)+'時','後: '+(now+hr)+'時'],sc:2}}
],
'1S':[
  ()=>{var shapes=[{n:'三角形',e:3},{n:'正方形',e:4},{n:'長方形',e:4}];var s=pk(shapes);return{d:1,tp:'fill',q:s.n+'有____條邊和____個角。',a:s.e+','+s.e,s:['圖形性質'],sc:1}},
  ()=>{var t=ri(2,4),s=ri(1,3),r=ri(1,3),dBall=ri(3,8);return{d:2,tp:'work',q:'圖中有'+t+'個三角形、'+s+'個正方形和'+r+'個長方形。旁邊還放了'+dBall+'個皮球。共有多少個圖形？',a:String(t+s+r),trap:'皮球數目（'+dBall+'個）',s:['🔍 皮球不是圖形',t+'+'+s+'+'+r+'='+(t+s+r)],sc:2}},
  /* d:3 — reasoning */
  ()=>{return{d:3,tp:'mc',q:'一個圖形有4條等長的邊和4個直角。它是什麼形狀？',isMC:true,opts:[{l:'A',v:'長方形',c:false},{l:'B',v:'正方形',c:true},{l:'C',v:'三角形',c:false}],a:'B',s:['四邊等長+四直角 = 正方形'],sc:2}}
]
};

// Topics: 1N1, 1N2, 1N3, 1N4, 1M, 1S
// Export: grade1 (object with 6 topic keys)
