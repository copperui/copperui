import { newSpecPage } from '@stencil/core/testing';
import { BrxTextarea } from '../brx-textarea';

describe('brx-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxTextarea],
      html: `<brx-textarea></brx-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-textarea>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-textarea>
    `);
  });
});
