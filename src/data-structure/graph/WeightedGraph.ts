import type {
  WeightedGraphEdgeInterface,
  WeightedGraphInterface,
} from '@/data-structure/types/graph';

/**
 * 带权图 (邻接表实现)
 */
export default class WeightedGraph<Element>
  implements WeightedGraphInterface<Element>
{
  /** 是否为有向图 */
  private _directed: boolean;

  /** 邻接表 */
  private _adjacencyList: Map<Element, WeightedGraphEdgeInterface<Element>[]> =
    new Map();

  constructor(directed = false) {
    this._directed = directed;
  }

  public addVertex(vertex: Element) {
    if (!this.hasVertex(vertex)) {
      this._adjacencyList.set(vertex, []);
    }

    return this;
  }

  public addEdge(start: Element, end: Element, weight: number) {
    this._assertWeight(weight);
    this.addVertex(start);
    this.addVertex(end);

    this._addNeighbor(start, end, weight);

    if (!this.isDirected()) {
      this._addNeighbor(end, start, weight);
    }

    return this;
  }

  public getNeighbors(vertex: Element) {
    if (!this.hasVertex(vertex)) {
      return [];
    }

    return this._adjacencyList.get(vertex)!.map((edge) => ({ ...edge }));
  }

  public hasVertex(vertex: Element) {
    return this._adjacencyList.has(vertex);
  }

  public hasEdge(start: Element, end: Element) {
    return this.getWeight(start, end) !== null;
  }

  public getWeight(start: Element, end: Element) {
    if (!this.hasVertex(start)) {
      return null;
    }

    const edge = this._adjacencyList
      .get(start)!
      .find((item) => item.vertex === end);

    return edge ? edge.weight : null;
  }

  public isDirected() {
    return this._directed;
  }

  public isEmpty() {
    return this._adjacencyList.size === 0;
  }

  public toString() {
    const list: string[] = [];

    for (const [vertex, neighbors] of this._adjacencyList) {
      list.push(
        `${vertex} => ${neighbors
          .map((edge) => `${edge.vertex}(${edge.weight})`)
          .join(',')}`
      );
    }

    return list.join('\n');
  }

  public *[Symbol.iterator]() {
    yield* this._adjacencyList.keys();
  }

  private _addNeighbor(vertex: Element, neighbor: Element, weight: number) {
    const neighbors = this._adjacencyList.get(vertex) as WeightedGraphEdgeInterface<Element>[];
    const existedNeighbor = neighbors.find((edge) => edge.vertex === neighbor);

    if (existedNeighbor) {
      existedNeighbor.weight = weight;
      return;
    }

    neighbors.push({ vertex: neighbor, weight });
  }

  private _assertWeight(weight: number) {
    if (!Number.isFinite(weight)) {
      throw new Error('addEdge(): weight 参数必须是有限数字');
    }
  }
}