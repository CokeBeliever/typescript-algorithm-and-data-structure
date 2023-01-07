import LinkedList from '../LinkedList';

describe('LinkedList', () => {
  it('isEmpty(): 创建一个空的链表', () => {
    const linkedList = new LinkedList<number>();
    expect(linkedList.isEmpty()).toBeTruthy();
  });

  it('toString(): 创建一个空的链表', () => {
    const linkedList = new LinkedList<number>();
    expect(linkedList.toString()).toBe('');
  });

  it('insertTail(): 在链表尾部添加节点', () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.isEmpty()).toBeTruthy();

    linkedList.insertTail(1);
    linkedList.insertTail(2);

    expect(linkedList.toString()).toBe('1,2');
  });

  it('insertHead(): 在链表头部添加节点', () => {
    const linkedList = new LinkedList<number>();

    linkedList.insertHead(2);
    expect(linkedList.toString()).toBe('2');

    linkedList.insertTail(1);
    linkedList.insertHead(3);

    expect(linkedList.toString()).toBe('3,2,1');
  });

  it('insert(): 在链表指定位置插入结点 ', () => {
    const linkedList = new LinkedList<number>();

    linkedList.insert(4, 3);
    expect(linkedList.toString()).toBe('4');

    expect(() => linkedList.insert(1, -7)).toThrow();

    linkedList.insert(3, 2);
    linkedList.insert(2, 1);
    linkedList.insert(10, 9);

    expect(linkedList.toString()).toBe('4,2,3,10');
  });

  it('delete(): 在链表中删除指定数据元素的结点', () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.delete(5)).toEqual([]);

    linkedList.insertTail(1);
    linkedList.insertTail(1);
    linkedList.insertTail(2);
    linkedList.insertTail(3);
    linkedList.insertTail(3);
    linkedList.insertTail(3);
    linkedList.insertTail(4);
    linkedList.insertTail(5);

    expect(linkedList.toString()).toBe('1,1,2,3,3,3,4,5');

    linkedList.delete(3);
    expect(linkedList.toString()).toBe('1,1,2,4,5');

    linkedList.delete(3);
    expect(linkedList.toString()).toBe('1,1,2,4,5');

    linkedList.delete(1);
    expect(linkedList.toString()).toBe('2,4,5');

    linkedList.delete(5);
    expect(linkedList.toString()).toBe('2,4');

    linkedList.delete(4);
    expect(linkedList.toString()).toBe('2');

    linkedList.delete(2);
    expect(linkedList.toString()).toBe('');
  });

  it('deleteTail(): 在链表尾部删除结点', () => {
    const linkedList = new LinkedList<number>();

    linkedList.insertTail(1);
    linkedList.insertTail(2);
    linkedList.insertTail(3);

    expect(linkedList.toString()).toBe('1,2,3');

    const deletedNode1 = linkedList.deleteTail();

    expect(deletedNode1!.data).toBe(3);
    expect(linkedList.toString()).toBe('1,2');

    const deletedNode2 = linkedList.deleteTail();

    expect(deletedNode2!.data).toBe(2);
    expect(linkedList.toString()).toBe('1');

    const deletedNode3 = linkedList.deleteTail();

    expect(deletedNode3!.data).toBe(1);
    expect(linkedList.toString()).toBe('');
  });

  it('deleteHead(): 在链表头部删除结点', () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.deleteHead()).toBeNull();

    linkedList.insertTail(1);
    linkedList.insertTail(2);

    expect(linkedList.toString()).toBe('1,2');

    const deletedNode1 = linkedList.deleteHead();

    expect(deletedNode1!.data).toBe(1);
    expect(linkedList.toString()).toBe('2');

    const deletedNode2 = linkedList.deleteHead();

    expect(deletedNode2!.data).toBe(2);
    expect(linkedList.toString()).toBe('');
  });

  it('find(): 在链表中查询指定数据元素的结点', () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.find(5)).toBeNull();

    linkedList.insertTail(1);
    expect(linkedList.find(1)).not.toBeNull();

    linkedList.insertTail(2).insertTail(3);

    expect(linkedList.find(2)!.data).toBe(2);
    expect(linkedList.find(5)).toBeNull();
  });

  it('reverse(): 链表反转', () => {
    const linkedList = new LinkedList<number>();

    linkedList.insertTail(1).insertTail(2).insertTail(3);

    expect(linkedList.toString()).toBe('1,2,3');

    linkedList.reverse();
    expect(linkedList.toString()).toBe('3,2,1');

    linkedList.reverse();
    expect(linkedList.toString()).toBe('1,2,3');
  });
});
