export const getWindow = (): Window | null => window;

export const enqueueIdleCallback = (callback: () => void, options?: IdleRequestOptions) => {
  const win = getWindow();

  if (win && 'requestIdleCallback' in win) {
    win.requestIdleCallback(callback, options);
  } else {
    setTimeout(callback, options?.timeout + 20);
  }
};

export const findTarget = <R extends T | null, T extends HTMLElement = HTMLElement>(target: T | string): R => {
  if (target) {
    if (typeof target === 'string') {
      return getWindow()?.document.querySelector(target) as R;
    } else {
      return target as R;
    }
  }

  return null;
};

export const findTargets = <E extends Element, S extends string = string>(selector: S): E[] => {
  return Array.from(getWindow()?.document.querySelectorAll(selector) ?? []);
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

export const generateUniqueId = async (): Promise<string> => {
  const { nanoid } = await import('nanoid');
  return `gid_${nanoid()}`;
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
