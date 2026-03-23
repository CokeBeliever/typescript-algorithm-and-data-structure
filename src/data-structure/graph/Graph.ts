import type { GraphInterface } from '@/data-structure/types/graph';

/**
 * 图 (邻接表实现)
 */
export default class Graph<Element> implements GraphInterface<Element> {
  /** 是否为有向图 */
  private _directed: boolean;

  /** 邻接表 */
  private _adjacencyList: Map<Element, Element[]> = new Map();

  constructor(directed = false) {
    this._directed = directed;
  }

  public addVertex(vertex: Element) {
    if (!this.hasVertex(vertex)) {
      this._adjacencyList.set(vertex, []);
    }

    return this;
  }

  public addEdge(start: Element, end: Element) {
    this.addVertex(start);
    this.addVertex(end);

    this._addNeighbor(start, end);

    if (!this.isDirected()) {
      this._addNeighbor(end, start);
    }

    return this;
  }

  public getNeighbors(vertex: Element) {
    if (!this.hasVertex(vertex)) {
      return [];
    }

    return this._adjacencyList.get(vertex)!.slice();
  }

  public hasVertex(vertex: Element) {
    return this._adjacencyList.has(vertex);
  }

  public hasEdge(start: Element, end: Element) {
    if (!this.hasVertex(start)) {
      return false;
    }

    return this._adjacencyList.get(start)!.includes(end);
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
      list.push(`${vertex} => ${neighbors.join(',')}`);
    }

    return list.join('\n');
  }

  public *[Symbol.iterator]() {
    yield* this._adjacencyList.keys();
  }

  private _addNeighbor(vertex: Element, neighbor: Element) {
    const neighbors = this._adjacencyList.get(vertex) as Element[];

    if (!neighbors.includes(neighbor)) {
      neighbors.push(neighbor);
    }
  }
}
