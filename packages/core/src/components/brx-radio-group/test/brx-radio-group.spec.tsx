import { newSpecPage } from '@stencil/core/testing';
import { BrxRadioGroup } from '../brx-radio-group';

describe('brx-radio-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxRadioGroup],
      html: `<brx-radio-group></brx-radio-group>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-radio-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-radio-group>
    `);
  });
});
