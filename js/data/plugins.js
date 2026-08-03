/* ============================================================
   data/plugins.js — 插件生态数据
   34 款插件，按功能分类。增删改插件只动这个文件。
   ============================================================ */

export const PLUGIN_CATEGORIES = [
  {
    icon: '🔐',
    title: '登录与安全',
    plugins: [
      { name: 'AuthMe', desc: '注册 / 登录系统（对应 /register、/login）' },
      { name: 'GrimAC', desc: '反作弊检测，维护游戏公平' },
      { name: 'CoreProtect', desc: '方块操作日志，支持违规回滚' },
      { name: 'Dominion', desc: '领地保护，防止他人破坏' },
      { name: 'LiteSignIn', desc: '每日签到系统' },
      { name: 'cyubackup', desc: '自动备份（自定义插件）' },
      { name: 'eBackup', desc: '服务器数据备份' },
      { name: 'cyuid', desc: '玩家 ID 查询等管理工具（自定义插件）' },
    ],
  },
  {
    icon: '⚙️',
    title: '核心基础',
    plugins: [
      { name: 'Vault', desc: '经济与权限的前置 API' },
      { name: 'LuckPerms', desc: '权限组管理' },
      { name: 'PlaceholderAPI', desc: '占位符扩展，供其他插件使用' },
      { name: 'CommandAPI', desc: '指令系统开发 API' },
      { name: 'cyutime', desc: '在线时长统计等管理工具（自定义插件）' },
    ],
  },
  {
    icon: '💬',
    title: '聊天与界面',
    plugins: [
      { name: 'FxChat', desc: '聊天消息排版与格式优化' },
      { name: 'KazePlayerTitle', desc: '进服标题 / 称号展示' },
      { name: 'JoinMessage', desc: '进服欢迎消息' },
      { name: 'LHTab', desc: 'Tab 列表显示优化' },
      { name: 'AMOTD', desc: '服务器 MOTD 定制' },
      { name: 'MoMenu', desc: '自定义菜单 GUI' },
      { name: 'NameTag', desc: '头顶名称显示优化' },
    ],
  },
  {
    icon: '🧭',
    title: '传送与玩法',
    plugins: [
      { name: 'SimpleTpa', desc: '传送请求（/tpa）' },
      { name: 'TpaGui', desc: '传送请求的图形化界面' },
      { name: 'BlueDream-Guild', desc: '公会系统' },
      { name: 'BlackMarket', desc: '黑市交易玩法' },
      { name: 'EzPlayTime', desc: '在线时长记录与奖励' },
      { name: 'FireworkCreeper', desc: '趣味特效插件' },
    ],
  },
  {
    icon: '✨',
    title: '功能增强',
    plugins: [
      { name: 'GSit', desc: '坐下 / 躺下（对应 /sit）' },
      { name: 'ShiftFCmd', desc: 'Shift+F 快捷菜单（对应快捷键）' },
      { name: 'voicechat', desc: '服务器语音聊天' },
      { name: 'ISeeYou', desc: '特殊观察功能（自定义插件）' },
    ],
  },
  {
    icon: '🔄',
    title: '跨版本兼容',
    plugins: [
      { name: 'ViaVersion', desc: '跨版本兼容（支持 Java 1.12+）' },
      { name: 'ViaBackwards', desc: '低版本回溯兼容' },
    ],
  },
];

/** 插件总数 */
export function pluginTotal() {
  return PLUGIN_CATEGORIES.reduce((sum, cat) => sum + cat.plugins.length, 0);
}
