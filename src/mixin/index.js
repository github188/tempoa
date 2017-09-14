const domain = require('@/config/config.js');
module.exports = {
  data(){
    return {
      domain: domain.appHost + domain.appRoot,     //获取接口地址，其他页面就不用引入config了
      avatar: domain.avatar,
      disable: false,   //按钮禁止使用，发起请求之后的等待时间不可用
    };
  },
  methods: {
    /**
     * @description递归删除json返回的空children
     * @params Array
     * @return Array
     */
    delTree(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length > 0) {
          this.delTree(data[i].children);
        } else {
          delete data[i].children;
        }
      }
      return data;
    },
    /**
    * @description 返回tree结构对应key value的 父级key的数组
    * @param {Object} json 需要递归的json
    * @param {string} key  对应的key
    * @param {any} value 对应的value
    * @returns {array} 数组
    */
    parentTree(json, key, value) {
      let arr = [];
      for (let index = 0; index < json.length; index++) {
        let element = json[index];
        if (element[key] == value) {
          arr.push(value);
        } else if (element.children) {
          let temp = this.parentTree(element.children, key, value);
          temp.length ? arr.push(element[key]) : null;
          arr = arr.concat(temp);
          if (arr.length) break;
        }
      }
      return arr;
    },
    /**
     * @description 重置表单数据
     * @param {string} name form的ref属性
     */
    resetForm(name) {
      this.$refs[name].resetFields();
    },
    /**
     *  @description 请求处理成功后的消息提示
     *  @param {string} name  提示的文字
     */
    successTips(name) {
      this.$message({
        type: "success",
        message: name || "操作成功!"
      });
    },
    /**
     *  @description 请求处理失败后的消息提示
     *  @param {string} name  提示的文字
     */
    errorTips(name) {
      this.$message({
        message: name || "操作失败！",
        type: "warning"
      });
    },
    /**
     *  @description 获取用户头像
     *  @param {Object} data 用户个人信息
     */
    getAvatar(data) {
      const { headPic, sex } = data;
      if (headPic != "") {
        return this.domain + this.avatar + headPic + "/download";
      }
      if (sex == 1) {
        return "/static/img/man-default.png";
      } else {
        return "/static/img/male-default.png";
      }
    },

    /**
     *  @description 获取当前用户所拥有的操作权限
     *  @param {Function} 回调函数
     */
    getButton(call) {
      const id = $(".router-link-active").attr("data-id");
      this.ajax({
        url: "/authority/resource/user/resources",
        data: {
          resourceId: id
        },
        success(data) {
          if (data.code == "success") {
            call(data.content);
          }
        }
      });
    },
     /**
     *  @description 三级部门位置反转
     *  @param {Stringn} 三级部门
     *  @return {String}
     */
    reverseDepart(depart){
      return depart && depart.split('-').reverse().join('-');
    },
  }
};
