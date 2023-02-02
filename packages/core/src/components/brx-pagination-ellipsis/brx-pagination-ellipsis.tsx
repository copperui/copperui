import { Component, Host, h, Prop, ComponentInterface } from '@stencil/core';
import { generateUniqueId } from '../../utils/helpers';

@Component({
  tag: 'brx-pagination-ellipsis',
  styleUrl: 'brx-pagination-ellipsis.scss',
  shadow: false,
})
export class BrxPaginationEllipsis implements ComponentInterface {
  @Prop()
  dropdownId: string | undefined;

  componentDidLoad() {
    if (!this.dropdownId) {
      this.dropdownId = generateUniqueId();
    }
  }

  render() {
    const { dropdownId } = this;

    const label = 'Abrir listagem.';

    return (
      <Host>
        <brx-dropdown>
          <brx-dropdown-trigger target={`#${dropdownId}`}>
            <brx-button circle type="button" aria-label={label} title={label}>
              <brx-icon name="fa5/fas/ellipsis-h"></brx-icon>
            </brx-button>
          </brx-dropdown-trigger>

          <div class="brx-pagination-ellipsis-dropdown-content" id={dropdownId} hidden>
            <slot></slot>
          </div>
        </brx-dropdown>
      </Host>
    );
  }
}
