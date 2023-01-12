import { newSpecPage } from '@stencil/core/testing';
import { BrxInput } from '../brx-input';

describe('brx-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxInput],
      html: `<brx-input></brx-input>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-input>
    `);
  });
});
