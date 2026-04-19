/**
 * contexts.js — HK-specific context pools for question generators
 * Expanded from the basic CTX in config.js.
 * Usage: import { CTX, nm, pl, fd, it, _nm2, _pl, _it } from './contexts.js'
 * (Drop-in replacement for the CTX helpers currently in config.js)
 */
import { pk } from './core.js';

export const CTX = {
  /* ── Names (Cantonese, common HK primary school names) ── */
  names: [
    '小明','小華','小芬','志強','嘉欣','家俊','詠琪','浩然','子晴','俊熙',
    '曉彤','柏熙','芷晴','振熙','欣桐','俊朗','穎思','家希','樂謙','悅澄',
  ],

  /* ── Places (HK-specific) ── */
  places: [
    '百佳超市','惠康超市','7-Eleven','OK便利店','文具店','書店','玩具店',
    '水果店','麵包店','餅店','茶餐廳','學校小賣部','街市','運動用品店',
  ],

  /* ── Food (HK everyday items) ── */
  food: [
    '蘋果','橙','香蕉','芒果','草莓','西瓜','葡萄','桃',
    '蛋撻','菠蘿包','雞蛋仔','煎堆','湯圓','叉燒包','老婆餅',
  ],

  /* ── Items (school stationery + everyday) ── */
  item: [
    '鉛筆','橡皮擦','尺子','練習簿','顏色筆','剪刀','膠水','筆袋',
    '直尺','量角器','圓規','螢光筆','文件夾','便條紙',
  ],

  /* ── Sports (HK school sports) ── */
  sport: [
    '足球','籃球','排球','乒乓球','羽毛球','游泳','跑步','跳繩',
    '劍擊','壁球','手球','欖球','田徑','體操',
  ],

  /* ── Transport (HK-specific) ── */
  vehicle: [
    '巴士','小巴','的士','港鐵','渡輪','電車','校車','旅遊巴',
    '輕鐵','纜車','機場快線',
  ],

  /* ── Schools (HK-style names) ── */
  school: [
    '培正小學','聖保祿學校','拔萃小學','喇沙小學','聖若瑟小學',
    '瑪利諾修院小學','聖方濟各小學','聖公會小學','道慈佛社小學','保良局小學',
  ],

  /* ── HK landmarks & districts (for distance/map problems) ── */
  places_hk: [
    '尖沙咀','銅鑼灣','旺角','中環','觀塘','沙田','元朗','屯門',
    '將軍澳','天水圍','大埔','北角',
  ],

  /* ── Currency (HK-specific amounts, realistic for story problems) ── */
  prices_cheap: [3, 4, 5, 6, 7, 8, 10, 12, 15],     // stationery, snacks
  prices_mid:   [20, 25, 30, 35, 40, 45, 50, 55, 60], // meals, books
  prices_high:  [80, 100, 120, 150, 180, 200, 250],    // toys, sport items

  /* ── Units with Cantonese classifiers ── */
  classifiers: [
    {n:'蘋果',u:'個'},{n:'鉛筆',u:'枝'},{n:'故事書',u:'本'},
    {n:'糖果',u:'粒'},{n:'貼紙',u:'張'},{n:'雞蛋',u:'隻'},
    {n:'曲奇餅',u:'塊'},{n:'練習簿',u:'本'},{n:'橙',u:'個'},
    {n:'香蕉',u:'隻'},{n:'蛋撻',u:'個'},{n:'菠蘿包',u:'個'},
  ],
};

/* ── Drop-in helpers (same interface as config.js CTX helpers) ── */
export const nm  = () => pk(CTX.names);
export const pl  = () => pk(CTX.places);
export const fd  = () => pk(CTX.food);
export const it  = () => pk(CTX.item);

export function _nm2() {
  var a = nm(), b = nm();
  while (b === a) b = nm();
  return [a, b];
}

export function _pl() {
  return pk([
    '圖書館','超市','文具店','書店','玩具店','果園','農場',
    '運動場','禮堂','飯堂','課室','公園','體育館','泳池',
  ]);
}

export function _it() {
  return pk(CTX.classifiers);
}

export function _price(tier = 'mid') {
  return pk(CTX['prices_' + tier] || CTX.prices_mid);
}

// Export: CTX, nm, pl, fd, it, _nm2, _pl, _it, _price
