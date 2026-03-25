import Comparator from '@/utils/Comparator';
import type { HeapInterface } from '@/data-structure/heap/heap.types';

/**
 * 二叉堆
 */
export default abstract class Heap<Element> implements HeapInterface<Element> {
  /** 元素容器 */
  protected _container: Element[] = [];

  /** 比较器 */
  protected _comparator: Comparator<Element>;

  constructor(comparatorFunction?: (a: Element, b: Element) => number) {
    this._comparator = new Comparator(comparatorFunction);
  }

  public add(el: Element) {
    this._container.push(el);
    this._heapifyUp();
    return this;
  }

  public poll() {
    if (this.isEmpty()) return null;
    if (this._container.length === 1) return this._container.pop() as Element;

    const item = this._container[0];
    this._container[0] = this._container.pop() as Element;
    this._heapifyDown();

    return item;
  }

  public peek() {
    if (this.isEmpty()) return null;
    return this._container[0];
  }

  public remove(
    item: Element,
    comparatorFunction?: (a: Element, b: Element) => number
  ) {
    const indexesToRemove = this.find(item, comparatorFunction).sort(
      (a, b) => b - a
    );

    for (const indexToRemove of indexesToRemove) {
      const lastIndex = this._container.length - 1;

      if (indexToRemove === lastIndex) {
        this._container.pop();
        continue;
      }

      this._container[indexToRemove] = this._container.pop() as Element;

      const parentItem = this._hasParent(indexToRemove)
        ? this._parent(indexToRemove)
        : null;

      if (
        this._hasLeftChild(indexToRemove) &&
        (parentItem === null ||
          this._pairIsInCorrectOrder(
            parentItem,
            this._container[indexToRemove]
          ))
      ) {
        this._heapifyDown(indexToRemove);
      } else {
        this._heapifyUp(indexToRemove);
      }
    }

    return this;
  }

  public find(
    item: Element,
    comparatorFunction?: (a: Element, b: Element) => number
  ) {
    const comparator = new Comparator(
      comparatorFunction || this._comparator.compare
    );
    const foundItemIndices: number[] = [];

    for (let i = 0; i < this._container.length; i++) {
      if (comparator.equal(item, this._container[i])) {
        foundItemIndices.push(i);
      }
    }

    return foundItemIndices;
  }

  public isEmpty() {
    return this._container.length === 0;
  }

  public toString() {
    return this._container.toString();
  }

  public *[Symbol.iterator]() {
    yield* this._container;
  }

  protected _getLeftChildIndex(parentIndex: number) {
    return 2 * parentIndex + 1;
  }

  protected _getRightChildIndex(parentIndex: number) {
    return 2 * parentIndex + 2;
  }

  protected _getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2);
  }

  protected _hasParent(childIndex: number) {
    return this._getParentIndex(childIndex) >= 0;
  }

  protected _hasLeftChild(parentIndex: number) {
    return this._getLeftChildIndex(parentIndex) < this._container.length;
  }

  protected _hasRightChild(parentIndex: number) {
    return this._getRightChildIndex(parentIndex) < this._container.length;
  }

  protected _leftChild(parentIndex: number) {
    return this._container[this._getLeftChildIndex(parentIndex)];
  }

  protected _rightChild(parentIndex: number) {
    return this._container[this._getRightChildIndex(parentIndex)];
  }

  protected _parent(childIndex: number) {
    return this._container[this._getParentIndex(childIndex)];
  }

  protected _swap(indexOne: number, indexTwo: number) {
    [this._container[indexOne], this._container[indexTwo]] = [
      this._container[indexTwo],
      this._container[indexOne],
    ];
  }

  protected _heapifyUp(customStartIndex?: number) {
    let currentIndex = customStartIndex ?? this._container.length - 1;

    while (
      this._hasParent(currentIndex) &&
      !this._pairIsInCorrectOrder(
        this._parent(currentIndex),
        this._container[currentIndex]
      )
    ) {
      const parentIndex = this._getParentIndex(currentIndex);
      this._swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
  }

  protected _heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex;

    while (this._hasLeftChild(currentIndex)) {
      let nextIndex = this._getLeftChildIndex(currentIndex);

      if (
        this._hasRightChild(currentIndex) &&
        this._pairIsInCorrectOrder(
          this._rightChild(currentIndex),
          this._leftChild(currentIndex)
        )
      ) {
        nextIndex = this._getRightChildIndex(currentIndex);
      }

      if (
        this._pairIsInCorrectOrder(
          this._container[currentIndex],
          this._container[nextIndex]
        )
      ) {
        break;
      }

      this._swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  protected abstract _pairIsInCorrectOrder(
    firstElement: Element,
    secondElement: Element
  ): boolean;
}
