export function difference<T>(arr1: T[], arr2: T[]): T[] {
  return differenceBy(arr1, arr2, a => a);
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('differenceBy', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];

    expect(differenceBy(arr1, arr2, v => v)).toEqual([1]);

    // プロパティでの比較
    const objects1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const objects2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
    expect(differenceBy(objects1, objects2, o => o.id)).toEqual([{ id: 1 }]);

    // 空の配列
    expect(differenceBy([], arr2, v => v)).toEqual([]);
    expect(differenceBy(arr1, [], v => v)).toEqual(arr1);

    // 全て一致するケース
    expect(differenceBy(arr1, arr1, v => v)).toEqual([]);

    // 全て異なるケース
    expect(differenceBy([5, 6], arr2, v => v)).toEqual([5, 6]);
  });
}

export function differenceBy<T, R>(
  arr1: readonly T[],
  arr2: readonly T[],
  prop: (v: T) => R,
): T[] {
  const props_ = new Set(arr2.map(prop));
  return arr1.filter(item => !props_.has(prop(item)));
}

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('difference', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];

    expect(difference(arr1, arr2)).toEqual([1]);
  });
}
