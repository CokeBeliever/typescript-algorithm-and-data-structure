import QueueByLinkedList from '../QueueByLinkedList';

describe('Queue', () => {
  it('isEmpty(): 队列是否为空', () => {
    const queue = new QueueByLinkedList<number>();

    expect(queue.isEmpty()).toBeTruthy();

    queue.enqueue(1);

    expect(queue.isEmpty()).toBeFalsy();
  });

  it('toString(): 队列转字符串', () => {
    const queue = new QueueByLinkedList<number>();
    expect(queue.toString()).toBe('');
  });

  it('enqueue(): 入队', () => {
    const queue = new QueueByLinkedList<number>();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.toString()).toBe('1,2');
  });

  it('dequeue(): 出队', () => {
    const queue = new QueueByLinkedList<number>();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBeNull();
    expect(queue.isEmpty()).toBe(true);
  });

  it('peek(): 查看队首的数据元素', () => {
    const queue = new QueueByLinkedList<number>();

    expect(queue.peek()).toBeNull();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.peek()).toBe(1);
    expect(queue.peek()).toBe(1);
  });

  it('object: 可以入队/出队对象类型', () => {
    interface ObjInterface {
      key: string;
      value: string;
      toString: () => string;
    }

    const queue = new QueueByLinkedList<ObjInterface>();
    const objFactory = function (key: string, value: string): ObjInterface {
      return {
        value,
        key,
        toString() {
          return `${this.key}:${this.value}`;
        },
      };
    };

    queue.enqueue(objFactory('key1', 'test1'));
    queue.enqueue(objFactory('key2', 'test2'));

    expect(queue.toString()).toBe('key1:test1,key2:test2');
    expect(queue.dequeue()!.value).toBe('test1');
    expect(queue.dequeue()!.value).toBe('test2');
  });

  it('[Symble.iterator](): 可迭代对象', () => {
    const queue = new QueueByLinkedList<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    const queueIterator = queue[Symbol.iterator]();
    expect(queueIterator.next().value).toBe(1);
    expect(queueIterator.next().value).toBe(2);
    expect(queueIterator.next().value).toBe(3);
  });
});
