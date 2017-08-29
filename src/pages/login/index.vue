<template>
	<div class="login-wrap">
		<div class="login">
		    <form @keyup.enter="verify" >
			    <div class="login-box">
			    	<div class="logo"></div>
			    	<div class="form-item">
			    		 <i class="icon icon-user"></i>
			             <input v-model.trim:username="username" id="username" type="text" placeholder="邮箱" autocomplete="off">
						 <span>@ecaray.com</span>
			    	</div>
			    	<div class="form-item">
			    		 <i class="icon icon-password"></i>
			            <input v-model.trim:password="password" id="password" type="password" placeholder="密码" autocomplete="off">
			    	</div>
			    	<button type="button" class="btn btn-login" @click="verify">登录</button>
			        <span class="login-msg">{{message}}</span>
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
	*{
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
	.login-wrap{
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
		/* margin-top: -280px; */
	    /* -ms-transform: translate(-50%, -50%);
	    -moz-transform: translate(-50%, -50%);
	    -webkit-transform: translate(-50%, -50%);
	    transform: translate(-50%, -50%); */
	    box-shadow: 4px 4px 72px 4px #d8d8d8, -4px -4px 56px -1px #ffffff;
	    overflow: hidden;
	}
	.login-box{
		float: left;
		width: 358px;
	}

	.logo {
		margin: 125px auto 72px auto;
	    margin-top: 125px;
	    display: block;
	    width: 222px;
	    height: 25px;
	    background: url(./img/login-icon.png) -10px -135px;
	}

	.form-item{
		width: 200px;
		margin: 5px auto;		
	    border-bottom: 1px solid #DDE1E4;
		position: relative;
	}
	.form-item input{
		border: 0;
	    width: 160px;
	    padding: 0 8px;
	    height: 36px;
	    display: inline-block;
	    vertical-align: middle;
	    font-size: 16px;
	    color: #40474d;
	    box-sizing: border-box;
	}
	.form-item span{
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
	.form-item .icon-user{
	    background-position:  -184px -10px;;
	}
	.form-item .icon-password{
	    background-position:  -185px -34px;;
	}

	.btn-login {
        width: 240px;
	    height: 40px;
	    color: #fff;
	    font-size: 16px;
	    border-radius: 4px;
	    border: none;
	    display: block;
	    padding: 0;
	    margin: 0 auto;
	    margin-top: 56px;
	    background: url(./img/login-icon.png) -9px -73px;
	}
	.login-msg {
	    width: 100%;
	    color: #FF5900;
	    font-size: 14px;
	    display: inline-block;
        margin-left: 60px;
		margin-top: 20px;
	}

	.bg-img{
		width: 641px;
		height: 560px;
		background: url('./img/bg.png');
		float: right;
		position: relative;
	}
	.bg-img:after{
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(75, 86, 96, 0.5);
	}

	.footer {
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	}

	.footer p {
	    color: #eee;
	    width: 100%;
	    font-family: cursive;
	    text-align: center;
	}
</style>

<script>
	import md5 from '@/utils/jquery.md5'
	import { setStore } from '@/utils/localStorage'
	import * as types from '@/vuex/mutation-types'
	export default {
		name: 'login',
		data(){
			return {
				username: undefined,
				password: undefined,
				message: ''
			}
		},
		methods: {
			verify(){
				if (!this.username) {
					this.message = "请输入登录账号!";
			        return false;
			    }
			    if (!this.password) {
					this.message = "请输入登录密码!";
			        return false;
			    }
			    this.doLogin();
			},
			doLogin(){
				const $this = this;

				let username = this.username == 'admin'? this.username: this.username + '@ecaray.com';

				this.ajax({
					url: '/authority/account/login', 
					data: {
						username: username,
			            password: $.md5($this.password)
					},
					success(data){
						var code = data.code;
			            if (code == "success") {
			            	console.log(data, '登录信息')
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
	}
</script>
