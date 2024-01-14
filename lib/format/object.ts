import { toJsonString } from "lib/utils";
import formatMap from ".";

const $type = 'object';

const to = (value: Object) => {
  const o = {};
  Object.entries(value).forEach(([key, value]) => {
    o[key] = toJsonString(value);
  });
  return {
    $type,
    $value: o,
  }
}

const from = (value: string | object) => {
  // fix: BroadcastChannel engine, the value will be object type, but localstorage engine it is string type
  const o = typeof value === 'string' ? JSON.parse(value) : value;
  const r = {};
  Object.entries(o).forEach(([key, value]) => {
    // @ts-ignore
    const { $type, $value } = value;
    r[key] = formatMap[$type].from($value);
  });
  return r;
}

export default [$type, from, to];