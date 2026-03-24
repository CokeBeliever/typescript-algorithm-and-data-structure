import {
  BinarySearchTree,
  breadthFirstSearchByTree as rootBreadthFirstSearchByTree,
} from '@/index';
import { breadthFirstSearchByTree as moduleBreadthFirstSearchByTree } from '@/algorithm/breadth-first-search';
import breadthFirstSearchByTree from '@/algorithm/breadth-first-search/breadth-first-search-by-tree';

describe('breadthFirstSearchByTree', () => {
  it('exports: breadth-first-search 模块和根入口导出 breadthFirstSearchByTree', () => {
    expect(moduleBreadthFirstSearchByTree).toBe(breadthFirstSearchByTree);
    expect(rootBreadthFirstSearchByTree).toBe(breadthFirstSearchByTree);
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
    const traversedOrder = breadthFirstSearchByTree(bst.search(4), (node) =>
      traversedByCallback.push(node.data)
    );

    expect(traversedOrder.map((node) => node.data).join(',')).toBe(
      '4,2,6,1,3,5,7'
    );
    expect(traversedByCallback.join(',')).toBe('4,2,6,1,3,5,7');
  });

  it('空树根结点返回空数组', () => {
    expect(breadthFirstSearchByTree(null)).toEqual([]);
  });
});
