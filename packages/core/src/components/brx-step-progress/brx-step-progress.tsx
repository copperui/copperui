import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brx-step-progress',
  styleUrl: 'brx-step-progress.scss',
  shadow: false,
})
export class BrxStepProgress {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
