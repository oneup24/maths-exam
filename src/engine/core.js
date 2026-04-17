/**
 * core.js — Utility functions, answer checker, SVG/Figure helpers
 * Extracted from engine.js
 */

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
export const chkAns=(stu,cor)=>{if(!stu)return false;const s=norm(stu),c=norm(cor);if(s===c)return true;const su=stripU(s),cu=stripU(c);if(su===cu)return true;const sf=parseFrac(su),cf=parseFrac(cu);if(sf!==null&&cf!==null&&Math.abs(sf-cf)<0.005)return true;if(c.includes(',')){const cp=c.split(',');const matchParts=sp=>cp.length===sp.length&&cp.every((v,i)=>{const a2=stripU(sp[i]||''),b2=stripU(v);if(a2===b2)return true;const an=parseFrac(a2),bn=parseFrac(b2);return an!==null&&bn!==null&&Math.abs(an-bn)<0.005});if(matchParts(s.split(',')))return true;const altParts=String(stu).trim().split(/[\s,，\n]+/).map(p=>stripU(norm(p))).filter(p=>p!=='');if(matchParts(altParts))return true}return false};

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

// Exports: ri, pk, gcd, lcm, fOf, fS, shuffle, chkAns, SV, FIG
