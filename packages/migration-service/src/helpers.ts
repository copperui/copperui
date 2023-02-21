import { render } from 'https://esm.sh/dom-serializer@2.0.0';
import { Document, Element } from 'https://esm.sh/domhandler@5.0.3';
import * as htmlparser2 from 'https://esm.sh/htmlparser2@8.0.1';

export const parseClassNames = (incomingClassNames: string | null) => {
  const classNames = (incomingClassNames ?? '').trim().split(' ');
  return Array.from(new Set(classNames)).join(' ');
};

export const setClass = (element: Element, incomingClassNames: string) => {
  const classNames = parseClassNames(incomingClassNames);

  if (incomingClassNames.length > 0) {
    element.attribs.class = classNames;
  } else {
    delete element.attribs.class;
  }
};

export const addClass = (element: Element, className: string) => {
  const currentClassNames = parseClassNames(element.attribs.class);
  setClass(element, `${currentClassNames} ${className}`);
};

export const removeClass = (element: Element, className: string) => {
  const currentClassNames = parseClassNames(element.attribs.class);

  const classNames = currentClassNames
    .split(' ')
    .filter((name) => name !== className)
    .join(' ');

  setClass(element, classNames);
};

export const hasClass = (element: Element, className: string) => {
  const currentClassNames = parseClassNames(element.attribs.class);
  return currentClassNames.split(' ').includes(className);
};

export const renderDocument = (doc: Document | Element) =>
  render(doc, { selfClosingTags: true, xmlMode: false, encodeEntities: false });

export const parseDocument = (htmlString: string) => {
  return htmlparser2.parseDocument(htmlString, { xmlMode: true, decodeEntities: false });
};
