import type { BinarySearchTreeInterface } from '@/data-structure/tree/binary-search-tree.types';
import type { BinarySearchTreeNodeInterface } from '@/data-structure/tree/binary-search-tree-node.types';
import type { BinaryTreeOrderCallbackType } from '@/data-structure/tree/binary-tree-node.types';
import Comparator from '@/utils/Comparator';
import BinarySearchTreeNode from '@/data-structure/tree/BinarySearchTreeNode';

/**
 * 二叉查找树
 */
export default class BinarySearchTree<Element>
  implements BinarySearchTreeInterface<Element>
{
  private _comparator: Comparator<Element>;
  private _root: BinarySearchTreeNode<Element> | null = null;

  constructor(comparatorFunction?: (a: Element, b: Element) => number) {
    this._comparator = new Comparator(comparatorFunction);
  }

  public insert(el: Element): void {
    if (this.isEmpty()) {
      this._root = new BinarySearchTreeNode(
        el,
        null,
        null,
        this._comparator.compare
      );
    } else {
      this._root!.insert(el);
    }
  }

  public remove(el: Element): BinarySearchTreeNode<Element> | null {
    if (this.isEmpty()) {
      throw new Error('remove(): 二叉查找树是空树');
    }

    if (!this._comparator.equal(this._root!.data, el)) {
      return this._root!.remove(el);
    }

    const deletedNode = this._root as BinarySearchTreeNode<Element>;

    // _root: 出度为 0
    if (deletedNode.left === null && deletedNode.right === null) {
      this._root = null;
      return deletedNode;
    }

    // _root: 出度为 1
    if (deletedNode.left === null || deletedNode.right === null) {
      this._root = deletedNode.left || deletedNode.right;
      deletedNode.left = null;
      deletedNode.right = null;
      return deletedNode;
    }

    // _root: 出度为 2
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
    this._root = replacement;
    deletedNode.left = null;
    deletedNode.right = null;

    return deletedNode;
  }

  public contains(el: Element): boolean {
    if (this.isEmpty()) {
      return false;
    } else {
      return this._root!.contains(el);
    }
  }

  public search(el: Element): BinarySearchTreeNode<Element> | null {
    if (this.isEmpty()) {
      return null;
    } else {
      return this._root!.search(el);
    }
  }

  public min(): BinarySearchTreeNode<Element> | null {
    if (this.isEmpty()) {
      return null;
    } else {
      return this._root!.min();
    }
  }

  public max(): BinarySearchTreeNode<Element> | null {
    if (this.isEmpty()) {
      return null;
    } else {
      return this._root!.max();
    }
  }

  public toString(): string {
    if (this.isEmpty()) {
      return '';
    } else {
      return this._root!.toString();
    }
  }

  public isEmpty(): boolean {
    return this._root === null;
  }

  public preOrder(
    cb: BinaryTreeOrderCallbackType<BinarySearchTreeNodeInterface<Element>>
  ): void {
    if (!this.isEmpty()) {
      this._root!.preOrder(cb);
    }
  }

  public inOrder(
    cb: BinaryTreeOrderCallbackType<BinarySearchTreeNodeInterface<Element>>
  ): void {
    if (!this.isEmpty()) {
      this._root!.inOrder(cb);
    }
  }

  public postOrder(
    cb: BinaryTreeOrderCallbackType<BinarySearchTreeNodeInterface<Element>>
  ): void {
    if (!this.isEmpty()) {
      this._root!.postOrder(cb);
    }
  }

  public levelOrder(
    cb: BinaryTreeOrderCallbackType<BinarySearchTreeNodeInterface<Element>>
  ): void {
    if (!this.isEmpty()) {
      this._root!.levelOrder(cb);
    }
  }

  public [Symbol.iterator](): Iterator<BinarySearchTreeNode<Element>> {
    if (this.isEmpty()) {
      const iterator: Iterator<BinarySearchTreeNode<Element>> = {
        next(): IteratorResult<BinarySearchTreeNode<Element>> {
          return { done: true, value: undefined };
        },
      };
      return iterator;
    } else {
      return this._root![Symbol.iterator]();
    }
  }
}
