import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderMenuTrigger } from '../brx-header-menu-trigger';

describe('brx-header-menu-trigger', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderMenuTrigger],
      html: `<brx-header-menu-trigger></brx-header-menu-trigger>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-menu-trigger>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-menu-trigger>
    `);
  });
});
