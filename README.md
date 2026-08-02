# 🌿 自然之域 · NatureArea 官网

纯净稳定生存服（`na.of.cd`）的官网，单页应用（SPA），深色自然玻璃拟态风格。

## 功能

- **实时服务器状态**：在线/离线、当前人数、版本、MOTD（来自 [uapis.cn](https://uapis.cn) 的 Minecraft 服务器状态 API，每 60s 轮询）
- **服务器信息**：地址、核心（Leaves 1.21.8）、配置（4核16G）、支持版本（Java 1.12+）
- **插件生态**：34 款插件按 6 类展示，悬停看说明，支持搜索
- **入服指引**：注册/登录/假人/坐下/快捷菜单，指令一键复制
- **联系方式**：长期开放，欢迎加入

## 本地运行

项目使用 ES Modules，需要通过 HTTP 访问（不要直接双击 `file://` 打开）：

```bash
# 任选其一
python -m http.server 8000     # 访问 http://localhost:8000
npx serve                      # 访问提示的地址
```

或使用 VS Code 的 **Live Server** 插件打开。

## 技术栈

纯原生 HTML + CSS + JavaScript（ES Modules），零依赖、无构建工具。
任意静态托管（GitHub Pages / Netlify / nginx 等）可直接部署。

## 目录结构

```
├── index.html            # 外壳：导航占位 + 页面挂载点 + 页脚占位
├── css/
│   ├── base.css          # 设计变量、reset、排版、工具类
│   ├── components.css    # 玻璃卡、按钮、导航、状态卡、命令卡等通用组件
│   └── pages.css         # 各页面专属布局
└── js/
    ├── main.js           # 入口：装配路由与组件
    ├── config.js         # 集中配置（地址/API/轮询/导航）
    ├── core/             # router（Hash 路由）、api（状态拉取）、dom（工具）
    ├── data/plugins.js   # 插件数据（增删改只动这里）
    ├── components/       # navbar、footer、statusCard、pluginCard
    └── pages/            # home / server / plugins / guide / contact
```

## 如何扩展

- **改信息**（地址、轮询间隔、导航项）→ 改 `js/config.js`
- **改插件列表** → 改 `js/data/plugins.js`
- **新增页面** → 新建 `js/pages/xxx.js`，在 `js/main.js` 路由表注册一行
