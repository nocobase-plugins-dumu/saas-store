'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var server = require('./server');



Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function () { return server__namespace.default; }
});
Object.keys(server).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return server[k]; }
  });
});
