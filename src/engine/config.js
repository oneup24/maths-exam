/**
 * config.js — Topic tree, grade/difficulty configs, context pools
 * Extracted from engine.js
 */

/* ─── Topic Tree ─── */
export const TOPICS={
  1:[
  {id:'1N1',nm:'1N1 20以內的數',ic:'🔢',cat:'數'},
  {id:'1N2',nm:'1N2 基本加法和減法',ic:'➕',cat:'數'},
  {id:'1N3',nm:'1N3 100以內的數',ic:'💯',cat:'數'},
  {id:'1N4',nm:'1N4 加法和減法(一)',ic:'📝',cat:'數'},
  {id:'1M1',nm:'1M1 長度和距離(一)',ic:'📏',cat:'度量'},
  {id:'1M2',nm:'1M2 貨幣(一)',ic:'🪙',cat:'度量'},
  {id:'1M3',nm:'1M3 長度和距離(二)',ic:'📐',cat:'度量'},
  {id:'1M4',nm:'1M4 時間(一)',ic:'🕐',cat:'度量'},
  {id:'1S1',nm:'1S1 立體圖形(一)',ic:'🧊',cat:'圖形與空間'},
  {id:'1S2',nm:'1S2 平面圖形',ic:'🔷',cat:'圖形與空間'},
  {id:'1S3',nm:'1S3 方向和位置(一)',ic:'🧭',cat:'圖形與空間'}
],
  2:[{id:'2N1',nm:'2N1 三位數',ic:'🔢',cat:'數'},{id:'2N2',nm:'2N2 加減法(二)',ic:'➕',cat:'數'},{id:'2N3',nm:'2N3 基本乘法',ic:'✖️',cat:'數'},{id:'2N4',nm:'2N4 四位數',ic:'🔢',cat:'數'},{id:'2N5',nm:'2N5 分數的初步認識',ic:'🥧',cat:'數'},{id:'2N6',nm:'2N6 基本除法',ic:'➗',cat:'數'},{id:'2M',nm:'2M 度量',ic:'📏',cat:'度量'},{id:'2S',nm:'2S 角·四邊形',ic:'📐',cat:'圖形與空間'},{id:'2D1',nm:'2D1 象形圖',ic:'📊',cat:'數據處理'}],
  3:[{id:'3N1',nm:'3N1 大數(一)',ic:'🔢',cat:'數'},{id:'3N2',nm:'3N2 乘法(一)',ic:'✖️',cat:'數'},{id:'3N3',nm:'3N3 除法(一)',ic:'➗',cat:'數'},{id:'3N4',nm:'3N4 四則運算(一)',ic:'🧮',cat:'數'},{id:'3N5',nm:'3N5 分數(一)',ic:'🥧',cat:'數'},{id:'3N6',nm:'3N6 認識小數',ic:'🔣',cat:'數'},{id:'3M',nm:'3M 度量',ic:'⚖️',cat:'度量'},{id:'3S',nm:'3S 四邊形·三角形',ic:'📐',cat:'圖形與空間'},{id:'3D1',nm:'3D1 棒形圖(一)',ic:'📊',cat:'數據處理'},{id:'3D2',nm:'3D2 折線圖(一)',ic:'📈',cat:'數據處理'}],
  4:[{id:'4N1',nm:'4N1 乘法(二)',ic:'✖️',cat:'數'},{id:'4N2',nm:'4N2 除法(二)',ic:'➗',cat:'數'},{id:'4N3',nm:'4N3 倍數和因數',ic:'🔢',cat:'數'},{id:'4N4',nm:'4N4 公倍數和公因數',ic:'🔗',cat:'數'},{id:'4N5',nm:'4N5 四則運算(二)',ic:'🧮',cat:'數'},{id:'4N6',nm:'4N6 分數(二)',ic:'🥧',cat:'數'},{id:'4N78',nm:'4N7-8 小數',ic:'🔣',cat:'數'},{id:'4M1',nm:'4M1 周界(一)',ic:'⬜',cat:'度量'},{id:'4M2',nm:'4M2 面積(一)',ic:'📐',cat:'度量'},{id:'4S1',nm:'4S1 四邊形(三)',ic:'◇',cat:'圖形與空間'},{id:'4S2',nm:'4S2 圖形分割與拼合',ic:'✂️',cat:'圖形與空間'},{id:'4S3',nm:'4S3 方向和位置(二)',ic:'🧭',cat:'圖形與空間'},{id:'4D1',nm:'4D1 棒形圖(二)',ic:'📊',cat:'數據處理'}],
  5:[{id:'5N1',nm:'5N1 大數',ic:'🔢',cat:'數'},{id:'5N2',nm:'5N2 分數(三)異分母',ic:'🥧',cat:'數'},{id:'5N3',nm:'5N3 分數(四)乘法',ic:'✖️',cat:'數'},{id:'5N4',nm:'5N4 小數(三)乘法',ic:'🔣',cat:'數'},{id:'5N5',nm:'5N5 分數(五)除法',ic:'➗',cat:'數'},{id:'5A',nm:'5A 代數·方程',ic:'🔤',cat:'代數'},{id:'5M1',nm:'5M1 面積(二)',ic:'📐',cat:'度量'},{id:'5M2',nm:'5M2 體積(一)',ic:'📦',cat:'度量'},{id:'5S1',nm:'5S1 圓',ic:'⭕',cat:'圖形與空間'},{id:'5S2',nm:'5S2 立體圖形(二)',ic:'🧊',cat:'圖形與空間'},{id:'5D1',nm:'5D1 複合棒形圖',ic:'📊',cat:'數據處理'}],
  6:[{id:'6N1',nm:'6N1 小數(四)除法',ic:'➗',cat:'數'},{id:'6N2',nm:'6N2 分數與小數互換',ic:'🔄',cat:'數'},{id:'6N34',nm:'6N3-4 百分數',ic:'💯',cat:'數'},{id:'6A1',nm:'6A1 方程(二)',ic:'🔤',cat:'代數'},{id:'6M1',nm:'6M1 角度',ic:'📐',cat:'度量'},{id:'6M2',nm:'6M2 體積(二)',ic:'📦',cat:'度量'},{id:'6M3',nm:'6M3 圓周',ic:'⭕',cat:'度量'},{id:'6M4',nm:'6M4 速率',ic:'🏃',cat:'度量'},{id:'6M5',nm:'6M5 圓面積',ic:'🟡',cat:'度量'},{id:'6S1',nm:'6S1 對稱',ic:'🦋',cat:'圖形與空間'},{id:'6D1',nm:'6D1 平均數',ic:'📊',cat:'數據處理'},{id:'6D2',nm:'6D2 折線圖',ic:'📈',cat:'數據處理'},{id:'6D3',nm:'6D3 圓形圖',ic:'🥧',cat:'數據處理'},{id:'6D4',nm:'6D4 統計的應用',ic:'📉',cat:'數據處理'}]
};

/* ─── Grade & Difficulty Config ─── */
export const GRADE_INFO={1:{nm:'小一',co:'rose'},2:{nm:'小二',co:'orange'},3:{nm:'小三',co:'amber'},4:{nm:'小四',co:'emerald'},5:{nm:'小五',co:'sky'},6:{nm:'小六',co:'violet'}};
export const DIFF_INFO={1:{nm:'基礎鞏固',ic:'⭐',co:'emerald',desc:'掌握基本概念與運算'},2:{nm:'呈分實戰',ic:'⭐⭐',co:'amber',desc:'包含陷阱及多步應用題'},3:{nm:'奧數拔尖',ic:'⭐⭐⭐',co:'rose',desc:'逆向思維、Band 1 名校 Killer 題'}};
/* Difficulty filter: which d-values are allowed */
export const DIFF_ALLOW={1:[1,2],2:[1,2,3],3:[2,3]};

/* ─── Exam Structure Config ─── */
export const EXAM_TARGETS={practice:10,test:20,exam:35};
export const SECT_RATIOS={mc:.15,fill:.20,calc:.20,short:.15,work:.30};
export const SECT_CONF={mc:{nm:'選擇題',nt:'選出正確的答案。每題2分。'},fill:{nm:'填充題',nt:'在橫線上填上正確答案。每題2分。'},calc:{nm:'計算題',nt:'計算下列各題。每題2分。'},short:{nm:'短答題',nt:'依題意作答，部分題目需附以單位。每題3分。'},work:{nm:'列式計算題',nt:'必須列出計算步驟，並寫上文字解說及單位。每題4分。'}};
export const SECT_LBL=['甲','乙','丙','丁','戊'];

/* ─── Context Pools + Helpers (re-exported from contexts.js) ─── */
export { CTX, nm, pl, fd, it, _nm2, _pl, _it, _price } from './contexts.js';

// Exports: TOPICS, GRADE_INFO, DIFF_INFO, DIFF_ALLOW, EXAM_TARGETS, SECT_RATIOS, SECT_CONF, SECT_LBL, CTX, nm, pl, fd, it, _nm2, _pl, _it, _price
// P2: 2N5(fractions), 2N6(division), 2D1(pictographs) — generators in grade2.js
// P3 added: 3N1(large numbers), 3N6(decimals), 3D2(line graphs)
// P4 added: 4S2(shape partition), 4S3(8 directions)
// P5 added: 5N1(large numbers), 5S2(3D solids)
// P6 added: 6N2(frac↔dec), 6M2(volume II), 6D4(statistics application)
