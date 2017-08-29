<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<style>
	*{
		box-sizing: border-box;
    	-webkit-tap-highlight-color: transparent;
	}
	html{
		background: #eef0f5;
		font: 12px Microsoft YaHei,tahoma,arial,Hiragino Sans GB,\\5b8b\4f53,sans-serif;
	}

</style>
<script>
	export default {
		name: "index",
		mounted(){
			$('input').on('keypress', function(e){
				if(e.keyCode == 13){
					$(this).parents('form').find('.search-btn').click();
				}
			});
		}
	}
</script>
