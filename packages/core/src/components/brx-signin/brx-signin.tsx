import { Component, Host, h, Prop, Fragment } from '@stencil/core';

@Component({
  tag: 'brx-signin',
  styleUrl: 'brx-signin.scss',
  shadow: false,
})
export class BrxSignin {
  // brx-signin props
  @Prop({ reflect: true })
  label: string = 'Entrar';

  @Prop({ reflect: true })
  showIcon: boolean = true;

  @Prop({ reflect: true })
  showLabel: boolean = true;

  @Prop({ reflect: true })
  iconName: string = 'fa5/fas/user';
  // end brx-signin props

  render() {
    return (
      <Host>
        <slot name="content">
          {this.showIcon && <brx-icon name={this.iconName}></brx-icon>}
          {this.showLabel && <Fragment>{this.label}</Fragment>}
          <slot></slot>
        </slot>
      </Host>
    );
  }
}
