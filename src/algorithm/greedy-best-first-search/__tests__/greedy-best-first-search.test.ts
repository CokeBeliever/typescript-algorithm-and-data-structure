import {
  Graph,
  getPathFromGreedyBestFirstSearchResult as rootGetPathFromGreedyBestFirstSearchResult,
  greedyBestFirstSearch as rootGreedyBestFirstSearch,
} from '@/index';
import {
  getPathFromGreedyBestFirstSearchResult as moduleGetPathFromGreedyBestFirstSearchResult,
  greedyBestFirstSearch as moduleGreedyBestFirstSearch,
} from '@/algorithm/greedy-best-first-search';
import { createEuclideanDistanceHeuristic } from '@/algorithm/heuristic';
import getPathFromGreedyBestFirstSearchResult from '@/algorithm/greedy-best-first-search/get-path-from-greedy-best-first-search-result';
import greedyBestFirstSearch from '@/algorithm/greedy-best-first-search/greedy-best-first-search';

interface PointNodeInterface {
  name: string;
  x: number;
  y: number;
}

describe('greedyBestFirstSearch', () => {
  it('exports: greedy-best-first-search 模块和根入口导出 greedyBestFirstSearch 与 getPathFromGreedyBestFirstSearchResult', () => {
    expect(moduleGreedyBestFirstSearch).toBe(greedyBestFirstSearch);
    expect(moduleGetPathFromGreedyBestFirstSearchResult).toBe(
      getPathFromGreedyBestFirstSearchResult
    );
    expect(rootGreedyBestFirstSearch).toBe(greedyBestFirstSearch);
    expect(rootGetPathFromGreedyBestFirstSearchResult).toBe(
      getPathFromGreedyBestFirstSearchResult
    );
  });

  it('按启发函数优先扩展更接近目标的顶点并还原路径', () => {
    const graph = new Graph<string>(true);
    const heuristicMap = new Map<string, number>([
      ['A', 4],
      ['B', 3],
      ['C', 1],
      ['D', 6],
      ['E', 2],
      ['F', 0.5],
      ['G', 0],
    ]);

    graph
      .addEdge('A', 'B')
      .addEdge('A', 'C')
      .addEdge('B', 'D')
      .addEdge('B', 'E')
      .addEdge('C', 'F')
      .addEdge('E', 'G')
      .addEdge('F', 'G');

    const result = greedyBestFirstSearch(
      graph,
      'A',
      'G',
      (current, target) => {
        expect(target).toBe('G');
        return heuristicMap.get(current) as number;
      }
    );

    expect(result.found).toBeTruthy();
    expect(result.start).toBe('A');
    expect(result.target).toBe('G');
    expect(result.visitedOrder.join(',')).toBe('A,C,F,G');
    expect(result.previous.get('A')).toBeNull();
    expect(result.previous.get('C')).toBe('A');
    expect(result.previous.get('F')).toBe('C');
    expect(result.previous.get('G')).toBe('F');
    expect(result.heuristicValues.get('A')).toBe(4);
    expect(result.heuristicValues.get('C')).toBe(1);
    expect(result.heuristicValues.get('F')).toBe(0.5);
    expect(result.heuristicValues.get('G')).toBe(0);
    expect(getPathFromGreedyBestFirstSearchResult(result).join(',')).toBe(
      'A,C,F,G'
    );
  });

  it('目标不可达时返回未找到结果和空路径', () => {
    const graph = new Graph<string>(true);

    graph.addEdge('A', 'B').addEdge('B', 'C').addVertex('Z');

    const result = greedyBestFirstSearch(
      graph,
      'A',
      'Z',
      (current) => {
        const values = new Map<string, number>([
          ['A', 3],
          ['B', 2],
          ['C', 1],
          ['Z', 0],
        ]);
        return values.get(current) as number;
      }
    );

    expect(result.found).toBeFalsy();
    expect(result.visitedOrder.join(',')).toBe('A,B,C');
    expect(result.previous.get('A')).toBeNull();
    expect(getPathFromGreedyBestFirstSearchResult(result)).toEqual([]);
  });

  it('可直接使用 heuristic 模块导出的启发式函数', () => {
    const start = { name: 'A', x: 0, y: 0 };
    const left = { name: 'B', x: 1, y: 1 };
    const right = { name: 'C', x: 1, y: 0 };
    const target = { name: 'D', x: 2, y: 0 };
    const graph = new Graph<PointNodeInterface>(true);
    const heuristic = createEuclideanDistanceHeuristic(
      (point: PointNodeInterface) => ({
        x: point.x,
        y: point.y,
      })
    );

    graph
      .addEdge(start, left)
      .addEdge(start, right)
      .addEdge(left, target)
      .addEdge(right, target);

    const result = greedyBestFirstSearch(graph, start, target, heuristic);

    expect(result.found).toBeTruthy();
    expect(result.visitedOrder).toEqual([start, right, target]);
    expect(result.heuristicValues.get(start)).toBe(2);
    expect(result.heuristicValues.get(right)).toBe(1);
    expect(result.heuristicValues.get(target)).toBe(0);
    expect(getPathFromGreedyBestFirstSearchResult(result)).toEqual([
      start,
      right,
      target,
    ]);
  });

  it('起点或目标点不存在时返回空结果', () => {
    const graph = new Graph<string>();

    graph.addEdge('A', 'B');

    const result = greedyBestFirstSearch(graph, 'A', 'Z', () => 0);

    expect(result.found).toBeFalsy();
    expect(result.previous.size).toBe(0);
    expect(result.visitedOrder).toEqual([]);
    expect(result.heuristicValues.size).toBe(0);
    expect(getPathFromGreedyBestFirstSearchResult(result)).toEqual([]);
  });

  it('heuristic 返回值必须是非负有限数字', () => {
    const graph = new Graph<string>(true);

    graph.addEdge('A', 'B').addEdge('B', 'C');

    expect(() =>
      greedyBestFirstSearch(graph, 'A', 'C', (current) =>
        current === 'B' ? -1 : 0
      )
    ).toThrow(
      'greedyBestFirstSearch: heuristic 返回值必须是非负有限数字'
    );

    expect(() =>
      greedyBestFirstSearch(graph, 'A', 'C', () => Number.NaN)
    ).toThrow(
      'greedyBestFirstSearch: heuristic 返回值必须是非负有限数字'
    );
  });
});
