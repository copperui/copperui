import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-item></brx-menu-item>');

    const element = await page.find('brx-menu-item');
    expect(element).toHaveClass('hydrated');
  });
});
