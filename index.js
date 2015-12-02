/**
 * @file:
 * @author: macrox@163.com
 */

var pathToRegexp = require('path-to-regexp');
var Router = require('./src/Router');
var RouteTable = require('./src/RouteTable');

exports.Router = Router;

exports.RouteTable = RouteTable;

exports.register = function (router) {
    if (!Router.isRouter(router)) {
        throw new TypeError('[router] should be a instance of {Router}');
    }

    return function* (next) {
        yield next;
        var url = this.url;
        console.log(url);
    };
};

