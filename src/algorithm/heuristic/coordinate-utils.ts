import type {
  HeuristicCoordinateGetterType,
  HeuristicCoordinateInterface,
} from '@/algorithm/heuristic/heuristic-types';

export function getHeuristicCoordinate<Element>(
  element: Element,
  getCoordinate: HeuristicCoordinateGetterType<Element>
): HeuristicCoordinateInterface {
  const coordinate = getCoordinate(element);

  if (coordinate === null || coordinate === undefined) {
    throw new Error('heuristic: 坐标提取函数必须返回包含 x 和 y 的对象');
  }

  return {
    x: assertCoordinateValue(coordinate.x, 'x'),
    y: assertCoordinateValue(coordinate.y, 'y'),
    z: assertCoordinateValue(coordinate.z ?? 0, 'z'),
  };
}

function assertCoordinateValue(value: number, axis: 'x' | 'y' | 'z') {
  if (!Number.isFinite(value)) {
    throw new Error(`heuristic: 坐标 ${axis} 必须是有限数字`);
  }

  return value;
}
