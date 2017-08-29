<template>
	<div class="content">
    	<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/news/list' }">新闻公告</el-breadcrumb-item>
		  <el-breadcrumb-item>详情</el-breadcrumb-item>
		</el-breadcrumb>

    	<div class="news-box">
    		<div class="list-detail">
	    		<h2 class="title">{{detail.newsTitle}}</h2>
	    		<p class="time">{{new Date(detail.addTime).toString()}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{detail.newsAuthor}}</p>
	    		<div class="list-detail-content" v-html="detail.content"></div>
	    	</div>
	    	<div class="comments">
	    		<p class="comments-head">评论 <span class="comments-icon"></span><em>{{detail.commentCount}}</em></p>
	    		<div class="comments-area">
					<div class="comments-input">

					<el-row>
						<img :src="setAvatar" class="avatar">
						<el-col :span="10">
							<el-input v-model="text" placeholder="说点什么..." />
						</el-col>

						<el-col :span="10" :offset="1">
							<el-button type="success" @click="toComments">评论</el-button>
						</el-col>

					</el-row>
					</div>	

					<ul class="comments-list">
						<li v-for="(item, index) in comments" :key="index">
							<img :src="setAvatar" class="avatar">
							<div class="comments-box">
								<p class="user-name">{{item.addPersonName}}</p>
								<p class="comments-text">{{item.content}}</p>
								<span class="comments-time">{{new Date(item.updateTime).toString()}}</span>
							</div>
						</li>
					</ul>

	    		</div>
	    	</div>
    	</div>
	</div>
</template>
<style scoped>
	.content{
		max-width: 1440px;
	    margin: 0 auto;
	}
	.news-box{
		background: #fff;
		padding: 20px;
	}

	.title{
	    color: #2F313A;
	    font-size: 24px;
	    margin: 20px 0 20px;
	    font-weight: normal;
	}
	.time{
	    font-size: 14px;
		color: #888a95;
	}
	.list-detail-content{
	    padding: 40px 0;
    	border-bottom: 1px solid #E5E9EC;
    	font-size: 14px;
	}
	
	.comments{
	    color: #2f313a;
	    font-size: 16px;
	    padding-left: 8px;
	}
	.comments-head{
		padding: 15px 0;
	}
	.comments-head em{
		color: #01cd78;
		font-style: normal;
	}
	.comments-area{
	    border: 1px solid #E6E9EB;
		position: relative;
		border-radius: 6px;
		background: #F9F9F9;
		padding: 42px 32px;
		margin-bottom: 20px;
	}
	.comments-icon{
	    background: url(/static/img/icon.png) -72px -25px;
    	display: inline-block;
	    height: 25px;
	    color: #01cd78;
	    font-size: 22px;
	    padding-left: 30px;
    	padding-right: 5px;
	}
	.avatar{
		width: 50px;
		height: 50px;
		float: left;
		margin-right: 20px; 
		border-radius: 50%;
		margin-top: -5px;
	}
	.comments-list{
		margin-top: 60px;
	}
	.comments-list li{
		margin: 30px 0;
	}
	.comments-box{
		margin-left: 70px;
	    position: relative;
    	top: -10px;
	}
	.user-name{
	    color: #38c695;
    	font-size: 14px;
	}
	.comments-text{
	    font-size: 14px;
    	color: #2f313a;
    	margin: 10px 0 16px;
	}
	.comments-time{
		color: #888a95;
    	font-size: 12px;
	}
</style>
<style>
	.comments-input input{
		height: 38px;
		line-height: 38px;
		border-radius: 5px;
		font-size: 14px;
	}
	.list-detail-content p{
	    line-height: 1.8;
    	margin-bottom: 24px;
	}

	.list-detail-content img{
	    display: block;
	    margin: 0 auto;
	    max-width: 100%;
	    width: 80%;
	}

</style>
<script>
	import { appHost, appRoot, avatar } from '@/config/config'
	export default {
		name: "newsDetail",
		data(){
			return {
				detail: {},  //详情
				personInfo: {},  //个人信息
				comments: [],  //评论列表
				text: '',  //即将提交的评论内容,
				id: this.$route.query.id
			}
		},
		created(){
			this.ajax({  //获取新闻公告详情
				url: '/news/' + this.id + '/detail?',
				data: {
					comStatus: 0
				},
				success(data, $this){
					if(data.code == 'success'){
						$this.detail = data.content;
						document.title = $this.detail.newsTitle;
						
					}
				}
			});

			this.ajax({  //获取个人信息
				url: '/authority/user/homepage/detail',
				success(data, $this){
					if(data.code == 'success'){
						$this.personInfo = data.content;
					}
				}
			});

			this.getComments();
		},
		computed:{
			setAvatar(){
				return Utils.getAvatar(this.personInfo);
			}
		},
		methods:{
			getComments(){ //获取评论详情
				this.ajax({ 
					url: 'news/comment/'+ this.id +'/0/list',
					success(data, $this){
						if(data.code == 'success'){
							$this.comments = data.content;
						}
					}
				});

			},
			toComments(){
				if(this.text.trim().length == 0){
					this.$message({
			          message: '评论内容不能为空！',
			          type: 'info'
			        });
					return;
				}

				this.ajax({
					url: '/news/comment',
					type: 'post',
					data: {
						newId: this.id,
        				content: this.text
					},
					success(data, $this){
						if(data.code == "success"){
							$this.getComments();
							$this.text = '';
						}else{

							this.$message({
					          message: '评论失败！',
					          type: 'error'
					        });
						}
					}
				})
			}
		}
	}
</script>
