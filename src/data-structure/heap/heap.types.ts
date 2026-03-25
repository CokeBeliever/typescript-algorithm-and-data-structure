/**
 * 堆接口
 */
export interface HeapInterface<Element> extends Iterable<Element> {
  /**
   * 添加元素
   * @param el 数据元素
   */
  add(el: Element): this;

  /**
   * 取出堆顶元素
   */
  poll(): Element | null;

  /**
   * 查看堆顶元素
   */
  peek(): Element | null;

  /**
   * 删除指定元素
   * @param item 数据元素
   * @param comparatorFunction 查找时使用的比较函数
   */
  remove(item: Element, comparatorFunction?: (a: Element, b: Element) => number): this;

  /**
   * 查找指定元素的索引
   * @param item 数据元素
   * @param comparatorFunction 查找时使用的比较函数
   */
  find(item: Element, comparatorFunction?: (a: Element, b: Element) => number): number[];

  /**
   * 堆转字符串
   */
  toString(): string;

  /**
   * 堆是否为空
   */
  isEmpty(): boolean;
}
