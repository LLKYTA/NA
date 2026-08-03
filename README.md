# 🌿 自然之域 · NatureArea 官网

<p align="center">
  <img src="img/server-icon.jpg" width="110" height="110" alt="自然之域服务器图标" />
</p>

<p align="center">
  <b>纯净稳定生存服</b> <code>na.of.cd</code> 的官方网站
  <br/>
  深色自然玻璃拟态 · 实时服务器状态 · 纯原生零依赖单页应用
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/zero--dependencies-%E2%9C%93-7CFFB2?style=flat-square" alt="零依赖" />
  <img src="https://img.shields.io/badge/ES%20Modules-%E2%9C%93-4ade80?style=flat-square" alt="ES Modules" />
</p>

---

## ✨ 功能特性

- **🟢 实时服务器状态**：在线/离线、当前人数、游戏版本、MOTD 一目了然，每 60s 自动轮询 + 手动刷新，数据来自 [uapis.cn](https://uapis.cn) 的 Minecraft 服务器查询接口
- **👥 在线玩家名单**：服务器开放名单时自动显示在线玩家（需服务器端 `hide-online-players` 关闭）
- **🧩 插件生态**：数十款插件按 6 类分类展示，悬停查看说明，支持**实时搜索**
- **📖 入服指引**：注册/登录/假人/坐下/快捷菜单，指令一键复制
- **💬 QQ 交流群**：群号一键复制，配置加群链接后自动升级为「一键加群」
- **👥 管理团队**：服主 / 管理员信息展示
- **🎨 深色自然玻璃拟态**：深绿渐变夜空 + 萤火光点动画 + 毛玻璃卡片，纯 CSS 实现
- **🚀 零依赖**：无框架、无构建工具，任意静态托管可直接部署

## 📄 页面一览

| 路由 | 页面 | 说明 |
|---|---|---|
| `#/` | 首页 | Hero + 实时状态卡 + 服务器速览 + 特色入口 |
| `#/server` | 服务器信息 | 地址 / 核心 / 配置 / 支持版本 + 实时状态 |
| `#/plugins` | 插件生态 | 插件分类展示 + 实时搜索 |
| `#/guide` | 入服指引 | 5 步上手，指令点击复制 |
| `#/contact` | 联系方式 | QQ 交流群 + 管理团队 + 欢迎加入 |

## 🛠 技术栈

- 原生 **HTML + CSS + JavaScript**（ES Modules）
- 自研轻量 **Hash 路由**（`js/core/router.js`），页面即插即用
- 组件化结构：`components/` 通用组件 + `pages/` 页面模块 + `config.js` 集中配置
- **零外部依赖**，无 npm 包、无构建步骤

## 🚀 本地运行

> 项目使用 ES Modules，需通过 HTTP 访问（请勿直接双击 `file://` 打开）

```bash
# 任选其一
python -m http.server 8000     # 访问 http://localhost:8000
npx serve                      # 访问提示的地址
```

或使用 VS Code 的 **Live Server** 插件直接打开。

## 📁 目录结构

```
├── index.html            # 外壳：导航占位 + 页面挂载点 + 页脚占位
├── img/
│   └── server-icon.jpg   # 服务器图标（替换此文件即可全站生效）
├── css/
│   ├── base.css          # 设计变量、reset、排版、工具类
│   ├── components.css    # 玻璃卡、按钮、导航、状态卡等通用组件
│   └── pages.css         # 各页面专属布局
└── js/
    ├── main.js           # 入口：装配路由与组件
    ├── config.js         # 集中配置（地址/API/轮询/导航/人员/QQ群）
    ├── core/             # router（Hash 路由）、api（状态拉取）、dom（工具）
    ├── data/plugins.js   # 插件数据
    ├── components/       # navbar、footer、statusCard、pluginCard
    └── pages/            # home / server / plugins / guide / contact
```

## ⚙️ 配置与扩展

| 想改什么 | 改哪里 |
|---|---|
| 服务器地址 / API / 轮询间隔 / 导航项 | `js/config.js` |
| 插件列表 | `js/data/plugins.js` |
| 管理人员 / QQ 群 | `js/config.js` |
| 服务器图标 | 覆盖 `img/server-icon.jpg` |
| 新增页面 | 新建 `js/pages/xxx.js`，在 `js/main.js` 路由表注册一行 |

## 🌐 部署

任意静态托管即可，无需后端：

- **GitHub Pages**：仓库 Settings → Pages → 选择分支，提交即上线
- **Netlify / Vercel**：导入仓库，构建命令留空
- **自有服务器**：把目录内容放到 nginx / Caddy 的静态站点目录

## 💬 关于服务器

- **地址**：`na.of.cd`（简称 NA）
- **核心**：Leaves 1.21.8，支持 Java 1.12+
- **配置**：4 核 16G
- **类型**：纯净稳定生存服，长期开放
- **QQ 交流群**：`980829992`

---

<p align="center">
  <sub>© 2026 自然之域管理组 · 服务器地址 <code>na.of.cd</code></sub>
</p>
