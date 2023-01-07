// This file was based on the <ion-button /> from the Ionic Framework (MIT)
// https://github.com/ionic-team/ionic-framework/blob/d13a14658df2723aff908a94181cb563cb1f5b43/core/src/components/button/button.tsx

import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { Attributes, inheritAriaAttributes } from '../../utils/inherited-attributes';

@Component({
  tag: 'brx-button',
  styleUrl: 'brx-button.scss',
  shadow: false,
})
export class BrxButton {
  private inheritedAttributes: Attributes = {};

  @Element() el!: HTMLElement;

  /**
   * Emitted when the button has focus.
   */
  @Event()
  brxFocus!: EventEmitter<void>;

  /**
   * Emitted when the button loses focus.
   */
  @Event()
  brxBlur!: EventEmitter<void>;

  /**
   * CSS class names to be applied to the native button element.
   */
  @Prop({ reflect: true })
  nativeClass: string | undefined;

  /**
   * The type of button.
   */
  @Prop({ mutable: true })
  buttonType = 'button';

  /**
   * If `true`, the user cannot interact with the button.
   */
  @Prop({ reflect: true })
  disabled = false;

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   */
  @Prop()
  download: string | undefined;

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   * If this property is set, an anchor tag will be rendered.
   */
  @Prop()
  href: string | undefined;

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop()
  rel: string | undefined;

  /**
   * If `true`, activates a button with a heavier font weight.
   */
  @Prop()
  strong = false;

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   * Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
   */
  @Prop()
  target: string | undefined;

  /**
   * The type of the button.
   */
  @Prop()
  type: 'submit' | 'reset' | 'button' = 'button';

  @Prop({ reflect: true })
  block: boolean = false;

  @Prop({ reflect: true })
  circle: boolean = false;

  @Prop({ reflect: true })
  darkMode: boolean = false;

  @Prop({ reflect: true })
  active: boolean = false;

  @Prop({ reflect: true })
  loading: boolean = false;

  @Prop({ reflect: true })
  color: 'danger' | 'success' | 'warning' | 'info';

  @Prop({ reflect: true })
  size: 'large' | 'medium' | 'small' | 'xsmall' = 'medium';

  @Prop({ reflect: true })
  variant: 'primary' | 'secondary' | 'default' = 'default';

  componentWillLoad() {
    this.inheritedAttributes = inheritAriaAttributes(this.el);
  }

  render() {
    const { type, disabled, rel, target, href, inheritedAttributes } = this;

    const TagType: string = href === undefined ? 'button' : 'a';

    const attrs =
      TagType === 'button'
        ? { type }
        : {
            rel,
            href,
            target,
            download: this.download,
          };

    const allNativeClasses = `brx-button-native ${this.nativeClass}`;

    return (
      <Host aria-disabled={disabled ? 'true' : null}>
        <TagType {...attrs} class={allNativeClasses} data-size={this.size} part="native" disabled={disabled} {...inheritedAttributes}>
          {this.loading && <brx-loading size="">Carregando</brx-loading>}
          {!this.loading && <slot></slot>}
        </TagType>
      </Host>
    );
  }
}
