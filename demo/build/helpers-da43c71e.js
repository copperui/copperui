const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const minmax = (value, min, max) => Math.max(Math.min(value, max), min);
const getWindow = () => window;
const toggleItem = (arr, value) => (arr.includes(value) ? arr.filter(i => i !== value) : [...arr, value]);
const castArray = (arr) => (Array.isArray(arr) ? arr : [arr]);
const enqueueIdleCallback = (callback, options) => {
  const win = getWindow();
  if (win && 'requestIdleCallback' in win) {
    win.requestIdleCallback(callback, options);
  }
  else {
    setTimeout(callback, (options === null || options === void 0 ? void 0 : options.timeout) + 1);
  }
};
const isDirectChild = (parent, node) => Array.from(parent.childNodes).findIndex(i => i === node) !== -1;
const findTarget = (target, baseElement) => {
  var _a;
  if (target) {
    if (typeof target === 'string') {
      const base = baseElement !== null && baseElement !== void 0 ? baseElement : (_a = getWindow()) === null || _a === void 0 ? void 0 : _a.document;
      return base.querySelector(target);
    }
    else {
      return target;
    }
  }
  return null;
};
const findTargets = (selector, baseElement, traversal = ['child']) => {
  var _a, _b, _c;
  const matches = [];
  const base = baseElement !== null && baseElement !== void 0 ? baseElement : (_a = getWindow()) === null || _a === void 0 ? void 0 : _a.document.documentElement;
  if (traversal.includes('child')) {
    matches.push(...Array.from((_b = base.querySelectorAll(selector)) !== null && _b !== void 0 ? _b : []));
  }
  if (traversal.includes('parent')) {
    let searchElement = base;
    while (searchElement !== null) {
      const current = (_c = searchElement.closest(selector)) !== null && _c !== void 0 ? _c : null;
      searchElement = current;
      if (searchElement) {
        matches.push(current);
      }
    }
  }
  if (traversal.includes('self')) {
    if (base.matches(selector)) {
      matches.push(base);
    }
  }
  return matches;
};
const toggleAttribute = (element, name) => {
  if (element.hasAttribute(name)) {
    element.removeAttribute(name);
  }
  else {
    element.setAttribute(name, '');
  }
};
const findItemLabel = (componentEl) => {
  const itemEl = componentEl.closest('my-item');
  if (itemEl) {
    return itemEl.querySelector('my-label');
  }
  return null;
};
const renderHiddenInput = (always, container, name, value, disabled) => {
  if (always || hasShadowDom(container)) {
    let input = container.querySelector('input.aux-input');
    if (!input) {
      input = container.ownerDocument.createElement('input');
      input.type = 'hidden';
      input.classList.add('aux-input');
      container.appendChild(input);
    }
    input.disabled = disabled;
    input.name = name;
    input.value = value || '';
  }
};
const hasShadowDom = (el) => {
  return !!el.shadowRoot && !!el.attachShadow;
};
let uniqueIdCount = 0;
const generateUniqueId = (intensity = 0) => {
  const randSeed = parseInt((Math.random() * 10 ** (15 + intensity)).toString())
    .toString(16)
    .toUpperCase();
  return `wid_${++uniqueIdCount}-${Date.now()}-${randSeed}`;
};
const tryParseJSON = (payload) => {
  if (typeof payload === 'string') {
    try {
      return JSON.parse(payload);
    }
    catch (e) { }
  }
  return payload;
};
const focusNextElement = () => {
  //lista de elementos que desejamos focar
  const focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
  if (document.activeElement) {
    const focussable = Array.prototype.filter.call(document.body.querySelectorAll(focussableElements), element => {
      // testa a visibilidade e inclui o elemento ativo
      return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement;
    });
    const index = focussable.indexOf(document.activeElement);
    if (index > -1) {
      const nextElement = focussable[index + 1] || focussable[0];
      nextElement.focus();
    }
  }
};
const preventDefaults = (event) => {
  event.preventDefault();
  event.stopPropagation();
};
const calcSize = (bytes) => {
  let sOutput = '';
  const aMultiples = ['KB', 'MB', 'GB', 'TB'];
  for (let nMultiple = 0, nApprox = bytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
    sOutput = `${nApprox.toFixed(2)} ${aMultiples[nMultiple]}`;
  }
  return sOutput;
};
const getFileListFromFiles = (files) => {
  const fileInput = new ClipboardEvent('').clipboardData || new DataTransfer();
  const len = files.length;
  for (let i = 0; i < len; i++) {
    fileInput.items.add(files[i]);
  }
  return fileInput.files;
};

export { generateUniqueId as a, findTarget as b, castArray as c, toggleItem as d, enqueueIdleCallback as e, findTargets as f, getWindow as g, getFileListFromFiles as h, calcSize as i, minmax as m, preventDefaults as p, tryParseJSON as t, wait as w };
