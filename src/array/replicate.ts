import { range } from './range';

export function replicate<T>(n: number, item: T): T[] {
  return range(n).map(() => item);
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('replicate', () => {
    expect(replicate(3, 'a')).toEqual(['a', 'a', 'a']);
    expect(replicate(5, 42)).toEqual([42, 42, 42, 42, 42]);
    expect(replicate(0, 'a')).toEqual([]);
    expect(replicate(-1, 'a')).toEqual([]);
  });
}
