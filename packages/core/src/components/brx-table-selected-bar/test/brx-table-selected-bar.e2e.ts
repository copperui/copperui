import { newE2EPage } from '@stencil/core/testing';

describe('brx-table-selected-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-table-selected-bar></brx-table-selected-bar>');

    const element = await page.find('brx-table-selected-bar');
    expect(element).toHaveClass('hydrated');
  });
});
