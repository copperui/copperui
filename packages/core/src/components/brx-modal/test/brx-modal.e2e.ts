import { newE2EPage } from '@stencil/core/testing';

describe('brx-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-modal></brx-modal>');

    const element = await page.find('brx-modal');
    expect(element).toHaveClass('hydrated');
  });
});
