/**
 * grade2.js — P2 question generators (2N1, 2N2, 2N3, 2N4, 2N5, 2N6, 2M, 2S, 2D1)
 * Extracted from engine.js
 * Enriched by HK Band 1 Top Math Teacher - featuring logical reasoning & distractor traps
 */
import { ri, pk, FIG } from '../core.js';
import { nm, pl, it, CTX } from '../config.js';

export const grade2={
/* ═══════════ 2N1 三位數 ═══════════ */
'2N1':[
  ()=>{var a=ri(100,999);return{d:1,tp:'fill',q:a+'的百位是____，十位是____，個位是____。',a:Math.floor(a/100)+','+Math.floor(a%100/10)+','+a%10,s:['位值'],sc:2}},
  ()=>{var nums=[];for(var i=0;i<4;i++)nums.push(ri(100,999));var sorted=[...nums].sort((a,b)=>b-a);return{d:1,tp:'fill',q:'把 '+nums.join('、')+' 由大到小排列：____',a:sorted.join(','),s:['比較三位數'],sc:2}},
  ()=>{var h=ri(1,8),t=ri(0,9),u=ri(0,9);return{d:2,tp:'fill',q:'一個三位數，百位是 '+h+'，十位比百位大 '+Math.abs(t-h)+'，個位是 '+u+'。這個數是____。',a:String(h*100+t*10+u),s:['逐位推算：百位='+h+'，十位='+h+'+'+Math.abs(t-h)+'='+t+'，個位='+u],sc:2}},
  ()=>{var a=ri(300,700),b=a+pk([-10,-1,1,10]);return{d:3,tp:'mc',q:a+' 和 '+b+' 哪個較大？相差多少？',isMC:false,a:(Math.max(a,b))+','+Math.abs(a-b),s:['比較: '+Math.max(a,b)+'較大','差: '+Math.abs(a-b)],sc:2}}
],

/* ═══════════ 2N2 加法和減法 (二/三) ═══════════ */
'2N2':[
  ()=>{var a=ri(200,500),b=ri(150,300),c=ri(100,200);return{d:1,tp:'calc',q:a+' + '+b+' − '+c+' = ?',a:String(a+b-c),s:['由左至右：先加再減'],sc:2}},
  ()=>{var have=ri(300,600),sell=ri(100,200),buy=ri(80,180);var dHours=ri(8,10),dFloors=ri(1,3);return{d:2,tp:'work',q:pl()+'有'+dFloors+'層樓，每天營業'+dHours+'小時，現存書籍'+have+'本。賣出'+sell+'本後，又進貨'+buy+'本，現在有多少本？',a:String(have-sell+buy),trap:'樓層數和營業時間',s:['🔍 樓層和營業時間均無關',have+'−'+sell+'='+(have-sell),(have-sell)+'+'+buy+'='+(have-sell+buy)],sc:2}},
  // HK context: 書展
  ()=>{var have=ri(300,600),sell=ri(100,200),buy=ri(80,180);var dDays=ri(5,7),dPrice=ri(20,50);return{d:2,tp:'work',q:'香港書展為期 '+dDays+' 天，某書商的特價書每本 '+dPrice+' 元。倉庫原有存貨 '+have+' 本。上午賣出 '+sell+' 本後，下午又從柴灣補貨 '+buy+' 本，現在倉庫有多少本存貨？',a:String(have-sell+buy),trap:'書展日數及書本價錢',s:['🔍 書展日數和書本價錢均與存貨數量無關。','賣出減少：'+have+' − '+sell+' = '+(have-sell),'補貨增加：'+(have-sell)+' + '+buy+' = '+(have-sell+buy)],sc:3}},
  ()=>{var a=ri(200,400),b=ri(150,350);var dTeacher=ri(10,20);return{d:2,tp:'work',q:pk(CTX.school)+'有甲班'+a+'人、乙班'+b+'人。學校共有'+dTeacher+'位老師。甲班比乙班多多少人？',a:String(Math.abs(a-b)),trap:'老師人數（'+dTeacher+'位）',s:['🔍 老師人數無關','差: |'+a+'−'+b+'| = '+Math.abs(a-b)],sc:2}},
  // give-and-compare with proper name variables
  ()=>{var a=ri(150,300),b=ri(100,250),give=ri(30,80);var n1=nm(),n2=nm();return{d:3,tp:'work',q:n1+'有 '+a+' 張閃卡，'+n2+'有 '+b+' 張閃卡。'+n1+'給了'+n2+' '+give+' 張後，誰的閃卡較多？多多少張？',a:((a-give)>(b+give)?n1:n2)+','+Math.abs((a-give)-(b+give)),s:[n1+' 現在有：'+a+' − '+give+' = '+(a-give),n2+' 現在有：'+b+' + '+give+' = '+(b+give),'比較後相減：|'+(a-give)+' − '+(b+give)+'| = '+Math.abs((a-give)-(b+give))],sc:3}}
],

/* ═══════════ 2N3 基本乘法 ═══════════ */
'2N3':[
  ()=>{var a=ri(2,9),b=ri(2,9),c=ri(1,9);return{d:1,tp:'calc',q:a+' × '+b+' + '+c+' = ?',a:String(a*b+c),s:['先乘後加'],sc:2}},
  ()=>{var price=ri(3,8),n=ri(4,8),extra=ri(5,15);var dItem=it(),dPrice=ri(1,3);return{d:2,tp:'work',q:'每個蛋糕'+price+'元，每枝'+dItem+' '+dPrice+'元。'+nm()+'買了'+n+'個蛋糕，另付包裝費'+extra+'元。買蛋糕共需多少元？',a:String(price*n+extra),trap:dItem+'價錢（'+dPrice+'元）',s:['🔍 '+dItem+'價錢無關',price+'×'+n+'='+price*n,price*n+'+'+extra+'='+(price*n+extra)],sc:2}},
  // HK context: 酒樓點心
  ()=>{var price=ri(4,8),n=ri(4,8),extra=ri(5,15);var dTea=ri(3,8);return{d:2,tp:'work',q:'酒樓裏每籠燒賣有 '+price+' 粒。'+nm()+'一家人點了 '+n+' 籠燒賣，另外加了一碟 '+extra+' 粒的粉果。他們每人的茶錢是 '+dTea+' 元。他們共點了多少粒點心？',a:String(price*n+extra),trap:'茶錢（'+dTea+'元）',s:['🔍 茶錢是價錢，與點心數量無關。','燒賣數量：'+price+' × '+n+' = '+price*n,price*n+' + '+extra+' = '+(price*n+extra)],sc:3}},
  ()=>{var a=ri(3,8),b=ri(3,6),add=ri(5,15);var dBirds=ri(10,25);return{d:2,tp:'work',q:'果園每行有'+a+'棵樹，共'+b+'行。果園裏還有'+dBirds+'隻'+pk(['小鳥','蝴蝶','蜜蜂'])+'。如果再種'+add+'棵，共有多少棵樹？',a:String(a*b+add),trap:'動物數目',s:['🔍 動物數無關',a+'×'+b+'='+a*b,a*b+'+'+add+'='+(a*b+add)],sc:2}},
  ()=>{var rows=ri(3,6),cols=ri(3,6),add=ri(2,5);var total=rows*cols;return{d:2,tp:'short',q:nm()+'的書架有'+rows+'層，每層放'+cols+'本書。書架共有多少本書？再放'+add+'本後，共有多少本？',a:total+','+(total+add),s:[rows+'×'+cols+'='+total+'本',total+'+'+add+'='+(total+add)+'本'],sc:2}},
  // 禮堂椅子：broken chairs trap
  ()=>{var row=ri(4,8),col=ri(4,8),missing=ri(2,5);return{d:3,tp:'work',q:'禮堂的椅子排成 '+row+' 行，每行有 '+col+' 張。其中有 '+missing+' 張椅子壞了被搬走。現在禮堂裏有多少張完好的椅子？',a:String(row*col-missing),s:['總椅子數：'+row+' × '+col+' = '+row*col,'減去壞掉的：'+row*col+' − '+missing+' = '+(row*col-missing)],sc:3}},
  ()=>{var ans=ri(3,9),b=ri(4,8);return{d:3,tp:'work',q:nm()+'把一些糖果平均分成'+b+'份，每份有'+ans+'顆。原來共有多少顆糖果？',a:String(ans*b),s:['反向思考: '+ans+'×'+b+'='+ans*b],sc:2}}
],

/* ═══════════ 2N4 四位數 ═══════════ */
'2N4':[
  ()=>{const th=ri(1,9),h=ri(0,9),t=ri(0,9),u=ri(0,9);const n=th*1000+h*100+t*10+u;return{d:1,tp:'fill',q:'用數字寫：'+th+'千'+h+'百'+t+'十'+u+'個 = ____',a:String(n),s:['千位='+th+'，百位='+h+'，十位='+t+'，個位='+u],sc:1}},
  ()=>{const n=ri(1000,9999);return{d:1,tp:'fill',q:n+'的千位數字是____，百位數字是____。',a:Math.floor(n/1000)+','+Math.floor(n%1000/100),s:['千位='+Math.floor(n/1000)+'，百位='+Math.floor(n%1000/100)],sc:1}},
  ()=>{var a=ri(1000,9999),b=ri(1000,9999);while(a===b)b=ri(1000,9999);const big=Math.max(a,b),small=Math.min(a,b);return{d:2,tp:'fill',q:'比較'+a+'和'+b+'：較大的是____，較小的是____。',a:big+','+small,s:[big+' > '+small],sc:2}},
  ()=>{const arr=[ri(1000,4999),ri(5000,7999),ri(8000,9999)];const shuffled=[arr[1],arr[0],arr[2]];const sorted=[...arr].sort((a,b)=>a-b);return{d:2,tp:'fill',q:'由小到大排列：'+shuffled.join('、')+' → ____',a:sorted.join(','),s:[sorted.join(' < ')],sc:2}},
  // pattern sequence
  ()=>{const start=ri(1,5)*1000+ri(1,5)*100;const step=pk([50,100,200]);return{d:2,tp:'fill',q:'找出規律並填上空格：'+start+'、'+(start+step)+'、____、____、'+(start+step*4),a:(start+step*2)+','+(start+step*3),s:['觀察規律：每次增加 '+step],sc:2}},
  ()=>{const stock=ri(1000,5000),sell=ri(200,800),buy=ri(100,500);return{d:3,tp:'work',q:'超市有'+stock+'件貨品，賣出'+sell+'件後，又入貨'+buy+'件。現在有多少件？',a:String(stock-sell+buy),s:[stock+'−'+sell+'='+(stock-sell),(stock-sell)+'+'+buy+'='+(stock-sell+buy)],sc:2}},
  // 4-digit code logic puzzle
  ()=>{const th=ri(2,5),h=th+2,t=ri(1,3),u=10-t;return{d:3,tp:'work',q:'一個四位數密碼，千位數字是 '+th+'，百位數字比千位大 2，十位和個位數字加起來是 10。如果十位數字是 '+t+'，這個密碼是多少？',a:String(th*1000+h*100+t*10+u),s:['千位 = '+th,'百位 = '+th+' + 2 = '+h,'個位 = 10 − '+t+' = '+u,'密碼是 '+th+''+h+''+t+''+u],sc:3}}
],

/* ═══════════ 2N5 分數(一) ═══════════ */
'2N5':[
  ()=>{const d=pk([2,3,4]);return{d:1,tp:'fill',q:'把一個圖形分成'+d+'等份，塗了1份，塗色部分是____。',a:'1/'+d,s:['1/'+d+' 讀作：'+d+'分之一'],sc:1}},
  ()=>{const a=pk([2,3,4,6]),b=pk([2,3,4,6]);let bb=b;while(bb===a)bb=pk([2,3,4,6]);return{d:1,tp:'mc',q:'1/'+a+' 和 1/'+bb+'，哪個較大？',isMC:true,opts:[{l:'A',v:'1/'+a,c:a<bb},{l:'B',v:'1/'+bb,c:bb<a},{l:'C',v:'一樣大',c:false}],a:a<bb?'A':'B',s:['分母越小，分數越大：1/'+Math.min(a,bb)+' > 1/'+Math.max(a,bb)],sc:1}},
  ()=>{const frac=pk([2,3,4]);const total=frac*ri(2,5);return{d:2,tp:'calc',q:total+'個橙，'+frac+'分之一是多少個？',a:String(total/frac),s:[total+'÷'+frac+'='+(total/frac)],sc:1}},
  ()=>{const frac=pk([2,3,4]);const total=frac*ri(3,6);const ate=total/frac;const n=nm();return{d:2,tp:'work',q:n+'有'+total+'粒糖果，吃了'+frac+'分之一。吃了多少粒？',a:String(ate),s:[total+'÷'+frac+'='+ate+'粒'],sc:2}},
  // fraction with candy trap
  ()=>{const frac=pk([2,3,4]);const total=frac*ri(3,6);const n=nm();const dItems=ri(2,5);return{d:3,tp:'work',q:n+'有 '+total+' 粒朱古力，他把其中的 '+frac+' 分之一送給妹妹。妹妹本身已經有 '+dItems+' 粒糖果。妹妹從'+n+'那裏得到多少粒朱古力？',a:String(total/frac),trap:'妹妹原本的糖果（'+dItems+'粒）',s:['🔍 妹妹原本的糖果與題目所問「得到的朱古力」無關。',total+' 粒的 '+frac+' 分之一是：'+total+' ÷ '+frac+' = '+(total/frac)+' 粒'],sc:3}}
],

/* ═══════════ 2N6 基本除法 ═══════════ */
'2N6':[
  ()=>{const a=ri(2,9),b=ri(2,9);return{d:1,tp:'calc',q:(a*b)+' ÷ '+b+' = ?',a:String(a),s:[a+'×'+b+'='+a*b+'，反過來÷'+b+'='+a],sc:1}},
  ()=>{const div=ri(3,8),quot=ri(3,7),rem=ri(1,div-1);return{d:1,tp:'fill',q:(div*quot+rem)+' ÷ '+div+' = ____…____',a:quot+','+rem,s:[(div*quot+rem)+'÷'+div+'='+quot+'餘'+rem],sc:1}},
  ()=>{const groups=ri(2,5);const total=groups*ri(3,8);const n=nm();return{d:2,tp:'work',q:n+'有'+total+'個橙，平均分成'+groups+'份，每份有多少個？',a:String(total/groups),s:[total+'÷'+groups+'='+(total/groups)],sc:2}},
  ()=>{const div=ri(3,7);const total=div*ri(4,7)+ri(1,div-1);const q=Math.floor(total/div);const r=total%div;return{d:2,tp:'short',q:'有'+total+'個'+pk(CTX.food)+'，每'+div+'個裝一袋。可以裝幾袋？還剩多少個？',a:q+','+r,s:[total+'÷'+div+'='+q+'餘'+r,'裝'+q+'袋，剩'+r+'個'],sc:2}},
  ()=>{const each=ri(3,6);const total=each*ri(4,8);return{d:3,tp:'work',q:'共有'+total+'個蘋果，每盒放'+each+'個，需要多少個盒子？',a:String(total/each),s:[total+'÷'+each+'='+(total/each)+'個盒子'],sc:2}},
  // 進一法: cable car rounding up
  ()=>{const each=ri(4,6);const quot=ri(5,8);const rem=ri(1,each-1);const total=each*quot+rem;return{d:3,tp:'work',q:'學校旅行有 '+total+' 個學生參加。每輛纜車最多可載 '+each+' 人。最少需要多少輛纜車才足夠接載所有學生？',a:String(quot+1),trap:'餘數處理（進一法）',s:['計算：'+total+' ÷ '+each+' = '+quot+' ... '+rem,'剩下的 '+rem+' 人也需要一輛纜車，所以要 '+quot+' + 1 = '+(quot+1)+' 輛。'],sc:3}}
],

/* ═══════════ 2M 度量 (長度/重量/貨幣/時間) ═══════════ */
'2M':[
  ()=>{var m=ri(2,5),cm=ri(10,90),m2=ri(1,3),cm2=ri(10,80);return{d:1,tp:'calc',q:m+'米'+cm+'厘米 + '+m2+'米'+cm2+'厘米 = ____厘米',a:String(m*100+cm+m2*100+cm2),s:['化成厘米再加'],sc:2}},
  ()=>{var total,part;do{total=ri(200,500);part=ri(80,110);}while(2*part-30>=total);var dWidth=ri(2,5);return{d:2,tp:'short',q:'繩子長'+total+'厘米、闊'+dWidth+'厘米。用去'+part+'厘米後再用去'+(part-30)+'厘米，還剩多長？',a:String(total-part-(part-30)),trap:'繩子闊度（'+dWidth+'厘米）',s:['🔍 闊度無關',total+'−'+part+'='+(total-part),(total-part)+'−'+(part-30)+'='+(total-part-(part-30))],sc:2}},
  ()=>{var price=ri(3,8),n=ri(3,6);var cost=price*n;var pay=pk([20,50,100].filter(p=>p>cost));if(!pay)pay=50+cost;return{d:2,tp:'short',q:nm()+'在'+pk(CTX.places)+'買了'+n+'個'+pk(CTX.food)+'，每個'+price+'元。她付了'+pay+'元，應找回多少元？用了幾成錢？',a:String(pay-cost)+','+(cost/pay*10).toFixed(0)+'成',s:[price+'×'+n+'='+cost+'元','找回: '+pay+'−'+cost+'='+(pay-cost)+'元'],sc:2}},
  ()=>{var w1=ri(2,5),w2=ri(1,4);var dColor=pk(['紅','藍','綠']);return{d:2,tp:'short',q:dColor+'色袋重'+w1+'公斤，白色袋重'+w2+'公斤。兩袋共重多少公斤？哪袋較重？重多少？',a:(w1+w2)+','+(w1>w2?dColor+'色':'白色')+','+Math.abs(w1-w2),trap:'袋的顏色（'+dColor+'）',s:['共: '+w1+'+'+w2+'='+(w1+w2)+'公斤','差: '+Math.abs(w1-w2)+'公斤'],sc:3}},
  ()=>{var kg=ri(1,3),g=ri(100,800);return{d:3,tp:'fill',q:kg+'公斤'+g+'克 = ____克',a:String(kg*1000+g),s:[kg+'×1000+'+g+'='+(kg*1000+g)],sc:2}},
  // MTR travel time trap
  ()=>{var price=ri(15,35),n=ri(2,4);var cost=price*n;var pay=100;var dTime=ri(10,20);return{d:2,tp:'short',q:nm()+'乘搭港鐵用了 '+dTime+' 分鐘到文具店。買了 '+n+' 本筆記簿，每本 '+price+' 元。他用一張 100 元紙幣付款，應找回多少元？',a:String(pay-cost),trap:'乘車時間（'+dTime+'分鐘）',s:['🔍 乘車時間與金錢無關。','總花費：'+price+' × '+n+' = '+cost+' 元','找回：100 − '+cost+' = '+(pay-cost)+' 元'],sc:3}}
],

/* ═══════════ 2S 空間與圖形 ═══════════ */
'2S':[
  // 4 right angles + unequal sides → must be rectangle (not square)
  ()=>({d:1,tp:'mc',q:'一個四邊形有 4 個直角，而且 4 條邊長度不相等，它是什麼形狀？',isMC:true,opts:[{l:'A',v:'正方形',c:false},{l:'B',v:'長方形',c:true},{l:'C',v:'平行四邊形',c:false}],a:'B',s:['4 個直角且邊長不全等，必定是長方形。'],sc:1}),
  ()=>({d:3,tp:'mc',q:'以下哪項是正確的？',isMC:true,opts:[{l:'A',v:'所有正方形都是長方形',c:true},{l:'B',v:'所有長方形都是正方形',c:false},{l:'C',v:'三角形有4個角',c:false}],a:'A',s:['正方形是特殊的長方形'],sc:2}),
  // two squares spatial reasoning
  ()=>({d:3,tp:'short',q:'把兩個完全相同的正方形拼在一起（邊貼邊），會得出一個什麼形狀？這個新圖形有多少個直角？',a:'長方形,4',s:['兩個正方形拼合會拉長一邊，變成長方形。','長方形依然有 4 個直角。'],sc:3})
],

/* ═══════════ 2D1 象形圖和棒形圖 ═══════════ */
'2D1':[
  ()=>{const labels=['蘋果','橙','香蕉','芒果'];const data=labels.map(l=>({l,v:ri(2,9)}));const mx=data.reduce((m,d)=>d.v>m.v?d:m,data[0]);return{d:1,tp:'fill',q:'棒形圖顯示各種水果數量。最多的是____，共____個。',fig:FIG.bars(data),a:mx.l+','+mx.v,s:['最高的棒 = '+mx.l+': '+mx.v+'個'],sc:2}},
  ()=>{const labels=['一月','二月','三月','四月'];const data=labels.map(l=>({l,v:ri(3,9)}));const total=data.reduce((s,d)=>s+d.v,0);return{d:2,tp:'fill',q:'棒形圖顯示四個月的書本數量。四個月共有多少本？',fig:FIG.bars(data),a:String(total),s:['加總: '+data.map(d=>d.v).join('+')+' = '+total],sc:2}},
  ()=>{const rows=[{name:'小明',count:ri(2,5)},{name:'小芬',count:ri(2,5)},{name:'家俊',count:ri(2,5)}];const sym='★';const total=rows.reduce((s,r)=>s+r.count,0);return{d:2,tp:'work',q:'圖表中每個'+sym+'代表2本書。\n'+rows.map(r=>r.name+': '+sym.repeat(r.count)).join('\n')+'\n三人共有多少本書？',a:String(total*2),s:['每個★=2本','共'+total+'個★='+total+'×2='+total*2],sc:2}},
  // HK transport bar chart
  ()=>{const labels=['巴士','港鐵','小巴','的士'];const data=labels.map(l=>({l,v:ri(10,40)}));const mx=data.reduce((m,d)=>d.v>m.v?d:m,data[0]);return{d:1,tp:'fill',q:'棒形圖顯示同學上學的交通工具。最多人乘搭的是____，共有____人。',fig:FIG.bars(data),a:mx.l+','+mx.v,s:['尋找最高的棒條，對應項目是 '+mx.l+'，數值是 '+mx.v+'。'],sc:2}},
  // pictograph: 1 symbol = 10 units
  ()=>{const rows=[{name:'草莓',count:ri(2,5)},{name:'芒果',count:ri(3,6)},{name:'西瓜',count:ri(1,4)}];const sym='🍓';const total=rows.reduce((s,r)=>s+r.count,0);return{d:3,tp:'work',q:'果欄的象形圖中，每個 '+sym+' 代表 10 箱水果。\n'+rows.map(r=>r.name+': '+sym.repeat(r.count)).join('\n')+'\n果欄共有多少箱這三款水果？',a:String(total*10),s:['先數出 '+sym+' 的總數量：'+rows.map(r=>r.count).join('+')+' = '+total,'每個 '+sym+' 代表 10 箱：'+total+' × 10 = '+total*10+' 箱'],sc:3}}
]
};

// Topics: 2N1, 2N2, 2N3, 2N4, 2N5, 2N6, 2M, 2S, 2D1
// Export: grade2 (object with 9 topic keys, 49 generators total)
