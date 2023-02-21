import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-search></brx-header-search>');

    const element = await page.find('brx-header-search');
    expect(element).toHaveClass('hydrated');
  });
});
