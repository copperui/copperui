import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-1e49f12c.js';
import { g as globalScripts } from './app-globals-045e03ae.js';
import './_commonjsHelpers-8fe71198.js';

/*
 Stencil Client Patch Browser v2.20.0 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-6be6f662.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy(JSON.parse("[[\"brx-breadcrumb\",[[4,\"brx-breadcrumb\",{\"dropdownId\":[1537,\"dropdown-id\"]},[[9,\"resize\",\"handleGlobalResize\"]]]]],[\"brx-select\",[[4,\"brx-select\",{\"darkMode\":[516,\"dark-mode\"],\"hideSearchIcon\":[4,\"hide-search-icon\"],\"placeholder\":[1],\"name\":[513],\"nativeSelect\":[4,\"native-select\"],\"label\":[1],\"inputId\":[1025,\"input-id\"],\"multiple\":[516],\"disableToggleAll\":[4,\"disable-toggle-all\"],\"selectAllLabel\":[1,\"select-all-label\"],\"unselectAllLabel\":[1,\"unselect-all-label\"],\"value\":[1],\"controlledValue\":[1,\"controlled-value\"],\"expanded\":[32],\"showFeedbackNotFound\":[32],\"currentValue\":[32]},[[8,\"click\",\"handleGlobalClick\"],[0,\"click\",\"handleToggleClick\"],[0,\"brxFocus\",\"handleInputFocus\"],[0,\"brxSelectOptionChange\",\"handleOptionChangeEvent\"],[0,\"brxChange\",\"handleInputChange\"],[0,\"keydown\",\"handleKeydownEvent\"]]]]],[\"brx-upload\",[[4,\"brx-upload\",{\"multiple\":[4],\"disabled\":[4],\"value\":[16],\"handleUploadFiles\":[16],\"status\":[1537],\"label\":[1],\"accept\":[1],\"autofocus\":[4],\"name\":[1],\"readonly\":[4],\"required\":[4],\"spellcheck\":[4],\"step\":[1],\"size\":[2],\"hiddenLabel\":[516,\"hidden-label\"],\"labelClass\":[513,\"label-class\"],\"inputId\":[1537,\"input-id\"],\"attachmentAssets\":[32],\"messages\":[32],\"hasFocus\":[32],\"getAttachmentAssets\":[64]},[[0,\"click\",\"handleUploadButtonClick\"],[0,\"change\",\"handleInputChange\"]]]]],[\"brx-pagination-ellipsis\",[[4,\"brx-pagination-ellipsis\",{\"dropdownId\":[1025,\"dropdown-id\"]}]]],[\"brx-accordion-legacy\",[[4,\"brx-accordion-legacy\",{\"single\":[516],\"negative\":[516],\"entries\":[8]},[[0,\"collapseChange\",\"handleCollapseChange\"]]]]],[\"brx-datetimepicker\",[[4,\"brx-datetimepicker\",{\"type\":[1],\"mode\":[1],\"placeholder\":[1],\"config\":[1],\"value\":[8],\"controlledValue\":[8,\"controlled-value\"],\"currentValue\":[32]},[[0,\"keyup\",\"handleKeyup\"],[0,\"blur\",\"handleBlur\"]]]]],[\"brx-step-progress-btn\",[[4,\"brx-step-progress-btn\",{\"alert\":[513],\"active\":[1540],\"disabled\":[1540],\"stepNum\":[1,\"step-num\"],\"tooltipText\":[1,\"tooltip-text\"],\"setDisabled\":[64],\"setActive\":[64]}]]],[\"brx-tab\",[[4,\"brx-tab\",{\"counter\":[516],\"label\":[1],\"value\":[513],\"iconName\":[1,\"icon-name\"],\"tabTitle\":[1,\"tab-title\"],\"tooltipText\":[1,\"tooltip-text\"],\"setActive\":[64]}]]],[\"brx-pagination-item\",[[4,\"brx-pagination-item\",{\"_target\":[520,\"target\"],\"active\":[516],\"disabled\":[516],\"getTarget\":[64]},[[0,\"click\",\"handleClick\"]]]]],[\"brx-accordion-trigger\",[[4,\"brx-accordion-trigger\",{\"useIcons\":[4,\"use-icons\"],\"breakpoint\":[1],\"iconToHide\":[1,\"icon-to-hide\"],\"iconToShow\":[1,\"icon-to-show\"],\"target\":[513],\"group\":[513],\"close\":[64]}]]],[\"brx-avatar\",[[0,\"brx-avatar\",{\"size\":[513],\"src\":[513],\"alt\":[513],\"name\":[513],\"mode\":[513],\"contentClass\":[513,\"content-class\"]}]]],[\"brx-list\",[[4,\"brx-list\",{\"horizontal\":[516],\"lines\":[513],\"headerTitle\":[513,\"header-title\"]}]]],[\"brx-signin\",[[4,\"brx-signin\",{\"label\":[513],\"showIcon\":[516,\"show-icon\"],\"showLabel\":[516,\"show-label\"],\"iconName\":[513,\"icon-name\"]}]]],[\"brx-card-content\",[[4,\"brx-card-content\"]]],[\"brx-card-footer\",[[4,\"brx-card-footer\"]]],[\"brx-card-header\",[[4,\"brx-card-header\"]]],[\"brx-checkgroup\",[[4,\"brx-checkgroup\"]]],[\"brx-divider\",[[4,\"brx-divider\",{\"vertical\":[516],\"dashed\":[516],\"darkMode\":[516,\"dark-mode\"],\"size\":[513]}]]],[\"brx-modal\",[[4,\"brx-modal\",{\"size\":[513]}]]],[\"brx-modal-body\",[[4,\"brx-modal-body\"]]],[\"brx-modal-footer\",[[4,\"brx-modal-footer\"]]],[\"brx-modal-header\",[[4,\"brx-modal-header\"]]],[\"brx-notification\",[[4,\"brx-notification\",{\"_dismiss\":[64]},[[1,\"click\",\"handleClick\"],[0,\"\",\"render\"]]]]],[\"brx-pagination\",[[4,\"brx-pagination\",{\"page\":[2],\"size\":[513],\"controlledPage\":[2,\"controlled-page\"],\"total\":[2],\"currentPage\":[32]},[[0,\"click\",\"handlePaginationTargetClick\"]]]]],[\"brx-pagination-arrows\",[[4,\"brx-pagination-arrows\"]]],[\"brx-pagination-go-to-page\",[[4,\"brx-pagination-go-to-page\"]]],[\"brx-pagination-information\",[[4,\"brx-pagination-information\"]]],[\"brx-pagination-items\",[[4,\"brx-pagination-items\"]]],[\"brx-pagination-per-page\",[[4,\"brx-pagination-per-page\"]]],[\"brx-radio-group\",[[4,\"brx-radio-group\",{\"labelId\":[1025,\"label-id\"],\"label\":[513],\"name\":[513],\"value\":[8],\"controlledValue\":[8,\"controlled-value\"],\"allowEmptySelection\":[516,\"allow-empty-selection\"],\"currentValue\":[32],\"getCurrentValue\":[64]},[[0,\"brxChange\",\"handleRadioBrxChange\"]]]]],[\"brx-scrim\",[[4,\"brx-scrim\",{\"active\":[4],\"controlledActive\":[4,\"controlled-active\"],\"type\":[513],\"closeElement\":[1,\"close-element\"],\"currentActive\":[32],\"showScrim\":[64],\"hideScrim\":[64]},[[0,\"click\",\"handleClick\"]]]]],[\"brx-scrim-trigger\",[[4,\"brx-scrim-trigger\",{\"target\":[513]},[[0,\"click\",\"handleClick\"]]]]],[\"brx-skiplink\",[[4,\"brx-skiplink\",{\"full\":[516]}]]],[\"brx-step\",[[4,\"brx-step\",{\"type\":[1],\"value\":[2],\"controlledValue\":[2,\"controlled-value\"],\"currentValue\":[32],\"setCurrentValue\":[64]},[[0,\"click\",\"handleProgressButtonClick\"]]]]],[\"brx-step-progress\",[[4,\"brx-step-progress\"]]],[\"brx-tabs\",[[4,\"brx-tabs\",{\"name\":[513],\"counter\":[516],\"size\":[513],\"darkMode\":[516,\"dark-mode\"],\"value\":[1],\"controlledValue\":[1,\"controlled-value\"],\"currentValue\":[32],\"getCurrentValue\":[64]},[[0,\"click\",\"handleTabClick\"],[0,\"focusout\",\"handleFocusOut\"],[0,\"keyup\",\"handleKeyUp\"]]]]],[\"brx-tabs-panel\",[[4,\"brx-tabs-panel\",{\"active\":[516],\"value\":[513]}]]],[\"brx-tabs-panels\",[[4,\"brx-tabs-panels\",{\"name\":[513],\"darkMode\":[516,\"dark-mode\"],\"currentValue\":[32]},[[9,\"brxTabChange\",\"handleGlobalTabChange\"]]]]],[\"brx-tag\",[[4,\"brx-tag\",{\"selected\":[1540],\"interaction\":[516],\"interactionSelect\":[516,\"interaction-select\"]},[[1,\"click\",\"handleInnerClick\"],[5,\"change\",\"handleChange\"]]]]],[\"brx-textarea\",[[4,\"brx-textarea\",{\"inputId\":[1025,\"input-id\"],\"value\":[1],\"controlledValue\":[1,\"controlled-value\"],\"darkMode\":[4,\"dark-mode\"],\"label\":[1],\"inline\":[4],\"counter\":[1],\"color\":[1],\"fireFocusEvents\":[4,\"fire-focus-events\"],\"autocapitalize\":[1],\"autofocus\":[4],\"clearOnEdit\":[1028,\"clear-on-edit\"],\"disabled\":[4],\"inputmode\":[1],\"enterkeyhint\":[1],\"maxlength\":[2],\"minlength\":[2],\"name\":[1],\"placeholder\":[1],\"readonly\":[4],\"required\":[4],\"spellcheck\":[4],\"cols\":[2],\"rows\":[2],\"wrap\":[1],\"currentValue\":[32],\"hasFocus\":[32],\"setFocus\":[64],\"setBlur\":[64],\"getInputElement\":[64]}]]],[\"brx-accordion-legacy-entry-item\",[[4,\"brx-accordion-legacy-entry-item\",{\"active\":[1540],\"entryId\":[513,\"entry-id\"]},[[0,\"click\",\"handleClick\"]]]]],[\"brx-accordion-legacy-entry-content\",[[4,\"brx-accordion-legacy-entry-content\",{\"entryId\":[513,\"entry-id\"]}]]],[\"brx-accordion-legacy-entry\",[[4,\"brx-accordion-legacy-entry\",{\"content\":[513],\"entryId\":[1537,\"entry-id\"],\"headerTitle\":[513,\"header-title\"]}]]],[\"brx-message\",[[4,\"brx-message\",{\"messageTitle\":[513,\"message-title\"],\"dismissable\":[516],\"variant\":[513],\"severity\":[513],\"dismiss\":[64]}]]],[\"brx-select-option\",[[4,\"brx-select-option\",{\"label\":[1],\"inputId\":[1025,\"input-id\"],\"multiple\":[4],\"highlighted\":[516],\"value\":[1],\"checked\":[4],\"visible\":[4],\"toggleChecked\":[64]},[[0,\"brxChange\",\"handleBrxChange\"],[0,\"click\",\"handleClick\"]]]]],[\"brx-select-toggle\",[[4,\"brx-select-toggle\",{\"expanded\":[4]}]]],[\"brx-card\",[[4,\"brx-card\",{\"hFixed\":[516,\"h-fixed\"],\"hover\":[516],\"darkMode\":[516,\"dark-mode\"],\"disabled\":[516],\"syncDisabledState\":[64]}]]],[\"brx-breadcrumb-card\",[[0,\"brx-breadcrumb-card\",{\"hidden\":[516],\"cardItems\":[32]}]]],[\"brx-breadcrumb-item\",[[4,\"brx-breadcrumb-item\",{\"home\":[516],\"active\":[516]}]]],[\"brx-breadcrumb-list\",[[4,\"brx-breadcrumb-list\"]]],[\"brx-dropdown\",[[4,\"brx-dropdown\"]]],[\"brx-list-header\",[[4,\"brx-list-header\",{\"headerTitle\":[513,\"header-title\"]}]]],[\"brx-input\",[[4,\"brx-input\",{\"value\":[8],\"controlledValue\":[8,\"controlled-value\"],\"accept\":[1],\"autocapitalize\":[1],\"autocomplete\":[1],\"autocorrect\":[1],\"autofocus\":[4],\"clearInput\":[4,\"clear-input\"],\"clearOnEdit\":[4,\"clear-on-edit\"],\"disabled\":[4],\"enterkeyhint\":[1],\"inputmode\":[1],\"max\":[1],\"maxlength\":[2],\"min\":[1],\"minlength\":[2],\"multiple\":[4],\"name\":[1],\"pattern\":[1],\"placeholder\":[1],\"readonly\":[4],\"required\":[4],\"spellcheck\":[4],\"step\":[1],\"size\":[2],\"type\":[1],\"label\":[1],\"hiddenLabel\":[516,\"hidden-label\"],\"labelClass\":[1,\"label-class\"],\"inline\":[516],\"inputId\":[1025,\"input-id\"],\"density\":[513],\"startIconName\":[1,\"start-icon-name\"],\"color\":[513],\"enablePasswordToggle\":[4,\"enable-password-toggle\"],\"currentValue\":[32],\"hasFocus\":[32],\"showPassword\":[32],\"setFocus\":[64],\"getInputElement\":[64],\"toggleShowPassword\":[64]}]]],[\"brx-tooltip-content\",[[4,\"brx-tooltip-content\",{\"popover\":[516],\"place\":[513],\"color\":[513]}]]],[\"brx-tooltip-auto\",[[4,\"brx-tooltip-auto\",{\"place\":[1],\"tooltipText\":[1,\"tooltip-text\"],\"tooltipContentId\":[32]}]]],[\"brx-collapse-trigger\",[[4,\"brx-collapse-trigger\",{\"useIcons\":[4,\"use-icons\"],\"breakpoint\":[1],\"iconToHide\":[1,\"icon-to-hide\"],\"iconToShow\":[1,\"icon-to-show\"],\"target\":[513],\"triggerEl\":[32],\"targetEl\":[32],\"open\":[64],\"close\":[64],\"getTrigger\":[64],\"getTarget\":[64],\"getIsOpen\":[64]},[[0,\"click\",\"handleClick\"]]]]],[\"brx-dropdown-trigger\",[[4,\"brx-dropdown-trigger\",{\"useIcons\":[516,\"use-icons\"],\"breakpoint\":[513],\"iconToHide\":[513,\"icon-to-hide\"],\"iconToShow\":[513,\"icon-to-show\"],\"target\":[513],\"dropdown\":[32]},[[5,\"mousedown\",\"handleDropdown\"]]]]],[\"brx-checkbox\",[[4,\"brx-checkbox\",{\"label\":[1],\"name\":[513],\"checked\":[4],\"controlledChecked\":[4,\"controlled-checked\"],\"indeterminate\":[4],\"disabled\":[516],\"size\":[513],\"valid\":[516],\"danger\":[516],\"invalid\":[516],\"state\":[513],\"darkMode\":[516,\"dark-mode\"],\"hiddenLabel\":[516,\"hidden-label\"],\"inputId\":[1025,\"input-id\"],\"value\":[520],\"child\":[513],\"propParent\":[520,\"parent\"],\"checkAllLabel\":[1,\"check-all-label\"],\"uncheckAllLabel\":[1,\"uncheck-all-label\"],\"currentChecked\":[32],\"currentIndeterminate\":[32],\"getCurrentState\":[64],\"setState\":[64],\"getNativeChecked\":[64]},[[8,\"brxChange\",\"handleGlobalChange\"]]]]],[\"brx-radio\",[[0,\"brx-radio\",{\"checked\":[4],\"controlledChecked\":[4,\"controlled-checked\"],\"buttonTabindex\":[514,\"button-tabindex\"],\"name\":[513],\"disabled\":[516],\"value\":[520],\"label\":[513],\"inputId\":[1537,\"input-id\"],\"currentChecked\":[32],\"setFocus\":[64],\"setButtonTabindex\":[64],\"getCurrentState\":[64]},[[9,\"brxChange\",\"handleGlobalRadioChange\"],[9,\"brxRadioGroupUpdate\",\"handleGlobalRadioGroupUpdate\"]]]]],[\"brx-icon\",[[0,\"brx-icon\",{\"name\":[513],\"loadResources\":[516,\"load-resources\"],\"iconClass\":[513,\"icon-class\"]}]]],[\"brx-tooltip\",[[4,\"brx-tooltip\",{\"type\":[513],\"text\":[513],\"timer\":[514],\"color\":[513],\"place\":[513],\"target\":[513],\"active\":[516],\"popover\":[516],\"activator\":[32],\"component\":[32],\"placement\":[32],\"closeTimer\":[32],\"notification\":[32],\"popperInstance\":[32],\"hide\":[64]}]]],[\"brx-item\",[[4,\"brx-item\",{\"button\":[516],\"disabled\":[516],\"selected\":[1540],\"passStyles\":[516,\"pass-styles\"]},[[0,\"brxUpdate\",\"watchChange\"]]]]],[\"brx-loading\",[[4,\"brx-loading\",{\"variant\":[513],\"size\":[513],\"progress\":[520]}]]],[\"brx-button\",[[4,\"brx-button\",{\"nativeClass\":[513,\"native-class\"],\"buttonType\":[1025,\"button-type\"],\"disabled\":[516],\"download\":[1],\"href\":[1],\"rel\":[1],\"strong\":[4],\"target\":[1],\"type\":[1],\"block\":[516],\"circle\":[516],\"darkMode\":[516,\"dark-mode\"],\"active\":[516],\"loading\":[516],\"color\":[513],\"size\":[513],\"variant\":[513],\"signin\":[520],\"magic\":[516]}]]]]"), options);
});
