'use strice';

import utils, { createLocalVue } from '@vue/test-utils';
import { mergeDeepRight } from 'ramda';

const DEFAULT_OPTS = {
    use: {
        Platform    : 'h5', // 平台
        Vuex        : true,
        Router      : true,
        Lemon       : true, // css 优化
        SoUI        : () => this.platform !== 'h5', // pc 端组件库
        SomUI       : () => this.platform === 'h5', // 移动端组件库
        OSSImage    : true, // 图片懒加载
        Tower       : () => this.platform === 'h5', // app 通信
        VueShare    : () => this.platform === 'h5', // 分享
        VueBurying  : false, // 埋点
        VueSentry   : false, // 错误搜集
        VueValidator: false, // 表单验证
        VuePosition : false, // 定位
    }
};
const USE_MAP = {
    Vuex        : 'vuex',
    Router      : '@souche-vue/souche-router',
    Lemon       : '@souche-ui/lemon',
    SoUI        : '@souche-ui/so-ui',
    SomUI       : '@souche-ui/som-ui',
    OSSImage    : '@souche-ui/oss-image',
    Tower       : '@souche-f2e/tower',
    VueShare    : '@souche-vue/vue-sentry',
    VueBurying  : '@souche-vue/vue-burying',
    VueSentry   : '@souche-vue/vue-sentry',
    VueValidator: '@souche-vue/vue-validator',
    VuePosition : '@souche-vue/vue-position'
};
const DEFAULT_CONFS = { };

const create = function (Component, opts = { }) {
    let mergeOpts = mergeDeepRight(DEFAULT_OPTS, opts);

    return function () {
        const localVue = createLocalVue();
        
        Object.keys(utils).forEach(k => {
            localVue[k] = function (confs) {
                let mergeConfs = mergeDeepRight(DEFAULT_CONFS, confs);
                
                return typeof utils[k] === 'function' && utils[k].call(null, Component, Object.assign({ }, {
                    localVue
                }, mergeConfs));
            }
        });

        if (mergeOpts.mixin) {
            localVue.mixin(mergeOpts.mixin);
        }

        if (mergeOpts.use && mergeOpts.use.length) {
            Object.keys(mergeOpts.use).forEach((k, v) => {
                
            });
            mergeOpts.use.forEach(use => {
                let useRes = use;
                if (typeof use === 'function') {
                    useRes = use();
                    if (useRes && typeof useRes.then === 'function') {
                        return useRes.then(res => res && localVue.use(USE_MAP[use] || use)); 
                    }
                }
                if (useRes) {
                    localVue.use(USE_MAP[use] || use);
                }
            });
        }
        
        return localVue; 
    };
};

export default {
    name: '@souche-vue/souche-test-utils',
    version: '1.0.0',

    create
};
