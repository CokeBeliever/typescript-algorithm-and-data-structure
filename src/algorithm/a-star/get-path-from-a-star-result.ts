import type { AStarResultInterface } from '@/algorithm/a-star/a-star';

/**
 * 根据 A* 结果还原路径
 */
export default function getPathFromAStarResult<Element>(
  result: AStarResultInterface<Element>
) {
  if (!result.found) {
    return [];
  }

  const path: Element[] = [];
  let current: Element | null | undefined = result.target;

  while (current !== null && current !== undefined) {
    path.push(current);
    current = result.previous.get(current) ?? null;
  }

  path.reverse();

  if (path[0] !== result.start) {
    return [];
  }

  return path;
}
