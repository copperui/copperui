import { newSpecPage } from '@stencil/core/testing';
import { BrxDropdownTrigger } from '../brx-dropdown-trigger';

describe('brx-dropdown-trigger', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxDropdownTrigger],
      html: `<brx-dropdown-trigger></brx-dropdown-trigger>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-dropdown-trigger>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-dropdown-trigger>
    `);
  });
});
