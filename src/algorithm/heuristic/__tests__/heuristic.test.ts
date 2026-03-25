import {
  aStar,
  createChebyshevDistanceHeuristic as rootCreateChebyshevDistanceHeuristic,
  createEuclideanDistanceHeuristic as rootCreateEuclideanDistanceHeuristic,
  createManhattanDistanceHeuristic as rootCreateManhattanDistanceHeuristic,
  createOctileDistanceHeuristic2D as rootCreateOctileDistanceHeuristic2D,
  WeightedGraph,
} from '@/index';
import {
  createChebyshevDistanceHeuristic as moduleCreateChebyshevDistanceHeuristic,
  createEuclideanDistanceHeuristic as moduleCreateEuclideanDistanceHeuristic,
  createManhattanDistanceHeuristic as moduleCreateManhattanDistanceHeuristic,
  createOctileDistanceHeuristic2D as moduleCreateOctileDistanceHeuristic2D,
} from '@/algorithm/heuristic';
import createChebyshevDistanceHeuristic from '@/algorithm/heuristic/create-chebyshev-distance-heuristic';
import createEuclideanDistanceHeuristic from '@/algorithm/heuristic/create-euclidean-distance-heuristic';
import createManhattanDistanceHeuristic from '@/algorithm/heuristic/create-manhattan-distance-heuristic';
import createOctileDistanceHeuristic2D from '@/algorithm/heuristic/create-octile-distance-heuristic-2d';

interface PointNodeInterface {
  name: string;
  x: number;
  y: number;
  z?: number;
}

describe('heuristic', () => {
  const getCoordinate = (point: PointNodeInterface) => ({
    x: point.x,
    y: point.y,
    z: point.z,
  });

  it('exports: heuristic 模块和根入口导出所有启发式函数', () => {
    expect(moduleCreateManhattanDistanceHeuristic).toBe(
      createManhattanDistanceHeuristic
    );
    expect(moduleCreateEuclideanDistanceHeuristic).toBe(
      createEuclideanDistanceHeuristic
    );
    expect(moduleCreateChebyshevDistanceHeuristic).toBe(
      createChebyshevDistanceHeuristic
    );
    expect(moduleCreateOctileDistanceHeuristic2D).toBe(
      createOctileDistanceHeuristic2D
    );
    expect(rootCreateManhattanDistanceHeuristic).toBe(
      createManhattanDistanceHeuristic
    );
    expect(rootCreateEuclideanDistanceHeuristic).toBe(
      createEuclideanDistanceHeuristic
    );
    expect(rootCreateChebyshevDistanceHeuristic).toBe(
      createChebyshevDistanceHeuristic
    );
    expect(rootCreateOctileDistanceHeuristic2D).toBe(
      createOctileDistanceHeuristic2D
    );
  });

  it('支持基于坐标提取函数创建曼哈顿距离启发函数', () => {
    const heuristic = createManhattanDistanceHeuristic(getCoordinate);

    expect(
      heuristic(
        { name: 'A', x: 1, y: 2 },
        { name: 'B', x: 4, y: 6 }
      )
    ).toBe(7);
  });

  it('曼哈顿距离启发函数支持 3D 坐标，缺省 z 轴按 0 处理', () => {
    const heuristic = createManhattanDistanceHeuristic(getCoordinate);

    expect(
      heuristic(
        { name: 'A', x: 1, y: 2, z: 1 },
        { name: 'B', x: 4, y: 6, z: 5 }
      )
    ).toBe(11);

    expect(
      heuristic(
        { name: 'A', x: 1, y: 2 },
        { name: 'B', x: 4, y: 6, z: 0 }
      )
    ).toBe(7);
  });

  it('支持创建欧几里得距离启发函数', () => {
    const heuristic = createEuclideanDistanceHeuristic(getCoordinate);

    expect(
      heuristic(
        { name: 'A', x: 0, y: 0 },
        { name: 'B', x: 3, y: 4 }
      )
    ).toBe(5);
  });

  it('欧几里得距离启发函数支持 3D 坐标', () => {
    const heuristic = createEuclideanDistanceHeuristic(getCoordinate);

    expect(
      heuristic(
        { name: 'A', x: 0, y: 0, z: 0 },
        { name: 'B', x: 3, y: 4, z: 12 }
      )
    ).toBe(13);
  });

  it('支持创建切比雪夫距离启发函数', () => {
    const heuristic = createChebyshevDistanceHeuristic(getCoordinate);

    expect(
      heuristic(
        { name: 'A', x: 2, y: 1 },
        { name: 'B', x: 7, y: 4 }
      )
    ).toBe(5);
  });

  it('切比雪夫距离启发函数支持 3D 坐标', () => {
    const heuristic = createChebyshevDistanceHeuristic(getCoordinate);

    expect(
      heuristic(
        { name: 'A', x: 2, y: 1, z: 9 },
        { name: 'B', x: 7, y: 4, z: 3 }
      )
    ).toBe(6);
  });

  it('支持创建二维 Octile 距离启发函数', () => {
    const heuristic = createOctileDistanceHeuristic2D(getCoordinate);

    expect(
      heuristic(
        { name: 'A', x: 0, y: 0 },
        { name: 'B', x: 3, y: 1 }
      )
    ).toBeCloseTo(1 * Math.SQRT2 + 2, 10);
  });

  it('返回的启发函数可直接用于 aStar', () => {
    const start = { name: 'A', x: 0, y: 0 };
    const middle = { name: 'B', x: 1, y: 0 };
    const target = { name: 'C', x: 2, y: 0 };
    const graph = new WeightedGraph<PointNodeInterface>(true);

    graph
      .addEdge(start, middle, 1)
      .addEdge(start, target, 5)
      .addEdge(middle, target, 1);

    const result = aStar(
      graph,
      start,
      target,
      createManhattanDistanceHeuristic(getCoordinate)
    );

    expect(result.found).toBeTruthy();
    expect(result.distances.get(target)).toBe(2);
    expect(result.previous.get(target)).toBe(middle);
  });

  it('坐标提取函数必须返回包含有限坐标值的对象', () => {
    const invalidCoordinateHeuristic = createManhattanDistanceHeuristic(
      () =>
        ({
          x: Number.NaN,
          y: 0,
        }) as PointNodeInterface
    );

    expect(() =>
      invalidCoordinateHeuristic(
        { name: 'A', x: 0, y: 0 },
        { name: 'B', x: 1, y: 1 }
      )
    ).toThrow('heuristic: 坐标 x 必须是有限数字');

    const invalidZCoordinateHeuristic = createChebyshevDistanceHeuristic(
      () =>
        ({
          x: 0,
          y: 0,
          z: Number.POSITIVE_INFINITY,
        }) as PointNodeInterface
    );

    expect(() =>
      invalidZCoordinateHeuristic(
        { name: 'A', x: 0, y: 0, z: 0 },
        { name: 'B', x: 1, y: 1, z: 1 }
      )
    ).toThrow('heuristic: 坐标 z 必须是有限数字');

    const missingCoordinateHeuristic = createEuclideanDistanceHeuristic(
      () => undefined as unknown as PointNodeInterface
    );

    expect(() =>
      missingCoordinateHeuristic(
        { name: 'A', x: 0, y: 0 },
        { name: 'B', x: 1, y: 1 }
      )
    ).toThrow('heuristic: 坐标提取函数必须返回包含 x 和 y 的对象');
  });
});
