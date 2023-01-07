import { newE2EPage } from '@stencil/core/testing';

describe('brx-tooltip-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-tooltip-content></brx-tooltip-content>');

    const element = await page.find('brx-tooltip-content');
    expect(element).toHaveClass('hydrated');
  });
});
