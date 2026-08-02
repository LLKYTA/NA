/* ============================================================
   main.js — 应用入口
   装配路由、导航、页脚，启动背景动画与状态轮询。
   ============================================================ */

import { Router } from './core/router.js';
import { startPolling } from './core/api.js';
import { initFireflies } from './core/dom.js';
import { mountNavbar } from './components/navbar.js';
import { mountFooter } from './components/footer.js';

import { home } from './pages/home.js';
import { server } from './pages/server.js';
import { plugins } from './pages/plugins.js';
import { guide } from './pages/guide.js';
import { contact } from './pages/contact.js';

const app = document.getElementById('app');

const navbar = mountNavbar();

/* 新增页面：在这里注册一行即可，导航栏与路由自动接入 */
const router = new Router(
  {
    '/': home,
    '/server': server,
    '/plugins': plugins,
    '/guide': guide,
    '/contact': contact,
  },
  {
    root: app,
    onChange: (path) => navbar.setActive(path),
  }
);

mountFooter();
initFireflies();
router.start();
startPolling();
