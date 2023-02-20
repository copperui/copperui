import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-footer></brx-menu-footer>');

    const element = await page.find('brx-menu-footer');
    expect(element).toHaveClass('hydrated');
  });
});
