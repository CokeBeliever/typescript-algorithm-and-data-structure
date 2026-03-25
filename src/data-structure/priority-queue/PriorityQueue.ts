import { MinHeap } from '@/data-structure/heap';
import type { PriorityQueueInterface } from '@/data-structure/priority-queue/priority-queue.types';
import Comparator from '@/utils/Comparator';

type PriorityQueueNode<Element> = {
  value: Element;
  priority: number;
};

/**
 * 优先队列
 */
export default abstract class PriorityQueue<Element>
  implements PriorityQueueInterface<Element>
{
  /** 值比较器 */
  protected _comparator: Comparator<Element>;

  /** 最小堆 */
  protected _heap: MinHeap<PriorityQueueNode<Element>>;

  constructor(comparatorFunction?: (a: Element, b: Element) => number) {
    this._comparator = new Comparator(comparatorFunction);
    this._heap = new MinHeap<PriorityQueueNode<Element>>((a, b) => {
      const priorityComparison = this._comparePriority(a.priority, b.priority);

      if (priorityComparison !== 0) {
        return priorityComparison;
      }

      return this._comparator.compare(a.value, b.value);
    });
  }

  public enqueue(value: Element, priority: number) {
    this._heap.add({ value, priority });
    return this;
  }

  public dequeue() {
    const item = this._heap.poll();
    return item ? item.value : null;
  }

  public peek() {
    const item = this._heap.peek();
    return item ? item.value : null;
  }

  public changePriority(value: Element, priority: number) {
    this.remove(value);
    this.enqueue(value, priority);
    return this;
  }

  public hasValue(value: Element) {
    return this.findByValue(value).length > 0;
  }

  public remove(value: Element) {
    this._heap.remove(
      { value, priority: 0 },
      this._compareValueOnly.bind(this)
    );
    return this;
  }

  public findByValue(value: Element) {
    return this._heap.find(
      { value, priority: 0 },
      this._compareValueOnly.bind(this)
    );
  }

  public isEmpty() {
    return this._heap.isEmpty();
  }

  public toString() {
    const values: string[] = [];

    for (const item of this._heap) {
      values.push(`${item.value}`);
    }

    return values.join(',');
  }

  public *[Symbol.iterator]() {
    for (const item of this._heap) {
      yield item.value;
    }
  }

  protected _compareValueOnly(
    a: PriorityQueueNode<Element>,
    b: PriorityQueueNode<Element>
  ) {
    return this._comparator.compare(a.value, b.value);
  }

  protected abstract _comparePriority(
    aPriority: number,
    bPriority: number
  ): number;
}
