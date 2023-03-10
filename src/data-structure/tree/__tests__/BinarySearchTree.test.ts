import BinarySearchTree from '../BinarySearchTree';

describe('BST', () => {
  it('isEmpty(): 二叉查找树是否为空', () => {
    const bst = new BinarySearchTree<number>();

    expect(bst.isEmpty()).toBeTruthy();

    bst.insert(1);

    expect(bst.isEmpty()).toBeFalsy();
  });

  it('toString(): 二叉查找树转字符串', () => {
    const bst = new BinarySearchTree<number>();
    expect(bst.toString()).toBe('');
  });

  it('insert(): 插入数据元素', () => {
    const bst = new BinarySearchTree<number>();

    //      4
    //    /   \
    //   2     6
    //  /  \  /  \
    // 1   3  5   7
    bst.insert(4);
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);
    bst.insert(6);
    bst.insert(7);
    bst.insert(5);

    expect(bst.toString()).toBe('4,2,1,3,6,5,7');
  });

  it('remove(): 删除数据元素', () => {
    const bst = new BinarySearchTree<number>();

    //      4
    //    /   \
    //   2     6
    //  /  \  /  \
    // 1   3  5   7
    bst.insert(4);
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);
    bst.insert(6);
    bst.insert(7);
    bst.insert(5);

    expect(bst.remove(6)!.data).toBe(6);
    expect(bst.remove(1)!.data).toBe(1);
    expect(bst.toString()).toBe('4,2,3,5,7');
  });

  it('contains(): 是否包含数据元素', () => {
    const bst = new BinarySearchTree<number>();

    //      4
    //    /   \
    //   2     6
    //  /  \  /  \
    // 1   3  5   7
    bst.insert(4);
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);
    bst.insert(6);
    bst.insert(7);
    bst.insert(5);

    expect(bst.contains(6)).toBeTruthy();
    expect(bst.contains(8)).toBeFalsy();
  });

  it('search(): 查找数据元素', () => {
    const bst = new BinarySearchTree<number>();

    //      4
    //    /   \
    //   2     6
    //  /  \  /  \
    // 1   3  5   7
    bst.insert(4);
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);
    bst.insert(6);
    bst.insert(7);
    bst.insert(5);

    expect(bst.search(6)).not.toBeNull();
    expect(bst.search(8)).toBeNull();
  });

  it('min(): 获取二叉查找树的最小数据元素结点', () => {
    const bst = new BinarySearchTree<number>();

    //      4
    //    /   \
    //   2     6
    //  /  \  /  \
    // 1   3  5   7
    bst.insert(4);
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);
    bst.insert(6);
    bst.insert(7);
    bst.insert(5);

    expect(bst.min()!.data).toBe(1);

    bst.remove(1);
    expect(bst.min()!.data).toBe(2);

    bst.remove(2);
    bst.remove(3);
    bst.remove(4);
    bst.remove(5);
    bst.remove(6);
    bst.remove(7);
    expect(bst.min()).toBeNull();
    expect(bst.isEmpty()).toBeTruthy();
  });

  it('min(): 获取二叉查找树的最大数据元素结点', () => {
    const bst = new BinarySearchTree<number>();

    //      4
    //    /   \
    //   2     6
    //  /  \  /  \
    // 1   3  5   7
    bst.insert(4);
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);
    bst.insert(6);
    bst.insert(7);
    bst.insert(5);

    expect(bst.max()!.data).toBe(7);

    bst.remove(7);
    expect(bst.max()!.data).toBe(6);

    bst.remove(6);
    bst.remove(5);
    bst.remove(4);
    bst.remove(3);
    bst.remove(2);
    bst.remove(1);
    expect(bst.max()).toBeNull();
    expect(bst.isEmpty()).toBeTruthy();
  });

  it('preOrder()/inOrder()/postOrder()/levelOrder(): 先序遍历/中序遍历/后序遍历/层序遍历', () => {
    const bst = new BinarySearchTree<number>();

    //      4
    //    /   \
    //   2     6
    //  /  \  /  \
    // 1   3  5   7
    bst.insert(4);
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);
    bst.insert(6);
    bst.insert(7);
    bst.insert(5);

    const preOrderList: number[] = [];
    bst.preOrder((node) => preOrderList.push(node.data));
    expect(preOrderList.join(',')).toBe('4,2,1,3,6,5,7');

    const inOrderList: number[] = [];
    bst.inOrder((node) => inOrderList.push(node.data));
    expect(inOrderList.join(',')).toBe('1,2,3,4,5,6,7');

    const postOrderList: number[] = [];
    bst.postOrder((node) => postOrderList.push(node.data));
    expect(postOrderList.join(',')).toBe('1,3,2,5,7,6,4');

    const levelOrderList: number[] = [];
    bst.levelOrder((node) => levelOrderList.push(node.data));
    expect(levelOrderList.join(',')).toBe('4,2,6,1,3,5,7');
  });

  it('[Symble.iterator](): 可迭代对象', () => {
    const bst = new BinarySearchTree<number>();

    //      4
    //    /   \
    //   2     6
    //  /  \  /  \
    // 1   3  5   7
    bst.insert(4);
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);
    bst.insert(6);
    bst.insert(7);
    bst.insert(5);

    const iterator = bst[Symbol.iterator]();
    expect(iterator.next().value.data).toBe(4);
    expect(iterator.next().value.data).toBe(2);
    expect(iterator.next().value.data).toBe(1);
    expect(iterator.next().value.data).toBe(3);
    expect(iterator.next().value.data).toBe(6);
    expect(iterator.next().value.data).toBe(5);
    expect(iterator.next().value.data).toBe(7);
    expect(iterator.next().done).toBeTruthy();
  });
});
