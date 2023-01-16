import { newE2EPage } from '@stencil/core/testing';

describe('brx-modal-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-modal-footer></brx-modal-footer>');

    const element = await page.find('brx-modal-footer');
    expect(element).toHaveClass('hydrated');
  });
});
