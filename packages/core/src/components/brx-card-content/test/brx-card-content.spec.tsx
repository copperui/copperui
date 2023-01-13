import { newSpecPage } from '@stencil/core/testing';
import { BrxCardContent } from '../brx-card-content';

describe('brx-card-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxCardContent],
      html: `<brx-card-content></brx-card-content>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-card-content>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-card-content>
    `);
  });
});
