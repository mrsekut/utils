type Key = string | number | boolean | null;

export const groupBy = <T>(
  arr: readonly T[],
  prop: (v: T) => Key,
): [Key, T[]][] => {
  return groupBy_(arr, v => [prop(v)]).map(([k, v]) => [k[0], v]);
};

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('groupBy', () => {
    const xs = [5, 4, 4, 4, 4, 5, 5, 3];
    expect(groupBy(xs, x => x)).toEqual([
      [5, [5, 5, 5]],
      [4, [4, 4, 4, 4]],
      [3, [3]],
    ]);
  });
}

export function groupBy_<T>(
  arr: readonly T[],
  prop: (v: T) => Key[],
): [Key[], T[]][] {
  const map = new Map<string, T[]>();

  arr.forEach(item => {
    const key = prop(item);
    const keyStr = JSON.stringify(key);
    const items = map.get(keyStr);

    if (items == null) {
      map.set(keyStr, [item]);
    } else {
      items.push(item);
    }
  });

  return Array.from(map.entries()).map(([keyStr, group]) => [
    JSON.parse(keyStr) as Key[],
    group,
  ]);
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('groupBy', () => {
    const xs = [
      { a: '1', b: '2', c: '1' },
      { a: '1', b: '2', c: '2' },
      { a: '1', b: '3', c: '1' },
    ];
    expect(groupBy_(xs, x => [x.a, x.b])).toEqual([
      [
        ['1', '2'],
        [
          { a: '1', b: '2', c: '1' },
          { a: '1', b: '2', c: '2' },
        ],
      ],
      [['1', '3'], [{ a: '1', b: '3', c: '1' }]],
    ]);
  });
}
