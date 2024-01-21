import { canInvoke, fromJsonStringData, handleData } from "lib/utils/index";

// const OnMessageMap: Map<string, Function[]> = new Map();

const OnSendMessageErrorMap: Map<string, Function[]> = new Map();

export const onLocalStorageMessage = (chan: string | string[], callback: Function) => {

  if (typeof chan === "string") {
    chan = [chan];
  }

  // chan.forEach((k) => {
  //   let fns = OnMessageMap.get(k);
  //   if (fns) {
  //     fns.push(callback);
  //   } else {
  //     fns = [callback];
  //   }
  //   OnMessageMap.set(k, fns);
  // });

  window.addEventListener("storage", (event: StorageEvent) => {
    try {
      const o = fromJsonStringData(event.newValue);
      const invoke = canInvoke(location.href, o.$target);
      if (!invoke) return;
      const { key } = event;
      // const callbacks = OnMessageMap.get(key);
      // (callbacks || []).forEach((callback) => {
      //   callback(o);
      // });
      if (chan.includes(key)) {
        callback(o)
      }
    } catch (error) {
      console.error(error);
    }
  });
};

export const sendLocalStorageMessage = (chan: string | string[], o, params) => {
  const res = handleData(o, params);
  const jsonString = JSON.stringify(res);
  if (typeof chan === "string") {
    chan = [chan];
  }
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
