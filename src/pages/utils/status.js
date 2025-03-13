// 地点（鱼类）
const FISH_PLACE = [
  { value: 1, label: '河流' },
  { value: 2, label: '大海' },
  { value: 3, label: '河口' },
  { value: 4, label: '池塘' },
  { value: 5, label: '高地水域' },
  { value: 6, label: '码头' },
  { value: 7, label: '大海(雨天)' },
];

// 形状（鱼类）
const FISH_SHAPE = [
  { value: 1, label: '特小' },
  { value: 2, label: '小' },
  { value: 3, label: '中偏小' },
  { value: 4, label: '中' },
  { value: 5, label: '中偏大' },
  { value: 6, label: '大' },
  { value: 7, label: '特大' },
  { value: 8, label: '细长' },
  { value: 9, label: '背鳍' },
];

// 时间（鱼类）
const FISH_TIME = [
  { value: 1, label: '全天', list: [] },
  { value: 2, label: '9点-16点', list: [9, 10, 11, 12, 13, 14, 15, 16] },
  {
    value: 3,
    label: '16点-9点',
    list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  },
  {
    value: 4,
    label: '4点-21点',
    list: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
  },
  { value: 5, label: '21点-4点', list: [0, 1, 2, 3, 4, 21, 22, 23, 24] },
  {
    value: 6,
    label: '9-16点、21-4点',
    list: [0, 1, 2, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16, 21, 22, 23, 24],
  },
];

// 地点（昆虫）
const INSECT_PLACE = [
  { value: 1, label: '花' },
  { value: 2, label: '空中' },
  { value: 3, label: '树木' },
  { value: 17, label: '树木(除椰子树)' },
  { value: 16, label: '椰子树' },
  { value: 4, label: '草地' },
  { value: 15, label: '草地/地面' },
  { value: 5, label: '水边' },
  { value: 6, label: '地里' },
  // { value: 7, label: '池塘' },
  { value: 8, label: '河上/池塘' },
  { value: 9, label: '树桩' },
  { value: 10, label: '雪球附近' },
  { value: 11, label: '地面' },
  { value: 12, label: '沙滩' },
  { value: 18, label: '礁石' },
  { value: 13, label: '村民头上' },
  { value: 14, label: '石头' },
];

// 天气（昆虫）
const INSECT_CONDIT = [
  { value: 1, label: '无影响' },
  { value: 2, label: '非雨雪天' },
  { value: 3, label: '雨天' },
];

// 时间（昆虫）
const INSECT_TIME = [
  { value: 1, label: '全天', list: [] },
  { value: 2, label: '4点-17点', list: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
  { value: 3, label: '4点-19点', list: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
  { value: 4, label: '8点-16点', list: [8, 9, 10, 11, 12, 13, 14, 15, 16] },
  { value: 5, label: '8点-17点', list: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
  { value: 6, label: '8点-19点', list: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
  { value: 7, label: '16点-23点', list: [16, 17, 18, 19, 20, 21, 22, 23] },
  { value: 8, label: '17点-4点', list: [0, 1, 2, 3, 4, 17, 18, 19, 20, 21, 22, 23, 24] },
  {
    value: 9,
    label: '17点-8点',
    list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 17, 18, 19, 20, 21, 22, 23, 24],
  },
  { value: 10, label: '19点-4点', list: [0, 1, 2, 3, 4, 19, 20, 21, 22, 23, 24] },
  { value: 11, label: '19点-8点', list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23, 24] },
  { value: 12, label: '23点-8点', list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 23, 24] },
  {
    value: 13,
    label: '23点-16点',
    list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 23, 24],
  },
  { value: 14, label: '4点-8点、16点-19点', list: [4, 5, 6, 7, 8, 16, 17, 18, 19] },
  { value: 15, label: '4点-8点、17点-19点', list: [4, 5, 6, 7, 8, 17, 18, 19] },
];

// 月份
const MONTH = [
  { value: 1, label: '一月' },
  { value: 2, label: '二月' },
  { value: 3, label: '三月' },
  { value: 4, label: '四月' },
  { value: 5, label: '五月' },
  { value: 6, label: '六月' },
  { value: 7, label: '七月' },
  { value: 8, label: '八月' },
  { value: 9, label: '九月' },
  { value: 10, label: '十月' },
  { value: 11, label: '十一月' },
  { value: 12, label: '十二月' },
];

const STATUS = {
  FISH_PLACE,
  FISH_SHAPE,
  FISH_TIME,
  INSECT_PLACE,
  INSECT_CONDIT,
  INSECT_TIME,
  MONTH,
};

export default STATUS;

export const initStatus = (value, name, str) => {
  let arr = STATUS[name];
  for (let i of arr) {
    if (i.value === value) return i[str || 'label'];
  }
};
