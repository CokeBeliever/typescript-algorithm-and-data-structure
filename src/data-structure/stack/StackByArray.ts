import type { StackInterface } from '@/data-structure/stack/stack.types';

/**
 * 栈 (数组实现)
 */
export default class StackByArray<Element> implements StackInterface<Element> {
  /** 元素容器 */
  private _container: Element[] = [];

  public push(el: Element): void {
    this._container.push(el);
  }

  public pop(): Element | null {
    if (this.isEmpty()) return null;
    return this._container.pop() as Element;
  }

  public peek(): Element | null {
    if (this.isEmpty()) return null;
    return this._container[this._container.length - 1];
  }

  public toString(): string {
    return this._container.concat().reverse().toString();
  }

  public isEmpty(): boolean {
    return this._container.length === 0;
  }

  public *[Symbol.iterator](): IterableIterator<Element> {
    for (let i = this._container.length - 1; i >= 0; i--) {
      yield this._container[i];
    }
  }
}
