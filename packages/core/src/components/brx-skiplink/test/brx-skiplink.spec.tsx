import { newSpecPage } from '@stencil/core/testing';
import { BrxSkiplink } from '../brx-skiplink';

describe('brx-skiplink', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxSkiplink],
      html: `<brx-skiplink></brx-skiplink>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-skiplink>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-skiplink>
    `);
  });
});
