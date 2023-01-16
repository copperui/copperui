import { newE2EPage } from '@stencil/core/testing';

describe('brx-modal-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-modal-header></brx-modal-header>');

    const element = await page.find('brx-modal-header');
    expect(element).toHaveClass('hydrated');
  });
});
