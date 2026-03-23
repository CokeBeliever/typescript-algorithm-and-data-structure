import type { BinarySearchTreeInterface } from '@/data-structure/types/tree/binary-search-tree';
import type { BinarySearchTreeNodeInterface } from '@/data-structure/types/tree/binary-search-tree-node';
import type { BinaryTreeOrderCallbackType } from '@/data-structure/types/tree/binary-tree-node';
import Comparator from '@/utils/Comparator';
import BinarySearchTreeNode from '@/data-structure/tree/BinarySearchTreeNode';

/**
 * 二叉查找树
 */
export default class BinarySearchTree<Element>
  implements BinarySearchTreeInterface<Element>
{
  private compare: Comparator<Element>;
  private root: BinarySearchTreeNode<Element> | null = null;

  constructor(comparatorFunction?: (a: Element, b: Element) => number) {
    this.compare = new Comparator(comparatorFunction);
  }

  public insert(el: Element) {
    if (this.isEmpty()) {
      this.root = new BinarySearchTreeNode(el, null, null, this.compare.compare);
    } else {
      this.root!.insert(el);
    }
  }

  public remove(el: Element) {
    if (this.isEmpty()) {
      throw new Error('remove(): 二叉查找树是空树');
    }

    if (!this.compare.equal(this.root!.data, el)) {
      return this.root!.remove(el);
    }

    const deletedNode = this.root as BinarySearchTreeNode<Element>;

    // root: 出度为 0
    if (deletedNode.left === null && deletedNode.right === null) {
      this.root = null;
      return deletedNode;
    }

    // root: 出度为 1
    if (deletedNode.left === null || deletedNode.right === null) {
      this.root = deletedNode.left || deletedNode.right;
      deletedNode.left = null;
      deletedNode.right = null;
      return deletedNode;
    }

    // root: 出度为 2
    let replacementParent = deletedNode;
    let replacement = deletedNode.left as BinarySearchTreeNode<Element>;

    while (replacement.right) {
      replacementParent = replacement;
      replacement = replacement.right;
    }

    if (replacementParent !== deletedNode) {
      replacementParent.right = replacement.left;
      replacement.left = deletedNode.left;
    }

    replacement.right = deletedNode.right;
    this.root = replacement;
    deletedNode.left = null;
    deletedNode.right = null;

    return deletedNode;
  }

  public contains(el: Element) {
    if (this.isEmpty()) {
      return false;
    } else {
      return this.root!.contains(el);
    }
  }

  public search(el: Element) {
    if (this.isEmpty()) {
      return null;
    } else {
      return this.root!.search(el);
    }
  }

  public min() {
    if (this.isEmpty()) {
      return null;
    } else {
      return this.root!.min();
    }
  }

  public max() {
    if (this.isEmpty()) {
      return null;
    } else {
      return this.root!.max();
    }
  }

  public toString() {
    if (this.isEmpty()) {
      return '';
    } else {
      return this.root!.toString();
    }
  }

  public isEmpty() {
    return this.root === null;
  }

  public preOrder(
    cb: BinaryTreeOrderCallbackType<BinarySearchTreeNodeInterface<Element>>
  ) {
    if (!this.isEmpty()) {
      this.root!.preOrder(cb);
    }
  }

  public inOrder(
    cb: BinaryTreeOrderCallbackType<BinarySearchTreeNodeInterface<Element>>
  ) {
    if (!this.isEmpty()) {
      this.root!.inOrder(cb);
    }
  }

  public postOrder(
    cb: BinaryTreeOrderCallbackType<BinarySearchTreeNodeInterface<Element>>
  ) {
    if (!this.isEmpty()) {
      this.root!.postOrder(cb);
    }
  }

  public levelOrder(
    cb: BinaryTreeOrderCallbackType<BinarySearchTreeNodeInterface<Element>>
  ) {
    if (!this.isEmpty()) {
      this.root!.levelOrder(cb);
    }
  }

  [Symbol.iterator]() {
    if (this.isEmpty()) {
      const iterator: Iterator<BinarySearchTreeNode<Element>> = {
        next() {
          return { done: true, value: undefined };
        },
      };
      return iterator;
    } else {
      return this.root![Symbol.iterator]();
    }
  }
}
