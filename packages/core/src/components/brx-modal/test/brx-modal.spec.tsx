import { newSpecPage } from '@stencil/core/testing';
import { BrxModal } from '../brx-modal';

describe('brx-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxModal],
      html: `<brx-modal></brx-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-modal>
    `);
  });
});
