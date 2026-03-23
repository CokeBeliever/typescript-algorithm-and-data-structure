import {
  BreadthFirstSearchByGraph as RootBreadthFirstSearchByGraph,
  Graph,
} from '@/index';
import { BreadthFirstSearchByGraph as BfsModuleBreadthFirstSearchByGraph } from '@/algorithm/breadth-first-search';
import BreadthFirstSearchByGraph from '@/algorithm/breadth-first-search/BreadthFirstSearchByGraph';

describe('BreadthFirstSearchByGraph', () => {
  it('exports: breadth-first-search 模块和根入口导出 BreadthFirstSearchByGraph', () => {
    expect(BfsModuleBreadthFirstSearchByGraph).toBe(BreadthFirstSearchByGraph);
    expect(RootBreadthFirstSearchByGraph).toBe(BreadthFirstSearchByGraph);
  });

  it('广度优先遍历图', () => {
    const graph = new Graph<string>();

    graph
      .addEdge('A', 'B')
      .addEdge('A', 'C')
      .addEdge('B', 'D')
      .addEdge('C', 'E')
      .addEdge('D', 'F')
      .addEdge('E', 'F');

    const traversedByCallback: string[] = [];
    const traversedOrder = BreadthFirstSearchByGraph(graph, 'A', (vertex) =>
      traversedByCallback.push(vertex)
    );

    expect(traversedOrder.join(',')).toBe('A,B,C,D,E,F');
    expect(traversedByCallback.join(',')).toBe('A,B,C,D,E,F');
  });

  it('图中有环时结点不会重复访问', () => {
    const graph = new Graph<string>();

    graph
      .addEdge('A', 'B')
      .addEdge('B', 'C')
      .addEdge('C', 'D')
      .addEdge('D', 'A');

    expect(BreadthFirstSearchByGraph(graph, 'A').join(',')).toBe('A,B,D,C');
  });

  it('起点不存在时返回空数组', () => {
    const graph = new Graph<string>();
    const traversedByCallback: string[] = [];

    graph.addEdge('A', 'B');

    expect(
      BreadthFirstSearchByGraph(graph, 'Z', (vertex) =>
        traversedByCallback.push(vertex)
      )
    ).toEqual([]);
    expect(traversedByCallback).toEqual([]);
  });
});