import {
  dijkstra as rootDijkstra,
  WeightedGraph,
  getPathFromDijkstraResult as RootGetPathFromDijkstraResult,
} from '@/index';
import {
  dijkstra as ModuleDijkstra,
  getPathFromDijkstraResult as ModuleGetPathFromDijkstraResult,
} from '@/algorithm/dijkstra';
import dijkstra from '@/algorithm/dijkstra/dijkstra';
import getPathFromDijkstraResult from '@/algorithm/dijkstra/get-path-from-dijkstra-result';

describe('dijkstra', () => {
  it('exports: dijkstra 模块和根入口导出 dijkstra 与 getPathFromDijkstraResult', () => {
    expect(ModuleDijkstra).toBe(dijkstra);
    expect(ModuleGetPathFromDijkstraResult).toBe(getPathFromDijkstraResult);
    expect(rootDijkstra).toBe(dijkstra);
    expect(RootGetPathFromDijkstraResult).toBe(getPathFromDijkstraResult);
  });

  it('计算起点到所有顶点的最短距离并能还原路径', () => {
    const graph = new WeightedGraph<string>(true);

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

    const result = dijkstra(graph, 'A');

    expect(result.start).toBe('A');
    expect(result.visitedOrder.join(',')).toBe('A,C,B,D,E,Z');
    expect(result.distances.get('A')).toBe(0);
    expect(result.distances.get('B')).toBe(3);
    expect(result.distances.get('C')).toBe(2);
    expect(result.distances.get('D')).toBe(8);
    expect(result.distances.get('E')).toBe(10);
    expect(result.distances.get('Z')).toBe(13);
    expect(result.previous.get('A')).toBeNull();
    expect(result.previous.get('B')).toBe('C');
    expect(result.previous.get('C')).toBe('A');
    expect(result.previous.get('D')).toBe('B');
    expect(result.previous.get('E')).toBe('D');
    expect(result.previous.get('Z')).toBe('E');
    expect(getPathFromDijkstraResult(result, 'Z').join(',')).toBe(
      'A,C,B,D,E,Z'
    );
  });

  it('不可达顶点的距离为 Infinity，路径为空', () => {
    const graph = new WeightedGraph<string>(true);

    graph.addEdge('A', 'B', 1).addEdge('B', 'C', 2).addVertex('X');

    const result = dijkstra(graph, 'A');

    expect(result.distances.get('X')).toBe(Infinity);
    expect(result.previous.get('X')).toBeNull();
    expect(getPathFromDijkstraResult(result, 'X')).toEqual([]);
  });

  it('起点不存在时返回空结果', () => {
    const graph = new WeightedGraph<string>();

    graph.addEdge('A', 'B', 1);

    const result = dijkstra(graph, 'Z');

    expect(result.start).toBe('Z');
    expect(result.distances.size).toBe(0);
    expect(result.previous.size).toBe(0);
    expect(result.visitedOrder).toEqual([]);
    expect(getPathFromDijkstraResult(result, 'A')).toEqual([]);
  });

  it('图中存在负权边时直接报错', () => {
    const graph = new WeightedGraph<string>(true);

    graph.addEdge('A', 'B', -1);

    expect(() => dijkstra(graph, 'A')).toThrow(
      'dijkstra: 图中存在负权边，不能使用 dijkstra 算法'
    );
  });
});
