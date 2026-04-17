/**
 * grade2.js — P2 question generators (2N1, 2N2, 2N3, 2M, 2S)
 * Extracted from engine.js
 */
import { ri, pk } from '../core.js';
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
]
};

// Topics: 2N1, 2N2, 2N3, 2M, 2S
// Export: grade2 (object with 5 topic keys, 17 generators total)
