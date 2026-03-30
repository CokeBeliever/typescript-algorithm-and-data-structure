import { LinkedList } from '@/data-structure/linked-list';
import type { StackInterface } from '@/data-structure/stack/stack.types';

/**
 * 栈 (链表实现)
 */
export default class StackByLinkedList<Element>
  implements StackInterface<Element>
{
  /** 元素容器 */
  private _container: LinkedList<Element> = new LinkedList();

  public push(el: Element): void {
    this._container.insertHead(el);
  }

  public pop(): Element | null {
    if (this.isEmpty()) return null;
    return this._container.deleteHead()!.data;
  }

  public peek(): Element | null {
    if (this.isEmpty()) return null;
    return this._container.getHead()!.data;
  }

  public toString(): string {
    return this._container.toString();
  }

  public isEmpty(): boolean {
    return this._container.isEmpty();
  }

  public *[Symbol.iterator](): IterableIterator<Element> {
    for (const node of this._container) {
      yield node.data;
    }
  }
}
