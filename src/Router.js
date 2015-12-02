/**
 * @file:
 * @author: MacroX(macrox@163.com)
 */


var RouteTable = require('./RouteTable');

function Router() {
    this._table = new RouteTable();
}

Router.isRouter = function (obj) {
    return obj instanceof Router;
};

Router.prototype.use = function (path, subRouter) {
    var routeTable = this._table;
    var subRouteTable = subRouter._table;

    subRouteTable.each(function (subPath, subMethodMap) {
        routeTable.add(path + subPath, subMethodMap);
    });

    return this;
};

Router.prototype.register = function (path, method, handler) {
    this._table.add(path, method, handler);
    return this;
};

Router.prototype.exec = function (path, method, options) {
    var handlers = this._table.getHandlers(path, method);

    if (!handlers) {
        throw new ReferenceError('has no handler can be found');
    }

    handlers.forEach(function (handler) {
        handler.call(options.ctx, options,args);
    });

    return this;
};

module.exports = Router;

