import StackByLinkedList from '../StackByLinkedList';

describe('Stack', () => {
  it('isEmpty(): 创建一个空的栈', () => {
    const stack = new StackByLinkedList<number>();

    expect(stack.isEmpty()).toBeTruthy();

    stack.push(1);

    expect(stack.isEmpty()).toBeFalsy();
  });

  it('toString(): 创建一个空的栈', () => {
    const stack = new StackByLinkedList<number>();
    expect(stack.toString()).toBe('');
  });

  it('push(): 入栈', () => {
    const stack = new StackByLinkedList<number>();

    stack.push(1);
    stack.push(2);

    expect(stack.toString()).toBe('2,1');
  });

  it('pop(): 出栈', () => {
    const stack = new StackByLinkedList<number>();

    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBeNull();
    expect(stack.isEmpty()).toBe(true);
  });

  it('peek(): 查看栈顶的数据元素', () => {
    const stack = new StackByLinkedList<number>();

    expect(stack.peek()).toBeNull();

    stack.push(1);
    stack.push(2);

    expect(stack.peek()).toBe(2);
    expect(stack.peek()).toBe(2);
  });

  it('object: 可以入栈/出栈对象类型', () => {
    interface ObjInterface {
      key: string;
      value: string;
      toString: () => string;
    }

    const stack = new StackByLinkedList<ObjInterface>();
    const objFactory = function (key: string, value: string): ObjInterface {
      return {
        value,
        key,
        toString() {
          return `${this.key}:${this.value}`;
        },
      };
    };

    stack.push(objFactory('key1', 'test1'));
    stack.push(objFactory('key2', 'test2'));

    expect(stack.toString()).toBe('key2:test2,key1:test1');
    expect(stack.pop()!.value).toBe('test2');
    expect(stack.pop()!.value).toBe('test1');
  });
});
