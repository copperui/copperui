import { newSpecPage } from '@stencil/core/testing';
import { BrxModalHeader } from '../brx-modal-header';

describe('brx-modal-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxModalHeader],
      html: `<brx-modal-header></brx-modal-header>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-modal-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-modal-header>
    `);
  });
});
