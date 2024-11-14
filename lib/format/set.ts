import { toJsonString } from "lib/utils";
import formatMap from ".";

const $type = 'set';

const to = <T extends any>(value: Set<T>) => {
  const arr: T[] = Array.from(value).map<T>(item => toJsonString(item) as T);
  return [
    $type,
    arr,
  ]
}

const from = (value: string | Set<any>) => {
  const o = typeof value === 'string' ? JSON.parse(value) : value;
  const s = new Set();
  o.forEach((item) => {
    const [$type, $value] = item;
    const it = formatMap[$type].from($value);
    s.add(it);
  });
  return s;
}

export default [$type, from, to];