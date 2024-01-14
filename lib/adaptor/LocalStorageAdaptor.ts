import { Options, SendTarget, onCallback } from 'types/index';
import { BaseAdaptor } from './BaseAdaptor';
import { closeLocalStorage, onLocalStorageMessage, onSendLocalStorageMessageError, sendLocalStorageMessage } from 'lib/engine/index';

export class LocalStorageAdaptor extends BaseAdaptor {

  constructor(private options: Options) {
    super()
  }

  onMessage(callback: onCallback) {
    onLocalStorageMessage(this.options, callback);
  }

  onSendMessageError(callback) {
    onSendLocalStorageMessageError(this.options, callback);
  }

  sendMessage(o: any, targets: SendTarget) {
    sendLocalStorageMessage(this.options, o, targets)
  }

  close() {
    closeLocalStorage(this.options);
  }
}