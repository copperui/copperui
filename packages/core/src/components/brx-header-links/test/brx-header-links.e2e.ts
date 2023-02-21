import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-links', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-links></brx-header-links>');

    const element = await page.find('brx-header-links');
    expect(element).toHaveClass('hydrated');
  });
});
