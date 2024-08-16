type Key = string | number | boolean | null;

export const groupBy = <T, K extends Key>(
  arr: readonly T[],
  prop: (v: T) => K,
): [K, T[]][] => {
  return groupBy_(arr, v => [prop(v)]).map(([k, v]) => [k[0], v] as [K, T[]]);
};

if (import.meta.vitest) {
  const { describe, expect, test, expectTypeOf } = import.meta.vitest;

  describe('groupBy', () => {
    test('groupBy', () => {
      const xs = [5, 4, 4, 4, 4, 5, 5, 3];
      expect(groupBy(xs, x => x)).toEqual([
        [5, [5, 5, 5]],
        [4, [4, 4, 4, 4]],
        [3, [3]],
      ]);
    });

    test('type', () => {
      const xs = [{ no: 1 }, { no: 1 }, { no: 1 }, { no: 1 }];
      const result = groupBy(xs, x => x.no);
      type Result = typeof result;
      type Key = Result[0][0];
      expectTypeOf<Key>().toEqualTypeOf<number>();
    });
  });
}

export function groupBy_<T, Tuple extends readonly Key[]>(
  arr: readonly T[],
  prop: (v: T) => [...Tuple],
): [Tuple, T[]][] {
  const map = new Map<string, T[]>();

  arr.forEach(item => {
    const key = prop(item);
    const keyStr = JSON.stringify(key)!;
    const items = map.get(keyStr);

    if (items == null) {
      map.set(keyStr, [item]);
    } else {
      items.push(item);
    }
  });

  return Array.from(map.entries()).map(([keyStr, group]) => [
    JSON.parse(keyStr) as unknown as Tuple,
    group,
  ]);
}

if (import.meta.vitest) {
  const { describe, expect, test, expectTypeOf } = import.meta.vitest;

  describe('groupBy_', () => {
    const xs = [
      { a: '1', b: '2', c: '1' },
      { a: '1', b: '2', c: '2' },
      { a: '1', b: '3', c: '1' },
    ];

    test('groupBy_', () => {
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

    test('type', () => {
      const result = groupBy_(xs, x => [x.a, x.b]);
      type Result = typeof result;
      type Keys = Result[0][0];
      expectTypeOf<Keys>().toEqualTypeOf<[string, string]>();
    });
  });
}
