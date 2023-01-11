import { newSpecPage } from '@stencil/core/testing';
import { BrxMessage } from '../brx-message';

describe('brx-message', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxMessage],
      html: `<brx-message></brx-message>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-message>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-message>
    `);
  });
});
