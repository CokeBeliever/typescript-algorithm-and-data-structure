/**
 * 队列接口
 */
declare interface QueueInterface<Element> extends Iterable<Element> {
  /**
   * 入队
   */
  enqueue(el: Element): void;

  /**
   * 出队
   */
  dequeue(): Element | null;

  /**
   * 查看队首的数据元素
   */
  peek(): Element | null;

  /**
   * 队列转字符串
   */
  toString(): string;

  /**
   * 队列是否为空
   */
  isEmpty(): boolean;
}
