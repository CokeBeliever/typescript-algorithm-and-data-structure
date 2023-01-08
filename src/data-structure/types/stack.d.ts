/**
 * 栈接口
 */
declare interface StackInterface<Element> extends Iterable<Element> {
  /**
   * 入栈
   */
  push(el: Element): void;

  /**
   * 出栈
   */
  pop(): Element | null;

  /**
   * 查看栈顶的数据元素
   */
  peek(): Element | null;

  /**
   * 栈转字符串
   */
  toString(): string;

  /**
   * 栈是否为空
   */
  isEmpty(): boolean;
}
