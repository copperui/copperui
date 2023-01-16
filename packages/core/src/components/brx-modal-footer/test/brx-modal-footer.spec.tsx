import { newSpecPage } from '@stencil/core/testing';
import { BrxModalFooter } from '../brx-modal-footer';

describe('brx-modal-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxModalFooter],
      html: `<brx-modal-footer></brx-modal-footer>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-modal-footer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-modal-footer>
    `);
  });
});
