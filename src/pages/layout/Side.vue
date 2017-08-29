<template>
	<div class="side-menu">
		<a class="side-toggle" href="javascript:;">
			<label for="toggleMenu" id="toggleMenuLabel">
				<!-- <Icon type="navicon-round"></Icon> -->
			</label>
		</a>

		<ul class="menu-list">
			<li v-for="(item, index) in menuList" :class="{'active':!index}">
				<!-- <router-link :to="item.url"> -->
				<router-link to="/project/projectManage">
					<!-- <Icon type="ios-cloud-outline"></Icon> -->
					<span>{{item.name}}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<style scoped>
	.side-menu{
		position: fixed;
		height: 100%;
		width: 230px;
		background: #fff;
		left: 0;
		top: 72px;
		transition: all 80ms ease-in-out;
	}
	.side-toggle{
		display: block;
		width: 100%;
		height: 36px;
		line-height: 36px;
		text-align: center;
		border-bottom: 1px solid #eee;
		color: #90929c;
		font-size: 22px;
	}
	.menu-list li{
		border-left: 4px solid transparent;
		font-size: 16px;
		transition: background 180ms ease;
	}
	.menu-list li:hover{
		background: #f2f2f2;
		transition: background 180ms ease;
	}
	.menu-list li span{
		font-size: 14px;
	}
	.menu-list li a{
    	display: block;
    	height: 50px;
    	line-height: 50px;
    	overflow: hidden;
    	padding-left: 40px;
    	padding-right: 20px;
    	transition: all 250ms ease-in-out;
    	color: #555;
	}
	.menu-list li.active a{
		color: #01cd78;
	}
	.menu-list li.active{
	    background: #f2f2f2;
    	border-left-color: #01cd78;
	}
	#toggleMenuLabel{
		cursor: pointer;
		display: block;
	}
	#toggleMenu:checked+.wrap .side-menu{
		width: 50px;
		transition: all 80ms ease-in-out;
	}
	#toggleMenu:checked+.wrap .side-menu .menu-list li a{
		padding-left: 13px;
		transition: all 250ms ease-in-out;
	}
</style>
<script>
	import { getStore } from '@/utils/localStorage'
	export default {
		name: 'side',
		data(){
			return {
				menuList: []
			}
		},
		created(){
			const menuParmas = JSON.parse(getStore('menuParmas'));
			this.ajax({  //获取菜单
				url: '/authority/resource/user/resources?resourceId=' + menuParmas.id,
				success(data, $this){
					console.log(data, '获取菜单');
					if(data.code == 'success'){
						$this.menuList = data.content;
					}else{
						this.$message({
				          showClose: true,
				          message: '身份验证失败！',
				          type: 'error',
				          onClose(){
								$this.$router.push('/login')		
							}
				        });
						
					}
				}
			});
		}
	}
</script>