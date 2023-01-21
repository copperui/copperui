import { newE2EPage } from '@stencil/core/testing';

describe('brx-tabs-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-tabs-panel></brx-tabs-panel>');

    const element = await page.find('brx-tabs-panel');
    expect(element).toHaveClass('hydrated');
  });
});
