import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'brx-tooltip-content',
  styleUrl: 'brx-tooltip-content.scss',
  shadow: false,
})
export class BrxTooltipContent {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true })
  popover: boolean;

  @Prop({ reflect: true })
  place: string;

  @Prop({ reflect: true })
  color: string = 'info';

  render() {
    const { place } = this;

    return (
      <Host role="tooltip" data-toggle="tooltip" placement={place}>
        <slot></slot>

        <div data-popper-arrow class="arrow"></div>

        {this.popover && (
          <button type="button" class="close">
            <brx-icon name="fa5/fas/times"></brx-icon>
          </button>
        )}
      </Host>
    );
  }
}
