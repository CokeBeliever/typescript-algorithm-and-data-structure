/**
 * 启发函数类型
 */
export type CoordinateHeuristicFunctionType<Element> = (
  current: Element,
  target: Element
) => number;

/**
 * 启发式函数坐标
 */
export interface HeuristicCoordinateInterface {
  x: number;
  y: number;
  z?: number;
}

/**
 * 坐标提取函数类型
 */
export type HeuristicCoordinateGetterType<Element> = (
  element: Element
) => HeuristicCoordinateInterface;
