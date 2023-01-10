/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { CheckboxChangeEventDetail } from "./components/brx-checkbox/brx-checkbox-interface";
import { RadioChangeEventDetail } from "./components/brx-radio/brx-radio-interface";
import { RadioGroupChangeEventDetail } from "./components/brx-radio-group/brx-radio-group-interface";
export namespace Components {
    interface BrxAccordionLegacy {
        "entries": any;
        "negative": boolean;
        "single": boolean;
    }
    interface BrxAccordionLegacyEntry {
        "content": string | undefined;
        "entryId": string | undefined;
        "headerTitle": string | undefined;
    }
    interface BrxAccordionLegacyEntryContent {
        "entryId": string | undefined;
    }
    interface BrxAccordionLegacyEntryItem {
        "active": boolean;
        "entryId": string | undefined;
    }
    interface BrxButton {
        "active": boolean;
        "block": boolean;
        /**
          * The type of button.
         */
        "buttonType": string;
        "circle": boolean;
        "color": 'danger' | 'success' | 'warning' | 'info';
        "darkMode": boolean;
        /**
          * If `true`, the user cannot interact with the button.
         */
        "disabled": boolean;
        /**
          * This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want).
         */
        "download": string | undefined;
        /**
          * Contains a URL or a URL fragment that the hyperlink points to. If this property is set, an anchor tag will be rendered.
         */
        "href": string | undefined;
        "loading": boolean;
        /**
          * CSS class names to be applied to the native button element.
         */
        "nativeClass": string | undefined;
        /**
          * Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
         */
        "rel": string | undefined;
        "size": 'large' | 'medium' | 'small' | 'xsmall';
        /**
          * If `true`, activates a button with a heavier font weight.
         */
        "strong": boolean;
        /**
          * Specifies where to display the linked URL. Only applies when an `href` is provided. Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
         */
        "target": string | undefined;
        /**
          * The type of the button.
         */
        "type": 'submit' | 'reset' | 'button';
        "variant": 'primary' | 'secondary' | 'default';
    }
    interface BrxCheckbox {
        /**
          * If `true`, the checkbox is selected.
         */
        "checked": boolean | undefined;
        "darkMode": boolean;
        /**
          * If `true`, the user cannot interact with the checkbox.
         */
        "disabled": boolean;
        "getNativeChecked": () => Promise<boolean>;
        "hiddenLabel": boolean;
        /**
          * If `true`, the checkbox will visually appear as indeterminate.
         */
        "indeterminate": boolean;
        "inputId": string | undefined;
        "invalid": boolean | undefined;
        "label": string | undefined;
        /**
          * The name of the control, which is submitted with the form data.
         */
        "name": string;
        "size": 'small' | 'medium';
        "state": 'invalid' | 'danger' | undefined;
        "valid": boolean | undefined;
        /**
          * The value of the checkbox does not mean if it's checked or not, use the `checked` property for that.  The value of a checkbox is analogous to the value of an `<input type="checkbox">`, it's only used when the checkbox participates in a native `<form>`.
         */
        "value": any | null;
    }
    interface BrxCollapseTrigger {
        "breakpoint": string | undefined;
        "getTarget": () => Promise<HTMLElement>;
        "getTrigger": () => Promise<HTMLElement>;
        "iconToHide": string;
        "iconToShow": string;
        "propTarget": HTMLElement | string;
        "useIcons": boolean;
    }
    interface BrxDivider {
        "darkMode": boolean;
        "dashed": boolean;
        "size": 'sm' | 'md' | 'lg';
        "vertical": boolean;
    }
    interface BrxDropdown {
    }
    interface BrxDropdownTrigger {
        "breakpoint": string | undefined;
        "iconToHide": string;
        "iconToShow": string;
        "propTarget": HTMLElement | string;
        "useIcons": boolean;
    }
    interface BrxIcon {
        /**
          * Define o carregamento automático dos recursos.
         */
        "loadResources": boolean;
        /**
          * O nome do ícone. bicycle -> fa5/fas/bicycle
         */
        "name": string;
    }
    interface BrxItem {
        "button": boolean;
        "disabled": boolean;
        "passStyles": boolean;
        "selected": boolean;
    }
    interface BrxList {
        "headerTitle": string | undefined;
        "horizontal": boolean;
        "lines": 'one' | 'two' | 'three' | undefined;
    }
    interface BrxListHeader {
        "headerTitle": string;
    }
    interface BrxLoading {
        "progress": string | number | undefined;
        "size": string | undefined;
        "variant": string | undefined;
    }
    interface BrxRadio {
        /**
          * The tabindex of the radio button.
         */
        "buttonTabindex": number;
        /**
          * If `true`, the radio is selected.
         */
        "checked": boolean;
        /**
          * If `true`, the user cannot interact with the radio.
         */
        "disabled": boolean;
        "getNativeChecked": () => Promise<boolean>;
        "inputId": string | undefined;
        "label": string;
        /**
          * The name of the control, which is submitted with the form data.
         */
        "name": string;
        "setButtonTabindex": (value: number) => Promise<void>;
        "setFocus": (ev: any) => Promise<void>;
        /**
          * the value of the radio.
         */
        "value"?: any | null;
    }
    interface BrxRadioGroup {
        /**
          * If `true`, the radios can be deselected.
         */
        "allowEmptySelection": boolean;
        "label"?: HTMLLabelElement | string | null;
        /**
          * The name of the control, which is submitted with the form data.
         */
        "name": string;
        /**
          * the value of the radio group.
         */
        "value"?: any | null;
    }
    interface BrxScrim {
        "active": boolean;
        "closeElement": string | undefined;
        "hideScrim": () => Promise<void>;
        "showScrim": () => Promise<void>;
        "type": 'foco' | 'legibilidade' | 'inibicao';
    }
    interface BrxScrimTrigger {
        "target": HTMLBrxScrimElement | string;
    }
    interface BrxTooltip {
        "active": boolean;
        "color": string;
        "place": 'top' | 'bottom' | 'left' | 'right';
        "popover": boolean;
        "target": string | HTMLElement | undefined;
        "text": string | undefined;
        "timer": number | undefined;
        "type": string;
    }
    interface BrxTooltipContent {
        "color": string;
        "place": string;
        "popover": boolean;
    }
}
export interface BrxAccordionLegacyEntryItemCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLBrxAccordionLegacyEntryItemElement;
}
export interface BrxButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLBrxButtonElement;
}
export interface BrxCheckboxCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLBrxCheckboxElement;
}
export interface BrxCollapseTriggerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLBrxCollapseTriggerElement;
}
export interface BrxRadioCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLBrxRadioElement;
}
export interface BrxRadioGroupCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLBrxRadioGroupElement;
}
declare global {
    interface HTMLBrxAccordionLegacyElement extends Components.BrxAccordionLegacy, HTMLStencilElement {
    }
    var HTMLBrxAccordionLegacyElement: {
        prototype: HTMLBrxAccordionLegacyElement;
        new (): HTMLBrxAccordionLegacyElement;
    };
    interface HTMLBrxAccordionLegacyEntryElement extends Components.BrxAccordionLegacyEntry, HTMLStencilElement {
    }
    var HTMLBrxAccordionLegacyEntryElement: {
        prototype: HTMLBrxAccordionLegacyEntryElement;
        new (): HTMLBrxAccordionLegacyEntryElement;
    };
    interface HTMLBrxAccordionLegacyEntryContentElement extends Components.BrxAccordionLegacyEntryContent, HTMLStencilElement {
    }
    var HTMLBrxAccordionLegacyEntryContentElement: {
        prototype: HTMLBrxAccordionLegacyEntryContentElement;
        new (): HTMLBrxAccordionLegacyEntryContentElement;
    };
    interface HTMLBrxAccordionLegacyEntryItemElement extends Components.BrxAccordionLegacyEntryItem, HTMLStencilElement {
    }
    var HTMLBrxAccordionLegacyEntryItemElement: {
        prototype: HTMLBrxAccordionLegacyEntryItemElement;
        new (): HTMLBrxAccordionLegacyEntryItemElement;
    };
    interface HTMLBrxButtonElement extends Components.BrxButton, HTMLStencilElement {
    }
    var HTMLBrxButtonElement: {
        prototype: HTMLBrxButtonElement;
        new (): HTMLBrxButtonElement;
    };
    interface HTMLBrxCheckboxElement extends Components.BrxCheckbox, HTMLStencilElement {
    }
    var HTMLBrxCheckboxElement: {
        prototype: HTMLBrxCheckboxElement;
        new (): HTMLBrxCheckboxElement;
    };
    interface HTMLBrxCollapseTriggerElement extends Components.BrxCollapseTrigger, HTMLStencilElement {
    }
    var HTMLBrxCollapseTriggerElement: {
        prototype: HTMLBrxCollapseTriggerElement;
        new (): HTMLBrxCollapseTriggerElement;
    };
    interface HTMLBrxDividerElement extends Components.BrxDivider, HTMLStencilElement {
    }
    var HTMLBrxDividerElement: {
        prototype: HTMLBrxDividerElement;
        new (): HTMLBrxDividerElement;
    };
    interface HTMLBrxDropdownElement extends Components.BrxDropdown, HTMLStencilElement {
    }
    var HTMLBrxDropdownElement: {
        prototype: HTMLBrxDropdownElement;
        new (): HTMLBrxDropdownElement;
    };
    interface HTMLBrxDropdownTriggerElement extends Components.BrxDropdownTrigger, HTMLStencilElement {
    }
    var HTMLBrxDropdownTriggerElement: {
        prototype: HTMLBrxDropdownTriggerElement;
        new (): HTMLBrxDropdownTriggerElement;
    };
    interface HTMLBrxIconElement extends Components.BrxIcon, HTMLStencilElement {
    }
    var HTMLBrxIconElement: {
        prototype: HTMLBrxIconElement;
        new (): HTMLBrxIconElement;
    };
    interface HTMLBrxItemElement extends Components.BrxItem, HTMLStencilElement {
    }
    var HTMLBrxItemElement: {
        prototype: HTMLBrxItemElement;
        new (): HTMLBrxItemElement;
    };
    interface HTMLBrxListElement extends Components.BrxList, HTMLStencilElement {
    }
    var HTMLBrxListElement: {
        prototype: HTMLBrxListElement;
        new (): HTMLBrxListElement;
    };
    interface HTMLBrxListHeaderElement extends Components.BrxListHeader, HTMLStencilElement {
    }
    var HTMLBrxListHeaderElement: {
        prototype: HTMLBrxListHeaderElement;
        new (): HTMLBrxListHeaderElement;
    };
    interface HTMLBrxLoadingElement extends Components.BrxLoading, HTMLStencilElement {
    }
    var HTMLBrxLoadingElement: {
        prototype: HTMLBrxLoadingElement;
        new (): HTMLBrxLoadingElement;
    };
    interface HTMLBrxRadioElement extends Components.BrxRadio, HTMLStencilElement {
    }
    var HTMLBrxRadioElement: {
        prototype: HTMLBrxRadioElement;
        new (): HTMLBrxRadioElement;
    };
    interface HTMLBrxRadioGroupElement extends Components.BrxRadioGroup, HTMLStencilElement {
    }
    var HTMLBrxRadioGroupElement: {
        prototype: HTMLBrxRadioGroupElement;
        new (): HTMLBrxRadioGroupElement;
    };
    interface HTMLBrxScrimElement extends Components.BrxScrim, HTMLStencilElement {
    }
    var HTMLBrxScrimElement: {
        prototype: HTMLBrxScrimElement;
        new (): HTMLBrxScrimElement;
    };
    interface HTMLBrxScrimTriggerElement extends Components.BrxScrimTrigger, HTMLStencilElement {
    }
    var HTMLBrxScrimTriggerElement: {
        prototype: HTMLBrxScrimTriggerElement;
        new (): HTMLBrxScrimTriggerElement;
    };
    interface HTMLBrxTooltipElement extends Components.BrxTooltip, HTMLStencilElement {
    }
    var HTMLBrxTooltipElement: {
        prototype: HTMLBrxTooltipElement;
        new (): HTMLBrxTooltipElement;
    };
    interface HTMLBrxTooltipContentElement extends Components.BrxTooltipContent, HTMLStencilElement {
    }
    var HTMLBrxTooltipContentElement: {
        prototype: HTMLBrxTooltipContentElement;
        new (): HTMLBrxTooltipContentElement;
    };
    interface HTMLElementTagNameMap {
        "brx-accordion-legacy": HTMLBrxAccordionLegacyElement;
        "brx-accordion-legacy-entry": HTMLBrxAccordionLegacyEntryElement;
        "brx-accordion-legacy-entry-content": HTMLBrxAccordionLegacyEntryContentElement;
        "brx-accordion-legacy-entry-item": HTMLBrxAccordionLegacyEntryItemElement;
        "brx-button": HTMLBrxButtonElement;
        "brx-checkbox": HTMLBrxCheckboxElement;
        "brx-collapse-trigger": HTMLBrxCollapseTriggerElement;
        "brx-divider": HTMLBrxDividerElement;
        "brx-dropdown": HTMLBrxDropdownElement;
        "brx-dropdown-trigger": HTMLBrxDropdownTriggerElement;
        "brx-icon": HTMLBrxIconElement;
        "brx-item": HTMLBrxItemElement;
        "brx-list": HTMLBrxListElement;
        "brx-list-header": HTMLBrxListHeaderElement;
        "brx-loading": HTMLBrxLoadingElement;
        "brx-radio": HTMLBrxRadioElement;
        "brx-radio-group": HTMLBrxRadioGroupElement;
        "brx-scrim": HTMLBrxScrimElement;
        "brx-scrim-trigger": HTMLBrxScrimTriggerElement;
        "brx-tooltip": HTMLBrxTooltipElement;
        "brx-tooltip-content": HTMLBrxTooltipContentElement;
    }
}
declare namespace LocalJSX {
    interface BrxAccordionLegacy {
        "entries"?: any;
        "negative"?: boolean;
        "single"?: boolean;
    }
    interface BrxAccordionLegacyEntry {
        "content"?: string | undefined;
        "entryId"?: string | undefined;
        "headerTitle"?: string | undefined;
    }
    interface BrxAccordionLegacyEntryContent {
        "entryId"?: string | undefined;
    }
    interface BrxAccordionLegacyEntryItem {
        "active"?: boolean;
        "entryId"?: string | undefined;
        "onCollapseChange"?: (event: BrxAccordionLegacyEntryItemCustomEvent<HTMLBrxAccordionLegacyEntryItemElement>) => void;
    }
    interface BrxButton {
        "active"?: boolean;
        "block"?: boolean;
        /**
          * The type of button.
         */
        "buttonType"?: string;
        "circle"?: boolean;
        "color"?: 'danger' | 'success' | 'warning' | 'info';
        "darkMode"?: boolean;
        /**
          * If `true`, the user cannot interact with the button.
         */
        "disabled"?: boolean;
        /**
          * This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want).
         */
        "download"?: string | undefined;
        /**
          * Contains a URL or a URL fragment that the hyperlink points to. If this property is set, an anchor tag will be rendered.
         */
        "href"?: string | undefined;
        "loading"?: boolean;
        /**
          * CSS class names to be applied to the native button element.
         */
        "nativeClass"?: string | undefined;
        /**
          * Emitted when the button loses focus.
         */
        "onBrxBlur"?: (event: BrxButtonCustomEvent<void>) => void;
        /**
          * Emitted when the button has focus.
         */
        "onBrxFocus"?: (event: BrxButtonCustomEvent<void>) => void;
        /**
          * Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
         */
        "rel"?: string | undefined;
        "size"?: 'large' | 'medium' | 'small' | 'xsmall';
        /**
          * If `true`, activates a button with a heavier font weight.
         */
        "strong"?: boolean;
        /**
          * Specifies where to display the linked URL. Only applies when an `href` is provided. Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
         */
        "target"?: string | undefined;
        /**
          * The type of the button.
         */
        "type"?: 'submit' | 'reset' | 'button';
        "variant"?: 'primary' | 'secondary' | 'default';
    }
    interface BrxCheckbox {
        /**
          * If `true`, the checkbox is selected.
         */
        "checked"?: boolean | undefined;
        "darkMode"?: boolean;
        /**
          * If `true`, the user cannot interact with the checkbox.
         */
        "disabled"?: boolean;
        "hiddenLabel"?: boolean;
        /**
          * If `true`, the checkbox will visually appear as indeterminate.
         */
        "indeterminate"?: boolean;
        "inputId"?: string | undefined;
        "invalid"?: boolean | undefined;
        "label"?: string | undefined;
        /**
          * The name of the control, which is submitted with the form data.
         */
        "name"?: string;
        /**
          * Emitted when the checkbox loses focus.
         */
        "onBrxBlur"?: (event: BrxCheckboxCustomEvent<void>) => void;
        /**
          * Emitted when the checked property has changed.
         */
        "onBrxChange"?: (event: BrxCheckboxCustomEvent<CheckboxChangeEventDetail>) => void;
        /**
          * Emitted when the checkbox has focus.
         */
        "onBrxFocus"?: (event: BrxCheckboxCustomEvent<void>) => void;
        "size"?: 'small' | 'medium';
        "state"?: 'invalid' | 'danger' | undefined;
        "valid"?: boolean | undefined;
        /**
          * The value of the checkbox does not mean if it's checked or not, use the `checked` property for that.  The value of a checkbox is analogous to the value of an `<input type="checkbox">`, it's only used when the checkbox participates in a native `<form>`.
         */
        "value"?: any | null;
    }
    interface BrxCollapseTrigger {
        "breakpoint"?: string | undefined;
        "iconToHide"?: string;
        "iconToShow"?: string;
        "onBrxSetTargetVisibilityStatus"?: (event: BrxCollapseTriggerCustomEvent<void>) => void;
        "onBrxTriggerClick"?: (event: BrxCollapseTriggerCustomEvent<void>) => void;
        "propTarget"?: HTMLElement | string;
        "useIcons"?: boolean;
    }
    interface BrxDivider {
        "darkMode"?: boolean;
        "dashed"?: boolean;
        "size"?: 'sm' | 'md' | 'lg';
        "vertical"?: boolean;
    }
    interface BrxDropdown {
    }
    interface BrxDropdownTrigger {
        "breakpoint"?: string | undefined;
        "iconToHide"?: string;
        "iconToShow"?: string;
        "propTarget"?: HTMLElement | string;
        "useIcons"?: boolean;
    }
    interface BrxIcon {
        /**
          * Define o carregamento automático dos recursos.
         */
        "loadResources"?: boolean;
        /**
          * O nome do ícone. bicycle -> fa5/fas/bicycle
         */
        "name"?: string;
    }
    interface BrxItem {
        "button"?: boolean;
        "disabled"?: boolean;
        "passStyles"?: boolean;
        "selected"?: boolean;
    }
    interface BrxList {
        "headerTitle"?: string | undefined;
        "horizontal"?: boolean;
        "lines"?: 'one' | 'two' | 'three' | undefined;
    }
    interface BrxListHeader {
        "headerTitle"?: string;
    }
    interface BrxLoading {
        "progress"?: string | number | undefined;
        "size"?: string | undefined;
        "variant"?: string | undefined;
    }
    interface BrxRadio {
        /**
          * The tabindex of the radio button.
         */
        "buttonTabindex"?: number;
        /**
          * If `true`, the radio is selected.
         */
        "checked"?: boolean;
        /**
          * If `true`, the user cannot interact with the radio.
         */
        "disabled"?: boolean;
        "inputId"?: string | undefined;
        "label"?: string;
        /**
          * The name of the control, which is submitted with the form data.
         */
        "name"?: string;
        /**
          * Emitted when the radio button loses focus.
         */
        "onBrxBlur"?: (event: BrxRadioCustomEvent<void>) => void;
        "onBrxChange"?: (event: BrxRadioCustomEvent<RadioChangeEventDetail>) => void;
        /**
          * Emitted when the radio button has focus.
         */
        "onBrxFocus"?: (event: BrxRadioCustomEvent<void>) => void;
        /**
          * the value of the radio.
         */
        "value"?: any | null;
    }
    interface BrxRadioGroup {
        /**
          * If `true`, the radios can be deselected.
         */
        "allowEmptySelection"?: boolean;
        "label"?: HTMLLabelElement | string | null;
        /**
          * The name of the control, which is submitted with the form data.
         */
        "name"?: string;
        /**
          * Emitted when the value has changed.
         */
        "onBrxChange"?: (event: BrxRadioGroupCustomEvent<RadioGroupChangeEventDetail>) => void;
        /**
          * the value of the radio group.
         */
        "value"?: any | null;
    }
    interface BrxScrim {
        "active"?: boolean;
        "closeElement"?: string | undefined;
        "type"?: 'foco' | 'legibilidade' | 'inibicao';
    }
    interface BrxScrimTrigger {
        "target"?: HTMLBrxScrimElement | string;
    }
    interface BrxTooltip {
        "active"?: boolean;
        "color"?: string;
        "place"?: 'top' | 'bottom' | 'left' | 'right';
        "popover"?: boolean;
        "target"?: string | HTMLElement | undefined;
        "text"?: string | undefined;
        "timer"?: number | undefined;
        "type"?: string;
    }
    interface BrxTooltipContent {
        "color"?: string;
        "place"?: string;
        "popover"?: boolean;
    }
    interface IntrinsicElements {
        "brx-accordion-legacy": BrxAccordionLegacy;
        "brx-accordion-legacy-entry": BrxAccordionLegacyEntry;
        "brx-accordion-legacy-entry-content": BrxAccordionLegacyEntryContent;
        "brx-accordion-legacy-entry-item": BrxAccordionLegacyEntryItem;
        "brx-button": BrxButton;
        "brx-checkbox": BrxCheckbox;
        "brx-collapse-trigger": BrxCollapseTrigger;
        "brx-divider": BrxDivider;
        "brx-dropdown": BrxDropdown;
        "brx-dropdown-trigger": BrxDropdownTrigger;
        "brx-icon": BrxIcon;
        "brx-item": BrxItem;
        "brx-list": BrxList;
        "brx-list-header": BrxListHeader;
        "brx-loading": BrxLoading;
        "brx-radio": BrxRadio;
        "brx-radio-group": BrxRadioGroup;
        "brx-scrim": BrxScrim;
        "brx-scrim-trigger": BrxScrimTrigger;
        "brx-tooltip": BrxTooltip;
        "brx-tooltip-content": BrxTooltipContent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "brx-accordion-legacy": LocalJSX.BrxAccordionLegacy & JSXBase.HTMLAttributes<HTMLBrxAccordionLegacyElement>;
            "brx-accordion-legacy-entry": LocalJSX.BrxAccordionLegacyEntry & JSXBase.HTMLAttributes<HTMLBrxAccordionLegacyEntryElement>;
            "brx-accordion-legacy-entry-content": LocalJSX.BrxAccordionLegacyEntryContent & JSXBase.HTMLAttributes<HTMLBrxAccordionLegacyEntryContentElement>;
            "brx-accordion-legacy-entry-item": LocalJSX.BrxAccordionLegacyEntryItem & JSXBase.HTMLAttributes<HTMLBrxAccordionLegacyEntryItemElement>;
            "brx-button": LocalJSX.BrxButton & JSXBase.HTMLAttributes<HTMLBrxButtonElement>;
            "brx-checkbox": LocalJSX.BrxCheckbox & JSXBase.HTMLAttributes<HTMLBrxCheckboxElement>;
            "brx-collapse-trigger": LocalJSX.BrxCollapseTrigger & JSXBase.HTMLAttributes<HTMLBrxCollapseTriggerElement>;
            "brx-divider": LocalJSX.BrxDivider & JSXBase.HTMLAttributes<HTMLBrxDividerElement>;
            "brx-dropdown": LocalJSX.BrxDropdown & JSXBase.HTMLAttributes<HTMLBrxDropdownElement>;
            "brx-dropdown-trigger": LocalJSX.BrxDropdownTrigger & JSXBase.HTMLAttributes<HTMLBrxDropdownTriggerElement>;
            "brx-icon": LocalJSX.BrxIcon & JSXBase.HTMLAttributes<HTMLBrxIconElement>;
            "brx-item": LocalJSX.BrxItem & JSXBase.HTMLAttributes<HTMLBrxItemElement>;
            "brx-list": LocalJSX.BrxList & JSXBase.HTMLAttributes<HTMLBrxListElement>;
            "brx-list-header": LocalJSX.BrxListHeader & JSXBase.HTMLAttributes<HTMLBrxListHeaderElement>;
            "brx-loading": LocalJSX.BrxLoading & JSXBase.HTMLAttributes<HTMLBrxLoadingElement>;
            "brx-radio": LocalJSX.BrxRadio & JSXBase.HTMLAttributes<HTMLBrxRadioElement>;
            "brx-radio-group": LocalJSX.BrxRadioGroup & JSXBase.HTMLAttributes<HTMLBrxRadioGroupElement>;
            "brx-scrim": LocalJSX.BrxScrim & JSXBase.HTMLAttributes<HTMLBrxScrimElement>;
            "brx-scrim-trigger": LocalJSX.BrxScrimTrigger & JSXBase.HTMLAttributes<HTMLBrxScrimTriggerElement>;
            "brx-tooltip": LocalJSX.BrxTooltip & JSXBase.HTMLAttributes<HTMLBrxTooltipElement>;
            "brx-tooltip-content": LocalJSX.BrxTooltipContent & JSXBase.HTMLAttributes<HTMLBrxTooltipContentElement>;
        }
    }
}
