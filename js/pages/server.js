/* ============================================================
   pages/server.js — 服务器信息页 (#/server)
   ============================================================ */

import { CONFIG } from '../config.js';
import { el } from '../core/dom.js';
import { subscribe, refresh } from '../core/api.js';
import { statusCard } from '../components/statusCard.js';
import { pluginTotal } from '../data/plugins.js';

export const server = {
  title: '服务器信息',

  render(container) {
    container.appendChild(el('section', { class: 'page-hero' }, [
      el('h1', { class: 'pixel-title' }, [
        el('span', { class: 'glow-text', text: '服务器信息' }),
      ]),
      el('p', { class: 'sub', text: `自然之域（${CONFIG.server.shortName}）的核心信息与实时状态。` }),
    ]));

    /* ---- 信息卡 ---- */
    const grid = el('section', { class: 'server-grid' });
    grid.appendChild(el('div', { class: 'server-info-grid' }, [
      infoCard('📡', '服务器地址', CONFIG.server.address, true),
      infoCard('🧱', '游戏核心', 'Leaves 1.21.8', false),
      infoCard('💻', '服务器配置', '4核 16G', false),
      infoCard('🎮', '支持版本', 'Java 1.12+', false),
      infoCard('🌏', '服务器类型', '纯净稳定生存服', false),
      infoCard('📅', '开放状态', '长期开放', false),
    ]));
    container.appendChild(grid);

    /* ---- 实时状态 ---- */
    const statusSection = el('section', { class: 'server-grid' });
    const cardHolder = el('div');
    statusSection.appendChild(cardHolder);
    container.appendChild(statusSection);
    this._unsub = subscribe((s) => {
      cardHolder.innerHTML = '';
      cardHolder.appendChild(statusCard(s, { onRefresh: refresh }));
    });

    /* ---- 插件入口 ---- */
    container.appendChild(el('section', { class: 'server-grid' }, [
      el('div', { class: 'glass card' }, [
        el('h3', { text: '🧩 插件生态' }),
        el('p', { class: 'muted', text: `服务器搭载 ${pluginTotal()} 款插件，覆盖登录、安全、领地、聊天与玩法增强。` }),
        el('p', { style: 'margin-top:12px' }, [
          el('a', { class: 'btn btn-ghost btn-sm', href: '#/plugins' }, [
            el('span', { text: '查看插件列表 →' }),
          ]),
        ]),
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

function infoCard(icon, key, value, mono) {
  return el('div', { class: 'glass glass-hover info-card' }, [
    el('div', { class: 'icon', text: icon }),
    el('div', { class: 'k', text: key }),
    el('div', { class: `v${mono ? ' mono' : ''}`, text: value }),
  ]);
}
