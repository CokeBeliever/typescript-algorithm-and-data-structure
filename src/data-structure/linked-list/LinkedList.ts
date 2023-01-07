import Comparator from '@/utils/Comparator';

/**
 * 结点
 */
class Node<Element> implements NodeInterface<Element> {
  public data: Element;
  public next: Node<Element> | null;

  constructor(data: Element, next: Node<Element> | null = null) {
    this.data = data;
    this.next = next;
  }

  public toString() {
    return `${this.data}`;
  }
}

/**
 * 链表
 */
export default class LinkedList<Element>
  implements LinkedListInterface<Element>
{
  /** 比较器 */
  private compare: Comparator<Element>;
  /** 链表头部结点 */
  private head: Node<Element> | null = null;
  /** 链表尾部结点 */
  private tail: Node<Element> | null = null;

  /**
   * 构造函数
   * @param comparatorFunction 比较函数
   */
  constructor(comparatorFunction?: (a: Element, b: Element) => number) {
    this.compare = new Comparator(comparatorFunction);
  }

  public insertHead(el: Element) {
    const node = new Node(el, this.head);

    if (this.isEmpty()) {
      this.head = this.tail = node;
    } else {
      this.head = node;
    }
    return this;
  }

  public insertTail(el: Element) {
    const node = new Node(el);

    if (this.isEmpty()) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    return this;
  }

  public insert(el: Element, index: number) {
    if (index < 0) throw new Error('insert(): index 参数不能小于 0');
    // 在链表头部插入
    if (index === 0) {
      this.insertHead(el);
    } else {
      let count = 1;
      let currNode = this.head;

      while (currNode) {
        if (count === index) break;
        currNode = currNode.next;
        count++;
      }

      // 在链表中间插入
      if (currNode) {
        currNode.next = new Node(el, currNode.next);
        // 在链表尾部插入
      } else {
        this.insertTail(el);
      }
    }

    return this;
  }

  public deleteHead() {
    if (this.isEmpty()) return null;

    const deletedNode = this.head as Node<Element>;

    if (deletedNode.next) {
      this.head = deletedNode.next;
      deletedNode.next = null;
    } else {
      this.head = this.tail = null;
    }

    return deletedNode;
  }

  public deleteTail() {
    if (this.isEmpty()) return null;

    const deletedNode = this.tail as Node<Element>;

    // 链表只有一个结点的情况
    if (this.head === this.tail) {
      this.head = this.tail = null;
      return deletedNode;
    }

    // 链表大于一个结点的情况
    let currNode = this.head as Node<Element>;
    while (currNode) {
      if (currNode.next === deletedNode) break;
      currNode = currNode.next as Node<Element>;
    }
    currNode.next = null;
    this.tail = currNode;

    return deletedNode;
  }

  public delete(el: Element) {
    const deletedNodeList: Node<Element>[] = [];

    let prevNode: Node<Element> | null = null;
    let currNode: Node<Element> | null = this.head;
    while (currNode) {
      if (this.compare.equal(currNode.data, el)) {
        if (currNode === this.head) {
          deletedNodeList.push(this.deleteHead() as Node<Element>);
          prevNode = null;
          currNode = this.head;
        } else if (currNode === this.tail) {
          deletedNodeList.push(this.deleteTail() as Node<Element>);
          break;
        } else {
          deletedNodeList.push(currNode);
          prevNode!.next = currNode.next;
          currNode.next = null;
          currNode = prevNode!.next;
        }
      } else {
        prevNode = currNode;
        currNode = currNode.next;
      }
    }

    return deletedNodeList;
  }

  public find(el: Element) {
    let currNode = this.head;

    while (currNode) {
      if (this.compare.equal(currNode.data, el)) return currNode;
      currNode = currNode.next;
    }

    return null;
  }

  public reverse() {
    let prevNode: Node<Element> | null = null;
    let currNode = this.head;
    let nextNode: Node<Element> | null = null;

    while (currNode) {
      nextNode = currNode.next;
      currNode.next = prevNode;
      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }

  public toString() {
    const ary: string[] = [];
    let currNode = this.head;

    while (currNode) {
      ary.push(currNode.toString());
      currNode = currNode.next;
    }

    return ary.join(',');
  }

  public isEmpty() {
    return this.head === null;
  }

  public *[Symbol.iterator]() {
    let currNode = this.head;

    while (currNode !== null) {
      yield currNode;
      currNode = currNode.next;
    }
  }
}
