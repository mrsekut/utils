export function intersperse<T>(sep: T, arr: T[]): T[] {
  if (arr.length === 0) return [];

  const [head, ...tail] = arr;
  if (head == null) return [];

  return [head, ...tail.flatMap(x => [sep, x])];
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('intersperse', () => {
    expect(intersperse(0, [1, 2, 3])).toEqual([1, 0, 2, 0, 3]);
    expect(intersperse(0, [1])).toEqual([1]);
  });
}
