import { newE2EPage } from '@stencil/core/testing';

describe('brx-accordion-trigger', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-accordion-trigger></brx-accordion-trigger>');

    const element = await page.find('brx-accordion-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
