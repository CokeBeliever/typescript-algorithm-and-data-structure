import Heap from '@/data-structure/heap/Heap';

/**
 * 最大堆
 */
export default class MaxHeap<Element> extends Heap<Element> {
  protected _pairIsInCorrectOrder(
    firstElement: Element,
    secondElement: Element
  ) {
    return this._comparator.greaterThanOrEqual(firstElement, secondElement);
  }
}
