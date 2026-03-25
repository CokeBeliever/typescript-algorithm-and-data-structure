import { getHeuristicCoordinate } from '@/algorithm/heuristic/coordinate-utils';
import type {
  CoordinateHeuristicFunctionType,
  HeuristicCoordinateGetterType,
} from '@/algorithm/heuristic/heuristic-types';

/**
 * 创建曼哈顿距离启发函数
 */
export default function createManhattanDistanceHeuristic<Element>(
  getCoordinate: HeuristicCoordinateGetterType<Element>
): CoordinateHeuristicFunctionType<Element> {
  return (current, target) => {
    const currentCoordinate = getHeuristicCoordinate(current, getCoordinate);
    const targetCoordinate = getHeuristicCoordinate(target, getCoordinate);

    return (
      Math.abs(currentCoordinate.x - targetCoordinate.x) +
      Math.abs(currentCoordinate.y - targetCoordinate.y) +
      Math.abs((currentCoordinate.z as number) - (targetCoordinate.z as number))
    );
  };
}
