/**
 * 二叉查找树接口
 */
declare interface BinarySearchTreeInterface<Element>
  extends Iterable<BinarySearchTreeNodeInterface<Element>> {
  /**
   * 插入数据元素
   * @param el 数据元素
   */
  insert(el: Element): void;

  /**
   * 删除数据元素
   * @param el 数据元素
   */
  remove(el: Element): BinarySearchTreeNodeInterface<Element> | null;

  /**
   * 是否包含数据元素
   * @param el 数据元素
   */
  contains(el: Element): boolean;

  /**
   * 查找数据元素
   * @param el 数据元素
   */
  search(el: Element): BinarySearchTreeNodeInterface<Element> | null;

  /**
   * 获取二叉查找树的最小数据元素结点
   */
  min(): BinarySearchTreeNodeInterface<Element> | null;

  /**
   * 获取二叉查找树的最大数据元素结点
   */
  max(): BinarySearchTreeNodeInterface<Element> | null;

  /**
   * 先序遍历
   * @param cb 回调函数
   */
  preOrder(
    cb: BinaryTreeOrderCallbackType<BinarySearchTreeNodeInterface<Element>>
  ): void;

  /**
   * 中序遍历
   * @param cb 回调函数
   */
  inOrder(
    cb: BinaryTreeOrderCallbackType<BinarySearchTreeNodeInterface<Element>>
  ): void;

  /**
   * 后序遍历
   * @param cb 回调函数
   */
  postOrder(
    cb: BinaryTreeOrderCallbackType<BinarySearchTreeNodeInterface<Element>>
  ): void;

  /**
   * 层序遍历
   * @param cb
   */
  levelOrder(
    cb: BinaryTreeOrderCallbackType<BinarySearchTreeNodeInterface<Element>>
  ): void;

  /**
   * 二叉查找树转字符串
   */
  toString(): string;

  /**
   * 二叉查找树是否为空
   */
  isEmpty(): boolean;
}
