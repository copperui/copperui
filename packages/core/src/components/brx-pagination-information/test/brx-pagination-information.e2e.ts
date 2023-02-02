import { newE2EPage } from '@stencil/core/testing';

describe('brx-pagination-information', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-pagination-information></brx-pagination-information>');

    const element = await page.find('brx-pagination-information');
    expect(element).toHaveClass('hydrated');
  });
});
