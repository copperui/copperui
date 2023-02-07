import { Component, ComponentInterface, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { findTargets, generateUniqueId } from '../../utils/helpers';

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
    const allItems = findTargets<HTMLBrxBreadcrumbItemElement>('.brx-breadcrumb-list brx-breadcrumb-item', this.breadcrumbEl);

    const targetItems = allItems.filter(i => !i.home && !i.active && !i.matches('.menu-mobil'));

    return Promise.all(targetItems.map(async item => ({ id: item.id ?? generateUniqueId(), content: item.querySelector('a')?.outerHTML })));
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
