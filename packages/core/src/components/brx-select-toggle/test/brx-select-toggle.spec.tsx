import { newSpecPage } from '@stencil/core/testing';
import { BrxSelectToggle } from '../brx-select-toggle';

describe('brx-select-toggle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxSelectToggle],
      html: `<brx-select-toggle></brx-select-toggle>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-select-toggle>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-select-toggle>
    `);
  });
});
