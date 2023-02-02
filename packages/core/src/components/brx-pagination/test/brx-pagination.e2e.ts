import { newE2EPage } from '@stencil/core/testing';

describe('brx-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-pagination></brx-pagination>');

    const element = await page.find('brx-pagination');
    expect(element).toHaveClass('hydrated');
  });
});
