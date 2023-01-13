import { newSpecPage } from '@stencil/core/testing';
import { BrxCard } from '../brx-card';

describe('brx-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxCard],
      html: `<brx-card></brx-card>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-card>
    `);
  });
});
