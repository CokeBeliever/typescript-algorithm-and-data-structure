import { QueueByLinkedList } from '@/data-structure/queue';
import type {
  GraphInterface,
  GraphTraverseCallbackType,
} from '@/data-structure/types/graph';

/**
 * 图的广度优先搜索
 */
export default function BreadthFirstSearchByGraph<Element>(
  graph: GraphInterface<Element>,
  start: Element,
  cb?: GraphTraverseCallbackType<Element>
) {
  if (!graph.hasVertex(start)) {
    return [];
  }

  const visited = new Set<Element>([start]);
  const queue = new QueueByLinkedList<Element>();
  const traversedOrder: Element[] = [];

  queue.enqueue(start);

  while (!queue.isEmpty()) {
    const vertex = queue.dequeue() as Element;
    traversedOrder.push(vertex);

    if (cb) {
      cb(vertex);
    }

    for (const neighbor of graph.getNeighbors(vertex)) {
      if (visited.has(neighbor)) {
        continue;
      }

      visited.add(neighbor);
      queue.enqueue(neighbor);
    }
  }

  return traversedOrder;
}