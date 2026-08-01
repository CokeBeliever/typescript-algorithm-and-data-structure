# QWEN.md

本文档为 Qwen Code 提供项目上下文，帮助 AI 助手更好地理解和操作本仓库。

## 项目概述

**typescript-algorithm-and-data-structure** 是一个用 TypeScript 实现的基础数据结构与经典算法库。提供根入口导出、子路径导出以及细粒度直接导入方式，适合学习、实验和按模块复用。

### 核心特性

- 提供 **CommonJS**、**ESM** 和 **类型声明文件** 构建产物
- 维护根入口与子路径入口导出
- 主要模块提供邻近测试
- 支持本地 `verify` 校验和 GitHub Actions CI

### 技术栈

- **TypeScript** (target: ESNext, strict mode)
- **Jest** + **ts-jest** (测试框架)
- **Prettier** (代码格式化)

## 项目结构

```text
F:\github\typescript-algorithm-and-data-structure\
├── src/
│   ├── algorithm/           # 算法实现
│   │   ├── a-star/          # A* 寻路算法
│   │   ├── breadth-first-search/  # 广度优先搜索
│   │   ├── depth-first-search/    # 深度优先搜索
│   │   ├── dijkstra/        # Dijkstra 最短路径
│   │   ├── greedy-best-first-search/  # 贪心最佳优先搜索
│   │   └── heuristic/       # 启发函数
│   ├── data-structure/      # 数据结构实现
│   │   ├── graph/           # 图、加权图
│   │   ├── heap/            # 堆、最大堆、最小堆
│   │   ├── linked-list/     # 链表
│   │   ├── priority-queue/  # 优先队列
│   │   ├── queue/           # 队列（数组/链表实现）
│   │   ├── stack/           # 栈（数组/链表实现）
│   │   └── tree/            # 二叉搜索树
│   ├── utils/               # 工具函数
│   └── index.ts             # 根入口导出
├── dist/                    # 构建产物
├── scripts/                 # 构建脚本
├── __tests__/               # 测试文件（就近放置）
└── 配置文件...
```

## 常用命令

```bash
# 安装依赖
npm install

# 格式检查
npm run lint

# 运行测试
npm test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 构建 (CommonJS + ESM + 类型声明)
npm run build

# 检查发包内容
npm run pack:dry-run

# 完整校验（提交/发版前）
npm run verify
```

## 命名与文件组织规则

### 目录命名

- 目录统一使用 **kebab-case**
- 测试目录固定命名为 `__tests__`

### 文件命名

| 场景 | 文件名 | 导出名 | 示例 |
|------|--------|--------|------|
| 类、节点、面向对象实现 | `PascalCase.ts` | `PascalCase` | `BinarySearchTree.ts` → `BinarySearchTree` |
| 普通函数、算法 | `kebab-case.ts` | `camelCase` | `get-path-from-dijkstra-result.ts` → `getPathFromDijkstraResult` |
| 模块入口 | `index.ts` | 按实际导出风格 | `queue/index.ts` |
| 公共类型/接口 | `kebab-case.types.ts` | `PascalCase` 类型名 | `binary-search-tree.types.ts` |
| 类测试 | `PascalCase.test.ts` | - | `QueueByArray.test.ts` |
| 函数测试 | `kebab-case.test.ts` | - | `dijkstra.test.ts` |

### 导出规则

- 类、类型、接口使用 **PascalCase**
- 普通函数使用 **camelCase**
- `index.ts` 导出名称须与文件命名风格匹配
- 公共类型从模块 `index.ts` 导出，不暴露内部 `*.types.ts` 路径

### 导入规则

- 内部源码导入优先使用 **`@/` 别名**
- 导入路径大小写必须与真实磁盘路径完全一致

## 编码风格

- **缩进**: 2 空格
- **换行**: LF
- **引号**: 单引号
- **编码**: UTF-8
- **文件末尾**: 保留换行
- **行尾空白**: 移除
- **TypeScript**: 严格模式 (`strict: true`)

## 测试约定

- 测试文件放置在相邻的 `__tests__/` 目录中
- 测试文件命名跟随被测源码文件风格
- 覆盖率阈值: 语句 90%、分支 85%、函数 90%、行 90%

## Windows 注意事项

Windows 文件系统不区分大小写，只修改大小写的重命名必须使用 `git mv` 两步法：

```bash
git mv src/example/File.ts src/example/__tmp__.ts
git mv src/example/__tmp__.ts src/example/file.ts
```

重命名后检查：
```bash
git status --short
git diff --name-status
```

## 新增模块流程

### 新增类模块

1. 使用 `PascalCase.ts` 创建实现文件
2. 如需公共类型，新增或更新 `kebab-case.types.ts`
3. 在相邻 `__tests__/` 中新增同名风格测试
4. 更新目录 `index.ts` 导出
5. 如涉及公共入口，补充更上层 `index.ts` 导出
6. 更新 `README.md`（如用户可见）

### 新增函数/算法模块

1. 使用 `kebab-case.ts` 创建实现文件
2. 导出名称使用 `camelCase`
3. 如需公共类型，新增或更新 `kebab-case.types.ts`
4. 在相邻 `__tests__/` 中新增 `kebab-case.test.ts`
5. 更新目录 `index.ts`
6. 更新 `README.md`（如用户可见）

## 关键配置文件

| 文件 | 用途 |
|------|------|
| `package.json` | 依赖、脚本、导出配置 |
| `tsconfig.json` | TypeScript 配置（开发/类型检查） |
| `tsconfig.build.json` | CommonJS 构建配置 |
| `tsconfig.build.esm.json` | ESM 构建配置 |
| `jest.config.js` | Jest 测试配置 |
| `.prettierrc` | Prettier 格式化配置 |
| `.editorconfig` | 编辑器基础配置 |
| `AGENTS.md` | 协作规范、命名规则、提交流程 |
| `CONTRIBUTING.md` | 贡献入口与提交流程 |

## 相关文档

- **协作规范**: 见 `AGENTS.md`
- **贡献指南**: 见 `CONTRIBUTING.md`
- **变更记录**: 见 `CHANGELOG.md`
- **许可证**: MIT (见 `LICENSE`)