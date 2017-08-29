<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'project',
		mounted(){
			this.$router.push('/project/projectManage');
		}
	}
</script>