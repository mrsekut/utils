export const intersectBy = <T, R>(
  arr1: T[],
  arr2: T[],
  prop: (v: T) => R,
): T[] => {
  const props_ = new Set(arr2.map(prop));
  return arr1.filter(item => props_.has(prop(item)));
};

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('intersectBy', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];

    expect(intersectBy(arr1, arr2, v => v)).toEqual([2, 3]);

    // プロパティでの比較
    const objects1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const objects2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
    expect(intersectBy(objects1, objects2, o => o.id)).toEqual([
      { id: 2 },
      { id: 3 },
    ]);

    // 空の配列
    expect(intersectBy([], arr2, v => v)).toEqual([]);
    expect(intersectBy(arr1, [], v => v)).toEqual([]);

    // 全て一致するケース
    expect(intersectBy(arr1, arr1, v => v)).toEqual([1, 2, 3]);

    // 全て異なるケース
    expect(intersectBy([1, 5, 6], [2, 3, 4], v => v)).toEqual([]);
  });
}

export function intersect<T>(arr1: T[], arr2: T[]): T[] {
  return intersectBy(arr1, arr2, a => a);
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('intersect', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];

    expect(intersect(arr1, arr2)).toEqual([2, 3]);
  });
}
