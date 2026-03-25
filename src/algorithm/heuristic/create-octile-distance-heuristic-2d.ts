import { getHeuristicCoordinate } from '@/algorithm/heuristic/coordinate-utils';
import type {
  CoordinateHeuristicFunctionType,
  HeuristicCoordinateGetterType,
} from '@/algorithm/heuristic/heuristic-types';

const DIAGONAL_STEP_COST = Math.SQRT2;
const STRAIGHT_STEP_COST = 1;

/**
 * 创建二维 Octile 距离启发函数
 */
export default function createOctileDistanceHeuristic2D<Element>(
  getCoordinate: HeuristicCoordinateGetterType<Element>
): CoordinateHeuristicFunctionType<Element> {
  return (current, target) => {
    const currentCoordinate = getHeuristicCoordinate(current, getCoordinate);
    const targetCoordinate = getHeuristicCoordinate(target, getCoordinate);
    const deltaX = Math.abs(currentCoordinate.x - targetCoordinate.x);
    const deltaY = Math.abs(currentCoordinate.y - targetCoordinate.y);
    const minDelta = Math.min(deltaX, deltaY);
    const maxDelta = Math.max(deltaX, deltaY);

    return (
      DIAGONAL_STEP_COST * minDelta +
      STRAIGHT_STEP_COST * (maxDelta - minDelta)
    );
  };
}
