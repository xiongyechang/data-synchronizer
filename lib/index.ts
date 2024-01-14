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
import type { onCallback, SendTarget, Options, EngineOptions, onSendMessageErrorCallback } from 'types/index';

export { DataSynchronizer } from './DataSynchronizer';

const isSupport = isSupportBroadcastChannel || isSupportLocalStorage;

export const useDataSynchronizer = (options: Options) => {
  if (!isSupport) {
    throw new Error(`the lib isn't support your browser.`);
  }

  const defaultOptions: Omit<Options, 'chan'> = {
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

  const onMessage = (callback: onCallback) => o.onMessage(options, callback);

  const onMessageError = (callback: onSendMessageErrorCallback) => o.onSendMessageError(options, callback);

  const sendMessage = (value: any, params: SendTarget) => o.sendMessage(options, value, params);
 
  const close = () => o.close(options);

  return {
    onMessage,
    sendMessage,
    onMessageError,
    close,
  };
}
