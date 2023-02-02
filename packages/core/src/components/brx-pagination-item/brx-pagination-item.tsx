import { Component, Host, h, Prop, Fragment, Listen, Method } from '@stencil/core';
import { isSpecialToken, parseTarget } from './brx-pagination-item-interface';

@Component({
  tag: 'brx-pagination-item',
  styleUrl: 'brx-pagination-item.scss',
  shadow: false,
})
export class BrxPaginationItem {
  @Prop({ reflect: true, attribute: 'target' })
  _target: 'first' | 'prev' | 'next' | 'last' | number;

  @Prop({ reflect: true })
  active: boolean;

  @Prop({ reflect: true })
  disabled: boolean;

  @Method()
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

  @Listen('click')
  handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  render() {
    const { disabled, mode, jumpButton } = this;

    return (
      <Host tabindex={mode === 'page' ? 0 : null} data-mode={mode}>
        {mode === 'jump' && jumpButton && (
          <brx-button disabled={disabled} type="button" circle>
            <brx-icon name={jumpButton.icon} aria-label={jumpButton.label} title={jumpButton.label}></brx-icon>
          </brx-button>
        )}

        {mode === 'page' && <slot name="page">{this.target}</slot>}
      </Host>
    );
  }
}
