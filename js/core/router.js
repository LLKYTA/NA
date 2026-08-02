/* ============================================================
   router.js — 简易 Hash 路由
   页面模块统一签名：{ title, render(container), onMount?, onDestroy? }
   ============================================================ */

import { CONFIG } from '../config.js';

export class Router {
  /**
   * @param {Object} routes       路径 -> 页面模块，如 { '/': home, '/guide': guide }
   * @param {Object} [opts]
   * @param {HTMLElement} opts.root   页面挂载点
   * @param {Function}  opts.onChange 路由变化回调（接收归一化后的路径）
   */
  constructor(routes, { root, onChange } = {}) {
    this.routes = routes;
    this.root = root;
    this.onChange = onChange;
    this.path = null;
    this.page = null;
    window.addEventListener('hashchange', () => this.navigate());
  }

  normalizePath(hash) {
    let p = String(hash || '').replace(/^#/, '').trim() || '/';
    if (!p.startsWith('/')) p = `/${p}`;
    p = p.replace(/\/+$/, '') || '/';
    return p;
  }

  resolvePath(path) {
    return this.routes[path] || this.routes[`${path}/`] || this.routes['/'];
  }

  navigate() {
    const path = this.normalizePath(location.hash);
    if (path === this.path) return;
    this.path = path;

    const page = this.resolvePath(path);

    // 卸载上一页，清理副作用（定时器、订阅等）
    if (this.page && typeof this.page.onDestroy === 'function') {
      this.page.onDestroy();
    }
    this.page = page;

    this.root.innerHTML = '';
    const view = document.createElement('div');
    view.className = 'page';
    this.root.appendChild(view);

    document.title = page.title
      ? `${page.title} · ${CONFIG.site.name}`
      : CONFIG.site.name;

    page.render(view);
    if (typeof page.onMount === 'function') page.onMount(view);

    if (this.onChange) this.onChange(path);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  /** 编程式跳转 */
  go(path) {
    const target = `#${path}`;
    if (location.hash === target) this.navigate();
    else location.hash = target;
  }

  /** 启动：若无 hash 则落到首页并渲染 */
  start() {
    if (!location.hash) {
      history.replaceState(null, '', '#/');
    }
    this.navigate();
  }
}
