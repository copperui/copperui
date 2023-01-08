import { newSpecPage } from '@stencil/core/testing';
import { BrxCheckbox } from '../brx-checkbox';

describe('brx-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxCheckbox],
      html: `<brx-checkbox></brx-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-checkbox>
    `);
  });
});
