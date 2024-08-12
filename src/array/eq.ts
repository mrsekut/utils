export function eq<T>(ax: T[], bx: T[]): boolean {
  if (ax.length !== bx.length) return false;

  const [a, ...restA] = ax;
  const [b, ...restB] = bx;

  if (a == null && b == null) {
    return true;
  }
  return Object.is(a, b) && eq(restA, restB);
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('eq', () => {
    expect(eq([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(eq([1, 2, 3], [3, 2, 1])).toBe(false);
    expect(eq([], [])).toBe(true);

    // 長さが異なる配列の場合
    expect(eq([1, 2, 3], [1, 2])).toBe(false);

    // 深い比較
    expect(eq([{}], [{}])).toBe(false); // Object.is の使用を考慮
    expect(eq([NaN], [NaN])).toBe(true); // NaNの比較を考慮
  });
}
