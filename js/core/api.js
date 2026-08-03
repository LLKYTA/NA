/* ============================================================
   api.js — 服务器状态 API 封装
   职责：请求 / 缓存 / 轮询 / 订阅通知，统一错误处理。
   订阅者通过 subscribe(fn) 拿到最新快照，无需关心来源。
   ============================================================ */

import { CONFIG } from '../config.js';

const state = {
  status: null, // 最近一次成功返回的原始数据
  loading: false,
  error: false,
  lastUpdated: null,
};

const listeners = new Set();
let timer = null;

function buildUrl() {
  const url = new URL(CONFIG.api.endpoint);
  for (const [key, value] of Object.entries(CONFIG.api.params || {})) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

async function fetchStatus() {
  state.loading = true;
  notify();
  try {
    const res = await fetch(buildUrl(), { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.status = data;
    state.error = false;
  } catch {
    // 网络错误 / 非 2xx：保留旧数据，标记 error
    state.error = true;
  } finally {
    state.loading = false;
    state.lastUpdated = Date.now();
    notify();
  }
}

function notify() {
  for (const fn of listeners) fn(getSnapshot());
}

/** 供 UI 使用的只读快照（统一字段名） */
export function getSnapshot() {
  const s = state.status;
  return {
    online: !!s?.online,
    players: s ? Number(s.players) || 0 : 0,
    maxPlayers: s ? Number(s.max_players) || 0 : 0,
    version: s?.version || '',
    ip: s?.ip || '',
    port: s?.port || '',
    motdHtml: s?.motd_html || '',
    /* 在线玩家名单：服务器开放时返回数组，否则为 null */
    onlinePlayers: Array.isArray(s?.online_players)
      ? s.online_players.filter((n) => typeof n === 'string' && n.trim())
      : null,
    loading: state.loading,
    error: state.error,
    known: !!s, // 是否拿到过一次数据
    lastUpdated: state.lastUpdated,
  };
}

/** 订阅状态变化，立即回调一次；返回取消订阅函数 */
export function subscribe(fn) {
  listeners.add(fn);
  fn(getSnapshot());
  return () => listeners.delete(fn);
}

/** 手动刷新（返回 Promise 便于调用方处理） */
export function refresh() {
  return fetchStatus();
}

/** 启动轮询：立即拉取一次，之后按配置间隔刷新 */
export function startPolling() {
  if (timer) return;
  fetchStatus();
  timer = setInterval(fetchStatus, CONFIG.api.pollInterval);
}

export function stopPolling() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
