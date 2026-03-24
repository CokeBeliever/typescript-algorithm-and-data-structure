import { LinkedList } from '@/data-structure/linked-list';
import type { StackInterface } from '@/data-structure/types/stack';

/**
 * 栈 (链表实现)
 */
export default class StackByLinkedList<Element>
  implements StackInterface<Element>
{
  /** 元素容器 */
  private _container: LinkedList<Element> = new LinkedList();

  public push(el: Element) {
    this._container.insertHead(el);
  }

  public pop() {
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
