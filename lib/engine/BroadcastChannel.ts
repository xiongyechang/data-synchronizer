import { canInvoke, fromJsonStringData, handleData } from "lib/utils/index";
import type { onMessageMethod, sendMessageMethod, onSendMessageErrorMethod, closeMethod } from "types/index";

const map: Record<string, BroadcastChannel> = {};

export const onBroadcastChannelMessage: onMessageMethod = (options, callback) => {
  let { chan } = options;
  const channel = map[chan];
  const bc = channel || new BroadcastChannel(chan);
  bc.addEventListener('message', (event: MessageEvent<any>) => {
    try {
      const data = fromJsonStringData(event.data);
      const source = data.$origin;
      if (source === location.href) return;
      const invoke = canInvoke(location.href, data.$target);
      if (!invoke) return;
      typeof callback === 'function' && callback(data);
    } catch (error) {
      console.error(error);
    }
  });
  !channel &&  (map[chan] = bc);
}

export const sendBroadcastChannelMessage: sendMessageMethod = (options, o, params) => {
  const { chan } = options;
  const jsonData = handleData(o, params);
  const channel = map[chan];
  const bc = channel || new BroadcastChannel(chan);
  bc.postMessage(JSON.stringify(jsonData));
  !channel &&  (map[chan] = bc);
}

export const onSendBroadcastChannelMessageError: onSendMessageErrorMethod = (options, callback) => {
  const { chan } = options;
  const channel = map[chan];
  const bc = channel || new BroadcastChannel(chan);
  bc.addEventListener('messageerror', (event: MessageEvent<any>) => {
      typeof callback === 'function' && callback(event);
  });
  !channel && (map[chan] = bc);
}

export const closeBroadcastChannel: closeMethod = (options) => {
  const { chan } = options;
  const channel = map[chan];
  if (!channel) {
    throw new Error(`the channel named ${chan} isn't exist`);
  }
  channel.close();
}