import { BrxMessage } from '../brx-message/brx-message';

export type IHandleUploadFiles = (asset: AttachmentAsset, position: number) => Promise<void>;

export interface UploadChangeEventDetail {
  attachmentAssets: AttachmentAsset[];
}

export type IMessage = {
  id: string;
  text: string;
  variant: BrxMessage['variant'];
  severity: BrxMessage['severity'];
};

export type AttachmentAsset = {
  id: string;
  file: File;
  nowait?: boolean;
  requested?: boolean;
};
