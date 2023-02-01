import { Component, ComponentInterface, Element, Event, EventEmitter, Fragment, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { CleanupManager } from '../../utils/cleanup';
import { calcSize, generateUniqueId, getFileListFromFiles, preventDefaults, wait } from '../../utils/helpers';
import { inheritAriaAttributes } from '../../utils/inherited-attributes';
import { BrxMessage } from '../brx-message/brx-message';
import { IHandleUploadFiles, AttachmentAsset, IMessage, UploadChangeEventDetail } from './brx-upload-interfaces';

const EVENTS_TO_HIGHLIGHT = ['dragenter', 'dragover'] as const;
const EVENTS_TO_REMOVE_HIGHLIGHT = ['dragleave', 'drop'] as const;
const EVENTS_TO_PREVENT_DEFAULTS = ['dragenter', 'dragover', 'dragleave', 'drop'] as const;

const DOMStrings = {
  inputNative: 'input',
  fileList: '.upload-list',
  buttonContainer: '.upload-button',
  buttonNative: '.upload-button button',
} as const;

const DEFAULT_HANDLE_UPLOAD_FILES = () => {
  console.log('brx-upload#handleUploadFiles padrão | noop');
  return wait(0);
};

@Component({
  tag: 'brx-upload',
  styleUrl: 'brx-upload.scss',
  shadow: false,
})
export class BrxUpload implements ComponentInterface {
  #dragAndDropEventsCleanup = new CleanupManager();

  @Element()
  el: HTMLElement;

  @Event()
  brxChange: EventEmitter<UploadChangeEventDetail>;

  private updateFileListInProgress = false;

  #buttonEl: HTMLButtonElement;

  set buttonEl(element: HTMLButtonElement) {
    const prev = this.buttonEl;

    this.#buttonEl = element;

    if (element !== prev) {
      this.setDragAndDropBehavior();
    }
  }

  get buttonEl() {
    return this.#buttonEl ?? this.el.querySelector(DOMStrings.buttonNative);
  }

  get textHelpEl() {
    return document.querySelector<HTMLElement>('.text-base');
  }

  get inputEl() {
    return this.el.querySelector<HTMLInputElement>(DOMStrings.inputNative);
  }

  get uploadListEl() {
    return this.el.querySelector<HTMLDivElement>(DOMStrings.fileList);
  }

  @Prop()
  multiple: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  value: AttachmentAsset[] | null = null;

  @Prop()
  handleUploadFiles: IHandleUploadFiles = DEFAULT_HANDLE_UPLOAD_FILES;

  @State()
  attachmentAssets: AttachmentAsset[] = [];

  @Prop({ reflect: true, mutable: true })
  status: 'danger' | 'warning' | 'info' | 'success' | undefined;

  @Prop()
  label: string | undefined = undefined;

  @State()
  messages: IMessage[] = [];

  @Method()
  async getAttachmentAssets() {
    return this.attachmentAssets;
  }

  setAttachmentAssets(attachmentAssets: AttachmentAsset[]) {
    if (this.value === null) {
      this.attachmentAssets = attachmentAssets;
    }

    this.brxChange.emit({ attachmentAssets });
  }

  @Watch('value')
  handleValueChange() {
    const { value } = this;

    if (value !== null) {
      this.attachmentAssets = value;
    }
  }

  @Watch('attachmentAssets')
  handleAttachmentAssetsChange() {
    const { multiple, attachmentAssets, inputEl } = this;

    if (multiple) {
      inputEl.files = this.getFileList();
    } else if (attachmentAssets.length === 0) {
      inputEl.value = '';
    }

    this.updateFileList();
  }

  clickUpload() {
    this.inputEl.click();
  }

  handleFiles(rawFiles: FileList | File[]) {
    const { multiple } = this;

    this.messages = [];

    const files = rawFiles.length === 0 ? Array.from(this.inputEl.files) : Array.from(rawFiles);

    if (!multiple && files.length > 1) {
      this.addFeedback('danger', 'É permitido o envio de somente 1 arquivo.');
    } else if (!multiple && this.attachmentAssets.length > 0) {
      this.changeFiles(files);
      this.addFeedback('warning', 'O arquivo enviado anteriormente foi substituído.');
    } else {
      this.addFiles(files);
    }
  }

  hightLight() {
    this.el.classList.add('dragging');
  }

  unHightLight() {
    this.el.classList.remove('dragging');
  }

  handleDrop(event: DragEvent) {
    this.unHightLight();
    const { files } = event.dataTransfer;
    this.handleFiles(files);
  }

  async setDragAndDropBehavior() {
    const { buttonEl } = this;

    if (!buttonEl) {
      return;
    }

    await this.#dragAndDropEventsCleanup.run();

    {
      const handleEventToPreventDefault = (event: Event) => {
        preventDefaults(event);
      };

      for (const event of EVENTS_TO_PREVENT_DEFAULTS) {
        buttonEl.addEventListener(event, handleEventToPreventDefault);

        this.#dragAndDropEventsCleanup.add(() => {
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

        this.#dragAndDropEventsCleanup.add(() => {
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

        this.#dragAndDropEventsCleanup.add(() => {
          buttonEl.removeEventListener(event, handleEventToRemoveHighlight);
        });
      }
    }

    {
      const handleEventDrop = (event: DragEvent) => {
        this.handleDrop(event);
      };

      buttonEl.addEventListener('drop', handleEventDrop);

      this.#dragAndDropEventsCleanup.add(() => {
        buttonEl.removeEventListener('drop', handleEventDrop);
      });
    }
  }

  addMessage(message: IMessage) {
    this.messages = [...this.messages, message];
  }

  addFeedback(severity: BrxMessage['severity'], text: string) {
    const message: IMessage = {
      text,
      severity,
      variant: 'feedback',
      id: `${generateUniqueId()}`,
    };

    this.addMessage(message);

    this.status = severity;
  }

  changeFiles(incomingFiles: (File | AttachmentAsset)[]) {
    const attachmentAssets = incomingFiles.map<AttachmentAsset>(draft =>
      draft instanceof Blob
        ? {
            file: draft,
            id: generateUniqueId(),
          }
        : draft,
    );

    this.setAttachmentAssets(attachmentAssets);
  }

  addFiles(files: File[]) {
    this.changeFiles([...this.attachmentAssets, ...files]);
  }

  updateAsset(id: string, recipe: (draft: AttachmentAsset) => AttachmentAsset) {
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
    } else {
      this.messages = [];
      for (let i = 0; i < this.attachmentAssets.length; i++) {
        if ('nowait' in this.attachmentAssets[i]) {
          if (this.attachmentAssets[i].nowait) {
            this.renderItem(i);
          }
        } else if (!this.attachmentAssets[i].requested) {
          this.uploadingFile(i);
        }
      }
    }

    this.updateFileListInProgress = false;
  }

  /**
   * Faz upload de arquivo na posição definida
   */
  uploadingFile(position: number) {
    const id = this.getAssetIdByIndex(position);

    const asset = this.getAssetById(id);

    if (this.handleUploadFiles) {
      this.updateAsset(id, draft => ({ ...draft, requested: true }));

      this.handleUploadFiles(asset, position).then(() => {
        this.updateAsset(id, draft => ({ ...draft, nowait: true }));
      });
    }
  }

  /**
   * Renderiza item na posição definida
   */
  renderItem(position: number) {
    const id = this.getAssetIdByIndex(position);
    this.updateAsset(id, draft => ({ ...draft, nowait: true }));
  }

  getAssetIdByIndex(index: number) {
    const asset = this.attachmentAssets[index];
    return asset?.id ?? null;
  }

  getAssetById(id: string) {
    return this.attachmentAssets.find(i => i.id === id);
  }

  /**
   * Remove arquivo na posição definida
   */
  removeFileByIndex(index: number) {
    const id = this.getAssetIdByIndex(index);
    this.removeFileById(id);
  }

  removeFileById(id: string | null) {
    if (!id) {
      return;
    }

    this.status = undefined;
    this.messages = [];

    this.changeFiles(this.attachmentAssets.filter(i => i.id !== id));
  }

  @Listen('click', { capture: false })
  handleUploadButtonClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const button = target.closest<HTMLButtonElement>(DOMStrings.buttonNative);

    if (button) {
      this.clickUpload();
    }
  }

  @Listen('change', { capture: false })
  handleInputChange(event: Event) {
    const target = event.target as HTMLElement;

    const input = target.closest<HTMLInputElement>(DOMStrings.inputNative);

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

  componentShouldUpdate(_newVal: any, _oldVal: any, propName: string): boolean | void {
    switch (propName) {
      case 'buttonEl': {
        return false;
      }

      default: {
        return true;
      }
    }
  }

  @State()
  hasFocus = false;

  /**
   * If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.
   */
  @Prop()
  accept?: string;

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop()
  autofocus = false;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop()
  name: string;

  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop()
  readonly = false;

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop()
  required = false;

  /**
   * If `true`, the element will have its spelling and grammar checked.
   */
  @Prop()
  spellcheck = false;

  /**
   * Works with the min and max attributes to limit the increments at which a value can be set.
   * Possible values are: `"any"` or a positive floating point number.
   */
  @Prop()
  step?: string;

  /**
   * The initial size of the control. This value is in pixels unless the value of the type attribute is `"text"` or `"password"`, in which case it is an integer number of characters. This attribute applies only when the `type` attribute is set to `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
   */
  @Prop()
  size?: number;

  @Prop({ reflect: true })
  hiddenLabel: boolean;

  @Prop({ reflect: true })
  labelClass: string;

  @Prop({ reflect: true, mutable: true })
  inputId: string | undefined = undefined;

  private tabindex?: string | number;

  get inheritedAttributes() {
    return inheritAriaAttributes(this.el);
  }

  render() {
    const { hiddenLabel, labelClass, attachmentAssets, messages, disabled, multiple, label, inputId, inheritedAttributes } = this;

    const labelId = `${inputId}-lbl`;

    return (
      <Host>
        <label class={`upload-label ${hiddenLabel ? 'sr-only' : ''} ${labelClass}`} id={labelId} htmlFor={inputId}>
          {label}
        </label>

        <input
          class="upload-input"
          id={inputId}
          type="file"
          multiple={multiple}
          disabled={disabled}
          aria-labelledby={labelId}
          accept={this.accept}
          autoFocus={this.autofocus}
          name={this.name}
          readOnly={this.readonly}
          required={this.required}
          step={this.step}
          size={this.size}
          tabindex={this.tabindex}
          spellcheck={this.spellcheck ? 'true' : undefined}
          {...inheritedAttributes}
        />

        <div class={'upload-button'}>
          <button
            type="button"
            class={'brx-button-native'}
            ref={el => {
              this.buttonEl = el;
            }}
          >
            <brx-icon name="fa5/fas/upload"></brx-icon>
            <span>{multiple ? 'Selecione o(s) arquivo(s).' : 'Selecione o arquivo.'}</span>
          </button>
        </div>

        {messages.map(message => (
          <brx-message key={message.id} variant={message.variant} severity={message.severity} class="mt-1">
            {message.text}
          </brx-message>
        ))}

        <div class="upload-list">
          {attachmentAssets.map(({ id, file, requested, nowait }) => {
            const loading = requested && !nowait;

            return (
              <brx-item key={id} class={'d-flex'}>
                {!loading && (
                  <Fragment>
                    <brx-tooltip class={'mr-auto'} place="top" color="info" text={file.name}>
                      <div class="content text-primary-default ">
                        <span>{file.name}</span>
                      </div>
                    </brx-tooltip>

                    <div class="name"></div>

                    <div class="support mr-n2">
                      <span class="mr-1">{calcSize(file.size)}</span>

                      <brx-button
                        circle
                        type="button"
                        onClick={event => {
                          preventDefaults(event);
                          this.removeFileById(id);
                        }}
                      >
                        <brx-icon name="fa5/fas/trash"></brx-icon>
                      </brx-button>
                    </div>
                  </Fragment>
                )}

                {loading && <brx-loading class={'d-flex mt-1'} size="small"></brx-loading>}
              </brx-item>
            );
          })}
        </div>

        <slot></slot>
      </Host>
    );
  }
}
