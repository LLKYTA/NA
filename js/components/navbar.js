/* ============================================================
   components/navbar.js — 顶部导航栏
   包含：Logo、导航链接、在线状态胶囊、复制地址按钮、移动端菜单
   ============================================================ */

import { CONFIG } from '../config.js';
import { subscribe, refresh } from '../core/api.js';
import { el, copyText, toast } from '../core/dom.js';

export function mountNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return { setActive() {}, destroy() {} };
  navbar.innerHTML = '';

  /* ---- Logo ---- */
  const brand = el('a', { class: 'nav-brand', href: '#/', 'aria-label': `${CONFIG.site.name} 首页` }, [
    el('span', { class: 'pixel-block', 'aria-hidden': 'true' }, [
      el('span', { class: 'g1' }),
      el('span', { class: 'g2' }),
      el('span', { class: 'g3' }),
      el('span', { class: 'g4' }),
    ]),
    el('span', { text: CONFIG.site.name }),
    el('span', { class: 'sub', text: CONFIG.site.nameEn.toUpperCase() }),
  ]);

  /* ---- 导航链接 ---- */
  const links = el('ul', { class: 'nav-links' });
  const linkMap = {};
  for (const item of CONFIG.nav) {
    const a = el('a', { href: `#${item.path}`, text: item.label });
    linkMap[item.path] = a;
    links.appendChild(el('li', {}, a));
  }

  /* ---- 右侧操作区 ---- */
  const pillText = el('span', { class: 'pill-text', text: '查询中…' });
  const statusPill = el('button', {
    class: 'status-pill',
    type: 'button',
    title: '点击刷新服务器状态',
    onclick: () => { refresh(); toast('正在刷新服务器状态…'); },
  }, [
    el('span', { class: 'status-dot' }),
    pillText,
  ]);

  const copyBtn = el('button', {
    class: 'btn btn-ghost btn-sm',
    type: 'button',
    onclick: async () => {
      const ok = await copyText(CONFIG.server.address);
      toast(ok ? `已复制地址 ${CONFIG.server.address}` : '复制失败，请手动复制');
    },
  }, [el('span', { text: '复制地址' })]);

  const actions = el('div', { class: 'nav-actions' }, [statusPill, copyBtn]);

  /* ---- 移动端汉堡按钮 ---- */
  const toggle = el('button', {
    class: 'nav-toggle',
    type: 'button',
    'aria-label': '打开菜单',
    'aria-expanded': 'false',
    onclick: () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    },
  }, [el('span'), el('span'), el('span')]);

  navbar.append(brand, links, actions, toggle);

  /* ---- 滚动加深 ---- */
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- 路由联动：高亮当前页 + 关闭移动端菜单 ---- */
  function setActive(path) {
    for (const [p, a] of Object.entries(linkMap)) {
      a.classList.toggle('active', p === path);
    }
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  /* ---- 在线状态订阅 ---- */
  const unsub = subscribe((s) => {
    const online = s.known && !s.error && s.online;
    const offline = !online;
    statusPill.classList.toggle('online', online);
    statusPill.classList.toggle('offline', offline);

    if (s.loading && !s.known) {
      pillText.textContent = '查询中…';
    } else if (s.error || !s.online) {
      pillText.textContent = '离线';
    } else {
      pillText.textContent = `在线 ${s.players}/${s.maxPlayers}`;
    }
  });

  return {
    setActive,
    destroy() {
      unsub();
      window.removeEventListener('scroll', onScroll);
    },
  };
}
