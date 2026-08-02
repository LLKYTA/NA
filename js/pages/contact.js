/* ============================================================
   pages/contact.js — 联系方式页 (#/contact)
   地址 / 管理组 / 开放状态，不虚构未提供的外部联系方式
   ============================================================ */

import { CONFIG } from '../config.js';
import { el, copyText, toast } from '../core/dom.js';

export const contact = {
  title: '联系方式',

  render(container) {
    container.appendChild(el('section', { class: 'page-hero' }, [
      el('h1', { class: 'pixel-title' }, [
        el('span', { class: 'glow-text', text: '联系方式' }),
      ]),
      el('p', { class: 'sub', text: '长期开放，欢迎加入自然之域（NA）。' }),
    ]));

    container.appendChild(el('section', { class: 'contact-grid' }, [
      contactCard('📡', '服务器地址', [
        el('div', { class: 'mono', text: CONFIG.server.address }),
        el('p', { text: 'Java 版直接添加服务器即可进入' }),
      ], {
        label: '复制地址',
        onclick: async () => {
          const ok = await copyText(CONFIG.server.address);
          toast(ok ? `已复制地址 ${CONFIG.server.address}` : '复制失败，请手动复制');
        },
      }),
      contactCard('🤝', '管理组', [
        el('p', { text: '自然之域管理组' }),
        el('p', { text: '疑问或建议请联系游戏内管理员' }),
      ]),
      contactCard('🏠', '开放状态', [
        el('p', { text: '长期开放 · 随时欢迎' }),
        el('p', { text: '纯净稳定生存服，等你来探索' }),
      ]),
    ]));

    /* ---- QQ 交流群 ---- */
    const qq = CONFIG.contact.qqGroup;
    const qqActions = [];
    if (qq.joinLink) {
      qqActions.push(el('button', {
        class: 'btn btn-primary',
        type: 'button',
        onclick: () => window.open(qq.joinLink, '_blank', 'noopener'),
      }, [el('span', { text: '🚀 一键加群' })]));
    }
    qqActions.push(el('button', {
      class: 'btn btn-ghost',
      type: 'button',
      onclick: async () => {
        const ok = await copyText(qq.number);
        toast(ok ? `已复制群号 ${qq.number}` : '复制失败，请手动复制');
      },
    }, [el('span', { text: '📋 复制群号' })]));

    container.appendChild(el('section', { class: 'server-grid' }, [
      el('div', { class: 'glass card', style: 'text-align:center;padding:34px 24px' }, [
        el('h2', { class: 'pixel-title', text: '💬 QQ 交流群' }),
        el('p', { class: 'muted', style: 'margin:10px 0 20px' }, [
          '群号：',
          el('span', { class: 'mono', text: qq.number }),
        ]),
        el('div', { class: 'home-cta', style: 'margin-top:0' }, qqActions),
        el('p', {
          class: 'muted small',
          style: 'margin-top:14px',
          text: qq.joinLink ? '点击「一键加群」即可加入' : '加群链接尚未配置：请先在 QQ 内搜索群号加入，或联系管理员生成加群链接',
        }),
      ]),
    ]));

    /* ---- 服务器管理人员 ---- */
    container.appendChild(el('section', { class: 'server-grid' }, [
      el('div', { class: 'staff-head' }, [
        el('h2', { class: 'pixel-title', text: '👥 服务器管理人员' }),
        el('div', { class: 'sub muted', text: '疑问或建议，可随时联系他们' }),
      ]),
      el('div', { class: 'staff-grid' }, CONFIG.staff.map(staffCard)),
    ]));

    /* ---- 底部欢迎横幅 ---- */
    container.appendChild(el('section', { class: 'server-grid' }, [
      el('div', { class: 'glass card', style: 'text-align:center;padding:38px 24px' }, [
        el('h2', { class: 'pixel-title', text: '🌿 欢迎加入自然之域' }),
        el('p', { class: 'muted', style: 'margin:12px 0 20px' }, [
          `服务器地址：`,
          el('span', { class: 'mono', text: CONFIG.server.address }),
          `（简称 ${CONFIG.server.shortName}）`,
        ]),
        el('div', { class: 'home-cta', style: 'margin-top:0' }, [
          el('button', {
            class: 'btn btn-primary',
            type: 'button',
            onclick: async () => {
              const ok = await copyText(CONFIG.server.address);
              toast(ok ? `已复制地址 ${CONFIG.server.address}` : '复制失败，请手动复制');
            },
          }, [el('span', { text: '📋 复制地址' })]),
          el('a', { class: 'btn btn-ghost', href: '#/guide' }, [el('span', { text: '查看入服指引 →' })]),
        ]),
      ]),
    ]));
  },
};

function contactCard(icon, title, body, action) {
  return el('div', { class: 'glass glass-hover contact-card' }, [
    el('div', { class: 'icon', text: icon }),
    el('h3', { text: title }),
    ...body,
    ...(action
      ? [el('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: action.onclick }, [el('span', { text: action.label })])]
      : []),
  ]);
}

function staffCard(staff) {
  const roleClass = staff.role === '服主' ? 'role-owner' : 'role-admin';
  return el('div', { class: 'glass glass-hover staff-card' }, [
    el('span', { class: `staff-role ${roleClass}`, text: staff.role }),
    el('div', { class: 'staff-id', text: staff.id }),
    el('div', { class: 'staff-qq' }, [
      el('span', { text: 'QQ：' }),
      el('span', { class: 'mono', text: staff.qqName }),
    ]),
  ]);
}
