import { newSpecPage } from '@stencil/core/testing';
import { BrxDropdown } from '../brx-dropdown';

describe('brx-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxDropdown],
      html: `<brx-dropdown></brx-dropdown>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-dropdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-dropdown>
    `);
  });
});
