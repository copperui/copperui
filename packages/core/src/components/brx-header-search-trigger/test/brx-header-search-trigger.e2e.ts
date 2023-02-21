import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-search-trigger', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-search-trigger></brx-header-search-trigger>');

    const element = await page.find('brx-header-search-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
