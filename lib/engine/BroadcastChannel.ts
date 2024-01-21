import { canInvoke, fromJsonStringData, handleData } from "lib/utils/index";

const ChannelMap: Map<string, BroadcastChannel> = new Map();

export const onBroadcastChannelMessage = (chan: string | string[], callback) => {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan.forEach(c => {
    const bc = ChannelMap.get(c) || new BroadcastChannel(c);
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
    ChannelMap.set(c, bc);
  })
}

export const sendBroadcastChannelMessage = (chan: string | string [], o, params) => {
  if (typeof chan === "string") {
    chan = [chan];
  }
  const jsonData = handleData(o, params);
  chan.forEach(c => {
    const bc = ChannelMap.get(c) || new BroadcastChannel(c);
    bc.postMessage(JSON.stringify(jsonData));
  })
}

export const onSendBroadcastChannelMessageError = (chan: string | string[], callback) => {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan.forEach(c => {
    const bc = ChannelMap.get(c) || new BroadcastChannel(c); 
    bc.addEventListener('messageerror', (event: MessageEvent<any>) => {
      typeof callback === 'function' && callback(event);
    });
    ChannelMap.set(c, bc);
  })
}

export const closeBroadcastChannel = (chan: string | string[]) => {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan.forEach(c => {
    const bc = ChannelMap.get(c);
    if (!bc) {
      throw new Error(`the channel named ${chan} isn't exist`);
    }
    bc.close();
    ChannelMap.delete(c);
  })
  
}