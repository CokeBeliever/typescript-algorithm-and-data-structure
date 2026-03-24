import {
  BinarySearchTree,
  DepthFirstSearchByTreeRecursive as RootDepthFirstSearchByTreeRecursive,
  DepthFirstSearchByTreeIterative as RootDepthFirstSearchByTreeIterative,
} from '@/index';
import {
  DepthFirstSearchByTreeRecursive as DfsModuleDepthFirstSearchByTreeRecursive,
  DepthFirstSearchByTreeIterative as DfsModuleDepthFirstSearchByTreeIterative,
} from '@/algorithm/depth-first-search';
import DepthFirstSearchByTreeRecursive from '@/algorithm/depth-first-search/DepthFirstSearchByTreeRecursive';
import DepthFirstSearchByTreeIterative from '@/algorithm/depth-first-search/DepthFirstSearchByTreeIterative';

describe('DepthFirstSearchByTree', () => {
  it('exports: depth-first-search 模块和根入口导出树的递归版与迭代版 DFS', () => {
    expect(DfsModuleDepthFirstSearchByTreeRecursive).toBe(
      DepthFirstSearchByTreeRecursive
    );
    expect(RootDepthFirstSearchByTreeRecursive).toBe(
      DepthFirstSearchByTreeRecursive
    );
    expect(DfsModuleDepthFirstSearchByTreeIterative).toBe(
      DepthFirstSearchByTreeIterative
    );
    expect(RootDepthFirstSearchByTreeIterative).toBe(
      DepthFirstSearchByTreeIterative
    );
  });

  it('递归版与迭代版都按前序顺序执行二叉树 DFS', () => {
    const bst = new BinarySearchTree<number>();

    bst.insert(4);
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);
    bst.insert(6);
    bst.insert(7);
    bst.insert(5);

    const recursiveByCallback: number[] = [];
    const iterativeByCallback: number[] = [];
    const recursiveOrder = DepthFirstSearchByTreeRecursive(bst.search(4), (node) =>
      recursiveByCallback.push(node.data)
    );
    const iterativeOrder = DepthFirstSearchByTreeIterative(bst.search(4), (node) =>
      iterativeByCallback.push(node.data)
    );

    expect(recursiveOrder.map((node) => node.data).join(',')).toBe('4,2,1,3,6,5,7');
    expect(iterativeOrder.map((node) => node.data).join(',')).toBe('4,2,1,3,6,5,7');
    expect(recursiveByCallback.join(',')).toBe('4,2,1,3,6,5,7');
    expect(iterativeByCallback.join(',')).toBe('4,2,1,3,6,5,7');
  });

  it('递归版与迭代版在空树根结点时都返回空数组', () => {
    expect(DepthFirstSearchByTreeRecursive(null)).toEqual([]);
    expect(DepthFirstSearchByTreeIterative(null)).toEqual([]);
  });
});