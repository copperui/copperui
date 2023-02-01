import { Component, ComponentInterface, Element, Fragment, h, Host, Prop, State } from '@stencil/core';
import { generateUniqueId } from '../../utils/helpers';
import { BrxTooltip } from '../brx-tooltip/brx-tooltip';

@Component({
  tag: 'brx-tooltip-auto',
  shadow: false,
})
export class BrxTooltipAuto implements ComponentInterface {
  @Element()
  el: HTMLElement;

  @Prop()
  place: BrxTooltip['place'] = 'bottom';

  @Prop()
  tooltipText: string | undefined;

  @State()
  tooltipContentId: string | undefined;

  componentWillLoad() {
    if (!this.tooltipContentId) {
      this.tooltipContentId = generateUniqueId();
    }
  }

  get enabled() {
    return !!this.tooltipText;
  }

  render() {
    const { place, enabled, tooltipText, tooltipContentId } = this;

    return (
      <Host>
        {enabled && (
          <Fragment>
            <brx-tooltip target={`#${tooltipContentId}`} class="brx-tooltip-auto-container" place={place}>
              <slot />
            </brx-tooltip>

            <brx-tooltip-content id={tooltipContentId}>{tooltipText}</brx-tooltip-content>
          </Fragment>
        )}

        {!enabled && (
          <div class="brx-tooltip-auto-container">
            <slot />
          </div>
        )}
      </Host>
    );
  }
}
