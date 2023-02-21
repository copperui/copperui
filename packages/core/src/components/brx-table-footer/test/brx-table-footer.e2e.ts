import { newE2EPage } from '@stencil/core/testing';

describe('brx-table-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-table-footer></brx-table-footer>');

    const element = await page.find('brx-table-footer');
    expect(element).toHaveClass('hydrated');
  });
});
