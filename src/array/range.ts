export const range = (n1: number, n2?: number): number[] => {
  if (n2 == null) {
    return n1 >= 0 ? [...new Array(n1).keys()] : [];
  }

  const start = n1;
  const end = n2;

  // startがendより大きい場合、降順の範囲を生成
  const step = start <= end ? 1 : -1;

  return [...Array(Math.abs(end - start) + 1)].map((_, i) => start + i * step);
};

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('range', () => {
    expect(range(0)).toEqual([]);
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(range(3, 5)).toEqual([3, 4, 5]);

    // 負の数のテストケース
    expect(range(-5)).toEqual([]);
    expect(range(-3, 3)).toEqual([-3, -2, -1, 0, 1, 2, 3]);
    expect(range(3, -3)).toEqual([3, 2, 1, 0, -1, -2, -3]);

    // 降順の範囲
    expect(range(5, 3)).toEqual([5, 4, 3]);
  });
}
