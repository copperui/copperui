import { newSpecPage } from '@stencil/core/testing';
import { BrxRadio } from '../brx-radio';

describe('brx-radio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxRadio],
      html: `<brx-radio></brx-radio>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-radio>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-radio>
    `);
  });
});
