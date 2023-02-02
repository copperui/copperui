import { newE2EPage } from '@stencil/core/testing';

describe('brx-pagination-go-to-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-pagination-go-to-page></brx-pagination-go-to-page>');

    const element = await page.find('brx-pagination-go-to-page');
    expect(element).toHaveClass('hydrated');
  });
});
