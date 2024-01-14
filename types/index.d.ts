
export type onCallback = (args: any) => void;

export type onSendMessageErrorCallback = (error: MessageEvent | DOMException) => void;

export type onMessageMethod = (options: Options, callback: onCallback) => void;

export type sendMessageMethod = <T extends any>(options: Options, o: T, target?: SendTarget) => void;

export type onSendMessageErrorMethod = (options: Options, callback: onSendMessageErrorCallback) => void;

export type closeMethod = (options: Options) => void;

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
  chan: string,
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
