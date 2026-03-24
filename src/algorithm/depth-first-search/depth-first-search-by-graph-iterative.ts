import { StackByArray } from '@/data-structure/stack';
import type {
  GraphInterface,
  GraphTraverseCallbackType,
} from '@/data-structure/types/graph';

/**
 * 图的深度优先搜索 (迭代)
 */
export default function <Element>(
  graph: GraphInterface<Element>,
  start: Element,
  cb?: GraphTraverseCallbackType<Element>
) {
  if (!graph.hasVertex(start)) {
    return [];
  }

  const visited = new Set<Element>([start]);
  const stack = new StackByArray<Element>();
  const traversedOrder: Element[] = [];

  stack.push(start);

  while (!stack.isEmpty()) {
    const vertex = stack.pop() as Element;
    traversedOrder.push(vertex);

    if (cb) {
      cb(vertex);
    }

    const neighbors = graph.getNeighbors(vertex).slice().reverse();

    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) {
        continue;
      }

      visited.add(neighbor);
      stack.push(neighbor);
    }
  }

  return traversedOrder;
}
