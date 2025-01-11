import { mdiHeart, mdiQqchat } from '@mdi/js';

const unique = Symbol();
type ItemData = Partial<ItemMeta<typeof unique, typeof unique>> &
  Record<string, unknown>;
type ItemKD<K extends string = string, D extends ItemData = ItemData> = [K, D];
type ItemMeta<K = string, V = number> = {
  /**成员名 */ name: K;
  /**成员值 */ value: V;
};
export type EnumMeta<
  V extends number[] = number[],
  D extends Merge<ItemData, ItemMeta>[] = Merge<ItemData, ItemMeta>[]
> = {
  /**所有成员枚举 */ enums: V;
  /**所有成员 */ items: D;
};
/**推断枚举值 */
export type Enum<T extends EnumMeta> = T['enums'][number];
/**构建枚举对象 */
export function toEnum<const T extends ItemKD[]>(...config: T) {
  type EnumValue = IntToTuple<T['length']>;
  //@ts-ignore
  type EnumIndex = EnumValue[number];
  type EnumObject<I = EnumIndex> = UnionToIntersection<
    I extends number
      ? T[I] extends ItemKD<infer K, infer V>
        ? { readonly [P in I | K]: V & ItemMeta<K, I> }
        : never
      : never
  >;
  return config.reduce<EnumMeta>(
    (acc, [k, v], i) => {
      Object.assign(v, { name: k, value: i } satisfies ItemMeta);
      Object.assign(acc, { [k]: v, [i]: v });
      acc.enums.push(i);
      acc.items.push(v);
      return acc;
    },
    { enums: [], items: [] }
  ) as EnumObject &
    //@ts-ignore
    EnumMeta<EnumValue, UnionToTuple<EnumObject[EnumIndex]>>;
}

export const Nav = toEnum(
  [
    'Product',
    {
      text: '产品',
      path: 'product',
      group: '',
    },
  ],
  [
    'Product:Recruit',
    {
      text: 'Recruit',
      path: 'https://essai.bluebones.fun',
      desc: '线下实验招募平台',
      group: '产品',
    },
  ],
  [
    'Product:ptbk',
    {
      text: 'ptbk',
      path: 'https://github.com/bluebones-team/ptbk',
      desc: 'PsychToolbox 开发框架',
      group: '产品',
    },
  ],
  [
    'Product:wps-paper',
    {
      text: 'wps-paper',
      path: 'https://github.com/bluebones-team/wps-paper',
      desc: '辅助论文写作的WPS加载项',
      group: '产品',
    },
  ],
  [
    'KnowUs:About',
    {
      text: '关于我们',
      path: 'about',
      desc: '我们是一个年轻的非营利性组织',
      group: '认识我们',
    },
  ],
  [
    'KnowUs:Join',
    {
      text: '加入我们',
      path: 'join',
      desc: '和我们一起探索科研工作的未来形态',
      group: '认识我们',
    },
  ],
  [
    'KnowUs:Donate',
    {
      text: '捐助',
      path: 'donate',
      desc: '共同促进脑科学发展',
      group: '认识我们',
      icon: mdiHeart,
    },
  ],
  [
    'ContactUs:QQ',
    {
      text: 'QQ',
      path: 'https://qm.qq.com/q/214gmxUVKw',
      desc: '',
      group: '联系我们',
      icon: mdiQqchat,
    },
  ],
  [
    'ContactUs:GitHub',
    {
      text: 'GitHub',
      path: 'https://github.com/bluebones-team',
      desc: '',
      group: '联系我们',
    },
  ],
  [
    'ContactUs:AFDIAN',
    {
      text: '爱发电',
      path: 'https://afdian.com/a/bluebones',
      desc: '',
      group: '联系我们',
    },
  ]
);
