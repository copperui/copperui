import { newSpecPage } from '@stencil/core/testing';
import { BrxModalBody } from '../brx-modal-body';

describe('brx-modal-body', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxModalBody],
      html: `<brx-modal-body></brx-modal-body>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-modal-body>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-modal-body>
    `);
  });
});
