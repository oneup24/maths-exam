/**
 * contexts.js — HK-specific context pools for question generators
 * Enriched with modern HK names, cultural venues, local food, and precise classifiers.
 * Usage: import { CTX, nm, pl, fd, it, _nm2, _pl, _it, _price } from './contexts.js'
 */
import { pk } from './core.js';

export const CTX = {
  /* ── Names (Modern HK primary school names) ── */
  names: [
    '梓軒','柏宇','允行','卓楠','晉瑋','浩然','俊熙','樂謙','宇軒','智康',
    '芷晴','凱晴','曉彤','凱琳','子穎','海晴','悅澄','心悠','鎧澄','穎思',
  ],

  /* ── Places (HK-specific, generic brands + cultural venues) ── */
  places: [
    '超級市場','便利店','文具店','書報攤','茶餐廳','快餐店','酒樓','果欄',
    '海洋公園','迪士尼樂園','科學館','太空館','香港書展','動漫節','年宵市場',
  ],

  /* ── Food (HK everyday & local snacks) ── */
  food: [
    '蘋果','橙','香蕉','士多啤梨','車厘子','芒果',
    '魚蛋','燒賣','雞蛋仔','菠蘿包','蛋撻','腸粉','壽司','薄餅','漢堡包',
  ],

  /* ── Items (school stationery + STEM) ── */
  item: [
    '鉛筆','橡皮擦','尺子','練習簿','顏色筆','剪刀','膠水','筆袋',
    '直尺','量角器','圓規','螢光筆','文件夾','便條紙',
    '平板電腦','實驗試管',
  ],

  /* ── Sports & activities (HK school) ── */
  sport: [
    '足球','籃球','排球','乒乓球','羽毛球','游泳','跑步','跳繩',
    '劍擊','壁球','手球','欖球','田徑','體操','跆拳道','芭蕾舞',
  ],

  /* ── Transport (HK-specific) ── */
  vehicle: [
    '巴士','小巴','的士','港鐵','天星小輪','電車','校車','旅遊巴',
    '輕鐵','纜車','高鐵',
  ],

  /* ── Schools (HK-style names) ── */
  school: [
    '培正小學','聖保祿學校','拔萃小學','喇沙小學','聖若瑟小學',
    '瑪利諾修院小學','聖方濟各小學','聖公會小學','道慈佛社小學','保良局小學',
  ],

  /* ── HK landmarks & districts (for distance/map problems) ── */
  places_hk: [
    '尖沙咀','銅鑼灣','旺角','中環','觀塘','沙田','元朗','屯門',
    '將軍澳','天水圍','大埔','北角','柴灣','東涌',
  ],

  /* ── Currency (realistic HK pricing tiers) ── */
  prices_cheap: [2, 3, 4, 5, 6, 8, 10, 12, 15],      // snacks, basic stationery
  prices_mid:   [20, 25, 30, 35, 40, 45, 50, 60, 80], // meals, books, standard items
  prices_high:  [120, 150, 180, 200, 250, 300, 500],  // theme park tickets, electronics

  /* ── Units with Cantonese classifiers ── */
  classifiers: [
    {n:'蘋果',u:'個'}, {n:'橙',u:'個'},    {n:'西瓜',u:'個'},
    {n:'鉛筆',u:'枝'}, {n:'原子筆',u:'枝'},{n:'間尺',u:'把'},
    {n:'圖書',u:'本'},  {n:'練習簿',u:'本'},{n:'雜誌',u:'本'},
    {n:'波子',u:'粒'},  {n:'燒賣',u:'粒'},  {n:'魚蛋',u:'粒'},{n:'糖果',u:'粒'},
    {n:'貼紙',u:'張'},  {n:'手工紙',u:'張'},{n:'遊戲卡',u:'張'},
    {n:'雞蛋',u:'隻'},  {n:'香蕉',u:'隻'},  {n:'雞翼',u:'隻'},
    {n:'曲奇餅',u:'塊'},{n:'蛋糕',u:'件'},  {n:'壽司',u:'件'},
    {n:'蛋撻',u:'個'},  {n:'菠蘿包',u:'個'},
    {n:'玩具車',u:'架'},{n:'模型飛機',u:'架'},{n:'電腦',u:'部'},
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
    '學校圖書館','公共圖書館','超級市場','文具店','玩具店','果園','農場',
    '運動場','學校禮堂','學校飯堂','課室','社區公園','體育館','公眾泳池',
  ]);
}

export function _it() {
  return pk(CTX.classifiers);
}

export function _price(tier = 'mid') {
  return pk(CTX['prices_' + tier] || CTX.prices_mid);
}

// Export: CTX, nm, pl, fd, it, _nm2, _pl, _it, _price
