import { toJsonString } from "lib/utils";
import formatMap from ".";

const $type = 'map';

const to =  <K, V>(value: Map<K, V>) => {
  const entries = value.entries();
  // const obj: Record<any, V> = {};
  const arr = [];
  // 遍历迭代器并输出键值对
  for (const [key, value] of entries) {
    const k = toJsonString(key);
    // @ts-ignore
    const v = toJsonString(value);
    arr.push([k, v]);
  }
  return {
    $type,
    $value: arr,
  }
}

const from = (value: string | Map<any, any>) => {
  const o = typeof value === 'string' ? JSON.parse(value) as Array<any[]> : value;
  const m = new Map();
  o.forEach(([k, v]) => {
    const { $type, $value } = k;
    k = formatMap[$type].from($value);
    const { $type: tp, $value: vl } = v;
    v = formatMap[tp].from(vl);
    m.set(k, v);
  })
  return m;
}

export default [$type, from, to];