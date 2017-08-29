<template>
	<div class="news-list">
		<div class="banner"></div>
		<div class="content">
	     	<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>新闻公告</el-breadcrumb-item>
			</el-breadcrumb>

		    <div class="news-content">
		
			    <el-tabs v-model="activeTab" @tab-click="loadList" class="news-list-tab" type="card">
	                <el-tab-pane name="news">
                		<span slot="label"><i class="icon icon-news"></i> 公司新闻</span>
	                	<div v-if="newsList.length">
			        		<ul class="news-box">
				        		<li v-for="(item, index) in newsList" :key="index">
				        			<p>
				        				<router-link class="news-title" :to="{ path: '/news/detail', query: {id: item.id}}">{{item.newsTitle}}</router-link>
				        			</p>
				        			<p class="news-time">{{new Date(item.addTime).toString()}}</p>
				        			<p class="news-abstract">{{item.content | getContent}}</p>
				        			<p>
			        					<router-link class="read-more" :to="{ path: '/news/detail', query: {id: item.id}}">查看更多...</router-link>
				        			</p>
				        		</li>
				        	</ul>
			        	</div>

			        	<p style="margin-top: 130px; text-align:center" v-else>
	                        暂无数据！
	                    </p>
	                </el-tab-pane>

	                <el-tab-pane name="notice">
	                	<span slot="label"><i class="icon icon-notice"></i> 通知公告</span>
	                	<div v-if="noticeList.length">
			        		<ul class="news-box">
				        		<li v-for="(item, index) in noticeList" :key="index">
				        			<p>
				        				<router-link class="news-title" :to="{ path: '/news/detail', query: {id: item.id}}">{{item.newsTitle}}</router-link>
				        			</p>
				        			<p class="news-time">{{new Date(item.addTime).toString()}}</p>
				        			<p class="news-abstract">{{item.content | getContent}}</p>
				        			<p>
			        					<router-link class="read-more" :to="{ path: '/news/detail', query: {id: item.id}}">查看更多...</router-link>
				        			</p>
				        		</li>
				        	</ul>
			        	</div>

			        	<p style="margin-top: 130px; text-align:center" v-else>
	                        暂无数据！
	                    </p>
	                </el-tab-pane>

                </el-tabs>
		    </div>
		</div>
	</div>
</template>

<style scoped>
	.banner{
		background: url('./img/news-list-banner.png') no-repeat center;
		height: 300px;
	}
	.content{
		max-width: 1440px;
	    margin: 0 auto;
	}
	.news-content{
		background: #fff;
		padding: 30px 20px;
	}
	.news-box li{		
	    margin-bottom: 42px;
    	border-bottom: 1px solid #E6E9EB;
    	height: 190px;
	}
	.news-box li p a.news-title{	
	    font-size: 20px;
    	color: #2F313A;
	}
	.news-box li p a.news-title:hover{
		color: #01cd78;
	}

	.news-box li p.news-time{
	    color: #888A95;
	    font-size: 12px;
	    margin-top: 8px;
	}
	.news-box li p.news-abstract{
	    color: #2F313A;
	    font-size: 14px;
	    margin-top: 25px;
	    margin-bottom: 24px;
	    position: relative;
	    line-height: 24px;
	    height: 48px;
	    white-space: normal;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	}
	.news-box li p a.read-more{
		color: #01cd78;
		float: right;
	}
	i.icon{
		display: inline-block;
		width: 22px;
		height: 18px;
		background-image: url('./img/icon.png');
		background-repeat: no-repeat;
		position: relative;
		top: 2px;
		padding-right: 30px;
	}
	i.icon.icon-news{
		background-position: 0 -26px;
	}
	.is-active i.icon.icon-news{
		background-position: 0 0;	
	}
	i.icon.icon-notice{
		background-position: -30px -26px;
	}
	.is-active i.icon.icon-notice{
		background-position: -30px 0;	
	}
</style>
<style>
	.news-list-tab{
		width: 100%;
	}

	.news-list-tab .el-tabs__item{
		display: block;
		height: 48px;
		line-height: 48px;
		border-radius: 6px;
	}
	.news-list-tab .el-tabs__header{
		border-bottom: none;
		width: 280px;
    	float: left;
	}

	.news-list-tab .el-tabs__content{
		margin-left: 310px;
	}
	.news-list-tab.el-tabs--card .el-tabs__header .el-tabs__item.is-active{
		border: none;
		color: #fff;
		background-color: #01cd78; 
	}
	.news-list-tab  .el-tabs__nav{
		width: 242px;
	}

	</style>
<script>
	export default {
		name: 'newsList',
		data(){
			return {
				newsList: [],
				noticeList: [],
				activeTab: 'news'
			}
		},
		created(){
			this.loadList('0');  //默认加载公告
		},
		filters: {
			getContent(value){
				if(value){
					return (value.replace(/<\/?[^>]*>/g, '')).substring(0, 174) + '......';
				}
			}
		},
		methods: {
			loadList(tab){
				if(typeof tab == 'string'){
					var index = tab;
				}else{
					var { index } =  tab;
				}

				this.ajax({
					url: '/news/common/list',
					data:{
						newsType: index, //0-新闻， 1-资讯
						pageNum:1,
						pageSize:5,
						isPublish:0
					},
					success(data, $this){
						if(data.code == 'success'){
							if(index == '0'){
								$this.newsList = data.content;
							}else if(index == '1'){
								$this.noticeList = data.content;
							}
						}
					}
				})
			}
		}	
	}
</script>
