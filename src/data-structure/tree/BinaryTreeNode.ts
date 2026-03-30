import { QueueByLinkedList } from '@/data-structure/queue';
import type {
  BinaryTreeNodeInterface,
  BinaryTreeOrderCallbackType,
} from '@/data-structure/tree/binary-tree-node.types';

/**
 * 二叉树结点 (二叉链表实现)
 */
abstract class BinaryTreeNodeByBinaryLinkedList<
  T extends BinaryTreeNodeByBinaryLinkedList<T, Element>,
  Element
> {
  data: Element;
  left: T | null;
  right: T | null;

  constructor(data: Element, left: T | null = null, right: T | null = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

/**
 * 二叉树结点
 */
export default abstract class BinaryTreeNode<
    T extends BinaryTreeNode<T, Element>,
    Element
  >
  extends BinaryTreeNodeByBinaryLinkedList<T, Element>
  implements BinaryTreeNodeInterface<T, Element>
{
  public preOrder(cb: BinaryTreeOrderCallbackType<T>): void {
    cb(this as unknown as T);
    if (this.left) this.left.preOrder(cb);
    if (this.right) this.right.preOrder(cb);
  }

  public inOrder(cb: BinaryTreeOrderCallbackType<T>): void {
    if (this.left) this.left.inOrder(cb);
    cb(this as unknown as T);
    if (this.right) this.right.inOrder(cb);
  }

  public postOrder(cb: BinaryTreeOrderCallbackType<T>): void {
    if (this.left) this.left.postOrder(cb);
    if (this.right) this.right.postOrder(cb);
    cb(this as unknown as T);
  }

  public levelOrder(cb: BinaryTreeOrderCallbackType<T>): void {
    const queue = new QueueByLinkedList<T>();
    queue.enqueue(this as unknown as T);

    while (!queue.isEmpty()) {
      const node = queue.dequeue() as T;
      cb(node);
      node.left && queue.enqueue(node.left);
      node.right && queue.enqueue(node.right);
    }
  }

  public toString(): string {
    const list: string[] = [];

    for (const node of this) {
      list.push(`${node.data}`);
    }

    return list.join(',');
  }

  public *[Symbol.iterator](): IterableIterator<T> {
    const list: T[] = [];

    this.preOrder((node) => list.push(node));
    yield* list;
  }
}
