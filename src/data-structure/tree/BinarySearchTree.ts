import BinarySearchTreeNode from './BinarySearchTreeNode';

/**
 * 二叉查找树
 */
export default class BinarySearchTree<Element>
  implements BinarySearchTreeInterface<Element>
{
  private root: BinarySearchTreeNode<Element> | null = null;

  public insert(el: Element) {
    if (this.isEmpty()) {
      this.root = new BinarySearchTreeNode(el);
    } else {
      this.root!.insert(el);
    }
  }

  public remove(el: Element) {
    if (this.isEmpty()) {
      throw new Error('remove(): 二叉查找树是空树');
    } else {
      const targetNode = this.root!.remove(el);

      if (targetNode === this.root) {
        // root: 出度为 0
        if (this.root!.left === null && this.root!.right === null) {
          this.root = null;
        }
        // root: 出度为 1
        else if (this.root!.left === null || this.root!.right === null) {
          this.root = this.root!.left || this.root!.right;
        }
        // root: 出度为 2
        else {
          const leftMaxLeafNode = this.root!.left.max();
          this.remove(leftMaxLeafNode.data);
          this.root = leftMaxLeafNode;
          this.root.left = targetNode!.left;
          this.root.right = targetNode!.right;
        }
      }

      return targetNode;
    }
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
