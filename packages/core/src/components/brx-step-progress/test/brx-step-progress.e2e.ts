import { newE2EPage } from '@stencil/core/testing';

describe('brx-step-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-step-progress></brx-step-progress>');

    const element = await page.find('brx-step-progress');
    expect(element).toHaveClass('hydrated');
  });
});
