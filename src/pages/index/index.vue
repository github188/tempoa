<template>
	<div class="wrap">
		<v-header></v-header>

		<!-- <ul>
					<li v-for="item in menuList">
						<router-link :to='{name:"project", params:{id: item.id, name: item.name}}'>{{item.name}}</router-link>
					</li>
				</ul> -->

		<div class="content index-content">
			<div class="content-side">
				<div class="person-new">
					<el-carousel trigger="click" :autoplay="false" arrow="never" height="290px">
						<el-carousel-item v-for="(item, index) in workMate" :key="index">
							<img :alt="item.name" :src="require('./img/workmate/'+item.src)">
							<div class="person-new-info">
								<p style="margin-bottom: 9px;">
									<span class="person-name">{{item.name}}</span>
									<span>{{item.address.split('|').join('&nbsp;')}}</span>
								</p>
								<p style="margin-bottom: 9px;">{{item.department}}&nbsp;&nbsp;{{item.post}}</p>
								<p style="margin-bottom: 8px;">{{item.hobby}}</p>
								<p>show me: {{item.show}}</p>
							</div>
						</el-carousel-item>
					</el-carousel>

				</div>
				<div class="entry-menu">
					<ul>
						<li v-for="(item, index) in menuList" :key="index">
							<router-link :to="{name:'affairs', params:{id: item.id, name: item.name}}">
								<em class="icon" :class="item.icon"></em>
								<span>{{item.name}}</span>
								<em class="icon-cell"></em>
							</router-link>
						</li>
						<!--   <li>
		                            <a href="#">
		                                <em class="icon icon-finance"></em>
		                                <span>财务平台</span>
		                                <em class="icon-cell"></em>
		                            </a>
		                        </li>
		                        <li>
		                            <a href="#">
		                                <em class="icon icon-learn"></em>
		                                <span>学习平台</span>
		                                <em class="icon-cell"></em>
		                            </a>
		                        </li>
		                        <li>
		                            <a href="#">
		                                <em class="icon icon-client"></em>
		                                <span>客户关系管理平台</span>
		                                <em class="icon-cell"></em>
		                            </a>
		                        </li>
		                        <li>
		                            <a href="#">
		                                <em class="icon icon-contract"></em>
		                                <span>合同管理平台</span>
		                                <em class="icon-cell"></em>
		                            </a>
		                        </li>
		                        <li>
		                            <a href="#">
		                                <em class="icon icon-project"></em>
		                                <span>项目管理平台</span>
		                                <em class="icon-cell"></em>
		                            </a>
		                        </li>
		                        <li>
		                            <a href="#">
		                                <em class="icon icon-organize"></em>
		                                <span>组织架构管理平台</span>
		                                <em class="icon-cell"></em>
		                            </a>
		                        </li>
		                        <li>
		                            <a href="#">
		                                <em class="icon icon-oa"></em>
		                                <span>OA首页管理</span>
		                                <em class="icon-cell"></em>
		                            </a>
		                        </li>
		                        <li>
		                            <a href="#">
		                                <em class="icon icon-attendance"></em>
		                                <span>考勤管理</span>
		                                <em class="icon-cell"></em>
		                            </a>
		                        </li> -->
					</ul>
				</div>
			</div>
			<div class="content-box">
				<div class="content-l">
					<div class="weather box">
						<ul>
							<li>
								<em class="icon icon-calendar"></em>
								<span>{{new Date().toDay()}}&nbsp;&nbsp;&nbsp;&nbsp;{{new Date().toWeekDay()}}</span>
							</li>
							<li>
								<em class="icon icon-address"></em>
								<span>深圳&nbsp;&nbsp;&nbsp;&nbsp;{{weather}}</span>
							</li>
						</ul>
					</div>
					<div class="person-info box">
						<img :alt="personInfo.realname" :src="avatar">
						<p class="person-name">{{personInfo.realname}}</p>
						<p class="person-pos">{{personInfo.depName}}&nbsp;&nbsp;&nbsp;&nbsp;{{personInfo.post}}</p>
					</div>
					<div class="operation box">
						<ul>
							<li v-for="(item, index) in fastEntry" :key="index">
								<router-link :to="{name:'project', params:{id: item.id, name: item.name}}">
									<div :class="'operation-' + item.icon"></div>
									<span>{{item.name}}</span>
								</router-link>
							</li>
							<!--                       <li>
		                                <a href="">
		                                    <div class="operation-extra "></div>
		                                    <span>加班</span>
		                                </a>
		                            </li>
		                            <li>
		                                <a href="">
		                                    <div class="operation-out"></div>
		                                    <span>出差</span>
		                                </a>
		                            </li>
		                            <li>
		                                <a href="">
		                                    <div class="operation-expense"></div>
		                                    <span>报销</span>
		                                </a>
		                            </li>
		                            <li>
		                                <a href="">
		                                    <div class="operation-client"></div>
		                                    <span>录客户</span>
		                                </a>
		                            </li>
		                            <li>
		                                <a href="">
		                                    <div class="operation-business"></div>
		                                    <span>录商机</span>
		                                </a>
		                            </li> -->
						</ul>
						<div class="slide-toggle">
							<a class="active"></a>
							<a></a>
						</div>
					</div>
				</div>
				<div class="content-r">
					<div class="public-news">
						<p class="list-tag">
							<span>新闻公告</span>
							<a href="/news/list">更多</a>
						</p>
						<!-- <div class="public-news-content" v-if="stickNews.id">
		                            <img :src="setTopImg">
		                            <div class="top-line">
		                                <h2 class="top-line-title">
		                                	<span  class="top-line-tag" :class="stickNews.newsType==0 ? 'top-line-tag-news' : 'top-line-tag-publish'">{{stickNews.newsType==0?'新闻':'公告'}}</span><router-link :to="{ path: '/news/detail', query: {id: stickNews.id}}">{{stickNews.newsTitle}}</router-link><span class="top-line-time"> {{stickNews.addTime && new Date(stickNews.addTime).toString()}}</span>
		                            	</h2>
		                                <p class="top-line-content">{{stickNews.content|getContent}}</p>
		                            </div>
		                            <ul class="top-line-list">
		                              <li v-for="(item, index) in topNews" :key="index">
		                              	<span class="top-line-tag" :class="item.newsType==0?'top-line-tag-news' : 'top-line-tag-publish'">{{item.newsType==0?'新闻':'公告'}}</span>
		                              	<router-link :to="{ path: '/news/detail', query: {id: item.id}}">{{item.newsTitle}}</router-link>
		                              	<span class="top-line-time"> {{new Date(item.addTime).toString()}}</span>
			                          </li>
		                            </ul>
		                        </div> -->
						<!-- <p v-else style="margin-top: 130px; text-align: center;">暂无数据！</p> -->
					</div>
					<div class="my-work">
						<p class="list-tag">
							<span>我的工作台</span>
							<a href="/work/list">更多</a>
						</p>

						<el-tabs class="tab-content">
							<el-tab-pane>
								<span slot="label">我的待办&nbsp;
									<span style="color: #01cd78">({{todoHandleLabel || 0}})</span>
								</span>
								<ul v-if="todoHandle.length">
									<li v-for="(item, index) in todoHandle" :key="index">
										<p>
											<router-link :to="{ path: '/work/detail', query: {id: item.id}}">{{item.title}}</router-link>
											<span class="work-list-info">{{item.sponsorsName}}
												<em class="work-time"> {{new Date(item.addTime).toDay()}}</em>
											</span>
										</p>
									</li>
								</ul>
								<p style="margin-top: 130px; text-align:center" v-else>
									暂无数据！
								</p>
								</ul>
							</el-tab-pane>
							<el-tab-pane label="我申请的" name="second">
								<ul v-if="todoAsk.length">
									<li v-for="(item, index) in todoAsk" :key="index">
										<p>
											<router-link :to="{ path: '/work/detail', query: {id: item.id}}">{{item.title}}</router-link>
											<span class="work-list-info">{{item.sponsorsName}}
												<em class="work-time"> {{new Date(item.addTime).toDay()}}</em>
											</span>
										</p>
									</li>
								</ul>
								<p style="margin-top: 130px; text-align:center" v-else>
									暂无数据！
								</p>
							</el-tab-pane>

						</el-tabs>

					</div>
				</div>
				<div class="honour">
					<p class="honour-title">亿车荣誉榜</p>

					<el-carousel trigger="click" indicator-position="none" arrow="always" height="240px">
						<el-carousel-item v-for="(item, index) in honour" :key="index">
							<ul>
								<li v-for="(list, listIndex) in item" :key="listIndex">
									<img :src="list.src" alt="">
									<p class="honour-name">{{list.name}}</p>
									<p class="margin-b-10">{{list.department}}&nbsp;&nbsp;&nbsp;{{list.honour}}</p>
									<p>{{list.post}}</p>
								</li>
							</ul>
						</el-carousel-item>
					</el-carousel>

				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
/*主体start*/

.wrap {
	max-width: 1440px;
	min-width: 1150px;
	margin: 0 auto;
}

.content {
	margin-top: 96px;
	margin-bottom: 24px;
	overflow: hidden;
}

.content-side {
	width: 300px;
	float: right;
}

.content-box {
	margin-right: 324px;
}

.person-new {
	height: 320px;
	background: #fff;
	margin-bottom: 24px;
	padding-top: 30px;
}

.person-new img {
	height: 120px;
	width: 120px;
	display: block;
	border-radius: 100%;
	background: #f06;
	border: none;
	margin: 0 auto;
}

.person-new-info {
	margin-top: 20px;
	text-align: center;
	font-size: 14px;
	color: #9f9f9f;
}

.person-new-info p {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: 0 40px;
	margin-bottom: 8px;
	line-height: 20px;
}

.slide-toggle {
	text-align: center;
}

.slide-toggle a {
	display: inline-block;
	height: 6px;
	width: 6px;
	background: #b9b9b9;
	border-radius: 100%;
	margin: 0 2px;
	cursor: pointer;
}

.slide-toggle a.active {
	width: 20px;
	background: #01cd78;
	border-radius: 5px;
}

.person-new .person-name {
	font-size: 18px;
	color: #3e3e3e;
	padding-right: 28px;
}

.entry-menu {
	height: 714px;
	background: #fff;
}

.entry-menu ul {
	padding: 20px 30px;
}

.entry-menu ul li {
	height: 76px;
	line-height: 76px;
	list-style: none;
	border-bottom: 1px solid #e5e5e5;
}

.entry-menu ul li:last-child {
	border-bottom: none;
}

.entry-menu ul li a {
	display: block;
	height: 100%;
	position: relative;
}

.entry-menu ul li span {
	padding-left: 64px;
	font-size: 16px;
	color: #3e3e3e;
}

.entry-menu ul li a .icon-cell {
	display: inline-block;
	position: absolute;
	height: 11px;
	width: 7px;
	background: url("./img/icon.png") -185px -140px;
	top: 34px;
	right: 0;
}

.entry-menu ul li a .icon {
	display: inline-block;
	height: 30px;
	width: 40px;
	position: absolute;
	top: 22px;
	background-image: url("./img/icon.png");
}

.entry-menu ul li a .icon-affairs {
	background-position: -15px -22px;
}

.entry-menu ul li a .icon-finance {
	background-position: -70px -20px;
}

.entry-menu ul li a .icon-learn {
	background-position: -117px -20px;
}

.entry-menu ul li a .icon-learn {
	background-position: -117px -20px;
}

.entry-menu ul li a .icon-client {
	background-position: -164px -20px;
}

.entry-menu ul li a .icon-contract {
	background-position: -213px -20px;
}

.entry-menu ul li a .icon-project {
	background-position: -260px -20px;
}

.entry-menu ul li a .icon-organize {
	background-position: -308px -20px;
}

.entry-menu ul li a .icon-oa {
	background-position: -356px -18px;
}

.icon-attendance {
	background-position: -402px -22px;
}

.content-l {
	height: 400px;
	float: left;
}

.content-l .box {
	background: #fff;
	width: 280px;
	margin-bottom: 24px;
}

.weather {
	height: 100px;
	padding: 24px 0 24px 30px;
}

.weather ul {
	padding-left: 0;
}

.weather ul li {
	list-style: none;
	font-size: 16px;
	color: #3e3e3e;
	position: relative;
	height: 30px;
	line-height: 30px;
}

.weather ul li span {
	padding-left: 38px;
}

.weather ul li .icon {
	position: absolute;
	height: 16px;
	width: 18px;
	background-image: url("./img/icon.png");
	top: 7px;
}

.weather ul li .icon-calendar {
	background-position: -24px -136px;
}

.weather ul li .icon-address {
	background-position: -66px -136px;
}

.person-info {
	height: 196px;
	padding-top: 30px;
	text-align: center;
}

.person-info img {
	height: 72px;
	width: 72px;
	border-radius: 100%;
	margin: 0 auto;
	display: block;
	margin-bottom: 18px;
}

.person-name {
	font-size: 16px;
	color: #3e3e3e;
	margin-bottom: 16px;
}

.person-pos {
	text-align: center;
	color: #979797;
	font-size: 14px;
}

.operation {
	height: 390px;
	padding: 35px 45px 20px 45px;
}

.operation ul {
	padding-left: 0;
	height: 348px;
	overflow: hidden;
}

.operation ul li {
	float: left;
	list-style: none;
	height: 116px;
	width: 80px;
}

.operation ul li span {
	text-align: center;
	display: block;
	width: 65px;
	font-size: 16px;
	color: #3e3e3e;
}

.operation ul li div {
	display: block;
	height: 36px;
	width: 36px;
	background-image: url("./img/icon.png");
	border-radius: 100%;
	margin-bottom: 14px;
	margin-left: 16px;
}

.operation-leave {
	background-position: -25px -75px;
}

.operation-extra {
	background-position: -86px -75px;
}

.operation-out {
	background-position: -147px -75px;
}

.operation-expense {
	background-position: -209px -75px;
}

.operation-client {
	background-position: -270px -75px;
}

.operation-business {
	background-position: -330px -75px;
}

.operation-approval {
	background-position: -452px -75px;
}

.operation-need {
	background-position: -513px -75px;
}

.operation-contract {
	background-position: -574px -75px;
}

.operation-room {
	background-position: -635px -75px;
}

.operation ul li:nth-child(even) {
	margin-left: 24px;
}

.operation ul li:nth-child(even) a {
	float: right;
}

.operation .slide-toggle {
	position: relative;
	top: -35px;
}

.content-r {
	margin-left: 304px;
}

.list-tag {
	position: relative;
}

.list-tag span {
	padding-left: 12px;
	font-size: 16px;
	color: #8e8e90;
}

.list-tag:before {
	position: absolute;
	top: 0;
	content: '';
	height: 16px;
	width: 4px;
	background: #01cd78;
	border-radius: 3px;
	display: inline-block;
}

.list-tag a {
	color: #868f94;
	font-size: 14px;
	float: right;
}

.public-news {
	width: 100%;
	height: 320px;
	background: #fff;
	margin-bottom: 24px;
	padding: 20px 30px 30px 24px;
}

.public-news-content {
	margin-top: 15px;
}

.public-news-content img {
	width: 230px;
	height: 120px;
	float: left;
	margin-right: 20px;
	border: none;
}

.top-line h2 {
	font-size: 14px;
	font-weight: normal;
}

.top-line-tag {
	height: 20px;
	line-height: 20px;
	width: 42px;
	color: #fff;
	display: inline-block;
	text-align: center;
	border-radius: 10px;
	margin-right: 10px;
	font-size: 12px;
}

.top-line-tag-publish {
	background: #f4510b;
}

.top-line-tag-news {
	background: #01cd78;
}

.top-line-title a {
	font-size: 14px;
	color: #3e3e3e;
	display: inline-block;
	width: 35%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.top-line-title a:hover {
	color: #01cd78;
}

.top-line-time {
	float: right;
	color: #8d8d8d;
	font-size: 12px;
}

.top-line-content {
	font-size: 12px;
	color: #8d8d8d;
	line-height: 24px;
	height: 95px;
	overflow: hidden;
	text-align: justify;
	margin-top: 8px;
	margin-bottom: 15px;
}

.top-line-list {
	padding-left: 0;
}

.top-line-list a {
	color: #373e4a;
}

.top-line-list a:hover {
	color: #01cd78;
}

.top-line-list li {
	list-style: none;
	height: 35px;
	line-height: 35px;
	font-size: 14px;
}

.my-work {
	width: 100%;
	height: 390px;
	background: #fff;
	padding: 20px 0 30px 0;
	margin-bottom: 24px;
}

.my-work .list-tag {
	padding: 0 30px 0 24px;
	margin-bottom: 15px;
}

.tab-menu {
	border-bottom: 1px solid #e5e5e5;
	padding: 0 30px 0 24px;
	font-size: 14px;
}

.tab-menu span {
	color: #01cd78;
}

.tab-menu a {
	color: #8e8e90;
	margin-right: 30px;
	padding: 0 8px;
	display: inline-block;
}

.tab-menu a.active {
	color: #3e3e3e;
	border-bottom: 2px solid #01cd78;
	padding-bottom: 10px;
}

.work-list-info {
	float: right;
	color: #40474d;
}

.work-list-info em {
	font-style: normal;
	font-size: 13px;
}

.work-list-info .work-time {
	padding-left: 35px;
	color: #8d8d8d;
}

.honour {
	height: 300px;
	background: #fff;
	text-align: center;
}

.honour-title {
	text-align: center;
	padding: 20px 0;
	font-size: 16px;
	margin-bottom: 0;
}

.honour ul {
	padding-left: 0;
	overflow: hidden;
	margin: 0 auto;
	width: 1020px;
}

.honour ul li {
	list-style: none;
	float: left;
	height: 210px;
	width: 162px;
	border: 1px solid #e5e5e5;
	margin: 0 20px;
}

.honour ul li img {
	height: 110px;
	background: #fff;
}

.honour-name {
	height: 36px;
	line-height: 36px;
	text-align: center;
	border-bottom: 1px solid #e5e5e5;
	font-size: 14px;
	color: #3e3e3e;
	margin: 0 10px;
	margin-bottom: 9px;
}

.honour ul li a {
	display: block;
	color: #979797;
	font-size: 12px;
}
</style>

<style>
/*重置tab样式*/

.index-content .el-tabs__active-bar {
	background-color: #01cd78;
	height: 2px;
}

.index-content .el-tabs__item.is-active {
	color: #1f2d3d;
}

.index-content .el-tabs__item {
	padding: 0 24px;
}

.index-content .tab-content ul {
	padding: 0 24px;
	margin-top: 10px;
}

.index-content .tab-content ul li {
	list-style: none;
	height: 38px;
	font-size: 14px;
}



/*重置幻灯片样式*/

.index-content .el-carousel__button {
	background-color: #01cd78;
	width: 6px;
	height: 6px;
	border-radius: 100%;
	background: #b9b9b9;
	opacity: 1;
}

.index-content .el-carousel__indicator.is-active button {
	width: 20px;
	background: #01cd78;
	border-radius: 5px;
}

.index-content .el-carousel__arrow:hover,
.index-content .el-carousel__arrow {
	background: rgba(0, 0, 0, 0);
}

.index-content .el-carousel__arrow i {
	font-size: 25px;
	color: #efefef;
	font-weight: bold;
}

.index-content .el-carousel__arrow:hover i {
	color: #01cd78;
}
</style>

<script>
import Header from '../index/header'
import { appHost, appRoot, avatar } from '@/config/config'
export default {
	name: 'index',
	components: {
		'v-header': Header
	},
	data() {
		return {
			menuList: [], // 菜单
			weather: '太阳',  //天气
			honour: {},   //荣誉榜
			personInfo: {},  //个人信息
			topNews: [],  //头条新闻
			stickNews: {},  //置顶头条
			workMate: [],  //新同事风采
			todoHandle: [],//我的工作台待办
			todoAsk: [], //我的工作台申请
			todoHandleLabel: '',  //待办列表
			avatar: '',  //头像获取
			fastEntry: [] // 快捷登陆入口
		}
	},
	created() {
		let that = this;
		this.honour = {
			0: [{
				name: "朱天同",
				src: 'zhutiantong.png',
				department: "研发中心",
				post: "高级模式识别工程师",
				honour: "技术之星"
			}, {
				name: "刘源",
				src: "liuyuan.png",
				department: "运营部",
				post: "活动运营经理",
				honour: "进步之星"
			}, {
				name: "吴立辉",
				src: "wulihui.png",
				department: "路外停车事业部",
				post: "产品经理",
				honour: "进步之星"
			}, {
				name: "张海",
				src: "zhanghai.png",
				department: "工程建设部",
				post: "实施工程师",
				honour: "进步之星"
			}, {
				name: "刘世强",
				src: "liushiqiang.png",
				department: "工程建设部",
				post: "维护组组长",
				honour: "进步之星"
			}],
			1: [{
				name: "舒玲燕",
				src: "shulingyan.png",
				department: "人资行政部",
				post: "行政经理",
				honour: "奉献之星"
			}, {
				name: "曾小菊",
				src: "zengxiaoju.png",
				department: "新能源事业部",
				post: "客服专员",
				honour: "奉献之星"
			}, {
				name: "尤书畅",
				src: "youshuchang.png",
				department: "路内停车事业部",
				post: "产品经理",
				honour: "奉献之星"
			}, {
				name: "黄剑豪",
				src: "huangjianhao.png",
				department: "路内停车事业部",
				post: "android开发工程师",
				honour: "奉献之星"
			}, {
				name: "韦宏周",
				src: "weihongzhou.png",
				department: "路外停车事业部",
				post: "UI设计师",
				honour: "奉献之星"
			}],
			2: [{
				name: "杨双健",
				src: "yangshuangjian.png",
				department: "战略发展部",
				post: "战略发展经理",
				honour: "明日之星"
			}, {
				name: "刘瑞雪",
				src: "liuruixue.png",
				department: "运营部",
				post: "停车场经营主管",
				honour: "明日之星"
			}, {
				name: "冉成伟",
				src: "ranchengwei.png",
				department: "新能源事业部",
				post: "WEB前端开发工程师",
				honour: "明日之星"
			}, {
				name: "熊小军",
				src: "xiongxiaojun.png",
				department: "路外停车事业部",
				post: "WEB前端开发工程师",
				honour: "明日之星"
			}, {
				name: "李志标",
				src: "lizhibiao.png",
				department: "路内停车事业部",
				post: "软件测试工程师",
				honour: "明日之星"
			}],
			3: [{
				name: "潘江辉",
				src: "panjianghui.png",
				department: "路内停车事业部",
				post: "Java开发工程师",
				honour: "明日之星"
			}, {
				name: "谢月星",
				src: "xieyuexing.png",
				department: "研发中心",
				post: "营销中心",
				honour: "明日之星"
			}, {
				name: "田德志",
				src: "tiandezhi.png",
				department: "运行维护部",
				post: "应用运维工程师",
				honour: "明日之星"
			}, {
				name: "肖云峰",
				src: "xiaoyunfeng.png",
				department: "营销中心",
				post: "区域经理",
				honour: "业绩之星"
			}, {
				name: "梅宇杰",
				src: "meiyujie.png",
				department: "营销中心",
				post: "区域经理",
				honour: "开拓之星"
			}],
			4: [{
				name: "冯晋颉",
				src: "fengjinjie.png",
				department: "营销中心",
				post: "售前技术经理",
				honour: "责任之星"
			}, {
				name: "游璇冰",
				src: "youxuanbing.png",
				department: "营销中心",
				post: "数据专员",
				honour: "责任之星"
			}, {
				name: "黄焰",
				src: "huangyan.png",
				department: "财务部",
				post: "主管会计",
				honour: "责任之星"
			}, {
				name: "万红军",
				src: "wanhongjun.png",
				department: "路外停车事业部",
				post: "测试工程师",
				honour: "责任之星"
			}, {
				name: "李庆",
				src: "liqing.png",
				department: "营销中心",
				post: "售前技术经理",
				honour: "服务之星"
			}],
			5: [{
				name: "徐晨光",
				src: "xuchenguang.png",
				department: "营销中心",
				post: "售前技术经理",
				honour: "合作之星"
			}, {
				name: "胡海波",
				src: "huhaibo.png",
				department: "运行维护部",
				post: "应用运维工程师",
				honour: "协作之星"
			}, {
				name: "赵龙",
				src: "zhaolong.png",
				department: "工程建设部",
				post: "维护工程师",
				honour: "协作之星"
			}, {
				name: "汪体",
				src: "wangti.png",
				department: "研发中心",
				post: "工程建设部",
				honour: "行动之星"
			}, {
				name: "石芳铭",
				src: "shifangming.png",
				department: "战略发展部",
				post: "战略发展经理",
				honour: "讲师之星"
			}],
			6: [{
				name: "林坚立",
				src: "linjianli.png",
				department: "战略发展部",
				post: "战略发展部总经理",
				honour: "导师之星"
			}]
		}

		this.workMate = [{
			src: 'chenyu.jpg',
			name: '陈玉',
			address: '湖北|仙桃',
			department: "路外停车事业部",
			post: "Android工程师",
			hobby: '喜欢打球、爬山、游泳',
			show: '相信自己，你能行！'
		}, {
			src: 'liaoyinglong.jpg',
			name: '廖应龙',
			address: '江西|赣州',
			department: "路外停车事业部",
			post: "web前端开发工程师",
			hobby: '喜欢羽毛球',
			show: 'time will tell'
		}];

		for (let item in this.honour) {
			for (let i = 0; i < this.honour[item].length; i++) {
				this.honour[item][i].src = '/static/img/honour/' + this.honour[item][i].src;
			}
		}
		this.ajax({  //获取首页模块菜单
			url: '/authority/resource/user/resources',
			data: {
				typeLevel: 1
			},
			success(data, $this) {
				if (data.code == 'success') {
					$this.$data.menuList = data.content;
				}
				if (data.code == "401") {
					Utils.logOut();
				}
			}
		});

		$.ajax({ //设置天气
			url: 'https://free-api.heweather.com/v5/weather?city=shenzhen&key=30ba99f5d2154ddd8e7ab25747743902',
			success(data) {
				that.weather = data.HeWeather5[0].now.cond.txt;
			}
		});

		this.ajax({  //获取个人信息
			url: '/authority/user/homepage/detail',
			success(data, $this) {
				if (data.code == 'success') {
					$this.personInfo = data.content;
					$this.avatar = Utils.getAvatar($this.personInfo);

				}
			}
		});

		this.ajax({  //获取新闻或公共3条
			url: '/news/common/list',
			data: {
				isTop: 1,
				pageNum: 1,
				pageSize: 3,
				isPublish: 0
			},
			success(data, $this) {
				if (data.code == 'success') {
					$this.topNews = data.content;
				}
			}
		});

		this.ajax({  //获取置顶新闻或公共1条
			url: '/news/common/list',
			data: {
				isTop: 0,
				pageNum: 1,
				pageSize: 1,
				isPublish: 0
			},
			success(data, $this) {
				if (data.code == 'success') {
					$this.stickNews = data.content[0];
				}
			}
		});

		this.ajax({   //获取我的待办
			url: '/sys/process/todo/list',
			data: {
				pageNum: 1,
				pageSize: 7
			},
			success(data, $this) {
				if (data.code == 'success') {
					$this.todoHandle = data.content;
					$this.todoHandleLabel = data.totals;
				}
			}
		});

		this.ajax({  //获取我申请的
			url: '/sys/process/myapply/list',
			data: {
				pageNum: 1,
				pageSize: 7
			},
			success(data, $this) {
				if (data.code == 'success') {
					$this.todoAsk = data.content;
				}
			}
		})


		const baseUrl = ['/project/proManage.html', '/project/projectContract.html', '/project/demandManage.html', '/project/crmClientManage.html', '/project/crmBusinessManage.html'];
		const baseEntry = [{
			url: 'pmo_add_project',
			name: "立项",
			icon: 'approval'
		}, {
			url: 'startVerify',
			name: "发起合同",
			icon: 'contract'
		}, {
			url: 'pmo_add_demand',
			name: "提需求",
			icon: 'need'
		},
		{
			url: 'crm_add_client',
			name: "录客户",
			icon: 'client'
		},
		{
			url: 'crm_add_opportunity',
			name: "录商机",
			icon: 'business'
		}]
		let getMenu = function(baseUrl) {
			return new Promise((resolve, reject) => {
				this.ajax({
					url: '/authority/resource/user/resources',
					success(data, $this) {
						if (data.code == 'success') {
							const content = data.content;
							for (let i = 0; i < content.length; i++) {
								let { url, parentId, id } = content[i];
								if (url == baseUrl) {
									resolve({ url, parentId, id });
								}
							}
						}
					}
				})
			})
		}.bind(this);


		let getMenuButton = function(id) {
			this.ajax({
				url: '/authority/resource/user/resources?resourceId=' + id,
				success(data, $this) {
					if (data.code == 'success') {
						let content = data.content;
						for (let i = 0; i < content.length; i++) {
							console.log(content[i].name)
							for (let j = 0; j < baseEntry.length; j++) {
								if (baseEntry[j].url == content[i].url) {
									$this.fastEntry.push({
										id: content[i].id,
										name: baseEntry[j].name,
										parentId: content[i].parentId,
										url: content[i].url,
										icon: baseEntry[j].icon,
									})
								}
							}
						}
					}
				}
			})
		}.bind(this);



		let getMenuEntry = async function() {
			for (let i = 0; i < baseUrl.length; i++) {
				let menu = await getMenu(baseUrl[i]);
				getMenuButton(menu.id)
			}
		}
		getMenuEntry();

	},
	filters: {
		getContent(value) {
			if (value) {
				return (Utils.unescapeHtml(value).replace(/<\/?[^>]*>/g, '')).substring(0, 174) + '......';
			}
		}
	},
	computed: {
		setAvatar() {
			return Utils.getAvatar(this.personInfo);
		},
		setTopImg(value) {
			const { pictureId } = this.stickNews;
			return pictureId ? appHost + appRoot + '/news/picture/top/' + pictureId + '/download' : require('./img/news-default.png')
		}
	},
	methods: {

	}
}
</script>
		