import { toJsonString } from "lib/utils";
import formatMap from ".";

const $type = 'array';

const to = <T extends any>(value: Array<T>) => {
  const arr: T[] = [];

  value.forEach((item: T, i) => {
    arr[i] = toJsonString(item) as T;
  });

  return [
    $type,
    arr,
  ]
}

const from = (value: string) => {
  const arr = typeof value === 'string' ? JSON.parse(value) : value;
  const r = [];
  arr.forEach((item, i) => {
    const [$type, $value] = item;
    r[i] = formatMap[$type].from($value);
  });
  return r;
}

export default [$type, from, to];