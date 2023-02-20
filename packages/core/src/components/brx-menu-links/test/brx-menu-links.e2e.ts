import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-links', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-links></brx-menu-links>');

    const element = await page.find('brx-menu-links');
    expect(element).toHaveClass('hydrated');
  });
});
