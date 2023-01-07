import { newE2EPage } from '@stencil/core/testing';

describe('brx-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-icon></brx-icon>');

    const element = await page.find('brx-icon');
    expect(element).toHaveClass('hydrated');
  });
});
