<template>
	<div class="content">
    	<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/news/list', query: {type: detail.newsType} }">{{['新闻','公告'][detail.newsType]}}</el-breadcrumb-item>
		  <el-breadcrumb-item>详情</el-breadcrumb-item>
		</el-breadcrumb>

		<el-dialog v-model="modal" size="small">
			<img width="100%" :src="avatar" alt="">
		</el-dialog>

		<div class="container">
			<div class="news-detail" v-if="detail.newsTitle">
				<h2 class="news-title">{{detail.newsTitle}}</h2>
				<div class="fast-share">
					<div class="news-comments" title="查看评论">
						<span class="comments-amount">{{commentCount}}</span>
					</div>
				</div>
				<div class="news-content">
					<div class="news-category">
						<span class="news-category-tag">{{['新闻','公告'][detail.newsType]}}</span>
						<span class="news-time">{{new Date(detail.publishDate).toString()}}</span>
						<span class="new-author">撰稿人:&nbsp;{{detail.newsAuthor}}</span>
					</div>
					<!--内容-->
					<div class="news-substance" v-html="detail.content"></div>

					<div class="comments-area">
						<div class="comments-num"><b class="comments-amount">{{commentCount}}</b><span>条评论</span></div>
						<div class="comments-input">
							<a href="javascript:;" style="cursor: context-menu">
								<img class="comments-avatar" :src="setAvatar(personInfo)" alt="">
							</a>
							<textarea ref="textarea" v-model="text" placeholder="写下你的评论..." class="comments-text"></textarea>
							<div class="submit-box">
								<button type="button" class="comments-submit" @click="toComments">评论</button>
							</div>
						</div>

						<ul class="comments-list">
							<li v-for="(item, index) in comments" :key="index">
								<a class="avatar-link" href="javascript:;" @click="bigAvatar(item.user)">
									<img class="comments-avatar" :src="setAvatar(item.user)" alt="">
								</a>
								<div class="comments-content">
									<p class="comments-user-name">{{item.addPersonName}} 
										<span>&nbsp;{{item.user.depName}}&nbsp;|&nbsp;{{item.user.post}}&nbsp;</span> 
										<em>{{item.addTime | resetTime}}</em>
									</p>
									<p class="comments-substance">{{item.content}}</p>
								</div>
							</li></ul>
					</div>
				</div>
			</div>

			<div class="news-trends">
				<h2 class="news-trends-name">企业动态</h2>
				<ul>
					<li v-for="(item, index) in news" :key="index" v-if="item.id !=id">
						<router-link target="_blank" :to="{ path: '/news/detail', query: {id: item.id}}">{{item.newsTitle}}</router-link>
						<span class="news-trends-time">{{new Date(item.publishDate).toString()}}</span>
					</li>
				</ul>
			</div>


		</div>
		<div id="goTop" title="返回顶部"></div>
	</div>
</template>
<style scoped>
	.content{
		max-width: 1440px;
	    margin: 0 auto;
	}
	
	.container{
		max-width: 1440px;
		min-width: 1150px;
		margin: 0 auto;
		background: #fff;
		overflow: hidden;
		padding-bottom: 20px;
	}
	.news-detail{
		width: 810px;
		float: left;
		margin-left: 30px;
	}
	.news-title{
		margin-top: 30px;
		line-height: 36px;
		margin-bottom: 20px;
		font-size: 28px;
		color: #000;
		padding-left: 130px;
	}

	.news-trends{
		float: right;
		width: 230px;
		height:1000px;
		margin-right: 20px;
	}
	.news-trends-name{
		font-size: 16px;
		margin: 30px 0;
	}
	.news-trends ul li{
		font-size: 14px;
		margin-bottom: 40px;
	}
	.news-trends ul li a{
		display: block;
		font-size: 14px;
		color: #000;
		opacity: .8;
	}
	.news-trends ul li a:hover{
		color: #01cd78;
	}
	.news-trends-time{
		font-size: 12px;
		color: #000;
		opacity: .6;
	}
	.fast-share{
		width: 130px;
		height: 200px;
		float: left;
		display: inline-block;
	}
	.news-comments{
		position: fixed;
		top: 176px;
		cursor: pointer;
		height: 38px;
		width: 100px;
		font-size: 16px;
		color: #01cd78;
		background: url("/index/img/icon.png") -370px -305px;
	}
	.news-comments span{
		padding-left: 50px;
		font-size: 22px;
	}
	.news-content{
		float: left;
		width: 680px;
	}
	.news-content img{
		max-width: 100%;
	}
	.news-category{
		color: #9e9e9e;
		font-size: 14px;
		margin-bottom: 35px;
	}
	.news-category-tag{
		border: 1px solid #999999;
		padding: 1px 2px;
	}
	.news-time{
		margin: 0 10px;
	}
	.news-substance{
		font-size: 16px;
		color: #000;
		opacity: .8;
		line-height: 30px;
		text-align: justify;
	}
	.comments-area{
		clear: both;
	}
	.comments-num{
		height: 30px;
		width: 180px;
		background: url("/index/img/icon.png") -370px -305px;
		padding-left: 50px;
		font-size:22px;
		color: #01cd78;
		margin-bottom: 33px;
	}
	.comments-amount{
		font-weight: normal;
	}
	.comments-num span{
		font-size: 18px;
		color: #666;
		padding-left: 10px;
	}
	.comments-input{
		position: relative;
		height: 42px;
		margin-bottom: 30px;
	}
	.comments-input a{
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
	}
	.comments-input a img{
		height: 48px;
		width: 48px;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border-radius: 50%;
	}
	.comments-text{
		margin-left: 70px;
		width: 610px;
		height: 100%;
		display: inline-block;
		resize: none;
		border: 1px solid #ddd;
		font-size: 16px;
		color: #000;
		padding: 0;
		padding-left: 12px;
		line-height: 35px;
		outline: none;
	}
	.comments-text:focus{
		border: 1px solid #999;
	}
	.comments-submit{
		width: 90px;
		background: #01cd78;
		color: #fff;
		height: 40px;
		border: none;
		float: right;
		font-size: 14px;
		cursor: pointer;
	}
	.submit-box{
		position: absolute;
		bottom: 1px;
		right: 0;
		background: #f5f5f7;
		height: 40px;
		/*width: 606px;*/
	}
	.comments-list {
		margin-top: 36px;
		padding-top: 36px;
		border-top: 1px solid #e6e9eb;
	}
	.comments-list li{
		margin-bottom: 60px;
	}
	.comments-avatar{
		height: 48px;
		width: 48px;
		display: block;
		border: 1px solid #eee;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border-radius: 50%;
	}
	.comments-content{
		margin-left: 20px;
		display: inline-block;
	}
	.avatar-link{
		float: left;
	}
	.comments-user-name{
		color: #38c695;
		font-size: 14px;
	}
	.comments-user-name em{
		font-size: 12px;
		color: #999;
		float: right;
		font-style: normal;
	}
	.comments-user-name span{
		font-size: 12px;
		color: #999;
	}
	.comments-substance{
		font-size: 14px;
		color: #000;
		opacity: .8;
		float: right;
		width: 610px;
		line-height: 25px;
		word-break: break-all;
	}
	#goTop{
		height: 54px;
		width: 54px;
		background: url("./img/go-top.png");
		cursor: pointer;
		position: fixed;
		right: 10px;
		bottom: 100px;
		display: none;
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
				id: this.$route.query.id,
				modal: false,
				commentCount: 0,
				news: [],  // 最新随机新闻
				avatar: '' //评论用户的大图头像
				
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
			this.getNews();
		},
		
		filters:{
			resetTime(dateTimeStamp){
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - dateTimeStamp;
				if(diffValue < 0){return '刚刚';}
				var monthC = diffValue/month;
				var weekC = diffValue/(7*day);
				var dayC = diffValue/day;
				var hourC = diffValue/hour;
				var minC = diffValue/minute;
				var result = '';
				if(weekC == 1){
					result="" + parseInt(weekC) + "周前";
				}
				else if(dayC>=1 && dayC <= 5){
					result=""+ parseInt(dayC) +"天前";
				}
				else if(hourC>=1 && hourC<=24){
					result=""+ parseInt(hourC) +"小时前";
				}
				else if(minC>=1 && minC<= 60){
					result=""+ parseInt(minC) +"分钟前";
				}else if(minC < 1){
					result="刚刚";
				}else{
					result= new Date(dateTimeStamp).toString();
				}
				return result;
			}
		},
		methods:{
			setAvatar(info){
				return Utils.getAvatar(info);
			},
			bigAvatar(info){
				this.avatar = Utils.getAvatar(info);
				this.modal = true;
			},
			getComments(){ //获取评论详情
				this.ajax({ 
					url: 'news/comment/'+ this.id +'/0/list',
					success(data, $this){
						if(data.code == 'success'){
							$this.comments = data.content;
							$this.commentCount = data.content.length;
						}
					}
				});
			},
			getNews(){ //获取最新新闻
				this.ajax({
					url: '/news/common/list',
					data:{
						isTop: 1,
						pageNum:1,
						pageSize:5,
						isPublish:0
					},
					success(data, $this){
						if(data.code == 'success'){
							$this.news = data.content;
						}
					}	
				})
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
							$this.$message({
					          message: '评论成功！',
					          type: 'success'
					        });
						}else{

							this.$message({
					          message: '评论失败！',
					          type: 'error'
					        });
						}
					}
				})
			},
		},
		updated(){
			var commentsText = $('.comments-text');
			var commentsInput = $('.comments-input');
			$('.comments-amount').on('click',  function(){ //快速到达评论区
				document.body.scrollTop = commentsText.offset().top - 300;
				commentsText.focus();
			});
			commentsText.on('focus', function () {
				commentsInput.animate({
					height: 160
				},100);
				$('.submit-box').width(609);
			});

			
		},
		mounted(){
			 $(window).on('scroll', function () {
				var scrollTop = $('body').scrollTop();
				var goTop = $('#goTop');
				if(scrollTop <= 0){
					$('.news-comments').css({
						top: 176
					});

				}else{
					$('.news-comments').css({
						top: 90
					});
				}
				if(scrollTop >= 500){
					goTop.fadeIn();
				}else{
					goTop.fadeOut();
				}
			})

			$('#goTop').on('click', function () {
				$('body,html').animate({scrollTop:0},500);
			})
		}
	}
</script>
