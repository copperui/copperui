import { newSpecPage } from '@stencil/core/testing';
import { BrxCheckgroup } from '../brx-checkgroup';

describe('brx-checkgroup', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxCheckgroup],
      html: `<brx-checkgroup></brx-checkgroup>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-checkgroup>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-checkgroup>
    `);
  });
});
