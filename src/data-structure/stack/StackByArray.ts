import type { StackInterface } from '@/data-structure/stack/stack.types';

/**
 * 栈 (数组实现)
 */
export default class StackByArray<Element> implements StackInterface<Element> {
  /** 元素容器 */
  private _container: Element[] = [];

  public push(el: Element) {
    this._container.push(el);
  }

  public pop() {
    if (this.isEmpty()) return null;
    return this._container.pop() as Element;
  }

  public peek() {
    if (this.isEmpty()) return null;
    return this._container[this._container.length - 1];
  }

  public toString() {
    return this._container.concat().reverse().toString();
  }

  public isEmpty() {
    return this._container.length === 0;
  }

  public *[Symbol.iterator]() {
    for (let i = this._container.length - 1; i >= 0; i--) {
      yield this._container[i];
    }
  }
}
