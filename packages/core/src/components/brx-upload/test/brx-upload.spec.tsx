import { newSpecPage } from '@stencil/core/testing';
import { BrxUpload } from '../brx-upload';

describe('brx-upload', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxUpload],
      html: `<brx-upload></brx-upload>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-upload>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-upload>
    `);
  });
});
