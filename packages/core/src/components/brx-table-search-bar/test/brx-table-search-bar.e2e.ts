import { newE2EPage } from '@stencil/core/testing';

describe('brx-table-search-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-table-search-bar></brx-table-search-bar>');

    const element = await page.find('brx-table-search-bar');
    expect(element).toHaveClass('hydrated');
  });
});
