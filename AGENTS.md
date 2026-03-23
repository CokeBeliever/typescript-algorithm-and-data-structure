# Repository Guidelines

## 项目结构与模块组织

核心源码位于 `src/`。数据结构按领域划分在 `src/data-structure/linked-list`、`queue`、`stack` 和 `tree` 下；通用工具位于 `src/utils`，包入口使用各目录内的 `index.ts`。用于子路径导出的类型声明位于 `src/data-structure/types`。测试与实现代码就近放置在 `__tests__` 目录中，例如 `src/data-structure/queue/__tests__/QueueByArray.test.ts`。构建产物输出到 `dist/`。

## 构建、测试与开发命令

- `npm install`：安装 TypeScript、Jest、ts-jest 和 Prettier。
- `npm test`：在 Node 环境下运行 Jest 测试，直接验证 TypeScript 源码。
- `npm run build`：使用 `tsc` 构建 CommonJS 与 ESM 产物，然后复制声明文件到可发布目录。
- `npm pack --dry-run`：发布前检查最终打包内容。

## 代码风格与命名约定

遵循 `.editorconfig`：2 空格缩进、UTF-8 编码、LF 换行，并删除行尾空白。Prettier 使用单引号。保持 TypeScript 与严格模式兼容，内部导入优先使用现有的 `@/` 别名。实现文件和导出类使用 PascalCase 命名，例如 `BinarySearchTree.ts`、`QueueByLinkedList.ts`；目录入口文件统一为 `index.ts`。继续沿用每个数据结构一个小型聚焦模块的组织方式。

## 测试规范

测试框架为 Jest，配合 `ts-jest` 运行。新增测试时，放到最近的 `__tests__` 目录，并使用与目标类或模块对应的 `*.test.ts` 文件名，例如 `LinkedList.test.ts`。测试应覆盖正常流程、边界情况以及回归场景，尤其是插入、删除、遍历和空状态行为。提交 PR 前运行 `npm test`；如果修改了导出或声明文件，还应运行 `npm run build`。

## 提交与 Pull Request 规范

最近的提交标题采用简短约定式前缀，例如 `feat: ...`、`fix: ...`、`chore: ...`、`del: ...`。提交信息应使用祈使语气，并聚焦单一变更。PR 需要说明行为变化、列出受影响模块，并标明任何导出接口或类型层面的调整。若有关联 issue，请附上链接；同时在 PR 描述中写明测试结果，例如 `npm test` 和 `npm run build`。
