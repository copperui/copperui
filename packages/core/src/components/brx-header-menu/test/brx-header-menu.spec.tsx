import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderMenu } from '../brx-header-menu';

describe('brx-header-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderMenu],
      html: `<brx-header-menu></brx-header-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-menu>
    `);
  });
});
