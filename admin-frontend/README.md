## Admin Frontend

Tech stack: Vue 3 + Vite + Pinia + Vue Router + Axios.

```
src/
├── components/          # 可复用业务组件
├── layouts/             # 基础布局（侧边栏/顶栏）
├── pages/               # 业务页面（登录、仪表盘、项目、搭建器等）
├── router/              # 路由配置与模块化路由
├── services/            # API 封装，统一 axios 拦截
├── stores/              # Pinia 状态管理
├── hooks/               # 通用组合式 API
└── styles/              # 全局样式与变量
```

### 开发

```bash
cd admin-frontend
npm install
npm run dev
```

接口基址通过 `VITE_API_BASE` 环境变量配置，默认指向 `/api`。
# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
