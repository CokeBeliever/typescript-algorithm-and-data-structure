import {
  BinarySearchTree,
  depthFirstSearchByTreeRecursive as rootDepthFirstSearchByTreeRecursive,
  depthFirstSearchByTreeIterative as rootDepthFirstSearchByTreeIterative,
} from '@/index';
import {
  depthFirstSearchByTreeRecursive as moduleDepthFirstSearchByTreeRecursive,
  depthFirstSearchByTreeIterative as moduleDepthFirstSearchByTreeIterative,
} from '@/algorithm/depth-first-search';
import depthFirstSearchByTreeRecursive from '@/algorithm/depth-first-search/depth-first-search-by-tree-recursive';
import depthFirstSearchByTreeIterative from '@/algorithm/depth-first-search/depth-first-search-by-tree-iterative';

describe('depthFirstSearchByTree', () => {
  it('exports: depth-first-search 模块和根入口导出树的递归版与迭代版 DFS', () => {
    expect(moduleDepthFirstSearchByTreeRecursive).toBe(
      depthFirstSearchByTreeRecursive
    );
    expect(rootDepthFirstSearchByTreeRecursive).toBe(
      depthFirstSearchByTreeRecursive
    );
    expect(moduleDepthFirstSearchByTreeIterative).toBe(
      depthFirstSearchByTreeIterative
    );
    expect(rootDepthFirstSearchByTreeIterative).toBe(
      depthFirstSearchByTreeIterative
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
    const recursiveOrder = depthFirstSearchByTreeRecursive(
      bst.search(4),
      (node) => recursiveByCallback.push(node.data)
    );
    const iterativeOrder = depthFirstSearchByTreeIterative(
      bst.search(4),
      (node) => iterativeByCallback.push(node.data)
    );

    expect(recursiveOrder.map((node) => node.data).join(',')).toBe(
      '4,2,1,3,6,5,7'
    );
    expect(iterativeOrder.map((node) => node.data).join(',')).toBe(
      '4,2,1,3,6,5,7'
    );
    expect(recursiveByCallback.join(',')).toBe('4,2,1,3,6,5,7');
    expect(iterativeByCallback.join(',')).toBe('4,2,1,3,6,5,7');
  });

  it('递归版与迭代版在空树根结点时都返回空数组', () => {
    expect(depthFirstSearchByTreeRecursive(null)).toEqual([]);
    expect(depthFirstSearchByTreeIterative(null)).toEqual([]);
  });
});
