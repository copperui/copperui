import { newE2EPage } from '@stencil/core/testing';

describe('brx-pagination-per-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-pagination-per-page></brx-pagination-per-page>');

    const element = await page.find('brx-pagination-per-page');
    expect(element).toHaveClass('hydrated');
  });
});
