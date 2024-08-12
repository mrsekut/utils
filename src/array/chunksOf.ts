export const chunksOf = <N extends number, T>(xs: T[], size: N): T[][] => {
  if (xs.length === 0) return [];
  return [xs.slice(0, size), ...chunksOf(xs.slice(size), size)];
};

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('chunksOf', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8];
    // prettier-ignore
    expect(chunksOf(array, 1)).toEqual([[1], [2], [3], [4], [5], [6], [7], [8]]);
    expect(chunksOf(array, 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8],
    ]);
    expect(chunksOf(array, 5)).toEqual([
      [1, 2, 3, 4, 5],
      [6, 7, 8],
    ]);
  });
}
