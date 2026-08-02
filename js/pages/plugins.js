/* ============================================================
   pages/plugins.js — 插件生态页 (#/plugins)
   分类玻璃卡 + 实时搜索过滤
   ============================================================ */

import { el } from '../core/dom.js';
import { PLUGIN_CATEGORIES, pluginTotal } from '../data/plugins.js';
import { pluginCategoryCard } from '../components/pluginCard.js';

export const plugins = {
  title: '插件生态',

  render(container) {
    container.appendChild(el('section', { class: 'page-hero' }, [
      el('h1', { class: 'pixel-title' }, [
        el('span', { class: 'glow-text', text: '插件生态' }),
      ]),
      el('p', { class: 'sub', text: `服务器共搭载 ${pluginTotal()} 款插件，按功能分类，悬停可查看说明。` }),
    ]));

    /* ---- 搜索工具栏 ---- */
    const toolbar = el('div', { class: 'plugins-toolbar' }, [
      el('div', { class: 'search' }, [
        el('span', { text: '🔍' }),
        el('input', { type: 'search', placeholder: '搜索插件名…', 'aria-label': '搜索插件' }),
      ]),
    ]);
    container.appendChild(toolbar);

    /* ---- 分类卡 ---- */
    const grid = el('div', { class: 'plugins-grid' });
    const empty = el('div', { class: 'plugin-empty', text: '没有找到匹配的插件' });
    container.appendChild(grid);

    function paint(query) {
      grid.innerHTML = '';
      let anyVisible = false;
      for (const cat of PLUGIN_CATEGORIES) {
        const card = pluginCategoryCard(cat, query);
        grid.appendChild(card);
        if (!card.classList.contains('hidden')) anyVisible = true;
      }
      empty.style.display = anyVisible ? 'none' : 'block';
      grid.appendChild(empty);
    }

    paint('');

    const input = toolbar.querySelector('input');
    input.addEventListener('input', (e) => paint(e.target.value));
  },
};
