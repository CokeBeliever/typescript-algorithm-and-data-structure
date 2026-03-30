import BinaryTreeNode from '@/data-structure/tree/BinaryTreeNode';

class TestBinaryTreeNode extends BinaryTreeNode<TestBinaryTreeNode, number> {}

describe('BinaryTreeNode', () => {
  it('preOrder()/inOrder()/postOrder()/levelOrder(): 支持不完整子树遍历', () => {
    const root = new TestBinaryTreeNode(
      1,
      new TestBinaryTreeNode(2, null, new TestBinaryTreeNode(4)),
      new TestBinaryTreeNode(3)
    );

    const preOrderList: number[] = [];
    root.preOrder((node) => preOrderList.push(node.data));
    expect(preOrderList).toEqual([1, 2, 4, 3]);

    const inOrderList: number[] = [];
    root.inOrder((node) => inOrderList.push(node.data));
    expect(inOrderList).toEqual([2, 4, 1, 3]);

    const postOrderList: number[] = [];
    root.postOrder((node) => postOrderList.push(node.data));
    expect(postOrderList).toEqual([4, 2, 3, 1]);

    const levelOrderList: number[] = [];
    root.levelOrder((node) => levelOrderList.push(node.data));
    expect(levelOrderList).toEqual([1, 2, 3, 4]);
  });

  it('toString()/Symbol.iterator: 根节点和迭代顺序符合先序遍历', () => {
    const root = new TestBinaryTreeNode(1);

    expect(root.toString()).toBe('1');
    expect(Array.from(root).map((node) => node.data)).toEqual([1]);
  });
});
