import { getStore } from '@/utils/localStorage'
export default {
    authorization: getStore('authorization'),
    u: getStore('u'),
    realname: getStore('realname')
}
