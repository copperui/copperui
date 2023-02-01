import { newSpecPage } from '@stencil/core/testing';
import { BrxSelectOption } from '../brx-select-option';

describe('brx-select-option', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxSelectOption],
      html: `<brx-select-option></brx-select-option>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-select-option>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-select-option>
    `);
  });
});
