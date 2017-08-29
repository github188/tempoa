import axios from 'axios'
import { getStore } from '@/utils/localStorage'
import { appHost, appRoot } from '@/config/config'
const rootUrl = appHost + appRoot;

export default function({ type = 'get', url = '', data = {}, header = { 'authorization': getStore('authorization') }, success = null, error = null } = {}) {
    const params = type.toLowerCase() == 'get' ? 'params' : 'data';
    const config = {
        [params]: data,
        baseURL: rootUrl,
        url: url,
        headers: header,
        method: type,
        timeout: 30000
    }


    // // 请求时的拦截
    // axios.interceptors.request.use(function(config) {

    //     return config;
    // }, function(error) {
    //     return Promise.reject(error);
    // });

    // // 响应时拦截
    // axios.interceptors.response.use(function(response) {
    //     return response;
    // }, function(error) {
    //     return Promise.reject(error);
    // });


    axios(config).then((response) => {
        if (response.data.code == '401' || response.data.message == "身份验证失败!") {
            Utils.logOut();
            return;
        }
        success(response.data, this);

        if (error) {
            error();
        }
    }).catch((response) => {
        console.log(response)
        this.$message.error({
            message: '服务器通信异常！',
            duration: 3000,
            type: 'error',
            showClose: true
        });
    });
}