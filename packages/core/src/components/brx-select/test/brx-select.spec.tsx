import { newSpecPage } from '@stencil/core/testing';
import { BrxSelect } from '../brx-select';

describe('brx-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxSelect],
      html: `<brx-select></brx-select>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-select>
    `);
  });
});
