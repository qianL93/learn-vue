"use strict";
'use strice';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _testUtils = _interopRequireWildcard(require("@vue/test-utils"));

var _ramda = require("ramda");

var _this = void 0;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var DEFAULT_OPTS = {
  use: {
    Platform: 'h5',
    // 平台
    Vuex: true,
    Router: true,
    Lemon: true,
    // css 优化
    SoUI: function SoUI() {
      return _this.platform !== 'h5';
    },
    // pc 端组件库
    SomUI: function SomUI() {
      return _this.platform === 'h5';
    },
    // 移动端组件库
    OSSImage: true,
    // 图片懒加载
    Tower: function Tower() {
      return _this.platform === 'h5';
    },
    // app 通信
    VueShare: function VueShare() {
      return _this.platform === 'h5';
    },
    // 分享
    VueBurying: false,
    // 埋点
    VueSentry: false,
    // 错误搜集
    VueValidator: false,
    // 表单验证
    VuePosition: false // 定位

  }
};
var USE_MAP = {
  Vuex: 'vuex',
  Router: '@souche-vue/souche-router',
  Lemon: '@souche-ui/lemon',
  SoUI: '@souche-ui/so-ui',
  SomUI: '@souche-ui/som-ui',
  OSSImage: '@souche-ui/oss-image',
  Tower: '@souche-f2e/tower',
  VueShare: '@souche-vue/vue-sentry',
  VueBurying: '@souche-vue/vue-burying',
  VueSentry: '@souche-vue/vue-sentry',
  VueValidator: '@souche-vue/vue-validator',
  VuePosition: '@souche-vue/vue-position'
};

var create = function create(Component) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var mergeOpts = (0, _ramda.mergeDeepRight)(DEFAULT_OPTS, opts);
  console.log(mergeOpts);
  return function LocalVue() {
    var localVue = (0, _testUtils.createLocalVue)();
    Object.keys(_testUtils.default).forEach(function (k) {
      localVue[k] = function (mergeOpts) {
        return typeof _testUtils.default[k] === 'function' && _testUtils.default[k].call(null, Component, Object.assign({}, {
          localVue: localVue
        }, mergeOpts));
      };
    });

    if (mergeOpts.mixin) {
      localVue.mixin(mergeOpts.mixin);
    }

    if (mergeOpts.use && mergeOpts.use.length) {
      Object.keys(mergeOpts.use).forEach(function (k, v) {});
      mergeOpts.use.forEach(localVue.use);
    }

    return localVue;
  };
};

var _default = {
  name: '@souche-vue/souche-test-utils',
  version: '1.0.0',
  create: create
};
exports.default = _default;