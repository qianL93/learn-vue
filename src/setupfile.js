/**
 * http 请求 mock
 */

// jest.mock('@souche-f2e/http-request', function () {
//     return jest.fn();
// });
const spy = require('@souche-f2e/http-request')
const onHttpRequest = spy.mockImplementation;

global.onHttpRequest = onHttpRequest;
