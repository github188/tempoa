<template>
  <div class="login-wrap">
    <div class="login">
      <form @keyup.enter="verify">
        <div class="login-box">
          <div class="logo"></div>
          <div class="login-msg" v-if="message">
            <span class="error-icon"></span>
            <span class="error-text">{{message}}</span>
          </div>
          <div class="form-item" style="margin-bottom:20px;">
            <input v-model.trim:username="username" id="username" type="text" placeholder="用户名" autocomplete="off">
          </div>
          <div class="form-item">
            <input v-model.trim:password="password" id="password" type="password" placeholder="密码" autocomplete="off">
          </div>
          <input type="checkbox" v-model="checkBox" name="rememberAccount" class="remember-account-input" id="rememberAccount">
          <label for="rememberAccount" class="remember-account" data-name="记住账号"></label>
          <button type="button" :disabled="disable" class="btn btn-login" v-if="disable">
            <i class="el-icon-loading"></i>
          </button>
          <button type="button" :disabled="disable" class="btn btn-login" @click="verify" v-else>登录</button>
        </div>
        <div class="bg-img"></div>
      </form>
    </div>
    <div class="footer">
      <p>深圳市前海亿车科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;粤ICP备15027636号-2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0755-88350240</p>
    </div>
  </div>
</template>
<style scoped>
* {
  box-sizing: content-box;
}

body {
  margin: 0;
  padding: 0;
  font-size: 14px;
  background: #fff;
  height: 100%;
}

input {
  outline: 0;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
}

.login-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  left: 0;
  top: 0;
}

.login {
  width: 1000px;
  height: 560px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -500px;
  margin-top: -280px;
  box-shadow: 4px 4px 72px 4px #d8d8d8, -4px -4px 56px -1px #ffffff;
  overflow: hidden;
}

.login-box {
  float: left;
  width: 400px;
}

.logo {
  margin: 80px auto 60px auto;
  display: block;
  width: 204px;
  height: 60px;
  background: url(./img/logo.png);
}

.form-item {
  width: 260px;
  height: 42px;
  margin: 5px auto;
  position: relative;
}

.form-item input {
  border: 1px solid #ddd;
  width: 100%;
  padding: 0 8px;
  height: 42px;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  color: #40474d;
  box-sizing: border-box;
  text-indent: 12px;
}

.form-item span {
  position: absolute;
  padding: 8px;
  right: -60px;
  font-size: 14px;
  color: #cdcdcd;
}

.form-item .icon {
  display: inline-block;
  width: 16px;
  height: 18px;
  background-image: url("./img/login-icon.png");
  vertical-align: middle;
  margin-left: 3px;
  margin-right: 5px;
}

.form-item .icon-user {
  background-position: -184px -10px;
  ;
}

.form-item .icon-password {
  background-position: -185px -34px;
  ;
}

.btn-login {
  width: 260px;
  height: 42px;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  display: block;
  padding: 0;
  margin: 0 auto;
  margin-top: 40px;
  background: url(./img/login-btn.png);
}

.bg-img {
  width: 600px;
  height: 560px;
  background: url('./img/bg.png');
  float: right;
  position: relative;
}

.bg-img:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(75, 86, 96, 0.5);
}

.login-msg {
  width: 260px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #f65939;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  background: #ffe6e5;
  color: #000;
  margin: 0 auto;
  margin-bottom: 20px;
}

.error-icon {
  display: inline-block;
  height: 16px;
  width: 16px;
  background: url("./img/error-icon.png");
  margin-left: 20px;
  margin-top: 12px;
}

.error-text {
  position: relative;
  top: -3px;
}

.remember-account {
  height: 16px;
  width: 100px;
  display: block;
  cursor: pointer;
  background: url("./img/login-icon.png");
  background-repeat: no-repeat;
  background-position: -153px -10px;
  position: relative;
  margin-left: 70px;
}

.remember-account:after {
  content: attr(data-name);
  position: absolute;
  background: #fff;
  left: 16px;
  width: 100px;
  padding-left: 6px;
  top: -1px;
  height: 24px;
  color: #000;
}
.remember-account-input{
  opacity: 0;
}
.remember-account-input:checked+label {
  background-position: -153px -35px;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
}

.footer p {
  color: #eee;
  width: 100%;
  font-family: cursive;
  text-align: center;
}
</style>

<script>
import md5 from '@/utils/jquery.md5';
import { getStore, setStore, removeStore } from '@/utils/localStorage';
import * as types from '@/vuex/mutation-types';
export default {
  name: 'login',
  data() {
    return {
      username: undefined,
      password: undefined,
      message: undefined,
      checkBox: false
    };
  },
  mounted() {
    this.username = getStore('username');
    if (this.username) {
      this.checkBox = true;
    }
  },
  methods: {
    verify() {
      if (!this.username) {
        this.message = "请输入登录账号!";
        return false;
      }
      if (!this.password) {
        this.message = "请输入登录密码!";
        return false;
      }
      if (this.checkBox) {
        setStore('username', this.username);
      } else {
        removeStore('username');
      }
      if (!this.disable) {
        this.doLogin();
      }

    },
    doLogin() {
      this.disable = true;
      const $this = this;
      let username = this.username == 'admin' ? this.username : this.username + '@ecaray.com';
      var s = this.ajax({
        url: '/authority/account/login',
        data: {
          username: username,
          password: $.md5($this.password)
        },
        success(data) {
          var code = data.code;
          if (code == "success") {
            $this.$store.commit({
              type: types.LOG_IN,
              content: data.content
            });
            $this.$router.push('/index');
          } else {
            $this.message = data.message;
          }
        }
      });
    }
  }
};
</script>
