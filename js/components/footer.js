/* ============================================================
   components/footer.js — 页脚
   ============================================================ */

import { CONFIG } from '../config.js';
import { el } from '../core/dom.js';

export function mountFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  footer.innerHTML = '';

  const inner = el('div', { class: 'footer-inner' }, [
    el('div', { class: 'footer-brand' }, [`🌿 ${CONFIG.site.name} · ${CONFIG.site.nameEn}`]),
    el('p', { class: 'muted' }, [CONFIG.site.tagline]),
    el('p', { class: 'muted' }, [
      el('span', { text: '服务器地址：' }),
      el('span', { class: 'mono', text: CONFIG.server.address }),
    ]),
    el('p', { class: 'muted small' }, [`© ${new Date().getFullYear()} ${CONFIG.site.footerNote} · ${CONFIG.server.shortName}`]),
  ]);

  footer.appendChild(inner);
}
