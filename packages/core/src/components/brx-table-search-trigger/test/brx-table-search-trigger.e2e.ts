import { newE2EPage } from '@stencil/core/testing';

describe('brx-table-search-trigger', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-table-search-trigger></brx-table-search-trigger>');

    const element = await page.find('brx-table-search-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
