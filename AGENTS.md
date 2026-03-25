# AGENTS.md

本文件是仓库级执行规范，面向贡献者、维护者以及在本仓库内工作的 Codex/AI agent。

## 1. 作用范围与优先级

- 本文件默认作用于整个仓库。
- 如果某个子目录未来出现更近一级的 `AGENTS.md`，则子目录内文件优先遵循更近一级规则。
- 规则优先级如下：
  1. 用户在当前任务中的明确要求
  2. 更近一级目录中的 `AGENTS.md`
  3. 仓库根目录中的本文件
  4. `README.md` 与普通文档说明

## 2. 这个文件要解决什么问题

- 统一目录结构与命名风格。
- 避免 Windows 下大小写重命名导致的 Git 和 TypeScript 冲突。
- 让新增模块、测试、导出和文档更新有固定套路。
- 让 Codex 在没有额外提醒时，也能按仓库约定稳定执行。

## 3. 快速执行规则

- 新增目录时使用 `kebab-case`。
- 新增 `class` 文件时使用 `PascalCase.ts`，并让文件名与类名一致。
- 新增普通函数或算法文件时使用 `kebab-case.ts`。
- 类导出名使用 `PascalCase`，函数导出名使用 `camelCase`。
- 测试文件名跟随被测文件风格：类用 `PascalCase.test.ts`，函数用 `kebab-case.test.ts`。
- 每个可对外暴露的目录都提供 `index.ts`。
- 修改文件名后，必须同步修改所有导入和目录导出。
- 内部导入优先使用 `@/` 别名。
- 不要手动编辑 `dist/`。

## 4. 目录结构

- 核心源码位于 `src/`。
- 算法位于 `src/algorithm/`。
- 数据结构位于 `src/data-structure/`。
- 数据结构公共类型与接口采用 colocated 方式，放在各自模块目录下的 `*.types.ts` 文件中。
- 工具函数位于 `src/utils/`。
- 测试与实现代码就近放在各模块目录下的 `__tests__/` 中。
- 构建产物位于 `dist/`。

## 5. 命名速查表

| 场景 | 文件名 | 导出名 | 示例 |
| --- | --- | --- | --- |
| 类、节点、面向对象实现 | `PascalCase.ts` | `PascalCase` | `BinarySearchTree.ts` -> `BinarySearchTree` |
| 普通函数、算法、辅助函数 | `kebab-case.ts` | `camelCase` | `get-path-from-dijkstra-result.ts` -> `getPathFromDijkstraResult` |
| 目录入口 | `index.ts` | 按实际导出风格 | `queue/index.ts` |
| 模块公共类型/接口 | `kebab-case.types.ts` | `PascalCase` 类型名 | `binary-search-tree.types.ts` |
| 类测试 | `PascalCase.test.ts` | 无 | `QueueByArray.test.ts` |
| 函数测试 | `kebab-case.test.ts` | 无 | `dijkstra.test.ts` |

## 6. 命名与导出规则

### 6.1 目录命名

- 目录统一使用 `kebab-case`。
- 测试目录固定命名为 `__tests__`。
- 不要在同级目录混用 `PascalCase` 与 `kebab-case` 目录名。

### 6.2 源码文件命名

- 一个文件只负责一个清晰的核心实现。
- 以类为主导出的文件必须使用 `PascalCase.ts`。
- 以普通函数为主导出的文件必须使用 `kebab-case.ts`。
- 模块级公共类型或接口文件使用 `kebab-case.types.ts`。
- 文件名必须与主导出语义一致，不要使用模糊缩写。

### 6.3 导出命名

- 类、类型、接口使用 `PascalCase`。
- 普通函数使用 `camelCase`。
- `index.ts` 中的导出名称必须和文件真实命名风格匹配。
- 公共类型统一从所属模块的 `index.ts` 导出，不要额外暴露内部类型路径。
- 不要把函数文件伪装成类风格导出，也不要把类文件导出成函数风格名称。

### 6.4 测试命名

- 测试文件名跟随被测源码文件风格。
- 一个测试文件应聚焦一个实现文件或一组强相关导出。
- 新增公共导出时，优先补齐对应测试。

## 7. 导入与路径规则

- 所有导入路径大小写必须与真实磁盘路径完全一致。
- 内部源码导入优先使用 `@/` 别名。
- 修改文件名、目录名或导出名时，必须同步修改：
  - 所有调用处导入
  - 所在目录的 `index.ts`
  - 相关测试
  - 如有必要，`README.md`
- 保持 `tsconfig.json` 中的 `forceConsistentCasingInFileNames: true`。

## 8. Windows 下的文件重命名规则

Windows 文件系统通常不区分大小写，因此“只修改大小写”的重命名必须显式处理。

- 不要只靠编辑器或资源管理器修改文件名大小写。
- 只要涉及大小写重命名，统一使用 `git mv`。
- 如果只是改大小写，必须走两步重命名：

```bash
git mv src/algorithm/dijkstra/Dijkstra.ts src/algorithm/dijkstra/__tmp__.ts
git mv src/algorithm/dijkstra/__tmp__.ts src/algorithm/dijkstra/dijkstra.ts
```

- 重命名后检查：
  - `git status --short`
  - `git diff --name-status`
- 目标是让 Git 识别为重命名，而不是“删除 + 新增”。

## 9. 新增或修改模块时的标准流程

### 9.1 新增类模块

1. 使用 `PascalCase.ts` 创建实现文件。
2. 如需抽象公共契约，在同目录新增或更新对应的 `kebab-case.types.ts`。
3. 在相邻 `__tests__/` 中新增同名风格测试。
4. 在目录 `index.ts` 中补充导出。
5. 如果涉及公共入口，补充更上层的 `index.ts` 导出。
6. 如用户可见，更新 `README.md`。

### 9.2 新增函数或算法模块

1. 使用 `kebab-case.ts` 创建实现文件。
2. 导出名称使用 `camelCase`。
3. 如需公共类型，在所属模块目录中新增或更新 `kebab-case.types.ts`。
4. 在相邻 `__tests__/` 中新增 `kebab-case.test.ts`。
5. 更新目录 `index.ts`。
6. 如用户可见，更新 `README.md`。

### 9.3 修改公共导出

1. 检查根入口和子路径入口是否都需要同步修改。
2. 检查相关 `*.types.ts` 是否也需要同步调整。
3. 检查测试中的导入名称是否仍然正确。
4. 检查 `package.json` 的 `exports` 是否需要同步。
5. 运行至少一轮相关验证。

## 10. 编码风格

- 遵循 `.editorconfig`：UTF-8、2 空格缩进、LF 换行、文件末尾保留换行、移除行尾空白。
- Prettier 使用单引号。
- 保持 TypeScript 严格模式兼容。
- 优先使用清晰直接的命名，不要为了简短牺牲语义。
- 优先保持现有模块风格一致，而不是在局部引入新风格。

## 11. 验证要求

### 11.1 常用命令

- `npm install`
- `npm test`
- `npm run build`
- `npm pack --dry-run`

### 11.2 何时运行什么

- 修改实现逻辑后，至少运行 `npm test`。
- 修改导出、类型声明、构建相关逻辑后，运行 `npm test` 和 `npm run build`。
- 修改发包内容或导出路径时，可额外运行 `npm pack --dry-run`。

### 11.3 提交前检查清单

- 文件命名是否符合规则。
- 导入路径大小写是否与真实文件一致。
- `index.ts` 导出是否同步。
- 测试是否同步更新。
- 文档是否需要同步更新。
- `git diff --name-status` 中是否存在意外的大小写问题。

## 12. 提交与 PR 规则

- 提交标题使用简短约定式前缀，例如 `feat: ...`、`fix: ...`、`chore: ...`、`del: ...`。
- 一次提交尽量只做一类事情。
- 大小写重命名尽量单独提交。
- PR 说明应包含：
  - 行为变化
  - 受影响模块
  - 导出或类型变更
  - 本地验证结果

## 13. 文档维护规则

- 协作规范、命名规范、提交流程优先写入 `AGENTS.md`。
- 面向使用者的安装、导入示例、模块列表写入 `README.md`。
- 文档中的文件名、路径、导出名必须与源码保持一致。

## 14. 给 Codex 的执行提示

- 先判断当前改动属于“类模块”还是“函数模块”，再决定文件命名。
- 涉及数据结构公共类型时，优先放在对应模块目录下的 `*.types.ts`，不要恢复集中式 `src/data-structure/types/`。
- 改文件名时，先检查是否会触发大小写冲突。
- 发现命名风格与本规范不一致时，优先保持仓库整体一致性，并在必要时连同导出和测试一起修复。
- 如果用户只要求修一个点，但该点会导致导出、测试或路径失配，默认一并补齐这些相邻改动。
