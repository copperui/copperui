import { newE2EPage } from '@stencil/core/testing';

describe('brx-tooltip-auto', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-tooltip-auto></brx-tooltip-auto>');

    const element = await page.find('brx-tooltip-auto');
    expect(element).toHaveClass('hydrated');
  });
});
