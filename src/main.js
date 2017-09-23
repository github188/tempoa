import Vue from 'vue';
import Index from './Index';
import router from './router/router';
import iView from 'iview';

import mixin from '@/mixin';
import store from '@/vuex/';
import ajax from '@/utils/ajax';
import tableList from '@/components/table/TableList';
import nicescroll from 'nicescroll';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueFroala from 'vue-froala-wysiwyg';

Vue.config.productionTip = false;
Vue.prototype.ajax = ajax;
Vue.prototype.tableList = tableList;
Vue.mixin(mixin);
Vue.use(ElementUI);
Vue.use(VueFroala);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<Index/>',
    components: { Index }
});
