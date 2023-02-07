import { r as registerInstance, f as createEvent, h, e as Host, F as Fragment, g as getElement } from './index-1e49f12c.js';
import { C as CleanupManager } from './cleanup-87caa243.js';
import { w as wait, p as preventDefaults, a as generateUniqueId, h as getFileListFromFiles, i as calcSize } from './helpers-da43c71e.js';
import { i as inheritAriaAttributes } from './inherited-attributes-f0d17fe4.js';

const brxUploadCss = "brx-upload{display:block}brx-upload brx-loading{display:block;width:100%}brx-upload input{display:none}brx-upload .upload-button{--button-radius:100em;--button-xsmall:24px;--button-small:32px;--button-medium:40px;--button-large:48px;--button-size:var(--button-medium)}brx-upload .upload-button .brx-button-native{align-items:center;background-color:transparent;border:0;border-radius:var(--button-radius);color:var(--interactive);cursor:pointer;display:inline-flex;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-semi-bold);height:var(--button-size);justify-content:center;overflow:hidden;padding:0 var(--spacing-scale-3x);position:relative;text-align:center;vertical-align:middle;white-space:nowrap;width:auto}brx-upload .upload-button .brx-button-native{border:var(--surface-width-sm) dashed var(--interactive);border-radius:var(--surface-rounder-sm);display:block;font-size:var(--font-size-scale-base);font-style:italic;font-weight:var(--font-weight-regular);margin-top:var(--spacing-scale-half);max-width:550px;min-height:var(--button-size);padding-left:var(--spacing-scale-2x);padding-right:var(--spacing-scale-2x);text-align:left;width:100%}brx-upload .upload-button .brx-button-native .svg-inline--fa,brx-upload .upload-button .brx-button-native .fa,brx-upload .upload-button .brx-button-native .fab,brx-upload .upload-button .brx-button-native .fad,brx-upload .upload-button .brx-button-native .fal,brx-upload .upload-button .brx-button-native .far,brx-upload .upload-button .brx-button-native .fas{margin-right:var(--spacing-scale-base)}brx-upload .upload-list{max-width:550px;position:relative}brx-upload .upload-list brx-tooltip{overflow:hidden;max-width:100%;display:flex;flex:1 1;padding-right:1rem}brx-upload .upload-list brx-tooltip .content{max-width:100%;overflow:hidden}brx-upload .upload-list brx-tooltip .content span{display:block;align-self:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}brx-upload .upload-list .support{flex:0 1;align-items:center;display:flex;white-space:nowrap}brx-upload brx-tooltip-content{max-width:93%}brx-upload .upload-button:disabled .brx-button-native,brx-upload .upload-button[disabled] .brx-button-native{cursor:not-allowed}brx-upload .upload-button:not(:disabled):not([disabled]) .brx-button-native{--focus-offset:var(--spacing-scale-half)}brx-upload .upload-button:not(:disabled):not([disabled]) .brx-button-native:focus{outline:none}brx-upload .upload-button:not(:disabled):not([disabled]) .brx-button-native.focus-visible,brx-upload .upload-button:not(:disabled):not([disabled]) .brx-button-native:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}brx-upload .upload-button:not(:disabled):not([disabled]) .brx-button-native:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}brx-upload .upload-button:not(:disabled):not([disabled]) .brx-button-native:not(:disabled):active{background-image:linear-gradient(rgba(var(--interactive-rgb), var(--pressed)), rgba(var(--interactive-rgb), var(--pressed)))}brx-upload .upload-button[active] .brx-button-native{--hover:var(--hover-dark);background-color:var(--active);color:var(--color-dark)}brx-upload .upload-button brx-loading{width:auto;height:auto}brx-upload .upload-button brx-loading::after{margin:0;border-color:var(--interactive) var(--interactive) transparent;border-style:solid}brx-upload .upload-button[variant=primary] brx-loading::after,brx-upload .upload-button[color=success] brx-loading::after,brx-upload .upload-button[color=danger] brx-loading::after,brx-upload .upload-button[color=info] brx-loading::after{border-color:var(--background) var(--background) transparent}brx-upload[status=success] .upload-button .brx-button-native{border-color:var(--success)}brx-upload[status=danger] .upload-button .brx-button-native{border-color:var(--danger)}brx-upload[status=warning] .upload-button .brx-button-native{border-color:var(--warning)}brx-upload[status=info] .upload-button .brx-button-native{border-color:var(--info)}brx-upload.dragging .upload-button .brx-button-native{background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}";

var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrxUpload_dragAndDropEventsCleanup, _BrxUpload_buttonEl;
const EVENTS_TO_HIGHLIGHT = ['dragenter', 'dragover'];
const EVENTS_TO_REMOVE_HIGHLIGHT = ['dragleave', 'drop'];
const EVENTS_TO_PREVENT_DEFAULTS = ['dragenter', 'dragover', 'dragleave', 'drop'];
const DOMStrings = {
  inputNative: 'input',
  fileList: '.upload-list',
  buttonContainer: '.upload-button',
  buttonNative: '.upload-button button',
};
const DEFAULT_HANDLE_UPLOAD_FILES = () => {
  return wait(0);
};
const BrxUpload = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxChange = createEvent(this, "brxChange", 7);
    _BrxUpload_dragAndDropEventsCleanup.set(this, new CleanupManager());
    this.updateFileListInProgress = false;
    _BrxUpload_buttonEl.set(this, void 0);
    this.multiple = false;
    this.disabled = false;
    this.value = null;
    this.handleUploadFiles = DEFAULT_HANDLE_UPLOAD_FILES;
    this.attachmentAssets = [];
    this.status = undefined;
    this.label = undefined;
    this.messages = [];
    this.hasFocus = false;
    this.accept = undefined;
    this.autofocus = false;
    this.name = undefined;
    this.readonly = false;
    this.required = false;
    this.spellcheck = false;
    this.step = undefined;
    this.size = undefined;
    this.hiddenLabel = undefined;
    this.labelClass = undefined;
    this.inputId = undefined;
  }
  set buttonEl(element) {
    const prev = this.buttonEl;
    __classPrivateFieldSet(this, _BrxUpload_buttonEl, element, "f");
    if (element !== prev) {
      this.setDragAndDropBehavior();
    }
  }
  get buttonEl() {
    var _a;
    return (_a = __classPrivateFieldGet(this, _BrxUpload_buttonEl, "f")) !== null && _a !== void 0 ? _a : this.el.querySelector(DOMStrings.buttonNative);
  }
  get textHelpEl() {
    return document.querySelector('.text-base');
  }
  get inputEl() {
    return this.el.querySelector(DOMStrings.inputNative);
  }
  get uploadListEl() {
    return this.el.querySelector(DOMStrings.fileList);
  }
  async getAttachmentAssets() {
    return this.attachmentAssets;
  }
  setAttachmentAssets(attachmentAssets) {
    if (this.value === null) {
      this.attachmentAssets = attachmentAssets;
    }
    this.brxChange.emit({ attachmentAssets });
  }
  handleValueChange() {
    const { value } = this;
    if (value !== null) {
      this.attachmentAssets = value;
    }
  }
  handleAttachmentAssetsChange() {
    const { multiple, attachmentAssets, inputEl } = this;
    if (multiple) {
      inputEl.files = this.getFileList();
    }
    else if (attachmentAssets.length === 0) {
      inputEl.value = '';
    }
    this.updateFileList();
  }
  clickUpload() {
    this.inputEl.click();
  }
  handleFiles(rawFiles) {
    const { multiple } = this;
    this.messages = [];
    const files = rawFiles.length === 0 ? Array.from(this.inputEl.files) : Array.from(rawFiles);
    if (!multiple && files.length > 1) {
      this.addFeedback('danger', 'É permitido o envio de somente 1 arquivo.');
    }
    else if (!multiple && this.attachmentAssets.length > 0) {
      this.changeFiles(files);
      this.addFeedback('warning', 'O arquivo enviado anteriormente foi substituído.');
    }
    else {
      this.addFiles(files);
    }
  }
  hightLight() {
    this.el.classList.add('dragging');
  }
  unHightLight() {
    this.el.classList.remove('dragging');
  }
  handleDrop(event) {
    this.unHightLight();
    const { files } = event.dataTransfer;
    this.handleFiles(files);
  }
  async setDragAndDropBehavior() {
    const { buttonEl } = this;
    if (!buttonEl) {
      return;
    }
    await __classPrivateFieldGet(this, _BrxUpload_dragAndDropEventsCleanup, "f").run();
    {
      const handleEventToPreventDefault = (event) => {
        preventDefaults(event);
      };
      for (const event of EVENTS_TO_PREVENT_DEFAULTS) {
        buttonEl.addEventListener(event, handleEventToPreventDefault);
        __classPrivateFieldGet(this, _BrxUpload_dragAndDropEventsCleanup, "f").add(() => {
          buttonEl.removeEventListener(event, handleEventToPreventDefault);
        });
      }
    }
    {
      const handleEventToHighlight = () => {
        this.hightLight();
      };
      for (const event of EVENTS_TO_HIGHLIGHT) {
        buttonEl.addEventListener(event, handleEventToHighlight);
        __classPrivateFieldGet(this, _BrxUpload_dragAndDropEventsCleanup, "f").add(() => {
          buttonEl.removeEventListener(event, handleEventToHighlight);
        });
      }
    }
    {
      const handleEventToRemoveHighlight = () => {
        this.unHightLight();
      };
      for (const event of EVENTS_TO_REMOVE_HIGHLIGHT) {
        buttonEl.addEventListener(event, handleEventToRemoveHighlight);
        __classPrivateFieldGet(this, _BrxUpload_dragAndDropEventsCleanup, "f").add(() => {
          buttonEl.removeEventListener(event, handleEventToRemoveHighlight);
        });
      }
    }
    {
      const handleEventDrop = (event) => {
        this.handleDrop(event);
      };
      buttonEl.addEventListener('drop', handleEventDrop);
      __classPrivateFieldGet(this, _BrxUpload_dragAndDropEventsCleanup, "f").add(() => {
        buttonEl.removeEventListener('drop', handleEventDrop);
      });
    }
  }
  addMessage(message) {
    this.messages = [...this.messages, message];
  }
  addFeedback(severity, text) {
    const message = {
      text,
      severity,
      variant: 'feedback',
      id: `${generateUniqueId()}`,
    };
    this.addMessage(message);
    this.status = severity;
  }
  changeFiles(incomingFiles) {
    const attachmentAssets = incomingFiles.map(draft => draft instanceof Blob
      ? {
        file: draft,
        id: generateUniqueId(),
      }
      : draft);
    this.setAttachmentAssets(attachmentAssets);
  }
  addFiles(files) {
    this.changeFiles([...this.attachmentAssets, ...files]);
  }
  updateAsset(id, recipe) {
    this.changeFiles(this.attachmentAssets.map(attachmentAsset => (attachmentAsset.id === id ? recipe(attachmentAsset) : attachmentAsset)));
  }
  updateFileList() {
    if (this.updateFileListInProgress) {
      return;
    }
    this.updateFileListInProgress = true;
    this.status = undefined;
    if (this.el.nextElementSibling === this.textHelpEl) {
      this.textHelpEl.style.display = 'none';
    }
    if (!this.attachmentAssets.length) {
      this.messages = [];
      if (this.el.nextElementSibling === this.textHelpEl) {
        this.textHelpEl.style.display = '';
      }
    }
    else {
      this.messages = [];
      for (let i = 0; i < this.attachmentAssets.length; i++) {
        if ('nowait' in this.attachmentAssets[i]) {
          if (this.attachmentAssets[i].nowait) {
            this.renderItem(i);
          }
        }
        else if (!this.attachmentAssets[i].requested) {
          this.uploadingFile(i);
        }
      }
    }
    this.updateFileListInProgress = false;
  }
  /**
   * Faz upload de arquivo na posição definida
   */
  uploadingFile(position) {
    const id = this.getAssetIdByIndex(position);
    const asset = this.getAssetById(id);
    if (this.handleUploadFiles) {
      this.updateAsset(id, draft => (Object.assign(Object.assign({}, draft), { requested: true })));
      this.handleUploadFiles(asset, position).then(() => {
        this.updateAsset(id, draft => (Object.assign(Object.assign({}, draft), { nowait: true })));
      });
    }
  }
  /**
   * Renderiza item na posição definida
   */
  renderItem(position) {
    const id = this.getAssetIdByIndex(position);
    this.updateAsset(id, draft => (Object.assign(Object.assign({}, draft), { nowait: true })));
  }
  getAssetIdByIndex(index) {
    var _a;
    const asset = this.attachmentAssets[index];
    return (_a = asset === null || asset === void 0 ? void 0 : asset.id) !== null && _a !== void 0 ? _a : null;
  }
  getAssetById(id) {
    return this.attachmentAssets.find(i => i.id === id);
  }
  /**
   * Remove arquivo na posição definida
   */
  removeFileByIndex(index) {
    const id = this.getAssetIdByIndex(index);
    this.removeFileById(id);
  }
  removeFileById(id) {
    if (!id) {
      return;
    }
    this.status = undefined;
    this.messages = [];
    this.changeFiles(this.attachmentAssets.filter(i => i.id !== id));
  }
  handleUploadButtonClick(event) {
    const target = event.target;
    const button = target.closest(DOMStrings.buttonNative);
    if (button) {
      this.clickUpload();
    }
  }
  handleInputChange(event) {
    const target = event.target;
    const input = target.closest(DOMStrings.inputNative);
    if (input) {
      this.handleFiles(input.files);
    }
  }
  getFileList() {
    return getFileListFromFiles(this.attachmentAssets.map(i => i.file));
  }
  componentWillLoad() {
    if (!this.inputId) {
      this.inputId = generateUniqueId();
    }
  }
  componentShouldUpdate(_newVal, _oldVal, propName) {
    switch (propName) {
      case 'buttonEl': {
        return false;
      }
      default: {
        return true;
      }
    }
  }
  get inheritedAttributes() {
    return inheritAriaAttributes(this.el);
  }
  render() {
    const { hiddenLabel, labelClass, attachmentAssets, messages, disabled, multiple, label, inputId, inheritedAttributes } = this;
    const labelId = `${inputId}-lbl`;
    return (h(Host, null, h("label", { class: `upload-label ${hiddenLabel ? 'sr-only' : ''} ${labelClass}`, id: labelId, htmlFor: inputId }, label), h("input", Object.assign({ class: "upload-input", id: inputId, type: "file", multiple: multiple, disabled: disabled, "aria-labelledby": labelId, accept: this.accept, autoFocus: this.autofocus, name: this.name, readOnly: this.readonly, required: this.required, step: this.step, size: this.size, tabindex: this.tabindex, spellcheck: this.spellcheck ? 'true' : undefined }, inheritedAttributes)), h("div", { class: 'upload-button' }, h("button", { type: "button", class: 'brx-button-native', ref: el => {
        this.buttonEl = el;
      } }, h("brx-icon", { name: "fa5/fas/upload" }), h("span", null, multiple ? 'Selecione o(s) arquivo(s).' : 'Selecione o arquivo.'))), messages.map(message => (h("brx-message", { key: message.id, variant: message.variant, severity: message.severity, class: "mt-1" }, message.text))), h("div", { class: "upload-list" }, attachmentAssets.map(({ id, file, requested, nowait }) => {
      const loading = requested && !nowait;
      return (h("brx-item", { key: id, class: 'd-flex' }, !loading && (h(Fragment, null, h("brx-tooltip", { class: 'mr-auto', place: "top", color: "info", text: file.name }, h("div", { class: "content text-primary-default " }, h("span", null, file.name))), h("div", { class: "name" }), h("div", { class: "support mr-n2" }, h("span", { class: "mr-1" }, calcSize(file.size)), h("brx-button", { circle: true, type: "button", onClick: event => {
          preventDefaults(event);
          this.removeFileById(id);
        } }, h("brx-icon", { name: "fa5/fas/trash" }))))), loading && h("brx-loading", { class: 'd-flex mt-1', size: "small" })));
    })), h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["handleValueChange"],
    "attachmentAssets": ["handleAttachmentAssetsChange"]
  }; }
};
_BrxUpload_dragAndDropEventsCleanup = new WeakMap(), _BrxUpload_buttonEl = new WeakMap();
BrxUpload.style = brxUploadCss;

export { BrxUpload as brx_upload };
