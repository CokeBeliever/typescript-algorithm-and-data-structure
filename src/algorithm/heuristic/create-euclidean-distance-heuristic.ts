import { getHeuristicCoordinate } from '@/algorithm/heuristic/coordinate-utils';
import type {
  CoordinateHeuristicFunctionType,
  HeuristicCoordinateGetterType,
} from '@/algorithm/heuristic/heuristic-types';

/**
 * 创建欧几里得距离启发函数
 */
export default function createEuclideanDistanceHeuristic<Element>(
  getCoordinate: HeuristicCoordinateGetterType<Element>
): CoordinateHeuristicFunctionType<Element> {
  return (current, target) => {
    const currentCoordinate = getHeuristicCoordinate(current, getCoordinate);
    const targetCoordinate = getHeuristicCoordinate(target, getCoordinate);
    const deltaX = Math.abs(currentCoordinate.x - targetCoordinate.x);
    const deltaY = Math.abs(currentCoordinate.y - targetCoordinate.y);
    const deltaZ = Math.abs(
      (currentCoordinate.z as number) - (targetCoordinate.z as number)
    );

    return Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);
  };
}
