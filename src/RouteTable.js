/**
 * @file:
 * @author: MacroX(macrox@163.com)
 */

function hasKey(obj, key) {
    return obj.hasOwnProperty(key);
}

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

function each(obj, fn) {
    Array.prototype.forEach.call(Object.keys(obj), fn);
}

function RouteTable() {
    this._table = {};
}

RouteTable.prototype.add = function (path, method, handler) {
    if (typeof path !== 'string') {
        throw new TypeError('[path] should be a {String}');
    }

    if (isObject(method)) {
        for (var key in method) {
            if (method.hasOwnProperty(key)) {
                this.add(path, key, handler);
            }
        }
    }

    if (typeof method !== 'string') {
        if (typeof method === 'function' || Array.isArray(method)) {
            handler = method;
        }

        method = '*';
    }

    if (!hasKey(this._table, path)) {
        this._table[path] = {};
    }

    var methodMap = this._table[path];

    if (!hasKey(methodMap, method)) {
        methodMap[method] = [];
    }

    if (Array.isArray(handler)) {
        handler.forEach(function (fn) {
            if (typeof fn === 'function') {
                methodMap[method].push(fn);
            }
        });
    } else  if (typeof handler === 'function') {
        methodMap[method].push(handler);
    }

    return this;
};

RouteTable.prototype.getHandlers = function (path, method) {
    if (typeof path !== 'string') {
        throw new TypeError('[path] should be a {String}');
    }

    if (typeof method !== 'string') {
        throw new TypeError('[method] should be a {String}');
    }

    return (hasKey(this._table, path) && hasKey(this._table[path], method)) ?
        this._table[path] : null;
};

RouteTable.prototype.each = function (fn) {
    var table = Object.assign({}, this._table);

    for (var path in table) {
        if (table.hasOwnProperty(path)) {
            fn.call(this, path, table[path]);
        }
    }

    return this;
};

module.exports = RouteTable;