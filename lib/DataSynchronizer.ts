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
    options.chan = btoa(options.chan);
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

  onMessage(callback: onCallback) {
    this.instance.onMessage(callback);
  }

  sendMessage<T extends object>(o: T, params?: SendTarget) {
    this.instance.sendMessage<T>(o, params);
  }

  onMessageError(callback: onCallback) {
    this.instance.onSendMessageError(callback);
  }

  close() {
    this.instance.close();
  }
}