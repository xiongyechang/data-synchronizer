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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var $type$d = 'string';
var to$d = function (value) { return ({
    $type: $type$d,
    $value: value
}); };
var from$d = function (value) { return value; };
var str = [$type$d, from$d, to$d];

var $type$c = 'boolean';
var to$c = function (value) { return ({
    $type: $type$c,
    $value: value
}); };
var from$c = function (value) { return value === 'true'; };
var bool = [$type$c, from$c, to$c];

var $type$b = 'number';
var to$b = function (value) { return ({
    $type: $type$b,
    $value: '' + value
}); };
var from$b = function (value) { return +value; };
var num = [$type$b, from$b, to$b];

var $type$a = 'symbol';
var to$a = function (value) {
    return {
        $type: $type$a,
        $value: value.description
    };
};
var from$a = function (value) {
    return Symbol.for(value);
};
var sym = [$type$a, from$a, to$a];

var $type$9 = 'bigint';
var to$9 = function (value) {
    return {
        $type: $type$9,
        $value: '' + value
    };
};
var from$9 = function (value) {
    return BigInt(value);
};
var bi = [$type$9, from$9, to$9];

var $type$8 = 'object';
var to$8 = function (value) {
    var o = {};
    Object.entries(value).forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        o[key] = toJsonString(value);
    });
    return {
        $type: $type$8,
        $value: o,
    };
};
var from$8 = function (value) {
    // fix: BroadcastChannel engine, the value will be object type, but localstorage engine it is string type
    var o = typeof value === 'string' ? JSON.parse(value) : value;
    var r = {};
    Object.entries(o).forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        // @ts-ignore
        var $type = value.$type, $value = value.$value;
        r[key] = formatMap[$type].from($value);
    });
    return r;
};
var obj = [$type$8, from$8, to$8];

var $type$7 = 'null';
var to$7 = function (value) {
    return {
        $type: $type$7,
        $value: '' + value
    };
};
var from$7 = function (value) {
    return null;
};
var nul = [$type$7, from$7, to$7];

var $type$6 = 'function';
var to$6 = function (value) { return ({
    $type: $type$6,
    $value: value.toString(),
}); };
var from$6 = function (value) {
    var funcBody = value.startsWith('function') ? value : 'function ' + value;
    return new Function('...rest', 'return (' + funcBody + ')(...rest)');
};
var func = [$type$6, from$6, to$6];

var $type$5 = 'array';
var to$5 = function (value) {
    var arr = [];
    value.forEach(function (item, i) {
        arr[i] = toJsonString(item);
    });
    return {
        $type: $type$5,
        $value: arr,
    };
};
var from$5 = function (value) {
    var arr = typeof value === 'string' ? JSON.parse(value) : value;
    var r = [];
    arr.forEach(function (item, i) {
        var $type = item.$type, $value = item.$value;
        r[i] = formatMap[$type].from($value);
    });
    return r;
};
var arr = [$type$5, from$5, to$5];

var $type$4 = 'set';
var to$4 = function (value) {
    var arr = Array.from(value).map(function (item) { return toJsonString(item); });
    return {
        $type: $type$4,
        $value: arr,
    };
};
var from$4 = function (value) {
    var o = typeof value === 'string' ? JSON.parse(value) : value;
    var s = new Set();
    o.forEach(function (item) {
        var $type = item.$type, $value = item.$value;
        var it = formatMap[$type].from($value);
        s.add(it);
    });
    return s;
};
var se = [$type$4, from$4, to$4];

var $type$3 = 'map';
var to$3 = function (value) {
    var e_1, _a;
    var entries = value.entries();
    // const obj: Record<any, V> = {};
    var arr = [];
    try {
        // 遍历迭代器并输出键值对
        for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
            var _b = __read(entries_1_1.value, 2), key = _b[0], value_1 = _b[1];
            var k = toJsonString(key);
            // @ts-ignore
            var v = toJsonString(value_1);
            arr.push([k, v]);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return {
        $type: $type$3,
        $value: arr,
    };
};
var from$3 = function (value) {
    var o = typeof value === 'string' ? JSON.parse(value) : value;
    var m = new Map();
    o.forEach(function (_a) {
        var _b = __read(_a, 2), k = _b[0], v = _b[1];
        var $type = k.$type, $value = k.$value;
        k = formatMap[$type].from($value);
        var tp = v.$type, vl = v.$value;
        v = formatMap[tp].from(vl);
        m.set(k, v);
    });
    return m;
};
var ma = [$type$3, from$3, to$3];

var $type$2 = 'date';
var to$2 = function (value) {
    return {
        $type: $type$2,
        $value: '' + value.getTime(),
    };
};
var from$2 = function (value) { return new Date(+value); };
var dat = [$type$2, from$2, to$2];

var $type$1 = 'regexp';
var to$1 = function (value) {
    return {
        $type: $type$1,
        $value: value.source,
    };
};
var from$1 = function (value) { return new RegExp(value); };
var reg = [$type$1, from$1, to$1];

var $type = 'undefined';
var to = function () {
    return {
        $type: $type,
        $value: 'undefined'
    };
};
var from = function () {
    return undefined;
};
var und = [$type, from, to];

var formatMap = [str, bool, num, sym, bi, obj, nul, func, arr, se, ma, dat, reg, und].reduce(function (cur, next) {
    var _a;
    var _b = __read(next, 3), $type = _b[0], from = _b[1], to = _b[2];
    Object.assign(cur, (_a = {},
        // @ts-ignore
        _a[$type] = {
            from: from,
            to: to,
        },
        _a));
    return cur;
}, {});

var isSupportBroadcastChannel = "BroadcastChannel" in window;
var isSupportLocalStorage = "localStorage" in window;
var getType = function (v) {
    return v === undefined
        ? "undefined"
        : v === null
            ? "null"
            : v.constructor.name.toLowerCase();
};
var fromJsonStringData = function (jsonString) {
    var data = JSON.parse(jsonString);
    var $payload = data.$payload, others = __rest(data, ["$payload"]);
    var o = __assign(__assign({}, others), { $payload: {} });
    var $type = $payload.$type, $value = $payload.$value;
    o["$payload"] = formatMap[$type].from($value);
    return o;
};
var toJsonString = function (payload) {
    var target = formatMap[getType(payload)];
    if (target) {
        payload = target.to(payload);
    }
    return payload;
};
var handleData = function (payload, target) {
    var $payload = toJsonString(payload);
    return {
        $timezone: Date.now(),
        $origin: location.href,
        $payload: $payload,
        $target: typeof target === "string" ? target : target === null || target === void 0 ? void 0 : target.source,
        $id: generateRandomAlphaNum(16),
    };
};
var canInvoke = function (text, pattern) {
    if (!pattern)
        return true;
    return new RegExp(pattern).test(text);
};
var generateRandomAlphaNum = function (len) {
    var rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2))
        ;
    return rdmString.substr(0, len);
};
var uniqueArr = function (arr) {
    return Array.from(new Set(arr));
};

var ChannelMap = new Map();
var onBroadcastChannelMessage = function (chan, callback) {
    if (typeof chan === "string") {
        chan = [chan];
    }
    chan = uniqueArr(chan);
    chan.forEach(function (c) {
        var bc = ChannelMap.get(c) || new BroadcastChannel(c);
        bc.addEventListener('message', function (event) {
            try {
                var data = fromJsonStringData(event.data);
                var source = data.$origin;
                if (source === location.href)
                    return;
                var invoke = canInvoke(location.href, data.$target);
                if (!invoke)
                    return;
                typeof callback === 'function' && callback(data);
            }
            catch (error) {
                console.error(error);
            }
        });
        ChannelMap.set(c, bc);
    });
};
var sendBroadcastChannelMessage = function (chan, o, params) {
    if (typeof chan === "string") {
        chan = [chan];
    }
    chan = uniqueArr(chan);
    var jsonData = handleData(o, params);
    chan.forEach(function (c) {
        var bc = ChannelMap.get(c) || new BroadcastChannel(c);
        bc.postMessage(JSON.stringify(jsonData));
    });
};
var onSendBroadcastChannelMessageError = function (chan, callback) {
    if (typeof chan === "string") {
        chan = [chan];
    }
    chan = uniqueArr(chan);
    chan.forEach(function (c) {
        var bc = ChannelMap.get(c) || new BroadcastChannel(c);
        bc.addEventListener('messageerror', function (event) {
            typeof callback === 'function' && callback(event);
        });
        ChannelMap.set(c, bc);
    });
};
var closeBroadcastChannel = function (chan) {
    if (typeof chan === "string") {
        chan = [chan];
    }
    chan = uniqueArr(chan);
    chan.forEach(function (c) {
        var bc = ChannelMap.get(c);
        if (!bc) {
            throw new Error("the channel named ".concat(chan, " isn't exist"));
        }
        bc.close();
        ChannelMap.delete(c);
    });
};

// const OnMessageMap: Map<string, Function[]> = new Map();
var OnSendMessageErrorMap = new Map();
var onLocalStorageMessage = function (chan, callback) {
    if (typeof chan === "string") {
        chan = [chan];
    }
    chan = uniqueArr(chan);
    window.addEventListener("storage", function (event) {
        try {
            var o = fromJsonStringData(event.newValue);
            var invoke = canInvoke(location.href, o.$target);
            if (!invoke)
                return;
            var key = event.key;
            if (chan.includes(key)) {
                callback(o);
            }
        }
        catch (error) {
            console.error(error);
        }
    });
};
var sendLocalStorageMessage = function (chan, o, params) {
    var res = handleData(o, params);
    var jsonString = JSON.stringify(res);
    if (typeof chan === "string") {
        chan = [chan];
    }
    chan = uniqueArr(chan);
    chan.forEach(function (c) {
        try {
            window.localStorage.setItem(c, jsonString);
        }
        catch (error) {
            var callbacks = OnSendMessageErrorMap.get(c);
            (callbacks || []).forEach(function (callback) {
                callback(error);
            });
        }
    });
};
var onSendLocalStorageMessageError = function (chan, callback) {
    if (typeof chan === "string") {
        chan = [chan];
    }
    chan = uniqueArr(chan);
    chan.forEach(function (k) {
        var fns = OnSendMessageErrorMap.get(k);
        if (fns) {
            fns.push(callback);
        }
        else {
            fns = [callback];
        }
        OnSendMessageErrorMap.set(k, fns);
    });
};
var closeLocalStorage = function (chan) {
    var setItem = localStorage.setItem;
    if (typeof chan === "string") {
        chan = [chan];
    }
    chan = uniqueArr(chan);
    localStorage.setItem = function (key, value) {
        if (chan.includes(key)) {
            return;
        }
        setItem(key, value);
    };
    var getItem = localStorage.getItem;
    localStorage.getItem = function (key) {
        if (chan.includes(key)) {
            return;
        }
        return getItem(key);
    };
};

var BaseAdaptor = /** @class */ (function () {
    function BaseAdaptor() {
    }
    return BaseAdaptor;
}());

var LocalStorageAdaptor = /** @class */ (function (_super) {
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
}(BaseAdaptor));

var BroadcastChannelAdaptor = /** @class */ (function (_super) {
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
}(BaseAdaptor));

var isSupport$1 = isSupportBroadcastChannel || isSupportLocalStorage;
var DataSynchronizer = /** @class */ (function () {
    function DataSynchronizer(options) {
        this.options = {
            engine: 'BroadcastChannel',
        };
        if (!isSupport$1) {
            throw new Error("The library doesn't support your browser.");
        }
        Object.assign(this.options, options);
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
}());

var isSupport = isSupportBroadcastChannel || isSupportLocalStorage;
var useDataSynchronizer = function (options) {
    if (!isSupport) {
        throw new Error("the lib isn't support your browser.");
    }
    var defaultOptions = {
        engine: 'BroadcastChannel',
    };
    options = Object.assign(defaultOptions, options);
    var strategies = [
        {
            engine: 'BroadcastChannel',
            support: isSupportBroadcastChannel,
            onMessage: onBroadcastChannelMessage,
            sendMessage: sendBroadcastChannelMessage,
            onSendMessageError: onSendBroadcastChannelMessageError,
            close: closeBroadcastChannel,
        },
        {
            engine: 'LocalStorage',
            support: isSupportLocalStorage,
            onMessage: onLocalStorageMessage,
            sendMessage: sendLocalStorageMessage,
            onSendMessageError: onSendLocalStorageMessageError,
            close: closeLocalStorage
        }
    ];
    var o = strategies.find(function (item) { return item.engine === options.engine && item.support; });
    var onMessage = function (chan, callback) { return o.onMessage(chan, callback); };
    var onMessageError = function (chan, callback) { return o.onSendMessageError(chan, callback); };
    var sendMessage = function (chan, value, params) { return o.sendMessage(chan, value, params); };
    var close = function (chan) { return o.close(chan); };
    return {
        onMessage: onMessage,
        sendMessage: sendMessage,
        onMessageError: onMessageError,
        close: close,
    };
};

export { DataSynchronizer, useDataSynchronizer };
