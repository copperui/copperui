import { newE2EPage } from '@stencil/core/testing';

describe('brx-datetimepicker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-datetimepicker></brx-datetimepicker>');

    const element = await page.find('brx-datetimepicker');
    expect(element).toHaveClass('hydrated');
  });
});
