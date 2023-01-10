import { newSpecPage } from '@stencil/core/testing';
import { BrxSignin } from '../brx-signin';

describe('brx-signin', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxSignin],
      html: `<brx-signin></brx-signin>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-signin>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-signin>
    `);
  });
});
