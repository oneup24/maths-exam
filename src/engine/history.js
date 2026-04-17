/**
 * history.js — Exam history persistence (localStorage)
 * Extracted from engine.js
 */

const STORAGE_KEY='math_exam_history_v2';

export function saveHistory(entry){
  try{
    var hist=loadHistory();
    hist.unshift({...entry,ts:Date.now()});
    if(hist.length>50)hist=hist.slice(0,50);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(hist));
  }catch{/* intentionally empty — localStorage may be unavailable */}
}

export function loadHistory(){
  try{
    var raw=localStorage.getItem(STORAGE_KEY);
    return raw?JSON.parse(raw):[];
  }catch{/* intentionally empty — return default */return[]}
}

export function clearHistory(){
  try{localStorage.removeItem(STORAGE_KEY)}catch{/* intentionally empty — localStorage may be unavailable */}
}

// Exports: saveHistory, loadHistory, clearHistory
