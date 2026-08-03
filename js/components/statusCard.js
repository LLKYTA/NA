/* ============================================================
   components/statusCard.js — 服务器状态卡
   纯函数：传入状态快照，返回 DOM。可复用于首页 / 服务器信息页。
   ============================================================ */

import { CONFIG } from '../config.js';
import { el, sanitizeMotd, copyText, toast } from '../core/dom.js';

export function statusCard(s, { onRefresh } = {}) {
  const online = s.known && !s.error && s.online;
  const offline = s.known && (s.error || !s.online);
  const loading = !s.known;

  const card = el('div', { class: 'glass status-card' });

  /* ---- 头部：标题 + 状态徽章 ---- */
  const badge = el('span', { class: `status-badge ${online ? 'online' : 'offline'}` }, [
    el('span', { class: 'status-dot', 'aria-hidden': 'true' }),
    el('span', { text: loading ? '查询中…' : online ? '在线' : '离线' }),
  ]);

  card.appendChild(el('div', { class: 'status-head' }, [
    el('div', { class: 'status-title' }, [
      el('img', { class: 'status-icon', src: CONFIG.site.icon, alt: '' }),
      el('span', { text: '服务器状态' }),
    ]),
    badge,
  ]));

  /* ---- 人数 + 进度条 ---- */
  const pct = s.maxPlayers > 0 ? Math.min(100, Math.round((s.players / s.maxPlayers) * 100)) : 0;
  card.appendChild(el('div', { class: 'status-main' }, [
    el('div', {}, [
      el('div', { class: 'player-count' }, [
        el('span', { class: 'cur', text: loading ? '—' : String(s.players) }),
        el('span', { class: 'sep', text: ' / ' }),
        el('span', { class: 'max', text: loading ? '—' : String(s.maxPlayers) }),
      ]),
      el('div', { class: 'count-label', text: loading ? '正在连接服务器…' : '当前在线玩家' }),
      el('div', { class: 'player-bar' }, [
        el('div', { class: 'fill', style: `width:${online ? pct : 0}%` }),
      ]),
    ]),
  ]));

  /* ---- MOTD ---- */
  const motdBox = el('div', { class: 'motd' });
  const motdFrag = sanitizeMotd(s.motdHtml);
  if (motdFrag && motdFrag.childNodes.length) {
    motdBox.appendChild(motdFrag);
  } else {
    motdBox.classList.add('motd-empty');
    motdBox.textContent = offline ? '服务器当前不可连接' : CONFIG.server.motdFallback;
  }
  card.appendChild(motdBox);

  /* ---- 在线玩家名单（服务器开放时才显示） ---- */
  if (online) {
    const names = s.onlinePlayers;
    if (names && names.length > 0) {
      card.appendChild(el('div', { class: 'player-list' }, [
        el('div', { class: 'player-list-title', text: `👥 在线玩家（${names.length}）` }),
        el('div', { class: 'chips' }, names.map((name) => el('span', { class: 'chip player-chip', text: name }))),
      ]));
    } else {
      card.appendChild(el('div', {
        class: 'player-hint',
        text: names === null ? '当前服务器未开放玩家名单显示' : '当前暂无玩家在线',
      }));
    }
  }

  /* ---- 元信息 ---- */
  card.appendChild(el('div', { class: 'status-meta' }, [
    metaItem('版本', s.version || '—'),
    metaItem('地址', CONFIG.server.address),
    metaItem('端口', s.port ? String(s.port) : '—'),
  ]));

  /* ---- 操作按钮 ---- */
  const actions = el('div', { class: 'status-actions' }, [
    el('button', {
      class: 'btn btn-primary btn-sm',
      type: 'button',
      onclick: async () => {
        const ok = await copyText(CONFIG.server.address);
        toast(ok ? `已复制地址 ${CONFIG.server.address}` : '复制失败，请手动复制');
      },
    }, [el('span', { text: '📋 复制地址' })]),

    el('button', {
      class: 'btn btn-ghost btn-sm',
      type: 'button',
      onclick: () => {
        if (typeof onRefresh === 'function') {
          onRefresh();
          toast('正在刷新服务器状态…');
        }
      },
    }, [
      el('span', { class: s.loading ? 'refresh-spin' : '', text: '↻' }),
      el('span', { text: s.loading ? '刷新中' : '刷新' }),
    ]),
  ]);
  card.appendChild(actions);

  return card;
}

function metaItem(key, value) {
  return el('div', { class: 'meta-item' }, [
    el('div', { class: 'k', text: key }),
    el('div', { class: 'v', text: value }),
  ]);
}
