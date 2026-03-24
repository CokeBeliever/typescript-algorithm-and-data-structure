import PriorityQueue from '@/data-structure/priority-queue/PriorityQueue';

/**
 * 最小优先队列
 */
export default class MinPriorityQueue<Element> extends PriorityQueue<Element> {
  protected _comparePriority(aPriority: number, bPriority: number) {
    return aPriority - bPriority;
  }
}