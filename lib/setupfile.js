"use strict";

/**
 * http 请求 mock
 */
// jest.mock('@souche-f2e/http-request', function () {
//     return jest.fn();
// });
var spy = require('@souche-f2e/http-request');

var onHttpRequest = spy.mockImplementation;
global.onHttpRequest = onHttpRequest;