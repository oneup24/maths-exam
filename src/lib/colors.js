// Grade gradient colors (dark, for card backgrounds)
export const GC = {
  rose: 'from-rose-500 to-rose-600',
  orange: 'from-orange-500 to-orange-600',
  amber: 'from-amber-500 to-amber-600',
  emerald: 'from-emerald-500 to-emerald-600',
  sky: 'from-sky-500 to-sky-600',
  violet: 'from-violet-500 to-violet-600',
};

// Grade light colors (for badges, light cards)
export const GCL = {
  rose: 'bg-rose-50 border-rose-200 text-rose-700',
  orange: 'bg-orange-50 border-orange-200 text-orange-700',
  amber: 'bg-amber-50 border-amber-200 text-amber-700',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  sky: 'bg-sky-50 border-sky-200 text-sky-700',
  violet: 'bg-violet-50 border-violet-200 text-violet-700',
};

// Topic category badge colors
export const CAT_COLORS = {
  '數': 'bg-blue-100 text-blue-700',
  '代數': 'bg-purple-100 text-purple-700',
  '度量': 'bg-green-100 text-green-700',
  '圖形與空間': 'bg-orange-100 text-orange-700',
  '數據處理': 'bg-pink-100 text-pink-700',
};

// Difficulty selection colors
export const DIFF_COLORS = {
  1: 'border-emerald-500 bg-emerald-50 text-emerald-700',
  2: 'border-amber-500 bg-amber-50 text-amber-700',
  3: 'border-rose-500 bg-rose-50 text-rose-700',
};

// Difficulty badge colors (compact, for exam header)
export const DIFF_BADGE = {
  1: 'bg-emerald-50 text-emerald-600',
  2: 'bg-amber-50 text-amber-600',
  3: 'bg-rose-50 text-rose-600',
};

// Score color thresholds
export function scoreColor(pct) {
  if (pct >= 70) return 'bg-emerald-500';
  if (pct >= 50) return 'bg-amber-500';
  return 'bg-red-400';
}

export function scoreTextColor(pct) {
  if (pct >= 70) return 'text-emerald-600';
  if (pct >= 50) return 'text-amber-600';
  return 'text-red-500';
}
