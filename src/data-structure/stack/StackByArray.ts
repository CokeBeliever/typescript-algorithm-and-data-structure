/**
 * 栈 (数组实现)
 */
export default class StackByArray<Element> implements StackInterface<Element> {
  /** 元素容器 */
  private container: Element[] = [];

  public push(el: Element) {
    this.container.push(el);
  }

  public pop() {
    if (this.isEmpty()) return null;
    return this.container.pop() as Element;
  }

  public peek() {
    if (this.isEmpty()) return null;
    return this.container[this.container.length - 1];
  }

  public toString() {
    return this.container.concat().reverse().toString();
  }

  public isEmpty() {
    return this.container.length === 0;
  }

  public *[Symbol.iterator]() {
    for (let i = this.container.length - 1; i >= 0; i--) {
      yield this.container[i];
    }
  }
}
