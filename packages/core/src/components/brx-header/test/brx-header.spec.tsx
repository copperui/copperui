import { newSpecPage } from '@stencil/core/testing';
import { BrxHeader } from '../brx-header';

describe('brx-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeader],
      html: `<brx-header></brx-header>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header>
    `);
  });
});
