import {
  MaxPriorityQueue as RootMaxPriorityQueue,
  MinPriorityQueue as RootMinPriorityQueue,
  PriorityQueue as RootPriorityQueue,
} from '@/index';
import {
  MaxPriorityQueue as ModuleMaxPriorityQueue,
  MinPriorityQueue as ModuleMinPriorityQueue,
  PriorityQueue as ModulePriorityQueue,
} from '@/data-structure/priority-queue';
import MaxPriorityQueue from '@/data-structure/priority-queue/MaxPriorityQueue';
import MinPriorityQueue from '@/data-structure/priority-queue/MinPriorityQueue';
import PriorityQueue from '@/data-structure/priority-queue/PriorityQueue';

describe('PriorityQueue', () => {
  it('exports: priority-queue 模块和根入口导出 PriorityQueue / MinPriorityQueue / MaxPriorityQueue', () => {
    expect(ModulePriorityQueue).toBe(PriorityQueue);
    expect(ModuleMinPriorityQueue).toBe(MinPriorityQueue);
    expect(ModuleMaxPriorityQueue).toBe(MaxPriorityQueue);
    expect(RootPriorityQueue).toBe(PriorityQueue);
    expect(RootMinPriorityQueue).toBe(MinPriorityQueue);
    expect(RootMaxPriorityQueue).toBe(MaxPriorityQueue);
  });

  it('MinPriorityQueue: enqueue()/peek()/dequeue()/isEmpty()/toString()', () => {
    const queue = new MinPriorityQueue<string>();

    expect(queue.isEmpty()).toBeTruthy();
    expect(queue.peek()).toBeNull();
    expect(queue.dequeue()).toBeNull();

    queue.enqueue('low', 5).enqueue('high', 1).enqueue('middle', 3);

    expect(queue.isEmpty()).toBeFalsy();
    expect(queue.peek()).toBe('high');
    expect(queue.toString()).toBe('high,low,middle');
    expect(Array.from(queue).join(',')).toBe('high,low,middle');
    expect(queue.dequeue()).toBe('high');
    expect(queue.dequeue()).toBe('middle');
    expect(queue.dequeue()).toBe('low');
    expect(queue.dequeue()).toBeNull();
  });

  it('MaxPriorityQueue: enqueue()/peek()/dequeue()', () => {
    const queue = new MaxPriorityQueue<string>();

    queue.enqueue('low', 1).enqueue('high', 5).enqueue('middle', 3);

    expect(queue.peek()).toBe('high');
    expect(queue.dequeue()).toBe('high');
    expect(queue.dequeue()).toBe('middle');
    expect(queue.dequeue()).toBe('low');
  });

  it('MinPriorityQueue: changePriority()/hasValue()/remove()/findByValue()', () => {
    const queue = new MinPriorityQueue<string>();

    queue.enqueue('A', 5).enqueue('B', 3).enqueue('C', 1);

    expect(queue.hasValue('B')).toBeTruthy();
    expect(queue.findByValue('B').length).toBe(1);

    queue.changePriority('A', 0);

    expect(queue.peek()).toBe('A');

    queue.remove('B');

    expect(queue.hasValue('B')).toBeFalsy();
    expect(queue.findByValue('B')).toEqual([]);
    expect(queue.dequeue()).toBe('A');
    expect(queue.dequeue()).toBe('C');
    expect(queue.dequeue()).toBeNull();
  });

  it('MinPriorityQueue: 相同优先级时使用自定义比较器保持可预期顺序', () => {
    type Task = { key: number; title: string };

    const queue = new MinPriorityQueue<Task>((a, b) => a.key - b.key);
    const third = { key: 3, title: 'third' };
    const first = { key: 1, title: 'first' };
    const second = { key: 2, title: 'second' };

    queue.enqueue(third, 1).enqueue(first, 1).enqueue(second, 1);

    expect(queue.peek()).toBe(first);
    expect(queue.findByValue({ key: 2, title: 'ignored' }).length).toBe(1);
    expect(queue.dequeue()).toBe(first);
    expect(queue.dequeue()).toBe(second);
    expect(queue.dequeue()).toBe(third);
  });

  it('MaxPriorityQueue: 相同优先级时使用自定义比较器保持可预期顺序', () => {
    type Task = { key: number; title: string };

    const queue = new MaxPriorityQueue<Task>((a, b) => a.key - b.key);
    const third = { key: 3, title: 'third' };
    const first = { key: 1, title: 'first' };
    const second = { key: 2, title: 'second' };

    queue.enqueue(third, 1).enqueue(first, 1).enqueue(second, 1);

    expect(queue.peek()).toBe(first);
    expect(queue.dequeue()).toBe(first);
    expect(queue.dequeue()).toBe(second);
    expect(queue.dequeue()).toBe(third);
  });
});