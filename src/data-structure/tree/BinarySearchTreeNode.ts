import Comparator from '@/utils/Comparator';
import BinaryTreeNode from './BinaryTreeNode';

/**
 * 二叉查找树结点
 */
export default class BinarySearchTreeNode<Element>
  extends BinaryTreeNode<BinarySearchTreeNode<Element>, Element>
  implements BinarySearchTreeNodeInterface<Element>
{
  /** 比较器 */
  private compare: Comparator<Element>;

  /**
   * 构造函数
   * @param comparatorFunction 比较函数
   */
  constructor(
    data: Element,
    left: BinarySearchTreeNode<Element> | null = null,
    right: BinarySearchTreeNode<Element> | null = null,
    comparatorFunction?: (a: Element, b: Element) => number
  ) {
    super(data, left, right);
    this.compare = new Comparator(comparatorFunction);
  }

  public insert(el: Element) {
    let currNode: BinarySearchTreeNode<Element> = this;

    while (true) {
      if (this.compare.equal(el, currNode.data)) {
        throw new Error('insert(): el 参数的值在树中已存在');
      } else if (this.compare.lessThan(el, currNode.data)) {
        if (currNode.left) currNode = currNode.left;
        else {
          currNode.left = new BinarySearchTreeNode(el);
          break;
        }
      } else {
        if (currNode.right) currNode = currNode.right;
        else {
          currNode.right = new BinarySearchTreeNode(el);
          break;
        }
      }
    }
  }

  public remove(el: Element) {
    let parentNode: BinarySearchTreeNode<Element> | null = null;
    let currNode: BinarySearchTreeNode<Element> | null = this;

    while (currNode) {
      if (this.compare.equal(el, currNode.data)) {
        // currNode: 出度为 0 的结点 (叶子结点)
        if (currNode.left === null && currNode.right === null) {
          // currNode: 根节点
          if (parentNode === null) {
            return this;
          } else {
            if (parentNode.left === currNode) parentNode.left = null;
            else parentNode.right = null;
            return currNode;
          }
        }
        // currNode: 出度为 1 的结点
        else if (currNode.left === null || currNode.right === null) {
          // currNode: 根节点
          if (parentNode === null) {
            return this;
          } else {
            if (parentNode.left === currNode) {
              parentNode.left = currNode.left || currNode.right;
            } else parentNode.right = currNode.left || currNode.right;
            return currNode;
          }
        }
        // currNode: 出度为 2 的结点
        else {
          // currNode 的左子树中最大的叶子结点
          const leftMaxLeafNode = currNode.left.max();
          this.remove(leftMaxLeafNode.data);
          // currNode: 根节点
          if (parentNode === null) {
            return this;
          } else {
            if (parentNode.left === currNode) parentNode.left = leftMaxLeafNode;
            else parentNode.right = leftMaxLeafNode;
            leftMaxLeafNode.left = currNode.left;
            leftMaxLeafNode.right = currNode.right;
            return currNode;
          }
        }
      } else if (this.compare.lessThan(el, currNode.data)) {
        parentNode = currNode;
        currNode = currNode.left;
      } else {
        parentNode = currNode;
        currNode = currNode.right;
      }
    }

    return null;
  }

  public contains(el: Element) {
    let currNode: BinarySearchTreeNode<Element> | null = this;

    while (currNode && !this.compare.equal(el, currNode.data)) {
      if (this.compare.lessThan(el, currNode.data)) currNode = currNode.left;
      else currNode = currNode.right;
    }

    return currNode !== null;
  }

  public search(el: Element) {
    let currNode: BinarySearchTreeNode<Element> | null = this;

    while (currNode && !this.compare.equal(el, currNode.data)) {
      if (this.compare.lessThan(el, currNode.data)) currNode = currNode.left;
      else currNode = currNode.right;
    }

    return currNode;
  }

  public min() {
    let currNode: BinarySearchTreeNode<Element> = this;

    while (currNode.left) {
      currNode = currNode.left;
    }

    return currNode;
  }

  public max() {
    let currNode: BinarySearchTreeNode<Element> = this;

    while (currNode.right) {
      currNode = currNode.right;
    }

    return currNode;
  }
}
