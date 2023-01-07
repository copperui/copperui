import { newE2EPage } from '@stencil/core/testing';

describe('brx-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-button></brx-button>');

    const element = await page.find('brx-button');
    expect(element).toHaveClass('hydrated');
  });
});
