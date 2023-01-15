import { Component, Host, h, Element, State, Prop, Watch, ComponentInterface } from '@stencil/core';
import { generateUniqueId } from '../../utils/helpers';

type ICardItem = {
  id: string;
  content: string;
};

@Component({
  tag: 'brx-breadcrumb-card',
  styleUrl: 'brx-breadcrumb-card.scss',
  shadow: false,
})
export class BrxBreadcrumbCard implements ComponentInterface {
  @Element()
  el: HTMLElement;

  get breadcrumbEl() {
    return this.el.closest('brx-breadcrumb');
  }

  @Prop({ reflect: true })
  hidden: boolean;

  @State()
  cardItems: ICardItem[] = [];

  async getCardItems() {
    const allItems = Array.from<HTMLBrxBreadcrumbItemElement>(this.breadcrumbEl.querySelectorAll('brx-breadcrumb-list brx-breadcrumb-item'));

    const targetItems = allItems.filter(i => !i.home && !i.active && !i.matches('.menu-mobil'));

    return Promise.all(targetItems.map(async item => ({ id: item.id ?? (await generateUniqueId()), content: item.querySelector('a')?.outerHTML })));
  }

  @Watch('hidden')
  async syncCardItems() {
    this.cardItems = await this.getCardItems();
  }

  async componentWillLoad() {
    await this.syncCardItems();
  }

  render() {
    const { cardItems } = this;

    return (
      <Host>
        <brx-card>
          {cardItems.map(item => (
            <brx-item passStyles key={item.id} innerHTML={item.content}></brx-item>
          ))}
        </brx-card>
      </Host>
    );
  }
}
