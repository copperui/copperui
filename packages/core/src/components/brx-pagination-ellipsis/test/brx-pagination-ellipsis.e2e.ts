import { newE2EPage } from '@stencil/core/testing';

describe('brx-pagination-ellipsis', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-pagination-ellipsis></brx-pagination-ellipsis>');

    const element = await page.find('brx-pagination-ellipsis');
    expect(element).toHaveClass('hydrated');
  });
});
