import { QueueByLinkedList } from '@/data-structure/queue';
import type {
  BinaryTreeNodeInterface,
  BinaryTreeOrderCallbackType,
} from '@/data-structure/types/tree/binary-tree-node';

/**
 * 二叉树的广度优先搜索
 */
export default function BreadthFirstSearchByTree<
  Node extends BinaryTreeNodeInterface<Node, Element>,
  Element
>(
  root: Node | null,
  cb?: BinaryTreeOrderCallbackType<Node>
) {
  if (root === null) {
    return [];
  }

  const queue = new QueueByLinkedList<Node>();
  const traversedOrder: Node[] = [];

  queue.enqueue(root);

  while (!queue.isEmpty()) {
    const node = queue.dequeue() as Node;
    traversedOrder.push(node);

    if (cb) {
      cb(node);
    }

    if (node.left) {
      queue.enqueue(node.left);
    }

    if (node.right) {
      queue.enqueue(node.right);
    }
  }

  return traversedOrder;
}