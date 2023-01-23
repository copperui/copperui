import { newSpecPage } from '@stencil/core/testing';
import { BrxNotification } from '../brx-notification';

describe('brx-notification', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxNotification],
      html: `<brx-notification></brx-notification>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-notification>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-notification>
    `);
  });
});
