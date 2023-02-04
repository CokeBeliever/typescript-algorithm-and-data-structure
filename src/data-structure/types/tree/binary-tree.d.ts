/**
 * 二叉树结点接口 (二叉链表实现)
 */
interface BinaryTreeNodeByBinaryLinkedListInterface<T, Element> {
  /** 当前结点的数据 */
  data: Element;
  /** 左子结点的指针 */
  left: T | null;
  /** 右子结点的指针 */
  right: T | null;
}

/**
 * 二叉树结点接口 (三叉链表实现)
 */
interface BinaryTreeNodeByTridentLinkedListInterface<T, Element> {
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
declare interface BinaryTreeNodeInterface<T, Element = any>
  extends BinaryTreeNodeByBinaryLinkedListInterface<T, Element> {
  /**
   * 结点转字符串
   */
  toString(): string;
}

/**
 * 二叉树接口
 */
declare interface BinaryTreeInterface<T extends BinaryTreeNodeInterface<T>>
  extends Iterable<T> {
  /**
   * 先序遍历
   * @param callback 回调函数
   */
  preOrder(callback?: BinaryTreeOrderCallbackType<T>): void;

  /**
   * 中序遍历
   * @param callback 回调函数
   */
  inOrder(callback?: BinaryTreeOrderCallbackType<T>): void;

  /**
   * 后序遍历
   * @param callback 回调函数
   */
  postOrder(callback?: BinaryTreeOrderCallbackType<T>): void;

  /**
   * 二叉树转字符串
   */
  toString(): string;

  /**
   * 是否为空
   */
  isEmpty(): boolean;
}

/**
 * 二叉树先/中/后序遍历的回调函数类型
 */
declare type BinaryTreeOrderCallbackType<T> = (node: T) => void;
