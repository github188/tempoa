<template>
	<header class="header">
        <div class="header-box">
            <a href="/index" class="logo" title="亿车科技OA系统首页">
                <h2>
                    <img src="./img/logo.png" alt="">
                </h2>
            </a>
            <!-- <div class="search">
                <input type="text" placeholder="输入关键字搜索">
            </div> -->

			<div class="setting">
 				<ul>
                    <li class="menu">
                        <a title="邮箱" target="_blank" @click="getEmailUrl" class="message" :href="emailUrl"></a>
						<template v-if="(emailNum > 1)">
							 <div class="email-num" v-if="(emailNum > 99)">
								<span>99</span>
								<em>+</em>
							</div>
							<div class="email-num" v-else>{{emailNum}}</div>
						</template>
                    </li>

                    <li class="menu" @mouseover="showMenu" @mouseout="hideMenu">
                        <a class="setting" href="javascript:;"></a>
                        <ol v-show="menu" class="sub-menu">
                            <li><a href="javascript:;" @click="dialog = true">修改密码</a></li>
                            <li>
								<router-link to="/person">个人信息</router-link>
							</li>
                        </ol>
                    </li>
                    <li class="menu">
						<a title="退出" @click="logOut" class="log-out" href="#"></a>
					</li>
                </ul>
			</div>
        </div>

        <el-dialog title="修改密码" :visible.sync="dialog" :modal-append-to-body="false" size="tiny">
	 		<el-form :model="change" :rules="rule" ref="changePassword" label-width="80px">
		          <el-form-item label="原密码" prop="passwdOld" style="margin-bottom: 25px">
				    <el-input type="password"  v-model="change.passwdOld"></el-input>
				  </el-form-item>

				  <el-form-item label="新密码" prop="passwd" style="margin-bottom: 25px">
				    <el-input type="password"  v-model="change.passwd"></el-input>
				  </el-form-item>

				  <el-form-item label="确认密码" prop="passwdCheck" style="margin-bottom: 25px">
				    <el-input type="password"  v-model="change.passwdCheck"></el-input>
				  </el-form-item>

				<el-form-item>
			        <el-button type="success" @click="handleSubmit('changePassword')">提交</el-button>
    				<el-button type="info" @click="closeModal" style="margin-left: 8px">取消</el-button>
				</el-form-item>
	        </el-form>
		</el-dialog>

    </header>
</template>


<style scoped>
	/*头部start*/
	.header {
	    height: 72px;
	    background: #fff;
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    z-index: 1000;
		box-shadow: 0 0 8px rgba(46, 48, 55, 0.51);
	}

	.header-box {
	    max-width: 1440px;
	    margin: 0 auto;
	    height: 72px;
	}

	.logo {
	    display: block;
	    width: 204px;
	    height: 72px;
	    line-height: 72px;
	    float: left;
	    text-align: center;
	}
	.logo img{
		vertical-align: middle;
	}
	/* .search {
	    width: 312px;
	    height: 36px;
	    float: left;
	    margin-left: 30px;
	    background: #f3f5f7 url("./img/icon.png") no-repeat -93px -126px;
	    border-radius: 30px;
	    margin-top: 18px;
	    overflow: hidden;
	} */
	.search input {
	    width: 240px;
	    border: none;
	    outline: none;
	    height: 28px;
	    margin: 4px;
	    margin-left: 40px;
	    font-size: 14px;
	    background: #f3f5f7;
	}

	.setting {
		float: right;
		height: 72px;
		line-height: 72px;
	}

	.setting ul li.menu {
		float: left;
		width: 70px;
		text-align: center;
		list-style: none;
		position: relative;
	}
	.setting ul li.menu a{
		height: 72px;
		background-repeat: no-repeat;
		background-position: center;
	}
	.setting .menu a.message{
		background-image: url("./img/message-icon.png")
	}
	.setting .menu a.setting{
		background-image: url("./img/setting-icon.png")
	}
	.setting .menu a.log-out{
		background-image: url("./img/logout-icon.png")
	}
	.setting ul li:hover .setting-icon{
		transform: rotateX(-180deg);
		-webkit-transform: rotateX(-180deg);
		-moz-transform: rotateX(-180deg);
		top: -2px;
		transition: all .5s ease;
		-webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
	}

	.setting ul li.menu a {
		color: #868f94;
		display: inline-block;
		width: 100%;
	}

	.setting ul li a:hover {
		text-decoration: none;
	}

	.setting .sub-menu {
		list-style: none;
		position: absolute;
		padding: 0;
		background: #fff;
		width: 120px;
		left: -20px;
		height: 120px;
		border-radius: 0 0 6px 6px;
		box-shadow: 0 0 10px #d4d4d4;
		top: 70px;
	}

	.setting .sub-menu li {
		height: 60px;
		line-height: 60px;
	}
	.setting .sub-menu li:hover {
		opacity: .8;
	}
	.email-num{
		position: absolute;
		top: 20px;
		left: 35px;
		height: 15px;
		width: 22px;
		line-height: 14px;
		background: #fb6c2e;
		border-radius: 14px;
		color: #fff;
	}
	.email-num span{
		position: relative;
    	left: -3px;
	}
	.email-num em{
		font-style: normal;
		position: relative;
		top: -16px;
		left: 7px;
	}

</style>
<style>
	.log-out-confirm{
		width: 300px;
		height:  200px;
	}
	.log-out-confirm .el-message-box__content{
		padding: 40px 20px;
	}
	.log-out-confirm .el-button{
		padding: 0;
		height: 42px;
		width: 120px;
	}

</style>

<script>
	import md5 from '@/utils/jquery.md5'
	export default{
		data(){
			const checkPassWd = (rule, value, callback)=>{
				if(value !== this.change.passwd){
					callback(new Error('两次密码不一致！'));
				}else{
					callback();
				}
			}
			return {
				menu: false,
				dialog: false,
				change:{
					passwdOld: '',
					passwd: '',
					passwdCheck: ''
				},
				emailNum: 0,
				emailUrl: '',
				rule: {
					passwdOld: {
						required: true,
                    	message: '请填写原密码!', 
                    	trigger: 'blur'
					},
                    passwd: {
                    	required: true,
                    	message: '请填写新密码!', 
                    	trigger: 'blur'
                    },
                    passwdCheck: {
                    	validator: checkPassWd,
                    	required: true,
                    	trigger: 'blur'
                    },
                },
			}
		},
		
		created(){
			this.getEmailNum();
			this.getEmailUrl();
		},
		methods: {
			showMenu(){
				this.menu = true;
			},
			hideMenu(){
				this.menu = false;	
			},
			logOut(){

				this.$confirm('您确定要退出登录吗?', '退出确认', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					customClass: 'log-out-confirm common-confirm',
					type: 'warning'
					}).then(() => {
						Utils.logOut();
					}).catch(() => {
						
				});
			},

			getEmailNum(){  //獲取郵箱唯獨數量
				this.ajax({
					url: '/authority/user/mail/toread',
					success(data, $this){
						if(data.code == 'success'){
							$this.emailNum = data.content;
						}
					}
				})
			},
			getEmailUrl(){   //获取邮箱信息
				this.ajax({
					url: '/authority/user/mail/login',
					success(data, $this){
						if(data.code == 'success'){
							$this.emailUrl = data.content;
							$this.getEmailNum();
						}
					}
				})
			},
			closeModal(){
				this.dialog = false;
			},
			handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const { passwdOld, passwd } = this.change;
						const data = {
							oldPass: $.md5(passwdOld),
		    				newPass: $.md5(passwd)
						}
						this.ajax({
							url: '/authority/user/reset/password',
							type: 'put',
							data: data,
							success(data, $this){
								if(data.code == 'success'){
									$this.$Message.success({
										content: '密码修改成功！',
										duration: 2,
										onClose(){
											$this.$router.push('/login');
										}
									})
								}else{
									$this.$Message.error({
										content: '原密码错误！',
										duration: 2
									})
								}
							}
						})
                    }
                })
            }
		}
	}
</script>
