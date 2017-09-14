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
          <p class="list-tag" style="padding-left: 24px; margin-top:-10px">
            <span>新人秀</span>
          </p>
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
              <router-link :to="{name:'attendanceReport', params:{id: item.id, name: item.name}}">
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
            <router-link target="_blank" to="/person" title="查看个人信息">
              <img :alt="personInfo.realname" :src="getAvatar(personInfo)">
            </router-link>
            <p class="person-name">{{personInfo.realname}}</p>
            <p class="person-pos" ref="post">{{personInfo.depName | getDepart}}
              <span ref="depart">{{personInfo.post}}</span>
            </p>
          </div>
          <div class="operation box">
            <ul>
              <li v-for="(item, index) in fastEntry" :key="index">
                <router-link :to="{name:'project', params:{id: item.id, name: item.name}}">
                  <div :class="'operation-' + item.icon"></div>
                  <span>{{item.name}}</span>
                </router-link>
              </li>
              <!--<li>
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
              <span>企业动态</span>
              <a target="_blank" href="/news/list">更多</a>
            </p>
            <div class="public-news-content">
              <template v-if="stickNews">
                <router-link target="_blank" :to="{path: '/news/detail', query:{id: stickNews.id}}">
                  <img alt="" :src="setTopImg">
                  <div class="top-line">
                    <h2 class="top-line-title" id="topPublic">
                      <span style="position:relative; top:-3px" class="top-line-tag top-line-tag-news" v-if="stickNews.newsType == 0">新闻</span>
                      <span style="position:relative; top:-3px" class="top-line-tag top-line-tag-publish" v-if="stickNews.newsType == 1">公告</span>
                      <router-link target="_blank" :to="{path: '/news/detail', query:{id: stickNews.id}}">{{stickNews.newsTitle}}</router-link>
                      <em class="tag-icon tag-icon-top">Top</em>
                      <span class="top-line-time" style="margin-top: 0;"> 2017-08-28 13:59:58</span>
                    </h2>
                    <p id="topPublicContent" class="top-line-content">{{stickNews.content | getContent}}</p>
                  </div>
                </router-link>
              </template>

              <ul id="topNews" class="top-line-list">
                <li class="top-line-title" v-for="(item, index) in topNews" :key="index">
                  <span class="top-line-tag top-line-tag-news" v-if="item.newsType == 0">新闻</span>
                  <span class="top-line-tag top-line-tag-publish" v-if="item.newsType == 1">公告</span>
                  <router-link target="_blank" :to="{path: '/news/detail', query:{id: item.id}}">{{item.newsTitle}}</router-link>
                  <em class="tag-icon tag-icon-new" v-if="restTime(item.publishDate)">New</em>
                  <span class="top-line-time"> {{new Date(item.publishDate).toString()}}</span>
                </li>
              </ul>
            </div>
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
                  勤劳如您，一个待办都木有，点赞！
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
                  您还没有发起过任何申请，此处空空如也。
                </p>
              </el-tab-pane>

            </el-tabs>

          </div>
        </div>
        <div class="honour">
          <p class="honour-title">亿车荣誉榜</p>

          <el-carousel trigger="click" indicator-position="none" arrow="always" height="240px">
            <el-carousel-item v-for="(item, index) in honour" :key="index">
              <ul id="honourBox">
                <li v-for="(list, listIndex) in item" :key="listIndex">
                  <img :src="list.src" alt="">
                  <p class="honour-name">{{list.name}}</p>
                  <p class="margin-b-10">{{list.department}}&nbsp;&nbsp;&nbsp;{{list.honour}}</p>
                  <p>{{list.post}}</p>
                  <div class="honour-synopsis">
                    <p>
                      <label>部门:</label> {{list.department}}
                    </p>
                    <p>
                      <label>岗位:</label> {{list.post}}
                    </p>
                    <p> {{list.describe}} </p>
                  </div>
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
  height: 90px;
  width: 90px;
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

.person-pos span {
  padding-left: 15px;
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
  top: 3px;
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
  max-width: 35%;
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

.top-line-list .top-line-tag {
  position: relative;
  top: -12px;
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
  position: relative;
  cursor: pointer;
}

.honour ul li .honour-synopsis {
  position: absolute;
  width: 203px;
  height: 210px;
  top: -1px;
  left: 160px;
  background-color: #fff;
  display: none;
  z-index: 100;
  border: 1px solid #e5e5e5;
  padding: 10px;
  text-align: left;
  overflow: auto;
  box-shadow: 3px 0 15px 0 #e6e6e6;
}

.honour ul li .honour-synopsis p {
  margin-bottom: 8px;
  line-height: 18px;
  color: #666;
}

.honour ul li:nth-child(5) .honour-synopsis {
  left: -203px;
}

.honour ul li .honour-synopsis label {
  color: #999;
  font-weight: normal;
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

.tag-icon {
  font-size: 12px;
  font-style: normal;
  position: relative;
  top: -8px;
  left: -4px;
  font-weight: bold;
}

.tag-icon-top {
  color: #0B99EA;
  left: 4px;
}

.tag-icon-new {
  color: #F42C0B;
  left: 4px;
  top: -18px;
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

.person-new .el-carousel__indicators {
  bottom: 20px
}
</style>

<script>
import Header from '../index/header';
export default {
  name: 'index',
  components: {
    'v-header': Header
  },
  data() {
    return {
      menuList: [], // 菜单
      weather: '太阳', //天气
      honour: {}, //荣誉榜
      personInfo: {}, //个人信息
      topNews: [], //头条新闻
      stickNews: undefined, //置顶头条
      workMate: [], //新同事风采
      todoHandle: [], //我的工作台待办
      todoAsk: [], //我的工作台申请
      todoHandleLabel: '', //待办列表
      fastEntry: [] // 快捷登陆入口
    };
  },
  created() {
    let that = this;
    this.honour = {
      0: [{
        name: "朱天同",
        src: "zhutiantong.png",
        department: "研发中心",
        post: "高级模式识别工程师",
        honour: "技术之星",
        describe: '对待开发工作严肃认真、精益求精，在2016年的基础上开发出了识别率高达97%的斜拍车牌识别算法，达到业界领先水平，用自己的技术为公司增加竞争力！'
      }, {
        name: "刘源",
        src: "liuyuan.png",
        department: "运营部",
        post: "活动运营经理",
        honour: "进步之星",
        describe: '围绕“广告、保险、车后服务”积极拓展车主增值服务，与太平洋保险签署总公司合作框架协议，并策划启动车险联合销售、太保车主日等合作业务；草拟蜜蜂停车广告刊例文档，并洽谈深港澳车展、团贷网金融理财广告合作试点；与随时喷、车发发策划机油保养、美容打蜡等活动，为下阶段增值服务产品化运营打下良好基础！'
      }, {
        name: "吴立辉",
        src: "wulihui.png",
        department: "路外停车事业部",
        post: "产品经理",
        honour: "进步之星",
        describe: '去年的新人已经成长为路外事业部项目及产品的需求工作主力，在二季度表现非常突出，在交管产品、集团化产品等的构建过程中，承担了大部分的需求输出工作，所完成的产品得到了公司领导、外部客户的一致认可及好评，对于路外产品体系的了解也逐步地深化，相信在今年一定能做出非常优异的成绩！'
      }, {
        name: "张海",
        src: "zhanghai.png",
        department: "工程建设部",
        post: "实施工程师",
        honour: "进步之星",
        describe: '进步快，工作积极，认真勤奋，积极融入团队，客户服务态度非常好；上半年前几个月改了不少场地，保质保量，最近经常在外出差做技术支持或者停车场改造，踏实认真，工作完成的很出色，客户评价很高！'
      }, {
        name: "刘世强",
        src: "liushiqiang.png",
        department: "工程建设部",
        post: "维护组组长",
        honour: "进步之星",
        describe: '从一个应届毕业生到现在的维护组长，成长有目共睹，用6个人的团队服务着全深圳几百个停车场项目，组内制度也慢慢建立，同时对组员很好地传递了公司敢拼敢闯不怕辛苦的传统，继续努力！'
      }],
      1: [{
        name: "舒玲燕",
        src: "shulingyan.png",
        department: "人资行政部",
        post: "行政经理",
        honour: "奉献之星",
        describe: '具有很明显的早期员工特点，任劳任怨，哪里需要去哪里，不管是来自本部门的需求还是来自其他部门的需求；乐于接受任何一项工作任务，视为锻炼自己、成长自己的机会；虽然是85后，但已经是大家耳熟能详的“小舒姐”！'
      }, {
        name: "曾小菊",
        src: "zengxiaoju.png",
        department: "新能源事业部",
        post: "客服专员",
        honour: "奉献之星",
        describe: '独自承担骆驼快充客服工作，处理来自客服电话、qq用户群、App故障上报、吐槽、发票申请等渠道的客户问题，负责与集团客户的对接，平均每天处理50人次；下班时间和节假日仍坚持在岗，尽职尽责地为骆驼快充的用户服务！'
      }, {
        name: "尤书畅",
        src: "youshuchang.png",
        department: "路内停车事业部",
        post: "产品经理",
        honour: "奉献之星",
        describe: '在产品团队人力紧张的情况下，同时负责商业化变现、广告平台和基础框架平台的产品设计工作，有效推进了相关产品的研发工作，为公司后续的想象空间和产品可扩展性打下了良好的基础！'
      }, {
        name: "黄剑豪",
        src: "huangjianhao.png",
        department: "路内停车事业部",
        post: "android开发工程师",
        honour: "奉献之星",
        describe: '在路内停车事业部负责了10多个城市PDA开发与升级，并完成了多个硬件设备的顺利接入，以认真负责的态度及时应对客户现场发生的问题，大大提高了用户体验以及产品性能，为路内事业部奉献了自己的汗水和努力！'
      }, {
        name: "韦宏周",
        src: "weihongzhou.png",
        department: "路外停车事业部",
        post: "UI设计师",
        honour: "奉献之星",
        describe: '今年对于UI规范、布局、交互设计等知识有了更深的了解，将所学运用到工作中有很大的提升；负责的城市停车场报送平台大数据展示页面设计得到了同事们和市场广泛认可和积极反馈；新学习的C4D三维软件也很好的运用海报、展厅、展会设计和蜜蜂停车启动页面设计等工作中，视觉、风格、表现形式都有明显的提升和改善！'
      }],
      2: [{
        name: "杨双健",
        src: "yangshuangjian.png",
        department: "战略发展部",
        post: "战略发展经理",
        honour: "明日之星",
        describe: '入职时间不长但已较全面了解公司产品线，并转化为项目申报成果；积极配合展会和宣传；支撑市场一线，为客户编制项目建议书、可研报告等规划文档建设文档；积极与高校、专家、规划研究院所建立合作，为公司对外高层合作打下基础！'
      }, {
        name: "刘瑞雪",
        src: "liuruixue.png",
        department: "运营部",
        post: "停车场经营主管",
        honour: "明日之星",
        describe: '虽为新员工，但积极主动，充分发挥传统物业管理行业经验，草拟了《停车场项目运营管理手册》，完成经营权项目调研表、成本产出测算模型等；积极与营销中心配合洽谈多地经营权项目；利用原有物业关系资源，推动与物业的蜜蜂停车项目合作！'
      }, {
        name: "冉成伟",
        src: "ranchengwei.png",
        department: "新能源事业部",
        post: "WEB前端开发工程师",
        honour: "明日之星",
        describe: '学习能力强，入职后很快融入团队并能独挡一面；为人友好，热心帮助同事，工作积极认真负责；一人承担骆驼快充web端所有业务开发和维护，并都能按时按质完成所有工作内容，对骆驼web端做出很大贡献！'
      }, {
        name: "熊小军",
        src: "xiongxiaojun.png",
        department: "路外停车事业部",
        post: "WEB前端开发工程师",
        honour: "明日之星",
        describe: '入职后短时间内快速熟悉蜜蜂停车业务，在工作中积极与同事沟通，并不断提升自身的业务和协作能力，很好的完成各项任务安排；参与交管平台项目，完成了前端的多个关键技术实现的攻关，使系统最终的呈现效果非常流畅！'
      }, {
        name: "李志标",
        src: "lizhibiao.png",
        department: "路内停车事业部",
        post: "软件测试工程师",
        honour: "明日之星",
        describe: '作为实习生加入公司到现在一年多，每天都在进步，从毫无职场经验到独立承担深圳项目的测试，再到现在负责几个项目的测试，每次在面对巨大时间压力时都能按时完成任务；业余时间不断地学习测试技术，不断地提升自己，如这次路内产品线上巡检的实现就是自己不断学习的结果！'
      }],
      3: [{
        name: "潘江辉",
        src: "panjianghui.png",
        department: "路内停车事业部",
        post: "Java开发工程师",
        honour: "明日之星",
        describe: '自入职以来每个月都在进步，从当初一个对路内的业务一窍不通成长到现在能独当一面的组长，同时带领自己的组员对需求进行快速反应和研发，每次面对巨大的时间压力时都能按时完成任务，是我们路内事业部的明日之星！'
      }, {
        name: "谢月星",
        src: "xieyuexing.png",
        department: "研发中心",
        post: "营销中心",
        honour: "明日之星",
        describe: '在全国停车项目的集中爆发期，面对公司营销团队众多的项目支持需求，有条不紊地全力支撑前方战场、输送武器；主要牵头负责了公司NB停车项目的跟进，几个月以来取得了良好成果，与联通集团、移动集团等在NB停车方面建立了深度合作，使公司在NB技术领域站在行业前列！'
      }, {
        name: "田德志",
        src: "tiandezhi.png",
        department: "运行维护部",
        post: "应用运维工程师",
        honour: "明日之星",
        describe: '自入职运维以来，对待工作认真勤恳，很好的完成自己的本职工作，积极响应客户提出的问题并帮助客户解决！'
      }, {
        name: "肖云峰",
        src: "xiaoyunfeng.png",
        department: "营销中心",
        post: "区域经理",
        honour: "业绩之星",
        describe: '在任丘项目中，积极主动地协调商务工作，时刻以公司利益作为行动准则；通过自身努力学习，很快熟悉新产品并带入项目中，扩大了销售额！'
      }, {
        name: "梅宇杰",
        src: "meiyujie.png",
        department: "营销中心",
        post: "区域经理",
        honour: "开拓之星",
        describe: '从2C到2G，角色转变与自我学习迅速，在项目执行跟进中展现了亿车人该有的专业素养和谈判能力，在浙江地区打破最大竞争对手的封锁，在炮火最前沿的阵地拿下城市级停车场联网改造项目和路内外一体化运营项目；接下来主动出击，在垂直停车场运营以及更大城市级项目中提升能力、提高格局，让亿车的旗帜插遍吴越大地！'
      }],
      4: [{
        name: "冯晋颉",
        src: "fengjinjie.png",
        department: "营销中心",
        post: "售前技术经理",
        honour: "责任之星",
        describe: '工作认真仔细，输出的技术方案非常完善；项目试点时，深入了解公司平台和设备，提出非常多的合理化建议；输出的方案得到业主，得到市场人员的认可；团队配合度非常高！'
      }, {
        name: "游镟冰",
        src: "youxuanbing.png",
        department: "营销中心",
        post: "数据专员",
        honour: "责任之星",
        describe: '勤恳务实，善于学习，对本职工作兢兢业业，注重个人成长，有效改进自己的工作方式，不断优化部门数据分析及合同管理工作，快速成长；悟性强，充分利用业余时间精专业务知识，提高工作能力！'
      }, {
        name: "黄焰",
        src: "huangyan.png",
        department: "财务部",
        post: "主管会计",
        honour: "责任之星",
        describe: '工作富有耐心、责任心、积极谏言，在第二季度强压状态下完成2016年所有公司的汇算清缴和工商年报，辅助前期账务梳理，同时也能耐心辅导两位新同事！'
      }, {
        name: "万红军",
        src: "wanhongjun.png",
        department: "路外停车事业部",
        post: "测试工程师",
        honour: "责任之星",
        describe: '重新梳理业务流程和业务逻辑，对业务的熟悉也进一步加深，工作做起来有条不紊，秩序井然，感觉焕然一新；对测试有了新的认识，对岗位的理解有了新的定义，测试作为产品交到客户手里的最后一道关卡，肩上的担子不言而喻；在工作中一丝不苟，认真负责，虽然并不一定是尽善尽美，但对自己交付的版本可以肯定的说没问题！'
      }, {
        name: "李庆",
        src: "liqing.png",
        department: "营销中心",
        post: "售前技术经理",
        honour: "服务之星",
        describe: '调入办事处后，虽远离总部，但一直保持着总部价值观对区域的积极输出，兢兢业业地为区域同事提供各种方案支持并主导了区域的培训工作；工作任劳任怨，积极负责，思路清晰，并且具有主人翁精神！'
      }],
      5: [{
        name: "徐晨光",
        src: "xuchenguang.png",
        department: "营销中心",
        post: "售前技术经理",
        honour: "合作之星",
        describe: '作为五区售前支持，不论在方案上还是客户现场拜访沟通上，都给予我们最大的支持；专业能力优秀，对项目推动效果明显，对大家的学习提升也带来实战经验的指导；下半年还需要大家团结一致，一起奋战拿下重点项目，成为最强拍档！'
      }, {
        name: "胡海波",
        src: "huhaibo.png",
        department: "运行维护部",
        post: "应用运维工程师",
        honour: "协作之星",
        describe: '对待运维工作中出现的问题善于分析和总结；积极主动帮助同事解决问题；面对客户项目出现的突发事故快速响应，及时处理！'
      }, {
        name: "赵龙",
        src: "zhaolong.png",
        department: "工程建设部",
        post: "维护工程师",
        honour: "协作之星",
        describe: '作为售后维护团队中能说会道的定损高手，每次遇到棘手的客户总能迅速化解问题，并且得到物业的一直认可；同时在大型值班任务中主动承担责任，很好的协调工单处理！'
      }, {
        name: "汪体",
        src: "wangti.png",
        department: "研发中心",
        post: "工程建设部",
        honour: "行动之星",
        describe: '加入工程部一年多时间里，在本职工作全部完成的同时，积极地参与到其他同事的工作中，尽自己所能挺高部门的工作效率，并积极地学习其他专业技术，扩大自己的知识范围！'
      }, {
        name: "石芳铭",
        src: "shifangming.png",
        department: "战略发展部",
        post: "战略发展经理",
        honour: "讲师之星",
        describe: '二季度培训主题“规划先行-停车项目的前期工作”学员满意度高达4.91分，覆盖参训人数排名中最多达58人，在课程内容讲解方面深入浅出，互动性强，学员反馈与工作相关性较强，整体评价非常高！'
      }],
      6: [{
        name: "林坚立",
        src: "linjianli.png",
        department: "战略发展部",
        post: "战略发展部总经理",
        honour: "导师之星",
        describe: '季度内共辅导2位新人转正，新人转正考核平均分达88.85分；导师对新人循循善导，辅导技巧灵活多样，新人不仅顺利转正，且表现优秀，均被评选为本季度的优秀个人明日之星奖！'
      }]
    };
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
    this.ajax({ //获取首页模块菜单
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
    this.ajax({ //获取个人信息
      url: '/authority/user/homepage/detail',
      success(data, $this) {
        if (data.code == 'success') {
          $this.personInfo = data.content;
        }
      }
    });
    this.ajax({ //获取新闻或公共3条
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
    this.ajax({ //获取置顶新闻或公共1条
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
    this.ajax({ //获取我的待办
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
    this.ajax({ //获取我申请的
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
    });
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
    }
    ];
    let getMenu = function(baseUrl) {
      return new Promise((resolve, reject) => {
        this.ajax({
          url: '/authority/resource/user/resources',
          success(data, $this) {
            if (data.code == 'success') {
              const content = data.content;
              for (let i = 0; i < content.length; i++) {
                let {
                    url,
                  parentId,
                  id
                  } = content[i];
                if (url == baseUrl) {
                  resolve({
                    url,
                    parentId,
                    id
                  });
                }
              }
            }
          }
        });
      });
    }.bind(this);
    let getMenuButton = function(id) {
      this.ajax({
        url: '/authority/resource/user/resources?resourceId=' + id,
        success(data, $this) {
          if (data.code == 'success') {
            let content = data.content;
            for (let i = 0; i < content.length; i++) {
              for (let j = 0; j < baseEntry.length; j++) {
                if (baseEntry[j].url == content[i].url) {
                  $this.fastEntry.push({
                    id: content[i].id,
                    name: baseEntry[j].name,
                    parentId: content[i].parentId,
                    url: content[i].url,
                    icon: baseEntry[j].icon,
                  });
                }
              }
            }
          }
        }
      });
    }.bind(this);
    let getMenuEntry = async function() {
      for (let i = 0; i < baseUrl.length; i++) {
        let menu = await getMenu(baseUrl[i]);
        getMenuButton(menu.id);
      }
    };
    getMenuEntry();
  },
  filters: {
    getContent(value) {
      if (value) {
        return (Utils.unescapeHtml(value).replace(/<\/?[^>]*>/g, '')).substring(0, 144) + '......';
      }
    },
    getDepart(value) {
      if (value) {
        let depart = value.split('-');
        return depart[depart.length - 1];
      }
    }
  },
  computed: {
    setTopImg() {
      const {
          pictureId
        } = this.stickNews;
      return pictureId ? this.domain + '/news/picture/top/' + pictureId + '/download' : require('./img/news-default.png');
    }
  },
  methods: {
    restTime(dateTimeStamp) {
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var now = new Date().getTime();
      var diffValue = now - dateTimeStamp;
      var dayC = diffValue / day;
      if (dayC <= 5) {
        return true;
      }
      return false;
    }
  },
  updated() {
    let {
        depart,
      post
      } = this.$refs;
    if (depart.offsetWidth >= 198) {
      depart.style.display = "block";
      post.style.marginTop = '-10px';
    }
  },
  mounted() {
    $('#honourBox li').on('mouseover', function() {
      $('.honour-synopsis').stop().fadeOut(100);
      $(this).find('.honour-synopsis').stop().fadeIn();
      $(this).find('.person-honour-dpart').css('color', '#01cd78');
    }).on('mouseout', function() {
      $('.honour-synopsis').stop().fadeOut(100);
      $(this).find('.person-honour-dpart').css('color', 'rgba(1, 1, 1, .8)');
    });
  }
};
</script>
