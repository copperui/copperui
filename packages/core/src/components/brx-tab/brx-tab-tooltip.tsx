import { Component, Host, ComponentInterface, h, Prop, State, Fragment, Listen, Element } from '@stencil/core';
import { generateUniqueId } from '../../utils/helpers';

@Component({
  tag: 'brx-tab-tooltip',
  shadow: false,
})
export class BrxTabTooltip implements ComponentInterface {
  @Element()
  el: HTMLElement;

  @Prop()
  tooltipText: string | undefined;

  @State()
  tooltipContentId: string | undefined;

  async componentWillLoad() {
    if (!this.tooltipContentId) {
      this.tooltipContentId = await generateUniqueId();
    }
  }

  render() {
    const { tooltipText, tooltipContentId } = this;

    const enabled = !!tooltipText;

    return (
      <Host>
        {enabled && (
          <Fragment>
            <brx-tooltip target={`#${tooltipContentId}`} class="brx-tab-container" place="bottom">
              <slot />
            </brx-tooltip>

            <brx-tooltip-content id={tooltipContentId}>{tooltipText}</brx-tooltip-content>
          </Fragment>
        )}

        {!enabled && (
          <div class="brx-tab-container">
            <slot />
          </div>
        )}
      </Host>
    );
  }
}
