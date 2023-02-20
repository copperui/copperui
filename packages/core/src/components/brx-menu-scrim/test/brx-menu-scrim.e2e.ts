import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-scrim', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-scrim></brx-menu-scrim>');

    const element = await page.find('brx-menu-scrim');
    expect(element).toHaveClass('hydrated');
  });
});
