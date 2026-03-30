/* ═══════════════════════════════════════════════════════════
   engine.js — 小學數學模擬試卷引擎 v2
   ═══════════════════════════════════════════════════════════ */

/* ─── Utilities ─── */
export const ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
export const pk=a=>a[Math.floor(Math.random()*a.length)];
export const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
export const lcm=(a,b)=>Math.abs(a*b)/gcd(a,b);
export const fOf=n=>{const f=[];for(let i=1;i*i<=n;i++)if(n%i===0){f.push(i);if(i!==n/i)f.push(n/i)}return f.sort((a,b)=>a-b)};
export const fS=(n,d)=>{if(n<=0)return'0';const g=gcd(n,d);n/=g;d/=g;if(d===1)return String(n);if(n>d){const w=Math.floor(n/d),r=n%d;return r?w+'又'+r+'/'+d:String(w)}return n+'/'+d};
export const shuffle=a=>{const c=[...a];for(let i=c.length-1;i>0;i--){const j=ri(0,i);[c[i],c[j]]=[c[j],c[i]]}return c};

/* ─── Answer Checking ─── */
const norm=s=>String(s||'').replace(/\s+/g,'').replace(/，/g,',').replace(/／/g,'/').replace(/＞/g,'>').replace(/＜/g,'<').replace(/＝/g,'=').replace(/⋯⋯/g,'...').replace(/…/g,'...').replace(/餘/g,'...').replace(/又/g,'_').toLowerCase();
const stripU=s=>s.replace(/cm[²³]?|km\/h|km|mm|m[²³]?|°[cC]?|度|分|秒|人|本|元|個|公里|公斤|克|毫升|升|小時|分鐘|\$/g,'');
const parseFrac=s=>{const m=s.match(/^(\d+)[_又](\d+)\/(\d+)$/);if(m)return+m[1]+ +m[2]/+m[3];const f=s.match(/^(\d+)\/(\d+)$/);if(f)return+f[1]/+f[2];const n=parseFloat(s);return isNaN(n)?null:n};
export const chkAns=(stu,cor)=>{if(!stu)return false;const s=norm(stu),c=norm(cor);if(s===c)return true;const su=stripU(s),cu=stripU(c);if(su===cu)return true;const sf=parseFrac(su),cf=parseFrac(cu);if(sf!==null&&cf!==null&&Math.abs(sf-cf)<0.005)return true;if(c.includes(',')){const cp=c.split(','),sp=s.split(',');if(cp.length===sp.length&&cp.every((v,i)=>{const a2=stripU(sp[i]||''),b2=stripU(v);if(a2===b2)return true;const an=parseFrac(a2),bn=parseFrac(b2);return an!==null&&bn!==null&&Math.abs(an-bn)<0.005}))return true}return false};

/* ─── SVG Helpers ─── */
export const SV={
  w:(c,vw,vh)=>{vw=vw||220;vh=vh||155;return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+vw+' '+vh+'" style="max-width:240px;width:100%;display:block;margin:4px auto"><style>text{font-family:sans-serif}</style>'+c+'</svg>'},
  t:(x,y,s,o)=>{o=o||{};return'<text x="'+x+'" y="'+y+'" font-size="'+(o.fs||11)+'" fill="'+(o.c||'#334155')+'" text-anchor="'+(o.a||'middle')+'" font-weight="'+(o.fw||'normal')+'">'+s+'</text>'},
  l:(x1,y1,x2,y2,o)=>{o=o||{};return'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(o.c||'#4f46e5')+'" stroke-width="'+(o.w||2)+'"'+(o.d?' stroke-dasharray="5,3"':'')+'/>'},
  pg:(p,o)=>{o=o||{};return'<polygon points="'+p+'" fill="'+(o.f||'#e0e7ff')+'" stroke="'+(o.c||'#4f46e5')+'" stroke-width="'+(o.sw||2)+'"/>'},
  ci:(cx,cy,r,o)=>{o=o||{};return'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+(o.f||'none')+'" stroke="'+(o.c||'#4f46e5')+'" stroke-width="'+(o.sw||2)+'"/>'},
  re:(x,y,w,h,o)=>{o=o||{};return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+(o.f||'#e0e7ff')+'" stroke="'+(o.c||'#4f46e5')+'" stroke-width="'+(o.sw||2)+'" rx="'+(o.rx||0)+'"/>'},
  ra:(x,y,d,s)=>{s=s||8;var pts={bl:'M'+x+','+(y-s)+' L'+(x+s)+','+(y-s)+' L'+(x+s)+','+y,br:'M'+x+','+(y-s)+' L'+(x-s)+','+(y-s)+' L'+(x-s)+','+y,tl:'M'+x+','+(y+s)+' L'+(x+s)+','+(y+s)+' L'+(x+s)+','+y,tr:'M'+x+','+(y+s)+' L'+(x-s)+','+(y+s)+' L'+(x-s)+','+y};return'<path d="'+pts[d]+'" fill="none" stroke="#64748b" stroke-width="1"/>'}
};
export const FIG={
  rect:(w,h)=>{var sc=Math.min(130/w,85/h),rw=w*sc,rh=h*sc,ox=(200-rw)/2,oy=(120-rh)/2+15;return SV.w(SV.re(ox,oy,rw,rh)+SV.ra(ox,oy+rh,'bl')+SV.ra(ox+rw,oy+rh,'br')+SV.ra(ox+rw,oy,'tr')+SV.ra(ox,oy,'tl')+SV.t(ox+rw/2,oy+rh+15,w+' cm')+SV.t(ox-14,oy+rh/2+4,h+' cm',{fs:10}))},
  sq:(s)=>{var sc=Math.min(100/s,100/s),rs=s*sc,ox=(200-rs)/2,oy=(120-rs)/2+15;return SV.w(SV.re(ox,oy,rs,rs)+SV.ra(ox,oy+rs,'bl')+SV.t(ox+rs/2,oy+rs+15,s+' cm'))},
  tri:(b,h)=>{var sc=Math.min(140/b,80/h),bw=b*sc,bh=h*sc,ox=(200-bw)/2,oy=120,px=ox+bw*0.38;return SV.w(SV.pg(ox+','+oy+' '+(ox+bw)+','+oy+' '+px+','+(oy-bh))+SV.l(px,oy,px,oy-bh,{d:true,c:'#ef4444',w:1.5})+SV.ra(px,oy,'bl')+SV.t(ox+bw/2,oy+14,'底 = '+b+' cm')+SV.t(px+18,oy-bh/2+4,'高 = '+h+' cm',{c:'#ef4444',fs:10,a:'start'}),200,145)},
  para:(b,h)=>{var sc=Math.min(120/b,70/h),bw=b*sc,bh=h*sc,sk=bh*.35,ox=35,oy=118;return SV.w(SV.pg(ox+','+oy+' '+(ox+bw)+','+oy+' '+(ox+bw+sk)+','+(oy-bh)+' '+(ox+sk)+','+(oy-bh))+SV.l(ox+sk,oy,ox+sk,oy-bh,{d:true,c:'#ef4444',w:1.5})+SV.ra(ox+sk,oy,'bl')+SV.t(ox+bw/2,oy+14,'底 = '+b+' cm')+SV.t(ox+sk-14,oy-bh/2+4,h+'',{c:'#ef4444',fs:10}),220,142)},
  trap:(a,b,h)=>{var sc=Math.min(140/b,75/h),bw=b*sc,aw=a*sc,hh=h*sc,ox=(200-bw)/2,oy=118,off=(bw-aw)/2;return SV.w(SV.pg(ox+','+oy+' '+(ox+bw)+','+oy+' '+(ox+bw-off)+','+(oy-hh)+' '+(ox+off)+','+(oy-hh))+SV.l(ox+off,oy,ox+off,oy-hh,{d:true,c:'#ef4444',w:1.5})+SV.ra(ox+off,oy,'bl')+SV.t(ox+bw/2,oy+14,'下底 = '+b+' cm')+SV.t(ox+bw/2,oy-hh-8,'上底 = '+a+' cm')+SV.t(ox+off-14,oy-hh/2+4,h+'',{c:'#ef4444',fs:10}),200,145)},
  circ:(r,mode)=>{var cr=Math.min(52,r*6),cx=105,cy=72;var s=SV.ci(cx,cy,cr)+SV.ci(cx,cy,2.5,{f:'#4f46e5',c:'#4f46e5'});if(mode==='r')s+=SV.l(cx,cy,cx+cr,cy,{c:'#ef4444'})+SV.t(cx+cr/2,cy-8,'r = '+r+' cm',{c:'#ef4444',fs:10});if(mode==='d'){var d2=r*2;s+=SV.l(cx-cr,cy,cx+cr,cy,{c:'#ef4444'})+SV.t(cx,cy-8,'d = '+d2+' cm',{c:'#ef4444',fs:10})}return SV.w(s,210,148)},
  cuboid:(l,w,h)=>{var sc=Math.min(70/l,50/w,60/h),sl=l*sc,sw2=w*.4*sc,sh=h*sc,dx=sw2*.85,dy=sw2*.55,ox=45,oy=118;return SV.w(SV.pg(ox+','+oy+' '+(ox+sl)+','+oy+' '+(ox+sl)+','+(oy-sh)+' '+ox+','+(oy-sh),{f:'#dbeafe',c:'#3b82f6'})+SV.pg(ox+','+(oy-sh)+' '+(ox+sl)+','+(oy-sh)+' '+(ox+sl+dx)+','+(oy-sh-dy)+' '+(ox+dx)+','+(oy-sh-dy),{f:'#bfdbfe',c:'#3b82f6'})+SV.pg((ox+sl)+','+oy+' '+(ox+sl+dx)+','+(oy-dy)+' '+(ox+sl+dx)+','+(oy-sh-dy)+' '+(ox+sl)+','+(oy-sh),{f:'#93c5fd',c:'#3b82f6'})+SV.t(ox+sl/2,oy+14,l+' cm',{fs:10})+SV.t(ox-14,oy-sh/2+4,h+' cm',{fs:10})+SV.t(ox+sl+dx/2+10,oy-dy/2+2,w+' cm',{fs:10}),220,145)},
  bars:(data)=>{var mx=Math.max(...data.map(d=>d.v));var bw=Math.min(28,150/data.length),gp=Math.min(8,30/data.length),cH=88,ox=38,oy=115;var cs=['#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6','#ec4899'];var s='';s+=SV.l(ox,oy,ox,oy-cH-8,{c:'#94a3b8',w:1});s+=SV.l(ox,oy,ox+data.length*(bw+gp)+8,oy,{c:'#94a3b8',w:1});data.forEach((d,i)=>{var bh=(d.v/mx)*cH,bx=ox+i*(bw+gp)+gp;s+=SV.re(bx,oy-bh,bw,bh,{f:cs[i%6],c:cs[i%6],sw:0,rx:2});s+=SV.t(bx+bw/2,oy+11,d.l,{fs:8,c:'#334155'});s+=SV.t(bx+bw/2,oy-bh-5,d.v+'',{fs:8,c:'#334155',fw:'bold'})});return SV.w(s,ox+data.length*(bw+gp)+15,138)},
  line:(data)=>{var mx=Math.max(...data.map(d=>d.v));if(mx===0)mx=1;var cW=155,cH=75,ox=38,oy=108;var s='';s+=SV.l(ox,oy,ox,oy-cH-8,{c:'#94a3b8',w:1});s+=SV.l(ox,oy,ox+cW+8,oy,{c:'#94a3b8',w:1});var gap=data.length>1?cW/(data.length-1):0;var pts=data.map((d,i)=>({x:ox+i*gap,y:oy-(d.v/mx)*cH}));if(pts.length>1){var ap='M'+pts[0].x+','+oy;pts.forEach(p=>{ap+=' L'+p.x+','+p.y});ap+=' L'+pts[pts.length-1].x+','+oy+' Z';s+='<path d="'+ap+'" fill="#c7d2fe" opacity="0.35"/>'}for(var i=1;i<pts.length;i++)s+=SV.l(pts[i-1].x,pts[i-1].y,pts[i].x,pts[i].y,{c:'#6366f1',w:2.5});pts.forEach((p,i)=>{s+=SV.ci(p.x,p.y,4,{f:'#fff',c:'#6366f1',sw:2});s+=SV.t(p.x,p.y-10,data[i].v+'',{fs:9,c:'#334155',fw:'bold'});s+=SV.t(p.x,oy+12,data[i].l,{fs:8,c:'#64748b'})});return SV.w(s,ox+cW+15,132)}
};

/* ─── Topics & Grades ─── */
export const TOPICS={
  1:[{id:'1N1',nm:'1N1 20以內的數',ic:'🔢',cat:'數'},{id:'1N2',nm:'1N2 基本加減法',ic:'➕',cat:'數'},{id:'1N3',nm:'1N3 100以內的數',ic:'💯',cat:'數'},{id:'1N4',nm:'1N4 加法和減法(一)',ic:'📝',cat:'數'},{id:'1M',nm:'1M 長度·貨幣·時間',ic:'📏',cat:'度量'},{id:'1S',nm:'1S 圖形與方向',ic:'🔷',cat:'圖形與空間'}],
  2:[{id:'2N1',nm:'2N1 三位數',ic:'🔢',cat:'數'},{id:'2N2',nm:'2N2 加減法(二)',ic:'➕',cat:'數'},{id:'2N3',nm:'2N3 基本乘法',ic:'✖️',cat:'數'},{id:'2N5',nm:'2N5 加減法(三)',ic:'➖',cat:'數'},{id:'2N6',nm:'2N6 基本除法',ic:'➗',cat:'數'},{id:'2M',nm:'2M 度量',ic:'📏',cat:'度量'},{id:'2S',nm:'2S 角·四邊形',ic:'📐',cat:'圖形與空間'},{id:'2D1',nm:'2D1 象形圖',ic:'📊',cat:'數據處理'}],
  3:[{id:'3N2',nm:'3N2 乘法(一)',ic:'✖️',cat:'數'},{id:'3N3',nm:'3N3 除法(一)',ic:'➗',cat:'數'},{id:'3N4',nm:'3N4 四則運算(一)',ic:'🧮',cat:'數'},{id:'3N5',nm:'3N5 分數(一)',ic:'🥧',cat:'數'},{id:'3M',nm:'3M 度量',ic:'⚖️',cat:'度量'},{id:'3S',nm:'3S 四邊形·三角形',ic:'📐',cat:'圖形與空間'},{id:'3D1',nm:'3D1 棒形圖(一)',ic:'📊',cat:'數據處理'}],
  4:[{id:'4N1',nm:'4N1 乘法(二)',ic:'✖️',cat:'數'},{id:'4N2',nm:'4N2 除法(二)',ic:'➗',cat:'數'},{id:'4N3',nm:'4N3 倍數和因數',ic:'🔢',cat:'數'},{id:'4N4',nm:'4N4 公倍數和公因數',ic:'🔗',cat:'數'},{id:'4N5',nm:'4N5 四則運算(二)',ic:'🧮',cat:'數'},{id:'4N6',nm:'4N6 分數(二)',ic:'🥧',cat:'數'},{id:'4N78',nm:'4N7-8 小數',ic:'🔣',cat:'數'},{id:'4M1',nm:'4M1 周界(一)',ic:'⬜',cat:'度量'},{id:'4M2',nm:'4M2 面積(一)',ic:'📐',cat:'度量'},{id:'4S1',nm:'4S1 四邊形(三)',ic:'◇',cat:'圖形與空間'},{id:'4D1',nm:'4D1 棒形圖(二)',ic:'📊',cat:'數據處理'}],
  5:[{id:'5N2',nm:'5N2 分數(三)異分母',ic:'🥧',cat:'數'},{id:'5N3',nm:'5N3 分數(四)乘法',ic:'✖️',cat:'數'},{id:'5N4',nm:'5N4 小數(三)乘法',ic:'🔣',cat:'數'},{id:'5N5',nm:'5N5 分數(五)除法',ic:'➗',cat:'數'},{id:'5A',nm:'5A 代數·方程',ic:'🔤',cat:'代數'},{id:'5M1',nm:'5M1 面積(二)',ic:'📐',cat:'度量'},{id:'5M2',nm:'5M2 體積(一)',ic:'📦',cat:'度量'},{id:'5S1',nm:'5S1 圓',ic:'⭕',cat:'圖形與空間'},{id:'5D1',nm:'5D1 複合棒形圖',ic:'📊',cat:'數據處理'}],
  6:[{id:'6N1',nm:'6N1 小數(四)除法',ic:'➗',cat:'數'},{id:'6N34',nm:'6N3-4 百分數',ic:'💯',cat:'數'},{id:'6A1',nm:'6A1 方程(二)',ic:'🔤',cat:'代數'},{id:'6M1',nm:'6M1 角度',ic:'📐',cat:'度量'},{id:'6M3',nm:'6M3 圓周',ic:'⭕',cat:'度量'},{id:'6M4',nm:'6M4 速率',ic:'🏃',cat:'度量'},{id:'6M5',nm:'6M5 圓面積',ic:'🟡',cat:'度量'},{id:'6S1',nm:'6S1 對稱',ic:'🦋',cat:'圖形與空間'},{id:'6D1',nm:'6D1 平均數',ic:'📊',cat:'數據處理'},{id:'6D2',nm:'6D2 折線圖',ic:'📈',cat:'數據處理'},{id:'6D34',nm:'6D3-4 圓形圖',ic:'🥧',cat:'數據處理'}]
};
export const GRADE_INFO={1:{nm:'小一',co:'rose'},2:{nm:'小二',co:'orange'},3:{nm:'小三',co:'amber'},4:{nm:'小四',co:'emerald'},5:{nm:'小五',co:'sky'},6:{nm:'小六',co:'violet'}};
export const DIFF_INFO={1:{nm:'基礎',ic:'⭐',co:'emerald',desc:'鞏固基本概念'},2:{nm:'標準',ic:'⭐⭐',co:'amber',desc:'多步驟應用題'},3:{nm:'挑戰',ic:'⭐⭐⭐',co:'rose',desc:'Band 1 級・含推理'}};
/* Difficulty filter: which d-values are allowed */
const DIFF_ALLOW={1:[1,2],2:[1,2,3],3:[2,3]};

/* ═══════════════════════════════════════════════════════════
   QUESTION BANKS — d:1=基礎  d:2=標準  d:3=挑戰(Band1)
   每題含 trap(干擾項) 標記
   ═══════════════════════════════════════════════════════════ */
export const Q={};

/* Context pools for variety */
const CTX={
  names:['小明','小華','小芬','志強','嘉欣','家俊','詠琪','浩然','子晴','俊熙'],
  places:['超級市場','文具店','書店','玩具店','水果店','運動用品店','家品店','麵包店'],
  food:['蘋果','橙','香蕉','芒果','草莓','西瓜','葡萄','桃'],
  item:['鉛筆','橡皮擦','尺子','練習簿','顏色筆','剪刀','膠水','筆袋'],
  sport:['足球','籃球','排球','乒乓球','羽毛球','游泳','跑步','跳繩'],
  vehicle:['巴士','小巴','的士','港鐵','渡輪','電車','校車','旅遊巴'],
  school:['培正小學','聖保祿','拔萃','喇沙','聖若瑟','瑪利諾','聖方濟','聖公會']
};
const nm=()=>pk(CTX.names);const pl=()=>pk(CTX.places);const fd=()=>pk(CTX.food);const it=()=>pk(CTX.item);

/* ─────────── P1 ─────────── */
Q[1]={
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

/* ─────────── P2 ─────────── */
Q[2]={
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
'2N5':[
  ()=>{var a=ri(100,400),b=ri(100,400),c=ri(50,200);return{d:1,tp:'calc',q:a+' + '+b+' + '+c+' = ?',a:String(a+b+c),s:['連加'],sc:2}},
  ()=>{var boys=ri(120,250),girls=ri(100,200),leave=ri(50,100);var dClasses=ri(6,10);return{d:2,tp:'work',q:pk(CTX.school)+'設有'+dClasses+'個班級，有男生'+boys+'人、女生'+girls+'人。放學後離開了'+leave+'人，還有多少人？',a:String(boys+girls-leave),trap:'班級數目',s:['🔍 班級數無關','總: '+boys+'+'+girls+'='+(boys+girls),'減: '+(boys+girls)+'−'+leave+'='+(boys+girls-leave)],sc:2}},
  /* d:3 — multi-step comparison */
  ()=>{var a=ri(200,400),b=ri(150,350),c=ri(100,250);return{d:3,tp:'work',q:'三個書架分別有'+a+'、'+b+'、'+c+'本書。最多的書架比最少的多多少本？三個書架共有多少本？',a:Math.abs(Math.max(a,b,c)-Math.min(a,b,c))+','+(a+b+c),s:['最多−最少','三個相加'],sc:3}}
],
'2N6':[
  ()=>{var dv=ri(3,9),q2=ri(5,9),r2=ri(1,dv-1);var n=dv*q2+r2;return{d:1,tp:'calc',q:n+' ÷ '+dv+' = ?',a:q2+'...'+r2,s:['答: '+q2+'...'+r2],sc:2}},
  ()=>{var cap=ri(4,8),total=ri(25,50);var full=Math.floor(total/cap),rem=total%cap;var dWeight=ri(100,300);return{d:2,tp:'work',q:total+'個'+fd()+'，每個重約'+dWeight+'克。每袋裝'+cap+'個，至少需要多少個袋？',a:String(rem>0?full+1:full),trap:'重量（'+dWeight+'克）',s:['🔍 重量無關',total+'÷'+cap+'='+full+'...'+rem,'有餘數要多1袋: '+(full+1)],sc:2}},
  ()=>{var per=ri(3,8),groups=ri(4,7);var total=per*groups+ri(1,per-1);var r=total%per;var dTime=pk(['上午10時','下午2時','早上9時']);return{d:2,tp:'work',q:dTime+'開始活動。'+total+'個學生平均分每組'+per+'人，最多分成多少組？剩多少人？',a:Math.floor(total/per)+','+r,trap:'活動時間（'+dTime+'）',s:['🔍 時間無關',total+'÷'+per+'='+Math.floor(total/per)+'...'+r],sc:2}},
  /* d:3 — open-ended */
  ()=>{var n=ri(20,35);return{d:3,tp:'fill',q:n+'個學生坐船，每艘船最多坐6人。至少需要多少艘船？如果改為每艘坐4人呢？',a:Math.ceil(n/6)+','+Math.ceil(n/4),s:['6人: '+Math.ceil(n/6)+'艘','4人: '+Math.ceil(n/4)+'艘'],sc:3}}
],
'2M':[
  ()=>{var m=ri(2,5),cm=ri(10,90),m2=ri(1,3),cm2=ri(10,80);return{d:1,tp:'calc',q:m+'米'+cm+'厘米 + '+m2+'米'+cm2+'厘米 = ____厘米',a:String(m*100+cm+m2*100+cm2),s:['化成厘米再加'],sc:2}},
  ()=>{var total=ri(200,500),part=ri(80,150);var dWidth=ri(2,5);return{d:2,tp:'short',q:'繩子長'+total+'厘米、闊'+dWidth+'厘米。用去'+part+'厘米後再用去'+(part-30)+'厘米，還剩多長？',a:String(total-part-(part-30)),trap:'繩子闊度（'+dWidth+'厘米）',s:['🔍 闊度無關',total+'−'+part+'='+(total-part),(total-part)+'−'+(part-30)+'='+(total-part-(part-30))],sc:2}},
  ()=>{var kg=ri(1,3),g=ri(100,800);return{d:3,tp:'fill',q:kg+'公斤'+g+'克 = ____克',a:String(kg*1000+g),s:[kg+'×1000+'+g+'='+(kg*1000+g)],sc:2}}
],
'2S':[
  ()=>({d:2,tp:'mc',q:'一個四邊形有4個直角，它一定是什麼形狀？',isMC:true,opts:[{l:'A',v:'正方形',c:false},{l:'B',v:'長方形',c:true},{l:'C',v:'平行四邊形',c:false}],a:'B',s:['4個直角→長方形'],sc:2}),
  ()=>({d:3,tp:'mc',q:'以下哪項是正確的？',isMC:true,opts:[{l:'A',v:'所有正方形都是長方形',c:true},{l:'B',v:'所有長方形都是正方形',c:false},{l:'C',v:'三角形有4個角',c:false}],a:'A',s:['正方形是特殊的長方形'],sc:2})
],
'2D1':[
  ()=>{var items=[{l:'蘋果',v:ri(5,12)},{l:'橙',v:ri(3,10)},{l:'香蕉',v:ri(6,15)},{l:'西瓜',v:ri(4,11)}];var mx=items.reduce((m,i)=>i.v>m.v?i:m,items[0]),mn=items.reduce((m,i)=>i.v<m.v?i:m,items[0]);var dPrice=ri(5,15);return{d:2,tp:'short',q:'象形圖顯示水果數目：'+items.map(i=>i.l+i.v+'個').join('、')+'。蘋果每個售$'+dPrice+'。最多比最少多多少個？',a:String(mx.v-mn.v),trap:'蘋果售價（$'+dPrice+'）',s:['🔍 售價無關','最多: '+mx.l+'('+mx.v+')，最少: '+mn.l+'('+mn.v+')','差: '+(mx.v-mn.v)],sc:2}},
  ()=>{var items=[{l:pk(CTX.sport),v:ri(8,20)},{l:pk(CTX.sport),v:ri(5,15)},{l:pk(CTX.sport),v:ri(10,25)}];var total=items.reduce((s,i)=>s+i.v,0);return{d:3,tp:'short',q:'象形圖: '+items.map(i=>i.l+i.v+'人').join('、')+'。共有多少人？如果再加入7人玩'+items[0].l+'，'+items[0].l+'比'+items[1].l+'多多少人？',a:total+','+(items[0].v+7-items[1].v),s:['總: '+total,'新差: '+(items[0].v+7)+'−'+items[1].v+'='+(items[0].v+7-items[1].v)],sc:3}}
]
};

/* ─────────── P3 ─────────── */
Q[3]={
'3N2':[
  ()=>{var a=ri(35,99),b=ri(6,9);return{d:1,tp:'calc',q:a+' × '+b+' = ?',a:String(a*b),s:['兩位×一位'],sc:2}},
  ()=>{var a=ri(100,350),b=ri(3,9);return{d:1,tp:'calc',q:a+' × '+b+' = ?',a:String(a*b),s:['三位×一位'],sc:2}},
  ()=>{var price=ri(25,60),n=ri(5,12),paid=1000;var total=price*n;var dStudents=ri(30,45),dDiscount='九折';return{d:2,tp:'work',q:'班上有'+dStudents+'位學生。'+nm()+'到'+pl()+'買書，書店正進行'+dDiscount+'優惠（未使用）。每本書$'+price+'，買了'+n+'本，付了$'+paid+'。找回多少元？',a:String(paid-total),trap:'學生數和折扣（未使用）',s:['🔍 學生數和折扣均無關','總: '+price+'×'+n+'='+total,'找回: '+paid+'−'+total+'='+(paid-total)],sc:3}},
  ()=>{var a=ri(15,35),b=ri(3,6),c=ri(8,20),d2=ri(2,4);var dE=ri(5,10),dEP=ri(2,4);return{d:2,tp:'work',q:'文具店有鉛筆每盒'+b+'枝(共'+a+'盒)、原子筆每盒'+d2+'枝(共'+c+'盒)，以及橡皮擦'+dE+'個(每個$'+dEP+')。鉛筆和原子筆共有多少枝？',a:String(a*b+c*d2),trap:'橡皮擦數量和價錢',s:['🔍 橡皮擦無關','鉛筆: '+a*b,'原子筆: '+c*d2,'共: '+(a*b+c*d2)],sc:3}},
  /* d:3 — distributive */
  ()=>{var a=ri(20,50),b=ri(20,50);var s2=a+b;return{d:3,tp:'calc',q:'用簡便方法計算：'+a+' × 99 + '+b+' × 99',a:String(s2*99),s:['提取公因數: ('+a+'+'+b+')×99 = '+s2+'×99 = '+s2*99],sc:3}}
],
'3N3':[
  ()=>{var dv=ri(4,9),q2=ri(30,70),r=ri(1,dv-1);var n=dv*q2+r;return{d:1,tp:'calc',q:n+' ÷ '+dv+' = ?',a:q2+'...'+r,s:['有餘數除法'],sc:2}},
  ()=>{var per=ri(6,12),total=ri(150,300);var full=Math.floor(total/per),rem=total%per;var dColor=pk(['紅色','藍色','綠色']),dFactory=ri(50,100);return{d:2,tp:'work',q:'工廠有'+dFactory+'名工人，生產了'+total+'件'+dColor+'玩具。每箱裝'+per+'件，至少需要多少個箱？',a:String(rem>0?full+1:full),trap:'工人數和顏色',s:['🔍 工人數和顏色無關',total+'÷'+per+'='+full+'...'+rem,'需'+(full+1)+'箱'],sc:3}},
  ()=>{var cap=ri(5,8),people=ri(20,45);var full=Math.floor(people/cap),rem=people%cap;var dLunch=ri(30,60),dDist=ri(10,30);return{d:3,tp:'work',q:people+'位同學帶$'+dLunch+'午餐費，乘'+pk(CTX.vehicle)+'到'+dDist+'公里外的農場。每輛最多坐'+cap+'人，最少需多少輛？',a:String(rem>0?full+1:full),trap:'午餐費和距離',s:['🔍 午餐費和距離無關',people+'÷'+cap+'='+full+'...'+rem],sc:3}}
],
'3N4':[
  ()=>{var a=ri(15,40),b=ri(3,8),c=ri(20,60);return{d:1,tp:'calc',q:a+' × '+b+' + '+c+' = ?',a:String(a*b+c),s:['先乘後加'],sc:2}},
  ()=>{var a=ri(10,25),b=ri(5,15),c=ri(3,7);return{d:1,tp:'calc',q:'('+a+' + '+b+') × '+c+' = ?',a:String((a+b)*c),s:['先算括號'],sc:2}},
  ()=>{var n=ri(4,8),p1=ri(12,30),p2=ri(8,20),paid=500;var cost=n*p1+n*p2;var dRP=ri(15,25),dRN=ri(3,8);return{d:2,tp:'work',q:nm()+'買了'+n+'本中文書(每本$'+p1+')和'+n+'本英文書(每本$'+p2+')。店裏雨傘每把$'+dRP+'(共'+dRN+'把)，但未購買。付了$'+paid+'，找回多少元？',a:String(paid-cost),trap:'雨傘資料（未購買）',s:['🔍 雨傘無關','中: '+n*p1,'英: '+n*p2,'找回: '+(paid-cost)],sc:3}},
  ()=>{var a=ri(100,300),b=ri(3,8),c=ri(50,150);return{d:2,tp:'calc',q:a+' − '+c+' × '+b+' = ?',a:String(a-c*b),s:['先乘: '+c+'×'+b+'='+c*b,'再減: '+(a-c*b)],sc:2}},
  /* d:3 — error finding */
  ()=>{var a=ri(5,15),b=ri(3,8),c=ri(10,20);var wrong=(a+b)*c;var right=a+b*c;return{d:3,tp:'work',q:nm()+'計算 '+a+' + '+b+' × '+c+' = '+wrong+'。他做對了嗎？如果不對，正確答案是什麼？',a:String(right),s:['❌ 應先算乘法','正確: '+a+'+'+b*c+' = '+right],sc:3}}
],
'3N5':[
  ()=>{var den=pk([4,6,8]),a=ri(1,den-2),b=ri(1,den-a-1);return{d:1,tp:'calc',q:a+'/'+den+' + '+b+'/'+den+' = ?',a:fS(a+b,den),s:['同分母相加'],sc:2}},
  ()=>{var den=pk([3,5,6,8]),a=ri(Math.ceil(den*0.6),den+3),b=ri(1,den-1);return{d:1,tp:'calc',q:a+'/'+den+' − '+b+'/'+den+' = ?',a:fS(a-b,den),s:['同分母相減'],sc:2}},
  ()=>{var w1=ri(1,3),n1=ri(1,3),d1=pk([4,5,6]),w2=ri(1,2),n2=ri(1,d1-1);var imp1=w1*d1+n1,imp2=w2*d1+n2;return{d:2,tp:'calc',q:w1+'又'+n1+'/'+d1+' + '+w2+'又'+n2+'/'+d1+' = ?',a:fS(imp1+imp2,d1),s:['帶分數相加'],sc:2}},
  /* d:3 — comparison */
  ()=>{var d=pk([6,8,10]);var a=ri(1,d-1),b=ri(1,d-1);while(a===b)b=ri(1,d-1);return{d:3,tp:'mc',q:a+'/'+d+' 和 '+b+'/'+d+' 哪個較大？',isMC:true,opts:[{l:'A',v:a+'/'+d,c:a>b},{l:'B',v:b+'/'+d,c:b>a},{l:'C',v:'一樣大',c:a===b}],a:a>b?'A':'B',s:['同分母比分子'],sc:2}}
],
'3M':[
  ()=>{var km=ri(2,6),m=ri(100,900),km2=ri(1,4),m2=ri(100,800);return{d:1,tp:'calc',q:km+'公里'+m+'米 + '+km2+'公里'+m2+'米 = ____米',a:String(km*1000+m+km2*1000+m2),s:['化成米再加'],sc:2}},
  ()=>{var items=[{n:fd(),w:ri(200,400)},{n:fd(),w:ri(150,300)},{n:fd(),w:ri(100,250)}];var total=items.reduce((s,i)=>s+i.w,0);var dBox=ri(50,100),dBoxC=pk(['紅色','藍色']);return{d:2,tp:'short',q:items.map(i=>i.n+'重'+i.w+'克').join('，')+'。放在'+dBoxC+'盒子(空盒重'+dBox+'克)。水果共重多少克？比1公斤多還是少？差多少克？',a:total+','+(total>=1000?'多':'少')+','+Math.abs(total-1000),trap:'盒子重量和顏色',s:['🔍 盒子無關','水果: '+total+'克','與1000克差: '+Math.abs(total-1000)],sc:3}},
  /* d:3 — unit conversion chain */
  ()=>{var km=ri(2,5),m=ri(200,800);var total_m=km*1000+m;return{d:3,tp:'fill',q:km+'公里'+m+'米 = ____米 = ____厘米',a:total_m+','+(total_m*100),s:[km+'×1000+'+m+'='+total_m,total_m+'×100='+(total_m*100)],sc:3}}
],
'3S':[
  ()=>({d:2,tp:'mc',q:'以下哪個不一定是平行四邊形？',isMC:true,opts:[{l:'A',v:'正方形',c:false},{l:'B',v:'長方形',c:false},{l:'C',v:'梯形',c:true}],a:'C',s:['梯形只有一組平行邊'],sc:2}),
  ()=>{var n=ri(3,6);return{d:2,tp:'calc',q:n+'個不同大小的平行四邊形的內角總和是多少度？',a:String(n*360),s:['每個360°, '+n+'×360='+n*360],sc:2}},
  ()=>({d:3,tp:'mc',q:'一個三角形三條邊長分別是3cm、4cm和8cm，這三角形存在嗎？',isMC:true,opts:[{l:'A',v:'存在',c:false},{l:'B',v:'不存在',c:true}],a:'B',s:['3+4=7 < 8，不符合三角不等式'],sc:3})
],
'3D1':[
  ()=>{var items=[{l:'足球',v:ri(15,35)},{l:'籃球',v:ri(10,30)},{l:'排球',v:ri(12,28)},{l:'乒乓球',v:ri(20,40)}];var total=items.reduce((s,i)=>s+i.v,0);var mx=items.reduce((m,i)=>i.v>m.v?i:m,items[0]);var mn=items.reduce((m,i)=>i.v<m.v?i:m,items[0]);return{d:2,tp:'short',q:'根據棒形圖，四種球共有多少個？最多比最少多多少個？',fig:FIG.bars(items),a:total+','+(mx.v-mn.v),s:['總和: '+total,'差: '+(mx.v-mn.v)],sc:3}},
  ()=>{var items=[{l:'一月',v:ri(20,50)},{l:'二月',v:ri(15,45)},{l:'三月',v:ri(25,60)}];var avg=Math.round(items.reduce((s,i)=>s+i.v,0)/items.length);return{d:3,tp:'short',q:'棒形圖顯示三個月銷量。三個月平均銷量是多少？',fig:FIG.bars(items),a:String(avg),s:['總÷3='+avg],sc:3}}
]
};

/* ─────────── P4 ─────────── */
Q[4]={
'4N1':[
  ()=>{var a=ri(35,99),b=ri(25,75);return{d:1,tp:'calc',q:a+' × '+b+' = ?',a:String(a*b),s:['兩位×兩位'],sc:2}},
  ()=>{var a=ri(30,80),b=ri(15,40),c=ri(20,60);return{d:2,tp:'calc',q:a+' × '+b+' + '+a+' × '+c+' = ?',a:String(a*(b+c)),s:['分配律: '+a+'×('+b+'+'+c+')'],sc:2}},
  ()=>{var packs=ri(40,80),per=ri(100,200),extra=ri(200,600);var dWeight=ri(5,15),dShop=pk(CTX.places);return{d:2,tp:'work',q:dShop+'現有花生'+packs+'包，每包'+per+'顆，每顆重約'+dWeight+'克。再添加'+extra+'顆，共有花生多少顆？',a:String(packs*per+extra),trap:'每顆重量和店名',s:['🔍 重量和店名無關',packs+'×'+per+'='+packs*per,packs*per+'+'+extra+'='+(packs*per+extra)],sc:3}},
  ()=>{var cn=ri(12,20),en=ri(10,16),ma=ri(5,10),sets=ri(200,400);var dPrice=ri(50,120);return{d:3,tp:'work',q:'一套圖書有'+cn+'本中文、'+en+'本英文和'+ma+'本數學，每套售$'+dPrice+'。'+pl()+'有'+sets+'套，共有中英文書多少本？',a:String((cn+en)*sets),trap:'售價和數學書數量',s:['🔍 售價和數學書無關','中英: '+(cn+en),'×'+sets+' = '+(cn+en)*sets],sc:3}},
  /* d:3 — simplification strategy */
  ()=>{var a=ri(10,25);return{d:3,tp:'calc',q:'用簡便方法計算：'+a+' × 101',a:String(a*101),s:[a+'×100 + '+a+'×1 = '+a*100+' + '+a+' = '+a*101],sc:2}}
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
  ()=>{var n=pk([12,18,24,30]);var fs=fOf(n);return{d:3,tp:'fill',q:n+'有____個因數。最大因數和最小因數相差____。',a:fs.length+','+(fs[fs.length-1]-fs[0]),s:['因數: '+fs.join(','),'差: '+(fs[fs.length-1]-fs[0])],sc:3}}
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
  ()=>{var a=ri(100,300),b=ri(20,60),c=ri(5,9),d=ri(10,30);return{d:2,tp:'calc',q:a+' − '+b+' × '+c+' + '+d+' = ?',a:String(a-b*c+d),s:['先乘後加減'],sc:2}},
  ()=>{var small=ri(15,25),big=small+ri(3,8),n=ri(200,350);var dMember=ri(1000,5000),dOpen=ri(8,22);return{d:2,tp:'work',q:'超市有會員'+dMember+'人，每日營業'+dOpen+'小時。細包裝每包$'+small+'，大包裝比細包裝貴$'+(big-small)+'。各買'+n+'包需付多少元？',a:String((small+big)*n),trap:'會員數和營業時間',s:['🔍 會員和營業時間無關','大: '+big,'兩種×'+n+': '+(small+big)*n],sc:3}},
  ()=>{var girls=ri(20,40),leave=ri(3,10),ratio=ri(10,20);var dArea=ri(100,300);return{d:3,tp:'work',q:'禮堂面積'+dArea+'平方米，有女學生'+girls+'人。'+leave+'人離開後，男學生是餘下女學生的'+ratio+'倍。男學生有多少人？',a:String((girls-leave)*ratio),trap:'禮堂面積',s:['🔍 面積無關','餘下: '+(girls-leave),'男: '+(girls-leave)*ratio],sc:3}}
],
'4N6':[
  ()=>{var n=ri(10,25),den=ri(3,7);var w=Math.floor(n/den),r=n%den;return{d:1,tp:'fill',q:n+'/'+den+' 化為帶分數 = ____',a:r===0?String(w):w+'又'+r+'/'+den,s:['假分數÷分母'],sc:2}},
  ()=>{var den=pk([6,8,12]),a=ri(den+1,den*2),b=ri(1,den-1);return{d:2,tp:'calc',q:a+'/'+den+' − '+b+'/'+den+' = ?（最簡）',a:fS(a-b,den),s:['同分母相減後約分'],sc:2}},
  ()=>{var d=pk([4,6,8]);var pairs=[];for(var n=1;n<d;n++){if(gcd(n,d)>1)pairs.push(n+'/'+d+'='+fS(n,d))}return{d:3,tp:'fill',q:'寫出 1/'+d+'、2/'+d+'、...、'+(d-1)+'/'+d+' 中可以約分的分數及其最簡分數。',a:pairs.join(','),s:['逐一檢查公因數'],sc:3}}
],
'4N78':[
  ()=>{var a=ri(30,95),b=ri(20,85);return{d:1,tp:'calc',q:(a/10).toFixed(1)+' + '+(b/10).toFixed(1)+' = ?',a:((a+b)/10).toFixed(1),s:['小數加法'],sc:2}},
  ()=>{var a=ri(20,80),b=ri(10,50),c=ri(10,40);return{d:2,tp:'calc',q:(a/10).toFixed(1)+' + '+(b/10).toFixed(1)+' − '+(c/10).toFixed(1)+' = ?',a:((a+b-c)/10).toFixed(1),s:['先加後減'],sc:2}},
  ()=>{var a=ri(10,50),b=ri(10,50);return{d:3,tp:'fill',q:'____+ '+(b/10).toFixed(1)+' = '+((a+b)/10).toFixed(1),a:(a/10).toFixed(1),s:['逆向: '+((a+b)/10).toFixed(1)+'−'+(b/10).toFixed(1)+'='+(a/10).toFixed(1)],sc:2}}
],
'4M1':[
  ()=>{var w=ri(8,25),h=ri(5,18);return{d:1,tp:'short',q:'求長方形周界。',fig:FIG.rect(w,h),a:String((w+h)*2),s:['('+w+'+'+h+')×2='+(w+h)*2],sc:2}},
  ()=>{var s1=ri(5,12),s2=ri(8,18);var dH=ri(60,80);return{d:2,tp:'work',q:'桌面高'+dH+'cm。桌上正方形紙板邊長'+s1+'cm和長方形(長'+s2+'cm闊'+s1+'cm)。周界相差多少cm？',a:String(Math.abs(s1*4-(s2+s1)*2)),trap:'桌面高度',s:['🔍 桌面高度無關','正方: '+s1*4,'長方: '+(s2+s1)*2,'差: '+Math.abs(s1*4-(s2+s1)*2)],sc:3}},
  ()=>{var w=ri(8,15),h=ri(5,12);var peri=(w+h)*2;return{d:3,tp:'work',q:'長方形周界是'+peri+'cm，長是'+w+'cm。闊是多少cm？面積是多少cm²？',a:h+','+w*h,s:['闊: ('+peri+'÷2)−'+w+'='+h,'面積: '+w+'×'+h+'='+w*h],sc:3}}
],
'4M2':[
  ()=>{var w=ri(6,18),h=ri(4,14);return{d:1,tp:'short',q:'求長方形面積。',fig:FIG.rect(w,h),a:String(w*h),s:[w+'×'+h+'='+w*h],sc:2}},
  ()=>{var w=ri(8,15),h=ri(5,10),cut=ri(2,4);var dPW=ri(80,150);return{d:2,tp:'work',q:'長方形紙板長'+w+'cm闊'+h+'cm，每cm²重'+dPW+'毫克。剪去邊長'+cut+'cm正方形，剩餘面積？',a:String(w*h-cut*cut),trap:'紙板重量',s:['🔍 重量無關','長方: '+w*h,'正方: '+cut*cut,'剩: '+(w*h-cut*cut)],sc:3}},
  ()=>{var area=ri(40,100),w=ri(4,8);var h=area/w;if(h!==Math.floor(h)){area=w*ri(5,12);h=area/w}return{d:3,tp:'work',q:'長方形面積'+area+'cm²，闊'+w+'cm。求長和周界。',a:h+','+(w+h)*2,s:['長: '+area+'÷'+w+'='+h,'周界: ('+w+'+'+h+')×2='+(w+h)*2],sc:3}}
],
'4S1':[
  ()=>({d:1,tp:'mc',q:'所有正方形都是菱形，對嗎？',isMC:true,opts:[{l:'A',v:'正確',c:true},{l:'B',v:'不正確',c:false}],a:'A',s:['正方形四邊等長→菱形'],sc:2}),
  ()=>{var n=ri(4,7);return{d:2,tp:'calc',q:n+'個平行四邊形，內角總和多少度？',a:String(n*360),s:[n+'×360='+n*360],sc:2}},
  ()=>({d:3,tp:'mc',q:'以下哪種四邊形的對角線互相垂直？',isMC:true,opts:[{l:'A',v:'長方形',c:false},{l:'B',v:'菱形',c:true},{l:'C',v:'梯形',c:false}],a:'B',s:['菱形的對角線互相垂直平分'],sc:2})
],
'4D1':[
  ()=>{var items=[{l:'中文',v:ri(40,90)},{l:'英文',v:ri(35,85)},{l:'數學',v:ri(45,95)},{l:'常識',v:ri(30,75)}];var total=items.reduce((s,i)=>s+i.v,0);var mx=items.reduce((m,i)=>i.v>m.v?i:m,items[0]);var dTestTime=ri(30,60);return{d:2,tp:'short',q:'棒形圖（測驗時間'+dTestTime+'分鐘）。四科合共多少分？最高分是哪科？',fig:FIG.bars(items),a:total+','+mx.l,trap:'測驗時間',s:['🔍 測驗時間無關','總: '+total,'最高: '+mx.l],sc:3}},
  ()=>{var items=[{l:'A班',v:ri(30,45)},{l:'B班',v:ri(25,40)},{l:'C班',v:ri(35,50)}];var avg=Math.round(items.reduce((s,i)=>s+i.v,0)/items.length);return{d:3,tp:'short',q:'棒形圖顯示三班成績。平均分是多少？（四捨五入至整數）',fig:FIG.bars(items),a:String(avg),s:['三班總÷3='+avg],sc:3}}
]
};

/* ─────────── P5 ─────────── */
Q[5]={
'5N2':[
  ()=>{var d1=pk([3,4,6]),d2=pk([4,6,8]);if(d1===d2)d2=d1*2;var l=lcm(d1,d2);var n1=ri(1,d1-1),n2=ri(1,d2-1);var res=n1*(l/d1)+n2*(l/d2);return{d:1,tp:'calc',q:n1+'/'+d1+' + '+n2+'/'+d2+' = ?',a:fS(res,l),s:['通分母: L.C.M.='+l],sc:2}},
  ()=>{var d1=pk([3,4,6]),d2=pk([4,6,8]);if(d1===d2)d2=d1+2;var l=lcm(d1,d2);var n1=ri(Math.ceil(d1*0.6),d1-1),n2=ri(1,Math.floor(d2*0.4));var v1=n1*(l/d1),v2=n2*(l/d2);if(v1<=v2){n1=d1-1;v1=n1*(l/d1)}return{d:2,tp:'calc',q:n1+'/'+d1+' − '+n2+'/'+d2+' = ?',a:fS(v1-v2,l),s:['通分母後相減'],sc:2}},
  ()=>{return{d:3,tp:'calc',q:'3/4 + 1/6 − 1/3 = ?',a:fS(9+2-4,12),s:['L.C.M.=12, 9/12+2/12−4/12=7/12'],sc:3}},
  ()=>{var d1=pk([3,4,5]),d2=pk([4,6,8]);if(d1===d2)d2=d1+2;var l=lcm(d1,d2);var n1=ri(1,d1-1),n2=ri(1,d2-1);var v1=n1*(l/d1),v2=n2*(l/d2);return{d:3,tp:'mc',q:n1+'/'+d1+' 和 '+n2+'/'+d2+' 哪個較大？',isMC:true,opts:[{l:'A',v:n1+'/'+d1,c:v1>v2},{l:'B',v:n2+'/'+d2,c:v2>v1},{l:'C',v:'一樣大',c:v1===v2}],a:v1>v2?'A':v2>v1?'B':'C',s:['通分母比較: '+v1+'/'+l+' vs '+v2+'/'+l],sc:2}}
],
'5N3':[
  ()=>{var n1=ri(2,5),d1=pk([3,5,7]),n2=ri(2,4),d2=pk([4,6,8]);return{d:1,tp:'calc',q:n1+'/'+d1+' × '+n2+'/'+d2+' = ?',a:fS(n1*n2,d1*d2),s:['分子×分子，分母×分母'],sc:2}},
  ()=>{var w=ri(2,4),n=ri(1,3),den=pk([4,5,6]),m=ri(3,8);var imp=w*den+n;return{d:2,tp:'calc',q:w+'又'+n+'/'+den+' × '+m+' = ?',a:fS(imp*m,den),s:['先化假分數再乘'],sc:2}},
  ()=>{var recL=ri(6,14),fN=ri(2,3),fD=pk([4,5]);var dThick=pk([2,3,5]),dColor=pk(['白色','黃色']);var width=recL*fN/fD;return{d:3,tp:'work',q:'一塊'+dColor+'紙板厚'+dThick+'mm，長'+recL+'cm，闊是長的'+fN+'/'+fD+'。面積？',a:String(recL*width),trap:'顏色和厚度',s:['🔍 顏色和厚度無關','闊='+width,'面積='+recL*width],sc:3}}
],
'5N4':[
  ()=>{var a=ri(15,40),b=ri(12,35);return{d:1,tp:'calc',q:(a/10).toFixed(1)+' × '+(b/10).toFixed(1)+' = ?',a:((a*b)/100).toFixed(2),s:['小數×小數'],sc:2}},
  ()=>{var a=ri(20,50),b=ri(20,50),c=ri(10,30);return{d:2,tp:'calc',q:'('+(a/10).toFixed(1)+' + '+(b/10).toFixed(1)+') × '+(c/10).toFixed(1)+' = ?',a:(((a+b)*c)/100).toFixed(2),s:['先算括號'],sc:2}},
  ()=>{var price=ri(20,60),qty=ri(8,20);var disc=0.8;var dM=ri(500,2000),dA=ri(200,500);return{d:3,tp:'work',q:pl()+'面積'+dA+'平方米，有會員'+dM+'人。原價每件$'+(price/10).toFixed(1)+'0，打八折後每件多少？買'+qty+'件共多少？',a:(price/10*disc).toFixed(2)+','+(price/10*disc*qty).toFixed(2),trap:'面積和會員數',s:['🔍 面積和會員數無關','折扣價×'+qty],sc:3}}
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
  ()=>{var rb=ri(10,20),rh=ri(6,14),tb=ri(8,Math.min(16,rb)),th=ri(5,Math.min(12,rh));var dFP=ri(50,100);return{d:3,tp:'work',q:'長方形土地長'+rb+'m闊'+rh+'m，圍欄每米$'+dFP+'。中間三角形花圃(底'+tb+'m高'+th+'m)。花圃外面積？',a:String(rb*rh-tb*th/2),trap:'圍欄造價',s:['🔍 造價無關','長方: '+rb*rh,'三角: '+tb*th/2,'差: '+(rb*rh-tb*th/2)],sc:3}}
],
'5M2':[
  ()=>{var l=ri(5,12),w=ri(3,8),h=ri(3,7);return{d:1,tp:'short',q:'求長方體體積。',fig:FIG.cuboid(l,w,h),a:String(l*w*h),s:[l+'×'+w+'×'+h+'='+l*w*h],sc:2}},
  ()=>{var l=ri(6,12),w=ri(4,8),h=ri(3,6),water=ri(50,80);var dMat=pk(['玻璃','塑膠']),dWt=ri(500,2000);return{d:2,tp:'work',q:dMat+'長方體水箱重'+dWt+'克，長'+l+'cm闊'+w+'cm高'+h+'cm。水位'+water+'%滿。水的體積？',a:String(Math.round(l*w*h*water/100)),trap:'材質和重量',s:['🔍 材質和重量無關','容積: '+l*w*h,'水: '+Math.round(l*w*h*water/100)],sc:3}},
  /* d:3 — reverse */
  ()=>{var l=ri(5,10),w=ri(3,7);var vol=l*w*ri(3,6);var h=vol/(l*w);return{d:3,tp:'work',q:'長方體體積'+vol+'cm³，長'+l+'cm闊'+w+'cm。高多少cm？',a:String(h),s:[vol+'÷'+l+'÷'+w+'='+h],sc:2}}
],
'5S1':[
  ()=>{var r=ri(4,15);return{d:1,tp:'fill',q:'圓的半徑'+r+'cm，直徑____cm，周界約____cm（π=3.14）',a:r*2+','+(2*3.14*r).toFixed(2),s:['d=2r, C=2πr'],sc:2}},
  ()=>{var r=ri(3,8);var sq=r*2;var dRL=ri(30,60);return{d:3,tp:'work',q:'圓內接在邊長'+sq+'cm正方形中。旁邊有'+dRL+'cm繩子。圓面積與正方形面積相差多少？(π=3.14)',a:(sq*sq-3.14*r*r).toFixed(2),trap:'繩子長度',s:['🔍 繩子無關','正方: '+sq*sq,'圓: '+(3.14*r*r).toFixed(2),'差: '+(sq*sq-3.14*r*r).toFixed(2)],sc:3}}
],
'5D1':[
  ()=>{var a1=ri(150,300),a2=ri(100,250),b1=ri(120,280),b2=ri(130,260);var items=[{l:'男A',v:a1},{l:'女A',v:a2},{l:'男B',v:b1},{l:'女B',v:b2}];var totalA=a1+a2,totalB=b1+b2;return{d:2,tp:'short',q:'棒形圖：A校和B校共多少人？哪校較多？多多少？',fig:FIG.bars(items),a:(totalA+totalB)+','+(totalA>totalB?'A校':'B校')+','+Math.abs(totalA-totalB),s:['A: '+totalA,'B: '+totalB],sc:3}},
  ()=>{var items=[{l:'一月',v:ri(100,200)},{l:'二月',v:ri(80,180)},{l:'三月',v:ri(120,250)},{l:'四月',v:ri(90,200)}];var total=items.reduce((s,i)=>s+i.v,0);var avg=Math.round(total/4);return{d:3,tp:'short',q:'棒形圖顯示四個月銷量。平均銷量是多少？哪個月最接近平均值？',fig:FIG.bars(items),a:avg+','+items.reduce((c,i)=>Math.abs(i.v-avg)<Math.abs(c.v-avg)?i:c,items[0]).l,s:['平均: '+avg,'逐一比較差距'],sc:3}}
]
};

/* ─────────── P6 ─────────── */
Q[6]={
'6N1':[
  ()=>{var a=ri(20,80),b=ri(3,9);return{d:1,tp:'calc',q:(a/10).toFixed(1)+' ÷ '+b+' = ?',a:(a/(b*10)).toFixed(2),s:['小數÷整數'],sc:2}},
  ()=>{var a=ri(30,90),b=ri(3,8),c=ri(10,50);return{d:2,tp:'calc',q:(a/10).toFixed(1)+' ÷ '+b+' + '+(c/10).toFixed(1)+' = ?',a:(a/(b*10)+c/10).toFixed(2),s:['先除後加'],sc:2}},
  ()=>{var ans=(ri(10,50)/10).toFixed(1);var b=ri(3,8);var a=(parseFloat(ans)*b).toFixed(1);return{d:3,tp:'calc',q:'____ ÷ '+b+' = '+ans,a:a,s:['逆向: '+ans+'×'+b+'='+a],sc:2}}
],
'6N34':[
  ()=>{var w=ri(15,60)*10,p=pk([15,20,25,30]);return{d:1,tp:'calc',q:w+'的'+p+'% = ?',a:String(w*p/100),s:['百分數計算'],sc:2}},
  ()=>{var orig=ri(200,800),pDec=pk([10,15,20,25]);var newP=orig*(100-pDec)/100;var dStock=ri(50,200);return{d:2,tp:'short',q:pk(CTX.places)+'存貨'+dStock+'件。原價$'+orig+'打'+(10-pDec/10)+'折，售價多少？',a:String(newP),trap:'存貨數量',s:['🔍 存貨無關','售價: '+newP],sc:2}},
  ()=>{var cost=ri(100,300),markup=pk([20,25,30,40]);var sell=cost*(100+markup)/100;var disc=pk([10,15,20]);var final2=sell*(100-disc)/100;var dRent=ri(8000,20000),dStaff=ri(3,8);return{d:3,tp:'work',q:'店舖月租$'+dRent+'，有'+dStaff+'名員工。貨品成本$'+cost+'，加價'+markup+'%出售，再打'+(10-disc/10)+'折。促銷價多少？賺還是蝕？差額？',a:Math.round(final2)+','+(final2>cost?'賺':'蝕')+','+Math.abs(Math.round(final2-cost)),trap:'月租和員工數',s:['🔍 月租和員工無關','售價: '+Math.round(sell),'促銷: '+Math.round(final2),'比較成本'],sc:3}},
  ()=>{var girls=ri(150,300),boys=ri(120,280);var total=girls+boys;var pG=Math.round(girls/total*100);var dT=ri(20,50),dAge=ri(30,80);return{d:3,tp:'work',q:'學校建校'+dAge+'年，有'+dT+'位老師、男生'+boys+'人、女生'+girls+'人。女生佔學生百分之幾？（四捨五入至整數）',a:pG+'%',trap:'建校年數和老師數',s:['🔍 建校年數和老師無關','總學生: '+total,'女生%: ≈'+pG+'%'],sc:3}}
],
'6A1':[
  ()=>{var x=ri(5,20),a=ri(3,8),b=ri(15,60);return{d:1,tp:'calc',q:a+'x + '+b+' = '+(a*x+b)+'，x = ?',a:String(x),s:['移項求解'],sc:2}},
  ()=>{var x=ri(5,18),a=ri(2,5),b=ri(10,30),c=ri(3,8);return{d:2,tp:'calc',q:a+'x + '+b+' = '+c+'x + '+(a*x+b-c*x)+'，x = ?',a:String(x),s:['移項歸邊'],sc:3}},
  ()=>{var age=ri(8,14),ratio=ri(3,4),diff=age*(ratio-1);var dSib=ri(5,age-2),dPet=ri(1,3);return{d:3,tp:'work',q:nm()+'有'+dSib+'歲的弟弟和'+dPet+'隻寵物。媽媽年齡是'+CTX.names[0]+'的'+ratio+'倍，比'+CTX.names[0]+'大'+diff+'歲。'+CTX.names[0]+'幾歲？',a:String(age),trap:'弟弟年齡和寵物數',s:['🔍 弟弟和寵物無關','設x歲: '+ratio+'x−x='+diff,'x='+age],sc:3}}
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
  ()=>{var d=pk([120,150,180,200,240]);var s=pk([40,50,60]);var t=d/s;return{d:3,tp:'fill',q:'距離'+d+'km，速率'+s+'km/h。需要____小時。',a:String(t),s:['時間=距離÷速率='+d+'÷'+s+'='+t],sc:2}}
],
'6M5':[
  ()=>{var r=ri(4,12);return{d:1,tp:'short',q:'半徑'+r+'cm，求圓面積。(π=3.14)',fig:FIG.circ(r,'r'),a:(3.14*r*r).toFixed(2),s:['πr²='+(3.14*r*r).toFixed(2)],sc:2}},
  ()=>{var r=ri(3,8);var sq=2*r;var dWeight=ri(100,500);return{d:3,tp:'work',q:'重'+dWeight+'克正方形鐵板邊長'+sq+'cm，挖去內切圓。圓面積？正方形比圓多多少？(π=3.14)',a:(3.14*r*r).toFixed(2)+','+(sq*sq-3.14*r*r).toFixed(2),trap:'鐵板重量',s:['🔍 重量無關','圓: '+(3.14*r*r).toFixed(2),'差: '+(sq*sq-3.14*r*r).toFixed(2)],sc:3}}
],
'6S1':[
  ()=>{var shapes=[{n:'正方形',a:'4'},{n:'等邊三角形',a:'3'},{n:'正六邊形',a:'6'}];var s=pk(shapes);return{d:1,tp:'fill',q:s.n+'有____條對稱軸。',a:s.a,s:['正n邊形有n條'],sc:1}},
  ()=>({d:2,tp:'mc',q:'平行四邊形(非長方形)有多少條對稱軸？',isMC:true,opts:[{l:'A',v:'0條',c:true},{l:'B',v:'1條',c:false},{l:'C',v:'2條',c:false}],a:'A',s:['一般平行四邊形無對稱軸'],sc:2}),
  ()=>({d:3,tp:'mc',q:'以下哪個圖形既有旋轉對稱又有線對稱？',isMC:true,opts:[{l:'A',v:'等腰三角形',c:false},{l:'B',v:'正六邊形',c:true},{l:'C',v:'平行四邊形',c:false}],a:'B',s:['正六邊形有6條對稱軸和旋轉對稱'],sc:3})
],
'6D1':[
  ()=>{var n=ri(4,7);var vals=[];for(var i=0;i<n;i++)vals.push(ri(50,98));var sum=vals.reduce((s,v)=>s+v,0);var avg=sum/n;return{d:1,tp:'calc',q:vals.join('、')+'的平均數 = ?',a:avg%1===0?String(avg):avg.toFixed(1),s:['總÷'+n],sc:2}},
  ()=>{var n=ri(4,6);var vals=[];for(var i=0;i<n;i++)vals.push(ri(60,95));var sum=vals.reduce((s,v)=>s+v,0);var avg=sum/n;var target=Math.ceil(avg)+ri(2,8);var need=target*(n+1)-sum;var dAbsent=ri(1,3);return{d:3,tp:'work',q:'有'+dAbsent+'人缺席。現有'+n+'次成績：'+vals.join('、')+'。要令'+(n+1)+'次平均達'+target+'分，下次最少要多少分？',a:String(need),trap:'缺席人數',s:['🔍 缺席無關','現總: '+sum,'目標總: '+target*(n+1),'需: '+need],sc:3}}
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

/* ═══════════════════════════════════════════════════════════
   EXAM BUILDER — with difficulty filtering
   ═══════════════════════════════════════════════════════════ */
const EXAM_TARGETS={practice:12,test:15,exam:24};
const SECT_RATIOS={calc:.28,fill:.18,mc:.12,short:.22,work:.20};
const SECT_CONF={calc:{nm:'計算題',nt:'每題2分'},fill:{nm:'填充題',nt:'分數見各題'},mc:{nm:'選擇題',nt:'每題1-2分'},short:{nm:'短答題',nt:'每題2-3分'},work:{nm:'列式題',nt:'每題2-3分'}};
const SECT_LBL=['甲','乙','丙','丁','戊'];
// ==============================================================
//  📌 BAND 1 增強補丁 — 7 大策略，~27 新題型
//  📌 貼在 engine.js 尾部，export 語句之前
//  📌 無需改動任何現有代碼，自動擴充題庫
// ==============================================================

/* ---- patch helpers ---- */
function _addQ(key,...fns){
  var g = parseInt(key[0]);
  if(Q[g] && Q[g][key]) Q[g][key].push(...fns);
}
function _nm2(){var a=nm(),b=nm();while(b===a)b=nm();return[a,b];}
function _pl(){return pk(['圖書館','超市','文具店','書店','玩具店','果園','農場','運動場','禮堂','飯堂','課室','公園']);}
function _it(){return pk([
  {n:'蘋果',u:'個'},{n:'鉛筆',u:'枝'},{n:'故事書',u:'本'},{n:'糖果',u:'粒'},
  {n:'貼紙',u:'張'},{n:'雞蛋',u:'隻'},{n:'曲奇餅',u:'塊'},{n:'練習簿',u:'本'}
]);}


// ==============================================================
//  STRATEGY 1 — Template Rotation（同一運算，多個情境）
// ==============================================================

// --- P3 乘法：3 個故事模板 ---
_addQ('3N3',
  ()=>{
    var a=ri(2,9),b=ri(3,9),ans=a*b,it=_it();
    var t=[
      ()=>nm()+'每天吃'+a+it.u+it.n+'，'+b+'天共吃多少'+it.u+'？',
      ()=>_pl()+'有'+b+'排座位，每排'+a+'個。共有多少個座位？',
      ()=>'每盒有'+a+'塊餅乾，'+nm()+'買了'+b+'盒。共有多少塊？'
    ];
    return{d:1,tp:'work',q:pk(t)(),a:String(ans),s:[a+'×'+b+'='+ans]};
  },
  ()=>{
    var a=ri(2,9),b=ri(2,9),ans=a*b;
    var t=[
      ()=>nm()+'有'+b+'本相簿，每本可放'+a+'張相片。最多可放多少張？',
      ()=>_pl()+'每行種了'+a+'棵花，共'+b+'行。一共有多少棵？',
      ()=>'一包有'+a+'粒朱古力，'+nm()+'買了'+b+'包。一共有多少粒？'
    ];
    return{d:1,tp:'work',q:pk(t)(),a:String(ans),s:[a+'×'+b+'='+ans]};
  }
);

// --- P4 乘除法：3 個模板 ---
_addQ('4N1',
  ()=>{
    var a=ri(12,45),b=ri(3,9),ans=a*b;
    var t=[
      ()=>'校隊有'+b+'組，每組'+a+'人。校隊共有多少人？',
      ()=>nm()+'每月儲蓄$'+a+'，'+b+'個月後共儲了多少？',
      ()=>'每層有'+a+'級樓梯，大廈共'+b+'層。全部共多少級？'
    ];
    return{d:2,tp:'work',q:pk(t)(),a:String(ans),s:[a+'×'+b+'='+ans]};
  },
  ()=>{
    var b=ri(3,9),q=ri(3,12),a=b*q,it=_it();
    var t=[
      ()=>nm()+'有'+a+it.u+it.n+'，平均分給'+b+'人。每人分到多少'+it.u+'？',
      ()=>a+'粒糖果，每袋裝'+b+'粒。可裝多少袋？',
      ()=>_pl()+'有'+a+'張椅子，每行放'+b+'張。共有多少行？'
    ];
    return{d:2,tp:'work',q:pk(t)(),a:String(q),s:[a+'÷'+b+'='+q]};
  }
);

// --- P5 小數加法：3 個模板 ---
_addQ('5N3',
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
);

// --- P6 百分數：3 個模板 ---
_addQ('6N1',
  ()=>{
    var total=ri(5,20)*20,pct=pk([10,15,20,25,30,40]),ans=total*pct/100;
    var t=[
      ()=>'全校'+total+'人，其中'+pct+'%參加了旅行。多少人參加了旅行？',
      ()=>'一批貨物共'+total+'箱，已運走'+pct+'%。運走了多少箱？',
      ()=>nm()+'有$'+total+'，花了'+pct+'%買書。花了多少錢？'
    ];
    return{d:2,tp:'work',q:pk(t)(),a:String(ans),s:[total+' × '+pct+'% = '+ans]};
  }
);


// ==============================================================
//  STRATEGY 2 — Reverse / Inverse（逆向思維題）
// ==============================================================

// P3 逆向乘法 → 除法
_addQ('3N4',
  ()=>{
    var a=ri(2,9),b=ri(2,9),p=a*b,it=_it();
    return{d:2,tp:'work',
      q:nm()+'共有'+p+it.u+it.n+'，每份'+a+it.u+'。可以分成多少份？',
      a:String(b),s:[p+'÷'+a+'='+b]};
  }
);

// P4 逆向：求單價 / 求原來的錢
_addQ('4N1',
  ()=>{
    var price=ri(5,25),qty=ri(3,8),total=price*qty;
    return{d:2,tp:'work',
      q: (function(){
  var scenes = [
    // 1. Buy toys (original)
    {act:'買了',unit:'件',item:'玩具',cost:'共花了$'+total,ask:'每件多少錢？'},
    // 2. Buy pens
    {act:'買了',unit:'枝',item:'鉛筆',cost:'共花了$'+total,ask:'每枝多少錢？'},
    // 3. Buy books
    {act:'買了',unit:'本',item:'故事書',cost:'共花了$'+total,ask:'每本多少錢？'},
    // 4. Share candies
    {act:'有'+total+'粒糖果，平均分給',unit:'',item:'',cost:'',ask:''},
    // 5. Cut rope
    {act:'有一條',unit:'',item:'繩子',cost:'長'+total+'cm',ask:''},
    // 6. Read pages
    {act:'要看一本',unit:'',item:'',cost:total+'頁的書',ask:''},
    // 7. Pack cookies
    {act:'有'+total+'塊曲奇餅，平均放入',unit:'',item:'',cost:'',ask:''},
    // 8. Students in groups
    {act:'有'+total+'個學生，平均分成',unit:'',item:'',cost:'',ask:''}
  ];
  // Pick a random scene type (cleaner templates below)
  var t = pk([1,2,3,4,5,6,7,8]);
  switch(t){
    case 1: return nm()+'買了'+n+'件玩具，共花了$'+total+'。每件多少錢？';
    case 2: return nm()+'買了'+n+'枝鉛筆，共花了$'+total+'。每枝多少錢？';
    case 3: return nm()+'買了'+n+'本故事書，共花了$'+total+'。每本多少錢？';
    case 4: return nm()+'有'+total+'粒糖果，平均分給'+n+'個小朋友。每人分到多少粒？';
    case 5: return '一條繩子長'+total+'cm，平均剪成'+n+'段。每段長多少cm？';
    case 6: return nm()+'要在'+n+'天內看完一本'+total+'頁的書。每天要看多少頁？';
    case 7: return nm()+'有'+total+'塊曲奇餅，平均放入'+n+'個盒子。每個盒子放多少塊？';
    case 8: return '有'+total+'個學生，平均分成'+n+'組。每組有多少人？';
  }
})(),
      a:String(price),s:['$'+total+'÷'+qty+' = $'+price]};
  },
  ()=>{
    var spent=ri(15,40),gained=ri(10,25),current=ri(25,50);
    var original=current+spent-gained;
    return{d:3,tp:'work',
      q:nm()+'先用了$'+spent+'買文具，再收到$'+gained+'利是錢。現在有$'+current+'。他原來有多少錢？',
      a:String(original),
      s:['原來 = $'+current+' + $'+spent+' − $'+gained+' = $'+original]};
  }
);

// P5 逆向：已知面積求邊
_addQ('5S1',
  ()=>{
    var w=ri(5,15),h=ri(3,12),area=w*h;
    return{d:3,tp:'work',
      q:'長方形面積是'+area+'cm²，長'+w+'cm。闊是多少cm？',
      a:String(h),s:['闊 = '+area+' ÷ '+w+' = '+h+' cm']};
  }
);

// P6 逆向：打折後求原價
_addQ('6N1',
  ()=>{
    var orig=ri(5,20)*20;
    var disc=pk([{zh:'九折',m:0.9},{zh:'八折',m:0.8},{zh:'七折',m:0.7}]);
    var price=orig*disc.m;
    return{d:3,tp:'work',
      q:'一個書包打'+disc.zh+'後售$'+price+'。原價是多少？',
      a:String(orig),
      s:['打'+disc.zh+' = ×'+disc.m,'原價 = $'+price+' ÷ '+disc.m+' = $'+orig]};
  }
);


// ==============================================================
//  STRATEGY 3 — Comparison / Best Deal（比較最優題）
// ==============================================================

// P4 比較單價
_addQ('4N3',
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
         cheaper+'店較便宜']};
  }
);

// P5 比較分數
_addQ('5N2',
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
  }
);

// P6 比較折扣
_addQ('6N1',
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
  }
);


// ==============================================================
//  STRATEGY 4 — Fencepost / Boundary（柵欄問題）
// ==============================================================

// 種樹問題（頭尾都種）
_addQ('4N1',
  ()=>{
    var gap=ri(3,8),count=ri(6,12),dist=gap*(count-1);
    return{d:3,tp:'work',
      q:'一條'+dist+'米長的路，每隔'+gap+'米種一棵樹（頭尾都種）。共需多少棵樹？',
      a:String(count),
      s:[dist+'÷'+gap+' = '+(count-1),'頭尾都種: '+(count-1)+' + 1 = '+count],
      trap:{wrong:dist/gap,msg:'忘記 +1！頭尾都種要 +1'}};
  },
  // 鋸木問題
  ()=>{
    var pieces=ri(4,10),time=ri(2,5),cuts=pieces-1,total=cuts*time;
    return{d:3,tp:'work',
      q:nm()+'把一條木頭鋸成'+pieces+'段，每鋸一刀用'+time+'分鐘。共需多少分鐘？',
      a:String(total),
      s:[pieces+'段需要'+cuts+'刀',cuts+'×'+time+' = '+total+'分鐘'],
      trap:{wrong:pieces*time,msg:pieces+'段只需'+cuts+'刀！'}};
  },
  // 兩邊插旗
  ()=>{
    var gap=pk([5,10]),dist=gap*ri(4,10),oneS=dist/gap+1,both=oneS*2;
    return{d:3,tp:'work',
      q:'一條'+dist+'米的路，兩邊每隔'+gap+'米插一面旗（頭尾都插）。共需多少面旗？',
      a:String(both),
      s:['一邊: '+dist+'÷'+gap+' + 1 = '+oneS,
         '兩邊: '+oneS+'×2 = '+both]};
  }
);


// ==============================================================
//  STRATEGY 5 — Multi-Constraint（多條件限制題）
// ==============================================================

// P4 公倍數
_addQ('4N3',
  ()=>{
    var d1=pk([3,4,5]),d2=pk([2,3,4]);
    while(d1===d2) d2=pk([2,3,4]);
    var lo=10,hi=50,results=[];
    for(var i=lo;i<=hi;i++) if(i%d1===0&&i%d2===0) results.push(i);
    if(results.length===0){d1=3;d2=5;results=[];for(var i=lo;i<=hi;i++) if(i%d1===0&&i%d2===0) results.push(i);}
    return{d:3,tp:'fill',
      q:lo+'至'+hi+'之間，同時是'+d1+'和'+d2+'的倍數的數有哪些？（用逗號分隔）',
      a:results.join(','),
      s:['找'+d1+'和'+d2+'的公倍數: '+results.join(', ')]};
  }
);

// P5 分數多條件
_addQ('5N1',
  ()=>{
    var fA=pk([3,4]),fB=pk([4,6]);
    while(fA===fB) fB=pk([4,6]);
    var total=pk([3,4,5,6])*12;  // 確保能被 fA 和 fB 整除
    var partA=total/fA,partB=total/fB,left=total-partA-partB;
    var ns=_nm2();
    return{d:3,tp:'work',
      q:ns[0]+'有'+total+'粒糖，給了 1/'+fA+' 給'+ns[1]+'，又給了 1/'+fB+' 給媽媽。還剩多少粒？',
      a:String(left),
      s:[ns[1]+': '+total+'×1/'+fA+' = '+partA,
         '媽媽: '+total+'×1/'+fB+' = '+partB,
         '剩餘: '+total+' − '+partA+' − '+partB+' = '+left]};
  }
);


// ==============================================================
//  STRATEGY 6 — Error-Finding（找錯改正題）
// ==============================================================

// P4 運算次序錯誤：加 vs 乘
_addQ('4N3',
  ()=>{
    var a=ri(10,30),b=ri(2,8),c=ri(3,9);
    var correct=a+b*c,wrong=(a+b)*c;
    return{d:3,tp:'work',
      q:nm()+'計算 '+a+' + '+b+' × '+c+' = '+wrong+'。正確答案是多少？',
      a:String(correct),
      s:['❌ 先乘除後加減',
         '✅ '+b+'×'+c+' = '+(b*c),
         '✅ '+a+' + '+(b*c)+' = '+correct]};
  },
  // 減 vs 乘
  ()=>{
    var a=ri(30,60),b=ri(2,5),c=ri(3,6);
    var correct=a-b*c,wrong=(a-b)*c;
    return{d:3,tp:'work',
      q:nm()+'計算 '+a+' − '+b+' × '+c+' = '+wrong+'。正確答案是多少？',
      a:String(correct),
      s:['先算乘: '+b+'×'+c+' = '+(b*c),
         '再算減: '+a+' − '+(b*c)+' = '+correct]};
  }
);

// P5 分數加法錯誤（分母也相加）
_addQ('5N1',
  ()=>{
    var d=pk([4,5,6,8]),n1=ri(1,Math.floor(d/2)),n2=ri(1,Math.floor(d/2));
    if(n1+n2>=d){n1=1;n2=1;}
    var correctN=n1+n2,wrongD=d+d;
    function _gcd(a,b){return b?_gcd(b,a%b):a;}
    var g=_gcd(correctN,d),ansN=correctN/g,ansD=d/g;
    var ansStr=ansN+'/'+ansD;
    return{d:3,tp:'work',
      q:nm()+'計算 '+n1+'/'+d+' + '+n2+'/'+d+' = '+correctN+'/'+wrongD+'。正確答案是多少？',
      a:ansStr,
      s:['❌ 同分母加法，分母不變！',
         '✅ '+n1+'/'+d+' + '+n2+'/'+d+' = '+correctN+'/'+d,
         g>1?'約分 = '+ansStr:'']};
  }
);


// ==============================================================
//  STRATEGY 7 — Cross-Topic（跨課題綜合題）
// ==============================================================

// P4 周界 → 求邊 → 求面積
_addQ('4S1',
  ()=>{
    var w=ri(5,15),h=ri(3,10),peri=(w+h)*2;
    return{d:3,tp:'work',
      q:'長方形周界'+peri+'cm，長'+w+'cm。求闊和面積。（用逗號分隔）',
      a:h+','+(w*h),
      s:['闊 = '+peri+'÷2 − '+w+' = '+h+' cm',
         '面積 = '+w+'×'+h+' = '+(w*h)+' cm²']};
  }
);

// P5 時間 + 金錢
_addQ('5M1',
  ()=>{
    var rate=ri(5,15)*10,hours=ri(3,8);
    var start_h=ri(8,11),end_h=start_h+hours;
    return{d:2,tp:'work',
      q:nm()+'做兼職，時薪$'+rate+'。由'+start_h+':00工作至'+end_h+':00。共賺多少錢？',
      a:String(rate*hours),
      s:['工時: '+end_h+' − '+start_h+' = '+hours+' 小時',
         '工資: $'+rate+' × '+hours+' = $'+(rate*hours)]};
  }
);

// P5 分數 + 金錢
_addQ('5N1',
  ()=>{
    var frac_d=pk([3,4,5,6]),total=frac_d*ri(5,15);
    var spent=total/frac_d,left=total-spent;
    return{d:2,tp:'work',
      q:nm()+'有$'+total+'，用了全部的 1/'+frac_d+' 買文具。還剩多少錢？',
      a:String(left),
      s:['用了: $'+total+' × 1/'+frac_d+' = $'+spent,
         '剩餘: $'+total+' − $'+spent+' = $'+left]};
  }
);

// P6 百分數 + 面積
_addQ('6N1',
  ()=>{
    var w=ri(10,30),h=ri(10,20),totalArea=w*h;
    var pct=pk([20,25,30,40]),garden=totalArea*pct/100;
    return{d:3,tp:'work',
      q:'一塊長'+w+'m、闊'+h+'m的空地，其中'+pct+'%建花園。花園面積多少m²？',
      a:String(garden),
      s:['空地 = '+w+'×'+h+' = '+totalArea+' m²',
         '花園 = '+totalArea+' × '+pct+'% = '+garden+' m²']};
  }
);

// P6 比例 + 金錢
_addQ('6N34',
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
  }
);

// ============================================================
//  PHASE 2 — MORE REVERSE & COMPARISON (P4–P6)
// ============================================================

// ─────────── P4 REVERSE ───────────

// 4M1: 已知周界求邊
_addQ('4M1',
  ()=>{
    var w=ri(8,20),h=ri(4,15),peri=(w+h)*2;
    return{d:3,tp:'work',
      q:'長方形周界是'+peri+'cm，長是'+w+'cm。闊是多少cm？',
      a:String(h),
      s:['闊 = '+peri+'÷2 − '+w+' = '+h]};
  },
  ()=>{
    var s=ri(5,18),peri=s*4;
    return{d:2,tp:'work',
      q:'正方形周界是'+peri+'cm。邊長是多少cm？面積呢？',
      a:s+','+(s*s),
      s:[peri+'÷4 = '+s,'面積 = '+s+'×'+s+' = '+s*s]};
  }
);

// 4M2: 已知面積求邊 + 求周界
_addQ('4M2',
  ()=>{
    var w=ri(5,15),h=ri(3,12),area=w*h;
    return{d:3,tp:'work',
      q:'長方形面積是'+area+'cm²，長是'+w+'cm。闊是多少cm？周界是多少cm？',
      a:h+','+(w+h)*2,
      s:['闊 = '+area+'÷'+w+' = '+h,
         '周界 = ('+w+'+'+h+')×2 = '+(w+h)*2]};
  }
);

// 4N78: 小數逆向 — 求缺少的數
_addQ('4N78',
  ()=>{
    var a=ri(15,60),b=ri(15,60),sum=a+b;
    return{d:3,tp:'fill',
      q:(a/10).toFixed(1)+' + ____ = '+(sum/10).toFixed(1),
      a:(b/10).toFixed(1),
      s:[(sum/10).toFixed(1)+' − '+(a/10).toFixed(1)+' = '+(b/10).toFixed(1)]};
  },
  ()=>{
    var a=ri(30,80),b=ri(10,a-10),diff=a-b;
    return{d:3,tp:'fill',
      q:'____ − '+(b/10).toFixed(1)+' = '+(diff/10).toFixed(1),
      a:(a/10).toFixed(1),
      s:[(diff/10).toFixed(1)+' + '+(b/10).toFixed(1)+' = '+(a/10).toFixed(1)]};
  }
);

// ─────────── P4 COMPARISON ───────────

// 4M2: 比較不同形狀面積
_addQ('4M2',
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
         bigger+'大'+diff+'cm²']};
  }
);

// 4N6: 比較異分母分數
_addQ('4N6',
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
         n2+'/'+d2+' = '+v2+'/'+l]};
  }
);

// ─────────── P5 REVERSE ───────────

// 5M1: 已知三角形面積求高
_addQ('5M1',
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
  }
);

// 5M2: 已知體積求邊 + 表面積
_addQ('5M2',
  ()=>{
    var l=ri(5,12),w=ri(3,8),h=ri(3,7),vol=l*w*h;
    var sa=2*(l*w+l*h+w*h);
    return{d:3,tp:'work',
      q:'長方體體積'+vol+'cm³，長'+l+'cm、闊'+w+'cm。高是多少cm？表面積呢？',
      a:h+','+sa,
      s:['高 = '+vol+'÷'+l+'÷'+w+' = '+h,
         '表面積 = 2×('+l*w+'+'+l*h+'+'+w*h+') = '+sa]};
  }
);

// 5N2: 已知分數和求缺少分數
_addQ('5N2',
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
  }
);

// 5N4: 小數乘法逆向
_addQ('5N4',
  ()=>{
    var a=ri(15,50),b=ri(3,9),product=a*b;
    return{d:3,tp:'calc',
      q:'____ × '+b+' = '+(product/10).toFixed(1),
      a:(a/10).toFixed(1),
      s:[(product/10).toFixed(1)+' ÷ '+b+' = '+(a/10).toFixed(1)]};
  }
);

// ─────────── P5 COMPARISON ───────────

// 5N2: 情境中比較分數
_addQ('5N2',
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
);

// 5M1: 比較三角形 vs 長方形面積
_addQ('5M1',
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
);

// ─────────── P6 REVERSE ───────────

// 6N34: 已知折扣價求原價
_addQ('6N34',
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
  }
);

// 6D1: 已知目標平均分求下次分數
_addQ('6D1',
  ()=>{
    var n=ri(3,5),vals=[];
    for(var i=0;i<n;i++) vals.push(ri(60,95));
    var sum=vals.reduce(function(s,v){return s+v},0);
    var targetAvg=Math.ceil(sum/n)+ri(3,8);
    var need=targetAvg*(n+1)-sum;
    return{d:3,tp:'work',
      q:nm()+'前'+n+'次測驗：'+vals.join('、')+'分。要令'+(n+1)+'次平均達'+targetAvg+'分，下次最少要多少分？',
      a:String(need),
      s:['現有總分: '+sum,
         '目標總分: '+targetAvg+'×'+(n+1)+' = '+targetAvg*(n+1),
         '需要: '+need+'分']};
  }
);

// 6M4: 已知距離和時間求速率
_addQ('6M4',
  ()=>{
    var s=pk([40,50,60,80]),t=ri(2,5),d=s*t;
    return{d:2,tp:'work',
      q:nm()+'開車行了'+d+'km，用了'+t+'小時。平均速率是多少km/h？',
      a:String(s),
      s:['速率 = '+d+'÷'+t+' = '+s+' km/h']};
  }
);

// 6M5: 已知圓面積求半徑
_addQ('6M5',
  ()=>{
    var r=pk([5,6,7,8,10]),area=3.14*r*r;
    return{d:3,tp:'work',
      q:'圓的面積是'+area.toFixed(2)+'cm²。半徑是多少cm？(π=3.14)',
      a:String(r),
      s:['r² = '+area.toFixed(2)+' ÷ 3.14 = '+r*r,
         'r = '+r+' cm']};
  }
);

// ─────────── P6 COMPARISON ───────────

// 6N34: 比較百分數加幅
_addQ('6N34',
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
);

// 6M4: 比較速率
_addQ('6M4',
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
);

// 6M5: 比較圓形 vs 正方形面積
_addQ('6M5',
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
);
// ===================== END OF PATCH =====================
// ═══════════════════════════════════════════════════════════
//  FIX: More image-based (short) questions for 4M1 & 4M2
// ═══════════════════════════════════════════════════════════

// --- 4M1 周界 image questions ---
_addQ('4M1',
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
    var w=ri(10,22),h=ri(6,16),peri=(w+h)*2;
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
);

// --- 4M2 面積 image questions ---
_addQ('4M2',
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
);
export function buildExam(grade,topics,examType,difficulty){
  difficulty=difficulty||2;
  var totalTarget=EXAM_TARGETS[examType]||24;
  var allowed=DIFF_ALLOW[difficulty]||[1,2,3];
  var allGens={calc:[],fill:[],mc:[],short:[],work:[]};
  topics.forEach(tid=>{
    var pool=(Q[grade]||{})[tid];if(!pool)return;
    pool.forEach(gen=>{
      try{
        var q=gen();
        if(!q||!q.tp||!allGens[q.tp])return;
        /* check difficulty compatibility */
        if(!allowed.includes(q.d||2))return;
        allGens[q.tp].push(gen);
      }catch(e){}
    });
  });
  var types=['calc','fill','mc','short','work'].filter(t=>allGens[t].length>0);
  if(!types.length)return[];
  var sumR=0;types.forEach(t=>{sumR+=SECT_RATIOS[t]||.1});
  var dist={};types.forEach(t=>{dist[t]=Math.max(1,Math.round(totalTarget*(SECT_RATIOS[t]||.1)/sumR))});
  var generated={};var count=0;
  types.forEach(t=>{
    var need=dist[t]||0,gens=allGens[t],qs=[],seen={},seenT={};
    for(var i=0;i<need*80&&qs.length<need;i++){
      try{var q=pk(gens)();if(!q||!q.q)continue;if(!allowed.includes(q.d||2))continue;var k=q.q+'|'+q.a;if(seen[k])continue;var tc=seenT[q.q]||0;if(tc>=1)continue;seen[k]=true;seenT[q.q]=tc+1;qs.push(q)}catch(e){}
    }
    if(qs.length>0){generated[t]=qs;count+=qs.length}
  });
  var gSeen={},gSeenT={};
  types.forEach(t=>(generated[t]||[]).forEach(q=>{gSeen[q.q+'|'+q.a]=true;gSeenT[q.q]=(gSeenT[q.q]||0)+1}));
  var safety=0;
  while(count<totalTarget&&safety<500){
    safety++;var t=pk(types);var gens=allGens[t];if(!gens.length)continue;if(!generated[t])generated[t]=[];
    try{var q=pk(gens)();if(!q||!q.q)continue;if(!allowed.includes(q.d||2))continue;var k=q.q+'|'+q.a;if(gSeen[k])continue;if((gSeenT[q.q]||0)>=1)continue;gSeen[k]=true;gSeenT[q.q]=(gSeenT[q.q]||0)+1;generated[t].push(q);count++}catch(e){}
  }
  while(count>totalTarget){
    var longest=types.filter(t=>(generated[t]||[]).length>1).sort((a,b)=>(generated[b]||[]).length-(generated[a]||[]).length);
    if(!longest.length)break;generated[longest[0]].pop();count--;
  }
  var secs=[];
  ['calc','fill','mc','short','work'].forEach(t=>{var qs=generated[t];if(!qs||!qs.length)return;var total=qs.reduce((s,q)=>s+(q.sc||2),0);secs.push({id:t,label:SECT_LBL[secs.length],nm:SECT_CONF[t].nm,nt:SECT_CONF[t].nt,total,qs})});
  return secs;
}

/* ═══════════════════════════════════════════════════════════
   PRINT
   ═══════════════════════════════════════════════════════════ */
export function printExam(secs,grade,showAns,name,difficulty){
  var gt=secs.reduce((s,sec)=>s+sec.total,0);
  var esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br/>');
  var diffLabel=DIFF_INFO[difficulty||2].nm;
  var b='';
  secs.forEach(sec=>{
    b+='<div style="margin:14px 0 6px;border-bottom:2px solid #333;padding-bottom:3px"><b>'+sec.label+'. '+sec.nm+'（'+sec.total+'分，'+sec.nt+'）</b></div>';
    sec.qs.forEach((q,i)=>{
      b+='<div style="margin:6px 0;padding:4px 0;border-bottom:1px dashed #ddd"><b>'+(i+1)+'.</b> '+esc(q.q);
      if(q.fig)b+='<div style="margin:4px 0;text-align:center">'+q.fig+'</div>';
      if(q.isMC&&q.opts)b+='<div style="margin:3px 0 0 18px;display:flex;flex-wrap:wrap;gap:4px 24px">'+q.opts.map(o=>'<span>'+o.l+'. '+esc(o.v)+'</span>').join('')+'</div>';
      if(sec.id==='work')b+='<div style="height:60px"></div>';
      b+='</div>';
    });
  });
  var ans='';
  if(showAns){
    ans='<div style="page-break-before:always;border-top:3px double #333;padding-top:10px;margin-top:16px"><h2 style="text-align:center">參考答案</h2>';
    secs.forEach(sec=>{
      ans+='<div style="margin:8px 0"><b>'+sec.label+'. '+sec.nm+'</b><div style="display:flex;flex-wrap:wrap;gap:2px 12px;margin-top:3px">';
      sec.qs.forEach((q,i)=>{ans+='<span style="font-size:12px;width:46%"><b>'+(i+1)+'.</b> '+esc(q.a)+(q.trap?' <em style="color:#d97706;font-size:10px">[干擾: '+esc(q.trap)+']</em>':'')+'</span>'});
      ans+='</div></div>';
    });
    ans+='</div>';
  }
  var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>@page{size:A4;margin:15mm}body{font-family:"Microsoft JhengHei",sans-serif;font-size:13px;line-height:1.6}@media print{.np{display:none!important}}</style></head><body><div class="np" style="position:fixed;top:0;left:0;right:0;background:#4f46e5;padding:8px 16px;display:flex;justify-content:space-between;align-items:center;z-index:99"><span style="color:#fff;font-weight:bold">列印預覽</span><button onclick="window.print()" style="padding:6px 16px;border-radius:8px;border:none;cursor:pointer;font-weight:bold;background:#fff">列印</button></div><div class="np" style="height:44px"></div><div style="text-align:center;border-bottom:3px double #333;padding-bottom:8px;margin-bottom:10px"><h1 style="font-size:18px;margin:0">'+GRADE_INFO[grade].nm+'數學科模擬試卷（'+diffLabel+'）</h1><p style="font-size:11px;color:#666;margin:4px 0">依據教育局《小學數學科學習內容》(2017)編製 · 含干擾項訓練</p><div style="display:flex;justify-content:space-between;margin-top:6px"><span>姓名：'+(name||'________')+'</span><span>分數：____/'+gt+'</span></div></div>'+b+ans+'</body></html>';
  var w=window.open('','_blank','width=800,height=900');if(w){w.document.write(html);w.document.close();}
}

/* ═══════════════════════════════════════════════════════════
   LOCAL STORAGE — History
   ═══════════════════════════════════════════════════════════ */
const STORAGE_KEY='math_exam_history_v2';

export function saveHistory(entry){
  try{
    var hist=loadHistory();
    hist.unshift({...entry,ts:Date.now()});
    if(hist.length>50)hist=hist.slice(0,50);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(hist));
  }catch(e){}
}

export function loadHistory(){
  try{
    var raw=localStorage.getItem(STORAGE_KEY);
    return raw?JSON.parse(raw):[];
  }catch(e){return[]}
}

export function clearHistory(){
  try{localStorage.removeItem(STORAGE_KEY)}catch(e){}
}