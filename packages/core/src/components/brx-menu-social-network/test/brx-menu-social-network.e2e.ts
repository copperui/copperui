import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-social-network', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-social-network></brx-menu-social-network>');

    const element = await page.find('brx-menu-social-network');
    expect(element).toHaveClass('hydrated');
  });
});
