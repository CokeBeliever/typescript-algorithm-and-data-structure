/**
 * 队列 (数组实现)
 */
export default class QueueByArray<Element> implements QueueInterface<Element> {
  /** 元素容器 */
  private container: Element[] = [];

  public enqueue(el: Element) {
    this.container.push(el);
  }

  public dequeue() {
    if (this.isEmpty()) return null;
    return this.container.shift() as Element;
  }

  public peek() {
    if (this.isEmpty()) return null;
    return this.container[0];
  }

  public toString() {
    return this.container.toString();
  }

  public isEmpty() {
    return this.container.length === 0;
  }

  public [Symbol.iterator]() {
    return this.container[Symbol.iterator]();
  }
}
