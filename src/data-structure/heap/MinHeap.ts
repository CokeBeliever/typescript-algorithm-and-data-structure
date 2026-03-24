import Heap from '@/data-structure/heap/Heap';

/**
 * 最小堆
 */
export default class MinHeap<Element> extends Heap<Element> {
  protected _pairIsInCorrectOrder(
    firstElement: Element,
    secondElement: Element
  ) {
    return this._compare.lessThanOrEqual(firstElement, secondElement);
  }
}
