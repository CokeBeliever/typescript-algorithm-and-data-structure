import { QueueByLinkedList } from '@/data-structure/queue';

/**
 * 二叉树结点 (二叉链表实现)
 */
abstract class BinaryTreeNodeByBinaryLinkedList<
  T extends BinaryTreeNodeByBinaryLinkedList<T, Element>,
  Element
> implements BinaryTreeNodeByBinaryLinkedListInterface<T, Element>
{
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
 * 二叉树结点 (三叉链表实现)
 */
abstract class BinaryTreeNodeByTridentLinkedList<
  T extends BinaryTreeNodeByTridentLinkedList<T, Element>,
  Element
> implements BinaryTreeNodeByTridentLinkedListInterface<T, Element>
{
  data: Element;
  left: T | null;
  right: T | null;
  parent: T | null;

  constructor(
    data: Element,
    left: T | null = null,
    right: T | null = null,
    parent: T | null = null
  ) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.parent = parent;
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
  public preOrder(cb: BinaryTreeOrderCallbackType<T>) {
    cb(this as any);
    if (this.left) this.left.preOrder(cb);
    if (this.right) this.right.preOrder(cb);
  }

  public inOrder(cb: BinaryTreeOrderCallbackType<T>) {
    if (this.left) this.left.inOrder(cb);
    cb(this as any);
    if (this.right) this.right.inOrder(cb);
  }

  public postOrder(cb: BinaryTreeOrderCallbackType<T>) {
    if (this.left) this.left.postOrder(cb);
    if (this.right) this.right.postOrder(cb);
    cb(this as any);
  }

  public levelOrder(cb: BinaryTreeOrderCallbackType<T>) {
    const queue = new QueueByLinkedList<T>();
    queue.enqueue(this as any);

    while (!queue.isEmpty()) {
      const node = queue.dequeue() as T;
      cb(node);
      node.left && queue.enqueue(node.left);
      node.right && queue.enqueue(node.right);
    }
  }

  public toString() {
    const list: string[] = [];

    for (const node of this) {
      list.push(`${node.data}`);
    }

    return list.join(',');
  }

  public *[Symbol.iterator]() {
    const list: T[] = [];

    this.preOrder((node) => list.push(node));
    yield* list;
  }
}
