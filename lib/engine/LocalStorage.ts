import { canInvoke, fromJsonStringData, handleData, uniqueArr } from "lib/utils/index";

const OnSendMessageErrorMap: Map<string, Function[]> = new Map();

export const onLocalStorageMessage = (chan: string | string[], callback: Function) => {

  if (typeof chan === "string") {
    chan = [chan];
  }

  chan = uniqueArr(chan);
  
  window.addEventListener("storage", (event: StorageEvent) => {
    const { key } = event;
    if (!chan.includes(key)) return;
    try {
      const o = fromJsonStringData(event.newValue);
      const invoke = canInvoke(location.href, o.$target);
      if (!invoke) return;
      callback(o);
    } catch (error) {
      console.error(error);
    }
  });
};

export const sendLocalStorageMessage = (chan: string | string[], o, params) => {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  const res = handleData(o, params);
  const jsonString = JSON.stringify(res);
  chan.forEach((c) => {
    try {
      window.localStorage.setItem(c, jsonString);
    } catch (error) {
      const callbacks = OnSendMessageErrorMap.get(c);
      (callbacks || []).forEach((callback) => {
        callback(error);
      });
    }
  });
};

export const onSendLocalStorageMessageError = (
  chan: string | string[],
  callback
) => {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  chan.forEach((k) => {
    let fns = OnSendMessageErrorMap.get(k);
    if (fns) {
      fns.push(callback);
    } else {
      fns = [callback];
    }
    OnSendMessageErrorMap.set(k, fns);
  });
};

export const closeLocalStorage = (chan: string| string[]) => {
  const setItem = localStorage.setItem;
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  localStorage.setItem = (key: string, value) => {
    if (chan.includes(key)) {
      return;
    }
    setItem(key, value);
  };

  const getItem = localStorage.getItem;
  localStorage.getItem = (key: string) => {
    if (chan.includes(key)) {
      return;
    }
    return getItem(key);
  };
};
