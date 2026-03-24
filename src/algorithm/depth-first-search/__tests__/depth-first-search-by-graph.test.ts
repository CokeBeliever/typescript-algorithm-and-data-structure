import {
  depthFirstSearchByGraphRecursive as rootDepthFirstSearchByGraphRecursive,
  depthFirstSearchByGraphIterative as rootDepthFirstSearchByGraphIterative,
  Graph,
} from '@/index';
import {
  depthFirstSearchByGraphRecursive as moduleDepthFirstSearchByGraphRecursive,
  depthFirstSearchByGraphIterative as moduleDepthFirstSearchByGraphIterative,
} from '@/algorithm/depth-first-search';
import depthFirstSearchByGraphRecursive from '@/algorithm/depth-first-search/depth-first-search-by-graph-recursive';
import depthFirstSearchByGraphIterative from '@/algorithm/depth-first-search/depth-first-search-by-graph-iterative';

describe('depthFirstSearchByGraph', () => {
  it('exports: depth-first-search 模块和根入口导出图的递归版与迭代版 DFS', () => {
    expect(moduleDepthFirstSearchByGraphRecursive).toBe(
      depthFirstSearchByGraphRecursive
    );
    expect(rootDepthFirstSearchByGraphRecursive).toBe(
      depthFirstSearchByGraphRecursive
    );
    expect(moduleDepthFirstSearchByGraphIterative).toBe(
      depthFirstSearchByGraphIterative
    );
    expect(rootDepthFirstSearchByGraphIterative).toBe(
      depthFirstSearchByGraphIterative
    );
  });

  it('递归版与迭代版广度优先遍历顺序一致地执行深度优先遍历图', () => {
    const graph = new Graph<string>();

    graph
      .addEdge('A', 'B')
      .addEdge('A', 'C')
      .addEdge('B', 'D')
      .addEdge('C', 'E')
      .addEdge('D', 'F')
      .addEdge('E', 'F');

    const recursiveByCallback: string[] = [];
    const iterativeByCallback: string[] = [];
    const recursiveOrder = depthFirstSearchByGraphRecursive(
      graph,
      'A',
      (vertex) => recursiveByCallback.push(vertex)
    );
    const iterativeOrder = depthFirstSearchByGraphIterative(
      graph,
      'A',
      (vertex) => iterativeByCallback.push(vertex)
    );

    expect(recursiveOrder.join(',')).toBe('A,B,D,F,E,C');
    expect(iterativeOrder.join(',')).toBe('A,B,D,F,E,C');
    expect(recursiveByCallback.join(',')).toBe('A,B,D,F,E,C');
    expect(iterativeByCallback.join(',')).toBe('A,B,D,F,E,C');
  });

  it('递归版与迭代版在图中有环时都不会重复访问结点', () => {
    const graph = new Graph<string>();

    graph
      .addEdge('A', 'B')
      .addEdge('B', 'C')
      .addEdge('C', 'D')
      .addEdge('D', 'A');

    expect(depthFirstSearchByGraphRecursive(graph, 'A').join(',')).toBe(
      'A,B,C,D'
    );
    expect(depthFirstSearchByGraphIterative(graph, 'A').join(',')).toBe(
      'A,B,C,D'
    );
  });

  it('递归版与迭代版在起点不存在时都返回空数组', () => {
    const graph = new Graph<string>();
    const recursiveByCallback: string[] = [];
    const iterativeByCallback: string[] = [];

    graph.addEdge('A', 'B');

    expect(
      depthFirstSearchByGraphRecursive(graph, 'Z', (vertex) =>
        recursiveByCallback.push(vertex)
      )
    ).toEqual([]);
    expect(
      depthFirstSearchByGraphIterative(graph, 'Z', (vertex) =>
        iterativeByCallback.push(vertex)
      )
    ).toEqual([]);
    expect(recursiveByCallback).toEqual([]);
    expect(iterativeByCallback).toEqual([]);
  });
});
