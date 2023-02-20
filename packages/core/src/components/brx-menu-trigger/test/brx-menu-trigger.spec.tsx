import { newSpecPage } from '@stencil/core/testing';
import { BrxMenuTrigger } from '../brx-menu-trigger';

describe('brx-menu-trigger', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenuTrigger],
      html: `<brx-menu-trigger></brx-menu-trigger>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu-trigger>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu-trigger>
    `);
  });
});
