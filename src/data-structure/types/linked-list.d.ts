/**
 * 结点接口
 */
declare interface NodeInterface<Element> {
  /** 当前结点的数据 */
  data: Element;
  /** 后继结点的指针 */
  next: NodeInterface<Element> | null;

  /**
   * 结点转字符串
   */
  toString(): string;
}

/**
 * 链表接口
 */
declare interface LinkedListInterface<Element>
  extends Iterable<NodeInterface<Element>> {
  /**
   * 在链表头部插入结点
   * @param el 数据元素
   */
  insertHead(el: Element): this;

  /**
   * 在链表尾部插入结点
   * @param el 数据元素
   */
  insertTail(el: Element): this;

  /**
   * 在链表指定位置插入结点
   * @param el 数据元素
   * @param index 指定位置索引
   */
  insert(el, index): this;

  /**
   * 在链表头部删除结点
   */
  deleteHead(): NodeInterface<Element> | null;

  /**
   * 在链表尾部删除结点
   */
  deleteTail(): NodeInterface<Element> | null;

  /**
   * 在链表中删除指定数据元素的结点
   * @param el 数据元素
   */
  delete(el: Element): NodeInterface<Element>[] | null;

  /**
   * 在链表中查询指定数据元素的结点
   * @param el 数据元素
   */
  find(el: Element): NodeInterface<Element> | null;

  /**
   * 链表反转
   */
  reverse(): this;

  /**
   * 链表转字符串
   */
  toString(): string;

  /**
   * 链表是否为空
   */
  isEmpty(): boolean;
}
