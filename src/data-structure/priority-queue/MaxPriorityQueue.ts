import PriorityQueue from '@/data-structure/priority-queue/PriorityQueue';

/**
 * 最大优先队列
 */
export default class MaxPriorityQueue<Element> extends PriorityQueue<Element> {
  protected _comparePriority(aPriority: number, bPriority: number) {
    return bPriority - aPriority;
  }
}