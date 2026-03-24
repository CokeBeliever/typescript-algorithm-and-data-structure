import { StackByArray } from '@/data-structure/stack';
import type {
  BinaryTreeNodeInterface,
  BinaryTreeOrderCallbackType,
} from '@/data-structure/types/tree/binary-tree-node';

/**
 * 二叉树的深度优先搜索 (迭代)
 */
export default function <
  Node extends BinaryTreeNodeInterface<Node, Element>,
  Element
>(root: Node | null, cb?: BinaryTreeOrderCallbackType<Node>) {
  if (root === null) {
    return [];
  }

  const stack = new StackByArray<Node>();
  const traversedOrder: Node[] = [];

  stack.push(root);

  while (!stack.isEmpty()) {
    const node = stack.pop() as Node;
    traversedOrder.push(node);

    if (cb) {
      cb(node);
    }

    if (node.right) {
      stack.push(node.right);
    }

    if (node.left) {
      stack.push(node.left);
    }
  }

  return traversedOrder;
}
