import { newE2EPage } from '@stencil/core/testing';

describe('brx-header-bottom', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-header-bottom></brx-header-bottom>');

    const element = await page.find('brx-header-bottom');
    expect(element).toHaveClass('hydrated');
  });
});
