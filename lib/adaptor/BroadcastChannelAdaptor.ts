import { Options, SendTarget, onCallback } from 'types/index';
import { BaseAdaptor } from './BaseAdaptor';
import { closeBroadcastChannel, onBroadcastChannelMessage, onSendBroadcastChannelMessageError, sendBroadcastChannelMessage } from 'lib/engine/index';

export class BroadcastChannelAdaptor extends BaseAdaptor {

  constructor(private options: Options) {
    super();
  }
  
  onMessage(callback: onCallback) {
    onBroadcastChannelMessage(this.options, callback);
  }

  sendMessage(o: any, targets: SendTarget) {
    sendBroadcastChannelMessage(this.options, o, targets);
  }

  onSendMessageError(callback) {
    onSendBroadcastChannelMessageError(this.options, callback);
  }

  close() {
    closeBroadcastChannel(this.options);
  }
}