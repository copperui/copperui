import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-container></brx-menu-container>');

    const element = await page.find('brx-menu-container');
    expect(element).toHaveClass('hydrated');
  });
});
