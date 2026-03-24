import { MinPriorityQueue } from '@/data-structure/priority-queue';
import type { WeightedGraphInterface } from '@/data-structure/types/graph';

/**
 * 启发函数类型
 */
export type AStarHeuristicFunctionType<Element> = (
  current: Element,
  target: Element
) => number;

interface AStarQueueNodeInterface<Element> {
  vertex: Element;
  distance: number;
  estimatedTotalCost: number;
}

/**
 * A* 算法结果接口
 */
export interface AStarResultInterface<Element> {
  /** 起点 */
  start: Element;

  /** 目标点 */
  target: Element;

  /** 是否找到目标点 */
  found: boolean;

  /** 起点到各顶点的当前最短距离 */
  distances: Map<Element, number>;

  /** 各顶点的启发函数值 */
  heuristicValues: Map<Element, number>;

  /** 各顶点的估计总代价 f(n) = g(n) + h(n) */
  estimatedTotalCosts: Map<Element, number>;

  /** 最优路径前驱表 */
  previous: Map<Element, Element | null>;

  /** 顶点首次被扩展的顺序 */
  visitedOrder: Element[];
}

/**
 * A* 算法
 */
export default function aStar<Element>(
  graph: WeightedGraphInterface<Element>,
  start: Element,
  target: Element,
  heuristic: AStarHeuristicFunctionType<Element>
): AStarResultInterface<Element> {
  if (!graph.hasVertex(start) || !graph.hasVertex(target)) {
    return {
      start,
      target,
      found: false,
      distances: new Map(),
      heuristicValues: new Map(),
      estimatedTotalCosts: new Map(),
      previous: new Map(),
      visitedOrder: [],
    };
  }

  assertGraphHasNoNegativeWeightEdge(graph);

  const distances = new Map<Element, number>();
  const heuristicValues = new Map<Element, number>();
  const estimatedTotalCosts = new Map<Element, number>();
  const previous = new Map<Element, Element | null>();
  const expanded = new Set<Element>();
  const visitedOrder: Element[] = [];
  const queue = new MinPriorityQueue<AStarQueueNodeInterface<Element>>(() => 0);

  for (const vertex of graph) {
    distances.set(vertex, Infinity);
    estimatedTotalCosts.set(vertex, Infinity);
    previous.set(vertex, null);
  }

  const startHeuristicValue = getHeuristicValue(
    heuristicValues,
    heuristic,
    start,
    target
  );

  distances.set(start, 0);
  estimatedTotalCosts.set(start, startHeuristicValue);

  queue.enqueue(
    {
      vertex: start,
      distance: 0,
      estimatedTotalCost: startHeuristicValue,
    },
    startHeuristicValue
  );

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue() as AStarQueueNodeInterface<Element>;
    const currentDistance = distances.get(currentNode.vertex) as number;
    const currentEstimatedTotalCost = estimatedTotalCosts.get(
      currentNode.vertex
    ) as number;

    if (
      currentNode.distance !== currentDistance ||
      currentNode.estimatedTotalCost !== currentEstimatedTotalCost
    ) {
      continue;
    }

    if (!expanded.has(currentNode.vertex)) {
      expanded.add(currentNode.vertex);
      visitedOrder.push(currentNode.vertex);
    }

    for (const edge of graph.getNeighbors(currentNode.vertex)) {
      const candidateDistance = currentDistance + edge.weight;
      const knownDistance = distances.get(edge.vertex) as number;

      if (candidateDistance >= knownDistance) {
        continue;
      }

      const heuristicValue = getHeuristicValue(
        heuristicValues,
        heuristic,
        edge.vertex,
        target
      );
      const estimatedTotalCost = candidateDistance + heuristicValue;

      distances.set(edge.vertex, candidateDistance);
      estimatedTotalCosts.set(edge.vertex, estimatedTotalCost);
      previous.set(edge.vertex, currentNode.vertex);
      queue.enqueue(
        {
          vertex: edge.vertex,
          distance: candidateDistance,
          estimatedTotalCost,
        },
        estimatedTotalCost
      );
    }
  }

  return {
    start,
    target,
    found: (distances.get(target) as number) !== Infinity,
    distances,
    heuristicValues,
    estimatedTotalCosts,
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
        throw new Error('aStar: 图中存在负权边，不能使用 aStar 算法');
      }
    }
  }
}

function getHeuristicValue<Element>(
  heuristicValues: Map<Element, number>,
  heuristic: AStarHeuristicFunctionType<Element>,
  current: Element,
  target: Element
) {
  const cachedValue = heuristicValues.get(current);

  if (cachedValue !== undefined) {
    return cachedValue;
  }

  const value = assertHeuristicValue(heuristic(current, target));

  heuristicValues.set(current, value);

  return value;
}

function assertHeuristicValue(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error('aStar: heuristic 返回值必须是非负有限数字');
  }

  return value;
}
