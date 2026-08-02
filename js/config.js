/* ============================================================
   config.js — 集中配置
   修改站名、地址、API、轮询间隔、导航项，只改这里。
   ============================================================ */

export const CONFIG = {
  site: {
    name: '自然之域',
    nameEn: 'NatureArea',
    tagline: '纯净稳定生存服 · 长期开放 · 欢迎加入',
    footerNote: '自然之域管理组',
  },

  server: {
    address: 'na.of.cd',
    shortName: 'NA',
    motdFallback: '🌿 自然之域 · NatureArea',
  },

  api: {
    endpoint: 'https://uapis.cn/api/v1/game/minecraft/serverstatus',
    params: { server: 'na.of.cd' },
    pollInterval: 60_000, // 轮询间隔（毫秒）
  },

  nav: [
    { path: '/', label: '首页' },
    { path: '/server', label: '服务器信息' },
    { path: '/plugins', label: '插件生态' },
    { path: '/guide', label: '入服指引' },
    { path: '/contact', label: '联系方式' },
  ],
};
