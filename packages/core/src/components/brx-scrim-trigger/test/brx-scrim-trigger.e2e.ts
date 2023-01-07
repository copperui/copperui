import { newE2EPage } from '@stencil/core/testing';

describe('brx-scrim-trigger', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-scrim-trigger></brx-scrim-trigger>');

    const element = await page.find('brx-scrim-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
