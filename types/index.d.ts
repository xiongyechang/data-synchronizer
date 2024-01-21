
export type onCallback = (args: any) => void;

export type ChanKey = string | string[];

export type onSendMessageErrorCallback = (error: MessageEvent | DOMException) => void;

export type onMessageMethod = (chan: ChanKey, callback: onCallback) => void;

export type sendMessageMethod = <T extends any>(chan: ChanKey, o: T, target?: SendTarget) => void;

export type onSendMessageErrorMethod = (chan: ChanKey, callback: onSendMessageErrorCallback) => void;

export type closeMethod = (chan: ChanKey) => void;

export type StorageData = {
  $payload: {
    $type: 'string' | 'number' | 'boolean' | 'symbol' | 'object' | 'array' |'function' | 'date' | 'regexp' | 'bigint' | 'set' | 'map' | 'null',
    $value: any,
  },
  $timezone: number,
  $origin: string,
  $target?: string,
}

export type SendTarget = RegExp | string | undefined;

export type Options = {
  engine?: Engine,
};

export type Engine = 'LocalStorage' | 'BroadcastChannel'

export type EngineOptions = {
  engine: Engine,
  support: boolean;
  onMessage?: onMessageMethod,
  sendMessage?: sendMessageMethod,
  onSendMessageError?: onSendMessageErrorMethod,
  close?: closeMethod,
}

type Result = {
  onMessage:  (callback: onCallback) => void;
  sendMessage:  <T extends any>(o: T, target?: SendTarget) => void;
  onSendMessageError: (callback: onSendMessageErrorCallback) => void;
  close: (callback: onSendMessageErrorCallback) => void;
}

export const useDataSynchronizer: (options: Options) => Result;

export type DataSynchronizerInstance = Result;

export interface DataSynchronizerConstructor<O extends Options = Options> {
  new(o: O): DataSynchronizerInstance;
}

export const DataSynchronizer: DataSynchronizerConstructor;
