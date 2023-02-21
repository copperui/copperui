import { newSpecPage } from '@stencil/core/testing';
import { BrxHeaderLinks } from '../brx-header-links';

describe('brx-header-links', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxHeaderLinks],
      html: `<brx-header-links></brx-header-links>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-header-links>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-header-links>
    `);
  });
});
