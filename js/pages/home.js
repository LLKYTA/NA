/* ============================================================
   pages/home.js — 首页 (#/)
   Hero + 实时状态卡 + 服务器信息速览 + 特色入口
   ============================================================ */

import { CONFIG } from '../config.js';
import { el, copyText, toast } from '../core/dom.js';
import { subscribe, refresh } from '../core/api.js';
import { statusCard } from '../components/statusCard.js';
import { pluginTotal } from '../data/plugins.js';

export const home = {
  title: '首页',

  render(container) {
    /* ---- Hero ---- */
    container.appendChild(el('section', { class: 'hero' }, [
      el('div', { class: 'kicker', text: 'NatureArea' }),
      el('img', {
        class: 'hero-icon',
        src: CONFIG.site.icon,
        alt: `${CONFIG.site.name} 服务器图标`,
      }),
      el('h1', { class: 'pixel-title' }, [
        el('span', { class: 'glow-text', text: '自然之域' }),
        el('span', { text: ' · NatureArea' }),
      ]),
      el('p', { class: 'tagline', text: CONFIG.site.tagline }),
      el('div', { class: 'badges' }, [
        heroBadge('⛏️', '玩法', '纯净生存'),
        heroBadge('🚀', '核心', 'Leaves 1.21.8'),
        heroBadge('🎮', '版本', 'Java 1.12+'),
        heroBadge('💻', '配置', '4核 16G'),
        heroBadge('🌏', '地址', CONFIG.server.address),
      ]),
    ]));

    /* ---- 状态卡 + 速览 ---- */
    const statusWrap = el('section', { class: 'home-status' });
    const cardHolder = el('div');
    statusWrap.appendChild(cardHolder);
    statusWrap.appendChild(el('div', { class: 'quick-cards' }, [
      quickCard('📡', '服务器地址', CONFIG.server.address),
      quickCard('🧱', '游戏核心', 'Leaves 1.21.8 · Java 1.12+'),
      quickCard('⚙️', '服务器配置', '4核 16G · 纯净稳定'),
    ]));
    container.appendChild(statusWrap);

    // 实时刷新状态卡（仅更新卡片区域，不重渲染整页）
    this._unsub = subscribe((s) => {
      cardHolder.innerHTML = '';
      cardHolder.appendChild(statusCard(s, { onRefresh: refresh }));
    });

    /* ---- CTA ---- */
    container.appendChild(el('section', { class: 'home-cta' }, [
      el('a', { class: 'btn btn-primary', href: '#/guide' }, [el('span', { text: '🚀 开始游玩' })]),
      el('button', {
        class: 'btn btn-ghost',
        type: 'button',
        onclick: async () => {
          const ok = await copyText(CONFIG.server.address);
          toast(ok ? `已复制地址 ${CONFIG.server.address}` : '复制失败，请手动复制');
        },
      }, [el('span', { text: '📋 复制服务器地址' })]),
    ]));

    /* ---- 特色入口 ---- */
    container.appendChild(el('section', { class: 'section' }, [
      el('div', { class: 'section-head' }, [
        el('span', { class: 'icon', text: '🌿' }),
        el('div', {}, [
          el('h2', { text: '走进自然之域' }),
          el('div', { class: 'sub', text: '稳定纯净的生存体验，从这里开始' }),
        ]),
      ]),
      el('div', { class: 'grid grid-3' }, [
        entryCard('🧩', '插件生态', `${pluginTotal()} 款插件：登录、领地、聊天、玩法增强一应俱全。`, '#/plugins'),
        entryCard('📖', '入服指引', '三步注册登录，快速上手服务器玩法。', '#/guide'),
        entryCard('💬', '联系方式', '长期开放，疑问或建议随时反馈。', '#/contact'),
      ]),
    ]));
  },

  onDestroy() {
    if (this._unsub) {
      this._unsub();
      this._unsub = null;
    }
  },
};

function heroBadge(icon, label, value) {
  return el('span', { class: 'hero-badge' }, [
    el('span', { text: `${icon} ` }),
    el('span', { text: `${label}：` }),
    el('b', { text: value }),
  ]);
}

function quickCard(icon, title, value) {
  return el('div', { class: 'glass glass-hover quick-card' }, [
    el('span', { class: 'quick-icon', text: icon }),
    el('div', {}, [el('h4', { text: title }), el('div', { class: 'v', text: value })]),
  ]);
}

function entryCard(icon, title, desc, href) {
  return el('a', { class: 'glass glass-hover card', href }, [
    el('h3', {}, [el('span', { text: `${icon} ${title}` })]),
    el('p', { class: 'muted small', text: desc }),
    el('p', { class: 'small', text: '查看详情 →' }),
  ]);
}
