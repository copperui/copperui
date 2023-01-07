import { Component, Host, h, Prop, Fragment } from '@stencil/core';

@Component({
  tag: 'brx-loading',
  styleUrl: 'brx-loading.scss',
  shadow: false,
})
export class BrxLoading {
  @Prop({ reflect: true })
  variant: string | undefined;

  @Prop({ reflect: true })
  size: string | undefined = 'medium';

  @Prop({ reflect: true })
  progress: string | number | undefined;

  render() {
    const mode = this.progress !== undefined ? 'determinate' : 'indeterminate';

    return (
      <Host mode={mode} data-progress={mode === 'determinate' ? parseInt(String(this.progress)) : null}>
        {mode === 'determinate' && (
          <Fragment>
            <div class="brx-loading-mask full">
              <div class="brx-loading-fill"></div>
            </div>
            <div class="brx-loading-mask">
              <div class="brx-loading-fill"></div>
            </div>
          </Fragment>
        )}

        {mode === 'indeterminate' && (
          <>
            <slot></slot>
          </>
        )}
      </Host>
    );
  }
}
