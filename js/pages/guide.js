/* ============================================================
   pages/guide.js — 入服指引页 (#/guide)
   步骤式命令卡，点击复制指令
   ============================================================ */

import { el, copyText, toast } from '../core/dom.js';

const STEPS = [
  {
    title: '首次注册',
    desc: '进入服务器后，先用密码注册账号（密码输入两次）。',
    cmd: '/register <密码> <密码>',
  },
  {
    title: '登录游戏',
    desc: '注册完成后登录。已注册的玩家每次进服执行此命令。',
    cmd: '/login <密码>',
  },
  {
    title: '召唤假人',
    desc: '需要帮手时，召唤一个假人替你挂机（皮肤可选）。',
    cmd: '/bot create <名称> [皮肤]',
  },
  {
    title: '坐下指令',
    desc: '点击椅子、台阶等方块即可坐下，也可手动执行命令。',
    cmd: '/sit',
  },
  {
    title: '快捷菜单',
    desc: '按住 Shift 再按 F，打开快捷操作菜单。',
    cmd: 'Shift+F',
  },
];

export const guide = {
  title: '入服指引',

  render(container) {
    container.appendChild(el('section', { class: 'page-hero' }, [
      el('h1', { class: 'pixel-title' }, [
        el('span', { class: 'glow-text', text: '入服指引' }),
      ]),
      el('p', { class: 'sub', text: '只需几步，快速开启你的自然之域之旅。点击指令即可复制。' }),
    ]));

    const list = el('div', { class: 'guide-list' });
    STEPS.forEach((step, index) => list.appendChild(stepCard(step, index + 1)));
    container.appendChild(list);

    /* ---- 备注 ---- */
    container.appendChild(el('div', { class: 'guide-list' }, [
      el('div', { class: 'glass guide-note' }, [
        el('span', { class: 'icon', text: '💡' }),
        el('div', {}, [
          el('b', { text: '小提示：' }),
          el('span', { text: '注册后账号将自动保存，下次进入服务器无需再次登录。' }),
        ]),
      ]),
    ]));
  },
};

function stepCard(step, num) {
  const hint = el('span', { class: 'copy-hint', text: '点击复制' });

  const cmdBlock = el('div', {
    class: 'cmd-block',
    role: 'button',
    tabindex: '0',
    title: '点击复制',
    onclick: async () => {
      const ok = await copyText(step.cmd);
      if (ok) {
        hint.textContent = '已复制 ✓';
        setTimeout(() => { hint.textContent = '点击复制'; }, 1600);
      } else {
        toast('复制失败，请手动复制');
      }
    },
  }, [el('code', { text: step.cmd }), hint]);

  // 键盘回车也可复制
  cmdBlock.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cmdBlock.click();
    }
  });

  return el('div', { class: 'glass glass-hover step-card' }, [
    el('div', { class: 'step-num', text: String(num) }),
    el('div', { class: 'step-body' }, [
      el('h3', { text: step.title }),
      el('p', { text: step.desc }),
      cmdBlock,
    ]),
  ]);
}
