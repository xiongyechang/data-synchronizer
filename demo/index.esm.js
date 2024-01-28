"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.useDataSynchronizer = exports.DataSynchronizer = void 0;
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
var _setPrototypeOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/set-prototype-of"));
var _create = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/create"));
var _assign2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));
var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));
var _iterator = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));
var _getIteratorMethod2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator-method"));
var _for = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/for"));
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));
var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));
var _set = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set"));
var _entries2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/entries"));
var _map2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));
var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reduce"));
var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));
var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));
var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));
var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));
var _context4;
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var _extendStatics = function extendStatics(d, b) {
  _extendStatics = _setPrototypeOf.default || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return _extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  _extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? (0, _create.default)(b) : (__.prototype = b.prototype, new __());
}
var _assign = function __assign() {
  _assign = _assign2.default || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return _assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && (0, _indexOf.default)(e).call(e, p) < 0) t[p] = s[p];
  if (s != null && typeof _getOwnPropertySymbols.default === "function") for (var i = 0, p = (0, _getOwnPropertySymbols.default)(s); i < p.length; i++) {
    if ((0, _indexOf.default)(e).call(e, p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __values(o) {
  var s = typeof _symbol.default === "function" && _iterator.default,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof _symbol.default === "function" && (0, _getIteratorMethod2.default)(o);
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var $type$d = 'string';
var to$d = function to$d(value) {
  return {
    $type: $type$d,
    $value: value
  };
};
var from$d = function from$d(value) {
  return value;
};
var str = [$type$d, from$d, to$d];
var $type$c = 'boolean';
var to$c = function to$c(value) {
  return {
    $type: $type$c,
    $value: value
  };
};
var from$c = function from$c(value) {
  return value === 'true';
};
var bool = [$type$c, from$c, to$c];
var $type$b = 'number';
var to$b = function to$b(value) {
  return {
    $type: $type$b,
    $value: '' + value
  };
};
var from$b = function from$b(value) {
  return +value;
};
var num = [$type$b, from$b, to$b];
var $type$a = 'symbol';
var to$a = function to$a(value) {
  return {
    $type: $type$a,
    $value: value.description
  };
};
var from$a = function from$a(value) {
  return (0, _for.default)(value);
};
var sym = [$type$a, from$a, to$a];
var $type$9 = 'bigint';
var to$9 = function to$9(value) {
  return {
    $type: $type$9,
    $value: '' + value
  };
};
var from$9 = function from$9(value) {
  return BigInt(value);
};
var bi = [$type$9, from$9, to$9];
var $type$8 = 'object';
var to$8 = function to$8(value) {
  var _context;
  var o = {};
  (0, _forEach.default)(_context = (0, _entries.default)(value)).call(_context, function (_a) {
    var _b = __read(_a, 2),
      key = _b[0],
      value = _b[1];
    o[key] = toJsonString(value);
  });
  return {
    $type: $type$8,
    $value: o
  };
};
var from$8 = function from$8(value) {
  var _context2;
  // fix: BroadcastChannel engine, the value will be object type, but localstorage engine it is string type
  var o = typeof value === 'string' ? JSON.parse(value) : value;
  var r = {};
  (0, _forEach.default)(_context2 = (0, _entries.default)(o)).call(_context2, function (_a) {
    var _b = __read(_a, 2),
      key = _b[0],
      value = _b[1];
    // @ts-ignore
    var $type = value.$type,
      $value = value.$value;
    r[key] = formatMap[$type].from($value);
  });
  return r;
};
var obj = [$type$8, from$8, to$8];
var $type$7 = 'null';
var to$7 = function to$7(value) {
  return {
    $type: $type$7,
    $value: '' + value
  };
};
var from$7 = function from$7(value) {
  return null;
};
var nul = [$type$7, from$7, to$7];
var $type$6 = 'function';
var to$6 = function to$6(value) {
  return {
    $type: $type$6,
    $value: value.toString()
  };
};
var from$6 = function from$6(value) {
  var funcBody = (0, _startsWith.default)(value).call(value, 'function') ? value : 'function ' + value;
  return new Function('...rest', 'return (' + funcBody + ')(...rest)');
};
var func = [$type$6, from$6, to$6];
var $type$5 = 'array';
var to$5 = function to$5(value) {
  var arr = [];
  (0, _forEach.default)(value).call(value, function (item, i) {
    arr[i] = toJsonString(item);
  });
  return {
    $type: $type$5,
    $value: arr
  };
};
var from$5 = function from$5(value) {
  var arr = typeof value === 'string' ? JSON.parse(value) : value;
  var r = [];
  (0, _forEach.default)(arr).call(arr, function (item, i) {
    var $type = item.$type,
      $value = item.$value;
    r[i] = formatMap[$type].from($value);
  });
  return r;
};
var arr = [$type$5, from$5, to$5];
var $type$4 = 'set';
var to$4 = function to$4(value) {
  var _context3;
  var arr = (0, _map.default)(_context3 = (0, _from.default)(value)).call(_context3, function (item) {
    return toJsonString(item);
  });
  return {
    $type: $type$4,
    $value: arr
  };
};
var from$4 = function from$4(value) {
  var o = typeof value === 'string' ? JSON.parse(value) : value;
  var s = new _set.default();
  (0, _forEach.default)(o).call(o, function (item) {
    var $type = item.$type,
      $value = item.$value;
    var it = formatMap[$type].from($value);
    s.add(it);
  });
  return s;
};
var se = [$type$4, from$4, to$4];
var $type$3 = 'map';
var to$3 = function to$3(value) {
  var e_1, _a;
  var entries = (0, _entries2.default)(value).call(value);
  // const obj: Record<any, V> = {};
  var arr = [];
  try {
    // 遍历迭代器并输出键值对
    for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
      var _b = __read(entries_1_1.value, 2),
        key = _b[0],
        value_1 = _b[1];
      var k = toJsonString(key);
      // @ts-ignore
      var v = toJsonString(value_1);
      arr.push([k, v]);
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return {
    $type: $type$3,
    $value: arr
  };
};
var from$3 = function from$3(value) {
  var o = typeof value === 'string' ? JSON.parse(value) : value;
  var m = new _map2.default();
  (0, _forEach.default)(o).call(o, function (_a) {
    var _b = __read(_a, 2),
      k = _b[0],
      v = _b[1];
    var $type = k.$type,
      $value = k.$value;
    k = formatMap[$type].from($value);
    var tp = v.$type,
      vl = v.$value;
    v = formatMap[tp].from(vl);
    m.set(k, v);
  });
  return m;
};
var ma = [$type$3, from$3, to$3];
var $type$2 = 'date';
var to$2 = function to$2(value) {
  return {
    $type: $type$2,
    $value: '' + value.getTime()
  };
};
var from$2 = function from$2(value) {
  return new Date(+value);
};
var dat = [$type$2, from$2, to$2];
var $type$1 = 'regexp';
var to$1 = function to$1(value) {
  return {
    $type: $type$1,
    $value: value.source
  };
};
var from$1 = function from$1(value) {
  return new RegExp(value);
};
var reg = [$type$1, from$1, to$1];
var $type = 'undefined';
var to = function to() {
  return {
    $type: $type,
    $value: 'undefined'
  };
};
var from = function from() {
  return undefined;
};
var und = [$type, from, to];
var formatMap = (0, _reduce.default)(_context4 = [str, bool, num, sym, bi, obj, nul, func, arr, se, ma, dat, reg, und]).call(_context4, function (cur, next) {
  var _a;
  var _b = __read(next, 3),
    $type = _b[0],
    from = _b[1],
    to = _b[2];
  (0, _assign2.default)(cur, (_a = {},
  // @ts-ignore
  _a[$type] = {
    from: from,
    to: to
  }, _a));
  return cur;
}, {});
var isSupportBroadcastChannel = ("BroadcastChannel" in window);
var isSupportLocalStorage = ("localStorage" in window);
var getType = function getType(v) {
  return v === undefined ? "undefined" : v === null ? "null" : v.constructor.name.toLowerCase();
};
var fromJsonStringData = function fromJsonStringData(jsonString) {
  var data = JSON.parse(jsonString);
  var $payload = data.$payload,
    others = __rest(data, ["$payload"]);
  var o = _assign(_assign({}, others), {
    $payload: {}
  });
  var $type = $payload.$type,
    $value = $payload.$value;
  o["$payload"] = formatMap[$type].from($value);
  return o;
};
var toJsonString = function toJsonString(payload) {
  var target = formatMap[getType(payload)];
  if (target) {
    payload = target.to(payload);
  }
  return payload;
};
var handleData = function handleData(payload, target) {
  var $payload = toJsonString(payload);
  return {
    $timezone: (0, _now.default)(),
    $origin: location.href,
    $payload: $payload,
    $target: typeof target === "string" ? target : target === null || target === void 0 ? void 0 : target.source,
    $id: generateRandomAlphaNum(16)
  };
};
var canInvoke = function canInvoke(text, pattern) {
  if (!pattern) return true;
  return new RegExp(pattern).test(text);
};
var generateRandomAlphaNum = function generateRandomAlphaNum(len) {
  var rdmString = "";
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
  return rdmString.substr(0, len);
};
var uniqueArr = function uniqueArr(arr) {
  return (0, _from.default)(new _set.default(arr));
};
var ChannelMap = new _map2.default();
var onBroadcastChannelMessage = function onBroadcastChannelMessage(chan, callback) {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  (0, _forEach.default)(chan).call(chan, function (c) {
    var bc = ChannelMap.get(c) || new BroadcastChannel(c);
    bc.addEventListener('message', function (event) {
      try {
        var data = fromJsonStringData(event.data);
        var source = data.$origin;
        if (source === location.href) return;
        var invoke = canInvoke(location.href, data.$target);
        if (!invoke) return;
        typeof callback === 'function' && callback(data);
      } catch (error) {
        console.error(error);
      }
    });
    ChannelMap.set(c, bc);
  });
};
var sendBroadcastChannelMessage = function sendBroadcastChannelMessage(chan, o, params) {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  var jsonData = handleData(o, params);
  (0, _forEach.default)(chan).call(chan, function (c) {
    var bc = ChannelMap.get(c) || new BroadcastChannel(c);
    bc.postMessage((0, _stringify.default)(jsonData));
  });
};
var onSendBroadcastChannelMessageError = function onSendBroadcastChannelMessageError(chan, callback) {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  (0, _forEach.default)(chan).call(chan, function (c) {
    var bc = ChannelMap.get(c) || new BroadcastChannel(c);
    bc.addEventListener('messageerror', function (event) {
      typeof callback === 'function' && callback(event);
    });
    ChannelMap.set(c, bc);
  });
};
var closeBroadcastChannel = function closeBroadcastChannel(chan) {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  (0, _forEach.default)(chan).call(chan, function (c) {
    var bc = ChannelMap.get(c);
    if (!bc) {
      throw new Error("the channel named ".concat(chan, " isn't exist"));
    }
    bc.close();
    ChannelMap.delete(c);
  });
};
var OnSendMessageErrorMap = new _map2.default();
var onLocalStorageMessage = function onLocalStorageMessage(chan, callback) {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  window.addEventListener("storage", function (event) {
    try {
      var o = fromJsonStringData(event.newValue);
      var invoke = canInvoke(location.href, o.$target);
      if (!invoke) return;
      var key = event.key;
      if ((0, _includes.default)(chan).call(chan, key)) {
        callback(o);
      }
    } catch (error) {
      console.error(error);
    }
  });
};
var sendLocalStorageMessage = function sendLocalStorageMessage(chan, o, params) {
  var res = handleData(o, params);
  var jsonString = (0, _stringify.default)(res);
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  (0, _forEach.default)(chan).call(chan, function (c) {
    try {
      window.localStorage.setItem(c, jsonString);
    } catch (error) {
      var _context5;
      var callbacks = OnSendMessageErrorMap.get(c);
      (0, _forEach.default)(_context5 = callbacks || []).call(_context5, function (callback) {
        callback(error);
      });
    }
  });
};
var onSendLocalStorageMessageError = function onSendLocalStorageMessageError(chan, callback) {
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  (0, _forEach.default)(chan).call(chan, function (k) {
    var fns = OnSendMessageErrorMap.get(k);
    if (fns) {
      fns.push(callback);
    } else {
      fns = [callback];
    }
    OnSendMessageErrorMap.set(k, fns);
  });
};
var closeLocalStorage = function closeLocalStorage(chan) {
  var setItem = localStorage.setItem;
  if (typeof chan === "string") {
    chan = [chan];
  }
  chan = uniqueArr(chan);
  localStorage.setItem = function (key, value) {
    if ((0, _includes.default)(chan).call(chan, key)) {
      return;
    }
    setItem(key, value);
  };
  var getItem = localStorage.getItem;
  localStorage.getItem = function (key) {
    if ((0, _includes.default)(chan).call(chan, key)) {
      return;
    }
    return getItem(key);
  };
};
var BaseAdaptor = /** @class */function () {
  function BaseAdaptor() {}
  return BaseAdaptor;
}();
var LocalStorageAdaptor = /** @class */function (_super) {
  __extends(LocalStorageAdaptor, _super);
  function LocalStorageAdaptor() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  LocalStorageAdaptor.prototype.onMessage = function (chan, callback) {
    onLocalStorageMessage(chan, callback);
  };
  LocalStorageAdaptor.prototype.onSendMessageError = function (chan, callback) {
    onSendLocalStorageMessageError(chan, callback);
  };
  LocalStorageAdaptor.prototype.sendMessage = function (chan, o, targets) {
    sendLocalStorageMessage(chan, o, targets);
  };
  LocalStorageAdaptor.prototype.close = function (chan) {
    closeLocalStorage(chan);
  };
  return LocalStorageAdaptor;
}(BaseAdaptor);
var BroadcastChannelAdaptor = /** @class */function (_super) {
  __extends(BroadcastChannelAdaptor, _super);
  function BroadcastChannelAdaptor() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  BroadcastChannelAdaptor.prototype.onMessage = function (chan, callback) {
    onBroadcastChannelMessage(chan, callback);
  };
  BroadcastChannelAdaptor.prototype.sendMessage = function (chan, o, targets) {
    sendBroadcastChannelMessage(chan, o, targets);
  };
  BroadcastChannelAdaptor.prototype.onSendMessageError = function (chan, callback) {
    onSendBroadcastChannelMessageError(chan, callback);
  };
  BroadcastChannelAdaptor.prototype.close = function (chan) {
    closeBroadcastChannel(chan);
  };
  return BroadcastChannelAdaptor;
}(BaseAdaptor);
var isSupport$1 = isSupportBroadcastChannel || isSupportLocalStorage;
var DataSynchronizer = exports.DataSynchronizer = /** @class */function () {
  function DataSynchronizer(options) {
    this.options = {
      engine: 'BroadcastChannel'
    };
    if (!isSupport$1) {
      throw new Error("The library doesn't support your browser.");
    }
    (0, _assign2.default)(this.options, options);
    this.initEngine();
  }
  DataSynchronizer.prototype.initEngine = function () {
    var engine = this.options.engine;
    var engineMap = {
      BroadcastChannel: BroadcastChannelAdaptor,
      LocalStorage: LocalStorageAdaptor
    };
    this.instance = new engineMap[engine](this.options);
  };
  DataSynchronizer.prototype.onMessage = function (chan, callback) {
    this.instance.onMessage(chan, callback);
  };
  DataSynchronizer.prototype.sendMessage = function (chan, o, params) {
    this.instance.sendMessage(chan, o, params);
  };
  DataSynchronizer.prototype.onMessageError = function (chan, callback) {
    this.instance.onSendMessageError(chan, callback);
  };
  DataSynchronizer.prototype.close = function (chan) {
    this.instance.close(chan);
  };
  return DataSynchronizer;
}();
var isSupport = isSupportBroadcastChannel || isSupportLocalStorage;
var useDataSynchronizer = exports.useDataSynchronizer = function useDataSynchronizer(options) {
  if (!isSupport) {
    throw new Error("the lib isn't support your browser.");
  }
  var defaultOptions = {
    engine: 'BroadcastChannel'
  };
  options = (0, _assign2.default)(defaultOptions, options);
  var strategies = [{
    engine: 'BroadcastChannel',
    support: isSupportBroadcastChannel,
    onMessage: onBroadcastChannelMessage,
    sendMessage: sendBroadcastChannelMessage,
    onSendMessageError: onSendBroadcastChannelMessageError,
    close: closeBroadcastChannel
  }, {
    engine: 'LocalStorage',
    support: isSupportLocalStorage,
    onMessage: onLocalStorageMessage,
    sendMessage: sendLocalStorageMessage,
    onSendMessageError: onSendLocalStorageMessageError,
    close: closeLocalStorage
  }];
  var o = (0, _find.default)(strategies).call(strategies, function (item) {
    return item.engine === options.engine && item.support;
  });
  var onMessage = function onMessage(chan, callback) {
    return o.onMessage(chan, callback);
  };
  var onMessageError = function onMessageError(chan, callback) {
    return o.onSendMessageError(chan, callback);
  };
  var sendMessage = function sendMessage(chan, value, params) {
    return o.sendMessage(chan, value, params);
  };
  var close = function close(chan) {
    return o.close(chan);
  };
  return {
    onMessage: onMessage,
    sendMessage: sendMessage,
    onMessageError: onMessageError,
    close: close
  };
};
