import Vue from 'vue'
import Index from './Index'
import router from './router/router'
import iView from 'iview';

import store from '@/vuex/'
import ajax from '@/utils/ajax'
import tableList from '@/components/table/TableList'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// import 'iview/dist/styles/iview.css';


Vue.config.productionTip = false;
Vue.prototype.ajax = ajax;
Vue.prototype.tableList = tableList;
// Vue.use(iView);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<Index/>',
    components: { Index }
});
