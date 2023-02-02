import { newE2EPage } from '@stencil/core/testing';

describe('brx-pagination-arrows', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-pagination-arrows></brx-pagination-arrows>');

    const element = await page.find('brx-pagination-arrows');
    expect(element).toHaveClass('hydrated');
  });
});
