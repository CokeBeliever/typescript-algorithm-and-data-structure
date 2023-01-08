import { LinkedList } from '@/data-structure/linked-list';

/**
 * 栈 (链表实现)
 */
export default class StackByLinkedList<Element>
  implements StackInterface<Element>
{
  /** 元素容器 */
  private container: LinkedList<Element> = new LinkedList();

  public push(el: Element) {
    this.container.insertHead(el);
  }

  public pop() {
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
