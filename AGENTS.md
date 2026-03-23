# Repository Guidelines

## 项目结构与模块组织
核心代码位于 `src/`。数据结构按功能划分在 `src/data-structure/` 下，例如 `linked-list/`、`queue/`、`stack/`、`tree/`。公共工具放在 `src/utils/`，公开的类型声明放在 `src/data-structure/types/`。测试与实现文件就近放置在各模块的 `__tests__/` 目录中，例如 `src/data-structure/queue/__tests__/QueueByArray.test.ts`。

## 构建、测试与开发命令
请先执行 `npm install`；仓库依赖本地开发依赖来运行 Jest 和 TypeScript。

- `npm test`：通过 `ts-jest` 运行全部 Jest 测试。
- `npx jest src/data-structure/tree/__tests__/BinarySearchTree.test.ts`：迭代开发时运行单个测试文件。
- `npx tsc --noEmit`：基于 `tsconfig.json` 执行严格的 TypeScript 类型检查。

当前仓库没有单独的构建产物配置，主要通过测试和类型检查完成验证。

## 代码风格与命名规范
遵循 `.editorconfig`：使用 2 个空格缩进、UTF-8 编码、LF 换行，并移除行尾空白。Prettier 配置启用了 `singleQuote: true`；如果有大范围格式调整，先执行 `npx prettier --write .`。

具体数据结构类及其文件名使用 PascalCase，例如 `LinkedList.ts`、`BinarySearchTreeNode.ts`。统一通过 `index.ts` 维护 barrel 导出。方法名应清晰表达语义，避免不必要缩写；共享接口与类型优先放在现有声明文件中，不要分散定义重复类型。

## 测试规范
测试框架为 Jest，并由 `ts-jest` 处理 TypeScript 测试文件。新增测试应放在对应模块附近的 `__tests__/` 目录下，文件名使用 `*.test.ts`。新增数据结构或方法时，至少覆盖正常路径、边界情况和错误条件。

## 提交与 Pull Request 规范
最近的提交信息使用简短前缀，例如 `feat:`、`improvement:`、`del:`。请保持这一风格，并使用祈使句概述变更，例如 `feat: implement heap insert and remove`。

Pull Request 应说明行为变化、列出受影响模块，并写明验证方式，例如 `npm test`、指定 Jest 文件或 `npx tsc --noEmit`。如有关联 issue 请附上链接。该仓库以代码为主，通常不需要截图。
