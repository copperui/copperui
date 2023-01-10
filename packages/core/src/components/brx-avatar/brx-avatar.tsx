import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'brx-avatar',
  styleUrl: 'brx-avatar.scss',
  shadow: false,
})
export class BrxAvatar {
  @Prop({ reflect: true })
  size: 'large' | 'medium' | 'small' = 'small';

  @Prop({ reflect: true })
  src: string | undefined;

  @Prop({ reflect: true })
  alt: string | undefined;

  @Prop({ reflect: true })
  name: string | undefined;

  @Prop({ reflect: true })
  mode: 'picture' | 'name' | 'icon' | undefined;

  @Prop({ reflect: true })
  contentClass: string | undefined;

  render() {
    const mode = this.mode ?? (this.src ? 'picture' : this.name ? 'name' : 'icon');

    const contentClass = `content ${this.contentClass}`;

    return (
      <Host>
        {mode === 'picture' && (
          <span class={contentClass}>
            <img src={this.src} alt={this.alt ?? 'Avatar'} />
          </span>
        )}

        {mode === 'name' && (
          <span class={contentClass} data-class="content bg-green-50 text-pure-0">
            {this.name[0]}
          </span>
        )}

        {mode === 'icon' && (
          <span class={contentClass}>
            <brx-icon name="fa5/fas/user"></brx-icon>
          </span>
        )}
      </Host>
    );
  }
}
