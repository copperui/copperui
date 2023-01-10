import { newE2EPage } from '@stencil/core/testing';

describe('brx-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-dropdown></brx-dropdown>');

    const element = await page.find('brx-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
