import type {
  BinaryTreeNodeInterface,
  BinaryTreeOrderCallbackType,
} from '@/data-structure/types/tree/binary-tree-node';

/**
 * 二叉树的深度优先搜索 (递归)
 */
export default function DepthFirstSearchByTreeRecursive<
  Node extends BinaryTreeNodeInterface<Node, Element>,
  Element
>(
  root: Node | null,
  cb?: BinaryTreeOrderCallbackType<Node>
) {
  if (root === null) {
    return [];
  }

  const traversedOrder: Node[] = [];

  function traverse(node: Node) {
    traversedOrder.push(node);

    if (cb) {
      cb(node);
    }

    if (node.left) {
      traverse(node.left);
    }

    if (node.right) {
      traverse(node.right);
    }
  }

  traverse(root);

  return traversedOrder;
}