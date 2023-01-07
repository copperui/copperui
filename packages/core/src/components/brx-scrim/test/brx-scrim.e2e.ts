import { newE2EPage } from '@stencil/core/testing';

describe('brx-scrim', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-scrim></brx-scrim>');

    const element = await page.find('brx-scrim');
    expect(element).toHaveClass('hydrated');
  });
});
