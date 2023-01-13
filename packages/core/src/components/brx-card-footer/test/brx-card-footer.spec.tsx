import { newSpecPage } from '@stencil/core/testing';
import { BrxCardFooter } from '../brx-card-footer';

describe('brx-card-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxCardFooter],
      html: `<brx-card-footer></brx-card-footer>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-card-footer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-card-footer>
    `);
  });
});
