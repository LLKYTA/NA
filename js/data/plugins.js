/* ============================================================
   data/plugins.js — 插件生态数据
   32 款插件，按功能分类。增删改插件只动这个文件。
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
      { name: 'LiteSignIn', desc: '每日签到系统（GUI 日历签到、连签奖励、排行榜）' },
      { name: 'cyubackup', desc: '玩家背包备份（智能去重 + 原子写入，防物品丢失）' },
      { name: 'eBackup', desc: '服务器自动备份（支持 FTP/SFTP 远程存储）' },
      { name: 'cyuid', desc: '玩家 ID 查询等管理工具（cyu 系列自定义插件）' },
    ],
  },
  {
    icon: '⚙️',
    title: '核心基础',
    plugins: [
      { name: 'Essentials', desc: '基础指令与功能套件（经济、家、传送等）' },
      { name: 'Vault', desc: '经济与权限的前置 API' },
      { name: 'LuckPerms', desc: '权限组管理' },
      { name: 'PlaceholderAPI', desc: '占位符扩展，供其他插件使用' },
      { name: 'CommandAPI', desc: '指令系统开发 API' },
      { name: 'cyutime', desc: '在线时长统计（日/周/月/年，支持跨服同步）' },
    ],
  },
  {
    icon: '💬',
    title: '聊天与界面',
    plugins: [
      { name: 'FxChat', desc: '聊天消息排版与格式优化' },
      { name: 'KazePlayerTitle', desc: '玩家称号系统（称号商店、佩戴与管理）' },
      { name: 'JoinMessage', desc: '进服欢迎消息' },
      { name: 'LHTab', desc: 'Tab 列表与侧边栏管理（全服前缀同步）' },
      { name: 'AMOTD', desc: 'MOTD 定制（渐变色 / MiniMessage / 多图标切换）' },
      { name: 'MoMenu', desc: '自定义菜单 GUI（支持游戏内编辑）' },
      { name: 'NameTag', desc: '头顶名称与前后缀显示（按权限组配置）' },
    ],
  },
  {
    icon: '🧭',
    title: '传送与玩法',
    plugins: [
      { name: 'TpaGui', desc: '传送请求图形界面（选择玩家一键请求）' },
      { name: 'BlueDream-Guild', desc: '公会系统' },
      { name: 'BlackMarket', desc: '动态黑市交易（商品轮换、多货币支付）' },
      { name: 'EzPlayTime', desc: '记录玩家在线时长（日/周/月/总，支持 PAPI）' },
      { name: 'FireworkCreeper', desc: '苦力怕爆炸化作烟花（可自定义颜色与形状）' },
    ],
  },
  {
    icon: '✨',
    title: '功能增强',
    plugins: [
      { name: 'GSit', desc: '坐下 / 躺下（对应 /sit）' },
      { name: 'ShiftFCmd', desc: 'Shift+F 快捷键执行指令（如打开菜单）' },
      { name: 'voicechat', desc: '服务器语音聊天' },
      { name: 'ISeeYou', desc: '玩家行为录制回放（Leaves 专属，管理取证）' },
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
