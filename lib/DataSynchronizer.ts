import { Options, SendTarget, onCallback } from "types/index";
import { LocalStorageAdaptor } from 'lib/adaptor/LocalStorageAdaptor';
import { BroadcastChannelAdaptor } from 'lib/adaptor/BroadcastChannelAdaptor';
import { BaseAdaptor } from "./adaptor/BaseAdaptor";
import { isSupportBroadcastChannel, isSupportLocalStorage } from "./utils/index";

const isSupport = isSupportBroadcastChannel || isSupportLocalStorage;

export class DataSynchronizer {

  private instance: BaseAdaptor;

  private options = {
    engine: 'BroadcastChannel',
  }

  constructor(options: Options) 
  {
    if (!isSupport) {
      throw new Error(`The library doesn't support your browser.`);
    }
    Object.assign(this.options, options);
    this.initEngine();
  }

  initEngine() {
    const { engine } = this.options;
    const engineMap = {
      BroadcastChannel: BroadcastChannelAdaptor,
      LocalStorage: LocalStorageAdaptor
    }
    this.instance = new engineMap[engine](this.options);
  }

  onMessage(chan: string | string[], callback: onCallback) {
    this.instance.onMessage(chan, callback);
  }

  sendMessage<T extends object>(chan: string | string[], o: T, params?: SendTarget) {
    this.instance.sendMessage<T>(chan, o, params);
  }

  onMessageError(chan: string | string[], callback: onCallback) {
    this.instance.onSendMessageError(chan, callback);
  }

  close(chan: string | string[]) {
    this.instance.close(chan);
  }
}