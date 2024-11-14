import { SendTarget, StorageData } from "types/index";
import formatMap from "lib/format";

export const isSupportBroadcastChannel = "BroadcastChannel" in window;

export const isSupportLocalStorage = "localStorage" in window;

const isArrowFunction = fn => {
  const str = fn?.toString() || '';
  // 判断函数体是否有花括号
  if (str.match(/{[\s\S]*}/)) {
      // 将花括号内的函数体去掉
      return str.replace(/{[\s\S]*}/, "").includes("=>")
  } else {
      return true
  }
}

const getType = (v) => {
  if (v === undefined) {
    return "undefined";
  } else if (v === null) {
    return "null";
  } else if (v instanceof Function && isArrowFunction(v)) {
    return "arrowFunction";
  } else {
    return v.constructor.name.toLowerCase();
  }
};

export const fromJsonStringData = (jsonString: string) => {
  const data: StorageData = JSON.parse(jsonString);
  const { $payload, ...others } = data;
  const o = {
    ...others,
    $payload: {},
  };
  const { $type, $value } = $payload;
  o["$payload"] = formatMap[$type].from($value);

  return o;
};

export const fromJsonString = (jsonString: string) => {
  const data = JSON.parse(jsonString);
  const { $type, $value } = data;
  const o = formatMap[$type].from($value);
  return o;
};

export const toJsonString = (payload) => {
  const target = formatMap[getType(payload)];
  if (target) {
    payload = target.to(payload);
  }
  return payload;
};

export const handleData = (payload: any, target: SendTarget) => {
  const $payload = toJsonString(payload);
  return {
    $origin: location.href,
    $payload,
    $target: typeof target === "string" ? target : target?.source,
    $id: generateRandomAlphaNum(16),
  };
};

export const canInvoke = (text: string, pattern?: string) => {
  if (!pattern) return true;
  return new RegExp(pattern).test(text);
};

export const generateRandomAlphaNum = (len: number) => {
  let rdmString = "";
  for (
    ;
    rdmString.length < len;
    rdmString += Math.random().toString(36).substr(2)
  );
  return rdmString.substr(0, len);
};

export const uniqueArr = (arr: Array<string>) => {
  return Array.from(new Set(arr));
}