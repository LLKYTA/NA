# 自然之域（NatureArea）官网 — 设计文档

日期：2026-08-02
状态：已批准

## 1. 目标

为纯净稳定生存服「自然之域 · NatureArea」（地址 `na.of.cd`）搭建官网。
展示服务器状态（实时在线人数）、服务器信息、插件生态、入服指引与联系方式。
视觉风格为**深色自然玻璃拟态**（深绿渐变夜空 + 毛玻璃卡片 + 绿色荧光点缀）。

## 2. 架构

- **SPA 单壳 + Hash 路由**：单个 `index.html` 作为外壳，`js/core/router.js` 按 `#/xxx` hash 动态渲染各页面视图到 `#app` 挂载点。
- **ES Modules** 组织代码，无构建工具、无第三方依赖，任意静态服务器即可运行。
- 页面模块统一签名 `{ title, render(container), onMount(), onDestroy() }`；
  新增页面 = 新建 `js/pages/*.js` + 在 `js/main.js` 路由表注册一行。

## 3. 文件结构

```
d:\NA\
├── index.html                # 外壳：背景层 + 导航占位 + #app + 页脚占位
├── README.md                 # 运行说明
├── css/
│   ├── base.css              # 设计变量(配色/玻璃参数)、reset、排版、工具类
│   ├── components.css        # 导航栏、页脚、玻璃卡、按钮、状态卡、命令卡
│   └── pages.css             # 各页面专属布局
├── js/
│   ├── main.js               # 入口：装配路由、渲染导航/页脚、启动背景动画
│   ├── config.js             # 集中配置：站名/地址/API/轮询间隔/导航项
│   ├── core/
│   │   ├── router.js         # Hash 路由
│   │   ├── api.js            # 状态 API 封装（fetch/轮询/缓存/订阅）
│   │   └── dom.js            # DOM 工具：el()、sanitize、toast、copy
│   ├── data/
│   │   └── plugins.js        # 34 个插件数据（分类/名称/说明）
│   ├── components/
│   │   ├── navbar.js         # 导航栏（在线胶囊/复制地址/移动端菜单）
│   │   ├── footer.js         # 页脚
│   │   ├── statusCard.js     # 服务器状态卡（大卡/胶囊两用）
│   │   └── pluginCard.js     # 插件分类卡（chip + 悬停说明）
│   └── pages/
│       ├── home.js           # #/ 首页
│       ├── server.js         # #/server 服务器信息
│       ├── plugins.js        # #/plugins 插件生态
│       ├── guide.js          # #/guide 入服指引
│       └── contact.js        # #/contact 联系方式
└── docs/superpowers/specs/   # 本文档
```

## 4. 页面与数据流

### 路由表
| Hash | 页面 | 关键内容 |
|---|---|---|
| `#/` | 首页 | Hero + 大字状态卡 + 服务器信息速览 + 进服 CTA |
| `#/server` | 服务器信息 | 地址(复制)/核心/配置/在线详情 + 插件入口 |
| `#/plugins` | 插件生态 | 34 插件分 6 类玻璃卡，chip 悬停说明，支持搜索 |
| `#/guide` | 入服指引 | 5 条命令卡（点击复制）+ 免登录备注 |
| `#/contact` | 联系方式 | 地址卡/管理组/长期开放 |

### 状态数据流
- `core/api.js` 封装 `https://uapis.cn/api/v1/game/minecraft/serverstatus?server=na.of.cd`
- 首次加载即请求，之后每 **60s** 轮询；状态缓存并通知订阅者（首页状态卡 + 导航胶囊）
- 请求失败 → 显示离线/未知态 + 手动刷新按钮
- `motd_html` 经 DOMParser 白名单过滤（仅保留 span/b/i/br 与 style 属性）后注入，防 XSS

### 可扩展点
- 服务器信息、API、轮询间隔、导航项 → 集中在 `config.js`
- 插件增删改 → 只改 `data/plugins.js`
- 新增页面 → 新建页面模块 + 路由表注册一行

## 5. 视觉规范

- 背景：`#07130b → #0c2418` 深绿渐变 + JS 生成的萤火/星光浮动光点（CSS 动画）
- 玻璃卡：`rgba(255,255,255,.06)` 底 + `backdrop-filter: blur(20px) saturate(160%)` + `1px` 半透明描边 + 内发光
- 强调色：`#7CFFB2`（自然绿荧光）；正文 `#e7f5ee`
- 标题：像素风（CSS 合成，不引外部字体，保证零依赖可离线）
- 移动端：导航折叠为汉堡菜单；卡片单列堆叠

## 6. 验证

- 全部 `.js` 通过 `node --check` 语法校验
- 本地静态服务器（`python -m http.server` 或 `npx serve`）起服务，curl 验证 html/css/js 均 200
- 页面切换、轮询、复制地址、插件搜索逻辑人工核对，console 无报错
