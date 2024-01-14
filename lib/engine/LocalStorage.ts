import { canInvoke, fromJsonStringData, handleData } from "lib/utils/index";
import type { Options, onMessageMethod, sendMessageMethod, onSendMessageErrorMethod, onCallback, closeMethod } from "types/index";

const map: Record<string, onCallback[]> = {};

export const onLocalStorageMessage: onMessageMethod = (options: Options, callback) => {
  const { chan } = options;
  window.addEventListener('storage', (event: StorageEvent) => {
    if (event.key === chan) {
      try {
        const o = fromJsonStringData(event.newValue);
        const invoke = canInvoke(location.href, o.$target);
        if (!invoke) return;
        typeof callback === 'function' && callback(o);
      } catch (error) {
        console.error(error);
      }
    }
  });
}

export const sendLocalStorageMessage: sendMessageMethod = (options, o, params) => {
  const { chan } = options;
  const res = handleData(o, params);
  const jsonString = JSON.stringify(res);
  try {
    window.localStorage.setItem(chan, jsonString);
  } catch (error) {
    const callbacks = map[chan] || [];
    (callbacks || []).forEach(callback => {
      callback(error);
    })
  }
}

export const onSendLocalStorageMessageError: onSendMessageErrorMethod = (options, callback) => {
  const { chan } = options;
  if (map[chan] instanceof Array) {
    map[chan].push(callback);
  } else {
    map[chan] = [callback];
  }
}

export const closeLocalStorage: closeMethod = (options) => {
  const { chan } = options;
  const setItem = localStorage.setItem;
  localStorage.setItem = (key: string, value) => {
    if (key !== chan) {
      setItem(key, value)
    }
  }

  const getItem = localStorage.getItem;

  localStorage.getItem = (key: string) => {
    if (key !== chan) {
      return getItem(key)
    }
  }
}
