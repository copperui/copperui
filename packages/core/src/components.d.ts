/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
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
}
export interface BrxAccordionLegacyEntryItemCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLBrxAccordionLegacyEntryItemElement;
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
    interface HTMLBrxIconElement extends Components.BrxIcon, HTMLStencilElement {
    }
    var HTMLBrxIconElement: {
        prototype: HTMLBrxIconElement;
        new (): HTMLBrxIconElement;
    };
    interface HTMLElementTagNameMap {
        "brx-accordion-legacy": HTMLBrxAccordionLegacyElement;
        "brx-accordion-legacy-entry": HTMLBrxAccordionLegacyEntryElement;
        "brx-accordion-legacy-entry-content": HTMLBrxAccordionLegacyEntryContentElement;
        "brx-accordion-legacy-entry-item": HTMLBrxAccordionLegacyEntryItemElement;
        "brx-icon": HTMLBrxIconElement;
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
    interface IntrinsicElements {
        "brx-accordion-legacy": BrxAccordionLegacy;
        "brx-accordion-legacy-entry": BrxAccordionLegacyEntry;
        "brx-accordion-legacy-entry-content": BrxAccordionLegacyEntryContent;
        "brx-accordion-legacy-entry-item": BrxAccordionLegacyEntryItem;
        "brx-icon": BrxIcon;
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
            "brx-icon": LocalJSX.BrxIcon & JSXBase.HTMLAttributes<HTMLBrxIconElement>;
        }
    }
}
