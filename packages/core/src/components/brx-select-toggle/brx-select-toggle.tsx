import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'brx-select-toggle',
  styleUrl: 'brx-select-toggle.scss',
  shadow: false,
})
export class BrxSelectToggle {
  @Prop()
  expanded = false;

  get label() {
    return this.expanded ? 'Esconder lista.' : 'Exibir lista.';
  }

  render() {
    const { label, expanded } = this;

    return (
      <Host>
        <brx-button aria-label={label} title={label} tabindex="-1">
          <brx-icon name={expanded ? 'fa5/fas/angle-up' : 'fa5/fas/angle-down'} aria-hidden="true"></brx-icon>
          <slot></slot>
        </brx-button>
      </Host>
    );
  }
}
