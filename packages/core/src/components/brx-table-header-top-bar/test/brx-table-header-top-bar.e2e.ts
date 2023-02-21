import { newE2EPage } from '@stencil/core/testing';

describe('brx-table-header-top-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-table-header-top-bar></brx-table-header-top-bar>');

    const element = await page.find('brx-table-header-top-bar');
    expect(element).toHaveClass('hydrated');
  });
});
