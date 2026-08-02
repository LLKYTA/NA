/* ============================================================
   dom.js — DOM 工具：元素创建 / sanitize / 复制 / toast / 背景动画
   ============================================================ */

/**
 * 创建 DOM 元素。
 * attrs 支持：class / text / html(仅已 sanitize) / on*事件 / 其余按属性设置
 */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null) continue;
    if (key === 'class') {
      node.className = value;
    } else if (key === 'text') {
      node.textContent = value;
    } else if (key === 'html') {
      node.innerHTML = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2), value);
    } else if (value === true) {
      node.setAttribute(key, '');
    } else if (value !== false) {
      node.setAttribute(key, value);
    }
  }
  const list = Array.isArray(children) ? children : [children];
  for (const child of list) {
    if (child == null) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

/* ---------------- MOTD 白名单过滤（防 XSS） ---------------- */
const MOTD_ALLOWED = new Set(['SPAN', 'B', 'STRONG', 'I', 'EM', 'U', 'FONT', 'BR']);

/** 仅保留白名单标签与 style 属性，返回 DocumentFragment */
export function sanitizeMotd(html) {
  if (!html) return null;
  const doc = new DOMParser().parseFromString(String(html), 'text/html');

  const walk = (node) => {
    const frag = document.createDocumentFragment();
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        frag.appendChild(document.createTextNode(child.textContent));
        continue;
      }
      if (child.nodeType === Node.ELEMENT_NODE && MOTD_ALLOWED.has(child.tagName)) {
        const clone = document.createElement(child.tagName.toLowerCase());
        if (child.hasAttribute('style')) {
          clone.setAttribute('style', child.getAttribute('style'));
        }
        clone.appendChild(walk(child));
        frag.appendChild(clone);
      }
    }
    return frag;
  };

  return walk(doc.body);
}

/* ---------------- 复制文本 ---------------- */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

/* ---------------- Toast 提示 ---------------- */
let toastTimer = null;

export function toast(message) {
  const node = document.getElementById('toast');
  if (!node) return;
  node.textContent = message;
  node.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('show'), 2200);
}

/* ---------------- 背景萤火/星光 ---------------- */
export function initFireflies(count = 20) {
  const bg = document.getElementById('bg');
  if (!bg) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const fly = document.createElement('span');
    fly.className = 'firefly';
    const dur = 6 + Math.random() * 9;
    fly.style.left = `${Math.random() * 100}%`;
    fly.style.top = `${20 + Math.random() * 75}%`;
    fly.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 180}px`);
    fly.style.setProperty('--drift-y', `${-(50 + Math.random() * 170)}px`);
    fly.style.animationDuration = `${dur}s`;
    fly.style.animationDelay = `${-Math.random() * dur}s`;
    frag.appendChild(fly);
  }
  bg.appendChild(frag);
}
