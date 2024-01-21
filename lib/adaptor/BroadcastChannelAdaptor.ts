import { BaseAdaptor } from './BaseAdaptor';
import { closeBroadcastChannel, onBroadcastChannelMessage, onSendBroadcastChannelMessageError, sendBroadcastChannelMessage } from 'lib/engine/index';

export class BroadcastChannelAdaptor extends BaseAdaptor {
  onMessage(chan, callback) {
    onBroadcastChannelMessage(chan, callback);
  }

  sendMessage(chan, o, targets) {
    sendBroadcastChannelMessage(chan, o, targets);
  }

  onSendMessageError(chan, callback) {
    onSendBroadcastChannelMessageError(chan, callback);
  }

  close(chan) {
    closeBroadcastChannel(chan);
  }
}