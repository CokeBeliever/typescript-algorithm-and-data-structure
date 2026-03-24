import {
  Heap as RootHeap,
  MaxHeap as RootMaxHeap,
  MinHeap as RootMinHeap,
} from '@/index';
import {
  Heap as HeapModuleHeap,
  MaxHeap as HeapModuleMaxHeap,
  MinHeap as HeapModuleMinHeap,
} from '@/data-structure/heap';
import Heap from '@/data-structure/heap/Heap';
import MaxHeap from '@/data-structure/heap/MaxHeap';
import MinHeap from '@/data-structure/heap/MinHeap';

describe('Heap', () => {
  it('exports: heap 模块和根入口导出 Heap / MinHeap / MaxHeap', () => {
    expect(HeapModuleHeap).toBe(Heap);
    expect(HeapModuleMinHeap).toBe(MinHeap);
    expect(HeapModuleMaxHeap).toBe(MaxHeap);
    expect(RootHeap).toBe(Heap);
    expect(RootMinHeap).toBe(MinHeap);
    expect(RootMaxHeap).toBe(MaxHeap);
  });

  it('MinHeap: add()/peek()/poll()/isEmpty()/toString()', () => {
    const minHeap = new MinHeap<number>();

    expect(minHeap.isEmpty()).toBeTruthy();
    expect(minHeap.peek()).toBeNull();
    expect(minHeap.poll()).toBeNull();

    minHeap.add(5).add(3).add(10).add(1).add(3);

    expect(minHeap.isEmpty()).toBeFalsy();
    expect(minHeap.peek()).toBe(1);
    expect(minHeap.toString()).toBe('1,3,10,5,3');
    expect(Array.from(minHeap).join(',')).toBe('1,3,10,5,3');
    expect(minHeap.poll()).toBe(1);
    expect(minHeap.poll()).toBe(3);
    expect(minHeap.poll()).toBe(3);
    expect(minHeap.poll()).toBe(5);
    expect(minHeap.poll()).toBe(10);
    expect(minHeap.poll()).toBeNull();
    expect(minHeap.isEmpty()).toBeTruthy();
  });

  it('MinHeap: remove()/find()', () => {
    const minHeap = new MinHeap<number>();

    minHeap.add(5).add(3).add(10).add(1).add(3).add(4);

    expect(minHeap.find(3).length).toBe(2);

    minHeap.remove(3);

    expect(minHeap.find(3)).toEqual([]);
    expect(minHeap.peek()).toBe(1);
    expect(minHeap.poll()).toBe(1);
    expect(minHeap.poll()).toBe(4);
    expect(minHeap.poll()).toBe(5);
    expect(minHeap.poll()).toBe(10);
  });

  it('MinHeap: 自定义比较器可用于对象元素', () => {
    type Item = { key: number; label: string };

    const minHeap = new MinHeap<Item>((a, b) => a.key - b.key);
    const first = { key: 3, label: 'third' };
    const second = { key: 1, label: 'first' };
    const third = { key: 2, label: 'second' };

    minHeap.add(first).add(second).add(third);

    expect(minHeap.peek()).toBe(second);
    expect(
      minHeap.find({ key: 2, label: 'ignored' }, (a, b) => a.key - b.key).length
    ).toBe(1);
    expect(minHeap.poll()).toBe(second);
    expect(minHeap.poll()).toBe(third);
    expect(minHeap.poll()).toBe(first);
  });

  it('MaxHeap: add()/peek()/poll()/remove()', () => {
    const maxHeap = new MaxHeap<number>();

    maxHeap.add(5).add(3).add(10).add(1).add(10);

    expect(maxHeap.peek()).toBe(10);
    expect(maxHeap.find(10).length).toBe(2);

    maxHeap.remove(10);

    expect(maxHeap.find(10)).toEqual([]);
    expect(maxHeap.poll()).toBe(5);
    expect(maxHeap.poll()).toBe(3);
    expect(maxHeap.poll()).toBe(1);
    expect(maxHeap.poll()).toBeNull();
  });
});