import {
  BinarySearchTree,
  BreadthFirstSearchByTree as RootBreadthFirstSearchByTree,
} from '@/index';
import { BreadthFirstSearchByTree as BfsModuleBreadthFirstSearchByTree } from '@/algorithm/breadth-first-search';
import BreadthFirstSearchByTree from '@/algorithm/breadth-first-search/BreadthFirstSearchByTree';

describe('BreadthFirstSearchByTree', () => {
  it('exports: breadth-first-search 模块和根入口导出 BreadthFirstSearchByTree', () => {
    expect(BfsModuleBreadthFirstSearchByTree).toBe(BreadthFirstSearchByTree);
    expect(RootBreadthFirstSearchByTree).toBe(BreadthFirstSearchByTree);
  });

  it('广度优先遍历二叉树', () => {
    const bst = new BinarySearchTree<number>();

    bst.insert(4);
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);
    bst.insert(6);
    bst.insert(7);
    bst.insert(5);

    const traversedByCallback: number[] = [];
    const traversedOrder = BreadthFirstSearchByTree(bst.search(4), (node) =>
      traversedByCallback.push(node.data)
    );

    expect(traversedOrder.map((node) => node.data).join(',')).toBe('4,2,6,1,3,5,7');
    expect(traversedByCallback.join(',')).toBe('4,2,6,1,3,5,7');
  });

  it('空树根结点返回空数组', () => {
    expect(BreadthFirstSearchByTree(null)).toEqual([]);
  });
});