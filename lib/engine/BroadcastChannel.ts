import { canInvoke, fromJsonStringData, handleData, uniqueArr } from "lib/utils/index";

const ChannelMap: Map<string, BroadcastChannel[]> = new Map();

export const onBroadcastChannelMessage = (chan: string | string[], callback) => {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  chan.forEach(c => {
    const bc = new BroadcastChannel(c);
    bc.addEventListener('message', (event: MessageEvent<any>) => {
      try {
        const data = fromJsonStringData(event.data);
        const invoke = canInvoke(location.href, data.$target);
        if (!invoke) return;
        typeof callback === 'function' && callback(data);
      } catch (error) {
        console.error(error);
      }
    });
    const bcList = ChannelMap.get(c) || [];
    bcList.push(bc);
    ChannelMap.set(c, bcList);
  })
}

export const sendBroadcastChannelMessage = (chan: string | string [], o, params) => {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  const jsonData = handleData(o, params);
  chan.forEach(c => {
    const bc = new BroadcastChannel(c);
    bc.postMessage(JSON.stringify(jsonData));
    const bcList = ChannelMap.get(c) || [];
    bcList.push(bc);
    ChannelMap.set(c, bcList);
  })
}

export const onSendBroadcastChannelMessageError = (chan: string | string[], callback) => {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  chan.forEach(c => {
    const bc = new BroadcastChannel(c); 
    bc.addEventListener('messageerror', (event: MessageEvent<any>) => {
      typeof callback === 'function' && callback(event);
    });
    const bcList = ChannelMap.get(c) || [];
    bcList.push(bc);
    ChannelMap.set(c, bcList);
  })
}

export const closeBroadcastChannel = (chan: string | string[]) => {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  chan.forEach(c => {
    const bcList = ChannelMap.get(c) || [];
    if (!bcList.length) {
      throw new Error(`the channel named ${chan} isn't exist`);
    }
    bcList.forEach(bc => {
      bc.close();
    })
    ChannelMap.delete(c);
  })
  
}