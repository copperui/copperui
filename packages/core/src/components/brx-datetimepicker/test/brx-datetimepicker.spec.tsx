import { newSpecPage } from '@stencil/core/testing';
import { BrxDateTimePicker } from '../brx-datetimepicker';

describe('brx-datetimepicker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrxDateTimePicker],
      html: `<brx-datetimepicker></brx-datetimepicker>`,
    });
    expect(page.root).toEqualHtml(`
      <brx-datetimepicker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brx-datetimepicker>
    `);
  });
});
