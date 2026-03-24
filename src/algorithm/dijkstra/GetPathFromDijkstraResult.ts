import type { DijkstraResultInterface } from '@/algorithm/dijkstra/Dijkstra';

/**
 * 根据 Dijkstra 结果还原目标顶点的最短路径
 */
export default function getPathFromDijkstraResult<Element>(
  result: DijkstraResultInterface<Element>,
  target: Element
) {
  const distance = result.distances.get(target);

  if (distance === undefined || distance === Infinity) {
    return [];
  }

  const path: Element[] = [];
  let current: Element | null | undefined = target;

  while (current !== null && current !== undefined) {
    path.push(current);
    current = result.previous.get(current) ?? null;
  }

  return path.reverse();
}
