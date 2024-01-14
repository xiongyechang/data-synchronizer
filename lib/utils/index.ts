import { SendTarget, StorageData } from "types/index";
import formatMap from 'lib/format';

export const isSupportBroadcastChannel = 'BroadcastChannel' in window;

export const isSupportLocalStorage = 'localStorage' in window;

const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();

export const fromJsonStringData = (jsonString: string) => {
  const data: StorageData = JSON.parse(jsonString);
  const { $payload, ...others } = data;
  const o = {
    ...others,
    $payload: {}
  };
  const { $type, $value } = $payload;
  o['$payload'] = formatMap[$type].from($value);

  return o;
}

export const fromJsonString = (jsonString: string) => {
  const data = JSON.parse(jsonString);
  const { $type, $value } = data;
  const o = formatMap[$type].from($value);
  return o;
}

export const toJsonString = (payload) => {
  const target = formatMap[getType(payload)];
  if (target) {
    payload = target.to(payload)
  }
  return payload;
}

export const handleData = (payload: any, target: SendTarget) => {
  const $payload = toJsonString(payload);
  return {
    $timezone: Date.now(),
    $origin: location.href,
    $payload,
    $target: typeof target === 'string' ? target : target?.source,
  }
}

export const canInvoke = (text: string, pattern?: string) => {
  if(!pattern) return true;
  return new RegExp(pattern).test(text);
}