## Why

当前仓库尚未具备可运行的产品代码，但目标是快速启动一个可展示 OpenCode 会话状态的 WebUI。现在建立统一的 React + Koa + TypeScript 基础工程，可以尽快验证 OpenCode API 接入路径，并为后续偏游戏化体验迭代提供稳定底座。

## What Changes

- 初始化 `mentor-emulator` 工程结构：前端 React + Vite + SCSS，后端 Node.js + Koa，统一使用 TypeScript。
- 新增后端 OpenCode 网关能力：调用 OpenCode 现有 API 获取会话列表与会话状态，并对前端提供简化聚合接口。
- 新增前端会话总览页面：默认加载并展示最新 10 个 Session，包含基础状态信息。
- 引入并配置工程规范工具：ESLint、Prettier，以及基础脚本（dev/build/lint/format）。
- 采用纯 CSS/SCSS 实现偏游戏风 UI 风格，不引入游戏引擎。

## Capabilities

### New Capabilities

- `opencode-session-gateway`: 提供对 OpenCode Session 列表与状态的后端聚合访问能力。
- `session-overview-ui`: 提供 WebUI 首页会话总览，默认展示最新 10 条 Session 与状态。
- `project-bootstrap-toolchain`: 提供 React+Koa+TypeScript 工程脚手架及 Vite/SCSS/ESLint/Prettier 基础能力。

### Modified Capabilities

- 无

## Impact

- 代码结构：新增前端与后端目录、共享类型与基础配置文件。
- API：新增后端 HTTP 接口用于输出最新 Session 列表与状态聚合结果。
- 依赖：新增 React、Vite、Koa、TypeScript、SCSS、ESLint、Prettier 等相关依赖。
- 运行方式：新增统一开发与构建脚本，支持本地联调（前端代理后端）。
