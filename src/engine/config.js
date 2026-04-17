/**
 * config.js — Topic tree, grade/difficulty configs, context pools
 * Extracted from engine.js
 */

import { pk } from './core.js';

/* ─── Topic Tree ─── */
export const TOPICS={
  1:[{id:'1N1',nm:'1N1 20以內的數',ic:'🔢',cat:'數'},{id:'1N2',nm:'1N2 基本加減法',ic:'➕',cat:'數'},{id:'1N3',nm:'1N3 100以內的數',ic:'💯',cat:'數'},{id:'1N4',nm:'1N4 加法和減法(一)',ic:'📝',cat:'數'},{id:'1M',nm:'1M 長度·貨幣·時間',ic:'📏',cat:'度量'},{id:'1S',nm:'1S 圖形與方向',ic:'🔷',cat:'圖形與空間'}],
  2:[{id:'2N1',nm:'2N1 三位數',ic:'🔢',cat:'數'},{id:'2N2',nm:'2N2 加減法(二)',ic:'➕',cat:'數'},{id:'2N3',nm:'2N3 基本乘法',ic:'✖️',cat:'數'},{id:'2N5',nm:'2N5 加減法(三)',ic:'➖',cat:'數'},{id:'2N6',nm:'2N6 基本除法',ic:'➗',cat:'數'},{id:'2M',nm:'2M 度量',ic:'📏',cat:'度量'},{id:'2S',nm:'2S 角·四邊形',ic:'📐',cat:'圖形與空間'},{id:'2D1',nm:'2D1 象形圖',ic:'📊',cat:'數據處理'}],
  3:[{id:'3N2',nm:'3N2 乘法(一)',ic:'✖️',cat:'數'},{id:'3N3',nm:'3N3 除法(一)',ic:'➗',cat:'數'},{id:'3N4',nm:'3N4 四則運算(一)',ic:'🧮',cat:'數'},{id:'3N5',nm:'3N5 分數(一)',ic:'🥧',cat:'數'},{id:'3M',nm:'3M 度量',ic:'⚖️',cat:'度量'},{id:'3S',nm:'3S 四邊形·三角形',ic:'📐',cat:'圖形與空間'},{id:'3D1',nm:'3D1 棒形圖(一)',ic:'📊',cat:'數據處理'}],
  4:[{id:'4N1',nm:'4N1 乘法(二)',ic:'✖️',cat:'數'},{id:'4N2',nm:'4N2 除法(二)',ic:'➗',cat:'數'},{id:'4N3',nm:'4N3 倍數和因數',ic:'🔢',cat:'數'},{id:'4N4',nm:'4N4 公倍數和公因數',ic:'🔗',cat:'數'},{id:'4N5',nm:'4N5 四則運算(二)',ic:'🧮',cat:'數'},{id:'4N6',nm:'4N6 分數(二)',ic:'🥧',cat:'數'},{id:'4N78',nm:'4N7-8 小數',ic:'🔣',cat:'數'},{id:'4M1',nm:'4M1 周界(一)',ic:'⬜',cat:'度量'},{id:'4M2',nm:'4M2 面積(一)',ic:'📐',cat:'度量'},{id:'4S1',nm:'4S1 四邊形(三)',ic:'◇',cat:'圖形與空間'},{id:'4D1',nm:'4D1 棒形圖(二)',ic:'📊',cat:'數據處理'}],
  5:[{id:'5N2',nm:'5N2 分數(三)異分母',ic:'🥧',cat:'數'},{id:'5N3',nm:'5N3 分數(四)乘法',ic:'✖️',cat:'數'},{id:'5N4',nm:'5N4 小數(三)乘法',ic:'🔣',cat:'數'},{id:'5N5',nm:'5N5 分數(五)除法',ic:'➗',cat:'數'},{id:'5A',nm:'5A 代數·方程',ic:'🔤',cat:'代數'},{id:'5M1',nm:'5M1 面積(二)',ic:'📐',cat:'度量'},{id:'5M2',nm:'5M2 體積(一)',ic:'📦',cat:'度量'},{id:'5S1',nm:'5S1 圓',ic:'⭕',cat:'圖形與空間'},{id:'5D1',nm:'5D1 複合棒形圖',ic:'📊',cat:'數據處理'}],
  6:[{id:'6N1',nm:'6N1 小數(四)除法',ic:'➗',cat:'數'},{id:'6N34',nm:'6N3-4 百分數',ic:'💯',cat:'數'},{id:'6A1',nm:'6A1 方程(二)',ic:'🔤',cat:'代數'},{id:'6M1',nm:'6M1 角度',ic:'📐',cat:'度量'},{id:'6M3',nm:'6M3 圓周',ic:'⭕',cat:'度量'},{id:'6M4',nm:'6M4 速率',ic:'🏃',cat:'度量'},{id:'6M5',nm:'6M5 圓面積',ic:'🟡',cat:'度量'},{id:'6S1',nm:'6S1 對稱',ic:'🦋',cat:'圖形與空間'},{id:'6D1',nm:'6D1 平均數',ic:'📊',cat:'數據處理'},{id:'6D2',nm:'6D2 折線圖',ic:'📈',cat:'數據處理'},{id:'6D34',nm:'6D3-4 圓形圖',ic:'🥧',cat:'數據處理'}]
};

/* ─── Grade & Difficulty Config ─── */
export const GRADE_INFO={1:{nm:'小一',co:'rose'},2:{nm:'小二',co:'orange'},3:{nm:'小三',co:'amber'},4:{nm:'小四',co:'emerald'},5:{nm:'小五',co:'sky'},6:{nm:'小六',co:'violet'}};
export const DIFF_INFO={1:{nm:'基礎',ic:'⭐',co:'emerald',desc:'鞏固基本概念'},2:{nm:'標準',ic:'⭐⭐',co:'amber',desc:'多步驟應用題'},3:{nm:'挑戰',ic:'⭐⭐⭐',co:'rose',desc:'Band 1 級・含推理'}};
/* Difficulty filter: which d-values are allowed */
export const DIFF_ALLOW={1:[1,2],2:[1,2,3],3:[2,3]};

/* ─── Exam Structure Config ─── */
export const EXAM_TARGETS={practice:12,test:15,exam:24};
export const SECT_RATIOS={calc:.28,fill:.18,mc:.12,short:.22,work:.20};
export const SECT_CONF={calc:{nm:'計算題',nt:'每題2分'},fill:{nm:'填充題',nt:'分數見各題'},mc:{nm:'選擇題',nt:'每題1-2分'},short:{nm:'短答題',nt:'每題2-3分'},work:{nm:'列式題',nt:'每題2-3分'}};
export const SECT_LBL=['甲','乙','丙','丁','戊'];

/* ─── Context Pools ─── */
export const CTX={
  names:['小明','小華','小芬','志強','嘉欣','家俊','詠琪','浩然','子晴','俊熙'],
  places:['超級市場','文具店','書店','玩具店','水果店','運動用品店','家品店','麵包店'],
  food:['蘋果','橙','香蕉','芒果','草莓','西瓜','葡萄','桃'],
  item:['鉛筆','橡皮擦','尺子','練習簿','顏色筆','剪刀','膠水','筆袋'],
  sport:['足球','籃球','排球','乒乓球','羽毛球','游泳','跑步','跳繩'],
  vehicle:['巴士','小巴','的士','港鐵','渡輪','電車','校車','旅遊巴'],
  school:['培正小學','聖保祿','拔萃','喇沙','聖若瑟','瑪利諾','聖方濟','聖公會']
};

/* ─── Context Helpers ─── */
export const nm=()=>pk(CTX.names);export const pl=()=>pk(CTX.places);export const fd=()=>pk(CTX.food);export const it=()=>pk(CTX.item);

export function _nm2(){var a=nm(),b=nm();while(b===a)b=nm();return[a,b];}
export function _pl(){return pk(['圖書館','超市','文具店','書店','玩具店','果園','農場','運動場','禮堂','飯堂','課室','公園']);}
export function _it(){return pk([
  {n:'蘋果',u:'個'},{n:'鉛筆',u:'枝'},{n:'故事書',u:'本'},{n:'糖果',u:'粒'},
  {n:'貼紙',u:'張'},{n:'雞蛋',u:'隻'},{n:'曲奇餅',u:'塊'},{n:'練習簿',u:'本'}
]);}

// Exports: TOPICS, GRADE_INFO, DIFF_INFO, DIFF_ALLOW, EXAM_TARGETS, SECT_RATIOS, SECT_CONF, SECT_LBL, CTX, nm, pl, fd, it, _nm2, _pl, _it
