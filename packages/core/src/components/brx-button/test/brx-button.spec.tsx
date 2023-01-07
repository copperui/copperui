import { newSpecPage } from '@stencil/core/testing';
import { BrxButton } from '../brx-button';

describe('brx-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxButton],
      html: `<brx-button></brx-button>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-button>
    `);
  });
});
