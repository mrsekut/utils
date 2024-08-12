import { differenceBy } from './difference';

export const partition = <T>(
  xs: readonly T[],
  predicate: (x: T) => boolean,
): [T[], T[]] => {
  const _in = xs.filter(predicate);
  const _notIn = differenceBy(xs, _in, predicate);
  return [_in, _notIn];
};

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('partition', () => {
    const arr = [1, 2, 3, 4, 5];
    const [evens, odds] = partition(arr, x => x % 2 === 0);
    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([1, 3, 5]);
  });
}
