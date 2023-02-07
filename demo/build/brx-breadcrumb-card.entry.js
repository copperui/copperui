import { r as registerInstance, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { a as generateUniqueId } from './helpers-da43c71e.js';

const brxBreadcrumbCardCss = "brx-breadcrumb-card{display:block}";

const BrxBreadcrumbCard = class {
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
    return (h(Host, null, h("brx-card", null, cardItems.map(item => (h("brx-item", { passStyles: true, key: item.id, innerHTML: item.content }))))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "hidden": ["syncCardItems"]
  }; }
};
BrxBreadcrumbCard.style = brxBreadcrumbCardCss;

export { BrxBreadcrumbCard as brx_breadcrumb_card };
