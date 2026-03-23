import type { QueueInterface } from '@/data-structure/types/queue';

/**
 * 队列 (数组实现)
 */
export default class QueueByArray<Element> implements QueueInterface<Element> {
  /** 元素容器 */
  private _container: Element[] = [];

  public enqueue(el: Element) {
    this._container.push(el);
  }

  public dequeue() {
    if (this.isEmpty()) return null;
    return this._container.shift() as Element;
  }

  public peek() {
    if (this.isEmpty()) return null;
    return this._container[0];
  }

  public toString() {
    return this._container.toString();
  }

  public isEmpty() {
    return this._container.length === 0;
  }

  public [Symbol.iterator]() {
    return this._container[Symbol.iterator]();
  }
}
