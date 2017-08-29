<template>
	<header class="header">
        <div class="header-box">
            <a href="/index" class="logo" title="亿车科技OA系统首页">
                <h2>
                    <img src="../index/img/logo.png" alt="">
                </h2>
            </a>
            <div class="search">
                <input type="text" placeholder="输入关键字搜索">
            </div>
            <div class="setting">
                <ul>
                    <li class="menu"><a href="#">消息</a></li>
                    <li class="menu" @mouseover="showMenu" @mouseout="hideMenu">
                    	<a href="javascript:;">设置 <em class="setting-icon"></em></a>
                        <ol v-show="menu" class="sub-menu">
                            <li><a href="javascript:;" @click="dialog = true">修改密码</a></li>
                            <li><a href="javascript:;" @click="logOut">登出</a></li>
                        </ol>
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




        <!--  <Modal v-model="modal" title="修改密码">

	         <Form ref="changePassword" :model="change" :rules="rule" :label-width="80">
	           <Form-item label="原密码" prop="passwdOld" style="margin-bottom: 25px">
		            <Input type="password" v-model="change.passwdOld"></Input>
		        </Form-item>
		        <Form-item label="密码" prop="passwd" style="margin-bottom: 25px">
		            <Input type="password" v-model="change.passwd"></Input>
		        </Form-item>
		        <Form-item label="确认密码" prop="passwdCheck" style="margin-bottom: 25px">
		            <Input type="password" v-model="change.passwdCheck"></Input>
		        </Form-item>

		        <Form-item>
		            <Button type="success" @click="handleSubmit('changePassword')">提交</Button>
		            <Button type="ghost" @click="closeModal" style="margin-left: 8px">取消</Button>
		        </Form-item>


		    </Form>

		    <div slot="footer"></div>
	        
	    </Modal>
 -->
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
	}

	.header-box {
	    max-width: 1440px;
	    margin: 0 auto;
	    height: 72px;
	    box-shadow: -1px 3px 3px #e4e6eb;
	    -webkit-box-shadow: -1px 3px 3px #e4e6eb;
	}

	.logo {
	    display: block;
	    width: 240px;
	    height: 72px;
	    line-height: 72px;
	    float: left;
	    background: #01cd78;
	    text-align: center;
	}
	.search {
	    width: 312px;
	    height: 36px;
	    float: left;
	    margin-left: 30px;
	    background: #f3f5f7 url("../Index/img/icon.png") no-repeat -93px -126px;
	    border-radius: 30px;
	    margin-top: 18px;
	    overflow: hidden;
	}
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
	    font-size: 14px;
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
	.setting .setting-icon{
	    display: inline-block;
	    width: 11px;
	    height: 11px;
	    background: url('../Index/img/icon.png') no-repeat -150px -140px;
	    position: relative;
	    left: 15px;
	    top: 2px;
	    transform: rotateX(0deg);
	    -webkit-transform: rotateX(0deg);
	    -moz-transform: rotateX(0deg);
	    transition: all .3s ease;
	    -webkit-transition: all .3s ease;
	    -moz-transition: all .3s ease;
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
	}

	.setting .sub-menu li {
	    height: 60px;
	    line-height: 60px;
	}

	.setting .sub-menu li:hover {
	    opacity: .8;
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
		methods: {
			showMenu(){
				this.menu = true;
			},
			hideMenu(){
				this.menu = false;	
			},
			logOut(){
				Utils.logOut();
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