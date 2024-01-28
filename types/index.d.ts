
export type onCallback = (args: any) => void;

export type ChanKey = string | string[];

export type onSendMessageErrorCallback = (error: MessageEvent | DOMException) => void;

export type onMessageMethod = (chan: ChanKey, callback: onCallback) => void;

export type sendMessageMethod = <T extends any>(chan: ChanKey, o: T, target?: SendTarget) => void;

export type onSendMessageErrorMethod = (chan: ChanKey, callback: onSendMessageErrorCallback) => void;

export type closeMethod = (chan: ChanKey) => void;

export type StorageData = {
  $id: string;
  $payload: {
    $type: 'string' | 'number' | 'boolean' | 'symbol' | 'object' | 'array' | 'function' | 'date' | 'regexp' | 'bigint' | 'set' | 'map' | 'null' | 'undefined',
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

export const useDataSynchronizer: (options: Options) => EngineOptions;

export type DataSynchronizerInstance = EngineOptions;

export interface DataSynchronizerConstructor<O extends Options = Options> {
  new(o: O): DataSynchronizerInstance;
}

export const DataSynchronizer: DataSynchronizerConstructor;
