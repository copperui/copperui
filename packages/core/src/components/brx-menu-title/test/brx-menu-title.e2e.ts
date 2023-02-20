import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-title></brx-menu-title>');

    const element = await page.find('brx-menu-title');
    expect(element).toHaveClass('hydrated');
  });
});
