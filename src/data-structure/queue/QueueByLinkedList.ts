import { LinkedList } from '@/data-structure/linked-list';

/**
 * 队列 (链表实现)
 */
export default class QueueByLinkedList<Element>
  implements QueueInterface<Element>
{
  /** 元素容器 */
  private container: LinkedList<Element> = new LinkedList();

  public enqueue(el: Element) {
    this.container.insertTail(el);
  }

  public dequeue() {
    if (this.isEmpty()) return null;
    return this.container.deleteHead()!.data;
  }

  public peek() {
    if (this.isEmpty()) return null;
    return this.container.getHead()!.data;
  }

  public toString() {
    return this.container.toString();
  }

  public isEmpty() {
    return this.container.isEmpty();
  }

  public *[Symbol.iterator]() {
    for (let node of this.container) {
      yield node.data;
    }
  }
}
