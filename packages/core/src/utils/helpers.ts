import { getWindow } from './environment';

export const findTarget = <R extends T | null, T extends HTMLElement>(target: T | string) => {
  if (target) {
    if (typeof target === 'string') {
      return getWindow()?.document.querySelector(target) as R;
    } else {
      return target as R;
    }
  }

  return null;
};

export const toggleAttribute = (element: HTMLElement, name: string) => {
  if (element.hasAttribute(name)) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, '');
  }
};
