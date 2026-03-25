# typescript-algorithm-and-data-structure

TypeScript 实现的基础数据结构与经典算法练习仓库，提供根入口导出、子路径导出以及更细粒度的直接导入方式，适合学习、实验和按模块复用。

## 当前包含内容

### Algorithms

| 名称 | 类型 | 简介 | 前置基础 | 适用场景 |
| --- | --- | --- | --- | --- |
| `aStar` | 最短路径 | 用启发函数引导搜索方向，在非负权图中寻找起点到目标点的最短路径。 | 加权图、优先队列、Dijkstra、启发函数 | 地图寻路、游戏寻路、单目标路径规划 |
| `getPathFromAStarResult` | 路径还原 | 根据 `aStar` 的前驱表还原从起点到目标点的路径。 | 数组或列表、前驱节点概念、A* 结果结构 | 展示路径结果、输出具体节点序列 |
| `createManhattanDistanceHeuristic` | 启发函数 | 创建基于坐标的曼哈顿距离启发函数，支持 2D/3D，缺省 `z` 按 `0` 处理。 | 坐标系、绝对值、网格最短路 | 四方向网格寻路、城市街区距离估计、3D 轴向移动估计 |
| `createEuclideanDistanceHeuristic` | 启发函数 | 创建基于坐标的欧几里得距离启发函数，支持 2D/3D，缺省 `z` 按 `0` 处理。 | 坐标系、平方和开方、几何距离 | 平面导航、连续空间距离估计、3D 空间距离估计 |
| `createChebyshevDistanceHeuristic` | 启发函数 | 创建基于坐标的切比雪夫距离启发函数，支持 2D/3D，缺省 `z` 按 `0` 处理。 | 坐标系、最大值、多方向移动 | 允许多方向且单步代价一致的网格寻路 |
| `createOctileDistanceHeuristic2D` | 启发函数 | 创建基于二维坐标 Octile 距离的启发函数。 | 坐标系、八方向移动、对角代价 | 二维八方向网格寻路、对角步长为 `sqrt(2)` 的场景 |
| `breadthFirstSearchByGraph` | 图遍历 | 按层逐步访问图中的顶点。 | 队列、图的邻接关系、已访问集合 | 无权图最短路径、层级扩散、连通性搜索 |
| `breadthFirstSearchByTree` | 树遍历 | 按层访问树节点，也常被称为层序遍历。 | 队列、二叉树或普通树结构 | 层级展示、逐层统计、最短层级问题 |
| `depthFirstSearchByGraphRecursive` | 图遍历 | 用递归方式沿路径尽可能深入，再回溯继续搜索。 | 递归、调用栈、图的邻接关系、已访问集合 | 路径搜索、连通分量、拓扑相关的遍历基础 |
| `depthFirstSearchByGraphIterative` | 图遍历 | 使用显式栈模拟 DFS，避免递归调用栈增长。 | 栈、图的邻接关系、已访问集合 | 深度探索、需要手动控制遍历顺序、避免深递归 |
| `depthFirstSearchByTreeRecursive` | 树遍历 | 递归地先访问子树，再回到父节点继续遍历。 | 递归、树结构、前序/中序/后序遍历概念 | 树结构分析、表达式树处理、节点聚合计算 |
| `depthFirstSearchByTreeIterative` | 树遍历 | 使用显式栈实现树的深度优先遍历。 | 栈、树结构、遍历顺序控制 | 非递归树遍历、需要避免递归栈限制的场景 |
| `dijkstra` | 最短路径 | 计算单源点到其他顶点的最短路径，要求边权非负。 | 加权图、优先队列、贪心思想、最短路径基础 | 路径规划、路由选择、加权图最短距离计算 |
| `getPathFromDijkstraResult` | 路径还原 | 根据 `dijkstra` 的前驱表还原从起点到目标点的路径。 | 数组或列表、前驱节点概念、Dijkstra 结果结构 | 展示最短路径、生成具体路径序列 |

### Data Structures

| 名称 | 类型 | 简介 | 适用场景 |
| --- | --- | --- | --- |
| `LinkedList` | 线性结构 | 由节点串联组成，插入和删除位置灵活。 | 频繁插入删除、实现队列或栈、教学演示指针结构 |
| `QueueByArray` | 队列 | 基于数组实现的先进先出结构。 | 顺序处理任务、BFS、消息排队 |
| `QueueByLinkedList` | 队列 | 基于链表实现的先进先出结构。 | 频繁入队出队、减少数组搬移成本 |
| `StackByArray` | 栈 | 基于数组实现的后进先出结构。 | 函数调用模型、撤销操作、括号匹配 |
| `StackByLinkedList` | 栈 | 基于链表实现的后进先出结构。 | 动态容量栈、教学场景、频繁头部操作 |
| `Graph` | 图 | 表示顶点与边的关系，可用于无权图问题。 | BFS、DFS、连通性分析、关系建模 |
| `WeightedGraph` | 加权图 | 在图的边上附带权重信息。 | 最短路径、网络代价计算、路径规划 |
| `Heap` | 堆 | 一类满足局部有序性质的完全二叉树结构。 | 优先级选择、Top K、调度问题 |
| `MaxHeap` | 最大堆 | 父节点值总是不小于子节点值。 | 动态维护最大值、优先级最高项弹出 |
| `MinHeap` | 最小堆 | 父节点值总是不大于子节点值。 | 动态维护最小值、Dijkstra、任务调度 |
| `PriorityQueue` | 优先队列 | 按优先级而不是按入队顺序出队。 | 调度系统、图算法、事件处理 |
| `MaxPriorityQueue` | 优先队列 | 优先级越高越先出队。 | 任务抢占、优先消费高权重任务 |
| `MinPriorityQueue` | 优先队列 | 优先级越低越先出队。 | 最短路径、最小代价选择、定时任务 |
| `BinaryTreeNode` | 树节点 | 二叉树节点基础模型。 | 构建二叉树、遍历算法、树结构教学 |
| `BinarySearchTreeNode` | 树节点 | 二叉搜索树中的节点模型。 | 表达 BST 节点关系、辅助树操作实现 |
| `BinarySearchTree` | 树 | 左子树小于根、右子树大于根的有序树结构。 | 有序查找、范围查询、教学中的树结构入门 |

## 安装

```bash
npm install typescript-algorithm-and-data-structure
```

如果是在仓库内开发：

```bash
npm install
```

## 使用方式

### 根入口导入

```ts
import {
  BinarySearchTree,
  LinkedList,
  WeightedGraph,
  aStar,
  createManhattanDistanceHeuristic,
  getPathFromAStarResult,
  dijkstra,
  getPathFromDijkstraResult,
} from 'typescript-algorithm-and-data-structure';

interface PointNodeInterface {
  name: string;
  x: number;
  y: number;
}

const graph = new WeightedGraph<PointNodeInterface>(true);
const getCoordinate = (point: PointNodeInterface) => ({
  x: point.x,
  y: point.y,
});
const heuristic = createManhattanDistanceHeuristic(getCoordinate);
const start = { name: 'A', x: 0, y: 0 };
const middle = { name: 'B', x: 1, y: 0 };
const target = { name: 'D', x: 2, y: 0 };

graph
  .addEdge(start, middle, 1)
  .addEdge(middle, target, 1)
  .addEdge(start, target, 5);

const aStarResult = aStar(graph, start, target, heuristic);
const aStarPath = getPathFromAStarResult(aStarResult);

const dijkstraResult = dijkstra(graph, start);
const dijkstraPath = getPathFromDijkstraResult(dijkstraResult, target);
```

### 子路径导入

```ts
import { aStar, getPathFromAStarResult } from 'typescript-algorithm-and-data-structure/algorithm/a-star';
import { dijkstra, getPathFromDijkstraResult } from 'typescript-algorithm-and-data-structure/algorithm/dijkstra';
import { createOctileDistanceHeuristic2D } from 'typescript-algorithm-and-data-structure/algorithm/heuristic';
import { BinarySearchTree } from 'typescript-algorithm-and-data-structure/data-structure/tree';
import { QueueByArray } from 'typescript-algorithm-and-data-structure/data-structure/queue';
```

### 更细粒度的直接导入

```ts
import BinarySearchTree from 'typescript-algorithm-and-data-structure/data-structure/tree/BinarySearchTree';
import aStar from 'typescript-algorithm-and-data-structure/algorithm/a-star/a-star';
import dijkstra from 'typescript-algorithm-and-data-structure/algorithm/dijkstra/dijkstra';
import Comparator from 'typescript-algorithm-and-data-structure/utils/Comparator';
```

### 类型导入

```ts
import type {
  BinarySearchTreeInterface,
  BinaryTreeOrderCallbackType,
} from 'typescript-algorithm-and-data-structure/data-structure/tree';

import type { WeightedGraphInterface } from 'typescript-algorithm-and-data-structure/data-structure/graph';
```

### CommonJS

```js
const {
  BinarySearchTree,
  WeightedGraph,
  dijkstra,
} = require('typescript-algorithm-and-data-structure');
```

## 本地开发

```bash
npm test
```

运行 Jest 测试。

```bash
npm run build
```

构建 CommonJS、ESM 与声明文件。

```bash
npm pack --dry-run
```

检查最终发包内容。

## 项目结构

```text
src/
  algorithm/
  data-structure/
  utils/
  index.ts
dist/
```

更细的协作规范、命名规则与提交流程见 [AGENTS.md](./AGENTS.md)。
