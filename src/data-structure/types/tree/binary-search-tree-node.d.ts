/**
 * 二叉查找树结点接口
 */
declare interface BinarySearchTreeNodeInterface<Element>
  extends BinaryTreeNodeInterface<
    BinarySearchTreeNodeInterface<Element>,
    Element
  > {
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
  min(): BinarySearchTreeNodeInterface<Element>;

  /**
   * 获取二叉查找树的最大数据元素结点
   */
  max(): BinarySearchTreeNodeInterface<Element>;
}
