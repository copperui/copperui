import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-folder', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-folder></brx-menu-folder>');

    const element = await page.find('brx-menu-folder');
    expect(element).toHaveClass('hydrated');
  });
});
