import Vue from 'vue'
import store from '@/vuex/'
import { getStore } from '@/utils/localStorage'
import { appHost, appRoot, avatar } from '@/config/config'

const vm = new Vue();

window.Utils = {
        /**
         * 登出
         */
        logOut() {
            store.commit({
                type: 'LOG_OUT'
            });
        },
        /**
         * 获取用户头像
         */
        getAvatar(data) {
            const { headPic, sex } = data;
            if (headPic != '') {
                return appHost + appRoot + avatar + headPic + '/download';
            }
            if (sex == 1) {
                return '/static/img/man-default.png';
            } else {
                return '/static/img/male-default.png';
            }
        },
        getButton(call) {
            const id = $('.router-link-active').attr('data-id');
            vm.ajax({
                url: '/authority/resource/user/resources',
                data: {
                    resourceId: id
                },
                success(data) {
                    if (data.code == 'success') {
                        call(data.content)
                    }
                }
            });
        },
        /**
         * 
         * @param {*} url 
         * @param {*查询的参数条件} object 
         */
        exportReport(url, object) {
            let params = '';
            for (let i in object) {
                if (object[i] !== '' && object[i] !== null) {
                    params += i + '=' + object[i] + '&'
                }
            }
            window.open(appHost + appRoot + url + '?' + params + 'authorization=' + Utils.getValue('authorization') + '&userId=' + Utils.getValue('u'));

        },
        getValue(name) { //获取localshorage值
            return getStore(name);
        },
        /**
         * 数组合并
         */
        arrayMerge() {
            return Array.prototype.concat.apply([], arguments);
        },
        /**
         * 数组去重
         * @param  {[type]} array [description]
         * @return {[type]} array [description]
         */
        arrayUnique(array) {
            var res = [];
            var json = {};
            for (var i = 0; i < array.length; i++) {
                if (!json[array[i]]) {
                    res.push(array[i]);
                    json[array[i]] = 1;
                }
            }
            return res;
        },
        /**
         * 过滤值为空||undefined||null的对象
         * @param  {[type]} object [description]
         * @return {[type]} object [description]
         */
        filterObjectNull(object) {
            let temp = {};
            for (let i in object) {
                if (object[i] !== '' && object[i] !== null) {
                    temp[i] = object[i];
                }
            }
            return temp;
        },

        /**
         * 将HTML转义为实体
         * @return {[String]}
         */
        escapeHtml(htmlStr) {
            var s = "";
            if (htmlStr.length == 0) return "";
            s = htmlStr.replace(/&/g, "&amp;");
            s = s.replace(/</g, "&lt;");
            s = s.replace(/>/g, "&gt;");
            s = s.replace(/ /g, "&nbsp;");
            s = s.replace(/\'/g, "&#39;");
            s = s.replace(/\"/g, "&quot;");
            s = s.replace(/\n/g, "<br>");
            return s;
        },
        /**
         * 将实体转回为HTML
         * @return {[String]}
         */
        unescapeHtml(str) {
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/&amp;/g, "&");
            s = s.replace(/&lt;/g, "<");
            s = s.replace(/&gt;/g, ">");
            s = s.replace(/&nbsp;/g, " ");
            s = s.replace(/&#39;/g, "\'");
            s = s.replace(/&quot;/g, "\"");
            s = s.replace(/<br>/g, "\n");
            return s;
        },
        /**
         * 
         * @param {过滤html标签} str 
         */
        filterHtmlTag(str) {
            str = typeof str == 'string' ? str.replace(/<\/?[^>]*>/g, '') : str;
            return str.trimAll();
        },

        /**
         * 判断字符串是否为空
         */
        isNullorEmpty(str) {
            if ((str == null || str == "null" || str == "" || str == " " || str == undefined || str == "undefined") && (str != 0 || str != "0"))
                return true;
            else {
                return false;
            }
        }
    }
    /**
     * 日期对象转为年与日格式
     */
Date.prototype.toDay = function() {
    let s = '';
    let year = this.getFullYear();
    let month = this.getMonth();
    let date = this.getDate();
    s += year;
    s += month < 9 ? '-0' + (month + 1) : '-' + (month + 1);
    s += date < 10 ? '-0' + date : '-' + date;
    return s;
};
/**
 * 获取星期
 * @return String
 */
Date.prototype.toWeekDay = function() {
        const arr = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
        return arr[new Date().getDay() - 1];
    }
    /**
     * 时间戳转为日期格式
     */
Date.prototype.toString = function() {
    var s = "";
    s += this.getFullYear();
    if (this.getMonth() < 9) {
        s += "-0" + (this.getMonth() + 1);
    } else {
        s += "-" + (this.getMonth() + 1);
    }
    if (this.getDate() < 10) {
        s += "-0" + this.getDate();
    } else {
        s += "-" + this.getDate();
    }
    if (this.getHours() < 10) {
        s += " 0" + this.getHours();
    } else {
        s += " " + this.getHours();
    }
    if (this.getMinutes() < 10) {
        s += ":0" + this.getMinutes();
    } else {
        s += ":" + this.getMinutes();
    }
    if (this.getSeconds() < 10) {
        s += ":0" + this.getSeconds();
    } else {
        s += ":" + this.getSeconds();
    }
    return s;
};

// --------------------------------------------
// 字符串的时间转换为日期（不含时分秒）
// --------------------------------------------
String.prototype.toTime = function() {
    var arr1 = this.split("-");
    var year = parseFloat(arr1[0]);
    var month = parseFloat(arr1[1]);
    var date = parseFloat(arr1[2]);
    var myDate = new Date(year, month - 1, date);
    return myDate.getTime();
};

// --------------------------------------------
// 标准时间格式转换为时间戳（含时分秒）
// --------------------------------------------
String.prototype.toSecTime = function() {
    var arr = this.split(" ");
    var arr1 = arr[0].split("-");
    var arr2 = arr[1].split(":");
    var year = parseFloat(arr1[0]);
    var month = parseFloat(arr1[1]);
    var date = parseFloat(arr1[2]);
    var hour = parseFloat(arr2[0]);
    var min = parseFloat(arr2[1]);
    var sec = parseFloat(arr2[2]);
    var myDate = new Date(year, month - 1, date, hour, min, sec);
    return myDate.getTime();
};

/**
 * 过滤html标签
 * @return String
 */
String.prototype.filterHtml = function() {
    var str = this;
    typeof str == 'string' ? str.replace(/<\/?[^>]*>/g, '') : str;
    return str.trim();
}

// --------------------------------------------
// 金额添加千分点
// --------------------------------------------
Number.prototype.addComma = function() {
    var number = this;
    if (number == 0 || Utils.isNullorEmpty(this)) {
        return "0.00";
    }
    var num = number + "";
    num = num.replace(new RegExp(",", "g"), "");
    // 正负号处理
    var symble = "";
    if (/^([-+]).*$/.test(num)) {
        symble = num.replace(/^([-+]).*$/, "$1");
        num = num.replace(/^([-+])(.*)$/, "$2");
    }
    if (/^[0-9]+(\.[0-9]+)?$/.test(num)) {
        var num = num.replace(new RegExp("^[0]+", "g"), "");
        if (/^\./.test(num)) {
            num = "0" + num;
        }
        var decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, "$1");
        var integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, "$1");
        decimal = Utils.isNullorEmpty(decimal) ? ".00" : decimal;
        var re = /(\d+)(\d{3})/;
        while (re.test(integer)) {
            integer = integer.replace(re, "$1,$2");
        }
        return symble + integer + decimal;
    } else {
        return number;
    }
};

// --------------------------------------------
// 删除千分点
// --------------------------------------------
String.prototype.removeComma = function() {
    var num = this.replace(new RegExp(",", "g"), "");
    return num;
};