import { Graph as RootGraph } from '@/index';
import { Graph as GraphModuleGraph } from '@/data-structure/graph';
import Graph from '@/data-structure/graph/Graph';

describe('Graph', () => {
  it('exports: graph 模块和根入口导出 Graph', () => {
    expect(GraphModuleGraph).toBe(Graph);
    expect(RootGraph).toBe(Graph);
  });

  it('isEmpty()/addVertex()/addEdge()/hasVertex()/hasEdge()/getNeighbors(): 图的基础操作', () => {
    const graph = new Graph<string>();

    expect(graph.isEmpty()).toBeTruthy();

    graph.addVertex('A').addEdge('A', 'B').addEdge('A', 'C').addEdge('B', 'D');

    expect(graph.isEmpty()).toBeFalsy();
    expect(graph.hasVertex('A')).toBeTruthy();
    expect(graph.hasVertex('D')).toBeTruthy();
    expect(graph.hasVertex('E')).toBeFalsy();
    expect(graph.hasEdge('A', 'B')).toBeTruthy();
    expect(graph.hasEdge('B', 'A')).toBeTruthy();
    expect(graph.hasEdge('C', 'D')).toBeFalsy();
    expect(graph.getNeighbors('A').join(',')).toBe('B,C');
    expect(graph.getNeighbors('D').join(',')).toBe('B');
    expect(graph.getNeighbors('E').join(',')).toBe('');

    graph.addEdge('A', 'B');
    expect(graph.getNeighbors('A').join(',')).toBe('B,C');
  });

  it('toString()/[Symbol.iterator](): 图可转字符串并可迭代', () => {
    const graph = new Graph<string>();

    graph.addEdge('A', 'B').addEdge('A', 'C').addEdge('B', 'D');

    expect(graph.toString()).toBe(
      ['A => B,C', 'B => A,D', 'C => A', 'D => B'].join('\n')
    );
    expect(Array.from(graph).join(',')).toBe('A,B,C,D');
  });

  it('isDirected(): 有向图只保留单向边', () => {
    const graph = new Graph<string>(true);

    graph.addEdge('A', 'B').addEdge('B', 'C');

    expect(graph.isDirected()).toBeTruthy();
    expect(graph.hasEdge('A', 'B')).toBeTruthy();
    expect(graph.hasEdge('B', 'A')).toBeFalsy();
    expect(graph.getNeighbors('B').join(',')).toBe('C');
  });
});