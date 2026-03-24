import type {
  GraphInterface,
  GraphTraverseCallbackType,
} from '@/data-structure/types/graph';

/**
 * 图的深度优先搜索 (递归)
 */
export default function <Element>(
  graph: GraphInterface<Element>,
  start: Element,
  cb?: GraphTraverseCallbackType<Element>
) {
  if (!graph.hasVertex(start)) {
    return [];
  }

  const visited = new Set<Element>();
  const traversedOrder: Element[] = [];

  function traverse(vertex: Element) {
    visited.add(vertex);
    traversedOrder.push(vertex);

    if (cb) {
      cb(vertex);
    }

    for (const neighbor of graph.getNeighbors(vertex)) {
      if (visited.has(neighbor)) {
        continue;
      }

      traverse(neighbor);
    }
  }

  traverse(start);

  return traversedOrder;
}
