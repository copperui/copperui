import { newE2EPage } from '@stencil/core/testing';

describe('brx-modal-body', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-modal-body></brx-modal-body>');

    const element = await page.find('brx-modal-body');
    expect(element).toHaveClass('hydrated');
  });
});
