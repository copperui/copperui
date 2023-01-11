import { Component, Host, h, Prop, Fragment } from '@stencil/core';

@Component({
  tag: 'brx-icon',
  styleUrl: 'brx-icon.scss',
  shadow: false,
})
export class BrxIcon {
  /**
   * O nome do ícone.
   * bicycle -> fa5/fas/bicycle
   */
  @Prop({ reflect: true })
  name: string;

  /**
   * Define o carregamento automático dos recursos.
   */
  @Prop({ reflect: true })
  loadResources = true;

  @Prop({ reflect: true })
  iconClass: string | undefined;

  render() {
    const { iconClass = '' } = this;
    const name = this.name.includes('/') ? this.name : `fa5/fas/${this.name}`;

    if (name.startsWith('fa5')) {
      const [, style, identifier] = name.split('/');

      return (
        <Host>
          {this.loadResources && (
            <Fragment>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />
            </Fragment>
          )}

          <i class={`${style} fa-${identifier} ${iconClass}`} aria-hidden="true"></i>
        </Host>
      );
    }

    return <Host></Host>;
  }
}
