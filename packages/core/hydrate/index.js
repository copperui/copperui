'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*!
 Stencil Mock Doc v2.20.0 | MIT Licensed | https://stenciljs.com
 */
const CONTENT_REF_ID = 'r';
const ORG_LOCATION_ID = 'o';
const SLOT_NODE_ID = 's';
const TEXT_NODE_ID = 't';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

const attrHandler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }
    if (typeof prop !== 'symbol' && !isNaN(prop)) {
      return obj.__items[prop];
    }
    return undefined;
  },
};
const createAttributeProxy = (caseInsensitive) => new Proxy(new MockAttributeMap(caseInsensitive), attrHandler);
class MockAttributeMap {
  constructor(caseInsensitive = false) {
    this.caseInsensitive = caseInsensitive;
    this.__items = [];
  }
  get length() {
    return this.__items.length;
  }
  item(index) {
    return this.__items[index] || null;
  }
  setNamedItem(attr) {
    attr.namespaceURI = null;
    this.setNamedItemNS(attr);
  }
  setNamedItemNS(attr) {
    if (attr != null && attr.value != null) {
      attr.value = String(attr.value);
    }
    const existingAttr = this.__items.find((a) => a.name === attr.name && a.namespaceURI === attr.namespaceURI);
    if (existingAttr != null) {
      existingAttr.value = attr.value;
    }
    else {
      this.__items.push(attr);
    }
  }
  getNamedItem(attrName) {
    if (this.caseInsensitive) {
      attrName = attrName.toLowerCase();
    }
    return this.getNamedItemNS(null, attrName);
  }
  getNamedItemNS(namespaceURI, attrName) {
    namespaceURI = getNamespaceURI(namespaceURI);
    return (this.__items.find((attr) => attr.name === attrName && getNamespaceURI(attr.namespaceURI) === namespaceURI) || null);
  }
  removeNamedItem(attr) {
    this.removeNamedItemNS(attr);
  }
  removeNamedItemNS(attr) {
    for (let i = 0, ii = this.__items.length; i < ii; i++) {
      if (this.__items[i].name === attr.name && this.__items[i].namespaceURI === attr.namespaceURI) {
        this.__items.splice(i, 1);
        break;
      }
    }
  }
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => ({
        done: i === this.length,
        value: this.item(i++),
      }),
    };
  }
  get [Symbol.toStringTag]() {
    return 'MockAttributeMap';
  }
}
function getNamespaceURI(namespaceURI) {
  return namespaceURI === XLINK_NS ? null : namespaceURI;
}
function cloneAttributes(srcAttrs, sortByName = false) {
  const dstAttrs = new MockAttributeMap(srcAttrs.caseInsensitive);
  if (srcAttrs != null) {
    const attrLen = srcAttrs.length;
    if (sortByName && attrLen > 1) {
      const sortedAttrs = [];
      for (let i = 0; i < attrLen; i++) {
        const srcAttr = srcAttrs.item(i);
        const dstAttr = new MockAttr(srcAttr.name, srcAttr.value, srcAttr.namespaceURI);
        sortedAttrs.push(dstAttr);
      }
      sortedAttrs.sort(sortAttributes).forEach((attr) => {
        dstAttrs.setNamedItemNS(attr);
      });
    }
    else {
      for (let i = 0; i < attrLen; i++) {
        const srcAttr = srcAttrs.item(i);
        const dstAttr = new MockAttr(srcAttr.name, srcAttr.value, srcAttr.namespaceURI);
        dstAttrs.setNamedItemNS(dstAttr);
      }
    }
  }
  return dstAttrs;
}
function sortAttributes(a, b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}
class MockAttr {
  constructor(attrName, attrValue, namespaceURI = null) {
    this._name = attrName;
    this._value = String(attrValue);
    this._namespaceURI = namespaceURI;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = String(value);
  }
  get nodeName() {
    return this._name;
  }
  set nodeName(value) {
    this._name = value;
  }
  get nodeValue() {
    return this._value;
  }
  set nodeValue(value) {
    this._value = String(value);
  }
  get namespaceURI() {
    return this._namespaceURI;
  }
  set namespaceURI(namespaceURI) {
    this._namespaceURI = namespaceURI;
  }
}

class MockClassList {
  constructor(elm) {
    this.elm = elm;
  }
  add(...classNames) {
    const clsNames = getItems(this.elm);
    let updated = false;
    classNames.forEach((className) => {
      className = String(className);
      validateClass(className);
      if (clsNames.includes(className) === false) {
        clsNames.push(className);
        updated = true;
      }
    });
    if (updated) {
      this.elm.setAttributeNS(null, 'class', clsNames.join(' '));
    }
  }
  remove(...classNames) {
    const clsNames = getItems(this.elm);
    let updated = false;
    classNames.forEach((className) => {
      className = String(className);
      validateClass(className);
      const index = clsNames.indexOf(className);
      if (index > -1) {
        clsNames.splice(index, 1);
        updated = true;
      }
    });
    if (updated) {
      this.elm.setAttributeNS(null, 'class', clsNames.filter((c) => c.length > 0).join(' '));
    }
  }
  contains(className) {
    className = String(className);
    return getItems(this.elm).includes(className);
  }
  toggle(className) {
    className = String(className);
    if (this.contains(className) === true) {
      this.remove(className);
    }
    else {
      this.add(className);
    }
  }
  get length() {
    return getItems(this.elm).length;
  }
  item(index) {
    return getItems(this.elm)[index];
  }
  toString() {
    return getItems(this.elm).join(' ');
  }
}
function validateClass(className) {
  if (className === '') {
    throw new Error('The token provided must not be empty.');
  }
  if (/\s/.test(className)) {
    throw new Error(`The token provided ('${className}') contains HTML space characters, which are not valid in tokens.`);
  }
}
function getItems(elm) {
  const className = elm.getAttribute('class');
  if (typeof className === 'string' && className.length > 0) {
    return className
      .trim()
      .split(' ')
      .filter((c) => c.length > 0);
  }
  return [];
}

class MockCSSStyleDeclaration {
  constructor() {
    this._styles = new Map();
  }
  setProperty(prop, value) {
    prop = jsCaseToCssCase(prop);
    if (value == null || value === '') {
      this._styles.delete(prop);
    }
    else {
      this._styles.set(prop, String(value));
    }
  }
  getPropertyValue(prop) {
    prop = jsCaseToCssCase(prop);
    return String(this._styles.get(prop) || '');
  }
  removeProperty(prop) {
    prop = jsCaseToCssCase(prop);
    this._styles.delete(prop);
  }
  get length() {
    return this._styles.size;
  }
  get cssText() {
    const cssText = [];
    this._styles.forEach((value, prop) => {
      cssText.push(`${prop}: ${value};`);
    });
    return cssText.join(' ').trim();
  }
  set cssText(cssText) {
    if (cssText == null || cssText === '') {
      this._styles.clear();
      return;
    }
    cssText.split(';').forEach((rule) => {
      rule = rule.trim();
      if (rule.length > 0) {
        const splt = rule.split(':');
        if (splt.length > 1) {
          const prop = splt[0].trim();
          const value = splt.slice(1).join(':').trim();
          if (prop !== '' && value !== '') {
            this._styles.set(jsCaseToCssCase(prop), value);
          }
        }
      }
    });
  }
}
function createCSSStyleDeclaration() {
  return new Proxy(new MockCSSStyleDeclaration(), cssProxyHandler);
}
const cssProxyHandler = {
  get(cssStyle, prop) {
    if (prop in cssStyle) {
      return cssStyle[prop];
    }
    prop = cssCaseToJsCase(prop);
    return cssStyle.getPropertyValue(prop);
  },
  set(cssStyle, prop, value) {
    if (prop in cssStyle) {
      cssStyle[prop] = value;
    }
    else {
      cssStyle.setProperty(prop, value);
    }
    return true;
  },
};
function cssCaseToJsCase(str) {
  // font-size to fontSize
  if (str.length > 1 && str.includes('-') === true) {
    str = str
      .toLowerCase()
      .split('-')
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join('');
    str = str.slice(0, 1).toLowerCase() + str.slice(1);
  }
  return str;
}
function jsCaseToCssCase(str) {
  // fontSize to font-size
  if (str.length > 1 && str.includes('-') === false && /[A-Z]/.test(str) === true) {
    str = str
      .replace(/([A-Z])/g, (g) => ' ' + g[0])
      .trim()
      .replace(/ /g, '-')
      .toLowerCase();
  }
  return str;
}

class MockCustomElementRegistry {
  constructor(win) {
    this.win = win;
  }
  define(tagName, cstr, options) {
    if (tagName.toLowerCase() !== tagName) {
      throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': "${tagName}" is not a valid custom element name`);
    }
    if (this.__registry == null) {
      this.__registry = new Map();
    }
    this.__registry.set(tagName, { cstr, options });
    if (this.__whenDefined != null) {
      const whenDefinedResolveFns = this.__whenDefined.get(tagName);
      if (whenDefinedResolveFns != null) {
        whenDefinedResolveFns.forEach((whenDefinedResolveFn) => {
          whenDefinedResolveFn();
        });
        whenDefinedResolveFns.length = 0;
        this.__whenDefined.delete(tagName);
      }
    }
    const doc = this.win.document;
    if (doc != null) {
      const hosts = doc.querySelectorAll(tagName);
      hosts.forEach((host) => {
        if (upgradedElements.has(host) === false) {
          tempDisableCallbacks.add(doc);
          const upgradedCmp = createCustomElement(this, doc, tagName);
          for (let i = 0; i < host.childNodes.length; i++) {
            const childNode = host.childNodes[i];
            childNode.remove();
            upgradedCmp.appendChild(childNode);
          }
          tempDisableCallbacks.delete(doc);
          if (proxyElements.has(host)) {
            proxyElements.set(host, upgradedCmp);
          }
        }
        fireConnectedCallback(host);
      });
    }
  }
  get(tagName) {
    if (this.__registry != null) {
      const def = this.__registry.get(tagName.toLowerCase());
      if (def != null) {
        return def.cstr;
      }
    }
    return undefined;
  }
  upgrade(_rootNode) {
    //
  }
  clear() {
    if (this.__registry != null) {
      this.__registry.clear();
    }
    if (this.__whenDefined != null) {
      this.__whenDefined.clear();
    }
  }
  whenDefined(tagName) {
    tagName = tagName.toLowerCase();
    if (this.__registry != null && this.__registry.has(tagName) === true) {
      return Promise.resolve(this.__registry.get(tagName).cstr);
    }
    return new Promise((resolve) => {
      if (this.__whenDefined == null) {
        this.__whenDefined = new Map();
      }
      let whenDefinedResolveFns = this.__whenDefined.get(tagName);
      if (whenDefinedResolveFns == null) {
        whenDefinedResolveFns = [];
        this.__whenDefined.set(tagName, whenDefinedResolveFns);
      }
      whenDefinedResolveFns.push(resolve);
    });
  }
}
function createCustomElement(customElements, ownerDocument, tagName) {
  const Cstr = customElements.get(tagName);
  if (Cstr != null) {
    const cmp = new Cstr(ownerDocument);
    cmp.nodeName = tagName.toUpperCase();
    upgradedElements.add(cmp);
    return cmp;
  }
  const host = new Proxy({}, {
    get(obj, prop) {
      const elm = proxyElements.get(host);
      if (elm != null) {
        return elm[prop];
      }
      return obj[prop];
    },
    set(obj, prop, val) {
      const elm = proxyElements.get(host);
      if (elm != null) {
        elm[prop] = val;
      }
      else {
        obj[prop] = val;
      }
      return true;
    },
    has(obj, prop) {
      const elm = proxyElements.get(host);
      if (prop in elm) {
        return true;
      }
      if (prop in obj) {
        return true;
      }
      return false;
    },
  });
  const elm = new MockHTMLElement(ownerDocument, tagName);
  proxyElements.set(host, elm);
  return host;
}
const proxyElements = new WeakMap();
const upgradedElements = new WeakSet();
function connectNode(ownerDocument, node) {
  node.ownerDocument = ownerDocument;
  if (node.nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */) {
    if (ownerDocument != null && node.nodeName.includes('-')) {
      const win = ownerDocument.defaultView;
      if (win != null && typeof node.connectedCallback === 'function' && node.isConnected) {
        fireConnectedCallback(node);
      }
      const shadowRoot = node.shadowRoot;
      if (shadowRoot != null) {
        shadowRoot.childNodes.forEach((childNode) => {
          connectNode(ownerDocument, childNode);
        });
      }
    }
    node.childNodes.forEach((childNode) => {
      connectNode(ownerDocument, childNode);
    });
  }
  else {
    node.childNodes.forEach((childNode) => {
      childNode.ownerDocument = ownerDocument;
    });
  }
}
function fireConnectedCallback(node) {
  if (typeof node.connectedCallback === 'function') {
    if (tempDisableCallbacks.has(node.ownerDocument) === false) {
      try {
        node.connectedCallback();
      }
      catch (e) {
        console.error(e);
      }
    }
  }
}
function disconnectNode(node) {
  if (node.nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */) {
    if (node.nodeName.includes('-') === true && typeof node.disconnectedCallback === 'function') {
      if (tempDisableCallbacks.has(node.ownerDocument) === false) {
        try {
          node.disconnectedCallback();
        }
        catch (e) {
          console.error(e);
        }
      }
    }
    node.childNodes.forEach(disconnectNode);
  }
}
function attributeChanged(node, attrName, oldValue, newValue) {
  attrName = attrName.toLowerCase();
  const observedAttributes = node.constructor.observedAttributes;
  if (Array.isArray(observedAttributes) === true &&
    observedAttributes.some((obs) => obs.toLowerCase() === attrName) === true) {
    try {
      node.attributeChangedCallback(attrName, oldValue, newValue);
    }
    catch (e) {
      console.error(e);
    }
  }
}
function checkAttributeChanged(node) {
  return node.nodeName.includes('-') === true && typeof node.attributeChangedCallback === 'function';
}
const tempDisableCallbacks = new Set();

function dataset(elm) {
  const ds = {};
  const attributes = elm.attributes;
  const attrLen = attributes.length;
  for (let i = 0; i < attrLen; i++) {
    const attr = attributes.item(i);
    const nodeName = attr.nodeName;
    if (nodeName.startsWith('data-')) {
      ds[dashToPascalCase(nodeName)] = attr.nodeValue;
    }
  }
  return new Proxy(ds, {
    get(_obj, camelCaseProp) {
      return ds[camelCaseProp];
    },
    set(_obj, camelCaseProp, value) {
      const dataAttr = toDataAttribute(camelCaseProp);
      elm.setAttribute(dataAttr, value);
      return true;
    },
  });
}
function toDataAttribute(str) {
  return ('data-' +
    String(str)
      .replace(/([A-Z0-9])/g, (g) => ' ' + g[0])
      .trim()
      .replace(/ /g, '-')
      .toLowerCase());
}
function dashToPascalCase(str) {
  str = String(str).slice(5);
  return str
    .split('-')
    .map((segment, index) => {
    if (index === 0) {
      return segment.charAt(0).toLowerCase() + segment.slice(1);
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  })
    .join('');
}

class MockEvent {
  constructor(type, eventInitDict) {
    this.bubbles = false;
    this.cancelBubble = false;
    this.cancelable = false;
    this.composed = false;
    this.currentTarget = null;
    this.defaultPrevented = false;
    this.srcElement = null;
    this.target = null;
    if (typeof type !== 'string') {
      throw new Error(`Event type required`);
    }
    this.type = type;
    this.timeStamp = Date.now();
    if (eventInitDict != null) {
      Object.assign(this, eventInitDict);
    }
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
  stopPropagation() {
    this.cancelBubble = true;
  }
  stopImmediatePropagation() {
    this.cancelBubble = true;
  }
  composedPath() {
    const composedPath = [];
    let currentElement = this.target;
    while (currentElement) {
      composedPath.push(currentElement);
      if (!currentElement.parentElement && currentElement.nodeName === "#document" /* NODE_NAMES.DOCUMENT_NODE */) {
        // the current element doesn't have a parent, but we've detected it's our root document node. push the window
        // object associated with the document onto the path
        composedPath.push(currentElement.defaultView);
        break;
      }
      currentElement = currentElement.parentElement;
    }
    return composedPath;
  }
}
class MockCustomEvent extends MockEvent {
  constructor(type, customEventInitDic) {
    super(type);
    this.detail = null;
    if (customEventInitDic != null) {
      Object.assign(this, customEventInitDic);
    }
  }
}
class MockKeyboardEvent extends MockEvent {
  constructor(type, keyboardEventInitDic) {
    super(type);
    this.code = '';
    this.key = '';
    this.altKey = false;
    this.ctrlKey = false;
    this.metaKey = false;
    this.shiftKey = false;
    this.location = 0;
    this.repeat = false;
    if (keyboardEventInitDic != null) {
      Object.assign(this, keyboardEventInitDic);
    }
  }
}
class MockMouseEvent extends MockEvent {
  constructor(type, mouseEventInitDic) {
    super(type);
    this.screenX = 0;
    this.screenY = 0;
    this.clientX = 0;
    this.clientY = 0;
    this.ctrlKey = false;
    this.shiftKey = false;
    this.altKey = false;
    this.metaKey = false;
    this.button = 0;
    this.buttons = 0;
    this.relatedTarget = null;
    if (mouseEventInitDic != null) {
      Object.assign(this, mouseEventInitDic);
    }
  }
}
class MockUIEvent extends MockEvent {
  constructor(type, uiEventInitDic) {
    super(type);
    this.detail = null;
    this.view = null;
    if (uiEventInitDic != null) {
      Object.assign(this, uiEventInitDic);
    }
  }
}
class MockFocusEvent extends MockUIEvent {
  constructor(type, focusEventInitDic) {
    super(type);
    this.relatedTarget = null;
    if (focusEventInitDic != null) {
      Object.assign(this, focusEventInitDic);
    }
  }
}
class MockEventListener {
  constructor(type, handler) {
    this.type = type;
    this.handler = handler;
  }
}
function addEventListener(elm, type, handler) {
  const target = elm;
  if (target.__listeners == null) {
    target.__listeners = [];
  }
  target.__listeners.push(new MockEventListener(type, handler));
}
function removeEventListener(elm, type, handler) {
  const target = elm;
  if (target != null && Array.isArray(target.__listeners) === true) {
    const elmListener = target.__listeners.find((e) => e.type === type && e.handler === handler);
    if (elmListener != null) {
      const index = target.__listeners.indexOf(elmListener);
      target.__listeners.splice(index, 1);
    }
  }
}
function resetEventListeners(target) {
  if (target != null && target.__listeners != null) {
    target.__listeners = null;
  }
}
function triggerEventListener(elm, ev) {
  if (elm == null || ev.cancelBubble === true) {
    return;
  }
  const target = elm;
  ev.currentTarget = elm;
  if (Array.isArray(target.__listeners) === true) {
    const listeners = target.__listeners.filter((e) => e.type === ev.type);
    listeners.forEach((listener) => {
      try {
        listener.handler.call(target, ev);
      }
      catch (err) {
        console.error(err);
      }
    });
  }
  if (ev.bubbles === false) {
    return;
  }
  if (elm.nodeName === "#document" /* NODE_NAMES.DOCUMENT_NODE */) {
    triggerEventListener(elm.defaultView, ev);
  }
  else {
    triggerEventListener(elm.parentElement, ev);
  }
}
function dispatchEvent(currentTarget, ev) {
  ev.target = currentTarget;
  triggerEventListener(currentTarget, ev);
  return true;
}

// Parse5 7.1.2
const e=function(e){const t=new Set([65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111]),s="�";var a;!function(e){e[e.EOF=-1]="EOF",e[e.NULL=0]="NULL",e[e.TABULATION=9]="TABULATION",e[e.CARRIAGE_RETURN=13]="CARRIAGE_RETURN",e[e.LINE_FEED=10]="LINE_FEED",e[e.FORM_FEED=12]="FORM_FEED",e[e.SPACE=32]="SPACE",e[e.EXCLAMATION_MARK=33]="EXCLAMATION_MARK",e[e.QUOTATION_MARK=34]="QUOTATION_MARK",e[e.NUMBER_SIGN=35]="NUMBER_SIGN",e[e.AMPERSAND=38]="AMPERSAND",e[e.APOSTROPHE=39]="APOSTROPHE",e[e.HYPHEN_MINUS=45]="HYPHEN_MINUS",e[e.SOLIDUS=47]="SOLIDUS",e[e.DIGIT_0=48]="DIGIT_0",e[e.DIGIT_9=57]="DIGIT_9",e[e.SEMICOLON=59]="SEMICOLON",e[e.LESS_THAN_SIGN=60]="LESS_THAN_SIGN",e[e.EQUALS_SIGN=61]="EQUALS_SIGN",e[e.GREATER_THAN_SIGN=62]="GREATER_THAN_SIGN",e[e.QUESTION_MARK=63]="QUESTION_MARK",e[e.LATIN_CAPITAL_A=65]="LATIN_CAPITAL_A",e[e.LATIN_CAPITAL_F=70]="LATIN_CAPITAL_F",e[e.LATIN_CAPITAL_X=88]="LATIN_CAPITAL_X",e[e.LATIN_CAPITAL_Z=90]="LATIN_CAPITAL_Z",e[e.RIGHT_SQUARE_BRACKET=93]="RIGHT_SQUARE_BRACKET",e[e.GRAVE_ACCENT=96]="GRAVE_ACCENT",e[e.LATIN_SMALL_A=97]="LATIN_SMALL_A",e[e.LATIN_SMALL_F=102]="LATIN_SMALL_F",e[e.LATIN_SMALL_X=120]="LATIN_SMALL_X",e[e.LATIN_SMALL_Z=122]="LATIN_SMALL_Z",e[e.REPLACEMENT_CHARACTER=65533]="REPLACEMENT_CHARACTER";}(a=a||(a={}));const r="[CDATA[",n="doctype",i="script";function o(e){return e>=55296&&e<=57343}function c(e){return 32!==e&&10!==e&&13!==e&&9!==e&&12!==e&&e>=1&&e<=31||e>=127&&e<=159}function E(e){return e>=64976&&e<=65007||t.has(e)}var T,h;!function(e){e.controlCharacterInInputStream="control-character-in-input-stream",e.noncharacterInInputStream="noncharacter-in-input-stream",e.surrogateInInputStream="surrogate-in-input-stream",e.nonVoidHtmlElementStartTagWithTrailingSolidus="non-void-html-element-start-tag-with-trailing-solidus",e.endTagWithAttributes="end-tag-with-attributes",e.endTagWithTrailingSolidus="end-tag-with-trailing-solidus",e.unexpectedSolidusInTag="unexpected-solidus-in-tag",e.unexpectedNullCharacter="unexpected-null-character",e.unexpectedQuestionMarkInsteadOfTagName="unexpected-question-mark-instead-of-tag-name",e.invalidFirstCharacterOfTagName="invalid-first-character-of-tag-name",e.unexpectedEqualsSignBeforeAttributeName="unexpected-equals-sign-before-attribute-name",e.missingEndTagName="missing-end-tag-name",e.unexpectedCharacterInAttributeName="unexpected-character-in-attribute-name",e.unknownNamedCharacterReference="unknown-named-character-reference",e.missingSemicolonAfterCharacterReference="missing-semicolon-after-character-reference",e.unexpectedCharacterAfterDoctypeSystemIdentifier="unexpected-character-after-doctype-system-identifier",e.unexpectedCharacterInUnquotedAttributeValue="unexpected-character-in-unquoted-attribute-value",e.eofBeforeTagName="eof-before-tag-name",e.eofInTag="eof-in-tag",e.missingAttributeValue="missing-attribute-value",e.missingWhitespaceBetweenAttributes="missing-whitespace-between-attributes",e.missingWhitespaceAfterDoctypePublicKeyword="missing-whitespace-after-doctype-public-keyword",e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers="missing-whitespace-between-doctype-public-and-system-identifiers",e.missingWhitespaceAfterDoctypeSystemKeyword="missing-whitespace-after-doctype-system-keyword",e.missingQuoteBeforeDoctypePublicIdentifier="missing-quote-before-doctype-public-identifier",e.missingQuoteBeforeDoctypeSystemIdentifier="missing-quote-before-doctype-system-identifier",e.missingDoctypePublicIdentifier="missing-doctype-public-identifier",e.missingDoctypeSystemIdentifier="missing-doctype-system-identifier",e.abruptDoctypePublicIdentifier="abrupt-doctype-public-identifier",e.abruptDoctypeSystemIdentifier="abrupt-doctype-system-identifier",e.cdataInHtmlContent="cdata-in-html-content",e.incorrectlyOpenedComment="incorrectly-opened-comment",e.eofInScriptHtmlCommentLikeText="eof-in-script-html-comment-like-text",e.eofInDoctype="eof-in-doctype",e.nestedComment="nested-comment",e.abruptClosingOfEmptyComment="abrupt-closing-of-empty-comment",e.eofInComment="eof-in-comment",e.incorrectlyClosedComment="incorrectly-closed-comment",e.eofInCdata="eof-in-cdata",e.absenceOfDigitsInNumericCharacterReference="absence-of-digits-in-numeric-character-reference",e.nullCharacterReference="null-character-reference",e.surrogateCharacterReference="surrogate-character-reference",e.characterReferenceOutsideUnicodeRange="character-reference-outside-unicode-range",e.controlCharacterReference="control-character-reference",e.noncharacterCharacterReference="noncharacter-character-reference",e.missingWhitespaceBeforeDoctypeName="missing-whitespace-before-doctype-name",e.missingDoctypeName="missing-doctype-name",e.invalidCharacterSequenceAfterDoctypeName="invalid-character-sequence-after-doctype-name",e.duplicateAttribute="duplicate-attribute",e.nonConformingDoctype="non-conforming-doctype",e.missingDoctype="missing-doctype",e.misplacedDoctype="misplaced-doctype",e.endTagWithoutMatchingOpenElement="end-tag-without-matching-open-element",e.closingOfElementWithOpenChildElements="closing-of-element-with-open-child-elements",e.disallowedContentInNoscriptInHead="disallowed-content-in-noscript-in-head",e.openElementsLeftAfterEof="open-elements-left-after-eof",e.abandonedHeadElementChild="abandoned-head-element-child",e.misplacedStartTagForHeadElement="misplaced-start-tag-for-head-element",e.nestedNoscriptInHead="nested-noscript-in-head",e.eofInElementThatCanContainOnlyText="eof-in-element-that-can-contain-only-text";}(T=T||(T={}));class _{constructor(e){this.handler=e,this.html="",this.pos=-1,this.lastGapPos=-2,this.gapStack=[],this.skipNextNewLine=!1,this.lastChunkWritten=!1,this.endOfChunkHit=!1,this.bufferWaterline=65536,this.isEol=!1,this.lineStartPos=0,this.droppedBufferSize=0,this.line=1,this.lastErrOffset=-1;}get col(){return this.pos-this.lineStartPos+Number(this.lastGapPos!==this.pos)}get offset(){return this.droppedBufferSize+this.pos}getError(e){const{line:t,col:s,offset:a}=this;return {code:e,startLine:t,endLine:t,startCol:s,endCol:s,startOffset:a,endOffset:a}}_err(e){this.handler.onParseError&&this.lastErrOffset!==this.offset&&(this.lastErrOffset=this.offset,this.handler.onParseError(this.getError(e)));}_addGap(){this.gapStack.push(this.lastGapPos),this.lastGapPos=this.pos;}_processSurrogate(e){if(this.pos!==this.html.length-1){const t=this.html.charCodeAt(this.pos+1);if(function(e){return e>=56320&&e<=57343}(t))return this.pos++,this._addGap(),1024*(e-55296)+9216+t}else if(!this.lastChunkWritten)return this.endOfChunkHit=!0,a.EOF;return this._err(T.surrogateInInputStream),e}willDropParsedChunk(){return this.pos>this.bufferWaterline}dropParsedChunk(){this.willDropParsedChunk()&&(this.html=this.html.substring(this.pos),this.lineStartPos-=this.pos,this.droppedBufferSize+=this.pos,this.pos=0,this.lastGapPos=-2,this.gapStack.length=0);}write(e,t){this.html.length>0?this.html+=e:this.html=e,this.endOfChunkHit=!1,this.lastChunkWritten=t;}insertHtmlAtCurrentPos(e){this.html=this.html.substring(0,this.pos+1)+e+this.html.substring(this.pos+1),this.endOfChunkHit=!1;}startsWith(e,t){if(this.pos+e.length>this.html.length)return this.endOfChunkHit=!this.lastChunkWritten,!1;if(t)return this.html.startsWith(e,this.pos);for(let t=0;t<e.length;t++)if((32|this.html.charCodeAt(this.pos+t))!==e.charCodeAt(t))return !1;return !0}peek(e){const t=this.pos+e;if(t>=this.html.length)return this.endOfChunkHit=!this.lastChunkWritten,a.EOF;const s=this.html.charCodeAt(t);return s===a.CARRIAGE_RETURN?a.LINE_FEED:s}advance(){if(this.pos++,this.isEol&&(this.isEol=!1,this.line++,this.lineStartPos=this.pos),this.pos>=this.html.length)return this.endOfChunkHit=!this.lastChunkWritten,a.EOF;let e=this.html.charCodeAt(this.pos);return e===a.CARRIAGE_RETURN?(this.isEol=!0,this.skipNextNewLine=!0,a.LINE_FEED):e===a.LINE_FEED&&(this.isEol=!0,this.skipNextNewLine)?(this.line--,this.skipNextNewLine=!1,this._addGap(),this.advance()):(this.skipNextNewLine=!1,o(e)&&(e=this._processSurrogate(e)),null===this.handler.onParseError||e>31&&e<127||e===a.LINE_FEED||e===a.CARRIAGE_RETURN||e>159&&e<64976||this._checkForProblematicCharacters(e),e)}_checkForProblematicCharacters(e){c(e)?this._err(T.controlCharacterInInputStream):E(e)&&this._err(T.noncharacterInInputStream);}retreat(e){for(this.pos-=e;this.pos<this.lastGapPos;)this.lastGapPos=this.gapStack.pop(),this.pos--;this.isEol=!1;}}function A(e,t){for(let s=e.attrs.length-1;s>=0;s--)if(e.attrs[s].name===t)return e.attrs[s].value;return null}!function(e){e[e.CHARACTER=0]="CHARACTER",e[e.NULL_CHARACTER=1]="NULL_CHARACTER",e[e.WHITESPACE_CHARACTER=2]="WHITESPACE_CHARACTER",e[e.START_TAG=3]="START_TAG",e[e.END_TAG=4]="END_TAG",e[e.COMMENT=5]="COMMENT",e[e.DOCTYPE=6]="DOCTYPE",e[e.EOF=7]="EOF",e[e.HIBERNATION=8]="HIBERNATION";}(h=h||(h={}));var l="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function m(e,t,s){return e(s={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&s.path)}},s.exports),s.exports}var p,d,I,N,u,C=m((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((function(e){return e.charCodeAt(0)})));})),D=m((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=new Uint16Array("Ȁaglq\tɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((function(e){return e.charCodeAt(0)})));})),S=m((function(e,t){var s;Object.defineProperty(t,"__esModule",{value:!0}),t.replaceCodePoint=t.fromCodePoint=void 0;var a=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]);function r(e){var t;return e>=55296&&e<=57343||e>1114111?65533:null!==(t=a.get(e))&&void 0!==t?t:e}t.fromCodePoint=null!==(s=String.fromCodePoint)&&void 0!==s?s:function(e){var t="";return e>65535&&(e-=65536,t+=String.fromCharCode(e>>>10&1023|55296),e=56320|1023&e),t+String.fromCharCode(e)},t.replaceCodePoint=r,t.default=function(e){return (0, t.fromCodePoint)(r(e))};})),R=m((function(e,t){var s=l&&l.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.decodeXML=t.decodeHTMLStrict=t.decodeHTML=t.determineBranch=t.BinTrieFlags=t.fromCodePoint=t.replaceCodePoint=t.decodeCodePoint=t.xmlDecodeTree=t.htmlDecodeTree=void 0;var a=s(C);t.htmlDecodeTree=a.default;var r=s(D);t.xmlDecodeTree=r.default;var n=s(S);t.decodeCodePoint=n.default;var i,o,c=S;function E(e){return function(t,s){for(var a="",r=0,c=0;(c=t.indexOf("&",c))>=0;)if(a+=t.slice(r,c),r=c,c+=1,t.charCodeAt(c)!==i.NUM){for(var E=0,h=1,_=0,A=e[_];c<t.length&&!((_=T(e,A,_+1,t.charCodeAt(c)))<0);c++,h++){var l=(A=e[_])&o.VALUE_LENGTH;if(l){var m;if(s&&t.charCodeAt(c)!==i.SEMI||(E=_,h=0),0==(m=(l>>14)-1))break;_+=m;}}0!==E&&(a+=1==(m=(e[E]&o.VALUE_LENGTH)>>14)?String.fromCharCode(e[E]&~o.VALUE_LENGTH):2===m?String.fromCharCode(e[E+1]):String.fromCharCode(e[E+1],e[E+2]),r=c-h+1);}else {var p=c+1,d=10,I=t.charCodeAt(p);(I|i.To_LOWER_BIT)===i.LOWER_X&&(d=16,c+=1,p+=1);do{I=t.charCodeAt(++c);}while(I>=i.ZERO&&I<=i.NINE||16===d&&(I|i.To_LOWER_BIT)>=i.LOWER_A&&(I|i.To_LOWER_BIT)<=i.LOWER_F);if(p!==c){var N=t.substring(p,c),u=parseInt(N,d);if(t.charCodeAt(c)===i.SEMI)c+=1;else if(s)continue;a+=(0, n.default)(u),r=c;}}return a+t.slice(r)}}function T(e,t,s,a){var r=(t&o.BRANCH_LENGTH)>>7,n=t&o.JUMP_TABLE;if(0===r)return 0!==n&&a===n?s:-1;if(n){var i=a-n;return i<0||i>=r?-1:e[s+i]-1}for(var c=s,E=c+r-1;c<=E;){var T=c+E>>>1,h=e[T];if(h<a)c=T+1;else {if(!(h>a))return e[T+r];E=T-1;}}return -1}Object.defineProperty(t,"replaceCodePoint",{enumerable:!0,get:function(){return c.replaceCodePoint}}),Object.defineProperty(t,"fromCodePoint",{enumerable:!0,get:function(){return c.fromCodePoint}}),function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.To_LOWER_BIT=32]="To_LOWER_BIT";}(i||(i={})),function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE";}(o=t.BinTrieFlags||(t.BinTrieFlags={})),t.determineBranch=T;var h=E(a.default),_=E(r.default);t.decodeHTML=function(e){return h(e,!1)},t.decodeHTMLStrict=function(e){return h(e,!0)},t.decodeXML=function(e){return _(e,!0)};}));!function(e){e.HTML="http://www.w3.org/1999/xhtml",e.MATHML="http://www.w3.org/1998/Math/MathML",e.SVG="http://www.w3.org/2000/svg",e.XLINK="http://www.w3.org/1999/xlink",e.XML="http://www.w3.org/XML/1998/namespace",e.XMLNS="http://www.w3.org/2000/xmlns/";}(p=p||(p={})),function(e){e.TYPE="type",e.ACTION="action",e.ENCODING="encoding",e.PROMPT="prompt",e.NAME="name",e.COLOR="color",e.FACE="face",e.SIZE="size";}(d=d||(d={})),function(e){e.NO_QUIRKS="no-quirks",e.QUIRKS="quirks",e.LIMITED_QUIRKS="limited-quirks";}(I=I||(I={})),function(e){e.A="a",e.ADDRESS="address",e.ANNOTATION_XML="annotation-xml",e.APPLET="applet",e.AREA="area",e.ARTICLE="article",e.ASIDE="aside",e.B="b",e.BASE="base",e.BASEFONT="basefont",e.BGSOUND="bgsound",e.BIG="big",e.BLOCKQUOTE="blockquote",e.BODY="body",e.BR="br",e.BUTTON="button",e.CAPTION="caption",e.CENTER="center",e.CODE="code",e.COL="col",e.COLGROUP="colgroup",e.DD="dd",e.DESC="desc",e.DETAILS="details",e.DIALOG="dialog",e.DIR="dir",e.DIV="div",e.DL="dl",e.DT="dt",e.EM="em",e.EMBED="embed",e.FIELDSET="fieldset",e.FIGCAPTION="figcaption",e.FIGURE="figure",e.FONT="font",e.FOOTER="footer",e.FOREIGN_OBJECT="foreignObject",e.FORM="form",e.FRAME="frame",e.FRAMESET="frameset",e.H1="h1",e.H2="h2",e.H3="h3",e.H4="h4",e.H5="h5",e.H6="h6",e.HEAD="head",e.HEADER="header",e.HGROUP="hgroup",e.HR="hr",e.HTML="html",e.I="i",e.IMG="img",e.IMAGE="image",e.INPUT="input",e.IFRAME="iframe",e.KEYGEN="keygen",e.LABEL="label",e.LI="li",e.LINK="link",e.LISTING="listing",e.MAIN="main",e.MALIGNMARK="malignmark",e.MARQUEE="marquee",e.MATH="math",e.MENU="menu",e.META="meta",e.MGLYPH="mglyph",e.MI="mi",e.MO="mo",e.MN="mn",e.MS="ms",e.MTEXT="mtext",e.NAV="nav",e.NOBR="nobr",e.NOFRAMES="noframes",e.NOEMBED="noembed",e.NOSCRIPT="noscript",e.OBJECT="object",e.OL="ol",e.OPTGROUP="optgroup",e.OPTION="option",e.P="p",e.PARAM="param",e.PLAINTEXT="plaintext",e.PRE="pre",e.RB="rb",e.RP="rp",e.RT="rt",e.RTC="rtc",e.RUBY="ruby",e.S="s",e.SCRIPT="script",e.SECTION="section",e.SELECT="select",e.SOURCE="source",e.SMALL="small",e.SPAN="span",e.STRIKE="strike",e.STRONG="strong",e.STYLE="style",e.SUB="sub",e.SUMMARY="summary",e.SUP="sup",e.TABLE="table",e.TBODY="tbody",e.TEMPLATE="template",e.TEXTAREA="textarea",e.TFOOT="tfoot",e.TD="td",e.TH="th",e.THEAD="thead",e.TITLE="title",e.TR="tr",e.TRACK="track",e.TT="tt",e.U="u",e.UL="ul",e.SVG="svg",e.VAR="var",e.WBR="wbr",e.XMP="xmp";}(N=N||(N={})),function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.A=1]="A",e[e.ADDRESS=2]="ADDRESS",e[e.ANNOTATION_XML=3]="ANNOTATION_XML",e[e.APPLET=4]="APPLET",e[e.AREA=5]="AREA",e[e.ARTICLE=6]="ARTICLE",e[e.ASIDE=7]="ASIDE",e[e.B=8]="B",e[e.BASE=9]="BASE",e[e.BASEFONT=10]="BASEFONT",e[e.BGSOUND=11]="BGSOUND",e[e.BIG=12]="BIG",e[e.BLOCKQUOTE=13]="BLOCKQUOTE",e[e.BODY=14]="BODY",e[e.BR=15]="BR",e[e.BUTTON=16]="BUTTON",e[e.CAPTION=17]="CAPTION",e[e.CENTER=18]="CENTER",e[e.CODE=19]="CODE",e[e.COL=20]="COL",e[e.COLGROUP=21]="COLGROUP",e[e.DD=22]="DD",e[e.DESC=23]="DESC",e[e.DETAILS=24]="DETAILS",e[e.DIALOG=25]="DIALOG",e[e.DIR=26]="DIR",e[e.DIV=27]="DIV",e[e.DL=28]="DL",e[e.DT=29]="DT",e[e.EM=30]="EM",e[e.EMBED=31]="EMBED",e[e.FIELDSET=32]="FIELDSET",e[e.FIGCAPTION=33]="FIGCAPTION",e[e.FIGURE=34]="FIGURE",e[e.FONT=35]="FONT",e[e.FOOTER=36]="FOOTER",e[e.FOREIGN_OBJECT=37]="FOREIGN_OBJECT",e[e.FORM=38]="FORM",e[e.FRAME=39]="FRAME",e[e.FRAMESET=40]="FRAMESET",e[e.H1=41]="H1",e[e.H2=42]="H2",e[e.H3=43]="H3",e[e.H4=44]="H4",e[e.H5=45]="H5",e[e.H6=46]="H6",e[e.HEAD=47]="HEAD",e[e.HEADER=48]="HEADER",e[e.HGROUP=49]="HGROUP",e[e.HR=50]="HR",e[e.HTML=51]="HTML",e[e.I=52]="I",e[e.IMG=53]="IMG",e[e.IMAGE=54]="IMAGE",e[e.INPUT=55]="INPUT",e[e.IFRAME=56]="IFRAME",e[e.KEYGEN=57]="KEYGEN",e[e.LABEL=58]="LABEL",e[e.LI=59]="LI",e[e.LINK=60]="LINK",e[e.LISTING=61]="LISTING",e[e.MAIN=62]="MAIN",e[e.MALIGNMARK=63]="MALIGNMARK",e[e.MARQUEE=64]="MARQUEE",e[e.MATH=65]="MATH",e[e.MENU=66]="MENU",e[e.META=67]="META",e[e.MGLYPH=68]="MGLYPH",e[e.MI=69]="MI",e[e.MO=70]="MO",e[e.MN=71]="MN",e[e.MS=72]="MS",e[e.MTEXT=73]="MTEXT",e[e.NAV=74]="NAV",e[e.NOBR=75]="NOBR",e[e.NOFRAMES=76]="NOFRAMES",e[e.NOEMBED=77]="NOEMBED",e[e.NOSCRIPT=78]="NOSCRIPT",e[e.OBJECT=79]="OBJECT",e[e.OL=80]="OL",e[e.OPTGROUP=81]="OPTGROUP",e[e.OPTION=82]="OPTION",e[e.P=83]="P",e[e.PARAM=84]="PARAM",e[e.PLAINTEXT=85]="PLAINTEXT",e[e.PRE=86]="PRE",e[e.RB=87]="RB",e[e.RP=88]="RP",e[e.RT=89]="RT",e[e.RTC=90]="RTC",e[e.RUBY=91]="RUBY",e[e.S=92]="S",e[e.SCRIPT=93]="SCRIPT",e[e.SECTION=94]="SECTION",e[e.SELECT=95]="SELECT",e[e.SOURCE=96]="SOURCE",e[e.SMALL=97]="SMALL",e[e.SPAN=98]="SPAN",e[e.STRIKE=99]="STRIKE",e[e.STRONG=100]="STRONG",e[e.STYLE=101]="STYLE",e[e.SUB=102]="SUB",e[e.SUMMARY=103]="SUMMARY",e[e.SUP=104]="SUP",e[e.TABLE=105]="TABLE",e[e.TBODY=106]="TBODY",e[e.TEMPLATE=107]="TEMPLATE",e[e.TEXTAREA=108]="TEXTAREA",e[e.TFOOT=109]="TFOOT",e[e.TD=110]="TD",e[e.TH=111]="TH",e[e.THEAD=112]="THEAD",e[e.TITLE=113]="TITLE",e[e.TR=114]="TR",e[e.TRACK=115]="TRACK",e[e.TT=116]="TT",e[e.U=117]="U",e[e.UL=118]="UL",e[e.SVG=119]="SVG",e[e.VAR=120]="VAR",e[e.WBR=121]="WBR",e[e.XMP=122]="XMP";}(u=u||(u={}));const O=new Map([[N.A,u.A],[N.ADDRESS,u.ADDRESS],[N.ANNOTATION_XML,u.ANNOTATION_XML],[N.APPLET,u.APPLET],[N.AREA,u.AREA],[N.ARTICLE,u.ARTICLE],[N.ASIDE,u.ASIDE],[N.B,u.B],[N.BASE,u.BASE],[N.BASEFONT,u.BASEFONT],[N.BGSOUND,u.BGSOUND],[N.BIG,u.BIG],[N.BLOCKQUOTE,u.BLOCKQUOTE],[N.BODY,u.BODY],[N.BR,u.BR],[N.BUTTON,u.BUTTON],[N.CAPTION,u.CAPTION],[N.CENTER,u.CENTER],[N.CODE,u.CODE],[N.COL,u.COL],[N.COLGROUP,u.COLGROUP],[N.DD,u.DD],[N.DESC,u.DESC],[N.DETAILS,u.DETAILS],[N.DIALOG,u.DIALOG],[N.DIR,u.DIR],[N.DIV,u.DIV],[N.DL,u.DL],[N.DT,u.DT],[N.EM,u.EM],[N.EMBED,u.EMBED],[N.FIELDSET,u.FIELDSET],[N.FIGCAPTION,u.FIGCAPTION],[N.FIGURE,u.FIGURE],[N.FONT,u.FONT],[N.FOOTER,u.FOOTER],[N.FOREIGN_OBJECT,u.FOREIGN_OBJECT],[N.FORM,u.FORM],[N.FRAME,u.FRAME],[N.FRAMESET,u.FRAMESET],[N.H1,u.H1],[N.H2,u.H2],[N.H3,u.H3],[N.H4,u.H4],[N.H5,u.H5],[N.H6,u.H6],[N.HEAD,u.HEAD],[N.HEADER,u.HEADER],[N.HGROUP,u.HGROUP],[N.HR,u.HR],[N.HTML,u.HTML],[N.I,u.I],[N.IMG,u.IMG],[N.IMAGE,u.IMAGE],[N.INPUT,u.INPUT],[N.IFRAME,u.IFRAME],[N.KEYGEN,u.KEYGEN],[N.LABEL,u.LABEL],[N.LI,u.LI],[N.LINK,u.LINK],[N.LISTING,u.LISTING],[N.MAIN,u.MAIN],[N.MALIGNMARK,u.MALIGNMARK],[N.MARQUEE,u.MARQUEE],[N.MATH,u.MATH],[N.MENU,u.MENU],[N.META,u.META],[N.MGLYPH,u.MGLYPH],[N.MI,u.MI],[N.MO,u.MO],[N.MN,u.MN],[N.MS,u.MS],[N.MTEXT,u.MTEXT],[N.NAV,u.NAV],[N.NOBR,u.NOBR],[N.NOFRAMES,u.NOFRAMES],[N.NOEMBED,u.NOEMBED],[N.NOSCRIPT,u.NOSCRIPT],[N.OBJECT,u.OBJECT],[N.OL,u.OL],[N.OPTGROUP,u.OPTGROUP],[N.OPTION,u.OPTION],[N.P,u.P],[N.PARAM,u.PARAM],[N.PLAINTEXT,u.PLAINTEXT],[N.PRE,u.PRE],[N.RB,u.RB],[N.RP,u.RP],[N.RT,u.RT],[N.RTC,u.RTC],[N.RUBY,u.RUBY],[N.S,u.S],[N.SCRIPT,u.SCRIPT],[N.SECTION,u.SECTION],[N.SELECT,u.SELECT],[N.SOURCE,u.SOURCE],[N.SMALL,u.SMALL],[N.SPAN,u.SPAN],[N.STRIKE,u.STRIKE],[N.STRONG,u.STRONG],[N.STYLE,u.STYLE],[N.SUB,u.SUB],[N.SUMMARY,u.SUMMARY],[N.SUP,u.SUP],[N.TABLE,u.TABLE],[N.TBODY,u.TBODY],[N.TEMPLATE,u.TEMPLATE],[N.TEXTAREA,u.TEXTAREA],[N.TFOOT,u.TFOOT],[N.TD,u.TD],[N.TH,u.TH],[N.THEAD,u.THEAD],[N.TITLE,u.TITLE],[N.TR,u.TR],[N.TRACK,u.TRACK],[N.TT,u.TT],[N.U,u.U],[N.UL,u.UL],[N.SVG,u.SVG],[N.VAR,u.VAR],[N.WBR,u.WBR],[N.XMP,u.XMP]]);function f(e){var t;return null!==(t=O.get(e))&&void 0!==t?t:u.UNKNOWN}const L=u,g={[p.HTML]:new Set([L.ADDRESS,L.APPLET,L.AREA,L.ARTICLE,L.ASIDE,L.BASE,L.BASEFONT,L.BGSOUND,L.BLOCKQUOTE,L.BODY,L.BR,L.BUTTON,L.CAPTION,L.CENTER,L.COL,L.COLGROUP,L.DD,L.DETAILS,L.DIR,L.DIV,L.DL,L.DT,L.EMBED,L.FIELDSET,L.FIGCAPTION,L.FIGURE,L.FOOTER,L.FORM,L.FRAME,L.FRAMESET,L.H1,L.H2,L.H3,L.H4,L.H5,L.H6,L.HEAD,L.HEADER,L.HGROUP,L.HR,L.HTML,L.IFRAME,L.IMG,L.INPUT,L.LI,L.LINK,L.LISTING,L.MAIN,L.MARQUEE,L.MENU,L.META,L.NAV,L.NOEMBED,L.NOFRAMES,L.NOSCRIPT,L.OBJECT,L.OL,L.P,L.PARAM,L.PLAINTEXT,L.PRE,L.SCRIPT,L.SECTION,L.SELECT,L.SOURCE,L.STYLE,L.SUMMARY,L.TABLE,L.TBODY,L.TD,L.TEMPLATE,L.TEXTAREA,L.TFOOT,L.TH,L.THEAD,L.TITLE,L.TR,L.TRACK,L.UL,L.WBR,L.XMP]),[p.MATHML]:new Set([L.MI,L.MO,L.MN,L.MS,L.MTEXT,L.ANNOTATION_XML]),[p.SVG]:new Set([L.TITLE,L.FOREIGN_OBJECT,L.DESC]),[p.XLINK]:new Set,[p.XML]:new Set,[p.XMLNS]:new Set};function M(e){return e===L.H1||e===L.H2||e===L.H3||e===L.H4||e===L.H5||e===L.H6}new Set([N.STYLE,N.SCRIPT,N.XMP,N.IFRAME,N.NOEMBED,N.NOFRAMES,N.PLAINTEXT]);const k=new Map([[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]);var P;!function(e){e[e.DATA=0]="DATA",e[e.RCDATA=1]="RCDATA",e[e.RAWTEXT=2]="RAWTEXT",e[e.SCRIPT_DATA=3]="SCRIPT_DATA",e[e.PLAINTEXT=4]="PLAINTEXT",e[e.TAG_OPEN=5]="TAG_OPEN",e[e.END_TAG_OPEN=6]="END_TAG_OPEN",e[e.TAG_NAME=7]="TAG_NAME",e[e.RCDATA_LESS_THAN_SIGN=8]="RCDATA_LESS_THAN_SIGN",e[e.RCDATA_END_TAG_OPEN=9]="RCDATA_END_TAG_OPEN",e[e.RCDATA_END_TAG_NAME=10]="RCDATA_END_TAG_NAME",e[e.RAWTEXT_LESS_THAN_SIGN=11]="RAWTEXT_LESS_THAN_SIGN",e[e.RAWTEXT_END_TAG_OPEN=12]="RAWTEXT_END_TAG_OPEN",e[e.RAWTEXT_END_TAG_NAME=13]="RAWTEXT_END_TAG_NAME",e[e.SCRIPT_DATA_LESS_THAN_SIGN=14]="SCRIPT_DATA_LESS_THAN_SIGN",e[e.SCRIPT_DATA_END_TAG_OPEN=15]="SCRIPT_DATA_END_TAG_OPEN",e[e.SCRIPT_DATA_END_TAG_NAME=16]="SCRIPT_DATA_END_TAG_NAME",e[e.SCRIPT_DATA_ESCAPE_START=17]="SCRIPT_DATA_ESCAPE_START",e[e.SCRIPT_DATA_ESCAPE_START_DASH=18]="SCRIPT_DATA_ESCAPE_START_DASH",e[e.SCRIPT_DATA_ESCAPED=19]="SCRIPT_DATA_ESCAPED",e[e.SCRIPT_DATA_ESCAPED_DASH=20]="SCRIPT_DATA_ESCAPED_DASH",e[e.SCRIPT_DATA_ESCAPED_DASH_DASH=21]="SCRIPT_DATA_ESCAPED_DASH_DASH",e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN=22]="SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN",e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN=23]="SCRIPT_DATA_ESCAPED_END_TAG_OPEN",e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME=24]="SCRIPT_DATA_ESCAPED_END_TAG_NAME",e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START=25]="SCRIPT_DATA_DOUBLE_ESCAPE_START",e[e.SCRIPT_DATA_DOUBLE_ESCAPED=26]="SCRIPT_DATA_DOUBLE_ESCAPED",e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH=27]="SCRIPT_DATA_DOUBLE_ESCAPED_DASH",e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH=28]="SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH",e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN=29]="SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN",e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END=30]="SCRIPT_DATA_DOUBLE_ESCAPE_END",e[e.BEFORE_ATTRIBUTE_NAME=31]="BEFORE_ATTRIBUTE_NAME",e[e.ATTRIBUTE_NAME=32]="ATTRIBUTE_NAME",e[e.AFTER_ATTRIBUTE_NAME=33]="AFTER_ATTRIBUTE_NAME",e[e.BEFORE_ATTRIBUTE_VALUE=34]="BEFORE_ATTRIBUTE_VALUE",e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED=35]="ATTRIBUTE_VALUE_DOUBLE_QUOTED",e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED=36]="ATTRIBUTE_VALUE_SINGLE_QUOTED",e[e.ATTRIBUTE_VALUE_UNQUOTED=37]="ATTRIBUTE_VALUE_UNQUOTED",e[e.AFTER_ATTRIBUTE_VALUE_QUOTED=38]="AFTER_ATTRIBUTE_VALUE_QUOTED",e[e.SELF_CLOSING_START_TAG=39]="SELF_CLOSING_START_TAG",e[e.BOGUS_COMMENT=40]="BOGUS_COMMENT",e[e.MARKUP_DECLARATION_OPEN=41]="MARKUP_DECLARATION_OPEN",e[e.COMMENT_START=42]="COMMENT_START",e[e.COMMENT_START_DASH=43]="COMMENT_START_DASH",e[e.COMMENT=44]="COMMENT",e[e.COMMENT_LESS_THAN_SIGN=45]="COMMENT_LESS_THAN_SIGN",e[e.COMMENT_LESS_THAN_SIGN_BANG=46]="COMMENT_LESS_THAN_SIGN_BANG",e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH=47]="COMMENT_LESS_THAN_SIGN_BANG_DASH",e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH=48]="COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH",e[e.COMMENT_END_DASH=49]="COMMENT_END_DASH",e[e.COMMENT_END=50]="COMMENT_END",e[e.COMMENT_END_BANG=51]="COMMENT_END_BANG",e[e.DOCTYPE=52]="DOCTYPE",e[e.BEFORE_DOCTYPE_NAME=53]="BEFORE_DOCTYPE_NAME",e[e.DOCTYPE_NAME=54]="DOCTYPE_NAME",e[e.AFTER_DOCTYPE_NAME=55]="AFTER_DOCTYPE_NAME",e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD=56]="AFTER_DOCTYPE_PUBLIC_KEYWORD",e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER=57]="BEFORE_DOCTYPE_PUBLIC_IDENTIFIER",e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED=58]="DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED",e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED=59]="DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED",e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER=60]="AFTER_DOCTYPE_PUBLIC_IDENTIFIER",e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS=61]="BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS",e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD=62]="AFTER_DOCTYPE_SYSTEM_KEYWORD",e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER=63]="BEFORE_DOCTYPE_SYSTEM_IDENTIFIER",e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED=64]="DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED",e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED=65]="DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED",e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER=66]="AFTER_DOCTYPE_SYSTEM_IDENTIFIER",e[e.BOGUS_DOCTYPE=67]="BOGUS_DOCTYPE",e[e.CDATA_SECTION=68]="CDATA_SECTION",e[e.CDATA_SECTION_BRACKET=69]="CDATA_SECTION_BRACKET",e[e.CDATA_SECTION_END=70]="CDATA_SECTION_END",e[e.CHARACTER_REFERENCE=71]="CHARACTER_REFERENCE",e[e.NAMED_CHARACTER_REFERENCE=72]="NAMED_CHARACTER_REFERENCE",e[e.AMBIGUOUS_AMPERSAND=73]="AMBIGUOUS_AMPERSAND",e[e.NUMERIC_CHARACTER_REFERENCE=74]="NUMERIC_CHARACTER_REFERENCE",e[e.HEXADEMICAL_CHARACTER_REFERENCE_START=75]="HEXADEMICAL_CHARACTER_REFERENCE_START",e[e.HEXADEMICAL_CHARACTER_REFERENCE=76]="HEXADEMICAL_CHARACTER_REFERENCE",e[e.DECIMAL_CHARACTER_REFERENCE=77]="DECIMAL_CHARACTER_REFERENCE",e[e.NUMERIC_CHARACTER_REFERENCE_END=78]="NUMERIC_CHARACTER_REFERENCE_END";}(P||(P={}));const b={DATA:P.DATA,RCDATA:P.RCDATA,RAWTEXT:P.RAWTEXT,SCRIPT_DATA:P.SCRIPT_DATA,PLAINTEXT:P.PLAINTEXT,CDATA_SECTION:P.CDATA_SECTION};function B(e){return e>=a.DIGIT_0&&e<=a.DIGIT_9}function H(e){return e>=a.LATIN_CAPITAL_A&&e<=a.LATIN_CAPITAL_Z}function F(e){return function(e){return e>=a.LATIN_SMALL_A&&e<=a.LATIN_SMALL_Z}(e)||H(e)}function U(e){return F(e)||B(e)}function G(e){return e>=a.LATIN_CAPITAL_A&&e<=a.LATIN_CAPITAL_F}function y(e){return e>=a.LATIN_SMALL_A&&e<=a.LATIN_SMALL_F}function w(e){return e+32}function Y(e){return e===a.SPACE||e===a.LINE_FEED||e===a.TABULATION||e===a.FORM_FEED}function x(e){return Y(e)||e===a.SOLIDUS||e===a.GREATER_THAN_SIGN}class v{constructor(e,t){this.options=e,this.handler=t,this.paused=!1,this.inLoop=!1,this.inForeignNode=!1,this.lastStartTagName="",this.active=!1,this.state=P.DATA,this.returnState=P.DATA,this.charRefCode=-1,this.consumedAfterSnapshot=-1,this.currentCharacterToken=null,this.currentToken=null,this.currentAttr={name:"",value:""},this.preprocessor=new _(t),this.currentLocation=this.getCurrentLocation(-1);}_err(e){var t,s;null===(s=(t=this.handler).onParseError)||void 0===s||s.call(t,this.preprocessor.getError(e));}getCurrentLocation(e){return this.options.sourceCodeLocationInfo?{startLine:this.preprocessor.line,startCol:this.preprocessor.col-e,startOffset:this.preprocessor.offset-e,endLine:-1,endCol:-1,endOffset:-1}:null}_runParsingLoop(){if(!this.inLoop){for(this.inLoop=!0;this.active&&!this.paused;){this.consumedAfterSnapshot=0;const e=this._consume();this._ensureHibernation()||this._callState(e);}this.inLoop=!1;}}pause(){this.paused=!0;}resume(e){if(!this.paused)throw new Error("Parser was already resumed");this.paused=!1,this.inLoop||(this._runParsingLoop(),this.paused||null==e||e());}write(e,t,s){this.active=!0,this.preprocessor.write(e,t),this._runParsingLoop(),this.paused||null==s||s();}insertHtmlAtCurrentPos(e){this.active=!0,this.preprocessor.insertHtmlAtCurrentPos(e),this._runParsingLoop();}_ensureHibernation(){return !!this.preprocessor.endOfChunkHit&&(this._unconsume(this.consumedAfterSnapshot),this.active=!1,!0)}_consume(){return this.consumedAfterSnapshot++,this.preprocessor.advance()}_unconsume(e){this.consumedAfterSnapshot-=e,this.preprocessor.retreat(e);}_reconsumeInState(e,t){this.state=e,this._callState(t);}_advanceBy(e){this.consumedAfterSnapshot+=e;for(let t=0;t<e;t++)this.preprocessor.advance();}_consumeSequenceIfMatch(e,t){return !!this.preprocessor.startsWith(e,t)&&(this._advanceBy(e.length-1),!0)}_createStartTagToken(){this.currentToken={type:h.START_TAG,tagName:"",tagID:u.UNKNOWN,selfClosing:!1,ackSelfClosing:!1,attrs:[],location:this.getCurrentLocation(1)};}_createEndTagToken(){this.currentToken={type:h.END_TAG,tagName:"",tagID:u.UNKNOWN,selfClosing:!1,ackSelfClosing:!1,attrs:[],location:this.getCurrentLocation(2)};}_createCommentToken(e){this.currentToken={type:h.COMMENT,data:"",location:this.getCurrentLocation(e)};}_createDoctypeToken(e){this.currentToken={type:h.DOCTYPE,name:e,forceQuirks:!1,publicId:null,systemId:null,location:this.currentLocation};}_createCharacterToken(e,t){this.currentCharacterToken={type:e,chars:t,location:this.currentLocation};}_createAttr(e){this.currentAttr={name:e,value:""},this.currentLocation=this.getCurrentLocation(0);}_leaveAttrName(){var e,t;const s=this.currentToken;null===A(s,this.currentAttr.name)?(s.attrs.push(this.currentAttr),s.location&&this.currentLocation&&((null!==(e=(t=s.location).attrs)&&void 0!==e?e:t.attrs=Object.create(null))[this.currentAttr.name]=this.currentLocation,this._leaveAttrValue())):this._err(T.duplicateAttribute);}_leaveAttrValue(){this.currentLocation&&(this.currentLocation.endLine=this.preprocessor.line,this.currentLocation.endCol=this.preprocessor.col,this.currentLocation.endOffset=this.preprocessor.offset);}prepareToken(e){this._emitCurrentCharacterToken(e.location),this.currentToken=null,e.location&&(e.location.endLine=this.preprocessor.line,e.location.endCol=this.preprocessor.col+1,e.location.endOffset=this.preprocessor.offset+1),this.currentLocation=this.getCurrentLocation(-1);}emitCurrentTagToken(){const e=this.currentToken;this.prepareToken(e),e.tagID=f(e.tagName),e.type===h.START_TAG?(this.lastStartTagName=e.tagName,this.handler.onStartTag(e)):(e.attrs.length>0&&this._err(T.endTagWithAttributes),e.selfClosing&&this._err(T.endTagWithTrailingSolidus),this.handler.onEndTag(e)),this.preprocessor.dropParsedChunk();}emitCurrentComment(e){this.prepareToken(e),this.handler.onComment(e),this.preprocessor.dropParsedChunk();}emitCurrentDoctype(e){this.prepareToken(e),this.handler.onDoctype(e),this.preprocessor.dropParsedChunk();}_emitCurrentCharacterToken(e){if(this.currentCharacterToken){switch(e&&this.currentCharacterToken.location&&(this.currentCharacterToken.location.endLine=e.startLine,this.currentCharacterToken.location.endCol=e.startCol,this.currentCharacterToken.location.endOffset=e.startOffset),this.currentCharacterToken.type){case h.CHARACTER:this.handler.onCharacter(this.currentCharacterToken);break;case h.NULL_CHARACTER:this.handler.onNullCharacter(this.currentCharacterToken);break;case h.WHITESPACE_CHARACTER:this.handler.onWhitespaceCharacter(this.currentCharacterToken);}this.currentCharacterToken=null;}}_emitEOFToken(){const e=this.getCurrentLocation(0);e&&(e.endLine=e.startLine,e.endCol=e.startCol,e.endOffset=e.startOffset),this._emitCurrentCharacterToken(e),this.handler.onEof({type:h.EOF,location:e}),this.active=!1;}_appendCharToCurrentCharacterToken(e,t){if(this.currentCharacterToken){if(this.currentCharacterToken.type===e)return void(this.currentCharacterToken.chars+=t);this.currentLocation=this.getCurrentLocation(0),this._emitCurrentCharacterToken(this.currentLocation),this.preprocessor.dropParsedChunk();}this._createCharacterToken(e,t);}_emitCodePoint(e){const t=Y(e)?h.WHITESPACE_CHARACTER:e===a.NULL?h.NULL_CHARACTER:h.CHARACTER;this._appendCharToCurrentCharacterToken(t,String.fromCodePoint(e));}_emitChars(e){this._appendCharToCurrentCharacterToken(h.CHARACTER,e);}_matchNamedCharacterReference(e){let t=null,s=0,r=!1;for(let i=0,o=R.htmlDecodeTree[0];i>=0&&(i=R.determineBranch(R.htmlDecodeTree,o,i+1,e),!(i<0));e=this._consume()){s+=1,o=R.htmlDecodeTree[i];const c=o&R.BinTrieFlags.VALUE_LENGTH;if(c){const o=(c>>14)-1;if(e!==a.SEMICOLON&&this._isCharacterReferenceInAttribute()&&((n=this.preprocessor.peek(1))===a.EQUALS_SIGN||U(n))?(t=[a.AMPERSAND],i+=o):(t=0===o?[R.htmlDecodeTree[i]&~R.BinTrieFlags.VALUE_LENGTH]:1===o?[R.htmlDecodeTree[++i]]:[R.htmlDecodeTree[++i],R.htmlDecodeTree[++i]],s=0,r=e!==a.SEMICOLON),0===o){this._consume();break}}}var n;return this._unconsume(s),r&&!this.preprocessor.endOfChunkHit&&this._err(T.missingSemicolonAfterCharacterReference),this._unconsume(1),t}_isCharacterReferenceInAttribute(){return this.returnState===P.ATTRIBUTE_VALUE_DOUBLE_QUOTED||this.returnState===P.ATTRIBUTE_VALUE_SINGLE_QUOTED||this.returnState===P.ATTRIBUTE_VALUE_UNQUOTED}_flushCodePointConsumedAsCharacterReference(e){this._isCharacterReferenceInAttribute()?this.currentAttr.value+=String.fromCodePoint(e):this._emitCodePoint(e);}_callState(e){switch(this.state){case P.DATA:this._stateData(e);break;case P.RCDATA:this._stateRcdata(e);break;case P.RAWTEXT:this._stateRawtext(e);break;case P.SCRIPT_DATA:this._stateScriptData(e);break;case P.PLAINTEXT:this._statePlaintext(e);break;case P.TAG_OPEN:this._stateTagOpen(e);break;case P.END_TAG_OPEN:this._stateEndTagOpen(e);break;case P.TAG_NAME:this._stateTagName(e);break;case P.RCDATA_LESS_THAN_SIGN:this._stateRcdataLessThanSign(e);break;case P.RCDATA_END_TAG_OPEN:this._stateRcdataEndTagOpen(e);break;case P.RCDATA_END_TAG_NAME:this._stateRcdataEndTagName(e);break;case P.RAWTEXT_LESS_THAN_SIGN:this._stateRawtextLessThanSign(e);break;case P.RAWTEXT_END_TAG_OPEN:this._stateRawtextEndTagOpen(e);break;case P.RAWTEXT_END_TAG_NAME:this._stateRawtextEndTagName(e);break;case P.SCRIPT_DATA_LESS_THAN_SIGN:this._stateScriptDataLessThanSign(e);break;case P.SCRIPT_DATA_END_TAG_OPEN:this._stateScriptDataEndTagOpen(e);break;case P.SCRIPT_DATA_END_TAG_NAME:this._stateScriptDataEndTagName(e);break;case P.SCRIPT_DATA_ESCAPE_START:this._stateScriptDataEscapeStart(e);break;case P.SCRIPT_DATA_ESCAPE_START_DASH:this._stateScriptDataEscapeStartDash(e);break;case P.SCRIPT_DATA_ESCAPED:this._stateScriptDataEscaped(e);break;case P.SCRIPT_DATA_ESCAPED_DASH:this._stateScriptDataEscapedDash(e);break;case P.SCRIPT_DATA_ESCAPED_DASH_DASH:this._stateScriptDataEscapedDashDash(e);break;case P.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:this._stateScriptDataEscapedLessThanSign(e);break;case P.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:this._stateScriptDataEscapedEndTagOpen(e);break;case P.SCRIPT_DATA_ESCAPED_END_TAG_NAME:this._stateScriptDataEscapedEndTagName(e);break;case P.SCRIPT_DATA_DOUBLE_ESCAPE_START:this._stateScriptDataDoubleEscapeStart(e);break;case P.SCRIPT_DATA_DOUBLE_ESCAPED:this._stateScriptDataDoubleEscaped(e);break;case P.SCRIPT_DATA_DOUBLE_ESCAPED_DASH:this._stateScriptDataDoubleEscapedDash(e);break;case P.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH:this._stateScriptDataDoubleEscapedDashDash(e);break;case P.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN:this._stateScriptDataDoubleEscapedLessThanSign(e);break;case P.SCRIPT_DATA_DOUBLE_ESCAPE_END:this._stateScriptDataDoubleEscapeEnd(e);break;case P.BEFORE_ATTRIBUTE_NAME:this._stateBeforeAttributeName(e);break;case P.ATTRIBUTE_NAME:this._stateAttributeName(e);break;case P.AFTER_ATTRIBUTE_NAME:this._stateAfterAttributeName(e);break;case P.BEFORE_ATTRIBUTE_VALUE:this._stateBeforeAttributeValue(e);break;case P.ATTRIBUTE_VALUE_DOUBLE_QUOTED:this._stateAttributeValueDoubleQuoted(e);break;case P.ATTRIBUTE_VALUE_SINGLE_QUOTED:this._stateAttributeValueSingleQuoted(e);break;case P.ATTRIBUTE_VALUE_UNQUOTED:this._stateAttributeValueUnquoted(e);break;case P.AFTER_ATTRIBUTE_VALUE_QUOTED:this._stateAfterAttributeValueQuoted(e);break;case P.SELF_CLOSING_START_TAG:this._stateSelfClosingStartTag(e);break;case P.BOGUS_COMMENT:this._stateBogusComment(e);break;case P.MARKUP_DECLARATION_OPEN:this._stateMarkupDeclarationOpen(e);break;case P.COMMENT_START:this._stateCommentStart(e);break;case P.COMMENT_START_DASH:this._stateCommentStartDash(e);break;case P.COMMENT:this._stateComment(e);break;case P.COMMENT_LESS_THAN_SIGN:this._stateCommentLessThanSign(e);break;case P.COMMENT_LESS_THAN_SIGN_BANG:this._stateCommentLessThanSignBang(e);break;case P.COMMENT_LESS_THAN_SIGN_BANG_DASH:this._stateCommentLessThanSignBangDash(e);break;case P.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:this._stateCommentLessThanSignBangDashDash(e);break;case P.COMMENT_END_DASH:this._stateCommentEndDash(e);break;case P.COMMENT_END:this._stateCommentEnd(e);break;case P.COMMENT_END_BANG:this._stateCommentEndBang(e);break;case P.DOCTYPE:this._stateDoctype(e);break;case P.BEFORE_DOCTYPE_NAME:this._stateBeforeDoctypeName(e);break;case P.DOCTYPE_NAME:this._stateDoctypeName(e);break;case P.AFTER_DOCTYPE_NAME:this._stateAfterDoctypeName(e);break;case P.AFTER_DOCTYPE_PUBLIC_KEYWORD:this._stateAfterDoctypePublicKeyword(e);break;case P.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER:this._stateBeforeDoctypePublicIdentifier(e);break;case P.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED:this._stateDoctypePublicIdentifierDoubleQuoted(e);break;case P.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED:this._stateDoctypePublicIdentifierSingleQuoted(e);break;case P.AFTER_DOCTYPE_PUBLIC_IDENTIFIER:this._stateAfterDoctypePublicIdentifier(e);break;case P.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS:this._stateBetweenDoctypePublicAndSystemIdentifiers(e);break;case P.AFTER_DOCTYPE_SYSTEM_KEYWORD:this._stateAfterDoctypeSystemKeyword(e);break;case P.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER:this._stateBeforeDoctypeSystemIdentifier(e);break;case P.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED:this._stateDoctypeSystemIdentifierDoubleQuoted(e);break;case P.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED:this._stateDoctypeSystemIdentifierSingleQuoted(e);break;case P.AFTER_DOCTYPE_SYSTEM_IDENTIFIER:this._stateAfterDoctypeSystemIdentifier(e);break;case P.BOGUS_DOCTYPE:this._stateBogusDoctype(e);break;case P.CDATA_SECTION:this._stateCdataSection(e);break;case P.CDATA_SECTION_BRACKET:this._stateCdataSectionBracket(e);break;case P.CDATA_SECTION_END:this._stateCdataSectionEnd(e);break;case P.CHARACTER_REFERENCE:this._stateCharacterReference(e);break;case P.NAMED_CHARACTER_REFERENCE:this._stateNamedCharacterReference(e);break;case P.AMBIGUOUS_AMPERSAND:this._stateAmbiguousAmpersand(e);break;case P.NUMERIC_CHARACTER_REFERENCE:this._stateNumericCharacterReference(e);break;case P.HEXADEMICAL_CHARACTER_REFERENCE_START:this._stateHexademicalCharacterReferenceStart(e);break;case P.HEXADEMICAL_CHARACTER_REFERENCE:this._stateHexademicalCharacterReference(e);break;case P.DECIMAL_CHARACTER_REFERENCE:this._stateDecimalCharacterReference(e);break;case P.NUMERIC_CHARACTER_REFERENCE_END:this._stateNumericCharacterReferenceEnd(e);break;default:throw new Error("Unknown state")}}_stateData(e){switch(e){case a.LESS_THAN_SIGN:this.state=P.TAG_OPEN;break;case a.AMPERSAND:this.returnState=P.DATA,this.state=P.CHARACTER_REFERENCE;break;case a.NULL:this._err(T.unexpectedNullCharacter),this._emitCodePoint(e);break;case a.EOF:this._emitEOFToken();break;default:this._emitCodePoint(e);}}_stateRcdata(e){switch(e){case a.AMPERSAND:this.returnState=P.RCDATA,this.state=P.CHARACTER_REFERENCE;break;case a.LESS_THAN_SIGN:this.state=P.RCDATA_LESS_THAN_SIGN;break;case a.NULL:this._err(T.unexpectedNullCharacter),this._emitChars(s);break;case a.EOF:this._emitEOFToken();break;default:this._emitCodePoint(e);}}_stateRawtext(e){switch(e){case a.LESS_THAN_SIGN:this.state=P.RAWTEXT_LESS_THAN_SIGN;break;case a.NULL:this._err(T.unexpectedNullCharacter),this._emitChars(s);break;case a.EOF:this._emitEOFToken();break;default:this._emitCodePoint(e);}}_stateScriptData(e){switch(e){case a.LESS_THAN_SIGN:this.state=P.SCRIPT_DATA_LESS_THAN_SIGN;break;case a.NULL:this._err(T.unexpectedNullCharacter),this._emitChars(s);break;case a.EOF:this._emitEOFToken();break;default:this._emitCodePoint(e);}}_statePlaintext(e){switch(e){case a.NULL:this._err(T.unexpectedNullCharacter),this._emitChars(s);break;case a.EOF:this._emitEOFToken();break;default:this._emitCodePoint(e);}}_stateTagOpen(e){if(F(e))this._createStartTagToken(),this.state=P.TAG_NAME,this._stateTagName(e);else switch(e){case a.EXCLAMATION_MARK:this.state=P.MARKUP_DECLARATION_OPEN;break;case a.SOLIDUS:this.state=P.END_TAG_OPEN;break;case a.QUESTION_MARK:this._err(T.unexpectedQuestionMarkInsteadOfTagName),this._createCommentToken(1),this.state=P.BOGUS_COMMENT,this._stateBogusComment(e);break;case a.EOF:this._err(T.eofBeforeTagName),this._emitChars("<"),this._emitEOFToken();break;default:this._err(T.invalidFirstCharacterOfTagName),this._emitChars("<"),this.state=P.DATA,this._stateData(e);}}_stateEndTagOpen(e){if(F(e))this._createEndTagToken(),this.state=P.TAG_NAME,this._stateTagName(e);else switch(e){case a.GREATER_THAN_SIGN:this._err(T.missingEndTagName),this.state=P.DATA;break;case a.EOF:this._err(T.eofBeforeTagName),this._emitChars("</"),this._emitEOFToken();break;default:this._err(T.invalidFirstCharacterOfTagName),this._createCommentToken(2),this.state=P.BOGUS_COMMENT,this._stateBogusComment(e);}}_stateTagName(e){const t=this.currentToken;switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:this.state=P.BEFORE_ATTRIBUTE_NAME;break;case a.SOLIDUS:this.state=P.SELF_CLOSING_START_TAG;break;case a.GREATER_THAN_SIGN:this.state=P.DATA,this.emitCurrentTagToken();break;case a.NULL:this._err(T.unexpectedNullCharacter),t.tagName+=s;break;case a.EOF:this._err(T.eofInTag),this._emitEOFToken();break;default:t.tagName+=String.fromCodePoint(H(e)?w(e):e);}}_stateRcdataLessThanSign(e){e===a.SOLIDUS?this.state=P.RCDATA_END_TAG_OPEN:(this._emitChars("<"),this.state=P.RCDATA,this._stateRcdata(e));}_stateRcdataEndTagOpen(e){F(e)?(this.state=P.RCDATA_END_TAG_NAME,this._stateRcdataEndTagName(e)):(this._emitChars("</"),this.state=P.RCDATA,this._stateRcdata(e));}handleSpecialEndTag(e){if(!this.preprocessor.startsWith(this.lastStartTagName,!1))return !this._ensureHibernation();switch(this._createEndTagToken(),this.currentToken.tagName=this.lastStartTagName,this.preprocessor.peek(this.lastStartTagName.length)){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:return this._advanceBy(this.lastStartTagName.length),this.state=P.BEFORE_ATTRIBUTE_NAME,!1;case a.SOLIDUS:return this._advanceBy(this.lastStartTagName.length),this.state=P.SELF_CLOSING_START_TAG,!1;case a.GREATER_THAN_SIGN:return this._advanceBy(this.lastStartTagName.length),this.emitCurrentTagToken(),this.state=P.DATA,!1;default:return !this._ensureHibernation()}}_stateRcdataEndTagName(e){this.handleSpecialEndTag(e)&&(this._emitChars("</"),this.state=P.RCDATA,this._stateRcdata(e));}_stateRawtextLessThanSign(e){e===a.SOLIDUS?this.state=P.RAWTEXT_END_TAG_OPEN:(this._emitChars("<"),this.state=P.RAWTEXT,this._stateRawtext(e));}_stateRawtextEndTagOpen(e){F(e)?(this.state=P.RAWTEXT_END_TAG_NAME,this._stateRawtextEndTagName(e)):(this._emitChars("</"),this.state=P.RAWTEXT,this._stateRawtext(e));}_stateRawtextEndTagName(e){this.handleSpecialEndTag(e)&&(this._emitChars("</"),this.state=P.RAWTEXT,this._stateRawtext(e));}_stateScriptDataLessThanSign(e){switch(e){case a.SOLIDUS:this.state=P.SCRIPT_DATA_END_TAG_OPEN;break;case a.EXCLAMATION_MARK:this.state=P.SCRIPT_DATA_ESCAPE_START,this._emitChars("<!");break;default:this._emitChars("<"),this.state=P.SCRIPT_DATA,this._stateScriptData(e);}}_stateScriptDataEndTagOpen(e){F(e)?(this.state=P.SCRIPT_DATA_END_TAG_NAME,this._stateScriptDataEndTagName(e)):(this._emitChars("</"),this.state=P.SCRIPT_DATA,this._stateScriptData(e));}_stateScriptDataEndTagName(e){this.handleSpecialEndTag(e)&&(this._emitChars("</"),this.state=P.SCRIPT_DATA,this._stateScriptData(e));}_stateScriptDataEscapeStart(e){e===a.HYPHEN_MINUS?(this.state=P.SCRIPT_DATA_ESCAPE_START_DASH,this._emitChars("-")):(this.state=P.SCRIPT_DATA,this._stateScriptData(e));}_stateScriptDataEscapeStartDash(e){e===a.HYPHEN_MINUS?(this.state=P.SCRIPT_DATA_ESCAPED_DASH_DASH,this._emitChars("-")):(this.state=P.SCRIPT_DATA,this._stateScriptData(e));}_stateScriptDataEscaped(e){switch(e){case a.HYPHEN_MINUS:this.state=P.SCRIPT_DATA_ESCAPED_DASH,this._emitChars("-");break;case a.LESS_THAN_SIGN:this.state=P.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;break;case a.NULL:this._err(T.unexpectedNullCharacter),this._emitChars(s);break;case a.EOF:this._err(T.eofInScriptHtmlCommentLikeText),this._emitEOFToken();break;default:this._emitCodePoint(e);}}_stateScriptDataEscapedDash(e){switch(e){case a.HYPHEN_MINUS:this.state=P.SCRIPT_DATA_ESCAPED_DASH_DASH,this._emitChars("-");break;case a.LESS_THAN_SIGN:this.state=P.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;break;case a.NULL:this._err(T.unexpectedNullCharacter),this.state=P.SCRIPT_DATA_ESCAPED,this._emitChars(s);break;case a.EOF:this._err(T.eofInScriptHtmlCommentLikeText),this._emitEOFToken();break;default:this.state=P.SCRIPT_DATA_ESCAPED,this._emitCodePoint(e);}}_stateScriptDataEscapedDashDash(e){switch(e){case a.HYPHEN_MINUS:this._emitChars("-");break;case a.LESS_THAN_SIGN:this.state=P.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;break;case a.GREATER_THAN_SIGN:this.state=P.SCRIPT_DATA,this._emitChars(">");break;case a.NULL:this._err(T.unexpectedNullCharacter),this.state=P.SCRIPT_DATA_ESCAPED,this._emitChars(s);break;case a.EOF:this._err(T.eofInScriptHtmlCommentLikeText),this._emitEOFToken();break;default:this.state=P.SCRIPT_DATA_ESCAPED,this._emitCodePoint(e);}}_stateScriptDataEscapedLessThanSign(e){e===a.SOLIDUS?this.state=P.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:F(e)?(this._emitChars("<"),this.state=P.SCRIPT_DATA_DOUBLE_ESCAPE_START,this._stateScriptDataDoubleEscapeStart(e)):(this._emitChars("<"),this.state=P.SCRIPT_DATA_ESCAPED,this._stateScriptDataEscaped(e));}_stateScriptDataEscapedEndTagOpen(e){F(e)?(this.state=P.SCRIPT_DATA_ESCAPED_END_TAG_NAME,this._stateScriptDataEscapedEndTagName(e)):(this._emitChars("</"),this.state=P.SCRIPT_DATA_ESCAPED,this._stateScriptDataEscaped(e));}_stateScriptDataEscapedEndTagName(e){this.handleSpecialEndTag(e)&&(this._emitChars("</"),this.state=P.SCRIPT_DATA_ESCAPED,this._stateScriptDataEscaped(e));}_stateScriptDataDoubleEscapeStart(e){if(this.preprocessor.startsWith(i,!1)&&x(this.preprocessor.peek(i.length))){this._emitCodePoint(e);for(let e=0;e<i.length;e++)this._emitCodePoint(this._consume());this.state=P.SCRIPT_DATA_DOUBLE_ESCAPED;}else this._ensureHibernation()||(this.state=P.SCRIPT_DATA_ESCAPED,this._stateScriptDataEscaped(e));}_stateScriptDataDoubleEscaped(e){switch(e){case a.HYPHEN_MINUS:this.state=P.SCRIPT_DATA_DOUBLE_ESCAPED_DASH,this._emitChars("-");break;case a.LESS_THAN_SIGN:this.state=P.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN,this._emitChars("<");break;case a.NULL:this._err(T.unexpectedNullCharacter),this._emitChars(s);break;case a.EOF:this._err(T.eofInScriptHtmlCommentLikeText),this._emitEOFToken();break;default:this._emitCodePoint(e);}}_stateScriptDataDoubleEscapedDash(e){switch(e){case a.HYPHEN_MINUS:this.state=P.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH,this._emitChars("-");break;case a.LESS_THAN_SIGN:this.state=P.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN,this._emitChars("<");break;case a.NULL:this._err(T.unexpectedNullCharacter),this.state=P.SCRIPT_DATA_DOUBLE_ESCAPED,this._emitChars(s);break;case a.EOF:this._err(T.eofInScriptHtmlCommentLikeText),this._emitEOFToken();break;default:this.state=P.SCRIPT_DATA_DOUBLE_ESCAPED,this._emitCodePoint(e);}}_stateScriptDataDoubleEscapedDashDash(e){switch(e){case a.HYPHEN_MINUS:this._emitChars("-");break;case a.LESS_THAN_SIGN:this.state=P.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN,this._emitChars("<");break;case a.GREATER_THAN_SIGN:this.state=P.SCRIPT_DATA,this._emitChars(">");break;case a.NULL:this._err(T.unexpectedNullCharacter),this.state=P.SCRIPT_DATA_DOUBLE_ESCAPED,this._emitChars(s);break;case a.EOF:this._err(T.eofInScriptHtmlCommentLikeText),this._emitEOFToken();break;default:this.state=P.SCRIPT_DATA_DOUBLE_ESCAPED,this._emitCodePoint(e);}}_stateScriptDataDoubleEscapedLessThanSign(e){e===a.SOLIDUS?(this.state=P.SCRIPT_DATA_DOUBLE_ESCAPE_END,this._emitChars("/")):(this.state=P.SCRIPT_DATA_DOUBLE_ESCAPED,this._stateScriptDataDoubleEscaped(e));}_stateScriptDataDoubleEscapeEnd(e){if(this.preprocessor.startsWith(i,!1)&&x(this.preprocessor.peek(i.length))){this._emitCodePoint(e);for(let e=0;e<i.length;e++)this._emitCodePoint(this._consume());this.state=P.SCRIPT_DATA_ESCAPED;}else this._ensureHibernation()||(this.state=P.SCRIPT_DATA_DOUBLE_ESCAPED,this._stateScriptDataDoubleEscaped(e));}_stateBeforeAttributeName(e){switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:break;case a.SOLIDUS:case a.GREATER_THAN_SIGN:case a.EOF:this.state=P.AFTER_ATTRIBUTE_NAME,this._stateAfterAttributeName(e);break;case a.EQUALS_SIGN:this._err(T.unexpectedEqualsSignBeforeAttributeName),this._createAttr("="),this.state=P.ATTRIBUTE_NAME;break;default:this._createAttr(""),this.state=P.ATTRIBUTE_NAME,this._stateAttributeName(e);}}_stateAttributeName(e){switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:case a.SOLIDUS:case a.GREATER_THAN_SIGN:case a.EOF:this._leaveAttrName(),this.state=P.AFTER_ATTRIBUTE_NAME,this._stateAfterAttributeName(e);break;case a.EQUALS_SIGN:this._leaveAttrName(),this.state=P.BEFORE_ATTRIBUTE_VALUE;break;case a.QUOTATION_MARK:case a.APOSTROPHE:case a.LESS_THAN_SIGN:this._err(T.unexpectedCharacterInAttributeName),this.currentAttr.name+=String.fromCodePoint(e);break;case a.NULL:this._err(T.unexpectedNullCharacter),this.currentAttr.name+=s;break;default:this.currentAttr.name+=String.fromCodePoint(H(e)?w(e):e);}}_stateAfterAttributeName(e){switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:break;case a.SOLIDUS:this.state=P.SELF_CLOSING_START_TAG;break;case a.EQUALS_SIGN:this.state=P.BEFORE_ATTRIBUTE_VALUE;break;case a.GREATER_THAN_SIGN:this.state=P.DATA,this.emitCurrentTagToken();break;case a.EOF:this._err(T.eofInTag),this._emitEOFToken();break;default:this._createAttr(""),this.state=P.ATTRIBUTE_NAME,this._stateAttributeName(e);}}_stateBeforeAttributeValue(e){switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:break;case a.QUOTATION_MARK:this.state=P.ATTRIBUTE_VALUE_DOUBLE_QUOTED;break;case a.APOSTROPHE:this.state=P.ATTRIBUTE_VALUE_SINGLE_QUOTED;break;case a.GREATER_THAN_SIGN:this._err(T.missingAttributeValue),this.state=P.DATA,this.emitCurrentTagToken();break;default:this.state=P.ATTRIBUTE_VALUE_UNQUOTED,this._stateAttributeValueUnquoted(e);}}_stateAttributeValueDoubleQuoted(e){switch(e){case a.QUOTATION_MARK:this.state=P.AFTER_ATTRIBUTE_VALUE_QUOTED;break;case a.AMPERSAND:this.returnState=P.ATTRIBUTE_VALUE_DOUBLE_QUOTED,this.state=P.CHARACTER_REFERENCE;break;case a.NULL:this._err(T.unexpectedNullCharacter),this.currentAttr.value+=s;break;case a.EOF:this._err(T.eofInTag),this._emitEOFToken();break;default:this.currentAttr.value+=String.fromCodePoint(e);}}_stateAttributeValueSingleQuoted(e){switch(e){case a.APOSTROPHE:this.state=P.AFTER_ATTRIBUTE_VALUE_QUOTED;break;case a.AMPERSAND:this.returnState=P.ATTRIBUTE_VALUE_SINGLE_QUOTED,this.state=P.CHARACTER_REFERENCE;break;case a.NULL:this._err(T.unexpectedNullCharacter),this.currentAttr.value+=s;break;case a.EOF:this._err(T.eofInTag),this._emitEOFToken();break;default:this.currentAttr.value+=String.fromCodePoint(e);}}_stateAttributeValueUnquoted(e){switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:this._leaveAttrValue(),this.state=P.BEFORE_ATTRIBUTE_NAME;break;case a.AMPERSAND:this.returnState=P.ATTRIBUTE_VALUE_UNQUOTED,this.state=P.CHARACTER_REFERENCE;break;case a.GREATER_THAN_SIGN:this._leaveAttrValue(),this.state=P.DATA,this.emitCurrentTagToken();break;case a.NULL:this._err(T.unexpectedNullCharacter),this.currentAttr.value+=s;break;case a.QUOTATION_MARK:case a.APOSTROPHE:case a.LESS_THAN_SIGN:case a.EQUALS_SIGN:case a.GRAVE_ACCENT:this._err(T.unexpectedCharacterInUnquotedAttributeValue),this.currentAttr.value+=String.fromCodePoint(e);break;case a.EOF:this._err(T.eofInTag),this._emitEOFToken();break;default:this.currentAttr.value+=String.fromCodePoint(e);}}_stateAfterAttributeValueQuoted(e){switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:this._leaveAttrValue(),this.state=P.BEFORE_ATTRIBUTE_NAME;break;case a.SOLIDUS:this._leaveAttrValue(),this.state=P.SELF_CLOSING_START_TAG;break;case a.GREATER_THAN_SIGN:this._leaveAttrValue(),this.state=P.DATA,this.emitCurrentTagToken();break;case a.EOF:this._err(T.eofInTag),this._emitEOFToken();break;default:this._err(T.missingWhitespaceBetweenAttributes),this.state=P.BEFORE_ATTRIBUTE_NAME,this._stateBeforeAttributeName(e);}}_stateSelfClosingStartTag(e){switch(e){case a.GREATER_THAN_SIGN:this.currentToken.selfClosing=!0,this.state=P.DATA,this.emitCurrentTagToken();break;case a.EOF:this._err(T.eofInTag),this._emitEOFToken();break;default:this._err(T.unexpectedSolidusInTag),this.state=P.BEFORE_ATTRIBUTE_NAME,this._stateBeforeAttributeName(e);}}_stateBogusComment(e){const t=this.currentToken;switch(e){case a.GREATER_THAN_SIGN:this.state=P.DATA,this.emitCurrentComment(t);break;case a.EOF:this.emitCurrentComment(t),this._emitEOFToken();break;case a.NULL:this._err(T.unexpectedNullCharacter),t.data+=s;break;default:t.data+=String.fromCodePoint(e);}}_stateMarkupDeclarationOpen(e){this._consumeSequenceIfMatch("--",!0)?(this._createCommentToken("--".length+1),this.state=P.COMMENT_START):this._consumeSequenceIfMatch(n,!1)?(this.currentLocation=this.getCurrentLocation(n.length+1),this.state=P.DOCTYPE):this._consumeSequenceIfMatch(r,!0)?this.inForeignNode?this.state=P.CDATA_SECTION:(this._err(T.cdataInHtmlContent),this._createCommentToken(r.length+1),this.currentToken.data="[CDATA[",this.state=P.BOGUS_COMMENT):this._ensureHibernation()||(this._err(T.incorrectlyOpenedComment),this._createCommentToken(2),this.state=P.BOGUS_COMMENT,this._stateBogusComment(e));}_stateCommentStart(e){switch(e){case a.HYPHEN_MINUS:this.state=P.COMMENT_START_DASH;break;case a.GREATER_THAN_SIGN:{this._err(T.abruptClosingOfEmptyComment),this.state=P.DATA;const e=this.currentToken;this.emitCurrentComment(e);break}default:this.state=P.COMMENT,this._stateComment(e);}}_stateCommentStartDash(e){const t=this.currentToken;switch(e){case a.HYPHEN_MINUS:this.state=P.COMMENT_END;break;case a.GREATER_THAN_SIGN:this._err(T.abruptClosingOfEmptyComment),this.state=P.DATA,this.emitCurrentComment(t);break;case a.EOF:this._err(T.eofInComment),this.emitCurrentComment(t),this._emitEOFToken();break;default:t.data+="-",this.state=P.COMMENT,this._stateComment(e);}}_stateComment(e){const t=this.currentToken;switch(e){case a.HYPHEN_MINUS:this.state=P.COMMENT_END_DASH;break;case a.LESS_THAN_SIGN:t.data+="<",this.state=P.COMMENT_LESS_THAN_SIGN;break;case a.NULL:this._err(T.unexpectedNullCharacter),t.data+=s;break;case a.EOF:this._err(T.eofInComment),this.emitCurrentComment(t),this._emitEOFToken();break;default:t.data+=String.fromCodePoint(e);}}_stateCommentLessThanSign(e){const t=this.currentToken;switch(e){case a.EXCLAMATION_MARK:t.data+="!",this.state=P.COMMENT_LESS_THAN_SIGN_BANG;break;case a.LESS_THAN_SIGN:t.data+="<";break;default:this.state=P.COMMENT,this._stateComment(e);}}_stateCommentLessThanSignBang(e){e===a.HYPHEN_MINUS?this.state=P.COMMENT_LESS_THAN_SIGN_BANG_DASH:(this.state=P.COMMENT,this._stateComment(e));}_stateCommentLessThanSignBangDash(e){e===a.HYPHEN_MINUS?this.state=P.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:(this.state=P.COMMENT_END_DASH,this._stateCommentEndDash(e));}_stateCommentLessThanSignBangDashDash(e){e!==a.GREATER_THAN_SIGN&&e!==a.EOF&&this._err(T.nestedComment),this.state=P.COMMENT_END,this._stateCommentEnd(e);}_stateCommentEndDash(e){const t=this.currentToken;switch(e){case a.HYPHEN_MINUS:this.state=P.COMMENT_END;break;case a.EOF:this._err(T.eofInComment),this.emitCurrentComment(t),this._emitEOFToken();break;default:t.data+="-",this.state=P.COMMENT,this._stateComment(e);}}_stateCommentEnd(e){const t=this.currentToken;switch(e){case a.GREATER_THAN_SIGN:this.state=P.DATA,this.emitCurrentComment(t);break;case a.EXCLAMATION_MARK:this.state=P.COMMENT_END_BANG;break;case a.HYPHEN_MINUS:t.data+="-";break;case a.EOF:this._err(T.eofInComment),this.emitCurrentComment(t),this._emitEOFToken();break;default:t.data+="--",this.state=P.COMMENT,this._stateComment(e);}}_stateCommentEndBang(e){const t=this.currentToken;switch(e){case a.HYPHEN_MINUS:t.data+="--!",this.state=P.COMMENT_END_DASH;break;case a.GREATER_THAN_SIGN:this._err(T.incorrectlyClosedComment),this.state=P.DATA,this.emitCurrentComment(t);break;case a.EOF:this._err(T.eofInComment),this.emitCurrentComment(t),this._emitEOFToken();break;default:t.data+="--!",this.state=P.COMMENT,this._stateComment(e);}}_stateDoctype(e){switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:this.state=P.BEFORE_DOCTYPE_NAME;break;case a.GREATER_THAN_SIGN:this.state=P.BEFORE_DOCTYPE_NAME,this._stateBeforeDoctypeName(e);break;case a.EOF:{this._err(T.eofInDoctype),this._createDoctypeToken(null);const e=this.currentToken;e.forceQuirks=!0,this.emitCurrentDoctype(e),this._emitEOFToken();break}default:this._err(T.missingWhitespaceBeforeDoctypeName),this.state=P.BEFORE_DOCTYPE_NAME,this._stateBeforeDoctypeName(e);}}_stateBeforeDoctypeName(e){if(H(e))this._createDoctypeToken(String.fromCharCode(w(e))),this.state=P.DOCTYPE_NAME;else switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:break;case a.NULL:this._err(T.unexpectedNullCharacter),this._createDoctypeToken(s),this.state=P.DOCTYPE_NAME;break;case a.GREATER_THAN_SIGN:{this._err(T.missingDoctypeName),this._createDoctypeToken(null);const e=this.currentToken;e.forceQuirks=!0,this.emitCurrentDoctype(e),this.state=P.DATA;break}case a.EOF:{this._err(T.eofInDoctype),this._createDoctypeToken(null);const e=this.currentToken;e.forceQuirks=!0,this.emitCurrentDoctype(e),this._emitEOFToken();break}default:this._createDoctypeToken(String.fromCodePoint(e)),this.state=P.DOCTYPE_NAME;}}_stateDoctypeName(e){const t=this.currentToken;switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:this.state=P.AFTER_DOCTYPE_NAME;break;case a.GREATER_THAN_SIGN:this.state=P.DATA,this.emitCurrentDoctype(t);break;case a.NULL:this._err(T.unexpectedNullCharacter),t.name+=s;break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:t.name+=String.fromCodePoint(H(e)?w(e):e);}}_stateAfterDoctypeName(e){const t=this.currentToken;switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:break;case a.GREATER_THAN_SIGN:this.state=P.DATA,this.emitCurrentDoctype(t);break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:this._consumeSequenceIfMatch("public",!1)?this.state=P.AFTER_DOCTYPE_PUBLIC_KEYWORD:this._consumeSequenceIfMatch("system",!1)?this.state=P.AFTER_DOCTYPE_SYSTEM_KEYWORD:this._ensureHibernation()||(this._err(T.invalidCharacterSequenceAfterDoctypeName),t.forceQuirks=!0,this.state=P.BOGUS_DOCTYPE,this._stateBogusDoctype(e));}}_stateAfterDoctypePublicKeyword(e){const t=this.currentToken;switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:this.state=P.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;break;case a.QUOTATION_MARK:this._err(T.missingWhitespaceAfterDoctypePublicKeyword),t.publicId="",this.state=P.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;break;case a.APOSTROPHE:this._err(T.missingWhitespaceAfterDoctypePublicKeyword),t.publicId="",this.state=P.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;break;case a.GREATER_THAN_SIGN:this._err(T.missingDoctypePublicIdentifier),t.forceQuirks=!0,this.state=P.DATA,this.emitCurrentDoctype(t);break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:this._err(T.missingQuoteBeforeDoctypePublicIdentifier),t.forceQuirks=!0,this.state=P.BOGUS_DOCTYPE,this._stateBogusDoctype(e);}}_stateBeforeDoctypePublicIdentifier(e){const t=this.currentToken;switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:break;case a.QUOTATION_MARK:t.publicId="",this.state=P.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;break;case a.APOSTROPHE:t.publicId="",this.state=P.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;break;case a.GREATER_THAN_SIGN:this._err(T.missingDoctypePublicIdentifier),t.forceQuirks=!0,this.state=P.DATA,this.emitCurrentDoctype(t);break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:this._err(T.missingQuoteBeforeDoctypePublicIdentifier),t.forceQuirks=!0,this.state=P.BOGUS_DOCTYPE,this._stateBogusDoctype(e);}}_stateDoctypePublicIdentifierDoubleQuoted(e){const t=this.currentToken;switch(e){case a.QUOTATION_MARK:this.state=P.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;break;case a.NULL:this._err(T.unexpectedNullCharacter),t.publicId+=s;break;case a.GREATER_THAN_SIGN:this._err(T.abruptDoctypePublicIdentifier),t.forceQuirks=!0,this.emitCurrentDoctype(t),this.state=P.DATA;break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:t.publicId+=String.fromCodePoint(e);}}_stateDoctypePublicIdentifierSingleQuoted(e){const t=this.currentToken;switch(e){case a.APOSTROPHE:this.state=P.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;break;case a.NULL:this._err(T.unexpectedNullCharacter),t.publicId+=s;break;case a.GREATER_THAN_SIGN:this._err(T.abruptDoctypePublicIdentifier),t.forceQuirks=!0,this.emitCurrentDoctype(t),this.state=P.DATA;break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:t.publicId+=String.fromCodePoint(e);}}_stateAfterDoctypePublicIdentifier(e){const t=this.currentToken;switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:this.state=P.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;break;case a.GREATER_THAN_SIGN:this.state=P.DATA,this.emitCurrentDoctype(t);break;case a.QUOTATION_MARK:this._err(T.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers),t.systemId="",this.state=P.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;break;case a.APOSTROPHE:this._err(T.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers),t.systemId="",this.state=P.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:this._err(T.missingQuoteBeforeDoctypeSystemIdentifier),t.forceQuirks=!0,this.state=P.BOGUS_DOCTYPE,this._stateBogusDoctype(e);}}_stateBetweenDoctypePublicAndSystemIdentifiers(e){const t=this.currentToken;switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:break;case a.GREATER_THAN_SIGN:this.emitCurrentDoctype(t),this.state=P.DATA;break;case a.QUOTATION_MARK:t.systemId="",this.state=P.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;break;case a.APOSTROPHE:t.systemId="",this.state=P.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:this._err(T.missingQuoteBeforeDoctypeSystemIdentifier),t.forceQuirks=!0,this.state=P.BOGUS_DOCTYPE,this._stateBogusDoctype(e);}}_stateAfterDoctypeSystemKeyword(e){const t=this.currentToken;switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:this.state=P.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;break;case a.QUOTATION_MARK:this._err(T.missingWhitespaceAfterDoctypeSystemKeyword),t.systemId="",this.state=P.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;break;case a.APOSTROPHE:this._err(T.missingWhitespaceAfterDoctypeSystemKeyword),t.systemId="",this.state=P.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;break;case a.GREATER_THAN_SIGN:this._err(T.missingDoctypeSystemIdentifier),t.forceQuirks=!0,this.state=P.DATA,this.emitCurrentDoctype(t);break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:this._err(T.missingQuoteBeforeDoctypeSystemIdentifier),t.forceQuirks=!0,this.state=P.BOGUS_DOCTYPE,this._stateBogusDoctype(e);}}_stateBeforeDoctypeSystemIdentifier(e){const t=this.currentToken;switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:break;case a.QUOTATION_MARK:t.systemId="",this.state=P.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;break;case a.APOSTROPHE:t.systemId="",this.state=P.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;break;case a.GREATER_THAN_SIGN:this._err(T.missingDoctypeSystemIdentifier),t.forceQuirks=!0,this.state=P.DATA,this.emitCurrentDoctype(t);break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:this._err(T.missingQuoteBeforeDoctypeSystemIdentifier),t.forceQuirks=!0,this.state=P.BOGUS_DOCTYPE,this._stateBogusDoctype(e);}}_stateDoctypeSystemIdentifierDoubleQuoted(e){const t=this.currentToken;switch(e){case a.QUOTATION_MARK:this.state=P.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;break;case a.NULL:this._err(T.unexpectedNullCharacter),t.systemId+=s;break;case a.GREATER_THAN_SIGN:this._err(T.abruptDoctypeSystemIdentifier),t.forceQuirks=!0,this.emitCurrentDoctype(t),this.state=P.DATA;break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:t.systemId+=String.fromCodePoint(e);}}_stateDoctypeSystemIdentifierSingleQuoted(e){const t=this.currentToken;switch(e){case a.APOSTROPHE:this.state=P.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;break;case a.NULL:this._err(T.unexpectedNullCharacter),t.systemId+=s;break;case a.GREATER_THAN_SIGN:this._err(T.abruptDoctypeSystemIdentifier),t.forceQuirks=!0,this.emitCurrentDoctype(t),this.state=P.DATA;break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:t.systemId+=String.fromCodePoint(e);}}_stateAfterDoctypeSystemIdentifier(e){const t=this.currentToken;switch(e){case a.SPACE:case a.LINE_FEED:case a.TABULATION:case a.FORM_FEED:break;case a.GREATER_THAN_SIGN:this.emitCurrentDoctype(t),this.state=P.DATA;break;case a.EOF:this._err(T.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break;default:this._err(T.unexpectedCharacterAfterDoctypeSystemIdentifier),this.state=P.BOGUS_DOCTYPE,this._stateBogusDoctype(e);}}_stateBogusDoctype(e){const t=this.currentToken;switch(e){case a.GREATER_THAN_SIGN:this.emitCurrentDoctype(t),this.state=P.DATA;break;case a.NULL:this._err(T.unexpectedNullCharacter);break;case a.EOF:this.emitCurrentDoctype(t),this._emitEOFToken();}}_stateCdataSection(e){switch(e){case a.RIGHT_SQUARE_BRACKET:this.state=P.CDATA_SECTION_BRACKET;break;case a.EOF:this._err(T.eofInCdata),this._emitEOFToken();break;default:this._emitCodePoint(e);}}_stateCdataSectionBracket(e){e===a.RIGHT_SQUARE_BRACKET?this.state=P.CDATA_SECTION_END:(this._emitChars("]"),this.state=P.CDATA_SECTION,this._stateCdataSection(e));}_stateCdataSectionEnd(e){switch(e){case a.GREATER_THAN_SIGN:this.state=P.DATA;break;case a.RIGHT_SQUARE_BRACKET:this._emitChars("]");break;default:this._emitChars("]]"),this.state=P.CDATA_SECTION,this._stateCdataSection(e);}}_stateCharacterReference(e){e===a.NUMBER_SIGN?this.state=P.NUMERIC_CHARACTER_REFERENCE:U(e)?(this.state=P.NAMED_CHARACTER_REFERENCE,this._stateNamedCharacterReference(e)):(this._flushCodePointConsumedAsCharacterReference(a.AMPERSAND),this._reconsumeInState(this.returnState,e));}_stateNamedCharacterReference(e){const t=this._matchNamedCharacterReference(e);if(this._ensureHibernation());else if(t){for(let e=0;e<t.length;e++)this._flushCodePointConsumedAsCharacterReference(t[e]);this.state=this.returnState;}else this._flushCodePointConsumedAsCharacterReference(a.AMPERSAND),this.state=P.AMBIGUOUS_AMPERSAND;}_stateAmbiguousAmpersand(e){U(e)?this._flushCodePointConsumedAsCharacterReference(e):(e===a.SEMICOLON&&this._err(T.unknownNamedCharacterReference),this._reconsumeInState(this.returnState,e));}_stateNumericCharacterReference(e){this.charRefCode=0,e===a.LATIN_SMALL_X||e===a.LATIN_CAPITAL_X?this.state=P.HEXADEMICAL_CHARACTER_REFERENCE_START:B(e)?(this.state=P.DECIMAL_CHARACTER_REFERENCE,this._stateDecimalCharacterReference(e)):(this._err(T.absenceOfDigitsInNumericCharacterReference),this._flushCodePointConsumedAsCharacterReference(a.AMPERSAND),this._flushCodePointConsumedAsCharacterReference(a.NUMBER_SIGN),this._reconsumeInState(this.returnState,e));}_stateHexademicalCharacterReferenceStart(e){!function(e){return B(e)||G(e)||y(e)}(e)?(this._err(T.absenceOfDigitsInNumericCharacterReference),this._flushCodePointConsumedAsCharacterReference(a.AMPERSAND),this._flushCodePointConsumedAsCharacterReference(a.NUMBER_SIGN),this._unconsume(2),this.state=this.returnState):(this.state=P.HEXADEMICAL_CHARACTER_REFERENCE,this._stateHexademicalCharacterReference(e));}_stateHexademicalCharacterReference(e){G(e)?this.charRefCode=16*this.charRefCode+e-55:y(e)?this.charRefCode=16*this.charRefCode+e-87:B(e)?this.charRefCode=16*this.charRefCode+e-48:e===a.SEMICOLON?this.state=P.NUMERIC_CHARACTER_REFERENCE_END:(this._err(T.missingSemicolonAfterCharacterReference),this.state=P.NUMERIC_CHARACTER_REFERENCE_END,this._stateNumericCharacterReferenceEnd(e));}_stateDecimalCharacterReference(e){B(e)?this.charRefCode=10*this.charRefCode+e-48:e===a.SEMICOLON?this.state=P.NUMERIC_CHARACTER_REFERENCE_END:(this._err(T.missingSemicolonAfterCharacterReference),this.state=P.NUMERIC_CHARACTER_REFERENCE_END,this._stateNumericCharacterReferenceEnd(e));}_stateNumericCharacterReferenceEnd(e){if(this.charRefCode===a.NULL)this._err(T.nullCharacterReference),this.charRefCode=a.REPLACEMENT_CHARACTER;else if(this.charRefCode>1114111)this._err(T.characterReferenceOutsideUnicodeRange),this.charRefCode=a.REPLACEMENT_CHARACTER;else if(o(this.charRefCode))this._err(T.surrogateCharacterReference),this.charRefCode=a.REPLACEMENT_CHARACTER;else if(E(this.charRefCode))this._err(T.noncharacterCharacterReference);else if(c(this.charRefCode)||this.charRefCode===a.CARRIAGE_RETURN){this._err(T.controlCharacterReference);const e=k.get(this.charRefCode);void 0!==e&&(this.charRefCode=e);}this._flushCodePointConsumedAsCharacterReference(this.charRefCode),this._reconsumeInState(this.returnState,e);}}const Q=new Set([u.DD,u.DT,u.LI,u.OPTGROUP,u.OPTION,u.P,u.RB,u.RP,u.RT,u.RTC]),q=new Set([...Q,u.CAPTION,u.COLGROUP,u.TBODY,u.TD,u.TFOOT,u.TH,u.THEAD,u.TR]),W=new Map([[u.APPLET,p.HTML],[u.CAPTION,p.HTML],[u.HTML,p.HTML],[u.MARQUEE,p.HTML],[u.OBJECT,p.HTML],[u.TABLE,p.HTML],[u.TD,p.HTML],[u.TEMPLATE,p.HTML],[u.TH,p.HTML],[u.ANNOTATION_XML,p.MATHML],[u.MI,p.MATHML],[u.MN,p.MATHML],[u.MO,p.MATHML],[u.MS,p.MATHML],[u.MTEXT,p.MATHML],[u.DESC,p.SVG],[u.FOREIGN_OBJECT,p.SVG],[u.TITLE,p.SVG]]),X=[u.H1,u.H2,u.H3,u.H4,u.H5,u.H6],K=[u.TR,u.TEMPLATE,u.HTML],V=[u.TBODY,u.TFOOT,u.THEAD,u.TEMPLATE,u.HTML],z=[u.TABLE,u.TEMPLATE,u.HTML],j=[u.TD,u.TH];class J{get currentTmplContentOrNode(){return this._isInTemplate()?this.treeAdapter.getTemplateContent(this.current):this.current}constructor(e,t,s){this.treeAdapter=t,this.handler=s,this.items=[],this.tagIDs=[],this.stackTop=-1,this.tmplCount=0,this.currentTagId=u.UNKNOWN,this.current=e;}_indexOf(e){return this.items.lastIndexOf(e,this.stackTop)}_isInTemplate(){return this.currentTagId===u.TEMPLATE&&this.treeAdapter.getNamespaceURI(this.current)===p.HTML}_updateCurrentElement(){this.current=this.items[this.stackTop],this.currentTagId=this.tagIDs[this.stackTop];}push(e,t){this.stackTop++,this.items[this.stackTop]=e,this.current=e,this.tagIDs[this.stackTop]=t,this.currentTagId=t,this._isInTemplate()&&this.tmplCount++,this.handler.onItemPush(e,t,!0);}pop(){const e=this.current;this.tmplCount>0&&this._isInTemplate()&&this.tmplCount--,this.stackTop--,this._updateCurrentElement(),this.handler.onItemPop(e,!0);}replace(e,t){const s=this._indexOf(e);this.items[s]=t,s===this.stackTop&&(this.current=t);}insertAfter(e,t,s){const a=this._indexOf(e)+1;this.items.splice(a,0,t),this.tagIDs.splice(a,0,s),this.stackTop++,a===this.stackTop&&this._updateCurrentElement(),this.handler.onItemPush(this.current,this.currentTagId,a===this.stackTop);}popUntilTagNamePopped(e){let t=this.stackTop+1;do{t=this.tagIDs.lastIndexOf(e,t-1);}while(t>0&&this.treeAdapter.getNamespaceURI(this.items[t])!==p.HTML);this.shortenToLength(t<0?0:t);}shortenToLength(e){for(;this.stackTop>=e;){const t=this.current;this.tmplCount>0&&this._isInTemplate()&&(this.tmplCount-=1),this.stackTop--,this._updateCurrentElement(),this.handler.onItemPop(t,this.stackTop<e);}}popUntilElementPopped(e){const t=this._indexOf(e);this.shortenToLength(t<0?0:t);}popUntilPopped(e,t){const s=this._indexOfTagNames(e,t);this.shortenToLength(s<0?0:s);}popUntilNumberedHeaderPopped(){this.popUntilPopped(X,p.HTML);}popUntilTableCellPopped(){this.popUntilPopped(j,p.HTML);}popAllUpToHtmlElement(){this.tmplCount=0,this.shortenToLength(1);}_indexOfTagNames(e,t){for(let s=this.stackTop;s>=0;s--)if(e.includes(this.tagIDs[s])&&this.treeAdapter.getNamespaceURI(this.items[s])===t)return s;return -1}clearBackTo(e,t){const s=this._indexOfTagNames(e,t);this.shortenToLength(s+1);}clearBackToTableContext(){this.clearBackTo(z,p.HTML);}clearBackToTableBodyContext(){this.clearBackTo(V,p.HTML);}clearBackToTableRowContext(){this.clearBackTo(K,p.HTML);}remove(e){const t=this._indexOf(e);t>=0&&(t===this.stackTop?this.pop():(this.items.splice(t,1),this.tagIDs.splice(t,1),this.stackTop--,this._updateCurrentElement(),this.handler.onItemPop(e,!1)));}tryPeekProperlyNestedBodyElement(){return this.stackTop>=1&&this.tagIDs[1]===u.BODY?this.items[1]:null}contains(e){return this._indexOf(e)>-1}getCommonAncestor(e){const t=this._indexOf(e)-1;return t>=0?this.items[t]:null}isRootHtmlElementCurrent(){return 0===this.stackTop&&this.tagIDs[0]===u.HTML}hasInScope(e){for(let t=this.stackTop;t>=0;t--){const s=this.tagIDs[t],a=this.treeAdapter.getNamespaceURI(this.items[t]);if(s===e&&a===p.HTML)return !0;if(W.get(s)===a)return !1}return !0}hasNumberedHeaderInScope(){for(let e=this.stackTop;e>=0;e--){const t=this.tagIDs[e],s=this.treeAdapter.getNamespaceURI(this.items[e]);if(M(t)&&s===p.HTML)return !0;if(W.get(t)===s)return !1}return !0}hasInListItemScope(e){for(let t=this.stackTop;t>=0;t--){const s=this.tagIDs[t],a=this.treeAdapter.getNamespaceURI(this.items[t]);if(s===e&&a===p.HTML)return !0;if((s===u.UL||s===u.OL)&&a===p.HTML||W.get(s)===a)return !1}return !0}hasInButtonScope(e){for(let t=this.stackTop;t>=0;t--){const s=this.tagIDs[t],a=this.treeAdapter.getNamespaceURI(this.items[t]);if(s===e&&a===p.HTML)return !0;if(s===u.BUTTON&&a===p.HTML||W.get(s)===a)return !1}return !0}hasInTableScope(e){for(let t=this.stackTop;t>=0;t--){const s=this.tagIDs[t];if(this.treeAdapter.getNamespaceURI(this.items[t])===p.HTML){if(s===e)return !0;if(s===u.TABLE||s===u.TEMPLATE||s===u.HTML)return !1}}return !0}hasTableBodyContextInTableScope(){for(let e=this.stackTop;e>=0;e--){const t=this.tagIDs[e];if(this.treeAdapter.getNamespaceURI(this.items[e])===p.HTML){if(t===u.TBODY||t===u.THEAD||t===u.TFOOT)return !0;if(t===u.TABLE||t===u.HTML)return !1}}return !0}hasInSelectScope(e){for(let t=this.stackTop;t>=0;t--){const s=this.tagIDs[t];if(this.treeAdapter.getNamespaceURI(this.items[t])===p.HTML){if(s===e)return !0;if(s!==u.OPTION&&s!==u.OPTGROUP)return !1}}return !0}generateImpliedEndTags(){for(;Q.has(this.currentTagId);)this.pop();}generateImpliedEndTagsThoroughly(){for(;q.has(this.currentTagId);)this.pop();}generateImpliedEndTagsWithExclusion(e){for(;this.currentTagId!==e&&q.has(this.currentTagId);)this.pop();}}var Z;!function(e){e[e.Marker=0]="Marker",e[e.Element=1]="Element";}(Z=Z||(Z={}));const $={type:Z.Marker};class ee{constructor(e){this.treeAdapter=e,this.entries=[],this.bookmark=null;}_getNoahArkConditionCandidates(e,t){const s=[],a=t.length,r=this.treeAdapter.getTagName(e),n=this.treeAdapter.getNamespaceURI(e);for(let e=0;e<this.entries.length;e++){const t=this.entries[e];if(t.type===Z.Marker)break;const{element:i}=t;if(this.treeAdapter.getTagName(i)===r&&this.treeAdapter.getNamespaceURI(i)===n){const t=this.treeAdapter.getAttrList(i);t.length===a&&s.push({idx:e,attrs:t});}}return s}_ensureNoahArkCondition(e){if(this.entries.length<3)return;const t=this.treeAdapter.getAttrList(e),s=this._getNoahArkConditionCandidates(e,t);if(s.length<3)return;const a=new Map(t.map((e=>[e.name,e.value])));let r=0;for(let e=0;e<s.length;e++){const t=s[e];t.attrs.every((e=>a.get(e.name)===e.value))&&(r+=1,r>=3&&this.entries.splice(t.idx,1));}}insertMarker(){this.entries.unshift($);}pushElement(e,t){this._ensureNoahArkCondition(e),this.entries.unshift({type:Z.Element,element:e,token:t});}insertElementAfterBookmark(e,t){const s=this.entries.indexOf(this.bookmark);this.entries.splice(s,0,{type:Z.Element,element:e,token:t});}removeEntry(e){const t=this.entries.indexOf(e);t>=0&&this.entries.splice(t,1);}clearToLastMarker(){const e=this.entries.indexOf($);e>=0?this.entries.splice(0,e+1):this.entries.length=0;}getElementEntryInScopeWithTagName(e){const t=this.entries.find((t=>t.type===Z.Marker||this.treeAdapter.getTagName(t.element)===e));return t&&t.type===Z.Element?t:null}getElementEntry(e){return this.entries.find((t=>t.type===Z.Element&&t.element===e))}}function te(e){return {nodeName:"#text",value:e,parentNode:null}}const se={createDocument:()=>({nodeName:"#document",mode:I.NO_QUIRKS,childNodes:[]}),createDocumentFragment:()=>({nodeName:"#document-fragment",childNodes:[]}),createElement:(e,t,s)=>({nodeName:e,tagName:e,attrs:s,namespaceURI:t,childNodes:[],parentNode:null}),createCommentNode:e=>({nodeName:"#comment",data:e,parentNode:null}),appendChild(e,t){e.childNodes.push(t),t.parentNode=e;},insertBefore(e,t,s){const a=e.childNodes.indexOf(s);e.childNodes.splice(a,0,t),t.parentNode=e;},setTemplateContent(e,t){e.content=t;},getTemplateContent:e=>e.content,setDocumentType(e,t,s,a){const r=e.childNodes.find((e=>"#documentType"===e.nodeName));if(r)r.name=t,r.publicId=s,r.systemId=a;else {const r={nodeName:"#documentType",name:t,publicId:s,systemId:a,parentNode:null};se.appendChild(e,r);}},setDocumentMode(e,t){e.mode=t;},getDocumentMode:e=>e.mode,detachNode(e){if(e.parentNode){const t=e.parentNode.childNodes.indexOf(e);e.parentNode.childNodes.splice(t,1),e.parentNode=null;}},insertText(e,t){if(e.childNodes.length>0){const s=e.childNodes[e.childNodes.length-1];if(se.isTextNode(s))return void(s.value+=t)}se.appendChild(e,te(t));},insertTextBefore(e,t,s){const a=e.childNodes[e.childNodes.indexOf(s)-1];a&&se.isTextNode(a)?a.value+=t:se.insertBefore(e,te(t),s);},adoptAttributes(e,t){const s=new Set(e.attrs.map((e=>e.name)));for(let a=0;a<t.length;a++)s.has(t[a].name)||e.attrs.push(t[a]);},getFirstChild:e=>e.childNodes[0],getChildNodes:e=>e.childNodes,getParentNode:e=>e.parentNode,getAttrList:e=>e.attrs,getTagName:e=>e.tagName,getNamespaceURI:e=>e.namespaceURI,getTextNodeContent:e=>e.value,getCommentNodeContent:e=>e.data,getDocumentTypeNodeName:e=>e.name,getDocumentTypeNodePublicId:e=>e.publicId,getDocumentTypeNodeSystemId:e=>e.systemId,isTextNode:e=>"#text"===e.nodeName,isCommentNode:e=>"#comment"===e.nodeName,isDocumentTypeNode:e=>"#documentType"===e.nodeName,isElementNode:e=>Object.prototype.hasOwnProperty.call(e,"tagName"),setNodeSourceCodeLocation(e,t){e.sourceCodeLocation=t;},getNodeSourceCodeLocation:e=>e.sourceCodeLocation,updateNodeSourceCodeLocation(e,t){e.sourceCodeLocation={...e.sourceCodeLocation,...t};}},ae="html",re=["+//silmaril//dtd html pro v0r11 19970101//","-//as//dtd html 3.0 aswedit + extensions//","-//advasoft ltd//dtd html 3.0 aswedit + extensions//","-//ietf//dtd html 2.0 level 1//","-//ietf//dtd html 2.0 level 2//","-//ietf//dtd html 2.0 strict level 1//","-//ietf//dtd html 2.0 strict level 2//","-//ietf//dtd html 2.0 strict//","-//ietf//dtd html 2.0//","-//ietf//dtd html 2.1e//","-//ietf//dtd html 3.0//","-//ietf//dtd html 3.2 final//","-//ietf//dtd html 3.2//","-//ietf//dtd html 3//","-//ietf//dtd html level 0//","-//ietf//dtd html level 1//","-//ietf//dtd html level 2//","-//ietf//dtd html level 3//","-//ietf//dtd html strict level 0//","-//ietf//dtd html strict level 1//","-//ietf//dtd html strict level 2//","-//ietf//dtd html strict level 3//","-//ietf//dtd html strict//","-//ietf//dtd html//","-//metrius//dtd metrius presentational//","-//microsoft//dtd internet explorer 2.0 html strict//","-//microsoft//dtd internet explorer 2.0 html//","-//microsoft//dtd internet explorer 2.0 tables//","-//microsoft//dtd internet explorer 3.0 html strict//","-//microsoft//dtd internet explorer 3.0 html//","-//microsoft//dtd internet explorer 3.0 tables//","-//netscape comm. corp.//dtd html//","-//netscape comm. corp.//dtd strict html//","-//o'reilly and associates//dtd html 2.0//","-//o'reilly and associates//dtd html extended 1.0//","-//o'reilly and associates//dtd html extended relaxed 1.0//","-//sq//dtd html 2.0 hotmetal + extensions//","-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//","-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//","-//spyglass//dtd html 2.0 extended//","-//sun microsystems corp.//dtd hotjava html//","-//sun microsystems corp.//dtd hotjava strict html//","-//w3c//dtd html 3 1995-03-24//","-//w3c//dtd html 3.2 draft//","-//w3c//dtd html 3.2 final//","-//w3c//dtd html 3.2//","-//w3c//dtd html 3.2s draft//","-//w3c//dtd html 4.0 frameset//","-//w3c//dtd html 4.0 transitional//","-//w3c//dtd html experimental 19960712//","-//w3c//dtd html experimental 970421//","-//w3c//dtd w3 html//","-//w3o//dtd w3 html 3.0//","-//webtechs//dtd mozilla html 2.0//","-//webtechs//dtd mozilla html//"],ne=[...re,"-//w3c//dtd html 4.01 frameset//","-//w3c//dtd html 4.01 transitional//"],ie=new Set(["-//w3o//dtd w3 html strict 3.0//en//","-/w3c/dtd html 4.0 transitional/en","html"]),oe=["-//w3c//dtd xhtml 1.0 frameset//","-//w3c//dtd xhtml 1.0 transitional//"],ce=[...oe,"-//w3c//dtd html 4.01 frameset//","-//w3c//dtd html 4.01 transitional//"];function Ee(e,t){return t.some((t=>e.startsWith(t)))}const Te=new Map(["attributeName","attributeType","baseFrequency","baseProfile","calcMode","clipPathUnits","diffuseConstant","edgeMode","filterUnits","glyphRef","gradientTransform","gradientUnits","kernelMatrix","kernelUnitLength","keyPoints","keySplines","keyTimes","lengthAdjust","limitingConeAngle","markerHeight","markerUnits","markerWidth","maskContentUnits","maskUnits","numOctaves","pathLength","patternContentUnits","patternTransform","patternUnits","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","refX","refY","repeatCount","repeatDur","requiredExtensions","requiredFeatures","specularConstant","specularExponent","spreadMethod","startOffset","stdDeviation","stitchTiles","surfaceScale","systemLanguage","tableValues","targetX","targetY","textLength","viewBox","viewTarget","xChannelSelector","yChannelSelector","zoomAndPan"].map((e=>[e.toLowerCase(),e]))),he=new Map([["xlink:actuate",{prefix:"xlink",name:"actuate",namespace:p.XLINK}],["xlink:arcrole",{prefix:"xlink",name:"arcrole",namespace:p.XLINK}],["xlink:href",{prefix:"xlink",name:"href",namespace:p.XLINK}],["xlink:role",{prefix:"xlink",name:"role",namespace:p.XLINK}],["xlink:show",{prefix:"xlink",name:"show",namespace:p.XLINK}],["xlink:title",{prefix:"xlink",name:"title",namespace:p.XLINK}],["xlink:type",{prefix:"xlink",name:"type",namespace:p.XLINK}],["xml:base",{prefix:"xml",name:"base",namespace:p.XML}],["xml:lang",{prefix:"xml",name:"lang",namespace:p.XML}],["xml:space",{prefix:"xml",name:"space",namespace:p.XML}],["xmlns",{prefix:"",name:"xmlns",namespace:p.XMLNS}],["xmlns:xlink",{prefix:"xmlns",name:"xlink",namespace:p.XMLNS}]]),_e=new Map(["altGlyph","altGlyphDef","altGlyphItem","animateColor","animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","glyphRef","linearGradient","radialGradient","textPath"].map((e=>[e.toLowerCase(),e]))),Ae=new Set([u.B,u.BIG,u.BLOCKQUOTE,u.BODY,u.BR,u.CENTER,u.CODE,u.DD,u.DIV,u.DL,u.DT,u.EM,u.EMBED,u.H1,u.H2,u.H3,u.H4,u.H5,u.H6,u.HEAD,u.HR,u.I,u.IMG,u.LI,u.LISTING,u.MENU,u.META,u.NOBR,u.OL,u.P,u.PRE,u.RUBY,u.S,u.SMALL,u.SPAN,u.STRONG,u.STRIKE,u.SUB,u.SUP,u.TABLE,u.TT,u.U,u.UL,u.VAR]);function le(e){for(let t=0;t<e.attrs.length;t++)if("definitionurl"===e.attrs[t].name){e.attrs[t].name="definitionURL";break}}function me(e){for(let t=0;t<e.attrs.length;t++){const s=Te.get(e.attrs[t].name);null!=s&&(e.attrs[t].name=s);}}function pe(e){for(let t=0;t<e.attrs.length;t++){const s=he.get(e.attrs[t].name);s&&(e.attrs[t].prefix=s.prefix,e.attrs[t].name=s.name,e.attrs[t].namespace=s.namespace);}}var de;!function(e){e[e.INITIAL=0]="INITIAL",e[e.BEFORE_HTML=1]="BEFORE_HTML",e[e.BEFORE_HEAD=2]="BEFORE_HEAD",e[e.IN_HEAD=3]="IN_HEAD",e[e.IN_HEAD_NO_SCRIPT=4]="IN_HEAD_NO_SCRIPT",e[e.AFTER_HEAD=5]="AFTER_HEAD",e[e.IN_BODY=6]="IN_BODY",e[e.TEXT=7]="TEXT",e[e.IN_TABLE=8]="IN_TABLE",e[e.IN_TABLE_TEXT=9]="IN_TABLE_TEXT",e[e.IN_CAPTION=10]="IN_CAPTION",e[e.IN_COLUMN_GROUP=11]="IN_COLUMN_GROUP",e[e.IN_TABLE_BODY=12]="IN_TABLE_BODY",e[e.IN_ROW=13]="IN_ROW",e[e.IN_CELL=14]="IN_CELL",e[e.IN_SELECT=15]="IN_SELECT",e[e.IN_SELECT_IN_TABLE=16]="IN_SELECT_IN_TABLE",e[e.IN_TEMPLATE=17]="IN_TEMPLATE",e[e.AFTER_BODY=18]="AFTER_BODY",e[e.IN_FRAMESET=19]="IN_FRAMESET",e[e.AFTER_FRAMESET=20]="AFTER_FRAMESET",e[e.AFTER_AFTER_BODY=21]="AFTER_AFTER_BODY",e[e.AFTER_AFTER_FRAMESET=22]="AFTER_AFTER_FRAMESET";}(de||(de={}));const Ie={startLine:-1,startCol:-1,startOffset:-1,endLine:-1,endCol:-1,endOffset:-1},Ne=new Set([u.TABLE,u.TBODY,u.TFOOT,u.THEAD,u.TR]),ue={scriptingEnabled:!0,sourceCodeLocationInfo:!1,treeAdapter:se,onParseError:null};class Ce{constructor(e,t,s=null,a=null){this.fragmentContext=s,this.scriptHandler=a,this.currentToken=null,this.stopped=!1,this.insertionMode=de.INITIAL,this.originalInsertionMode=de.INITIAL,this.headElement=null,this.formElement=null,this.currentNotInHTML=!1,this.tmplInsertionModeStack=[],this.pendingCharacterTokens=[],this.hasNonWhitespacePendingCharacterToken=!1,this.framesetOk=!0,this.skipNextNewLine=!1,this.fosterParentingEnabled=!1,this.options={...ue,...e},this.treeAdapter=this.options.treeAdapter,this.onParseError=this.options.onParseError,this.onParseError&&(this.options.sourceCodeLocationInfo=!0),this.document=null!=t?t:this.treeAdapter.createDocument(),this.tokenizer=new v(this.options,this),this.activeFormattingElements=new ee(this.treeAdapter),this.fragmentContextID=s?f(this.treeAdapter.getTagName(s)):u.UNKNOWN,this._setContextModes(null!=s?s:this.document,this.fragmentContextID),this.openElements=new J(this.document,this.treeAdapter,this);}static parse(e,t){const s=new this(t);return s.tokenizer.write(e,!0),s.document}static getFragmentParser(e,t){const s={...ue,...t};null!=e||(e=s.treeAdapter.createElement(N.TEMPLATE,p.HTML,[]));const a=s.treeAdapter.createElement("documentmock",p.HTML,[]),r=new this(s,a,e);return r.fragmentContextID===u.TEMPLATE&&r.tmplInsertionModeStack.unshift(de.IN_TEMPLATE),r._initTokenizerForFragmentParsing(),r._insertFakeRootElement(),r._resetInsertionMode(),r._findFormInFragmentContext(),r}getFragment(){const e=this.treeAdapter.getFirstChild(this.document),t=this.treeAdapter.createDocumentFragment();return this._adoptNodes(e,t),t}_err(e,t,s){var a;if(!this.onParseError)return;const r=null!==(a=e.location)&&void 0!==a?a:Ie,n={code:t,startLine:r.startLine,startCol:r.startCol,startOffset:r.startOffset,endLine:s?r.startLine:r.endLine,endCol:s?r.startCol:r.endCol,endOffset:s?r.startOffset:r.endOffset};this.onParseError(n);}onItemPush(e,t,s){var a,r;null===(r=(a=this.treeAdapter).onItemPush)||void 0===r||r.call(a,e),s&&this.openElements.stackTop>0&&this._setContextModes(e,t);}onItemPop(e,t){var s,a;if(this.options.sourceCodeLocationInfo&&this._setEndLocation(e,this.currentToken),null===(a=(s=this.treeAdapter).onItemPop)||void 0===a||a.call(s,e,this.openElements.current),t){let e,t;0===this.openElements.stackTop&&this.fragmentContext?(e=this.fragmentContext,t=this.fragmentContextID):({current:e,currentTagId:t}=this.openElements),this._setContextModes(e,t);}}_setContextModes(e,t){const s=e===this.document||this.treeAdapter.getNamespaceURI(e)===p.HTML;this.currentNotInHTML=!s,this.tokenizer.inForeignNode=!s&&!this._isIntegrationPoint(t,e);}_switchToTextParsing(e,t){this._insertElement(e,p.HTML),this.tokenizer.state=t,this.originalInsertionMode=this.insertionMode,this.insertionMode=de.TEXT;}switchToPlaintextParsing(){this.insertionMode=de.TEXT,this.originalInsertionMode=de.IN_BODY,this.tokenizer.state=b.PLAINTEXT;}_getAdjustedCurrentElement(){return 0===this.openElements.stackTop&&this.fragmentContext?this.fragmentContext:this.openElements.current}_findFormInFragmentContext(){let e=this.fragmentContext;for(;e;){if(this.treeAdapter.getTagName(e)===N.FORM){this.formElement=e;break}e=this.treeAdapter.getParentNode(e);}}_initTokenizerForFragmentParsing(){if(this.fragmentContext&&this.treeAdapter.getNamespaceURI(this.fragmentContext)===p.HTML)switch(this.fragmentContextID){case u.TITLE:case u.TEXTAREA:this.tokenizer.state=b.RCDATA;break;case u.STYLE:case u.XMP:case u.IFRAME:case u.NOEMBED:case u.NOFRAMES:case u.NOSCRIPT:this.tokenizer.state=b.RAWTEXT;break;case u.SCRIPT:this.tokenizer.state=b.SCRIPT_DATA;break;case u.PLAINTEXT:this.tokenizer.state=b.PLAINTEXT;}}_setDocumentType(e){const t=e.name||"",s=e.publicId||"",a=e.systemId||"";if(this.treeAdapter.setDocumentType(this.document,t,s,a),e.location){const t=this.treeAdapter.getChildNodes(this.document).find((e=>this.treeAdapter.isDocumentTypeNode(e)));t&&this.treeAdapter.setNodeSourceCodeLocation(t,e.location);}}_attachElementToTree(e,t){if(this.options.sourceCodeLocationInfo){const s=t&&{...t,startTag:t};this.treeAdapter.setNodeSourceCodeLocation(e,s);}if(this._shouldFosterParentOnInsertion())this._fosterParentElement(e);else {const t=this.openElements.currentTmplContentOrNode;this.treeAdapter.appendChild(t,e);}}_appendElement(e,t){const s=this.treeAdapter.createElement(e.tagName,t,e.attrs);this._attachElementToTree(s,e.location);}_insertElement(e,t){const s=this.treeAdapter.createElement(e.tagName,t,e.attrs);this._attachElementToTree(s,e.location),this.openElements.push(s,e.tagID);}_insertFakeElement(e,t){const s=this.treeAdapter.createElement(e,p.HTML,[]);this._attachElementToTree(s,null),this.openElements.push(s,t);}_insertTemplate(e){const t=this.treeAdapter.createElement(e.tagName,p.HTML,e.attrs),s=this.treeAdapter.createDocumentFragment();this.treeAdapter.setTemplateContent(t,s),this._attachElementToTree(t,e.location),this.openElements.push(t,e.tagID),this.options.sourceCodeLocationInfo&&this.treeAdapter.setNodeSourceCodeLocation(s,null);}_insertFakeRootElement(){const e=this.treeAdapter.createElement(N.HTML,p.HTML,[]);this.options.sourceCodeLocationInfo&&this.treeAdapter.setNodeSourceCodeLocation(e,null),this.treeAdapter.appendChild(this.openElements.current,e),this.openElements.push(e,u.HTML);}_appendCommentNode(e,t){const s=this.treeAdapter.createCommentNode(e.data);this.treeAdapter.appendChild(t,s),this.options.sourceCodeLocationInfo&&this.treeAdapter.setNodeSourceCodeLocation(s,e.location);}_insertCharacters(e){let t,s;if(this._shouldFosterParentOnInsertion()?(({parent:t,beforeElement:s}=this._findFosterParentingLocation()),s?this.treeAdapter.insertTextBefore(t,e.chars,s):this.treeAdapter.insertText(t,e.chars)):(t=this.openElements.currentTmplContentOrNode,this.treeAdapter.insertText(t,e.chars)),!e.location)return;const a=this.treeAdapter.getChildNodes(t),r=s?a.lastIndexOf(s):a.length,n=a[r-1];if(this.treeAdapter.getNodeSourceCodeLocation(n)){const{endLine:t,endCol:s,endOffset:a}=e.location;this.treeAdapter.updateNodeSourceCodeLocation(n,{endLine:t,endCol:s,endOffset:a});}else this.options.sourceCodeLocationInfo&&this.treeAdapter.setNodeSourceCodeLocation(n,e.location);}_adoptNodes(e,t){for(let s=this.treeAdapter.getFirstChild(e);s;s=this.treeAdapter.getFirstChild(e))this.treeAdapter.detachNode(s),this.treeAdapter.appendChild(t,s);}_setEndLocation(e,t){if(this.treeAdapter.getNodeSourceCodeLocation(e)&&t.location){const s=t.location,a=this.treeAdapter.getTagName(e),r=t.type===h.END_TAG&&a===t.tagName?{endTag:{...s},endLine:s.endLine,endCol:s.endCol,endOffset:s.endOffset}:{endLine:s.startLine,endCol:s.startCol,endOffset:s.startOffset};this.treeAdapter.updateNodeSourceCodeLocation(e,r);}}shouldProcessStartTagTokenInForeignContent(e){if(!this.currentNotInHTML)return !1;let t,s;return 0===this.openElements.stackTop&&this.fragmentContext?(t=this.fragmentContext,s=this.fragmentContextID):({current:t,currentTagId:s}=this.openElements),(e.tagID!==u.SVG||this.treeAdapter.getTagName(t)!==N.ANNOTATION_XML||this.treeAdapter.getNamespaceURI(t)!==p.MATHML)&&(this.tokenizer.inForeignNode||(e.tagID===u.MGLYPH||e.tagID===u.MALIGNMARK)&&!this._isIntegrationPoint(s,t,p.HTML))}_processToken(e){switch(e.type){case h.CHARACTER:this.onCharacter(e);break;case h.NULL_CHARACTER:this.onNullCharacter(e);break;case h.COMMENT:this.onComment(e);break;case h.DOCTYPE:this.onDoctype(e);break;case h.START_TAG:this._processStartTag(e);break;case h.END_TAG:this.onEndTag(e);break;case h.EOF:this.onEof(e);break;case h.WHITESPACE_CHARACTER:this.onWhitespaceCharacter(e);}}_isIntegrationPoint(e,t,s){return function(e,t,s,a){return (!a||a===p.HTML)&&function(e,t,s){if(t===p.MATHML&&e===u.ANNOTATION_XML)for(let e=0;e<s.length;e++)if(s[e].name===d.ENCODING){const t=s[e].value.toLowerCase();return "text/html"===t||"application/xhtml+xml"===t}return t===p.SVG&&(e===u.FOREIGN_OBJECT||e===u.DESC||e===u.TITLE)}(e,t,s)||(!a||a===p.MATHML)&&function(e,t){return t===p.MATHML&&(e===u.MI||e===u.MO||e===u.MN||e===u.MS||e===u.MTEXT)}(e,t)}(e,this.treeAdapter.getNamespaceURI(t),this.treeAdapter.getAttrList(t),s)}_reconstructActiveFormattingElements(){const e=this.activeFormattingElements.entries.length;if(e){const t=this.activeFormattingElements.entries.findIndex((e=>e.type===Z.Marker||this.openElements.contains(e.element)));for(let s=t<0?e-1:t-1;s>=0;s--){const e=this.activeFormattingElements.entries[s];this._insertElement(e.token,this.treeAdapter.getNamespaceURI(e.element)),e.element=this.openElements.current;}}}_closeTableCell(){this.openElements.generateImpliedEndTags(),this.openElements.popUntilTableCellPopped(),this.activeFormattingElements.clearToLastMarker(),this.insertionMode=de.IN_ROW;}_closePElement(){this.openElements.generateImpliedEndTagsWithExclusion(u.P),this.openElements.popUntilTagNamePopped(u.P);}_resetInsertionMode(){for(let e=this.openElements.stackTop;e>=0;e--)switch(0===e&&this.fragmentContext?this.fragmentContextID:this.openElements.tagIDs[e]){case u.TR:return void(this.insertionMode=de.IN_ROW);case u.TBODY:case u.THEAD:case u.TFOOT:return void(this.insertionMode=de.IN_TABLE_BODY);case u.CAPTION:return void(this.insertionMode=de.IN_CAPTION);case u.COLGROUP:return void(this.insertionMode=de.IN_COLUMN_GROUP);case u.TABLE:return void(this.insertionMode=de.IN_TABLE);case u.BODY:return void(this.insertionMode=de.IN_BODY);case u.FRAMESET:return void(this.insertionMode=de.IN_FRAMESET);case u.SELECT:return void this._resetInsertionModeForSelect(e);case u.TEMPLATE:return void(this.insertionMode=this.tmplInsertionModeStack[0]);case u.HTML:return void(this.insertionMode=this.headElement?de.AFTER_HEAD:de.BEFORE_HEAD);case u.TD:case u.TH:if(e>0)return void(this.insertionMode=de.IN_CELL);break;case u.HEAD:if(e>0)return void(this.insertionMode=de.IN_HEAD)}this.insertionMode=de.IN_BODY;}_resetInsertionModeForSelect(e){if(e>0)for(let t=e-1;t>0;t--){const e=this.openElements.tagIDs[t];if(e===u.TEMPLATE)break;if(e===u.TABLE)return void(this.insertionMode=de.IN_SELECT_IN_TABLE)}this.insertionMode=de.IN_SELECT;}_isElementCausesFosterParenting(e){return Ne.has(e)}_shouldFosterParentOnInsertion(){return this.fosterParentingEnabled&&this._isElementCausesFosterParenting(this.openElements.currentTagId)}_findFosterParentingLocation(){for(let e=this.openElements.stackTop;e>=0;e--){const t=this.openElements.items[e];switch(this.openElements.tagIDs[e]){case u.TEMPLATE:if(this.treeAdapter.getNamespaceURI(t)===p.HTML)return {parent:this.treeAdapter.getTemplateContent(t),beforeElement:null};break;case u.TABLE:{const s=this.treeAdapter.getParentNode(t);return s?{parent:s,beforeElement:t}:{parent:this.openElements.items[e-1],beforeElement:null}}}}return {parent:this.openElements.items[0],beforeElement:null}}_fosterParentElement(e){const t=this._findFosterParentingLocation();t.beforeElement?this.treeAdapter.insertBefore(t.parent,e,t.beforeElement):this.treeAdapter.appendChild(t.parent,e);}_isSpecialElement(e,t){const s=this.treeAdapter.getNamespaceURI(e);return g[s].has(t)}onCharacter(e){if(this.skipNextNewLine=!1,this.tokenizer.inForeignNode)!function(e,t){e._insertCharacters(t),e.framesetOk=!1;}(this,e);else switch(this.insertionMode){case de.INITIAL:Pe(this,e);break;case de.BEFORE_HTML:be(this,e);break;case de.BEFORE_HEAD:Be(this,e);break;case de.IN_HEAD:Ue(this,e);break;case de.IN_HEAD_NO_SCRIPT:Ge(this,e);break;case de.AFTER_HEAD:ye(this,e);break;case de.IN_BODY:case de.IN_CAPTION:case de.IN_CELL:case de.IN_TEMPLATE:xe(this,e);break;case de.TEXT:case de.IN_SELECT:case de.IN_SELECT_IN_TABLE:this._insertCharacters(e);break;case de.IN_TABLE:case de.IN_TABLE_BODY:case de.IN_ROW:je(this,e);break;case de.IN_TABLE_TEXT:tt(this,e);break;case de.IN_COLUMN_GROUP:nt(this,e);break;case de.AFTER_BODY:lt(this,e);break;case de.AFTER_AFTER_BODY:mt(this,e);}}onNullCharacter(e){if(this.skipNextNewLine=!1,this.tokenizer.inForeignNode)!function(e,t){t.chars=s,e._insertCharacters(t);}(this,e);else switch(this.insertionMode){case de.INITIAL:Pe(this,e);break;case de.BEFORE_HTML:be(this,e);break;case de.BEFORE_HEAD:Be(this,e);break;case de.IN_HEAD:Ue(this,e);break;case de.IN_HEAD_NO_SCRIPT:Ge(this,e);break;case de.AFTER_HEAD:ye(this,e);break;case de.TEXT:this._insertCharacters(e);break;case de.IN_TABLE:case de.IN_TABLE_BODY:case de.IN_ROW:je(this,e);break;case de.IN_COLUMN_GROUP:nt(this,e);break;case de.AFTER_BODY:lt(this,e);break;case de.AFTER_AFTER_BODY:mt(this,e);}}onComment(e){if(this.skipNextNewLine=!1,this.currentNotInHTML)Me(this,e);else switch(this.insertionMode){case de.INITIAL:case de.BEFORE_HTML:case de.BEFORE_HEAD:case de.IN_HEAD:case de.IN_HEAD_NO_SCRIPT:case de.AFTER_HEAD:case de.IN_BODY:case de.IN_TABLE:case de.IN_CAPTION:case de.IN_COLUMN_GROUP:case de.IN_TABLE_BODY:case de.IN_ROW:case de.IN_CELL:case de.IN_SELECT:case de.IN_SELECT_IN_TABLE:case de.IN_TEMPLATE:case de.IN_FRAMESET:case de.AFTER_FRAMESET:Me(this,e);break;case de.IN_TABLE_TEXT:st(this,e);break;case de.AFTER_BODY:!function(e,t){e._appendCommentNode(t,e.openElements.items[0]);}(this,e);break;case de.AFTER_AFTER_BODY:case de.AFTER_AFTER_FRAMESET:!function(e,t){e._appendCommentNode(t,e.document);}(this,e);}}onDoctype(e){switch(this.skipNextNewLine=!1,this.insertionMode){case de.INITIAL:!function(e,t){e._setDocumentType(t);const s=t.forceQuirks?I.QUIRKS:function(e){if(e.name!==ae)return I.QUIRKS;const{systemId:t}=e;if(t&&"http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd"===t.toLowerCase())return I.QUIRKS;let{publicId:s}=e;if(null!==s){if(s=s.toLowerCase(),ie.has(s))return I.QUIRKS;let e=null===t?ne:re;if(Ee(s,e))return I.QUIRKS;if(e=null===t?oe:ce,Ee(s,e))return I.LIMITED_QUIRKS}return I.NO_QUIRKS}(t);(function(e){return e.name===ae&&null===e.publicId&&(null===e.systemId||"about:legacy-compat"===e.systemId)})(t)||e._err(t,T.nonConformingDoctype),e.treeAdapter.setDocumentMode(e.document,s),e.insertionMode=de.BEFORE_HTML;}(this,e);break;case de.BEFORE_HEAD:case de.IN_HEAD:case de.IN_HEAD_NO_SCRIPT:case de.AFTER_HEAD:this._err(e,T.misplacedDoctype);break;case de.IN_TABLE_TEXT:st(this,e);}}onStartTag(e){this.skipNextNewLine=!1,this.currentToken=e,this._processStartTag(e),e.selfClosing&&!e.ackSelfClosing&&this._err(e,T.nonVoidHtmlElementStartTagWithTrailingSolidus);}_processStartTag(e){this.shouldProcessStartTagTokenInForeignContent(e)?function(e,t){if(function(e){const t=e.tagID;return t===u.FONT&&e.attrs.some((({name:e})=>e===d.COLOR||e===d.SIZE||e===d.FACE))||Ae.has(t)}(t))pt(e),e._startTagOutsideForeignContent(t);else {const s=e._getAdjustedCurrentElement(),a=e.treeAdapter.getNamespaceURI(s);a===p.MATHML?le(t):a===p.SVG&&(function(e){const t=_e.get(e.tagName);null!=t&&(e.tagName=t,e.tagID=f(e.tagName));}(t),me(t)),pe(t),t.selfClosing?e._appendElement(t,a):e._insertElement(t,a),t.ackSelfClosing=!0;}}(this,e):this._startTagOutsideForeignContent(e);}_startTagOutsideForeignContent(e){switch(this.insertionMode){case de.INITIAL:Pe(this,e);break;case de.BEFORE_HTML:!function(e,t){t.tagID===u.HTML?(e._insertElement(t,p.HTML),e.insertionMode=de.BEFORE_HEAD):be(e,t);}(this,e);break;case de.BEFORE_HEAD:!function(e,t){switch(t.tagID){case u.HTML:Xe(e,t);break;case u.HEAD:e._insertElement(t,p.HTML),e.headElement=e.openElements.current,e.insertionMode=de.IN_HEAD;break;default:Be(e,t);}}(this,e);break;case de.IN_HEAD:He(this,e);break;case de.IN_HEAD_NO_SCRIPT:!function(e,t){switch(t.tagID){case u.HTML:Xe(e,t);break;case u.BASEFONT:case u.BGSOUND:case u.HEAD:case u.LINK:case u.META:case u.NOFRAMES:case u.STYLE:He(e,t);break;case u.NOSCRIPT:e._err(t,T.nestedNoscriptInHead);break;default:Ge(e,t);}}(this,e);break;case de.AFTER_HEAD:!function(e,t){switch(t.tagID){case u.HTML:Xe(e,t);break;case u.BODY:e._insertElement(t,p.HTML),e.framesetOk=!1,e.insertionMode=de.IN_BODY;break;case u.FRAMESET:e._insertElement(t,p.HTML),e.insertionMode=de.IN_FRAMESET;break;case u.BASE:case u.BASEFONT:case u.BGSOUND:case u.LINK:case u.META:case u.NOFRAMES:case u.SCRIPT:case u.STYLE:case u.TEMPLATE:case u.TITLE:e._err(t,T.abandonedHeadElementChild),e.openElements.push(e.headElement,u.HEAD),He(e,t),e.openElements.remove(e.headElement);break;case u.HEAD:e._err(t,T.misplacedStartTagForHeadElement);break;default:ye(e,t);}}(this,e);break;case de.IN_BODY:Xe(this,e);break;case de.IN_TABLE:Je(this,e);break;case de.IN_TABLE_TEXT:st(this,e);break;case de.IN_CAPTION:!function(e,t){const s=t.tagID;at.has(s)?e.openElements.hasInTableScope(u.CAPTION)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(u.CAPTION),e.activeFormattingElements.clearToLastMarker(),e.insertionMode=de.IN_TABLE,Je(e,t)):Xe(e,t);}(this,e);break;case de.IN_COLUMN_GROUP:rt(this,e);break;case de.IN_TABLE_BODY:it(this,e);break;case de.IN_ROW:ct(this,e);break;case de.IN_CELL:!function(e,t){const s=t.tagID;at.has(s)?(e.openElements.hasInTableScope(u.TD)||e.openElements.hasInTableScope(u.TH))&&(e._closeTableCell(),ct(e,t)):Xe(e,t);}(this,e);break;case de.IN_SELECT:Tt(this,e);break;case de.IN_SELECT_IN_TABLE:!function(e,t){const s=t.tagID;s===u.CAPTION||s===u.TABLE||s===u.TBODY||s===u.TFOOT||s===u.THEAD||s===u.TR||s===u.TD||s===u.TH?(e.openElements.popUntilTagNamePopped(u.SELECT),e._resetInsertionMode(),e._processStartTag(t)):Tt(e,t);}(this,e);break;case de.IN_TEMPLATE:!function(e,t){switch(t.tagID){case u.BASE:case u.BASEFONT:case u.BGSOUND:case u.LINK:case u.META:case u.NOFRAMES:case u.SCRIPT:case u.STYLE:case u.TEMPLATE:case u.TITLE:He(e,t);break;case u.CAPTION:case u.COLGROUP:case u.TBODY:case u.TFOOT:case u.THEAD:e.tmplInsertionModeStack[0]=de.IN_TABLE,e.insertionMode=de.IN_TABLE,Je(e,t);break;case u.COL:e.tmplInsertionModeStack[0]=de.IN_COLUMN_GROUP,e.insertionMode=de.IN_COLUMN_GROUP,rt(e,t);break;case u.TR:e.tmplInsertionModeStack[0]=de.IN_TABLE_BODY,e.insertionMode=de.IN_TABLE_BODY,it(e,t);break;case u.TD:case u.TH:e.tmplInsertionModeStack[0]=de.IN_ROW,e.insertionMode=de.IN_ROW,ct(e,t);break;default:e.tmplInsertionModeStack[0]=de.IN_BODY,e.insertionMode=de.IN_BODY,Xe(e,t);}}(this,e);break;case de.AFTER_BODY:!function(e,t){t.tagID===u.HTML?Xe(e,t):lt(e,t);}(this,e);break;case de.IN_FRAMESET:!function(e,t){switch(t.tagID){case u.HTML:Xe(e,t);break;case u.FRAMESET:e._insertElement(t,p.HTML);break;case u.FRAME:e._appendElement(t,p.HTML),t.ackSelfClosing=!0;break;case u.NOFRAMES:He(e,t);}}(this,e);break;case de.AFTER_FRAMESET:!function(e,t){switch(t.tagID){case u.HTML:Xe(e,t);break;case u.NOFRAMES:He(e,t);}}(this,e);break;case de.AFTER_AFTER_BODY:!function(e,t){t.tagID===u.HTML?Xe(e,t):mt(e,t);}(this,e);break;case de.AFTER_AFTER_FRAMESET:!function(e,t){switch(t.tagID){case u.HTML:Xe(e,t);break;case u.NOFRAMES:He(e,t);}}(this,e);}}onEndTag(e){this.skipNextNewLine=!1,this.currentToken=e,this.currentNotInHTML?function(e,t){if(t.tagID===u.P||t.tagID===u.BR)return pt(e),void e._endTagOutsideForeignContent(t);for(let s=e.openElements.stackTop;s>0;s--){const a=e.openElements.items[s];if(e.treeAdapter.getNamespaceURI(a)===p.HTML){e._endTagOutsideForeignContent(t);break}const r=e.treeAdapter.getTagName(a);if(r.toLowerCase()===t.tagName){t.tagName=r,e.openElements.shortenToLength(s);break}}}(this,e):this._endTagOutsideForeignContent(e);}_endTagOutsideForeignContent(e){switch(this.insertionMode){case de.INITIAL:Pe(this,e);break;case de.BEFORE_HTML:!function(e,t){const s=t.tagID;s!==u.HTML&&s!==u.HEAD&&s!==u.BODY&&s!==u.BR||be(e,t);}(this,e);break;case de.BEFORE_HEAD:!function(e,t){const s=t.tagID;s===u.HEAD||s===u.BODY||s===u.HTML||s===u.BR?Be(e,t):e._err(t,T.endTagWithoutMatchingOpenElement);}(this,e);break;case de.IN_HEAD:!function(e,t){switch(t.tagID){case u.HEAD:e.openElements.pop(),e.insertionMode=de.AFTER_HEAD;break;case u.BODY:case u.BR:case u.HTML:Ue(e,t);break;case u.TEMPLATE:Fe(e,t);break;default:e._err(t,T.endTagWithoutMatchingOpenElement);}}(this,e);break;case de.IN_HEAD_NO_SCRIPT:!function(e,t){switch(t.tagID){case u.NOSCRIPT:e.openElements.pop(),e.insertionMode=de.IN_HEAD;break;case u.BR:Ge(e,t);break;default:e._err(t,T.endTagWithoutMatchingOpenElement);}}(this,e);break;case de.AFTER_HEAD:!function(e,t){switch(t.tagID){case u.BODY:case u.HTML:case u.BR:ye(e,t);break;case u.TEMPLATE:Fe(e,t);break;default:e._err(t,T.endTagWithoutMatchingOpenElement);}}(this,e);break;case de.IN_BODY:Ve(this,e);break;case de.TEXT:!function(e,t){var s;t.tagID===u.SCRIPT&&(null===(s=e.scriptHandler)||void 0===s||s.call(e,e.openElements.current)),e.openElements.pop(),e.insertionMode=e.originalInsertionMode;}(this,e);break;case de.IN_TABLE:Ze(this,e);break;case de.IN_TABLE_TEXT:st(this,e);break;case de.IN_CAPTION:!function(e,t){const s=t.tagID;switch(s){case u.CAPTION:case u.TABLE:e.openElements.hasInTableScope(u.CAPTION)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(u.CAPTION),e.activeFormattingElements.clearToLastMarker(),e.insertionMode=de.IN_TABLE,s===u.TABLE&&Ze(e,t));break;case u.BODY:case u.COL:case u.COLGROUP:case u.HTML:case u.TBODY:case u.TD:case u.TFOOT:case u.TH:case u.THEAD:case u.TR:break;default:Ve(e,t);}}(this,e);break;case de.IN_COLUMN_GROUP:!function(e,t){switch(t.tagID){case u.COLGROUP:e.openElements.currentTagId===u.COLGROUP&&(e.openElements.pop(),e.insertionMode=de.IN_TABLE);break;case u.TEMPLATE:Fe(e,t);break;case u.COL:break;default:nt(e,t);}}(this,e);break;case de.IN_TABLE_BODY:ot(this,e);break;case de.IN_ROW:Et(this,e);break;case de.IN_CELL:!function(e,t){const s=t.tagID;switch(s){case u.TD:case u.TH:e.openElements.hasInTableScope(s)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(s),e.activeFormattingElements.clearToLastMarker(),e.insertionMode=de.IN_ROW);break;case u.TABLE:case u.TBODY:case u.TFOOT:case u.THEAD:case u.TR:e.openElements.hasInTableScope(s)&&(e._closeTableCell(),Et(e,t));break;case u.BODY:case u.CAPTION:case u.COL:case u.COLGROUP:case u.HTML:break;default:Ve(e,t);}}(this,e);break;case de.IN_SELECT:ht(this,e);break;case de.IN_SELECT_IN_TABLE:!function(e,t){const s=t.tagID;s===u.CAPTION||s===u.TABLE||s===u.TBODY||s===u.TFOOT||s===u.THEAD||s===u.TR||s===u.TD||s===u.TH?e.openElements.hasInTableScope(s)&&(e.openElements.popUntilTagNamePopped(u.SELECT),e._resetInsertionMode(),e.onEndTag(t)):ht(e,t);}(this,e);break;case de.IN_TEMPLATE:!function(e,t){t.tagID===u.TEMPLATE&&Fe(e,t);}(this,e);break;case de.AFTER_BODY:At(this,e);break;case de.IN_FRAMESET:!function(e,t){t.tagID!==u.FRAMESET||e.openElements.isRootHtmlElementCurrent()||(e.openElements.pop(),e.fragmentContext||e.openElements.currentTagId===u.FRAMESET||(e.insertionMode=de.AFTER_FRAMESET));}(this,e);break;case de.AFTER_FRAMESET:!function(e,t){t.tagID===u.HTML&&(e.insertionMode=de.AFTER_AFTER_FRAMESET);}(this,e);break;case de.AFTER_AFTER_BODY:mt(this,e);}}onEof(e){switch(this.insertionMode){case de.INITIAL:Pe(this,e);break;case de.BEFORE_HTML:be(this,e);break;case de.BEFORE_HEAD:Be(this,e);break;case de.IN_HEAD:Ue(this,e);break;case de.IN_HEAD_NO_SCRIPT:Ge(this,e);break;case de.AFTER_HEAD:ye(this,e);break;case de.IN_BODY:case de.IN_TABLE:case de.IN_CAPTION:case de.IN_COLUMN_GROUP:case de.IN_TABLE_BODY:case de.IN_ROW:case de.IN_CELL:case de.IN_SELECT:case de.IN_SELECT_IN_TABLE:ze(this,e);break;case de.TEXT:!function(e,t){e._err(t,T.eofInElementThatCanContainOnlyText),e.openElements.pop(),e.insertionMode=e.originalInsertionMode,e.onEof(t);}(this,e);break;case de.IN_TABLE_TEXT:st(this,e);break;case de.IN_TEMPLATE:_t(this,e);break;case de.AFTER_BODY:case de.IN_FRAMESET:case de.AFTER_FRAMESET:case de.AFTER_AFTER_BODY:case de.AFTER_AFTER_FRAMESET:ke(this,e);}}onWhitespaceCharacter(e){if(this.skipNextNewLine&&(this.skipNextNewLine=!1,e.chars.charCodeAt(0)===a.LINE_FEED)){if(1===e.chars.length)return;e.chars=e.chars.substr(1);}if(this.tokenizer.inForeignNode)this._insertCharacters(e);else switch(this.insertionMode){case de.IN_HEAD:case de.IN_HEAD_NO_SCRIPT:case de.AFTER_HEAD:case de.TEXT:case de.IN_COLUMN_GROUP:case de.IN_SELECT:case de.IN_SELECT_IN_TABLE:case de.IN_FRAMESET:case de.AFTER_FRAMESET:this._insertCharacters(e);break;case de.IN_BODY:case de.IN_CAPTION:case de.IN_CELL:case de.IN_TEMPLATE:case de.AFTER_BODY:case de.AFTER_AFTER_BODY:case de.AFTER_AFTER_FRAMESET:Ye(this,e);break;case de.IN_TABLE:case de.IN_TABLE_BODY:case de.IN_ROW:je(this,e);break;case de.IN_TABLE_TEXT:et(this,e);}}}function De(e,t){let s=e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);return s?e.openElements.contains(s.element)?e.openElements.hasInScope(t.tagID)||(s=null):(e.activeFormattingElements.removeEntry(s),s=null):Ke(e,t),s}function Se(e,t){let s=null,a=e.openElements.stackTop;for(;a>=0;a--){const r=e.openElements.items[a];if(r===t.element)break;e._isSpecialElement(r,e.openElements.tagIDs[a])&&(s=r);}return s||(e.openElements.shortenToLength(a<0?0:a),e.activeFormattingElements.removeEntry(t)),s}function Re(e,t,s){let a=t,r=e.openElements.getCommonAncestor(t);for(let n=0,i=r;i!==s;n++,i=r){r=e.openElements.getCommonAncestor(i);const s=e.activeFormattingElements.getElementEntry(i),o=s&&n>=3;!s||o?(o&&e.activeFormattingElements.removeEntry(s),e.openElements.remove(i)):(i=Oe(e,s),a===t&&(e.activeFormattingElements.bookmark=s),e.treeAdapter.detachNode(a),e.treeAdapter.appendChild(i,a),a=i);}return a}function Oe(e,t){const s=e.treeAdapter.getNamespaceURI(t.element),a=e.treeAdapter.createElement(t.token.tagName,s,t.token.attrs);return e.openElements.replace(t.element,a),t.element=a,a}function fe(e,t,s){const a=f(e.treeAdapter.getTagName(t));if(e._isElementCausesFosterParenting(a))e._fosterParentElement(s);else {const r=e.treeAdapter.getNamespaceURI(t);a===u.TEMPLATE&&r===p.HTML&&(t=e.treeAdapter.getTemplateContent(t)),e.treeAdapter.appendChild(t,s);}}function Le(e,t,s){const a=e.treeAdapter.getNamespaceURI(s.element),{token:r}=s,n=e.treeAdapter.createElement(r.tagName,a,r.attrs);e._adoptNodes(t,n),e.treeAdapter.appendChild(t,n),e.activeFormattingElements.insertElementAfterBookmark(n,r),e.activeFormattingElements.removeEntry(s),e.openElements.remove(s.element),e.openElements.insertAfter(t,n,r.tagID);}function ge(e,t){for(let s=0;s<8;s++){const s=De(e,t);if(!s)break;const a=Se(e,s);if(!a)break;e.activeFormattingElements.bookmark=s;const r=Re(e,a,s.element),n=e.openElements.getCommonAncestor(s.element);e.treeAdapter.detachNode(r),n&&fe(e,n,r),Le(e,a,s);}}function Me(e,t){e._appendCommentNode(t,e.openElements.currentTmplContentOrNode);}function ke(e,t){if(e.stopped=!0,t.location){const s=e.fragmentContext?0:2;for(let a=e.openElements.stackTop;a>=s;a--)e._setEndLocation(e.openElements.items[a],t);if(!e.fragmentContext&&e.openElements.stackTop>=0){const s=e.openElements.items[0],a=e.treeAdapter.getNodeSourceCodeLocation(s);if(a&&!a.endTag&&(e._setEndLocation(s,t),e.openElements.stackTop>=1)){const s=e.openElements.items[1],a=e.treeAdapter.getNodeSourceCodeLocation(s);a&&!a.endTag&&e._setEndLocation(s,t);}}}}function Pe(e,t){e._err(t,T.missingDoctype,!0),e.treeAdapter.setDocumentMode(e.document,I.QUIRKS),e.insertionMode=de.BEFORE_HTML,e._processToken(t);}function be(e,t){e._insertFakeRootElement(),e.insertionMode=de.BEFORE_HEAD,e._processToken(t);}function Be(e,t){e._insertFakeElement(N.HEAD,u.HEAD),e.headElement=e.openElements.current,e.insertionMode=de.IN_HEAD,e._processToken(t);}function He(e,t){switch(t.tagID){case u.HTML:Xe(e,t);break;case u.BASE:case u.BASEFONT:case u.BGSOUND:case u.LINK:case u.META:e._appendElement(t,p.HTML),t.ackSelfClosing=!0;break;case u.TITLE:e._switchToTextParsing(t,b.RCDATA);break;case u.NOSCRIPT:e.options.scriptingEnabled?e._switchToTextParsing(t,b.RAWTEXT):(e._insertElement(t,p.HTML),e.insertionMode=de.IN_HEAD_NO_SCRIPT);break;case u.NOFRAMES:case u.STYLE:e._switchToTextParsing(t,b.RAWTEXT);break;case u.SCRIPT:e._switchToTextParsing(t,b.SCRIPT_DATA);break;case u.TEMPLATE:e._insertTemplate(t),e.activeFormattingElements.insertMarker(),e.framesetOk=!1,e.insertionMode=de.IN_TEMPLATE,e.tmplInsertionModeStack.unshift(de.IN_TEMPLATE);break;case u.HEAD:e._err(t,T.misplacedStartTagForHeadElement);break;default:Ue(e,t);}}function Fe(e,t){e.openElements.tmplCount>0?(e.openElements.generateImpliedEndTagsThoroughly(),e.openElements.currentTagId!==u.TEMPLATE&&e._err(t,T.closingOfElementWithOpenChildElements),e.openElements.popUntilTagNamePopped(u.TEMPLATE),e.activeFormattingElements.clearToLastMarker(),e.tmplInsertionModeStack.shift(),e._resetInsertionMode()):e._err(t,T.endTagWithoutMatchingOpenElement);}function Ue(e,t){e.openElements.pop(),e.insertionMode=de.AFTER_HEAD,e._processToken(t);}function Ge(e,t){const s=t.type===h.EOF?T.openElementsLeftAfterEof:T.disallowedContentInNoscriptInHead;e._err(t,s),e.openElements.pop(),e.insertionMode=de.IN_HEAD,e._processToken(t);}function ye(e,t){e._insertFakeElement(N.BODY,u.BODY),e.insertionMode=de.IN_BODY,we(e,t);}function we(e,t){switch(t.type){case h.CHARACTER:xe(e,t);break;case h.WHITESPACE_CHARACTER:Ye(e,t);break;case h.COMMENT:Me(e,t);break;case h.START_TAG:Xe(e,t);break;case h.END_TAG:Ve(e,t);break;case h.EOF:ze(e,t);}}function Ye(e,t){e._reconstructActiveFormattingElements(),e._insertCharacters(t);}function xe(e,t){e._reconstructActiveFormattingElements(),e._insertCharacters(t),e.framesetOk=!1;}function ve(e,t){e._reconstructActiveFormattingElements(),e._appendElement(t,p.HTML),e.framesetOk=!1,t.ackSelfClosing=!0;}function Qe(e){const t=A(e,d.TYPE);return null!=t&&"hidden"===t.toLowerCase()}function qe(e,t){e._switchToTextParsing(t,b.RAWTEXT);}function We(e,t){e._reconstructActiveFormattingElements(),e._insertElement(t,p.HTML);}function Xe(e,t){switch(t.tagID){case u.I:case u.S:case u.B:case u.U:case u.EM:case u.TT:case u.BIG:case u.CODE:case u.FONT:case u.SMALL:case u.STRIKE:case u.STRONG:!function(e,t){e._reconstructActiveFormattingElements(),e._insertElement(t,p.HTML),e.activeFormattingElements.pushElement(e.openElements.current,t);}(e,t);break;case u.A:!function(e,t){const s=e.activeFormattingElements.getElementEntryInScopeWithTagName(N.A);s&&(ge(e,t),e.openElements.remove(s.element),e.activeFormattingElements.removeEntry(s)),e._reconstructActiveFormattingElements(),e._insertElement(t,p.HTML),e.activeFormattingElements.pushElement(e.openElements.current,t);}(e,t);break;case u.H1:case u.H2:case u.H3:case u.H4:case u.H5:case u.H6:!function(e,t){e.openElements.hasInButtonScope(u.P)&&e._closePElement(),M(e.openElements.currentTagId)&&e.openElements.pop(),e._insertElement(t,p.HTML);}(e,t);break;case u.P:case u.DL:case u.OL:case u.UL:case u.DIV:case u.DIR:case u.NAV:case u.MAIN:case u.MENU:case u.ASIDE:case u.CENTER:case u.FIGURE:case u.FOOTER:case u.HEADER:case u.HGROUP:case u.DIALOG:case u.DETAILS:case u.ADDRESS:case u.ARTICLE:case u.SECTION:case u.SUMMARY:case u.FIELDSET:case u.BLOCKQUOTE:case u.FIGCAPTION:!function(e,t){e.openElements.hasInButtonScope(u.P)&&e._closePElement(),e._insertElement(t,p.HTML);}(e,t);break;case u.LI:case u.DD:case u.DT:!function(e,t){e.framesetOk=!1;const s=t.tagID;for(let t=e.openElements.stackTop;t>=0;t--){const a=e.openElements.tagIDs[t];if(s===u.LI&&a===u.LI||(s===u.DD||s===u.DT)&&(a===u.DD||a===u.DT)){e.openElements.generateImpliedEndTagsWithExclusion(a),e.openElements.popUntilTagNamePopped(a);break}if(a!==u.ADDRESS&&a!==u.DIV&&a!==u.P&&e._isSpecialElement(e.openElements.items[t],a))break}e.openElements.hasInButtonScope(u.P)&&e._closePElement(),e._insertElement(t,p.HTML);}(e,t);break;case u.BR:case u.IMG:case u.WBR:case u.AREA:case u.EMBED:case u.KEYGEN:ve(e,t);break;case u.HR:!function(e,t){e.openElements.hasInButtonScope(u.P)&&e._closePElement(),e._appendElement(t,p.HTML),e.framesetOk=!1,t.ackSelfClosing=!0;}(e,t);break;case u.RB:case u.RTC:!function(e,t){e.openElements.hasInScope(u.RUBY)&&e.openElements.generateImpliedEndTags(),e._insertElement(t,p.HTML);}(e,t);break;case u.RT:case u.RP:!function(e,t){e.openElements.hasInScope(u.RUBY)&&e.openElements.generateImpliedEndTagsWithExclusion(u.RTC),e._insertElement(t,p.HTML);}(e,t);break;case u.PRE:case u.LISTING:!function(e,t){e.openElements.hasInButtonScope(u.P)&&e._closePElement(),e._insertElement(t,p.HTML),e.skipNextNewLine=!0,e.framesetOk=!1;}(e,t);break;case u.XMP:!function(e,t){e.openElements.hasInButtonScope(u.P)&&e._closePElement(),e._reconstructActiveFormattingElements(),e.framesetOk=!1,e._switchToTextParsing(t,b.RAWTEXT);}(e,t);break;case u.SVG:!function(e,t){e._reconstructActiveFormattingElements(),me(t),pe(t),t.selfClosing?e._appendElement(t,p.SVG):e._insertElement(t,p.SVG),t.ackSelfClosing=!0;}(e,t);break;case u.HTML:!function(e,t){0===e.openElements.tmplCount&&e.treeAdapter.adoptAttributes(e.openElements.items[0],t.attrs);}(e,t);break;case u.BASE:case u.LINK:case u.META:case u.STYLE:case u.TITLE:case u.SCRIPT:case u.BGSOUND:case u.BASEFONT:case u.TEMPLATE:He(e,t);break;case u.BODY:!function(e,t){const s=e.openElements.tryPeekProperlyNestedBodyElement();s&&0===e.openElements.tmplCount&&(e.framesetOk=!1,e.treeAdapter.adoptAttributes(s,t.attrs));}(e,t);break;case u.FORM:!function(e,t){const s=e.openElements.tmplCount>0;e.formElement&&!s||(e.openElements.hasInButtonScope(u.P)&&e._closePElement(),e._insertElement(t,p.HTML),s||(e.formElement=e.openElements.current));}(e,t);break;case u.NOBR:!function(e,t){e._reconstructActiveFormattingElements(),e.openElements.hasInScope(u.NOBR)&&(ge(e,t),e._reconstructActiveFormattingElements()),e._insertElement(t,p.HTML),e.activeFormattingElements.pushElement(e.openElements.current,t);}(e,t);break;case u.MATH:!function(e,t){e._reconstructActiveFormattingElements(),le(t),pe(t),t.selfClosing?e._appendElement(t,p.MATHML):e._insertElement(t,p.MATHML),t.ackSelfClosing=!0;}(e,t);break;case u.TABLE:!function(e,t){e.treeAdapter.getDocumentMode(e.document)!==I.QUIRKS&&e.openElements.hasInButtonScope(u.P)&&e._closePElement(),e._insertElement(t,p.HTML),e.framesetOk=!1,e.insertionMode=de.IN_TABLE;}(e,t);break;case u.INPUT:!function(e,t){e._reconstructActiveFormattingElements(),e._appendElement(t,p.HTML),Qe(t)||(e.framesetOk=!1),t.ackSelfClosing=!0;}(e,t);break;case u.PARAM:case u.TRACK:case u.SOURCE:!function(e,t){e._appendElement(t,p.HTML),t.ackSelfClosing=!0;}(e,t);break;case u.IMAGE:!function(e,t){t.tagName=N.IMG,t.tagID=u.IMG,ve(e,t);}(e,t);break;case u.BUTTON:!function(e,t){e.openElements.hasInScope(u.BUTTON)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(u.BUTTON)),e._reconstructActiveFormattingElements(),e._insertElement(t,p.HTML),e.framesetOk=!1;}(e,t);break;case u.APPLET:case u.OBJECT:case u.MARQUEE:!function(e,t){e._reconstructActiveFormattingElements(),e._insertElement(t,p.HTML),e.activeFormattingElements.insertMarker(),e.framesetOk=!1;}(e,t);break;case u.IFRAME:!function(e,t){e.framesetOk=!1,e._switchToTextParsing(t,b.RAWTEXT);}(e,t);break;case u.SELECT:!function(e,t){e._reconstructActiveFormattingElements(),e._insertElement(t,p.HTML),e.framesetOk=!1,e.insertionMode=e.insertionMode===de.IN_TABLE||e.insertionMode===de.IN_CAPTION||e.insertionMode===de.IN_TABLE_BODY||e.insertionMode===de.IN_ROW||e.insertionMode===de.IN_CELL?de.IN_SELECT_IN_TABLE:de.IN_SELECT;}(e,t);break;case u.OPTION:case u.OPTGROUP:!function(e,t){e.openElements.currentTagId===u.OPTION&&e.openElements.pop(),e._reconstructActiveFormattingElements(),e._insertElement(t,p.HTML);}(e,t);break;case u.NOEMBED:qe(e,t);break;case u.FRAMESET:!function(e,t){const s=e.openElements.tryPeekProperlyNestedBodyElement();e.framesetOk&&s&&(e.treeAdapter.detachNode(s),e.openElements.popAllUpToHtmlElement(),e._insertElement(t,p.HTML),e.insertionMode=de.IN_FRAMESET);}(e,t);break;case u.TEXTAREA:!function(e,t){e._insertElement(t,p.HTML),e.skipNextNewLine=!0,e.tokenizer.state=b.RCDATA,e.originalInsertionMode=e.insertionMode,e.framesetOk=!1,e.insertionMode=de.TEXT;}(e,t);break;case u.NOSCRIPT:e.options.scriptingEnabled?qe(e,t):We(e,t);break;case u.PLAINTEXT:!function(e,t){e.openElements.hasInButtonScope(u.P)&&e._closePElement(),e._insertElement(t,p.HTML),e.tokenizer.state=b.PLAINTEXT;}(e,t);break;case u.COL:case u.TH:case u.TD:case u.TR:case u.HEAD:case u.FRAME:case u.TBODY:case u.TFOOT:case u.THEAD:case u.CAPTION:case u.COLGROUP:break;default:We(e,t);}}function Ke(e,t){const s=t.tagName,a=t.tagID;for(let t=e.openElements.stackTop;t>0;t--){const r=e.openElements.items[t],n=e.openElements.tagIDs[t];if(a===n&&(a!==u.UNKNOWN||e.treeAdapter.getTagName(r)===s)){e.openElements.generateImpliedEndTagsWithExclusion(a),e.openElements.stackTop>=t&&e.openElements.shortenToLength(t);break}if(e._isSpecialElement(r,n))break}}function Ve(e,t){switch(t.tagID){case u.A:case u.B:case u.I:case u.S:case u.U:case u.EM:case u.TT:case u.BIG:case u.CODE:case u.FONT:case u.NOBR:case u.SMALL:case u.STRIKE:case u.STRONG:ge(e,t);break;case u.P:!function(e){e.openElements.hasInButtonScope(u.P)||e._insertFakeElement(N.P,u.P),e._closePElement();}(e);break;case u.DL:case u.UL:case u.OL:case u.DIR:case u.DIV:case u.NAV:case u.PRE:case u.MAIN:case u.MENU:case u.ASIDE:case u.BUTTON:case u.CENTER:case u.FIGURE:case u.FOOTER:case u.HEADER:case u.HGROUP:case u.DIALOG:case u.ADDRESS:case u.ARTICLE:case u.DETAILS:case u.SECTION:case u.SUMMARY:case u.LISTING:case u.FIELDSET:case u.BLOCKQUOTE:case u.FIGCAPTION:!function(e,t){const s=t.tagID;e.openElements.hasInScope(s)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(s));}(e,t);break;case u.LI:!function(e){e.openElements.hasInListItemScope(u.LI)&&(e.openElements.generateImpliedEndTagsWithExclusion(u.LI),e.openElements.popUntilTagNamePopped(u.LI));}(e);break;case u.DD:case u.DT:!function(e,t){const s=t.tagID;e.openElements.hasInScope(s)&&(e.openElements.generateImpliedEndTagsWithExclusion(s),e.openElements.popUntilTagNamePopped(s));}(e,t);break;case u.H1:case u.H2:case u.H3:case u.H4:case u.H5:case u.H6:!function(e){e.openElements.hasNumberedHeaderInScope()&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilNumberedHeaderPopped());}(e);break;case u.BR:!function(e){e._reconstructActiveFormattingElements(),e._insertFakeElement(N.BR,u.BR),e.openElements.pop(),e.framesetOk=!1;}(e);break;case u.BODY:!function(e,t){if(e.openElements.hasInScope(u.BODY)&&(e.insertionMode=de.AFTER_BODY,e.options.sourceCodeLocationInfo)){const s=e.openElements.tryPeekProperlyNestedBodyElement();s&&e._setEndLocation(s,t);}}(e,t);break;case u.HTML:!function(e,t){e.openElements.hasInScope(u.BODY)&&(e.insertionMode=de.AFTER_BODY,At(e,t));}(e,t);break;case u.FORM:!function(e){const t=e.openElements.tmplCount>0,{formElement:s}=e;t||(e.formElement=null),(s||t)&&e.openElements.hasInScope(u.FORM)&&(e.openElements.generateImpliedEndTags(),t?e.openElements.popUntilTagNamePopped(u.FORM):s&&e.openElements.remove(s));}(e);break;case u.APPLET:case u.OBJECT:case u.MARQUEE:!function(e,t){const s=t.tagID;e.openElements.hasInScope(s)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(s),e.activeFormattingElements.clearToLastMarker());}(e,t);break;case u.TEMPLATE:Fe(e,t);break;default:Ke(e,t);}}function ze(e,t){e.tmplInsertionModeStack.length>0?_t(e,t):ke(e,t);}function je(e,t){if(Ne.has(e.openElements.currentTagId))switch(e.pendingCharacterTokens.length=0,e.hasNonWhitespacePendingCharacterToken=!1,e.originalInsertionMode=e.insertionMode,e.insertionMode=de.IN_TABLE_TEXT,t.type){case h.CHARACTER:tt(e,t);break;case h.WHITESPACE_CHARACTER:et(e,t);}else $e(e,t);}function Je(e,t){switch(t.tagID){case u.TD:case u.TH:case u.TR:!function(e,t){e.openElements.clearBackToTableContext(),e._insertFakeElement(N.TBODY,u.TBODY),e.insertionMode=de.IN_TABLE_BODY,it(e,t);}(e,t);break;case u.STYLE:case u.SCRIPT:case u.TEMPLATE:He(e,t);break;case u.COL:!function(e,t){e.openElements.clearBackToTableContext(),e._insertFakeElement(N.COLGROUP,u.COLGROUP),e.insertionMode=de.IN_COLUMN_GROUP,rt(e,t);}(e,t);break;case u.FORM:!function(e,t){e.formElement||0!==e.openElements.tmplCount||(e._insertElement(t,p.HTML),e.formElement=e.openElements.current,e.openElements.pop());}(e,t);break;case u.TABLE:!function(e,t){e.openElements.hasInTableScope(u.TABLE)&&(e.openElements.popUntilTagNamePopped(u.TABLE),e._resetInsertionMode(),e._processStartTag(t));}(e,t);break;case u.TBODY:case u.TFOOT:case u.THEAD:!function(e,t){e.openElements.clearBackToTableContext(),e._insertElement(t,p.HTML),e.insertionMode=de.IN_TABLE_BODY;}(e,t);break;case u.INPUT:!function(e,t){Qe(t)?e._appendElement(t,p.HTML):$e(e,t),t.ackSelfClosing=!0;}(e,t);break;case u.CAPTION:!function(e,t){e.openElements.clearBackToTableContext(),e.activeFormattingElements.insertMarker(),e._insertElement(t,p.HTML),e.insertionMode=de.IN_CAPTION;}(e,t);break;case u.COLGROUP:!function(e,t){e.openElements.clearBackToTableContext(),e._insertElement(t,p.HTML),e.insertionMode=de.IN_COLUMN_GROUP;}(e,t);break;default:$e(e,t);}}function Ze(e,t){switch(t.tagID){case u.TABLE:e.openElements.hasInTableScope(u.TABLE)&&(e.openElements.popUntilTagNamePopped(u.TABLE),e._resetInsertionMode());break;case u.TEMPLATE:Fe(e,t);break;case u.BODY:case u.CAPTION:case u.COL:case u.COLGROUP:case u.HTML:case u.TBODY:case u.TD:case u.TFOOT:case u.TH:case u.THEAD:case u.TR:break;default:$e(e,t);}}function $e(e,t){const s=e.fosterParentingEnabled;e.fosterParentingEnabled=!0,we(e,t),e.fosterParentingEnabled=s;}function et(e,t){e.pendingCharacterTokens.push(t);}function tt(e,t){e.pendingCharacterTokens.push(t),e.hasNonWhitespacePendingCharacterToken=!0;}function st(e,t){let s=0;if(e.hasNonWhitespacePendingCharacterToken)for(;s<e.pendingCharacterTokens.length;s++)$e(e,e.pendingCharacterTokens[s]);else for(;s<e.pendingCharacterTokens.length;s++)e._insertCharacters(e.pendingCharacterTokens[s]);e.insertionMode=e.originalInsertionMode,e._processToken(t);}const at=new Set([u.CAPTION,u.COL,u.COLGROUP,u.TBODY,u.TD,u.TFOOT,u.TH,u.THEAD,u.TR]);function rt(e,t){switch(t.tagID){case u.HTML:Xe(e,t);break;case u.COL:e._appendElement(t,p.HTML),t.ackSelfClosing=!0;break;case u.TEMPLATE:He(e,t);break;default:nt(e,t);}}function nt(e,t){e.openElements.currentTagId===u.COLGROUP&&(e.openElements.pop(),e.insertionMode=de.IN_TABLE,e._processToken(t));}function it(e,t){switch(t.tagID){case u.TR:e.openElements.clearBackToTableBodyContext(),e._insertElement(t,p.HTML),e.insertionMode=de.IN_ROW;break;case u.TH:case u.TD:e.openElements.clearBackToTableBodyContext(),e._insertFakeElement(N.TR,u.TR),e.insertionMode=de.IN_ROW,ct(e,t);break;case u.CAPTION:case u.COL:case u.COLGROUP:case u.TBODY:case u.TFOOT:case u.THEAD:e.openElements.hasTableBodyContextInTableScope()&&(e.openElements.clearBackToTableBodyContext(),e.openElements.pop(),e.insertionMode=de.IN_TABLE,Je(e,t));break;default:Je(e,t);}}function ot(e,t){const s=t.tagID;switch(t.tagID){case u.TBODY:case u.TFOOT:case u.THEAD:e.openElements.hasInTableScope(s)&&(e.openElements.clearBackToTableBodyContext(),e.openElements.pop(),e.insertionMode=de.IN_TABLE);break;case u.TABLE:e.openElements.hasTableBodyContextInTableScope()&&(e.openElements.clearBackToTableBodyContext(),e.openElements.pop(),e.insertionMode=de.IN_TABLE,Ze(e,t));break;case u.BODY:case u.CAPTION:case u.COL:case u.COLGROUP:case u.HTML:case u.TD:case u.TH:case u.TR:break;default:Ze(e,t);}}function ct(e,t){switch(t.tagID){case u.TH:case u.TD:e.openElements.clearBackToTableRowContext(),e._insertElement(t,p.HTML),e.insertionMode=de.IN_CELL,e.activeFormattingElements.insertMarker();break;case u.CAPTION:case u.COL:case u.COLGROUP:case u.TBODY:case u.TFOOT:case u.THEAD:case u.TR:e.openElements.hasInTableScope(u.TR)&&(e.openElements.clearBackToTableRowContext(),e.openElements.pop(),e.insertionMode=de.IN_TABLE_BODY,it(e,t));break;default:Je(e,t);}}function Et(e,t){switch(t.tagID){case u.TR:e.openElements.hasInTableScope(u.TR)&&(e.openElements.clearBackToTableRowContext(),e.openElements.pop(),e.insertionMode=de.IN_TABLE_BODY);break;case u.TABLE:e.openElements.hasInTableScope(u.TR)&&(e.openElements.clearBackToTableRowContext(),e.openElements.pop(),e.insertionMode=de.IN_TABLE_BODY,ot(e,t));break;case u.TBODY:case u.TFOOT:case u.THEAD:(e.openElements.hasInTableScope(t.tagID)||e.openElements.hasInTableScope(u.TR))&&(e.openElements.clearBackToTableRowContext(),e.openElements.pop(),e.insertionMode=de.IN_TABLE_BODY,ot(e,t));break;case u.BODY:case u.CAPTION:case u.COL:case u.COLGROUP:case u.HTML:case u.TD:case u.TH:break;default:Ze(e,t);}}function Tt(e,t){switch(t.tagID){case u.HTML:Xe(e,t);break;case u.OPTION:e.openElements.currentTagId===u.OPTION&&e.openElements.pop(),e._insertElement(t,p.HTML);break;case u.OPTGROUP:e.openElements.currentTagId===u.OPTION&&e.openElements.pop(),e.openElements.currentTagId===u.OPTGROUP&&e.openElements.pop(),e._insertElement(t,p.HTML);break;case u.INPUT:case u.KEYGEN:case u.TEXTAREA:case u.SELECT:e.openElements.hasInSelectScope(u.SELECT)&&(e.openElements.popUntilTagNamePopped(u.SELECT),e._resetInsertionMode(),t.tagID!==u.SELECT&&e._processStartTag(t));break;case u.SCRIPT:case u.TEMPLATE:He(e,t);}}function ht(e,t){switch(t.tagID){case u.OPTGROUP:e.openElements.stackTop>0&&e.openElements.currentTagId===u.OPTION&&e.openElements.tagIDs[e.openElements.stackTop-1]===u.OPTGROUP&&e.openElements.pop(),e.openElements.currentTagId===u.OPTGROUP&&e.openElements.pop();break;case u.OPTION:e.openElements.currentTagId===u.OPTION&&e.openElements.pop();break;case u.SELECT:e.openElements.hasInSelectScope(u.SELECT)&&(e.openElements.popUntilTagNamePopped(u.SELECT),e._resetInsertionMode());break;case u.TEMPLATE:Fe(e,t);}}function _t(e,t){e.openElements.tmplCount>0?(e.openElements.popUntilTagNamePopped(u.TEMPLATE),e.activeFormattingElements.clearToLastMarker(),e.tmplInsertionModeStack.shift(),e._resetInsertionMode(),e.onEof(t)):ke(e,t);}function At(e,t){var s;if(t.tagID===u.HTML){if(e.fragmentContext||(e.insertionMode=de.AFTER_AFTER_BODY),e.options.sourceCodeLocationInfo&&e.openElements.tagIDs[0]===u.HTML){e._setEndLocation(e.openElements.items[0],t);const a=e.openElements.items[1];a&&!(null===(s=e.treeAdapter.getNodeSourceCodeLocation(a))||void 0===s?void 0:s.endTag)&&e._setEndLocation(a,t);}}else lt(e,t);}function lt(e,t){e.insertionMode=de.IN_BODY,we(e,t);}function mt(e,t){e.insertionMode=de.IN_BODY,we(e,t);}function pt(e){for(;e.treeAdapter.getNamespaceURI(e.openElements.current)!==p.HTML&&!e._isIntegrationPoint(e.openElements.currentTagId,e.openElements.current);)e.openElements.pop();}return new Set([N.AREA,N.BASE,N.BASEFONT,N.BGSOUND,N.BR,N.COL,N.EMBED,N.FRAME,N.HR,N.IMG,N.INPUT,N.KEYGEN,N.LINK,N.META,N.PARAM,N.SOURCE,N.TRACK,N.WBR]),e.parse=function(e,t){return Ce.parse(e,t)},e.parseFragment=function(e,t,s){"string"==typeof e&&(s=t,t=e,e=null);const a=Ce.getFragmentParser(e,s);return a.tokenizer.write(t,!0),a.getFragment()},Object.defineProperty(e,"__esModule",{value:!0}),e}({});const parse=e.parse;const parseFragment=e.parseFragment;

const docParser = new WeakMap();
function parseDocumentUtil(ownerDocument, html) {
  const doc = parse(html.trim(), getParser(ownerDocument));
  doc.documentElement = doc.firstElementChild;
  doc.head = doc.documentElement.firstElementChild;
  doc.body = doc.head.nextElementSibling;
  return doc;
}
function parseFragmentUtil(ownerDocument, html) {
  if (typeof html === 'string') {
    html = html.trim();
  }
  else {
    html = '';
  }
  const frag = parseFragment(html, getParser(ownerDocument));
  return frag;
}
function getParser(ownerDocument) {
  let parseOptions = docParser.get(ownerDocument);
  if (parseOptions != null) {
    return parseOptions;
  }
  const treeAdapter = {
    createDocument() {
      const doc = ownerDocument.createElement("#document" /* NODE_NAMES.DOCUMENT_NODE */);
      doc['x-mode'] = 'no-quirks';
      return doc;
    },
    setNodeSourceCodeLocation(node, location) {
      node.sourceCodeLocation = location;
    },
    getNodeSourceCodeLocation(node) {
      return node.sourceCodeLocation;
    },
    createDocumentFragment() {
      return ownerDocument.createDocumentFragment();
    },
    createElement(tagName, namespaceURI, attrs) {
      const elm = ownerDocument.createElementNS(namespaceURI, tagName);
      for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        if (attr.namespace == null || attr.namespace === 'http://www.w3.org/1999/xhtml') {
          elm.setAttribute(attr.name, attr.value);
        }
        else {
          elm.setAttributeNS(attr.namespace, attr.name, attr.value);
        }
      }
      return elm;
    },
    createCommentNode(data) {
      return ownerDocument.createComment(data);
    },
    appendChild(parentNode, newNode) {
      parentNode.appendChild(newNode);
    },
    insertBefore(parentNode, newNode, referenceNode) {
      parentNode.insertBefore(newNode, referenceNode);
    },
    setTemplateContent(templateElement, contentElement) {
      templateElement.content = contentElement;
    },
    getTemplateContent(templateElement) {
      return templateElement.content;
    },
    setDocumentType(doc, name, publicId, systemId) {
      let doctypeNode = doc.childNodes.find((n) => n.nodeType === 10 /* NODE_TYPES.DOCUMENT_TYPE_NODE */);
      if (doctypeNode == null) {
        doctypeNode = ownerDocument.createDocumentTypeNode();
        doc.insertBefore(doctypeNode, doc.firstChild);
      }
      doctypeNode.nodeValue = '!DOCTYPE';
      doctypeNode['x-name'] = name;
      doctypeNode['x-publicId'] = publicId;
      doctypeNode['x-systemId'] = systemId;
    },
    setDocumentMode(doc, mode) {
      doc['x-mode'] = mode;
    },
    getDocumentMode(doc) {
      return doc['x-mode'];
    },
    detachNode(node) {
      node.remove();
    },
    insertText(parentNode, text) {
      const lastChild = parentNode.lastChild;
      if (lastChild != null && lastChild.nodeType === 3 /* NODE_TYPES.TEXT_NODE */) {
        lastChild.nodeValue += text;
      }
      else {
        parentNode.appendChild(ownerDocument.createTextNode(text));
      }
    },
    insertTextBefore(parentNode, text, referenceNode) {
      const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
      if (prevNode != null && prevNode.nodeType === 3 /* NODE_TYPES.TEXT_NODE */) {
        prevNode.nodeValue += text;
      }
      else {
        parentNode.insertBefore(ownerDocument.createTextNode(text), referenceNode);
      }
    },
    adoptAttributes(recipient, attrs) {
      for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        if (recipient.hasAttributeNS(attr.namespace, attr.name) === false) {
          recipient.setAttributeNS(attr.namespace, attr.name, attr.value);
        }
      }
    },
    getFirstChild(node) {
      return node.childNodes[0];
    },
    getChildNodes(node) {
      return node.childNodes;
    },
    getParentNode(node) {
      return node.parentNode;
    },
    getAttrList(element) {
      const attrs = element.attributes.__items.map((attr) => {
        return {
          name: attr.name,
          value: attr.value,
          namespace: attr.namespaceURI,
          prefix: null,
        };
      });
      return attrs;
    },
    getTagName(element) {
      if (element.namespaceURI === 'http://www.w3.org/1999/xhtml') {
        return element.nodeName.toLowerCase();
      }
      else {
        return element.nodeName;
      }
    },
    getNamespaceURI(element) {
      // mock-doc widens the type of an element's namespace uri to 'string | null'
      // we use a type assertion here to adhere to parse5's type definitions
      return element.namespaceURI;
    },
    getTextNodeContent(textNode) {
      return textNode.nodeValue;
    },
    getCommentNodeContent(commentNode) {
      return commentNode.nodeValue;
    },
    getDocumentTypeNodeName(doctypeNode) {
      return doctypeNode['x-name'];
    },
    getDocumentTypeNodePublicId(doctypeNode) {
      return doctypeNode['x-publicId'];
    },
    getDocumentTypeNodeSystemId(doctypeNode) {
      return doctypeNode['x-systemId'];
    },
    // @ts-ignore - a `MockNode` will never be assignable to a `TreeAdapterTypeMap['text']`. As a result, we cannot
    // complete this function signature
    isTextNode(node) {
      return node.nodeType === 3 /* NODE_TYPES.TEXT_NODE */;
    },
    // @ts-ignore - a `MockNode` will never be assignable to a `TreeAdapterTypeMap['comment']`. As a result, we cannot
    // complete this function signature (which requires its return type to be a type predicate)
    isCommentNode(node) {
      return node.nodeType === 8 /* NODE_TYPES.COMMENT_NODE */;
    },
    // @ts-ignore - a `MockNode` will never be assignable to a `TreeAdapterTypeMap['document']`. As a result, we cannot
    // complete this function signature (which requires its return type to be a type predicate)
    isDocumentTypeNode(node) {
      return node.nodeType === 10 /* NODE_TYPES.DOCUMENT_TYPE_NODE */;
    },
    // @ts-ignore - a `MockNode` will never be assignable to a `TreeAdapterTypeMap['element']`. As a result, we cannot
    // complete this function signature (which requires its return type to be a type predicate)
    isElementNode(node) {
      return node.nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */;
    },
  };
  parseOptions = {
    treeAdapter: treeAdapter,
  };
  docParser.set(ownerDocument, parseOptions);
  return parseOptions;
}

// Sizzle 2.3.8
const Sizzle = (function() {
const window = {
  document: {
  createElement() {
    return {};
  },
  nodeType: 9,
  documentElement: {
    nodeType: 1,
    nodeName: 'HTML'
  }
  }
};
const module = { exports: {} };

/*! Sizzle v2.3.8 | (c) JS Foundation and other contributors | js.foundation */
!function(e){var t,n,r,i,o,u,l,a,s,c,f,d,p,h,g,m,y,v,w,b="sizzle"+1*new Date,N=e.document,C=0,x=0,S=ae(),E=ae(),A=ae(),D=ae(),T=function(e,t){return e===t&&(f=!0),0},L={}.hasOwnProperty,q=[],I=q.pop,B=q.push,R=q.push,k=q.slice,$=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return -1},H="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",P="(?:\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",z="\\["+M+"*("+P+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+P+"))|)"+M+"*\\]",F=":("+P+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+z+")*)|.*)\\)|)",O=new RegExp(M+"+","g"),j=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),G=new RegExp("^"+M+"*,"+M+"*"),U=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),V=new RegExp(M+"|>"),X=new RegExp(F),J=new RegExp("^"+P+"$"),K={ID:new RegExp("^#("+P+")"),CLASS:new RegExp("^\\.("+P+")"),TAG:new RegExp("^("+P+"|[*])"),ATTR:new RegExp("^"+z),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+H+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/HTML$/i,W=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){d();},ue=ve(function(e){return !0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{R.apply(q=k.call(N.childNodes),N.childNodes),q[N.childNodes.length].nodeType;}catch(e){R={apply:q.length?function(e,t){B.apply(e,k.call(t));}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1;}};}function le(e,t,r,i){var o,l,s,c,f,h,y,v=t&&t.ownerDocument,N=t?t.nodeType:9;if(r=r||[],"string"!=typeof e||!e||1!==N&&9!==N&&11!==N)return r;if(!i&&(d(t),t=t||p,g)){if(11!==N&&(f=_.exec(e)))if(o=f[1]){if(9===N){if(!(s=t.getElementById(o)))return r;if(s.id===o)return r.push(s),r}else if(v&&(s=v.getElementById(o))&&w(t,s)&&s.id===o)return r.push(s),r}else {if(f[2])return R.apply(r,t.getElementsByTagName(e)),r;if((o=f[3])&&n.getElementsByClassName&&t.getElementsByClassName)return R.apply(r,t.getElementsByClassName(o)),r}if(n.qsa&&!D[e+" "]&&(!m||!m.test(e))&&(1!==N||"object"!==t.nodeName.toLowerCase())){if(y=e,v=t,1===N&&(V.test(e)||U.test(e))){(v=ee.test(e)&&ge(t.parentNode)||t)===t&&n.scope||((c=t.getAttribute("id"))?c=c.replace(re,ie):t.setAttribute("id",c=b)),l=(h=u(e)).length;while(l--)h[l]=(c?"#"+c:":scope")+" "+ye(h[l]);y=h.join(",");}try{if(n.cssSupportsSelector&&!CSS.supports("selector("+y+")"))throw new Error;return R.apply(r,v.querySelectorAll(y)),r}catch(t){D(e,!0);}finally{c===b&&t.removeAttribute("id");}}}return a(e.replace(j,"$1"),t,r,i)}function ae(){var e=[];function t(n,i){return e.push(n+" ")>r.cacheLength&&delete t[e.shift()],t[n+" "]=i}return t}function se(e){return e[b]=!0,e}function ce(e){var t=p.createElement("fieldset");try{return !!e(t)}catch(e){return !1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null;}}function fe(e,t){var n=e.split("|"),i=n.length;while(i--)r.attrHandle[n[i]]=t;}function de(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return -1;return e?1:-1}function pe(e){return function(t){return "form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&ue(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function he(e){return se(function(t){return t=+t,se(function(n,r){var i,o=e([],n.length,t),u=o.length;while(u--)n[i=o[u]]&&(n[i]=!(r[i]=n[i]));})})}function ge(e){return e&&void 0!==e.getElementsByTagName&&e}n=le.support={},o=le.isXML=function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;return !Q.test(t||n&&n.nodeName||"HTML")},d=le.setDocument=function(e){var t,i,u=e?e.ownerDocument||e:N;return u!=p&&9===u.nodeType&&u.documentElement?(p=u,h=p.documentElement,g=!o(p),N!=p&&(i=p.defaultView)&&i.top!==i&&(i.addEventListener?i.addEventListener("unload",oe,!1):i.attachEvent&&i.attachEvent("onunload",oe)),n.scope=ce(function(e){return h.appendChild(e).appendChild(p.createElement("div")),void 0!==e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length}),n.cssSupportsSelector=ce(function(){return CSS.supports("selector(*)")&&p.querySelectorAll(":is(:jqfake)")&&!CSS.supports("selector(:is(*,:jqfake))")}),n.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ce(function(e){return e.appendChild(p.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=Z.test(p.getElementsByClassName),n.getById=ce(function(e){return h.appendChild(e).id=b,!p.getElementsByName||!p.getElementsByName(b).length}),n.getById?(r.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},r.find.ID=function(e,t){if(void 0!==t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(r.filter.ID=function(e){var t=e.replace(te,ne);return function(e){var n=void 0!==e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},r.find.ID=function(e,t){if(void 0!==t.getElementById&&g){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return [o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return [o]}return []}}),r.find.TAG=n.getElementsByTagName?function(e,t){return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},r.find.CLASS=n.getElementsByClassName&&function(e,t){if(void 0!==t.getElementsByClassName&&g)return t.getElementsByClassName(e)},y=[],m=[],(n.qsa=Z.test(p.querySelectorAll))&&(ce(function(e){var t;h.appendChild(e).innerHTML="<a id='"+b+"'></a><select id='"+b+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&m.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||m.push("\\["+M+"*(?:value|"+H+")"),e.querySelectorAll("[id~="+b+"-]").length||m.push("~="),(t=p.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||m.push("\\["+M+"*name"+M+"*="+M+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||m.push(":checked"),e.querySelectorAll("a#"+b+"+*").length||m.push(".#.+[+~]"),e.querySelectorAll("\\\f"),m.push("[\\r\\n\\f]");}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=p.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&m.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&m.push(":enabled",":disabled"),h.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&m.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),m.push(",.*:");})),(n.matchesSelector=Z.test(v=h.matches||h.webkitMatchesSelector||h.mozMatchesSelector||h.oMatchesSelector||h.msMatchesSelector))&&ce(function(e){n.disconnectedMatch=v.call(e,"*"),v.call(e,"[s!='']:x"),y.push("!=",F);}),n.cssSupportsSelector||m.push(":has"),m=m.length&&new RegExp(m.join("|")),y=y.length&&new RegExp(y.join("|")),t=Z.test(h.compareDocumentPosition),w=t||Z.test(h.contains)?function(e,t){var n=9===e.nodeType&&e.documentElement||e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return !0;return !1},T=t?function(e,t){if(e===t)return f=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r||(1&(r=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===r?e==p||e.ownerDocument==N&&w(N,e)?-1:t==p||t.ownerDocument==N&&w(N,t)?1:c?$(c,e)-$(c,t):0:4&r?-1:1)}:function(e,t){if(e===t)return f=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,u=[e],l=[t];if(!i||!o)return e==p?-1:t==p?1:i?-1:o?1:c?$(c,e)-$(c,t):0;if(i===o)return de(e,t);n=e;while(n=n.parentNode)u.unshift(n);n=t;while(n=n.parentNode)l.unshift(n);while(u[r]===l[r])r++;return r?de(u[r],l[r]):u[r]==N?-1:l[r]==N?1:0},p):p},le.matches=function(e,t){return le(e,null,null,t)},le.matchesSelector=function(e,t){if(d(e),n.matchesSelector&&g&&!D[t+" "]&&(!y||!y.test(t))&&(!m||!m.test(t)))try{var r=v.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){D(t,!0);}return le(t,p,null,[e]).length>0},le.contains=function(e,t){return (e.ownerDocument||e)!=p&&d(e),w(e,t)},le.attr=function(e,t){(e.ownerDocument||e)!=p&&d(e);var i=r.attrHandle[t.toLowerCase()],o=i&&L.call(r.attrHandle,t.toLowerCase())?i(e,t,!g):void 0;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null},le.escape=function(e){return (e+"").replace(re,ie)},le.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},le.uniqueSort=function(e){var t,r=[],i=0,o=0;if(f=!n.detectDuplicates,c=!n.sortStable&&e.slice(0),e.sort(T),f){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1);}return c=null,e},i=le.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=i(e);}else if(3===o||4===o)return e.nodeValue}else while(t=e[r++])n+=i(t);return n},(r=le.selectors={cacheLength:50,createPseudo:se,match:K,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||le.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&le.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return K.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=u(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return "*"===e?function(){return !0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=S[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&S(e,function(e){return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=le.attr(r,e);return null==i?"!="===t:!t||(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i.replace(O," ")+" ").indexOf(n)>-1:"|="===t&&(i===n||i.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),u="last"!==e.slice(-4),l="of-type"===t;return 1===r&&0===i?function(e){return !!e.parentNode}:function(t,n,a){var s,c,f,d,p,h,g=o!==u?"nextSibling":"previousSibling",m=t.parentNode,y=l&&t.nodeName.toLowerCase(),v=!a&&!l,w=!1;if(m){if(o){while(g){d=t;while(d=d[g])if(l?d.nodeName.toLowerCase()===y:1===d.nodeType)return !1;h=g="only"===e&&!h&&"nextSibling";}return !0}if(h=[u?m.firstChild:m.lastChild],u&&v){w=(p=(s=(c=(f=(d=m)[b]||(d[b]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]||[])[0]===C&&s[1])&&s[2],d=p&&m.childNodes[p];while(d=++p&&d&&d[g]||(w=p=0)||h.pop())if(1===d.nodeType&&++w&&d===t){c[e]=[C,p,w];break}}else if(v&&(w=p=(s=(c=(f=(d=t)[b]||(d[b]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]||[])[0]===C&&s[1]),!1===w)while(d=++p&&d&&d[g]||(w=p=0)||h.pop())if((l?d.nodeName.toLowerCase()===y:1===d.nodeType)&&++w&&(v&&((c=(f=d[b]||(d[b]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]=[C,w]),d===t))break;return (w-=i)===r||w%r==0&&w/r>=0}}},PSEUDO:function(e,t){var n,i=r.pseudos[e]||r.setFilters[e.toLowerCase()]||le.error("unsupported pseudo: "+e);return i[b]?i(t):i.length>1?(n=[e,e,"",t],r.setFilters.hasOwnProperty(e.toLowerCase())?se(function(e,n){var r,o=i(e,t),u=o.length;while(u--)e[r=$(e,o[u])]=!(n[r]=o[u]);}):function(e){return i(e,0,n)}):i}},pseudos:{not:se(function(e){var t=[],n=[],r=l(e.replace(j,"$1"));return r[b]?se(function(e,t,n,i){var o,u=r(e,null,i,[]),l=e.length;while(l--)(o=u[l])&&(e[l]=!(t[l]=o));}):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}}),has:se(function(e){return function(t){return le(e,t).length>0}}),contains:se(function(e){return e=e.replace(te,ne),function(t){return (t.textContent||i(t)).indexOf(e)>-1}}),lang:se(function(e){return J.test(e||"")||le.error("unsupported lang: "+e),e=e.replace(te,ne).toLowerCase(),function(t){var n;do{if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return (n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return !1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===h},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:pe(!1),disabled:pe(!0),checked:function(e){var t=e.nodeName.toLowerCase();return "input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return !1;return !0},parent:function(e){return !r.pseudos.empty(e)},header:function(e){return Y.test(e.nodeName)},input:function(e){return W.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return "input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return "input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:he(function(){return [0]}),last:he(function(e,t){return [t-1]}),eq:he(function(e,t,n){return [n<0?n+t:n]}),even:he(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:he(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:he(function(e,t,n){for(var r=n<0?n+t:n>t?t:n;--r>=0;)e.push(r);return e}),gt:he(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=r.pseudos.eq;for(t in {radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=function(e){return function(t){return "input"===t.nodeName.toLowerCase()&&t.type===e}}(t);for(t in {submit:!0,reset:!0})r.pseudos[t]=function(e){return function(t){var n=t.nodeName.toLowerCase();return ("input"===n||"button"===n)&&t.type===e}}(t);function me(){}me.prototype=r.filters=r.pseudos,r.setFilters=new me,u=le.tokenize=function(e,t){var n,i,o,u,l,a,s,c=E[e+" "];if(c)return t?0:c.slice(0);l=e,a=[],s=r.preFilter;while(l){n&&!(i=G.exec(l))||(i&&(l=l.slice(i[0].length)||l),a.push(o=[])),n=!1,(i=U.exec(l))&&(n=i.shift(),o.push({value:n,type:i[0].replace(j," ")}),l=l.slice(n.length));for(u in r.filter)!(i=K[u].exec(l))||s[u]&&!(i=s[u](i))||(n=i.shift(),o.push({value:n,type:u,matches:i}),l=l.slice(n.length));if(!n)break}return t?l.length:l?le.error(e):E(e,a).slice(0)};function ye(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function ve(e,t,n){var r=t.dir,i=t.next,o=i||r,u=n&&"parentNode"===o,l=x++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||u)return e(t,n,i);return !1}:function(t,n,a){var s,c,f,d=[C,l];if(a){while(t=t[r])if((1===t.nodeType||u)&&e(t,n,a))return !0}else while(t=t[r])if(1===t.nodeType||u)if(f=t[b]||(t[b]={}),c=f[t.uniqueID]||(f[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else {if((s=c[o])&&s[0]===C&&s[1]===l)return d[2]=s[2];if(c[o]=d,d[2]=e(t,n,a))return !0}return !1}}function we(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return !1;return !0}:e[0]}function be(e,t,n){for(var r=0,i=t.length;r<i;r++)le(e,t[r],n);return n}function Ne(e,t,n,r,i){for(var o,u=[],l=0,a=e.length,s=null!=t;l<a;l++)(o=e[l])&&(n&&!n(o,r,i)||(u.push(o),s&&t.push(l)));return u}function Ce(e,t,n,r,i,o){return r&&!r[b]&&(r=Ce(r)),i&&!i[b]&&(i=Ce(i,o)),se(function(o,u,l,a){var s,c,f,d=[],p=[],h=u.length,g=o||be(t||"*",l.nodeType?[l]:l,[]),m=!e||!o&&t?g:Ne(g,d,e,l,a),y=n?i||(o?e:h||r)?[]:u:m;if(n&&n(m,y,l,a),r){s=Ne(y,p),r(s,[],l,a),c=s.length;while(c--)(f=s[c])&&(y[p[c]]=!(m[p[c]]=f));}if(o){if(i||e){if(i){s=[],c=y.length;while(c--)(f=y[c])&&s.push(m[c]=f);i(null,y=[],s,a);}c=y.length;while(c--)(f=y[c])&&(s=i?$(o,f):d[c])>-1&&(o[s]=!(u[s]=f));}}else y=Ne(y===u?y.splice(h,y.length):y),i?i(null,u,y,a):R.apply(u,y);})}function xe(e){for(var t,n,i,o=e.length,u=r.relative[e[0].type],l=u||r.relative[" "],a=u?1:0,c=ve(function(e){return e===t},l,!0),f=ve(function(e){return $(t,e)>-1},l,!0),d=[function(e,n,r){var i=!u&&(r||n!==s)||((t=n).nodeType?c(e,n,r):f(e,n,r));return t=null,i}];a<o;a++)if(n=r.relative[e[a].type])d=[ve(we(d),n)];else {if((n=r.filter[e[a].type].apply(null,e[a].matches))[b]){for(i=++a;i<o;i++)if(r.relative[e[i].type])break;return Ce(a>1&&we(d),a>1&&ye(e.slice(0,a-1).concat({value:" "===e[a-2].type?"*":""})).replace(j,"$1"),n,a<i&&xe(e.slice(a,i)),i<o&&xe(e=e.slice(i)),i<o&&ye(e))}d.push(n);}return we(d)}function Se(e,t){var n=t.length>0,i=e.length>0,o=function(o,u,l,a,c){var f,h,m,y=0,v="0",w=o&&[],b=[],N=s,x=o||i&&r.find.TAG("*",c),S=C+=null==N?1:Math.random()||.1,E=x.length;for(c&&(s=u==p||u||c);v!==E&&null!=(f=x[v]);v++){if(i&&f){h=0,u||f.ownerDocument==p||(d(f),l=!g);while(m=e[h++])if(m(f,u||p,l)){a.push(f);break}c&&(C=S);}n&&((f=!m&&f)&&y--,o&&w.push(f));}if(y+=v,n&&v!==y){h=0;while(m=t[h++])m(w,b,u,l);if(o){if(y>0)while(v--)w[v]||b[v]||(b[v]=I.call(a));b=Ne(b);}R.apply(a,b),c&&!o&&b.length>0&&y+t.length>1&&le.uniqueSort(a);}return c&&(C=S,s=N),w};return n?se(o):o}l=le.compile=function(e,t){var n,r=[],i=[],o=A[e+" "];if(!o){t||(t=u(e)),n=t.length;while(n--)(o=xe(t[n]))[b]?r.push(o):i.push(o);(o=A(e,Se(i,r))).selector=e;}return o},a=le.select=function(e,t,n,i){var o,a,s,c,f,d="function"==typeof e&&e,p=!i&&u(e=d.selector||e);if(n=n||[],1===p.length){if((a=p[0]=p[0].slice(0)).length>2&&"ID"===(s=a[0]).type&&9===t.nodeType&&g&&r.relative[a[1].type]){if(!(t=(r.find.ID(s.matches[0].replace(te,ne),t)||[])[0]))return n;d&&(t=t.parentNode),e=e.slice(a.shift().value.length);}o=K.needsContext.test(e)?0:a.length;while(o--){if(s=a[o],r.relative[c=s.type])break;if((f=r.find[c])&&(i=f(s.matches[0].replace(te,ne),ee.test(a[0].type)&&ge(t.parentNode)||t))){if(a.splice(o,1),!(e=i.length&&ye(a)))return R.apply(n,i),n;break}}}return (d||l(e,p))(i,t,!g,n,!t||ee.test(e)&&ge(t.parentNode)||t),n},n.sortStable=b.split("").sort(T).join("")===b,n.detectDuplicates=!!f,d(),n.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(p.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(H,function(e,t,n){var r;if(!n)return !0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null});var Ee=e.Sizzle;le.noConflict=function(){return e.Sizzle===le&&(e.Sizzle=Ee),le},"function"==typeof define&&define.amd?define(function(){return le}):"undefined"!=typeof module&&module.exports?module.exports=le:e.Sizzle=le;}(window);
//# sourceMappingURL=sizzle.min.map

return module.exports;
})();

function matches(selector, elm) {
  const r = Sizzle.matches(selector, [elm]);
  return r.length > 0;
}
function selectOne(selector, elm) {
  const r = Sizzle(selector, elm);
  return r[0] || null;
}
function selectAll(selector, elm) {
  return Sizzle(selector, elm);
}

function serializeNodeToHtml(elm, opts = {}) {
  const output = {
    currentLineWidth: 0,
    indent: 0,
    isWithinBody: false,
    text: [],
  };
  if (opts.prettyHtml) {
    if (typeof opts.indentSpaces !== 'number') {
      opts.indentSpaces = 2;
    }
    if (typeof opts.newLines !== 'boolean') {
      opts.newLines = true;
    }
    opts.approximateLineWidth = -1;
  }
  else {
    opts.prettyHtml = false;
    if (typeof opts.newLines !== 'boolean') {
      opts.newLines = false;
    }
    if (typeof opts.indentSpaces !== 'number') {
      opts.indentSpaces = 0;
    }
  }
  if (typeof opts.approximateLineWidth !== 'number') {
    opts.approximateLineWidth = -1;
  }
  if (typeof opts.removeEmptyAttributes !== 'boolean') {
    opts.removeEmptyAttributes = true;
  }
  if (typeof opts.removeAttributeQuotes !== 'boolean') {
    opts.removeAttributeQuotes = false;
  }
  if (typeof opts.removeBooleanAttributeQuotes !== 'boolean') {
    opts.removeBooleanAttributeQuotes = false;
  }
  if (typeof opts.removeHtmlComments !== 'boolean') {
    opts.removeHtmlComments = false;
  }
  if (typeof opts.serializeShadowRoot !== 'boolean') {
    opts.serializeShadowRoot = false;
  }
  if (opts.outerHtml) {
    serializeToHtml(elm, opts, output, false);
  }
  else {
    for (let i = 0, ii = elm.childNodes.length; i < ii; i++) {
      serializeToHtml(elm.childNodes[i], opts, output, false);
    }
  }
  if (output.text[0] === '\n') {
    output.text.shift();
  }
  if (output.text[output.text.length - 1] === '\n') {
    output.text.pop();
  }
  return output.text.join('');
}
function serializeToHtml(node, opts, output, isShadowRoot) {
  if (node.nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */ || isShadowRoot) {
    const tagName = isShadowRoot ? 'mock:shadow-root' : getTagName(node);
    if (tagName === 'body') {
      output.isWithinBody = true;
    }
    const ignoreTag = opts.excludeTags != null && opts.excludeTags.includes(tagName);
    if (ignoreTag === false) {
      const isWithinWhitespaceSensitiveNode = opts.newLines || opts.indentSpaces > 0 ? isWithinWhitespaceSensitive(node) : false;
      if (opts.newLines && !isWithinWhitespaceSensitiveNode) {
        output.text.push('\n');
        output.currentLineWidth = 0;
      }
      if (opts.indentSpaces > 0 && !isWithinWhitespaceSensitiveNode) {
        for (let i = 0; i < output.indent; i++) {
          output.text.push(' ');
        }
        output.currentLineWidth += output.indent;
      }
      output.text.push('<' + tagName);
      output.currentLineWidth += tagName.length + 1;
      const attrsLength = node.attributes.length;
      const attributes = opts.prettyHtml && attrsLength > 1
        ? cloneAttributes(node.attributes, true)
        : node.attributes;
      for (let i = 0; i < attrsLength; i++) {
        const attr = attributes.item(i);
        const attrName = attr.name;
        if (attrName === 'style') {
          continue;
        }
        let attrValue = attr.value;
        if (opts.removeEmptyAttributes && attrValue === '' && REMOVE_EMPTY_ATTR.has(attrName)) {
          continue;
        }
        const attrNamespaceURI = attr.namespaceURI;
        if (attrNamespaceURI == null) {
          output.currentLineWidth += attrName.length + 1;
          if (opts.approximateLineWidth > 0 && output.currentLineWidth > opts.approximateLineWidth) {
            output.text.push('\n' + attrName);
            output.currentLineWidth = 0;
          }
          else {
            output.text.push(' ' + attrName);
          }
        }
        else if (attrNamespaceURI === 'http://www.w3.org/XML/1998/namespace') {
          output.text.push(' xml:' + attrName);
          output.currentLineWidth += attrName.length + 5;
        }
        else if (attrNamespaceURI === 'http://www.w3.org/2000/xmlns/') {
          if (attrName !== 'xmlns') {
            output.text.push(' xmlns:' + attrName);
            output.currentLineWidth += attrName.length + 7;
          }
          else {
            output.text.push(' ' + attrName);
            output.currentLineWidth += attrName.length + 1;
          }
        }
        else if (attrNamespaceURI === XLINK_NS) {
          output.text.push(' xlink:' + attrName);
          output.currentLineWidth += attrName.length + 7;
        }
        else {
          output.text.push(' ' + attrNamespaceURI + ':' + attrName);
          output.currentLineWidth += attrNamespaceURI.length + attrName.length + 2;
        }
        if (opts.prettyHtml && attrName === 'class') {
          attrValue = attr.value = attrValue
            .split(' ')
            .filter((t) => t !== '')
            .sort()
            .join(' ')
            .trim();
        }
        if (attrValue === '') {
          if (opts.removeBooleanAttributeQuotes && BOOLEAN_ATTR.has(attrName)) {
            continue;
          }
          if (opts.removeEmptyAttributes && attrName.startsWith('data-')) {
            continue;
          }
        }
        if (opts.removeAttributeQuotes && CAN_REMOVE_ATTR_QUOTES.test(attrValue)) {
          output.text.push('=' + escapeString(attrValue, true));
          output.currentLineWidth += attrValue.length + 1;
        }
        else {
          output.text.push('="' + escapeString(attrValue, true) + '"');
          output.currentLineWidth += attrValue.length + 3;
        }
      }
      if (node.hasAttribute('style')) {
        const cssText = node.style.cssText;
        if (opts.approximateLineWidth > 0 &&
          output.currentLineWidth + cssText.length + 10 > opts.approximateLineWidth) {
          output.text.push(`\nstyle="${cssText}">`);
          output.currentLineWidth = 0;
        }
        else {
          output.text.push(` style="${cssText}">`);
          output.currentLineWidth += cssText.length + 10;
        }
      }
      else {
        output.text.push('>');
        output.currentLineWidth += 1;
      }
    }
    if (EMPTY_ELEMENTS.has(tagName) === false) {
      if (opts.serializeShadowRoot && node.shadowRoot != null) {
        output.indent = output.indent + opts.indentSpaces;
        serializeToHtml(node.shadowRoot, opts, output, true);
        output.indent = output.indent - opts.indentSpaces;
        if (opts.newLines &&
          (node.childNodes.length === 0 ||
            (node.childNodes.length === 1 &&
              node.childNodes[0].nodeType === 3 /* NODE_TYPES.TEXT_NODE */ &&
              node.childNodes[0].nodeValue.trim() === ''))) {
          output.text.push('\n');
          output.currentLineWidth = 0;
          for (let i = 0; i < output.indent; i++) {
            output.text.push(' ');
          }
          output.currentLineWidth += output.indent;
        }
      }
      if (opts.excludeTagContent == null || opts.excludeTagContent.includes(tagName) === false) {
        const childNodes = tagName === 'template' ? node.content.childNodes : node.childNodes;
        const childNodeLength = childNodes.length;
        if (childNodeLength > 0) {
          if (childNodeLength === 1 &&
            childNodes[0].nodeType === 3 /* NODE_TYPES.TEXT_NODE */ &&
            (typeof childNodes[0].nodeValue !== 'string' || childNodes[0].nodeValue.trim() === '')) ;
          else {
            const isWithinWhitespaceSensitiveNode = opts.newLines || opts.indentSpaces > 0 ? isWithinWhitespaceSensitive(node) : false;
            if (!isWithinWhitespaceSensitiveNode && opts.indentSpaces > 0 && ignoreTag === false) {
              output.indent = output.indent + opts.indentSpaces;
            }
            for (let i = 0; i < childNodeLength; i++) {
              serializeToHtml(childNodes[i], opts, output, false);
            }
            if (ignoreTag === false) {
              if (opts.newLines && !isWithinWhitespaceSensitiveNode) {
                output.text.push('\n');
                output.currentLineWidth = 0;
              }
              if (opts.indentSpaces > 0 && !isWithinWhitespaceSensitiveNode) {
                output.indent = output.indent - opts.indentSpaces;
                for (let i = 0; i < output.indent; i++) {
                  output.text.push(' ');
                }
                output.currentLineWidth += output.indent;
              }
            }
          }
        }
        if (ignoreTag === false) {
          output.text.push('</' + tagName + '>');
          output.currentLineWidth += tagName.length + 3;
        }
      }
    }
    if (opts.approximateLineWidth > 0 && STRUCTURE_ELEMENTS.has(tagName)) {
      output.text.push('\n');
      output.currentLineWidth = 0;
    }
    if (tagName === 'body') {
      output.isWithinBody = false;
    }
  }
  else if (node.nodeType === 3 /* NODE_TYPES.TEXT_NODE */) {
    let textContent = node.nodeValue;
    if (typeof textContent === 'string') {
      const trimmedTextContent = textContent.trim();
      if (trimmedTextContent === '') {
        // this text node is whitespace only
        if (isWithinWhitespaceSensitive(node)) {
          // whitespace matters within this element
          // just add the exact text we were given
          output.text.push(textContent);
          output.currentLineWidth += textContent.length;
        }
        else if (opts.approximateLineWidth > 0 && !output.isWithinBody) ;
        else if (!opts.prettyHtml) {
          // this text node is only whitespace, and it's not
          // within a whitespace sensitive element like <pre> or <code>
          // so replace the entire white space with a single new line
          output.currentLineWidth += 1;
          if (opts.approximateLineWidth > 0 && output.currentLineWidth > opts.approximateLineWidth) {
            // good enough for a new line
            // for perf these are all just estimates
            // we don't care to ensure exact line lengths
            output.text.push('\n');
            output.currentLineWidth = 0;
          }
          else {
            // let's keep it all on the same line yet
            output.text.push(' ');
          }
        }
      }
      else {
        // this text node has text content
        const isWithinWhitespaceSensitiveNode = opts.newLines || opts.indentSpaces > 0 || opts.prettyHtml ? isWithinWhitespaceSensitive(node) : false;
        if (opts.newLines && !isWithinWhitespaceSensitiveNode) {
          output.text.push('\n');
          output.currentLineWidth = 0;
        }
        if (opts.indentSpaces > 0 && !isWithinWhitespaceSensitiveNode) {
          for (let i = 0; i < output.indent; i++) {
            output.text.push(' ');
          }
          output.currentLineWidth += output.indent;
        }
        let textContentLength = textContent.length;
        if (textContentLength > 0) {
          // this text node has text content
          const parentTagName = node.parentNode != null && node.parentNode.nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */
            ? node.parentNode.nodeName
            : null;
          if (NON_ESCAPABLE_CONTENT.has(parentTagName)) {
            // this text node cannot have its content escaped since it's going
            // into an element like <style> or <script>
            if (isWithinWhitespaceSensitive(node)) {
              output.text.push(textContent);
            }
            else {
              output.text.push(trimmedTextContent);
              textContentLength = trimmedTextContent.length;
            }
            output.currentLineWidth += textContentLength;
          }
          else {
            // this text node is going into a normal element and html can be escaped
            if (opts.prettyHtml && !isWithinWhitespaceSensitiveNode) {
              // pretty print the text node
              output.text.push(escapeString(textContent.replace(/\s\s+/g, ' ').trim(), false));
              output.currentLineWidth += textContentLength;
            }
            else {
              // not pretty printing the text node
              if (isWithinWhitespaceSensitive(node)) {
                output.currentLineWidth += textContentLength;
              }
              else {
                // this element is not a whitespace sensitive one, like <pre> or <code> so
                // any whitespace at the start and end can be cleaned up to just be one space
                if (/\s/.test(textContent.charAt(0))) {
                  textContent = ' ' + textContent.trimLeft();
                }
                textContentLength = textContent.length;
                if (textContentLength > 1) {
                  if (/\s/.test(textContent.charAt(textContentLength - 1))) {
                    if (opts.approximateLineWidth > 0 &&
                      output.currentLineWidth + textContentLength > opts.approximateLineWidth) {
                      textContent = textContent.trimRight() + '\n';
                      output.currentLineWidth = 0;
                    }
                    else {
                      textContent = textContent.trimRight() + ' ';
                    }
                  }
                }
                output.currentLineWidth += textContentLength;
              }
              output.text.push(escapeString(textContent, false));
            }
          }
        }
      }
    }
  }
  else if (node.nodeType === 8 /* NODE_TYPES.COMMENT_NODE */) {
    const nodeValue = node.nodeValue;
    if (opts.removeHtmlComments) {
      const isHydrateAnnotation = nodeValue.startsWith(CONTENT_REF_ID + '.') ||
        nodeValue.startsWith(ORG_LOCATION_ID + '.') ||
        nodeValue.startsWith(SLOT_NODE_ID + '.') ||
        nodeValue.startsWith(TEXT_NODE_ID + '.');
      if (!isHydrateAnnotation) {
        return;
      }
    }
    const isWithinWhitespaceSensitiveNode = opts.newLines || opts.indentSpaces > 0 ? isWithinWhitespaceSensitive(node) : false;
    if (opts.newLines && !isWithinWhitespaceSensitiveNode) {
      output.text.push('\n');
      output.currentLineWidth = 0;
    }
    if (opts.indentSpaces > 0 && !isWithinWhitespaceSensitiveNode) {
      for (let i = 0; i < output.indent; i++) {
        output.text.push(' ');
      }
      output.currentLineWidth += output.indent;
    }
    output.text.push('<!--' + nodeValue + '-->');
    output.currentLineWidth += nodeValue.length + 7;
  }
  else if (node.nodeType === 10 /* NODE_TYPES.DOCUMENT_TYPE_NODE */) {
    output.text.push('<!doctype html>');
  }
}
const AMP_REGEX = /&/g;
const NBSP_REGEX = /\u00a0/g;
const DOUBLE_QUOTE_REGEX = /"/g;
const LT_REGEX = /</g;
const GT_REGEX = />/g;
const CAN_REMOVE_ATTR_QUOTES = /^[^ \t\n\f\r"'`=<>\/\\-]+$/;
function getTagName(element) {
  if (element.namespaceURI === 'http://www.w3.org/1999/xhtml') {
    return element.nodeName.toLowerCase();
  }
  else {
    return element.nodeName;
  }
}
function escapeString(str, attrMode) {
  str = str.replace(AMP_REGEX, '&amp;').replace(NBSP_REGEX, '&nbsp;');
  if (attrMode) {
    return str.replace(DOUBLE_QUOTE_REGEX, '&quot;');
  }
  return str.replace(LT_REGEX, '&lt;').replace(GT_REGEX, '&gt;');
}
function isWithinWhitespaceSensitive(node) {
  while (node != null) {
    if (WHITESPACE_SENSITIVE.has(node.nodeName)) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
/*@__PURE__*/ const NON_ESCAPABLE_CONTENT = new Set([
  'STYLE',
  'SCRIPT',
  'IFRAME',
  'NOSCRIPT',
  'XMP',
  'NOEMBED',
  'NOFRAMES',
  'PLAINTEXT',
]);
/*@__PURE__*/ const WHITESPACE_SENSITIVE = new Set([
  'CODE',
  'OUTPUT',
  'PLAINTEXT',
  'PRE',
  'SCRIPT',
  'TEMPLATE',
  'TEXTAREA',
]);
/*@__PURE__*/ const EMPTY_ELEMENTS = new Set([
  'area',
  'base',
  'basefont',
  'bgsound',
  'br',
  'col',
  'embed',
  'frame',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'trace',
  'wbr',
]);
/*@__PURE__*/ const REMOVE_EMPTY_ATTR = new Set(['class', 'dir', 'id', 'lang', 'name', 'title']);
/*@__PURE__*/ const BOOLEAN_ATTR = new Set([
  'allowfullscreen',
  'async',
  'autofocus',
  'autoplay',
  'checked',
  'compact',
  'controls',
  'declare',
  'default',
  'defaultchecked',
  'defaultmuted',
  'defaultselected',
  'defer',
  'disabled',
  'enabled',
  'formnovalidate',
  'hidden',
  'indeterminate',
  'inert',
  'ismap',
  'itemscope',
  'loop',
  'multiple',
  'muted',
  'nohref',
  'nomodule',
  'noresize',
  'noshade',
  'novalidate',
  'nowrap',
  'open',
  'pauseonexit',
  'readonly',
  'required',
  'reversed',
  'scoped',
  'seamless',
  'selected',
  'sortable',
  'truespeed',
  'typemustmatch',
  'visible',
]);
/*@__PURE__*/ const STRUCTURE_ELEMENTS = new Set([
  'html',
  'body',
  'head',
  'iframe',
  'meta',
  'link',
  'base',
  'title',
  'script',
  'style',
]);

class MockNode {
  constructor(ownerDocument, nodeType, nodeName, nodeValue) {
    this.ownerDocument = ownerDocument;
    this.nodeType = nodeType;
    this.nodeName = nodeName;
    this._nodeValue = nodeValue;
    this.parentNode = null;
    this.childNodes = [];
  }
  appendChild(newNode) {
    if (newNode.nodeType === 11 /* NODE_TYPES.DOCUMENT_FRAGMENT_NODE */) {
      const nodes = newNode.childNodes.slice();
      for (const child of nodes) {
        this.appendChild(child);
      }
    }
    else {
      newNode.remove();
      newNode.parentNode = this;
      this.childNodes.push(newNode);
      connectNode(this.ownerDocument, newNode);
    }
    return newNode;
  }
  append(...items) {
    items.forEach((item) => {
      const isNode = typeof item === 'object' && item !== null && 'nodeType' in item;
      this.appendChild(isNode ? item : this.ownerDocument.createTextNode(String(item)));
    });
  }
  prepend(...items) {
    const firstChild = this.firstChild;
    items.forEach((item) => {
      const isNode = typeof item === 'object' && item !== null && 'nodeType' in item;
      if (firstChild) {
        this.insertBefore(isNode ? item : this.ownerDocument.createTextNode(String(item)), firstChild);
      }
    });
  }
  cloneNode(deep) {
    throw new Error(`invalid node type to clone: ${this.nodeType}, deep: ${deep}`);
  }
  compareDocumentPosition(_other) {
    // unimplemented
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
    return -1;
  }
  get firstChild() {
    return this.childNodes[0] || null;
  }
  insertBefore(newNode, referenceNode) {
    if (newNode.nodeType === 11 /* NODE_TYPES.DOCUMENT_FRAGMENT_NODE */) {
      for (let i = 0, ii = newNode.childNodes.length; i < ii; i++) {
        insertBefore(this, newNode.childNodes[i], referenceNode);
      }
    }
    else {
      insertBefore(this, newNode, referenceNode);
    }
    return newNode;
  }
  get isConnected() {
    let node = this;
    while (node != null) {
      if (node.nodeType === 9 /* NODE_TYPES.DOCUMENT_NODE */) {
        return true;
      }
      node = node.parentNode;
      if (node != null && node.nodeType === 11 /* NODE_TYPES.DOCUMENT_FRAGMENT_NODE */) {
        node = node.host;
      }
    }
    return false;
  }
  isSameNode(node) {
    return this === node;
  }
  get lastChild() {
    return this.childNodes[this.childNodes.length - 1] || null;
  }
  get nextSibling() {
    if (this.parentNode != null) {
      const index = this.parentNode.childNodes.indexOf(this) + 1;
      return this.parentNode.childNodes[index] || null;
    }
    return null;
  }
  get nodeValue() {
    var _a;
    return (_a = this._nodeValue) !== null && _a !== void 0 ? _a : '';
  }
  set nodeValue(value) {
    this._nodeValue = value;
  }
  get parentElement() {
    return this.parentNode || null;
  }
  set parentElement(value) {
    this.parentNode = value;
  }
  get previousSibling() {
    if (this.parentNode != null) {
      const index = this.parentNode.childNodes.indexOf(this) - 1;
      return this.parentNode.childNodes[index] || null;
    }
    return null;
  }
  contains(otherNode) {
    if (otherNode === this) {
      return true;
    }
    const childNodes = Array.from(this.childNodes);
    if (childNodes.includes(otherNode)) {
      return true;
    }
    return childNodes.some((node) => this.contains.bind(node)(otherNode));
  }
  removeChild(childNode) {
    const index = this.childNodes.indexOf(childNode);
    if (index > -1) {
      this.childNodes.splice(index, 1);
      if (this.nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */) {
        const wasConnected = this.isConnected;
        childNode.parentNode = null;
        if (wasConnected === true) {
          disconnectNode(childNode);
        }
      }
      else {
        childNode.parentNode = null;
      }
    }
    else {
      throw new Error(`node not found within childNodes during removeChild`);
    }
    return childNode;
  }
  remove() {
    if (this.parentNode != null) {
      this.parentNode.removeChild(this);
    }
  }
  replaceChild(newChild, oldChild) {
    if (oldChild.parentNode === this) {
      this.insertBefore(newChild, oldChild);
      oldChild.remove();
      return newChild;
    }
    return null;
  }
  get textContent() {
    var _a;
    return (_a = this._nodeValue) !== null && _a !== void 0 ? _a : '';
  }
  set textContent(value) {
    this._nodeValue = String(value);
  }
}
MockNode.ELEMENT_NODE = 1;
MockNode.TEXT_NODE = 3;
MockNode.PROCESSING_INSTRUCTION_NODE = 7;
MockNode.COMMENT_NODE = 8;
MockNode.DOCUMENT_NODE = 9;
MockNode.DOCUMENT_TYPE_NODE = 10;
MockNode.DOCUMENT_FRAGMENT_NODE = 11;
class MockNodeList {
  constructor(ownerDocument, childNodes, length) {
    this.ownerDocument = ownerDocument;
    this.childNodes = childNodes;
    this.length = length;
  }
}
class MockElement extends MockNode {
  constructor(ownerDocument, nodeName) {
    super(ownerDocument, 1 /* NODE_TYPES.ELEMENT_NODE */, typeof nodeName === 'string' ? nodeName : null, null);
    this.namespaceURI = null;
    this.__shadowRoot = null;
    this.__attributeMap = null;
  }
  addEventListener(type, handler) {
    addEventListener(this, type, handler);
  }
  attachShadow(_opts) {
    const shadowRoot = this.ownerDocument.createDocumentFragment();
    this.shadowRoot = shadowRoot;
    return shadowRoot;
  }
  blur() {
    dispatchEvent(this, new MockFocusEvent('blur', { relatedTarget: null, bubbles: true, cancelable: true, composed: true }));
  }
  get shadowRoot() {
    return this.__shadowRoot || null;
  }
  set shadowRoot(shadowRoot) {
    if (shadowRoot != null) {
      shadowRoot.host = this;
      this.__shadowRoot = shadowRoot;
    }
    else {
      delete this.__shadowRoot;
    }
  }
  get attributes() {
    if (this.__attributeMap == null) {
      const attrMap = createAttributeProxy(false);
      this.__attributeMap = attrMap;
      return attrMap;
    }
    return this.__attributeMap;
  }
  set attributes(attrs) {
    this.__attributeMap = attrs;
  }
  get children() {
    return this.childNodes.filter((n) => n.nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */);
  }
  get childElementCount() {
    return this.childNodes.filter((n) => n.nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */).length;
  }
  get className() {
    return this.getAttributeNS(null, 'class') || '';
  }
  set className(value) {
    this.setAttributeNS(null, 'class', value);
  }
  get classList() {
    return new MockClassList(this);
  }
  click() {
    dispatchEvent(this, new MockEvent('click', { bubbles: true, cancelable: true, composed: true }));
  }
  cloneNode(_deep) {
    // implemented on MockElement.prototype from within element.ts
    // @ts-ignore - implemented on MockElement.prototype from within element.ts
    return null;
  }
  closest(selector) {
    let elm = this;
    while (elm != null) {
      if (elm.matches(selector)) {
        return elm;
      }
      elm = elm.parentNode;
    }
    return null;
  }
  get dataset() {
    return dataset(this);
  }
  get dir() {
    return this.getAttributeNS(null, 'dir') || '';
  }
  set dir(value) {
    this.setAttributeNS(null, 'dir', value);
  }
  dispatchEvent(ev) {
    return dispatchEvent(this, ev);
  }
  get firstElementChild() {
    return this.children[0] || null;
  }
  focus(_options) {
    dispatchEvent(this, new MockFocusEvent('focus', { relatedTarget: null, bubbles: true, cancelable: true, composed: true }));
  }
  getAttribute(attrName) {
    if (attrName === 'style') {
      if (this.__style != null && this.__style.length > 0) {
        return this.style.cssText;
      }
      return null;
    }
    const attr = this.attributes.getNamedItem(attrName);
    if (attr != null) {
      return attr.value;
    }
    return null;
  }
  getAttributeNS(namespaceURI, attrName) {
    const attr = this.attributes.getNamedItemNS(namespaceURI, attrName);
    if (attr != null) {
      return attr.value;
    }
    return null;
  }
  getBoundingClientRect() {
    return { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0 };
  }
  getRootNode(opts) {
    const isComposed = opts != null && opts.composed === true;
    let node = this;
    while (node.parentNode != null) {
      node = node.parentNode;
      if (isComposed === true && node.parentNode == null && node.host != null) {
        node = node.host;
      }
    }
    return node;
  }
  get draggable() {
    return this.getAttributeNS(null, 'draggable') === 'true';
  }
  set draggable(value) {
    this.setAttributeNS(null, 'draggable', value);
  }
  hasChildNodes() {
    return this.childNodes.length > 0;
  }
  get id() {
    return this.getAttributeNS(null, 'id') || '';
  }
  set id(value) {
    this.setAttributeNS(null, 'id', value);
  }
  get innerHTML() {
    if (this.childNodes.length === 0) {
      return '';
    }
    return serializeNodeToHtml(this, {
      newLines: false,
      indentSpaces: 0,
    });
  }
  set innerHTML(html) {
    var _a;
    if (NON_ESCAPABLE_CONTENT.has((_a = this.nodeName) !== null && _a !== void 0 ? _a : '') === true) {
      setTextContent(this, html);
    }
    else {
      for (let i = this.childNodes.length - 1; i >= 0; i--) {
        this.removeChild(this.childNodes[i]);
      }
      if (typeof html === 'string') {
        const frag = parseFragmentUtil(this.ownerDocument, html);
        while (frag.childNodes.length > 0) {
          this.appendChild(frag.childNodes[0]);
        }
      }
    }
  }
  get innerText() {
    const text = [];
    getTextContent(this.childNodes, text);
    return text.join('');
  }
  set innerText(value) {
    setTextContent(this, value);
  }
  insertAdjacentElement(position, elm) {
    if (position === 'beforebegin') {
      insertBefore(this.parentNode, elm, this);
    }
    else if (position === 'afterbegin') {
      this.prepend(elm);
    }
    else if (position === 'beforeend') {
      this.appendChild(elm);
    }
    else if (position === 'afterend') {
      insertBefore(this.parentNode, elm, this.nextSibling);
    }
    return elm;
  }
  insertAdjacentHTML(position, html) {
    const frag = parseFragmentUtil(this.ownerDocument, html);
    if (position === 'beforebegin') {
      while (frag.childNodes.length > 0) {
        insertBefore(this.parentNode, frag.childNodes[0], this);
      }
    }
    else if (position === 'afterbegin') {
      while (frag.childNodes.length > 0) {
        this.prepend(frag.childNodes[frag.childNodes.length - 1]);
      }
    }
    else if (position === 'beforeend') {
      while (frag.childNodes.length > 0) {
        this.appendChild(frag.childNodes[0]);
      }
    }
    else if (position === 'afterend') {
      while (frag.childNodes.length > 0) {
        insertBefore(this.parentNode, frag.childNodes[frag.childNodes.length - 1], this.nextSibling);
      }
    }
  }
  insertAdjacentText(position, text) {
    const elm = this.ownerDocument.createTextNode(text);
    if (position === 'beforebegin') {
      insertBefore(this.parentNode, elm, this);
    }
    else if (position === 'afterbegin') {
      this.prepend(elm);
    }
    else if (position === 'beforeend') {
      this.appendChild(elm);
    }
    else if (position === 'afterend') {
      insertBefore(this.parentNode, elm, this.nextSibling);
    }
  }
  hasAttribute(attrName) {
    if (attrName === 'style') {
      return this.__style != null && this.__style.length > 0;
    }
    return this.getAttribute(attrName) !== null;
  }
  hasAttributeNS(namespaceURI, name) {
    return this.getAttributeNS(namespaceURI, name) !== null;
  }
  get hidden() {
    return this.hasAttributeNS(null, 'hidden');
  }
  set hidden(isHidden) {
    if (isHidden === true) {
      this.setAttributeNS(null, 'hidden', '');
    }
    else {
      this.removeAttributeNS(null, 'hidden');
    }
  }
  get lang() {
    return this.getAttributeNS(null, 'lang') || '';
  }
  set lang(value) {
    this.setAttributeNS(null, 'lang', value);
  }
  get lastElementChild() {
    const children = this.children;
    return children[children.length - 1] || null;
  }
  matches(selector) {
    return matches(selector, this);
  }
  get nextElementSibling() {
    const parentElement = this.parentElement;
    if (parentElement != null &&
      (parentElement.nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */ ||
        parentElement.nodeType === 11 /* NODE_TYPES.DOCUMENT_FRAGMENT_NODE */ ||
        parentElement.nodeType === 9 /* NODE_TYPES.DOCUMENT_NODE */)) {
      const children = parentElement.children;
      const index = children.indexOf(this) + 1;
      return parentElement.children[index] || null;
    }
    return null;
  }
  get outerHTML() {
    return serializeNodeToHtml(this, {
      newLines: false,
      outerHtml: true,
      indentSpaces: 0,
    });
  }
  get previousElementSibling() {
    const parentElement = this.parentElement;
    if (parentElement != null &&
      (parentElement.nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */ ||
        parentElement.nodeType === 11 /* NODE_TYPES.DOCUMENT_FRAGMENT_NODE */ ||
        parentElement.nodeType === 9 /* NODE_TYPES.DOCUMENT_NODE */)) {
      const children = parentElement.children;
      const index = children.indexOf(this) - 1;
      return parentElement.children[index] || null;
    }
    return null;
  }
  getElementsByClassName(classNames) {
    const classes = classNames
      .trim()
      .split(' ')
      .filter((c) => c.length > 0);
    const results = [];
    getElementsByClassName(this, classes, results);
    return results;
  }
  getElementsByTagName(tagName) {
    const results = [];
    getElementsByTagName(this, tagName.toLowerCase(), results);
    return results;
  }
  querySelector(selector) {
    return selectOne(selector, this);
  }
  querySelectorAll(selector) {
    return selectAll(selector, this);
  }
  removeAttribute(attrName) {
    if (attrName === 'style') {
      delete this.__style;
    }
    else {
      const attr = this.attributes.getNamedItem(attrName);
      if (attr != null) {
        this.attributes.removeNamedItemNS(attr);
        if (checkAttributeChanged(this) === true) {
          attributeChanged(this, attrName, attr.value, null);
        }
      }
    }
  }
  removeAttributeNS(namespaceURI, attrName) {
    const attr = this.attributes.getNamedItemNS(namespaceURI, attrName);
    if (attr != null) {
      this.attributes.removeNamedItemNS(attr);
      if (checkAttributeChanged(this) === true) {
        attributeChanged(this, attrName, attr.value, null);
      }
    }
  }
  removeEventListener(type, handler) {
    removeEventListener(this, type, handler);
  }
  setAttribute(attrName, value) {
    if (attrName === 'style') {
      this.style = value;
    }
    else {
      const attributes = this.attributes;
      let attr = attributes.getNamedItem(attrName);
      const checkAttrChanged = checkAttributeChanged(this);
      if (attr != null) {
        if (checkAttrChanged === true) {
          const oldValue = attr.value;
          attr.value = value;
          if (oldValue !== attr.value) {
            attributeChanged(this, attr.name, oldValue, attr.value);
          }
        }
        else {
          attr.value = value;
        }
      }
      else {
        if (attributes.caseInsensitive) {
          attrName = attrName.toLowerCase();
        }
        attr = new MockAttr(attrName, value);
        attributes.__items.push(attr);
        if (checkAttrChanged === true) {
          attributeChanged(this, attrName, null, attr.value);
        }
      }
    }
  }
  setAttributeNS(namespaceURI, attrName, value) {
    const attributes = this.attributes;
    let attr = attributes.getNamedItemNS(namespaceURI, attrName);
    const checkAttrChanged = checkAttributeChanged(this);
    if (attr != null) {
      if (checkAttrChanged === true) {
        const oldValue = attr.value;
        attr.value = value;
        if (oldValue !== attr.value) {
          attributeChanged(this, attr.name, oldValue, attr.value);
        }
      }
      else {
        attr.value = value;
      }
    }
    else {
      attr = new MockAttr(attrName, value, namespaceURI);
      attributes.__items.push(attr);
      if (checkAttrChanged === true) {
        attributeChanged(this, attrName, null, attr.value);
      }
    }
  }
  get style() {
    if (this.__style == null) {
      this.__style = createCSSStyleDeclaration();
    }
    return this.__style;
  }
  set style(val) {
    if (typeof val === 'string') {
      if (this.__style == null) {
        this.__style = createCSSStyleDeclaration();
      }
      this.__style.cssText = val;
    }
    else {
      this.__style = val;
    }
  }
  get tabIndex() {
    return parseInt(this.getAttributeNS(null, 'tabindex') || '-1', 10);
  }
  set tabIndex(value) {
    this.setAttributeNS(null, 'tabindex', value);
  }
  get tagName() {
    var _a;
    return (_a = this.nodeName) !== null && _a !== void 0 ? _a : '';
  }
  set tagName(value) {
    this.nodeName = value;
  }
  get textContent() {
    const text = [];
    getTextContent(this.childNodes, text);
    return text.join('');
  }
  set textContent(value) {
    setTextContent(this, value);
  }
  get title() {
    return this.getAttributeNS(null, 'title') || '';
  }
  set title(value) {
    this.setAttributeNS(null, 'title', value);
  }
  animate() {
    /**/
  }
  onanimationstart() {
    /**/
  }
  onanimationend() {
    /**/
  }
  onanimationiteration() {
    /**/
  }
  onabort() {
    /**/
  }
  onauxclick() {
    /**/
  }
  onbeforecopy() {
    /**/
  }
  onbeforecut() {
    /**/
  }
  onbeforepaste() {
    /**/
  }
  onblur() {
    /**/
  }
  oncancel() {
    /**/
  }
  oncanplay() {
    /**/
  }
  oncanplaythrough() {
    /**/
  }
  onchange() {
    /**/
  }
  onclick() {
    /**/
  }
  onclose() {
    /**/
  }
  oncontextmenu() {
    /**/
  }
  oncopy() {
    /**/
  }
  oncuechange() {
    /**/
  }
  oncut() {
    /**/
  }
  ondblclick() {
    /**/
  }
  ondrag() {
    /**/
  }
  ondragend() {
    /**/
  }
  ondragenter() {
    /**/
  }
  ondragleave() {
    /**/
  }
  ondragover() {
    /**/
  }
  ondragstart() {
    /**/
  }
  ondrop() {
    /**/
  }
  ondurationchange() {
    /**/
  }
  onemptied() {
    /**/
  }
  onended() {
    /**/
  }
  onerror() {
    /**/
  }
  onfocus() {
    /**/
  }
  onfocusin() {
    /**/
  }
  onfocusout() {
    /**/
  }
  onformdata() {
    /**/
  }
  onfullscreenchange() {
    /**/
  }
  onfullscreenerror() {
    /**/
  }
  ongotpointercapture() {
    /**/
  }
  oninput() {
    /**/
  }
  oninvalid() {
    /**/
  }
  onkeydown() {
    /**/
  }
  onkeypress() {
    /**/
  }
  onkeyup() {
    /**/
  }
  onload() {
    /**/
  }
  onloadeddata() {
    /**/
  }
  onloadedmetadata() {
    /**/
  }
  onloadstart() {
    /**/
  }
  onlostpointercapture() {
    /**/
  }
  onmousedown() {
    /**/
  }
  onmouseenter() {
    /**/
  }
  onmouseleave() {
    /**/
  }
  onmousemove() {
    /**/
  }
  onmouseout() {
    /**/
  }
  onmouseover() {
    /**/
  }
  onmouseup() {
    /**/
  }
  onmousewheel() {
    /**/
  }
  onpaste() {
    /**/
  }
  onpause() {
    /**/
  }
  onplay() {
    /**/
  }
  onplaying() {
    /**/
  }
  onpointercancel() {
    /**/
  }
  onpointerdown() {
    /**/
  }
  onpointerenter() {
    /**/
  }
  onpointerleave() {
    /**/
  }
  onpointermove() {
    /**/
  }
  onpointerout() {
    /**/
  }
  onpointerover() {
    /**/
  }
  onpointerup() {
    /**/
  }
  onprogress() {
    /**/
  }
  onratechange() {
    /**/
  }
  onreset() {
    /**/
  }
  onresize() {
    /**/
  }
  onscroll() {
    /**/
  }
  onsearch() {
    /**/
  }
  onseeked() {
    /**/
  }
  onseeking() {
    /**/
  }
  onselect() {
    /**/
  }
  onselectstart() {
    /**/
  }
  onstalled() {
    /**/
  }
  onsubmit() {
    /**/
  }
  onsuspend() {
    /**/
  }
  ontimeupdate() {
    /**/
  }
  ontoggle() {
    /**/
  }
  onvolumechange() {
    /**/
  }
  onwaiting() {
    /**/
  }
  onwebkitfullscreenchange() {
    /**/
  }
  onwebkitfullscreenerror() {
    /**/
  }
  onwheel() {
    /**/
  }
  requestFullscreen() {
    /**/
  }
  scrollBy() {
    /**/
  }
  scrollTo() {
    /**/
  }
  scrollIntoView() {
    /**/
  }
  toString(opts) {
    return serializeNodeToHtml(this, opts);
  }
}
function getElementsByClassName(elm, classNames, foundElms) {
  const children = elm.children;
  for (let i = 0, ii = children.length; i < ii; i++) {
    const childElm = children[i];
    for (let j = 0, jj = classNames.length; j < jj; j++) {
      if (childElm.classList.contains(classNames[j])) {
        foundElms.push(childElm);
      }
    }
    getElementsByClassName(childElm, classNames, foundElms);
  }
}
function getElementsByTagName(elm, tagName, foundElms) {
  var _a;
  const children = elm.children;
  for (let i = 0, ii = children.length; i < ii; i++) {
    const childElm = children[i];
    if (tagName === '*' || ((_a = childElm.nodeName) !== null && _a !== void 0 ? _a : '').toLowerCase() === tagName) {
      foundElms.push(childElm);
    }
    getElementsByTagName(childElm, tagName, foundElms);
  }
}
function resetElement(elm) {
  resetEventListeners(elm);
  delete elm.__attributeMap;
  delete elm.__shadowRoot;
  delete elm.__style;
}
function insertBefore(parentNode, newNode, referenceNode) {
  if (newNode !== referenceNode) {
    newNode.remove();
    newNode.parentNode = parentNode;
    newNode.ownerDocument = parentNode.ownerDocument;
    if (referenceNode != null) {
      const index = parentNode.childNodes.indexOf(referenceNode);
      if (index > -1) {
        parentNode.childNodes.splice(index, 0, newNode);
      }
      else {
        throw new Error(`referenceNode not found in parentNode.childNodes`);
      }
    }
    else {
      parentNode.childNodes.push(newNode);
    }
    connectNode(parentNode.ownerDocument, newNode);
  }
  return newNode;
}
class MockHTMLElement extends MockElement {
  constructor(ownerDocument, nodeName) {
    super(ownerDocument, typeof nodeName === 'string' ? nodeName.toUpperCase() : null);
    this.namespaceURI = 'http://www.w3.org/1999/xhtml';
  }
  get tagName() {
    var _a;
    return (_a = this.nodeName) !== null && _a !== void 0 ? _a : '';
  }
  set tagName(value) {
    this.nodeName = value;
  }
  get attributes() {
    if (this.__attributeMap == null) {
      const attrMap = createAttributeProxy(true);
      this.__attributeMap = attrMap;
      return attrMap;
    }
    return this.__attributeMap;
  }
  set attributes(attrs) {
    this.__attributeMap = attrs;
  }
}
class MockTextNode extends MockNode {
  constructor(ownerDocument, text) {
    super(ownerDocument, 3 /* NODE_TYPES.TEXT_NODE */, "#text" /* NODE_NAMES.TEXT_NODE */, text);
  }
  cloneNode(_deep) {
    return new MockTextNode(null, this.nodeValue);
  }
  get textContent() {
    return this.nodeValue;
  }
  set textContent(text) {
    this.nodeValue = text;
  }
  get data() {
    return this.nodeValue;
  }
  set data(text) {
    this.nodeValue = text;
  }
  get wholeText() {
    if (this.parentNode != null) {
      const text = [];
      for (let i = 0, ii = this.parentNode.childNodes.length; i < ii; i++) {
        const childNode = this.parentNode.childNodes[i];
        if (childNode.nodeType === 3 /* NODE_TYPES.TEXT_NODE */) {
          text.push(childNode.nodeValue);
        }
      }
      return text.join('');
    }
    return this.nodeValue;
  }
}
function getTextContent(childNodes, text) {
  for (let i = 0, ii = childNodes.length; i < ii; i++) {
    const childNode = childNodes[i];
    if (childNode.nodeType === 3 /* NODE_TYPES.TEXT_NODE */) {
      text.push(childNode.nodeValue);
    }
    else if (childNode.nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */) {
      getTextContent(childNode.childNodes, text);
    }
  }
}
function setTextContent(elm, text) {
  for (let i = elm.childNodes.length - 1; i >= 0; i--) {
    elm.removeChild(elm.childNodes[i]);
  }
  const textNode = new MockTextNode(elm.ownerDocument, text);
  elm.appendChild(textNode);
}

class MockComment extends MockNode {
  constructor(ownerDocument, data) {
    super(ownerDocument, 8 /* NODE_TYPES.COMMENT_NODE */, "#comment" /* NODE_NAMES.COMMENT_NODE */, data);
  }
  cloneNode(_deep) {
    return new MockComment(null, this.nodeValue);
  }
  get textContent() {
    return this.nodeValue;
  }
  set textContent(text) {
    this.nodeValue = text;
  }
}

class MockDocumentFragment extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, null);
    this.nodeName = "#document-fragment" /* NODE_NAMES.DOCUMENT_FRAGMENT_NODE */;
    this.nodeType = 11 /* NODE_TYPES.DOCUMENT_FRAGMENT_NODE */;
  }
  getElementById(id) {
    return getElementById(this, id);
  }
  cloneNode(deep) {
    const cloned = new MockDocumentFragment(null);
    if (deep) {
      for (let i = 0, ii = this.childNodes.length; i < ii; i++) {
        const childNode = this.childNodes[i];
        if (childNode.nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */ ||
          childNode.nodeType === 3 /* NODE_TYPES.TEXT_NODE */ ||
          childNode.nodeType === 8 /* NODE_TYPES.COMMENT_NODE */) {
          const clonedChildNode = this.childNodes[i].cloneNode(true);
          cloned.appendChild(clonedChildNode);
        }
      }
    }
    return cloned;
  }
}

class MockDocumentTypeNode extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, '!DOCTYPE');
    this.nodeType = 10 /* NODE_TYPES.DOCUMENT_TYPE_NODE */;
    this.setAttribute('html', '');
  }
}

class MockCSSRule {
  constructor(parentStyleSheet) {
    this.parentStyleSheet = parentStyleSheet;
    this.cssText = '';
    this.type = 0;
  }
}
class MockCSSStyleSheet {
  constructor(ownerNode) {
    this.type = 'text/css';
    this.parentStyleSheet = null;
    this.cssRules = [];
    this.ownerNode = ownerNode;
  }
  get rules() {
    return this.cssRules;
  }
  set rules(rules) {
    this.cssRules = rules;
  }
  deleteRule(index) {
    if (index >= 0 && index < this.cssRules.length) {
      this.cssRules.splice(index, 1);
      updateStyleTextNode(this.ownerNode);
    }
  }
  insertRule(rule, index = 0) {
    if (typeof index !== 'number') {
      index = 0;
    }
    if (index < 0) {
      index = 0;
    }
    if (index > this.cssRules.length) {
      index = this.cssRules.length;
    }
    const cssRule = new MockCSSRule(this);
    cssRule.cssText = rule;
    this.cssRules.splice(index, 0, cssRule);
    updateStyleTextNode(this.ownerNode);
    return index;
  }
}
function getStyleElementText(styleElm) {
  const output = [];
  for (let i = 0; i < styleElm.childNodes.length; i++) {
    output.push(styleElm.childNodes[i].nodeValue);
  }
  return output.join('');
}
function setStyleElementText(styleElm, text) {
  // keeping the innerHTML and the sheet.cssRules connected
  // is not technically correct, but since we're doing
  // SSR we'll need to turn any assigned cssRules into
  // real text, not just properties that aren't rendered
  const sheet = styleElm.sheet;
  sheet.cssRules.length = 0;
  sheet.insertRule(text);
  updateStyleTextNode(styleElm);
}
function updateStyleTextNode(styleElm) {
  const childNodeLen = styleElm.childNodes.length;
  if (childNodeLen > 1) {
    for (let i = childNodeLen - 1; i >= 1; i--) {
      styleElm.removeChild(styleElm.childNodes[i]);
    }
  }
  else if (childNodeLen < 1) {
    styleElm.appendChild(styleElm.ownerDocument.createTextNode(''));
  }
  const textNode = styleElm.childNodes[0];
  textNode.nodeValue = styleElm.sheet.cssRules.map((r) => r.cssText).join('\n');
}

function createElement(ownerDocument, tagName) {
  if (typeof tagName !== 'string' || tagName === '' || !/^[a-z0-9-_:]+$/i.test(tagName)) {
    throw new Error(`The tag name provided (${tagName}) is not a valid name.`);
  }
  tagName = tagName.toLowerCase();
  switch (tagName) {
    case 'a':
      return new MockAnchorElement(ownerDocument);
    case 'base':
      return new MockBaseElement(ownerDocument);
    case 'button':
      return new MockButtonElement(ownerDocument);
    case 'canvas':
      return new MockCanvasElement(ownerDocument);
    case 'form':
      return new MockFormElement(ownerDocument);
    case 'img':
      return new MockImageElement(ownerDocument);
    case 'input':
      return new MockInputElement(ownerDocument);
    case 'link':
      return new MockLinkElement(ownerDocument);
    case 'meta':
      return new MockMetaElement(ownerDocument);
    case 'script':
      return new MockScriptElement(ownerDocument);
    case 'style':
      return new MockStyleElement(ownerDocument);
    case 'template':
      return new MockTemplateElement(ownerDocument);
    case 'title':
      return new MockTitleElement(ownerDocument);
  }
  if (ownerDocument != null && tagName.includes('-')) {
    const win = ownerDocument.defaultView;
    if (win != null && win.customElements != null) {
      return createCustomElement(win.customElements, ownerDocument, tagName);
    }
  }
  return new MockHTMLElement(ownerDocument, tagName);
}
function createElementNS(ownerDocument, namespaceURI, tagName) {
  if (namespaceURI === 'http://www.w3.org/1999/xhtml') {
    return createElement(ownerDocument, tagName);
  }
  else if (namespaceURI === 'http://www.w3.org/2000/svg') {
    switch (tagName.toLowerCase()) {
      case 'text':
      case 'tspan':
      case 'tref':
      case 'altglyph':
      case 'textpath':
        return new MockSVGTextContentElement(ownerDocument, tagName);
      case 'circle':
      case 'ellipse':
      case 'image':
      case 'line':
      case 'path':
      case 'polygon':
      case 'polyline':
      case 'rect':
      case 'use':
        return new MockSVGGraphicsElement(ownerDocument, tagName);
      case 'svg':
        return new MockSVGSVGElement(ownerDocument, tagName);
      default:
        return new MockSVGElement(ownerDocument, tagName);
    }
  }
  else {
    return new MockElement(ownerDocument, tagName);
  }
}
class MockAnchorElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'a');
  }
  get href() {
    return fullUrl(this, 'href');
  }
  set href(value) {
    this.setAttribute('href', value);
  }
  get pathname() {
    return new URL(this.href).pathname;
  }
}
class MockButtonElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'button');
  }
}
patchPropAttributes(MockButtonElement.prototype, {
  type: String,
}, {
  type: 'submit',
});
class MockImageElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'img');
  }
  get draggable() {
    return this.getAttributeNS(null, 'draggable') !== 'false';
  }
  set draggable(value) {
    this.setAttributeNS(null, 'draggable', value);
  }
  get src() {
    return fullUrl(this, 'src');
  }
  set src(value) {
    this.setAttribute('src', value);
  }
}
patchPropAttributes(MockImageElement.prototype, {
  height: Number,
  width: Number,
});
class MockInputElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'input');
  }
  get list() {
    const listId = this.getAttribute('list');
    if (listId) {
      return this.ownerDocument.getElementById(listId);
    }
    return null;
  }
}
patchPropAttributes(MockInputElement.prototype, {
  accept: String,
  autocomplete: String,
  autofocus: Boolean,
  capture: String,
  checked: Boolean,
  disabled: Boolean,
  form: String,
  formaction: String,
  formenctype: String,
  formmethod: String,
  formnovalidate: String,
  formtarget: String,
  height: Number,
  inputmode: String,
  max: String,
  maxLength: Number,
  min: String,
  minLength: Number,
  multiple: Boolean,
  name: String,
  pattern: String,
  placeholder: String,
  required: Boolean,
  readOnly: Boolean,
  size: Number,
  spellCheck: Boolean,
  src: String,
  step: String,
  type: String,
  value: String,
  width: Number,
}, {
  type: 'text',
});
class MockFormElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'form');
  }
}
patchPropAttributes(MockFormElement.prototype, {
  name: String,
});
class MockLinkElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'link');
  }
  get href() {
    return fullUrl(this, 'href');
  }
  set href(value) {
    this.setAttribute('href', value);
  }
}
patchPropAttributes(MockLinkElement.prototype, {
  crossorigin: String,
  media: String,
  rel: String,
  type: String,
});
class MockMetaElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'meta');
  }
}
patchPropAttributes(MockMetaElement.prototype, {
  charset: String,
  content: String,
  name: String,
});
class MockScriptElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'script');
  }
  get src() {
    return fullUrl(this, 'src');
  }
  set src(value) {
    this.setAttribute('src', value);
  }
}
patchPropAttributes(MockScriptElement.prototype, {
  type: String,
});
class MockDOMMatrix {
  constructor() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
    this.m11 = 1;
    this.m12 = 0;
    this.m13 = 0;
    this.m14 = 0;
    this.m21 = 0;
    this.m22 = 1;
    this.m23 = 0;
    this.m24 = 0;
    this.m31 = 0;
    this.m32 = 0;
    this.m33 = 1;
    this.m34 = 0;
    this.m41 = 0;
    this.m42 = 0;
    this.m43 = 0;
    this.m44 = 1;
    this.is2D = true;
    this.isIdentity = true;
  }
  static fromMatrix() {
    return new MockDOMMatrix();
  }
  inverse() {
    return new MockDOMMatrix();
  }
  flipX() {
    return new MockDOMMatrix();
  }
  flipY() {
    return new MockDOMMatrix();
  }
  multiply() {
    return new MockDOMMatrix();
  }
  rotate() {
    return new MockDOMMatrix();
  }
  rotateAxisAngle() {
    return new MockDOMMatrix();
  }
  rotateFromVector() {
    return new MockDOMMatrix();
  }
  scale() {
    return new MockDOMMatrix();
  }
  scaleNonUniform() {
    return new MockDOMMatrix();
  }
  skewX() {
    return new MockDOMMatrix();
  }
  skewY() {
    return new MockDOMMatrix();
  }
  toJSON() { }
  toString() { }
  transformPoint() {
    return new MockDOMPoint();
  }
  translate() {
    return new MockDOMMatrix();
  }
}
class MockDOMPoint {
  constructor() {
    this.w = 1;
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
  toJSON() { }
  matrixTransform() {
    return new MockDOMMatrix();
  }
}
class MockSVGRect {
  constructor() {
    this.height = 10;
    this.width = 10;
    this.x = 0;
    this.y = 0;
  }
}
class MockStyleElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'style');
    this.sheet = new MockCSSStyleSheet(this);
  }
  get innerHTML() {
    return getStyleElementText(this);
  }
  set innerHTML(value) {
    setStyleElementText(this, value);
  }
  get innerText() {
    return getStyleElementText(this);
  }
  set innerText(value) {
    setStyleElementText(this, value);
  }
  get textContent() {
    return getStyleElementText(this);
  }
  set textContent(value) {
    setStyleElementText(this, value);
  }
}
class MockSVGElement extends MockElement {
  // SVGElement properties and methods
  get ownerSVGElement() {
    return null;
  }
  get viewportElement() {
    return null;
  }
  onunload() {
    /**/
  }
  // SVGGeometryElement properties and methods
  get pathLength() {
    return 0;
  }
  isPointInFill(_pt) {
    return false;
  }
  isPointInStroke(_pt) {
    return false;
  }
  getTotalLength() {
    return 0;
  }
}
class MockSVGGraphicsElement extends MockSVGElement {
  getBBox(_options) {
    return new MockSVGRect();
  }
  getCTM() {
    return new MockDOMMatrix();
  }
  getScreenCTM() {
    return new MockDOMMatrix();
  }
}
class MockSVGSVGElement extends MockSVGGraphicsElement {
  createSVGPoint() {
    return new MockDOMPoint();
  }
}
class MockSVGTextContentElement extends MockSVGGraphicsElement {
  getComputedTextLength() {
    return 0;
  }
}
class MockBaseElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'base');
  }
  get href() {
    return fullUrl(this, 'href');
  }
  set href(value) {
    this.setAttribute('href', value);
  }
}
class MockTemplateElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'template');
    this.content = new MockDocumentFragment(ownerDocument);
  }
  get innerHTML() {
    return this.content.innerHTML;
  }
  set innerHTML(html) {
    this.content.innerHTML = html;
  }
  cloneNode(deep) {
    const cloned = new MockTemplateElement(null);
    cloned.attributes = cloneAttributes(this.attributes);
    const styleCssText = this.getAttribute('style');
    if (styleCssText != null && styleCssText.length > 0) {
      cloned.setAttribute('style', styleCssText);
    }
    cloned.content = this.content.cloneNode(deep);
    if (deep) {
      for (let i = 0, ii = this.childNodes.length; i < ii; i++) {
        const clonedChildNode = this.childNodes[i].cloneNode(true);
        cloned.appendChild(clonedChildNode);
      }
    }
    return cloned;
  }
}
class MockTitleElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'title');
  }
  get text() {
    return this.textContent;
  }
  set text(value) {
    this.textContent = value;
  }
}
class MockCanvasElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, 'canvas');
  }
  getContext() {
    return {
      fillRect() {
        return;
      },
      clearRect() { },
      getImageData: function (_, __, w, h) {
        return {
          data: new Array(w * h * 4),
        };
      },
      putImageData() { },
      createImageData: function () {
        return [];
      },
      setTransform() { },
      drawImage() { },
      save() { },
      fillText() { },
      restore() { },
      beginPath() { },
      moveTo() { },
      lineTo() { },
      closePath() { },
      stroke() { },
      translate() { },
      scale() { },
      rotate() { },
      arc() { },
      fill() { },
      measureText() {
        return { width: 0 };
      },
      transform() { },
      rect() { },
      clip() { },
    };
  }
}
function fullUrl(elm, attrName) {
  const val = elm.getAttribute(attrName) || '';
  if (elm.ownerDocument != null) {
    const win = elm.ownerDocument.defaultView;
    if (win != null) {
      const loc = win.location;
      if (loc != null) {
        try {
          const url = new URL(val, loc.href);
          return url.href;
        }
        catch (e) { }
      }
    }
  }
  return val.replace(/\'|\"/g, '').trim();
}
function patchPropAttributes(prototype, attrs, defaults = {}) {
  Object.keys(attrs).forEach((propName) => {
    const attr = attrs[propName];
    const defaultValue = defaults[propName];
    if (attr === Boolean) {
      Object.defineProperty(prototype, propName, {
        get() {
          return this.hasAttribute(propName);
        },
        set(value) {
          if (value) {
            this.setAttribute(propName, '');
          }
          else {
            this.removeAttribute(propName);
          }
        },
      });
    }
    else if (attr === Number) {
      Object.defineProperty(prototype, propName, {
        get() {
          const value = this.getAttribute(propName);
          return value ? parseInt(value, 10) : defaultValue === undefined ? 0 : defaultValue;
        },
        set(value) {
          this.setAttribute(propName, value);
        },
      });
    }
    else {
      Object.defineProperty(prototype, propName, {
        get() {
          return this.hasAttribute(propName) ? this.getAttribute(propName) : defaultValue || '';
        },
        set(value) {
          this.setAttribute(propName, value);
        },
      });
    }
  });
}
MockElement.prototype.cloneNode = function (deep) {
  // because we're creating elements, which extending specific HTML base classes there
  // is a MockElement circular reference that bundling has trouble dealing with so
  // the fix is to add cloneNode() to MockElement's prototype after the HTML classes
  const cloned = createElement(this.ownerDocument, this.nodeName);
  cloned.attributes = cloneAttributes(this.attributes);
  const styleCssText = this.getAttribute('style');
  if (styleCssText != null && styleCssText.length > 0) {
    cloned.setAttribute('style', styleCssText);
  }
  if (deep) {
    for (let i = 0, ii = this.childNodes.length; i < ii; i++) {
      const clonedChildNode = this.childNodes[i].cloneNode(true);
      cloned.appendChild(clonedChildNode);
    }
  }
  return cloned;
};

let sharedDocument;
function parseHtmlToDocument(html, ownerDocument = null) {
  if (ownerDocument == null) {
    if (sharedDocument == null) {
      sharedDocument = new MockDocument();
    }
    ownerDocument = sharedDocument;
  }
  return parseDocumentUtil(ownerDocument, html);
}
function parseHtmlToFragment(html, ownerDocument = null) {
  if (ownerDocument == null) {
    if (sharedDocument == null) {
      sharedDocument = new MockDocument();
    }
    ownerDocument = sharedDocument;
  }
  return parseFragmentUtil(ownerDocument, html);
}

const consoleNoop = () => {
  /**/
};
function createConsole() {
  return {
    debug: consoleNoop,
    error: consoleNoop,
    info: consoleNoop,
    log: consoleNoop,
    warn: consoleNoop,
    dir: consoleNoop,
    dirxml: consoleNoop,
    table: consoleNoop,
    trace: consoleNoop,
    group: consoleNoop,
    groupCollapsed: consoleNoop,
    groupEnd: consoleNoop,
    clear: consoleNoop,
    count: consoleNoop,
    countReset: consoleNoop,
    assert: consoleNoop,
    profile: consoleNoop,
    profileEnd: consoleNoop,
    time: consoleNoop,
    timeLog: consoleNoop,
    timeEnd: consoleNoop,
    timeStamp: consoleNoop,
    context: consoleNoop,
    memory: consoleNoop,
  };
}

class MockHeaders {
  constructor(init) {
    this._values = [];
    if (typeof init === 'object') {
      if (typeof init[Symbol.iterator] === 'function') {
        const kvs = [];
        for (const kv of init) {
          if (typeof kv[Symbol.iterator] === 'function') {
            kvs.push([...kv]);
          }
        }
        for (const kv of kvs) {
          this.append(kv[0], kv[1]);
        }
      }
      else {
        for (const key in init) {
          this.append(key, init[key]);
        }
      }
    }
  }
  append(key, value) {
    this._values.push([key, value + '']);
  }
  delete(key) {
    key = key.toLowerCase();
    for (let i = this._values.length - 1; i >= 0; i--) {
      if (this._values[i][0].toLowerCase() === key) {
        this._values.splice(i, 1);
      }
    }
  }
  entries() {
    const entries = [];
    for (const kv of this.keys()) {
      entries.push([kv, this.get(kv)]);
    }
    let index = -1;
    return {
      next() {
        index++;
        return {
          value: entries[index],
          done: !entries[index],
        };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
  forEach(cb) {
    for (const kv of this.entries()) {
      cb(kv[1], kv[0]);
    }
  }
  get(key) {
    const rtn = [];
    key = key.toLowerCase();
    for (const kv of this._values) {
      if (kv[0].toLowerCase() === key) {
        rtn.push(kv[1]);
      }
    }
    return rtn.length > 0 ? rtn.join(', ') : null;
  }
  has(key) {
    key = key.toLowerCase();
    for (const kv of this._values) {
      if (kv[0].toLowerCase() === key) {
        return true;
      }
    }
    return false;
  }
  keys() {
    const keys = [];
    for (const kv of this._values) {
      const key = kv[0].toLowerCase();
      if (!keys.includes(key)) {
        keys.push(key);
      }
    }
    let index = -1;
    return {
      next() {
        index++;
        return {
          value: keys[index],
          done: !keys[index],
        };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
  set(key, value) {
    for (const kv of this._values) {
      if (kv[0].toLowerCase() === key.toLowerCase()) {
        kv[1] = value + '';
        return;
      }
    }
    this.append(key, value);
  }
  values() {
    const values = this._values;
    let index = -1;
    return {
      next() {
        index++;
        const done = !values[index];
        return {
          value: done ? undefined : values[index][1],
          done,
        };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
  [Symbol.iterator]() {
    return this.entries();
  }
}

class MockDOMParser {
  parseFromString(htmlToParse, mimeType) {
    if (mimeType !== 'text/html') {
      console.error('XML parsing not implemented yet, continuing as html');
    }
    return parseHtmlToDocument(htmlToParse);
  }
}

class MockRequest {
  constructor(input, init = {}) {
    this._method = 'GET';
    this._url = '/';
    this.bodyUsed = false;
    this.cache = 'default';
    this.credentials = 'same-origin';
    this.integrity = '';
    this.keepalive = false;
    this.mode = 'cors';
    this.redirect = 'follow';
    this.referrer = 'about:client';
    this.referrerPolicy = '';
    if (typeof input === 'string') {
      this.url = input;
    }
    else if (input) {
      Object.assign(this, input);
      this.headers = new MockHeaders(input.headers);
    }
    Object.assign(this, init);
    if (init.headers) {
      this.headers = new MockHeaders(init.headers);
    }
    if (!this.headers) {
      this.headers = new MockHeaders();
    }
  }
  get url() {
    if (typeof this._url === 'string') {
      return new URL(this._url, location.href).href;
    }
    return new URL('/', location.href).href;
  }
  set url(value) {
    this._url = value;
  }
  get method() {
    if (typeof this._method === 'string') {
      return this._method.toUpperCase();
    }
    return 'GET';
  }
  set method(value) {
    this._method = value;
  }
  clone() {
    const clone = { ...this };
    clone.headers = new MockHeaders(this.headers);
    return new MockRequest(clone);
  }
}
class MockResponse {
  constructor(body, init = {}) {
    this.ok = true;
    this.status = 200;
    this.statusText = '';
    this.type = 'default';
    this.url = '';
    this._body = body;
    if (init) {
      Object.assign(this, init);
    }
    this.headers = new MockHeaders(init.headers);
  }
  async json() {
    return JSON.parse(this._body);
  }
  async text() {
    return this._body;
  }
  clone() {
    const initClone = { ...this };
    initClone.headers = new MockHeaders(this.headers);
    return new MockResponse(this._body, initClone);
  }
}

function setupGlobal(gbl) {
  if (gbl.window == null) {
    const win = (gbl.window = new MockWindow());
    WINDOW_FUNCTIONS.forEach((fnName) => {
      if (!(fnName in gbl)) {
        gbl[fnName] = win[fnName].bind(win);
      }
    });
    WINDOW_PROPS.forEach((propName) => {
      if (!(propName in gbl)) {
        Object.defineProperty(gbl, propName, {
          get() {
            return win[propName];
          },
          set(val) {
            win[propName] = val;
          },
          configurable: true,
          enumerable: true,
        });
      }
    });
    GLOBAL_CONSTRUCTORS.forEach(([cstrName]) => {
      gbl[cstrName] = win[cstrName];
    });
  }
  return gbl.window;
}
function teardownGlobal(gbl) {
  const win = gbl.window;
  if (win && typeof win.close === 'function') {
    win.close();
  }
}
function patchWindow(winToBePatched) {
  const mockWin = new MockWindow(false);
  WINDOW_FUNCTIONS.forEach((fnName) => {
    if (typeof winToBePatched[fnName] !== 'function') {
      winToBePatched[fnName] = mockWin[fnName].bind(mockWin);
    }
  });
  WINDOW_PROPS.forEach((propName) => {
    if (winToBePatched === undefined) {
      Object.defineProperty(winToBePatched, propName, {
        get() {
          return mockWin[propName];
        },
        set(val) {
          mockWin[propName] = val;
        },
        configurable: true,
        enumerable: true,
      });
    }
  });
}
function addGlobalsToWindowPrototype(mockWinPrototype) {
  GLOBAL_CONSTRUCTORS.forEach(([cstrName, Cstr]) => {
    Object.defineProperty(mockWinPrototype, cstrName, {
      get() {
        return this['__' + cstrName] || Cstr;
      },
      set(cstr) {
        this['__' + cstrName] = cstr;
      },
      configurable: true,
      enumerable: true,
    });
  });
}
const WINDOW_FUNCTIONS = [
  'addEventListener',
  'alert',
  'blur',
  'cancelAnimationFrame',
  'cancelIdleCallback',
  'clearInterval',
  'clearTimeout',
  'close',
  'confirm',
  'dispatchEvent',
  'focus',
  'getComputedStyle',
  'matchMedia',
  'open',
  'prompt',
  'removeEventListener',
  'requestAnimationFrame',
  'requestIdleCallback',
  'URL',
];
const WINDOW_PROPS = [
  'customElements',
  'devicePixelRatio',
  'document',
  'history',
  'innerHeight',
  'innerWidth',
  'localStorage',
  'location',
  'navigator',
  'pageXOffset',
  'pageYOffset',
  'performance',
  'screenLeft',
  'screenTop',
  'screenX',
  'screenY',
  'scrollX',
  'scrollY',
  'sessionStorage',
  'CSS',
  'CustomEvent',
  'Event',
  'Element',
  'HTMLElement',
  'Node',
  'NodeList',
  'FocusEvent',
  'KeyboardEvent',
  'MouseEvent',
];
const GLOBAL_CONSTRUCTORS = [
  ['CustomEvent', MockCustomEvent],
  ['Event', MockEvent],
  ['Headers', MockHeaders],
  ['FocusEvent', MockFocusEvent],
  ['KeyboardEvent', MockKeyboardEvent],
  ['MouseEvent', MockMouseEvent],
  ['Request', MockRequest],
  ['Response', MockResponse],
  ['DOMParser', MockDOMParser],
  ['HTMLAnchorElement', MockAnchorElement],
  ['HTMLBaseElement', MockBaseElement],
  ['HTMLButtonElement', MockButtonElement],
  ['HTMLCanvasElement', MockCanvasElement],
  ['HTMLFormElement', MockFormElement],
  ['HTMLImageElement', MockImageElement],
  ['HTMLInputElement', MockInputElement],
  ['HTMLLinkElement', MockLinkElement],
  ['HTMLMetaElement', MockMetaElement],
  ['HTMLScriptElement', MockScriptElement],
  ['HTMLStyleElement', MockStyleElement],
  ['HTMLTemplateElement', MockTemplateElement],
  ['HTMLTitleElement', MockTitleElement],
];

class MockHistory {
  constructor() {
    this.items = [];
  }
  get length() {
    return this.items.length;
  }
  back() {
    this.go(-1);
  }
  forward() {
    this.go(1);
  }
  go(_value) {
    //
  }
  pushState(_state, _title, _url) {
    //
  }
  replaceState(_state, _title, _url) {
    //
  }
}

class MockIntersectionObserver {
  constructor() {
    /**/
  }
  disconnect() {
    /**/
  }
  observe() {
    /**/
  }
  takeRecords() {
    return [];
  }
  unobserve() {
    /**/
  }
}

class MockLocation {
  constructor() {
    this.ancestorOrigins = null;
    this.protocol = '';
    this.host = '';
    this.hostname = '';
    this.port = '';
    this.pathname = '';
    this.search = '';
    this.hash = '';
    this.username = '';
    this.password = '';
    this.origin = '';
    this._href = '';
  }
  get href() {
    return this._href;
  }
  set href(value) {
    const url = new URL(value, 'http://mockdoc.stenciljs.com');
    this._href = url.href;
    this.protocol = url.protocol;
    this.host = url.host;
    this.hostname = url.hostname;
    this.port = url.port;
    this.pathname = url.pathname;
    this.search = url.search;
    this.hash = url.hash;
    this.username = url.username;
    this.password = url.password;
    this.origin = url.origin;
  }
  assign(_url) {
    //
  }
  reload(_forcedReload) {
    //
  }
  replace(_url) {
    //
  }
  toString() {
    return this.href;
  }
}

class MockNavigator {
  constructor() {
    this.appCodeName = 'MockNavigator';
    this.appName = 'MockNavigator';
    this.appVersion = 'MockNavigator';
    this.platform = 'MockNavigator';
    this.userAgent = 'MockNavigator';
  }
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Performance
 */
class MockPerformance {
  constructor() {
    this.timeOrigin = Date.now();
    this.eventCounts = new Map();
  }
  addEventListener() {
    //
  }
  clearMarks() {
    //
  }
  clearMeasures() {
    //
  }
  clearResourceTimings() {
    //
  }
  dispatchEvent() {
    return true;
  }
  getEntries() {
    return [];
  }
  getEntriesByName() {
    return [];
  }
  getEntriesByType() {
    return [];
  }
  // Stencil's implementation of `mark` is non-compliant with the `Performance` interface. Because Stencil will
  // instantiate an instance of this class and may attempt to assign it to a variable of type `Performance`, the return
  // type must match the `Performance` interface (rather than typing this function as returning `void` and ignoring the
  // associated errors returned by the type checker)
  // @ts-ignore
  mark() {
    //
  }
  // Stencil's implementation of `measure` is non-compliant with the `Performance` interface. Because Stencil will
  // instantiate an instance of this class and may attempt to assign it to a variable of type `Performance`, the return
  // type must match the `Performance` interface (rather than typing this function as returning `void` and ignoring the
  // associated errors returned by the type checker)
  // @ts-ignore
  measure() {
    //
  }
  get navigation() {
    return {};
  }
  now() {
    return Date.now() - this.timeOrigin;
  }
  get onresourcetimingbufferfull() {
    return null;
  }
  removeEventListener() {
    //
  }
  setResourceTimingBufferSize() {
    //
  }
  get timing() {
    return {};
  }
  toJSON() {
    //
  }
}
function resetPerformance(perf) {
  if (perf != null) {
    try {
      perf.timeOrigin = Date.now();
    }
    catch (e) { }
  }
}

class MockStorage {
  constructor() {
    this.items = new Map();
  }
  key(_value) {
    //
  }
  getItem(key) {
    key = String(key);
    if (this.items.has(key)) {
      return this.items.get(key);
    }
    return null;
  }
  setItem(key, value) {
    if (value == null) {
      value = 'null';
    }
    this.items.set(String(key), String(value));
  }
  removeItem(key) {
    this.items.delete(String(key));
  }
  clear() {
    this.items.clear();
  }
}

const nativeClearInterval = clearInterval;
const nativeClearTimeout = clearTimeout;
const nativeSetInterval = setInterval;
const nativeSetTimeout = setTimeout;
const nativeURL = URL;
class MockWindow {
  constructor(html = null) {
    if (html !== false) {
      this.document = new MockDocument(html, this);
    }
    else {
      this.document = null;
    }
    this.performance = new MockPerformance();
    this.customElements = new MockCustomElementRegistry(this);
    this.console = createConsole();
    resetWindowDefaults(this);
    resetWindowDimensions(this);
  }
  addEventListener(type, handler) {
    addEventListener(this, type, handler);
  }
  alert(msg) {
    if (this.console) {
      this.console.debug(msg);
    }
    else {
      console.debug(msg);
    }
  }
  blur() {
    /**/
  }
  cancelAnimationFrame(id) {
    this.__clearTimeout(id);
  }
  cancelIdleCallback(id) {
    this.__clearTimeout(id);
  }
  get CharacterData() {
    if (this.__charDataCstr == null) {
      const ownerDocument = this.document;
      this.__charDataCstr = class extends MockNode {
        constructor() {
          super(ownerDocument, 0, 'test', '');
          throw new Error('Illegal constructor: cannot construct CharacterData');
        }
      };
    }
    return this.__charDataCstr;
  }
  set CharacterData(charDataCstr) {
    this.__charDataCstr = charDataCstr;
  }
  clearInterval(id) {
    this.__clearInterval(id);
  }
  clearTimeout(id) {
    this.__clearTimeout(id);
  }
  close() {
    resetWindow(this);
  }
  confirm() {
    return false;
  }
  get CSS() {
    return {
      supports: () => true,
    };
  }
  get Document() {
    if (this.__docCstr == null) {
      const win = this;
      this.__docCstr = class extends MockDocument {
        constructor() {
          super(false, win);
          throw new Error('Illegal constructor: cannot construct Document');
        }
      };
    }
    return this.__docCstr;
  }
  set Document(docCstr) {
    this.__docCstr = docCstr;
  }
  get DocumentFragment() {
    if (this.__docFragCstr == null) {
      const ownerDocument = this.document;
      this.__docFragCstr = class extends MockDocumentFragment {
        constructor() {
          super(ownerDocument);
          throw new Error('Illegal constructor: cannot construct DocumentFragment');
        }
      };
    }
    return this.__docFragCstr;
  }
  set DocumentFragment(docFragCstr) {
    this.__docFragCstr = docFragCstr;
  }
  get DocumentType() {
    if (this.__docTypeCstr == null) {
      const ownerDocument = this.document;
      this.__docTypeCstr = class extends MockNode {
        constructor() {
          super(ownerDocument, 0, 'test', '');
          throw new Error('Illegal constructor: cannot construct DocumentType');
        }
      };
    }
    return this.__docTypeCstr;
  }
  set DocumentType(docTypeCstr) {
    this.__docTypeCstr = docTypeCstr;
  }
  get DOMTokenList() {
    if (this.__domTokenListCstr == null) {
      this.__domTokenListCstr = class MockDOMTokenList {
      };
    }
    return this.__domTokenListCstr;
  }
  set DOMTokenList(domTokenListCstr) {
    this.__domTokenListCstr = domTokenListCstr;
  }
  dispatchEvent(ev) {
    return dispatchEvent(this, ev);
  }
  get Element() {
    if (this.__elementCstr == null) {
      const ownerDocument = this.document;
      this.__elementCstr = class extends MockElement {
        constructor() {
          super(ownerDocument, '');
          throw new Error('Illegal constructor: cannot construct Element');
        }
      };
    }
    return this.__elementCstr;
  }
  fetch(input, init) {
    if (typeof fetch === 'function') {
      return fetch(input, init);
    }
    throw new Error(`fetch() not implemented`);
  }
  focus() {
    /**/
  }
  getComputedStyle(_) {
    return {
      cssText: '',
      length: 0,
      parentRule: null,
      getPropertyPriority() {
        return null;
      },
      getPropertyValue() {
        return '';
      },
      item() {
        return null;
      },
      removeProperty() {
        return null;
      },
      setProperty() {
        return null;
      },
    };
  }
  get globalThis() {
    return this;
  }
  get history() {
    if (this.__history == null) {
      this.__history = new MockHistory();
    }
    return this.__history;
  }
  set history(hsty) {
    this.__history = hsty;
  }
  get JSON() {
    return JSON;
  }
  get HTMLElement() {
    if (this.__htmlElementCstr == null) {
      const ownerDocument = this.document;
      this.__htmlElementCstr = class extends MockHTMLElement {
        constructor() {
          super(ownerDocument, '');
          const observedAttributes = this.constructor.observedAttributes;
          if (Array.isArray(observedAttributes) && typeof this.attributeChangedCallback === 'function') {
            observedAttributes.forEach((attrName) => {
              const attrValue = this.getAttribute(attrName);
              if (attrValue != null) {
                this.attributeChangedCallback(attrName, null, attrValue);
              }
            });
          }
        }
      };
    }
    return this.__htmlElementCstr;
  }
  set HTMLElement(htmlElementCstr) {
    this.__htmlElementCstr = htmlElementCstr;
  }
  get IntersectionObserver() {
    return MockIntersectionObserver;
  }
  get localStorage() {
    if (this.__localStorage == null) {
      this.__localStorage = new MockStorage();
    }
    return this.__localStorage;
  }
  set localStorage(locStorage) {
    this.__localStorage = locStorage;
  }
  get location() {
    if (this.__location == null) {
      this.__location = new MockLocation();
    }
    return this.__location;
  }
  set location(val) {
    if (typeof val === 'string') {
      if (this.__location == null) {
        this.__location = new MockLocation();
      }
      this.__location.href = val;
    }
    else {
      this.__location = val;
    }
  }
  matchMedia() {
    return {
      matches: false,
    };
  }
  get Node() {
    if (this.__nodeCstr == null) {
      const ownerDocument = this.document;
      this.__nodeCstr = class extends MockNode {
        constructor() {
          super(ownerDocument, 0, 'test', '');
          throw new Error('Illegal constructor: cannot construct Node');
        }
      };
    }
    return this.__nodeCstr;
  }
  get NodeList() {
    if (this.__nodeListCstr == null) {
      const ownerDocument = this.document;
      this.__nodeListCstr = class extends MockNodeList {
        constructor() {
          super(ownerDocument, [], 0);
          throw new Error('Illegal constructor: cannot construct NodeList');
        }
      };
    }
    return this.__nodeListCstr;
  }
  get navigator() {
    if (this.__navigator == null) {
      this.__navigator = new MockNavigator();
    }
    return this.__navigator;
  }
  set navigator(nav) {
    this.__navigator = nav;
  }
  get parent() {
    return null;
  }
  prompt() {
    return '';
  }
  open() {
    return null;
  }
  get origin() {
    return this.location.origin;
  }
  removeEventListener(type, handler) {
    removeEventListener(this, type, handler);
  }
  requestAnimationFrame(callback) {
    return this.setTimeout(() => {
      callback(Date.now());
    }, 0);
  }
  requestIdleCallback(callback) {
    return this.setTimeout(() => {
      callback({
        didTimeout: false,
        timeRemaining: () => 0,
      });
    }, 0);
  }
  scroll(_x, _y) {
    /**/
  }
  scrollBy(_x, _y) {
    /**/
  }
  scrollTo(_x, _y) {
    /**/
  }
  get self() {
    return this;
  }
  get sessionStorage() {
    if (this.__sessionStorage == null) {
      this.__sessionStorage = new MockStorage();
    }
    return this.__sessionStorage;
  }
  set sessionStorage(locStorage) {
    this.__sessionStorage = locStorage;
  }
  setInterval(callback, ms, ...args) {
    if (this.__timeouts == null) {
      this.__timeouts = new Set();
    }
    ms = Math.min(ms, this.__maxTimeout);
    if (this.__allowInterval) {
      const intervalId = this.__setInterval(() => {
        if (this.__timeouts) {
          this.__timeouts.delete(intervalId);
          try {
            callback(...args);
          }
          catch (e) {
            if (this.console) {
              this.console.error(e);
            }
            else {
              console.error(e);
            }
          }
        }
      }, ms);
      if (this.__timeouts) {
        this.__timeouts.add(intervalId);
      }
      return intervalId;
    }
    const timeoutId = this.__setTimeout(() => {
      if (this.__timeouts) {
        this.__timeouts.delete(timeoutId);
        try {
          callback(...args);
        }
        catch (e) {
          if (this.console) {
            this.console.error(e);
          }
          else {
            console.error(e);
          }
        }
      }
    }, ms);
    if (this.__timeouts) {
      this.__timeouts.add(timeoutId);
    }
    return timeoutId;
  }
  setTimeout(callback, ms, ...args) {
    if (this.__timeouts == null) {
      this.__timeouts = new Set();
    }
    ms = Math.min(ms, this.__maxTimeout);
    const timeoutId = this.__setTimeout(() => {
      if (this.__timeouts) {
        this.__timeouts.delete(timeoutId);
        try {
          callback(...args);
        }
        catch (e) {
          if (this.console) {
            this.console.error(e);
          }
          else {
            console.error(e);
          }
        }
      }
    }, ms);
    if (this.__timeouts) {
      this.__timeouts.add(timeoutId);
    }
    return timeoutId;
  }
  get top() {
    return this;
  }
  get window() {
    return this;
  }
  onanimationstart() {
    /**/
  }
  onanimationend() {
    /**/
  }
  onanimationiteration() {
    /**/
  }
  onabort() {
    /**/
  }
  onauxclick() {
    /**/
  }
  onbeforecopy() {
    /**/
  }
  onbeforecut() {
    /**/
  }
  onbeforepaste() {
    /**/
  }
  onblur() {
    /**/
  }
  oncancel() {
    /**/
  }
  oncanplay() {
    /**/
  }
  oncanplaythrough() {
    /**/
  }
  onchange() {
    /**/
  }
  onclick() {
    /**/
  }
  onclose() {
    /**/
  }
  oncontextmenu() {
    /**/
  }
  oncopy() {
    /**/
  }
  oncuechange() {
    /**/
  }
  oncut() {
    /**/
  }
  ondblclick() {
    /**/
  }
  ondrag() {
    /**/
  }
  ondragend() {
    /**/
  }
  ondragenter() {
    /**/
  }
  ondragleave() {
    /**/
  }
  ondragover() {
    /**/
  }
  ondragstart() {
    /**/
  }
  ondrop() {
    /**/
  }
  ondurationchange() {
    /**/
  }
  onemptied() {
    /**/
  }
  onended() {
    /**/
  }
  onerror() {
    /**/
  }
  onfocus() {
    /**/
  }
  onfocusin() {
    /**/
  }
  onfocusout() {
    /**/
  }
  onformdata() {
    /**/
  }
  onfullscreenchange() {
    /**/
  }
  onfullscreenerror() {
    /**/
  }
  ongotpointercapture() {
    /**/
  }
  oninput() {
    /**/
  }
  oninvalid() {
    /**/
  }
  onkeydown() {
    /**/
  }
  onkeypress() {
    /**/
  }
  onkeyup() {
    /**/
  }
  onload() {
    /**/
  }
  onloadeddata() {
    /**/
  }
  onloadedmetadata() {
    /**/
  }
  onloadstart() {
    /**/
  }
  onlostpointercapture() {
    /**/
  }
  onmousedown() {
    /**/
  }
  onmouseenter() {
    /**/
  }
  onmouseleave() {
    /**/
  }
  onmousemove() {
    /**/
  }
  onmouseout() {
    /**/
  }
  onmouseover() {
    /**/
  }
  onmouseup() {
    /**/
  }
  onmousewheel() {
    /**/
  }
  onpaste() {
    /**/
  }
  onpause() {
    /**/
  }
  onplay() {
    /**/
  }
  onplaying() {
    /**/
  }
  onpointercancel() {
    /**/
  }
  onpointerdown() {
    /**/
  }
  onpointerenter() {
    /**/
  }
  onpointerleave() {
    /**/
  }
  onpointermove() {
    /**/
  }
  onpointerout() {
    /**/
  }
  onpointerover() {
    /**/
  }
  onpointerup() {
    /**/
  }
  onprogress() {
    /**/
  }
  onratechange() {
    /**/
  }
  onreset() {
    /**/
  }
  onresize() {
    /**/
  }
  onscroll() {
    /**/
  }
  onsearch() {
    /**/
  }
  onseeked() {
    /**/
  }
  onseeking() {
    /**/
  }
  onselect() {
    /**/
  }
  onselectstart() {
    /**/
  }
  onstalled() {
    /**/
  }
  onsubmit() {
    /**/
  }
  onsuspend() {
    /**/
  }
  ontimeupdate() {
    /**/
  }
  ontoggle() {
    /**/
  }
  onvolumechange() {
    /**/
  }
  onwaiting() {
    /**/
  }
  onwebkitfullscreenchange() {
    /**/
  }
  onwebkitfullscreenerror() {
    /**/
  }
  onwheel() {
    /**/
  }
}
addGlobalsToWindowPrototype(MockWindow.prototype);
function resetWindowDefaults(win) {
  win.__clearInterval = nativeClearInterval;
  win.__clearTimeout = nativeClearTimeout;
  win.__setInterval = nativeSetInterval;
  win.__setTimeout = nativeSetTimeout;
  win.__maxTimeout = 30000;
  win.__allowInterval = true;
  win.URL = nativeURL;
}
function cloneWindow(srcWin, opts = {}) {
  if (srcWin == null) {
    return null;
  }
  const clonedWin = new MockWindow(false);
  if (!opts.customElementProxy) {
    // TODO(STENCIL-345) - Evaluate reconciling MockWindow, Window differences
    // @ts-ignore
    srcWin.customElements = null;
  }
  if (srcWin.document != null) {
    const clonedDoc = new MockDocument(false, clonedWin);
    clonedWin.document = clonedDoc;
    clonedDoc.documentElement = srcWin.document.documentElement.cloneNode(true);
  }
  else {
    clonedWin.document = new MockDocument(null, clonedWin);
  }
  return clonedWin;
}
function cloneDocument(srcDoc) {
  if (srcDoc == null) {
    return null;
  }
  const dstWin = cloneWindow(srcDoc.defaultView);
  return dstWin.document;
}
// TODO(STENCIL-345) - Evaluate reconciling MockWindow, Window differences
/**
 * Constrain setTimeout() to 1ms, but still async. Also
 * only allow setInterval() to fire once, also constrained to 1ms.
 * @param win the mock window instance to update
 */
function constrainTimeouts(win) {
  win.__allowInterval = false;
  win.__maxTimeout = 0;
}
function resetWindow(win) {
  if (win != null) {
    if (win.__timeouts) {
      win.__timeouts.forEach((timeoutId) => {
        nativeClearInterval(timeoutId);
        nativeClearTimeout(timeoutId);
      });
      win.__timeouts.clear();
    }
    if (win.customElements && win.customElements.clear) {
      win.customElements.clear();
    }
    resetDocument(win.document);
    resetPerformance(win.performance);
    for (const key in win) {
      if (win.hasOwnProperty(key) && key !== 'document' && key !== 'performance' && key !== 'customElements') {
        delete win[key];
      }
    }
    resetWindowDefaults(win);
    resetWindowDimensions(win);
    resetEventListeners(win);
    if (win.document != null) {
      try {
        win.document.defaultView = win;
      }
      catch (e) { }
    }
    // ensure we don't hold onto nodeFetch values
    win.fetch = null;
    win.Headers = null;
    win.Request = null;
    win.Response = null;
    win.FetchError = null;
  }
}
function resetWindowDimensions(win) {
  try {
    win.devicePixelRatio = 1;
    win.innerHeight = 768;
    win.innerWidth = 1366;
    win.pageXOffset = 0;
    win.pageYOffset = 0;
    win.screenLeft = 0;
    win.screenTop = 0;
    win.screenX = 0;
    win.screenY = 0;
    win.scrollX = 0;
    win.scrollY = 0;
    win.screen = {
      availHeight: win.innerHeight,
      availLeft: 0,
      availTop: 0,
      availWidth: win.innerWidth,
      colorDepth: 24,
      height: win.innerHeight,
      keepAwake: false,
      orientation: {
        angle: 0,
        type: 'portrait-primary',
      },
      pixelDepth: 24,
      width: win.innerWidth,
    };
  }
  catch (e) { }
}

class MockDocument extends MockHTMLElement {
  constructor(html = null, win = null) {
    super(null, null);
    this.nodeName = "#document" /* NODE_NAMES.DOCUMENT_NODE */;
    this.nodeType = 9 /* NODE_TYPES.DOCUMENT_NODE */;
    this.defaultView = win;
    this.cookie = '';
    this.referrer = '';
    this.appendChild(this.createDocumentTypeNode());
    if (typeof html === 'string') {
      const parsedDoc = parseDocumentUtil(this, html);
      const documentElement = parsedDoc.children.find((elm) => elm.nodeName === 'HTML');
      if (documentElement != null) {
        this.appendChild(documentElement);
        setOwnerDocument(documentElement, this);
      }
    }
    else if (html !== false) {
      const documentElement = new MockHTMLElement(this, 'html');
      this.appendChild(documentElement);
      documentElement.appendChild(new MockHTMLElement(this, 'head'));
      documentElement.appendChild(new MockHTMLElement(this, 'body'));
    }
  }
  get dir() {
    return this.documentElement.dir;
  }
  set dir(value) {
    this.documentElement.dir = value;
  }
  get location() {
    if (this.defaultView != null) {
      return this.defaultView.location;
    }
    return null;
  }
  set location(val) {
    if (this.defaultView != null) {
      this.defaultView.location = val;
    }
  }
  get baseURI() {
    const baseNode = this.head.childNodes.find((node) => node.nodeName === 'BASE');
    if (baseNode) {
      return baseNode.href;
    }
    return this.URL;
  }
  get URL() {
    return this.location.href;
  }
  get styleSheets() {
    return this.querySelectorAll('style');
  }
  get scripts() {
    return this.querySelectorAll('script');
  }
  get forms() {
    return this.querySelectorAll('form');
  }
  get images() {
    return this.querySelectorAll('img');
  }
  get scrollingElement() {
    return this.documentElement;
  }
  get documentElement() {
    for (let i = this.childNodes.length - 1; i >= 0; i--) {
      if (this.childNodes[i].nodeName === 'HTML') {
        return this.childNodes[i];
      }
    }
    const documentElement = new MockHTMLElement(this, 'html');
    this.appendChild(documentElement);
    return documentElement;
  }
  set documentElement(documentElement) {
    for (let i = this.childNodes.length - 1; i >= 0; i--) {
      if (this.childNodes[i].nodeType !== 10 /* NODE_TYPES.DOCUMENT_TYPE_NODE */) {
        this.childNodes[i].remove();
      }
    }
    if (documentElement != null) {
      this.appendChild(documentElement);
      setOwnerDocument(documentElement, this);
    }
  }
  get head() {
    const documentElement = this.documentElement;
    for (let i = 0; i < documentElement.childNodes.length; i++) {
      if (documentElement.childNodes[i].nodeName === 'HEAD') {
        return documentElement.childNodes[i];
      }
    }
    const head = new MockHTMLElement(this, 'head');
    documentElement.insertBefore(head, documentElement.firstChild);
    return head;
  }
  set head(head) {
    const documentElement = this.documentElement;
    for (let i = documentElement.childNodes.length - 1; i >= 0; i--) {
      if (documentElement.childNodes[i].nodeName === 'HEAD') {
        documentElement.childNodes[i].remove();
      }
    }
    if (head != null) {
      documentElement.insertBefore(head, documentElement.firstChild);
      setOwnerDocument(head, this);
    }
  }
  get body() {
    const documentElement = this.documentElement;
    for (let i = documentElement.childNodes.length - 1; i >= 0; i--) {
      if (documentElement.childNodes[i].nodeName === 'BODY') {
        return documentElement.childNodes[i];
      }
    }
    const body = new MockHTMLElement(this, 'body');
    documentElement.appendChild(body);
    return body;
  }
  set body(body) {
    const documentElement = this.documentElement;
    for (let i = documentElement.childNodes.length - 1; i >= 0; i--) {
      if (documentElement.childNodes[i].nodeName === 'BODY') {
        documentElement.childNodes[i].remove();
      }
    }
    if (body != null) {
      documentElement.appendChild(body);
      setOwnerDocument(body, this);
    }
  }
  appendChild(newNode) {
    newNode.remove();
    newNode.parentNode = this;
    this.childNodes.push(newNode);
    return newNode;
  }
  createComment(data) {
    return new MockComment(this, data);
  }
  createAttribute(attrName) {
    return new MockAttr(attrName.toLowerCase(), '');
  }
  createAttributeNS(namespaceURI, attrName) {
    return new MockAttr(attrName, '', namespaceURI);
  }
  createElement(tagName) {
    if (tagName === "#document" /* NODE_NAMES.DOCUMENT_NODE */) {
      const doc = new MockDocument(false);
      doc.nodeName = tagName;
      doc.parentNode = null;
      return doc;
    }
    return createElement(this, tagName);
  }
  createElementNS(namespaceURI, tagName) {
    const elmNs = createElementNS(this, namespaceURI, tagName);
    elmNs.namespaceURI = namespaceURI;
    return elmNs;
  }
  createTextNode(text) {
    return new MockTextNode(this, text);
  }
  createDocumentFragment() {
    return new MockDocumentFragment(this);
  }
  createDocumentTypeNode() {
    return new MockDocumentTypeNode(this);
  }
  getElementById(id) {
    return getElementById(this, id);
  }
  getElementsByName(elmName) {
    return getElementsByName(this, elmName.toLowerCase());
  }
  get title() {
    const title = this.head.childNodes.find((elm) => elm.nodeName === 'TITLE');
    if (title != null && typeof title.textContent === 'string') {
      return title.textContent.trim();
    }
    return '';
  }
  set title(value) {
    const head = this.head;
    let title = head.childNodes.find((elm) => elm.nodeName === 'TITLE');
    if (title == null) {
      title = this.createElement('title');
      head.appendChild(title);
    }
    title.textContent = value;
  }
}
function createDocument(html = null) {
  return new MockWindow(html).document;
}
function createFragment(html) {
  return parseHtmlToFragment(html, null);
}
function resetDocument(doc) {
  if (doc != null) {
    resetEventListeners(doc);
    const documentElement = doc.documentElement;
    if (documentElement != null) {
      resetElement(documentElement);
      for (let i = 0, ii = documentElement.childNodes.length; i < ii; i++) {
        const childNode = documentElement.childNodes[i];
        resetElement(childNode);
        childNode.childNodes.length = 0;
      }
    }
    for (const key in doc) {
      if (doc.hasOwnProperty(key) && !DOC_KEY_KEEPERS.has(key)) {
        delete doc[key];
      }
    }
    try {
      doc.nodeName = "#document" /* NODE_NAMES.DOCUMENT_NODE */;
    }
    catch (e) { }
    try {
      doc.nodeType = 9 /* NODE_TYPES.DOCUMENT_NODE */;
    }
    catch (e) { }
    try {
      doc.cookie = '';
    }
    catch (e) { }
    try {
      doc.referrer = '';
    }
    catch (e) { }
  }
}
const DOC_KEY_KEEPERS = new Set([
  'nodeName',
  'nodeType',
  'nodeValue',
  'ownerDocument',
  'parentNode',
  'childNodes',
  '_shadowRoot',
]);
function getElementById(elm, id) {
  const children = elm.children;
  for (let i = 0, ii = children.length; i < ii; i++) {
    const childElm = children[i];
    if (childElm.id === id) {
      return childElm;
    }
    const childElmFound = getElementById(childElm, id);
    if (childElmFound != null) {
      return childElmFound;
    }
  }
  return null;
}
function getElementsByName(elm, elmName, foundElms = []) {
  const children = elm.children;
  for (let i = 0, ii = children.length; i < ii; i++) {
    const childElm = children[i];
    if (childElm.name && childElm.name.toLowerCase() === elmName) {
      foundElms.push(childElm);
    }
    getElementsByName(childElm, elmName, foundElms);
  }
  return foundElms;
}
function setOwnerDocument(elm, ownerDocument) {
  for (let i = 0, ii = elm.childNodes.length; i < ii; i++) {
    elm.childNodes[i].ownerDocument = ownerDocument;
    if (elm.childNodes[i].nodeType === 1 /* NODE_TYPES.ELEMENT_NODE */) {
      setOwnerDocument(elm.childNodes[i], ownerDocument);
    }
  }
}

function hydrateFactory($stencilWindow, $stencilHydrateOpts, $stencilHydrateResults, $stencilAfterHydrate, $stencilHydrateResolve) {
  var globalThis = $stencilWindow;
  var self = $stencilWindow;
  var top = $stencilWindow;
  var parent = $stencilWindow;

  var addEventListener = $stencilWindow.addEventListener.bind($stencilWindow);
  var alert = $stencilWindow.alert.bind($stencilWindow);
  var blur = $stencilWindow.blur.bind($stencilWindow);
  var cancelAnimationFrame = $stencilWindow.cancelAnimationFrame.bind($stencilWindow);
  var cancelIdleCallback = $stencilWindow.cancelIdleCallback.bind($stencilWindow);
  var clearInterval = $stencilWindow.clearInterval.bind($stencilWindow);
  var clearTimeout = $stencilWindow.clearTimeout.bind($stencilWindow);
  var close = () => {};
  var confirm = $stencilWindow.confirm.bind($stencilWindow);
  var dispatchEvent = $stencilWindow.dispatchEvent.bind($stencilWindow);
  var focus = $stencilWindow.focus.bind($stencilWindow);
  var getComputedStyle = $stencilWindow.getComputedStyle.bind($stencilWindow);
  var matchMedia = $stencilWindow.matchMedia.bind($stencilWindow);
  var open = $stencilWindow.open.bind($stencilWindow);
  var prompt = $stencilWindow.prompt.bind($stencilWindow);
  var removeEventListener = $stencilWindow.removeEventListener.bind($stencilWindow);
  var requestAnimationFrame = $stencilWindow.requestAnimationFrame.bind($stencilWindow);
  var requestIdleCallback = $stencilWindow.requestIdleCallback.bind($stencilWindow);
  var setInterval = $stencilWindow.setInterval.bind($stencilWindow);
  var setTimeout = $stencilWindow.setTimeout.bind($stencilWindow);

  var CharacterData = $stencilWindow.CharacterData;
  var CSS = $stencilWindow.CSS;
  var CustomEvent = $stencilWindow.CustomEvent;
  var Document = $stencilWindow.Document;
  var DocumentFragment = $stencilWindow.DocumentFragment;
  var DocumentType = $stencilWindow.DocumentType;
  var DOMTokenList = $stencilWindow.DOMTokenList;
  var Element = $stencilWindow.Element;
  var Event = $stencilWindow.Event;
  var HTMLAnchorElement = $stencilWindow.HTMLAnchorElement;
  var HTMLBaseElement = $stencilWindow.HTMLBaseElement;
  var HTMLButtonElement = $stencilWindow.HTMLButtonElement;
  var HTMLCanvasElement = $stencilWindow.HTMLCanvasElement;
  var HTMLElement = $stencilWindow.HTMLElement;
  var HTMLFormElement = $stencilWindow.HTMLFormElement;
  var HTMLImageElement = $stencilWindow.HTMLImageElement;
  var HTMLInputElement = $stencilWindow.HTMLInputElement;
  var HTMLLinkElement = $stencilWindow.HTMLLinkElement;
  var HTMLMetaElement = $stencilWindow.HTMLMetaElement;
  var HTMLScriptElement = $stencilWindow.HTMLScriptElement;
  var HTMLStyleElement = $stencilWindow.HTMLStyleElement;
  var HTMLTemplateElement = $stencilWindow.HTMLTemplateElement;
  var HTMLTitleElement = $stencilWindow.HTMLTitleElement;
  var IntersectionObserver = $stencilWindow.IntersectionObserver;
  var KeyboardEvent = $stencilWindow.KeyboardEvent;
  var MouseEvent = $stencilWindow.MouseEvent;
  var Node = $stencilWindow.Node;
  var NodeList = $stencilWindow.NodeList;
  var URL = $stencilWindow.URL;

  var console = $stencilWindow.console;
  var customElements = $stencilWindow.customElements;
  var history = $stencilWindow.history;
  var localStorage = $stencilWindow.localStorage;
  var location = $stencilWindow.location;
  var navigator = $stencilWindow.navigator;
  var performance = $stencilWindow.performance;
  var sessionStorage = $stencilWindow.sessionStorage;

  var devicePixelRatio = $stencilWindow.devicePixelRatio;
  var innerHeight = $stencilWindow.innerHeight;
  var innerWidth = $stencilWindow.innerWidth;
  var origin = $stencilWindow.origin;
  var pageXOffset = $stencilWindow.pageXOffset;
  var pageYOffset = $stencilWindow.pageYOffset;
  var screen = $stencilWindow.screen;
  var screenLeft = $stencilWindow.screenLeft;
  var screenTop = $stencilWindow.screenTop;
  var screenX = $stencilWindow.screenX;
  var screenY = $stencilWindow.screenY;
  var scrollX = $stencilWindow.scrollX;
  var scrollY = $stencilWindow.scrollY;
  var exports = {};

  var fetch, FetchError, Headers, Request, Response;

  if (typeof $stencilWindow.fetch === 'function') {
  fetch = $stencilWindow.fetch;
  } else {
  fetch = $stencilWindow.fetch = function() { throw new Error('fetch() is not implemented'); };
  }

  if (typeof $stencilWindow.FetchError === 'function') {
  FetchError = $stencilWindow.FetchError;
  } else {
  FetchError = $stencilWindow.FetchError = class FetchError { constructor() { throw new Error('FetchError is not implemented'); } };
  }

  if (typeof $stencilWindow.Headers === 'function') {
  Headers = $stencilWindow.Headers;
  } else {
  Headers = $stencilWindow.Headers = class Headers { constructor() { throw new Error('Headers is not implemented'); } };
  }

  if (typeof $stencilWindow.Request === 'function') {
  Request = $stencilWindow.Request;
  } else {
  Request = $stencilWindow.Request = class Request { constructor() { throw new Error('Request is not implemented'); } };
  }

  if (typeof $stencilWindow.Response === 'function') {
  Response = $stencilWindow.Response;
  } else {
  Response = $stencilWindow.Response = class Response { constructor() { throw new Error('Response is not implemented'); } };
  }

  function hydrateAppClosure($stencilWindow) {
  const window = $stencilWindow;
  const document = $stencilWindow.document;
  /*hydrateAppClosure start*/


const NAMESPACE = 'copperui';
const BUILD = /* copperui */ { allRenderFn: true, appendChildSlotFix: false, asyncLoading: true, attachStyles: true, cloneNodeFix: false, cmpDidLoad: true, cmpDidRender: false, cmpDidUnload: false, cmpDidUpdate: false, cmpShouldUpdate: true, cmpWillLoad: true, cmpWillRender: false, cmpWillUpdate: false, connectedCallback: true, constructableCSS: false, cssAnnotations: true, cssVarShim: false, devTools: false, disconnectedCallback: false, dynamicImportShim: false, element: false, event: true, hasRenderFn: true, hostListener: true, hostListenerTarget: true, hostListenerTargetBody: false, hostListenerTargetDocument: true, hostListenerTargetParent: false, hostListenerTargetWindow: true, hotModuleReplacement: false, hydrateClientSide: true, hydrateServerSide: true, hydratedAttribute: false, hydratedClass: true, isDebug: false, isDev: false, isTesting: false, lazyLoad: true, lifecycle: true, lifecycleDOMEvents: false, member: true, method: true, mode: false, observeAttribute: true, profile: false, prop: true, propBoolean: true, propMutable: true, propNumber: true, propString: true, reflect: true, safari10: false, scoped: false, scriptDataOpts: false, shadowDelegatesFocus: false, shadowDom: false, shadowDomShim: true, slot: true, slotChildNodesFix: false, slotRelocation: true, state: true, style: true, svg: false, taskQueue: true, updatable: true, vdomAttribute: true, vdomClass: true, vdomFunctional: true, vdomKey: true, vdomListener: true, vdomPropOrAttr: true, vdomRef: true, vdomRender: true, vdomStyle: true, vdomText: true, vdomXlink: true, watchCallback: true };

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire();
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

createCommonjsModule(function (module, exports) {
(function (global, factory) {
  factory() ;
}(commonjsGlobal, (function () {
  /**
   * Applies the :focus-visible polyfill at the given scope.
   * A scope in this case is either the top-level Document or a Shadow Root.
   *
   * @param {(Document|ShadowRoot)} scope
   * @see https://github.com/WICG/focus-visible
   */
  function applyFocusVisiblePolyfill(scope) {
    var hadKeyboardEvent = true;
    var hadFocusVisibleRecently = false;
    var hadFocusVisibleRecentlyTimeout = null;

    var inputTypesAllowlist = {
      text: true,
      search: true,
      url: true,
      tel: true,
      email: true,
      password: true,
      number: true,
      date: true,
      month: true,
      week: true,
      time: true,
      datetime: true,
      'datetime-local': true
    };

    /**
     * Helper function for legacy browsers and iframes which sometimes focus
     * elements like document, body, and non-interactive SVG.
     * @param {Element} el
     */
    function isValidFocusTarget(el) {
      if (
        el &&
        el !== document &&
        el.nodeName !== 'HTML' &&
        el.nodeName !== 'BODY' &&
        'classList' in el &&
        'contains' in el.classList
      ) {
        return true;
      }
      return false;
    }

    /**
     * Computes whether the given element should automatically trigger the
     * `focus-visible` class being added, i.e. whether it should always match
     * `:focus-visible` when focused.
     * @param {Element} el
     * @return {boolean}
     */
    function focusTriggersKeyboardModality(el) {
      var type = el.type;
      var tagName = el.tagName;

      if (tagName === 'INPUT' && inputTypesAllowlist[type] && !el.readOnly) {
        return true;
      }

      if (tagName === 'TEXTAREA' && !el.readOnly) {
        return true;
      }

      if (el.isContentEditable) {
        return true;
      }

      return false;
    }

    /**
     * Add the `focus-visible` class to the given element if it was not added by
     * the author.
     * @param {Element} el
     */
    function addFocusVisibleClass(el) {
      if (el.classList.contains('focus-visible')) {
        return;
      }
      el.classList.add('focus-visible');
      el.setAttribute('data-focus-visible-added', '');
    }

    /**
     * Remove the `focus-visible` class from the given element if it was not
     * originally added by the author.
     * @param {Element} el
     */
    function removeFocusVisibleClass(el) {
      if (!el.hasAttribute('data-focus-visible-added')) {
        return;
      }
      el.classList.remove('focus-visible');
      el.removeAttribute('data-focus-visible-added');
    }

    /**
     * If the most recent user interaction was via the keyboard;
     * and the key press did not include a meta, alt/option, or control key;
     * then the modality is keyboard. Otherwise, the modality is not keyboard.
     * Apply `focus-visible` to any current active element and keep track
     * of our keyboard modality state with `hadKeyboardEvent`.
     * @param {KeyboardEvent} e
     */
    function onKeyDown(e) {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }

      if (isValidFocusTarget(scope.activeElement)) {
        addFocusVisibleClass(scope.activeElement);
      }

      hadKeyboardEvent = true;
    }

    /**
     * If at any point a user clicks with a pointing device, ensure that we change
     * the modality away from keyboard.
     * This avoids the situation where a user presses a key on an already focused
     * element, and then clicks on a different element, focusing it with a
     * pointing device, while we still think we're in keyboard modality.
     * @param {Event} e
     */
    function onPointerDown(e) {
      hadKeyboardEvent = false;
    }

    /**
     * On `focus`, add the `focus-visible` class to the target if:
     * - the target received focus as a result of keyboard navigation, or
     * - the event target is an element that will likely require interaction
     *   via the keyboard (e.g. a text box)
     * @param {Event} e
     */
    function onFocus(e) {
      // Prevent IE from focusing the document or HTML element.
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
        addFocusVisibleClass(e.target);
      }
    }

    /**
     * On `blur`, remove the `focus-visible` class from the target.
     * @param {Event} e
     */
    function onBlur(e) {
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (
        e.target.classList.contains('focus-visible') ||
        e.target.hasAttribute('data-focus-visible-added')
      ) {
        // To detect a tab/window switch, we look for a blur event followed
        // rapidly by a visibility change.
        // If we don't see a visibility change within 100ms, it's probably a
        // regular focus change.
        hadFocusVisibleRecently = true;
        window.clearTimeout(hadFocusVisibleRecentlyTimeout);
        hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
          hadFocusVisibleRecently = false;
        }, 100);
        removeFocusVisibleClass(e.target);
      }
    }

    /**
     * If the user changes tabs, keep track of whether or not the previously
     * focused element had .focus-visible.
     * @param {Event} e
     */
    function onVisibilityChange(e) {
      if (document.visibilityState === 'hidden') {
        // If the tab becomes active again, the browser will handle calling focus
        // on the element (Safari actually calls it twice).
        // If this tab change caused a blur on an element with focus-visible,
        // re-apply the class when the user switches back to the tab.
        if (hadFocusVisibleRecently) {
          hadKeyboardEvent = true;
        }
        addInitialPointerMoveListeners();
      }
    }

    /**
     * Add a group of listeners to detect usage of any pointing devices.
     * These listeners will be added when the polyfill first loads, and anytime
     * the window is blurred, so that they are active when the window regains
     * focus.
     */
    function addInitialPointerMoveListeners() {
      document.addEventListener('mousemove', onInitialPointerMove);
      document.addEventListener('mousedown', onInitialPointerMove);
      document.addEventListener('mouseup', onInitialPointerMove);
      document.addEventListener('pointermove', onInitialPointerMove);
      document.addEventListener('pointerdown', onInitialPointerMove);
      document.addEventListener('pointerup', onInitialPointerMove);
      document.addEventListener('touchmove', onInitialPointerMove);
      document.addEventListener('touchstart', onInitialPointerMove);
      document.addEventListener('touchend', onInitialPointerMove);
    }

    function removeInitialPointerMoveListeners() {
      document.removeEventListener('mousemove', onInitialPointerMove);
      document.removeEventListener('mousedown', onInitialPointerMove);
      document.removeEventListener('mouseup', onInitialPointerMove);
      document.removeEventListener('pointermove', onInitialPointerMove);
      document.removeEventListener('pointerdown', onInitialPointerMove);
      document.removeEventListener('pointerup', onInitialPointerMove);
      document.removeEventListener('touchmove', onInitialPointerMove);
      document.removeEventListener('touchstart', onInitialPointerMove);
      document.removeEventListener('touchend', onInitialPointerMove);
    }

    /**
     * When the polfyill first loads, assume the user is in keyboard modality.
     * If any event is received from a pointing device (e.g. mouse, pointer,
     * touch), turn off keyboard modality.
     * This accounts for situations where focus enters the page from the URL bar.
     * @param {Event} e
     */
    function onInitialPointerMove(e) {
      // Work around a Safari quirk that fires a mousemove on <html> whenever the
      // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
      if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'html') {
        return;
      }

      hadKeyboardEvent = false;
      removeInitialPointerMoveListeners();
    }

    // For some kinds of state, we are interested in changes at the global scope
    // only. For example, global pointer input, global key presses and global
    // visibility change should affect the state at every scope:
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);
    document.addEventListener('visibilitychange', onVisibilityChange, true);

    addInitialPointerMoveListeners();

    // For focus and blur, we specifically care about state changes in the local
    // scope. This is because focus / blur events that originate from within a
    // shadow root are not re-dispatched from the host element if it was already
    // the active element in its own scope:
    scope.addEventListener('focus', onFocus, true);
    scope.addEventListener('blur', onBlur, true);

    // We detect that a node is a ShadowRoot by ensuring that it is a
    // DocumentFragment and also has a host property. This check covers native
    // implementation and polyfill implementation transparently. If we only cared
    // about the native implementation, we could just check if the scope was
    // an instance of a ShadowRoot.
    if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {
      // Since a ShadowRoot is a special kind of DocumentFragment, it does not
      // have a root element to add a class to. So, we add this attribute to the
      // host element instead:
      scope.host.setAttribute('data-js-focus-visible', '');
    } else if (scope.nodeType === Node.DOCUMENT_NODE) {
      document.documentElement.classList.add('js-focus-visible');
      document.documentElement.setAttribute('data-js-focus-visible', '');
    }
  }

  // It is important to wrap all references to global window and document in
  // these checks to support server-side rendering use cases
  // @see https://github.com/WICG/focus-visible/issues/199
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Make the polyfill helper globally available. This can be used as a signal
    // to interested libraries that wish to coordinate with the polyfill for e.g.,
    // applying the polyfill to a shadow root:
    window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;

    // Notify interested libraries of the polyfill's presence, in case the
    // polyfill was loaded lazily:
    var event;

    try {
      event = new CustomEvent('focus-visible-polyfill-ready');
    } catch (error) {
      // IE11 does not support using CustomEvent as a constructor directly:
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('focus-visible-polyfill-ready', false, false, {});
    }

    window.dispatchEvent(event);
  }

  if (typeof document !== 'undefined') {
    // Apply the polyfill to the global document, so that no JavaScript
    // coordination is required to use the polyfill in the top-level document:
    applyFocusVisiblePolyfill(document);
  }

})));
});

function componentOnReady() {
 return getHostRef(this).$onReadyPromise$;
}

function forceUpdate() {}

function hydrateApp(e, t, o, n, s) {
 function l() {
  if (global.clearTimeout(p), i.clear(), r.clear(), !h) {
   h = !0;
   try {
    t.clientHydrateAnnotations && insertVdomAnnotations(e.document, t.staticComponents), 
    e.dispatchEvent(new e.Event("DOMContentLoaded")), e.document.createElement = c, 
    e.document.createElementNS = $;
   } catch (e) {
    renderCatchError(t, o, e);
   }
  }
  n(e, t, o, s);
 }
 function a(e) {
  renderCatchError(t, o, e), l();
 }
 const r = new Set, i = new Set, d = new Set, c = e.document.createElement, $ = e.document.createElementNS, m = Promise.resolve();
 let p, h = !1;
 try {
  function u() {
   return g(this);
  }
  function f(e) {
   if (isValidComponent(e, t) && !getHostRef(e)) {
    const t = loadModule({
     $tagName$: e.nodeName.toLowerCase(),
     $flags$: null
    });
    null != t && null != t.cmpMeta && (i.add(e), e.connectedCallback = u, registerHost(e, t.cmpMeta), 
    function o(e, t) {
     if ("function" != typeof e.componentOnReady && (e.componentOnReady = componentOnReady), 
     "function" != typeof e.forceUpdate && (e.forceUpdate = forceUpdate), 1 & t.$flags$ && (e.shadowRoot = e), 
     null != t.$members$) {
      const o = getHostRef(e);
      Object.entries(t.$members$).forEach((([n, s]) => {
       const l = s[0];
       if (31 & l) {
        const a = s[1] || n, r = e.getAttribute(a);
        if (null != r) {
         const e = parsePropertyValue(r, l);
         o.$instanceValues$.set(n, e);
        }
        const i = e[n];
        void 0 !== i && (o.$instanceValues$.set(n, i), delete e[n]), Object.defineProperty(e, n, {
         get() {
          return getValue(this, n);
         },
         set(e) {
          setValue(this, n, e, t);
         },
         configurable: !0,
         enumerable: !0
        });
       } else 64 & l && Object.defineProperty(e, n, {
        value(...e) {
         const t = getHostRef(this);
         return t.$onInstancePromise$.then((() => t.$lazyInstance$[n](...e))).catch(consoleError);
        }
       });
      }));
     }
    }(e, t.cmpMeta));
   }
  }
  function g(n) {
   return i.delete(n), isValidComponent(n, t) && o.hydratedCount < t.maxHydrateCount && !r.has(n) && shouldHydrate(n) ? (r.add(n), 
   async function s(e, t, o, n, l) {
    o = o.toLowerCase();
    const a = loadModule({
     $tagName$: o,
     $flags$: null
    });
    if (null != a && null != a.cmpMeta) {
     l.add(n);
     try {
      connectedCallback(n), await n.componentOnReady(), t.hydratedCount++;
      const e = getHostRef(n), s = e.$modeName$ ? e.$modeName$ : "$";
      t.components.some((e => e.tag === o && e.mode === s)) || t.components.push({
       tag: o,
       mode: s,
       count: 0,
       depth: -1
      });
     } catch (t) {
      e.console.error(t);
     }
     l.delete(n);
    }
   }(e, o, n.nodeName, n, d)) : m;
  }
  e.document.createElement = function t(o) {
   const n = c.call(e.document, o);
   return f(n), n;
  }, e.document.createElementNS = function t(o, n) {
   const s = $.call(e.document, o, n);
   return f(s), s;
  }, p = global.setTimeout((function L() {
   a(`Hydrate exceeded timeout${function e(t) {
    return Array.from(t).map(waitingOnElementMsg);
   }(d)}`);
  }), t.timeout), plt.$resourcesUrl$ = new URL(t.resourcesUrl || "./", doc.baseURI).href, 
  function e(t) {
   if (null != t && 1 === t.nodeType) {
    f(t);
    const o = t.children;
    for (let t = 0, n = o.length; t < n; t++) e(o[t]);
   }
  }(e.document.body), function e() {
   const t = Array.from(i).filter((e => e.parentElement));
   return t.length > 0 ? Promise.all(t.map(g)).then(e) : m;
  }().then(l).catch(a);
 } catch (e) {
  a(e);
 }
}

function isValidComponent(e, t) {
 if (null != e && 1 === e.nodeType) {
  const o = e.nodeName;
  if ("string" == typeof o && o.includes("-")) return !t.excludeComponents.includes(o.toLowerCase());
 }
 return !1;
}

function shouldHydrate(e) {
 if (9 === e.nodeType) return !0;
 if (NO_HYDRATE_TAGS.has(e.nodeName)) return !1;
 if (e.hasAttribute("no-prerender")) return !1;
 const t = e.parentNode;
 return null == t || shouldHydrate(t);
}

function renderCatchError(e, t, o) {
 const n = {
  level: "error",
  type: "build",
  header: "Hydrate Error",
  messageText: "",
  relFilePath: null,
  absFilePath: null,
  lines: []
 };
 if (e.url) try {
  const t = new URL(e.url);
  "/" !== t.pathname && (n.header += ": " + t.pathname);
 } catch (e) {}
 null != o && (null != o.stack ? n.messageText = o.stack.toString() : null != o.message ? n.messageText = o.message.toString() : n.messageText = o.toString()), 
 t.diagnostics.push(n);
}

function printTag(e) {
 let t = `<${e.nodeName.toLowerCase()}`;
 if (Array.isArray(e.attributes)) for (let o = 0; o < e.attributes.length; o++) {
  const n = e.attributes[o];
  t += ` ${n.name}`, "" !== n.value && (t += `="${n.value}"`);
 }
 return t += ">", t;
}

function waitingOnElementMsg(e) {
 let t = "";
 if (e) {
  const o = [];
  t = " - waiting on:";
  let n = e;
  for (;n && 9 !== n.nodeType && "BODY" !== n.nodeName; ) o.unshift(printTag(n)), 
  n = n.parentElement;
  let s = "";
  for (const e of o) s += "  ", t += `\n${s}${e}`;
 }
 return t;
}

const createTime = (e, t = "") => {
 return () => {};
}, XLINK_NS = "http://www.w3.org/1999/xlink", EMPTY_OBJ = {}, isComplexType = e => "object" == (e = typeof e) || "function" === e, isPromise = e => !!e && ("object" == typeof e || "function" == typeof e) && "function" == typeof e.then, h = (e, t, ...o) => {
 let n = null, s = null, l = null, a = !1, r = !1;
 const i = [], d = t => {
  for (let o = 0; o < t.length; o++) n = t[o], Array.isArray(n) ? d(n) : null != n && "boolean" != typeof n && ((a = "function" != typeof e && !isComplexType(n)) ? n = String(n) : BUILD.isDev  , 
  a && r ? i[i.length - 1].$text$ += n : i.push(a ? newVNode(null, n) : n), r = a);
 };
 if (d(o), t && (t.key && (s = t.key), 
 t.name && (l = t.name), BUILD.vdomClass)) {
  const e = t.className || t.class;
  e && (t.class = "object" != typeof e ? e : Object.keys(e).filter((t => e[t])).join(" "));
 }
 if ("function" == typeof e) return e(null === t ? {} : t, i, vdomFnUtils);
 const c = newVNode(e, null);
 return c.$attrs$ = t, i.length > 0 && (c.$children$ = i), (c.$key$ = s), 
 (c.$name$ = l), c;
}, newVNode = (e, t) => {
 const o = {
  $flags$: 0,
  $tag$: e,
  $text$: t,
  $elm$: null,
  $children$: null
 };
 return (o.$attrs$ = null), (o.$key$ = null), 
 (o.$name$ = null), o;
}, Host = {}, isHost = e => e && e.$tag$ === Host, vdomFnUtils = {
 forEach: (e, t) => e.map(convertToPublic).forEach(t),
 map: (e, t) => e.map(convertToPublic).map(t).map(convertToPrivate)
}, convertToPublic = e => ({
 vattrs: e.$attrs$,
 vchildren: e.$children$,
 vkey: e.$key$,
 vname: e.$name$,
 vtag: e.$tag$,
 vtext: e.$text$
}), convertToPrivate = e => {
 if ("function" == typeof e.vtag) {
  const t = {
   ...e.vattrs
  };
  return e.vkey && (t.key = e.vkey), e.vname && (t.name = e.vname), h(e.vtag, t, ...e.vchildren || []);
 }
 const t = newVNode(e.vtag, e.vtext);
 return t.$attrs$ = e.vattrs, t.$children$ = e.vchildren, t.$key$ = e.vkey, t.$name$ = e.vname, 
 t;
}, clientHydrate = (e, t, o, n, s, l, a) => {
 let r, i, d, c;
 if (1 === l.nodeType) {
  for (r = l.getAttribute("c-id"), r && (i = r.split("."), i[0] !== a && "0" !== i[0] || (d = {
   $flags$: 0,
   $hostId$: i[0],
   $nodeId$: i[1],
   $depth$: i[2],
   $index$: i[3],
   $tag$: l.tagName.toLowerCase(),
   $elm$: l,
   $attrs$: null,
   $children$: null,
   $key$: null,
   $name$: null,
   $text$: null
  }, t.push(d), l.removeAttribute("c-id"), e.$children$ || (e.$children$ = []), e.$children$[d.$index$] = d, 
  e = d, n && "0" === d.$depth$ && (n[d.$index$] = d.$elm$))), c = l.childNodes.length - 1; c >= 0; c--) clientHydrate(e, t, o, n, s, l.childNodes[c], a);
  if (l.shadowRoot) for (c = l.shadowRoot.childNodes.length - 1; c >= 0; c--) clientHydrate(e, t, o, n, s, l.shadowRoot.childNodes[c], a);
 } else if (8 === l.nodeType) i = l.nodeValue.split("."), i[1] !== a && "0" !== i[1] || (r = i[0], 
 d = {
  $flags$: 0,
  $hostId$: i[1],
  $nodeId$: i[2],
  $depth$: i[3],
  $index$: i[4],
  $elm$: l,
  $attrs$: null,
  $children$: null,
  $key$: null,
  $name$: null,
  $tag$: null,
  $text$: null
 }, "t" === r ? (d.$elm$ = l.nextSibling, d.$elm$ && 3 === d.$elm$.nodeType && (d.$text$ = d.$elm$.textContent, 
 t.push(d), l.remove(), e.$children$ || (e.$children$ = []), e.$children$[d.$index$] = d, 
 n && "0" === d.$depth$ && (n[d.$index$] = d.$elm$))) : d.$hostId$ === a && ("s" === r ? (d.$tag$ = "slot", 
 i[5] ? l["s-sn"] = d.$name$ = i[5] : l["s-sn"] = "", l["s-sr"] = !0, o.push(d), e.$children$ || (e.$children$ = []), 
 e.$children$[d.$index$] = d) : "r" === r && ((s["s-cr"] = l, 
 l["s-cn"] = !0)))); else if (e && "style" === e.$tag$) {
  const t = newVNode(null, l.textContent);
  t.$elm$ = l, t.$index$ = "0", e.$children$ = [ t ];
 }
}, initializeDocumentHydrate = (e, t) => {
 if (1 === e.nodeType) {
  let o = 0;
  for (;o < e.childNodes.length; o++) initializeDocumentHydrate(e.childNodes[o], t);
  if (e.shadowRoot) for (o = 0; o < e.shadowRoot.childNodes.length; o++) initializeDocumentHydrate(e.shadowRoot.childNodes[o], t);
 } else if (8 === e.nodeType) {
  const o = e.nodeValue.split(".");
  "o" === o[0] && (t.set(o[1] + "." + o[2], e), e.nodeValue = "", e["s-en"] = o[3]);
 }
}, parsePropertyValue = (e, t) => null == e || isComplexType(e) ? e : 4 & t ? "false" !== e && ("" === e || !!e) : 2 & t ? parseFloat(e) : 1 & t ? String(e) : e, getElement = e => getHostRef(e).$hostElement$ , createEvent = (e, t, o) => {
 const n = getElement(e);
 return {
  emit: e => (emitEvent(n, t, {
   bubbles: !!(4 & o),
   composed: !!(2 & o),
   cancelable: !!(1 & o),
   detail: e
  }))
 };
}, emitEvent = (e, t, o) => {
 const n = plt.ce(t, o);
 return e.dispatchEvent(n), n;
}, rootAppliedStyles = new WeakMap, registerStyle = (e, t, o) => {
 let n = styles.get(e);
 n = t, styles.set(e, n);
}, addStyle = (e, t, o, n) => {
 let s = getScopeId(t);
 const l = styles.get(s);
 if (e = 11 === e.nodeType ? e : doc, l) if ("string" == typeof l) {
  e = e.head || e;
  let o, a = rootAppliedStyles.get(e);
  if (a || rootAppliedStyles.set(e, a = new Set), !a.has(s)) {
   if (e.host && (o = e.querySelector(`[sty-id="${s}"]`))) o.innerHTML = l; else {
    o = doc.createElement("style"), o.innerHTML = l;
    o.setAttribute("sty-id", s), 
    e.insertBefore(o, e.querySelector("link"));
   }
   a && a.add(s);
  }
 }
 return s;
}, attachStyles = e => {
 const t = e.$cmpMeta$, o = e.$hostElement$, s = createTime("attachStyles", t.$tagName$); addStyle(o.getRootNode(), t);
 s();
}, getScopeId = (e, t) => "sc-" + (e.$tagName$), setAccessor = (e, t, o, n, s, l) => {
 if (o !== n) {
  let a = isMemberInElement(e, t), r = t.toLowerCase();
  if ("class" === t) {
   const t = e.classList, s = parseClassList(o), l = parseClassList(n);
   t.remove(...s.filter((e => e && !l.includes(e)))), t.add(...l.filter((e => e && !s.includes(e))));
  } else if ("style" === t) {
   for (const t in o) n && null != n[t] || (e.style[t] = "");
   for (const t in n) o && n[t] === o[t] || (e.style[t] = n[t]);
  } else if ("key" === t) ; else if ("ref" === t) n && n(e); else if ((a ) || "o" !== t[0] || "n" !== t[1]) {
   {
    const i = isComplexType(n);
    if ((a || i && null !== n) && !s) try {
     if (e.tagName.includes("-")) e[t] = n; else {
      const s = null == n ? "" : n;
      "list" === t ? a = !1 : null != o && e[t] == s || (e[t] = s);
     }
    } catch (e) {}
    let d = !1;
    r !== (r = r.replace(/^xlink\:?/, "")) && (t = r, d = !0), null == n || !1 === n ? !1 === n && "" !== e.getAttribute(t) || (d ? e.removeAttributeNS(XLINK_NS, t) : e.removeAttribute(t)) : (!a || 4 & l || s) && !i && (n = !0 === n ? "" : n, 
    d ? e.setAttributeNS(XLINK_NS, t, n) : e.setAttribute(t, n));
   }
  } else t = "-" === t[2] ? t.slice(3) : isMemberInElement(win, r) ? r.slice(2) : r[2] + t.slice(3), 
  o && plt.rel(e, t, o, !1), n && plt.ael(e, t, n, !1);
 }
}, parseClassListRegex = /\s/, parseClassList = e => e ? e.split(parseClassListRegex) : [], updateElement = (e, t, o, n) => {
 const s = 11 === t.$elm$.nodeType && t.$elm$.host ? t.$elm$.host : t.$elm$, l = e && e.$attrs$ || EMPTY_OBJ, a = t.$attrs$ || EMPTY_OBJ;
 for (n in l) n in a || setAccessor(s, n, l[n], void 0, o, t.$flags$);
 for (n in a) setAccessor(s, n, l[n], a[n], o, t.$flags$);
};

let contentRef, hostTagName, useNativeShadowDom = !1, checkSlotFallbackVisibility = !1, checkSlotRelocate = !1, isSvgMode = !1;

const createElm = (e, t, o, n) => {
 const s = t.$children$[o];
 let l, a, r, i = 0;
 if (!useNativeShadowDom && (checkSlotRelocate = !0, "slot" === s.$tag$ && (s.$flags$ |= s.$children$ ? 2 : 1)), null !== s.$text$) l = s.$elm$ = doc.createTextNode(s.$text$); else if (1 & s.$flags$) l = s.$elm$ = slotReferenceDebugNode(s) ; else {
  if (l = s.$elm$ = doc.createElement(2 & s.$flags$ ? "slot-fb" : s.$tag$), 
  updateElement(null, s, isSvgMode), 
  s.$children$) for (i = 0; i < s.$children$.length; ++i) a = createElm(e, s, i), 
  a && l.appendChild(a);
 }
 return (l["s-hn"] = hostTagName, 3 & s.$flags$ && (l["s-sr"] = !0, 
 l["s-cr"] = contentRef, l["s-sn"] = s.$name$ || "", r = e && e.$children$ && e.$children$[o], 
 r && r.$tag$ === s.$tag$ && e.$elm$ && putBackInOriginalLocation(e.$elm$, !1))), 
 l;
}, putBackInOriginalLocation = (e, t) => {
 plt.$flags$ |= 1;
 const o = e.childNodes;
 for (let e = o.length - 1; e >= 0; e--) {
  const n = o[e];
  n["s-hn"] !== hostTagName && n["s-ol"] && (parentReferenceNode(n).insertBefore(n, referenceNode(n)), 
  n["s-ol"].remove(), n["s-ol"] = void 0, checkSlotRelocate = !0), t && putBackInOriginalLocation(n, t);
 }
 plt.$flags$ &= -2;
}, addVnodes = (e, t, o, n, s, l) => {
 let a, r = e["s-cr"] && e["s-cr"].parentNode || e;
 for (BUILD.shadowDom   ; s <= l; ++s) n[s] && (a = createElm(null, o, s), 
 a && (n[s].$elm$ = a, r.insertBefore(a, referenceNode(t) )));
}, removeVnodes = (e, t, o, n, s) => {
 for (;t <= o; ++t) (n = e[t]) && (s = n.$elm$, callNodeRefs(n), (checkSlotFallbackVisibility = !0, 
 s["s-ol"] ? s["s-ol"].remove() : putBackInOriginalLocation(s, !0)), s.remove());
}, isSameVnode = (e, t) => e.$tag$ === t.$tag$ && ("slot" === e.$tag$ ? e.$name$ === t.$name$ : e.$key$ === t.$key$), referenceNode = e => e && e["s-ol"] || e, parentReferenceNode = e => (e["s-ol"] ? e["s-ol"] : e).parentNode, patch = (e, t) => {
 const o = t.$elm$ = e.$elm$, n = e.$children$, s = t.$children$, l = t.$tag$, a = t.$text$;
 let r;
 null !== a ? (r = o["s-cr"]) ? r.parentNode.textContent = a : e.$text$ !== a && (o.data = a) : (("slot" === l || updateElement(e, t, isSvgMode)), 
 null !== n && null !== s ? ((e, t, o, n) => {
  let s, l, a = 0, r = 0, i = 0, d = 0, c = t.length - 1, $ = t[0], m = t[c], p = n.length - 1, h = n[0], u = n[p];
  for (;a <= c && r <= p; ) if (null == $) $ = t[++a]; else if (null == m) m = t[--c]; else if (null == h) h = n[++r]; else if (null == u) u = n[--p]; else if (isSameVnode($, h)) patch($, h), 
  $ = t[++a], h = n[++r]; else if (isSameVnode(m, u)) patch(m, u), m = t[--c], u = n[--p]; else if (isSameVnode($, u)) "slot" !== $.$tag$ && "slot" !== u.$tag$ || putBackInOriginalLocation($.$elm$.parentNode, !1), 
  patch($, u), e.insertBefore($.$elm$, m.$elm$.nextSibling), $ = t[++a], u = n[--p]; else if (isSameVnode(m, h)) "slot" !== $.$tag$ && "slot" !== u.$tag$ || putBackInOriginalLocation(m.$elm$.parentNode, !1), 
  patch(m, h), e.insertBefore(m.$elm$, $.$elm$), m = t[--c], h = n[++r]; else {
   if (i = -1, BUILD.vdomKey) for (d = a; d <= c; ++d) if (t[d] && null !== t[d].$key$ && t[d].$key$ === h.$key$) {
    i = d;
    break;
   }
   i >= 0 ? (l = t[i], l.$tag$ !== h.$tag$ ? s = createElm(t && t[r], o, i) : (patch(l, h), 
   t[i] = void 0, s = l.$elm$), h = n[++r]) : (s = createElm(t && t[r], o, r), h = n[++r]), 
   s && (parentReferenceNode($.$elm$).insertBefore(s, referenceNode($.$elm$)) );
  }
  a > c ? addVnodes(e, null == n[p + 1] ? null : n[p + 1].$elm$, o, n, r, p) : r > p && removeVnodes(t, a, c);
 })(o, n, t, s) : null !== s ? (null !== e.$text$ && (o.textContent = ""), 
 addVnodes(o, null, t, s, 0, s.length - 1)) : null !== n && removeVnodes(n, 0, n.length - 1), 
 BUILD.svg   );
}, updateFallbackSlotVisibility = e => {
 const t = e.childNodes;
 let o, n, s, l, a, r;
 for (n = 0, s = t.length; n < s; n++) if (o = t[n], 1 === o.nodeType) {
  if (o["s-sr"]) for (a = o["s-sn"], o.hidden = !1, l = 0; l < s; l++) if (r = t[l].nodeType, 
  t[l]["s-hn"] !== o["s-hn"] || "" !== a) {
   if (1 === r && a === t[l].getAttribute("slot")) {
    o.hidden = !0;
    break;
   }
  } else if (1 === r || 3 === r && "" !== t[l].textContent.trim()) {
   o.hidden = !0;
   break;
  }
  updateFallbackSlotVisibility(o);
 }
}, relocateNodes = [], relocateSlotContent = e => {
 let t, o, n, s, l, a, r = 0;
 const i = e.childNodes, d = i.length;
 for (;r < d; r++) {
  if (t = i[r], t["s-sr"] && (o = t["s-cr"]) && o.parentNode) for (n = o.parentNode.childNodes, 
  s = t["s-sn"], a = n.length - 1; a >= 0; a--) o = n[a], o["s-cn"] || o["s-nr"] || o["s-hn"] === t["s-hn"] || (isNodeLocatedInSlot(o, s) ? (l = relocateNodes.find((e => e.$nodeToRelocate$ === o)), 
  checkSlotFallbackVisibility = !0, o["s-sn"] = o["s-sn"] || s, l ? l.$slotRefNode$ = t : relocateNodes.push({
   $slotRefNode$: t,
   $nodeToRelocate$: o
  }), o["s-sr"] && relocateNodes.map((e => {
   isNodeLocatedInSlot(e.$nodeToRelocate$, o["s-sn"]) && (l = relocateNodes.find((e => e.$nodeToRelocate$ === o)), 
   l && !e.$slotRefNode$ && (e.$slotRefNode$ = l.$slotRefNode$));
  }))) : relocateNodes.some((e => e.$nodeToRelocate$ === o)) || relocateNodes.push({
   $nodeToRelocate$: o
  }));
  1 === t.nodeType && relocateSlotContent(t);
 }
}, isNodeLocatedInSlot = (e, t) => 1 === e.nodeType ? null === e.getAttribute("slot") && "" === t || e.getAttribute("slot") === t : e["s-sn"] === t || "" === t, callNodeRefs = e => {
 (e.$attrs$ && e.$attrs$.ref && e.$attrs$.ref(null), e.$children$ && e.$children$.map(callNodeRefs));
}, renderVdom = (e, t) => {
 const o = e.$hostElement$, n = e.$cmpMeta$, s = e.$vnode$ || newVNode(null, null), l = isHost(t) ? t : h(null, null, t);
 if (hostTagName = o.tagName, BUILD.isDev  ) ;
 if (n.$attrsToReflect$ && (l.$attrs$ = l.$attrs$ || {}, n.$attrsToReflect$.map((([e, t]) => l.$attrs$[t] = o[e]))), 
 l.$tag$ = null, l.$flags$ |= 4, e.$vnode$ = l, l.$elm$ = s.$elm$ = o, 
 (contentRef = o["s-cr"], 
 useNativeShadowDom = supportsShadow, checkSlotFallbackVisibility = !1), patch(s, l), 
 BUILD.slotRelocation) {
  if (plt.$flags$ |= 1, checkSlotRelocate) {
   let e, t, o, n, s, a;
   relocateSlotContent(l.$elm$);
   let r = 0;
   for (;r < relocateNodes.length; r++) e = relocateNodes[r], t = e.$nodeToRelocate$, 
   t["s-ol"] || (o = originalLocationDebugNode(t) , 
   o["s-nr"] = t, t.parentNode.insertBefore(t["s-ol"] = o, t));
   for (r = 0; r < relocateNodes.length; r++) if (e = relocateNodes[r], t = e.$nodeToRelocate$, 
   e.$slotRefNode$) {
    for (n = e.$slotRefNode$.parentNode, s = e.$slotRefNode$.nextSibling, o = t["s-ol"]; o = o.previousSibling; ) if (a = o["s-nr"], 
    a && a["s-sn"] === t["s-sn"] && n === a.parentNode && (a = a.nextSibling, !a || !a["s-nr"])) {
     s = a;
     break;
    }
    (!s && n !== t.parentNode || t.nextSibling !== s) && t !== s && (!t["s-hn"] && t["s-ol"] && (t["s-hn"] = t["s-ol"].parentNode.nodeName), 
    n.insertBefore(t, s));
   } else 1 === t.nodeType && (t.hidden = !0);
  }
  checkSlotFallbackVisibility && updateFallbackSlotVisibility(l.$elm$), plt.$flags$ &= -2, 
  relocateNodes.length = 0;
 }
}, slotReferenceDebugNode = e => doc.createComment(`<slot${e.$name$ ? ' name="' + e.$name$ + '"' : ""}> (host=${hostTagName.toLowerCase()})`), originalLocationDebugNode = e => doc.createComment("org-location for " + (e.localName ? `<${e.localName}> (host=${e["s-hn"]})` : `[${e.textContent}]`)), attachToAncestor = (e, t) => {
 t && !e.$onRenderResolve$ && t["s-p"] && t["s-p"].push(new Promise((t => e.$onRenderResolve$ = t)));
}, scheduleUpdate = (e, t) => {
 if ((e.$flags$ |= 16), 4 & e.$flags$) return void (e.$flags$ |= 512);
 attachToAncestor(e, e.$ancestorComponent$);
 const o = () => dispatchHooks(e, t);
 return writeTask(o) ;
}, dispatchHooks = (e, t) => {
 const n = createTime("scheduleUpdate", e.$cmpMeta$.$tagName$), s = e.$lazyInstance$ ;
 let l;
 return t ? ((e.$flags$ |= 256, e.$queuedListeners$ && (e.$queuedListeners$.map((([e, t]) => safeCall(s, e, t))), 
 e.$queuedListeners$ = null)), (l = safeCall(s, "componentWillLoad"))) : (BUILD.cmpWillUpdate ), n(), then(l, (() => updateComponent(e, s, t)));
}, updateComponent = async (e, t, o) => {
 const n = e.$hostElement$, s = createTime("update", e.$cmpMeta$.$tagName$), l = n["s-rc"];
 o && attachStyles(e);
 const a = createTime("render", e.$cmpMeta$.$tagName$);
 if (await callRender(e, t) , 
 BUILD.hydrateServerSide) try {
  serverSideConnected(n), o && (1 & e.$cmpMeta$.$flags$ ? n["s-en"] = "" : 2 & e.$cmpMeta$.$flags$ && (n["s-en"] = "c"));
 } catch (e) {
  consoleError(e, n);
 }
 if (l && (l.map((e => e())), n["s-rc"] = void 0), a(), s(), 
 BUILD.asyncLoading) {
  const t = n["s-p"], o = () => postUpdateComponent(e);
  0 === t.length ? o() : (Promise.all(t).then(o), e.$flags$ |= 4, t.length = 0);
 }
};

const callRender = (e, t, o) => {
 try {
  if (t = t.render(), (e.$flags$ &= -17), 
  (e.$flags$ |= 2), BUILD.hasRenderFn ) {
   return Promise.resolve(t).then((t => renderVdom(e, t)));
  }
 } catch (t) {
  consoleError(t, e.$hostElement$);
 }
 return null;
}, postUpdateComponent = e => {
 const t = e.$cmpMeta$.$tagName$, o = e.$hostElement$, n = createTime("postUpdate", t), s = e.$lazyInstance$ , l = e.$ancestorComponent$;
 64 & e.$flags$ ? (n()) : (e.$flags$ |= 64, addHydratedFlag(o), 
 (safeCall(s, "componentDidLoad"), 
 BUILD.isDev ), n(), (e.$onReadyResolve$(o), l || appDidLoad())), e.$onInstanceResolve$(o), (e.$onRenderResolve$ && (e.$onRenderResolve$(), 
 e.$onRenderResolve$ = void 0), 512 & e.$flags$ && nextTick((() => scheduleUpdate(e, !1))), 
 e.$flags$ &= -517);
}, appDidLoad = e => {
 addHydratedFlag(doc.documentElement), nextTick((() => emitEvent(win, "appload", {
  detail: {
   namespace: NAMESPACE
  }
 }))), BUILD.profile  ;
}, safeCall = (e, t, o) => {
 if (e && e[t]) try {
  return e[t](o);
 } catch (e) {
  consoleError(e);
 }
}, then = (e, t) => e && e.then ? e.then(t) : t(), addHydratedFlag = e => e.classList.add("hydrated") , serverSideConnected = e => {
 const t = e.children;
 if (null != t) for (let e = 0, o = t.length; e < o; e++) {
  const o = t[e];
  "function" == typeof o.connectedCallback && o.connectedCallback(), serverSideConnected(o);
 }
}, getValue = (e, t) => getHostRef(e).$instanceValues$.get(t), setValue = (e, t, o, n) => {
 const s = getHostRef(e), l = s.$hostElement$ , a = s.$instanceValues$.get(t), r = s.$flags$, i = s.$lazyInstance$ ;
 o = parsePropertyValue(o, n.$members$[t][0]);
 const d = Number.isNaN(a) && Number.isNaN(o), c = o !== a && !d;
 if ((!(8 & r) || void 0 === a) && c && (s.$instanceValues$.set(t, o), 
 i)) {
  if (n.$watchers$ && 128 & r) {
   const e = n.$watchers$[t];
   e && e.map((e => {
    try {
     i[e](o, a, t);
    } catch (e) {
     consoleError(e, l);
    }
   }));
  }
  if (2 == (18 & r)) {
   if (i.componentShouldUpdate && !1 === i.componentShouldUpdate(o, a, t)) return;
   scheduleUpdate(s, !1);
  }
 }
}, proxyComponent = (e, t, o) => {
 if (t.$members$) {
  e.watchers && (t.$watchers$ = e.watchers);
  const n = Object.entries(t.$members$), s = e.prototype;
  if (n.map((([e, [n]]) => {
   (31 & n || (2 & o) && 32 & n) ? Object.defineProperty(s, e, {
    get() {
     return getValue(this, e);
    },
    set(s) {
     setValue(this, e, s, t);
    },
    configurable: !0,
    enumerable: !0
   }) : 1 & o && 64 & n && Object.defineProperty(s, e, {
    value(...t) {
     const o = getHostRef(this);
     return o.$onInstancePromise$.then((() => o.$lazyInstance$[e](...t)));
    }
   });
  })), (1 & o)) {
   const o = new Map;
   s.attributeChangedCallback = function(e, t, n) {
    plt.jmp((() => {
     const t = o.get(e);
     if (this.hasOwnProperty(t)) n = this[t], delete this[t]; else if (s.hasOwnProperty(t) && "number" == typeof this[t] && this[t] == n) return;
     this[t] = (null !== n || "boolean" != typeof this[t]) && n;
    }));
   }, e.observedAttributes = n.filter((([e, t]) => 15 & t[0])).map((([e, n]) => {
    const s = n[1] || e;
    return o.set(s, e), 512 & n[0] && t.$attrsToReflect$.push([ e, s ]), 
    s;
   }));
  }
 }
 return e;
}, initializeComponent = async (e, t, o, n, s) => {
 if (0 == (32 & t.$flags$)) {
  {
   if (t.$flags$ |= 32, (s = loadModule(o)).then) {
    const e = (() => {});
    s = await s, e();
   }
   !s.isProxied && ((o.$watchers$ = s.watchers), 
   proxyComponent(s, o, 2), s.isProxied = !0);
   const e = createTime("createInstance", o.$tagName$);
   (t.$flags$ |= 8);
   try {
    new s(t);
   } catch (e) {
    consoleError(e);
   }
   (t.$flags$ &= -9), (t.$flags$ |= 128), e(), 
   fireConnectedCallback(t.$lazyInstance$);
  }
  if (s.style) {
   let n = s.style;
   const l = getScopeId(o);
   if (!styles.has(l)) {
    const e = createTime("registerStyles", o.$tagName$);
    registerStyle(l, n), e();
   }
  }
 }
 const r = t.$ancestorComponent$, i = () => scheduleUpdate(t, !0);
 r && r["s-rc"] ? r["s-rc"].push(i) : i();
}, fireConnectedCallback = e => {
 safeCall(e, "connectedCallback");
}, connectedCallback = e => {
 if (0 == (1 & plt.$flags$)) {
  const t = getHostRef(e), o = t.$cmpMeta$, n = createTime("connectedCallback", o.$tagName$);
  if (1 & t.$flags$) addHostEventListeners(e, t, o.$listeners$), fireConnectedCallback(t.$lazyInstance$); else {
   let n;
   if (t.$flags$ |= 1, (n = e.getAttribute("s-id"), n)) {
    ((e, t, o, n) => {
     const s = createTime("hydrateClient", t), l = e.shadowRoot, a = [], r = null, i = n.$vnode$ = newVNode(t, null);
     plt.$orgLocNodes$ || initializeDocumentHydrate(doc.body, plt.$orgLocNodes$ = new Map), 
     e["s-id"] = o, e.removeAttribute("s-id"), clientHydrate(i, a, [], r, e, e, o), a.map((e => {
      const o = e.$hostId$ + "." + e.$nodeId$, n = plt.$orgLocNodes$.get(o), s = e.$elm$;
      n && supportsShadow && "" === n["s-en"] && n.parentNode.insertBefore(s, n.nextSibling), 
      l || (s["s-hn"] = t, n && (s["s-ol"] = n, s["s-ol"]["s-nr"] = s)), plt.$orgLocNodes$.delete(o);
     })), s();
    })(e, o.$tagName$, n, t);
   }
   if (!n && (BUILD.hydrateServerSide ) && setContentReference(e), 
   BUILD.asyncLoading) {
    let o = e;
    for (;o = o.parentNode || o.host; ) if (1 === o.nodeType && o.hasAttribute("s-id") && o["s-p"] || o["s-p"]) {
     attachToAncestor(t, t.$ancestorComponent$ = o);
     break;
    }
   }
   initializeComponent(e, t, o);
  }
  n();
 }
}, setContentReference = e => {
 const t = e["s-cr"] = doc.createComment("");
 t["s-cn"] = !0, e.insertBefore(t, e.firstChild);
}, Fragment = (e, t) => t, addHostEventListeners = (e, t, o, n) => {
 o && (o.map((([o, n, s]) => {
  const l = getHostListenerTarget(e, o) , a = hostListenerProxy(t, s), r = hostListenerOpts(o);
  plt.ael(l, n, a, r), (t.$rmListeners$ = t.$rmListeners$ || []).push((() => plt.rel(l, n, a, r)));
 })));
}, hostListenerProxy = (e, t) => o => {
 try {
  256 & e.$flags$ ? e.$lazyInstance$[t](o) : (e.$queuedListeners$ = e.$queuedListeners$ || []).push([ t, o ]) ;
 } catch (e) {
  consoleError(e);
 }
}, getHostListenerTarget = (e, t) => 4 & t ? doc : 8 & t ? win : e, hostListenerOpts = e => 0 != (2 & e), insertVdomAnnotations = (e, t) => {
 if (null != e) {
  const o = {
   hostIds: 0,
   rootLevelIds: 0,
   staticComponents: new Set(t)
  }, n = [];
  parseVNodeAnnotations(e, e.body, o, n), n.forEach((t => {
   if (null != t) {
    const n = t["s-nr"];
    let s = n["s-host-id"], l = n["s-node-id"], a = `${s}.${l}`;
    if (null == s) if (s = 0, o.rootLevelIds++, l = o.rootLevelIds, a = `${s}.${l}`, 
    1 === n.nodeType) n.setAttribute("c-id", a); else if (3 === n.nodeType) {
     if (0 === s && "" === n.nodeValue.trim()) return void t.remove();
     const o = e.createComment(a);
     o.nodeValue = `t.${a}`, n.parentNode.insertBefore(o, n);
    }
    let r = `o.${a}`;
    const i = t.parentElement;
    i && ("" === i["s-en"] ? r += "." : "c" === i["s-en"] && (r += ".c")), t.nodeValue = r;
   }
  }));
 }
}, parseVNodeAnnotations = (e, t, o, n) => {
 null != t && (null != t["s-nr"] && n.push(t), 1 === t.nodeType && t.childNodes.forEach((t => {
  const s = getHostRef(t);
  if (null != s && !o.staticComponents.has(t.nodeName.toLowerCase())) {
   const n = {
    nodeIds: 0
   };
   insertVNodeAnnotations(e, t, s.$vnode$, o, n);
  }
  parseVNodeAnnotations(e, t, o, n);
 })));
}, insertVNodeAnnotations = (e, t, o, n, s) => {
 if (null != o) {
  const l = ++n.hostIds;
  if (t.setAttribute("s-id", l), null != t["s-cr"] && (t["s-cr"].nodeValue = `r.${l}`), 
  null != o.$children$) {
   const t = 0;
   o.$children$.forEach(((o, n) => {
    insertChildVNodeAnnotations(e, o, s, l, t, n);
   }));
  }
  if (t && o && o.$elm$ && !t.hasAttribute("c-id")) {
   const e = t.parentElement;
   if (e && e.childNodes) {
    const n = Array.from(e.childNodes), s = n.find((e => 8 === e.nodeType && e["s-sr"]));
    if (s) {
     const e = n.indexOf(t) - 1;
     o.$elm$.setAttribute("c-id", `${s["s-host-id"]}.${s["s-node-id"]}.0.${e}`);
    }
   }
  }
 }
}, insertChildVNodeAnnotations = (e, t, o, n, s, l) => {
 const a = t.$elm$;
 if (null == a) return;
 const r = o.nodeIds++, i = `${n}.${r}.${s}.${l}`;
 if (a["s-host-id"] = n, a["s-node-id"] = r, 1 === a.nodeType) a.setAttribute("c-id", i); else if (3 === a.nodeType) {
  const t = a.parentNode, o = t.nodeName;
  if ("STYLE" !== o && "SCRIPT" !== o) {
   const o = `t.${i}`, n = e.createComment(o);
   t.insertBefore(n, a);
  }
 } else if (8 === a.nodeType && a["s-sr"]) {
  const e = `s.${i}.${a["s-sn"] || ""}`;
  a.nodeValue = e;
 }
 if (null != t.$children$) {
  const l = s + 1;
  t.$children$.forEach(((t, s) => {
   insertChildVNodeAnnotations(e, t, o, n, l, s);
  }));
 }
}, hAsync = (e, t, ...o) => {
 if (Array.isArray(o) && o.length > 0) {
  const n = o.flat(1 / 0);
  return n.some(isPromise) ? Promise.all(n).then((o => h(e, t, ...o))).catch((o => h(e, t))) : h(e, t, ...o);
 }
 return h(e, t);
}, NO_HYDRATE_TAGS = new Set([ "CODE", "HEAD", "IFRAME", "INPUT", "OBJECT", "OUTPUT", "NOSCRIPT", "PRE", "SCRIPT", "SELECT", "STYLE", "TEMPLATE", "TEXTAREA" ]);

const cmpModules = new Map, getModule = e => {
 if ("string" == typeof e) {
  e = e.toLowerCase();
  const t = cmpModules.get(e);
  if (null != t) return t[e];
 }
 return null;
}, loadModule = (e, t, o) => getModule(e.$tagName$), isMemberInElement = (e, t) => {
 if (null != e) {
  if (t in e) return !0;
  const o = getModule(e.nodeName);
  if (null != o) {
   const e = o;
   if (null != e && null != e.cmpMeta && null != e.cmpMeta.$members$) return t in e.cmpMeta.$members$;
  }
 }
 return !1;
}, registerComponents = e => {
 for (const t of e) {
  const e = t.cmpMeta.$tagName$;
  cmpModules.set(e, {
   [e]: t
  });
 }
}, win = window, doc = win.document, writeTask = e => {
 process.nextTick((() => {
  try {
   e();
  } catch (e) {
   consoleError(e);
  }
 }));
}, resolved = Promise.resolve(), nextTick = e => resolved.then(e), defaultConsoleError = e => {
 null != e && console.error(e.stack || e.message || e);
}, consoleError = (e, t) => (defaultConsoleError)(e, t), plt = {
 $flags$: 0,
 $resourcesUrl$: "",
 jmp: e => e(),
 raf: e => requestAnimationFrame(e),
 ael: (e, t, o, n) => e.addEventListener(t, o, n),
 rel: (e, t, o, n) => e.removeEventListener(t, o, n),
 ce: (e, t) => new win.CustomEvent(e, t)
}, supportsShadow = !1, hostRefs = new WeakMap, getHostRef = e => hostRefs.get(e), registerInstance = (e, t) => hostRefs.set(t.$lazyInstance$ = e, t), registerHost = (e, t) => {
 const o = {
  $flags$: 0,
  $cmpMeta$: t,
  $hostElement$: e,
  $instanceValues$: new Map,
  $renderCount$: 0
 };
 return o.$onInstancePromise$ = new Promise((e => o.$onInstanceResolve$ = e)), o.$onReadyPromise$ = new Promise((e => o.$onReadyResolve$ = e)), 
 e["s-p"] = [], e["s-rc"] = [], addHostEventListeners(e, o, t.$listeners$), hostRefs.set(e, o);
}, styles = new Map;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const minmax = (value, min, max) => Math.max(Math.min(value, max), min);
const getWindow$1 = () => window;
const toggleItem = (arr, value) => (arr.includes(value) ? arr.filter(i => i !== value) : [...arr, value]);
const castArray = (arr) => (Array.isArray(arr) ? arr : [arr]);
const enqueueIdleCallback = (callback, options) => {
  const win = getWindow$1();
  if (win && 'requestIdleCallback' in win) {
    win.requestIdleCallback(callback, options);
  }
  else {
    setTimeout(callback, (options === null || options === void 0 ? void 0 : options.timeout) + 1);
  }
};
const findTarget = (target, baseElement) => {
  var _a;
  if (target) {
    if (typeof target === 'string') {
      const base = baseElement !== null && baseElement !== void 0 ? baseElement : (_a = getWindow$1()) === null || _a === void 0 ? void 0 : _a.document;
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
  const base = baseElement !== null && baseElement !== void 0 ? baseElement : (_a = getWindow$1()) === null || _a === void 0 ? void 0 : _a.document.documentElement;
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

const brxAccordionLegacyCss = "brx-accordion-legacy{display:block;background:var(--bg-color);border-top:1px solid var(--color-secondary-04)}brx-accordion-legacy[negative]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color);--bg-color:var(--background-dark)}";

class BrxAccordionLegacy {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.single = false;
    this.negative = false;
    this.entries = undefined;
  }
  get childEntryItems() {
    return findTargets('brx-accordion-legacy-entry-item', this.el);
  }
  get parsedEntries() {
    const incomingEntries = tryParseJSON(this.entries);
    if (Array.isArray(incomingEntries)) {
      return incomingEntries;
    }
    return [];
  }
  handleCollapseChange(event) {
    const detail = event.detail;
    const { active } = detail;
    if (this.single && active) {
      this.handleCollapseSingle(detail);
    }
  }
  handleCollapseSingle(targetItem) {
    const remainingItems = this.childEntryItems.filter(i => i !== targetItem);
    for (const remainingItem of remainingItems) {
      remainingItem.active = false;
    }
  }
  render() {
    return (hAsync(Host, null, this.parsedEntries.map(entry => (hAsync("brx-accordion-legacy-entry", { key: entry.id }, hAsync("div", { slot: "title" }, entry.title), hAsync("div", { slot: "content" }, entry.content)))), hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get style() { return brxAccordionLegacyCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-accordion-legacy",
    "$members$": {
      "single": [516],
      "negative": [516],
      "entries": [8]
    },
    "$listeners$": [[0, "collapseChange", "handleCollapseChange"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["single", "single"], ["negative", "negative"]]
  }; }
}

const brxAccordionLegacyEntryCss = "brx-accordion-legacy-entry{display:block}";

class BrxAccordionLegacyEntry {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.content = undefined;
    this.entryId = undefined;
    this.headerTitle = undefined;
  }
  componentWillLoad() {
    if (this.entryId === undefined) {
      this.entryId = generateUniqueId();
    }
  }
  render() {
    return (hAsync(Host, null, hAsync("brx-accordion-legacy-entry-item", { entryId: this.entryId }, hAsync("slot", { name: "title" }, this.headerTitle)), hAsync("brx-accordion-legacy-entry-content", { entryId: this.entryId }, hAsync("slot", { name: "content" }, this.content))));
  }
  static get style() { return brxAccordionLegacyEntryCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-accordion-legacy-entry",
    "$members$": {
      "content": [513],
      "entryId": [1537, "entry-id"],
      "headerTitle": [513, "header-title"]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["content", "content"], ["entryId", "entry-id"], ["headerTitle", "header-title"]]
  }; }
}

const brxAccordionLegacyEntryContentCss = "brx-accordion-legacy-entry-content{color:var(--text-color);display:none;font-size:var(--font-size-scale-base);margin:0 var(--spacing-scale-base);padding:var(--spacing-scale-base) var(--spacing-scale-8x) var(--spacing-scale-2x)}brx-accordion-legacy-entry-content *:last-child{margin-bottom:0}";

class BrxAccordionLegacyEntryContent {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entryId = undefined;
  }
  render() {
    return (hAsync(Host, Object.assign({}, (this.entryId ? { id: this.entryId } : {})), hAsync("slot", null)));
  }
  static get style() { return brxAccordionLegacyEntryContentCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-accordion-legacy-entry-content",
    "$members$": {
      "entryId": [513, "entry-id"]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["entryId", "entry-id"]]
  }; }
}

// This file was based on the core/utils/helpers from the Ionic Framework (MIT)
// https://github.com/ionic-team/ionic-framework/blob/d13a14658df2723aff908a94181cb563cb1f5b43/core/src/utils/helpers.ts#L79-L179
/**
 * List of available ARIA attributes + `role`.
 * Removed deprecated attributes.
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes
 */
const ariaAttributes = [
  'role',
  'aria-activedescendant',
  'aria-atomic',
  'aria-autocomplete',
  'aria-braillelabel',
  'aria-brailleroledescription',
  'aria-busy',
  'aria-checked',
  'aria-colcount',
  'aria-colindex',
  'aria-colindextext',
  'aria-colspan',
  'aria-controls',
  'aria-current',
  'aria-describedby',
  'aria-description',
  'aria-details',
  'aria-disabled',
  'aria-errormessage',
  'aria-expanded',
  'aria-flowto',
  'aria-haspopup',
  'aria-hidden',
  'aria-invalid',
  'aria-keyshortcuts',
  'aria-label',
  'aria-labelledby',
  'aria-level',
  'aria-live',
  'aria-multiline',
  'aria-multiselectable',
  'aria-orientation',
  'aria-owns',
  'aria-placeholder',
  'aria-posinset',
  'aria-pressed',
  'aria-readonly',
  'aria-relevant',
  'aria-required',
  'aria-roledescription',
  'aria-rowcount',
  'aria-rowindex',
  'aria-rowindextext',
  'aria-rowspan',
  'aria-selected',
  'aria-setsize',
  'aria-sort',
  'aria-valuemax',
  'aria-valuemin',
  'aria-valuenow',
  'aria-valuetext',
];
/**
 * Elements inside of web components sometimes need to inherit global attributes
 * set on the host. For example, the inner input in `ion-input` should inherit
 * the `title` attribute that developers set directly on `ion-input`. This
 * helper function should be called in componentWillLoad and assigned to a variable
 * that is later used in the render function.
 *
 * This does not need to be reactive as changing attributes on the host element
 * does not trigger a re-render.
 */
const inheritAttributes = (el, attributes = []) => {
  const attributeObject = {};
  attributes.forEach(attr => {
    if (el.hasAttribute(attr)) {
      const value = el.getAttribute(attr);
      if (value !== null) {
        attributeObject[attr] = el.getAttribute(attr);
      }
      el.removeAttribute(attr);
    }
  });
  return attributeObject;
};
/**
 * Returns an array of aria attributes that should be copied from
 * the shadow host element to a target within the light DOM.
 * @param el The element that the attributes should be copied from.
 * @param ignoreList The list of aria-attributes to ignore reflecting and removing from the host.
 * Use this in instances where we manually specify aria attributes on the `<Host>` element.
 */
const inheritAriaAttributes = (el, ignoreList) => {
  let attributesToInherit = ariaAttributes;
  if (ignoreList && ignoreList.length > 0) {
    attributesToInherit = attributesToInherit.filter(attr => !ignoreList.includes(attr));
  }
  return inheritAttributes(el, attributesToInherit);
};

const brxAccordionLegacyEntryItemCss = "brx-accordion-legacy-entry-item{border-bottom:1px solid var(--color-secondary-04);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}brx-accordion-legacy-entry-item .header{--bg-color:transparent;background:var(--bg-color);border:0;color:var(--interactive);display:-ms-flexbox;display:flex;font-size:var(--font-size-scale-up-01);-ms-flex-pack:justify;justify-content:space-between;outline:none;padding:var(--spacing-scale-2x) 0;text-align:left;text-decoration:none;width:100%}brx-accordion-legacy-entry-item .header brx-icon{margin:0 var(--spacing-scale-2x) 0 var(--spacing-scale-baseh)}brx-accordion-legacy-entry-item .header .title{-ms-flex:1;flex:1;margin:0}brx-accordion-legacy-entry-item .header:focus{outline:none}brx-accordion-legacy-entry-item .header.focus-visible,brx-accordion-legacy-entry-item .header:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-accordion-legacy-entry-item .header:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-accordion-legacy-entry-item[active]{border-bottom:0}brx-accordion-legacy-entry-item[active] .header{font-weight:var(--font-weight-semi-bold)}brx-accordion-legacy-entry-item[active]+brx-accordion-legacy-entry-content{border-bottom:1px solid var(--color-secondary-04);display:block}";

class BrxAccordionLegacyEntryItem {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.collapseChangeEmitter = createEvent(this, "collapseChange", 7);
    this.inheritedAttributes = {};
    this.active = false;
    this.entryId = undefined;
  }
  handleChange() {
    this.collapseChangeEmitter.emit(this.el);
  }
  handleClick() {
    this.active = !this.active;
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAriaAttributes(this.el);
  }
  render() {
    const iconName = this.active ? 'angle-up' : 'angle-down';
    const attrs = Object.assign({}, (this.entryId ? { ['aria-controls']: this.entryId } : {}));
    return (hAsync(Host, null, hAsync("button", Object.assign({ class: "header", type: "button" }, attrs, this.inheritedAttributes), hAsync("span", { class: "icon" }, hAsync("brx-icon", { name: iconName })), hAsync("div", { class: "title" }, hAsync("slot", null)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["handleChange"]
  }; }
  static get style() { return brxAccordionLegacyEntryItemCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-accordion-legacy-entry-item",
    "$members$": {
      "active": [1540],
      "entryId": [513, "entry-id"]
    },
    "$listeners$": [[0, "click", "handleClick"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["active", "active"], ["entryId", "entry-id"]]
  }; }
}

const getCollapseTriggerProps = (self) => {
  const { useIcons, breakpoint, iconToHide, iconToShow, target } = self;
  return { useIcons, breakpoint, iconToHide, iconToShow, target };
};

const brxAccordionTriggerCss = "brx-accordion-trigger{display:block}";

class BrxAccordionTrigger {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.useIcons = true;
    this.breakpoint = undefined;
    this.iconToHide = 'fa5/fas/chevron-up';
    this.iconToShow = 'fa5/fas/chevron-down';
    this.target = undefined;
    this.group = undefined;
  }
  getGroupAccordionTriggers() {
    return findTargets(`brx-accordion-trigger[group="${this.group}"]`);
  }
  getOtherGroupAccordionTriggers() {
    const groupAccordions = this.getGroupAccordionTriggers();
    return groupAccordions.filter(i => i !== this.el);
  }
  async closeOtherAccordionTriggers() {
    const otherAccordions = this.getOtherGroupAccordionTriggers();
    for (const accordion of otherAccordions) {
      await accordion.close();
    }
  }
  async handleClick() {
    const isOpen = await this.collapseTriggerEl.getIsOpen();
    if (isOpen) {
      await this.closeOtherAccordionTriggers();
    }
  }
  async close() {
    await this.collapseTriggerEl.close(false);
  }
  get collapseTriggerProps() {
    return getCollapseTriggerProps(this);
  }
  render() {
    return (hAsync(Host, null, hAsync("brx-collapse-trigger", Object.assign({}, this.collapseTriggerProps, { onBrxTriggerClick: () => this.handleClick(), ref: el => void (this.collapseTriggerEl = el) }), hAsync("slot", null))));
  }
  get el() { return getElement(this); }
  static get style() { return brxAccordionTriggerCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-accordion-trigger",
    "$members$": {
      "useIcons": [4, "use-icons"],
      "breakpoint": [1],
      "iconToHide": [1, "icon-to-hide"],
      "iconToShow": [1, "icon-to-show"],
      "target": [513],
      "group": [513],
      "close": [64]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["target", "target"], ["group", "group"]]
  }; }
}

const brxAvatarCss = "brx-avatar{--avatar-size:var(--avatar-small);--avatar-icon-size:var(--avatar-icon-small);--avatar-text-size:var(--avatar-text-small);--avatar-small:40px;--avatar-medium:100px;--avatar-large:160px;--avatar-icon-small:var(--icon-size-2x);--avatar-icon-medium:var(--icon-size-5x);--avatar-icon-large:var(--icon-size-8x);--avatar-text-small:var(--font-size-scale-up-03);--avatar-text-medium:var(--font-size-scale-up-07);--avatar-text-large:var(--font-size-scale-up-11);-ms-flex-align:center;align-items:center;background-color:transparent;border:0;display:-ms-inline-flexbox;display:inline-flex;font-size:var(--avatar-text-size);font-weight:var(--font-weight-bold);-ms-flex-pack:center;justify-content:center;line-height:var(--avatar-size);vertical-align:middle}brx-avatar .content{-ms-flex-align:center;align-items:center;background-color:var(--blue-10);border-radius:50%;color:var(--blue-warm-20);display:-ms-inline-flexbox;display:inline-flex;font-size:var(--avatar-text-size);height:var(--avatar-size);-ms-flex-pack:center;justify-content:center;overflow:hidden;text-align:center;text-transform:uppercase;vertical-align:inherit;width:var(--avatar-size)}brx-avatar .content img{height:var(--avatar-size);vertical-align:inherit;width:var(--avatar-size)}brx-avatar .content .svg-inline--fa,brx-avatar .content .fa,brx-avatar .content .fab,brx-avatar .content .fad,brx-avatar .content .fal,brx-avatar .content .far,brx-avatar .content .fas{--icon-size:var(--avatar-icon-size);margin-top:0.25em}brx-avatar.is-small,brx-avatar.small,brx-avatar[small],brx-avatar[size=small]{--avatar-size:var(--avatar-small);--avatar-icon-size:var(--avatar-icon-small);--avatar-text-size:var(--avatar-text-small)}brx-avatar.is-medium,brx-avatar.medium,brx-avatar[medium],brx-avatar[size=medium]{--avatar-size:var(--avatar-medium);--avatar-icon-size:var(--avatar-icon-medium);--avatar-text-size:var(--avatar-text-medium)}brx-avatar.is-large,brx-avatar.large,brx-avatar[large],brx-avatar[size=large]{--avatar-size:var(--avatar-large);--avatar-icon-size:var(--avatar-icon-large);--avatar-text-size:var(--avatar-text-large)}brx-avatar .brx-avatar-action,brx-avatar .br-avatar-action,brx-avatar brx-avatar-action{background:transparent;border:0}brx-avatar .brx-avatar-action:not([data-disable-hover-interaction]):not(:disabled):hover,brx-avatar .br-avatar-action:not([data-disable-hover-interaction]):not(:disabled):hover,brx-avatar brx-avatar-action:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-avatar .brx-avatar-action:focus,brx-avatar .br-avatar-action:focus,brx-avatar brx-avatar-action:focus{outline:none}brx-avatar .brx-avatar-action.focus-visible,brx-avatar .brx-avatar-action:focus-visible,brx-avatar .br-avatar-action.focus-visible,brx-avatar .br-avatar-action:focus-visible,brx-avatar brx-avatar-action.focus-visible,brx-avatar brx-avatar-action:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-avatar[data-toggle=dropdown]:focus{outline:none}brx-avatar[data-toggle=dropdown].focus-visible,brx-avatar[data-toggle=dropdown]:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-avatar .image,brx-avatar .letter{-ms-flex-align:center;align-items:center;background-color:var(--blue-10);border-radius:50%;color:var(--blue-warm-20);display:-ms-inline-flexbox;display:inline-flex;font-size:var(--avatar-text-size);height:var(--avatar-size);-ms-flex-pack:center;justify-content:center;overflow:hidden;text-align:center;text-transform:uppercase;vertical-align:inherit;width:var(--avatar-size)}brx-avatar .image img,brx-avatar .letter img{height:var(--avatar-size);vertical-align:inherit;width:var(--avatar-size)}brx-avatar .image .svg-inline--fa,brx-avatar .image .fa,brx-avatar .image .fab,brx-avatar .image .fad,brx-avatar .image .fal,brx-avatar .image .far,brx-avatar .image .fas,brx-avatar .letter .svg-inline--fa,brx-avatar .letter .fa,brx-avatar .letter .fab,brx-avatar .letter .fad,brx-avatar .letter .fal,brx-avatar .letter .far,brx-avatar .letter .fas{--icon-size:var(--avatar-icon-size);margin-top:0.25em}";

class BrxAvatar {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'small';
    this.src = undefined;
    this.alt = undefined;
    this.name = undefined;
    this.mode = undefined;
    this.contentClass = undefined;
  }
  render() {
    var _a, _b;
    const mode = (_a = this.mode) !== null && _a !== void 0 ? _a : (this.src ? 'picture' : this.name ? 'name' : 'icon');
    const contentClass = `content ${this.contentClass}`;
    return (hAsync(Host, null, mode === 'picture' && (hAsync("span", { class: contentClass }, hAsync("img", { src: this.src, alt: (_b = this.alt) !== null && _b !== void 0 ? _b : 'Avatar' }))), mode === 'name' && (hAsync("span", { class: contentClass, "data-class": "content bg-green-50 text-pure-0" }, this.name[0])), mode === 'icon' && (hAsync("span", { class: contentClass }, hAsync("brx-icon", { name: "fa5/fas/user" })))));
  }
  static get style() { return brxAvatarCss; }
  static get cmpMeta() { return {
    "$flags$": 0,
    "$tagName$": "brx-avatar",
    "$members$": {
      "size": [513],
      "src": [513],
      "alt": [513],
      "name": [513],
      "mode": [513],
      "contentClass": [513, "content-class"]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["size", "size"], ["src", "src"], ["alt", "alt"], ["name", "name"], ["mode", "mode"], ["contentClass", "content-class"]]
  }; }
}

const brxBreadcrumbCss = "brx-breadcrumb{display:inline-grid;font-size:var(--font-size-scale-down-01);font-weight:var(--font-weight-medium);position:relative}brx-breadcrumb brx-breadcrumb-list{-ms-flex-align:center;align-items:center;border:0;display:-ms-flexbox;display:flex;list-style:none;margin:0;overflow-x:auto;overflow-y:hidden;padding:0}brx-breadcrumb brx-breadcrumb-list brx-breadcrumb-item:not(.menu-mobil):not(:nth-child(1)){-ms-flex-order:2;order:2}brx-breadcrumb brx-breadcrumb-list brx-breadcrumb-item:nth-child(1){-ms-flex-order:0;order:0}brx-breadcrumb brx-breadcrumb-list brx-breadcrumb-item.menu-mobil{-ms-flex-order:1;order:1}brx-breadcrumb brx-breadcrumb-item{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;height:var(--spacing-scale-5x);margin:auto 0 auto -5px}brx-breadcrumb brx-breadcrumb-item brx-icon.icon{color:var(--border-color);font-size:var(--icon-size-sm);margin-right:-6px}brx-breadcrumb brx-breadcrumb-item brx-tooltip{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}brx-breadcrumb brx-breadcrumb-item a{display:inline-block;max-width:180px;overflow:hidden;padding:0 6px;text-decoration:none;text-overflow:ellipsis;white-space:nowrap}brx-breadcrumb brx-breadcrumb-item:last-child span{font-weight:var(--font-weight-medium);padding:0 0 0 var(--spacing-scale-base);white-space:nowrap}brx-breadcrumb brx-breadcrumb-item[home],brx-breadcrumb .menu-mobil{--focus-offset:calc(var(--spacing-scale-half) * -1);margin-left:0;margin-right:-3px}@media (max-width: 991px){brx-breadcrumb brx-breadcrumb-item a:not(.brx-button-native){display:block;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}brx-breadcrumb .menu-mobil,brx-breadcrumb .menu-mobil+brx-breadcrumb-item,brx-breadcrumb brx-breadcrumb-item[home]+brx-breadcrumb-item{display:-ms-flexbox;display:flex}}brx-breadcrumb brx-breadcrumb-card{left:var(--spacing-scale-9x);min-width:-webkit-fit-content;min-width:-moz-fit-content;min-width:fit-content;position:absolute;top:var(--spacing-scale-7x);z-index:var(--z-index-layer-1)}brx-breadcrumb brx-item{color:var(--color);cursor:pointer;padding:0}brx-breadcrumb brx-item:not(:last-child){border-bottom:1px solid var(--border-color)}brx-breadcrumb brx-item a{--interactive:var(--color);--interactive-rgb:var(--color-rgb);display:block;padding:var(--spacing-scale-2x)}@media (max-width: 575px){brx-breadcrumb .menu-mobil>brx-icon{display:none}brx-breadcrumb brx-breadcrumb-card{left:var(--spacing-scale-base);width:250px}}";

class BrxBreadcrumb {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dropdownId = undefined;
  }
  getItems() {
    return findTargets('brx-breadcrumb-list brx-breadcrumb-item', this.el);
  }
  setMenuMobileVisibility(isVisible) {
    const { menuMobileEl } = this;
    if (menuMobileEl) {
      if (isVisible) {
        menuMobileEl.removeAttribute('hidden');
      }
      else {
        menuMobileEl.setAttribute('hidden', '');
      }
    }
  }
  showMenuMobile() {
    this.setMenuMobileVisibility(true);
  }
  hideMenuMobile() {
    this.setMenuMobileVisibility(true);
  }
  setView() {
    this.reset();
    const win = getWindow$1();
    const hideAllBreakpoint = win.innerWidth < 575;
    for (const list of Array.from(this.el.querySelectorAll('brx-breadcrumb-list'))) {
      const items = Array.from(list.querySelectorAll('brx-breadcrumb-item')).filter(item => !item.active && !item.matches('.menu-mobil'));
      const partialHideBreakpoint = (!hideAllBreakpoint && list.scrollWidth > list.offsetWidth) || items.length > 5;
      const itemsToHide = [
        ...(hideAllBreakpoint && items.length !== 1 ? items : []),
        ...(partialHideBreakpoint ? items.filter((_, index) => index > 0 && index < items.length - 1) : []),
      ];
      for (const item of itemsToHide) {
        item.classList.add('d-none');
      }
      if (itemsToHide.length) {
        this.showMenuMobile();
      }
    }
  }
  reset() {
    this.hideMenuMobile();
    const items = this.getItems();
    for (const item of items) {
      if (item.matches('.menu-mobil')) {
        continue;
      }
      item.classList.remove('d-none');
    }
  }
  handleGlobalResize() {
    this.setView();
  }
  componentWillLoad() {
    if (!this.dropdownId) {
      this.dropdownId = generateUniqueId();
    }
  }
  componentDidLoad() {
    this.setView();
  }
  render() {
    const { dropdownId } = this;
    return (hAsync(Host, null, hAsync("brx-breadcrumb-list", null, hAsync("brx-breadcrumb-item", { hidden: true, class: "menu-mobil" }, hAsync("brx-dropdown-trigger", { target: `#${dropdownId}`, iconToShow: "fa5/fas/folder-plus", iconToHide: "fa5/fas/folder-minus" }, hAsync("brx-button", { circle: true }, hAsync("span", { class: "sr-only" }, "Bot\u00E3o Menu"), hAsync("brx-icon", { "data-collapse-icon": "", name: "fa5/fas/folder-plus" })))), hAsync("slot", null)), hAsync("brx-breadcrumb-card", { id: dropdownId, hidden: true })));
  }
  get el() { return getElement(this); }
  static get style() { return brxBreadcrumbCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-breadcrumb",
    "$members$": {
      "dropdownId": [1537, "dropdown-id"]
    },
    "$listeners$": [[9, "resize", "handleGlobalResize"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["dropdownId", "dropdown-id"]]
  }; }
}

const brxBreadcrumbCardCss = "brx-breadcrumb-card{display:block}";

class BrxBreadcrumbCard {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hidden = undefined;
    this.cardItems = [];
  }
  get breadcrumbEl() {
    return this.el.closest('brx-breadcrumb');
  }
  async getCardItems() {
    const allItems = Array.from(this.breadcrumbEl.querySelectorAll('brx-breadcrumb-list brx-breadcrumb-item'));
    const targetItems = allItems.filter(i => !i.home && !i.active && !i.matches('.menu-mobil'));
    return Promise.all(targetItems.map(async (item) => { var _a, _b; return ({ id: (_a = item.id) !== null && _a !== void 0 ? _a : generateUniqueId(), content: (_b = item.querySelector('a')) === null || _b === void 0 ? void 0 : _b.outerHTML }); }));
  }
  async syncCardItems() {
    this.cardItems = await this.getCardItems();
  }
  async componentWillLoad() {
    await this.syncCardItems();
  }
  render() {
    const { cardItems } = this;
    return (hAsync(Host, null, hAsync("brx-card", null, cardItems.map(item => (hAsync("brx-item", { passStyles: true, key: item.id, innerHTML: item.content }))))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "hidden": ["syncCardItems"]
  }; }
  static get style() { return brxBreadcrumbCardCss; }
  static get cmpMeta() { return {
    "$flags$": 0,
    "$tagName$": "brx-breadcrumb-card",
    "$members$": {
      "hidden": [516],
      "cardItems": [32]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["hidden", "hidden"]]
  }; }
}

const brxBreadcrumbItemCss = "";

class BrxBreadcrumbItem {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.home = false;
    this.active = false;
  }
  render() {
    return (hAsync(Host, null, !this.home && (hAsync(Fragment, null, hAsync("brx-icon", { class: "icon", name: "fa5/fas/chevron-right" }))), hAsync("slot", null)));
  }
  static get style() { return brxBreadcrumbItemCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-breadcrumb-item",
    "$members$": {
      "home": [516],
      "active": [516]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["home", "home"], ["active", "active"]]
  }; }
}

const brxBreadcrumbListCss = "";

class BrxBreadcrumbList {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxBreadcrumbListCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-breadcrumb-list",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxButtonCss = "brx-button{display:inline-block;--button-radius:100em;--button-xsmall:24px;--button-small:32px;--button-medium:40px;--button-large:48px;--button-size:var(--button-medium)}brx-button .brx-button-native{-ms-flex-align:center;align-items:center;background-color:transparent;border:0;border-radius:var(--button-radius);color:var(--interactive);cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-semi-bold);height:var(--button-size);-ms-flex-pack:center;justify-content:center;overflow:hidden;padding:0 var(--spacing-scale-3x);position:relative;text-align:center;vertical-align:middle;white-space:nowrap;width:auto}brx-button[block]{display:block}brx-button[block] .brx-button-native{width:100%}@media (min-width: 576px){brx-button.block-sm .brx-button-native{width:100%}brx-button.auto-sm .brx-button-native{width:auto}}@media (min-width: 992px){brx-button.block-md .brx-button-native{width:100%}brx-button.auto-md .brx-button-native{width:auto}}@media (min-width: 1280px){brx-button.block-lg .brx-button-native{width:100%}brx-button.auto-lg .brx-button-native{width:auto}}@media (min-width: 1600px){brx-button.block-xl .brx-button-native{width:100%}brx-button.auto-xl .brx-button-native{width:auto}}brx-button[circle] .brx-button-native{padding:0;border-radius:50%;width:var(--button-size)}brx-button[size=xsmall]{--button-size:var(--button-xsmall)}brx-button[size=small]{--button-size:var(--button-small)}brx-button[size=medium]{--button-size:var(--button-medium)}brx-button[size=large]{--button-size:var(--button-large)}brx-button[variant=primary]{--interactive-rgb:var(--color-dark-rgb)}brx-button[variant=primary] .brx-button-native{background-color:var(--interactive-light);color:var(--color-dark)}brx-button[variant=secondary] .brx-button-native{background-color:var(--background-light);border:1px solid var(--interactive)}brx-button[color=danger]{--interactive-rgb:var(--color-dark-rgb)}brx-button[color=danger] .brx-button-native{background-color:var(--danger)}brx-button[color=danger] .brx-button-native{color:var(--color-dark)}brx-button[color=success]{--interactive-rgb:var(--color-dark-rgb)}brx-button[color=success] .brx-button-native{background-color:var(--success)}brx-button[color=success] .brx-button-native{color:var(--color-dark)}brx-button[color=warning]{--interactive-rgb:var(--color-light-rgb)}brx-button[color=warning] .brx-button-native{background-color:var(--warning)}brx-button[color=warning] .brx-button-native{color:var(--color-light)}brx-button[color=info]{--interactive-rgb:var(--color-dark-rgb)}brx-button[color=info] .brx-button-native{background-color:var(--info)}brx-button[color=info] .brx-button-native{color:var(--color-dark)}brx-button:disabled .brx-button-native,brx-button[disabled] .brx-button-native{cursor:not-allowed}brx-button:not(:disabled):not([disabled]) .brx-button-native{--focus-offset:var(--spacing-scale-half)}brx-button:not(:disabled):not([disabled]) .brx-button-native:focus{outline:none}brx-button:not(:disabled):not([disabled]) .brx-button-native.focus-visible,brx-button:not(:disabled):not([disabled]) .brx-button-native:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-button:not(:disabled):not([disabled]) .brx-button-native:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-button:not(:disabled):not([disabled]) .brx-button-native:not(:disabled):active{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--pressed))), to(rgba(var(--interactive-rgb), var(--pressed))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--pressed)), rgba(var(--interactive-rgb), var(--pressed)))}brx-button[active] .brx-button-native{--hover:var(--hover-dark);background-color:var(--active);color:var(--color-dark)}brx-button brx-loading{width:auto;height:auto}brx-button brx-loading::after{margin:0;border-color:var(--interactive) var(--interactive) transparent;border-style:solid}brx-button[variant=primary] brx-loading::after,brx-button[color=success] brx-loading::after,brx-button[color=danger] brx-loading::after,brx-button[color=info] brx-loading::after{border-color:var(--background) var(--background) transparent}brx-button[dark-mode] .brx-button-native{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color);color:var(--interactive-dark)}brx-button[dark-mode][variant=primary] .brx-button-native{--interactive-rgb:var(--background-dark-rgb);background-color:var(--interactive-dark);color:var(--background-dark)}brx-button[dark-mode][variant=secondary] .brx-button-native{background-color:var(--background-dark)}brx-button[dark-mode][active] .brx-button-native{--hover:var(--hover-light);--interactive-rgb:var(--active-rgb);background-color:var(--background-light);color:var(--active)}brx-button a.brx-button-native{font-weight:var(--font-weight-semi-bold);text-decoration:none !important}brx-button[signin]{--background:var(--gray-2);--sign-in-img:20px}brx-button[signin][variant=default] .brx-button-native{background-color:var(--background)}brx-button[signin] .brx-button-native{padding:0 var(--spacing-scale-2x)}brx-button[signin] .brx-button-native img{max-height:var(--sign-in-img)}brx-button[signin][signin=avatar] .brx-button-native{height:auto;padding:var(--spacing-scale-base)}brx-button[signin][dark-mode]{--background:var(--background-dark)}brx-button[magic]{--magic-size:var(--magic-medium);--magic-small:var(--spacing-scale-4xh);--magic-medium:var(--spacing-scale-5xh);--magic-large:var(--spacing-scale-6xh);--magic-support-size:var(--magic-support-medium);--magic-support-small:var(--spacing-scale-7x);--magic-support-medium:var(--spacing-scale-8x);--magic-support-large:var(--spacing-scale-9x);--magic-z-index:var(--z-index-layer-1);-ms-flex-align:center;align-items:center;background-color:var(--gray-5);border-radius:100em;-webkit-box-shadow:var(--surface-shadow-md);box-shadow:var(--surface-shadow-md);display:-ms-inline-flexbox;display:inline-flex;height:var(--magic-support-size);padding:calc((var(--magic-support-size) - var(--magic-size)) * 0.5)}brx-button[magic][size=small]{--magic-size:var(--magic-small);--magic-support-size:var(--magic-support-small)}brx-button[magic][size=medium]{--magic-size:var(--magic-medium);--magic-support-size:var(--magic-support-medium)}brx-button[magic][size=large]{--magic-size:var(--magic-large);--magic-support-size:var(--magic-support-large)}brx-button[magic] .svg-inline--fa,brx-button[magic] .fa,brx-button[magic] .fab,brx-button[magic] .fad,brx-button[magic] .fal,brx-button[magic] .far,brx-button[magic] .fas{--icon-size:var(--icon-size-lg)}brx-button[magic] .brx-button-native{--focus-offset:calc((var(--magic-support-size) - var(--magic-size)) * 0.5 + 4px);--button-size:var(--magic-size);background-color:var(--interactive-alternative);color:var(--color-dark);font-size:var(--font-size-scale-up-02);font-weight:var(--font-weight-semi-bold)}brx-button[magic] .brx-button-native:not(:disabled):not(.disabled):not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-dark-rgb), var(--hover))), to(rgba(var(--color-dark-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-dark-rgb), var(--hover)), rgba(var(--color-dark-rgb), var(--hover)))}brx-button[magic] .brx-button-native:not(:disabled):not(.disabled):not(:disabled):active{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-dark-rgb), var(--pressed))), to(rgba(var(--color-dark-rgb), var(--pressed))));background-image:linear-gradient(rgba(var(--color-dark-rgb), var(--pressed)), rgba(var(--color-dark-rgb), var(--pressed)))}";

class BrxButton {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxFocus = createEvent(this, "brxFocus", 7);
    this.brxBlur = createEvent(this, "brxBlur", 7);
    // end brx-button props
    this.inheritedAttributes = {};
    this.nativeClass = '';
    this.buttonType = 'button';
    this.disabled = false;
    this.download = undefined;
    this.href = undefined;
    this.rel = undefined;
    this.strong = false;
    this.target = undefined;
    this.type = 'button';
    this.block = false;
    this.circle = false;
    this.darkMode = false;
    this.active = false;
    this.loading = false;
    this.color = undefined;
    this.size = 'medium';
    this.variant = 'default';
    this.signin = false;
    this.magic = false;
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAriaAttributes(this.el);
  }
  render() {
    var _a;
    const { type, disabled, rel, target, href, inheritedAttributes } = this;
    const TagType = href === undefined ? 'button' : 'a';
    const attrs = TagType === 'button'
      ? { type }
      : {
        rel,
        href,
        target,
        download: this.download,
      };
    const allNativeClasses = `brx-button-native ${(_a = this.nativeClass) !== null && _a !== void 0 ? _a : ''}`;
    return (hAsync(Host, { "aria-disabled": disabled ? 'true' : null }, hAsync(TagType, Object.assign({}, attrs, { class: allNativeClasses, "data-size": this.size, part: "native", disabled: disabled }, inheritedAttributes), this.loading && hAsync("brx-loading", { size: "" }, "Carregando"), !this.loading && hAsync("slot", null))));
  }
  get el() { return getElement(this); }
  static get style() { return brxButtonCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-button",
    "$members$": {
      "nativeClass": [513, "native-class"],
      "buttonType": [1025, "button-type"],
      "disabled": [516],
      "download": [1],
      "href": [1],
      "rel": [1],
      "strong": [4],
      "target": [1],
      "type": [1],
      "block": [516],
      "circle": [516],
      "darkMode": [516, "dark-mode"],
      "active": [516],
      "loading": [516],
      "color": [513],
      "size": [513],
      "variant": [513],
      "signin": [520],
      "magic": [516]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["nativeClass", "native-class"], ["disabled", "disabled"], ["block", "block"], ["circle", "circle"], ["darkMode", "dark-mode"], ["active", "active"], ["loading", "loading"], ["color", "color"], ["size", "size"], ["variant", "variant"], ["signin", "signin"], ["magic", "magic"]]
  }; }
}

const brxCardCss = "brx-card{display:block;--card-padding:var(--spacing-scale-2x);--card-height-fixed:250px;background:var(--background);-webkit-box-shadow:var(--surface-shadow-sm);box-shadow:var(--surface-shadow-sm);color:var(--color);margin-bottom:var(--spacing-scale-2x)}brx-card brx-card-content{padding:var(--card-padding)}brx-card brx-card-content *:last-child{margin-bottom:0}brx-card brx-card-header{padding:var(--card-padding) var(--card-padding) 0}brx-card brx-card-footer{padding:0 var(--card-padding) var(--card-padding)}brx-card[h-fixed] brx-card-content{max-height:var(--card-height-fixed);overflow-y:auto}brx-card[h-fixed] brx-card-content::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-card[h-fixed] brx-card-content::-webkit-scrollbar-track{background:var(--gray-10)}brx-card[h-fixed] brx-card-content::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-card[h-fixed] brx-card-content:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-card[h-fixed] brx-card-footer{padding-top:var(--card-padding)}brx-card[hover]:hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-card[dark-mode]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}";

class BrxCard {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hFixed = false;
    this.hover = false;
    this.darkMode = false;
    this.disabled = false;
  }
  watchDisabled() {
    this.syncDisabledState();
  }
  async syncDisabledState() {
    const { disabled } = this;
    const elements = Array.from(this.el.querySelectorAll('button, input, select, textarea'));
    for (const element of elements) {
      if (disabled) {
        element.setAttribute('disabled', 'disabled');
      }
      else {
        element.removeAttribute('disabled');
      }
    }
  }
  componentDidLoad() {
    this.syncDisabledState();
  }
  render() {
    const hostProps = Object.assign({}, (this.disabled ? { 'aria-hidden': 'true' } : {}));
    return (hAsync(Host, Object.assign({}, hostProps), hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["watchDisabled"]
  }; }
  static get style() { return brxCardCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-card",
    "$members$": {
      "hFixed": [516, "h-fixed"],
      "hover": [516],
      "darkMode": [516, "dark-mode"],
      "disabled": [516],
      "syncDisabledState": [64]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["hFixed", "h-fixed"], ["hover", "hover"], ["darkMode", "dark-mode"], ["disabled", "disabled"]]
  }; }
}

const brxCardContentCss = "brx-card-content{display:block}";

class BrxCardContent {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxCardContentCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-card-content",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxCardFooterCss = "brx-card-footer{display:block}";

class BrxCardFooter {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxCardFooterCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-card-footer",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxCardHeaderCss = "brx-card-header{display:block}";

class BrxCardHeader {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxCardHeaderCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-card-header",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const TOKEN_UNCONTROLLED = null;
const isControlled = (value) => value !== TOKEN_UNCONTROLLED;
const getControlledValue = (controlledValue, value, defaultValue) => (isControlled(controlledValue) ? controlledValue : value !== null && value !== void 0 ? value : defaultValue);

const brxCheckboxCss = "brx-checkbox{display:block;--checkbox-padding:var(--spacing-scale-base);--checkbox-size:24px;display:-ms-flexbox;display:flex}brx-checkbox+brx-checkbox{margin-top:var(--spacing-scale-base)}brx-checkbox input{margin:0;opacity:0;position:absolute}brx-checkbox input+label{cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-bottom:0;min-height:var(--checkbox-size);min-width:var(--checkbox-size);padding-left:calc(var(--spacing-scale-base) + var(--checkbox-size));position:relative}brx-checkbox input+label::before{background:var(--background-light);border:1px solid var(--border-color);border-radius:4px;content:\"\";height:var(--checkbox-size);left:0;position:absolute;width:var(--checkbox-size)}brx-checkbox input+label:empty{padding:0}brx-checkbox label{font-weight:var(--font-weight-medium)}brx-checkbox[hidden-label] label{padding-left:calc(var(--checkbox-size) + var(--surface-width-md) * 2);text-indent:-10000px;white-space:nowrap;width:0}brx-checkbox[data-checked] input+label::after{border:solid var(--selected);border-width:0 3px 3px 0;content:\"\";height:var(--icon-size-sm);left:8px;position:absolute;top:4px;-webkit-transform:rotate(45deg);transform:rotate(45deg);width:8px}brx-checkbox[data-indeterminate] input+label::before{--interactive-rgb:var(--color-rgb);background:var(--selected);border-color:var(--selected)}brx-checkbox[data-indeterminate] input:hover:not(:disabled)+label::before{--interactive-rgb:var(--color-dark-rgb)}brx-checkbox[data-indeterminate][data-checked] input+label::after{border-color:var(--background-light);border-width:0 0 3px;top:2px;-webkit-transform:none;transform:none}brx-checkbox[invalid] input:focus-visible+label::before,brx-checkbox[invalid][focus-visible] input+label::before,brx-checkbox[invalid][data-checked] input:focus-visible+label::before,brx-checkbox[invalid][data-checked][focus-visible] input+label::before,brx-checkbox[state~=invalid] input:focus-visible+label::before,brx-checkbox[state~=invalid][focus-visible] input+label::before,brx-checkbox[state~=invalid][data-checked] input:focus-visible+label::before,brx-checkbox[state~=invalid][data-checked][focus-visible] input+label::before{--border-color:var(--focus-color)}brx-checkbox[invalid][data-checked] input+label::before,brx-checkbox[state~=invalid][data-checked] input+label::before{--border-color:var(--danger)}brx-checkbox[invalid] input+label::before,brx-checkbox[state~=invalid] input+label::before{--border-color:var(--danger)}brx-checkbox[valid] input:focus-visible+label::before,brx-checkbox[valid][focus-visible] input+label::before,brx-checkbox[valid][data-checked] input:focus-visible+label::before,brx-checkbox[valid][data-checked][focus-visible] input+label::before,brx-checkbox[state~=valid] input:focus-visible+label::before,brx-checkbox[state~=valid][focus-visible] input+label::before,brx-checkbox[state~=valid][data-checked] input:focus-visible+label::before,brx-checkbox[state~=valid][data-checked][focus-visible] input+label::before{--border-color:var(--focus-color)}brx-checkbox[valid][data-checked] input+label::before,brx-checkbox[state~=valid][data-checked] input+label::before{--border-color:var(--success)}brx-checkbox[valid] input+label::before,brx-checkbox[state~=valid] input+label::before{--border-color:var(--success)}brx-checkbox[size=small] input+label{line-height:var(--spacing-scale-2xh);min-height:var(--spacing-scale-2xh)}brx-checkbox[size=small] input+label::before{height:var(--spacing-scale-2xh);width:var(--spacing-scale-2xh)}brx-checkbox[size=small][data-checked] input+label::after{border-width:0 2px 2px 0;height:var(--icon-size-sm);left:7px;top:6px;width:6px}brx-checkbox[size=small][data-checked][data-indeterminate] input+label::after{border-color:var(--background-light);border-width:0 0 3px;top:2px;-webkit-transform:none;transform:none}brx-checkbox input:focus-visible+label::before,brx-checkbox[focus-visible] input+label::before,brx-checkbox[data-checked] input:focus-visible+label::before,brx-checkbox[data-checked][focus-visible] input+label::before{border-color:var(--focus) !important;-webkit-box-shadow:0 0 0 var(--surface-width-md) var(--focus);box-shadow:0 0 0 var(--surface-width-md) var(--focus);outline:none}brx-checkbox input:invalid+label::before{--border-color:var(--danger)}brx-checkbox input:hover:not(:disabled)+label::before{--interactive-rgb:var(--interactive-light-rgb);background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-checkbox:not(:is([disabled],:disabled)) input:disabled+label{cursor:not-allowed;opacity:var(--disabled)}brx-checkbox:not(:is([disabled],:disabled)) input:disabled+label *{pointer-events:none}brx-checkbox.inverted,brx-checkbox.inverted label,brx-checkbox.dark-mode,brx-checkbox.dark-mode label,brx-checkbox[dark-mode],brx-checkbox[dark-mode] label{color:var(--color-dark)}";

class BrxCheckbox {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.brxUpdate = createEvent(this, "brxUpdate", 7);
    this.brxFocus = createEvent(this, "brxFocus", 7);
    this.brxBlur = createEvent(this, "brxBlur", 7);
    this.syncInProgress = false;
    this.onChange = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const target = event.target;
      target.checked = this.currentChecked;
      this.setFocus();
      this.setState(!this.currentChecked, false);
    };
    this.onBlur = () => {
      this.brxBlur.emit();
    };
    this.onFocus = () => {
      this.brxFocus.emit();
    };
    this.label = undefined;
    this.name = undefined;
    this.checked = null;
    this.controlledChecked = TOKEN_UNCONTROLLED;
    this.indeterminate = false;
    this.currentChecked = false;
    this.currentIndeterminate = false;
    this.disabled = false;
    this.size = 'medium';
    this.valid = undefined;
    this.danger = undefined;
    this.invalid = undefined;
    this.state = undefined;
    this.darkMode = false;
    this.hiddenLabel = false;
    this.inputId = undefined;
    this.value = 'on';
    this.child = undefined;
    this.propParent = undefined;
    this.checkAllLabel = 'Selecionar tudo';
    this.uncheckAllLabel = 'Desselecionar tudo';
  }
  emitUpdateEvent() {
    const value = this.value;
    const checked = this.currentChecked;
    const indeterminate = this.currentIndeterminate;
    this.brxUpdate.emit({ checked, indeterminate, value });
  }
  emitChangeEvent(checked = this.currentChecked, indeterminate = this.currentIndeterminate) {
    const { value } = this;
    this.brxChange.emit({ checked, indeterminate, value });
  }
  syncCurrentChecked() {
    this.currentChecked = this.controlledChecked !== TOKEN_UNCONTROLLED ? this.controlledChecked : this.checked;
  }
  syncCurrentIndeterminate() {
    this.currentIndeterminate = this.indeterminate;
  }
  syncCurrent() {
    this.syncCurrentChecked();
    this.syncCurrentIndeterminate();
  }
  async getCurrentState() {
    return {
      value: this.value,
      checked: this.currentChecked,
      indeterminate: this.currentIndeterminate,
    };
  }
  setState(checked, indeterminate) {
    if (this.controlledChecked === TOKEN_UNCONTROLLED) {
      this.currentChecked = checked;
      this.currentIndeterminate = indeterminate;
    }
    this.emitChangeEvent(checked, indeterminate);
    return Promise.resolve();
  }
  get parent() {
    const { propParent: _parent } = this;
    return _parent === '' ? true : _parent;
  }
  get isParent() {
    return !!this.parent;
  }
  get isChild() {
    return !!this.child;
  }
  getCheckgroupChildren() {
    var _a;
    const parent = this.parent;
    if (parent) {
      const documentChildren = typeof parent === 'string' ? findTargets(`brx-checkbox[child="${parent}"]`) : [];
      const parentGroup = this.el.closest('brx-checkgroup');
      const parentGroupAllCheckboxes = Array.from((_a = parentGroup === null || parentGroup === void 0 ? void 0 : parentGroup.querySelectorAll('brx-checkbox')) !== null && _a !== void 0 ? _a : []);
      const observableCheckboxes = parentGroupAllCheckboxes
        .filter(checkbox => checkbox !== this.el)
        .filter(checkbox => {
        const groupLevel1 = checkbox.closest('brx-checkgroup');
        const groupLevel2 = groupLevel1.parentElement.closest('brx-checkgroup');
        return groupLevel1 === parentGroup || groupLevel2 === parentGroup;
      });
      return [...documentChildren, ...observableCheckboxes];
    }
    return [];
  }
  async getCheckgroupState() {
    const allStates = await Promise.all(this.getCheckgroupChildren().map(i => i.getCurrentState()));
    const currentStates = new Set(allStates.map(state => (state.indeterminate ? 'indeterminate' : state.checked ? 'checked' : 'unchecked')));
    const isChecked = currentStates.has('checked') || currentStates.has('indeterminate');
    const isIndeterminate = currentStates.size > 1;
    const status = isIndeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked';
    return { status, isChecked, isIndeterminate };
  }
  syncCheckgroupParent() {
    if (this.syncInProgress || !this.isParent) {
      return;
    }
    this.syncInProgress = true;
    this.getCheckgroupState().then(({ isChecked, isIndeterminate }) => {
      this.setState(isChecked, isIndeterminate);
      this.syncInProgress = false;
    });
  }
  syncCheckgroupChilds() {
    if (this.syncInProgress || !this.isParent) {
      return;
    }
    this.syncInProgress = true;
    if (!this.currentIndeterminate) {
      const children = this.getCheckgroupChildren();
      for (const checkbox of children) {
        checkbox.setState(this.currentChecked, false);
      }
    }
    this.syncInProgress = false;
  }
  checkIsCheckboxParentChild(checkbox) {
    const children = this.getCheckgroupChildren();
    return children.includes(checkbox);
  }
  handleGlobalChange(event) {
    const target = event.target;
    const checkbox = target === null || target === void 0 ? void 0 : target.closest('brx-checkbox');
    if (checkbox) {
      const isChildCheckbox = this.checkIsCheckboxParentChild(checkbox);
      if (isChildCheckbox) {
        this.syncCheckgroupParent();
      }
      else if (checkbox === this.el) {
        this.syncCheckgroupChilds();
      }
    }
  }
  async getNativeChecked() {
    var _a;
    return (_a = this.nativeInput) === null || _a === void 0 ? void 0 : _a.checked;
  }
  componentWillLoad() {
    if (this.inputId === undefined) {
      this.inputId = generateUniqueId();
    }
    this.syncCurrent();
    if (this.isParent) {
      this.syncCheckgroupParent();
    }
  }
  setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }
  get labelText() {
    if (this.parent) {
      if (this.currentChecked && !this.currentIndeterminate) {
        return this.uncheckAllLabel;
      }
      else {
        return this.checkAllLabel;
      }
    }
    return this.label;
  }
  render() {
    var _a;
    return (hAsync(Host, { role: "checkbox", "data-checked": this.currentChecked, "aria-checked": `${this.currentChecked}`, "aria-hidden": this.disabled ? 'true' : null, "data-indeterminate": this.currentIndeterminate }, hAsync("input", { type: "checkbox", id: this.inputId, disabled: this.disabled, checked: this.currentChecked, name: (_a = this.name) !== null && _a !== void 0 ? _a : this.inputId, indeterminate: this.currentIndeterminate, "aria-checked": `${this.currentChecked}`, onChange: this.onChange, onBlur: () => this.onBlur(), onFocus: () => this.onFocus(), ref: focusEl => (this.nativeInput = focusEl) }), hAsync("label", { htmlFor: this.inputId }, this.labelText), hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["emitUpdateEvent", "emitChangeEvent"],
    "currentChecked": ["emitUpdateEvent", "emitChangeEvent"],
    "currentIndeterminate": ["emitUpdateEvent", "emitChangeEvent"],
    "checked": ["syncCurrentChecked"],
    "controlledChecked": ["syncCurrentChecked"],
    "indeterminate": ["syncCurrentIndeterminate"]
  }; }
  static get style() { return brxCheckboxCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-checkbox",
    "$members$": {
      "label": [1],
      "name": [513],
      "checked": [4],
      "controlledChecked": [4, "controlled-checked"],
      "indeterminate": [4],
      "disabled": [516],
      "size": [513],
      "valid": [516],
      "danger": [516],
      "invalid": [516],
      "state": [513],
      "darkMode": [516, "dark-mode"],
      "hiddenLabel": [516, "hidden-label"],
      "inputId": [1025, "input-id"],
      "value": [520],
      "child": [513],
      "propParent": [520, "parent"],
      "checkAllLabel": [1, "check-all-label"],
      "uncheckAllLabel": [1, "uncheck-all-label"],
      "currentChecked": [32],
      "currentIndeterminate": [32],
      "getCurrentState": [64],
      "setState": [64],
      "getNativeChecked": [64]
    },
    "$listeners$": [[8, "brxChange", "handleGlobalChange"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["name", "name"], ["disabled", "disabled"], ["size", "size"], ["valid", "valid"], ["danger", "danger"], ["invalid", "invalid"], ["state", "state"], ["darkMode", "dark-mode"], ["hiddenLabel", "hidden-label"], ["value", "value"], ["child", "child"], ["propParent", "parent"]]
  }; }
}

const brxCheckgroupCss = "brx-checkgroup{display:block}";

class BrxCheckgroup {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxCheckgroupCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-checkgroup",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxCollapseTriggerCss = "brx-collapse-trigger{display:block}";

class BrxCollapseTrigger {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxTriggerClick = createEvent(this, "brxTriggerClick", 7);
    this.brxSetTargetVisibilityStatus = createEvent(this, "brxSetTargetVisibilityStatus", 7);
    this.useIcons = true;
    this.breakpoint = undefined;
    this.iconToHide = 'fa5/fas/chevron-up';
    this.iconToShow = 'fa5/fas/chevron-down';
    this.target = undefined;
    this.triggerEl = undefined;
    this.targetEl = undefined;
  }
  get isOpen() {
    var _a;
    return !((_a = this.targetEl) === null || _a === void 0 ? void 0 : _a.hasAttribute('hidden'));
  }
  setupElements() {
    this.triggerEl = this.el;
    this.targetEl = findTarget(this.target);
  }
  // TODO: Melhorar a solução
  _checkBreakpoint() {
    const { targetEl, breakpoint } = this;
    if (targetEl && breakpoint) {
      if (window.matchMedia('(min-width: 977px)').matches) {
        targetEl.removeAttribute('hidden');
      }
    }
  }
  async setup() {
    this.setupElements();
    this._setVisibilityStatus();
    if (this.useIcons) {
      this._toggleIcon();
    }
    const { triggerEl, targetEl } = this;
    if (triggerEl && targetEl) {
      if (!triggerEl.hasAttribute('aria-controls')) {
        if (!targetEl.id) {
          targetEl.id = generateUniqueId();
        }
        triggerEl.setAttribute('aria-controls', targetEl.id);
      }
    }
    this._checkBreakpoint();
  }
  _setVisibilityStatus() {
    this._setTriggerVisibilityStatus();
    this._setTargetVisibilityStatus();
  }
  _setTriggerVisibilityStatus() {
    const { targetEl, triggerEl } = this;
    if (targetEl) {
      const isTargetHidden = targetEl.hasAttribute('hidden');
      triggerEl.setAttribute('data-visible', String(!isTargetHidden));
      triggerEl.setAttribute('aria-expanded', String(!isTargetHidden));
    }
  }
  _setTargetVisibilityStatus() {
    const { targetEl } = this;
    if (targetEl) {
      const isTargetHidden = targetEl.hasAttribute('hidden');
      targetEl.setAttribute('aria-hidden', String(isTargetHidden));
      this.brxSetTargetVisibilityStatus.emit();
    }
  }
  _handleTriggerClickBehavior() {
    const { breakpoint } = this;
    const canChange = !breakpoint || window.matchMedia('(max-width: 977px)').matches;
    if (canChange) {
      this._toggleVisibility();
      if (this.useIcons) {
        this._toggleIcon();
      }
    }
  }
  emitChange() {
    const { triggerEl } = this;
    if (triggerEl) {
      triggerEl.dispatchEvent(new window.Event('change'));
      this.brxTriggerClick.emit();
    }
  }
  async open(emitEvent = true) {
    const { targetEl } = this;
    if (targetEl) {
      this.targetEl.removeAttribute('hidden');
      this._setVisibilityStatus();
      emitEvent && this.emitChange();
    }
  }
  async close(emitEvent = true) {
    const { targetEl } = this;
    if (targetEl) {
      this.targetEl.setAttribute('hidden', '');
      this._setVisibilityStatus();
      emitEvent && this.emitChange();
    }
  }
  _toggleVisibility(emitEvent = true) {
    if (this.isOpen) {
      this.close(emitEvent);
    }
    else {
      this.open(emitEvent);
    }
  }
  _toggleIcon() {
    const { targetEl, triggerEl, iconToShow, iconToHide } = this;
    if (targetEl) {
      const hidden = targetEl.hasAttribute('hidden');
      const icons = Array.from(triggerEl.querySelectorAll('brx-icon[data-collapse-icon]'));
      for (const icon of icons) {
        icon.name = hidden ? iconToShow : iconToHide;
      }
    }
  }
  handleClick() {
    this._handleTriggerClickBehavior();
  }
  async getTrigger() {
    return this.triggerEl;
  }
  async getTarget() {
    return this.targetEl;
  }
  async getIsOpen() {
    return this.isOpen;
  }
  componentWillLoad() {
    this.setupElements();
    this.setup();
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "target": ["setupElements"]
  }; }
  static get style() { return brxCollapseTriggerCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-collapse-trigger",
    "$members$": {
      "useIcons": [4, "use-icons"],
      "breakpoint": [1],
      "iconToHide": [1, "icon-to-hide"],
      "iconToShow": [1, "icon-to-show"],
      "target": [513],
      "triggerEl": [32],
      "targetEl": [32],
      "open": [64],
      "close": [64],
      "getTrigger": [64],
      "getTarget": [64],
      "getIsOpen": [64]
    },
    "$listeners$": [[0, "click", "handleClick"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["target", "target"]]
  }; }
}

var Type;
(function (Type) {
  Type["DATE"] = "date";
  Type["TIME"] = "time";
  Type["DATETIME_LOCAL"] = "datetime-local";
})(Type || (Type = {}));

const getFlatpickr = async () => {
  const mod = await Promise.resolve().then(function () { return index$1; });
  return mod.default;
};
const getDefaultLocale = async () => {
  const mod = await Promise.resolve().then(function () { return pt$2; });
  return mod.default.pt;
};
const getSetupForType = (type) => {
  switch (type) {
    case Type.DATE: {
      return {
        dateFormat: 'd/m/Y',
        enableTime: false,
        noCalendar: false,
      };
    }
    case Type.TIME: {
      return {
        dateFormat: 'H:i',
        enableTime: true,
        noCalendar: true,
      };
    }
    case Type.DATETIME_LOCAL: {
      return {
        dateFormat: 'd/m/Y H:i',
        enableTime: true,
        noCalendar: false,
      };
    }
    default: {
      return {
        dateFormat: 'd/m/Y',
        enableTime: false,
        noCalendar: false,
      };
    }
  }
};
const getInitialInputType = (type) => {
  switch (type) {
    case Type.TIME: {
      return 'time';
    }
    case Type.DATETIME_LOCAL: {
      return 'datetime-local';
    }
    case Type.DATE:
    default: {
      return 'text';
    }
  }
};
const getIconForType = (type) => {
  switch (type) {
    case Type.DATE:
    case Type.DATETIME_LOCAL: {
      return 'fa5/fas/calendar-alt';
    }
    case Type.TIME: {
      return 'fa5/fas/clock';
    }
    default: {
      return null;
    }
  }
};

const brxDatetimepickerCss = ".flatpickr-calendar{background:transparent;opacity:0;display:none;text-align:center;visibility:hidden;padding:0;-webkit-animation:none;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:5px;position:absolute;width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-touch-action:manipulation;touch-action:manipulation;background:#fff;-webkit-box-shadow:1px 0 0 #e6e6e6,-1px 0 0 #e6e6e6,0 1px 0 #e6e6e6,0 -1px 0 #e6e6e6,0 3px 13px rgba(0,0,0,0.08);box-shadow:1px 0 0 #e6e6e6,-1px 0 0 #e6e6e6,0 1px 0 #e6e6e6,0 -1px 0 #e6e6e6,0 3px 13px rgba(0,0,0,0.08)}.flatpickr-calendar.open,.flatpickr-calendar.inline{opacity:1;max-height:640px;visibility:visible}.flatpickr-calendar.open{display:inline-block;z-index:99999}.flatpickr-calendar.animate.open{-webkit-animation:fpFadeInDown 300ms cubic-bezier(.23,1,.32,1);animation:fpFadeInDown 300ms cubic-bezier(.23,1,.32,1)}.flatpickr-calendar.inline{display:block;position:relative;top:2px}.flatpickr-calendar.static{position:absolute;top:calc(100% + 2px)}.flatpickr-calendar.static.open{z-index:999;display:block}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7){-webkit-box-shadow:none !important;box-shadow:none !important}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1){-webkit-box-shadow:-2px 0 0 #e6e6e6,5px 0 0 #e6e6e6;box-shadow:-2px 0 0 #e6e6e6,5px 0 0 #e6e6e6}.flatpickr-calendar .hasWeeks .dayContainer,.flatpickr-calendar .hasTime .dayContainer{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.flatpickr-calendar .hasWeeks .dayContainer{border-left:0}.flatpickr-calendar.hasTime .flatpickr-time{height:40px;border-top:1px solid #e6e6e6}.flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto}.flatpickr-calendar:before,.flatpickr-calendar:after{position:absolute;display:block;pointer-events:none;border:solid transparent;content:'';height:0;width:0;left:22px}.flatpickr-calendar.rightMost:before,.flatpickr-calendar.arrowRight:before,.flatpickr-calendar.rightMost:after,.flatpickr-calendar.arrowRight:after{left:auto;right:22px}.flatpickr-calendar.arrowCenter:before,.flatpickr-calendar.arrowCenter:after{left:50%;right:50%}.flatpickr-calendar:before{border-width:5px;margin:0 -5px}.flatpickr-calendar:after{border-width:4px;margin:0 -4px}.flatpickr-calendar.arrowTop:before,.flatpickr-calendar.arrowTop:after{bottom:100%}.flatpickr-calendar.arrowTop:before{border-bottom-color:#e6e6e6}.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff}.flatpickr-calendar.arrowBottom:before,.flatpickr-calendar.arrowBottom:after{top:100%}.flatpickr-calendar.arrowBottom:before{border-top-color:#e6e6e6}.flatpickr-calendar.arrowBottom:after{border-top-color:#fff}.flatpickr-calendar:focus{outline:0}.flatpickr-wrapper{position:relative;display:inline-block}.flatpickr-months{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-months .flatpickr-month{background:transparent;color:rgba(0,0,0,0.9);fill:rgba(0,0,0,0.9);height:34px;line-height:1;text-align:center;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.flatpickr-months .flatpickr-prev-month,.flatpickr-months .flatpickr-next-month{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-decoration:none;cursor:pointer;position:absolute;top:0;height:34px;padding:10px;z-index:3;color:rgba(0,0,0,0.9);fill:rgba(0,0,0,0.9)}.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,.flatpickr-months .flatpickr-next-month.flatpickr-disabled{display:none}.flatpickr-months .flatpickr-prev-month i,.flatpickr-months .flatpickr-next-month i{position:relative}.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,.flatpickr-months .flatpickr-next-month.flatpickr-prev-month{left:0}.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,.flatpickr-months .flatpickr-next-month.flatpickr-next-month{right:0}.flatpickr-months .flatpickr-prev-month:hover,.flatpickr-months .flatpickr-next-month:hover{color:#959ea9}.flatpickr-months .flatpickr-prev-month:hover svg,.flatpickr-months .flatpickr-next-month:hover svg{fill:#f64747}.flatpickr-months .flatpickr-prev-month svg,.flatpickr-months .flatpickr-next-month svg{width:14px;height:14px}.flatpickr-months .flatpickr-prev-month svg path,.flatpickr-months .flatpickr-next-month svg path{-webkit-transition:fill .1s;transition:fill .1s;fill:inherit}.numInputWrapper{position:relative;height:auto}.numInputWrapper input,.numInputWrapper span{display:inline-block}.numInputWrapper input{width:100%}.numInputWrapper input::-ms-clear{display:none}.numInputWrapper input::-webkit-outer-spin-button,.numInputWrapper input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none}.numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;cursor:pointer;border:1px solid rgba(57,57,57,0.15);-webkit-box-sizing:border-box;box-sizing:border-box}.numInputWrapper span:hover{background:rgba(0,0,0,0.1)}.numInputWrapper span:active{background:rgba(0,0,0,0.2)}.numInputWrapper span:after{display:block;content:\"\";position:absolute}.numInputWrapper span.arrowUp{top:0;border-bottom:0}.numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(57,57,57,0.6);top:26%}.numInputWrapper span.arrowDown{top:50%}.numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(57,57,57,0.6);top:40%}.numInputWrapper span svg{width:inherit;height:auto}.numInputWrapper span svg path{fill:rgba(0,0,0,0.5)}.numInputWrapper:hover{background:rgba(0,0,0,0.05)}.numInputWrapper:hover span{opacity:1}.flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;padding:7.48px 0 0 0;line-height:1;height:34px;display:inline-block;text-align:center;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;margin-left:.5ch;padding:0}.flatpickr-current-month span.cur-month:hover{background:rgba(0,0,0,0.05)}.flatpickr-current-month .numInputWrapper{width:6ch;width:7ch\\0;display:inline-block}.flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:rgba(0,0,0,0.9)}.flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:rgba(0,0,0,0.9)}.flatpickr-current-month input.cur-year{background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;cursor:text;padding:0 0 0 .5ch;margin:0;display:inline-block;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:auto;border:0;border-radius:0;vertical-align:initial;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-current-month input.cur-year:focus{outline:0}.flatpickr-current-month input.cur-year[disabled],.flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:rgba(0,0,0,0.5);background:transparent;pointer-events:none}.flatpickr-current-month .flatpickr-monthDropdown-months{appearance:menulist;background:transparent;border:none;border-radius:0;box-sizing:border-box;color:inherit;cursor:pointer;font-size:inherit;font-family:inherit;font-weight:300;height:auto;line-height:inherit;margin:-1px 0 0 0;outline:none;padding:0 0 0 .5ch;position:relative;vertical-align:initial;-webkit-box-sizing:border-box;-webkit-appearance:menulist;-moz-appearance:menulist;width:auto}.flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-current-month .flatpickr-monthDropdown-months:active{outline:none}.flatpickr-current-month .flatpickr-monthDropdown-months:hover{background:rgba(0,0,0,0.05)}.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month{background-color:transparent;outline:none;padding:0}.flatpickr-weekdays{background:transparent;text-align:center;overflow:hidden;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:28px}.flatpickr-weekdays .flatpickr-weekdaycontainer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}span.flatpickr-weekday{cursor:default;font-size:90%;background:transparent;color:rgba(0,0,0,0.54);line-height:1;margin:0;text-align:center;display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-weight:bolder}.dayContainer,.flatpickr-weeks{padding:1px 0 0 0}.flatpickr-days{position:relative;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;width:307.875px}.flatpickr-days:focus{outline:0}.dayContainer{padding:0;outline:0;text-align:left;width:307.875px;min-width:307.875px;max-width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-wrap:wrap;-ms-flex-pack:justify;-webkit-justify-content:space-around;justify-content:space-around;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}.dayContainer+.dayContainer{-webkit-box-shadow:-1px 0 0 #e6e6e6;box-shadow:-1px 0 0 #e6e6e6}.flatpickr-day{background:none;border:1px solid transparent;border-radius:150px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#393939;cursor:pointer;font-weight:400;width:14.2857143%;-webkit-flex-basis:14.2857143%;-ms-flex-preferred-size:14.2857143%;flex-basis:14.2857143%;max-width:39px;height:39px;line-height:39px;margin:0;display:inline-block;position:relative;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center}.flatpickr-day.inRange,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.today.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day:hover,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.nextMonthDay:hover,.flatpickr-day:focus,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.nextMonthDay:focus{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6}.flatpickr-day.today{border-color:#959ea9}.flatpickr-day.today:hover,.flatpickr-day.today:focus{border-color:#959ea9;background:#959ea9;color:#fff}.flatpickr-day.selected,.flatpickr-day.startRange,.flatpickr-day.endRange,.flatpickr-day.selected.inRange,.flatpickr-day.startRange.inRange,.flatpickr-day.endRange.inRange,.flatpickr-day.selected:focus,.flatpickr-day.startRange:focus,.flatpickr-day.endRange:focus,.flatpickr-day.selected:hover,.flatpickr-day.startRange:hover,.flatpickr-day.endRange:hover,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.endRange.prevMonthDay,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.endRange.nextMonthDay{background:#569ff7;-webkit-box-shadow:none;box-shadow:none;color:#fff;border-color:#569ff7}.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange,.flatpickr-day.endRange.startRange{border-radius:50px 0 0 50px}.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange,.flatpickr-day.endRange.endRange{border-radius:0 50px 50px 0}.flatpickr-day.selected.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.startRange.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.endRange.startRange+.endRange:not(:nth-child(7n+1)){-webkit-box-shadow:-10px 0 0 #569ff7;box-shadow:-10px 0 0 #569ff7}.flatpickr-day.selected.startRange.endRange,.flatpickr-day.startRange.startRange.endRange,.flatpickr-day.endRange.startRange.endRange{border-radius:50px}.flatpickr-day.inRange{border-radius:0;-webkit-box-shadow:-5px 0 0 #e6e6e6,5px 0 0 #e6e6e6;box-shadow:-5px 0 0 #e6e6e6,5px 0 0 #e6e6e6}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover,.flatpickr-day.prevMonthDay,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.notAllowed.nextMonthDay{color:rgba(57,57,57,0.3);background:transparent;border-color:transparent;cursor:default}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover{cursor:not-allowed;color:rgba(57,57,57,0.1)}.flatpickr-day.week.selected{border-radius:0;-webkit-box-shadow:-5px 0 0 #569ff7,5px 0 0 #569ff7;box-shadow:-5px 0 0 #569ff7,5px 0 0 #569ff7}.flatpickr-day.hidden{visibility:hidden}.rangeMode .flatpickr-day{margin-top:1px}.flatpickr-weekwrapper{float:left}.flatpickr-weekwrapper .flatpickr-weeks{padding:0 12px;-webkit-box-shadow:1px 0 0 #e6e6e6;box-shadow:1px 0 0 #e6e6e6}.flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%;line-height:28px}.flatpickr-weekwrapper span.flatpickr-day,.flatpickr-weekwrapper span.flatpickr-day:hover{display:block;width:100%;max-width:none;color:rgba(57,57,57,0.3);background:transparent;cursor:default;border:none}.flatpickr-innerContainer{display:block;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.flatpickr-rContainer{display:inline-block;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}.flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-time:after{content:\"\";display:table;clear:both}.flatpickr-time .numInputWrapper{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:40%;height:40px;float:left}.flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:#393939}.flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:#393939}.flatpickr-time.hasSeconds .numInputWrapper{width:26%}.flatpickr-time.time24hr .numInputWrapper{width:49%}.flatpickr-time input{background:transparent;-webkit-box-shadow:none;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;color:#393939;font-size:14px;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-time input.flatpickr-hour{font-weight:bold}.flatpickr-time input.flatpickr-minute,.flatpickr-time input.flatpickr-second{font-weight:400}.flatpickr-time input:focus{outline:0;border:0}.flatpickr-time .flatpickr-time-separator,.flatpickr-time .flatpickr-am-pm{height:inherit;float:left;line-height:inherit;color:#393939;font-weight:bold;width:2%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400}.flatpickr-time input:hover,.flatpickr-time .flatpickr-am-pm:hover,.flatpickr-time input:focus,.flatpickr-time .flatpickr-am-pm:focus{background:#eee}.flatpickr-input[readonly]{cursor:pointer}@-webkit-keyframes fpFadeInDown{from{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes fpFadeInDown{from{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}brx-datetimepicker{display:block}brx-datetimepicker[dark-mode],brx-datetimepicker[dark-mode] label{--color:var(--color-dark);--focus-color:var(--focus-color-dark)}brx-datetimepicker input[disabled]{cursor:not-allowed}.flatpickr-calendar{--flatpicker-padding:var(--spacing-scale-2x);--datetimepicker-day-size:24px;--datetimepicker-arrows:32px;-webkit-box-shadow:var(--surface-shadow-md);box-shadow:var(--surface-shadow-md)}.flatpickr-calendar.arrowTop::before,.flatpickr-calendar.arrowTop::after{border-color:transparent}.flatpickr-calendar.open{z-index:var(--z-index-layer-2)}.flatpickr-calendar .flatpickr-months{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;padding:var(--flatpicker-padding) var(--flatpicker-padding) 0}.flatpickr-calendar .flatpickr-months .flatpickr-prev-month,.flatpickr-calendar .flatpickr-months .flatpickr-next-month{height:auto;padding:0;position:static}.flatpickr-calendar .flatpickr-months .flatpickr-prev-month.flatpickr-disabled,.flatpickr-calendar .flatpickr-months .flatpickr-next-month.flatpickr-disabled{cursor:not-allowed;opacity:var(--disabled);display:block}.flatpickr-calendar .flatpickr-months .flatpickr-prev-month.flatpickr-disabled *,.flatpickr-calendar .flatpickr-months .flatpickr-next-month.flatpickr-disabled *{pointer-events:none}.flatpickr-calendar .flatpickr-months .flatpickr-month{-ms-flex:1;flex:1;height:auto;overflow:visible}.flatpickr-calendar .flatpickr-months .flatpickr-current-month{display:-ms-flexbox;display:flex;height:auto;padding:0 var(--flatpicker-padding);position:static;width:100%}.flatpickr-calendar .flatpickr-months .flatpickr-monthDropdown-months{border-radius:var(--surface-rounder-sm);color:var(--interactive);font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-semi-bold);margin:0;padding:0}.flatpickr-calendar .flatpickr-months .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month{color:var(--color)}.flatpickr-calendar .flatpickr-months .flatpickr-monthDropdown-months:hover{background:transparent}.flatpickr-calendar .flatpickr-months .numInputWrapper{-ms-flex:1;flex:1;margin-left:var(--flatpicker-padding);width:auto}.flatpickr-calendar .flatpickr-months .numInputWrapper input.cur-year{border:var(--surface-width-sm) solid var(--border-color);border-radius:var(--surface-rounder-sm);color:var(--color);font-size:var(--font-size-scale-base);font-weight:var(--font-weight-semi-bold);padding:0 var(--spacing-scale-base)}.flatpickr-calendar .flatpickr-months .numInputWrapper span.arrowUp,.flatpickr-calendar .flatpickr-months .numInputWrapper span.arrowDown{display:none}.flatpickr-calendar .flatpickr-weekdaycontainer{display:grid;grid-template-columns:repeat(7, 1fr);padding:0 var(--flatpicker-padding)}.flatpickr-calendar span.flatpickr-weekday{color:var(--color);font-size:var(--font-size);font-weight:var(--font-weight-medium)}.flatpickr-calendar .dayContainer{display:grid;grid-template-columns:repeat(7, 1fr);padding:0 var(--flatpicker-padding) var(--flatpicker-padding)}.flatpickr-calendar .flatpickr-day{color:var(--interactive);font-weight:var(--font-weight-semi-bold);height:var(--datetimepicker-day-size);line-height:var(--font-line-height-medium);margin:calc(var(--flatpicker-padding) * 0.25) auto;max-width:var(--datetimepicker-day-size);width:var(--datetimepicker-day-size)}.flatpickr-calendar .flatpickr-day:focus{outline:none}.flatpickr-calendar .flatpickr-day.focus-visible,.flatpickr-calendar .flatpickr-day:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}.flatpickr-calendar .flatpickr-day.focus-visible{--focus-offset:0;background:transparent;border-color:transparent}.flatpickr-calendar .flatpickr-day:hover{background:var(--hover-effect)}.flatpickr-calendar .flatpickr-day.prevMonthDay,.flatpickr-calendar .flatpickr-day.nextMonthDay{font-weight:var(--font-weight-medium);opacity:0.6}.flatpickr-calendar .flatpickr-day.today{background:var(--orange-vivid-5);border-color:transparent;color:var(--red-warm-vivid-50)}.flatpickr-calendar .flatpickr-day.flatpickr-disabled{cursor:not-allowed;opacity:var(--disabled);color:var(--color)}.flatpickr-calendar .flatpickr-day.flatpickr-disabled *{pointer-events:none}.flatpickr-calendar .flatpickr-day.flatpickr-disabled:hover{background:transparent}.flatpickr-calendar .flatpickr-day.inRange{--interactive-rgb:var(--blue-warm-vivid-50-rgb);--hover:var(--hover-dark);background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)));border-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:var(--color-dark);opacity:1}.flatpickr-calendar .flatpickr-day.selected,.flatpickr-calendar .flatpickr-day.startRange,.flatpickr-calendar .flatpickr-day.endRange{background:var(--selected);border-color:transparent;color:var(--color-dark);opacity:1}.flatpickr-calendar .flatpickr-time{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;margin:0 var(--flatpicker-padding);max-height:none}.flatpickr-calendar .flatpickr-time input{--input-background:var(--bg-color);--input-border-color:var(--color-secondary-06);--input-border-width:1px;--input-border-style:solid;--input-padding:0 var(--spacing-scale-half);--input-radius:var(--surface-rounder-sm);background:var(--input-background);border:var(--input-border-width) var(--input-border-style) var(--input-border-color);border-radius:var(--input-radius);color:var(--text-color);display:block;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-medium);height:var(--input-size);padding:var(--input-padding);width:100%;margin:calc(var(--flatpicker-padding) * 0.25) 0}.flatpickr-calendar .flatpickr-time input:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}.flatpickr-calendar .flatpickr-time input:focus,.flatpickr-calendar .flatpickr-time input:focus-visible,.flatpickr-calendar .flatpickr-time input.focus-visible{border-color:var(--focus) !important;-webkit-box-shadow:0 0 0 var(--surface-width-md) var(--focus);box-shadow:0 0 0 var(--surface-width-md) var(--focus);outline:none}.flatpickr-calendar .flatpickr-time input.has-icon{padding-right:var(--spacing-scale-5x)}.flatpickr-calendar .flatpickr-time input[type=password]::-ms-reveal,.flatpickr-calendar .flatpickr-time input[type=password]::-ms-clear{display:none}.flatpickr-calendar .flatpickr-time .numInputWrapper{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex:0 1 90px;flex:0 1 90px;-ms-flex-flow:column;flex-flow:column;height:auto;padding:calc(var(--flatpicker-padding) * 0.5) var(--flatpicker-padding)}.flatpickr-calendar .flatpickr-time .numInputWrapper:hover{background:transparent}.flatpickr-calendar .flatpickr-time .numInputWrapper span{-ms-flex-align:center;align-items:center;border:0;border-radius:50px;color:var(--interactive);display:-ms-flexbox;display:flex;height:var(--datetimepicker-arrows);-ms-flex-pack:center;justify-content:center;opacity:1;padding:0;position:static;width:var(--datetimepicker-arrows)}.flatpickr-calendar .flatpickr-time .numInputWrapper span:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}.flatpickr-calendar .flatpickr-time .numInputWrapper span::after{border:none;position:static}.flatpickr-calendar .flatpickr-time .numInputWrapper span.arrowUp{-ms-flex-order:-1;order:-1}.flatpickr-calendar .flatpickr-time .numInputWrapper span.arrowUp::after{-webkit-transform:rotate(225deg) translate(-1px, -1px);transform:rotate(225deg) translate(-1px, -1px)}.flatpickr-calendar.hasTime .flatpickr-time{border-color:var(--border-color);height:auto}.flatpickr-calendar.hasTime.noCalendar .flatpickr-time{border-color:transparent}";

class BrxDateTimePicker {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.type = undefined;
    this.mode = 'single';
    this.placeholder = undefined;
    this.config = undefined;
    this.value = undefined;
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = undefined;
  }
  get inputEl() {
    return findTarget('input', this.el);
  }
  get inputValue() {
    return this.inputEl.value;
  }
  get selectionStart() {
    return this.inputEl.selectionStart;
  }
  get parsedConfig() {
    var _a;
    const config = tryParseJSON((_a = this.config) !== null && _a !== void 0 ? _a : {});
    return typeof config !== 'string' ? config : {};
  }
  syncCurrentValueFromProps() {
    this.currentValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
  }
  syncFlatpickerDateFromCurrentValue() {
    this.fp.setDate(this.currentValue, false);
  }
  setCurrentValue(selectedDates, dateStr) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = selectedDates;
    }
    else {
      this.syncFlatpickerDateFromCurrentValue();
    }
    this.brxChange.emit({ selectedDates, dateStr });
  }
  get setup() {
    return getSetupForType(this.type);
  }
  get configNative() {
    const { mode } = this;
    const { dateFormat, noCalendar, enableTime } = this.setup;
    return {
      mode,
      dateFormat,
      enableTime,
      noCalendar,
      wrap: true,
      time_24hr: true,
      allowInput: true,
      minuteIncrement: 1,
      disableMobile: true,
      nextArrow: '<brx-button circle size="small" type="button"><brx-icon name="fa5/fas/chevron-right"></brx-icon></brx-button>',
      prevArrow: '<brx-button circle size="small" type="button"><brx-icon name="fa5/fas/chevron-left"></brx-icon></brx-button>',
    };
  }
  get completeConfig() {
    return Object.assign({}, this.parsedConfig, this.configNative);
  }
  get iconName() {
    return getIconForType(this.type);
  }
  get inputInitialType() {
    return getInitialInputType(this.type);
  }
  get flatpickr() {
    return getFlatpickr();
  }
  get language() {
    return getDefaultLocale();
  }
  /**
   * Adiciona máscara de data no input
   */
  dateInputMask(input) {
    input.setAttribute('maxlength', '10');
    input.addEventListener('keypress', e => {
      if (!e.code.startsWith('Digit')) {
        e.preventDefault();
      }
      const length = input.value.length;
      // TODO: ????
      // if (len !== 1 || len !== 3) {
      if (length !== 1 && length !== 3) {
        if (e.code == 'Help') {
          e.preventDefault();
        }
      }
      if (length === 2) {
        input.value += '/';
      }
      if (length === 5) {
        input.value += '/';
      }
    });
  }
  /**
   *  Adiciona máscara de hora no input
   */
  dateTimeInputMask(input) {
    input.setAttribute('maxlength', '16');
    input.addEventListener('keypress', e => {
      if (!e.code.startsWith('Digit')) {
        e.preventDefault();
      }
      const length = input.value.length;
      // TODO: ????
      if (length !== 1 && length !== 3) {
        if (e.code == 'Help') {
          e.preventDefault();
        }
      }
      switch (length) {
        case 2: {
          input.value += '/';
          break;
        }
        case 5: {
          input.value += '/';
          break;
        }
        case 10: {
          input.value += ' ';
          break;
        }
        case 13: {
          input.value += ':';
          break;
        }
      }
    });
  }
  /**
   * Coloca máscara com range de data no input
   */
  dateRangeInputMask(input) {
    input.setAttribute('maxlength', '25');
    input.addEventListener('keypress', e => {
      if (!e.code.startsWith('Digit')) {
        e.preventDefault();
      }
      const length = input.value.length;
      // TODO: ????
      // if (len !== 1 || len !== 3) {
      if (length !== 1 && length !== 3) {
        if (e.code === 'Help') {
          e.preventDefault();
        }
      }
      this.positionRangeMask(input, length);
    });
  }
  /**
   * Insere a máscara na Dom
   */
  async positionRangeMask(input, length) {
    const language = await this.language;
    const tamSeparator = language.rangeSeparator.length;
    const daySeparator = 10 + tamSeparator + 2;
    const monthSeparator = 10 + tamSeparator + 5;
    input.setAttribute('maxlength', `${20 + tamSeparator}`);
    switch (length) {
      case 2: {
        input.value += '/';
        break;
      }
      case 5: {
        input.value += '/';
        break;
      }
      case 10: {
        input.value += language.rangeSeparator;
        break;
      }
      case daySeparator: {
        input.value += '/';
        break;
      }
      case monthSeparator: {
        input.value += '/';
        break;
      }
    }
  }
  /**
   * Insere máscara de hora
   */
  timeInputMask(input) {
    input.setAttribute('maxlength', '5');
    input.addEventListener('keypress', e => {
      if (!e.code.startsWith('Digit')) {
        e.preventDefault();
      }
      const length = input.value.length;
      // TODO: ????
      // if (len !== 1 || len !== 3) {
      if (length !== 1 && length !== 3) {
        if (e.code === 'Help') {
          e.preventDefault();
        }
      }
      if (length === 2) {
        input.value += ':';
      }
    });
  }
  async setupMask() {
    switch (this.type) {
      case Type.DATE: {
        this.dateInputMask(this.inputEl);
        break;
      }
      case Type.TIME: {
        this.timeInputMask(this.inputEl);
        break;
      }
      case Type.DATETIME_LOCAL: {
        this.dateTimeInputMask(this.inputEl);
        break;
      }
      default: {
        if (this.mode === 'range') {
          this.dateRangeInputMask(this.inputEl);
        }
        else {
          this.dateInputMask(this.inputEl);
        }
        break;
      }
    }
  }
  async buildDateTimePicker() {
    if (this.fp) {
      this.fp.destroy();
      this.fp = null;
    }
    const flatpickr = await this.flatpickr;
    const language = await this.language;
    flatpickr.localize(language);
    await this.setupMask();
    this.fp = flatpickr(this.el, this.completeConfig);
    const handleOpen = () => {
      document.querySelectorAll('.arrowUp').forEach(element => {
        element.classList.add('fas', 'fa-chevron-up');
      });
      document.querySelectorAll('.arrowDown').forEach(element => {
        element.classList.add('fas', 'fa-chevron-down');
      });
    };
    this.fp.config.onOpen.push(handleOpen);
    const handleChange = (selectedDates, dateStr) => {
      this.setCurrentValue(selectedDates, dateStr);
    };
    this.fp.config.onChange.push(handleChange);
  }
  handleKeyup() {
    const { fp, inputValue } = this;
    if (fp) {
      if (!Number.isNaN(new Date(inputValue))) {
        // if the cursor is at the end of the edit and we have a full sized date, allow the date to immediately change, otherwise just move to the correct month without actually changing it
        if (this.selectionStart >= 10) {
          fp.setDate(inputValue, true);
        }
        else {
          fp.jumpToDate(inputValue);
        }
      }
    }
  }
  handleBlur() {
    const { fp, inputValue } = this;
    if (fp) {
      if (!Number.isNaN(new Date(inputValue))) {
        fp.setDate(inputValue, true);
      }
    }
  }
  componentDidLoad() {
    enqueueIdleCallback(() => {
      this.buildDateTimePicker().then(() => {
        this.syncCurrentValueFromProps();
      });
    });
  }
  componentShouldUpdate(_, __, propName) {
    switch (propName) {
      case 'placeholder':
      case 'inputType':
      case 'iconName': {
        return true;
      }
      default: {
        return false;
      }
    }
  }
  render() {
    const { placeholder, inputInitialType: inputType, iconName } = this;
    return (hAsync(Host, null, hAsync("brx-input", { placeholder: placeholder, type: inputType, class: "has-icon", "data-input": "data-input" }, iconName && (hAsync("brx-button", { slot: "end-button", size: "small", type: "button", circle: true, "aria-label": "Abrir Timepicker", "data-toggle": "data-toggle" }, hAsync("brx-icon", { name: iconName })))), hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"],
    "currentValue": ["syncFlatpickerDateFromCurrentValue"],
    "type": ["buildDateTimePicker"],
    "mode": ["buildDateTimePicker"],
    "config": ["buildDateTimePicker"]
  }; }
  static get style() { return brxDatetimepickerCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-datetimepicker",
    "$members$": {
      "type": [1],
      "mode": [1],
      "placeholder": [1],
      "config": [1],
      "value": [8],
      "controlledValue": [8, "controlled-value"],
      "currentValue": [32]
    },
    "$listeners$": [[0, "keyup", "handleKeyup"], [0, "blur", "handleBlur"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxDividerCss = "brx-divider,[data-brx-global-styles~=hr] hr,hr.brx-divider{--divider-size:var(--surface-width-sm);border-color:var(--border-color);border-style:solid;border-width:0;border-top-width:var(--divider-size);display:block}brx-divider.content,[data-brx-global-styles~=hr] hr.content,hr.brx-divider.content{-ms-flex-align:center;align-items:center;border:0;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}brx-divider.content::after,brx-divider.content::before,[data-brx-global-styles~=hr] hr.content::after,[data-brx-global-styles~=hr] hr.content::before,hr.brx-divider.content::after,hr.brx-divider.content::before{border-color:var(--border-color);border-style:solid;border-width:0;border-top-width:var(--divider-size);content:\"\";-ms-flex:1;flex:1}brx-divider.content::after,[data-brx-global-styles~=hr] hr.content::after,hr.brx-divider.content::after{margin-left:var(--spacing-scale-base)}brx-divider.content::before,[data-brx-global-styles~=hr] hr.content::before,hr.brx-divider.content::before{margin-right:var(--spacing-scale-base)}brx-divider.vertical,brx-divider[vertical],brx-divider[orientation=vertical],[data-brx-global-styles~=hr] hr.vertical,[data-brx-global-styles~=hr] hr[vertical],[data-brx-global-styles~=hr] hr[orientation=vertical],hr.brx-divider.vertical,hr.brx-divider[vertical],hr.brx-divider[orientation=vertical]{-ms-flex-item-align:stretch;align-self:stretch;border-right-width:var(--divider-size);border-top-width:0}brx-divider.vertical.content,brx-divider[vertical].content,brx-divider[orientation=vertical].content,[data-brx-global-styles~=hr] hr.vertical.content,[data-brx-global-styles~=hr] hr[vertical].content,[data-brx-global-styles~=hr] hr[orientation=vertical].content,hr.brx-divider.vertical.content,hr.brx-divider[vertical].content,hr.brx-divider[orientation=vertical].content{-ms-flex-direction:column;flex-direction:column}brx-divider.vertical.content::after,brx-divider.vertical.content::before,brx-divider[vertical].content::after,brx-divider[vertical].content::before,brx-divider[orientation=vertical].content::after,brx-divider[orientation=vertical].content::before,[data-brx-global-styles~=hr] hr.vertical.content::after,[data-brx-global-styles~=hr] hr.vertical.content::before,[data-brx-global-styles~=hr] hr[vertical].content::after,[data-brx-global-styles~=hr] hr[vertical].content::before,[data-brx-global-styles~=hr] hr[orientation=vertical].content::after,[data-brx-global-styles~=hr] hr[orientation=vertical].content::before,hr.brx-divider.vertical.content::after,hr.brx-divider.vertical.content::before,hr.brx-divider[vertical].content::after,hr.brx-divider[vertical].content::before,hr.brx-divider[orientation=vertical].content::after,hr.brx-divider[orientation=vertical].content::before{border-right-width:var(--divider-size);border-top-width:0;margin:0}brx-divider.inverted,brx-divider.dark-mode,brx-divider[dark-mode],[data-brx-global-styles~=hr] hr.inverted,[data-brx-global-styles~=hr] hr.dark-mode,[data-brx-global-styles~=hr] hr[dark-mode],hr.brx-divider.inverted,hr.brx-divider.dark-mode,hr.brx-divider[dark-mode]{--border-color:var(--pure-0)}brx-divider.dashed,brx-divider[dashed],[data-brx-global-styles~=hr] hr.dashed,[data-brx-global-styles~=hr] hr[dashed],hr.brx-divider.dashed,hr.brx-divider[dashed]{border-style:dashed}brx-divider.sm,brx-divider[size=sm],[data-brx-global-styles~=hr] hr.sm,[data-brx-global-styles~=hr] hr[size=sm],hr.brx-divider.sm,hr.brx-divider[size=sm]{--divider-size:var(--surface-width-sm)}brx-divider.md,brx-divider[size=md],[data-brx-global-styles~=hr] hr.md,[data-brx-global-styles~=hr] hr[size=md],hr.brx-divider.md,hr.brx-divider[size=md]{--divider-size:var(--surface-width-md)}brx-divider.lg,brx-divider[size=lg],[data-brx-global-styles~=hr] hr.lg,[data-brx-global-styles~=hr] hr[size=lg],hr.brx-divider.lg,hr.brx-divider[size=lg]{--divider-size:var(--surface-width-lg)}[data-brx-global-styles~=hr] hr,hr.brx-divider{--divider-padding:var(--spacing-scale-2x);margin:var(--divider-padding) 0}";

class BrxDivider {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.vertical = false;
    this.dashed = false;
    this.darkMode = false;
    this.size = 'sm';
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxDividerCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-divider",
    "$members$": {
      "vertical": [516],
      "dashed": [516],
      "darkMode": [516, "dark-mode"],
      "size": [513]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["vertical", "vertical"], ["dashed", "dashed"], ["darkMode", "dark-mode"], ["size", "size"]]
  }; }
}

const brxDropdownCss = "brx-dropdown{display:block;position:relative}brx-dropdown brx-dropdown-trigger+*{-webkit-box-shadow:var(--surface-shadow-sm);box-shadow:var(--surface-shadow-sm);left:0;position:absolute;top:100%}brx-dropdown>brx-notification{left:auto;right:0}brx-dropdown brx-item{--color:var(--color-light);--color-rgb:var(--color-light-rgb);--text-color:var(--color);--interactive:var(--interactive-light);--interactive-rgb:var(--interactive-light-rgb);--visited:var(--visited-light);--hover:var(--hover-light);--pressed:var(--pressed-light);--focus-color:var(--focus-color-light);--focus:var(--focus-color);--item-padding-y:var(--spacing-scale-2x);--interactive-rgb:var(--color-rgb);background-color:var(--background-light);color:var(--color)}brx-dropdown brx-item:not(:last-child){border-bottom:1px solid var(--border-color)}brx-dropdown brx-item[selected]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}";

class BrxDropdown {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxDropdownCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-dropdown",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxDropdownTriggerCss = "brx-dropdown-trigger{display:inline-block}";

class BrxDropdownTrigger {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.useIcons = true;
    this.breakpoint = undefined;
    this.iconToHide = 'fa5/fas/chevron-up';
    this.iconToShow = 'fa5/fas/chevron-down';
    this.target = undefined;
    this.dropdown = undefined;
  }
  async handleDropdown(event) {
    const evTargetEl = event.target;
    if (this.collapseTriggerEl) {
      const collapseTargetEl = await this.collapseTriggerEl.getTarget();
      const collapseTriggerEl = await this.collapseTriggerEl.getTrigger();
      if (!collapseTriggerEl.contains(evTargetEl) && !collapseTargetEl.hasAttribute('hidden') && !collapseTargetEl.contains(evTargetEl)) {
        collapseTriggerEl.click();
      }
    }
  }
  async setTargetVisibilityStatus() {
    const target = await this.collapseTriggerEl.getTarget();
    if (target.hasAttribute('hidden')) {
      target.removeAttribute('data-dropdown');
    }
    else {
      target.setAttribute('data-dropdown', '');
    }
  }
  async setParentsTargetVisibilityStatus() {
    const target = await this.collapseTriggerEl.getTarget();
    this.dropdown = !target.hasAttribute('hidden');
  }
  handleTriggerClickBehavior() {
    this.setParentsTargetVisibilityStatus();
  }
  render() {
    const collapseTriggerProps = getCollapseTriggerProps(this);
    return (hAsync(Host, null, hAsync("brx-collapse-trigger", Object.assign({}, collapseTriggerProps, { ref: el => void (this.collapseTriggerEl = el), onBrxTriggerClick: () => this.handleTriggerClickBehavior(), onBrxSetTargetVisibilityStatus: () => this.setTargetVisibilityStatus() }), hAsync("slot", null))));
  }
  static get style() { return brxDropdownTriggerCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-dropdown-trigger",
    "$members$": {
      "useIcons": [516, "use-icons"],
      "breakpoint": [513],
      "iconToHide": [513, "icon-to-hide"],
      "iconToShow": [513, "icon-to-show"],
      "target": [513],
      "dropdown": [32]
    },
    "$listeners$": [[5, "mousedown", "handleDropdown"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["useIcons", "use-icons"], ["breakpoint", "breakpoint"], ["iconToHide", "icon-to-hide"], ["iconToShow", "icon-to-show"], ["target", "target"]]
  }; }
}

const brxIconCss = "brx-icon,brx-icon i{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}brx-icon i{color:inherit}";

class BrxIcon {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = undefined;
    this.loadResources = true;
    this.iconClass = undefined;
  }
  render() {
    const { iconClass = '' } = this;
    const name = this.name.includes('/') ? this.name : `fa5/fas/${this.name}`;
    if (name.startsWith('fa5')) {
      const [, style, identifier] = name.split('/');
      return (hAsync(Host, null, this.loadResources && (hAsync(Fragment, null, hAsync("link", { href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css", rel: "stylesheet" }))), hAsync("i", { class: `${style} fa-${identifier} ${iconClass}`, "aria-hidden": "true" })));
    }
    return hAsync(Host, null);
  }
  static get style() { return brxIconCss; }
  static get cmpMeta() { return {
    "$flags$": 0,
    "$tagName$": "brx-icon",
    "$members$": {
      "name": [513],
      "loadResources": [516, "load-resources"],
      "iconClass": [513, "icon-class"]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["name", "name"], ["loadResources", "load-resources"], ["iconClass", "icon-class"]]
  }; }
}

const brxInputCss = "brx-input{display:block;--input-button-margin:var(--spacing-scale-half);--input-padding:0 var(--spacing-scale-2x);--input-padding-button:var(--spacing-scale-5x);--input-padding-icon:var(--spacing-scale-5x);--input-size:var(--input-medium);--input-small:32px;--input-medium:40px;--input-large:48px;--input-highlight:56px;--color:var(--color-light);--color-rgb:var(--color-light-rgb);--text-color:var(--color);--interactive:var(--interactive-light);--interactive-rgb:var(--interactive-light-rgb);--visited:var(--visited-light);--hover:var(--hover-light);--pressed:var(--pressed-light);--focus-color:var(--focus-color-light);--focus:var(--focus-color);color:var(--color);position:relative}brx-input input{background-color:var(--background-light);border-color:var(--border-color-alternative);border-radius:var(--surface-rounder-sm);border-style:var(--border-style);border-width:var(--border-width);color:var(--color-light);display:block;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-medium);height:var(--input-size);margin-top:var(--spacing-scale-half);padding-bottom:0;padding-left:var(--spacing-scale-2x);padding-right:var(--spacing-scale-2x);padding-top:0;width:100%}brx-input input::-ms-reveal,brx-input input::-ms-clear,brx-input input::-webkit-calendar-picker-indicator{display:none}brx-input input[type=search]::-webkit-search-decoration,brx-input input[type=search]::-webkit-search-cancel-button,brx-input input[type=search]::-webkit-search-results-button,brx-input input[type=search]::-webkit-search-results-decoration{-webkit-appearance:none;appearance:none}brx-input[disabled]{opacity:unset}brx-input[inline]{display:-ms-flexbox;display:flex}brx-input[inline] .brx-input-label{margin-right:var(--spacing-scale-baseh);margin-top:calc(var(--input-size) * 0.5 - var(--spacing-scale-half))}brx-input[inline] .brx-input-content{-ms-flex:1;flex:1}brx-input .brx-input-group{position:relative}brx-input .brx-input-icon{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:absolute;color:var(--border-color-alternative);height:var(--input-size);margin-left:var(--spacing-scale-baseh)}brx-input .brx-input-icon+input{padding-left:var(--input-padding-icon)}brx-input brx-button{--button-size:var(--button-small);float:right;position:relative;-webkit-transform:translateY(calc((var(--input-size) - var(--button-size)) * 0.5));transform:translateY(calc((var(--input-size) - var(--button-size)) * 0.5));margin-right:var(--input-button-margin);margin-top:calc((var(--input-size) + var(--spacing-scale-half)) * -1)}brx-input brx-button .brx-button-native{--color:var(--color-light);--color-rgb:var(--color-light-rgb);--text-color:var(--color);--interactive:var(--interactive-light);--interactive-rgb:var(--interactive-light-rgb);--visited:var(--visited-light);--hover:var(--hover-light);--pressed:var(--pressed-light);--focus-color:var(--focus-color-light);--focus:var(--focus-color);border-radius:50%;padding:0;width:var(--button-size)}brx-input[button] input{padding-right:var(--input-padding-button)}brx-input[icon] input{padding-right:var(--input-padding-icon)}brx-input[icon] brx-button[circle]{float:right;margin-right:var(--spacing-scale-half);margin-top:calc((var(--button-size) + var(--spacing-scale-half) + var(--spacing-scale-half)) * -1);-webkit-transform:translateY(0);transform:translateY(0)}brx-input[icon][density=small] brx-button[circle]{margin-top:calc((var(--button-size) + var(--spacing-scale-base)) * -1)}brx-input[icon][density=large] brx-button[circle]{margin-top:calc(var(--button-size) * -1)}brx-input[highlight]{--input-button-margin:var(--spacing-scale-2x);--input-padding:0 var(--spacing-scale-3x);--input-padding-button:var(--spacing-scale-7x);--input-padding-icon:var(--spacing-scale-7x);--input-size:var(--input-highlight)}brx-input[highlight] input{background-color:var(--gray-2);border-color:transparent;padding-left:var(--spacing-scale-3x);padding-right:var(--spacing-scale-3x)}brx-input[highlight] .brx-input-icon{margin-left:var(--spacing-scale-3x)}brx-input[highlight] .brx-input-icon+input{padding-left:var(--spacing-scale-7x)}brx-input .br-list{-webkit-box-shadow:var(--surface-shadow-md);box-shadow:var(--surface-shadow-md);max-height:530px;overflow:auto;position:absolute;width:100%;z-index:var(--z-index-layer-2)}brx-input .br-list::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-input .br-list::-webkit-scrollbar-track{background:var(--gray-10)}brx-input .br-list::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-input .br-list:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-input .br-list brx-item{--item-padding-y:var(--spacing-scale-2x)}brx-input .br-list brx-item:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-input .br-list brx-item:not(:first-child){border-top:var(--surface-width-sm) solid var(--border-color)}brx-input[color=success] input{border-color:var(--success);border-width:2px}brx-input[color=danger] input{border-color:var(--danger);border-width:2px}brx-input[color=warning] input{border-color:var(--warning);border-width:2px}brx-input[color=info] input{border-color:var(--info);border-width:2px}brx-input input:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-input input:focus,brx-input input:focus-visible,brx-input input.focus-visible{border-color:var(--focus) !important;-webkit-box-shadow:0 0 0 var(--surface-width-md) var(--focus);box-shadow:0 0 0 var(--surface-width-md) var(--focus);outline:none}brx-input brx-message[variant=feedback]{margin-bottom:var(--spacing-scale-half)}brx-input[density=small]{--input-size:var(--input-small)}brx-input[density=medium]{--input-size:var(--input-medium)}brx-input[density=large]{--input-size:var(--input-large)}brx-input[dark-mode],brx-input[dark-mode] label{--color:var(--color-dark);--focus-color:var(--focus-color-dark)}";

class BrxInput {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxInput = createEvent(this, "brxInput", 7);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.brxBlur = createEvent(this, "brxBlur", 7);
    this.brxFocus = createEvent(this, "brxFocus", 7);
    this.didBlurAfterEdit = false;
    this.onInput = (event) => {
      const oldValue = this.getValue();
      const newValue = this.nativeInput.value;
      this.nativeInput.value = oldValue;
      this.setValue(newValue);
      this.brxInput.emit(event);
    };
    this.onBlur = () => {
      this.hasFocus = false;
      this.focusChanged();
      this.brxBlur.emit();
    };
    this.onFocus = () => {
      this.hasFocus = true;
      this.focusChanged();
      this.brxFocus.emit();
    };
    this.onKeydown = (ev) => {
      if (this.shouldClearOnEdit()) {
        // Did the input value change after it was blurred and edited?
        // Do not clear if user is hitting Enter to submit form
        if (this.didBlurAfterEdit && this.hasValue() && ev.key !== 'Enter') {
          // Clear the input
          this.clearTextInput();
        }
        // Reset the flag
        this.didBlurAfterEdit = false;
      }
    };
    this.clearTextInput = (event) => {
      if (this.clearInput && !this.readonly && !this.disabled && event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.setValue('');
    };
    this.value = undefined;
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = undefined;
    this.hasFocus = false;
    this.accept = undefined;
    this.autocapitalize = 'off';
    this.autocomplete = 'off';
    this.autocorrect = 'off';
    this.autofocus = false;
    this.clearInput = false;
    this.clearOnEdit = undefined;
    this.disabled = false;
    this.enterkeyhint = undefined;
    this.inputmode = undefined;
    this.max = undefined;
    this.maxlength = undefined;
    this.min = undefined;
    this.minlength = undefined;
    this.multiple = undefined;
    this.name = undefined;
    this.pattern = undefined;
    this.placeholder = undefined;
    this.readonly = false;
    this.required = false;
    this.spellcheck = false;
    this.step = undefined;
    this.size = undefined;
    this.type = 'text';
    this.label = undefined;
    this.hiddenLabel = undefined;
    this.labelClass = undefined;
    this.inline = undefined;
    this.inputId = undefined;
    this.density = undefined;
    this.startIconName = undefined;
    this.color = undefined;
    this.enablePasswordToggle = false;
    this.showPassword = false;
  }
  syncCurrentValueFromProps() {
    const targetValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = String(targetValue !== null && targetValue !== void 0 ? targetValue : '');
  }
  setValue(value) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }
    this.brxChange.emit({ value });
  }
  /**
   * Sets focus on the specified `my-input`. Use this method instead of the global
   * `input.focus()`.
   */
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }
  /**
   * Returns the native `<input>` element used under the hood.
   */
  getInputElement() {
    return Promise.resolve(this.nativeInput);
  }
  async toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  setupShowPassword() {
    if (this.enablePasswordToggle) {
      this.showPassword = this.type === 'text';
    }
  }
  shouldClearOnEdit() {
    const { type, clearOnEdit } = this;
    return clearOnEdit === undefined ? type === 'password' : clearOnEdit;
  }
  getValue() {
    var _a;
    return String((_a = this.currentValue) !== null && _a !== void 0 ? _a : '');
  }
  focusChanged() {
    // If clearOnEdit is enabled and the input blurred but has a value, set a flag
    if (!this.hasFocus && this.shouldClearOnEdit() && this.hasValue()) {
      this.didBlurAfterEdit = true;
    }
  }
  hasValue() {
    return this.getValue().length > 0;
  }
  get inheritedAttributes() {
    return inheritAriaAttributes(this.el);
  }
  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
    this.syncCurrentValueFromProps();
    // If the my-input has a tabindex attribute we get the value
    // and pass it down to the native input, then remove it from the
    // my-input to avoid causing tabbing twice on the same element
    if (this.el.hasAttribute('tabindex')) {
      const tabindex = this.el.getAttribute('tabindex');
      this.tabindex = tabindex !== null ? tabindex : undefined;
      this.el.removeAttribute('tabindex');
    }
  }
  render() {
    const { disabled, hiddenLabel, labelClass, startIconName, inputId, enablePasswordToggle, showPassword, inheritedAttributes } = this;
    const value = this.getValue();
    const labelId = inputId + '-lbl';
    const type = enablePasswordToggle ? (showPassword ? 'text' : 'password') : this.type;
    return (hAsync(Host, { "aria-disabled": disabled ? 'true' : null }, hAsync("div", { class: "brx-input-label" }, hAsync("label", { class: `${hiddenLabel ? 'sr-only' : ''} ${labelClass}`, id: labelId, htmlFor: this.inputId }, this.label)), hAsync("div", { class: "brx-input-content" }, hAsync("div", { class: "brx-input-group" }, startIconName && (hAsync("div", { class: "brx-input-icon" }, hAsync("brx-icon", { name: startIconName }))), hAsync("input", Object.assign({ type: type, id: inputId, value: value, min: this.min, max: this.max, step: this.step, size: this.size, name: this.name, disabled: disabled, accept: this.accept, pattern: this.pattern, tabindex: this.tabindex, multiple: this.multiple, readOnly: this.readonly, required: this.required, "aria-labelledby": labelId, minLength: this.minlength, maxLength: this.maxlength, inputMode: this.inputmode, autoFocus: this.autofocus, autoCorrect: this.autocorrect, autoComplete: this.autocomplete, enterKeyHint: this.enterkeyhint, autoCapitalize: this.autocapitalize, placeholder: this.placeholder || '', spellcheck: this.spellcheck ? 'true' : undefined, onBlur: this.onBlur, onInput: this.onInput, onFocus: this.onFocus, onKeyDown: this.onKeydown, ref: input => void (this.nativeInput = input) }, inheritedAttributes)), this.clearInput && !this.readonly && !this.disabled && (hAsync("button", { type: "button", tabindex: "-1", onClick: this.clearTextInput, onMouseDown: this.clearTextInput, onTouchStart: this.clearTextInput, onPointerDown: event => void event.preventDefault() }, hAsync("brx-icon", { name: "fa5/fas/times" }))), enablePasswordToggle && (hAsync(Fragment, null, hAsync("brx-button", { size: "small", "aria-label": "Mostrar senha", onClick: () => this.toggleShowPassword() }, hAsync("brx-icon", { name: showPassword ? 'fa5/fas/eye-slash' : 'fa5/fas/eye' }))))), hAsync("slot", { name: 'end-button' })), hAsync("slot", { name: "helper" }), hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"],
    "enablePasswordToggle": ["setupShowPassword"]
  }; }
  static get style() { return brxInputCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-input",
    "$members$": {
      "value": [8],
      "controlledValue": [8, "controlled-value"],
      "accept": [1],
      "autocapitalize": [1],
      "autocomplete": [1],
      "autocorrect": [1],
      "autofocus": [4],
      "clearInput": [4, "clear-input"],
      "clearOnEdit": [4, "clear-on-edit"],
      "disabled": [4],
      "enterkeyhint": [1],
      "inputmode": [1],
      "max": [1],
      "maxlength": [2],
      "min": [1],
      "minlength": [2],
      "multiple": [4],
      "name": [1],
      "pattern": [1],
      "placeholder": [1],
      "readonly": [4],
      "required": [4],
      "spellcheck": [4],
      "step": [1],
      "size": [2],
      "type": [1],
      "label": [1],
      "hiddenLabel": [516, "hidden-label"],
      "labelClass": [1, "label-class"],
      "inline": [516],
      "inputId": [1025, "input-id"],
      "density": [513],
      "startIconName": [1, "start-icon-name"],
      "color": [513],
      "enablePasswordToggle": [4, "enable-password-toggle"],
      "currentValue": [32],
      "hasFocus": [32],
      "showPassword": [32],
      "setFocus": [64],
      "getInputElement": [64],
      "toggleShowPassword": [64]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["hiddenLabel", "hidden-label"], ["inline", "inline"], ["density", "density"], ["color", "color"]]
  }; }
}

const brxItemCss = "brx-item:not([pass-styles]){background:var(--background);--item-padding-x:var(--spacing-scale-2x);--item-padding-y:var(--spacing-scale-base);--item-padding:var(--item-padding-y) var(--item-padding-x);--focus-offset:calc(var(--focus-width) * -1);border:0;color:var(--color);display:block;font-weight:var(--font-weight);padding:var(--item-padding);text-align:left;width:100%}brx-item:not([pass-styles]) .row{margin-left:calc(-1 * var(--spacing-scale-base));margin-right:calc(-1 * var(--spacing-scale-base))}brx-item:not([pass-styles]) .row .col,brx-item:not([pass-styles]) .row [class*=col-]{padding-left:var(--spacing-scale-base);padding-right:var(--spacing-scale-base)}brx-item:not([pass-styles])::after{clear:both;content:\"\";display:block}brx-item:not([pass-styles])[button],brx-item:not([pass-styles])[data-toggle]{cursor:pointer}brx-item:not([pass-styles])[data-toggle=selection]:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-item:not([pass-styles]) brx-checkbox:not(.hidden-label):not([hidden-label]),brx-item:not([pass-styles]) brx-radio:not(.hidden-label):not([hidden-label]){margin-bottom:calc(var(--item-padding-y) * -1);margin-left:calc(var(--item-padding-x) * -1);margin-right:calc(var(--item-padding-x) * -1);margin-top:calc(var(--item-padding-y) * -1)}brx-item:not([pass-styles]) brx-checkbox:not(.hidden-label):not([hidden-label]) input+label,brx-item:not([pass-styles]) brx-radio:not(.hidden-label):not([hidden-label]) input+label{padding-bottom:var(--item-padding-y);padding-top:var(--item-padding-y);top:1px;width:100%}brx-item:not([pass-styles]) brx-checkbox:not(.hidden-label):not([hidden-label]) input+label::before,brx-item:not([pass-styles]) brx-radio:not(.hidden-label):not([hidden-label]) input+label::before{left:var(--item-padding-x);top:calc(var(--item-padding-y) - 1px)}brx-item:not([pass-styles]) brx-checkbox:not(.hidden-label):not([hidden-label]) input+label:empty,brx-item:not([pass-styles]) brx-radio:not(.hidden-label):not([hidden-label]) input+label:empty{left:0;top:1px}brx-item:not([pass-styles]) brx-checkbox:not(.hidden-label):not([hidden-label]) input:hover:not(:disabled)+label::before,brx-item:not([pass-styles]) brx-radio:not(.hidden-label):not([hidden-label]) input:hover:not(:disabled)+label::before{background-image:none}brx-item:not([pass-styles]) brx-checkbox input+label{min-height:calc(var(--checkbox-size) + var(--item-padding-y) * 2)}brx-item:not([pass-styles]) brx-checkbox input+label:not(:empty){padding-left:calc(var(--checkbox-padding) + var(--checkbox-size) + var(--item-padding-x))}brx-item:not([pass-styles]) brx-checkbox input+label::after{left:calc(var(--item-padding-x) + 8px);top:calc(var(--item-padding-y) + 4px)}brx-item:not([pass-styles]) brx-checkbox input+label:empty{min-height:var(--checkbox-size)}brx-item:not([pass-styles]) brx-checkbox input+label:empty::after{left:8px;top:4px}brx-item:not([pass-styles]) brx-radio input+label{min-height:calc(var(--radio-size) + var(--item-padding-y) * 2);padding-left:calc(var(--spacing-scale-base) + var(--radio-size) + var(--item-padding-x))}brx-item:not([pass-styles]) brx-radio input+label::after{left:calc(var(--item-padding-x) + var(--radio-bullet-position));top:calc(var(--item-padding-y) + var(--radio-bullet-position) - 1px)}brx-item:not([pass-styles]) brx-radio input+label:empty{min-height:var(--radio-size)}brx-item:not([pass-styles]) brx-radio input+label:empty::after{left:var(--radio-bullet-position);top:var(--radio-bullet-position)}brx-item:not([pass-styles]).primary-lighten-01{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).primary-lighten-02{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).primary-default{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).primary-darken-01{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).primary-darken-02{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).secondary-06{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).secondary-07{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).secondary-08{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).secondary-09{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).highlight{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).support-01{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).support-03{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).support-04{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).support-07{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles]).support-08{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles])[selected]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color);background-color:var(--selected)}brx-item:not([pass-styles])[active]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color);background-color:var(--active);color:var(--color)}brx-item:not([pass-styles])[dark-mode]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item:not([pass-styles])[dark-mode][active]{--color:var(--color-light);--color-rgb:var(--color-light-rgb);--text-color:var(--color);--interactive:var(--interactive-light);--interactive-rgb:var(--interactive-light-rgb);--visited:var(--visited-light);--hover:var(--hover-light);--pressed:var(--pressed-light);--focus-color:var(--focus-color-light);--focus:var(--focus-color);--interactive-rgb:var(--active-rgb);background-color:var(--background-light);color:var(--active)}brx-item:not([pass-styles])[button]:not([data-disable-hover-interaction]):not(:disabled):hover,brx-item:not([pass-styles])[data-toggle]:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-item:not([pass-styles])[button] .content i,brx-item:not([pass-styles])[data-toggle] .content i{color:var(--interactive)}brx-item:not([pass-styles]) .content{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}brx-item:not([pass-styles]) [class*=fa-]{height:16px;width:14px !important}brx-item:not([pass-styles]) .toogle-icon-interactive{color:var(--interactive)}brx-item[pass-styles]>*{width:100%;height:100%;border:none;display:block;background:var(--background);--item-padding-x:var(--spacing-scale-2x);--item-padding-y:var(--spacing-scale-base);--item-padding:var(--item-padding-y) var(--item-padding-x);--focus-offset:calc(var(--focus-width) * -1);border:0;color:var(--color);display:block;font-weight:var(--font-weight);padding:var(--item-padding);text-align:left;width:100%}brx-item[pass-styles]>* .row{margin-left:calc(-1 * var(--spacing-scale-base));margin-right:calc(-1 * var(--spacing-scale-base))}brx-item[pass-styles]>* .row .col,brx-item[pass-styles]>* .row [class*=col-]{padding-left:var(--spacing-scale-base);padding-right:var(--spacing-scale-base)}brx-item[pass-styles]>*::after{clear:both;content:\"\";display:block}brx-item[pass-styles]>*[button],brx-item[pass-styles]>*[data-toggle]{cursor:pointer}brx-item[pass-styles]>*[data-toggle=selection]:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-item[pass-styles]>* brx-checkbox:not(.hidden-label):not([hidden-label]),brx-item[pass-styles]>* brx-radio:not(.hidden-label):not([hidden-label]){margin-bottom:calc(var(--item-padding-y) * -1);margin-left:calc(var(--item-padding-x) * -1);margin-right:calc(var(--item-padding-x) * -1);margin-top:calc(var(--item-padding-y) * -1)}brx-item[pass-styles]>* brx-checkbox:not(.hidden-label):not([hidden-label]) input+label,brx-item[pass-styles]>* brx-radio:not(.hidden-label):not([hidden-label]) input+label{padding-bottom:var(--item-padding-y);padding-top:var(--item-padding-y);top:1px;width:100%}brx-item[pass-styles]>* brx-checkbox:not(.hidden-label):not([hidden-label]) input+label::before,brx-item[pass-styles]>* brx-radio:not(.hidden-label):not([hidden-label]) input+label::before{left:var(--item-padding-x);top:calc(var(--item-padding-y) - 1px)}brx-item[pass-styles]>* brx-checkbox:not(.hidden-label):not([hidden-label]) input+label:empty,brx-item[pass-styles]>* brx-radio:not(.hidden-label):not([hidden-label]) input+label:empty{left:0;top:1px}brx-item[pass-styles]>* brx-checkbox:not(.hidden-label):not([hidden-label]) input:hover:not(:disabled)+label::before,brx-item[pass-styles]>* brx-radio:not(.hidden-label):not([hidden-label]) input:hover:not(:disabled)+label::before{background-image:none}brx-item[pass-styles]>* brx-checkbox input+label{min-height:calc(var(--checkbox-size) + var(--item-padding-y) * 2)}brx-item[pass-styles]>* brx-checkbox input+label:not(:empty){padding-left:calc(var(--checkbox-padding) + var(--checkbox-size) + var(--item-padding-x))}brx-item[pass-styles]>* brx-checkbox input+label::after{left:calc(var(--item-padding-x) + 8px);top:calc(var(--item-padding-y) + 4px)}brx-item[pass-styles]>* brx-checkbox input+label:empty{min-height:var(--checkbox-size)}brx-item[pass-styles]>* brx-checkbox input+label:empty::after{left:8px;top:4px}brx-item[pass-styles]>* brx-radio input+label{min-height:calc(var(--radio-size) + var(--item-padding-y) * 2);padding-left:calc(var(--spacing-scale-base) + var(--radio-size) + var(--item-padding-x))}brx-item[pass-styles]>* brx-radio input+label::after{left:calc(var(--item-padding-x) + var(--radio-bullet-position));top:calc(var(--item-padding-y) + var(--radio-bullet-position) - 1px)}brx-item[pass-styles]>* brx-radio input+label:empty{min-height:var(--radio-size)}brx-item[pass-styles]>* brx-radio input+label:empty::after{left:var(--radio-bullet-position);top:var(--radio-bullet-position)}brx-item[pass-styles]>*.primary-lighten-01{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.primary-lighten-02{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.primary-default{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.primary-darken-01{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.primary-darken-02{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.secondary-06{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.secondary-07{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.secondary-08{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.secondary-09{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.highlight{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.support-01{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.support-03{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.support-04{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.support-07{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*.support-08{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*[selected]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color);background-color:var(--selected)}brx-item[pass-styles]>*[active]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color);background-color:var(--active);color:var(--color)}brx-item[pass-styles]>*[dark-mode]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-item[pass-styles]>*[dark-mode][active]{--color:var(--color-light);--color-rgb:var(--color-light-rgb);--text-color:var(--color);--interactive:var(--interactive-light);--interactive-rgb:var(--interactive-light-rgb);--visited:var(--visited-light);--hover:var(--hover-light);--pressed:var(--pressed-light);--focus-color:var(--focus-color-light);--focus:var(--focus-color);--interactive-rgb:var(--active-rgb);background-color:var(--background-light);color:var(--active)}brx-item[pass-styles]>*[button]:not([data-disable-hover-interaction]):not(:disabled):hover,brx-item[pass-styles]>*[data-toggle]:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-item[pass-styles]>*[button] .content i,brx-item[pass-styles]>*[data-toggle] .content i{color:var(--interactive)}brx-item[pass-styles]>* .content{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}brx-item[pass-styles]>* [class*=fa-]{height:16px;width:14px !important}brx-item[pass-styles]>* .toogle-icon-interactive{color:var(--interactive)}brx-item[pass-styles]>a{color:var(--interactive);height:auto}brx-item[pass-styles]>a:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-item[pass-styles]>a:not(:disabled):active{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--pressed))), to(rgba(var(--interactive-rgb), var(--pressed))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--pressed)), rgba(var(--interactive-rgb), var(--pressed)))}brx-item[pass-styles]>button{background-color:transparent;color:var(--color)}brx-item[pass-styles]>button:focus{outline:none}brx-item[pass-styles]>button.focus-visible,brx-item[pass-styles]>button:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-item[pass-styles]>button:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-item[pass-styles]>button:not(:disabled):active{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--pressed))), to(rgba(var(--color-rgb), var(--pressed))));background-image:linear-gradient(rgba(var(--color-rgb), var(--pressed)), rgba(var(--color-rgb), var(--pressed)))}";

class BrxItem {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.syncInProgress = false;
    this.button = undefined;
    this.disabled = undefined;
    this.selected = undefined;
    this.passStyles = undefined;
  }
  async getBrxInput() {
    var _a;
    return (_a = this.el.querySelector('brx-radio, brx-checkbox')) !== null && _a !== void 0 ? _a : null;
  }
  async syncSelectedState() {
    const brxInput = await this.getBrxInput();
    if (brxInput) {
      const { checked } = await brxInput.getCurrentState();
      this.selected = checked;
    }
  }
  watchChange() {
    if (!this.syncInProgress) {
      this.syncInProgress = true;
      this.syncSelectedState().then(() => {
        this.syncInProgress = false;
      });
    }
  }
  componentDidLoad() {
    this.syncSelectedState();
  }
  render() {
    return (hAsync(Host, { role: "listitem" }, hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get style() { return brxItemCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-item",
    "$members$": {
      "button": [516],
      "disabled": [516],
      "selected": [1540],
      "passStyles": [516, "pass-styles"]
    },
    "$listeners$": [[0, "brxUpdate", "watchChange"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["button", "button"], ["disabled", "disabled"], ["selected", "selected"], ["passStyles", "pass-styles"]]
  }; }
}

const brxListCss = "brx-list{display:block;background-color:var(--background)}brx-list.horizontal,brx-list[horizontal],brx-list[orientation=horizontal]{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}brx-list.horizontal>brx-list-header,brx-list[horizontal]>brx-list-header,brx-list[orientation=horizontal]>brx-list-header{-ms-flex-positive:1;flex-grow:1;width:100%}brx-list.horizontal>brx-list-header+brx-divider,brx-list[horizontal]>brx-list-header+brx-divider,brx-list[orientation=horizontal]>brx-list-header+brx-divider{border-top:1px solid var(--border-color);width:100%}brx-list.horizontal>brx-item,brx-list.horizontal>.group,brx-list[horizontal]>brx-item,brx-list[horizontal]>.group,brx-list[orientation=horizontal]>brx-item,brx-list[orientation=horizontal]>.group{-ms-flex:1;flex:1;height:auto;min-height:56px;width:auto}brx-list.horizontal>brx-item+brx-divider,brx-list.horizontal>.group+brx-divider,brx-list[horizontal]>brx-item+brx-divider,brx-list[horizontal]>.group+brx-divider,brx-list[orientation=horizontal]>brx-item+brx-divider,brx-list[orientation=horizontal]>.group+brx-divider{border-width:0 1px 0 0;width:1px}brx-list.horizontal>brx-item.one-line>.content,brx-list.horizontal>brx-item[one-line]>.content,brx-list.horizontal>brx-item[lines=one]>.content,brx-list.horizontal>.group.one-line>.content,brx-list.horizontal>.group[one-line]>.content,brx-list.horizontal>.group[lines=one]>.content,brx-list[horizontal]>brx-item.one-line>.content,brx-list[horizontal]>brx-item[one-line]>.content,brx-list[horizontal]>brx-item[lines=one]>.content,brx-list[horizontal]>.group.one-line>.content,brx-list[horizontal]>.group[one-line]>.content,brx-list[horizontal]>.group[lines=one]>.content,brx-list[orientation=horizontal]>brx-item.one-line>.content,brx-list[orientation=horizontal]>brx-item[one-line]>.content,brx-list[orientation=horizontal]>brx-item[lines=one]>.content,brx-list[orientation=horizontal]>.group.one-line>.content,brx-list[orientation=horizontal]>.group[one-line]>.content,brx-list[orientation=horizontal]>.group[lines=one]>.content{height:56px}brx-list.horizontal>brx-item.two-lines>.content,brx-list.horizontal>brx-item[two-lines]>.content,brx-list.horizontal>brx-item[lines=two]>.content,brx-list.horizontal>.group.two-lines>.content,brx-list.horizontal>.group[two-lines]>.content,brx-list.horizontal>.group[lines=two]>.content,brx-list[horizontal]>brx-item.two-lines>.content,brx-list[horizontal]>brx-item[two-lines]>.content,brx-list[horizontal]>brx-item[lines=two]>.content,brx-list[horizontal]>.group.two-lines>.content,brx-list[horizontal]>.group[two-lines]>.content,brx-list[horizontal]>.group[lines=two]>.content,brx-list[orientation=horizontal]>brx-item.two-lines>.content,brx-list[orientation=horizontal]>brx-item[two-lines]>.content,brx-list[orientation=horizontal]>brx-item[lines=two]>.content,brx-list[orientation=horizontal]>.group.two-lines>.content,brx-list[orientation=horizontal]>.group[two-lines]>.content,brx-list[orientation=horizontal]>.group[lines=two]>.content{height:72px}brx-list.horizontal>brx-item.three-lines>.content,brx-list.horizontal>brx-item[three-lines]>.content,brx-list.horizontal>brx-item[lines=three]>.content,brx-list.horizontal>.group.three-lines>.content,brx-list.horizontal>.group[three-lines]>.content,brx-list.horizontal>.group[lines=three]>.content,brx-list[horizontal]>brx-item.three-lines>.content,brx-list[horizontal]>brx-item[three-lines]>.content,brx-list[horizontal]>brx-item[lines=three]>.content,brx-list[horizontal]>.group.three-lines>.content,brx-list[horizontal]>.group[three-lines]>.content,brx-list[horizontal]>.group[lines=three]>.content,brx-list[orientation=horizontal]>brx-item.three-lines>.content,brx-list[orientation=horizontal]>brx-item[three-lines]>.content,brx-list[orientation=horizontal]>brx-item[lines=three]>.content,brx-list[orientation=horizontal]>.group.three-lines>.content,brx-list[orientation=horizontal]>.group[three-lines]>.content,brx-list[orientation=horizontal]>.group[lines=three]>.content{height:6em}brx-list.horizontal[data-toggle]>brx-item,brx-list.horizontal.toggle>brx-item,brx-list[horizontal][data-toggle]>brx-item,brx-list[horizontal].toggle>brx-item,brx-list[orientation=horizontal][data-toggle]>brx-item,brx-list[orientation=horizontal].toggle>brx-item{display:block}brx-list brx-item{text-align:left;width:100%}brx-list brx-item .svg-inline--fa,brx-list brx-item .fa,brx-list brx-item .fab,brx-list brx-item .fad,brx-list brx-item .fal,brx-list brx-item .far,brx-list brx-item .fas{text-align:center}brx-list brx-item>.content{-ms-flex-align:var(--spacing-vertical-top);align-items:var(--spacing-vertical-top);display:-ms-flexbox;display:flex}brx-list brx-item>.content>.content{-ms-flex:1;flex:1}brx-list brx-item .content:hover brx-button{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-list brx-item[data-toggle]{cursor:pointer}brx-list brx-item[data-toggle]~brx-list brx-item{padding:var(--spacing-scale-base) var(--spacing-scale-3x)}brx-list brx-list{overflow:hidden;-webkit-transition:all 400ms ease-in-out;transition:all 400ms ease-in-out}brx-list brx-list-header{-ms-flex-align:var(--spacing-vertical-center);align-items:var(--spacing-vertical-center);display:-ms-flexbox;display:flex;font-size:var(--font-size-scale-base);font-weight:var(--font-weight-bold);-ms-flex-pack:justify;justify-content:space-between;padding:var(--spacing-scale-base) var(--spacing-scale-2x)}brx-list[data-one-line] brx-item,brx-list[data-one-line] brx-list brx-item,brx-list[lines=one] brx-item,brx-list[lines=one] brx-list brx-item{height:2em}brx-list[data-one-line] brx-item .content,brx-list[data-one-line] brx-list brx-item .content,brx-list[lines=one] brx-item .content,brx-list[lines=one] brx-list brx-item .content{height:auto;overflow:hidden;padding:0 var(--spacing-scale-2x);text-overflow:unset;white-space:initial}brx-list[data-two-lines] brx-item,brx-list[data-two-lines] brx-list brx-item,brx-list[lines=two] brx-item,brx-list[lines=two] brx-list brx-item{height:4em}brx-list[data-two-lines] brx-item .content,brx-list[data-two-lines] brx-list brx-item .content,brx-list[lines=two] brx-item .content,brx-list[lines=two] brx-list brx-item .content{height:auto;overflow:hidden;padding:0 var(--spacing-scale-2x);text-overflow:unset;white-space:initial}brx-list[data-three-lines] brx-item,brx-list[data-three-lines] brx-list brx-item,brx-list[lines=three] brx-item,brx-list[lines=three] brx-list brx-item{height:6em}brx-list[data-three-lines] brx-item .content,brx-list[data-three-lines] brx-list brx-item .content,brx-list[lines=three] brx-item .content,brx-list[lines=three] brx-list brx-item .content{height:auto;overflow:hidden;padding:0 var(--spacing-scale-2x);text-overflow:unset;white-space:initial}";

class BrxList {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.horizontal = undefined;
    this.lines = undefined;
    this.headerTitle = undefined;
  }
  render() {
    return (hAsync(Host, { role: "list" }, this.headerTitle && hAsync("brx-list-header", { headerTitle: this.headerTitle }), hAsync("slot", null)));
  }
  static get style() { return brxListCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-list",
    "$members$": {
      "horizontal": [516],
      "lines": [513],
      "headerTitle": [513, "header-title"]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["horizontal", "horizontal"], ["lines", "lines"], ["headerTitle", "header-title"]]
  }; }
}

class BrxListHeader {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.headerTitle = undefined;
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", { name: "title" }, hAsync("div", { class: "brx-header-title" }, this.headerTitle))));
  }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-list-header",
    "$members$": {
      "headerTitle": [513, "header-title"]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["headerTitle", "header-title"]]
  }; }
}

const brxLoadingCss = "brx-loading{display:block}brx-loading[mode=determinate]{--loading-indetermined-color:var(--interactive);--loading-indetermined-diameter-md:44px;--loading-indetermined-diameter-sm:24px;--loading-diameter:84px;background-color:var(--color-secondary-04);border-radius:50%;height:var(--loading-diameter);width:var(--loading-diameter);z-index:var(--z-index-layer-4)}brx-loading[mode=determinate] .brx-loading-mask,brx-loading[mode=determinate] .brx-loading-fill{-webkit-backface-visibility:hidden;backface-visibility:hidden;border-radius:50%;clip:rect(0, 84px, 84px, 42px);height:84px;overflow:hidden;position:absolute;width:84px}brx-loading[mode=determinate] .brx-loading-fill{background:var(--interactive);clip:rect(0, 42px, 84px, 0)}brx-loading[mode=determinate]::after{background:var(--color-secondary-01);border-radius:50%;color:var(--interactive);content:attr(data-progress) \"%\";font-size:var(--font-size-scale-up-02);font-weight:var(--font-weight-semi-bold);height:74px;line-height:74px;margin:5px;position:absolute;text-align:center;width:74px}@-webkit-keyframes fill{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}@keyframes fill{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}brx-loading[mode=determinate][data-progress=\"1\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"1\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(1.8deg);transform:rotate(1.8deg)}brx-loading[mode=determinate][data-progress=\"2\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"2\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(3.6deg);transform:rotate(3.6deg)}brx-loading[mode=determinate][data-progress=\"3\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"3\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(5.4deg);transform:rotate(5.4deg)}brx-loading[mode=determinate][data-progress=\"4\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"4\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(7.2deg);transform:rotate(7.2deg)}brx-loading[mode=determinate][data-progress=\"5\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"5\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(9deg);transform:rotate(9deg)}brx-loading[mode=determinate][data-progress=\"6\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"6\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(10.8deg);transform:rotate(10.8deg)}brx-loading[mode=determinate][data-progress=\"7\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"7\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(12.6deg);transform:rotate(12.6deg)}brx-loading[mode=determinate][data-progress=\"8\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"8\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(14.4deg);transform:rotate(14.4deg)}brx-loading[mode=determinate][data-progress=\"9\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"9\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(16.2deg);transform:rotate(16.2deg)}brx-loading[mode=determinate][data-progress=\"10\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"10\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(18deg);transform:rotate(18deg)}brx-loading[mode=determinate][data-progress=\"11\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"11\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(19.8deg);transform:rotate(19.8deg)}brx-loading[mode=determinate][data-progress=\"12\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"12\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(21.6deg);transform:rotate(21.6deg)}brx-loading[mode=determinate][data-progress=\"13\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"13\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(23.4deg);transform:rotate(23.4deg)}brx-loading[mode=determinate][data-progress=\"14\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"14\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(25.2deg);transform:rotate(25.2deg)}brx-loading[mode=determinate][data-progress=\"15\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"15\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(27deg);transform:rotate(27deg)}brx-loading[mode=determinate][data-progress=\"16\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"16\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(28.8deg);transform:rotate(28.8deg)}brx-loading[mode=determinate][data-progress=\"17\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"17\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(30.6deg);transform:rotate(30.6deg)}brx-loading[mode=determinate][data-progress=\"18\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"18\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(32.4deg);transform:rotate(32.4deg)}brx-loading[mode=determinate][data-progress=\"19\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"19\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(34.2deg);transform:rotate(34.2deg)}brx-loading[mode=determinate][data-progress=\"20\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"20\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(36deg);transform:rotate(36deg)}brx-loading[mode=determinate][data-progress=\"21\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"21\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(37.8deg);transform:rotate(37.8deg)}brx-loading[mode=determinate][data-progress=\"22\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"22\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(39.6deg);transform:rotate(39.6deg)}brx-loading[mode=determinate][data-progress=\"23\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"23\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(41.4deg);transform:rotate(41.4deg)}brx-loading[mode=determinate][data-progress=\"24\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"24\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(43.2deg);transform:rotate(43.2deg)}brx-loading[mode=determinate][data-progress=\"25\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"25\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(45deg);transform:rotate(45deg)}brx-loading[mode=determinate][data-progress=\"26\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"26\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(46.8deg);transform:rotate(46.8deg)}brx-loading[mode=determinate][data-progress=\"27\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"27\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(48.6deg);transform:rotate(48.6deg)}brx-loading[mode=determinate][data-progress=\"28\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"28\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(50.4deg);transform:rotate(50.4deg)}brx-loading[mode=determinate][data-progress=\"29\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"29\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(52.2deg);transform:rotate(52.2deg)}brx-loading[mode=determinate][data-progress=\"30\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"30\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(54deg);transform:rotate(54deg)}brx-loading[mode=determinate][data-progress=\"31\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"31\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(55.8deg);transform:rotate(55.8deg)}brx-loading[mode=determinate][data-progress=\"32\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"32\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(57.6deg);transform:rotate(57.6deg)}brx-loading[mode=determinate][data-progress=\"33\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"33\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(59.4deg);transform:rotate(59.4deg)}brx-loading[mode=determinate][data-progress=\"34\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"34\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(61.2deg);transform:rotate(61.2deg)}brx-loading[mode=determinate][data-progress=\"35\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"35\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(63deg);transform:rotate(63deg)}brx-loading[mode=determinate][data-progress=\"36\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"36\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(64.8deg);transform:rotate(64.8deg)}brx-loading[mode=determinate][data-progress=\"37\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"37\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(66.6deg);transform:rotate(66.6deg)}brx-loading[mode=determinate][data-progress=\"38\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"38\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(68.4deg);transform:rotate(68.4deg)}brx-loading[mode=determinate][data-progress=\"39\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"39\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(70.2deg);transform:rotate(70.2deg)}brx-loading[mode=determinate][data-progress=\"40\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"40\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(72deg);transform:rotate(72deg)}brx-loading[mode=determinate][data-progress=\"41\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"41\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(73.8deg);transform:rotate(73.8deg)}brx-loading[mode=determinate][data-progress=\"42\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"42\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(75.6deg);transform:rotate(75.6deg)}brx-loading[mode=determinate][data-progress=\"43\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"43\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(77.4deg);transform:rotate(77.4deg)}brx-loading[mode=determinate][data-progress=\"44\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"44\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(79.2deg);transform:rotate(79.2deg)}brx-loading[mode=determinate][data-progress=\"45\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"45\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(81deg);transform:rotate(81deg)}brx-loading[mode=determinate][data-progress=\"46\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"46\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(82.8deg);transform:rotate(82.8deg)}brx-loading[mode=determinate][data-progress=\"47\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"47\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(84.6deg);transform:rotate(84.6deg)}brx-loading[mode=determinate][data-progress=\"48\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"48\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(86.4deg);transform:rotate(86.4deg)}brx-loading[mode=determinate][data-progress=\"49\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"49\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(88.2deg);transform:rotate(88.2deg)}brx-loading[mode=determinate][data-progress=\"50\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"50\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(90deg);transform:rotate(90deg)}brx-loading[mode=determinate][data-progress=\"51\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"51\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(91.8deg);transform:rotate(91.8deg)}brx-loading[mode=determinate][data-progress=\"52\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"52\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(93.6deg);transform:rotate(93.6deg)}brx-loading[mode=determinate][data-progress=\"53\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"53\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(95.4deg);transform:rotate(95.4deg)}brx-loading[mode=determinate][data-progress=\"54\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"54\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(97.2deg);transform:rotate(97.2deg)}brx-loading[mode=determinate][data-progress=\"55\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"55\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(99deg);transform:rotate(99deg)}brx-loading[mode=determinate][data-progress=\"56\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"56\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(100.8deg);transform:rotate(100.8deg)}brx-loading[mode=determinate][data-progress=\"57\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"57\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(102.6deg);transform:rotate(102.6deg)}brx-loading[mode=determinate][data-progress=\"58\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"58\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(104.4deg);transform:rotate(104.4deg)}brx-loading[mode=determinate][data-progress=\"59\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"59\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(106.2deg);transform:rotate(106.2deg)}brx-loading[mode=determinate][data-progress=\"60\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"60\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(108deg);transform:rotate(108deg)}brx-loading[mode=determinate][data-progress=\"61\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"61\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(109.8deg);transform:rotate(109.8deg)}brx-loading[mode=determinate][data-progress=\"62\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"62\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(111.6deg);transform:rotate(111.6deg)}brx-loading[mode=determinate][data-progress=\"63\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"63\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(113.4deg);transform:rotate(113.4deg)}brx-loading[mode=determinate][data-progress=\"64\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"64\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(115.2deg);transform:rotate(115.2deg)}brx-loading[mode=determinate][data-progress=\"65\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"65\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(117deg);transform:rotate(117deg)}brx-loading[mode=determinate][data-progress=\"66\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"66\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(118.8deg);transform:rotate(118.8deg)}brx-loading[mode=determinate][data-progress=\"67\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"67\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(120.6deg);transform:rotate(120.6deg)}brx-loading[mode=determinate][data-progress=\"68\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"68\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(122.4deg);transform:rotate(122.4deg)}brx-loading[mode=determinate][data-progress=\"69\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"69\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(124.2deg);transform:rotate(124.2deg)}brx-loading[mode=determinate][data-progress=\"70\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"70\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(126deg);transform:rotate(126deg)}brx-loading[mode=determinate][data-progress=\"71\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"71\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(127.8deg);transform:rotate(127.8deg)}brx-loading[mode=determinate][data-progress=\"72\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"72\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(129.6deg);transform:rotate(129.6deg)}brx-loading[mode=determinate][data-progress=\"73\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"73\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(131.4deg);transform:rotate(131.4deg)}brx-loading[mode=determinate][data-progress=\"74\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"74\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(133.2deg);transform:rotate(133.2deg)}brx-loading[mode=determinate][data-progress=\"75\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"75\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(135deg);transform:rotate(135deg)}brx-loading[mode=determinate][data-progress=\"76\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"76\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(136.8deg);transform:rotate(136.8deg)}brx-loading[mode=determinate][data-progress=\"77\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"77\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(138.6deg);transform:rotate(138.6deg)}brx-loading[mode=determinate][data-progress=\"78\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"78\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(140.4deg);transform:rotate(140.4deg)}brx-loading[mode=determinate][data-progress=\"79\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"79\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(142.2deg);transform:rotate(142.2deg)}brx-loading[mode=determinate][data-progress=\"80\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"80\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(144deg);transform:rotate(144deg)}brx-loading[mode=determinate][data-progress=\"81\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"81\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(145.8deg);transform:rotate(145.8deg)}brx-loading[mode=determinate][data-progress=\"82\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"82\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(147.6deg);transform:rotate(147.6deg)}brx-loading[mode=determinate][data-progress=\"83\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"83\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(149.4deg);transform:rotate(149.4deg)}brx-loading[mode=determinate][data-progress=\"84\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"84\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(151.2deg);transform:rotate(151.2deg)}brx-loading[mode=determinate][data-progress=\"85\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"85\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(153deg);transform:rotate(153deg)}brx-loading[mode=determinate][data-progress=\"86\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"86\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(154.8deg);transform:rotate(154.8deg)}brx-loading[mode=determinate][data-progress=\"87\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"87\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(156.6deg);transform:rotate(156.6deg)}brx-loading[mode=determinate][data-progress=\"88\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"88\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(158.4deg);transform:rotate(158.4deg)}brx-loading[mode=determinate][data-progress=\"89\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"89\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(160.2deg);transform:rotate(160.2deg)}brx-loading[mode=determinate][data-progress=\"90\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"90\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(162deg);transform:rotate(162deg)}brx-loading[mode=determinate][data-progress=\"91\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"91\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(163.8deg);transform:rotate(163.8deg)}brx-loading[mode=determinate][data-progress=\"92\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"92\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(165.6deg);transform:rotate(165.6deg)}brx-loading[mode=determinate][data-progress=\"93\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"93\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(167.4deg);transform:rotate(167.4deg)}brx-loading[mode=determinate][data-progress=\"94\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"94\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(169.2deg);transform:rotate(169.2deg)}brx-loading[mode=determinate][data-progress=\"95\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"95\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(171deg);transform:rotate(171deg)}brx-loading[mode=determinate][data-progress=\"96\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"96\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(172.8deg);transform:rotate(172.8deg)}brx-loading[mode=determinate][data-progress=\"97\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"97\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(174.6deg);transform:rotate(174.6deg)}brx-loading[mode=determinate][data-progress=\"98\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"98\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(176.4deg);transform:rotate(176.4deg)}brx-loading[mode=determinate][data-progress=\"99\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"99\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(178.2deg);transform:rotate(178.2deg)}brx-loading[mode=determinate][data-progress=\"100\"] .brx-loading-mask.full,brx-loading[mode=determinate][data-progress=\"100\"] .brx-loading-fill{-webkit-animation:fill ease-in-out 2s;animation:fill ease-in-out 2s;-webkit-transform:rotate(180deg);transform:rotate(180deg)}brx-loading[mode=indeterminate]{--loading-indetermined-color:var(--interactive);--loading-indetermined-diameter-md:44px;--loading-indetermined-diameter-sm:24px;color:transparent !important;min-height:32px;pointer-events:none;position:relative;z-index:var(--z-index-layer-4)}brx-loading[mode=indeterminate]::after{-webkit-animation:spinAround 1.3s infinite linear;animation:spinAround 1.3s infinite linear;border:2px solid var(--loading-indetermined-color);border-radius:50%;border-right-color:transparent;content:\"\";display:block;height:var(--loading-indetermined-diameter-sm);left:calc(50% - 12px);position:absolute;top:calc(50% - 12px);width:var(--loading-indetermined-diameter-sm)}brx-loading[mode=indeterminate][variant=primary]::after{border-bottom-color:var(--color-secondary-01);border-left-color:var(--color-secondary-01);border-top-color:var(--color-secondary-01)}brx-loading[mode=indeterminate][size=medium]::after{border-width:4px;height:var(--loading-indetermined-diameter-md);left:calc(50% - 22px);top:calc(50% - 22px);width:var(--loading-indetermined-diameter-md)}@-webkit-keyframes spinAround{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes spinAround{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}";

class BrxLoading {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.variant = undefined;
    this.size = 'medium';
    this.progress = undefined;
  }
  render() {
    const mode = this.progress !== undefined ? 'determinate' : 'indeterminate';
    return (hAsync(Host, { mode: mode, "data-progress": mode === 'determinate' ? parseInt(String(this.progress)) : null }, mode === 'determinate' && (hAsync(Fragment, null, hAsync("div", { class: "brx-loading-mask full" }, hAsync("div", { class: "brx-loading-fill" })), hAsync("div", { class: "brx-loading-mask" }, hAsync("div", { class: "brx-loading-fill" })))), mode === 'indeterminate' && (hAsync(Fragment, null, hAsync("slot", null)))));
  }
  static get style() { return brxLoadingCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-loading",
    "$members$": {
      "variant": [513],
      "size": [513],
      "progress": [520]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["variant", "variant"], ["size", "size"], ["progress", "progress"]]
  }; }
}

const brxMessageCss = "brx-message[variant=message]{--message-background:var(--background);--message-color-icon:var(--color);--feedback-background:var(--background);--message-text:var(--color);background:var(--message-background);display:-ms-flexbox;display:flex;margin-bottom:var(--spacing-scale-2x)}brx-message[variant=message] .brx-message-content{color:var(--message-text);-ms-flex:1;flex:1;font-size:var(--font-size-scale-up-01);padding:var(--spacing-scale-3x) var(--spacing-scale-base) var(--spacing-scale-3x) var(--spacing-scale-2x)}brx-message[variant=message] .brx-message-content .brx-message-title{font-weight:var(--font-weight-semi-bold)}brx-message[variant=message] .brx-message-content .brx-message-body{font-weight:var(--font-weigth-regular)}brx-message[variant=message] .brx-message-content a{font-weight:var(--font-weight-bold);text-decoration:underline}brx-message[variant=message] .brx-message-content *:last-child{margin-bottom:0}brx-message[variant=message] .brx-message-icon{-ms-flex-align:center;align-items:center;color:var(--message-color-icon);display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;margin:var(--spacing-vertical-center) var(--spacing-scale-2x);padding-left:var(--spacing-scale-2x);padding-right:var(--spacing-scale-2x)}brx-message[variant=message] .brx-message-icon+.content{padding-left:0}brx-message[variant=message] .brx-message-close{margin-right:var(--spacing-scale-base);margin-top:var(--spacing-scale-base)}brx-message[variant=message][severity=success]{--message-background:var(--success-alternative);--feedback-background:var(--success);--message-color-icon:var(--success)}brx-message[variant=message][severity=success] .brx-message-close brx-button{--interactive:var(--message-color-icon);--interactive-rgb:var(--success-rgb)}brx-message[variant=message][severity=danger]{--message-background:var(--danger-alternative);--feedback-background:var(--danger);--message-color-icon:var(--danger)}brx-message[variant=message][severity=danger] .brx-message-close brx-button{--interactive:var(--message-color-icon);--interactive-rgb:var(--danger-rgb)}brx-message[variant=message][severity=info]{--message-background:var(--info-alternative);--feedback-background:var(--info);--message-color-icon:var(--info)}brx-message[variant=message][severity=info] .brx-message-close brx-button{--interactive:var(--message-color-icon);--interactive-rgb:var(--info-rgb)}brx-message[variant=message][severity=warning]{--message-background:var(--warning-alternative);--feedback-background:var(--warning)}brx-message[variant=message][severity=warning] .brx-message-close brx-button{--interactive:var(--color);--interactive-rgb:var(--color-rgb)}brx-message[variant=feedback]{--message-background:var(--background);--message-color-icon:var(--color);--feedback-background:var(--background);--message-text:var(--color);-ms-flex-align:center;align-items:center;background:var(--feedback-background);color:var(--message-text);display:-ms-inline-flexbox;display:inline-flex;font-style:italic;font-weight:var(--font-weight-medium);margin-bottom:0;padding:var(--spacing-scale-half)}brx-message[variant=feedback] .svg-inline--fa,brx-message[variant=feedback] .fa,brx-message[variant=feedback] .fab,brx-message[variant=feedback] .fad,brx-message[variant=feedback] .fal,brx-message[variant=feedback] .far,brx-message[variant=feedback] .fas{margin-right:var(--spacing-scale-half)}brx-message[variant=feedback]:not([severity=warning]){--message-text:var(--pure-0)}brx-message[variant=feedback][severity=warning]{--color:var(--color-light);--color-rgb:var(--color-light-rgb);--text-color:var(--color);--interactive:var(--interactive-light);--interactive-rgb:var(--interactive-light-rgb);--visited:var(--visited-light);--hover:var(--hover-light);--pressed:var(--pressed-light);--focus-color:var(--focus-color-light);--focus:var(--focus-color)}brx-message[variant=feedback][severity=success]{--message-background:var(--success-alternative);--feedback-background:var(--success);--message-color-icon:var(--success)}brx-message[variant=feedback][severity=success] .brx-message-close brx-button{--interactive:var(--message-color-icon);--interactive-rgb:var(--success-rgb)}brx-message[variant=feedback][severity=danger]{--message-background:var(--danger-alternative);--feedback-background:var(--danger);--message-color-icon:var(--danger)}brx-message[variant=feedback][severity=danger] .brx-message-close brx-button{--interactive:var(--message-color-icon);--interactive-rgb:var(--danger-rgb)}brx-message[variant=feedback][severity=info]{--message-background:var(--info-alternative);--feedback-background:var(--info);--message-color-icon:var(--info)}brx-message[variant=feedback][severity=info] .brx-message-close brx-button{--interactive:var(--message-color-icon);--interactive-rgb:var(--info-rgb)}brx-message[variant=feedback][severity=warning]{--message-background:var(--warning-alternative);--feedback-background:var(--warning)}brx-message[variant=feedback][severity=warning] .brx-message-close brx-button{--interactive:var(--color);--interactive-rgb:var(--color-rgb)}";

class BrxMessage {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.messageTitle = undefined;
    this.dismissable = undefined;
    this.variant = 'message';
    this.severity = 'info';
  }
  get iconName() {
    switch (this.severity) {
      case 'danger': {
        return 'fa5/fas/times-circle';
      }
      case 'success': {
        return 'fa5/fas/check-circle';
      }
      case 'info': {
        return 'fa5/fas/info-circle';
      }
      case 'warning': {
        return 'fa5/fas/exclamation-triangle';
      }
    }
  }
  async dismiss() {
    this.el.parentElement.removeChild(this.el);
  }
  render() {
    const { messageTitle, iconName, dismissable } = this;
    return (hAsync(Host, { role: "alert" }, this.variant === 'feedback' && (hAsync(Fragment, null, hAsync("brx-icon", { name: iconName }), hAsync("slot", null))), this.variant === 'message' && (hAsync(Fragment, null, hAsync("div", { class: "brx-message-icon" }, hAsync("brx-icon", { name: iconName, iconClass: "fa-lg" })), hAsync("div", { class: "brx-message-content" }, messageTitle && hAsync("span", { class: "brx-message-title" }, messageTitle), hAsync("span", { class: "brx-message-body" }, hAsync("slot", null))), dismissable && (hAsync("div", { class: "brx-message-close" }, hAsync("brx-button", { circle: true, size: "small", "aria-label": "Fechar", onClick: () => this.dismiss() }, hAsync("brx-icon", { name: "fa5/fas/times" }))))))));
  }
  get el() { return getElement(this); }
  static get style() { return brxMessageCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-message",
    "$members$": {
      "messageTitle": [513, "message-title"],
      "dismissable": [516],
      "variant": [513],
      "severity": [513],
      "dismiss": [64]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["messageTitle", "message-title"], ["dismissable", "dismissable"], ["variant", "variant"], ["severity", "severity"]]
  }; }
}

const brxModalCss = "brx-modal{--modal-size:var(--modal-medium);--modal-xsmall:220px;--modal-small:300px;--modal-medium:500px;--modal-large:640px;--modal-auto:auto;background:var(--background);-webkit-box-shadow:var(--surface-shadow-sm);box-shadow:var(--surface-shadow-sm);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;max-width:var(--modal-size);z-index:var(--z-index-layer-4)}brx-modal brx-modal-header{display:block;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-bold);padding:var(--spacing-scale-2x) var(--spacing-scale-2x) 0;position:relative}brx-modal brx-modal-header [data-scrim-dismiss]{position:absolute;right:var(--spacing-scale-base);top:var(--spacing-scale-base)}brx-modal .brx-modal-title{font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-bold);margin-right:40px;max-height:calc(var(--font-size-scale-up-01) * 3);overflow:hidden;text-overflow:ellipsis}brx-modal brx-modal-body{display:block;-ms-flex:1;flex:1;margin:var(--spacing-scale-3x) 0 var(--spacing-scale-2x);overflow:auto;padding:0 var(--spacing-scale-2x)}brx-modal brx-modal-body::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-modal brx-modal-body::-webkit-scrollbar-track{background:var(--gray-10)}brx-modal brx-modal-body::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-modal brx-modal-body:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-modal brx-modal-body *:last-child{margin-bottom:0}brx-modal brx-modal-footer{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:var(--spacing-scale-2x)}brx-modal[size=xsmall]{--modal-size:var(--modal-xsmall)}brx-modal[size=small]{--modal-size:var(--modal-small)}brx-modal[size=medium]{--modal-size:var(--modal-medium)}brx-modal[size=large]{--modal-size:var(--modal-large)}brx-modal[size=auto]{--modal-size:var(--modal-auto)}brx-modal brx-loading[size=medium]{min-height:calc(var(--loading-indetermined-diameter-md) + var(--spacing-scale-2x) * 2)}brx-modal .terms{border:0;-webkit-box-shadow:var(--surface-shadow-sm-inset), var(--surface-shadow-sm-inset-up);box-shadow:var(--surface-shadow-sm-inset), var(--surface-shadow-sm-inset-up);font-size:var(--font-size-scale-base);height:216px;margin-bottom:var(--spacing-scale-2x);margin-left:calc(var(--spacing-scale-2x) * -1);margin-right:calc(var(--spacing-scale-2x) * -1);overflow:auto;padding:var(--spacing-scale-2x);resize:none;width:auto}brx-modal .terms::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-modal .terms::-webkit-scrollbar-track{background:var(--gray-10)}brx-modal .terms::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-modal .terms:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-modal .terms:active{outline:none}brx-modal .terms:hover::-webkit-scrollbar-thumb{background:var(--color-secondary-07)}@media (max-width: 991px){brx-modal .terms{margin-left:unset !important;margin-right:unset !important}brx-modal brx-modal-header [data-scrim-dismiss]{top:0}}";

class BrxModal {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = undefined;
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxModalCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-modal",
    "$members$": {
      "size": [513]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["size", "size"]]
  }; }
}

class BrxModalBody {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-modal-body",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

class BrxModalFooter {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-modal-footer",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

class BrxModalHeader {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-modal-header",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxNotificationCss = "brx-notification{--notification-padding:var(--spacing-scale-2x) var(--spacing-scale-4x);--notification-width:50vw;--notification-height:calc(100vh - 86px);display:block;background:var(--background);-webkit-box-shadow:var(--surface-shadow-md);box-shadow:var(--surface-shadow-md);max-height:var(--notification-height);max-width:var(--notification-width);overflow:auto;z-index:1}@media (max-width: 576px){brx-notification{--item-padding-x:var(--spacing-scale-2x);--item-padding-y:var(--spacing-scale-base);--item-padding:var(--item-padding-y) var(--item-padding-x);--notification-padding:var(--item-padding);--notification-width:100vw;min-height:var(--notification-height);overflow:hidden}brx-notification brx-tabs{--tab-size:var(--tab-small)}brx-notification brx-tabs-panels{--notification-height:calc(100vh - 86px);height:var(--notification-height);overflow-x:auto}brx-notification .status{left:var(--spacing-scale-half) !important;top:var(--spacing-scale-2x) !important}brx-notification.close{display:none}}@media (max-width: 992px){brx-notification.close{display:none}}@media (min-width: 992px){brx-notification div.close{display:none}}brx-notification .notification-header{border-bottom:1px solid var(--border-color);padding:var(--notification-padding)}brx-notification .notification-header *:last-child{margin-bottom:0}brx-notification .notification-body brx-tab{padding:0}brx-notification .notification-body brx-tabs-panels{overflow-y:auto}brx-notification .notification-body brx-tabs-panels brx-item:not([pass-styles]),brx-notification .notification-body brx-tabs-panels brx-item[pass-styles]>*{--interactive-rgb:var(--rgb-secondary-08);--item-color:var(--text-color);padding:var(--notification-padding);position:relative;white-space:normal}brx-notification .notification-body brx-tabs-panels brx-item:not([pass-styles]) .status,brx-notification .notification-body brx-tabs-panels brx-item[pass-styles]>* .status{left:var(--spacing-scale-base);position:absolute;top:var(--spacing-scale-3x)}brx-notification .notification-body brx-tabs-panels brx-item:not([pass-styles]) span,brx-notification .notification-body brx-tabs-panels brx-item[pass-styles]>* span{display:block}";

class BrxNotification {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  /**
   * Esconde a notificação relativa a referência
   * @private
   */
  _hideNotification() {
    this.el.setAttribute('hidden', '');
  }
  /**
   * Esconde todas as notificações relativa a referência
   * @private
   */
  _hideAllNotifications() {
    const notifications = Array.from(this.el.querySelectorAll('brx-item'));
    for (const notification of notifications) {
      notification.setAttribute('hidden', '');
    }
  }
  handleClick(event) {
    const target = event.target;
    const closeTrigger = target.closest('.close');
    if (closeTrigger) {
      this._dismiss();
    }
  }
  _dismiss() {
    this.el.classList.add('close');
    return Promise.resolve();
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get style() { return brxNotificationCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-notification",
    "$members$": {
      "_dismiss": [64]
    },
    "$listeners$": [[1, "click", "handleClick"], [0, "", "render"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const SpecialTokens = ['first', 'prev', 'next', 'last'];
const isSpecialToken = (value) => {
  return SpecialTokens.includes(value);
};
const parseTarget = (target) => {
  if (isSpecialToken(target)) {
    return target;
  }
  return parseInt(String(target));
};

const brxPaginationCss = "brx-pagination{display:block;--pagination-margin:var(--spacing-scale-base);--pagination-select-width:88px;--pagination-size:var(--pagination-medium);--pagination-small:24px;--pagination-medium:32px;--pagination-large:40px;color:var(--color);display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;font-weight:var(--font-weight);-ms-flex-pack:center;justify-content:center}brx-pagination brx-pagination-items{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;list-style:none;margin:0;padding:0}brx-pagination brx-pagination-item{padding:0}brx-pagination brx-pagination-item:focus{outline:none}brx-pagination brx-pagination-item.focus-visible,brx-pagination brx-pagination-item:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-pagination brx-pagination-item[data-mode=jump][disabled]{opacity:unset}brx-pagination brx-pagination-item[data-mode=page]{-ms-flex-align:center;align-items:center;border:1px solid transparent;border-radius:100em;color:var(--interactive);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;margin:0 calc(var(--pagination-margin) * 0.5);min-height:var(--pagination-size);min-width:var(--pagination-size);padding:0 var(--spacing-scale-base);white-space:nowrap}brx-pagination brx-pagination-item[data-mode=page]:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-pagination brx-pagination-item[data-mode=page][active]{background:var(--active);color:var(--color-dark);font-weight:var(--font-weight-semi-bold)}brx-pagination brx-pagination-ellipsis{margin:0 calc(var(--pagination-margin) * 0.5);position:relative}brx-pagination brx-pagination-ellipsis brx-button{--button-size:var(--pagination-size)}brx-pagination brx-pagination-ellipsis .brx-pagination-ellipsis-dropdown-content{max-height:220px;min-width:4em;overflow-y:auto;z-index:var(--z-index-layer-1)}brx-pagination brx-pagination-ellipsis .brx-pagination-ellipsis-dropdown-content::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-pagination brx-pagination-ellipsis .brx-pagination-ellipsis-dropdown-content::-webkit-scrollbar-track{background:var(--gray-10)}brx-pagination brx-pagination-ellipsis .brx-pagination-ellipsis-dropdown-content::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-pagination brx-pagination-ellipsis .brx-pagination-ellipsis-dropdown-content:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-pagination[size=small]{--pagination-size:var(--pagination-small)}brx-pagination[size=medium]{--pagination-size:var(--pagination-medium)}brx-pagination[size=large]{--pagination-size:var(--pagination-large)}brx-pagination brx-pagination-information{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}brx-pagination brx-pagination-per-page,brx-pagination brx-pagination-go-to-page{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}brx-pagination brx-pagination-per-page brx-input,brx-pagination brx-pagination-go-to-page brx-input{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;--input-size:var(--pagination-medium)}brx-pagination brx-pagination-per-page brx-input label,brx-pagination brx-pagination-go-to-page brx-input label{font-weight:var(--font-weight-regular);margin-bottom:0;margin-right:var(--spacing-scale-base);padding-bottom:0}brx-pagination brx-pagination-per-page brx-input input,brx-pagination brx-pagination-go-to-page brx-input input{padding-left:var(--spacing-scale-base);padding-right:calc(var(--spacing-scale-baseh) + 32px);text-align:right;width:var(--pagination-select-width)}brx-pagination brx-pagination-per-page brx-input input:not(:focus),brx-pagination brx-pagination-go-to-page brx-input input:not(:focus){border-color:transparent}brx-pagination brx-pagination-per-page brx-select .brx-select-options,brx-pagination brx-pagination-go-to-page brx-select .brx-select-options{min-width:5em;right:0;width:auto}brx-pagination brx-pagination-arrows{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}brx-pagination brx-select brx-input brx-button{bottom:auto;position:absolute;right:var(--spacing-scale-half);top:auto;-webkit-transform:none;transform:none}brx-pagination brx-select brx-input brx-button .brx-button-native{margin-top:0}brx-pagination brx-divider{border-right-width:var(--divider-size);border-top:0}brx-pagination[dark-mode]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-pagination[dark-mode][dark-mode],brx-pagination[dark-mode][dark-mode] label{--color:var(--color-dark);--focus-color:var(--focus-color-dark)}brx-pagination[dark-mode] brx-pagination-item[data-mode=page][active]{--interactive-rgb:var(--active-rgb);background-color:var(--background-light);color:var(--active)}brx-pagination a{display:inline-block}brx-pagination a[data-pagination-target]:hover,brx-pagination a[data-pagination-target]:hover:not(:disabled){background-image:unset}brx-pagination[data-pagination-target]:focus{outline:none}brx-pagination[data-pagination-target].focus-visible,brx-pagination[data-pagination-target]:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}";

const DOMStrings$3 = {
  paginationTargetTrigger: '[data-pagination-target]',
};
class BrxPagination {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxUpdate = createEvent(this, "brxUpdate", 7);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.page = undefined;
    this.size = 'medium';
    this.controlledPage = TOKEN_UNCONTROLLED;
    this.currentPage = undefined;
    this.total = undefined;
  }
  get paginationItems() {
    return findTargets('brx-pagination-item', this.el);
  }
  get activePaginationItemIndex() {
    return this.paginationItems.findIndex(paginationItem => paginationItem.contains(document.activeElement));
  }
  get activePaginationItem() {
    return this.paginationItems[this.activePaginationItemIndex];
  }
  get hasTotal() {
    return typeof this.total === 'number';
  }
  async syncItems() {
    const { currentPage, paginationItems, total } = this;
    for (const paginationItem of paginationItems) {
      const target = await paginationItem.getTarget();
      if (typeof target === 'number') {
        paginationItem.active = target === this.currentPage;
        if (paginationItem.active) {
          if (this.el.contains(document.activeElement) && this.activePaginationItemIndex === -1) {
            paginationItem.focus();
          }
        }
      }
      else {
        switch (target) {
          case 'first':
          case 'prev': {
            paginationItem.disabled = currentPage === 1;
            break;
          }
          case 'next':
          case 'last': {
            paginationItem.disabled = this.hasTotal && currentPage === total;
            break;
          }
        }
        if (paginationItem.disabled) {
          const focusedElements = findTargets(':focus-visible, .focus-visible', paginationItem, ['child', 'parent', 'self']);
          for (const focusedElement of focusedElements) {
            focusedElement.blur();
            focusedElement.classList.remove('focus-visible');
          }
        }
      }
    }
  }
  handlePageChange() {
    const page = this.controlledPage !== TOKEN_UNCONTROLLED ? this.controlledPage : this.page;
    this.currentPage = page;
  }
  getTargetIndex(target) {
    if (isSpecialToken(target)) {
      switch (target) {
        case 'first': {
          return 1;
        }
        case 'prev': {
          return Math.max(this.currentPage - 1, 1);
        }
        case 'next': {
          return this.currentPage + 1;
        }
        case 'last': {
          return this.hasTotal ? this.total : -1;
        }
      }
    }
    return target;
  }
  setPage(target) {
    if (this.controlledPage === TOKEN_UNCONTROLLED) {
      const index = this.getTargetIndex(target);
      if (index !== -1) {
        this.currentPage = index;
      }
    }
    this.brxChange.emit({ target });
  }
  handleCurrentPageChange() {
    this.brxUpdate.emit({ page: this.currentPage });
  }
  handlePaginationTargetClick(event) {
    const target = event.target;
    if (target.closest(':disabled, [disabled]')) {
      return;
    }
    const trigger = target.closest(DOMStrings$3.paginationTargetTrigger);
    if (trigger) {
      const target = parseTarget(trigger.dataset.paginationTarget);
      this.setPage(target);
    }
  }
  connectedCallback() {
    this.handlePageChange();
  }
  // @Prop()
  // hideJumpFirst: boolean = false;
  // @Prop()
  // hideJumpPrev: boolean = false;
  // @Prop()
  // hideJumpNext: boolean = false;
  // @Prop()
  // hideJumpLast: boolean = false;
  // @Prop()
  // canJumpFirst: boolean | null = null;
  // @Prop()
  // canJumpPrev: boolean | null = null;
  // @Prop()
  // canJumpNext: boolean | null = null;
  // @Prop()
  // canJumpLast: boolean | null = null;
  // @Prop()
  // siblingCount: number | null = null;
  // @Prop()
  // boundaryCount: number | null = null;
  // @Prop()
  // count: number | null = null;
  render() {
    return (hAsync(Host, { role: "navigation", "aria-label": "Pagina\u00E7\u00E3o de resultados." }, hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "currentPage": ["syncItems", "handleCurrentPageChange"],
    "page": ["handlePageChange"],
    "controlledPage": ["handlePageChange"]
  }; }
  static get style() { return brxPaginationCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-pagination",
    "$members$": {
      "page": [2],
      "size": [513],
      "controlledPage": [2, "controlled-page"],
      "total": [2],
      "currentPage": [32]
    },
    "$listeners$": [[0, "click", "handlePaginationTargetClick"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["size", "size"]]
  }; }
}

const brxPaginationArrowsCss = "brx-pagination-arrows{display:block}";

class BrxPaginationArrows {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxPaginationArrowsCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-pagination-arrows",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxPaginationEllipsisCss = ":host{display:block}";

class BrxPaginationEllipsis {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dropdownId = undefined;
  }
  componentWillLoad() {
    if (!this.dropdownId) {
      this.dropdownId = generateUniqueId();
    }
  }
  render() {
    const { dropdownId } = this;
    const label = 'Abrir listagem.';
    return (hAsync(Host, null, hAsync("brx-dropdown", null, hAsync("brx-dropdown-trigger", { target: `#${dropdownId}` }, hAsync("brx-button", { circle: true, type: "button", "aria-label": label, title: label }, hAsync("brx-icon", { name: "fa5/fas/ellipsis-h" }))), hAsync("div", { class: "brx-pagination-ellipsis-dropdown-content", id: dropdownId, hidden: true }, hAsync("slot", null)))));
  }
  static get style() { return brxPaginationEllipsisCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-pagination-ellipsis",
    "$members$": {
      "dropdownId": [1025, "dropdown-id"]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxPaginationGoToPageCss = "brx-pagination-go-to-page{display:block}";

class BrxPaginationGoToPage {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxPaginationGoToPageCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-pagination-go-to-page",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxPaginationInformationCss = "brx-pagination-information{display:block}";

class BrxPaginationInformation {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxPaginationInformationCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-pagination-information",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxPaginationItemCss = "brx-pagination-item{display:block}";

class BrxPaginationItem {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this._target = undefined;
    this.active = undefined;
    this.disabled = undefined;
  }
  getTarget() {
    return Promise.resolve(this.target);
  }
  get target() {
    return parseTarget(this._target);
  }
  get mode() {
    return isSpecialToken(this.target) ? 'jump' : 'page';
  }
  get jumpButton() {
    switch (this.target) {
      case 'first': {
        return {
          label: 'Página Inicial',
          icon: 'fa5/fas/step-backward',
        };
      }
      case 'prev': {
        return {
          label: 'Página Anterior',
          icon: 'fa5/fas/angle-left',
        };
      }
      case 'next': {
        return {
          label: 'Página Seguinte',
          icon: 'fa5/fas/angle-right',
        };
      }
      case 'last': {
        return {
          label: 'Última Página',
          icon: 'fa5/fas/step-forward',
        };
      }
      default: {
        return null;
      }
    }
  }
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  render() {
    const { disabled, mode, jumpButton } = this;
    return (hAsync(Host, { tabindex: mode === 'page' ? 0 : null, "data-mode": mode }, mode === 'jump' && jumpButton && (hAsync("brx-button", { disabled: disabled, type: "button", circle: true }, hAsync("brx-icon", { name: jumpButton.icon, "aria-label": jumpButton.label, title: jumpButton.label }))), mode === 'page' && hAsync("slot", { name: "page" }, this.target)));
  }
  static get style() { return brxPaginationItemCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-pagination-item",
    "$members$": {
      "_target": [520, "target"],
      "active": [516],
      "disabled": [516],
      "getTarget": [64]
    },
    "$listeners$": [[0, "click", "handleClick"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["_target", "target"], ["active", "active"], ["disabled", "disabled"]]
  }; }
}

const brxPaginationItemsCss = "brx-pagination-items{display:block}";

class BrxPaginationItems {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxPaginationItemsCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-pagination-items",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxPaginationPerPageCss = "brx-pagination-per-page{display:block}";

class BrxPaginationPerPage {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxPaginationPerPageCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-pagination-per-page",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxRadioCss = "brx-radio{--radio-size:24px;--radio-bullet-size:16px;--radio-bullet-position:calc((var(--radio-size) - var(--radio-bullet-size)) * 0.5);display:block}brx-radio+brx-radio{margin-top:var(--spacing-scale-base)}brx-radio input{opacity:0;position:absolute}brx-radio input+label{cursor:pointer;display:inline-block;margin-bottom:0;min-height:var(--radio-size);min-width:var(--radio-size);padding-left:calc(var(--spacing-scale-base) + var(--radio-size));position:relative}brx-radio input+label::before{background:var(--background);border:1px solid var(--border-color);border-radius:50%;content:\"\";height:var(--radio-size);left:0;position:absolute;top:-1px;width:var(--radio-size)}brx-radio input+label:empty{padding:0}brx-radio input+label:empty::before{top:0}brx-radio label{font-weight:var(--font-weight-medium)}brx-radio input:checked+label::after{background:var(--selected);border:7px solid var(--selected);border-radius:50%;content:\"\";height:var(--radio-bullet-size);left:var(--radio-bullet-position);position:absolute;right:0;top:calc(var(--radio-bullet-position) - 1px);width:var(--radio-bullet-size)}brx-radio input:checked+label:empty::after{top:var(--radio-bullet-position)}brx-radio.is-valid input+label::before,brx-radio.valid input+label::before,brx-radio[valid] input+label::before,brx-radio[state=valid] input+label::before{border-color:var(--success)}brx-radio.is-invalid input+label::before,brx-radio.invalid input+label::before,brx-radio[invalid] input+label::before,brx-radio[state=invalid] input+label::before{border-color:var(--danger)}brx-radio.is-small input+label,brx-radio.small input+label,brx-radio[small] input+label,brx-radio[size=small] input+label{line-height:var(--spacing-scale-2xh);min-height:var(--spacing-scale-2xh)}brx-radio.is-small input+label::before,brx-radio.small input+label::before,brx-radio[small] input+label::before,brx-radio[size=small] input+label::before{height:var(--spacing-scale-2xh);width:var(--spacing-scale-2xh)}brx-radio.is-small input:checked+label::after,brx-radio.small input:checked+label::after,brx-radio[small] input:checked+label::after,brx-radio[size=small] input:checked+label::after{border-width:4px;height:10px;width:10px}brx-radio input:invalid+label::before{border-color:var(--danger)}brx-radio input:focus-visible:checked+label::before,brx-radio input:focus-visible+label::before,brx-radio input.focus-visible:checked+label::before,brx-radio input.focus-visible+label::before{border-color:var(--focus) !important;-webkit-box-shadow:0 0 0 var(--surface-width-md) var(--focus);box-shadow:0 0 0 var(--surface-width-md) var(--focus);outline:none}brx-radio input:hover:not(:disabled)+label::before{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-radio.inverted,brx-radio.inverted label,brx-radio.dark-mode,brx-radio.dark-mode label,brx-radio[dark-mode],brx-radio[dark-mode] label{color:var(--color-dark)}";

class BrxRadio {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxFocus = createEvent(this, "brxFocus", 7);
    this.brxBlur = createEvent(this, "brxBlur", 7);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.brxUpdate = createEvent(this, "brxUpdate", 7);
    this.syncCheckedFromRadioGroup = async () => {
      const radioGroup = this.radioGroup;
      if (radioGroup) {
        const radioGroupValue = await radioGroup.getCurrentValue();
        const isChecked = radioGroupValue === this.value;
        this.currentChecked = isChecked;
        this.nativeInputChecked = isChecked;
      }
    };
    this.syncCheckedFromNative = () => {
      this.setChecked(this.nativeInputChecked);
    };
    this.onFocus = () => {
      this.brxFocus.emit();
    };
    this.onBlur = () => {
      this.brxBlur.emit();
    };
    this.onChange = (event) => {
      event.preventDefault();
      const oldChecked = this.currentChecked;
      const newChecked = this.nativeInputChecked;
      this.nativeInputChecked = oldChecked;
      this.setChecked(newChecked);
    };
    this.checked = undefined;
    this.controlledChecked = TOKEN_UNCONTROLLED;
    this.currentChecked = false;
    this.buttonTabindex = -1;
    this.name = undefined;
    this.disabled = false;
    this.value = undefined;
    this.label = undefined;
    this.inputId = undefined;
  }
  get nativeInput() {
    return findTarget('input', this.el);
  }
  get nativeInputChecked() {
    var _a, _b;
    return (_b = (_a = this.nativeInput) === null || _a === void 0 ? void 0 : _a.checked) !== null && _b !== void 0 ? _b : false;
  }
  set nativeInputChecked(value) {
    if (this.nativeInput) {
      this.nativeInput.checked = value;
    }
  }
  get radioGroup() {
    var _a;
    return (_a = this.el.closest('brx-radio-group')) !== null && _a !== void 0 ? _a : null;
  }
  get isStandaloneFamilyControlled() {
    const standaloneGroupRadios = findTargets(`brx-radio[name="${this.name}"]`);
    return standaloneGroupRadios.some(brxRadio => isControlled(brxRadio.controlledChecked));
  }
  emitChange(checked = this.currentChecked, force = false) {
    const value = this.value;
    if (checked || force) {
      this.brxChange.emit({ value, checked });
    }
  }
  syncCurrentChecked() {
    const incomingChecked = this.controlledChecked !== TOKEN_UNCONTROLLED ? this.controlledChecked : this.checked;
    this.currentChecked = incomingChecked;
  }
  handleStateChange() {
    this.emitChange();
  }
  handleCurrentCheckedChange() {
    this.nativeInputChecked = this.currentChecked;
  }
  setChecked(checked = false) {
    if (!isControlled(this.controlledChecked) && !this.radioGroup && !this.isStandaloneFamilyControlled) {
      // Unecessary to emit change because the watch of currentChecked will handle it
      this.currentChecked = checked;
    }
    else {
      this.emitChange(checked);
    }
  }
  emitUpdateEvent() {
    const value = this.value;
    const checked = this.currentChecked;
    this.brxUpdate.emit({ value, checked });
  }
  async setFocus() {
    // event.stopPropagation();
    // event.preventDefault();
    this.el.focus();
  }
  async setButtonTabindex(value) {
    this.buttonTabindex = value;
  }
  async getCurrentState() {
    return {
      value: this.value,
      checked: this.currentChecked,
    };
  }
  handleGlobalRadioChange(event) {
    const target = event.target;
    const brxRadio = target === null || target === void 0 ? void 0 : target.closest('brx-radio');
    if (brxRadio) {
      this.nativeInputChecked = this.currentChecked;
      if (!this.radioGroup) {
        enqueueIdleCallback(() => {
          this.syncCheckedFromNative();
        });
      }
    }
  }
  handleGlobalRadioGroupUpdate(event) {
    const target = event.target;
    const brxRadioGroup = target === null || target === void 0 ? void 0 : target.closest('brx-radio-group');
    if (brxRadioGroup && brxRadioGroup === this.radioGroup) {
      this.syncCheckedFromRadioGroup();
    }
  }
  connectedCallback() {
    this.syncCheckedFromRadioGroup();
  }
  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
    this.syncCurrentChecked();
  }
  render() {
    const labelId = `${this.inputId}-lbl`;
    return (hAsync(Host, { role: "radio", onBlur: this.onBlur, onFocus: this.onFocus, disabled: this.disabled, "aria-labelledby": labelId, tabindex: this.buttonTabindex, "data-checked": this.currentChecked, "aria-checked": `${this.currentChecked}`, "aria-hidden": this.disabled ? 'true' : null }, hAsync("input", { type: "radio", name: this.name, id: this.inputId, value: this.value, disabled: this.disabled, onChange: this.onChange, checked: this.currentChecked }), hAsync("label", { htmlFor: this.inputId, id: labelId }, this.label)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "checked": ["syncCurrentChecked"],
    "controlledChecked": ["syncCurrentChecked"],
    "value": ["handleStateChange", "emitUpdateEvent"],
    "currentChecked": ["handleStateChange", "handleCurrentCheckedChange", "emitUpdateEvent"]
  }; }
  static get style() { return brxRadioCss; }
  static get cmpMeta() { return {
    "$flags$": 0,
    "$tagName$": "brx-radio",
    "$members$": {
      "checked": [4],
      "controlledChecked": [4, "controlled-checked"],
      "buttonTabindex": [514, "button-tabindex"],
      "name": [513],
      "disabled": [516],
      "value": [520],
      "label": [513],
      "inputId": [1537, "input-id"],
      "currentChecked": [32],
      "setFocus": [64],
      "setButtonTabindex": [64],
      "getCurrentState": [64]
    },
    "$listeners$": [[9, "brxChange", "handleGlobalRadioChange"], [9, "brxRadioGroupUpdate", "handleGlobalRadioGroupUpdate"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["buttonTabindex", "button-tabindex"], ["name", "name"], ["disabled", "disabled"], ["value", "value"], ["label", "label"], ["inputId", "input-id"]]
  }; }
}

class BrxRadioGroup {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxRadioGroupChange = createEvent(this, "brxRadioGroupChange", 7);
    this.brxRadioGroupUpdate = createEvent(this, "brxRadioGroupUpdate", 7);
    this.labelId = undefined;
    this.label = undefined;
    this.name = undefined;
    this.value = undefined;
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = undefined;
    this.allowEmptySelection = false;
  }
  get radioElements() {
    return findTargets('brx-radio', this.el);
  }
  syncCurrentValueFromProps() {
    const targetValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = String(targetValue !== null && targetValue !== void 0 ? targetValue : '');
  }
  setValue(value) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }
    this.brxRadioGroupChange.emit({ value });
  }
  handleCurrentValueChange() {
    this.brxRadioGroupUpdate.emit({ value: this.currentValue });
  }
  getCurrentValue() {
    return Promise.resolve(this.currentValue);
  }
  handleRadioBrxChange(event) {
    const target = event.target;
    const brxRadio = target === null || target === void 0 ? void 0 : target.closest('brx-radio');
    if (brxRadio) {
      const { checked } = event.detail;
      if (checked) {
        event.preventDefault();
        const currentValue = this.currentValue;
        const newValue = brxRadio.value;
        if (newValue !== currentValue) {
          this.setValue(newValue);
        }
        else if (this.allowEmptySelection) {
          this.setValue(undefined);
        }
      }
    }
  }
  connectedCallback() {
    var _a;
    const label = findTarget(this.label);
    if (label) {
      if (!label.id) {
        label.id = (_a = this.labelId) !== null && _a !== void 0 ? _a : generateUniqueId();
      }
      this.labelId = label.id;
    }
    this.syncCurrentValueFromProps();
  }
  render() {
    const { label, labelId } = this;
    return (hAsync(Host, { role: "radiogroup", "aria-labelledby": label ? labelId : null }, hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"],
    "currentValue": ["handleCurrentValueChange"]
  }; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-radio-group",
    "$members$": {
      "labelId": [1025, "label-id"],
      "label": [513],
      "name": [513],
      "value": [8],
      "controlledValue": [8, "controlled-value"],
      "allowEmptySelection": [516, "allow-empty-selection"],
      "currentValue": [32],
      "getCurrentValue": [64]
    },
    "$listeners$": [[0, "brxChange", "handleRadioBrxChange"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["label", "label"], ["name", "name"], ["allowEmptySelection", "allow-empty-selection"]]
  }; }
}

const brxScrimCss = "brx-scrim[type=foco]{background:var(--surface-overlay-scrim);bottom:0;display:none;height:100%;left:0;position:fixed;right:0;top:0;width:100%;z-index:999}brx-scrim[type=foco] brx-modal{left:50%;max-height:90%;overflow:auto;position:absolute;top:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);transform:translate(-50%, -50%);z-index:1000}brx-scrim[type=foco][data-active]{display:block}brx-scrim[type=inibicao]{position:relative}brx-scrim[type=inibicao]::before{background:var(--surface-overlay-scrim);content:\"\";height:100%;left:0;position:absolute;top:0;width:100%}brx-scrim[type=legibilidade]{position:relative}brx-scrim[type=legibilidade] .scrim-text{background:var(--surface-overlay-text);bottom:0;left:0;padding:var(--spacing-scale-3x) var(--spacing-scale-baseh);position:absolute;width:100%}";

const DOMStrings$2 = {
  closeElement: '[data-scrim-dismiss]',
};
class BrxScrim {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxScrimChange = createEvent(this, "brxScrimChange", 7);
    this.active = undefined;
    this.controlledActive = TOKEN_UNCONTROLLED;
    this.currentActive = false;
    this.type = 'foco';
    this.closeElement = DOMStrings$2.closeElement;
  }
  syncCurrentActiveFromProps() {
    this.currentActive = getControlledValue(this.controlledActive, this.active, false);
  }
  setActive(isActive) {
    if (this.controlledActive === TOKEN_UNCONTROLLED) {
      this.currentActive = isActive;
    }
    this.brxScrimChange.emit({ active: isActive });
  }
  async showScrim() {
    this.setActive(true);
  }
  async hideScrim() {
    this.setActive(false);
  }
  handleClickFoco(event) {
    const closeElement = this.closeElement;
    const target = event.target;
    if (target === this.el) {
      this.hideScrim();
    }
    if (closeElement && target.closest(closeElement)) {
      this.hideScrim();
    }
  }
  handleClick(event) {
    switch (this.type) {
      case 'foco': {
        this.handleClickFoco(event);
        break;
      }
    }
  }
  get baseAttributes() {
    switch (this.type) {
      case 'foco': {
        return {
          ['data-scrim']: 'true',
          ['data-visible']: this.currentActive,
          ['aria-expanded']: this.currentActive,
        };
      }
      default: {
        return {};
      }
    }
  }
  render() {
    return (hAsync(Host, Object.assign({}, this.baseAttributes, { "data-active": this.currentActive ? true : null }), hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["syncCurrentActiveFromProps"],
    "controlledActive": ["syncCurrentActiveFromProps"]
  }; }
  static get style() { return brxScrimCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-scrim",
    "$members$": {
      "active": [4],
      "controlledActive": [4, "controlled-active"],
      "type": [513],
      "closeElement": [1, "close-element"],
      "currentActive": [32],
      "showScrim": [64],
      "hideScrim": [64]
    },
    "$listeners$": [[0, "click", "handleClick"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["type", "type"]]
  }; }
}

const brxScrimTriggerCss = "brx-scrim-trigger{display:inline-block}";

class BrxScrimTrigger {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.target = undefined;
  }
  get scrimElement() {
    return findTarget(this.target);
  }
  handleClick() {
    const scrim = this.scrimElement;
    if (scrim) {
      scrim.showScrim();
    }
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxScrimTriggerCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-scrim-trigger",
    "$members$": {
      "target": [513]
    },
    "$listeners$": [[0, "click", "handleClick"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["target", "target"]]
  }; }
}

const DEFAULT_NOT_FOUND_IMAGE = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABCCAYAAACl4qNCAAAABHNCSVQICAgIfAhkiAAAGMxJREFUeF7NXQl8FOXZf2bPbLKbbLIJARJChEQSCFc4IqAY/CiIgMZardYD0R9SW/3EVlAkSoAPQaAai1awleKnrVYR0wattVKxthWUI4AYCCEkMeQix26OPWdn+jwzzGaz2WM22YDv78dv1sx7/+e5n/eVgctU4mesH+9WqlZyttaZjEIdxznNsTzn1oDbYVaoY5qAUdWDSnuKc3Xtsh7fcewyTet7Owwz2DPT5z72Y85lfRrHmSB3LIZh6kAdvZ9RGbd0HSr6Vm67cOrlN5/S1/9m92xQKrN5HjI4u2OY22ZLUGg00YxaFc27ORfPslZ1QnwrA0wb73ZdAKX6qzFLbv5b6fCpVjljGQv+mg7ApptLFh+QU9+7zqABE59XNMHpbHuDZ22Twp1UrwlqYv+mYJSPdR7ecmYg/UypPxzt+PM/7nS0mhdxVnueu7t7eH/7U8UZWhil8jgDijcr1m56I1A/xoIPjApQFwPw5raSxSvCGW9QgDHkrbnWbWv5K/CcPpzJBK7Ls0qdaR/HxP60+9CapnD6zHn7tZmu2gvPuFra5nJOpyqctrLqKhiLIipqP+eyb6/etiMoZRAFmUsWVMvpN+LARI+9ewHPqN9DORIjZwLh1EEWZ2FUmuVdR1/+U6h241/91TJbQ8NK1tKZGapupN5zTtc3mnjjjsrnXnjFX58JBft249/b20oWPR5qzIgCo8+4eyyvi/mSBz421MD9f89zjEb/VvfiF5dCEcP59jPhzR13Wc9VbWLbLSP7P8bAWqKcatEMSXz59Mq163x7QnBWIDDI3oKXSAITFTNheQXPcyNCDRqJ9wqlujIqKfv6lr8/Wk/9TXt/16iOqu/2OurqJ0ai/0j0gbKoQpuaes+ph1Z87dufqaC0oLVkcUmgcSIGjGHaqp1ue/tDkViQ3D4Ynm9TqQ3zRzycPtVWXVOMAl0rt+3lqsdo1G5NcuIjZ54o2uE9ZkJBKVENKQVF/uYSEWBiZzyewXZ2fAsoWC7XgqVx4iZqWa3JFXmhHuGFaFNSnjmz6tn/6w1OYLYWEWD0k/+3hGNtt0R4LUG7Y5QAcRMUoIm/nKMOaCxek2haWfHMc7+S08uAgYkf9VCc06Bs4jm2/2yERxnOKFDdxyfvBkDC4912YJRR+HTiKyIIVCnQEhR+M06InxIF6kFUMeRsXrh1cPqsOinhtspnNv1Famss+HCSkuGLWj9YVODd34CBiZ35TCHb2bgh3En2AoG1oUdGh39yCQChpS38ZpTaXgCBQgmEizFXBWrDgKce9pQj0YBRKDrxA5tQXbyjWuqP1GgOmGJzycIy6W8DXl3M5EeP86xdtrtFogQgEBAAAsIDggSQQCVIQYDveARIgQCxVlBoo8E4GZBS6J1Ymkv/JnTjvNgKQxbNA01SYiT2b1D7UETryqo2FeNKApcBAxOd84ADP21NsEF4ZE+oQeE+K5ECqDqxKJFVeQAS3iEgRCUCQFiHqIaEiQCgC9mXDtRxvUcyHzwM5kNHEDQNpC79CT77z1EHFQ2fznWpw58tX7nWw2nIfQOgQc+ASDUDAkY//dnbOVvDuwEXxLEIhkoEgxQ2kh9UpL8FBKg3eDznhLjxGohK7qEUaczGPX8BtqMT2M4uGHrbYohK7bcL7HLiAoxW27bk+ZeSihjRSCZ3jZJhd7d+sDh/4MBMeeIVzmn5mb8VEZWQHCFARApAGSJQCxIXRwARBV0CzQMQUguBSVLGi4KihrIQO9Y/URIoRC30VMcbcRwVcA5HnykRJaG3WHj/fSnapMQnzxRu3CLNB22bIsmuGRDFGPJWf+i2ttzUa6E+VIK6VHgAscjiVMiOqB+GAaVeCQnTkJ3hf9OmSptLT6mgjwoBR6VBSezQDfTfvMsFbpsdbk1pgHP/PAa1bTzE58+AC7oMT70rzfbwgzpXtWV7hr8PZUDA6HNXfMu5urOljkUqQXmi0PSmEoGNcaTwhqYgFqmK5AvKIFAwYLoGf7s6PJup1NE7Djg7vVcA+qWQWjoAPbwC1TBqtaA4EFDZfCN8ev2/waxkIP0xpF5crXbeYlDqtCLlcJzQTqHBNleIkniNbkrN1uKj0h5KrpqBATP9qUaMSCZ7gEHhTewJlV2BJfUI8ktsTAZAInjEjixgGBsDSlUbgop/ww0XVGyyd6jgb84lUg2BRF8/UYwgwhA8VUw0zNPVwG+zDqAlqoD8jRx8fpKHmKxMiMkcDUp8T0VtjBUoTGWIUIQiTD6p1Ol+d25z8TIPMLeWHnDzbMGAgNGNW9KJm6jn8cujzfQYhYI2JW6gByCPwSgpAv4oCKmAYEWqURvdEDtGATkoa0ZpUXsjuYNUIPRJGp74C4OKGvHvgnrduyidnbAx+22o6GBh8moOpmapICV2InS53KCMMwhs8UxSAnAom4gSrwTVKPUxp85tfCHHA0zBh/cj3ykbEDDROQ/akX1pySAU7RGiEi82JgOgHhmEwLqsuOkIssoOxglINVYrfJU9AeKQ3fSnvHrwIOz8+mNIT0awkZjKqnioWVkEIzdvBguxQiw3T5wAh3OuFijuSoCDMtFR8/Lv+ixwYMCMX8b7szn6GoxEJaI2FJiCiP05UcY7wJRHcqVTYDFnJk7rDyZCm5ONjXDdjh6nbprRCCdWrIBFu3fDv6qrhTr35ObCJ6nJaB8ZBPZ2JRQClckws/LZbV9KCyU3zYCA0Y27vxv5V7Rfg9Hbou/l9xLlgK8M4pxdAmsyZCkgOlUHbFc3sOYOODN5ugcY+tL33X8/rP74Y1iYleXZ3D/ceWdA8D48fRqIcojqnsrPh/FDh/YB5q2jR8H0g3zQjUi5IrImZlTa3aceW/NHDztDORMeMPmfqeKY47cwLDvBbW8eynY13IeUgMwZ1VT82kXfFtkqZI+gnPF1uQQASAAK1WTtEHJOirqEo6EJ++DgdE6uZ9Npk69NTxcogb5+qXj/lkNevhRDwOiuSoPEufmgjNbJ6SKidXTpIx4vf7zQE9U03bqvRBYwyfcej7FV7dvhtjX9kHfZRHWGNlPYaNEoFEDo5XIJDpDodEDej0BSiRrConPSJAhkKi6zRVCLy7Nku+Fkb5Y3MHdePRo+rDwHDpNJ8BxQ8WZnl8MoVekNxZUbt/XKAwgJTPycV2e5rLWlnLVFjHwgCJJK29vvdckoFFbma9Ff8ntJFITUQSAS63JbWyE6TYeWvcGzIW6rDeWLU6CYG8uroBMteQMKZ3qqUSV2oREplcSYGGjp7oZ2m02gIjtZ9/jSiXWkNlQ3JS4OHPiuA4W+mf5ZzPCYrRXeRUN0TzdAXoIS6hbfLthA5Ekg1ZvYqUofI8g6snXIeKW/R1p70yQlbK4o3LRaWhO5Z4ICY7rh1RRHW3k557YZeqhEVHd5oNiJaHP0ACS5XC5Z5cI7icUhGAxZ7na0UdrxN7I/dNXEjI6CmBF6wdCTFk7sRPpSq1/aKZsSwqm4DFe+Fh2ibozpzGoAqENn95QFM6DBlCoYrQJHQNBIDZc8CgTSYICjHzf24W8eesyjpZhCyRj9tFUnOXu7R8cWJuvxeyEbI3c8L36hvYNbIkAEgmAs4pNn0fikisj+WEsN6NKG4z8NqHRiNFraDKIU0RoXN+e73/5/OPstu+56nMtSBIbyeW5vBTiEVDPdxMC53OtRQ+uJwBHVkhpN7h16DoZarRuZdlf5L9a8I00+qIwxzt2x1Nl0ZFevlaK7RbAzBMck+bTwK7/k26KnwMLoSa4ZpAjMA0M20CUoAgqNAdzdTaBO0ELqyGnAMX7c82Q4kt9ECBGgwYibsvPn46Cx6aIwDT2yLSpdyLqoDE0eAl3Ibs7X1MJVI9OEv3vXoffnzldDclKSUJ/qJSWaYNOWX0Nq+Wn4HeoPbdjltZhn04EMYNykBWA1TRQUADEehLLO3gUXvz1AnySoVGqImpyAXgUMPyRELqZtys0deWTJ8lrvvQ7IyvTXFB7hupt6VCKamuC+v+SdJQ+xUgRIMC7R/qBN5Z0W+vyRDXQJHmUOrW+VwYguew7ZViKCYwGn4wHZX/aZ7aMhPt4nCCO7tf+KM/MXwqGvj8G9SJTnVQpoww8AUORVj1oGuoy+qQuWL1YD23JS6GzI+DmgnpQUMR+bKtbQXLlhm8etJc3YLzBjbz+lqan4jQ1V4F5+Dg8bw2iiGKOnjxuVAaQKRh0t+LcE1uWyoJZlAE1iFGiTdKAx6QWZQU5GEuwubrnsrW16M1cgokiWG268DT7/QrTnpuai5X/0hPDbOO91NDL77BF4A5MwOg8gVQX67MyIGKPqBOP+s2ufnyutTwoz+11y0k8OZnaffL2i12aQdxhZEh6TELzHVIhVsZ11+IsFXWoqUoYDooab0M+F3lqf3aQYCWk3rnYz1n5Y9j4PBjCz594C//5SzMGbOmUyHC2/ADHjl4Fm+Ay/8+oFTNoUaG84ASMevDsiGlpUyrDlp1cVveYB5tbSsrYPFvu3/OOv27rQYa7Y5z1LohZM6BNZGcoQztYC0VeNQKOQR1AScJLBP2uiGBKgrtZ2YBV+Y2t+N2UwgJFYGQ2YPX4qNGcUBf1QfIFpqz0CKffeMWAXDio55qrNxbh5jOSVFSKZlHjudzcTF72Ta63Zf4RmS3JFVHkp7lEDSm0MRKUAGLKHgzJKdK/ILc4WVH+wtB8JmiLQq7vOw1v7UJ/c8QLV86aYUaMzoEHd4/bx14a1VKHMFBWO+GgeLtZ+AylL7hQ0R19PgfNiC6DcQLbuFJ7BiibJ9FpF4XMevk5xf3PJrWZq4xeYoUuPJlkOFTcTIFJhLedBn2EEQ04agtPXxR5qs0i2UECLxedFymyRWdiuC4MKzDXTc+HgV544VchZpYy4Ci58d14ARlKfpUb2unpofL9UAIRAG373jwL3p1B2q5JSr6p8+mlB5RTO0jCqA8TGAgJDL3RZd7dwzg4T/kP10AmmWZkoQ/rvRyJg3OjGZzu6MOXo45Ab4PkgBgEYb1Y2NXciCv/jsucjAUObTsE1b08AydG63/9RoBZj3hQwXjM1YL+YNLIOTwMUSRXoFAD9lk4CCBQjHQ3wPiKgn/b0HmfTodvUqOsnzh4dUoaEWhlNmkAhA3LNQvnq8sO3TxtUirnu2hlwx4NPBp3+S5sLofLMN0KdURnZUFVZ7mFl3mFpYmONe0o9mTpDFs/32y/aQHVnn92U5i1bfCsKwJgwasbxfCEqUv9CxO4XSGv2psmgqDpqnBg+2/I3G0ovouJsboEPNr8VCkfP+7x0lG8B9OWyE9/A/yy4HVovlPvt7423/gRvvPUu/OPj93u995YxeXlT4YXX/xp0Po8svQWOff0foU7mmBw4iyANu/OHaAbEh+03I71Jmzr0+oqn1v1LGtRYUJrve05TopjddEAU118pATPm+Y1z7HW1n6K5MmBkiFqI5B2NzWiYaeG91a9GBBjqpATZYsHiG/32Z0YPddmJU5A/e2ZAYGbNuga27CwNGxhJxoTr1DQf48Bljb2v+/Cv3hQIQMhd5oqlfDJpIr1YmfdhmozCXzbhVz5E9g4GqUiqMtkwJGNI1uzdsFt2t8EoxreTA//8j0BdI9NSIX1k4PNT3hQza9YMBMaT4+13Xv4oRlKXwwGmo5wHewOPjvWoz7rKtt9Ag5H4QG9cie/ZTP+W//bNW62V55+QvXsyKkqufHe3Fd4vel1GC7GKHGCIMqbMnAfVNd95+t2180VYcs+P/Y7jLfynoIH56zc+CZ9i0I4hf5nceI0EijAQBrKs3+wiZ5uYeOCn+AVm1FMrzJzNFlEHFbEzBzkj8Yveu/73EQfm8VVrEYg7BEohuZI+MjUgMN4UM3fuDbCuOPhZW38Uk/qAaPnLiXh2nubBVu+xIcW1M+5brCd2BSTVPsBM/P2vf2gpO9VbWsrexsAVSfgT1ZDHeM+zv5XdoxyKkd3ZpYreFJOXNw2F/0dhUwwJf8pJC5a8gdF2sJxEmYJ+Xd+CeRJbu8u2r5JNMVdvWPOas6XFk4AW7qID1RdYGUYOyS0TaVYW7hy9nZj9ZmV+DEzvedibeOiqwHAinTbxU1DOvItyxj+vJYKiaJm3RpC1bf179u8uBDFZw92GnvquNvSToYyJNCsLd0berOz666+D517ZGzbFjFh2n182Ro73ztNIJYJjJXDBWzW+6D65c3ZAivEFJvvFjR/Yqmt7HTsLd+H+6gsGJrIzSrDYUyg/XDzYrKy/FJP20/t7Wf0EiLUata5GH1kSYPOU0YkfdR7atDAgML7XaFy9/umdztbWsI+Ft33+HzzNZQL7hQZImD2jF+8lUKREcMo3vtLAeLOy/soYEv5k9XNuLXSf48FxUR4gEhCKmKEvdx3c8KhsGZO1df0j9roL28OlkpZPPoOu8gqP887bs0oqJSUxkKr8fZAx06+dD0eOiRHJ/mplI5Yvh+7zol3Sn6IakntXx/6HPXF+3z4YOiyDhxHQwBGPmOWfPx9V85sXLLzTKd83j+3oZBdRCxU6cucLjGRgkoPvSgv/SAATnbMEJXRYW+TZe4VGzyaOv9lQvXtOYDuGrH3EfJL3DQ2ZRas+cbVbfhDOl9D17RkBDHLk6ceO6ZM0R5QiHCrC55VWl71Z2fTpU+HFXeH7yqLG3CUko3hyIMLYLJUx88uOL1b19hP5tBfsGF85M+b5wjH2uqaTmCkSsZsuSPBTAp1CrYqoryyM/fBU9bZjbr55ITz53O6g3fgzMHXjlvYLFMpc1abPn4+EENTdEDAenLlxzeuu5hb5/vkQO0Qpr8TGKC3ovacj58TsDzDe6vKCBfOhcGtwb7c/YIhikCWFPbzalHXccuCXIS/X8wCTcCkJwGukqIxnnqjDzBZT2KP7aeCx/PFdOFpZZmwTmEwJkZiCp4/4YWOgAzN2qNx0042wZovg6A1YIkUxiqh4u370rdmN78yoDrWgHmBQCUCjp7q1ZKGHrq9a8/h0sNo/xWzE4MHrUKPgeymCGa53+Z5FUwRvcagiRRZD1WNRQ6QkQSpulHm5194IDz26Jnxgxi4RT2DLLMTClPHZSzo++7ms1NKQGVuji56c6e7o/ARXMaAb+0hldmKGDD3D0cpm5YhZlKGKFMAKVc/3/QM/WwkP/iygy0qoHgmKUSdPWG359NHNcufXBxgxPuDaLWVrUEc5L27Itrd3/oW1WPwefZYzmBSTcba2heWS+ef+j4SIob/yUck70Fgvuvr9AUObHqrMvmEBZGaND5tiojEPTW5RGkdu6/yiMPRkvDrsA0ygiBq1ydq27mV03S/nneHfDyYZmS48JRaOjAm2+CW3zfHE4tPSR0Nt9TkwzpwuXMTg7uqC0lf+LHfvBgUYgX1pTes7Dq1bG+5E/LKyYLed5hRvTHZYbZvwVtY7wmVvUtLfjOQMiLVgCGAApbPD4qEkt5uFE0cPCb0lF9wknm/Bc/sTjSkwnB/Y3TIOhx1OnRBS7ISE+rLDYmptKIphlGqX0jRuacf+n/+hP8sMKmPElBomjgPnS96sjQZacPastmbfuw852s33smZLLoZ0ZWX/ucxmwW9W/9Z7/ZlvyDbSfTKkBVqra6HtH1+EbNOfCsGAUeqHN2uTx93UUnKHiGg/SkjhTxk0GN0yB7tYc17j8ZiGvZ/c4Wgz34JG5GSMfqb5m4t3GLb+D3tAyszsx7z9NpGS7MgDISQYIjiNe/dh0ntP4qJ3Q0Ybj1eipAjZpm7zWdnTYKISQJd5W5/6eLqhWxWb/pLl818EV/NkjBQSGO8+6EANZtO0Y/LAulAXO2duWL2IYd0LkM3McXf2XGsi9UceZ7pjTCrkrhHYBV0jgrdgcHiaS3qKV5D0EKR0qst3fQSIb1oqnTAghYP6onbOdgVYayl6hTnYeLmQQiseUuKszTK2S6yi0JmEs6dSQbXZjWC9x3DsI51fbepZlOwe+1YMCxhqTsoBZodVE2uTLnhGoJDVBb6Be8HZg7HVHx/4KbKwH7Ft7dNYS8cApty/phRJpNh7uO75YKMhIKwyZtinamPaL1o/vM9/clv/pjuw+8pEoErz8RhGma8MCjSfPASJr2u8y15V+2NXV/cMW1V1/669CGPBlAjRXYlh3p4Lm8Jo3beqQhNzSqE2vKPL/NGLTW9OFK3VCJewKSbC48Oc82Xz2786ci/vcM5zNF9MwrB2xIZwtCIgeE0JK3pfBlSUUabT+H/o2KtwXNxlObL93IA6k9H4igPjPcc5NWXjUIbd6LhQv9je0DwVlYUYcnxSKIGKHNDo2gCFZjiYj9WFjLsH2h/UqlCGRHUoVNHHeIXm7zHJ03bWvz1VnMRlKt8rYHzXnF93PJVnmfFoQEzCsz14EwMzDEHT2OsbNXgAyum2Odqs56tsaoOh1tGm1LJdw9pdzkkuRqUfhflro7Hd1e7uRk82KV7hhQ6yntv/MJbSiZpZG9onuOmuemVcxmHgmQoVz59sfHv6qcuEgd9h/gsitjFaPKd5sQAAAABJRU5ErkJggg==`;
const mountSelectInputContent = (input, labels) => {
  if (labels.length === 0 || !input) {
    return '';
  }
  const GAP = 0.4;
  let amount = 1;
  let value = labels.toString().replaceAll(',', ', ');
  const tempSpan = document.createElement('span');
  tempSpan.innerHTML = value;
  document.querySelector('body').insertAdjacentElement('beforeend', tempSpan);
  while (tempSpan.offsetWidth > input.offsetWidth - input.offsetWidth * GAP) {
    value = labels
      .slice(0, labels.length - amount)
      .toString()
      .replaceAll(',', ', ')
      .concat(` + (${amount})`);
    tempSpan.innerHTML = value;
    amount++;
  }
  tempSpan.remove();
  return value;
};

const brxSelectCss = "brx-select{--select-divider:1px solid var(--color-secondary-04);--select-shadow:var(--surface-shadow-md);display:block;max-width:400px;min-width:100px;position:relative}brx-select .brx-select-options{background:var(--bg-color);-webkit-box-shadow:var(--select-shadow);box-shadow:var(--select-shadow);display:none;margin-top:-2px;max-height:404px;overflow:auto;position:absolute;resize:none;width:100%;z-index:1}brx-select .brx-select-options::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-select .brx-select-options::-webkit-scrollbar-track{background:var(--gray-10)}brx-select .brx-select-options::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-select .brx-select-options:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-select .brx-select-options:focus,brx-select .brx-select-options:active{color:var(--color-secondary-09);outline:none}brx-select .brx-select-options:hover::-webkit-scrollbar-thumb{background:var(--color-secondary-07)}brx-select .brx-select-options brx-select-option:not(:last-child) brx-item{border-bottom:var(--select-divider)}brx-select .brx-select-options brx-select-option brx-item{--color:var(--color-light);--color-rgb:var(--color-light-rgb);--text-color:var(--color);--interactive:var(--interactive-light);--interactive-rgb:var(--interactive-light-rgb);--visited:var(--visited-light);--hover:var(--hover-light);--pressed:var(--pressed-light);--focus-color:var(--focus-color-light);--focus:var(--focus-color);--item-padding-y:var(--spacing-scale-2x)}brx-select .brx-select-options brx-select-option brx-item .content{padding:0}brx-select .brx-select-options brx-select-option brx-item brx-checkbox,brx-select .brx-select-options brx-select-option brx-item brx-radio{--item-padding-x:var(--spacing-scale-2x);--item-padding-y:var(--spacing-scale-2x)}brx-select .brx-select-options brx-select-option brx-item brx-checkbox input:hover:not(:disabled)+label::before,brx-select .brx-select-options brx-select-option brx-item brx-radio input:hover:not(:disabled)+label::before{background-image:none}brx-select .brx-select-options brx-select-option brx-item brx-checkbox input+label,brx-select .brx-select-options brx-select-option brx-item brx-radio input+label{padding-left:calc(var(--checkbox-padding) + var(--checkbox-size) + var(--item-padding-x))}brx-select .brx-select-options brx-select-option brx-item brx-radio input+label,brx-select .brx-select-options brx-select-option brx-item brx-radio input:checked+label{color:var(--text-color);display:block;height:auto;min-height:0;padding:var(--item-padding)}brx-select .brx-select-options brx-select-option brx-item brx-radio input+label::before,brx-select .brx-select-options brx-select-option brx-item brx-radio input+label::after,brx-select .brx-select-options brx-select-option brx-item brx-radio input:checked+label::before,brx-select .brx-select-options brx-select-option brx-item brx-radio input:checked+label::after{display:none;content:none}brx-select .brx-select-options brx-select-option brx-item:not([disabled]){--focus-offset:calc(var(--spacing-scale-half) * -1)}brx-select .brx-select-options brx-select-option brx-item:not([disabled]):focus{outline:none}brx-select .brx-select-options brx-select-option brx-item:not([disabled]).focus-visible,brx-select .brx-select-options brx-select-option brx-item:not([disabled]):focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-select .brx-select-options brx-select-option brx-item:not([disabled]):not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-select .brx-select-options brx-select-option brx-item[selected]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-select .brx-select-options brx-select-option brx-item[selected]:focus{outline:none}brx-select .brx-select-options brx-select-option brx-item[selected].focus-visible,brx-select .brx-select-options brx-select-option brx-item[selected]:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-select .brx-select-options brx-select-option brx-item[selected]:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-select .brx-select-options brx-select-option brx-item[disabled]{line-height:calc(var(--font-line-height-high) * 2);padding-left:calc(var(--item-padding) + var(--spacing-scale-base))}brx-select[expanded] .brx-select-options,brx-select .brx-select-options[data-select-expanded]{display:block}brx-select brx-select-option[highlighted] brx-item{background-color:var(--gray-2);padding-bottom:var(--spacing-scale-base);padding-top:var(--spacing-scale-base)}brx-select brx-select-option[highlighted] brx-item brx-checkbox label,brx-select brx-select-option[highlighted] brx-item brx-radio label{font-weight:var(--font-weight-semi-bold)}brx-select brx-select-option[highlighted] brx-item brx-checkbox:hover,brx-select brx-select-option[highlighted] brx-item brx-radio:hover{background:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-select brx-select-option[highlighted] brx-item brx-checkbox:hover label,brx-select brx-select-option[highlighted] brx-item brx-radio:hover label{color:var(--text-color)}brx-select brx-select-option[highlighted] brx-item[selected]{background-color:var(--selected)}brx-select[dark-mode],brx-select[dark-mode] label{--color:var(--color-dark);--focus-color:var(--focus-color-dark)}";

const DOMStrings$1 = {
  toggle: 'brx-select-toggle',
  brxInput: '[data-select-input]',
  brxInputNative: '[data-select-input] input',
  option: 'brx-select-option',
  optionsList: '.brx-select-options',
  optionToggleAll: '[data-select-toggle-all]',
};
class BrxSelect {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.brxFilterInputChange = createEvent(this, "brxFilterInputChange", 7);
    this.darkMode = false;
    this.hideSearchIcon = false;
    this.placeholder = undefined;
    this.name = undefined;
    this.nativeSelect = null;
    this.label = undefined;
    this.inputId = undefined;
    this.multiple = false;
    this.expanded = false;
    this.showFeedbackNotFound = false;
    this.disableToggleAll = false;
    this.selectAllLabel = 'Selecionar Todos';
    this.unselectAllLabel = 'Deselecionar Todos';
    this.value = [];
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = [];
  }
  get inputEl() {
    return this.el.querySelector(DOMStrings$1.brxInputNative);
  }
  get toggleEl() {
    return this.el.querySelector(DOMStrings$1.toggle);
  }
  get optionsListEl() {
    return this.el.querySelector(DOMStrings$1.optionsList);
  }
  syncCurrentValueFromProps() {
    const incomingValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = castArray(incomingValue !== null && incomingValue !== void 0 ? incomingValue : []);
  }
  get definedOptions() {
    return this.allOptions.filter(option => !option.matches(DOMStrings$1.optionToggleAll));
  }
  get allOptions() {
    return findTargets(DOMStrings$1.option, this.el);
  }
  get focusedOption() {
    var _a;
    return (_a = this.allOptions[this.focusedOptionIndex]) !== null && _a !== void 0 ? _a : null;
  }
  get focusedOptionIndex() {
    return this.allOptions.findIndex(option => option.contains(document.activeElement));
  }
  get currentValueLabels() {
    const currentValue = this.currentValue;
    return this.definedOptions
      .filter(option => currentValue.includes(option.value))
      .map(option => {
      const label = findTarget('label', option);
      return label === null || label === void 0 ? void 0 : label.innerText;
    });
  }
  get currentValueOptions() {
    return this.currentValue.map(value => this.definedOptions.find(option => option.value === value));
  }
  get inputPlaceholder() {
    var _a;
    return (_a = this.placeholder) !== null && _a !== void 0 ? _a : (this.multiple ? 'Selecione os itens.' : 'Selecione o item.');
  }
  get isToggleAllEnabled() {
    return this.multiple && !this.disableToggleAll;
  }
  get isAllSelected() {
    return this.definedOptions.length === this.currentValue.length;
  }
  get toggleAllLabel() {
    return this.isAllSelected ? this.unselectAllLabel : this.selectAllLabel;
  }
  set inputValue(value) {
    if (this.inputEl) {
      this.inputEl.value = value;
      if (value === null || value === '') {
        this.brxFilterInputChange.emit({ query: '' });
      }
    }
  }
  setValue(value) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }
    this.brxChange.emit({ value });
  }
  changeValue(optionValue) {
    const currentValue = this.multiple ? this.currentValue : this.currentValue.filter(i => i === optionValue);
    this.setValue(toggleItem(currentValue, optionValue));
  }
  focusOption(option = null) {
    const item = option && findTarget('brx-item', option);
    if (item) {
      item.focus();
    }
  }
  selectAll() {
    this.setValue(this.definedOptions.map(option => option.value));
  }
  unselectAll() {
    this.setValue([]);
  }
  toggleAll() {
    if (this.isAllSelected) {
      this.unselectAll();
    }
    else {
      this.selectAll();
    }
  }
  openSelect() {
    this.expanded = true;
  }
  closeSelect() {
    this.expanded = false;
  }
  toggleExpanded() {
    this.expanded = !this.expanded;
  }
  setInput() {
    const currentValueLabels = this.currentValueLabels;
    const preview = this.multiple ? mountSelectInputContent(this.inputEl, currentValueLabels) : currentValueLabels[0];
    this.inputValue = preview !== null && preview !== void 0 ? preview : null;
  }
  resetInput() {
    this.inputValue = null;
  }
  resetVisible() {
    for (const option of this.allOptions) {
      option.visible = true;
    }
  }
  syncOptions() {
    for (const option of this.definedOptions) {
      option.multiple = this.multiple;
      option.checked = this.currentValue.includes(option.value);
    }
  }
  handleCurrentValueChange() {
    this.syncOptions();
    if (!this.multiple && this.expanded) {
      this.closeSelect();
    }
    this.setInput();
  }
  handleExpandedChange() {
    this.toggleEl.expanded = this.expanded;
    if (this.expanded) {
      this.optionsListEl.dataset.selectExpanded = '';
    }
    else {
      delete this.optionsListEl.dataset.selectExpanded;
    }
    if (this.expanded) {
      this.resetInput();
    }
    else {
      this.setInput();
    }
  }
  handleGlobalClick(event) {
    const target = event.target;
    if (!this.el.contains(target)) {
      this.closeSelect();
    }
  }
  handleToggleClick(event) {
    const target = event.target;
    const trigger = target.closest(DOMStrings$1.toggle);
    if (trigger) {
      this.toggleExpanded();
    }
  }
  handleInputFocus(event) {
    const target = event.target;
    const trigger = target.closest(DOMStrings$1.brxInput);
    if (trigger) {
      this.openSelect();
    }
  }
  async handleOptionChange(option, incomingDetail) {
    const isToggleAll = option.closest(DOMStrings$1.optionToggleAll);
    const { value, checked } = incomingDetail;
    if (isToggleAll) {
      if (checked) {
        this.selectAll();
      }
      else {
        this.unselectAll();
      }
    }
    else {
      this.changeValue(value);
    }
  }
  handleOptionChangeEvent(event) {
    const target = event.target;
    const option = target.closest(DOMStrings$1.option);
    this.handleOptionChange(option, event.detail);
  }
  handleInputChange(event) {
    const target = event.target;
    const brxInput = target.closest('brx-input');
    if (brxInput) {
      const detail = event.detail;
      this.brxFilterInputChange.emit({ query: String(detail.value) });
    }
  }
  getRotatedFocusedOptionIndex(direction) {
    return minmax(this.focusedOptionIndex + direction, 0, this.allOptions.length - 1);
  }
  getRotatedFocusedOption(direction) {
    const targetIndex = this.getRotatedFocusedOptionIndex(direction);
    return this.allOptions[targetIndex];
  }
  rotateOptionFocus(direction) {
    this.focusOption(this.getRotatedFocusedOption(direction));
  }
  handleKeydownOnInput(event) {
    switch (event.key) {
      case 'Tab': {
        if (event.shiftKey) {
          this.closeSelect();
        }
        else {
          this.toggleEl.focus();
        }
        break;
      }
    }
    if (event.code === 'ArrowDown') {
      event.preventDefault();
      this.rotateOptionFocus(1);
    }
  }
  /**
   * Define comportamentos de teclado no option
   */
  async setKeyboardClickOnActiveOption() {
    const option = this.focusedOption;
    option.toggleChecked();
  }
  handleKeydownOnList(event) {
    const handledCodes = ['Tab', 'Escape', 'Space', 'ArrowUp', 'ArrowDown'];
    if (handledCodes.includes(event.code)) {
      event.preventDefault();
    }
    switch (event.code) {
      case 'Tab': {
        this.closeSelect();
        break;
      }
      case 'Escape': {
        this.closeSelect();
        break;
      }
      case 'Space': {
        this.setKeyboardClickOnActiveOption();
        break;
      }
      case 'ArrowUp': {
        this.rotateOptionFocus(-1);
        break;
      }
      case 'ArrowDown': {
        this.rotateOptionFocus(1);
        break;
      }
    }
  }
  handleKeydownEvent(event) {
    const target = event.target;
    if (target.closest('brx-input')) {
      this.handleKeydownOnInput(event);
    }
    if (target.closest('.brx-select-options')) {
      this.handleKeydownOnList(event);
    }
  }
  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
    this.syncCurrentValueFromProps();
  }
  componentDidLoad() {
    this.setInput();
  }
  get isNativeSelectEnabled() {
    var _a;
    return (_a = this.nativeSelect) !== null && _a !== void 0 ? _a : typeof this.name === 'string';
  }
  render() {
    return (hAsync(Host, null, hAsync("brx-input", { type: "text", label: this.label, "data-select-input": true, placeholder: this.inputPlaceholder, "start-icon-name": this.hideSearchIcon ? undefined : 'fa5/fas/search' }, hAsync("brx-select-toggle", { slot: "end-button" })), hAsync("div", { tabindex: "0", class: "brx-select-options" }, this.isToggleAllEnabled && hAsync("brx-select-option", { "data-select-toggle-all": true, highlighted: true, multiple: true, checked: this.isAllSelected, label: this.toggleAllLabel }), hAsync("slot", null), this.showFeedbackNotFound && (hAsync("slot", { name: "not-found" }, hAsync("div", { class: "br-item not-found" }, hAsync("div", { class: "container pl-0 pr-0" }, hAsync("div", { class: "row" }, hAsync("div", { class: "col-auto" }, hAsync("img", { src: DEFAULT_NOT_FOUND_IMAGE })), hAsync("div", { class: "col" }, hAsync("p", null, hAsync("strong", null, "Ops!"), " N\u00E3o encontramos o que voc\u00EA est\u00E1 procurando!"))))))), hAsync("div", { class: 'd-none' }, this.isNativeSelectEnabled && (hAsync("select", { name: this.name }, this.definedOptions.map(option => {
      var _a;
      return (hAsync("option", { key: option.value, value: option.value }, (_a = option.label) !== null && _a !== void 0 ? _a : option.value));
    })))))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"],
    "currentValue": ["handleCurrentValueChange"],
    "expanded": ["handleExpandedChange"]
  }; }
  static get style() { return brxSelectCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-select",
    "$members$": {
      "darkMode": [516, "dark-mode"],
      "hideSearchIcon": [4, "hide-search-icon"],
      "placeholder": [1],
      "name": [513],
      "nativeSelect": [4, "native-select"],
      "label": [1],
      "inputId": [1025, "input-id"],
      "multiple": [516],
      "disableToggleAll": [4, "disable-toggle-all"],
      "selectAllLabel": [1, "select-all-label"],
      "unselectAllLabel": [1, "unselect-all-label"],
      "value": [1],
      "controlledValue": [1, "controlled-value"],
      "expanded": [32],
      "showFeedbackNotFound": [32],
      "currentValue": [32]
    },
    "$listeners$": [[8, "click", "handleGlobalClick"], [0, "click", "handleToggleClick"], [0, "brxFocus", "handleInputFocus"], [0, "brxSelectOptionChange", "handleOptionChangeEvent"], [0, "brxChange", "handleInputChange"], [0, "keydown", "handleKeydownEvent"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["darkMode", "dark-mode"], ["name", "name"], ["multiple", "multiple"]]
  }; }
}

const brxSelectOptionCss = ":host{display:block}";

class BrxSelectOption {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxSelectOptionChange = createEvent(this, "brxSelectOptionChange", 7);
    this.label = undefined;
    this.inputId = undefined;
    this.multiple = false;
    this.highlighted = false;
    this.value = undefined;
    this.checked = false;
    this.visible = true;
  }
  changeChecked(checked) {
    const { value } = this;
    if (checked !== this.checked) {
      this.brxSelectOptionChange.emit({ value, checked });
    }
  }
  toggleChecked() {
    this.changeChecked(!this.checked);
    return Promise.resolve();
  }
  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
  }
  handleBrxChange(event) {
    const target = event.target;
    const trigger = target.closest('brx-select, brx-radio');
    if (trigger) {
      const detail = event.detail;
      this.changeChecked(detail.checked);
    }
  }
  handleClick(event) {
    const target = event.target;
    if (target === this.el) {
      this.toggleChecked();
    }
  }
  get brxInputAttributes() {
    const { label, inputId, checked, value } = this;
    return {
      label,
      value,
      inputId,
      controlledChecked: checked,
    };
  }
  render() {
    const { visible, brxInputAttributes } = this;
    return (hAsync(Host, { class: !visible ? 'd-none' : '' }, hAsync("brx-item", { tabindex: "-1", "data-toggle": "selection" }, this.multiple ? hAsync("brx-checkbox", Object.assign({}, brxInputAttributes)) : hAsync("brx-radio", Object.assign({}, brxInputAttributes)), hAsync("slot", null))));
  }
  get el() { return getElement(this); }
  static get style() { return brxSelectOptionCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-select-option",
    "$members$": {
      "label": [1],
      "inputId": [1025, "input-id"],
      "multiple": [4],
      "highlighted": [516],
      "value": [1],
      "checked": [4],
      "visible": [4],
      "toggleChecked": [64]
    },
    "$listeners$": [[0, "brxChange", "handleBrxChange"], [0, "click", "handleClick"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["highlighted", "highlighted"]]
  }; }
}

const brxSelectToggleCss = "brx-select-toggle{display:block}";

class BrxSelectToggle {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.expanded = false;
  }
  get label() {
    return this.expanded ? 'Esconder lista.' : 'Exibir lista.';
  }
  render() {
    const { label, expanded } = this;
    return (hAsync(Host, null, hAsync("brx-button", { "aria-label": label, size: "small", title: label, tabindex: "-1" }, hAsync("brx-icon", { name: expanded ? 'fa5/fas/angle-up' : 'fa5/fas/angle-down', "aria-hidden": "true" }), hAsync("slot", null))));
  }
  static get style() { return brxSelectToggleCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-select-toggle",
    "$members$": {
      "expanded": [4]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxSigninCss = "brx-signin{display:inline-block}";

class BrxSignin {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'Entrar';
    this.showIcon = true;
    this.showLabel = true;
    this.iconName = 'fa5/fas/user';
  }
  // end brx-signin props
  render() {
    return (hAsync(Host, null, hAsync("slot", { name: "content" }, this.showIcon && hAsync("brx-icon", { name: this.iconName }), this.showLabel && hAsync(Fragment, null, this.label), hAsync("slot", null))));
  }
  static get style() { return brxSigninCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-signin",
    "$members$": {
      "label": [513],
      "showIcon": [516, "show-icon"],
      "showLabel": [516, "show-label"],
      "iconName": [513, "icon-name"]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["label", "label"], ["showIcon", "show-icon"], ["showLabel", "show-label"], ["iconName", "icon-name"]]
  }; }
}

const brxSkiplinkCss = "brx-skiplink{display:block;--skiplink-layer:var(--z-index-layer-4);--skiplink-margin:var(--spacing-scale-2x);--skiplink-min-width:300px;--skiplink-shadow:var(--surface-shadow-lg);--skiplink-duration:150ms;--skiplink-timing-function:ease-out;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;left:var(--skiplink-margin);position:fixed;top:0;z-index:var(--skiplink-layer)}brx-skiplink a{display:block;height:auto;-ms-flex-align:center;align-items:center;background-color:var(--background);-webkit-box-shadow:var(--skiplink-shadow);box-shadow:var(--skiplink-shadow);display:-ms-inline-flexbox;display:inline-flex;min-width:var(--skiplink-min-width);position:absolute;top:-100vh;-webkit-transition:top var(--skiplink-duration) var(--skiplink-timing-function);transition:top var(--skiplink-duration) var(--skiplink-timing-function);white-space:nowrap;width:auto}brx-skiplink a:focus,brx-skiplink a:focus-visible{top:0}brx-skiplink[full]{-webkit-box-shadow:var(--skiplink-shadow);box-shadow:var(--skiplink-shadow);-ms-flex-direction:row;flex-direction:row;top:-100vh;-webkit-transition:top var(--skiplink-duration) var(--skiplink-timing-function);transition:top var(--skiplink-duration) var(--skiplink-timing-function)}brx-skiplink[full] a{-webkit-box-shadow:none;box-shadow:none;min-width:0;position:relative;top:0}brx-skiplink[full]:focus-within{top:0}";

class BrxSkiplink {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.full = undefined;
  }
  render() {
    return (hAsync(Host, { role: "navigation" }, hAsync("slot", null)));
  }
  static get style() { return brxSkiplinkCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-skiplink",
    "$members$": {
      "full": [516]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["full", "full"]]
  }; }
}

const brxStepCss = "@charset \"UTF-8\";brx-step{display:block;--step-empty:16px;--step-empty-border:4px;--step-line:1px;--step-size:var(--step-medium);--step-small:32px;--step-medium:40px;--step-large:48px;--step-simple-size:var(--step-simple-medium);--step-simple-medium:8px;--step-simple-large:12px;--step-alert-success-icon:\"\";--step-alert-warning-icon:\"\";--step-alert-info-icon:\"\";--step-alert-danger-icon:\"\";display:-ms-flexbox;display:flex}brx-step brx-step-progress{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1}brx-step brx-tooltip-auto,brx-step brx-tooltip-auto brx-tooltip,brx-step brx-tooltip-auto .brx-tooltip-auto-container{width:100%}brx-step[vertical]{-ms-flex-direction:column;flex-direction:column}brx-step[vertical] brx-step-progress{-ms-flex-direction:column;flex-direction:column}brx-step brx-step-progress-btn{-ms-flex-positive:1;flex-grow:1}brx-step brx-step-progress-btn button{-ms-flex-align:center;align-items:center;background-color:transparent;border:0;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;min-height:var(--step-size);padding:0;position:relative;width:100%}brx-step[label-position=left] brx-step-progress-btn button{-ms-flex-pack:end;justify-content:end}brx-step[label-position=right] brx-step-progress-btn button{-ms-flex-pack:start;justify-content:start}brx-step[vertical] brx-step-progress-btn button{-ms-flex-pack:start;justify-content:start}brx-step[vertical][label-position=left] brx-step-progress-btn button{-ms-flex-pack:end;justify-content:end}brx-step[vertical][label-position=right] brx-step-progress-btn button{-ms-flex-pack:start;justify-content:start}brx-step brx-step-progress-btn button::before{-ms-flex-align:center;align-items:center;background-color:var(--background);border:var(--step-line) solid var(--interactive);border-radius:50%;color:var(--interactive);content:attr(step-num);display:-ms-inline-flexbox;display:inline-flex;font-size:var(--font-size-scale-up-03);font-weight:var(--font-weight-medium);height:var(--step-size);-ms-flex-pack:center;justify-content:center;left:0;margin:auto;position:absolute;right:0;width:var(--step-size);z-index:2}brx-step .step-icon{-ms-flex-align:center;align-items:center;color:var(--interactive);display:-ms-inline-flexbox;display:inline-flex;height:var(--step-size);-ms-flex-pack:center;justify-content:center;position:absolute;width:var(--step-size);z-index:4}brx-step .step-alert{-ms-flex-align:center;align-items:center;border-radius:50%;color:var(--color-dark);display:-ms-flexbox;display:flex;height:var(--font-size-scale-up-04);-ms-flex-pack:center;justify-content:center;position:absolute;width:var(--font-size-scale-up-04);z-index:4}brx-step .step-alert::after{display:-ms-flexbox;display:flex;font-family:\"Font Awesome 5 Free\";font-size:var(--font-size-scale-up-01);font-weight:900}brx-step[label-position=bottom] brx-step-progress-btn button::before{top:0}brx-step[label-position=bottom] .step-icon{top:0}brx-step[label-position=bottom] .step-alert{-webkit-transform:translate(calc(var(--step-size) * 0.5), calc(var(--step-size) * -0.75));transform:translate(calc(var(--step-size) * 0.5), calc(var(--step-size) * -0.75))}brx-step[label-position=top] brx-step-progress-btn button::before{bottom:0}brx-step[label-position=top] .step-icon{bottom:0}brx-step[label-position=top] .step-alert{-webkit-transform:translate(calc(var(--step-size) * 0.5), calc(var(--step-size) * 0.25));transform:translate(calc(var(--step-size) * 0.5), calc(var(--step-size) * 0.25))}brx-step[label-position=left] brx-step-progress-btn button::before{left:auto;right:0}brx-step[label-position=left] .step-alert{-webkit-transform:translate(calc(var(--step-size) * 0.4), calc(var(--step-size) * -0.25));transform:translate(calc(var(--step-size) * 0.4), calc(var(--step-size) * -0.25))}brx-step[label-position=right] brx-step-progress-btn button::before{left:0;right:auto}brx-step[label-position=right] .step-alert{-webkit-transform:translate(calc(var(--step-size) * 0.65), calc(var(--step-size) * -0.25));transform:translate(calc(var(--step-size) * 0.65), calc(var(--step-size) * -0.25))}brx-step[vertical] brx-step-progress-btn button::before{bottom:0;left:auto;right:auto;top:0}brx-step[vertical][label-position=left] brx-step-progress-btn button::before{right:0}brx-step[vertical][label-position=right] brx-step-progress-btn button::before{left:0}brx-step brx-step-progress-btn button::after{background-color:var(--interactive);content:\"\";display:block;height:var(--step-line);left:0;position:absolute;right:0;z-index:1}brx-step brx-step-progress-btn:first-child button::after{left:50%}brx-step brx-step-progress-btn:last-child button::after{right:50%}brx-step[label-position=bottom] brx-step-progress-btn button::after{top:calc(var(--step-size) * 0.5)}brx-step[label-position=top] brx-step-progress-btn button::after{bottom:calc(var(--step-size) * 0.5)}brx-step[label-position=left] brx-step-progress-btn button::after{left:0}brx-step[label-position=left] brx-step-progress-btn:first-child button::after{left:100%}brx-step[label-position=left] brx-step-progress-btn:last-child button::after{right:0}brx-step[label-position=right] brx-step-progress-btn button::after{right:0}brx-step[label-position=right] brx-step-progress-btn:first-child button::after{left:0}brx-step[label-position=right] brx-step-progress-btn:last-child button::after{right:100%}brx-step[vertical] brx-step-progress-btn button::after{bottom:0;height:auto;left:auto;right:auto;top:0;width:var(--step-line)}brx-step[vertical] brx-step-progress-btn:first-child button::after{left:auto;top:50%}brx-step[vertical] brx-step-progress-btn:last-child button::after{bottom:50%;right:auto}brx-step[vertical][label-position=left] brx-step-progress-btn button::after{right:calc(var(--step-size) * 0.5)}brx-step[vertical][label-position=right] brx-step-progress-btn button::after{left:calc(var(--step-size) * 0.5)}brx-step .step-info{color:var(--interactive);display:inline-block;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-medium)}brx-step[label-position=bottom] .step-info{margin-top:var(--step-size);padding-top:var(--spacing-scale-2x)}brx-step[label-position=top] .step-info{margin-bottom:var(--step-size);padding-bottom:var(--spacing-scale-2x)}brx-step[label-position=left] .step-info{display:none}@media (min-width: 576px){brx-step[label-position=left] .step-info{background-color:var(--background);display:inline-block;margin-right:var(--step-size);padding:var(--spacing-scale-2x);position:relative;z-index:3}}brx-step[label-position=right] .step-info{display:none}@media (min-width: 576px){brx-step[label-position=right] .step-info{background-color:var(--background);display:inline-block;margin-left:var(--step-size);padding:var(--spacing-scale-2x);position:relative;z-index:3}}brx-step[vertical][label-position=left] .step-info{display:inline-block;margin-left:0;margin-right:var(--step-size);padding:var(--spacing-scale-2x)}brx-step[vertical][label-position=right] .step-info{display:inline-block;margin-left:var(--step-size);margin-right:0;padding:var(--spacing-scale-2x)}brx-step[type=void] brx-step-progress-btn button::before{content:\"\";height:var(--step-empty);width:var(--step-empty)}brx-step[type=void] .step-info{height:0;overflow:hidden;position:absolute;width:0}brx-step[type=simple]{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}brx-step[type=simple] brx-step-progress{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}brx-step[type=simple] brx-step-progress-btn{-ms-flex-positive:0;flex-grow:0}brx-step[type=simple] brx-step-progress-btn button{width:24px}brx-step[type=simple] brx-step-progress-btn button::before{background-color:var(--gray-20);border-color:var(--gray-20);content:\"\";height:var(--step-simple-size);width:var(--step-simple-size)}brx-step[type=simple] brx-step-progress-btn button::after{content:none}brx-step[type=simple] .step-info{height:0;overflow:hidden;position:absolute;width:0}brx-step[type=text]{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}brx-step[type=text] brx-step-progress{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}brx-step[type=text] brx-step-progress-btn{position:absolute}brx-step[type=text] brx-step-progress-btn brx-tooltip-content{min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}brx-step[type=text] brx-step-progress-btn button{height:0;min-height:var(--font-size-scale-base);overflow:hidden;width:0}brx-step[type=text] brx-step-progress-btn button::before{background-color:transparent;border:0;color:var(--color);font-size:var(--font-size-scale-base);font-weight:var(--font-weight-regular);width:auto}brx-step[type=text] brx-step-progress-btn button::after{content:none}brx-step[type=text] .step-info{height:0;overflow:hidden;position:absolute;width:0}brx-step[scroll],brx-step[data-scroll]{overflow-x:auto;overflow-y:hidden}brx-step[scroll]::-webkit-scrollbar,brx-step[data-scroll]::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-step[scroll]::-webkit-scrollbar-track,brx-step[data-scroll]::-webkit-scrollbar-track{background:var(--gray-10)}brx-step[scroll]::-webkit-scrollbar-thumb,brx-step[data-scroll]::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-step[scroll]:hover::-webkit-scrollbar-thumb,brx-step[data-scroll]:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}brx-step[scroll] brx-step-progress-btn button,brx-step[data-scroll] brx-step-progress-btn button{min-width:200px}brx-step[scroll][vertical],brx-step[data-scroll][vertical]{overflow-x:hidden;overflow-y:auto}brx-step[scroll][vertical] brx-step-progress-btn button,brx-step[data-scroll][vertical] brx-step-progress-btn button{min-height:100px;min-width:auto}brx-step brx-step-progress-btn[alert=success] button{color:var(--success)}brx-step brx-step-progress-btn[alert=success] button .step-info{color:var(--success)}brx-step brx-step-progress-btn[alert=success] button .step-alert{background-color:var(--success)}brx-step brx-step-progress-btn[alert=success] button .step-alert::after{content:var(--step-alert-success-icon)}brx-step brx-step-progress-btn[alert=info] button{color:var(--info)}brx-step brx-step-progress-btn[alert=info] button .step-info{color:var(--info)}brx-step brx-step-progress-btn[alert=info] button .step-alert{background-color:var(--info)}brx-step brx-step-progress-btn[alert=info] button .step-alert::after{content:var(--step-alert-info-icon)}brx-step brx-step-progress-btn[alert=warning] button{color:var(--color-light)}brx-step brx-step-progress-btn[alert=warning] button .step-info{color:var(--color)}brx-step brx-step-progress-btn[alert=warning] button .step-alert{background-color:var(--warning)}brx-step brx-step-progress-btn[alert=warning] button .step-alert::after{content:var(--step-alert-warning-icon);color:var(--color-light)}brx-step brx-step-progress-btn[alert=danger] button{color:var(--danger)}brx-step brx-step-progress-btn[alert=danger] button .step-info{color:var(--danger)}brx-step brx-step-progress-btn[alert=danger] button .step-alert{background-color:var(--danger)}brx-step brx-step-progress-btn[alert=danger] button .step-alert::after{content:var(--step-alert-danger-icon)}brx-step brx-step-progress-btn.active button::before,brx-step brx-step-progress-btn[active] button::before{background-color:var(--active);border-color:var(--active);color:var(--background)}brx-step brx-step-progress-btn.active button .step-icon,brx-step brx-step-progress-btn[active] button .step-icon{color:var(--background)}brx-step brx-step-progress-btn button:focus{outline:none}brx-step brx-step-progress-btn button.focus-visible::before,brx-step brx-step-progress-btn button:focus-visible::before{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width);z-index:4}brx-step brx-step-progress-btn button:hover:not(:disabled)::before{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-step brx-step-progress-btn button:disabled{opacity:1}brx-step brx-step-progress-btn button:disabled::before{border-color:rgba(var(--interactive-rgb), var(--disabled))}brx-step brx-step-progress-btn button:disabled .step-icon{color:rgba(var(--interactive-rgb), var(--disabled))}brx-step[type=void] brx-step-progress-btn.active button .step-alert,brx-step[type=void] brx-step-progress-btn[active] button .step-alert{border:var(--step-empty-border) solid var(--active);height:calc(var(--font-size-scale-up-04) + var(--step-empty-border));width:calc(var(--font-size-scale-up-04) + var(--step-empty-border))}brx-step[type=void] brx-step-progress-btn[alert] button.focus-visible::before,brx-step[type=void] brx-step-progress-btn[alert] button:focus-visible::before{outline:none}brx-step[type=void] brx-step-progress-btn[alert] button.focus-visible .step-alert,brx-step[type=void] brx-step-progress-btn[alert] button:focus-visible .step-alert{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width);z-index:4}brx-step[type=text] brx-step-progress-btn button{cursor:default}brx-step[type=text] brx-step-progress-btn.active,brx-step[type=text] brx-step-progress-btn[active]{width:auto;position:static}brx-step[type=text] brx-step-progress-btn.active button,brx-step[type=text] brx-step-progress-btn[active] button{height:auto;position:static;width:100%}brx-step[type=text] brx-step-progress-btn.active button::before,brx-step[type=text] brx-step-progress-btn[active] button::before{background-color:transparent;border:0;color:var(--color);position:static}brx-step[type=text] brx-step-progress-btn button:focus::before,brx-step[type=text] brx-step-progress-btn button.focus-visible::before,brx-step[type=text] brx-step-progress-btn button:focus-visible::before{outline:none}brx-step[type=text] brx-step-progress-btn button:hover::before{background-image:none}brx-step.inverted,brx-step.dark-mode,brx-step[dark-mode]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-step.inverted brx-step-progress-btn.active button,brx-step.inverted brx-step-progress-btn[active] button,brx-step.dark-mode brx-step-progress-btn.active button,brx-step.dark-mode brx-step-progress-btn[active] button,brx-step[dark-mode] brx-step-progress-btn.active button,brx-step[dark-mode] brx-step-progress-btn[active] button{color:var(--color-dark)}brx-step.inverted brx-step-progress-btn.active button::before,brx-step.inverted brx-step-progress-btn[active] button::before,brx-step.dark-mode brx-step-progress-btn.active button::before,brx-step.dark-mode brx-step-progress-btn[active] button::before,brx-step[dark-mode] brx-step-progress-btn.active button::before,brx-step[dark-mode] brx-step-progress-btn[active] button::before{background-color:var(--background-light);border-color:var(--background-light);color:var(--active)}brx-step.inverted brx-step-progress-btn.active button .step-icon,brx-step.inverted brx-step-progress-btn[active] button .step-icon,brx-step.dark-mode brx-step-progress-btn.active button .step-icon,brx-step.dark-mode brx-step-progress-btn[active] button .step-icon,brx-step[dark-mode] brx-step-progress-btn.active button .step-icon,brx-step[dark-mode] brx-step-progress-btn[active] button .step-icon{color:var(--active)}brx-step.inverted brx-step-progress-btn[alert=success] button,brx-step.dark-mode brx-step-progress-btn[alert=success] button,brx-step[dark-mode] brx-step-progress-btn[alert=success] button{color:var(--success-alternative)}brx-step.inverted brx-step-progress-btn[alert=success] button .step-info,brx-step.dark-mode brx-step-progress-btn[alert=success] button .step-info,brx-step[dark-mode] brx-step-progress-btn[alert=success] button .step-info{color:var(--success-alternative)}brx-step.inverted brx-step-progress-btn[alert=success] button .step-alert::after,brx-step.dark-mode brx-step-progress-btn[alert=success] button .step-alert::after,brx-step[dark-mode] brx-step-progress-btn[alert=success] button .step-alert::after{content:var(--step-alert-success-icon)}brx-step.inverted brx-step-progress-btn[alert=info] button,brx-step.dark-mode brx-step-progress-btn[alert=info] button,brx-step[dark-mode] brx-step-progress-btn[alert=info] button{color:var(--info-alternative)}brx-step.inverted brx-step-progress-btn[alert=info] button .step-info,brx-step.dark-mode brx-step-progress-btn[alert=info] button .step-info,brx-step[dark-mode] brx-step-progress-btn[alert=info] button .step-info{color:var(--info-alternative)}brx-step.inverted brx-step-progress-btn[alert=info] button .step-alert::after,brx-step.dark-mode brx-step-progress-btn[alert=info] button .step-alert::after,brx-step[dark-mode] brx-step-progress-btn[alert=info] button .step-alert::after{content:var(--step-alert-info-icon)}brx-step.inverted brx-step-progress-btn[alert=warning] button .step-alert::after,brx-step.dark-mode brx-step-progress-btn[alert=warning] button .step-alert::after,brx-step[dark-mode] brx-step-progress-btn[alert=warning] button .step-alert::after{content:var(--step-alert-warning-icon)}brx-step.inverted brx-step-progress-btn[alert=danger] button,brx-step.dark-mode brx-step-progress-btn[alert=danger] button,brx-step[dark-mode] brx-step-progress-btn[alert=danger] button{color:var(--danger-alternative)}brx-step.inverted brx-step-progress-btn[alert=danger] button .step-info,brx-step.dark-mode brx-step-progress-btn[alert=danger] button .step-info,brx-step[dark-mode] brx-step-progress-btn[alert=danger] button .step-info{color:var(--danger-alternative)}brx-step.inverted brx-step-progress-btn[alert=danger] button .step-alert::after,brx-step.dark-mode brx-step-progress-btn[alert=danger] button .step-alert::after,brx-step[dark-mode] brx-step-progress-btn[alert=danger] button .step-alert::after{content:var(--step-alert-danger-icon)}brx-step.inverted[type=void] brx-step-progress-btn.active button .step-alert,brx-step.inverted[type=void] brx-step-progress-btn[active] button .step-alert,brx-step.dark-mode[type=void] brx-step-progress-btn.active button .step-alert,brx-step.dark-mode[type=void] brx-step-progress-btn[active] button .step-alert,brx-step[dark-mode][type=void] brx-step-progress-btn.active button .step-alert,brx-step[dark-mode][type=void] brx-step-progress-btn[active] button .step-alert{border-color:var(--color-dark)}brx-step.inverted[type=text] brx-step-progress-btn button::before,brx-step.dark-mode[type=text] brx-step-progress-btn button::before,brx-step[dark-mode][type=text] brx-step-progress-btn button::before{background-color:transparent;color:var(--color)}";

const DOMstrings = {
  step: 'brx-step',
  progress: 'brx-step-progress',
  progressButton: 'brx-step-progress-btn',
  progressButtonTrigger: 'brx-step-progress-btn button',
};
class BrxStep {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxStepChange = createEvent(this, "brxStepChange", 7);
    this.type = undefined;
    this.value = undefined;
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = undefined;
  }
  get progressItems() {
    return findTargets(DOMstrings.progressButton, this.el, ['child']);
  }
  get currentFocusedIndex() {
    return Math.max(this.progressItems.findIndex(i => i.contains(document.activeElement)), 0);
  }
  syncCurrentValueFromProps() {
    const targetValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = targetValue !== null && targetValue !== void 0 ? targetValue : 0;
  }
  setCurrentValue(value) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }
    this.brxStepChange.emit({ value });
    return Promise.resolve();
  }
  openStep(stepIndex) {
    const { progressItems: progressButtons } = this;
    for (const [index, button] of progressButtons.entries()) {
      const active = index === stepIndex;
      button.setActive(active);
    }
  }
  syncSteps() {
    this.openStep(this.currentValue);
  }
  renderStepsContent() {
    const { progressItems: progressButtons } = this;
    for (const [index, element] of progressButtons.entries()) {
      const isTypeText = this.type === 'text';
      const isTypeImg = element.querySelector('.step-icon');
      const stepNum = isTypeText ? `${index + 1}/${progressButtons.length}` : isTypeImg ? '' : `${index + 1}`;
      element.setAttribute('step-num', stepNum);
    }
  }
  get focusedTabItemIndex() {
    return this.progressItems.findIndex(i => i.contains(document.activeElement));
  }
  handleProgressButtonClick(event) {
    const target = event.target;
    const trigger = target.closest(DOMstrings.progressButtonTrigger);
    if (trigger) {
      const button = trigger.closest(DOMstrings.progressButton);
      const disabled = (trigger === null || trigger === void 0 ? void 0 : trigger.disabled) || button.disabled;
      if (!disabled) {
        const targetIndex = this.progressItems.indexOf(button);
        this.setCurrentValue(targetIndex);
        enqueueIdleCallback(() => {
          trigger.focus();
        });
      }
    }
  }
  componentWillLoad() {
    this.syncCurrentValueFromProps();
  }
  connectedCallback() {
    enqueueIdleCallback(() => {
      this.renderStepsContent();
    });
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"],
    "currentValue": ["syncSteps"],
    "type": ["renderStepsContent"]
  }; }
  static get style() { return brxStepCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-step",
    "$members$": {
      "type": [1],
      "value": [2],
      "controlledValue": [2, "controlled-value"],
      "currentValue": [32],
      "setCurrentValue": [64]
    },
    "$listeners$": [[0, "click", "handleProgressButtonClick"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxStepProgressCss = "brx-step-progress{display:block}";

class BrxStepProgress {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxStepProgressCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-step-progress",
    "$members$": undefined,
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxStepProgressBtnCss = "brx-step-progress-btn{display:block}";

class BrxStepProgressBtn {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.alert = undefined;
    this.active = undefined;
    this.disabled = undefined;
    this.stepNum = undefined;
    this.tooltipText = undefined;
  }
  get buttonNative() {
    return this.el.querySelector('button');
  }
  setDisabled(disabled) {
    this.disabled = disabled;
    return Promise.resolve();
  }
  setActive(active) {
    this.active = active;
    if (active) {
      this.setDisabled(false);
    }
    return Promise.resolve();
  }
  render() {
    const { alert, stepNum, disabled, tooltipText } = this;
    return (hAsync(Host, { tabindex: "-1" }, hAsync("brx-tooltip-auto", { place: "top", tooltipText: tooltipText }, hAsync("button", { tabIndex: 0, "step-num": stepNum, disabled: disabled }, hAsync("span", { class: "step-info" }, hAsync("slot", { name: "step-info" })), hAsync("slot", null), alert && (hAsync("span", { class: "step-alert" }, hAsync("slot", { name: "step-alert" })))))));
  }
  get el() { return getElement(this); }
  static get style() { return brxStepProgressBtnCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-step-progress-btn",
    "$members$": {
      "alert": [513],
      "active": [1540],
      "disabled": [1540],
      "stepNum": [1, "step-num"],
      "tooltipText": [1, "tooltip-text"],
      "setDisabled": [64],
      "setActive": [64]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["alert", "alert"], ["active", "active"], ["disabled", "disabled"]]
  }; }
}

const brxTabCss = "brx-tab{display:block}";

class BrxTab {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.counter = undefined;
    this.label = undefined;
    this.value = undefined;
    this.iconName = undefined;
    this.tabTitle = undefined;
    this.tooltipText = undefined;
  }
  setActive(active) {
    if (active) {
      this.el.setAttribute('active', '');
    }
    else {
      this.el.removeAttribute('active');
    }
    return Promise.resolve();
  }
  render() {
    const { tabTitle, iconName, label, tooltipText } = this;
    return (hAsync(Host, { role: "listitem", title: tabTitle }, hAsync("brx-tooltip-auto", { "tooltip-text": tooltipText }, hAsync("button", { type: "button", "aria-label": label !== null && label !== void 0 ? label : tooltipText }, hAsync("span", { class: "name" }, hAsync("span", { class: "d-flex flex-column flex-sm-row" }, hAsync("slot", { name: "icon" }, iconName && (hAsync("span", { class: "icon mb-1 mb-sm-0 mr-sm-1" }, hAsync("brx-icon", { name: iconName })))), tabTitle && hAsync("span", { class: "name" }, tabTitle)))), hAsync("slot", null), hAsync("span", { class: "brx-tab-results" }, hAsync("slot", { name: "results" })))));
  }
  get el() { return getElement(this); }
  static get style() { return brxTabCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-tab",
    "$members$": {
      "counter": [516],
      "label": [1],
      "value": [513],
      "iconName": [1, "icon-name"],
      "tabTitle": [1, "tab-title"],
      "tooltipText": [1, "tooltip-text"],
      "setActive": [64]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["counter", "counter"], ["value", "value"]]
  }; }
}

const brxTabsCss = "brx-tabs{--tab-padding:var(--spacing-scale-3x);--tab-size:var(--tab-medium);--tab-large:var(--spacing-scale-3x);--tab-medium:var(--spacing-scale-2x);--tab-small:var(--spacing-scale-base)}brx-tabs .brx-tabs-nav{overflow-x:auto;width:100%}brx-tabs .brx-tabs-nav::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-tabs .brx-tabs-nav::-webkit-scrollbar-track{background:var(--gray-10)}brx-tabs .brx-tabs-nav::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-tabs .brx-tabs-nav:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}@media (max-width: 991px){brx-tabs .brx-tabs-nav{display:-ms-flexbox;display:flex;overflow-x:auto;width:100%}brx-tabs .brx-tabs-nav::-webkit-scrollbar{height:var(--spacing-scale-base);width:var(--spacing-scale-base)}brx-tabs .brx-tabs-nav::-webkit-scrollbar-track{background:var(--gray-10)}brx-tabs .brx-tabs-nav::-webkit-scrollbar-thumb{background:var(--gray-30)}brx-tabs .brx-tabs-nav:hover::-webkit-scrollbar-thumb{background:var(--gray-40)}}brx-tabs .brx-tabs-nav ul{border-bottom:1px solid var(--border-color);display:-ms-flexbox;display:flex;margin-bottom:0;margin-top:0;padding:0;-ms-flex:1;flex:1}brx-tabs brx-tab .brx-tooltip-auto-container{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;white-space:nowrap;position:relative}brx-tabs brx-tab .brx-tooltip-auto-container:first-child{padding-left:0}brx-tabs brx-tab .brx-tooltip-auto-container:last-child{padding-right:0}brx-tabs brx-tab button,brx-tabs brx-tab a{--focus-offset:calc(var(--spacing-scale-half) * -1);background-color:transparent;border:0;border-bottom:4px solid transparent;color:var(--color);display:inline-block;font-size:var(--font-size-scale-up-02);font-weight:var(--font-weight-medium);line-height:1;padding:var(--tab-size) var(--tab-padding);text-align:center;white-space:nowrap}brx-tabs brx-tab button:focus,brx-tabs brx-tab a:focus{outline:none}brx-tabs brx-tab button.focus-visible,brx-tabs brx-tab button:focus-visible,brx-tabs brx-tab a.focus-visible,brx-tabs brx-tab a:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-tabs brx-tab button:not([data-disable-hover-interaction]):not(:disabled):hover,brx-tabs brx-tab a:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-tabs brx-tab[active] button{border-bottom:4px solid var(--active);color:var(--active)}brx-tabs brx-tab[active] .brx-tab-results{--font-weight:var(--font-weight-semi-bold);color:var(--active)}brx-tabs .brx-tab-results{display:-ms-flexbox;display:flex;font-weight:var(--font-weight);-ms-flex-pack:center;justify-content:center;margin-top:var(--spacing-scale-2x);position:absolute;top:100%}brx-tabs:not([counter]) .brx-tab-results{display:none}brx-tabs[counter] .brx-tabs-nav ul{margin-bottom:calc(var(--spacing-scale-2x) + var(--font-size-scale-up-02) + var(--spacing-scale-base))}brx-tabs[size=small]{--tab-size:var(--tab-small)}brx-tabs[size=medium]{--tab-size:var(--tab-medium)}brx-tabs[size=large]{--tab-size:var(--tab-large)}brx-tabs[dark-mode]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}brx-tabs[dark-mode] brx-tab[active] button{border-bottom-color:var(--background-light);color:var(--color)}";

class BrxTabs {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxTabClick = createEvent(this, "brxTabClick", 7);
    this.brxTabChange = createEvent(this, "brxTabChange", 7);
    this.name = undefined;
    this.counter = false;
    this.size = 'medium';
    this.darkMode = false;
    this.value = undefined;
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = undefined;
  }
  get navEl() {
    return findTarget('.brx-tabs-nav', this.el);
  }
  get tabItems() {
    return findTargets('brx-tab', this.el);
  }
  syncCurrentValueFromProps() {
    var _a;
    const incomingValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = incomingValue !== null && incomingValue !== void 0 ? incomingValue : (_a = this.activeTabItem) === null || _a === void 0 ? void 0 : _a.value;
  }
  setCurrentValue(value) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }
    this.brxTabChange.emit({ value: this.currentValue });
  }
  async getCurrentValue() {
    return this.currentValue;
  }
  get height() {
    return this.navEl.clientHeight;
  }
  get scrollsizes() {
    return this.navEl.scrollHeight - this.navEl.clientHeight;
  }
  get activeTabItemIndex() {
    return this.tabItems.findIndex(tab => tab.hasAttribute('active'));
  }
  get activeTabItem() {
    var _a;
    const { activeTabItemIndex } = this;
    return (_a = this.tabItems[activeTabItemIndex]) !== null && _a !== void 0 ? _a : null;
  }
  get focusedTabItemIndex() {
    return Math.max(this.tabItems.findIndex(i => i.querySelector('.focus-visible') !== null), 0);
  }
  get scrollHeight() {
    const doc = getWindow$1().document;
    return Math.max(this.el.scrollWidth, doc.documentElement.scrollWidth, this.el.offsetWidth, doc.documentElement.offsetWidth, this.el.clientWidth, doc.documentElement.clientWidth);
  }
  get leftPosition() {
    return this.el.offsetWidth - 1;
  }
  setBehavior() {
    const anchor = this.navEl;
    anchor.style.setProperty('--height-nav', `${this.height}px`);
    anchor.style.setProperty('--right-gradient-nav', `${this.leftPosition}px`);
    this.positionScroll(anchor);
    this.navigationRight += 4;
    if (this.navigationRight <= this.lastItemPosition - 5) {
      anchor.classList.add('brx-tabs-nav-right');
    }
    anchor.addEventListener('scroll', () => {
      this.positionScroll(anchor);
      if (this.navigationLeft <= 0) {
        anchor.classList.add('brx-tabs-nav-left');
      }
      else {
        anchor.classList.remove('brx-tabs-nav-left');
      }
      if (this.navigationRight <= this.lastItemPosition - 5) {
        anchor.classList.add('brx-tabs-nav-right');
      }
      else {
        anchor.classList.remove('brx-tabs-nav-right');
      }
    });
  }
  positionScroll(anchor) {
    const tabItems = this.tabItems;
    this.lastItemPosition = Math.ceil(tabItems[tabItems.length - 1].getBoundingClientRect().right);
    this.navigationLeft = Math.floor(tabItems[0].getBoundingClientRect().left);
    this.navigationRight = Math.floor(anchor.getBoundingClientRect().right);
  }
  openTab(value) {
    const tabs = this.tabItems;
    for (const tab of tabs) {
      tab.setActive(tab.value === value);
    }
  }
  syncTabs() {
    this.openTab(this.currentValue);
  }
  handleCurrentValueChange() {
    this.syncTabs();
  }
  clean() {
    for (const tab of this.tabItems) {
      const button = tab.querySelector('button');
      button.classList.remove('focus-visible');
      tab.setActive(false);
    }
  }
  hiddenTooltips() {
    const tooltips = findTargets('brx-tooltip', this.el);
    for (const tooltip of tooltips) {
      tooltip.hide();
    }
  }
  handleKeyupEvent(event) {
    const jumpToIndex = (targetIndex) => {
      event.preventDefault();
      const tab = this.tabItems[targetIndex];
      if (tab) {
        this.openTab(tab.value);
        const button = tab.querySelector('button');
        button.focus();
      }
      event.stopPropagation();
    };
    const rotateFocus = (direction) => {
      event.preventDefault();
      const { focusedTabItemIndex } = this;
      const targetIndex = focusedTabItemIndex + direction;
      const tab = this.tabItems[targetIndex];
      if (tab) {
        const button = tab.querySelector('button');
        button.focus();
      }
      event.stopPropagation();
    };
    switch (event.key) {
      case 'End': {
        jumpToIndex(this.tabItems.length - 1);
        break;
      }
      case 'Home': {
        jumpToIndex(0);
        break;
      }
      case 'ArrowLeft': {
        rotateFocus(-1);
        break;
      }
      case 'ArrowRight': {
        rotateFocus(1);
        break;
      }
      case 'Tab': {
        rotateFocus(0);
        break;
      }
      case ' ': {
        event.preventDefault();
        this.hiddenTooltips();
        const target = event.target;
        target.click();
        event.stopPropagation();
        break;
      }
    }
  }
  handleTabClick(event) {
    const target = event.target;
    const tabTrigger = target.closest('brx-tab button');
    if (tabTrigger) {
      const tab = tabTrigger.closest('brx-tab');
      const { value } = tab;
      this.setCurrentValue(value);
      this.brxTabClick.emit({ value });
    }
  }
  handleFocusOut() {
    this.hiddenTooltips();
  }
  handleKeyUp(event) {
    this.handleKeyupEvent(event);
  }
  componentWillLoad() {
    this.syncCurrentValueFromProps();
  }
  componentShouldUpdate(_, __, propName) {
    switch (propName) {
      case 'currentValue': {
        return false;
      }
      default: {
        return true;
      }
    }
  }
  render() {
    return (hAsync(Host, null, hAsync("nav", { class: "brx-tabs-nav" }, hAsync("ul", null, hAsync("slot", null)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"],
    "currentValue": ["handleCurrentValueChange"]
  }; }
  static get style() { return brxTabsCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-tabs",
    "$members$": {
      "name": [513],
      "counter": [516],
      "size": [513],
      "darkMode": [516, "dark-mode"],
      "value": [1],
      "controlledValue": [1, "controlled-value"],
      "currentValue": [32],
      "getCurrentValue": [64]
    },
    "$listeners$": [[0, "click", "handleTabClick"], [0, "focusout", "handleFocusOut"], [0, "keyup", "handleKeyUp"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["name", "name"], ["counter", "counter"], ["size", "size"], ["darkMode", "dark-mode"]]
  }; }
}

const brxTabsPanelCss = "";

class BrxTabsPanel {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.active = false;
    this.value = undefined;
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  static get style() { return brxTabsPanelCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-tabs-panel",
    "$members$": {
      "active": [516],
      "value": [513]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["active", "active"], ["value", "value"]]
  }; }
}

const brxTabsPanelsCss = "brx-tabs-panels{display:block}brx-tabs-panels brx-tabs-panel{color:var(--text-color);display:none}brx-tabs-panels brx-tabs-panel[active]{display:block}brx-tabs-panels[dark-mode]{--color:var(--color-dark);--color-rgb:var(--color-dark-rgb);--text-color:var(--color);--interactive:var(--interactive-dark);--interactive-rgb:var(--interactive-dark-rgb);--visited:var(--visited-dark);--hover:var(--hover-dark);--pressed:var(--pressed-dark);--focus-color:var(--focus-color-dark);--focus:var(--focus-color)}";

class BrxTabsPanels {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = undefined;
    this.darkMode = false;
    this.currentValue = undefined;
  }
  getPanels() {
    return Array.from(this.el.querySelectorAll('brx-tabs-panel'));
  }
  getTabsManagers() {
    return findTargets(`brx-tabs[name="${this.name}"]`);
  }
  getInitialValue() {
    const mainTabsManager = this.getTabsManagers()[0];
    return mainTabsManager === null || mainTabsManager === void 0 ? void 0 : mainTabsManager.getCurrentValue();
  }
  openPanel(value) {
    const panels = this.getPanels();
    for (const panel of panels) {
      panel.active = panel.value === value;
    }
  }
  syncPanels() {
    this.openPanel(this.currentValue);
  }
  handleCurrentValueChange() {
    this.syncPanels();
  }
  handleGlobalTabChange(event) {
    const target = event.target;
    const tabs = target.closest('brx-tabs');
    if (tabs && tabs.name === this.name) {
      const { value } = event.detail;
      this.currentValue = value;
    }
  }
  async componentWillLoad() {
    this.currentValue = await this.getInitialValue();
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "currentValue": ["handleCurrentValueChange"]
  }; }
  static get style() { return brxTabsPanelsCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-tabs-panels",
    "$members$": {
      "name": [513],
      "darkMode": [516, "dark-mode"],
      "currentValue": [32]
    },
    "$listeners$": [[9, "brxTabChange", "handleGlobalTabChange"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["name", "name"], ["darkMode", "dark-mode"]]
  }; }
}

const brxTagCss = "brx-tag{--tag-size:var(--tag-medium);--tag-small:var(--spacing-scale-2xh);--tag-medium:var(--spacing-scale-3xh);--tag-large:var(--spacing-scale-4xh);-ms-flex-align:center;align-items:center;background:var(--background-dark);border-radius:var(--surface-rounder-sm);color:var(--color-dark);display:-ms-inline-flexbox;display:inline-flex;font-size:var(--font-size-scale-base);font-weight:var(--font-weight-medium);-ms-flex-pack:center;justify-content:center;margin:0;min-height:var(--tag-size);padding:0 var(--spacing-scale-baseh);align-items:center;background:var(--background-dark);border-radius:var(--surface-rounder-sm);color:var(--color-dark);display:inline-flex;font-size:var(--font-size-scale-base);font-weight:var(--font-weight-medium);justify-content:center;margin:0;min-height:var(--tag-size);padding:0 var(--spacing-scale-baseh)}brx-tag+brx-tag{margin-left:var(--spacing-scale-half)}brx-tag>brx-icon{display:inline-block}brx-tag>brx-icon:first-child{margin-right:var(--spacing-scale-baseh)}brx-tag[interaction],brx-tag[interactor-select]{--tag-small:var(--spacing-scale-4x);--tag-medium:var(--spacing-scale-5x);--tag-large:var(--spacing-scale-5xh);cursor:pointer;font-size:var(--font-size-scale-up-01)}brx-tag[interaction]{background:var(--interactive)}brx-tag[interaction] brx-button{--button-size:var(--spacing-scale-3xh);--focus:var(--focus-color-dark);--hover:var(--hover-dark);--interactive-rgb:var(--color-dark-rgb)}brx-tag[interaction] brx-button .brx-button-native{background-color:var(--interactive-light);border-radius:50%;color:var(--color-dark);margin-left:var(--spacing-scale-baseh);padding:0;width:var(--button-size)}brx-tag[interaction]:hover brx-button .btx-button-native{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-tag[interaction]:active brx-button .btx-button-native{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--pressed))), to(rgba(var(--interactive-rgb), var(--pressed))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--pressed)), rgba(var(--interactive-rgb), var(--pressed)))}brx-tag[interaction-select]{background:transparent;padding:0}brx-tag[interaction-select] label{--interactive-rgb:var(--color-dark-rgb);--hover:var(--hover-dark);-ms-flex-align:center;align-items:center;background:var(--background-dark);border-radius:var(--surface-rounder-sm);color:var(--color-dark);display:-ms-inline-flexbox;display:inline-flex;font-size:var(--font-size-scale-base);font-weight:var(--font-weight-medium);-ms-flex-pack:center;justify-content:center;margin:0;min-height:var(--tag-size);padding:0 var(--spacing-scale-baseh);background:var(--interactive);cursor:pointer;font-size:var(--font-size-scale-up-01);margin:0;-webkit-transition:padding 150ms ease;transition:padding 150ms ease}brx-tag[interaction-select] label+brx-tag[interaction-select] label{margin-left:var(--spacing-scale-half)}brx-tag[interaction-select] label>brx-icon{display:inline-block}brx-tag[interaction-select] label>brx-icon:first-child{margin-right:var(--spacing-scale-baseh)}brx-tag[interaction-select] input{opacity:0;position:relative;width:0}brx-tag[interaction-select] input:checked+label::after{border:solid var(--color-dark);border-width:0 3px 3px 0;content:\"\";height:var(--icon-size-sm);-webkit-transform:rotate(45deg) translate(12px, -14px);transform:rotate(45deg) translate(12px, -14px);width:8px}brx-tag[interaction-select] input:focus+label{outline-color:var(--focus-color);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-tag[interaction-select] input:hover+label{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-tag[interaction-select][selected] label{padding-right:var(--spacing-scale-4xh)}brx-tag[status]{--tag-small:var(--spacing-scale-baseh);--tag-medium:var(--spacing-scale-2x);--tag-large:var(--spacing-scale-3x);border:1px solid var(--background-light);border-radius:50%;min-width:var(--tag-size);padding:0}brx-tag[count]{--tag-small:var(--spacing-scale-2xh);--tag-medium:var(--spacing-scale-3x);--tag-large:var(--spacing-scale-3xh);border:1px solid var(--background-light);border-radius:100em;min-width:var(--tag-size);padding-left:var(--spacing-scale-base);padding-right:var(--spacing-scale-base)}brx-tag[icon]{--tag-small:var(--spacing-scale-3xh);--tag-medium:var(--spacing-scale-4x);--tag-large:var(--spacing-scale-5xh);border-radius:50%;min-width:var(--tag-size);padding:0}brx-tag[icon] brx-icon{font-size:var(--icon-size-base);margin:0 !important}brx-tag[size=small]{--tag-size:var(--tag-small)}brx-tag[size=medium]{--tag-size:var(--tag-medium)}brx-tag[size=large]{--tag-size:var(--tag-large)}brx-tag[interaction],brx-tag[interactor-select]{--tag-small:var(--spacing-scale-4x);--tag-medium:var(--spacing-scale-5x);--tag-large:var(--spacing-scale-5xh);cursor:pointer;font-size:var(--font-size-scale-up-01)}brx-tag[interaction]{background:var(--interactive)}brx-tag[interaction] brx-button{--button-size:var(--spacing-scale-3xh);--focus:var(--focus-color-dark);--hover:var(--hover-dark);--interactive-rgb:var(--color-dark-rgb)}brx-tag[interaction] brx-button .brx-button-native{background-color:var(--interactive-light);border-radius:50%;color:var(--color-dark);margin-left:var(--spacing-scale-baseh);padding:0;width:var(--button-size)}brx-tag[interaction]:hover brx-button .btx-button-native{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-tag[interaction]:active brx-button .btx-button-native{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--pressed))), to(rgba(var(--interactive-rgb), var(--pressed))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--pressed)), rgba(var(--interactive-rgb), var(--pressed)))}brx-tag[interaction-select]{background:transparent;padding:0}brx-tag[interaction-select] label{--interactive-rgb:var(--color-dark-rgb);--hover:var(--hover-dark);-ms-flex-align:center;align-items:center;background:var(--background-dark);border-radius:var(--surface-rounder-sm);color:var(--color-dark);display:-ms-inline-flexbox;display:inline-flex;font-size:var(--font-size-scale-base);font-weight:var(--font-weight-medium);-ms-flex-pack:center;justify-content:center;margin:0;min-height:var(--tag-size);padding:0 var(--spacing-scale-baseh);background:var(--interactive);cursor:pointer;font-size:var(--font-size-scale-up-01);margin:0;-webkit-transition:padding 150ms ease;transition:padding 150ms ease}brx-tag[interaction-select] label+brx-tag[interaction-select] label{margin-left:var(--spacing-scale-half)}brx-tag[interaction-select] label>brx-icon{display:inline-block}brx-tag[interaction-select] label>brx-icon:first-child{margin-right:var(--spacing-scale-baseh)}brx-tag[interaction-select] input{opacity:0;position:relative;width:0}brx-tag[interaction-select] input:checked+label::after{border:solid var(--color-dark);border-width:0 3px 3px 0;content:\"\";height:var(--icon-size-sm);-webkit-transform:rotate(45deg) translate(12px, -14px);transform:rotate(45deg) translate(12px, -14px);width:8px}brx-tag[interaction-select] input:focus+label{outline-color:var(--focus-color);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-tag[interaction-select] input:hover+label{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-tag[interaction-select][selected] label{padding-right:var(--spacing-scale-4xh)}brx-tag[interaction],brx-tag[interactor-select]{--tag-small:var(--spacing-scale-4x);--tag-medium:var(--spacing-scale-5x);--tag-large:var(--spacing-scale-5xh);cursor:pointer;font-size:var(--font-size-scale-up-01)}brx-tag[interaction]{background:var(--interactive)}brx-tag[interaction] brx-button{--button-size:var(--spacing-scale-3xh);--focus:var(--focus-color-dark);--hover:var(--hover-dark);--interactive-rgb:var(--color-dark-rgb)}brx-tag[interaction] brx-button .brx-button-native{background-color:var(--interactive-light);border-radius:50%;color:var(--color-dark);margin-left:var(--spacing-scale-baseh);padding:0;width:var(--button-size)}brx-tag[interaction]:hover brx-button .btx-button-native{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-tag[interaction]:active brx-button .btx-button-native{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--pressed))), to(rgba(var(--interactive-rgb), var(--pressed))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--pressed)), rgba(var(--interactive-rgb), var(--pressed)))}brx-tag[interaction-select]{background:transparent;padding:0}brx-tag[interaction-select] label{--interactive-rgb:var(--color-dark-rgb);--hover:var(--hover-dark);-ms-flex-align:center;align-items:center;background:var(--background-dark);border-radius:var(--surface-rounder-sm);color:var(--color-dark);display:-ms-inline-flexbox;display:inline-flex;font-size:var(--font-size-scale-base);font-weight:var(--font-weight-medium);-ms-flex-pack:center;justify-content:center;margin:0;min-height:var(--tag-size);padding:0 var(--spacing-scale-baseh);background:var(--interactive);cursor:pointer;font-size:var(--font-size-scale-up-01);margin:0;-webkit-transition:padding 150ms ease;transition:padding 150ms ease}brx-tag[interaction-select] label+brx-tag[interaction-select] label{margin-left:var(--spacing-scale-half)}brx-tag[interaction-select] label>brx-icon{display:inline-block}brx-tag[interaction-select] label>brx-icon:first-child{margin-right:var(--spacing-scale-baseh)}brx-tag[interaction-select] input{opacity:0;position:relative;width:0}brx-tag[interaction-select] input:checked+label::after{border:solid var(--color-dark);border-width:0 3px 3px 0;content:\"\";height:var(--icon-size-sm);-webkit-transform:rotate(45deg) translate(12px, -14px);transform:rotate(45deg) translate(12px, -14px);width:8px}brx-tag[interaction-select] input:focus+label{outline-color:var(--focus-color);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-tag[interaction-select] input:hover+label{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-tag[interaction-select][selected] label{padding-right:var(--spacing-scale-4xh)}brx-tag+brx-tag{margin-left:var(--spacing-scale-half)}brx-tag>brx-icon{display:inline-block}brx-tag>brx-icon:first-child{margin-right:var(--spacing-scale-baseh)}brx-tag[size=small]{--tag-size:var(--tag-small)}brx-tag[size=medium]{--tag-size:var(--tag-medium)}brx-tag[size=large]{--tag-size:var(--tag-large)}brx-tag.support-01{--tag-background:var(--color-support-01)}brx-tag.support-02{--tag-background:var(--color-support-02)}brx-tag.support-03{--tag-background:var(--color-support-03)}brx-tag.support-04{--tag-background:var(--color-support-04)}brx-tag.support-05{--tag-background:var(--color-support-05)}brx-tag.support-06{--tag-background:var(--color-support-06)}brx-tag.support-07{--tag-background:var(--color-support-07)}brx-tag.support-08{--tag-background:var(--color-support-08)}brx-tag.support-09{--tag-background:var(--color-support-09)}brx-tag.support-10{--tag-background:var(--color-support-10)}brx-tag.support-11{--tag-background:var(--color-support-11)}brx-tag.is-primary-pastel-01,brx-tag.primary-pastel-01,brx-tag[primary-pastel-01]{background-color:#c5d4eb}brx-tag.is-primary-pastel-02,brx-tag.primary-pastel-02,brx-tag[primary-pastel-02]{background-color:#dbe8fb}brx-tag.is-primary-lighten-01,brx-tag.primary-lighten-01,brx-tag[primary-lighten-01]{background-color:#2670e8}brx-tag.is-primary-lighten-02,brx-tag.primary-lighten-02,brx-tag[primary-lighten-02]{background-color:#5992ed}brx-tag.is-primary-default,brx-tag.primary-default,brx-tag[primary-default]{background-color:#1351b4}brx-tag.is-primary-darken-01,brx-tag.primary-darken-01,brx-tag[primary-darken-01]{background-color:#0c326f}brx-tag.is-primary-darken-02,brx-tag.primary-darken-02,brx-tag[primary-darken-02]{background-color:#071d41}brx-tag.is-secondary-01,brx-tag.secondary-01,brx-tag[secondary-01]{background-color:#fff}brx-tag.is-secondary-02,brx-tag.secondary-02,brx-tag[secondary-02]{background-color:#f8f8f8}brx-tag.is-secondary-03,brx-tag.secondary-03,brx-tag[secondary-03]{background-color:#ededed}brx-tag.is-secondary-04,brx-tag.secondary-04,brx-tag[secondary-04]{background-color:#ccc}brx-tag.is-secondary-05,brx-tag.secondary-05,brx-tag[secondary-05]{background-color:#9e9d9d}brx-tag.is-secondary-06,brx-tag.secondary-06,brx-tag[secondary-06]{background-color:#888}brx-tag.is-secondary-07,brx-tag.secondary-07,brx-tag[secondary-07]{background-color:#555}brx-tag.is-secondary-08,brx-tag.secondary-08,brx-tag[secondary-08]{background-color:#333}brx-tag.is-secondary-09,brx-tag.secondary-09,brx-tag[secondary-09]{background-color:#000}brx-tag.is-highlight,brx-tag.highlight,brx-tag[highlight]{background-color:#268744}brx-tag.is-support-01,brx-tag.support-01,brx-tag[support-01]{background-color:#36a191}brx-tag.is-support-02,brx-tag.support-02,brx-tag[support-02]{background-color:#f2e317}brx-tag.is-support-03,brx-tag.support-03,brx-tag[support-03]{background-color:#db4800}brx-tag.is-support-04,brx-tag.support-04,brx-tag[support-04]{background-color:#a26739}brx-tag.is-support-05,brx-tag.support-05,brx-tag[support-05]{background-color:#40e0d0}brx-tag.is-support-06,brx-tag.support-06,brx-tag[support-06]{background-color:#48cbeb}brx-tag.is-support-07,brx-tag.support-07,brx-tag[support-07]{background-color:#c72487}brx-tag.is-support-08,brx-tag.support-08,brx-tag[support-08]{background-color:#63007f}brx-tag.is-support-09,brx-tag.support-09,brx-tag[support-09]{background-color:#f08080}brx-tag.is-support-10,brx-tag.support-10,brx-tag[support-10]{background-color:#ff8c00}brx-tag.is-support-11,brx-tag.support-11,brx-tag[support-11]{background-color:#fdf5e6}brx-tag[color=success]{background-color:var(--success)}brx-tag[color=danger]{background-color:var(--danger)}brx-tag[color=warning]{background-color:var(--warning)}brx-tag[color=info]{background-color:var(--info)}";

class BrxTag {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.selected = undefined;
    this.interaction = undefined;
    this.interactionSelect = undefined;
  }
  get inputElement() {
    return this.el.querySelector('input');
  }
  get inputCheckedState() {
    var _a;
    return (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.checked;
  }
  handleInnerClick(event) {
    const target = event.target;
    const dismissEl = target.closest('[data-dismiss]');
    if (dismissEl) {
      const dismiss = dismissEl.dataset.dismiss;
      const target = dismiss.length > 0 ? findTarget(dismiss) : this.el;
      if (target) {
        target.remove();
      }
    }
  }
  handleChange() {
    enqueueIdleCallback(() => {
      this.syncSelected();
    });
  }
  syncSelected() {
    if (this.interactionSelect) {
      this.selected = this.inputCheckedState;
    }
  }
  componentWillLoad() {
    this.syncSelected();
  }
  render() {
    return (hAsync(Host, null, hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get style() { return brxTagCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-tag",
    "$members$": {
      "selected": [1540],
      "interaction": [516],
      "interactionSelect": [516, "interaction-select"]
    },
    "$listeners$": [[1, "click", "handleInnerClick"], [5, "change", "handleChange"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["selected", "selected"], ["interaction", "interaction"], ["interactionSelect", "interaction-select"]]
  }; }
}

const brxTextareaCss = "brx-textarea{--textarea-padding:var(--textarea-medium);--textarea-small:var(--spacing-scale-base);--textarea-medium:var(--spacing-scale-baseh);--textarea-large:var(--spacing-scale-2x);color:var(--color)}brx-textarea label{display:inline-block;margin-bottom:var(--spacing-scale-half)}brx-textarea textarea{background:var(--background-light);border:1px solid var(--border-color);border-radius:6px;color:var(--color);display:block;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-medium);padding:var(--textarea-padding);width:100%}brx-textarea[disabled]{opacity:unset}brx-textarea[inline] .brx-textarea-wrapper{display:-ms-flexbox;display:flex}brx-textarea[size=small] textarea{--textarea-padding:var(--textarea-small)}brx-textarea[size=medium] textarea{--textarea-padding:var(--textarea-medium)}brx-textarea[size=large] textarea{--textarea-padding:var(--textarea-large)}brx-textarea[color=success] textarea{border-color:var(--success);border-width:2px}brx-textarea[color=danger] textarea{border-color:var(--danger);border-width:2px}brx-textarea[color=warning] textarea{border-color:var(--warning);border-width:2px}brx-textarea[color=info] textarea{border-color:var(--info);border-width:2px}brx-textarea textarea:focus,brx-textarea textarea:focus-visible,brx-textarea textarea.focus-visible{border-color:var(--focus) !important;-webkit-box-shadow:0 0 0 var(--surface-width-md) var(--focus);box-shadow:0 0 0 var(--surface-width-md) var(--focus);outline:none}brx-textarea textarea:hover:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--color-rgb), var(--hover))), to(rgba(var(--color-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}brx-textarea[dark-mode],brx-textarea[dark-mode] label{--color:var(--color-dark);--focus-color:var(--focus-color-dark)}";

class BrxTextarea {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.brxInput = createEvent(this, "brxInput", 7);
    this.brxBlur = createEvent(this, "brxBlur", 7);
    this.brxFocus = createEvent(this, "brxFocus", 7);
    this.didBlurAfterEdit = false;
    this.nativeInput = null;
    this.onInput = (event) => {
      const oldValue = this.getValue();
      const newValue = this.nativeInput.value;
      this.nativeInput.value = oldValue;
      this.setValue(newValue);
      this.brxInput.emit(event);
    };
    this.onFocus = (event) => {
      this.hasFocus = true;
      this.focusChange();
      if (this.fireFocusEvents) {
        this.brxFocus.emit(event);
      }
    };
    this.onBlur = (ev) => {
      this.hasFocus = false;
      this.focusChange();
      if (this.fireFocusEvents) {
        this.brxBlur.emit(ev);
      }
    };
    this.onKeyDown = () => {
      this.checkClearOnEdit();
    };
    this.inputId = undefined;
    this.value = undefined;
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = '';
    this.darkMode = undefined;
    this.label = undefined;
    this.inline = undefined;
    this.counter = undefined;
    this.color = undefined;
    this.fireFocusEvents = true;
    this.autocapitalize = 'none';
    this.autofocus = false;
    this.clearOnEdit = false;
    this.disabled = false;
    this.inputmode = undefined;
    this.enterkeyhint = undefined;
    this.maxlength = undefined;
    this.minlength = undefined;
    this.name = undefined;
    this.placeholder = undefined;
    this.readonly = false;
    this.required = false;
    this.spellcheck = false;
    this.cols = undefined;
    this.rows = undefined;
    this.wrap = undefined;
    this.hasFocus = false;
  }
  hasValue() {
    return this.getValue() !== '';
  }
  getValue() {
    var _a;
    return String((_a = this.currentValue) !== null && _a !== void 0 ? _a : '');
  }
  syncCurrentValueFromProps() {
    const targetValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
    this.currentValue = String(targetValue !== null && targetValue !== void 0 ? targetValue : '');
  }
  setValue(value) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = value;
    }
    this.brxChange.emit({ value: value });
  }
  /**
   * Sets focus on the native `textarea` in `brx-textarea`. Use this method instead of the global
   * `textarea.focus()`.
   */
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }
  /**
   * Sets blur on the native `textarea` in `brx-textarea`. Use this method instead of the global
   * `textarea.blur()`.
   * @internal
   */
  async setBlur() {
    if (this.nativeInput) {
      this.nativeInput.blur();
    }
  }
  /**
   * Returns the native `<textarea>` element used under the hood.
   */
  getInputElement() {
    return Promise.resolve(this.nativeInput);
  }
  /**
   * Check if we need to clear the text input if clearOnEdit is enabled
   */
  checkClearOnEdit() {
    if (!this.clearOnEdit) {
      return;
    }
    // Did the input value change after it was blurred and edited?
    if (this.didBlurAfterEdit && this.hasValue()) {
      // Clear the input
      this.currentValue = '';
    }
    // Reset the flag
    this.didBlurAfterEdit = false;
  }
  focusChange() {
    // If clearOnEdit is enabled and the input blurred but has a value, set a flag
    if (this.clearOnEdit && !this.hasFocus && this.hasValue()) {
      this.didBlurAfterEdit = true;
    }
  }
  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
    this.syncCurrentValueFromProps();
  }
  get inheritedAttributes() {
    return Object.assign(Object.assign({}, inheritAriaAttributes(this.el)), inheritAttributes(this.el, ['data-form-type', 'title']));
  }
  render() {
    const value = this.getValue();
    const labelId = this.inputId + '-lbl';
    return (hAsync(Host, { "aria-disabled": this.disabled ? 'true' : null }, hAsync("div", { class: this.inline ? 'row' : '' }, hAsync("div", { class: "col-auto pt-half" }, hAsync("label", { htmlFor: this.inputId }, this.label)), hAsync("div", { class: "col" }, hAsync("textarea", Object.assign({ value: value, cols: this.cols, rows: this.rows, wrap: this.wrap, name: this.name, id: this.inputId, required: this.required, readOnly: this.readonly, disabled: this.disabled, minLength: this.minlength, maxLength: this.maxlength, autoFocus: this.autofocus, inputMode: this.inputmode, spellcheck: this.spellcheck, enterKeyHint: this.enterkeyhint, "aria-labelledby": labelId !== null && labelId !== void 0 ? labelId : null, autoCapitalize: this.autocapitalize, ref: el => (this.nativeInput = el), placeholder: this.placeholder || '', onInput: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeyDown }, this.inheritedAttributes), value), this.counter === 'limit' && typeof this.maxlength === 'number' && (hAsync("div", { class: "text-base mt-1" }, value.length === 0 && (hAsync("span", { class: "limit" }, "Limite m\u00E1ximo de ", hAsync("strong", null, this.maxlength), " caracteres.")), value.length > 0 && hAsync("span", { class: "current" }, "Restam ", Math.max(this.maxlength - value.length, 0), " caracteres."))), this.counter === 'total' && (hAsync("div", { class: "text-base mt-1" }, hAsync("span", { class: "characters" }, hAsync("strong", null, value.length), " caracteres digitados."))), hAsync("slot", null)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"]
  }; }
  static get style() { return brxTextareaCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-textarea",
    "$members$": {
      "inputId": [1025, "input-id"],
      "value": [1],
      "controlledValue": [1, "controlled-value"],
      "darkMode": [4, "dark-mode"],
      "label": [1],
      "inline": [4],
      "counter": [1],
      "color": [1],
      "fireFocusEvents": [4, "fire-focus-events"],
      "autocapitalize": [1],
      "autofocus": [4],
      "clearOnEdit": [1028, "clear-on-edit"],
      "disabled": [4],
      "inputmode": [1],
      "enterkeyhint": [1],
      "maxlength": [2],
      "minlength": [2],
      "name": [1],
      "placeholder": [1],
      "readonly": [4],
      "required": [4],
      "spellcheck": [4],
      "cols": [2],
      "rows": [2],
      "wrap": [1],
      "currentValue": [32],
      "hasFocus": [32],
      "setFocus": [64],
      "setBlur": [64],
      "getInputElement": [64]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

var __classPrivateFieldGet$2 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CleanupManager_callbacks;
class CleanupManager {
  constructor() {
    _CleanupManager_callbacks.set(this, new Set());
  }
  add(callback) {
    __classPrivateFieldGet$2(this, _CleanupManager_callbacks, "f").add(callback);
  }
  run() {
    for (const callback of __classPrivateFieldGet$2(this, _CleanupManager_callbacks, "f")) {
      callback();
      __classPrivateFieldGet$2(this, _CleanupManager_callbacks, "f").delete(callback);
    }
    return Promise.resolve();
  }
}
_CleanupManager_callbacks = new WeakMap();

const brxTooltipCss = "brx-tooltip{display:inline-block}";

var __classPrivateFieldGet$1 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrxTooltip_eventListenersCleanup;
const POSITIONS = ['top', 'right', 'bottom', 'left'];
const HIDE_EVENTS = ['mouseleave' /* , 'blur' */, 'focusout'];
const SHOW_EVENTS = ['mouseenter', 'click' /* , 'focus', */, 'focusin'];
class BrxTooltip {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    _BrxTooltip_eventListenersCleanup.set(this, new CleanupManager());
    this.type = 'info';
    this.text = undefined;
    this.timer = undefined;
    this.color = 'info';
    this.place = 'top';
    this.target = undefined;
    this.active = false;
    this.popover = false;
    this.activator = null;
    this.component = null;
    this.placement = undefined;
    this.closeTimer = null;
    this.notification = false;
    this.popperInstance = null;
  }
  setupComponent() {
    const { target } = this;
    if (target) {
      this.component = findTarget(target);
    }
    const { component, color, place } = this;
    if (component) {
      component.setAttribute('color', color);
      component.setAttribute('place', place);
    }
  }
  setupNotification() {
    var _a;
    this.notification = ((_a = this.component) === null || _a === void 0 ? void 0 : _a.querySelector('brx-notification')) !== null;
  }
  setupPlacement() {
    this.placement = POSITIONS.includes(this.place) ? this.place : this.notification ? 'bottom' : 'top';
  }
  async setupPopperInstance(force = false) {
    const { activator, component } = this;
    if ((activator && component && !this.popperInstance) || force) {
      const { createPopper } = await Promise.resolve().then(function () { return index; });
      this.popperInstance = createPopper(activator, component, {});
    }
  }
  async setupPopper() {
    const { activator, component, notification } = this;
    let placement = this.placement;
    if ([activator, component, notification, placement].some(i => i === undefined || i === null)) {
      return;
    }
    component.removeAttribute('notification');
    await this.setupPopperInstance();
    if (notification) {
      component.setAttribute('notification', '');
      this.popperInstance.setOptions({
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: false,
              mainAxis: true, // true by default
            },
          },
        ],
        // placement: this.placement,
        placement: 'bottom',
        strategy: 'fixed',
      });
    }
    else {
      const ac = activator.getBoundingClientRect();
      const tt = component.getBoundingClientRect();
      const bw = document.body.clientWidth;
      if (placement === 'right') {
        placement = ac.x + ac.width + tt.width > bw ? 'top' : placement;
      }
      if (placement === 'left') {
        placement = ac.x - tt.width > 0 ? placement : 'top';
      }
      this.popperInstance.setOptions({
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true,
              // boundary: 'body',
              mainAxis: true,
              // rootBoundary: 'document',
              tether: false, // true by default
            },
          },
        ],
        placement: placement,
      });
    }
  }
  async show(event) {
    await this.setupPopper();
    const { place, component } = this;
    if (place && component) {
      place && component.setAttribute('place', place);
      component.style.display = 'unset';
      component.setAttribute('data-show', '');
      component.style.zIndex = '9999';
      this._fixPosition();
      // Importante pois "display: none" conflitua com a instancia do componente e precisa ser setado aqui já que pelo css ativa o efeito fade no primeiro carregamento
      component.style.visibility = 'visible';
      const { timer, hide, closeTimer } = this;
      if (timer) {
        clearTimeout(closeTimer);
        this.closeTimer = setTimeout(hide, timer, event, component);
      }
    }
  }
  hide() {
    const { component } = this;
    if (component) {
      component.removeAttribute('data-show');
      component.style.zIndex = '-1';
      component.style.visibility = 'hidden';
    }
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      // this.closeTimer = null;
    }
    return Promise.resolve();
  }
  _toggleActivatorIcon() {
    // XXX: ???
    const icon = this.activator.querySelector('button svg');
    if (icon) {
      icon.classList.toggle('fa-angle-down');
      icon.classList.toggle('fa-angle-up');
    }
    this.activator.toggleAttribute('active');
  }
  _fixPosition() {
    const { notification, activator, component } = this;
    if (notification && activator && component) {
      setTimeout(() => {
        const ac = activator.getBoundingClientRect();
        const top = ac.top + ac.height + 10;
        component.setAttribute('style', `position: fixed !important;
          top: ${top}px !important;
          left: auto;
          right: 8px;
          display: unset;
          bottom: auto;`);
      }, 100);
    }
  }
  setupEventListeners() {
    __classPrivateFieldGet$1(this, _BrxTooltip_eventListenersCleanup, "f").run();
    // Ação de abrir padrao ao entrar no ativador
    if (this.activator) {
      const handleEvent = (event) => {
        this.show(event);
      };
      for (const eventName of SHOW_EVENTS) {
        this.activator.addEventListener(eventName, handleEvent);
        __classPrivateFieldGet$1(this, _BrxTooltip_eventListenersCleanup, "f").add(() => this.activator.removeEventListener(eventName, handleEvent));
      }
    }
    // Adiciona ação de fechar ao botao do popover
    // if (this.popover || this.notification) {
    if (this.popover) {
      const closeBtn = this.component.querySelector('.close');
      closeBtn.addEventListener('click', event => {
        this.hide();
        this._toggleActivatorIcon();
      });
      // Ação de fechar padrao ao sair do ativador
    }
    else {
      const handleHideEvent = (event) => {
        this.hide();
      };
      for (const eventName of HIDE_EVENTS) {
        this.activator.addEventListener(eventName, handleHideEvent);
        __classPrivateFieldGet$1(this, _BrxTooltip_eventListenersCleanup, "f").add(() => this.activator.removeEventListener(eventName, handleHideEvent));
      }
    }
  }
  connectedCallback() {
    this.activator = this.el;
    enqueueIdleCallback(() => {
      this.setupPlacement();
      this.setupComponent();
    });
  }
  componentShouldUpdate(_newVal, _oldVal, propName) {
    switch (propName) {
      case 'target':
      case 'text': {
        return true;
      }
      default: {
        return false;
      }
    }
  }
  render() {
    // XXX: ???
    // text_tooltip.classList.add('sample')
    // if (this.activator && this.onActivator) {
    //   this.activator.appendChild(text_tooltip)
    // } else {
    //   document.body.appendChild(text_tooltip)
    // }
    const { target, text } = this;
    return (hAsync(Host, null, hAsync("slot", null), !target && (hAsync("brx-tooltip-content", { ref: (el) => {
        enqueueIdleCallback(() => {
          this.component = el;
        });
      } }, hAsync("slot", { name: "content" }, text)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "place": ["setupComponent", "setupPlacement"],
    "color": ["setupComponent"],
    "target": ["setupComponent"],
    "component": ["setupNotification", "setupPopper"],
    "notification": ["setupPlacement", "setupPopper"],
    "placement": ["setupPopper"],
    "activator": ["setupPopper", "setupEventListeners"]
  }; }
  static get style() { return brxTooltipCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-tooltip",
    "$members$": {
      "type": [513],
      "text": [513],
      "timer": [514],
      "color": [513],
      "place": [513],
      "target": [513],
      "active": [516],
      "popover": [516],
      "activator": [32],
      "component": [32],
      "placement": [32],
      "closeTimer": [32],
      "notification": [32],
      "popperInstance": [32],
      "hide": [64]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["type", "type"], ["text", "text"], ["timer", "timer"], ["color", "color"], ["place", "place"], ["target", "target"], ["active", "active"], ["popover", "popover"]]
  }; }
}
_BrxTooltip_eventListenersCleanup = new WeakMap();

class BrxTooltipAuto {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.place = 'bottom';
    this.tooltipText = undefined;
    this.tooltipContentId = undefined;
  }
  componentWillLoad() {
    if (!this.tooltipContentId) {
      this.tooltipContentId = generateUniqueId();
    }
  }
  get enabled() {
    return !!this.tooltipText;
  }
  render() {
    const { place, enabled, tooltipText, tooltipContentId } = this;
    return (hAsync(Host, null, enabled && (hAsync(Fragment, null, hAsync("brx-tooltip", { target: `#${tooltipContentId}`, class: "brx-tooltip-auto-container", place: place }, hAsync("slot", null)), hAsync("brx-tooltip-content", { id: tooltipContentId }, tooltipText))), !enabled && (hAsync("div", { class: "brx-tooltip-auto-container" }, hAsync("slot", null)))));
  }
  get el() { return getElement(this); }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-tooltip-auto",
    "$members$": {
      "place": [1],
      "tooltipText": [1, "tooltip-text"],
      "tooltipContentId": [32]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": []
  }; }
}

const brxTooltipContentCss = "brx-tooltip-content{display:block;-ms-flex-align:start;align-items:flex-start;background:var(--color-info, #155bcb);border-radius:4px;-webkit-box-shadow:0 3px 6px rgba(0, 0, 0, 0.16);box-shadow:0 3px 6px rgba(0, 0, 0, 0.16);color:var(--color-secondary-01, #fff);display:-ms-flexbox !important;display:flex !important;-ms-flex-wrap:wrap;flex-wrap:wrap;font-size:var(--font-size-scale-down-01, 11.662px);font-weight:var(--font-weight-medium, 500);-ms-flex-pack:start;justify-content:flex-start;max-width:240px;opacity:0;padding:var(--spacing-scale-2x);position:absolute !important;z-index:999}brx-tooltip-content,brx-tooltip-content.hydrated{visibility:hidden}@-webkit-keyframes fadeInOpacity{0%{opacity:0}100%{opacity:1}}@keyframes fadeInOpacity{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes fadeOutOpacity{0%{opacity:1}100%{opacity:0}}@keyframes fadeOutOpacity{0%{opacity:1}100%{opacity:0}}brx-tooltip-content[data-show]{-webkit-animation:fadeInOpacity ease-in-out 0.5s;animation:fadeInOpacity ease-in-out 0.5s;opacity:1;visibility:visible}brx-tooltip-content[popover]{max-width:320px;min-width:240px;width:auto}brx-tooltip-content[color=success]{background:var(--color-success, #168821)}brx-tooltip-content[color=success] .arrow{border-color:var(--color-success, #168821)}brx-tooltip-content[color=error]{background:var(--color-danger, #e52207)}brx-tooltip-content[color=error] .arrow{border-color:var(--color-danger, #e52207)}brx-tooltip-content[color=warning]{background:var(--color-warning, #ffcd07);color:var(--color-secondary-08, #333)}brx-tooltip-content[color=warning] .arrow{border-color:var(--color-warning, #ffcd07)}brx-tooltip-content[color=info]{background:var(--color-info, #155bcb)}brx-tooltip-content[color=info] .arrow{border-color:var(--color-info, #155bcb)}brx-tooltip-content .arrow{height:0 !important;position:absolute !important;width:0 !important;z-index:-1 !important}brx-tooltip-content[placement^=top]>.arrow{border-left:8px solid transparent;border-right:8px solid transparent;border-top-style:solid;border-top-width:8px;bottom:-7px;margin-left:0}brx-tooltip-content[placement^=bottom]>.arrow{border-bottom-style:solid;border-bottom-width:8px;border-left:8px solid transparent;border-right:8px solid transparent;margin-left:0;top:-8px}brx-tooltip-content[placement^=left]>.arrow{border-bottom:8px solid transparent;border-left-style:solid;border-left-width:8px;border-top:8px solid transparent;margin-top:calc(var(--spacing-scale-base) * -1);right:calc(var(--spacing-scale-base) * -1)}brx-tooltip-content[placement^=right]>.arrow{border-bottom:8px solid transparent;border-right-style:solid;border-right-width:8px;border-top:8px solid transparent;left:calc(var(--spacing-scale-base) * -1);margin-top:calc(var(--spacing-scale-base) * -1)}brx-tooltip-content .text,brx-tooltip-content .subtext,brx-tooltip-content .link{display:block;max-width:100%;min-width:0}brx-tooltip-content .popover-header{font-size:var(--font-size-scale-base, 14px);margin-bottom:1em;min-width:180px;text-align:center;width:100%}brx-tooltip-content .popover-header brx-icon,brx-tooltip-content .popover-header .fas,brx-tooltip-content .popover-header .svg-inline--fa{font-size:var(--font-size-scale-up-06, 41.804px);text-align:center}brx-tooltip-content .popover-image{border:3px solid var(--color-secondary-01, #fff);height:auto;margin-left:-10px;max-height:120px;max-width:45%;overflow:hidden;width:auto}brx-tooltip-content .popover-icon{height:auto;margin-left:-10px;margin-top:10%;max-height:120px;max-width:45%;overflow:hidden;width:auto}brx-tooltip-content .popover-body{font-size:var(--font-size-scale-down-01, 11.662px);margin-bottom:1em;min-width:180px;width:100%}brx-tooltip-content .popover-image+div{-ms-flex-align:start;align-items:flex-start;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start;text-align:left;width:65%}brx-tooltip-content .popover-image+div div{padding-left:var(--spacing-scale-base);text-align:left}brx-tooltip-content .popover-icon+div{-ms-flex-align:start;align-items:flex-start;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start;text-align:left;width:65%}brx-tooltip-content .popover-icon+div div{padding-left:var(--spacing-scale-base);text-align:left}brx-tooltip-content .popover-footer{font-size:var(--font-size-scale-down-01, 11.662px);min-width:180px;text-align:center;width:100%}brx-tooltip-content .text{font-size:var(--font-size-scale-base, 14px);font-weight:var(--font-weight-semi-bold, 600)}brx-tooltip-content .subtext{font-size:var(--font-size-scale-down-01, 11.662px);font-weight:var(--font-weight-medium, 500)}brx-tooltip-content .link{color:inherit;text-align:right;text-decoration:underline;width:100%}brx-tooltip-content .close{background:transparent;border:0;color:inherit;cursor:pointer;margin:0;padding:0;position:absolute;right:10px;top:10px}";

class BrxTooltipContent {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.popover = undefined;
    this.place = undefined;
    this.color = 'info';
  }
  render() {
    const { place } = this;
    return (hAsync(Host, { role: "tooltip", "data-toggle": "tooltip", placement: place }, hAsync("slot", null), hAsync("div", { "data-popper-arrow": true, class: "arrow" }), this.popover && (hAsync("button", { type: "button", class: "close" }, hAsync("brx-icon", { name: "fa5/fas/times" })))));
  }
  get el() { return getElement(this); }
  static get style() { return brxTooltipContentCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-tooltip-content",
    "$members$": {
      "popover": [516],
      "place": [513],
      "color": [513]
    },
    "$listeners$": undefined,
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["popover", "popover"], ["place", "place"], ["color", "color"]]
  }; }
}

const brxUploadCss = "brx-upload{display:block}brx-upload brx-loading{display:block;width:100%}brx-upload input{display:none}brx-upload .upload-button{--button-radius:100em;--button-xsmall:24px;--button-small:32px;--button-medium:40px;--button-large:48px;--button-size:var(--button-medium)}brx-upload .upload-button .brx-button-native{-ms-flex-align:center;align-items:center;background-color:transparent;border:0;border-radius:var(--button-radius);color:var(--interactive);cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-semi-bold);height:var(--button-size);-ms-flex-pack:center;justify-content:center;overflow:hidden;padding:0 var(--spacing-scale-3x);position:relative;text-align:center;vertical-align:middle;white-space:nowrap;width:auto}brx-upload .upload-button .brx-button-native{border:var(--surface-width-sm) dashed var(--interactive);border-radius:var(--surface-rounder-sm);display:block;font-size:var(--font-size-scale-base);font-style:italic;font-weight:var(--font-weight-regular);margin-top:var(--spacing-scale-half);max-width:550px;min-height:var(--button-size);padding-left:var(--spacing-scale-2x);padding-right:var(--spacing-scale-2x);text-align:left;width:100%}brx-upload .upload-button .brx-button-native .svg-inline--fa,brx-upload .upload-button .brx-button-native .fa,brx-upload .upload-button .brx-button-native .fab,brx-upload .upload-button .brx-button-native .fad,brx-upload .upload-button .brx-button-native .fal,brx-upload .upload-button .brx-button-native .far,brx-upload .upload-button .brx-button-native .fas{margin-right:var(--spacing-scale-base)}brx-upload .upload-list{max-width:550px;position:relative}brx-upload .upload-list brx-tooltip{overflow:hidden;max-width:100%;display:-ms-flexbox;display:flex;-ms-flex:1 1;flex:1 1;padding-right:1rem}brx-upload .upload-list brx-tooltip .content{max-width:100%;overflow:hidden}brx-upload .upload-list brx-tooltip .content span{display:block;-ms-flex-item-align:center;align-self:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}brx-upload .upload-list .support{-ms-flex:0 1;flex:0 1;-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;white-space:nowrap}brx-upload brx-tooltip-content{max-width:93%}brx-upload .upload-button:disabled .brx-button-native,brx-upload .upload-button[disabled] .brx-button-native{cursor:not-allowed}brx-upload .upload-button:not(:disabled):not([disabled]) .brx-button-native{--focus-offset:var(--spacing-scale-half)}brx-upload .upload-button:not(:disabled):not([disabled]) .brx-button-native:focus{outline:none}brx-upload .upload-button:not(:disabled):not([disabled]) .brx-button-native.focus-visible,brx-upload .upload-button:not(:disabled):not([disabled]) .brx-button-native:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-upload .upload-button:not(:disabled):not([disabled]) .brx-button-native:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-upload .upload-button:not(:disabled):not([disabled]) .brx-button-native:not(:disabled):active{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--pressed))), to(rgba(var(--interactive-rgb), var(--pressed))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--pressed)), rgba(var(--interactive-rgb), var(--pressed)))}brx-upload .upload-button[active] .brx-button-native{--hover:var(--hover-dark);background-color:var(--active);color:var(--color-dark)}brx-upload .upload-button brx-loading{width:auto;height:auto}brx-upload .upload-button brx-loading::after{margin:0;border-color:var(--interactive) var(--interactive) transparent;border-style:solid}brx-upload .upload-button[variant=primary] brx-loading::after,brx-upload .upload-button[color=success] brx-loading::after,brx-upload .upload-button[color=danger] brx-loading::after,brx-upload .upload-button[color=info] brx-loading::after{border-color:var(--background) var(--background) transparent}brx-upload[status=success] .upload-button .brx-button-native{border-color:var(--success)}brx-upload[status=danger] .upload-button .brx-button-native{border-color:var(--danger)}brx-upload[status=warning] .upload-button .brx-button-native{border-color:var(--warning)}brx-upload[status=info] .upload-button .brx-button-native{border-color:var(--info)}brx-upload.dragging .upload-button .brx-button-native{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(var(--interactive-rgb), var(--hover))), to(rgba(var(--interactive-rgb), var(--hover))));background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}";

var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrxUpload_dragAndDropEventsCleanup, _BrxUpload_buttonEl;
const EVENTS_TO_HIGHLIGHT = ['dragenter', 'dragover'];
const EVENTS_TO_REMOVE_HIGHLIGHT = ['dragleave', 'drop'];
const EVENTS_TO_PREVENT_DEFAULTS = ['dragenter', 'dragover', 'dragleave', 'drop'];
const DOMStrings = {
  inputNative: 'input',
  fileList: '.upload-list',
  buttonContainer: '.upload-button',
  buttonNative: '.upload-button button',
};
const DEFAULT_HANDLE_UPLOAD_FILES = () => {
  return wait(0);
};
class BrxUpload {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxChange = createEvent(this, "brxChange", 7);
    _BrxUpload_dragAndDropEventsCleanup.set(this, new CleanupManager());
    this.updateFileListInProgress = false;
    _BrxUpload_buttonEl.set(this, void 0);
    this.multiple = false;
    this.disabled = false;
    this.value = null;
    this.handleUploadFiles = DEFAULT_HANDLE_UPLOAD_FILES;
    this.attachmentAssets = [];
    this.status = undefined;
    this.label = undefined;
    this.messages = [];
    this.hasFocus = false;
    this.accept = undefined;
    this.autofocus = false;
    this.name = undefined;
    this.readonly = false;
    this.required = false;
    this.spellcheck = false;
    this.step = undefined;
    this.size = undefined;
    this.hiddenLabel = undefined;
    this.labelClass = undefined;
    this.inputId = undefined;
  }
  set buttonEl(element) {
    const prev = this.buttonEl;
    __classPrivateFieldSet(this, _BrxUpload_buttonEl, element, "f");
    if (element !== prev) {
      this.setDragAndDropBehavior();
    }
  }
  get buttonEl() {
    var _a;
    return (_a = __classPrivateFieldGet(this, _BrxUpload_buttonEl, "f")) !== null && _a !== void 0 ? _a : this.el.querySelector(DOMStrings.buttonNative);
  }
  get textHelpEl() {
    return document.querySelector('.text-base');
  }
  get inputEl() {
    return this.el.querySelector(DOMStrings.inputNative);
  }
  get uploadListEl() {
    return this.el.querySelector(DOMStrings.fileList);
  }
  async getAttachmentAssets() {
    return this.attachmentAssets;
  }
  setAttachmentAssets(attachmentAssets) {
    if (this.value === null) {
      this.attachmentAssets = attachmentAssets;
    }
    this.brxChange.emit({ attachmentAssets });
  }
  handleValueChange() {
    const { value } = this;
    if (value !== null) {
      this.attachmentAssets = value;
    }
  }
  handleAttachmentAssetsChange() {
    const { multiple, attachmentAssets, inputEl } = this;
    if (multiple) {
      inputEl.files = this.getFileList();
    }
    else if (attachmentAssets.length === 0) {
      inputEl.value = '';
    }
    this.updateFileList();
  }
  clickUpload() {
    this.inputEl.click();
  }
  handleFiles(rawFiles) {
    const { multiple } = this;
    this.messages = [];
    const files = rawFiles.length === 0 ? Array.from(this.inputEl.files) : Array.from(rawFiles);
    if (!multiple && files.length > 1) {
      this.addFeedback('danger', 'É permitido o envio de somente 1 arquivo.');
    }
    else if (!multiple && this.attachmentAssets.length > 0) {
      this.changeFiles(files);
      this.addFeedback('warning', 'O arquivo enviado anteriormente foi substituído.');
    }
    else {
      this.addFiles(files);
    }
  }
  hightLight() {
    this.el.classList.add('dragging');
  }
  unHightLight() {
    this.el.classList.remove('dragging');
  }
  handleDrop(event) {
    this.unHightLight();
    const { files } = event.dataTransfer;
    this.handleFiles(files);
  }
  async setDragAndDropBehavior() {
    const { buttonEl } = this;
    if (!buttonEl) {
      return;
    }
    await __classPrivateFieldGet(this, _BrxUpload_dragAndDropEventsCleanup, "f").run();
    {
      const handleEventToPreventDefault = (event) => {
        preventDefaults(event);
      };
      for (const event of EVENTS_TO_PREVENT_DEFAULTS) {
        buttonEl.addEventListener(event, handleEventToPreventDefault);
        __classPrivateFieldGet(this, _BrxUpload_dragAndDropEventsCleanup, "f").add(() => {
          buttonEl.removeEventListener(event, handleEventToPreventDefault);
        });
      }
    }
    {
      const handleEventToHighlight = () => {
        this.hightLight();
      };
      for (const event of EVENTS_TO_HIGHLIGHT) {
        buttonEl.addEventListener(event, handleEventToHighlight);
        __classPrivateFieldGet(this, _BrxUpload_dragAndDropEventsCleanup, "f").add(() => {
          buttonEl.removeEventListener(event, handleEventToHighlight);
        });
      }
    }
    {
      const handleEventToRemoveHighlight = () => {
        this.unHightLight();
      };
      for (const event of EVENTS_TO_REMOVE_HIGHLIGHT) {
        buttonEl.addEventListener(event, handleEventToRemoveHighlight);
        __classPrivateFieldGet(this, _BrxUpload_dragAndDropEventsCleanup, "f").add(() => {
          buttonEl.removeEventListener(event, handleEventToRemoveHighlight);
        });
      }
    }
    {
      const handleEventDrop = (event) => {
        this.handleDrop(event);
      };
      buttonEl.addEventListener('drop', handleEventDrop);
      __classPrivateFieldGet(this, _BrxUpload_dragAndDropEventsCleanup, "f").add(() => {
        buttonEl.removeEventListener('drop', handleEventDrop);
      });
    }
  }
  addMessage(message) {
    this.messages = [...this.messages, message];
  }
  addFeedback(severity, text) {
    const message = {
      text,
      severity,
      variant: 'feedback',
      id: `${generateUniqueId()}`,
    };
    this.addMessage(message);
    this.status = severity;
  }
  changeFiles(incomingFiles) {
    const attachmentAssets = incomingFiles.map(draft => draft instanceof Blob
      ? {
        file: draft,
        id: generateUniqueId(),
      }
      : draft);
    this.setAttachmentAssets(attachmentAssets);
  }
  addFiles(files) {
    this.changeFiles([...this.attachmentAssets, ...files]);
  }
  updateAsset(id, recipe) {
    this.changeFiles(this.attachmentAssets.map(attachmentAsset => (attachmentAsset.id === id ? recipe(attachmentAsset) : attachmentAsset)));
  }
  updateFileList() {
    if (this.updateFileListInProgress) {
      return;
    }
    this.updateFileListInProgress = true;
    this.status = undefined;
    if (this.el.nextElementSibling === this.textHelpEl) {
      this.textHelpEl.style.display = 'none';
    }
    if (!this.attachmentAssets.length) {
      this.messages = [];
      if (this.el.nextElementSibling === this.textHelpEl) {
        this.textHelpEl.style.display = '';
      }
    }
    else {
      this.messages = [];
      for (let i = 0; i < this.attachmentAssets.length; i++) {
        if ('nowait' in this.attachmentAssets[i]) {
          if (this.attachmentAssets[i].nowait) {
            this.renderItem(i);
          }
        }
        else if (!this.attachmentAssets[i].requested) {
          this.uploadingFile(i);
        }
      }
    }
    this.updateFileListInProgress = false;
  }
  /**
   * Faz upload de arquivo na posição definida
   */
  uploadingFile(position) {
    const id = this.getAssetIdByIndex(position);
    const asset = this.getAssetById(id);
    if (this.handleUploadFiles) {
      this.updateAsset(id, draft => (Object.assign(Object.assign({}, draft), { requested: true })));
      this.handleUploadFiles(asset, position).then(() => {
        this.updateAsset(id, draft => (Object.assign(Object.assign({}, draft), { nowait: true })));
      });
    }
  }
  /**
   * Renderiza item na posição definida
   */
  renderItem(position) {
    const id = this.getAssetIdByIndex(position);
    this.updateAsset(id, draft => (Object.assign(Object.assign({}, draft), { nowait: true })));
  }
  getAssetIdByIndex(index) {
    var _a;
    const asset = this.attachmentAssets[index];
    return (_a = asset === null || asset === void 0 ? void 0 : asset.id) !== null && _a !== void 0 ? _a : null;
  }
  getAssetById(id) {
    return this.attachmentAssets.find(i => i.id === id);
  }
  /**
   * Remove arquivo na posição definida
   */
  removeFileByIndex(index) {
    const id = this.getAssetIdByIndex(index);
    this.removeFileById(id);
  }
  removeFileById(id) {
    if (!id) {
      return;
    }
    this.status = undefined;
    this.messages = [];
    this.changeFiles(this.attachmentAssets.filter(i => i.id !== id));
  }
  handleUploadButtonClick(event) {
    const target = event.target;
    const button = target.closest(DOMStrings.buttonNative);
    if (button) {
      this.clickUpload();
    }
  }
  handleInputChange(event) {
    const target = event.target;
    const input = target.closest(DOMStrings.inputNative);
    if (input) {
      this.handleFiles(input.files);
    }
  }
  getFileList() {
    return getFileListFromFiles(this.attachmentAssets.map(i => i.file));
  }
  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
  }
  componentShouldUpdate(_newVal, _oldVal, propName) {
    switch (propName) {
      case 'buttonEl': {
        return false;
      }
      default: {
        return true;
      }
    }
  }
  get inheritedAttributes() {
    return inheritAriaAttributes(this.el);
  }
  render() {
    const { hiddenLabel, labelClass, attachmentAssets, messages, disabled, multiple, label, inputId, inheritedAttributes } = this;
    const labelId = `${inputId}-lbl`;
    return (hAsync(Host, null, hAsync("label", { class: `upload-label ${hiddenLabel ? 'sr-only' : ''} ${labelClass}`, id: labelId, htmlFor: inputId }, label), hAsync("input", Object.assign({ class: "upload-input", id: inputId, type: "file", multiple: multiple, disabled: disabled, "aria-labelledby": labelId, accept: this.accept, autoFocus: this.autofocus, name: this.name, readOnly: this.readonly, required: this.required, step: this.step, size: this.size, tabindex: this.tabindex, spellcheck: this.spellcheck ? 'true' : undefined }, inheritedAttributes)), hAsync("div", { class: 'upload-button' }, hAsync("button", { type: "button", class: 'brx-button-native', ref: el => {
        this.buttonEl = el;
      } }, hAsync("brx-icon", { name: "fa5/fas/upload" }), hAsync("span", null, multiple ? 'Selecione o(s) arquivo(s).' : 'Selecione o arquivo.'))), messages.map(message => (hAsync("brx-message", { key: message.id, variant: message.variant, severity: message.severity, class: "mt-1" }, message.text))), hAsync("div", { class: "upload-list" }, attachmentAssets.map(({ id, file, requested, nowait }) => {
      const loading = requested && !nowait;
      return (hAsync("brx-item", { key: id, class: 'd-flex' }, !loading && (hAsync(Fragment, null, hAsync("brx-tooltip", { class: 'mr-auto', place: "top", color: "info", text: file.name }, hAsync("div", { class: "content text-primary-default " }, hAsync("span", null, file.name))), hAsync("div", { class: "name" }), hAsync("div", { class: "support mr-n2" }, hAsync("span", { class: "mr-1" }, calcSize(file.size)), hAsync("brx-button", { circle: true, type: "button", onClick: event => {
          preventDefaults(event);
          this.removeFileById(id);
        } }, hAsync("brx-icon", { name: "fa5/fas/trash" }))))), loading && hAsync("brx-loading", { class: 'd-flex mt-1', size: "small" })));
    })), hAsync("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["handleValueChange"],
    "attachmentAssets": ["handleAttachmentAssetsChange"]
  }; }
  static get style() { return brxUploadCss; }
  static get cmpMeta() { return {
    "$flags$": 4,
    "$tagName$": "brx-upload",
    "$members$": {
      "multiple": [4],
      "disabled": [4],
      "value": [16],
      "handleUploadFiles": [16],
      "status": [1537],
      "label": [1],
      "accept": [1],
      "autofocus": [4],
      "name": [1],
      "readonly": [4],
      "required": [4],
      "spellcheck": [4],
      "step": [1],
      "size": [2],
      "hiddenLabel": [516, "hidden-label"],
      "labelClass": [513, "label-class"],
      "inputId": [1537, "input-id"],
      "attachmentAssets": [32],
      "messages": [32],
      "hasFocus": [32],
      "getAttachmentAssets": [64]
    },
    "$listeners$": [[0, "click", "handleUploadButtonClick"], [0, "change", "handleInputChange"]],
    "$lazyBundleId$": "-",
    "$attrsToReflect$": [["status", "status"], ["hiddenLabel", "hidden-label"], ["labelClass", "label-class"], ["inputId", "input-id"]]
  }; }
}
_BrxUpload_dragAndDropEventsCleanup = new WeakMap(), _BrxUpload_buttonEl = new WeakMap();

registerComponents([
  BrxAccordionLegacy,
  BrxAccordionLegacyEntry,
  BrxAccordionLegacyEntryContent,
  BrxAccordionLegacyEntryItem,
  BrxAccordionTrigger,
  BrxAvatar,
  BrxBreadcrumb,
  BrxBreadcrumbCard,
  BrxBreadcrumbItem,
  BrxBreadcrumbList,
  BrxButton,
  BrxCard,
  BrxCardContent,
  BrxCardFooter,
  BrxCardHeader,
  BrxCheckbox,
  BrxCheckgroup,
  BrxCollapseTrigger,
  BrxDateTimePicker,
  BrxDivider,
  BrxDropdown,
  BrxDropdownTrigger,
  BrxIcon,
  BrxInput,
  BrxItem,
  BrxList,
  BrxListHeader,
  BrxLoading,
  BrxMessage,
  BrxModal,
  BrxModalBody,
  BrxModalFooter,
  BrxModalHeader,
  BrxNotification,
  BrxPagination,
  BrxPaginationArrows,
  BrxPaginationEllipsis,
  BrxPaginationGoToPage,
  BrxPaginationInformation,
  BrxPaginationItem,
  BrxPaginationItems,
  BrxPaginationPerPage,
  BrxRadio,
  BrxRadioGroup,
  BrxScrim,
  BrxScrimTrigger,
  BrxSelect,
  BrxSelectOption,
  BrxSelectToggle,
  BrxSignin,
  BrxSkiplink,
  BrxStep,
  BrxStepProgress,
  BrxStepProgressBtn,
  BrxTab,
  BrxTabs,
  BrxTabsPanel,
  BrxTabsPanels,
  BrxTag,
  BrxTextarea,
  BrxTooltip,
  BrxTooltipAuto,
  BrxTooltipContent,
  BrxUpload,
]);

var HOOKS = [
    "onChange",
    "onClose",
    "onDayCreate",
    "onDestroy",
    "onKeyDown",
    "onMonthChange",
    "onOpen",
    "onParseConfig",
    "onReady",
    "onValueUpdate",
    "onYearChange",
    "onPreCalendarPosition",
];
var defaults = {
    _disable: [],
    allowInput: false,
    allowInvalidPreload: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: typeof window === "object" &&
        window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    autoFillDefaultTime: true,
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enableSeconds: false,
    enableTime: false,
    errorHandler: function (err) {
        return typeof console !== "undefined" && console.warn(err);
    },
    getWeek: function (givenDate) {
        var date = new Date(givenDate.getTime());
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
        var week1 = new Date(date.getFullYear(), 0, 4);
        return (1 +
            Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                3 +
                ((week1.getDay() + 6) % 7)) /
                7));
    },
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    monthSelectorType: "dropdown",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    now: new Date(),
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    onPreCalendarPosition: [],
    plugins: [],
    position: "auto",
    positionElement: undefined,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    showMonths: 1,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false,
};

var english = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
    },
    months: {
        shorthand: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        longhand: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: function (nth) {
        var s = nth % 100;
        if (s > 3 && s < 21)
            return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
    yearAriaLabel: "Year",
    monthAriaLabel: "Month",
    hourAriaLabel: "Hour",
    minuteAriaLabel: "Minute",
    time_24hr: false,
};

var pad = function (number, length) {
    if (length === void 0) { length = 2; }
    return ("000" + number).slice(length * -1);
};
var int = function (bool) { return (bool === true ? 1 : 0); };
function debounce$1(fn, wait) {
    var t;
    return function () {
        var _this = this;
        var args = arguments;
        clearTimeout(t);
        t = setTimeout(function () { return fn.apply(_this, args); }, wait);
    };
}
var arrayify = function (obj) {
    return obj instanceof Array ? obj : [obj];
};

function toggleClass(elem, className, bool) {
    if (bool === true)
        return elem.classList.add(className);
    elem.classList.remove(className);
}
function createElement(tag, className, content) {
    var e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== undefined)
        e.textContent = content;
    return e;
}
function clearNode(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}
function findParent(node, condition) {
    if (condition(node))
        return node;
    else if (node.parentNode)
        return findParent(node.parentNode, condition);
    return undefined;
}
function createNumberInput(inputClassName, opts) {
    var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
        numInput.type = "number";
    }
    else {
        numInput.type = "text";
        numInput.pattern = "\\d*";
    }
    if (opts !== undefined)
        for (var key in opts)
            numInput.setAttribute(key, opts[key]);
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
}
function getEventTarget(event) {
    try {
        if (typeof event.composedPath === "function") {
            var path = event.composedPath();
            return path[0];
        }
        return event.target;
    }
    catch (error) {
        return event.target;
    }
}

var doNothing = function () { return undefined; };
var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
var revFormat = {
    D: doNothing,
    F: function (dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: function (dateObj, hour) {
        dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
    },
    H: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    J: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    K: function (dateObj, amPM, locale) {
        dateObj.setHours((dateObj.getHours() % 12) +
            12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
    W: function (dateObj, weekNum, locale) {
        var weekNumber = parseInt(weekNum);
        var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
        date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
        return date;
    },
    Y: function (dateObj, year) {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: function (_, ISODate) { return new Date(ISODate); },
    d: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    h: function (dateObj, hour) {
        dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
    },
    i: function (dateObj, minutes) {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    l: doNothing,
    m: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    u: function (_, unixMillSeconds) {
        return new Date(parseFloat(unixMillSeconds));
    },
    w: doNothing,
    y: function (dateObj, year) {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
var tokenRegex = {
    D: "",
    F: "",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "",
    M: "",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    u: "(.+)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
var formats = {
    Z: function (date) { return date.toISOString(); },
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return pad(formats.h(date, locale, options));
    },
    H: function (date) { return pad(date.getHours()); },
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: function (date) { return pad(date.getSeconds()); },
    U: function (date) { return date.getTime() / 1000; },
    W: function (date, _, options) {
        return options.getWeek(date);
    },
    Y: function (date) { return pad(date.getFullYear(), 4); },
    d: function (date) { return pad(date.getDate()); },
    h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
    i: function (date) { return pad(date.getMinutes()); },
    j: function (date) { return date.getDate(); },
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: function (date) { return pad(date.getMonth() + 1); },
    n: function (date) { return date.getMonth() + 1; },
    s: function (date) { return date.getSeconds(); },
    u: function (date) { return date.getTime(); },
    w: function (date) { return date.getDay(); },
    y: function (date) { return String(date.getFullYear()).substring(2); },
};

var createDateFormatter = function (_a) {
    var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
    return function (dateObj, frmt, overrideLocale) {
        var locale = overrideLocale || l10n;
        if (config.formatDate !== undefined && !isMobile) {
            return config.formatDate(dateObj, frmt, locale);
        }
        return frmt
            .split("")
            .map(function (c, i, arr) {
            return formats[c] && arr[i - 1] !== "\\"
                ? formats[c](dateObj, locale, config)
                : c !== "\\"
                    ? c
                    : "";
        })
            .join("");
    };
};
var createDateParser = function (_a) {
    var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
    return function (date, givenFormat, timeless, customLocale) {
        if (date !== 0 && !date)
            return undefined;
        var locale = customLocale || l10n;
        var parsedDate;
        var dateOrig = date;
        if (date instanceof Date)
            parsedDate = new Date(date.getTime());
        else if (typeof date !== "string" &&
            date.toFixed !== undefined)
            parsedDate = new Date(date);
        else if (typeof date === "string") {
            var format = givenFormat || (config || defaults).dateFormat;
            var datestr = String(date).trim();
            if (datestr === "today") {
                parsedDate = new Date();
                timeless = true;
            }
            else if (config && config.parseDate) {
                parsedDate = config.parseDate(date, format);
            }
            else if (/Z$/.test(datestr) ||
                /GMT$/.test(datestr)) {
                parsedDate = new Date(date);
            }
            else {
                var matched = void 0, ops = [];
                for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                    var token = format[i];
                    var isBackSlash = token === "\\";
                    var escaped = format[i - 1] === "\\" || isBackSlash;
                    if (tokenRegex[token] && !escaped) {
                        regexStr += tokenRegex[token];
                        var match = new RegExp(regexStr).exec(date);
                        if (match && (matched = true)) {
                            ops[token !== "Y" ? "push" : "unshift"]({
                                fn: revFormat[token],
                                val: match[++matchIndex],
                            });
                        }
                    }
                    else if (!isBackSlash)
                        regexStr += ".";
                }
                parsedDate =
                    !config || !config.noCalendar
                        ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                        : new Date(new Date().setHours(0, 0, 0, 0));
                ops.forEach(function (_a) {
                    var fn = _a.fn, val = _a.val;
                    return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                });
                parsedDate = matched ? parsedDate : undefined;
            }
        }
        if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
            config.errorHandler(new Error("Invalid date provided: " + dateOrig));
            return undefined;
        }
        if (timeless === true)
            parsedDate.setHours(0, 0, 0, 0);
        return parsedDate;
    };
};
function compareDates(date1, date2, timeless) {
    if (timeless === void 0) { timeless = true; }
    if (timeless !== false) {
        return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
            new Date(date2.getTime()).setHours(0, 0, 0, 0));
    }
    return date1.getTime() - date2.getTime();
}
var isBetween = function (ts, ts1, ts2) {
    return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
};
var calculateSecondsSinceMidnight = function (hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
};
var parseSeconds = function (secondsSinceMidnight) {
    var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
    return [hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60];
};
var duration = {
    DAY: 86400000,
};
function getDefaultHours(config) {
    var hours = config.defaultHour;
    var minutes = config.defaultMinute;
    var seconds = config.defaultSeconds;
    if (config.minDate !== undefined) {
        var minHour = config.minDate.getHours();
        var minMinutes = config.minDate.getMinutes();
        var minSeconds = config.minDate.getSeconds();
        if (hours < minHour) {
            hours = minHour;
        }
        if (hours === minHour && minutes < minMinutes) {
            minutes = minMinutes;
        }
        if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
            seconds = config.minDate.getSeconds();
    }
    if (config.maxDate !== undefined) {
        var maxHr = config.maxDate.getHours();
        var maxMinutes = config.maxDate.getMinutes();
        hours = Math.min(hours, maxHr);
        if (hours === maxHr)
            minutes = Math.min(maxMinutes, minutes);
        if (hours === maxHr && minutes === maxMinutes)
            seconds = config.maxDate.getSeconds();
    }
    return { hours: hours, minutes: minutes, seconds: seconds };
}

if (typeof Object.assign !== "function") {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!target) {
            throw TypeError("Cannot convert undefined or null to object");
        }
        var _loop_1 = function (source) {
            if (source) {
                Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
            }
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var source = args_1[_a];
            _loop_1(source);
        }
        return target;
    };
}

var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
    var self = {
        config: __assign(__assign({}, defaults), flatpickr.defaultConfig),
        l10n: english,
    };
    self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
    self._handlers = [];
    self.pluginElements = [];
    self.loadedPlugins = [];
    self._bind = bind;
    self._setHoursFromDate = setHoursFromDate;
    self._positionCalendar = positionCalendar;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self.onMouseOver = onMouseOver;
    self._createElement = createElement;
    self.createDay = createDay;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.updateValue = updateValue;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;
    function setupHelperFunctions() {
        self.utils = {
            getDaysInMonth: function (month, yr) {
                if (month === void 0) { month = self.currentMonth; }
                if (yr === void 0) { yr = self.currentYear; }
                if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                    return 29;
                return self.l10n.daysInMonth[month];
            },
        };
    }
    function init() {
        self.element = self.input = element;
        self.isOpen = false;
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();
        if (!self.isMobile)
            build();
        bindEvents();
        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : undefined);
            }
            updateValue(false);
        }
        setCalendarWidth();
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (!self.isMobile && isSafari) {
            positionCalendar();
        }
        triggerEvent("onReady");
    }
    function getClosestActiveElement() {
        var _a;
        return (((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode())
            .activeElement || document.activeElement);
    }
    function bindToInstance(fn) {
        return fn.bind(self);
    }
    function setCalendarWidth() {
        var config = self.config;
        if (config.weekNumbers === false && config.showMonths === 1) {
            return;
        }
        else if (config.noCalendar !== true) {
            window.requestAnimationFrame(function () {
                if (self.calendarContainer !== undefined) {
                    self.calendarContainer.style.visibility = "hidden";
                    self.calendarContainer.style.display = "block";
                }
                if (self.daysContainer !== undefined) {
                    var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                    self.daysContainer.style.width = daysWidth + "px";
                    self.calendarContainer.style.width =
                        daysWidth +
                            (self.weekWrapper !== undefined
                                ? self.weekWrapper.offsetWidth
                                : 0) +
                            "px";
                    self.calendarContainer.style.removeProperty("visibility");
                    self.calendarContainer.style.removeProperty("display");
                }
            });
        }
    }
    function updateTime(e) {
        if (self.selectedDates.length === 0) {
            var defaultDate = self.config.minDate === undefined ||
                compareDates(new Date(), self.config.minDate) >= 0
                ? new Date()
                : new Date(self.config.minDate.getTime());
            var defaults = getDefaultHours(self.config);
            defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
            self.selectedDates = [defaultDate];
            self.latestSelectedDateObj = defaultDate;
        }
        if (e !== undefined && e.type !== "blur") {
            timeWrapper(e);
        }
        var prevValue = self._input.value;
        setHoursFromInputs();
        updateValue();
        if (self._input.value !== prevValue) {
            self._debouncedChange();
        }
    }
    function ampm2military(hour, amPM) {
        return (hour % 12) + 12 * int(amPM === self.l10n.amPM[1]);
    }
    function military2ampm(hour) {
        switch (hour % 24) {
            case 0:
            case 12:
                return 12;
            default:
                return hour % 12;
        }
    }
    function setHoursFromInputs() {
        if (self.hourElement === undefined || self.minuteElement === undefined)
            return;
        var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
            ? (parseInt(self.secondElement.value, 10) || 0) % 60
            : 0;
        if (self.amPM !== undefined) {
            hours = ampm2military(hours, self.amPM.textContent);
        }
        var limitMinHours = self.config.minTime !== undefined ||
            (self.config.minDate &&
                self.minDateHasTime &&
                self.latestSelectedDateObj &&
                compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                    0);
        var limitMaxHours = self.config.maxTime !== undefined ||
            (self.config.maxDate &&
                self.maxDateHasTime &&
                self.latestSelectedDateObj &&
                compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                    0);
        if (self.config.maxTime !== undefined &&
            self.config.minTime !== undefined &&
            self.config.minTime > self.config.maxTime) {
            var minBound = calculateSecondsSinceMidnight(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
            var maxBound = calculateSecondsSinceMidnight(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
            var currentTime = calculateSecondsSinceMidnight(hours, minutes, seconds);
            if (currentTime > maxBound && currentTime < minBound) {
                var result = parseSeconds(minBound);
                hours = result[0];
                minutes = result[1];
                seconds = result[2];
            }
        }
        else {
            if (limitMaxHours) {
                var maxTime = self.config.maxTime !== undefined
                    ? self.config.maxTime
                    : self.config.maxDate;
                hours = Math.min(hours, maxTime.getHours());
                if (hours === maxTime.getHours())
                    minutes = Math.min(minutes, maxTime.getMinutes());
                if (minutes === maxTime.getMinutes())
                    seconds = Math.min(seconds, maxTime.getSeconds());
            }
            if (limitMinHours) {
                var minTime = self.config.minTime !== undefined
                    ? self.config.minTime
                    : self.config.minDate;
                hours = Math.max(hours, minTime.getHours());
                if (hours === minTime.getHours() && minutes < minTime.getMinutes())
                    minutes = minTime.getMinutes();
                if (minutes === minTime.getMinutes())
                    seconds = Math.max(seconds, minTime.getSeconds());
            }
        }
        setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
        var date = dateObj || self.latestSelectedDateObj;
        if (date && date instanceof Date) {
            setHours(date.getHours(), date.getMinutes(), date.getSeconds());
        }
    }
    function setHours(hours, minutes, seconds) {
        if (self.latestSelectedDateObj !== undefined) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }
        if (!self.hourElement || !self.minuteElement || self.isMobile)
            return;
        self.hourElement.value = pad(!self.config.time_24hr
            ? ((12 + hours) % 12) + 12 * int(hours % 12 === 0)
            : hours);
        self.minuteElement.value = pad(minutes);
        if (self.amPM !== undefined)
            self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
        if (self.secondElement !== undefined)
            self.secondElement.value = pad(seconds);
    }
    function onYearInput(event) {
        var eventTarget = getEventTarget(event);
        var year = parseInt(eventTarget.value) + (event.delta || 0);
        if (year / 1000 > 1 ||
            (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
            changeYear(year);
        }
    }
    function bind(element, event, handler, options) {
        if (event instanceof Array)
            return event.forEach(function (ev) { return bind(element, ev, handler, options); });
        if (element instanceof Array)
            return element.forEach(function (el) { return bind(el, event, handler, options); });
        element.addEventListener(event, handler, options);
        self._handlers.push({
            remove: function () { return element.removeEventListener(event, handler, options); },
        });
    }
    function triggerChange() {
        triggerEvent("onChange");
    }
    function bindEvents() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach(function (evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                    return bind(el, "click", self[evt]);
                });
            });
        }
        if (self.isMobile) {
            setupMobile();
            return;
        }
        var debouncedResize = debounce$1(onResize, 50);
        self._debouncedChange = debounce$1(triggerChange, DEBOUNCED_CHANGE_MS);
        if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
            bind(self.daysContainer, "mouseover", function (e) {
                if (self.config.mode === "range")
                    onMouseOver(getEventTarget(e));
            });
        bind(self._input, "keydown", onKeyDown);
        if (self.calendarContainer !== undefined) {
            bind(self.calendarContainer, "keydown", onKeyDown);
        }
        if (!self.config.inline && !self.config.static)
            bind(window, "resize", debouncedResize);
        if (window.ontouchstart !== undefined)
            bind(window.document, "touchstart", documentClick);
        else
            bind(window.document, "mousedown", documentClick);
        bind(window.document, "focus", documentClick, { capture: true });
        if (self.config.clickOpens === true) {
            bind(self._input, "focus", self.open);
            bind(self._input, "click", self.open);
        }
        if (self.daysContainer !== undefined) {
            bind(self.monthNav, "click", onMonthNavClick);
            bind(self.monthNav, ["keyup", "increment"], onYearInput);
            bind(self.daysContainer, "click", selectDate);
        }
        if (self.timeContainer !== undefined &&
            self.minuteElement !== undefined &&
            self.hourElement !== undefined) {
            var selText = function (e) {
                return getEventTarget(e).select();
            };
            bind(self.timeContainer, ["increment"], updateTime);
            bind(self.timeContainer, "blur", updateTime, { capture: true });
            bind(self.timeContainer, "click", timeIncrement);
            bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
            if (self.secondElement !== undefined)
                bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
            if (self.amPM !== undefined) {
                bind(self.amPM, "click", function (e) {
                    updateTime(e);
                });
            }
        }
        if (self.config.allowInput) {
            bind(self._input, "blur", onBlur);
        }
    }
    function jumpToDate(jumpDate, triggerChange) {
        var jumpTo = jumpDate !== undefined
            ? self.parseDate(jumpDate)
            : self.latestSelectedDateObj ||
                (self.config.minDate && self.config.minDate > self.now
                    ? self.config.minDate
                    : self.config.maxDate && self.config.maxDate < self.now
                        ? self.config.maxDate
                        : self.now);
        var oldYear = self.currentYear;
        var oldMonth = self.currentMonth;
        try {
            if (jumpTo !== undefined) {
                self.currentYear = jumpTo.getFullYear();
                self.currentMonth = jumpTo.getMonth();
            }
        }
        catch (e) {
            e.message = "Invalid date supplied: " + jumpTo;
            self.config.errorHandler(e);
        }
        if (triggerChange && self.currentYear !== oldYear) {
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
        if (triggerChange &&
            (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
            triggerEvent("onMonthChange");
        }
        self.redraw();
    }
    function timeIncrement(e) {
        var eventTarget = getEventTarget(e);
        if (~eventTarget.className.indexOf("arrow"))
            incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
        var target = e && getEventTarget(e);
        var input = inputElem ||
            (target && target.parentNode && target.parentNode.firstChild);
        var event = createEvent("increment");
        event.delta = delta;
        input && input.dispatchEvent(event);
    }
    function build() {
        var fragment = window.document.createDocumentFragment();
        self.calendarContainer = createElement("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = createElement("div", "flatpickr-innerContainer");
            if (self.config.weekNumbers) {
                var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                self.innerContainer.appendChild(weekWrapper);
                self.weekNumbers = weekNumbers;
                self.weekWrapper = weekWrapper;
            }
            self.rContainer = createElement("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());
            if (!self.daysContainer) {
                self.daysContainer = createElement("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }
            buildDays();
            self.rContainer.appendChild(self.daysContainer);
            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }
        if (self.config.enableTime) {
            fragment.appendChild(buildTime());
        }
        toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
        toggleClass(self.calendarContainer, "animate", self.config.animate === true);
        toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
        self.calendarContainer.appendChild(fragment);
        var customAppend = self.config.appendTo !== undefined &&
            self.config.appendTo.nodeType !== undefined;
        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
            if (self.config.inline) {
                if (!customAppend && self.element.parentNode)
                    self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                else if (self.config.appendTo !== undefined)
                    self.config.appendTo.appendChild(self.calendarContainer);
            }
            if (self.config.static) {
                var wrapper = createElement("div", "flatpickr-wrapper");
                if (self.element.parentNode)
                    self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);
                if (self.altInput)
                    wrapper.appendChild(self.altInput);
                wrapper.appendChild(self.calendarContainer);
            }
        }
        if (!self.config.static && !self.config.inline)
            (self.config.appendTo !== undefined
                ? self.config.appendTo
                : window.document.body).appendChild(self.calendarContainer);
    }
    function createDay(className, date, _dayNumber, i) {
        var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", className, date.getDate().toString());
        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
        if (className.indexOf("hidden") === -1 &&
            compareDates(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
            dayElement.setAttribute("aria-current", "date");
        }
        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                        compareDates(date, self.selectedDates[0], true) === 0);
                    toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                        compareDates(date, self.selectedDates[1], true) === 0);
                    if (className === "nextMonthDay")
                        dayElement.classList.add("inRange");
                }
            }
        }
        else {
            dayElement.classList.add("flatpickr-disabled");
        }
        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date))
                dayElement.classList.add("inRange");
        }
        if (self.weekNumbers &&
            self.config.showMonths === 1 &&
            className !== "prevMonthDay" &&
            i % 7 === 6) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
        }
        triggerEvent("onDayCreate", dayElement);
        return dayElement;
    }
    function focusOnDayElem(targetNode) {
        targetNode.focus();
        if (self.config.mode === "range")
            onMouseOver(targetNode);
    }
    function getFirstAvailableDay(delta) {
        var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
        var endMonth = delta > 0 ? self.config.showMonths : -1;
        for (var m = startMonth; m != endMonth; m += delta) {
            var month = self.daysContainer.children[m];
            var startIndex = delta > 0 ? 0 : month.children.length - 1;
            var endIndex = delta > 0 ? month.children.length : -1;
            for (var i = startIndex; i != endIndex; i += delta) {
                var c = month.children[i];
                if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                    return c;
            }
        }
        return undefined;
    }
    function getNextAvailableDay(current, delta) {
        var givenMonth = current.className.indexOf("Month") === -1
            ? current.dateObj.getMonth()
            : self.currentMonth;
        var endMonth = delta > 0 ? self.config.showMonths : -1;
        var loopDelta = delta > 0 ? 1 : -1;
        for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
            var month = self.daysContainer.children[m];
            var startIndex = givenMonth - self.currentMonth === m
                ? current.$i + delta
                : delta < 0
                    ? month.children.length - 1
                    : 0;
            var numMonthDays = month.children.length;
            for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                var c = month.children[i];
                if (c.className.indexOf("hidden") === -1 &&
                    isEnabled(c.dateObj) &&
                    Math.abs(current.$i - i) >= Math.abs(delta))
                    return focusOnDayElem(c);
            }
        }
        self.changeMonth(loopDelta);
        focusOnDay(getFirstAvailableDay(loopDelta), 0);
        return undefined;
    }
    function focusOnDay(current, offset) {
        var activeElement = getClosestActiveElement();
        var dayFocused = isInView(activeElement || document.body);
        var startElem = current !== undefined
            ? current
            : dayFocused
                ? activeElement
                : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                    ? self.selectedDateElem
                    : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                        ? self.todayDateElem
                        : getFirstAvailableDay(offset > 0 ? 1 : -1);
        if (startElem === undefined) {
            self._input.focus();
        }
        else if (!dayFocused) {
            focusOnDayElem(startElem);
        }
        else {
            getNextAvailableDay(startElem, offset);
        }
    }
    function buildMonthDays(year, month) {
        var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
        var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
        var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
        var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
        for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
        }
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
        }
        for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
            (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
            days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }
        var dayContainer = createElement("div", "dayContainer");
        dayContainer.appendChild(days);
        return dayContainer;
    }
    function buildDays() {
        if (self.daysContainer === undefined) {
            return;
        }
        clearNode(self.daysContainer);
        if (self.weekNumbers)
            clearNode(self.weekNumbers);
        var frag = document.createDocumentFragment();
        for (var i = 0; i < self.config.showMonths; i++) {
            var d = new Date(self.currentYear, self.currentMonth, 1);
            d.setMonth(self.currentMonth + i);
            frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
        }
        self.daysContainer.appendChild(frag);
        self.days = self.daysContainer.firstChild;
        if (self.config.mode === "range" && self.selectedDates.length === 1) {
            onMouseOver();
        }
    }
    function buildMonthSwitch() {
        if (self.config.showMonths > 1 ||
            self.config.monthSelectorType !== "dropdown")
            return;
        var shouldBuildMonth = function (month) {
            if (self.config.minDate !== undefined &&
                self.currentYear === self.config.minDate.getFullYear() &&
                month < self.config.minDate.getMonth()) {
                return false;
            }
            return !(self.config.maxDate !== undefined &&
                self.currentYear === self.config.maxDate.getFullYear() &&
                month > self.config.maxDate.getMonth());
        };
        self.monthsDropdownContainer.tabIndex = -1;
        self.monthsDropdownContainer.innerHTML = "";
        for (var i = 0; i < 12; i++) {
            if (!shouldBuildMonth(i))
                continue;
            var month = createElement("option", "flatpickr-monthDropdown-month");
            month.value = new Date(self.currentYear, i).getMonth().toString();
            month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
            month.tabIndex = -1;
            if (self.currentMonth === i) {
                month.selected = true;
            }
            self.monthsDropdownContainer.appendChild(month);
        }
    }
    function buildMonth() {
        var container = createElement("div", "flatpickr-month");
        var monthNavFragment = window.document.createDocumentFragment();
        var monthElement;
        if (self.config.showMonths > 1 ||
            self.config.monthSelectorType === "static") {
            monthElement = createElement("span", "cur-month");
        }
        else {
            self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
            self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
            bind(self.monthsDropdownContainer, "change", function (e) {
                var target = getEventTarget(e);
                var selectedMonth = parseInt(target.value, 10);
                self.changeMonth(selectedMonth - self.currentMonth);
                triggerEvent("onMonthChange");
            });
            buildMonthSwitch();
            monthElement = self.monthsDropdownContainer;
        }
        var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
        var yearElement = yearInput.getElementsByTagName("input")[0];
        yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
        if (self.config.minDate) {
            yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
        }
        if (self.config.maxDate) {
            yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
            yearElement.disabled =
                !!self.config.minDate &&
                    self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }
        var currentMonth = createElement("div", "flatpickr-current-month");
        currentMonth.appendChild(monthElement);
        currentMonth.appendChild(yearInput);
        monthNavFragment.appendChild(currentMonth);
        container.appendChild(monthNavFragment);
        return {
            container: container,
            yearElement: yearElement,
            monthElement: monthElement,
        };
    }
    function buildMonths() {
        clearNode(self.monthNav);
        self.monthNav.appendChild(self.prevMonthNav);
        if (self.config.showMonths) {
            self.yearElements = [];
            self.monthElements = [];
        }
        for (var m = self.config.showMonths; m--;) {
            var month = buildMonth();
            self.yearElements.push(month.yearElement);
            self.monthElements.push(month.monthElement);
            self.monthNav.appendChild(month.container);
        }
        self.monthNav.appendChild(self.nextMonthNav);
    }
    function buildMonthNav() {
        self.monthNav = createElement("div", "flatpickr-months");
        self.yearElements = [];
        self.monthElements = [];
        self.prevMonthNav = createElement("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;
        self.nextMonthNav = createElement("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;
        buildMonths();
        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: function () { return self.__hidePrevMonthArrow; },
            set: function (bool) {
                if (self.__hidePrevMonthArrow !== bool) {
                    toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                    self.__hidePrevMonthArrow = bool;
                }
            },
        });
        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: function () { return self.__hideNextMonthArrow; },
            set: function (bool) {
                if (self.__hideNextMonthArrow !== bool) {
                    toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                    self.__hideNextMonthArrow = bool;
                }
            },
        });
        self.currentYearElement = self.yearElements[0];
        updateNavigationCurrentMonth();
        return self.monthNav;
    }
    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar)
            self.calendarContainer.classList.add("noCalendar");
        var defaults = getDefaultHours(self.config);
        self.timeContainer = createElement("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        var separator = createElement("span", "flatpickr-time-separator", ":");
        var hourInput = createNumberInput("flatpickr-hour", {
            "aria-label": self.l10n.hourAriaLabel,
        });
        self.hourElement = hourInput.getElementsByTagName("input")[0];
        var minuteInput = createNumberInput("flatpickr-minute", {
            "aria-label": self.l10n.minuteAriaLabel,
        });
        self.minuteElement = minuteInput.getElementsByTagName("input")[0];
        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
        self.hourElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getHours()
            : self.config.time_24hr
                ? defaults.hours
                : military2ampm(defaults.hours));
        self.minuteElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getMinutes()
            : defaults.minutes);
        self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
        self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
        self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
        self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
        self.hourElement.setAttribute("maxlength", "2");
        self.minuteElement.setAttribute("min", "0");
        self.minuteElement.setAttribute("max", "59");
        self.minuteElement.setAttribute("maxlength", "2");
        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);
        if (self.config.time_24hr)
            self.timeContainer.classList.add("time24hr");
        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");
            var secondInput = createNumberInput("flatpickr-second");
            self.secondElement = secondInput.getElementsByTagName("input")[0];
            self.secondElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getSeconds()
                : defaults.seconds);
            self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
            self.secondElement.setAttribute("min", "0");
            self.secondElement.setAttribute("max", "59");
            self.secondElement.setAttribute("maxlength", "2");
            self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }
        if (!self.config.time_24hr) {
            self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                ? self.hourElement.value
                : self.config.defaultHour) > 11)]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }
        return self.timeContainer;
    }
    function buildWeekdays() {
        if (!self.weekdayContainer)
            self.weekdayContainer = createElement("div", "flatpickr-weekdays");
        else
            clearNode(self.weekdayContainer);
        for (var i = self.config.showMonths; i--;) {
            var container = createElement("div", "flatpickr-weekdaycontainer");
            self.weekdayContainer.appendChild(container);
        }
        updateWeekdays();
        return self.weekdayContainer;
    }
    function updateWeekdays() {
        if (!self.weekdayContainer) {
            return;
        }
        var firstDayOfWeek = self.l10n.firstDayOfWeek;
        var weekdays = __spreadArrays(self.l10n.weekdays.shorthand);
        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
        }
        for (var i = self.config.showMonths; i--;) {
            self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
        }
    }
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        var weekWrapper = createElement("div", "flatpickr-weekwrapper");
        weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        var weekNumbers = createElement("div", "flatpickr-weeks");
        weekWrapper.appendChild(weekNumbers);
        return {
            weekWrapper: weekWrapper,
            weekNumbers: weekNumbers,
        };
    }
    function changeMonth(value, isOffset) {
        if (isOffset === void 0) { isOffset = true; }
        var delta = isOffset ? value : value - self.currentMonth;
        if ((delta < 0 && self._hidePrevMonthArrow === true) ||
            (delta > 0 && self._hideNextMonthArrow === true))
            return;
        self.currentMonth += delta;
        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
        buildDays();
        triggerEvent("onMonthChange");
        updateNavigationCurrentMonth();
    }
    function clear(triggerChangeEvent, toInitial) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        if (toInitial === void 0) { toInitial = true; }
        self.input.value = "";
        if (self.altInput !== undefined)
            self.altInput.value = "";
        if (self.mobileInput !== undefined)
            self.mobileInput.value = "";
        self.selectedDates = [];
        self.latestSelectedDateObj = undefined;
        if (toInitial === true) {
            self.currentYear = self._initialDate.getFullYear();
            self.currentMonth = self._initialDate.getMonth();
        }
        if (self.config.enableTime === true) {
            var _a = getDefaultHours(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
            setHours(hours, minutes, seconds);
        }
        self.redraw();
        if (triggerChangeEvent)
            triggerEvent("onChange");
    }
    function close() {
        self.isOpen = false;
        if (!self.isMobile) {
            if (self.calendarContainer !== undefined) {
                self.calendarContainer.classList.remove("open");
            }
            if (self._input !== undefined) {
                self._input.classList.remove("active");
            }
        }
        triggerEvent("onClose");
    }
    function destroy() {
        if (self.config !== undefined)
            triggerEvent("onDestroy");
        for (var i = self._handlers.length; i--;) {
            self._handlers[i].remove();
        }
        self._handlers = [];
        if (self.mobileInput) {
            if (self.mobileInput.parentNode)
                self.mobileInput.parentNode.removeChild(self.mobileInput);
            self.mobileInput = undefined;
        }
        else if (self.calendarContainer && self.calendarContainer.parentNode) {
            if (self.config.static && self.calendarContainer.parentNode) {
                var wrapper = self.calendarContainer.parentNode;
                wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                if (wrapper.parentNode) {
                    while (wrapper.firstChild)
                        wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                }
            }
            else
                self.calendarContainer.parentNode.removeChild(self.calendarContainer);
        }
        if (self.altInput) {
            self.input.type = "text";
            if (self.altInput.parentNode)
                self.altInput.parentNode.removeChild(self.altInput);
            delete self.altInput;
        }
        if (self.input) {
            self.input.type = self.input._type;
            self.input.classList.remove("flatpickr-input");
            self.input.removeAttribute("readonly");
        }
        [
            "_showTimeInput",
            "latestSelectedDateObj",
            "_hideNextMonthArrow",
            "_hidePrevMonthArrow",
            "__hideNextMonthArrow",
            "__hidePrevMonthArrow",
            "isMobile",
            "isOpen",
            "selectedDateElem",
            "minDateHasTime",
            "maxDateHasTime",
            "days",
            "daysContainer",
            "_input",
            "_positionElement",
            "innerContainer",
            "rContainer",
            "monthNav",
            "todayDateElem",
            "calendarContainer",
            "weekdayContainer",
            "prevMonthNav",
            "nextMonthNav",
            "monthsDropdownContainer",
            "currentMonthElement",
            "currentYearElement",
            "navigationCurrentMonth",
            "selectedDateElem",
            "config",
        ].forEach(function (k) {
            try {
                delete self[k];
            }
            catch (_) { }
        });
    }
    function isCalendarElem(elem) {
        return self.calendarContainer.contains(elem);
    }
    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            var eventTarget_1 = getEventTarget(e);
            var isCalendarElement = isCalendarElem(eventTarget_1);
            var isInput = eventTarget_1 === self.input ||
                eventTarget_1 === self.altInput ||
                self.element.contains(eventTarget_1) ||
                (e.path &&
                    e.path.indexOf &&
                    (~e.path.indexOf(self.input) ||
                        ~e.path.indexOf(self.altInput)));
            var lostFocus = !isInput &&
                !isCalendarElement &&
                !isCalendarElem(e.relatedTarget);
            var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                return elem.contains(eventTarget_1);
            });
            if (lostFocus && isIgnored) {
                if (self.config.allowInput) {
                    self.setDate(self._input.value, false, self.config.altInput
                        ? self.config.altFormat
                        : self.config.dateFormat);
                }
                if (self.timeContainer !== undefined &&
                    self.minuteElement !== undefined &&
                    self.hourElement !== undefined &&
                    self.input.value !== "" &&
                    self.input.value !== undefined) {
                    updateTime();
                }
                self.close();
                if (self.config &&
                    self.config.mode === "range" &&
                    self.selectedDates.length === 1)
                    self.clear(false);
            }
        }
    }
    function changeYear(newYear) {
        if (!newYear ||
            (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
            (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
            return;
        var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
        self.currentYear = newYearNum || self.currentYear;
        if (self.config.maxDate &&
            self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        }
        else if (self.config.minDate &&
            self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }
        if (isNewYear) {
            self.redraw();
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
    }
    function isEnabled(date, timeless) {
        var _a;
        if (timeless === void 0) { timeless = true; }
        var dateToCheck = self.parseDate(date, undefined, timeless);
        if ((self.config.minDate &&
            dateToCheck &&
            compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
            (self.config.maxDate &&
                dateToCheck &&
                compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
            return false;
        if (!self.config.enable && self.config.disable.length === 0)
            return true;
        if (dateToCheck === undefined)
            return false;
        var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
        for (var i = 0, d = void 0; i < array.length; i++) {
            d = array[i];
            if (typeof d === "function" &&
                d(dateToCheck))
                return bool;
            else if (d instanceof Date &&
                dateToCheck !== undefined &&
                d.getTime() === dateToCheck.getTime())
                return bool;
            else if (typeof d === "string") {
                var parsed = self.parseDate(d, undefined, true);
                return parsed && parsed.getTime() === dateToCheck.getTime()
                    ? bool
                    : !bool;
            }
            else if (typeof d === "object" &&
                dateToCheck !== undefined &&
                d.from &&
                d.to &&
                dateToCheck.getTime() >= d.from.getTime() &&
                dateToCheck.getTime() <= d.to.getTime())
                return bool;
        }
        return !bool;
    }
    function isInView(elem) {
        if (self.daysContainer !== undefined)
            return (elem.className.indexOf("hidden") === -1 &&
                elem.className.indexOf("flatpickr-disabled") === -1 &&
                self.daysContainer.contains(elem));
        return false;
    }
    function onBlur(e) {
        var isInput = e.target === self._input;
        var valueChanged = self._input.value.trimEnd() !== getDateStr();
        if (isInput &&
            valueChanged &&
            !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
            self.setDate(self._input.value, true, e.target === self.altInput
                ? self.config.altFormat
                : self.config.dateFormat);
        }
    }
    function onKeyDown(e) {
        var eventTarget = getEventTarget(e);
        var isInput = self.config.wrap
            ? element.contains(eventTarget)
            : eventTarget === self._input;
        var allowInput = self.config.allowInput;
        var allowKeydown = self.isOpen && (!allowInput || !isInput);
        var allowInlineKeydown = self.config.inline && isInput && !allowInput;
        if (e.keyCode === 13 && isInput) {
            if (allowInput) {
                self.setDate(self._input.value, true, eventTarget === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
                self.close();
                return eventTarget.blur();
            }
            else {
                self.open();
            }
        }
        else if (isCalendarElem(eventTarget) ||
            allowKeydown ||
            allowInlineKeydown) {
            var isTimeObj = !!self.timeContainer &&
                self.timeContainer.contains(eventTarget);
            switch (e.keyCode) {
                case 13:
                    if (isTimeObj) {
                        e.preventDefault();
                        updateTime();
                        focusAndClose();
                    }
                    else
                        selectDate(e);
                    break;
                case 27:
                    e.preventDefault();
                    focusAndClose();
                    break;
                case 8:
                case 46:
                    if (isInput && !self.config.allowInput) {
                        e.preventDefault();
                        self.clear();
                    }
                    break;
                case 37:
                case 39:
                    if (!isTimeObj && !isInput) {
                        e.preventDefault();
                        var activeElement = getClosestActiveElement();
                        if (self.daysContainer !== undefined &&
                            (allowInput === false ||
                                (activeElement && isInView(activeElement)))) {
                            var delta_1 = e.keyCode === 39 ? 1 : -1;
                            if (!e.ctrlKey)
                                focusOnDay(undefined, delta_1);
                            else {
                                e.stopPropagation();
                                changeMonth(delta_1);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            }
                        }
                    }
                    else if (self.hourElement)
                        self.hourElement.focus();
                    break;
                case 38:
                case 40:
                    e.preventDefault();
                    var delta = e.keyCode === 40 ? 1 : -1;
                    if ((self.daysContainer &&
                        eventTarget.$i !== undefined) ||
                        eventTarget === self.input ||
                        eventTarget === self.altInput) {
                        if (e.ctrlKey) {
                            e.stopPropagation();
                            changeYear(self.currentYear - delta);
                            focusOnDay(getFirstAvailableDay(1), 0);
                        }
                        else if (!isTimeObj)
                            focusOnDay(undefined, delta * 7);
                    }
                    else if (eventTarget === self.currentYearElement) {
                        changeYear(self.currentYear - delta);
                    }
                    else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement)
                            self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;
                case 9:
                    if (isTimeObj) {
                        var elems = [
                            self.hourElement,
                            self.minuteElement,
                            self.secondElement,
                            self.amPM,
                        ]
                            .concat(self.pluginElements)
                            .filter(function (x) { return x; });
                        var i = elems.indexOf(eventTarget);
                        if (i !== -1) {
                            var target = elems[i + (e.shiftKey ? -1 : 1)];
                            e.preventDefault();
                            (target || self._input).focus();
                        }
                    }
                    else if (!self.config.noCalendar &&
                        self.daysContainer &&
                        self.daysContainer.contains(eventTarget) &&
                        e.shiftKey) {
                        e.preventDefault();
                        self._input.focus();
                    }
                    break;
            }
        }
        if (self.amPM !== undefined && eventTarget === self.amPM) {
            switch (e.key) {
                case self.l10n.amPM[0].charAt(0):
                case self.l10n.amPM[0].charAt(0).toLowerCase():
                    self.amPM.textContent = self.l10n.amPM[0];
                    setHoursFromInputs();
                    updateValue();
                    break;
                case self.l10n.amPM[1].charAt(0):
                case self.l10n.amPM[1].charAt(0).toLowerCase():
                    self.amPM.textContent = self.l10n.amPM[1];
                    setHoursFromInputs();
                    updateValue();
                    break;
            }
        }
        if (isInput || isCalendarElem(eventTarget)) {
            triggerEvent("onKeyDown", e);
        }
    }
    function onMouseOver(elem, cellClass) {
        if (cellClass === void 0) { cellClass = "flatpickr-day"; }
        if (self.selectedDates.length !== 1 ||
            (elem &&
                (!elem.classList.contains(cellClass) ||
                    elem.classList.contains("flatpickr-disabled"))))
            return;
        var hoverDate = elem
            ? elem.dateObj.getTime()
            : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
        var containsDisabled = false;
        var minRange = 0, maxRange = 0;
        for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
            if (!isEnabled(new Date(t), true)) {
                containsDisabled =
                    containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                if (t < initialDate && (!minRange || t > minRange))
                    minRange = t;
                else if (t > initialDate && (!maxRange || t < maxRange))
                    maxRange = t;
            }
        }
        var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
        hoverableCells.forEach(function (dayElem) {
            var date = dayElem.dateObj;
            var timestamp = date.getTime();
            var outOfRange = (minRange > 0 && timestamp < minRange) ||
                (maxRange > 0 && timestamp > maxRange);
            if (outOfRange) {
                dayElem.classList.add("notAllowed");
                ["inRange", "startRange", "endRange"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                return;
            }
            else if (containsDisabled && !outOfRange)
                return;
            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                dayElem.classList.remove(c);
            });
            if (elem !== undefined) {
                elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                    ? "startRange"
                    : "endRange");
                if (initialDate < hoverDate && timestamp === initialDate)
                    dayElem.classList.add("startRange");
                else if (initialDate > hoverDate && timestamp === initialDate)
                    dayElem.classList.add("endRange");
                if (timestamp >= minRange &&
                    (maxRange === 0 || timestamp <= maxRange) &&
                    isBetween(timestamp, initialDate, hoverDate))
                    dayElem.classList.add("inRange");
            }
        });
    }
    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline)
            positionCalendar();
    }
    function open(e, positionElement) {
        if (positionElement === void 0) { positionElement = self._positionElement; }
        if (self.isMobile === true) {
            if (e) {
                e.preventDefault();
                var eventTarget = getEventTarget(e);
                if (eventTarget) {
                    eventTarget.blur();
                }
            }
            if (self.mobileInput !== undefined) {
                self.mobileInput.focus();
                self.mobileInput.click();
            }
            triggerEvent("onOpen");
            return;
        }
        else if (self._input.disabled || self.config.inline) {
            return;
        }
        var wasOpen = self.isOpen;
        self.isOpen = true;
        if (!wasOpen) {
            self.calendarContainer.classList.add("open");
            self._input.classList.add("active");
            triggerEvent("onOpen");
            positionCalendar(positionElement);
        }
        if (self.config.enableTime === true && self.config.noCalendar === true) {
            if (self.config.allowInput === false &&
                (e === undefined ||
                    !self.timeContainer.contains(e.relatedTarget))) {
                setTimeout(function () { return self.hourElement.select(); }, 50);
            }
        }
    }
    function minMaxDateSetter(type) {
        return function (date) {
            var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
            var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
            if (dateObj !== undefined) {
                self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                    dateObj.getHours() > 0 ||
                        dateObj.getMinutes() > 0 ||
                        dateObj.getSeconds() > 0;
            }
            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                if (!self.selectedDates.length && type === "min")
                    setHoursFromDate(dateObj);
                updateValue();
            }
            if (self.daysContainer) {
                redraw();
                if (dateObj !== undefined)
                    self.currentYearElement[type] = dateObj.getFullYear().toString();
                else
                    self.currentYearElement.removeAttribute(type);
                self.currentYearElement.disabled =
                    !!inverseDateObj &&
                        dateObj !== undefined &&
                        inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }
    function parseConfig() {
        var boolOpts = [
            "wrap",
            "weekNumbers",
            "allowInput",
            "allowInvalidPreload",
            "clickOpens",
            "time_24hr",
            "enableTime",
            "noCalendar",
            "altInput",
            "shorthandCurrentMonth",
            "inline",
            "static",
            "enableSeconds",
            "disableMobile",
        ];
        var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
        var formats = {};
        self.config.parseDate = userConfig.parseDate;
        self.config.formatDate = userConfig.formatDate;
        Object.defineProperty(self.config, "enable", {
            get: function () { return self.config._enable; },
            set: function (dates) {
                self.config._enable = parseDateRules(dates);
            },
        });
        Object.defineProperty(self.config, "disable", {
            get: function () { return self.config._disable; },
            set: function (dates) {
                self.config._disable = parseDateRules(dates);
            },
        });
        var timeMode = userConfig.mode === "time";
        if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
            var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
            formats.dateFormat =
                userConfig.noCalendar || timeMode
                    ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                    : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
        }
        if (userConfig.altInput &&
            (userConfig.enableTime || timeMode) &&
            !userConfig.altFormat) {
            var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
            formats.altFormat =
                userConfig.noCalendar || timeMode
                    ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                    : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
        }
        Object.defineProperty(self.config, "minDate", {
            get: function () { return self.config._minDate; },
            set: minMaxDateSetter("min"),
        });
        Object.defineProperty(self.config, "maxDate", {
            get: function () { return self.config._maxDate; },
            set: minMaxDateSetter("max"),
        });
        var minMaxTimeSetter = function (type) { return function (val) {
            self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
        }; };
        Object.defineProperty(self.config, "minTime", {
            get: function () { return self.config._minTime; },
            set: minMaxTimeSetter("min"),
        });
        Object.defineProperty(self.config, "maxTime", {
            get: function () { return self.config._maxTime; },
            set: minMaxTimeSetter("max"),
        });
        if (userConfig.mode === "time") {
            self.config.noCalendar = true;
            self.config.enableTime = true;
        }
        Object.assign(self.config, formats, userConfig);
        for (var i = 0; i < boolOpts.length; i++)
            self.config[boolOpts[i]] =
                self.config[boolOpts[i]] === true ||
                    self.config[boolOpts[i]] === "true";
        HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
            self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
        });
        self.isMobile =
            !self.config.disableMobile &&
                !self.config.inline &&
                self.config.mode === "single" &&
                !self.config.disable.length &&
                !self.config.enable &&
                !self.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        for (var i = 0; i < self.config.plugins.length; i++) {
            var pluginConf = self.config.plugins[i](self) || {};
            for (var key in pluginConf) {
                if (HOOKS.indexOf(key) > -1) {
                    self.config[key] = arrayify(pluginConf[key])
                        .map(bindToInstance)
                        .concat(self.config[key]);
                }
                else if (typeof userConfig[key] === "undefined")
                    self.config[key] = pluginConf[key];
            }
        }
        if (!userConfig.altInputClass) {
            self.config.altInputClass =
                getInputElem().className + " " + self.config.altInputClass;
        }
        triggerEvent("onParseConfig");
    }
    function getInputElem() {
        return self.config.wrap
            ? element.querySelector("[data-input]")
            : element;
    }
    function setupLocale() {
        if (typeof self.config.locale !== "object" &&
            typeof flatpickr.l10ns[self.config.locale] === "undefined")
            self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
        self.l10n = __assign(__assign({}, flatpickr.l10ns.default), (typeof self.config.locale === "object"
            ? self.config.locale
            : self.config.locale !== "default"
                ? flatpickr.l10ns[self.config.locale]
                : undefined));
        tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
        tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
        tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
        tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
        tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
        var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
        if (userConfig.time_24hr === undefined &&
            flatpickr.defaultConfig.time_24hr === undefined) {
            self.config.time_24hr = self.l10n.time_24hr;
        }
        self.formatDate = createDateFormatter(self);
        self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
    }
    function positionCalendar(customPositionElement) {
        if (typeof self.config.position === "function") {
            return void self.config.position(self, customPositionElement);
        }
        if (self.calendarContainer === undefined)
            return;
        triggerEvent("onPreCalendarPosition");
        var positionElement = customPositionElement || self._positionElement;
        var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
            (configPosVertical !== "below" &&
                distanceFromBottom < calendarHeight &&
                inputBounds.top > calendarHeight);
        var top = window.pageYOffset +
            inputBounds.top +
            (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
        toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
        toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
        if (self.config.inline)
            return;
        var left = window.pageXOffset + inputBounds.left;
        var isCenter = false;
        var isRight = false;
        if (configPosHorizontal === "center") {
            left -= (calendarWidth - inputBounds.width) / 2;
            isCenter = true;
        }
        else if (configPosHorizontal === "right") {
            left -= calendarWidth - inputBounds.width;
            isRight = true;
        }
        toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
        toggleClass(self.calendarContainer, "arrowCenter", isCenter);
        toggleClass(self.calendarContainer, "arrowRight", isRight);
        var right = window.document.body.offsetWidth -
            (window.pageXOffset + inputBounds.right);
        var rightMost = left + calendarWidth > window.document.body.offsetWidth;
        var centerMost = right + calendarWidth > window.document.body.offsetWidth;
        toggleClass(self.calendarContainer, "rightMost", rightMost);
        if (self.config.static)
            return;
        self.calendarContainer.style.top = top + "px";
        if (!rightMost) {
            self.calendarContainer.style.left = left + "px";
            self.calendarContainer.style.right = "auto";
        }
        else if (!centerMost) {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = right + "px";
        }
        else {
            var doc = getDocumentStyleSheet();
            if (doc === undefined)
                return;
            var bodyWidth = window.document.body.offsetWidth;
            var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
            var centerBefore = ".flatpickr-calendar.centerMost:before";
            var centerAfter = ".flatpickr-calendar.centerMost:after";
            var centerIndex = doc.cssRules.length;
            var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
            toggleClass(self.calendarContainer, "rightMost", false);
            toggleClass(self.calendarContainer, "centerMost", true);
            doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
            self.calendarContainer.style.left = centerLeft + "px";
            self.calendarContainer.style.right = "auto";
        }
    }
    function getDocumentStyleSheet() {
        var editableSheet = null;
        for (var i = 0; i < document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
            if (!sheet.cssRules)
                continue;
            editableSheet = sheet;
            break;
        }
        return editableSheet != null ? editableSheet : createStyleSheet();
    }
    function createStyleSheet() {
        var style = document.createElement("style");
        document.head.appendChild(style);
        return style.sheet;
    }
    function redraw() {
        if (self.config.noCalendar || self.isMobile)
            return;
        buildMonthSwitch();
        updateNavigationCurrentMonth();
        buildDays();
    }
    function focusAndClose() {
        self._input.focus();
        if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
            navigator.msMaxTouchPoints !== undefined) {
            setTimeout(self.close, 0);
        }
        else {
            self.close();
        }
    }
    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();
        var isSelectable = function (day) {
            return day.classList &&
                day.classList.contains("flatpickr-day") &&
                !day.classList.contains("flatpickr-disabled") &&
                !day.classList.contains("notAllowed");
        };
        var t = findParent(getEventTarget(e), isSelectable);
        if (t === undefined)
            return;
        var target = t;
        var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
        var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
            selectedDate.getMonth() >
                self.currentMonth + self.config.showMonths - 1) &&
            self.config.mode !== "range";
        self.selectedDateElem = target;
        if (self.config.mode === "single")
            self.selectedDates = [selectedDate];
        else if (self.config.mode === "multiple") {
            var selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex)
                self.selectedDates.splice(parseInt(selectedIndex), 1);
            else
                self.selectedDates.push(selectedDate);
        }
        else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2) {
                self.clear(false, false);
            }
            self.latestSelectedDateObj = selectedDate;
            self.selectedDates.push(selectedDate);
            if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        setHoursFromInputs();
        if (shouldChangeMonth) {
            var isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();
            if (isNewYear) {
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            triggerEvent("onMonthChange");
        }
        updateNavigationCurrentMonth();
        buildDays();
        updateValue();
        if (!shouldChangeMonth &&
            self.config.mode !== "range" &&
            self.config.showMonths === 1)
            focusOnDayElem(target);
        else if (self.selectedDateElem !== undefined &&
            self.hourElement === undefined) {
            self.selectedDateElem && self.selectedDateElem.focus();
        }
        if (self.hourElement !== undefined)
            self.hourElement !== undefined && self.hourElement.focus();
        if (self.config.closeOnSelect) {
            var single = self.config.mode === "single" && !self.config.enableTime;
            var range = self.config.mode === "range" &&
                self.selectedDates.length === 2 &&
                !self.config.enableTime;
            if (single || range) {
                focusAndClose();
            }
        }
        triggerChange();
    }
    var CALLBACKS = {
        locale: [setupLocale, updateWeekdays],
        showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
        minDate: [jumpToDate],
        maxDate: [jumpToDate],
        positionElement: [updatePositionElement],
        clickOpens: [
            function () {
                if (self.config.clickOpens === true) {
                    bind(self._input, "focus", self.open);
                    bind(self._input, "click", self.open);
                }
                else {
                    self._input.removeEventListener("focus", self.open);
                    self._input.removeEventListener("click", self.open);
                }
            },
        ],
    };
    function set(option, value) {
        if (option !== null && typeof option === "object") {
            Object.assign(self.config, option);
            for (var key in option) {
                if (CALLBACKS[key] !== undefined)
                    CALLBACKS[key].forEach(function (x) { return x(); });
            }
        }
        else {
            self.config[option] = value;
            if (CALLBACKS[option] !== undefined)
                CALLBACKS[option].forEach(function (x) { return x(); });
            else if (HOOKS.indexOf(option) > -1)
                self.config[option] = arrayify(value);
        }
        self.redraw();
        updateValue(true);
    }
    function setSelectedDate(inputDate, format) {
        var dates = [];
        if (inputDate instanceof Array)
            dates = inputDate.map(function (d) { return self.parseDate(d, format); });
        else if (inputDate instanceof Date || typeof inputDate === "number")
            dates = [self.parseDate(inputDate, format)];
        else if (typeof inputDate === "string") {
            switch (self.config.mode) {
                case "single":
                case "time":
                    dates = [self.parseDate(inputDate, format)];
                    break;
                case "multiple":
                    dates = inputDate
                        .split(self.config.conjunction)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                case "range":
                    dates = inputDate
                        .split(self.l10n.rangeSeparator)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
            }
        }
        else
            self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
        self.selectedDates = (self.config.allowInvalidPreload
            ? dates
            : dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); }));
        if (self.config.mode === "range")
            self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
    }
    function setDate(date, triggerChange, format) {
        if (triggerChange === void 0) { triggerChange = false; }
        if (format === void 0) { format = self.config.dateFormat; }
        if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
            return self.clear(triggerChange);
        setSelectedDate(date, format);
        self.latestSelectedDateObj =
            self.selectedDates[self.selectedDates.length - 1];
        self.redraw();
        jumpToDate(undefined, triggerChange);
        setHoursFromDate();
        if (self.selectedDates.length === 0) {
            self.clear(false);
        }
        updateValue(triggerChange);
        if (triggerChange)
            triggerEvent("onChange");
    }
    function parseDateRules(arr) {
        return arr
            .slice()
            .map(function (rule) {
            if (typeof rule === "string" ||
                typeof rule === "number" ||
                rule instanceof Date) {
                return self.parseDate(rule, undefined, true);
            }
            else if (rule &&
                typeof rule === "object" &&
                rule.from &&
                rule.to)
                return {
                    from: self.parseDate(rule.from, undefined),
                    to: self.parseDate(rule.to, undefined),
                };
            return rule;
        })
            .filter(function (x) { return x; });
    }
    function setupDates() {
        self.selectedDates = [];
        self.now = self.parseDate(self.config.now) || new Date();
        var preloadedDate = self.config.defaultDate ||
            ((self.input.nodeName === "INPUT" ||
                self.input.nodeName === "TEXTAREA") &&
                self.input.placeholder &&
                self.input.value === self.input.placeholder
                ? null
                : self.input.value);
        if (preloadedDate)
            setSelectedDate(preloadedDate, self.config.dateFormat);
        self._initialDate =
            self.selectedDates.length > 0
                ? self.selectedDates[0]
                : self.config.minDate &&
                    self.config.minDate.getTime() > self.now.getTime()
                    ? self.config.minDate
                    : self.config.maxDate &&
                        self.config.maxDate.getTime() < self.now.getTime()
                        ? self.config.maxDate
                        : self.now;
        self.currentYear = self._initialDate.getFullYear();
        self.currentMonth = self._initialDate.getMonth();
        if (self.selectedDates.length > 0)
            self.latestSelectedDateObj = self.selectedDates[0];
        if (self.config.minTime !== undefined)
            self.config.minTime = self.parseDate(self.config.minTime, "H:i");
        if (self.config.maxTime !== undefined)
            self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
        self.minDateHasTime =
            !!self.config.minDate &&
                (self.config.minDate.getHours() > 0 ||
                    self.config.minDate.getMinutes() > 0 ||
                    self.config.minDate.getSeconds() > 0);
        self.maxDateHasTime =
            !!self.config.maxDate &&
                (self.config.maxDate.getHours() > 0 ||
                    self.config.maxDate.getMinutes() > 0 ||
                    self.config.maxDate.getSeconds() > 0);
    }
    function setupInputs() {
        self.input = getInputElem();
        if (!self.input) {
            self.config.errorHandler(new Error("Invalid input element specified"));
            return;
        }
        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");
        self._input = self.input;
        if (self.config.altInput) {
            self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
            self._input = self.altInput;
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.disabled = self.input.disabled;
            self.altInput.required = self.input.required;
            self.altInput.tabIndex = self.input.tabIndex;
            self.altInput.type = "text";
            self.input.setAttribute("type", "hidden");
            if (!self.config.static && self.input.parentNode)
                self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }
        if (!self.config.allowInput)
            self._input.setAttribute("readonly", "readonly");
        updatePositionElement();
    }
    function updatePositionElement() {
        self._positionElement = self.config.positionElement || self._input;
    }
    function setupMobile() {
        var inputType = self.config.enableTime
            ? self.config.noCalendar
                ? "time"
                : "datetime-local"
            : "date";
        self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.required = self.input.required;
        self.mobileInput.placeholder = self.input.placeholder;
        self.mobileFormatStr =
            inputType === "datetime-local"
                ? "Y-m-d\\TH:i:S"
                : inputType === "date"
                    ? "Y-m-d"
                    : "H:i:S";
        if (self.selectedDates.length > 0) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }
        if (self.config.minDate)
            self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
        if (self.config.maxDate)
            self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
        if (self.input.getAttribute("step"))
            self.mobileInput.step = String(self.input.getAttribute("step"));
        self.input.type = "hidden";
        if (self.altInput !== undefined)
            self.altInput.type = "hidden";
        try {
            if (self.input.parentNode)
                self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        }
        catch (_a) { }
        bind(self.mobileInput, "change", function (e) {
            self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
            triggerEvent("onChange");
            triggerEvent("onClose");
        });
    }
    function toggle(e) {
        if (self.isOpen === true)
            return self.close();
        self.open(e);
    }
    function triggerEvent(event, data) {
        if (self.config === undefined)
            return;
        var hooks = self.config[event];
        if (hooks !== undefined && hooks.length > 0) {
            for (var i = 0; hooks[i] && i < hooks.length; i++)
                hooks[i](self.selectedDates, self.input.value, self, data);
        }
        if (event === "onChange") {
            self.input.dispatchEvent(createEvent("change"));
            self.input.dispatchEvent(createEvent("input"));
        }
    }
    function createEvent(name) {
        var e = document.createEvent("Event");
        e.initEvent(name, true, true);
        return e;
    }
    function isDateSelected(date) {
        for (var i = 0; i < self.selectedDates.length; i++) {
            var selectedDate = self.selectedDates[i];
            if (selectedDate instanceof Date &&
                compareDates(selectedDate, date) === 0)
                return "" + i;
        }
        return false;
    }
    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2)
            return false;
        return (compareDates(date, self.selectedDates[0]) >= 0 &&
            compareDates(date, self.selectedDates[1]) <= 0);
    }
    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav)
            return;
        self.yearElements.forEach(function (yearElement, i) {
            var d = new Date(self.currentYear, self.currentMonth, 1);
            d.setMonth(self.currentMonth + i);
            if (self.config.showMonths > 1 ||
                self.config.monthSelectorType === "static") {
                self.monthElements[i].textContent =
                    monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
            }
            else {
                self.monthsDropdownContainer.value = d.getMonth().toString();
            }
            yearElement.value = d.getFullYear().toString();
        });
        self._hidePrevMonthArrow =
            self.config.minDate !== undefined &&
                (self.currentYear === self.config.minDate.getFullYear()
                    ? self.currentMonth <= self.config.minDate.getMonth()
                    : self.currentYear < self.config.minDate.getFullYear());
        self._hideNextMonthArrow =
            self.config.maxDate !== undefined &&
                (self.currentYear === self.config.maxDate.getFullYear()
                    ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                    : self.currentYear > self.config.maxDate.getFullYear());
    }
    function getDateStr(specificFormat) {
        var format = specificFormat ||
            (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
        return self.selectedDates
            .map(function (dObj) { return self.formatDate(dObj, format); })
            .filter(function (d, i, arr) {
            return self.config.mode !== "range" ||
                self.config.enableTime ||
                arr.indexOf(d) === i;
        })
            .join(self.config.mode !== "range"
            ? self.config.conjunction
            : self.l10n.rangeSeparator);
    }
    function updateValue(triggerChange) {
        if (triggerChange === void 0) { triggerChange = true; }
        if (self.mobileInput !== undefined && self.mobileFormatStr) {
            self.mobileInput.value =
                self.latestSelectedDateObj !== undefined
                    ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                    : "";
        }
        self.input.value = getDateStr(self.config.dateFormat);
        if (self.altInput !== undefined) {
            self.altInput.value = getDateStr(self.config.altFormat);
        }
        if (triggerChange !== false)
            triggerEvent("onValueUpdate");
    }
    function onMonthNavClick(e) {
        var eventTarget = getEventTarget(e);
        var isPrevMonth = self.prevMonthNav.contains(eventTarget);
        var isNextMonth = self.nextMonthNav.contains(eventTarget);
        if (isPrevMonth || isNextMonth) {
            changeMonth(isPrevMonth ? -1 : 1);
        }
        else if (self.yearElements.indexOf(eventTarget) >= 0) {
            eventTarget.select();
        }
        else if (eventTarget.classList.contains("arrowUp")) {
            self.changeYear(self.currentYear + 1);
        }
        else if (eventTarget.classList.contains("arrowDown")) {
            self.changeYear(self.currentYear - 1);
        }
    }
    function timeWrapper(e) {
        e.preventDefault();
        var isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
        if (self.amPM !== undefined && eventTarget === self.amPM) {
            self.amPM.textContent =
                self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
        }
        var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
            (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
        var newValue = curValue + step * delta;
        if (typeof input.value !== "undefined" && input.value.length === 2) {
            var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
            if (newValue < min) {
                newValue =
                    max +
                        newValue +
                        int(!isHourElem) +
                        (int(isHourElem) && int(!self.amPM));
                if (isMinuteElem)
                    incrementNumInput(undefined, -1, self.hourElement);
            }
            else if (newValue > max) {
                newValue =
                    input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                if (isMinuteElem)
                    incrementNumInput(undefined, 1, self.hourElement);
            }
            if (self.amPM &&
                isHourElem &&
                (step === 1
                    ? newValue + curValue === 23
                    : Math.abs(newValue - curValue) > step)) {
                self.amPM.textContent =
                    self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
            }
            input.value = pad(newValue);
        }
    }
    init();
    return self;
}
function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice
        .call(nodeList)
        .filter(function (x) { return x instanceof HTMLElement; });
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        try {
            if (node.getAttribute("data-fp-omit") !== null)
                continue;
            if (node._flatpickr !== undefined) {
                node._flatpickr.destroy();
                node._flatpickr = undefined;
            }
            node._flatpickr = FlatpickrInstance(node, config || {});
            instances.push(node._flatpickr);
        }
        catch (e) {
            console.error(e);
        }
    }
    return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined" &&
    typeof HTMLCollection !== "undefined" &&
    typeof NodeList !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}
var flatpickr = function (selector, config) {
    if (typeof selector === "string") {
        return _flatpickr(window.document.querySelectorAll(selector), config);
    }
    else if (selector instanceof Node) {
        return _flatpickr([selector], config);
    }
    else {
        return _flatpickr(selector, config);
    }
};
flatpickr.defaultConfig = {};
flatpickr.l10ns = {
    en: __assign({}, english),
    default: __assign({}, english),
};
flatpickr.localize = function (l10n) {
    flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
};
flatpickr.setDefaults = function (config) {
    flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
};
flatpickr.parseDate = createDateParser({});
flatpickr.formatDate = createDateFormatter({});
flatpickr.compareDates = compareDates;
if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}
Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
if (typeof window !== "undefined") {
    window.flatpickr = flatpickr;
}

var index$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': flatpickr
});

var pt = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  factory(exports) ;
}(commonjsGlobal, (function (exports) {
  var fp = typeof window !== "undefined" && window.flatpickr !== undefined
      ? window.flatpickr
      : {
          l10ns: {},
      };
  var Portuguese = {
      weekdays: {
          shorthand: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          longhand: [
              "Domingo",
              "Segunda-feira",
              "Terça-feira",
              "Quarta-feira",
              "Quinta-feira",
              "Sexta-feira",
              "Sábado",
          ],
      },
      months: {
          shorthand: [
              "Jan",
              "Fev",
              "Mar",
              "Abr",
              "Mai",
              "Jun",
              "Jul",
              "Ago",
              "Set",
              "Out",
              "Nov",
              "Dez",
          ],
          longhand: [
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
          ],
      },
      rangeSeparator: " até ",
      time_24hr: true,
  };
  fp.l10ns.pt = Portuguese;
  var pt = fp.l10ns;

  exports.Portuguese = Portuguese;
  exports.default = pt;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
});

var pt$1 = /*@__PURE__*/getDefaultExportFromCjs(pt);

var pt$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), pt, {
	'default': pt$1
}));

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$2,
  requires: ['computeStyles']
};

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = isElement(element) ? getWindow(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$1(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$1,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getVariation(placement) {
  return placement.split('-')[1];
}

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = offset + overflow[mainSide];
    var max$1 = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper$1 = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers$1
}); // eslint-disable-next-line import/no-unused-modules

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

var index = /*#__PURE__*/Object.freeze({
	__proto__: null,
	popperGenerator: popperGenerator,
	detectOverflow: detectOverflow,
	createPopperBase: createPopper$2,
	createPopper: createPopper,
	createPopperLite: createPopper$1,
	top: top,
	bottom: bottom,
	right: right,
	left: left,
	auto: auto,
	basePlacements: basePlacements,
	start: start,
	end: end,
	clippingParents: clippingParents,
	viewport: viewport,
	popper: popper,
	reference: reference,
	variationPlacements: variationPlacements,
	placements: placements,
	beforeRead: beforeRead,
	read: read,
	afterRead: afterRead,
	beforeMain: beforeMain,
	main: main,
	afterMain: afterMain,
	beforeWrite: beforeWrite,
	write: write,
	afterWrite: afterWrite,
	modifierPhases: modifierPhases,
	applyStyles: applyStyles$1,
	arrow: arrow$1,
	computeStyles: computeStyles$1,
	eventListeners: eventListeners,
	flip: flip$1,
	hide: hide$1,
	offset: offset$1,
	popperOffsets: popperOffsets$1,
	preventOverflow: preventOverflow$1
});

exports.hydrateApp = hydrateApp;


  /*hydrateAppClosure end*/
  hydrateApp(window, $stencilHydrateOpts, $stencilHydrateResults, $stencilAfterHydrate, $stencilHydrateResolve);
  }

  hydrateAppClosure($stencilWindow);
}

function createWindowFromHtml(e, t) {
 let r = templateWindows.get(t);
 return null == r && (r = new MockWindow(e), templateWindows.set(t, r)), cloneWindow(r);
}

function inspectElement(e, t, r) {
 const s = t.children;
 for (let t = 0, n = s.length; t < n; t++) {
  const n = s[t], o = n.nodeName.toLowerCase();
  if (o.includes("-")) {
   const t = e.components.find((e => e.tag === o));
   null != t && (t.count++, r > t.depth && (t.depth = r));
  } else switch (o) {
  case "a":
   const t = collectAttributes(n);
   t.href = n.href, "string" == typeof t.href && (e.anchors.some((e => e.href === t.href)) || e.anchors.push(t));
   break;

  case "img":
   const r = collectAttributes(n);
   r.src = n.src, "string" == typeof r.src && (e.imgs.some((e => e.src === r.src)) || e.imgs.push(r));
   break;

  case "link":
   const s = collectAttributes(n);
   s.href = n.href, "string" == typeof s.rel && "stylesheet" === s.rel.toLowerCase() && "string" == typeof s.href && (e.styles.some((e => e.link === s.href)) || (delete s.rel, 
   delete s.type, e.styles.push(s)));
   break;

  case "script":
   const o = collectAttributes(n);
   if (n.hasAttribute("src")) o.src = n.src, "string" == typeof o.src && (e.scripts.some((e => e.src === o.src)) || e.scripts.push(o)); else {
    const t = n.getAttribute("data-stencil-static");
    t && e.staticData.push({
     id: t,
     type: n.getAttribute("type"),
     content: n.textContent
    });
   }
  }
  inspectElement(e, n, ++r);
 }
}

function collectAttributes(e) {
 const t = {}, r = e.attributes;
 for (let e = 0, s = r.length; e < s; e++) {
  const s = r.item(e), n = s.nodeName.toLowerCase();
  if (SKIP_ATTRS.has(n)) continue;
  const o = s.nodeValue;
  "class" === n && "" === o || (t[n] = o);
 }
 return t;
}

function patchDomImplementation(e, t) {
 let r;
 if (null != e.defaultView ? (t.destroyWindow = !0, patchWindow(e.defaultView), r = e.defaultView) : (t.destroyWindow = !0, 
 t.destroyDocument = !1, r = new MockWindow(!1)), r.document !== e && (r.document = e), 
 e.defaultView !== r && (e.defaultView = r), "function" != typeof e.documentElement.constructor.prototype.getRootNode && (e.createElement("unknown-element").constructor.prototype.getRootNode = getRootNode), 
 "function" == typeof e.createEvent) {
  const t = e.createEvent("CustomEvent").constructor;
  r.CustomEvent !== t && (r.CustomEvent = t);
 }
 try {
  e.baseURI;
 } catch (t) {
  Object.defineProperty(e, "baseURI", {
   get() {
    const t = e.querySelector("base[href]");
    return t ? new URL(t.getAttribute("href"), r.location.href).href : r.location.href;
   }
  });
 }
 return r;
}

function getRootNode(e) {
 const t = null != e && !0 === e.composed;
 let r = this;
 for (;null != r.parentNode; ) r = r.parentNode, !0 === t && null == r.parentNode && null != r.host && (r = r.host);
 return r;
}

function normalizeHydrateOptions(e) {
 const t = Object.assign({
  serializeToHtml: !1,
  destroyWindow: !1,
  destroyDocument: !1
 }, e || {});
 return "boolean" != typeof t.clientHydrateAnnotations && (t.clientHydrateAnnotations = !0), 
 "boolean" != typeof t.constrainTimeouts && (t.constrainTimeouts = !0), "number" != typeof t.maxHydrateCount && (t.maxHydrateCount = 300), 
 "boolean" != typeof t.runtimeLogging && (t.runtimeLogging = !1), "number" != typeof t.timeout && (t.timeout = 15e3), 
 Array.isArray(t.excludeComponents) ? t.excludeComponents = t.excludeComponents.filter(filterValidTags).map(mapValidTags) : t.excludeComponents = [], 
 Array.isArray(t.staticComponents) ? t.staticComponents = t.staticComponents.filter(filterValidTags).map(mapValidTags) : t.staticComponents = [], 
 t;
}

function filterValidTags(e) {
 return "string" == typeof e && e.includes("-");
}

function mapValidTags(e) {
 return e.trim().toLowerCase();
}

function generateHydrateResults(e) {
 "string" != typeof e.url && (e.url = "https://hydrate.stenciljs.com/"), "string" != typeof e.buildId && (e.buildId = createHydrateBuildId());
 const t = {
  buildId: e.buildId,
  diagnostics: [],
  url: e.url,
  host: null,
  hostname: null,
  href: null,
  pathname: null,
  port: null,
  search: null,
  hash: null,
  html: null,
  httpStatus: null,
  hydratedCount: 0,
  anchors: [],
  components: [],
  imgs: [],
  scripts: [],
  staticData: [],
  styles: [],
  title: null
 };
 try {
  const r = new URL(e.url, "https://hydrate.stenciljs.com/");
  t.url = r.href, t.host = r.host, t.hostname = r.hostname, t.href = r.href, t.port = r.port, 
  t.pathname = r.pathname, t.search = r.search, t.hash = r.hash;
 } catch (e) {
  renderCatchError(t, e);
 }
 return t;
}

function renderBuildDiagnostic(e, t, r, s) {
 const n = {
  level: t,
  type: "build",
  header: r,
  messageText: s,
  relFilePath: null,
  absFilePath: null,
  lines: []
 };
 return e.pathname ? "/" !== e.pathname && (n.header += ": " + e.pathname) : e.url && (n.header += ": " + e.url), 
 e.diagnostics.push(n), n;
}

function renderBuildError(e, t) {
 return renderBuildDiagnostic(e, "error", "Hydrate Error", t);
}

function renderCatchError(e, t) {
 const r = renderBuildError(e, null);
 return null != t && (null != t.stack ? r.messageText = t.stack.toString() : null != t.message ? r.messageText = t.message.toString() : r.messageText = t.toString()), 
 r;
}

function runtimeLog(e, t, r) {
 global.console[t].apply(global.console, [ `[ ${e}  ${t} ] `, ...r ]);
}

function renderToString(e, t) {
 const r = normalizeHydrateOptions(t);
 return r.serializeToHtml = !0, new Promise((t => {
  let s;
  const n = generateHydrateResults(r);
  if (hasError(n.diagnostics)) t(n); else if ("string" == typeof e) try {
   r.destroyWindow = !0, r.destroyDocument = !0, s = new MockWindow(e), render(s, r, n, t);
  } catch (e) {
   s && s.close && s.close(), s = null, renderCatchError(n, e), t(n);
  } else if (isValidDocument(e)) try {
   r.destroyDocument = !1, s = patchDomImplementation(e, r), render(s, r, n, t);
  } catch (e) {
   s && s.close && s.close(), s = null, renderCatchError(n, e), t(n);
  } else renderBuildError(n, 'Invalid html or document. Must be either a valid "html" string, or DOM "document".'), 
  t(n);
 }));
}

function hydrateDocument(e, t) {
 const r = normalizeHydrateOptions(t);
 return r.serializeToHtml = !1, new Promise((t => {
  let s;
  const n = generateHydrateResults(r);
  if (hasError(n.diagnostics)) t(n); else if ("string" == typeof e) try {
   r.destroyWindow = !0, r.destroyDocument = !0, s = new MockWindow(e), render(s, r, n, t);
  } catch (e) {
   s && s.close && s.close(), s = null, renderCatchError(n, e), t(n);
  } else if (isValidDocument(e)) try {
   r.destroyDocument = !1, s = patchDomImplementation(e, r), render(s, r, n, t);
  } catch (e) {
   s && s.close && s.close(), s = null, renderCatchError(n, e), t(n);
  } else renderBuildError(n, 'Invalid html or document. Must be either a valid "html" string, or DOM "document".'), 
  t(n);
 }));
}

function render(e, t, r, s) {
 if (process.__stencilErrors || (process.__stencilErrors = !0, process.on("unhandledRejection", (e => {
  console.log("unhandledRejection", e);
 }))), function n(e, t, r, s) {
  try {
   e.location.href = r.url;
  } catch (e) {
   renderCatchError(s, e);
  }
  if ("string" == typeof r.userAgent) try {
   e.navigator.userAgent = r.userAgent;
  } catch (e) {}
  if ("string" == typeof r.cookie) try {
   t.cookie = r.cookie;
  } catch (e) {}
  if ("string" == typeof r.referrer) try {
   t.referrer = r.referrer;
  } catch (e) {}
  if ("string" == typeof r.direction) try {
   t.documentElement.setAttribute("dir", r.direction);
  } catch (e) {}
  if ("string" == typeof r.language) try {
   t.documentElement.setAttribute("lang", r.language);
  } catch (e) {}
  if ("string" == typeof r.buildId) try {
   t.documentElement.setAttribute("data-stencil-build", r.buildId);
  } catch (e) {}
  try {
   e.customElements = null;
  } catch (e) {}
  return r.constrainTimeouts && constrainTimeouts(e), function n(e, t, r) {
   try {
    const s = e.location.pathname;
    e.console.error = (...e) => {
     const n = e.reduce(((e, t) => {
      if (t) {
       if (null != t.stack) return e + " " + String(t.stack);
       if (null != t.message) return e + " " + String(t.message);
      }
      return String(t);
     }), "").trim();
     "" !== n && (renderCatchError(r, n), t.runtimeLogging && runtimeLog(s, "error", [ n ]));
    }, e.console.debug = (...e) => {
     renderBuildDiagnostic(r, "debug", "Hydrate Debug", [ ...e ].join(", ")), t.runtimeLogging && runtimeLog(s, "debug", e);
    }, t.runtimeLogging && [ "log", "warn", "assert", "info", "trace" ].forEach((t => {
     e.console[t] = (...e) => {
      runtimeLog(s, t, e);
     };
    }));
   } catch (e) {
    renderCatchError(r, e);
   }
  }(e, r, s), e;
 }(e, e.document, t, r), "function" == typeof t.beforeHydrate) try {
  const n = t.beforeHydrate(e.document);
  isPromise(n) ? n.then((() => {
   hydrateFactory(e, t, r, afterHydrate, s);
  })) : hydrateFactory(e, t, r, afterHydrate, s);
 } catch (n) {
  renderCatchError(r, n), finalizeHydrate(e, e.document, t, r, s);
 } else hydrateFactory(e, t, r, afterHydrate, s);
}

function afterHydrate(e, t, r, s) {
 if ("function" == typeof t.afterHydrate) try {
  const n = t.afterHydrate(e.document);
  isPromise(n) ? n.then((() => {
   finalizeHydrate(e, e.document, t, r, s);
  })) : finalizeHydrate(e, e.document, t, r, s);
 } catch (n) {
  renderCatchError(r, n), finalizeHydrate(e, e.document, t, r, s);
 } else finalizeHydrate(e, e.document, t, r, s);
}

function finalizeHydrate(e, t, r, s, n) {
 try {
  if (inspectElement(s, t.documentElement, 0), !1 !== r.removeUnusedStyles) try {
   ((e, t) => {
    try {
     const r = e.head.querySelectorAll("style[data-styles]"), s = r.length;
     if (s > 0) {
      const n = (e => {
       const t = {
        attrs: new Set,
        classNames: new Set,
        ids: new Set,
        tags: new Set
       };
       return collectUsedSelectors(t, e), t;
      })(e.documentElement);
      for (let e = 0; e < s; e++) removeUnusedStyleText(n, t, r[e]);
     }
    } catch (e) {
     ((e, t, r) => {
      const s = {
       level: "error",
       type: "build",
       header: "Build Error",
       messageText: "build error",
       relFilePath: null,
       absFilePath: null,
       lines: []
      };
      null != t && (null != t.stack ? s.messageText = t.stack.toString() : null != t.message ? s.messageText = t.message.length ? t.message : "UNKNOWN ERROR" : s.messageText = t.toString()), 
      null == e || shouldIgnoreError(s.messageText) || e.push(s);
     })(t, e);
    }
   })(t, s.diagnostics);
  } catch (e) {
   renderCatchError(s, e);
  }
  if ("string" == typeof r.title) try {
   t.title = r.title;
  } catch (e) {
   renderCatchError(s, e);
  }
  s.title = t.title, r.removeScripts && removeScripts(t.documentElement);
  try {
   ((e, t) => {
    let r = e.head.querySelector('link[rel="canonical"]');
    "string" == typeof t ? (null == r && (r = e.createElement("link"), r.setAttribute("rel", "canonical"), 
    e.head.appendChild(r)), r.setAttribute("href", t)) : null != r && (r.getAttribute("href") || r.parentNode.removeChild(r));
   })(t, r.canonicalUrl);
  } catch (e) {
   renderCatchError(s, e);
  }
  try {
   (e => {
    const t = e.head;
    let r = t.querySelector("meta[charset]");
    null == r ? (r = e.createElement("meta"), r.setAttribute("charset", "utf-8")) : r.remove(), 
    t.insertBefore(r, t.firstChild);
   })(t);
  } catch (e) {}
  hasError(s.diagnostics) || (s.httpStatus = 200);
  try {
   const e = t.head.querySelector('meta[http-equiv="status"]');
   if (null != e) {
    const t = e.getAttribute("content");
    t && t.length > 0 && (s.httpStatus = parseInt(t, 10));
   }
  } catch (e) {}
  r.clientHydrateAnnotations && t.documentElement.classList.add("hydrated"), r.serializeToHtml && (s.html = serializeDocumentToString(t, r));
 } catch (e) {
  renderCatchError(s, e);
 }
 if (r.destroyWindow) try {
  r.destroyDocument || (e.document = null, t.defaultView = null), e.close && e.close();
 } catch (e) {
  renderCatchError(s, e);
 }
 n(s);
}

function serializeDocumentToString(e, t) {
 return serializeNodeToHtml(e, {
  approximateLineWidth: t.approximateLineWidth,
  outerHtml: !1,
  prettyHtml: t.prettyHtml,
  removeAttributeQuotes: t.removeAttributeQuotes,
  removeBooleanAttributeQuotes: t.removeBooleanAttributeQuotes,
  removeEmptyAttributes: t.removeEmptyAttributes,
  removeHtmlComments: t.removeHtmlComments,
  serializeShadowRoot: !1
 });
}

function isValidDocument(e) {
 return null != e && 9 === e.nodeType && null != e.documentElement && 1 === e.documentElement.nodeType && null != e.body && 1 === e.body.nodeType;
}

function removeScripts(e) {
 const t = e.children;
 for (let e = t.length - 1; e >= 0; e--) {
  const r = t[e];
  removeScripts(r), ("SCRIPT" === r.nodeName || "LINK" === r.nodeName && "modulepreload" === r.getAttribute("rel")) && r.remove();
 }
}

const templateWindows = new Map, isPromise = e => !!e && ("object" == typeof e || "function" == typeof e) && "function" == typeof e.then, hasError = e => null != e && 0 !== e.length && e.some((e => "error" === e.level && "runtime" !== e.type)), shouldIgnoreError = e => e === TASK_CANCELED_MSG, TASK_CANCELED_MSG = "task canceled", parseCss = (e, t) => {
 let r = 1, s = 1;
 const n = [], o = e => {
  const t = e.match(/\n/g);
  t && (r += t.length);
  const n = e.lastIndexOf("\n");
  s = ~n ? e.length - n : s + e.length;
 }, i = () => {
  const e = {
   line: r,
   column: s
  };
  return t => (t.position = new z(e), m(), t);
 }, a = o => {
  const i = e.split("\n"), a = {
   level: "error",
   type: "css",
   language: "css",
   header: "CSS Parse",
   messageText: o,
   absFilePath: t,
   lines: [ {
    lineIndex: r - 1,
    lineNumber: r,
    errorCharStart: s,
    text: e[r - 1]
   } ]
  };
  if (r > 1) {
   const t = {
    lineIndex: r - 1,
    lineNumber: r - 1,
    text: e[r - 2],
    errorCharStart: -1,
    errorLength: -1
   };
   a.lines.unshift(t);
  }
  if (r + 2 < i.length) {
   const e = {
    lineIndex: r,
    lineNumber: r + 1,
    text: i[r],
    errorCharStart: -1,
    errorLength: -1
   };
   a.lines.push(e);
  }
  return n.push(a), null;
 }, l = () => u(/^{\s*/), c = () => u(/^}/), u = t => {
  const r = t.exec(e);
  if (!r) return;
  const s = r[0];
  return o(s), e = e.slice(s.length), r;
 }, d = () => {
  let t;
  const r = [];
  for (m(), h(r); e.length && "}" !== e.charAt(0) && (t = w() || A()); ) !1 !== t && (r.push(t), 
  h(r));
  return r;
 }, m = () => u(/^\s*/), h = e => {
  let t;
  for (e = e || []; t = p(); ) !1 !== t && e.push(t);
  return e;
 }, p = () => {
  const t = i();
  if ("/" !== e.charAt(0) || "*" !== e.charAt(1)) return null;
  let r = 2;
  for (;"" !== e.charAt(r) && ("*" !== e.charAt(r) || "/" !== e.charAt(r + 1)); ) ++r;
  if (r += 2, "" === e.charAt(r - 1)) return a("End of comment missing");
  const n = e.slice(2, r - 2);
  return s += 2, o(n), e = e.slice(r), s += 2, t({
   type: 1,
   comment: n
  });
 }, f = () => {
  const e = u(/^([^{]+)/);
  return e ? trim(e[0]).replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, (function(e) {
   return e.replace(/,/g, "‌");
  })).split(/\s*(?![^(]*\)),\s*/).map((function(e) {
   return e.replace(/\u200C/g, ",");
  })) : null;
 }, g = () => {
  const e = i();
  let t = u(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
  if (!t) return null;
  if (t = trim(t[0]), !u(/^:\s*/)) return a("property missing ':'");
  const r = u(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/), s = e({
   type: 4,
   property: t.replace(commentre, ""),
   value: r ? trim(r[0]).replace(commentre, "") : ""
  });
  return u(/^[;\s]*/), s;
 }, y = () => {
  const e = [];
  if (!l()) return a("missing '{'");
  let t;
  for (h(e); t = g(); ) !1 !== t && (e.push(t), h(e));
  return c() ? e : a("missing '}'");
 }, C = () => {
  let e;
  const t = [], r = i();
  for (;e = u(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/); ) t.push(e[1]), u(/^,\s*/);
  return t.length ? r({
   type: 9,
   values: t,
   declarations: y()
  }) : null;
 }, S = (e, t) => {
  const r = new RegExp("^@" + e + "\\s*([^;]+);");
  return () => {
   const s = i(), n = u(r);
   if (!n) return null;
   const o = {
    type: t
   };
   return o[e] = n[1].trim(), s(o);
  };
 }, E = S("import", 7), b = S("charset", 0), T = S("namespace", 11), w = () => "@" !== e[0] ? null : (() => {
  const e = i();
  let t = u(/^@([-\w]+)?keyframes\s*/);
  if (!t) return null;
  const r = t[1];
  if (t = u(/^([-\w]+)\s*/), !t) return a("@keyframes missing name");
  const s = t[1];
  if (!l()) return a("@keyframes missing '{'");
  let n, o = h();
  for (;n = C(); ) o.push(n), o = o.concat(h());
  return c() ? e({
   type: 8,
   name: s,
   vendor: r,
   keyframes: o
  }) : a("@keyframes missing '}'");
 })() || (() => {
  const e = i(), t = u(/^@media *([^{]+)/);
  if (!t) return null;
  const r = trim(t[1]);
  if (!l()) return a("@media missing '{'");
  const s = h().concat(d());
  return c() ? e({
   type: 10,
   media: r,
   rules: s
  }) : a("@media missing '}'");
 })() || (() => {
  const e = i(), t = u(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
  return t ? e({
   type: 2,
   name: trim(t[1]),
   media: trim(t[2])
  }) : null;
 })() || (() => {
  const e = i(), t = u(/^@supports *([^{]+)/);
  if (!t) return null;
  const r = trim(t[1]);
  if (!l()) return a("@supports missing '{'");
  const s = h().concat(d());
  return c() ? e({
   type: 15,
   supports: r,
   rules: s
  }) : a("@supports missing '}'");
 })() || E() || b() || T() || (() => {
  const e = i(), t = u(/^@([-\w]+)?document *([^{]+)/);
  if (!t) return null;
  const r = trim(t[1]), s = trim(t[2]);
  if (!l()) return a("@document missing '{'");
  const n = h().concat(d());
  return c() ? e({
   type: 3,
   document: s,
   vendor: r,
   rules: n
  }) : a("@document missing '}'");
 })() || (() => {
  const e = i();
  if (!u(/^@page */)) return null;
  const t = f() || [];
  if (!l()) return a("@page missing '{'");
  let r, s = h();
  for (;r = g(); ) s.push(r), s = s.concat(h());
  return c() ? e({
   type: 12,
   selectors: t,
   declarations: s
  }) : a("@page missing '}'");
 })() || (() => {
  const e = i();
  if (!u(/^@host\s*/)) return null;
  if (!l()) return a("@host missing '{'");
  const t = h().concat(d());
  return c() ? e({
   type: 6,
   rules: t
  }) : a("@host missing '}'");
 })() || (() => {
  const e = i();
  if (!u(/^@font-face\s*/)) return null;
  if (!l()) return a("@font-face missing '{'");
  let t, r = h();
  for (;t = g(); ) r.push(t), r = r.concat(h());
  return c() ? e({
   type: 5,
   declarations: r
  }) : a("@font-face missing '}'");
 })(), A = () => {
  const e = i(), t = f();
  return t ? (h(), e({
   type: 13,
   selectors: t,
   declarations: y()
  })) : a("selector missing");
 };
 class z {
  constructor(e) {
   this.start = e, this.end = {
    line: r,
    column: s
   }, this.source = t;
  }
 }
 return z.prototype.content = e, {
  diagnostics: n,
  ...addParent((() => {
   const e = d();
   return {
    type: 14,
    stylesheet: {
     source: t,
     rules: e
    }
   };
  })())
 };
}, trim = e => e ? e.trim() : "", addParent = (e, t) => {
 const r = e && "string" == typeof e.type, s = r ? e : t;
 for (const t in e) {
  const r = e[t];
  Array.isArray(r) ? r.forEach((function(e) {
   addParent(e, s);
  })) : r && "object" == typeof r && addParent(r, s);
 }
 return r && Object.defineProperty(e, "parent", {
  configurable: !0,
  writable: !0,
  enumerable: !1,
  value: t || null
 }), e;
}, commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, getCssSelectors = e => {
 SELECTORS.all.length = SELECTORS.tags.length = SELECTORS.classNames.length = SELECTORS.ids.length = SELECTORS.attrs.length = 0;
 const t = (e = e.replace(/\./g, " .").replace(/\#/g, " #").replace(/\[/g, " [").replace(/\>/g, " > ").replace(/\+/g, " + ").replace(/\~/g, " ~ ").replace(/\*/g, " * ").replace(/\:not\((.*?)\)/g, " ")).split(" ");
 for (let e = 0, r = t.length; e < r; e++) t[e] = t[e].split(":")[0], 0 !== t[e].length && ("." === t[e].charAt(0) ? SELECTORS.classNames.push(t[e].slice(1)) : "#" === t[e].charAt(0) ? SELECTORS.ids.push(t[e].slice(1)) : "[" === t[e].charAt(0) ? (t[e] = t[e].slice(1).split("=")[0].split("]")[0].trim(), 
 SELECTORS.attrs.push(t[e].toLowerCase())) : /[a-z]/g.test(t[e].charAt(0)) && SELECTORS.tags.push(t[e].toLowerCase()));
 return SELECTORS.classNames = SELECTORS.classNames.sort(((e, t) => e.length < t.length ? -1 : e.length > t.length ? 1 : 0)), 
 SELECTORS;
}, SELECTORS = {
 all: [],
 tags: [],
 classNames: [],
 ids: [],
 attrs: []
}, serializeCssVisitNode = (e, t, r, s) => {
 const n = t.type;
 return 4 === n ? serializeCssDeclaration(t, r, s) : 13 === n ? serializeCssRule(e, t) : 1 === n ? "!" === t.comment[0] ? `/*${t.comment}*/` : "" : 10 === n ? serializeCssMedia(e, t) : 8 === n ? serializeCssKeyframes(e, t) : 9 === n ? serializeCssKeyframe(e, t) : 5 === n ? serializeCssFontFace(e, t) : 15 === n ? serializeCssSupports(e, t) : 7 === n ? "@import " + t.import + ";" : 0 === n ? "@charset " + t.charset + ";" : 12 === n ? serializeCssPage(e, t) : 6 === n ? "@host{" + serializeCssMapVisit(e, t.rules) + "}" : 2 === n ? "@custom-media " + t.name + " " + t.media + ";" : 3 === n ? serializeCssDocument(e, t) : 11 === n ? "@namespace " + t.namespace + ";" : "";
}, serializeCssRule = (e, t) => {
 const r = t.declarations, s = e.usedSelectors, n = t.selectors.slice();
 if (null == r || 0 === r.length) return "";
 if (s) {
  let t, r, o = !0;
  for (t = n.length - 1; t >= 0; t--) {
   const i = getCssSelectors(n[t]);
   o = !0;
   let a = i.classNames.length;
   if (a > 0 && e.hasUsedClassNames) for (r = 0; r < a; r++) if (!s.classNames.has(i.classNames[r])) {
    o = !1;
    break;
   }
   if (o && e.hasUsedTags && (a = i.tags.length, a > 0)) for (r = 0; r < a; r++) if (!s.tags.has(i.tags[r])) {
    o = !1;
    break;
   }
   if (o && e.hasUsedAttrs && (a = i.attrs.length, a > 0)) for (r = 0; r < a; r++) if (!s.attrs.has(i.attrs[r])) {
    o = !1;
    break;
   }
   if (o && e.hasUsedIds && (a = i.ids.length, a > 0)) for (r = 0; r < a; r++) if (!s.ids.has(i.ids[r])) {
    o = !1;
    break;
   }
   o || n.splice(t, 1);
  }
 }
 if (0 === n.length) return "";
 const o = [];
 let i = "";
 for (const e of t.selectors) i = removeSelectorWhitespace(e), o.includes(i) || o.push(i);
 return `${o}{${serializeCssMapVisit(e, r)}}`;
}, serializeCssDeclaration = (e, t, r) => "" === e.value ? "" : r - 1 === t ? e.property + ":" + e.value : e.property + ":" + e.value + ";", serializeCssMedia = (e, t) => {
 const r = serializeCssMapVisit(e, t.rules);
 return "" === r ? "" : "@media " + removeMediaWhitespace(t.media) + "{" + r + "}";
}, serializeCssKeyframes = (e, t) => {
 const r = serializeCssMapVisit(e, t.keyframes);
 return "" === r ? "" : "@" + (t.vendor || "") + "keyframes " + t.name + "{" + r + "}";
}, serializeCssKeyframe = (e, t) => t.values.join(",") + "{" + serializeCssMapVisit(e, t.declarations) + "}", serializeCssFontFace = (e, t) => {
 const r = serializeCssMapVisit(e, t.declarations);
 return "" === r ? "" : "@font-face{" + r + "}";
}, serializeCssSupports = (e, t) => {
 const r = serializeCssMapVisit(e, t.rules);
 return "" === r ? "" : "@supports " + t.supports + "{" + r + "}";
}, serializeCssPage = (e, t) => "@page " + t.selectors.join(", ") + "{" + serializeCssMapVisit(e, t.declarations) + "}", serializeCssDocument = (e, t) => {
 const r = serializeCssMapVisit(e, t.rules), s = "@" + (t.vendor || "") + "document " + t.document;
 return "" === r ? "" : s + "{" + r + "}";
}, serializeCssMapVisit = (e, t) => {
 let r = "";
 if (t) for (let s = 0, n = t.length; s < n; s++) r += serializeCssVisitNode(e, t[s], s, n);
 return r;
}, removeSelectorWhitespace = e => {
 let t = "", r = "", s = !1;
 for (let n = 0, o = (e = e.trim()).length; n < o; n++) if (r = e[n], "[" === r && "\\" !== t[t.length - 1] ? s = !0 : "]" === r && "\\" !== t[t.length - 1] && (s = !1), 
 !s && CSS_WS_REG.test(r)) {
  if (CSS_NEXT_CHAR_REG.test(e[n + 1])) continue;
  if (CSS_PREV_CHAR_REG.test(t[t.length - 1])) continue;
  t += " ";
 } else t += r;
 return t;
}, removeMediaWhitespace = e => {
 let t = "", r = "";
 for (let s = 0, n = (e = e.trim()).length; s < n; s++) if (r = e[s], CSS_WS_REG.test(r)) {
  if (CSS_WS_REG.test(t[t.length - 1])) continue;
  t += " ";
 } else t += r;
 return t;
}, CSS_WS_REG = /\s/, CSS_NEXT_CHAR_REG = /[>\(\)\~\,\+\s]/, CSS_PREV_CHAR_REG = /[>\(\~\,\+]/, collectUsedSelectors = (e, t) => {
 if (null != t && 1 === t.nodeType) {
  const r = t.children, s = t.nodeName.toLowerCase();
  e.tags.add(s);
  const n = t.attributes;
  for (let r = 0, s = n.length; r < s; r++) {
   const s = n.item(r), o = s.name.toLowerCase();
   if (e.attrs.add(o), "class" === o) {
    const r = t.classList;
    for (let t = 0, s = r.length; t < s; t++) e.classNames.add(r.item(t));
   } else "id" === o && e.ids.add(s.value);
  }
  if (r) for (let t = 0, s = r.length; t < s; t++) collectUsedSelectors(e, r[t]);
 }
}, removeUnusedStyleText = (e, t, r) => {
 try {
  const s = parseCss(r.innerHTML);
  if (t.push(...s.diagnostics), hasError(t)) return;
  try {
   r.innerHTML = ((e, t) => {
    const r = t.usedSelectors || null, s = {
     usedSelectors: r || null,
     hasUsedAttrs: !!r && r.attrs.size > 0,
     hasUsedClassNames: !!r && r.classNames.size > 0,
     hasUsedIds: !!r && r.ids.size > 0,
     hasUsedTags: !!r && r.tags.size > 0
    }, n = e.rules;
    if (!n) return "";
    const o = n.length, i = [];
    for (let e = 0; e < o; e++) i.push(serializeCssVisitNode(s, n[e], e, o));
    return i.join("");
   })(s.stylesheet, {
    usedSelectors: e
   });
  } catch (e) {
   t.push({
    level: "warn",
    type: "css",
    header: "CSS Stringify",
    messageText: e
   });
  }
 } catch (e) {
  t.push({
   level: "warn",
   type: "css",
   header: "CSS Parse",
   messageText: e
  });
 }
}, SKIP_ATTRS = new Set([ "s-id", "c-id" ]), createHydrateBuildId = () => {
 let e = "abcdefghijklmnopqrstuvwxyz", t = "";
 for (;t.length < 8; ) t += e[Math.floor(Math.random() * e.length)], 1 === t.length && (e += "0123456789");
 return t;
};

exports.createWindowFromHtml = createWindowFromHtml;
exports.hydrateDocument = hydrateDocument;
exports.renderToString = renderToString;
exports.serializeDocumentToString = serializeDocumentToString;
