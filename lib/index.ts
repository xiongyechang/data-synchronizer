import {
  onLocalStorageMessage,
  sendLocalStorageMessage,
  onBroadcastChannelMessage,
  sendBroadcastChannelMessage,
  closeBroadcastChannel,
  closeLocalStorage,
  onSendLocalStorageMessageError,
  onSendBroadcastChannelMessageError,
} from 'lib/engine/index';
import { isSupportBroadcastChannel, isSupportLocalStorage } from 'lib/utils/index';
import { SendTarget, Options, EngineOptions } from 'types/index';

export { DataSynchronizer } from './DataSynchronizer';

const isSupport = isSupportBroadcastChannel || isSupportLocalStorage;

export const useDataSynchronizer = (options: Options) => {
  if (!isSupport) {
    throw new Error(`the lib isn't support your browser.`);
  }

  const defaultOptions: Options = {
    engine: 'BroadcastChannel',
  }

  options = Object.assign(defaultOptions, options);

  const strategies: Array<EngineOptions> = [
    {
      engine: 'BroadcastChannel',
      support: isSupportBroadcastChannel,
      onMessage: onBroadcastChannelMessage,
      sendMessage: sendBroadcastChannelMessage,
      onSendMessageError: onSendBroadcastChannelMessageError,
      close: closeBroadcastChannel,
    },
    {
      engine: 'LocalStorage',
      support: isSupportLocalStorage,
      onMessage: onLocalStorageMessage,
      sendMessage: sendLocalStorageMessage,
      onSendMessageError: onSendLocalStorageMessageError,
      close: closeLocalStorage
    }
  ]

  const o = strategies.find(item => item.engine === options.engine && item.support);

  const onMessage = (chan, callback) => o.onMessage(chan, callback);

  const onMessageError = (chan, callback) => o.onSendMessageError(chan, callback);

  const sendMessage = (chan, value: any, params: SendTarget) => o.sendMessage(chan, value, params);
 
  const close = (chan) => o.close(chan);

  return {
    onMessage,
    sendMessage,
    onMessageError,
    close,
  };
}
