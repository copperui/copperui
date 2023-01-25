import { newE2EPage } from '@stencil/core/testing';

describe('brx-step-progress-btn', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-step-progress-btn></brx-step-progress-btn>');

    const element = await page.find('brx-step-progress-btn');
    expect(element).toHaveClass('hydrated');
  });
});
