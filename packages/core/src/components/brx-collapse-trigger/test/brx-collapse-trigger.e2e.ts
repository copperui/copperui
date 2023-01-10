import { newE2EPage } from '@stencil/core/testing';

describe('brx-collapse-trigger', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-collapse-trigger></brx-collapse-trigger>');

    const element = await page.find('brx-collapse-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
