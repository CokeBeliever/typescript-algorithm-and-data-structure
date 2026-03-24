import type { GreedyBestFirstSearchResultInterface } from '@/algorithm/greedy-best-first-search/greedy-best-first-search';

/**
 * 根据 Greedy Best-First Search 结果还原路径
 */
export default function getPathFromGreedyBestFirstSearchResult<Element>(
  result: GreedyBestFirstSearchResultInterface<Element>
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
