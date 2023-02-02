export const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export const minmax = (value: number, min: number, max: number) => Math.max(Math.min(value, max), min);

export const getWindow = (): Window | null => window;

export const toggleItem = <T>(arr: T[], value: T) => (arr.includes(value) ? arr.filter(i => i !== value) : [...arr, value]);

export const enqueueIdleCallback = (callback: () => void, options?: IdleRequestOptions) => {
  const win = getWindow();

  if (win && 'requestIdleCallback' in win) {
    win.requestIdleCallback(callback, options);
  } else {
    setTimeout(callback, options?.timeout + 20);
  }
};

export const findTarget = <R extends T | null, T extends HTMLElement = HTMLElement>(target: T | string, baseElement?: HTMLElement): R => {
  if (target) {
    if (typeof target === 'string') {
      const base = baseElement ?? getWindow()?.document;
      return base.querySelector(target) as R;
    } else {
      return target as R;
    }
  }

  return null;
};

export const findTargets = <E extends HTMLElement, S extends string = string>(
  selector: S,
  baseElement?: HTMLElement,
  traversal: ('child' | 'parent' | 'self')[] = ['child'],
): E[] => {
  const matches: E[] = [];

  const base: HTMLElement = baseElement ?? getWindow()?.document.documentElement;

  if (traversal.includes('child')) {
    matches.push(...Array.from(base.querySelectorAll<E>(selector) ?? []));
  }

  if (traversal.includes('parent')) {
    let searchElement: HTMLElement | null = base;

    while (searchElement !== null) {
      const current = searchElement.closest<E>(selector) ?? null;

      searchElement = current;

      if (searchElement) {
        matches.push(current);
      }
    }
  }

  if (traversal.includes('self')) {
    if (base.matches(selector)) {
      matches.push(base as E);
    }
  }

  return matches;
};

export const toggleAttribute = (element: HTMLElement, name: string) => {
  if (element.hasAttribute(name)) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, '');
  }
};

export const findItemLabel = (componentEl: HTMLElement) => {
  const itemEl = componentEl.closest('my-item');

  if (itemEl) {
    return itemEl.querySelector('my-label');
  }

  return null;
};

export const renderHiddenInput = (always: boolean, container: HTMLElement, name: string, value: string | undefined | null, disabled: boolean) => {
  if (always || hasShadowDom(container)) {
    let input = container.querySelector('input.aux-input') as HTMLInputElement | null;
    if (!input) {
      input = container.ownerDocument!.createElement('input');
      input.type = 'hidden';
      input.classList.add('aux-input');
      container.appendChild(input);
    }
    input.disabled = disabled;
    input.name = name;
    input.value = value || '';
  }
};
export const hasShadowDom = (el: HTMLElement) => {
  return !!el.shadowRoot && !!(el as any).attachShadow;
};

let uniqueIdCount = 0;

export const generateUniqueId = (intensity: number = 0) => {
  const randSeed = parseInt((Math.random() * 10 ** (15 + intensity)).toString())
    .toString(16)
    .toUpperCase();

  return `wid_${++uniqueIdCount}-${Date.now()}-${randSeed}`;
};

export const tryParseJSON = (payload: any): any => {
  if (typeof payload === 'string') {
    try {
      return JSON.parse(payload);
    } catch (e) {}
  }

  return payload;
};

export const focusNextElement = () => {
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

export const preventDefaults = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
};

export const calcSize = (bytes: number) => {
  let sOutput = '';

  const aMultiples = ['KB', 'MB', 'GB', 'TB'];

  for (let nMultiple = 0, nApprox = bytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
    sOutput = `${nApprox.toFixed(2)} ${aMultiples[nMultiple]}`;
  }

  return sOutput;
};

export const getFileListFromFiles = (files: File[]): FileList => {
  const fileInput = new ClipboardEvent('').clipboardData || new DataTransfer();

  const len = files.length;

  for (let i = 0; i < len; i++) {
    fileInput.items.add(files[i]);
  }

  return fileInput.files;
};
