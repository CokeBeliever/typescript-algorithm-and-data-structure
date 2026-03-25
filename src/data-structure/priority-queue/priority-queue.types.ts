/**
 * 优先队列接口
 */
export interface PriorityQueueInterface<Element> extends Iterable<Element> {
  /**
   * 入队
   * @param value 数据元素
   * @param priority 优先级
   */
  enqueue(value: Element, priority: number): this;

  /**
   * 出队
   */
  dequeue(): Element | null;

  /**
   * 查看队首数据元素
   */
  peek(): Element | null;

  /**
   * 修改数据元素的优先级
   * @param value 数据元素
   * @param priority 优先级
   */
  changePriority(value: Element, priority: number): this;

  /**
   * 是否包含指定数据元素
   * @param value 数据元素
   */
  hasValue(value: Element): boolean;

  /**
   * 删除指定数据元素
   * @param value 数据元素
   */
  remove(value: Element): this;

  /**
   * 查找指定数据元素的索引
   * @param value 数据元素
   */
  findByValue(value: Element): number[];

  /**
   * 队列转字符串
   */
  toString(): string;

  /**
   * 队列是否为空
   */
  isEmpty(): boolean;
}
