## 1. Workspace & Toolchain Bootstrap

- [x] 1.1 创建 workspace 目录结构（`apps/web`、`apps/server`）并初始化根级脚本。
- [x] 1.2 初始化前端 React + TypeScript + Vite 工程并启用 SCSS。
- [x] 1.3 初始化后端 Koa + TypeScript 工程并配置基础启动脚本。
- [x] 1.4 配置 ESLint 与 Prettier（覆盖前后端）并添加 lint/format 命令。

## 2. OpenCode Session Gateway

- [x] 2.1 在后端封装 OpenCode 客户端连接与基础配置（含环境变量读取）。
- [x] 2.2 实现会话列表读取逻辑，默认 `limit=10` 且按更新时间返回。
- [x] 2.3 实现会话状态读取与列表聚合逻辑，补齐缺失状态回退值。
- [x] 2.4 暴露会话概览 API 路由并提供结构化错误响应。

## 3. Session Overview UI

- [x] 3.1 实现首页数据请求流程，在初始化时拉取会话概览接口。
- [x] 3.2 实现 Session 列表组件，渲染标题、时间与状态。
- [x] 3.3 实现空态与错误态展示，确保失败场景可诊断。
- [x] 3.4 实现偏游戏向但轻量的 SCSS 主题样式（不引入游戏引擎）。

## 4. Integration, Validation & Delivery

- [x] 4.1 配置前端 Vite 代理到后端 API，完成本地联调链路。
- [x] 4.2 验证 dev/build/lint/format 脚本可用并修复阻塞问题。
- [x] 4.3 补充 README 的启动说明与 OpenCode 运行前置条件。
