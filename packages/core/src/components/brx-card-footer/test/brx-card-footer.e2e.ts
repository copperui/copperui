import { newE2EPage } from '@stencil/core/testing';

describe('brx-card-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-card-footer></brx-card-footer>');

    const element = await page.find('brx-card-footer');
    expect(element).toHaveClass('hydrated');
  });
});
