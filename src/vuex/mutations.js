import * as types from './mutation-types'
import router from '@/router/router'
import { setStore, getStore, removeStore } from '@/utils/localStorage'

export default {
    [types.LOG_IN](state, mount) {
        const { userId, token, realname } = mount.content;
        setStore('authorization', userId + "_" + token);
        setStore('u', userId);
        setStore('realname', realname);
        state.authorization = userId + "_" + token;
        state.u = userId;
        state.realname = realname;
    },
    [types.LOG_OUT](state) {
        window.localStorage.clear();
        state.authorization = null;
        state.u = null;
        state.realname = null;
        router.push('/login');
    }
}