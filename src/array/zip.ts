export function zip<X, Y>(xs: readonly X[], ys: readonly Y[]): [X, Y][] {
  return xs.slice(0, Math.min(xs.length, ys.length)).map((x, i) => [x, ys[i]!]);
}

if (import.meta.vitest) {
  const { describe, expect, test } = import.meta.vitest;

  describe('zip', () => {
    const xs = [1, 2, 3];
    const ys = ['a', 'b', 'c'];

    expect(zip(xs, ys)).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);

    test('片方の配列が短い場合', () => {
      expect(zip([1, 2], ys)).toEqual([
        [1, 'a'],
        [2, 'b'],
      ]);

      expect(zip(xs, ['a'])).toEqual([[1, 'a']]);
    });

    test('空配列を含む場合', () => {
      expect(zip([], ys)).toEqual([]);
      expect(zip(xs, [])).toEqual([]);
      expect(zip([], [])).toEqual([]);
    });
  });
}
