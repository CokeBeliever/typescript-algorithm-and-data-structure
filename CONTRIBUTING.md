# Contributing

感谢你愿意改进这个仓库。

## 开始之前

1. 先阅读根目录的 [AGENTS.md](./AGENTS.md)。
2. 安装依赖：`npm install`
3. 修改前先确认目标模块属于算法还是数据结构，再决定文件命名和导出风格。

## 开发约定

- 目录统一使用 `kebab-case`。
- 类实现文件使用 `PascalCase.ts`，主类名与文件名一致。
- 普通函数或算法文件使用 `kebab-case.ts`，导出名使用 `camelCase`。
- 公共类型文件统一使用 `*.types.ts`。
- 可对外暴露的目录需要维护 `index.ts`。
- 内部导入优先使用 `@/` 别名。

## Windows 重命名注意事项

Windows 默认大小写不敏感。只修改大小写时，请使用两步 `git mv`，不要只靠编辑器重命名。

```bash
git mv src/example/File.ts src/example/__tmp__.ts
git mv src/example/__tmp__.ts src/example/file.ts
```

改名后请检查：

- `git status --short`
- `git diff --name-status`

## 提交前检查

在提交或发起 PR 前，请至少运行：

```bash
npm run verify
```

这条命令会依次执行：

- `npm run lint`
- `npm run test:coverage`
- `npm run build`
- `npm run pack:dry-run`

## Pull Request 建议内容

- 行为变化
- 受影响模块
- 导出或类型变更
- 本地验证结果

如果这次改动会影响使用方式，也请同步更新 [README.md](./README.md)。
