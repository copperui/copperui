import { newE2EPage } from '@stencil/core/testing';

describe('brx-notification', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brx-notification></brx-notification>');

    const element = await page.find('brx-notification');
    expect(element).toHaveClass('hydrated');
  });
});
