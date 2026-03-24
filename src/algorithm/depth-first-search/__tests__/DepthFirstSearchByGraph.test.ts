import {
  DepthFirstSearchByGraphRecursive as RootDepthFirstSearchByGraphRecursive,
  DepthFirstSearchByGraphIterative as RootDepthFirstSearchByGraphIterative,
  Graph,
} from '@/index';
import {
  DepthFirstSearchByGraphRecursive as DfsModuleDepthFirstSearchByGraphRecursive,
  DepthFirstSearchByGraphIterative as DfsModuleDepthFirstSearchByGraphIterative,
} from '@/algorithm/depth-first-search';
import DepthFirstSearchByGraphRecursive from '@/algorithm/depth-first-search/DepthFirstSearchByGraphRecursive';
import DepthFirstSearchByGraphIterative from '@/algorithm/depth-first-search/DepthFirstSearchByGraphIterative';

describe('DepthFirstSearchByGraph', () => {
  it('exports: depth-first-search 模块和根入口导出图的递归版与迭代版 DFS', () => {
    expect(DfsModuleDepthFirstSearchByGraphRecursive).toBe(
      DepthFirstSearchByGraphRecursive
    );
    expect(RootDepthFirstSearchByGraphRecursive).toBe(
      DepthFirstSearchByGraphRecursive
    );
    expect(DfsModuleDepthFirstSearchByGraphIterative).toBe(
      DepthFirstSearchByGraphIterative
    );
    expect(RootDepthFirstSearchByGraphIterative).toBe(
      DepthFirstSearchByGraphIterative
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
    const recursiveOrder = DepthFirstSearchByGraphRecursive(graph, 'A', (vertex) =>
      recursiveByCallback.push(vertex)
    );
    const iterativeOrder = DepthFirstSearchByGraphIterative(graph, 'A', (vertex) =>
      iterativeByCallback.push(vertex)
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

    expect(DepthFirstSearchByGraphRecursive(graph, 'A').join(',')).toBe('A,B,C,D');
    expect(DepthFirstSearchByGraphIterative(graph, 'A').join(',')).toBe('A,B,C,D');
  });

  it('递归版与迭代版在起点不存在时都返回空数组', () => {
    const graph = new Graph<string>();
    const recursiveByCallback: string[] = [];
    const iterativeByCallback: string[] = [];

    graph.addEdge('A', 'B');

    expect(
      DepthFirstSearchByGraphRecursive(graph, 'Z', (vertex) =>
        recursiveByCallback.push(vertex)
      )
    ).toEqual([]);
    expect(
      DepthFirstSearchByGraphIterative(graph, 'Z', (vertex) =>
        iterativeByCallback.push(vertex)
      )
    ).toEqual([]);
    expect(recursiveByCallback).toEqual([]);
    expect(iterativeByCallback).toEqual([]);
  });
});