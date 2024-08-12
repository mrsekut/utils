export const uniqBy = <T>(arr: T[], predicate: (a: T) => any = a => a): T[] => {
  const seen = new Set();
  return arr.filter(item => {
    const key = predicate(item);
    if (!seen.has(key)) {
      seen.add(key);
      return true;
    }
    return false;
  });
};

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('uniqBy', () => {
    const arr = [5, 4, 4, 4, 4, 5, 5, 3, 2, 10, 1];
    expect(uniqBy(arr)).toEqual([5, 4, 3, 2, 10, 1]);
  });

  test('uniqBy', () => {
    const uniqs = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    const arr = [...uniqs, ...uniqs];

    expect(uniqBy(arr, a => a.id)).toEqual(uniqs);
  });
}
