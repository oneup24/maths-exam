import React,{useState} from 'react';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import {Download,Loader2} from 'lucide-react';

let fontCache=null;
const FONT='NotoSansTC';

function arrayBufferToBase64(buffer){
  let binary='';
  const bytes=new Uint8Array(buffer);
  for(let i=0;i<bytes.byteLength;i++)binary+=String.fromCharCode(bytes[i]);
  return btoa(binary);
}

async function loadFont(doc){
  if(!fontCache){
    const res=await fetch('/fonts/NotoSansTC-Regular.ttf');
    if(!res.ok)throw new Error('Font load failed: '+res.status);
    fontCache=await res.arrayBuffer();
  }
  const base64=arrayBufferToBase64(fontCache);
  doc.addFileToVFS('NotoSansTC-Regular.ttf',base64);
  doc.addFont('NotoSansTC-Regular.ttf',FONT,'normal');
}

function generateFilename(grade,studentName){
  const now=new Date();
  const yy=String(now.getFullYear()).slice(2);
  const mm=String(now.getMonth()+1).padStart(2,'0');
  const dd=String(now.getDate()).padStart(2,'0');
  const hh=String(now.getHours()).padStart(2,'0');
  const min=String(now.getMinutes()).padStart(2,'0');
  const safeName=(studentName||'Student').replace(/[/\\:*?"<>|]/g,'').trim().slice(0,20);
  return 'MQ_P'+grade+'_'+safeName+'_'+yy+mm+dd+'_'+hh+min+'.pdf';
}

export default function ExportPDFButton({sections,markRes,answers,mcSel,topicSummary,totScore,grandTotal,pct,grade,lang,studentName}){
  const[loading,setLoading]=useState(false);

  async function handleExport(){
    setLoading(true);
    try{
      const today=new Date();
      const dateStr=today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0');
      const topics=topicSummary||[];
      const zh=lang==='zh';

      const doc=new jsPDF('p','mm','a4');
      const pageW=doc.internal.pageSize.getWidth();
      const margin=14;

      // Load and register Chinese font
      await loadFont(doc);

      // ── Header ──
      doc.setFont(FONT,'normal');
      doc.setFontSize(18);
      doc.setTextColor(55,48,163);
      doc.text('Maths Quests \u6578\u5B78\u7DF4\u7FD2 \u2014 \u6E2C\u9A57\u5831\u544A',pageW/2,20,{align:'center'});

      doc.setFont(FONT,'normal');
      doc.setFontSize(10);
      doc.setTextColor(120,120,120);
      doc.text(dateStr,pageW/2,27,{align:'center'});

      // ── Grade + Score row ──
      doc.setFont(FONT,'normal');
      doc.setFontSize(12);
      doc.setTextColor(55,65,81);
      doc.text((zh?'\u5E74\u7D1A':'Grade')+': P'+grade,margin,36);

      doc.setFont(FONT,'normal');
      doc.text((zh?'\u5F97\u5206':'Score')+': '+totScore+' / '+grandTotal+' ('+pct+'%)',pageW-margin,36,{align:'right'});

      // Student name row
      const displayName=studentName||'';
      if(displayName){
        doc.setFont(FONT,'normal');
        doc.setFontSize(11);
        doc.setTextColor(75,85,99);
        doc.text((zh?'\u5B78\u751F':'Student')+': '+displayName,margin,43);
      }

      // Divider
      const dividerY=displayName?47:39;
      doc.setDrawColor(200,200,200);
      doc.setLineWidth(0.5);
      doc.line(margin,dividerY,pageW-margin,dividerY);

      // ── Questions table header ──
      const tableHeaderY=dividerY+8;
      doc.setFont(FONT,'normal');
      doc.setFontSize(12);
      doc.setTextColor(55,65,81);
      doc.text(zh?'\u984C\u76EE\u8A73\u60C5':'Question Details',margin,tableHeaderY);

      const allQs=[];
      (sections||[]).forEach((sec,si)=>{
        (sec.qs||[]).forEach((q,qi)=>{
          const k=si+'-'+qi;
          const mr=markRes[k];
          const studentAns=q.isMC?(mcSel[k]||''):(answers[k]||'');
          allQs.push({num:allQs.length+1,q:q.q,studentAns,correctAns:q.a,ok:mr&&mr.ok});
        });
      });

      autoTable(doc,{
        startY:tableHeaderY+3,
        margin:{left:margin,right:margin},
        head:[[
          '#',
          zh?'\u984C\u76EE':'Question',
          zh?'\u4F60\u7684\u7B54\u6848':'Your Answer',
          zh?'\u6B63\u78BA\u7B54\u6848':'Correct',
          zh?'\u7D50\u679C':'Result'
        ]],
        body:allQs.map(row=>[
          row.num,
          row.q,
          row.studentAns||'\u2014',
          row.correctAns,
          row.ok?'\u2713':'\u2717'
        ]),
        styles:{font:FONT,fontStyle:'normal',fontSize:8,cellPadding:2},
        headStyles:{font:FONT,fontStyle:'normal',fillColor:[238,242,255],textColor:[55,48,163]},
        bodyStyles:{font:FONT,fontStyle:'normal'},
        columnStyles:{
          0:{cellWidth:8,halign:'center'},
          1:{cellWidth:'auto'},
          2:{cellWidth:28},
          3:{cellWidth:28},
          4:{cellWidth:10,halign:'center'}
        },
        didParseCell(data){
          data.cell.styles.font=FONT;
          data.cell.styles.fontStyle='normal';
          if(data.section==='body'){
            if(data.column.index===2){
              const row=allQs[data.row.index];
              if(row)data.cell.styles.textColor=row.ok?[22,163,74]:[239,68,68];
            }
            if(data.column.index===4){
              const row=allQs[data.row.index];
              if(row)data.cell.styles.textColor=row.ok?[22,163,74]:[239,68,68];
            }
          }
        }
      });

      // ── Topic breakdown ──
      if(topics.length>0){
        const topicY=doc.lastAutoTable.finalY+8;
        doc.setFont(FONT,'normal');
        doc.setFontSize(12);
        doc.setTextColor(55,65,81);
        doc.text(zh?'\u5404\u55AE\u5143\u8868\u73FE':'Topic Performance',margin,topicY);

        autoTable(doc,{
          startY:topicY+3,
          margin:{left:margin,right:margin},
          head:[[
            zh?'\u55AE\u5143':'Topic',
            zh?'\u984C\u6578':'Attempted',
            zh?'\u7B54\u5C0D':'Correct',
            zh?'\u767E\u5206\u6BD4':'%'
          ]],
          body:topics.map(tp=>{
            const indicator=tp.pct>=80?'\u2713':tp.pct>=50?'\u25B3':'\u2717';
            return[tp.name,tp.total,tp.correct,indicator+' '+tp.pct+'%'];
          }),
          styles:{font:FONT,fontStyle:'normal',fontSize:9,cellPadding:2.5},
          headStyles:{font:FONT,fontStyle:'normal',fillColor:[238,242,255],textColor:[55,48,163]},
          bodyStyles:{font:FONT,fontStyle:'normal'},
          columnStyles:{
            0:{cellWidth:'auto'},
            1:{cellWidth:20,halign:'center'},
            2:{cellWidth:20,halign:'center'},
            3:{cellWidth:28,halign:'center'}
          },
          didParseCell(data){
            data.cell.styles.font=FONT;
            data.cell.styles.fontStyle='normal';
            if(data.section==='body'&&data.column.index===3){
              const tp=topics[data.row.index];
              if(tp)data.cell.styles.textColor=tp.pct>=80?[22,163,74]:tp.pct>=50?[217,119,6]:[239,68,68];
            }
          }
        });
      }

      // ── Footer ──
      const footerY=(doc.lastAutoTable?doc.lastAutoTable.finalY:200)+12;
      doc.setDrawColor(200,200,200);
      doc.setLineWidth(0.3);
      doc.line(margin,footerY,pageW-margin,footerY);
      doc.setFont(FONT,'normal');
      doc.setFontSize(8);
      doc.setTextColor(160,160,160);
      doc.text('Generated by Maths Quests \u2014 oneup24.com',pageW/2,footerY+5,{align:'center'});

      doc.save(generateFilename(grade,studentName));
    }catch(e){
      console.error('PDF export failed:',e);
    }finally{
      setLoading(false);
    }
  }

  return(
    <button onClick={handleExport} disabled={loading}
      className="flex-1 min-w-[80px] py-2 rounded-xl text-xs font-bold border-2 border-purple-300 bg-purple-50 text-purple-700 flex items-center justify-center gap-1 active:bg-purple-100 disabled:opacity-50">
      {loading?<Loader2 size={12} className="animate-spin"/>:<Download size={12}/>}
      {loading?(lang==='zh'?'生成中...':'Generating...'):(lang==='zh'?'匯出 PDF':'Export PDF')}
    </button>
  );
}
