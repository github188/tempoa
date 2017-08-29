<template>
	<div>
		<v-header></v-header>
		<input class="z-hide" type="checkbox" id="toggleMenu">
		<div class="wrap">
			<v-side></v-side>
			<router-view class="content"></router-view>	
		</div>
	</div>
</template>

<style scoped>
	.content{
	    background: #eee;
	    margin-top: 59px;
        padding: 24px 24px 40px;
	}
	.wrap{
		padding-left: 230px;
	}

	#toggleMenu:checked+.wrap{
		padding-left: 50px;
	}
</style>
<script>
	import { setStore } from '@/utils/localStorage'
	import Header from './Header'
	import Side from './Side'
	import components from '@/components/'  //获取注册的全局组件
	
	export default {
		name: 'header',
		components: {
			'v-header': Header,
			'v-side': Side
		},
		beforeRouteEnter (to, from, next) {
			if(to.params && to.params.id && to.params.name){
				setStore('menuParmas', to.params);
			}
			next();
	    }
	}

</script>


