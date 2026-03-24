/**
 * 图遍历回调函数类型
 */
export type GraphTraverseCallbackType<Element> = (vertex: Element) => void;

/**
 * 图接口
 */
export interface GraphInterface<Element> extends Iterable<Element> {
  /**
   * 添加顶点
   * @param vertex 顶点
   */
  addVertex(vertex: Element): this;

  /**
   * 添加边
   * @param start 边的起点
   * @param end 边的终点
   */
  addEdge(start: Element, end: Element): this;

  /**
   * 获取顶点的邻接点
   * @param vertex 顶点
   */
  getNeighbors(vertex: Element): Element[];

  /**
   * 图中是否包含指定顶点
   * @param vertex 顶点
   */
  hasVertex(vertex: Element): boolean;

  /**
   * 图中是否包含指定边
   * @param start 边的起点
   * @param end 边的终点
   */
  hasEdge(start: Element, end: Element): boolean;

  /**
   * 是否为有向图
   */
  isDirected(): boolean;

  /**
   * 图转字符串
   */
  toString(): string;

  /**
   * 图是否为空
   */
  isEmpty(): boolean;
}

/**
 * 带权图边接口
 */
export interface WeightedGraphEdgeInterface<Element> {
  /** 邻接点 */
  vertex: Element;

  /** 边权 */
  weight: number;
}

/**
 * 带权图接口
 */
export interface WeightedGraphInterface<Element> extends Iterable<Element> {
  /**
   * 添加顶点
   * @param vertex 顶点
   */
  addVertex(vertex: Element): this;

  /**
   * 添加边
   * @param start 边的起点
   * @param end 边的终点
   * @param weight 边权
   */
  addEdge(start: Element, end: Element, weight: number): this;

  /**
   * 获取顶点的邻接边
   * @param vertex 顶点
   */
  getNeighbors(vertex: Element): WeightedGraphEdgeInterface<Element>[];

  /**
   * 图中是否包含指定顶点
   * @param vertex 顶点
   */
  hasVertex(vertex: Element): boolean;

  /**
   * 图中是否包含指定边
   * @param start 边的起点
   * @param end 边的终点
   */
  hasEdge(start: Element, end: Element): boolean;

  /**
   * 获取指定边的边权
   * @param start 边的起点
   * @param end 边的终点
   */
  getWeight(start: Element, end: Element): number | null;

  /**
   * 是否为有向图
   */
  isDirected(): boolean;

  /**
   * 图转字符串
   */
  toString(): string;

  /**
   * 图是否为空
   */
  isEmpty(): boolean;
}