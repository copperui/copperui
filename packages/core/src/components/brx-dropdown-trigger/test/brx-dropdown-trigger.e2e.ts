import { newE2EPage } from '@stencil/core/testing';

describe('brx-dropdown-trigger', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-dropdown-trigger></brx-dropdown-trigger>');

    const element = await page.find('brx-dropdown-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
