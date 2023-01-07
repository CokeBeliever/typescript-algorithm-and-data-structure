type CompareFunctionType<T> = (a: T, b: T) => number;

/**
 * 比较器
 */
export default class Comparator<Element> {
  /** 比较函数 */
  public compare: CompareFunctionType<Element>;

  /**
   * 构造函数
   * @param compareFunction 比较函数
   */
  constructor(
    compareFunction: CompareFunctionType<Element> = Comparator.defaultCompareFunction
  ) {
    this.compare = compareFunction;
  }

  /**
   * 默认比较函数
   * @param a 比较对象
   * @param b 比较对象
   */
  static defaultCompareFunction<Element = string | number>(
    a: Element,
    b: Element
  ): number {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  /**
   * 检查两个比较对象是否相等
   * @param a 比较对象
   * @param b 比较对象
   */
  public equal(a: Element, b: Element): boolean {
    return this.compare(a, b) === 0;
  }

  /**
   * 检查 "a" 是否小于 "b"。
   * @param a 比较对象
   * @param b 比较对象
   */
  public lessThan(a: Element, b: Element): boolean {
    return this.compare(a, b) < 0;
  }

  /**
   * 检查 "a" 是否大于 "b"。
   * @param a 比较对象
   * @param b 比较对象
   */
  public greaterThan(a: Element, b: Element): boolean {
    return this.compare(a, b) > 0;
  }

  /**
   * 检查 "a" 是否小于等于 "b"。
   * @param a 比较对象
   * @param b 比较对象
   */
  public lessThanOrEqual(a: Element, b: Element): boolean {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * 检查 "a" 是否大于等于 "b"。
   * @param a 比较对象
   * @param b 比较对象
   */
  public greaterThanOrEqual(a: Element, b: Element): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * 反转比较顺序
   */
  public reverse(): void {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}
