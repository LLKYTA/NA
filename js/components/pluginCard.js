/* ============================================================
   components/pluginCard.js — 插件分类卡
   玻璃卡内展示插件 chips，悬停/点击显示说明；支持搜索过滤。
   ============================================================ */

import { el } from '../core/dom.js';

/** 分类卡。query 传非空字符串时按插件名过滤，全部不匹配则整卡隐藏 */
export function pluginCategoryCard(category, query = '') {
  const q = String(query || '').trim().toLowerCase();
  const card = el('div', { class: 'glass plugin-card glass-hover' });

  card.appendChild(el('h3', {}, [
    el('span', { text: `${category.icon} ${category.title}` }),
    el('span', { class: 'plugin-count', text: `${category.plugins.length} 款` }),
  ]));

  const chips = el('div', { class: 'chips' });
  let visible = 0;
  for (const plugin of category.plugins) {
    const chipNode = chip(plugin);
    const matched = !q || plugin.name.toLowerCase().includes(q);
    chipNode.classList.toggle('hidden', !matched);
    if (matched) visible++;
    chips.appendChild(chipNode);
  }
  card.appendChild(chips);

  if (q && visible === 0) card.classList.add('hidden');
  return card;
}

/* ---------------- 单个插件 chip ---------------- */
function chip(plugin) {
  const node = el('button', {
    class: 'chip',
    type: 'button',
    title: plugin.desc,
  }, [el('span', { text: plugin.name })]);

  node.addEventListener('mouseenter', (e) => showTip(e, plugin.desc));
  node.addEventListener('mousemove', positionTip);
  node.addEventListener('mouseleave', hideTip);
  node.addEventListener('click', (e) => {
    e.stopPropagation();
    showTip(e, plugin.desc);
  });
  return node;
}

/* ---------------- 悬停说明（复用单个全局气泡） ---------------- */
let tip = null;

function ensureTip() {
  if (!tip) {
    tip = el('div', { class: 'chip-tip' });
    tip.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tip);
  }
  return tip;
}

function showTip(e, text) {
  const t = ensureTip();
  t.textContent = text || '暂无说明';
  t.classList.add('show');
  positionTip(e);
}

function positionTip(e) {
  const t = tip;
  if (!t) return;
  const pad = 14;
  const left = Math.min(e.clientX + pad, window.innerWidth - t.offsetWidth - pad);
  const top = Math.max(e.clientY - t.offsetHeight - 12, 10);
  t.style.left = `${left}px`;
  t.style.top = `${top}px`;
}

function hideTip() {
  if (tip) tip.classList.remove('show');
}

// 点击页面其他位置时收起说明气泡
document.addEventListener('click', () => hideTip());
