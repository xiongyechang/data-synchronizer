import { SendTarget, onCallback } from 'types/index';
import { BaseAdaptor } from './BaseAdaptor';
import { closeLocalStorage, onLocalStorageMessage, onSendLocalStorageMessageError, sendLocalStorageMessage } from 'lib/engine/index';

export class LocalStorageAdaptor extends BaseAdaptor {

  onMessage(chan, callback) {
    onLocalStorageMessage(chan, callback);
  }

  onSendMessageError(chan, callback) {
    onSendLocalStorageMessageError(chan, callback);
  }

  sendMessage(chan, o, targets) {
    sendLocalStorageMessage(chan, o, targets)
  }

  close(chan) {
    closeLocalStorage(chan);
  }
}