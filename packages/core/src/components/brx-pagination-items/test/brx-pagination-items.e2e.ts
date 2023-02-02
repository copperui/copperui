import { newE2EPage } from '@stencil/core/testing';

describe('brx-pagination-items', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-pagination-items></brx-pagination-items>');

    const element = await page.find('brx-pagination-items');
    expect(element).toHaveClass('hydrated');
  });
});
