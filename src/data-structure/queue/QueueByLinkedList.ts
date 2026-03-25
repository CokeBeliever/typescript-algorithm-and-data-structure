import { LinkedList } from '@/data-structure/linked-list';
import type { QueueInterface } from '@/data-structure/queue/queue.types';

/**
 * 队列 (链表实现)
 */
export default class QueueByLinkedList<Element>
  implements QueueInterface<Element>
{
  /** 元素容器 */
  private _container: LinkedList<Element> = new LinkedList();

  public enqueue(el: Element) {
    this._container.insertTail(el);
  }

  public dequeue() {
    if (this.isEmpty()) return null;
    return this._container.deleteHead()!.data;
  }

  public peek() {
    if (this.isEmpty()) return null;
    return this._container.getHead()!.data;
  }

  public toString() {
    return this._container.toString();
  }

  public isEmpty() {
    return this._container.isEmpty();
  }

  public *[Symbol.iterator]() {
    for (let node of this._container) {
      yield node.data;
    }
  }
}
