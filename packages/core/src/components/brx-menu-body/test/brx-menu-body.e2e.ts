import { newE2EPage } from '@stencil/core/testing';

describe('brx-menu-body', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-menu-body></brx-menu-body>');

    const element = await page.find('brx-menu-body');
    expect(element).toHaveClass('hydrated');
  });
});
