export const sortBy =
  <T, R>(prop: (a: T) => R) =>
  (a: T, b: T): number =>
    prop(a) > prop(b) ? 1 : prop(b) > prop(a) ? -1 : 0;

if (import.meta.vitest) {
  const { describe, expect, test } = import.meta.vitest;

  describe('sortBy', () => {
    test('数値の配列をsort', () => {
      const arr = [3, 1, 2];

      const sorted = arr.sort(sortBy(a => a));
      expect(sorted).toEqual([1, 2, 3]);
    });

    test('objectの配列をsort', () => {
      const objects = [
        { id: 3, name: 'C' },
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
      ];

      const sortedById = objects.sort(sortBy(o => o.id));
      expect(sortedById).toEqual([
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
      ]);
    });
  });
}
