import { newSpecPage } from '@stencil/core/testing';
import { BrxMenu } from '../brx-menu';

describe('brx-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMenu],
      html: `<brx-menu></brx-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-menu>
    `);
  });
});
