import { newE2EPage } from '@stencil/core/testing';

describe('brx-table-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-table-title></brx-table-title>');

    const element = await page.find('brx-table-title');
    expect(element).toHaveClass('hydrated');
  });
});
