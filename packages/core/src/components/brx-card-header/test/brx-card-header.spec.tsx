import { newSpecPage } from '@stencil/core/testing';
import { BrxCardHeader } from '../brx-card-header';

describe('brx-card-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxCardHeader],
      html: `<brx-card-header></brx-card-header>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-card-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-card-header>
    `);
  });
});
