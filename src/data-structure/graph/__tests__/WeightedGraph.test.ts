import { WeightedGraph as RootWeightedGraph } from '@/index';
import { WeightedGraph as GraphModuleWeightedGraph } from '@/data-structure/graph';
import WeightedGraph from '@/data-structure/graph/WeightedGraph';

describe('WeightedGraph', () => {
  it('exports: graph 模块和根入口导出 WeightedGraph', () => {
    expect(GraphModuleWeightedGraph).toBe(WeightedGraph);
    expect(RootWeightedGraph).toBe(WeightedGraph);
  });

  it('isEmpty()/addVertex()/addEdge()/hasVertex()/hasEdge()/getNeighbors()/getWeight(): 带权图的基础操作', () => {
    const graph = new WeightedGraph<string>();

    expect(graph.isEmpty()).toBeTruthy();

    graph
      .addVertex('A')
      .addEdge('A', 'B', 2)
      .addEdge('A', 'C', 5)
      .addEdge('B', 'D', 1);

    expect(graph.isEmpty()).toBeFalsy();
    expect(graph.hasVertex('A')).toBeTruthy();
    expect(graph.hasVertex('D')).toBeTruthy();
    expect(graph.hasVertex('E')).toBeFalsy();
    expect(graph.hasEdge('A', 'B')).toBeTruthy();
    expect(graph.hasEdge('B', 'A')).toBeTruthy();
    expect(graph.hasEdge('C', 'D')).toBeFalsy();
    expect(
      graph
        .getNeighbors('A')
        .map((edge) => `${edge.vertex}:${edge.weight}`)
        .join(',')
    ).toBe('B:2,C:5');
    expect(graph.getWeight('A', 'B')).toBe(2);
    expect(graph.getWeight('D', 'A')).toBeNull();
    expect(graph.getWeight('E', 'A')).toBeNull();
  });

  it('addEdge(): 重复边会更新边权', () => {
    const graph = new WeightedGraph<string>();

    graph.addEdge('A', 'B', 2);
    graph.addEdge('A', 'B', 8);

    expect(graph.getNeighbors('A').length).toBe(1);
    expect(graph.getWeight('A', 'B')).toBe(8);
    expect(graph.getWeight('B', 'A')).toBe(8);
  });

  it('toString()/[Symbol.iterator](): 带权图可转字符串并可迭代', () => {
    const graph = new WeightedGraph<string>();

    graph.addEdge('A', 'B', 2).addEdge('A', 'C', 5).addEdge('B', 'D', 1);

    expect(graph.toString()).toBe(
      ['A => B(2),C(5)', 'B => A(2),D(1)', 'C => A(5)', 'D => B(1)'].join('\n')
    );
    expect(Array.from(graph).join(',')).toBe('A,B,C,D');
  });

  it('isDirected(): 有向带权图只保留单向边', () => {
    const graph = new WeightedGraph<string>(true);

    graph.addEdge('A', 'B', 2).addEdge('B', 'C', 4);

    expect(graph.isDirected()).toBeTruthy();
    expect(graph.hasEdge('A', 'B')).toBeTruthy();
    expect(graph.hasEdge('B', 'A')).toBeFalsy();
    expect(graph.getWeight('B', 'A')).toBeNull();
    expect(
      graph
        .getNeighbors('B')
        .map((edge) => `${edge.vertex}:${edge.weight}`)
        .join(',')
    ).toBe('C:4');
  });

  it('addEdge(): weight 参数必须是有限数字', () => {
    const graph = new WeightedGraph<string>();

    expect(() => graph.addEdge('A', 'B', Number.NaN)).toThrow(
      'addEdge(): weight 参数必须是有限数字'
    );
    expect(() => graph.addEdge('A', 'B', Number.POSITIVE_INFINITY)).toThrow(
      'addEdge(): weight 参数必须是有限数字'
    );
  });
});