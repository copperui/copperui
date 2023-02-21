import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-top', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-top></brx-header-top>');

    const element = await page.find('brx-header-top');
    expect(element).toHaveClass('hydrated');
  });
});
