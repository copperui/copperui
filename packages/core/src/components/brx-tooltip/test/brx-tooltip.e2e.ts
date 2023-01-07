import { newE2EPage } from '@stencil/core/testing';

describe('brx-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-tooltip></brx-tooltip>');

    const element = await page.find('brx-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
