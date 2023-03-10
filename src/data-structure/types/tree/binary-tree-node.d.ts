/**
 * 二叉树结点接口 (二叉链表)
 */
declare interface BinaryTreeNodeByBinaryLinkedListInterface<T, Element> {
  /** 当前结点的数据 */
  data: Element;
  /** 左子结点的指针 */
  left: T | null;
  /** 右子结点的指针 */
  right: T | null;
}

/**
 * 二叉树结点接口 (三叉链表)
 */
declare interface BinaryTreeNodeByTridentLinkedListInterface<T, Element> {
  /** 当前结点的数据 */
  data: Element;
  /** 左子结点的指针 */
  left: T | null;
  /** 右子结点的指针 */
  right: T | null;
  /** 双亲结点的指针 */
  parent: T | null;
}

/**
 * 二叉树结点接口
 */
declare interface BinaryTreeNodeInterface<T, Element>
  extends BinaryTreeNodeByBinaryLinkedListInterface<T, Element>,
    Iterable<T> {
  /**
   * 先序遍历
   * @param cb 回调函数
   */
  preOrder(cb: BinaryTreeOrderCallbackType<T>): void;

  /**
   * 中序遍历
   * @param cb 回调函数
   */
  inOrder(cb: BinaryTreeOrderCallbackType<T>): void;

  /**
   * 后序遍历
   * @param cb 回调函数
   */
  postOrder(cb: BinaryTreeOrderCallbackType<T>): void;

  /**
   * 层序遍历
   * @param cb
   */
  levelOrder(cb: BinaryTreeOrderCallbackType<T>): void;

  /**
   * 结点转字符串
   */
  toString(): string;
}

/**
 * 二叉树先/中/后/层序遍历的回调函数类型
 */
declare type BinaryTreeOrderCallbackType<T> = (node: T) => void;
