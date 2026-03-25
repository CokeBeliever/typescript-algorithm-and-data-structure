import { MinPriorityQueue } from '@/data-structure/priority-queue';
import type { GraphInterface } from '@/data-structure/graph/graph.types';

/**
 * 启发函数类型
 */
export type HeuristicFunctionType<Element> = (
  current: Element,
  target: Element
) => number;

/**
 * Greedy Best-First Search 结果接口
 */
export interface GreedyBestFirstSearchResultInterface<Element> {
  /** 起点 */
  start: Element;

  /** 目标点 */
  target: Element;

  /** 是否找到目标点 */
  found: boolean;

  /** 路径前驱表 */
  previous: Map<Element, Element | null>;

  /** 顶点扩展顺序 */
  visitedOrder: Element[];

  /** 启发函数值表 */
  heuristicValues: Map<Element, number>;
}

/**
 * Greedy Best-First Search
 */
export default function <Element>(
  graph: GraphInterface<Element>,
  start: Element,
  target: Element,
  heuristic: HeuristicFunctionType<Element>
): GreedyBestFirstSearchResultInterface<Element> {
  if (!graph.hasVertex(start) || !graph.hasVertex(target)) {
    return {
      start,
      target,
      found: false,
      previous: new Map(),
      visitedOrder: [],
      heuristicValues: new Map(),
    };
  }

  const previous = new Map<Element, Element | null>([[start, null]]);
  const visited = new Set<Element>();
  const discovered = new Set<Element>([start]);
  const visitedOrder: Element[] = [];
  const heuristicValues = new Map<Element, number>();
  const queue = new MinPriorityQueue<Element>(() => 0);

  const startHeuristicValue = assertHeuristicValue(heuristic(start, target));
  heuristicValues.set(start, startHeuristicValue);
  queue.enqueue(start, startHeuristicValue);

  while (!queue.isEmpty()) {
    const vertex = queue.dequeue() as Element;

    if (visited.has(vertex)) {
      continue;
    }

    visited.add(vertex);
    visitedOrder.push(vertex);

    if (vertex === target) {
      return {
        start,
        target,
        found: true,
        previous,
        visitedOrder,
        heuristicValues,
      };
    }

    for (const neighbor of graph.getNeighbors(vertex)) {
      if (visited.has(neighbor) || discovered.has(neighbor)) {
        continue;
      }

      const heuristicValue = assertHeuristicValue(heuristic(neighbor, target));

      previous.set(neighbor, vertex);
      heuristicValues.set(neighbor, heuristicValue);
      queue.enqueue(neighbor, heuristicValue);
      discovered.add(neighbor);
    }
  }

  return {
    start,
    target,
    found: false,
    previous,
    visitedOrder,
    heuristicValues,
  };
}

function assertHeuristicValue(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(
      'greedyBestFirstSearch: heuristic 返回值必须是非负有限数字'
    );
  }

  return value;
}
