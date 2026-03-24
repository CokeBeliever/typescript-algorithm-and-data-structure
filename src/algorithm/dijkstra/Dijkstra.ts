import { MinPriorityQueue } from '@/data-structure/priority-queue';
import type { WeightedGraphInterface } from '@/data-structure/types/graph';

/**
 * Dijkstra 算法结果接口
 */
export interface DijkstraResultInterface<Element> {
  /** 起点 */
  start: Element;

  /** 起点到每个顶点的最短距离 */
  distances: Map<Element, number>;

  /** 最短路径树中的前驱顶点 */
  previous: Map<Element, Element | null>;

  /** 顶点被确定最短距离的顺序 */
  visitedOrder: Element[];
}

/**
 * Dijkstra 算法
 */
export default function Dijkstra<Element>(
  graph: WeightedGraphInterface<Element>,
  start: Element
): DijkstraResultInterface<Element> {
  if (!graph.hasVertex(start)) {
    return {
      start,
      distances: new Map(),
      previous: new Map(),
      visitedOrder: [],
    };
  }

  assertGraphHasNoNegativeWeightEdge(graph);

  const distances = new Map<Element, number>();
  const previous = new Map<Element, Element | null>();
  const visited = new Set<Element>();
  const visitedOrder: Element[] = [];
  const queue = new MinPriorityQueue<Element>(() => 0);

  for (const vertex of graph) {
    distances.set(vertex, Infinity);
    previous.set(vertex, null);
  }

  distances.set(start, 0);
  queue.enqueue(start, 0);

  while (!queue.isEmpty()) {
    const vertex = queue.dequeue() as Element;

    if (visited.has(vertex)) {
      continue;
    }

    visited.add(vertex);
    visitedOrder.push(vertex);

    for (const edge of graph.getNeighbors(vertex)) {
      const currentDistance = distances.get(vertex) as number;
      const candidateDistance = currentDistance + edge.weight;
      const knownDistance = distances.get(edge.vertex) as number;

      if (candidateDistance >= knownDistance) {
        continue;
      }

      distances.set(edge.vertex, candidateDistance);
      previous.set(edge.vertex, vertex);
      queue.enqueue(edge.vertex, candidateDistance);
    }
  }

  return {
    start,
    distances,
    previous,
    visitedOrder,
  };
}

function assertGraphHasNoNegativeWeightEdge<Element>(
  graph: WeightedGraphInterface<Element>
) {
  for (const vertex of graph) {
    for (const edge of graph.getNeighbors(vertex)) {
      if (edge.weight < 0) {
        throw new Error('Dijkstra: 图中存在负权边，不能使用 Dijkstra 算法');
      }
    }
  }
}
