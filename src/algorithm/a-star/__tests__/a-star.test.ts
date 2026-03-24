import {
  WeightedGraph,
  aStar as rootAStar,
  getPathFromAStarResult as rootGetPathFromAStarResult,
} from '@/index';
import {
  aStar as moduleAStar,
  getPathFromAStarResult as moduleGetPathFromAStarResult,
} from '@/algorithm/a-star';
import aStar from '@/algorithm/a-star/a-star';
import getPathFromAStarResult from '@/algorithm/a-star/get-path-from-a-star-result';

describe('aStar', () => {
  it('exports: a-star 模块和根入口导出 aStar 与 getPathFromAStarResult', () => {
    expect(moduleAStar).toBe(aStar);
    expect(moduleGetPathFromAStarResult).toBe(getPathFromAStarResult);
    expect(rootAStar).toBe(aStar);
    expect(rootGetPathFromAStarResult).toBe(getPathFromAStarResult);
  });

  it('根据启发函数引导搜索并还原最短路径', () => {
    const graph = new WeightedGraph<string>(true);
    const heuristicMap = new Map<string, number>([
      ['A', 10],
      ['B', 8],
      ['C', 7],
      ['D', 3],
      ['E', 1],
      ['Z', 0],
    ]);

    graph
      .addEdge('A', 'B', 4)
      .addEdge('A', 'C', 2)
      .addEdge('C', 'B', 1)
      .addEdge('B', 'D', 5)
      .addEdge('C', 'D', 8)
      .addEdge('C', 'E', 10)
      .addEdge('D', 'E', 2)
      .addEdge('D', 'Z', 6)
      .addEdge('E', 'Z', 3);

    const result = aStar(graph, 'A', 'Z', (current, target) => {
      expect(target).toBe('Z');
      return heuristicMap.get(current) as number;
    });

    expect(result.found).toBeTruthy();
    expect(result.start).toBe('A');
    expect(result.target).toBe('Z');
    expect(result.visitedOrder.join(',')).toBe('A,C,B,D,E,Z');
    expect(result.distances.get('A')).toBe(0);
    expect(result.distances.get('B')).toBe(3);
    expect(result.distances.get('C')).toBe(2);
    expect(result.distances.get('D')).toBe(8);
    expect(result.distances.get('E')).toBe(10);
    expect(result.distances.get('Z')).toBe(13);
    expect(result.heuristicValues.get('A')).toBe(10);
    expect(result.heuristicValues.get('B')).toBe(8);
    expect(result.heuristicValues.get('C')).toBe(7);
    expect(result.heuristicValues.get('D')).toBe(3);
    expect(result.heuristicValues.get('E')).toBe(1);
    expect(result.heuristicValues.get('Z')).toBe(0);
    expect(result.estimatedTotalCosts.get('A')).toBe(10);
    expect(result.estimatedTotalCosts.get('B')).toBe(11);
    expect(result.estimatedTotalCosts.get('C')).toBe(9);
    expect(result.estimatedTotalCosts.get('D')).toBe(11);
    expect(result.estimatedTotalCosts.get('E')).toBe(11);
    expect(result.estimatedTotalCosts.get('Z')).toBe(13);
    expect(result.previous.get('A')).toBeNull();
    expect(result.previous.get('B')).toBe('C');
    expect(result.previous.get('C')).toBe('A');
    expect(result.previous.get('D')).toBe('B');
    expect(result.previous.get('E')).toBe('D');
    expect(result.previous.get('Z')).toBe('E');
    expect(getPathFromAStarResult(result).join(',')).toBe('A,C,B,D,E,Z');
  });

  it('启发函数不一致时仍会根据更短路径更新结果', () => {
    const graph = new WeightedGraph<string>(true);

    graph
      .addEdge('A', 'B', 1)
      .addEdge('A', 'C', 2)
      .addEdge('B', 'Z', 2)
      .addEdge('C', 'Z', 10);

    const result = aStar(graph, 'A', 'Z', (current) => {
      const heuristicMap = new Map<string, number>([
        ['A', 0],
        ['B', 100],
        ['C', 0],
        ['Z', 0],
      ]);

      return heuristicMap.get(current) as number;
    });

    expect(result.found).toBeTruthy();
    expect(result.distances.get('Z')).toBe(3);
    expect(result.previous.get('Z')).toBe('B');
    expect(getPathFromAStarResult(result).join(',')).toBe('A,B,Z');
  });

  it('目标不可达时返回未找到结果和空路径', () => {
    const graph = new WeightedGraph<string>(true);

    graph.addEdge('A', 'B', 1).addEdge('B', 'C', 2).addVertex('Z');

    const result = aStar(graph, 'A', 'Z', () => 0);

    expect(result.found).toBeFalsy();
    expect(result.visitedOrder.join(',')).toBe('A,B,C');
    expect(result.distances.get('Z')).toBe(Infinity);
    expect(result.previous.get('Z')).toBeNull();
    expect(getPathFromAStarResult(result)).toEqual([]);
  });

  it('起点或目标点不存在时返回空结果', () => {
    const graph = new WeightedGraph<string>();

    graph.addEdge('A', 'B', 1);

    const result = aStar(graph, 'A', 'Z', () => 0);

    expect(result.found).toBeFalsy();
    expect(result.distances.size).toBe(0);
    expect(result.heuristicValues.size).toBe(0);
    expect(result.estimatedTotalCosts.size).toBe(0);
    expect(result.previous.size).toBe(0);
    expect(result.visitedOrder).toEqual([]);
    expect(getPathFromAStarResult(result)).toEqual([]);
  });

  it('图中存在负权边时直接报错', () => {
    const graph = new WeightedGraph<string>(true);

    graph.addEdge('A', 'B', -1);

    expect(() => aStar(graph, 'A', 'B', () => 0)).toThrow(
      'aStar: 图中存在负权边，不能使用 aStar 算法'
    );
  });

  it('heuristic 返回值必须是非负有限数字', () => {
    const graph = new WeightedGraph<string>(true);

    graph.addEdge('A', 'B', 1).addEdge('B', 'C', 1);

    expect(() =>
      aStar(graph, 'A', 'C', (current) => (current === 'B' ? -1 : 0))
    ).toThrow('aStar: heuristic 返回值必须是非负有限数字');

    expect(() => aStar(graph, 'A', 'C', () => Number.NaN)).toThrow(
      'aStar: heuristic 返回值必须是非负有限数字'
    );
  });
});
