import { newE2EPage } from '@stencil/core/testing';

describe('brx-table-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-table-header></brx-table-header>');

    const element = await page.find('brx-table-header');
    expect(element).toHaveClass('hydrated');
  });
});
