import { newE2EPage } from '@stencil/core/testing';

describe('brx-pagination-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-pagination-item></brx-pagination-item>');

    const element = await page.find('brx-pagination-item');
    expect(element).toHaveClass('hydrated');
  });
});
