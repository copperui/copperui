import { newE2EPage } from '@stencil/core/testing';

describe('brx-accordion-legacy-entry', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-accordion-legacy-entry></brx-accordion-legacy-entry>');

    const element = await page.find('brx-accordion-legacy-entry');
    expect(element).toHaveClass('hydrated');
  });
});
