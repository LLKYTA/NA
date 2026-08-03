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
    /* 服务器图标：替换图标时直接覆盖 img/server-icon.jpg 即可 */
    icon: 'img/server-icon.jpg',
  },

  server: {
    address: 'na.of.cd',
    shortName: 'NA',
    motdFallback: '🌿 自然之域 · NatureArea',
  },

  /* 服务器管理人员：增删改只动这里 */
  staff: [
    { role: '服主', id: 'KD_Klin', qqName: 'HHT' },
    { role: '管理员', id: 'Administrator520', qqName: 'HeftySoup214746' },
  ],

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

  contact: {
    qqGroup: {
      number: '980829992',
      // QQ 官方「加群代码」生成的一键加群链接（含 authKey，请勿改动）
      // 按钮将显示为「一键加群」；如需恢复「复制群号」，将 joinLink 清空即可
      joinLink: 'https://qm.qq.com/cgi-bin/qm/qr?k=AnoVaOR92jfGWQfGOtwYlrJQmCaABgJL&jump_from=webapi&authKey=ql4/+U5HEZ0IMqx0eedPEI1RY8Hq8dWQ+avoB16UzYrvTmUlKpsW0Ul6ES86quZB',
    },
  },
};
