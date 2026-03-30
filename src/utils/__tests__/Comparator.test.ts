import Comparator from '@/utils/Comparator';

describe('Comparator', () => {
  it('defaultCompareFunction(): 支持默认数字比较', () => {
    expect(Comparator.defaultCompareFunction(1, 2)).toBeLessThan(0);
    expect(Comparator.defaultCompareFunction(2, 1)).toBeGreaterThan(0);
    expect(Comparator.defaultCompareFunction(2, 2)).toBe(0);
  });

  it('equal()/lessThan()/greaterThan()/lessThanOrEqual()/greaterThanOrEqual()', () => {
    const comparator = new Comparator<number>();

    expect(comparator.equal(3, 3)).toBeTruthy();
    expect(comparator.lessThan(1, 2)).toBeTruthy();
    expect(comparator.greaterThan(2, 1)).toBeTruthy();
    expect(comparator.lessThanOrEqual(2, 2)).toBeTruthy();
    expect(comparator.greaterThanOrEqual(2, 2)).toBeTruthy();
  });

  it('reverse(): 反转比较顺序', () => {
    const comparator = new Comparator<number>();

    expect(comparator.lessThan(1, 2)).toBeTruthy();

    comparator.reverse();

    expect(comparator.lessThan(1, 2)).toBeFalsy();
    expect(comparator.greaterThan(1, 2)).toBeTruthy();
  });

  it('constructor(): 支持自定义对象比较器', () => {
    type Item = { key: number };

    const comparator = new Comparator<Item>((a, b) => a.key - b.key);

    expect(comparator.lessThan({ key: 1 }, { key: 2 })).toBeTruthy();
    expect(comparator.equal({ key: 3 }, { key: 3 })).toBeTruthy();
  });
});
